import { useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Branded loading veil duration (ms) — requested: 3 seconds. */
const LOAD_MS = 3000;

/**
 * CY3ER-CAT loading screen: blinking cat eyes + wordmark + progress line.
 * Runs a full 3 seconds on every hard page load, then fades out. SPA route
 * changes never remount the root, so it never appears mid-navigation.
 * The progress bar tracks real elapsed time — no fake downloads.
 */
export function PageLoader({ sceneReady }: { sceneReady: boolean }) {
  const [done, setDone] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = () => {
      const elapsed = performance.now() - start;
      const bar = document.getElementById('loader-bar');
      if (bar) {
        // honest indicator: elapsed time drives the bar
        bar.style.transform = `scaleX(${Math.min(1, elapsed / LOAD_MS)})`;
      }
      if (elapsed >= LOAD_MS) {
        // positions may have shifted while covered — re-measure triggers once
        ScrollTrigger.refresh();
        setClosing(true);
        window.setTimeout(() => setDone(true), 550);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* keep ScrollTrigger measurements honest when the scene mounts underneath */
  useEffect(() => {
    if (sceneReady) ScrollTrigger.refresh();
  }, [sceneReady]);

  if (done) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-8 transition-opacity duration-500"
      style={{ background: 'var(--c-bg)', opacity: closing ? 0 : 1 }}
    >
      {/* blinking cat eyes */}
      <svg width="120" height="54" viewBox="0 0 120 54" fill="none">
        <g stroke="var(--c-border-strong)" strokeWidth="2">
          <path d="M8 12 L30 6 L46 26 L30 46 L8 40 Z" fill="var(--c-bg-elevated)" />
          <path d="M112 12 L90 6 L74 26 L90 46 L112 40 Z" fill="var(--c-bg-elevated)" />
        </g>
        <g fill="var(--c-cyan)" className="cc-blink">
          <path d="M18 20 L34 26 L18 32 L14 26 Z" />
          <path d="M102 20 L86 26 L102 32 L106 26 Z" />
        </g>
      </svg>

      <p className="font-display font-semibold tracking-[0.35em] text-sm uppercase text-ink">CY3ER-CAT</p>

      {/* boot line — the file's signature touch */}
      <div className="flex flex-col items-center gap-3" role="presentation">
        <p className="font-mono text-[0.72rem] tracking-[0.26em] select-none" style={{ color: 'var(--c-cyan)' }}>
          // WAKING CAT_UNIT_01
        </p>
        <div className="w-56 h-px bg-[var(--c-border)] overflow-hidden rounded-full" role="presentation">
          <div
            id="loader-bar"
            className="h-full w-full origin-left"
            style={{ background: 'linear-gradient(90deg, var(--c-cyan), var(--c-violet))', transform: 'scaleX(0)' }}
          />
        </div>
      </div>

      <style>{`
        @keyframes cc-blink {
          0%, 88%, 100% { transform: scaleY(1); }
          92%, 96% { transform: scaleY(0.08); }
        }
        .cc-blink { animation: cc-blink 2.4s ease-in-out infinite; transform-origin: 26px 26px; }
        @media (prefers-reduced-motion: reduce) { .cc-blink { animation: none; } }
      `}</style>
    </div>
  );
}
