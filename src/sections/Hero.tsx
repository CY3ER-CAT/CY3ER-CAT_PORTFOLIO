import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Button } from '../components/ui/Button';
import { agriDetectCaseStudy, profile, projects } from '../data/portfolio';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { scrollToSection } from '../utils/scroll';

/* real numbers straight from the data file — nothing invented */
const stats = [
  { value: String(projects.length).padStart(2, '0'), label: 'public repos' },
  { value: String(agriDetectCaseStudy.languages.length).padStart(2, '0'), label: 'languages' },
  { value: agriDetectCaseStudy.stats[2].value, label: 'crop problems mapped' },
];

/**
 * Hero. The scene is the cinematic film's opening frame: the cyber-cat is
 * anchored lower-right of the viewport at full intensity while the camera is
 * face-on, and the copy sits top-left above a localized ink scrim — one giant
 * type block (Scrolltide discipline: tight leading, negative tracking), a
 * mono eyebrow, CTAs and real numbers. Two aurora glows drift slowly behind
 * on GPU transforms; the entry follows the single site-wide curve.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();

  /* periodic chromatic glitch on the heading — the file's signature flourish */
  useEffect(() => {
    if (reduced) return;
    if (document.documentElement.dataset.lite === 'true') return;
    const title = titleRef.current;
    if (!title) return;
    let t = 0;
    const fire = () => {
      title.classList.remove('glitch');
      void title.offsetWidth; // restart the animation cleanly
      title.classList.add('glitch');
      t = window.setTimeout(fire, 5000 + Math.random() * 6000);
    };
    t = window.setTimeout(fire, 2600);
    return () => window.clearTimeout(t);
  }, [reduced]);

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      /* aurora drift — transform-only, GPU composited */
      gsap.to('[data-aurora="a"]', {
        x: () => gsap.utils.random(-46, 46),
        y: () => gsap.utils.random(-30, 30),
        scale: 1.12,
        duration: 13,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
      gsap.to('[data-aurora="b"]', {
        x: () => gsap.utils.random(-36, 36),
        y: () => gsap.utils.random(-42, 42),
        scale: 1.18,
        duration: 17,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .fromTo('[data-hero="kicker"]', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.75 }, 0)
        .fromTo('[data-hero="eyebrow"]', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.75 }, 0.06)
        .fromTo('[data-hero="title"] > span', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.06 }, 0.12)
        .fromTo('[data-hero="sub"]', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.75 }, 0.3)
        .fromTo('[data-hero="cta"]', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.06 }, 0.36)
        .fromTo('[data-hero="stats"]', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.75 }, 0.44)
        .fromTo('[data-hero="meta"]', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.75 }, 0.52);
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="home"
      ref={root}
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* precise grid + aurora glows — GPU drift behind the film canvas */}
      <div className="gridlines" aria-hidden />
      <div
        data-aurora="a"
        className="aura"
        aria-hidden
        style={{ width: 560, height: 560, top: '-16%', right: '2%', background: 'var(--c-glow-cyan)' }}
      />
      <div
        data-aurora="b"
        className="aura"
        aria-hidden
        style={{ width: 500, height: 500, bottom: '-14%', left: '-10%', background: 'var(--c-glow-violet)' }}
      />

      <div className="shell relative z-10 read-scrim pt-32 pb-24 w-full">
        <div className="max-w-2xl">
          <p className="font-mono text-[0.78rem] tracking-[0.08em] text-cyan" data-hero="kicker">
            {'// system.online — hello_world();'}
          </p>

          <p className="eyebrow mt-7" data-hero="eyebrow">
            {profile.role}
          </p>

          <h1
            ref={titleRef}
            className="text-[length:var(--fs-hero)] font-bold mt-6 uppercase tracking-[-0.03em] leading-[0.95]"
            data-hero="title"
          >
            <span className="block">Building intelligent</span>
            <span className="block">
              experiences{' '}
              <em className="font-accent italic font-normal normal-case text-cyan">beyond</em>
            </span>
            <span className="block">the screen.</span>
          </h1>

          <p className="text-muted mt-7 text-[1.04rem] leading-relaxed max-w-xl" data-hero="sub">
            {profile.heroSub}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-9">
            <span data-hero="cta">
              <Button arrow onClick={() => scrollToSection('#projects')}>
                Explore my work
              </Button>
            </span>
            <span data-hero="cta">
              <Button variant="secondary" onClick={() => scrollToSection('#contact')}>
                Get in touch
              </Button>
            </span>
          </div>

          {/* real numbers, mono, tabular */}
          <dl className="flex flex-wrap gap-x-10 gap-y-4 mt-12" data-hero="stats">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-mono text-[1.75rem] leading-none font-medium text-cyan tabular-nums">{s.value}</dt>
                <dd className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-muted mt-2">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* availability + scroll cue */}
      <div className="absolute bottom-6 inset-x-0 shell flex items-end justify-between z-10" data-hero="meta">
        <p className="hidden md:flex items-center gap-2.5 font-mono text-[0.72rem] tracking-[0.12em] uppercase text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
          Available for new projects
        </p>

        <button
          type="button"
          onClick={() => scrollToSection('#about')}
          className="flex flex-col items-center gap-2 text-muted hover:text-cyan transition-colors mx-auto md:mx-0"
          aria-label="Scroll to the About section"
        >
          <span className="text-[0.66rem] font-mono tracking-[0.3em] uppercase">Scroll</span>
          <span className="block w-px h-8 overflow-hidden" aria-hidden>
            <span className="block w-px h-4 bg-cyan animate-[scrollhint_1.8s_ease-in-out_infinite]" />
          </span>
        </button>
      </div>

      <style>{`
        @keyframes scrollhint {
          0% { transform: translateY(-100%) }
          60%, 100% { transform: translateY(320%) }
        }
        @media (prefers-reduced-motion: reduce) { .animate-\\[scrollhint_1\\.8s_ease-in-out_infinite\\] { animation: none } }
      `}</style>

      {/* ghost watermark — branded whisper mark in the film's bottom corner */}
      <span
        aria-hidden
        className="absolute bottom-1 right-4 hidden md:block z-[5] font-display font-bold uppercase select-none pointer-events-none leading-[0.8] tracking-[-0.06em]"
        style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: 'rgba(255, 240, 230, 0.05)' }}
      >
        CAT
      </span>
    </section>
  );
}