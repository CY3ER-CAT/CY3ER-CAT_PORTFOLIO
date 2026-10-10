# CY3ER-CAT — 3D Developer Portfolio

Production portfolio for **Naveenprasanth M** (GitHub: [CY3ER-CAT](https://github.com/CY3ER-CAT)).
A cyberpunk-inspired experience with a procedural Three.js cyber-cat mascot, GSAP motion design,
a playable gift-lock demo, and a full AGRI-DETECT case study — built with React + Vite + TypeScript (strict).

## Tech stack

| Layer | Tools |
|---|---|
| UI | React 18, TypeScript (strict), Tailwind CSS, custom CSS tokens |
| 3D | Three.js, @react-three/fiber, @react-three/drei (procedural geometry only — no model assets) |
| Motion | GSAP + ScrollTrigger, Lenis smooth scroll (auto-disabled for reduced motion) |
| Forms | React Hook Form + Zod |
| Routing | React Router 6 (`/` and `/projects/agri-detect`, case study is code-split) |
| Icons | Lucide React |

## Getting started

```bash
npm install
npm run dev        # local dev server (http://localhost:5173)
npm run build      # type-check + production build → dist/
npm run preview    # serve the production build locally
npm run typecheck  # tsc --noEmit only
npm run lint       # eslint
```

## Folder structure

```
src/
  app/          App shell, router, app-state context
  components/
    layout/     Navbar, Footer, PageLoader
    ui/         Button, SectionHeading, TechChip, Toggles, ProjectCard,
                ProjectVisual (bespoke SVG art per project), FlowerLockDemo, Reveal
  sections/     Hero, About, Skills, Projects, Experience, Contact
  three/        CyberCatScene, CyberCatModel, ParticleField, SceneFallback
  pages/        HomePage, AgriDetectCaseStudy, NotFoundPage
  hooks/        useReducedMotion, useActiveSection, useLiteMode, useTheme
  data/         portfolio.ts  ← everything editable lives here
  styles/       tokens.css (design tokens/themes), globals.css
  types/        portfolio.ts (shared types)
  utils/        scroll.ts, validation.ts
public/         favicon.svg, og-image.svg, robots.txt, sitemap.xml
```

## Customization guide

### Edit projects, skills and timeline
Everything content-related is in **`src/data/portfolio.ts`**:
- `projects` — title, problem, summary, tech, `repoUrl`, `liveUrl` (only set when verified), metrics, featured flag.
- `skillGroups` — category cards with chips.
- `timeline` — the build log. Add real education/work entries here when ready (`kind: 'education' | 'work'`), or keep the project log.
- `profile` / `socials` — name, hero copy, email, links.

### Replace contact details (REQUIRED before deploying)
1. **Email** — `src/data/portfolio.ts` → `profile.email` (currently `hello@example.com`).
   The contact form opens a pre-filled `mailto:` — it needs your real address.
2. **LinkedIn** — `socials` → replace `https://www.linkedin.com/in/YOUR-HANDLE`.
3. **Domain** — search the repo for `cybercat-portfolio.example.com` and replace with your deployed URL in:
   `index.html` (canonical + Open Graph + JSON-LD), `public/robots.txt`, `public/sitemap.xml`.

### Replace project visuals
Project cards use bespoke SVG compositions (honest, no fake screenshots) in
`src/components/ui/ProjectVisual.tsx`. To use real screenshots instead:
1. Drop images into `public/images/`.
2. In `ProjectVisual.tsx`, render an `<img src="/images/your-shot.png" alt="…">` for the matching `visual` key.
Only publish screenshots you own.

### The flower-lock demo
`src/components/ui/FlowerLockDemo.tsx` uses demo code **2008** — the code published in the
open-source `gift-flower-garden` repo. It is labeled as a demo in the UI; never wire a private code here.

### Connect a real contact-form backend (optional)
The form currently builds a `mailto:` link — honest, but basic. To send real email:
- **EmailJS** — create a service at emailjs.com, `npm i @emailjs/browser`, and submit through it from
  `src/sections/Contact.tsx`. Public keys are safe in the frontend; keep any secret keys server-side.
- **Formspree** — create a form, point the submit at `https://formspree.io/f/YOUR_ID` with `fetch`.
- **Your own endpoint** — POST the validated `ContactFormValues` JSON to an API route you control.

Never expose provider secrets through `VITE_*` environment variables. `.env.example` documents the pattern.

## Deployment

### Vercel
```bash
npm i -g vercel
vercel                # link + deploy (framework: Vite, auto-detected)
vercel --prod         # production
```
Or import the repo at vercel.com — Vite is auto-detected; build `npm run build`, output `dist`.

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --build              # preview
netlify deploy --build --prod       # production
```
Build command `npm run build`, publish directory `dist`. Add a redirect for SPA routing:
`public/_redirects` containing `/*  /index.html  200` (create the file if missing).

### After deploying
Update the canonical/OG/sitemap/robots URLs (see "Replace contact details" #3).

## Performance & accessibility notes

- The Three.js scene is **lazy-loaded**, capped at DPR 1.5 (mobile) / 2 (desktop), and its render loop
  **pauses** when the canvas is off-screen or the tab is hidden. Total scene is well under 60k triangles.
- **Lite Mode** (zap icon) swaps WebGL for a 2D SVG emblem and disables decorative animation; persisted in `localStorage`.
- **No WebGL** → automatic 2D emblem fallback. **prefers-reduced-motion** → no Lenis, no parallax, instant reveals.
- Skip-to-content link, semantic landmarks, keyboard-accessible nav/menu (Escape closes), focus-visible styles,
  labeled form fields with `role="alert"` errors, aria-live status regions, and a native cursor that is never hidden
  (the glow dot is decorative only).
- Lighthouse has not been measured here — run it yourself on the deployed build (`npm run build && npm run preview`).

## Fact policy

Every project claim on the site was verified against the public GitHub repositories on 2026-10-10.
Model accuracy figures are labeled as developer-reported. No employment, education, awards, or live URLs are invented.
