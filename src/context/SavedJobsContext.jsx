import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { getSavedJobIds, saveJob as apiSave, unsaveJob as apiUnsave } from '../api/jobs.js';

const SavedJobsContext = createContext({ savedIds: new Set(), saving: false, toggle: () => {}, refresh: () => {} });

export function SavedJobsProvider({ children }) {
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();
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
    try {
      const token = await getToken();
      if (savedIds.has(jobId)) {
        await apiUnsave(token, jobId);
        setSavedIds(prev => { const next = new Set(prev); next.delete(jobId); return next; });
      } else {
        await apiSave(token, jobId);
        setSavedIds(prev => new Set(prev).add(jobId));
      }
    } catch {
      // silent
    } finally {
      setSaving(false);
    }
  }, [isSignedIn, getToken, savedIds, saving]);

  return (
    <SavedJobsContext.Provider value={{ savedIds, saving, toggle, refresh }}>
      {children}
    </SavedJobsContext.Provider>
  );
}

export function useSavedJobs() {
  return useContext(SavedJobsContext);
}
