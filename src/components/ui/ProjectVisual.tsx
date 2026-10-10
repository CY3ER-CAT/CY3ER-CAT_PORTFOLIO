import { useState } from 'react';
import type { Project } from '../../types/portfolio';

/**
 * Project preview art. When the project has a real screenshot (photo), it
 * renders on top — a real, relevant picture of the shipped work, captured
 * live from the web. If the image is missing/fails, the bespoke SVG
 * composition (colored by the design tokens) takes over seamlessly.
 */
export function ProjectVisual({ visual, title, photo }: { visual: Project['visual']; title: string; photo?: string }) {
  const [photoOk, setPhotoOk] = useState(!!photo);

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: 'linear-gradient(145deg, var(--c-bg-elevated-2), var(--c-bg))' }}
      role="img"
      aria-label={photo && photoOk ? `Live screenshot of ${title}` : `Original artwork representing ${title}`}
    >
      <div className="h-full w-full transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05] group-hover:duration-700 will-change-transform">
        <svg viewBox="0 0 400 260" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <radialGradient id="pv-glow" cx="50%" cy="42%" r="65%">
            <stop offset="0%" stopColor="var(--c-cyan)" stopOpacity="0.14" />
            <stop offset="100%" stopColor="var(--c-cyan)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="260" fill="url(#pv-glow)" />
        {/* faint blueprint grid, shared by all cards */}
        <g stroke="var(--c-border)" strokeWidth="1">
          {Array.from({ length: 9 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 32} x2="400" y2={i * 32} />
          ))}
          {Array.from({ length: 13 }, (_, i) => (
            <line key={`v${i}`} x1={i * 32} y1="0" x2={i * 32} y2="260" />
          ))}
        </g>

        {visual === 'agri' && <AgriArt />}
        {visual === 'yuvaadir' && <CodeShellArt />}
        {visual === 'flower' && <FlowerArt />}
        {visual === 'yuvaa3' && <BuildingArt />}
        {visual === 'axiom' && <ChainArt />}
      </svg>
      </div>
      {photo && (
        <img
          src={photo}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05] group-hover:duration-700 will-change-transform"
          style={photoOk ? undefined : { display: 'none' }}
          onLoad={() => setPhotoOk(true)}
          onError={() => setPhotoOk(false)}
        />
      )}
      <div className="pointer-events-none absolute inset-0" style={{ boxShadow: 'inset 0 0 60px var(--c-shadow)' }} />
    </div>
  );
}

/* AGRI-DETECT — a leaf mid-scan with detection brackets and language ticks */
function AgriArt() {
  return (
    <g>
      {/* leaf */}
      <path
        d="M200 60 C 245 85 262 140 236 185 C 214 222 172 224 148 196 C 122 166 138 108 172 78 C 182 70 191 64 200 60 Z"
        fill="none"
        stroke="var(--c-success)"
        strokeWidth="2"
      />
      <path d="M200 78 L 196 200 M196 120 L 168 108 M196 120 L 226 104 M194 158 L 166 148 M194 158 L 224 146"
        stroke="var(--c-success)" strokeWidth="1.4" opacity="0.7" />
      {/* scan brackets */}
      <g stroke="var(--c-cyan)" strokeWidth="2.4" fill="none">
        <path d="M96 84 v-16 h16 M304 84 v-16 h-16 M96 196 v16 h16 M304 196 v16 h-16" />
      </g>
      {/* scan line */}
      <line x1="110" y1="132" x2="290" y2="132" stroke="var(--c-cyan)" strokeWidth="1.4" strokeDasharray="6 6" opacity="0.85" />
      {/* risk readout dots */}
      <g>
        <circle cx="118" cy="228" r="4" fill="var(--c-success)" />
        <circle cx="134" cy="228" r="4" fill="var(--c-success)" opacity="0.55" />
        <circle cx="150" cy="228" r="4" fill="var(--c-danger)" />
      </g>
      {/* language ticks */}
      <g fill="var(--c-violet)" opacity="0.85">
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x={152 + i * 14} y={44} width="6" height={10 + (i % 3) * 6} rx="1" />
        ))}
      </g>
    </g>
  );
}

/* yuvaa-dir-magic — a typed app shell framing a small structure */
function CodeShellArt() {
  return (
    <g>
      <rect x="96" y="56" width="208" height="150" rx="10" fill="var(--c-bg-elevated)" stroke="var(--c-border-strong)" />
      <circle cx="114" cy="72" r="3.2" fill="var(--c-danger)" />
      <circle cx="126" cy="72" r="3.2" fill="#f2c14e" />
      <circle cx="138" cy="72" r="3.2" fill="var(--c-success)" />
      {/* typed lines */}
      <g fill="var(--c-cyan)" opacity="0.9" fontFamily="monospace" fontSize="10">
        <rect x="112" y="92" width="120" height="6" rx="3" opacity="0.9" />
        <rect x="124" y="108" width="96" height="6" rx="3" opacity="0.6" />
        <rect x="124" y="124" width="140" height="6" rx="3" opacity="0.75" />
        <rect x="112" y="140" width="72" height="6" rx="3" opacity="0.5" />
        <rect x="124" y="156" width="108" height="6" rx="3" opacity="0.65" />
      </g>
      {/* little building served by the shell */}
      <g stroke="var(--c-violet)" strokeWidth="1.6" fill="none">
        <rect x="256" y="150" width="34" height="40" />
        <path d="M256 150 L 273 136 L 290 150" />
        <line x1="264" y1="162" x2="264" y2="190" />
        <line x1="273" y1="162" x2="273" y2="190" />
        <line x1="282" y1="162" x2="282" y2="190" />
      </g>
      <path d="M248 168 h4 M294 168 h4" stroke="var(--c-cyan)" strokeWidth="1.6" />
    </g>
  );
}

/* gift-flower-garden / DHANUSHA — a flower opening behind a PIN lock */
function FlowerArt() {
  const petals = Array.from({ length: 6 }, (_, i) => (
    <ellipse
      key={i}
      cx="200"
      cy="112"
      rx="16"
      ry="44"
      fill="var(--c-violet)"
      opacity="0.4"
      transform={`rotate(${i * 60} 200 160)`}
    />
  ));
  return (
    <g>
      {petals}
      <circle cx="200" cy="160" r="18" fill="var(--c-cyan)" opacity="0.9" />
      <circle cx="200" cy="160" r="9" fill="var(--c-bg)" />
      {/* stem */}
      <path d="M200 178 C 202 206 194 218 200 238" stroke="var(--c-success)" strokeWidth="2" fill="none" />
      {/* lock */}
      <g transform="translate(178,196)">
        <rect x="0" y="8" width="44" height="34" rx="7" fill="none" stroke="var(--c-text)" strokeWidth="2" />
        <path d="M10 8 v-6 a12 10 0 0 1 24 0 v6" fill="none" stroke="var(--c-text)" strokeWidth="2" />
        <circle cx="22" cy="24" r="3.4" fill="var(--c-cyan)" />
        <rect x="20.6" y="24" width="2.8" height="8" fill="var(--c-cyan)" />
      </g>
      {/* pin dots */}
      <g fill="var(--c-text-muted)">
        {Array.from({ length: 4 }, (_, i) => (
          <circle key={i} cx={186 + i * 12} cy={252} r="2.6" opacity={i < 2 ? 1 : 0.4} />
        ))}
      </g>
    </g>
  );
}

/* YUVAA-3 — surveyor's building with measuring lines */
function BuildingArt() {
  return (
    <g>
      <g stroke="var(--c-text)" strokeWidth="1.8" fill="none">
        <rect x="140" y="110" width="120" height="92" />
        <path d="M140 110 L 200 74 L 260 110" />
        <rect x="188" y="168" width="26" height="34" />
        <rect x="156" y="128" width="20" height="20" />
        <rect x="224" y="128" width="20" height="20" />
      </g>
      {/* measuring crosshair */}
      <g stroke="var(--c-cyan)" strokeWidth="1.4">
        <line x1="200" y1="60" x2="200" y2="216" strokeDasharray="5 6" opacity="0.8" />
        <line x1="120" y1="202" x2="282" y2="202" strokeDasharray="5 6" opacity="0.8" />
        <circle cx="200" cy="202" r="14" fill="none" />
      </g>
      <path d="M120 202 l-12 -0 M200 216 l0 12" stroke="var(--c-violet)" strokeWidth="2" />
      <g fontFamily="monospace" fontSize="9" fill="var(--c-text-muted)">
        <text x="126" y="60">PLOT 14B</text>
        <text x="252" y="60">DHARMAPURI</text>
      </g>
    </g>
  );
}

/* AXIOM-CHAIN — chained nodes across a terminal window */
function ChainArt() {
  return (
    <g>
      <rect x="80" y="52" width="240" height="156" rx="8" fill="var(--c-bg-elevated)" stroke="var(--c-border-strong)" />
      <g fontFamily="monospace" fontSize="10" fill="var(--c-success)" opacity="0.85">
        <text x="96" y="78">$ axiom --connect</text>
      </g>
      <g fontFamily="monospace" fontSize="9" fill="var(--c-text-muted)">
        <text x="96" y="96">tor circuit established</text>
        <text x="96" y="112">relay 1 ✓  relay 2 ✓  relay 3 ✓</text>
        <text x="96" y="128">exit node: random</text>
      </g>
      {/* chain nodes */}
      <g>
        <circle cx="120" cy="172" r="10" fill="none" stroke="var(--c-cyan)" strokeWidth="1.8" />
        <circle cx="184" cy="172" r="10" fill="none" stroke="var(--c-violet)" strokeWidth="1.8" />
        <circle cx="248" cy="172" r="10" fill="none" stroke="var(--c-cyan)" strokeWidth="1.8" />
        <path d="M130 172 h44 M194 172 h54" stroke="var(--c-border-strong)" strokeWidth="1.6" strokeDasharray="4 4" />
        <circle cx="282" cy="172" r="5" fill="var(--c-success)" opacity="0.9" />
      </g>
    </g>
  );
}
