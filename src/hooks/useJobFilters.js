import { useState, useMemo, useCallback } from 'react';

const DAY_MS = 24 * 60 * 60 * 1000;

function matchesPosted(job, values) {
  if (!job.postedAt) return false;
  const posted = new Date(job.postedAt);
  if (Number.isNaN(posted.getTime())) return false;
  const days = Math.floor((Date.now() - posted.getTime()) / DAY_MS);

  for (const v of values) {
    if (v === 'today' && days <= 0) return true;
    if (v === 'week' && days <= 7) return true;
    if (v === 'month' && days <= 30) return true;
  }
  return false;
}

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

  const visible = useMemo(() => {
    const tokens = query.trim().toLowerCase().split(/[\s.]+/).filter(Boolean);
    return jobs.filter(j => {
      if (filterState.location.size && !filterState.location.has(j.location)) return false;
      if (filterState.posted.size && !matchesPosted(j, filterState.posted)) return false;
      if (filterState.skills.size) {
        const hasSkill = (j.matchedSkills || []).some(sk => filterState.skills.has(sk));
        if (!hasSkill) return false;
      }
      if (filterState.company.size && !filterState.company.has(j.company)) return false;
      if (filterState.source.size && !filterState.source.has(j.source)) return false;
      if (filterState.type.size && !filterState.type.has(j.workType)) return false;
      if (filterState.experience.size && !filterState.experience.has(j.experience)) return false;
      if (tokens.length) {
        const text = jobText(j);
        if (!tokens.every(t => text.includes(t))) return false;
      }
      return true;
    });
  }, [jobs, filterState, query]);

  return { filterState, toggle, clearAll, resetGroup, setGroup, visible };
}
