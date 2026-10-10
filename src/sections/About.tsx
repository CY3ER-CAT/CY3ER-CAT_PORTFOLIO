import { Sparkles, Leaf, Compass } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { ScrubText } from '../components/ui/ScrubText';
import { profile } from '../data/portfolio';
import { scrollToSection } from '../utils/scroll';

const facets = [
  {
    icon: Leaf,
    title: 'What I build',
    body: 'Practical AI tools that work offline, business sites that ship, and interactive experiences that feel alive — like AGRI-DETECT, a crop-health assistant that runs a neural network inside the browser.',
  },
  {
    icon: Compass,
    title: 'How I work',
    body: 'Start from the real constraint — no signal in a field, a gift that must feel personal, a business that needs trust — then design the engineering around it. Ship small, refine relentlessly.',
  },
  {
    icon: Sparkles,
    title: 'Why CY3ER-CAT',
    body: 'Curiosity with a signature. I like giving interfaces a personality of their own — a cyber cat that watches your cursor, a garden that blooms behind a secret code.',
  },
];

export function About() {
  return (
    <section id="about" className="section" aria-label="About me">
      <div className="shell relative read-scrim">
        <div className="aura" aria-hidden style={{ width: 380, height: 380, top: '0', left: '-10%', background: 'var(--c-glow-violet)' }} />

        <SectionHeading index="01" eyebrow="About" title={<>A developer who ships <span className="text-cyan">working products</span>, not demos.</>} />

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-start">
          <Reveal>
            <div>
              <ScrubText text={profile.about} className="text-[1.05rem] leading-relaxed" />

              <ul className="mt-10 space-y-8">
                {facets.map((f) => (
                  <li key={f.title} className="flex gap-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[var(--c-border)] bg-[var(--c-bg-elevated)] text-cyan transition-colors hover:border-cyan/60">
                      <f.icon size={18} aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-display font-semibold text-[1.05rem]">{f.title}</h3>
                      <p className="text-muted text-sm leading-relaxed mt-1.5">{f.body}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Button variant="secondary" arrow onClick={() => scrollToSection('#projects')}>
                  See the projects
                </Button>
              </div>
            </div>
          </Reveal>

          {/* cyber-cat monogram card */}
          <Reveal delay={0.15}>
            <aside className="card p-8 relative overflow-hidden" aria-label="CY3ER-CAT identity card">
              <div className="aura" aria-hidden style={{ width: 220, height: 220, top: '-20%', right: '-15%', background: 'var(--c-glow-cyan)' }} />
              <svg viewBox="0 0 220 220" className="w-full max-w-[240px] mx-auto" role="img" aria-label="Stylized cyber cat monogram">
                <ellipse cx="110" cy="118" rx="92" ry="26" fill="none" stroke="var(--c-violet)" strokeWidth="1" opacity="0.5" />
                <g fill="var(--c-bg-elevated-2)" stroke="var(--c-cyan)" strokeWidth="2" strokeLinejoin="round">
                  <path d="M52 78 L52 40 L84 60 Z" />
                  <path d="M168 78 L168 40 L136 60 Z" />
                  <path d="M52 78 Q52 136 110 154 Q168 136 168 78 Q168 52 110 48 Q52 52 52 78 Z" />
                </g>
                <g fill="var(--c-cyan)">
                  <path d="M76 92 l20 8 l-20 8 l-5 -8 z" />
                  <path d="M144 92 l-20 8 l20 8 l5 -8 z" />
                </g>
                <path d="M106 126 h8 l-4 6 z" fill="var(--c-violet)" />
              </svg>
              <p className="font-display text-sm tracking-[0.25em] uppercase text-center mt-6">{profile.handle}</p>
              <p className="text-muted text-xs text-center mt-2">Digital identity, engineered.</p>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
