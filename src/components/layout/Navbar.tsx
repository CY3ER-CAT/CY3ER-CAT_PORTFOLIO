import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navLinks, profile } from '../../data/portfolio';
import { useActiveSection } from '../../hooks/useActiveSection';
import { scrollToSection } from '../../utils/scroll';
import { ThemeToggle } from '../ui/ThemeToggle';
import { LiteModeToggle } from '../ui/LiteModeToggle';

const SECTION_IDS = ['home', 'about', 'projects', 'experience', 'contact'];

interface Props {
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
  lite: boolean;
  onLiteToggle: () => void;
}

export function Navbar({ theme, onThemeToggle, lite, onLiteToggle }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onHome = pathname === '/';
  const active = useActiveSection(SECTION_IDS, onHome);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* mobile menu: lock scroll + Escape + return focus */
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    const trigger = menuButtonRef.current;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      trigger?.focus();
    };
  }, [open]);

  const handleAnchor = (href: string, route?: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    if (route) {
      navigate(route);
      return;
    }
    if (!onHome) {
      // coming back from the case study — navigate home first, then scroll
      navigate('/');
      window.setTimeout(() => scrollToSection(href), 120);
    } else {
      scrollToSection(href);
    }
  };

  return (
    <>
      <a
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('main')?.focus();
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-[var(--c-bg-elevated)] focus:text-ink focus:px-4 focus:py-2 focus:rounded-full focus:border focus:border-[var(--c-border-strong)]"
      >
        Skip to content
      </a>

      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div className="shell">
          <nav
            aria-label="Primary"
            className={`flex items-center justify-between gap-4 rounded-full px-4 md:px-6 py-2.5 transition-all duration-500 ${
              scrolled ? 'glass shadow-[0_8px_40px_var(--c-shadow)]' : 'border border-transparent'
            }`}
          >
            <Link
              to="/"
              className="font-display font-semibold tracking-tight text-ink flex items-center gap-2.5"
              onClick={() => window.setTimeout(() => scrollToSection('#home'), 0)}
            >
              <svg width="26" height="26" viewBox="0 0 64 64" aria-hidden>
                <g fill="none" stroke="var(--c-cyan)" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 22 L14 14 L22 17" />
                  <path d="M50 22 L50 14 L42 17" />
                  <path d="M14 22 Q14 46 32 50 Q50 46 50 22" />
                </g>
                <g fill="var(--c-cyan)">
                  <path d="M21 30 l5 3 l-5 3 l-2 -3 z" />
                  <path d="M43 30 l-5 3 l5 3 l2 -3 z" />
                </g>
              </svg>
              {profile.handle}
            </Link>

            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, i) => {
                const isRoute = !!link.route;
                const isActive = isRoute ? pathname === link.route : onHome && active === link.href.slice(1);
                const inner = (
                  <>
                    <span aria-hidden className="font-mono text-[0.6rem] text-muted/70 mr-1.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {link.label}
                    <span
                      className="absolute left-3 right-3 -bottom-0.5 h-px bg-cyan transition-transform duration-300 origin-left"
                      style={{ transform: isActive ? 'scaleX(1)' : 'scaleX(0)' }}
                    />
                  </>
                );
                return (
                  <li key={link.label}>
                    {isRoute ? (
                      <Link
                        to={link.route!}
                        className="relative block text-sm font-display px-3 py-2 rounded-full transition-colors hover:text-ink"
                        style={{ color: isActive ? 'var(--c-cyan)' : 'var(--c-text-muted)' }}
                      >
                        {inner}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={handleAnchor(link.href)}
                        className="relative block text-sm font-display px-3 py-2 rounded-full transition-colors hover:text-ink"
                        style={{ color: isActive ? 'var(--c-cyan)' : 'var(--c-text-muted)' }}
                      >
                        {inner}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <span className="hidden xl:inline-flex items-center gap-2 rounded-full border border-[var(--c-border)] px-3 py-1.5 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" aria-hidden />
                Open to work
              </span>
              <ThemeToggle theme={theme} onToggle={onThemeToggle} />
              <LiteModeToggle lite={lite} onToggle={onLiteToggle} />
              <button
                ref={menuButtonRef}
                type="button"
                className="lg:hidden grid h-9 w-9 place-items-center rounded-full border border-[var(--c-border)] text-muted hover:text-cyan"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => setOpen(true)}
              >
                <Menu size={16} aria-hidden />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* full-screen mobile menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`fixed inset-0 z-[70] lg:hidden transition-[opacity,visibility] duration-400 ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{ background: 'var(--c-bg)' }}
      >
        <div className="absolute inset-0 opacity-[0.16]" aria-hidden>
          <div className="aura" style={{ width: 420, height: 420, top: '-8%', right: '-10%', background: 'var(--c-glow-cyan)' }} />
          <div className="aura" style={{ width: 360, height: 360, bottom: '-6%', left: '-8%', background: 'var(--c-glow-violet)' }} />
        </div>
        <div className="shell relative h-full flex flex-col">
          <div className="flex justify-end pt-7">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-11 w-11 place-items-center rounded-full border border-[var(--c-border-strong)] text-ink"
              aria-label="Close menu"
            >
              <X size={18} aria-hidden />
            </button>
          </div>
          <ul className="flex-1 flex flex-col justify-center gap-2">
            {navLinks.map((link, i) => (
              <li key={link.label}>
                {link.route ? (
                  <Link
                    to={link.route}
                    onClick={() => setOpen(false)}
                    className="block font-display text-3xl font-semibold py-3 text-ink hover:text-cyan transition-colors"
                    style={{ transitionDelay: `${i * 30}ms` }}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    onClick={handleAnchor(link.href)}
                    className="block font-display text-3xl font-semibold py-3 text-ink hover:text-cyan transition-colors"
                  >
                    <span className="text-sm text-muted font-body mr-3">0{i + 1}</span>
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <p className="pb-10 text-sm text-muted">
            {profile.name} — {profile.role}
          </p>
        </div>
      </div>
    </>
  );
}
