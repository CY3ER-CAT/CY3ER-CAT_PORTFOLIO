import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  return (
    <main id="main" className="shell min-h-[80vh] grid place-items-center pt-32 pb-16 text-center">
      <div>
        <svg viewBox="0 0 64 64" className="w-24 mx-auto" aria-hidden>
          <g fill="none" stroke="var(--c-border-strong)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 22 L14 14 L22 17" />
            <path d="M50 22 L50 14 L42 17" />
            <path d="M14 22 Q14 46 32 50 Q50 46 50 22" />
          </g>
          <g fill="var(--c-text-muted)">
            <path d="M21 30 l5 3 l-5 3 l-2 -3 z" />
            <path d="M43 30 l-5 3 l5 3 l2 -3 z" />
          </g>
        </svg>
        <h1 className="font-display text-4xl font-semibold mt-8">This path doesn't exist.</h1>
        <p className="text-muted mt-4 max-w-md mx-auto">
          Even the cyber cat couldn't find this page. It may have been moved, or the link is a typo.
        </p>
        <div className="mt-9 flex justify-center gap-4">
          <Button href="/" arrow>
            Back home
          </Button>
          <Link
            to="/projects/agri-detect"
            className="inline-flex items-center rounded-full border border-[var(--c-border-strong)] px-7 py-3 font-display text-sm hover:border-cyan hover:text-cyan transition-colors"
          >
            View AGRI-DETECT
          </Link>
        </div>
      </div>
    </main>
  );
}
