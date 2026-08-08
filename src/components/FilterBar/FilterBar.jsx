import { useEffect, useState, useRef, useMemo, useLayoutEffect } from 'react';
import { getCompanies, getLocations, getSources } from '../../api/jobs.js';
import FilterDropdown from './FilterDropdown.jsx';
import TagSearchDropdown from './TagSearchDropdown.jsx';
import { SKILL_OPTIONS, STATIC_FILTERS, TYPE_OPTIONS, EXPERIENCE_OPTIONS } from './filterConfig.js';
import styles from './FilterBar.module.css';

function toOptions(values) {
  return values.map(v => ({ value: v, label: v }));
}

export default function FilterBar({ jobs, filterState, onApplyGroup, onClearAll, sortMode, onSortChange }) {
  const [locations, setLocations] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [sources, setSources] = useState([]);


  useEffect(() => {
    getLocations().then(setLocations).catch(() => setLocations([]));
    getCompanies().then(setCompanies).catch(() => setCompanies([]));
    getSources().then(setSources).catch(() => setSources([]));
  }, []);

  const fromResults = jobs.flatMap(j => j.matchedSkills || []);
  const skills = [...new Set([...fromResults, ...SKILL_OPTIONS])].sort()
    .map(s => ({ value: s, label: s }));

  const locationFromResults = jobs.flatMap(j => 
    (j.location || '').split(';').map(l => l.trim()).filter(Boolean)
  );
  const allLocations = [...new Set([...locationFromResults, ...locations])].sort();

  const totalSelected = Object.values(filterState).reduce((a, s) => a + s.size, 0);
  const hasTags = (filterState.location?.size > 0) || (filterState.skills?.size > 0);

  const allTags = useMemo(() => [
    ...Array.from(filterState.location || []).map(loc => ({ type: 'location', value: loc })),
    ...Array.from(filterState.skills || []).map(skill => ({ type: 'skills', value: skill }))
  ], [filterState.location, filterState.skills]);

  const tagsRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(allTags.length);
  const [isExpanded, setIsExpanded] = useState(false);
  const [naturalOverflow, setNaturalOverflow] = useState(false);

  useEffect(() => {
    setVisibleCount(allTags.length);
    setNaturalOverflow(false);
  }, [allTags]);

  useLayoutEffect(() => {
    const el = tagsRef.current;
    if (!el) return;

    if (isExpanded) {
      setNaturalOverflow(el.clientHeight > 80);
      return;
    }

    if (el.clientHeight > 80 && visibleCount > 0) {
      setNaturalOverflow(true);
      setVisibleCount(prev => prev - 1);
    }
  }, [visibleCount, isExpanded, allTags]);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (!isExpanded) {
        setVisibleCount(allTags.length);
      }
    });
    if (tagsRef.current) observer.observe(tagsRef.current);
    return () => observer.disconnect();
  }, [isExpanded, allTags.length]);

  const visibleTags = isExpanded ? allTags : allTags.slice(0, visibleCount);
  const showActions = naturalOverflow || totalSelected > 0;

  const allTags = useMemo(() => [
    ...Array.from(filterState.location || []).map(loc => ({ type: 'location', value: loc })),
    ...Array.from(filterState.skills || []).map(skill => ({ type: 'skills', value: skill }))
  ], [filterState.location, filterState.skills]);

  const tagsRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(allTags.length);
  const [isExpanded, setIsExpanded] = useState(false);
  const [naturalOverflow, setNaturalOverflow] = useState(false);

  useEffect(() => {
    setVisibleCount(allTags.length);
    setNaturalOverflow(false);
  }, [allTags]);

  useLayoutEffect(() => {
    const el = tagsRef.current;
    if (!el) return;

    if (isExpanded) {
      setNaturalOverflow(el.clientHeight > 80);
      return;
    }

    if (el.clientHeight > 80 && visibleCount > 0) {
      setNaturalOverflow(true);
      setVisibleCount(prev => prev - 1);
    }
  }, [visibleCount, isExpanded, allTags]);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (!isExpanded) {
        setVisibleCount(allTags.length);
      }
    });
    if (tagsRef.current) observer.observe(tagsRef.current);
    return () => observer.disconnect();
  }, [isExpanded, allTags.length]);

  const visibleTags = isExpanded ? allTags : allTags.slice(0, visibleCount);

  return (
    <div 
      className={styles.bar}
      ref={tagsRef}
    >
      <TagSearchDropdown
          label="Location"
          placeholder="City, State or Country"
          emptyText="Type to search locations..."
          options={toOptions(allLocations)}
          selectedCount={filterState.location?.size || 0}
          selectedValues={filterState.location}
          onAdd={v => {
            const next = new Set(filterState.location || []);
            next.add(v);
            onApplyGroup('location', Array.from(next));
          }}
          onRemove={v => {
            const next = new Set(filterState.location || []);
            next.delete(v);
            onApplyGroup('location', Array.from(next));
          }}
        />

        <FilterDropdown label="Company"    options={toOptions(companies)}      selected={filterState.company}    onApply={v => onApplyGroup('company', v)} />
        <FilterDropdown label="Source"     options={toOptions(sources)}        selected={filterState.source}     onApply={v => onApplyGroup('source', v)} />
        <FilterDropdown label="Type"       options={TYPE_OPTIONS}              selected={filterState.type}       onApply={v => onApplyGroup('type', v)} />
        <FilterDropdown label="Experience" options={EXPERIENCE_OPTIONS}        selected={filterState.experience} onApply={v => onApplyGroup('experience', v)} />
        <FilterDropdown label="Posted"     options={STATIC_FILTERS[0].options} selected={filterState.posted}     onApply={v => onApplyGroup('posted', v)} singleSelect />
        
        <TagSearchDropdown
          label="Skills"
          placeholder="Search or add skills..."
          emptyText="Type to search skills..."
          options={skills}
          selectedCount={filterState.skills?.size || 0}
          selectedValues={filterState.skills}
          onAdd={v => {
            const next = new Set(filterState.skills || []);
            next.add(v);
            onApplyGroup('skills', Array.from(next));
          }}
          onRemove={v => {
            const next = new Set(filterState.skills || []);
            next.delete(v);
            onApplyGroup('skills', Array.from(next));
          }}
        />

        {visibleTags.map(tag => (
          <button 
            key={`${tag.type}-${tag.value}`} 
            className={styles.skillTag} 
            onClick={() => {
              const next = new Set(filterState[tag.type] || []);
              next.delete(tag.value);
              onApplyGroup(tag.type, Array.from(next));
            }}
            type="button"
          >
            {tag.value}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        ))}

        {naturalOverflow && (
          <button
            className={styles.viewMoreBtn}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Hide' : 'View more'}
          </button>
        )}
        {totalSelected > 0 && (
          <button className={styles.clearBtn} onClick={onClearAll}>Clear all</button>
        )}
      </div>
  );
}
