import { useState, useRef, useEffect } from 'react';
import styles from './FilterBar.module.css';

export default function TagSearchDropdown({ label, placeholder, emptyText, options, onAdd }) {
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

  const searchLower = search.trim().toLowerCase();
  
  // Handle common abbreviations that users might type
  const searchAliases = [searchLower];
  if (searchLower === 'india') searchAliases.push('ind');
  if (searchLower === 'us' || searchLower === 'usa') searchAliases.push('united states');
  if (searchLower === 'uk') searchAliases.push('united kingdom');

  const visibleOptions = searchLower
    ? options
        .filter(o => {
          const labelLower = o.label.toLowerCase();
          return searchAliases.some(alias => labelLower.includes(alias));
        })
        .sort((a, b) => {
          const aLabel = a.label.toLowerCase();
          const bLabel = b.label.toLowerCase();
          
          // 1. Prioritize if the entire string starts with the search term
          const aStarts = searchAliases.some(alias => aLabel.startsWith(alias));
          const bStarts = searchAliases.some(alias => bLabel.startsWith(alias));
          if (aStarts && !bStarts) return -1;
          if (!aStarts && bStarts) return 1;
          
          // 2. Prioritize if any word starts with the search term (e.g. "San Francisco" when typing "F")
          const aWordStarts = searchAliases.some(alias => aLabel.split(/[\s,;-]+/).some(w => w.startsWith(alias)));
          const bWordStarts = searchAliases.some(alias => bLabel.split(/[\s,;-]+/).some(w => w.startsWith(alias)));
          if (aWordStarts && !bWordStarts) return -1;
          if (!aWordStarts && bWordStarts) return 1;

          // 3. Keep original alphabetical sort as fallback
          return aLabel.localeCompare(bLabel);
        })
    : [];

  const exactMatch = visibleOptions.some(o => 
    searchAliases.some(alias => o.label.toLowerCase() === alias)
  );

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
        {label}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
      </button>
      {open && (
        <div className={styles.menu} style={{ minWidth: '280px' }}>
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input
              type="text"
              className={styles.search}
              placeholder={placeholder || `Search or add ${label.toLowerCase()}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>
          <div className={styles.menuList}>
            {!search.trim() ? (
               <div className={styles.menuEmpty}>{emptyText || `Type to search ${label.toLowerCase()}...`}</div>
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
