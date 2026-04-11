import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-gold)]">
          {eyebrow}
        </p>
        <h2 className="font-serif-display text-4xl leading-[0.95] text-[var(--color-ink)] md:text-5xl">
          {title}
        </h2>
        <p className="max-w-xl text-base leading-7 text-[var(--color-muted)]">
          {description}
        </p>
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
