import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import styles from './Dropdown.module.css';

const Dropdown = forwardRef(({ 
  id,
  name, 
  options, 
  value, 
  onChange, 
  placeholder = 'Select an option...',
  required = false
}, ref) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      triggerRef.current?.focus();
    }
  }));

  useEffect(() => {
    function handle(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const selectedOption = options.find(o => o.value === value);

  return (
    <div className={`${styles.wrap} ${open ? styles.open : ''}`} ref={containerRef}>
      {/* Hidden input for form submission */}
      {name && (
        <input 
          type="hidden" 
          name={name} 
          value={value} 
          required={required} 
          id={id}
        />
      )}
      
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={required && !value ? "true" : "false"}
      >
        <span className={value ? styles.value : styles.placeholder}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 8l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <ul className={styles.menu} role="listbox">
          {options.map(opt => (
            <li key={opt.value}>
              <button
                type="button"
                className={`${styles.option} ${opt.value === value ? styles.selected : ''}`}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                role="option"
                aria-selected={opt.value === value}
              >
                {opt.label}
                {opt.value === value && (
                  <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

Dropdown.displayName = 'Dropdown';

export default Dropdown;
