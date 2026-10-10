import { Moon, Sun } from 'lucide-react';

interface Props {
  theme: 'dark' | 'light';
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: Props) {
  const dark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={dark}
      className="grid h-9 w-9 place-items-center rounded-full border border-[var(--c-border)] text-muted transition-colors duration-300 hover:text-cyan hover:border-[var(--c-border-strong)]"
    >
      {dark ? <Moon size={16} aria-hidden /> : <Sun size={16} aria-hidden />}
    </button>
  );
}
