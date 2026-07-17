import { useEffect, useMemo, useRef, useState } from 'react';
import { getMatches } from '../../api/jobs.js';
import { useJobFilters } from '../../hooks/useJobFilters.js';
import { sortJobs } from '../../utils/sortJobs.js';
import { readResumePrefs } from '../../utils/resumePreferences.js';
import FilterBar from '../../components/FilterBar/FilterBar.jsx';
import JobCard from '../../components/JobCard/JobCard.jsx';
import DetailPane from '../../components/DetailPane/DetailPane.jsx';
import EmptyState from '../../components/EmptyState/EmptyState.jsx';
import SortControl from '../../components/SortControl/SortControl.jsx';
import { SkeletonList } from '../../components/SkeletonCard/SkeletonCard.jsx';
import styles from './Results.module.css';

export default function Results() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [sortMode, setSortMode] = useState('best');

  useEffect(() => {
    getMatches()
      .then(setJobs)
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  }, []);

  const { filterState, clearAll, setGroup, visible } = useJobFilters(jobs, query);
  const applyGroup = (group, values) => setGroup(group, [...values]);

  // Auto-apply filters extracted from the uploaded resume — only on first mount
  // after jobs load, and only if the user hasn't manually touched anything yet.
  const autoApplied = useRef(false);
  useEffect(() => {
    if (autoApplied.current || jobs.length === 0) return;
    const prefs = readResumePrefs();
    if (!prefs) return;
    autoApplied.current = true;

    if (prefs.skills?.length) {
      const validSkills = new Set(jobs.flatMap(j => j.matchedSkills));
      const matched = prefs.skills.filter(s => validSkills.has(s));
      if (matched.length) setGroup('skills', matched);
    }
    if (prefs.location) {
      const validLocations = new Set(jobs.map(j => j.location));
      if (validLocations.has(prefs.location)) setGroup('location', [prefs.location]);
    }
    if (prefs.experience) setGroup('experience', [prefs.experience]);
    if (prefs.type)       setGroup('type', [prefs.type]);
  }, [jobs, setGroup]);
  const sorted = useMemo(() => sortJobs(visible, sortMode), [visible, sortMode]);
  const selected = selectedId ? sorted.find(j => j.id === selectedId) : null;

  function handleSelect(id) {
    setSelectedId(id);
  }
  function handleClose() {
    setSelectedId(null);
  }

  return (
    <div className={styles.page}>
      <div className={styles.stickyToolbar}>
        <div className="container">
          <div className={styles.header}>
            <h2>
              Your matches
              <span className={styles.count}>{sorted.length} {sorted.length === 1 ? 'result' : 'results'}</span>
            </h2>
            <div className={styles.headerRight}>
              <div className={styles.searchWrap}>
                <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className={styles.searchInput}
                  placeholder="Search by role, company or skill..."
                />
              </div>
              <SortControl value={sortMode} onChange={setSortMode} />
            </div>
          </div>
          <FilterBar
            jobs={jobs}
            filterState={filterState}
            onApplyGroup={applyGroup}
            onClearAll={clearAll}
          />
        </div>
      </div>

      <div className="container">
        {loading ? (
          <div className={styles.split}>
            <div className={styles.listPane}>
              <SkeletonList count={6} />
            </div>
            <div className={styles.detailPane}>
              <div className={styles.detailSkeleton}>
                <div className={styles.skHeader}>
                  <div className={styles.skLogo}></div>
                  <div className={styles.skTitle}></div>
                </div>
                <div className={styles.skLineFull}></div>
                <div className={styles.skLineFull}></div>
                <div className={styles.skLineShort}></div>
              </div>
            </div>
          </div>
        ) : sorted.length === 0 ? (
          <div className={styles.emptyPage}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <p>No jobs match your filters. Try adjusting your criteria.</p>
          </div>
        ) : (
          <div className={styles.split}>
            <div className={styles.listPane}>
              {sorted.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  active={job.id === selectedId}
                  onClick={() => handleSelect(job.id)}
                />
              ))}
            </div>
            <div className={styles.detailPane}>
              {selected ? (
                <DetailPane job={selected} onClose={handleClose} />
              ) : (
                <EmptyState jobs={sorted} onPick={handleSelect} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
