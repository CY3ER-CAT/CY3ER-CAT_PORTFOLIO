import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: 'var(--c-bg)',
        raised: 'var(--c-bg-elevated)',
        cyan: 'var(--c-cyan)',
        violet: 'var(--c-violet)',
        ink: 'var(--c-text)',
        muted: 'var(--c-text-muted)',
        line: 'var(--c-border)',
        success: 'var(--c-success)',
        danger: 'var(--c-danger)',
      },
      fontFamily: {
        display: ['Archivo', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        accent: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      maxWidth: {
        shell: '74rem',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config;