/**
 * Lightweight 2D stand-in for the WebGL scene — used for Lite Mode,
 * reduced-motion users and browsers without WebGL. Pure SVG + CSS.
 */
export function SceneFallback({ reason }: { reason: 'lite' | 'nowebgl' | 'reduced' }) {
  const caption =
    reason === 'nowebgl'
      ? '3D scene unavailable — showing the lightweight emblem.'
      : reason === 'lite'
        ? 'Lite mode — 3D paused for a lighter page.'
        : 'Motion reduced — static emblem.';

  return (
    <figure className="relative h-full w-full grid place-items-center" aria-label={`Cyber cat emblem. ${caption}`}>
      <div
        className="aura"
        aria-hidden
        style={{ width: '58%', aspectRatio: '1', background: 'var(--c-glow-cyan)', maxWidth: 420 }}
      />
      <svg viewBox="0 0 260 260" className="relative w-[72%] max-w-[380px]" aria-hidden>
        <defs>
          <linearGradient id="sf-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--c-cyan)" />
            <stop offset="1" stopColor="var(--c-violet)" />
          </linearGradient>
        </defs>
        {/* halo rings */}
        <ellipse cx="130" cy="132" rx="112" ry="34" fill="none" stroke="url(#sf-stroke)" strokeWidth="1" opacity="0.5" />
        <ellipse cx="130" cy="130" rx="98" ry="104" fill="none" stroke="var(--c-border-strong)" strokeWidth="1" opacity="0.5" />
        {/* head */}
        <g fill="var(--c-bg-elevated)" stroke="url(#sf-stroke)" strokeWidth="2.4" strokeLinejoin="round">
          <path d="M62 88 L62 46 L96 66 Z" />
          <path d="M198 88 L198 46 L164 66 Z" />
          <path d="M62 88 Q62 158 130 178 Q198 158 198 88 Q198 60 130 56 Q62 60 62 88 Z" />
        </g>
        {/* eyes */}
        <g fill="var(--c-cyan)" className="sf-pulse">
          <path d="M88 106 l20 8 l-20 8 l-6 -8 z" />
          <path d="M172 106 l-20 8 l20 8 l6 -8 z" />
        </g>
        {/* nose + whiskers */}
        <path d="M126 146 l8 0 l-4 7 z" fill="var(--c-violet)" />
        <g stroke="var(--c-text-muted)" strokeWidth="1" opacity="0.55">
          <line x1="84" y1="140" x2="52" y2="134" />
          <line x1="84" y1="150" x2="54" y2="154" />
          <line x1="176" y1="140" x2="208" y2="134" />
          <line x1="176" y1="150" x2="206" y2="154" />
        </g>
      </svg>
      <figcaption className="sr-only">{caption}</figcaption>
      <style>{`
        @keyframes sf-pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.55 } }
        html:not([data-lite='true']) .sf-pulse { animation: sf-pulse 2.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .sf-pulse { animation: none !important } }
      `}</style>
    </figure>
  );
}
