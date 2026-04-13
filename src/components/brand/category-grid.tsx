import Image from "next/image";
import Link from "next/link";
import {
  CupSoda,
  FlaskConical,
  Gift,
  Leaf,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Wheat,
} from "lucide-react";
import type { CategoryShowcase } from "@/lib/storefront/home";

const ICONS = {
  capsules: FlaskConical,
  cup: CupSoda,
  flower: Sparkles,
  gift: Gift,
  leaf: Leaf,
  shield: ShieldCheck,
  sparkles: Sparkles,
  sun: SunMedium,
} as const;

export function CategoryGrid({ categories }: { categories: CategoryShowcase[] }) {
  return (
    <section className="page-shell section-space pt-2">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--color-gold)]">
          Shop by Category
        </p>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-3xl font-serif-display text-4xl leading-[0.94] text-[var(--color-ink)] md:text-5xl">
            Fast category scanning built for real shopping behavior.
          </h2>
          <p className="max-w-xl text-sm leading-7 text-[var(--color-muted)] md:text-base">
            Browse by need instead of digging through long copy blocks.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((category) => {
          const Icon = ICONS[category.icon as keyof typeof ICONS] ?? Wheat;

          return (
            <Link
              key={category.title}
              href={category.href}
              className="group relative isolate min-h-[14rem] overflow-hidden rounded-[30px] border border-[rgba(39,62,40,0.08)] shadow-[0_20px_60px_rgba(34,49,30,0.1)]"
            >
              <Image
                src={category.image}
                alt={category.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                className="object-cover transition duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,23,16,0.82)] via-[rgba(13,23,16,0.28)] to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-between p-5 text-white">
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/16 backdrop-blur">
                    <Icon className="h-5 w-5" />
                  </span>
                  {category.badge ? (
                    <span className="rounded-full bg-[var(--color-gold)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                      {category.badge}
                    </span>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif-display text-3xl leading-[0.96]">{category.title}</h3>
                  <p className="max-w-sm text-sm leading-6 text-white/82">{category.descriptor}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
