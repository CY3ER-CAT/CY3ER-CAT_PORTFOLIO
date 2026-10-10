import { useLayoutEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  text: string;
  className?: string;
}

/**
 * Scrub-reveal paragraph: words start faint and light up sequentially as you
 * scroll through the block (GSAP ScrollTrigger scrub). Under reduced motion the
 * paragraph renders fully visible and nothing animates.
 */
export function ScrubText({ text, className }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const words = useMemo(() => text.split(/(\s+)/), [text]);

  useLayoutEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const targets = Array.from(el.querySelectorAll<HTMLSpanElement>('.scrub-word'));
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.to(targets, {
        opacity: 1,
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
          end: 'bottom 45%',
          scrub: 0.6,
        },
      });
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) =>
        w.trim() === '' ? (
          <span key={i}>{w}</span>
        ) : (
          <span key={i} className="scrub-word" style={{ opacity: reduced ? 1 : 0.16 }}>
            {w}
          </span>
        )
      )}
    </p>
  );
}