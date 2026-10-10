import { useEffect, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';

/**
 * Playable miniature of the gift-flower-garden interaction: a four-digit
 * lock that blooms an animated flower on success.
 *
 * The demo code 2008 is the code published in the open-source
 * gift-flower-garden repository — it is a demo, not anyone's private secret.
 */
const DEMO_CODE = '2008';

export function FlowerLockDemo() {
  const [digits, setDigits] = useState(['', '', '', '']);
  const [state, setState] = useState<'locked' | 'error' | 'open'>('locked');
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const submit = (code: string[]) => {
    if (code.join('') === DEMO_CODE) {
      setState('open');
    } else {
      setState('error');
      timer.current = window.setTimeout(() => {
        setDigits(['', '', '', '']);
        setState('locked');
        inputs.current[0]?.focus();
      }, 900);
    }
  };

  const setDigit = (index: number, value: string) => {
    if (state === 'open') return;
    const clean = value.replace(/\D/g, '');
    if (!clean && value !== '') return;
    const next = [...digits];

    if (clean.length > 1) {
      // paste or fast typing — spread across boxes
      for (let i = 0; i < 4; i++) next[i] = clean[i] ?? '';
      setDigits(next);
      if (next.every((d) => d !== '')) submit(next);
      else inputs.current[Math.min(clean.length, 3)]?.focus();
      return;
    }

    next[index] = clean;
    setDigits(next);
    if (clean && index < 3) inputs.current[index + 1]?.focus();
    if (next.every((d) => d !== '')) submit(next);
  };

  const onKeyDown = (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) inputs.current[index - 1]?.focus();
    if (e.key === 'ArrowRight' && index < 3) inputs.current[index + 1]?.focus();
  };

  const reset = () => {
    window.clearTimeout(timer.current);
    setDigits(['', '', '', '']);
    setState('locked');
    inputs.current[0]?.focus();
  };

  const open = state === 'open';

  return (
    <div className="card p-6 sm:p-8 relative overflow-hidden">
      <div className="aura" aria-hidden style={{ width: 240, height: 240, top: '-30%', right: '-10%', background: open ? 'var(--c-glow-violet)' : 'transparent', transition: 'background 1s ease' }} />

      <div className="flex flex-col sm:flex-row items-center gap-8">
        {/* the flower */}
        <svg viewBox="0 0 140 150" className="w-32 shrink-0" aria-hidden>
          <g style={{ transformOrigin: '70px 92px', transform: open ? 'scale(1)' : 'scale(0.55)', opacity: open ? 1 : 0.25, transition: 'transform 1.1s cubic-bezier(0.22,1,0.36,1), opacity 0.9s ease' }}>
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <ellipse
                key={deg}
                cx="70"
                cy="48"
                rx="12"
                ry="30"
                fill="var(--c-violet)"
                opacity="0.55"
                style={{
                  transform: `rotate(${deg}deg)`,
                  transformOrigin: '70px 92px',
                  transition: 'transform 1.1s cubic-bezier(0.22,1,0.36,1)',
                }}
              />
            ))}
            <circle cx="70" cy="92" r="13" fill="var(--c-cyan)" />
            <circle cx="70" cy="92" r="6" fill="var(--c-bg)" />
          </g>
          <path d="M70 104 C 74 122 66 132 70 144" stroke="var(--c-success)" strokeWidth="2.5" fill="none" />
        </svg>

        {/* the lock */}
        <div className="flex-1 w-full">
          <p className="font-display font-semibold text-[1.05rem]">
            {open ? 'The garden is open.' : 'Four digits unlock the garden'}
          </p>
          <p className="text-muted text-sm mt-1">
            {open
              ? 'Exactly how gift-flower-garden greets the right person — then the gate sweeps open and petals fall.'
              : 'Try the demo to see the bloom from the real gift cards.'}
          </p>

          <div
            className={`flex gap-3 mt-5 ${state === 'error' ? 'animate-[lockshake_0.4s_ease]' : ''}`}
            role="group"
            aria-label="Four digit demo code"
          >
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputs.current[i] = el;
                }}
                value={d}
                onChange={(e) => setDigit(i, e.target.value)}
                onKeyDown={onKeyDown(i)}
                inputMode="numeric"
                autoComplete="one-time-code"
                aria-label={`Digit ${i + 1}`}
                disabled={open}
                className="w-12 h-14 text-center font-display text-xl rounded-xl border bg-[var(--c-bg-elevated-2)] text-ink transition-colors focus:border-cyan disabled:opacity-70"
                style={{ borderColor: state === 'error' ? 'var(--c-danger)' : open ? 'var(--c-success)' : 'var(--c-border-strong)' }}
              />
            ))}
          </div>

          <p className="text-sm mt-4 min-h-[1.5rem]" role="status" aria-live="polite" style={{ color: open ? 'var(--c-success)' : state === 'error' ? 'var(--c-danger)' : 'var(--c-text-muted)' }}>
            {state === 'error' && 'Wrong code — the garden stays sealed. Try again.'}
            {open && 'Unlocked. Happy birthday, indeed.'}
            {state === 'locked' && 'Demo code: 2008 — as published in the open-source repo. The real cards use personal codes.'}
          </p>

          {open && (
            <button
              type="button"
              onClick={reset}
              className="mt-3 inline-flex items-center gap-2 text-sm font-display text-muted hover:text-cyan transition-colors"
            >
              <RotateCcw size={14} aria-hidden /> Lock it again
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes lockshake {
          0%, 100% { transform: translateX(0) }
          25% { transform: translateX(-6px) }
          75% { transform: translateX(6px) }
        }
      `}</style>
    </div>
  );
}
