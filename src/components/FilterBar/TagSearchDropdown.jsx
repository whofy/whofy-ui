import { useState, useRef, useEffect } from 'react';
import styles from './FilterBar.module.css';

export default function TagSearchDropdown({ label, placeholder, emptyText, options, onAdd, onRemove, selectedCount = 0, selectedValues }) {
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

  const selected = selectedValues ? Array.from(selectedValues) : [];

  const searchLower = search.trim().toLowerCase();

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
        .filter(o => !selectedValues?.has(o.value))
        .sort((a, b) => {
          const aLabel = a.label.toLowerCase();
          const bLabel = b.label.toLowerCase();

          const aStarts = searchAliases.some(alias => aLabel.startsWith(alias));
          const bStarts = searchAliases.some(alias => bLabel.startsWith(alias));
          if (aStarts && !bStarts) return -1;
          if (!aStarts && bStarts) return 1;

          const aWordStarts = searchAliases.some(alias => aLabel.split(/[\s,;-]+/).some(w => w.startsWith(alias)));
          const bWordStarts = searchAliases.some(alias => bLabel.split(/[\s,;-]+/).some(w => w.startsWith(alias)));
          if (aWordStarts && !bWordStarts) return -1;
          if (!aWordStarts && bWordStarts) return 1;

          return aLabel.localeCompare(bLabel);
        })
    : [];

  const exactMatch = visibleOptions.some(o =>
    searchAliases.some(alias => o.label.toLowerCase() === alias)
  );

  function handleAdd(val) {
    onAdd(val);
    setSearch('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && search.trim()) {
      handleAdd(search.trim());
    }
  }

  return (
    <div className={`${styles.dropdown} ${open ? styles.open : ''}`} ref={ref}>
      <button
        className={`${styles.btn} ${selectedCount > 0 ? styles.active : ''}`}
        onClick={() => setOpen(o => {
          if (!o) setSearch('');
          return !o;
        })}
        type="button"
      >
        {label}
        {selectedCount > 0 && <span className={styles.count}>{selectedCount}</span>}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
      </button>
      {open && (
        <div className={styles.menu} style={{ minWidth: '280px' }}>
          {selected.length > 0 && (
            <div className={styles.selectedChips}>
              {selected.map(val => (
                <button
                  key={val}
                  className={styles.selectedChip}
                  onClick={() => onRemove?.(val)}
                  type="button"
                >
                  {val}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              ))}
            </div>
          )}
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
