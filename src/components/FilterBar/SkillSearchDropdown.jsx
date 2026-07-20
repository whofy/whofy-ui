import { useState, useRef, useEffect } from 'react';
import styles from './FilterBar.module.css';

export default function SkillSearchDropdown({ options, onAdd }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const visibleOptions = search.trim()
    ? options.filter(o => o.label.toLowerCase().includes(search.trim().toLowerCase()))
    : [];

  const exactMatch = visibleOptions.some(o => o.label.toLowerCase() === search.trim().toLowerCase());

  function handleAdd(val) {
    onAdd(val);
    setSearch('');
    setOpen(false); // Close after adding so they can see the tag
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && search.trim()) {
      handleAdd(search.trim());
    }
  }

  return (
    <div className={`${styles.dropdown} ${open ? styles.open : ''}`} ref={ref}>
      <button
        className={`${styles.btn}`}
        onClick={() => setOpen(o => {
          if (!o) setSearch(''); // reset search on open
          return !o;
        })}
        type="button"
      >
        Skills
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
      </button>
      {open && (
        <div className={styles.menu} style={{ minWidth: '280px' }}>
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input
              type="text"
              className={styles.search}
              placeholder="Search or add skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>
          <div className={styles.menuList}>
            {!search.trim() ? (
               <div className={styles.menuEmpty}>Type to search skills...</div>
            ) : (
              <>
                {visibleOptions.map(opt => (
                  <label key={opt.value} className={styles.option} onClick={() => handleAdd(opt.value)} style={{cursor: 'pointer'}}>
                    <span>{opt.label}</span>
                  </label>
                ))}
                {!exactMatch && (
                   <label className={styles.option} onClick={() => handleAdd(search.trim())} style={{cursor: 'pointer', color: 'var(--primary)'}}>
                     <span>Add "{search.trim()}"</span>
                   </label>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
