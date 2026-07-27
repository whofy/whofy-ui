import { useEffect, useState } from 'react';
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

  return (
    <div className={styles.bar}>
      <TagSearchDropdown 
        label="Location"
        placeholder="City, State or Country"
        emptyText="Type to search locations..."
        options={toOptions(allLocations)} 
        onAdd={v => {
          const next = new Set(filterState.location || []);
          next.add(v);
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
        onAdd={v => {
          const next = new Set(filterState.skills || []);
          next.add(v);
          onApplyGroup('skills', Array.from(next));
        }} 
      />

      {Array.from(filterState.location || []).map(loc => (
        <button 
          key={loc} 
          className={styles.skillTag} 
          onClick={() => {
            const next = new Set(filterState.location || []);
            next.delete(loc);
            onApplyGroup('location', Array.from(next));
          }}
          type="button"
        >
          {loc}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      ))}

      {Array.from(filterState.skills || []).map(skill => (
        <button 
          key={skill} 
          className={styles.skillTag} 
          onClick={() => {
            const next = new Set(filterState.skills || []);
            next.delete(skill);
            onApplyGroup('skills', Array.from(next));
          }}
          type="button"
        >
          {skill}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      ))}

      {totalSelected > 0 && (
        <button className={styles.clear} onClick={onClearAll}>Clear all</button>
      )}
    </div>
  );
}
