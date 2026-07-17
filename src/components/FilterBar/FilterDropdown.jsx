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
export default function FilterDropdown({ label, options, selected, onApply }) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(() => new Set(selected));
  const ref = useRef(null);

  // Whenever the dropdown opens, seed pending from what's actually applied.
  // This also handles external changes (e.g. Clear all) syncing back in.
  useEffect(() => {
    if (open) setPending(new Set(selected));
  }, [open, selected]);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const appliedCount = selected.size;
  const hasApplied = appliedCount > 0;

  function togglePending(value) {
    setPending(prev => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }

  function reset() {
    // Clear the pending selections back to empty (does not commit until Show results)
    setPending(new Set());
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
        {label}
        {hasApplied && <span className={styles.count}>{appliedCount}</span>}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
      </button>
      {open && (
        <div className={styles.menu}>
          <div className={styles.menuList}>
            {options.length === 0 ? (
              <div className={styles.menuEmpty}>No options available</div>
            ) : (
              options.map(opt => (
                <label key={opt.value} className={styles.option}>
                  <input
                    type="checkbox"
                    value={opt.value}
                    checked={pending.has(opt.value)}
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
