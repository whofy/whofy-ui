import { useCallback, useEffect, useRef, useState } from 'react';
import { getMatches, searchJobs } from '../../api/jobs.js';
import { useJobFilters } from '../../hooks/useJobFilters.js';
import { readResumePrefs } from '../../utils/resumePreferences.js';
import FilterBar from '../../components/FilterBar/FilterBar.jsx';
import JobCard from '../../components/JobCard/JobCard.jsx';
import DetailPane from '../../components/DetailPane/DetailPane.jsx';
import EmptyState from '../../components/EmptyState/EmptyState.jsx';
import SortControl from '../../components/SortControl/SortControl.jsx';
import { SkeletonList } from '../../components/SkeletonCard/SkeletonCard.jsx';
import styles from './Results.module.css';

const PAGE_SIZE = 15;

export default function Results() {
  const [prefs] = useState(() => readResumePrefs());

  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [sortMode, setSortMode] = useState(prefs?.skills?.length ? 'relevance' : 'newest');
  const baseJobsRef = useRef(null);
  const debounceRef = useRef(null);
  const listRef = useRef(null);
  const detailRef = useRef(null);
  const currentFiltersRef = useRef({ skills: [], filters: {} });
  const activeSearchRef = useRef({ query: '', filters: {} });

  // Server-side sort — `sort` is passed through to /api/matches and
  // /api/search so pagination stays consistent (page 2 of "Company A–Z"
  // continues the alphabet from where page 1 left off, not restarts it).
  const fetchJobs = useCallback(async (skills = [], filters = {}, pageNum = 1, sort) => {
    setLoading(true);
    try {
      const skip = (pageNum - 1) * PAGE_SIZE;
      const data = await getMatches(skills, filters, { skip, limit: PAGE_SIZE, sort });
      const newJobs = data.jobs || [];
      setJobs(newJobs);
      baseJobsRef.current = newJobs;
      setTotal(data.total || 0);
      currentFiltersRef.current = { skills, filters };
    } catch {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSearchPage = useCallback(async (queryStr, filters, pageNum, sort) => {
    setLoading(true);
    try {
      const skip = (pageNum - 1) * PAGE_SIZE;
      const data = await searchJobs(queryStr, filters, { skip, limit: PAGE_SIZE, sort });
      setJobs(data.jobs || []);
      setTotal(data.total || 0);
    } catch {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    if (activeSearchRef.current.query) {
      const { query: qStr, filters } = activeSearchRef.current;
      fetchSearchPage(qStr, filters, newPage, sortMode);
    } else {
      const { skills, filters } = currentFiltersRef.current;
      fetchJobs(skills, filters, newPage, sortMode);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const initFilters = {};
    if (prefs?.location) initFilters.location = prefs.location;
    fetchJobs(prefs?.skills || [], initFilters, 1, sortMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refetch page 1 whenever the user changes the sort. Skips the initial
  // mount so we don't double-fetch alongside the effect above.
  const sortInitRef = useRef(true);
  useEffect(() => {
    if (sortInitRef.current) { sortInitRef.current = false; return; }
    setPage(1);
    const activeQuery = activeSearchRef.current.query;
    if (activeQuery) {
      fetchSearchPage(activeQuery, activeSearchRef.current.filters, 1, sortMode);
    } else {
      const { skills, filters } = currentFiltersRef.current;
      fetchJobs(skills, filters, 1, sortMode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortMode]);

  const { filterState, clearAll, setGroup, visible } = useJobFilters(jobs, '');

  const SERVER_FILTER_GROUPS = new Set(['source', 'location', 'type', 'experience', 'posted']);

  async function applyGroup(group, values) {
    const arr = [...values];
    setGroup(group, arr);

    if (group !== 'skills' && !SERVER_FILTER_GROUPS.has(group)) return;

    const nextState = { ...filterState, [group]: new Set(arr) };
    const filters = {};
    for (const key of SERVER_FILTER_GROUPS) {
      const vals = key === group ? arr : [...(nextState[key] || [])];
      if (vals.length) filters[key] = vals.join('|');
    }
    setPage(1);

    // When a search is active, re-run the SEARCH with the new filters rather
    // than falling through to /api/matches. Otherwise the query silently
    // vanishes from the results while activeSearchRef still holds it — so
    // page 1 comes from /api/matches and page 2 from /api/search.
    const activeQuery = activeSearchRef.current.query;
    if (activeQuery) {
      activeSearchRef.current = { query: activeQuery, filters };
      await fetchSearchPage(activeQuery, filters, 1, sortMode);
      return;
    }

    const skills = group === 'skills' ? arr : [...(nextState.skills || [])];
    await fetchJobs(skills, filters, 1, sortMode);
  }

  function handleClearAll() {
    clearAll();
    setQuery('');
    // Without this, a stale query here would send the next page click to
    // /api/search even though the list came from /api/matches.
    activeSearchRef.current = { query: '', filters: {} };
    fetchJobs([], {}, 1, sortMode);
    setPage(1);
  }

  function handleSearch(e) {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(debounceRef.current);

    const trimmed = val.trim();
    if (trimmed.length < 2) {
      activeSearchRef.current = { query: '', filters: {} };
      if (baseJobsRef.current) {
        setJobs(baseJobsRef.current);
        // Restore the total from the last filter/matches fetch so pagination reflects it.
        const { skills, filters } = currentFiltersRef.current;
        fetchJobs(skills, filters, 1, sortMode);
        setPage(1);
      }
      return;
    }

    debounceRef.current = setTimeout(async () => {
      // Respect the filter chips the user has already set so search
      // doesn't ignore their Junior/Location selections.
      const searchFilters = {};
      for (const key of SERVER_FILTER_GROUPS) {
        const vals = [...(filterState[key] || [])];
        if (vals.length) searchFilters[key] = vals.join('|');
      }
      activeSearchRef.current = { query: trimmed, filters: searchFilters };
      setPage(1);
      await fetchSearchPage(trimmed, searchFilters, 1, sortMode);
    }, 400);
  }

  const autoApplied = useRef(false);
  useEffect(() => {
    if (autoApplied.current) return;
    autoApplied.current = true;

    if (prefs?.location) setGroup('location', [prefs.location]);
    if (prefs?.skills?.length) setGroup('skills', prefs.skills);
  }, [prefs, setGroup]);

  // Server already applied the sort (relevance / newest / company). The
  // previous client-side sortJobs() was broken under pagination — it only
  // sorted the 15 rows on the current page, so page 2 restarted the alphabet.
  const sorted = visible;
  
  // Auto-select first job whenever the sorted/filtered list changes
  useEffect(() => {
    if (sorted.length > 0) {
      setSelectedId(sorted[0].id);
    } else {
      setSelectedId(null);
    }
    // Also reset list scroll position when new jobs load
    if (listRef.current) {
      listRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [sorted]);

  // Reset detail pane scroll when a new job is selected
  useEffect(() => {
    if (detailRef.current) {
      detailRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedId]);

  const [sheetOpen, setSheetOpen] = useState(false);
  const sheetRef = useRef(null);
  const dragRef = useRef({ startY: 0, currentY: 0, dragging: false });

  const isMobile = () => window.innerWidth <= 900;

  const openSheet = (id) => {
    setSelectedId(id);
    if (isMobile()) setSheetOpen(true);
  };

  const closeSheet = () => setSheetOpen(false);

  useEffect(() => {
    if (!sheetOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') closeSheet(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [sheetOpen]);

  const handleTouchStart = (e) => {
    const body = sheetRef.current?.querySelector('[class*="sheetBody"]');
    if (!body || body.scrollTop > 0) return;
    dragRef.current = { startY: e.touches[0].clientY, currentY: e.touches[0].clientY, dragging: true };
  };
  const handleTouchMove = (e) => {
    const d = dragRef.current;
    if (!d.dragging) return;
    d.currentY = e.touches[0].clientY;
    const dy = d.currentY - d.startY;
    if (dy > 0 && sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${dy}px)`;
    }
  };
  const handleTouchEnd = () => {
    const d = dragRef.current;
    if (!d.dragging) return;
    d.dragging = false;
    const dy = d.currentY - d.startY;
    if (sheetRef.current) sheetRef.current.style.transform = '';
    if (dy > 120) closeSheet();
  };

  const selected = selectedId ? sorted.find(j => j.id === selectedId) : null;

  return (
    <div className={styles.page}>
      <div className={styles.stickyToolbar}>
        <div className="container">
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <div className={styles.searchWrap}>
                <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                <input
                  type="text"
                  value={query}
                  onChange={handleSearch}
                  className={styles.searchInput}
                  placeholder="Search by role, company or skill..."
                />
                {query && (
                  <button 
                    className={styles.clearSearchBtn}
                    onClick={() => handleSearch({ target: { value: '' } })}
                    aria-label="Clear search"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>
                )}
              </div>
              <SortControl value={sortMode} onChange={setSortMode} />
            </div>
            <div className={styles.headerRight}>
              <h2>
                Your matches
                <span className={styles.count}>{total.toLocaleString()} {total === 1 ? 'result' : 'results'}</span>
              </h2>
            </div>
          </div>
          <FilterBar
            jobs={jobs}
            filterState={filterState}
            onApplyGroup={applyGroup}
            onClearAll={handleClearAll}
          />
        </div>
      </div>

      <div className={`container ${styles.contentWrapper}`}>
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
            <div className={styles.listPane} ref={listRef}>
              {sorted.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  active={job.id === selectedId}
                  onClick={() => openSheet(job.id)}
                />
              ))}
              
              {total > PAGE_SIZE && (
                <div className={styles.pagination}>
                  <button 
                    className={styles.pageBtn} 
                    onClick={() => handlePageChange(Math.max(1, page - 1))}
                    disabled={page === 1}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    Previous
                  </button>
                  <span className={styles.pageText}>
                    <strong>{page}</strong> / {Math.ceil(total / PAGE_SIZE)}
                  </span>
                  <button 
                    className={styles.pageBtn} 
                    onClick={() => handlePageChange(Math.min(Math.ceil(total / PAGE_SIZE), page + 1))}
                    disabled={page >= Math.ceil(total / PAGE_SIZE)}
                  >
                    Next
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                </div>
              )}
            </div>
            <div className={styles.detailPane} ref={detailRef}>
              {selected ? (
                <DetailPane key={selected.id} job={selected} onClose={() => setSelectedId(null)} />
              ) : (
                <EmptyState jobs={sorted} onPick={setSelectedId} />
              )}
            </div>
          </div>
        )}
      </div>

      {sheetOpen && selected && (
        <>
          <div className={styles.sheetOverlay} onClick={closeSheet} />
          <div
            className={styles.sheet}
            ref={sheetRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className={styles.sheetHandle}><span /></div>
            <div className={styles.sheetBody}>
              <DetailPane key={selected.id} job={selected} onClose={closeSheet} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
