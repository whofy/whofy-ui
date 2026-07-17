import { useState, useMemo, useCallback } from 'react';

function salaryLPA(s) {
  const nums = (s.match(/[\d.]+/g) || []).map(Number);
  if (!nums.length) return 0;
  if (/\/mo/i.test(s)) return (nums[0] * 12) / 100000;
  return nums[0];
}
function salaryMax(s) {
  const nums = (s.match(/[\d.]+/g) || []).map(Number);
  if (!nums.length) return 0;
  if (/\/mo/i.test(s)) return (nums[nums.length - 1] * 12) / 100000;
  return nums[nums.length - 1];
}
function matchesSalary(job, values) {
  const min = salaryLPA(job.salary), max = salaryMax(job.salary);
  for (const v of values) {
    if (v === '0-5' && min < 5) return true;
    if (v === '5-8' && max >= 5 && min <= 8) return true;
    if (v === '8-12' && max >= 8 && min <= 12) return true;
    if (v === '12+' && max >= 12) return true;
  }
  return false;
}
function matchesExp(job, values) {
  const exp = job.experience.toLowerCase();
  for (const v of values) {
    if (v === 'Fresher' && (exp.includes('0') || exp.includes('fresher'))) return true;
    if (v === '0-1' && exp.includes('0–1')) return true;
    if (v === '0-2' && exp.includes('0–2')) return true;
    if (v === '1-2' && exp.includes('1–2')) return true;
  }
  return false;
}

function emptyState() {
  return {
    type: new Set(), location: new Set(), salary: new Set(),
    experience: new Set(), work: new Set(), industry: new Set(),
    skills: new Set(), posted: new Set()
  };
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
    const q = query.trim().toLowerCase();
    return jobs.filter(j => {
      if (filterState.type.size && !filterState.type.has(j.type)) return false;
      if (filterState.location.size && !filterState.location.has(j.location)) return false;
      if (filterState.salary.size && !matchesSalary(j, filterState.salary)) return false;
      if (filterState.experience.size && !matchesExp(j, filterState.experience)) return false;
      if (filterState.work.size) {
        const ok = (filterState.work.has('remote') && j.remote) || (filterState.work.has('onsite') && !j.remote);
        if (!ok) return false;
      }
      if (filterState.skills.size) {
        const hasSkill = j.matchedSkills.some(sk => filterState.skills.has(sk));
        if (!hasSkill) return false;
      }
      if (q) {
        const hit = j.title.toLowerCase().includes(q)
          || j.company.toLowerCase().includes(q)
          || j.matchedSkills.some(sk => sk.toLowerCase().includes(q))
          || j.location.toLowerCase().includes(q);
        if (!hit) return false;
      }
      return true;
    });
  }, [jobs, filterState, query]);

  return { filterState, toggle, clearAll, resetGroup, setGroup, visible };
}
