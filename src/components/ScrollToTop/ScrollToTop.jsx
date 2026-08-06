import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls the window to the top whenever navigation happens — both for
 * route changes AND for repeat clicks on the current route (which React
 * Router otherwise treats as a no-op).
 *
 * The route-change case is handled by watching `pathname` in an effect.
 * The same-route case is handled by intercepting clicks on `<a>` elements
 * whose href resolves to the current pathname, and forcing a scroll.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    function handleClick(e) {
      // Only left-clicks without modifier keys
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest('a[href]');
      if (!a) return;
      const href = a.getAttribute('href');
      // Ignore external links, hash links, mailto etc.
      if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) return;
      try {
        const url = new URL(a.href);
        if (url.pathname === window.location.pathname) {
          // Same-route click: React Router does nothing, so no route-change
          // effect fires above. Force scroll after the current click settles.
          setTimeout(() => window.scrollTo(0, 0), 0);
        }
      } catch { /* ignore */ }
    }
    // Capture phase so we run before React's synthetic click handling
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  return null;
}
