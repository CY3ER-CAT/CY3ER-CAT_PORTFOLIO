import { Github, ArrowUp } from 'lucide-react';
import { profile, socials } from '../../data/portfolio';
import { scrollToTop } from '../../utils/scroll';

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--c-border)]">
      <div className="shell py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <p className="font-display font-semibold text-lg tracking-tight flex items-center justify-center md:justify-start gap-2">
            {profile.handle}
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden />
          </p>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted mt-2">
            © {new Date().getFullYear()} {profile.name} — engineered with Three.js · GSAP · a small cyber cat
          </p>
        </div>

        <nav aria-label="Social links" className="flex items-center gap-5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-cyan transition-colors"
            >
              {s.label === 'GitHub' && <Github size={16} aria-hidden />}
              {s.label}
            </a>
          ))}
          <button
            type="button"
            onClick={scrollToTop}
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--c-border-strong)] text-muted hover:text-cyan hover:border-cyan transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp size={16} aria-hidden />
          </button>
        </nav>
      </div>
    </footer>
  );
}
