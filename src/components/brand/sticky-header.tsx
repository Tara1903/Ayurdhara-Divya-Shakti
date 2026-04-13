import Link from "next/link";
import { Leaf, Menu, MessageCircle, UserRound } from "lucide-react";
import { CartButton } from "@/components/brand/cart-button";
import { HeaderSearch, type HeaderSearchItem } from "@/components/brand/header-search";
import { BRAND, NAV_ITEMS } from "@/lib/brand";
import { products } from "@/lib/data";
import { buildWhatsAppUrl, cn } from "@/lib/utils";

const searchItems: HeaderSearchItem[] = products.map((product) => ({
  slug: product.slug,
  title: product.name,
  category: product.category,
  shortBenefit: product.shortBenefit,
  image: product.image,
  price: product.price,
}));

export function StickyHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(41,65,42,0.08)] bg-[rgba(250,246,239,0.86)] backdrop-blur-2xl">
      <div className="page-shell py-3">
        <div className="flex items-center gap-3 md:gap-5">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-[var(--color-forest)] text-white shadow-[0_14px_34px_rgba(46,125,50,0.28)]">
              <Leaf className="h-5 w-5" />
            </div>
            <div className="hidden min-w-0 md:block">
              <p className="truncate font-serif-display text-xl leading-none text-[var(--color-ink)]">
                {BRAND.name}
              </p>
              <p className="mt-1 truncate text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold)]">
                Premium Ayurvedic Wellness
              </p>
            </div>
          </Link>

          <div className="hidden flex-1 md:block">
            <HeaderSearch items={searchItems} />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/contact"
              aria-label="Customer care"
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line)] bg-white/86 text-[var(--color-forest)] md:inline-flex"
            >
              <UserRound className="h-4 w-4" />
            </Link>

            <a
              href={buildWhatsAppUrl(BRAND.whatsappNumber, BRAND.whatsappOrderMessage)}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full border border-[var(--color-line)] bg-white/86 px-4 py-2 text-sm font-medium text-[var(--color-forest)] xl:inline-flex"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>

            <CartButton />

            <details className="relative lg:hidden">
              <summary className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-[var(--color-line)] bg-white/86 text-[var(--color-forest)]">
                <Menu className="h-5 w-5" />
              </summary>
              <div className="absolute right-0 top-14 z-30 grid min-w-72 gap-2 rounded-[28px] border border-[var(--color-line)] bg-[rgba(255,252,247,0.97)] p-3 shadow-[0_24px_60px_rgba(36,53,24,0.16)] backdrop-blur-xl">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm font-medium text-[var(--color-ink)] hover:bg-[rgba(46,125,50,0.06)]",
                      ("highlight" in item && item.highlight) &&
                        "bg-[rgba(46,125,50,0.08)] text-[var(--color-forest)]",
                    )}
                  >
                    <span className="inline-flex items-center gap-2">
                      {item.label}
                      {"badge" in item && item.badge ? (
                        <span className="rounded-full bg-[var(--color-gold)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                          {item.badge}
                        </span>
                      ) : null}
                    </span>
                  </Link>
                ))}
              </div>
            </details>
          </div>
        </div>

        <div className="mt-3 md:hidden">
          <HeaderSearch items={searchItems} />
        </div>

        <div className="mt-3 hidden items-center gap-2 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium text-[var(--color-ink)] transition hover:bg-white hover:text-[var(--color-forest)]",
                ("highlight" in item && item.highlight) &&
                  "bg-[rgba(46,125,50,0.12)] text-[var(--color-forest)] shadow-[0_10px_30px_rgba(46,125,50,0.08)]",
              )}
            >
              <span className="inline-flex items-center gap-2">
                {item.label}
                {"badge" in item && item.badge ? (
                  <span className="rounded-full bg-[var(--color-gold)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                    {item.badge}
                  </span>
                ) : null}
              </span>
            </Link>
          ))}
        </div>

        <div className="mobile-scroll-row mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full border border-[var(--color-line)] bg-white/88 px-4 py-2 text-sm font-medium whitespace-nowrap text-[var(--color-ink)]",
                ("highlight" in item && item.highlight) &&
                  "border-transparent bg-[rgba(46,125,50,0.12)] text-[var(--color-forest)]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
