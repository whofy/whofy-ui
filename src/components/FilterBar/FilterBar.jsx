import { useEffect, useState } from 'react';
import { getCompanies, getLocations, getSources } from '../../api/jobs.js';
import FilterDropdown from './FilterDropdown.jsx';
import { SKILL_OPTIONS, STATIC_FILTERS, TYPE_OPTIONS, EXPERIENCE_OPTIONS } from './filterConfig.js';
import styles from './FilterBar.module.css';

function toOptions(values) {
  return values.map(v => ({ value: v, label: v }));
}

export default function FilterBar({ jobs, filterState, onApplyGroup, onClearAll }) {
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

  const totalSelected = Object.values(filterState).reduce((a, s) => a + s.size, 0);

  return (
    <div className={styles.bar}>
      <FilterDropdown label="Location"   options={toOptions(locations)}      selected={filterState.location}   onApply={v => onApplyGroup('location', v)} />
      <FilterDropdown label="Company"    options={toOptions(companies)}      selected={filterState.company}    onApply={v => onApplyGroup('company', v)} />
      <FilterDropdown label="Source"     options={toOptions(sources)}        selected={filterState.source}     onApply={v => onApplyGroup('source', v)} />
      <FilterDropdown label="Type"       options={TYPE_OPTIONS}              selected={filterState.type}       onApply={v => onApplyGroup('type', v)} />
      <FilterDropdown label="Experience" options={EXPERIENCE_OPTIONS}        selected={filterState.experience} onApply={v => onApplyGroup('experience', v)} />
      <FilterDropdown label="Posted"     options={STATIC_FILTERS[0].options} selected={filterState.posted}     onApply={v => onApplyGroup('posted', v)} />
      <FilterDropdown label="Skills"     options={skills}                    selected={filterState.skills}     onApply={v => onApplyGroup('skills', v)} />
      {totalSelected > 0 && (
        <button className={styles.clear} onClick={onClearAll}>Clear all</button>
      )}
    </div>
  );
}
