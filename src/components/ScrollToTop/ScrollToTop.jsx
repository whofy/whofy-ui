import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets the window scroll to top whenever the route changes.
 * Router links (e.g. footer links) otherwise keep the previous scroll
 * position, which lands users at the bottom of the new page.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
