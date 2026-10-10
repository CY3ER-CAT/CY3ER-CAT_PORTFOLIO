import { SectionHeading } from '../components/ui/SectionHeading';
import { ProjectCard } from '../components/ui/ProjectCard';
import { FlowerLockDemo } from '../components/ui/FlowerLockDemo';
import { Reveal } from '../components/ui/Reveal';
import { projects } from '../data/portfolio';

export function Projects() {
  const featured = projects.find((p) => p.featured)!;
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section" aria-label="Selected projects">
      <div className="shell relative read-scrim">
        <div className="aura" aria-hidden style={{ width: 460, height: 460, top: '5%', left: '-12%', background: 'var(--c-glow-cyan)' }} />

        <SectionHeading
          index="03"
          eyebrow="Selected Work"
          title={<>Projects with <span className="text-cyan">real users</span> and real constraints.</>}
          lead="From an offline AI assistant for farmers to interactive gift worlds — each project below links to its public source and, where deployed, its live URL."
        />

        {/* featured case */}
        <ProjectCard project={featured} />

        {/* playable preview from the gift projects */}
        <Reveal>
          <div className="mt-6">
            <FlowerLockDemo />
          </div>
        </Reveal>

        {/* alternating editorial rows */}
        <ul className="mt-6 grid gap-6" style={{ listStyle: 'none' }}>
          {rest.map((p, i) => (
            <ProjectCard key={p.id} project={p} flip={i % 2 === 1} />
          ))}
        </ul>

        <Reveal>
          <p className="text-muted text-sm mt-8">
            Everything above lives on{' '}
            <a href="https://github.com/CY3ER-CAT/" target="_blank" rel="noreferrer noopener" className="link-quiet">
              github.com/CY3ER-CAT
            </a>{' '}
            — including small experiments not shown here.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
