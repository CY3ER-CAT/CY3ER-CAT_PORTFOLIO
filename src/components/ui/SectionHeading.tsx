import type { ReactNode } from 'react';

interface Props {
  eyebrow: string;
  /** two-digit mono index, e.g. "01" — renders next to the eyebrow */
  index?: string;
  title: ReactNode;
  lead?: string;
  align?: 'left' | 'center';
  id?: string;
}

export function SectionHeading({ eyebrow, index, title, lead, align = 'left', id }: Props) {
  const centered = align === 'center';

  return (
    <header
      id={id}
      className={centered ? 'text-center mx-auto' : ''}
      style={{ marginBottom: 'clamp(2.75rem, 6vw, 4.5rem)' }}
    >
      {centered ? (
        <p className={`eyebrow justify-center ${index ? '' : ''}`}>
          {index && <span className="text-cyan">{index}</span>}
          {eyebrow}
        </p>
      ) : (
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <p className="eyebrow">
              {index && <span className="text-cyan">{index}</span>}
              {eyebrow}
            </p>
            <h2 className="text-[length:var(--fs-h2)] font-semibold mt-4 max-w-3xl">{title}</h2>
          </div>
          {lead && <p className="text-muted text-[0.95rem] leading-relaxed max-w-sm lg:pb-1.5 lg:text-right">{lead}</p>}
        </div>
      )}
      {centered && lead && <p className="text-muted mt-5 text-[0.95rem] leading-relaxed max-w-xl mx-auto">{lead}</p>}
    </header>
  );
}