import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'ghost';

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-display font-medium text-sm tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-3 disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-cyan text-[#0a0d05] px-7 py-3 hover:shadow-[0_0_30px_var(--c-glow-cyan)] hover:-translate-y-0.5 active:translate-y-0',
  secondary:
    'border border-[var(--c-border-strong)] text-ink px-7 py-3 hover:border-cyan hover:text-cyan hover:-translate-y-0.5 active:translate-y-0',
  ghost: 'font-mono text-xs uppercase tracking-[0.14em] text-muted px-3 py-2 hover:text-cyan',
};

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
  /** renders an arrow that lifts on hover */
  arrow?: boolean;
}

type ButtonAsLink = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;

function classes(variant: Variant) {
  return `${base} ${variants[variant]}`;
}

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = 'primary', children, arrow = false, ...rest } = props;

  if ('href' in rest) {
    const { href, ...anchorProps } = rest as ButtonAsLink & { href: string };
    const external = href.startsWith('http');
    return (
      <a
        href={href}
        className={classes(variant)}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        {...anchorProps}
      >
        {children}
        {arrow && (
          <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        )}
      </a>
    );
  }

  return (
    <button className={classes(variant)} {...(rest as ButtonAsButton)}>
      {children}
      {arrow && (
        <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
      )}
    </button>
  );
}