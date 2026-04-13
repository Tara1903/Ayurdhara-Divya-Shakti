"use client";

import Image from "next/image";
import Link from "next/link";
import { startTransition, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";

export interface HeaderSearchItem {
  slug: string;
  title: string;
  category: string;
  shortBenefit: string;
  image: string;
  price: number;
}

const QUICK_LINKS = [
  { label: "Wellness Kits", href: "/wellness-kits" },
  { label: "Herbal Powders", href: "/herbal-powders" },
  { label: "Herbal Oils", href: "/herbal-oils" },
  { label: "Combos", href: "/combos" },
];

export function HeaderSearch({ items }: { items: HeaderSearchItem[] }) {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const results = useMemo(() => {
    if (!deferredQuery) {
      return items.slice(0, 5);
    }

    return items
      .filter((item) =>
        `${item.title} ${item.category} ${item.shortBenefit}`.toLowerCase().includes(deferredQuery),
      )
      .slice(0, 6);
  }, [deferredQuery, items]);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  function submitFirstResult() {
    const first = results[0];

    startTransition(() => {
      if (first) {
        router.push(`/products/${first.slug}`);
      } else {
        router.push("/wellness-kits");
      }
    });

    setOpen(false);
  }

  return (
    <div ref={rootRef} className="relative w-full">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submitFirstResult();
        }}
        className="relative"
      >
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setOpen(false);
            }
          }}
          placeholder="Search wellness kits, powders, oils..."
          className="h-12 w-full rounded-full border border-[var(--color-line)] bg-white/88 pl-11 pr-24 text-sm text-[var(--color-ink)] shadow-[0_14px_36px_rgba(36,53,24,0.08)] outline-none ring-0 placeholder:text-[var(--color-muted)] focus:border-[rgba(46,125,50,0.35)]"
          aria-label="Search products"
        />
        <button
          type="submit"
          className="absolute right-1.5 top-1.5 inline-flex h-9 items-center justify-center rounded-full bg-[var(--color-forest)] px-4 text-sm font-semibold text-white"
        >
          Search
        </button>
      </form>

      {open ? (
        <div className="absolute inset-x-0 top-[calc(100%+0.75rem)] z-50 overflow-hidden rounded-[28px] border border-[var(--color-line)] bg-[rgba(255,252,248,0.96)] shadow-[0_22px_60px_rgba(28,46,33,0.16)] backdrop-blur-xl">
          <div className="border-b border-[var(--color-line)] px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold)]">
                  Quick Search
                </p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">
                  Browse fast with product-first suggestions.
                </p>
              </div>
              <div className="hidden items-center gap-2 rounded-full bg-[rgba(46,125,50,0.08)] px-3 py-1 text-xs font-medium text-[var(--color-forest)] md:inline-flex">
                <Sparkles className="h-3.5 w-3.5" />
                Curated Ayurveda
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-[var(--color-line)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--color-forest)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid max-h-[22rem] gap-2 overflow-y-auto p-3">
            {results.length ? (
              results.map((item) => (
                <Link
                  key={item.slug}
                  href={`/products/${item.slug}`}
                  onClick={() => setOpen(false)}
                  className="grid grid-cols-[64px_1fr_auto] items-center gap-3 rounded-[22px] p-3 hover:bg-[rgba(46,125,50,0.06)]"
                >
                  <div className="relative aspect-square overflow-hidden rounded-[18px] bg-[var(--color-surface)]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[var(--color-ink)]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--color-gold)]">
                      {item.category}
                    </p>
                    <p className="mt-1 truncate text-sm text-[var(--color-muted)]">
                      {item.shortBenefit}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-[var(--color-forest)]">
                    {formatCurrency(item.price)}
                  </p>
                </Link>
              ))
            ) : (
              <div className="rounded-[22px] bg-[rgba(46,125,50,0.05)] p-5 text-sm text-[var(--color-muted)]">
                No direct match yet. Try searching for kits, immunity, digestion, oils, or powders.
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
