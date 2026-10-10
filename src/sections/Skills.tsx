import type { CSSProperties } from 'react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Reveal } from '../components/ui/Reveal';
import { TechChipList } from '../components/ui/TechChip';
import { skillGroups } from '../data/portfolio';

/* real, repo-backed facts orbiting the section heading (decorative, aria-hidden) */
const orbitSkills = [
  skillGroups[0].skills[4], // React
  skillGroups[1].skills[0], // TensorFlow.js
  skillGroups[2].skills[0], // Three.js
  skillGroups[3].skills[0], // Offline-first PWA
  skillGroups[2].skills[2], // GSAP + ScrollTrigger
  skillGroups[4].skills[2], // Vite
  '8 languages',
  '317 problems',
];

/**
 * Skills shown as an "orbit map": each category is a station card with its
 * chips, crowned by the spinning ember skill ring. Fully readable with
 * animations disabled — chips are plain lists and the orbit is decorative.
 */
export function Skills() {
  return (
    <section id="skills" className="section" aria-label="Skills">
      <div className="shell relative read-scrim">
        <div className="aura" aria-hidden style={{ width: 420, height: 420, bottom: '0', right: '-8%', background: 'var(--c-glow-cyan)' }} />

        <SectionHeading
          index="02"
          eyebrow="Toolkit"
          title={<>Skills mapped to <span className="text-cyan">shipped work</span>.</>}
          lead="Each area below maps to shipped work or completed training — nothing aspirational. Hover a chip to see it glow; no animation is required to read this list."
        />

        {/* ember orbit — the file's turning skill ring */}
        <div className="orbit" role="presentation" aria-hidden>
          <div className="ring">
            {orbitSkills.map((label, i) => (
              <span key={label} style={{ '--i': i } as CSSProperties}>
                {label}
              </span>
            ))}
          </div>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ listStyle: 'none' }}>
          {skillGroups.map((group, i) => (
            <Reveal key={group.category} as="li" delay={i * 0.06} className={i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}>
              <article className="card p-6 h-full">
                <p className="font-mono text-[0.68rem] tracking-[0.2em] text-muted uppercase">
                  <span className="text-cyan">{String(i + 1).padStart(2, '0')}</span> / {group.category}
                </p>
                <p className="text-sm text-muted mt-2 leading-relaxed">{group.blurb}</p>
                <TechChipList labels={group.skills} className="mt-5" />
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
