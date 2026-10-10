import { lazy, Suspense, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { setLenis, getLenis } from '../utils/scroll';
import { useAppState } from './context';
import { catGesture } from '../three/catGesture';

gsap.registerPlugin(ScrollTrigger);

/* the whole WebGL stack is code-split — it loads only after first paint */
const CatJourney = lazy(() =>
  import('../three/CatJourney').then((m) => ({ default: m.CatJourney }))
);

/**
 * Global shell: navbar, routed content, footer, Lenis smooth scrolling
 * (skipped for reduced motion / lite mode) and the fine-pointer cursor glow.
 */
export function App() {
  const { theme, onThemeToggle, lite, onLiteToggle, onSceneReady } = useAppState();
  const reduced = useReducedMotion();
  const { pathname } = useLocation();
  const cursorRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  /* Lenis smooth scroll, driven by the GSAP ticker so ScrollTrigger stays in sync */
  useEffect(() => {
    if (reduced || lite) return;
    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1 });
    setLenis(lenis);
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, [reduced, lite]);

  /* reset scroll on route change */
  useEffect(() => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => window.clearTimeout(id);
  }, [pathname]);

  /* scroll progress — a 2px hairline that fills as the film plays */
  useEffect(() => {
    if (reduced || lite) return;
    const el = progressRef.current;
    if (!el) return;
    const tween = gsap.fromTo(
      el,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced, lite]);

  /* cursor glow — fine pointers only, never hides the native cursor */
  useEffect(() => {
    if (reduced || lite) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const el = cursorRef.current;
    if (!el) return;

    let raf = 0;
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    const move = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      el.classList.add('is-live');
      /* grow over anything interactive — the file's cursor behaviour */
      const t = e.target as Element | null;
      const interactive = !!t && !!t.closest && !!t.closest('a, button, [role="button"], input, textarea, select, label, summary');
      el.classList.toggle('is-hover', interactive);
    };
    const press = () => el.classList.add('is-press');
    const release = () => el.classList.remove('is-press');
    const leave = () => el.classList.remove('is-live');
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.2;
      pos.y += (target.y - pos.y) * 0.2;
      el.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      /* grow into a poke target while the pointer is near the cat */
      el.classList.toggle('is-cat', catGesture.hover > 0.5);
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', press);
    window.addEventListener('pointerup', release);
    document.documentElement.addEventListener('pointerleave', leave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', press);
      window.removeEventListener('pointerup', release);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, [reduced, lite]);

  return (
    <div className="grain min-h-screen flex flex-col">
      {/* cinematic film: fixed 3D journey behind everything */}
      {!reduced && !lite && (
        <div
          ref={progressRef}
          aria-hidden
          className="fixed top-0 left-0 right-0 h-[2px] z-[70] origin-left pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, var(--c-cyan), var(--c-violet))',
            transform: 'scaleX(0)',
          }}
        />
      )}
      <Suspense fallback={null}>
        <CatJourney lite={lite} reducedMotion={reduced} onReady={onSceneReady} />
      </Suspense>
      <Navbar theme={theme} onThemeToggle={onThemeToggle} lite={lite} onLiteToggle={onLiteToggle} />
      <div id="main" tabIndex={-1} className="outline-none flex-1">
        <Outlet />
      </div>
      <Footer />
      {!reduced && !lite && <div ref={cursorRef} className="cursor-glow" aria-hidden />}
    </div>
  );
}
