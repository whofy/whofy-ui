import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { getSavedJobIds, saveJob as apiSave, unsaveJob as apiUnsave } from '../api/jobs.js';

const SavedJobsContext = createContext({ savedIds: new Set(), saving: false, toggle: () => {}, refresh: () => {} });

export function SavedJobsProvider({ children }) {
  const { isSignedIn, user } = useUser();
  const [savedIds, setSavedIds] = useState(new Set());
  const [saving, setSaving] = useState(false);

  const userId = isSignedIn ? user?.id : null;

  const refresh = useCallback(async () => {
    if (!userId) { setSavedIds(new Set()); return; }
    try {
      const ids = await getSavedJobIds(userId);
      setSavedIds(new Set(ids));
    } catch {
      // silent
    }
  }, [userId]);

  useEffect(() => { refresh(); }, [refresh]);

  const toggle = useCallback(async (jobId) => {
    if (!userId || saving) return;
    setSaving(true);
    try {
      if (savedIds.has(jobId)) {
        await apiUnsave(userId, jobId);
        setSavedIds(prev => { const next = new Set(prev); next.delete(jobId); return next; });
      } else {
        await apiSave(userId, jobId);
        setSavedIds(prev => new Set(prev).add(jobId));
      }
    } catch {
      // silent
    } finally {
      setSaving(false);
    }
  }, [userId, savedIds, saving]);

  return (
    <SavedJobsContext.Provider value={{ savedIds, saving, toggle, refresh }}>
      {children}
    </SavedJobsContext.Provider>
  );
}

export function useSavedJobs() {
  return useContext(SavedJobsContext);
}
