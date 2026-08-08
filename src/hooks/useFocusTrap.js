import { useEffect } from 'react';

export function useFocusTrap(ref, active) {
  useEffect(() => {
    if (!active || !ref.current) return;

    const el = ref.current;
    const focusable = () => el.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    function handleKeyDown(e) {
      if (e.key !== 'Tab') return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    el.addEventListener('keydown', handleKeyDown);
    const items = focusable();
    if (items.length) items[0].focus();

    return () => el.removeEventListener('keydown', handleKeyDown);
  }, [ref, active]);
}
