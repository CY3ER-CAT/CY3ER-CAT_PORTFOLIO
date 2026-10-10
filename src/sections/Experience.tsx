import { Github } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Reveal } from '../components/ui/Reveal';
import { timeline } from '../data/portfolio';

/**
 * Education (from the CV) followed by a build log: every project entry is
 * anchored to a public repository and its real GitHub dates. Employment
 * entries are added only when there is a real role to list.
 */
export function Experience() {
  return (
    <section id="experience" className="section" aria-label="Experience and build log">
      <div className="shell relative read-scrim read-scrim--both">
        <div className="aura" aria-hidden style={{ width: 380, height: 380, top: '10%', right: '-10%', background: 'var(--c-glow-violet)' }} />

        {/* pinned title column — stays while the build log scrolls beside it */}
        <div className="grid lg:grid-cols-[0.92fr_1.35fr] gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              index="04"
              eyebrow="Trajectory"
              title={<>Education and a <span className="text-cyan">build log</span>.</>}
              lead="Real schooling, then what was built, when it shipped, and where the receipts live."
            />
          </div>

          <ol className="relative max-w-3xl">
            {/* spine */}
            <span aria-hidden className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--c-border-strong)]" />

            {timeline.map((entry, i) => (
              <Reveal key={entry.title} as="li" delay={i * 0.05}>
                <div className="relative pl-10 pb-10 last:pb-0">
                  <span
                    aria-hidden
                    className="absolute left-0 top-1.5 grid h-[15px] w-[15px] place-items-center rounded-full border border-[var(--c-border-strong)] bg-[var(--c-bg)]"
                  >
                    <span
                      className="h-[5px] w-[5px] rounded-full"
                      style={{ background: entry.kind === 'project' ? 'var(--c-cyan)' : 'var(--c-violet)' }}
                    />
                  </span>
                  <p className="font-mono text-[0.68rem] tracking-[0.2em] uppercase text-muted">{entry.date}</p>
                  <h3 className="font-display font-semibold text-[1.05rem] mt-1.5">{entry.title}</h3>
                  <p className="text-muted text-sm mt-1 leading-relaxed">{entry.detail}</p>
                  {entry.link && (
                    <a
                      href={entry.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 text-xs font-display text-cyan mt-2 hover:underline underline-offset-4"
                    >
                      <Github size={13} aria-hidden /> View repository
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal>
          <p className="text-muted text-sm mt-10 max-w-xl border-l-2 border-[var(--c-border-strong)] pl-4">
            Education entries come from my CV. Project entries are anchored to public repositories and their real
            GitHub dates; employment is added only when there is a real role to list.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
