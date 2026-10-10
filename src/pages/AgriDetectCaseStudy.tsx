import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Github, Sprout, WifiOff, Languages, ScanLine, Bot, ShieldCheck, Brain, Lightbulb, Rocket } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { TechChipList } from '../components/ui/TechChip';
import { Reveal } from '../components/ui/Reveal';
import { agriDetectCaseStudy as cs } from '../data/portfolio';

const features = [
  {
    icon: Languages,
    title: 'Eight Indian languages',
    body: 'Tamil, Hindi, Telugu, Kannada, Malayalam, Bengali, Marathi and English — full UI, data, search and voice replies, not just labels.',
  },
  {
    icon: ScanLine,
    title: '6-photo crown detection',
    body: 'Guided capture of four angles plus two close-ups feeds the on-device model for a combined risk result with a 48-hour early-warning objective.',
  },
  {
    icon: Sprout,
    title: '30 crops, 317 problems',
    body: 'Diseases, pests and nutritional disorders — each with symptoms, causes, step-by-step treatment and a Low/Medium/High risk level.',
  },
  {
    icon: Bot,
    title: 'Offline multilingual chatbot',
    body: 'An offline answer engine over all 317 problems in every language, app-intent answers, TTS voice replies and an optional live-model fallback.',
  },
  {
    icon: WifiOff,
    title: 'Zero-backend PWA',
    body: 'Service worker + manifest: installable, working fully offline for knowledge, chat and photo detection. No server, no API key for core features.',
  },
  {
    icon: ShieldCheck,
    title: 'Photos never leave the device',
    body: 'Detection runs in-browser via TensorFlow.js — a hard privacy requirement for farming communities, and a performance challenge by design.',
  },
];

const learnings = [
  'Freeze-then-fine-tune transfer learning recovered the accuracy lost to a 96×96 input and 2-byte quantization budget.',
  'Offline-first is not a feature you add later — the data layer, chat engine and model all had to assume zero signal from day one.',
  'Localization means the whole knowledge base, search and even voice replies — translating strings alone helps almost nobody.',
  'A 4.4 MB model is a UX decision: it decides whether the app works on a village Android phone or gets abandoned mid-download.',
];

const nextSteps = [
  'Expand beyond binary healthy/diseased to per-disease classification as on-device models allow.',
  'Field-test the 48-hour early-warning flow with real farm sequences.',
  'Add offline-first analytics so farmers can see field history trends without an account.',
];

export function AgriDetectCaseStudy() {
  return (
    <div className="relative">
      <div className="aura" aria-hidden style={{ width: 520, height: 520, top: '-6%', right: '-10%', background: 'var(--c-glow-cyan)' }} />
      <div className="aura" aria-hidden style={{ width: 400, height: 400, bottom: '10%', left: '-8%', background: 'var(--c-glow-violet)' }} />

      <main id="main" className="shell relative pt-32 pb-8">
        <Reveal>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-display text-muted hover:text-cyan transition-colors">
            <ArrowLeft size={15} aria-hidden /> Back to portfolio
          </Link>
        </Reveal>

        {/* header */}
        <header className="mt-8 max-w-3xl">
          <Reveal>
            <p className="eyebrow">Case study · AgriDetect (Ulavan Tech)</p>
            <h1 className="text-[length:var(--fs-h2)] md:text-[3.4rem] font-semibold mt-4 leading-[1.05]">
              Crop-health AI that works <span className="text-cyan">where the signal ends</span>.
            </h1>
            <p className="text-muted mt-6 text-[1.02rem] leading-relaxed">
              An AI-assisted crop-health and plant-care platform designed to help Tamil Nadu farmers identify crop
              problems and discover practical treatment guidance — with the neural network running inside the browser,
              fully offline.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <a
                href="https://github.com/CY3ER-CAT/AGRI-DETECT"
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-2 rounded-full bg-cyan text-[#0a0d05] px-6 py-2.5 font-display font-medium text-sm transition-all duration-300 hover:shadow-[0_0_30px_var(--c-glow-cyan)]"
              >
                <Github size={15} aria-hidden /> Source repository <ArrowUpRight size={14} aria-hidden />
              </a>
              <span className="text-muted text-sm">No public demo deployed — the app runs offline from source.</span>
            </div>
            <TechChipList
              className="mt-8"
              labels={['JavaScript', 'TensorFlow.js', 'Keras 3', 'MobileNetV2', 'PWA / Service Worker', 'i18n', 'TTS']}
            />
          </Reveal>
        </header>

        {/* metrics band */}
        <Reveal>
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
            {cs.stats.map((s) => (
              <div key={s.label} className="card p-6">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-mono text-4xl font-medium text-cyan tabular-nums">{s.value}</span>
                  <span className="block text-xs text-muted mt-2 leading-snug">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* problem & constraints */}
        <section className="section" aria-label="Problem and constraints">
          <div className="grid lg:grid-cols-2 gap-10">
            <Reveal>
              <div className="card p-8 h-full">
                <h2 className="font-display font-semibold text-xl">The problem</h2>
                <p className="text-muted mt-4 text-[0.95rem] leading-relaxed">
                  A farmer notices spots on a paddy leaf. The nearest agronomist is far away, mobile data is patchy or
                  absent in the field, and whatever advice exists online is in English — not Tamil. Meanwhile the
                  difference between a Low-risk nutrient issue and a High-risk infection can be the whole harvest.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card p-8 h-full" style={{ borderColor: 'var(--c-violet)', borderWidth: 1 }}>
                <h2 className="font-display font-semibold text-xl">The constraints</h2>
                <ul className="mt-4 space-y-3 text-muted text-[0.95rem]">
                  <li className="flex gap-3"><span className="text-violet">→</span> Village Android phones: the model had to fit a ~4 MB budget.</li>
                  <li className="flex gap-3"><span className="text-violet">→</span> Zero reliable connectivity: everything core must run offline.</li>
                  <li className="flex gap-3"><span className="text-violet">→</span> Eight languages: knowledge, search and voice — not just the chrome.</li>
                  <li className="flex gap-3"><span className="text-violet">→</span> Privacy by default: photos must never leave the device.</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* features */}
        <section className="section" aria-label="Core features">
          <SectionHeading index="01" eyebrow="Solution" title={<>What the product <span className="text-cyan">actually does</span>.</>} />
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ listStyle: 'none' }}>
            {features.map((f, i) => (
              <Reveal key={f.title} as="li" delay={i * 0.05}>
                <article className="card p-6 h-full">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-[var(--c-border)] text-cyan">
                    <f.icon size={18} aria-hidden />
                  </span>
                  <h3 className="font-display font-semibold mt-4">{f.title}</h3>
                  <p className="text-muted text-sm mt-2 leading-relaxed">{f.body}</p>
                </article>
              </Reveal>
            ))}
          </ul>

          {/* coverage strip */}
          <Reveal>
            <div className="card p-7 mt-6">
              <p className="font-mono text-[0.68rem] tracking-[0.2em] uppercase text-muted">Coverage</p>
              <p className="text-sm mt-3">
                <span className="text-cyan">Languages:</span> {cs.languages.join(' · ')}
              </p>
              <p className="text-sm mt-2">
                <span className="text-cyan">Crop families:</span> {cs.crops.join(' · ')}
              </p>
            </div>
          </Reveal>
        </section>

        {/* implementation */}
        <section className="section" aria-label="Implementation">
          <SectionHeading index="02" eyebrow="Implementation" title={<>A neural network <span className="text-cyan">inside the tab</span>.</>} />

          <Reveal>
            {/* architecture diagram — clearly a diagram, not a screenshot */}
            <figure className="card p-6 sm:p-8" role="img" aria-label="Architecture diagram: photos stay on device, model runs in browser, results and knowledge served offline by the service worker">
              <figcaption className="font-display text-xs tracking-[0.2em] uppercase text-muted mb-6">
                Architecture — diagram
              </figcaption>
              <svg viewBox="0 0 900 240" className="w-full" aria-hidden>
                <g fontFamily="var(--font-display)" fontSize="13">
                  <g fill="var(--c-bg-elevated-2)" stroke="var(--c-border-strong)">
                    <rect x="20" y="40" width="180" height="70" rx="12" />
                    <rect x="20" y="150" width="180" height="70" rx="12" />
                    <rect x="260" y="95" width="200" height="70" rx="12" stroke="var(--c-cyan)" />
                    <rect x="520" y="95" width="170" height="70" rx="12" stroke="var(--c-violet)" />
                    <rect x="730" y="40" width="150" height="70" rx="12" />
                    <rect x="730" y="150" width="150" height="70" rx="12" />
                  </g>
                  <g fill="var(--c-text)" textAnchor="middle">
                    <text x="110" y="70">6 guided photos</text>
                    <text x="110" y="88" fill="var(--c-text-muted)" fontSize="11">4 angles + 2 close-ups</text>
                    <text x="110" y="180">Knowledge base</text>
                    <text x="110" y="198" fill="var(--c-text-muted)" fontSize="11">317 problems · 8 langs</text>
                    <text x="360" y="122">TensorFlow.js</text>
                    <text x="360" y="140" fill="var(--c-text-muted)" fontSize="11">MobileNetV2 · 4.4 MB</text>
                    <text x="605" y="122">Combined risk</text>
                    <text x="605" y="140" fill="var(--c-text-muted)" fontSize="11">48 h early warning</text>
                    <text x="805" y="70">Treatment steps</text>
                    <text x="805" y="180">Offline chatbot</text>
                  </g>
                  <g stroke="var(--c-cyan)" strokeWidth="1.6" fill="none" markerEnd="url(#arr)">
                    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                      <path d="M0,0 L6,3 L0,6" fill="none" stroke="var(--c-cyan)" strokeWidth="1.4" />
                    </marker>
                    <path d="M200 75 H 230 V 130 H 252" />
                    <path d="M460 130 H 512" />
                    <path d="M690 120 H 700 V 75 H 724" />
                    <path d="M690 140 H 700 V 185 H 724" />
                  </g>
                  <text x="450" y="228" fill="var(--c-text-muted)" fontSize="11" textAnchor="middle">
                    everything above runs client-side — the service worker makes it work with zero signal
                  </text>
                </g>
              </svg>
            </figure>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <Reveal>
              <div className="card p-7 h-full">
                <h3 className="font-display font-semibold flex items-center gap-2.5">
                  <Brain size={18} className="text-cyan" aria-hidden /> Model card
                </h3>
                <dl className="mt-5 text-sm">
                  {Object.entries(cs.model).map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[110px_1fr] gap-4 py-2.5 border-b border-[var(--c-border)] last:border-0">
                      <dt className="text-muted capitalize">{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card p-7 h-full">
                <h3 className="font-display font-semibold flex items-center gap-2.5">
                  <Brain size={18} className="text-violet" aria-hidden /> Training (as reported in the repository)
                </h3>
                <dl className="mt-5 text-sm">
                  <div className="py-2.5 border-b border-[var(--c-border)]">
                    <dt className="text-muted">Source</dt>
                    <dd className="mt-1">{cs.training.source}</dd>
                  </div>
                  <div className="py-2.5 border-b border-[var(--c-border)]">
                    <dt className="text-muted">Dataset</dt>
                    <dd className="mt-1">{cs.training.data}</dd>
                  </div>
                  <div className="py-2.5 border-b border-[var(--c-border)]">
                    <dt className="text-muted">Phase 1</dt>
                    <dd className="mt-1">{cs.training.phase1}</dd>
                  </div>
                  <div className="py-2.5">
                    <dt className="text-muted">Phase 2</dt>
                    <dd className="mt-1">{cs.training.phase2}</dd>
                  </div>
                </dl>
                <p className="text-muted text-xs mt-4">
                  Accuracy figures are the developer-reported validation numbers from the repository README, on a
                  balanced hold-out split — not independent field results.
                </p>
              </div>
            </Reveal>
          </div>

          {/* interface mockups — labeled honestly */}
          <Reveal>
            <figure className="card p-6 sm:p-8 mt-6">
              <figcaption className="font-display text-xs tracking-[0.2em] uppercase text-muted mb-6">
                Interface mockups — illustrative renders of the described features, not app screenshots
              </figcaption>
              <div className="grid sm:grid-cols-3 gap-5">
                {[
                  { title: 'Detection flow', label: 'guided 6-photo capture' },
                  { title: 'Risk result', label: 'combined + early warning' },
                  { title: 'Care guidance', label: 'treatment steps · any language' },
                ].map((m) => (
                  <div key={m.title} className="rounded-xl border border-[var(--c-border)] overflow-hidden">
                    <div className="aspect-[9/14] relative" style={{ background: 'linear-gradient(160deg, var(--c-bg-elevated-2), var(--c-bg))' }}>
                      <svg viewBox="0 0 180 280" className="absolute inset-0 h-full w-full" aria-hidden>
                        <rect x="14" y="18" width="152" height="244" rx="16" fill="var(--c-bg-elevated)" stroke="var(--c-border-strong)" />
                        <rect x="26" y="36" width="128" height="10" rx="5" fill="var(--c-border-strong)" />
                        <rect x="26" y="58" width="128" height="96" rx="10" fill="var(--c-bg-elevated-2)" stroke="var(--c-border)" />
                        {m.title === 'Risk result' && (
                          <g>
                            <circle cx="90" cy="106" r="26" fill="none" stroke="var(--c-danger)" strokeWidth="3" strokeDasharray="40 26" />
                            <text x="90" y="112" textAnchor="middle" fontSize="14" fill="var(--c-danger)" fontFamily="monospace">RISK</text>
                          </g>
                        )}
                        {m.title === 'Detection flow' && (
                          <g stroke="var(--c-cyan)" strokeWidth="2" fill="none">
                            <path d="M40 74 v-8 h10 M140 74 v-8 h-10 M40 138 v8 h10 M140 138 v8 h-10" />
                            <path d="M60 106 Q 90 84 120 106" strokeDasharray="4 4" />
                          </g>
                        )}
                        {m.title === 'Care guidance' && (
                          <g>
                            {[0, 1, 2, 3].map((i) => (
                              <g key={i}>
                                <circle cx="38" cy={80 + i * 18} r="4" fill="var(--c-success)" opacity={0.9 - i * 0.15} />
                                <rect x="50" y={77 + i * 18} width={90 - i * 12} height="6" rx="3" fill="var(--c-border-strong)" />
                              </g>
                            ))}
                          </g>
                        )}
                        <rect x="26" y="170" width="128" height="8" rx="4" fill="var(--c-border-strong)" />
                        <rect x="26" y="186" width="100" height="8" rx="4" fill="var(--c-border)" />
                        <rect x="26" y="212" width="128" height="32" rx="9" fill={m.title === 'Risk result' ? 'var(--c-danger)' : 'var(--c-cyan)'} opacity="0.85" />
                        <text x="90" y="232" textAnchor="middle" fontSize="10" fill="#0a0b10" fontFamily="monospace">
                          {m.label}
                        </text>
                      </svg>
                    </div>
                    <p className="text-xs text-muted px-4 py-3">{m.title}</p>
                  </div>
                ))}
              </div>
            </figure>
          </Reveal>
        </section>

        {/* learning + next */}
        <section className="section" aria-label="Learnings and next steps">
          <div className="grid lg:grid-cols-2 gap-6">
            <Reveal>
              <div className="card p-8 h-full">
                <h2 className="font-display font-semibold text-xl flex items-center gap-2.5">
                  <Lightbulb size={19} className="text-cyan" aria-hidden /> What I learned
                </h2>
                <ul className="mt-5 space-y-4">
                  {learnings.map((l) => (
                    <li key={l} className="text-muted text-sm leading-relaxed flex gap-3">
                      <span className="text-cyan shrink-0">▹</span> {l}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card p-8 h-full">
                <h2 className="font-display font-semibold text-xl flex items-center gap-2.5">
                  <Rocket size={19} className="text-violet" aria-hidden /> Next steps
                </h2>
                <ul className="mt-5 space-y-4">
                  {nextSteps.map((n) => (
                    <li key={n} className="text-muted text-sm leading-relaxed flex gap-3">
                      <span className="text-violet shrink-0">→</span> {n}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://github.com/CY3ER-CAT/AGRI-DETECT"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 text-sm font-display text-cyan mt-7 hover:underline underline-offset-4"
                >
                  Follow the work on GitHub <ArrowUpRight size={14} aria-hidden />
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
