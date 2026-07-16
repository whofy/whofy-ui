import FilterDropdown from './FilterDropdown.jsx';
import { STATIC_FILTERS } from './filterConfig.js';
import styles from './FilterBar.module.css';

export default function FilterBar({ jobs, filterState, onToggle, onClearAll }) {
  const locations = [...new Set(jobs.map(j => j.location))].sort()
    .map(l => ({ value: l, label: l }));
  const skills = [...new Set(jobs.flatMap(j => j.matchedSkills))].sort()
    .map(s => ({ value: s, label: s }));

  const totalSelected = Object.values(filterState).reduce((a, s) => a + s.size, 0);

  return (
    <div className={styles.bar}>
      <FilterDropdown label="Job type" options={STATIC_FILTERS[0].options} selected={filterState.type} onToggle={v => onToggle('type', v)} />
      <FilterDropdown label="Location" options={locations} selected={filterState.location} onToggle={v => onToggle('location', v)} />
      <FilterDropdown label="Salary range" options={STATIC_FILTERS[1].options} selected={filterState.salary} onToggle={v => onToggle('salary', v)} />
      <FilterDropdown label="Experience" options={STATIC_FILTERS[2].options} selected={filterState.experience} onToggle={v => onToggle('experience', v)} />
      <FilterDropdown label="Work style" options={STATIC_FILTERS[3].options} selected={filterState.work} onToggle={v => onToggle('work', v)} />
      <FilterDropdown label="Industry" options={STATIC_FILTERS[4].options} selected={filterState.industry} onToggle={v => onToggle('industry', v)} />
      <FilterDropdown label="Skills" options={skills} selected={filterState.skills} onToggle={v => onToggle('skills', v)} />
      <FilterDropdown label="Posted" options={STATIC_FILTERS[5].options} selected={filterState.posted} onToggle={v => onToggle('posted', v)} />
      {totalSelected > 0 && (
        <button className={styles.clear} onClick={onClearAll}>Clear all</button>
      )}
    </div>
  );
}
