import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext.jsx';
import { useToast } from '../components/Toast/ToastContext.jsx';
import { getSavedJobIds, saveJob as apiSave, unsaveJob as apiUnsave } from '../api/jobs.js';

const SavedJobsContext = createContext({ savedIds: new Set(), saving: false, toggle: () => {}, refresh: () => {} });

export function SavedJobsProvider({ children }) {
  const { isSignedIn, getToken } = useAuth();
  const toast = useToast();
  const [savedIds, setSavedIds] = useState(new Set());
  const [saving, setSaving] = useState(false);

  const refresh = useCallback(async () => {
    if (!isSignedIn) { setSavedIds(new Set()); return; }
    try {
      const token = await getToken();
      const ids = await getSavedJobIds(token);
      setSavedIds(new Set(ids));
    } catch {
      // silent
    }
  }, [isSignedIn, getToken]);

  useEffect(() => { refresh(); }, [refresh]);

  const toggle = useCallback(async (jobId) => {
    if (!isSignedIn || saving) return;
    setSaving(true);
    const wasSaved = savedIds.has(jobId);
    try {
      const token = await getToken();
      if (wasSaved) {
        await apiUnsave(token, jobId);
        setSavedIds(prev => { const next = new Set(prev); next.delete(jobId); return next; });
        toast.success('Removed from saved jobs');
      } else {
        await apiSave(token, jobId);
        setSavedIds(prev => new Set(prev).add(jobId));
        toast.success('Job saved to your list');
      }
    } catch {
      toast.error(wasSaved ? "Couldn't remove that job. Try again." : "Couldn't save that job. Try again.");
    } finally {
      setSaving(false);
    }
  }, [isSignedIn, getToken, savedIds, saving, toast]);

  return (
    <SavedJobsContext.Provider value={{ savedIds, saving, toggle, refresh }}>
      {children}
    </SavedJobsContext.Provider>
  );
}

export function useSavedJobs() {
  return useContext(SavedJobsContext);
}
