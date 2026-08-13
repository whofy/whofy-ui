import { useState, useMemo, useCallback } from 'react';

function emptyState() {
  return { location: new Set(), posted: new Set(), skills: new Set(), company: new Set(), source: new Set(), type: new Set(), experience: new Set() };
}

function jobText(j) {
  return [
    j.title,
    j.company,
    j.location,
    ...(j.matchedSkills || []),
    j.description || '',
  ].join(' ').toLowerCase();
}

export function useJobFilters(jobs, query = '') {
  const [filterState, setFilterState] = useState(emptyState);

  const toggle = useCallback((group, value) => {
    setFilterState(prev => {
      const next = { ...prev, [group]: new Set(prev[group]) };
      if (next[group].has(value)) next[group].delete(value);
      else next[group].add(value);
      return next;
    });
  }, []);

  const clearAll = useCallback(() => setFilterState(emptyState()), []);

  const resetGroup = useCallback((group) => {
    setFilterState(prev => ({ ...prev, [group]: new Set() }));
  }, []);

  const setGroup = useCallback((group, values) => {
    setFilterState(prev => ({ ...prev, [group]: new Set(values) }));
  }, []);

  // Server-side pagination requires the client to display exactly what the
  // API returned. Filtering here would re-apply filters the server already
  // ran, but only over the 15 rows in the current page — the surviving 3
  // would render as page 1 and page 2 would look empty even though the
  // server said "35 results".
  //
  // The remaining client-side use case is the in-results free-text `query`
  // (a quick way to narrow the visible page without a new API call).
  const visible = useMemo(() => {
    const tokens = query.trim().toLowerCase().split(/[\s.]+/).filter(Boolean);
    if (!tokens.length) return jobs;
    return jobs.filter(j => {
      const text = jobText(j);
      return tokens.every(t => text.includes(t));
    });
  }, [jobs, query]);

  return { filterState, toggle, clearAll, resetGroup, setGroup, visible };
}
