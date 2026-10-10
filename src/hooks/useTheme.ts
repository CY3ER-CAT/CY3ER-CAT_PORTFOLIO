import { useCallback, useEffect, useState } from 'react';

const KEY = 'cybercat:theme';
type Theme = 'dark' | 'light';

function initial(): Theme {
  if (typeof window === 'undefined') return 'dark';
  return window.localStorage.getItem(KEY) === 'light' ? 'light' : 'dark';
}

/** Dark "Cyber Cat" by default; light theme re-tuned for contrast. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initial);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0A0B10' : '#F3F5FA');
    try {
      window.localStorage.setItem(KEY, theme);
    } catch {
      /* storage unavailable */
    }
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);
  return { theme, toggle };
}
