import { useState, useRef, useEffect } from 'react';
import styles from './FilterBar.module.css';

export default function FilterDropdown({ label, options, selected, onToggle }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const count = selected.size;
  const hasSel = count > 0;

  return (
    <div className={`${styles.dropdown} ${open ? styles.open : ''}`} ref={ref}>
      <button
        className={`${styles.btn} ${hasSel ? styles.active : ''}`}
        onClick={() => setOpen(o => !o)}
        type="button"
      >
        {label}
        {hasSel && <span className={styles.count}>{count}</span>}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
      </button>
      {open && (
        <div className={styles.menu}>
          {options.map(opt => (
            <label key={opt.value} className={styles.option}>
              <input
                type="checkbox"
                value={opt.value}
                checked={selected.has(opt.value)}
                onChange={() => onToggle(opt.value)}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
