interface Props {
  label: string;
}

/** Small pill naming a technology. Intentionally static — no hover tricks. */
export function TechChip({ label }: Props) {
  return <li className="chip">{label}</li>;
}

export function TechChipList({ labels, className = '' }: { labels: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label="Technologies used">
      {labels.map((l) => (
        <TechChip key={l} label={l} />
      ))}
    </ul>
  );
}
