import { useLayoutEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: ReactNode;
  /** seconds of delay before the reveal starts once visible */
  delay?: number;
  /** distance in px the element travels up */
  distance?: number;
  className?: string;
  as?: 'div' | 'li' | 'article' | 'section';
}

/**
 * Scroll-into-view fade/slide reveal built on GSAP ScrollTrigger.
 * Falls back to instantly-visible content under prefers-reduced-motion.
 * The gsap.context scoping prevents duplicate triggers on hot reload.
 */
export function Reveal({ children, delay = 0, distance = 16, className, as = 'div' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: distance },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          delay,
          ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [reduced, delay, distance]);

  const Tag = as as 'div';
  return (
    <Tag ref={ref} className={className} style={reduced ? undefined : { visibility: 'hidden' }}>
      {children}
    </Tag>
  );
}
