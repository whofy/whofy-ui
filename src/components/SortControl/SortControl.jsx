import { useState, useRef, useEffect } from 'react';
import styles from './SortControl.module.css';

export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Best match' },
  { value: 'newest',    label: 'Newest first' },
  { value: 'companyAZ', label: 'Company (A-Z)' }
];

export default function SortControl({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const current = SORT_OPTIONS.find(o => o.value === value) || SORT_OPTIONS[0];

  return (
    <div className={`${styles.wrap} ${open ? styles.open : ''}`} ref={ref}>
      <button
        className={styles.trigger}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        type="button"
      >
        <span className={styles.label}>Sort:</span>
        <span className={styles.value}>{current.label}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
      </button>
      {open && (
        <ul className={styles.menu} role="listbox">
          {SORT_OPTIONS.map(opt => (
            <li key={opt.value}>
              <button
                type="button"
                className={`${styles.option} ${opt.value === value ? styles.selected : ''}`}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                role="option"
                aria-selected={opt.value === value}
              >
                {opt.label}
                {opt.value === value && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
