import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'whofy-theme';

function systemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function storedTheme() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'dark' || value === 'light' ? value : null;
  } catch {
    return null;
  }
}

/**
 * Current colour theme. An explicit choice is persisted; until the user makes
 * one, the theme follows the OS. index.html applies the same rule before
 * React mounts so the first paint is already correct.
 */
export function useTheme() {
  const [theme, setThemeState] = useState(
    () => document.documentElement.dataset.theme || storedTheme() || systemTheme()
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Follow OS changes only while the user hasn't picked a theme themselves.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => { if (!storedTheme()) setThemeState(systemTheme()); };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(STORAGE_KEY, next); } catch { /* private mode */ }
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
