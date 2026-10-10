import { useEffect, useState } from 'react';

/**
 * Reports which section id is currently in view (for nav highlighting).
 * Uses IntersectionObserver with a small top offset bias so the section
 * nearest the navbar is considered active.
 */
export function useActiveSection(sectionIds: string[], enabled = true): string {
  const [active, setActive] = useState<string>(sectionIds[0] ?? '');

  useEffect(() => {
    if (!enabled) return;
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // pick the most visible entry; ties resolve to the one higher on the page
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (!best || entry.intersectionRatio > best.intersectionRatio) best = entry;
        }
        if (best && best.intersectionRatio > 0) {
          setActive((best.target as HTMLElement).id);
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.15, 0.4, 0.75] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [sectionIds, enabled]);

  return active;
}
