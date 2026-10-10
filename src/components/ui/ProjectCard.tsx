import { Link } from 'react-router-dom';
import { Github, ArrowUpRight, FileText } from 'lucide-react';
import type { Project } from '../../types/portfolio';
import { TechChipList } from './TechChip';
import { ProjectVisual } from './ProjectVisual';
import { Reveal } from './Reveal';

interface Props {
  project: Project;
  /** alternate the visual/text sides for editorial rhythm */
  flip?: boolean;
}

export function ProjectCard({ project, flip = false }: Props) {
  const featured = !!project.featured;

  const links = (
    <div className="flex flex-wrap items-center gap-3 mt-6">
      <a
        href={project.repoUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="inline-flex items-center gap-2 text-sm font-display text-muted hover:text-cyan transition-colors"
      >
        <Github size={16} aria-hidden /> Source
      </a>
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 text-sm font-display text-muted hover:text-cyan transition-colors"
        >
          Live demo <ArrowUpRight size={16} aria-hidden />
        </a>
      ) : (
        <span className="inline-flex items-center gap-2 text-sm font-display text-muted opacity-60" title="No public demo deployed">
          No public demo
        </span>
      )}
      {project.caseStudyRoute && (
        <Link
          to={project.caseStudyRoute}
          className="inline-flex items-center gap-2 text-sm font-display text-cyan hover:underline underline-offset-4"
        >
          <FileText size={16} aria-hidden /> Case study
        </Link>
      )}
    </div>
  );

  /* Featured project: large composition with metric strip + animated ring. */
  if (featured) {
    return (
      <Reveal>
        <article className="group featured-ring card overflow-hidden" style={{ borderRadius: 'var(--radius-lg)' }}>
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[280px] lg:min-h-full">
              <ProjectVisual visual={project.visual} title={project.title} photo={project.photo} />
              <span className="absolute top-4 left-4 chip" style={{ borderColor: 'var(--c-cyan)', color: 'var(--c-cyan)' }}>
                Featured project
              </span>
            </div>
            <div className="p-7 md:p-10 flex flex-col justify-center">
              <p className="font-mono text-[0.72rem] tracking-[0.18em] uppercase text-muted">{project.tagline}</p>
              <h3 className="text-[length:var(--fs-h2)] font-semibold mt-2">{project.title}</h3>
              <p className="text-muted mt-4 text-[0.95rem]">{project.problem}</p>
              <p className="mt-3 text-[0.95rem]">{project.summary}</p>
              <TechChipList labels={project.technologies} className="mt-6" />
              {project.metrics && (
                <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                  {project.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="sr-only">{m.label}</dt>
                      <dd>
                        <span className="block font-mono text-2xl font-medium text-cyan tabular-nums">{m.value}</span>
                        <span className="block text-xs text-muted mt-1 leading-snug">{m.label}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
              {links}
            </div>
          </div>
        </article>
      </Reveal>
    );
  }

  /* Standard project: editorial split row, alternating sides. */
  return (
    <Reveal as="li">
      <article className="group card overflow-hidden grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]" style={{ borderRadius: 'var(--radius-md)' }}>
        <div className={`relative min-h-[200px] ${flip ? 'md:order-2' : ''}`}>
          <ProjectVisual visual={project.visual} title={project.title} photo={project.photo} />
          <span className="absolute top-3 right-3 font-mono text-[0.68rem] text-muted bg-[var(--c-glass)] px-2.5 py-1 rounded-full border border-[var(--c-border)]">
            {project.year}
          </span>
        </div>
        <div className="p-6 md:p-8">
          <p className="font-mono text-[0.72rem] tracking-[0.18em] uppercase text-muted">{project.tagline}</p>
          <h3 className="text-xl md:text-[1.35rem] font-semibold mt-2">{project.title}</h3>
          <p className="text-muted mt-3 text-sm leading-relaxed">{project.summary}</p>
          <TechChipList labels={project.technologies} className="mt-5" />
          {links}
        </div>
      </article>
    </Reveal>
  );
}
