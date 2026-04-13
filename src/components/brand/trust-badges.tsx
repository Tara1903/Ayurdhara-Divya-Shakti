import {
  FlaskConical,
  Leaf,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import type { TrustBadge } from "@/lib/storefront/home";

const ICONS = {
  flask: FlaskConical,
  leaf: Leaf,
  rotate: RotateCcw,
  shield: ShieldCheck,
  sparkles: Sparkles,
  truck: Truck,
} as const;

export function TrustBadges({ items }: { items: TrustBadge[] }) {
  return (
    <section className="page-shell section-space pb-12 pt-8">
      <div className="rounded-[36px] border border-[var(--color-line)] bg-white/72 p-5 shadow-[0_16px_44px_rgba(45,53,33,0.08)] backdrop-blur md:p-7">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--color-gold)]">
              Trust Signals
            </p>
            <h2 className="mt-2 font-serif-display text-4xl leading-[0.95] text-[var(--color-ink)] md:text-[2.7rem]">
              Premium signals users can scan in seconds.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[var(--color-muted)] md:text-base">
            Visual proof beats long explanations on a shopping homepage.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          {items.map((item) => {
            const Icon = ICONS[item.icon as keyof typeof ICONS] ?? ShieldCheck;

            return (
              <div
                key={item.title}
                className="rounded-[24px] border border-[rgba(39,62,40,0.08)] bg-[rgba(255,255,255,0.9)] p-4"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(46,125,50,0.1)] text-[var(--color-forest)]">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-4 font-semibold text-[var(--color-ink)]">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">{item.subtitle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
