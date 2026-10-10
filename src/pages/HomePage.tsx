import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Skills } from '../sections/Skills';
import { Projects } from '../sections/Projects';
import { Experience } from '../sections/Experience';
import { Contact } from '../sections/Contact';

export function HomePage() {
  return (
    <main className="overflow-x-hidden w-full max-w-full">
      <Hero />
      <div className="section-rule" aria-hidden />
      <About />
      <Skills />
      <div className="section-rule" aria-hidden />
      <Projects />
      <Experience />
      <div className="section-rule" aria-hidden />
      <Contact />
    </main>
  );
}