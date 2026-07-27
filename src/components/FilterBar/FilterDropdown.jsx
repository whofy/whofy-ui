import { useState, useRef, useEffect } from 'react';
import styles from './FilterBar.module.css';

/**
 * Filter dropdown with staged selections.
 *
 * Ticking checkboxes does NOT apply the filter — changes are held in a local
 * "pending" state and only committed when the user clicks "Show results".
 * "Reset" clears the pending state back to whatever is already applied.
 * Closing the dropdown without clicking Show results discards pending changes.
 *
 * Props:
 *   - label     : dropdown button label
 *   - options   : [{ value, label }]
 *   - selected  : Set<string> of currently-applied values
 *   - onApply   : (Set<string>) => void   — commit these values as the new applied set
 */
// Below this many options, a search box just adds clutter for no benefit.
const SEARCH_THRESHOLD = 8;

export default function FilterDropdown({ label, options, selected, onApply, singleSelect }) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(() => new Set(selected));
  const [search, setSearch] = useState('');
  const ref = useRef(null);

  // Whenever the dropdown opens, seed pending from what's actually applied.
  // This also handles external changes (e.g. Clear all) syncing back in.
  useEffect(() => {
    if (open) { setPending(new Set(selected)); setSearch(''); }
  }, [open, selected]);

  const visibleOptions = search.trim()
    ? options.filter(o => o.label.toLowerCase().includes(search.trim().toLowerCase()))
    : options;

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const appliedCount = selected.size;
  const hasApplied = appliedCount > 0;

  let displayLabel = label;
  if (appliedCount === 1) {
    const singleValue = Array.from(selected)[0];
    const option = options.find(o => o.value === singleValue);
    if (option) {
      displayLabel = option.label;
    }
  }

  function togglePending(value) {
    setPending(prev => {
      if (singleSelect) {
        return new Set([value]);
      }
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }

  function reset() {
    // Unlike checkbox toggles, Reset commits immediately — clearing a filter
    // should be visible right away, not require a separate "Show results".
    setPending(new Set());
    onApply(new Set());
  }

  function showResults() {
    onApply(pending);
    setOpen(false);
  }

  return (
    <div className={`${styles.dropdown} ${open ? styles.open : ''}`} ref={ref}>
      <button
        className={`${styles.btn} ${hasApplied ? styles.active : ''}`}
        onClick={() => setOpen(o => !o)}
        type="button"
      >
        {displayLabel}
        {appliedCount > 1 && <span className={styles.count}>{appliedCount}</span>}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
      </button>
      {open && (
        <div className={styles.menu}>
          {options.length > SEARCH_THRESHOLD && (
            <div className={styles.searchWrap}>
              <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input
                type="text"
                className={styles.search}
                placeholder={`Search ${label.toLowerCase()}...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                autoFocus
              />
            </div>
          )}
          <div className={styles.menuList}>
            {visibleOptions.length === 0 ? (
              <div className={styles.menuEmpty}>{options.length === 0 ? 'No options available' : 'No matches'}</div>
            ) : (
              visibleOptions.map(opt => (
                <label key={opt.value} className={styles.option}>
                  <input
                    type={singleSelect ? "radio" : "checkbox"}
                    name={singleSelect ? label : undefined}
                    value={opt.value}
                    checked={pending.has(opt.value)}
                    onClick={(e) => {
                      if (singleSelect && pending.has(opt.value)) {
                        setPending(new Set());
                      }
                    }}
                    onChange={() => togglePending(opt.value)}
                  />
                  <span>{opt.label}</span>
                </label>
              ))
            )}
          </div>
          <div className={styles.menuFooter}>
            <button
              type="button"
              className={styles.resetBtn}
              onClick={reset}
              disabled={pending.size === 0}
            >
              Reset
            </button>
            <button
              type="button"
              className={styles.showBtn}
              onClick={showResults}
            >
              Show results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
