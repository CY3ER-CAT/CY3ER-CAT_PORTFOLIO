import { Zap, ZapOff } from 'lucide-react';

interface Props {
  lite: boolean;
  onToggle: () => void;
}

/** Lite Mode genuinely swaps WebGL for a 2D emblem and kills decorative animation. */
export function LiteModeToggle({ lite, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={lite ? 'Enable full 3D mode' : 'Enable lite mode (lighter, no 3D)'}
      aria-pressed={lite}
      title={lite ? 'Lite mode is on — click for full 3D' : 'Full 3D — click for lite mode'}
      className="grid h-9 w-9 place-items-center rounded-full border border-[var(--c-border)] text-muted transition-colors duration-300 hover:text-cyan hover:border-[var(--c-border-strong)]"
    >
      {lite ? <ZapOff size={16} aria-hidden /> : <Zap size={16} aria-hidden />}
    </button>
  );
}
