import { useCallback, useEffect, useState } from 'react';

const KEY = 'cybercat:lite';

function initial(): boolean {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(KEY) === '1';
}

/**
 * Lite Mode — swaps the WebGL scene for a lightweight 2D emblem and
 * disables decorative animation. Persisted across visits.
 */
export function useLiteMode() {
  const [lite, setLite] = useState<boolean>(initial);

  useEffect(() => {
    document.documentElement.dataset.lite = String(lite);
    try {
      window.localStorage.setItem(KEY, lite ? '1' : '0');
    } catch {
      /* storage unavailable — choice simply won't persist */
    }
  }, [lite]);

  const toggle = useCallback(() => setLite((v) => !v), []);
  return { lite, toggle };
}
