import Link from "next/link";
import { Leaf, Menu, MessageCircle, ShieldCheck } from "lucide-react";
import { BRAND, NAV_ITEMS } from "@/lib/brand";
import { buildWhatsAppUrl } from "@/lib/utils";
import { CartButton } from "./cart-button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(24,44,32,0.72)] backdrop-blur md:border-[var(--color-line)] md:bg-[rgba(248,242,230,0.82)]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-[var(--color-gold)] text-white shadow-[0_12px_30px_rgba(176,138,69,0.35)]">
            <Leaf className="h-5 w-5" />
          </div>
          <div>
            <p className="font-serif-display text-xl leading-none text-white md:text-2xl md:text-[var(--color-forest)]">
              {BRAND.name}
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/70 md:text-[11px] md:tracking-[0.26em] md:text-[var(--color-gold)]">
              Premium Nabhi Wellness Kits
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/85 transition hover:text-white md:text-[var(--color-ink)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <details className="relative md:hidden">
            <summary className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-white/15 bg-white/10 text-white">
              <Menu className="h-5 w-5" />
            </summary>
            <div className="absolute right-0 top-14 z-20 grid min-w-64 gap-2 rounded-[28px] border border-white/12 bg-[rgba(19,39,28,0.95)] p-3 shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-white/88 hover:bg-white/8"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={buildWhatsAppUrl(BRAND.whatsappNumber, BRAND.whatsappOrderMessage)}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-[var(--color-gold)] px-4 py-3 text-sm font-semibold text-white"
              >
                Order on WhatsApp
              </a>
            </div>
          </details>
          <a
            href={buildWhatsAppUrl(BRAND.whatsappNumber, BRAND.whatsappOrderMessage)}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white md:inline-flex md:border-[var(--color-line)] md:bg-white/75 md:text-[var(--color-forest)]"
          >
            <MessageCircle className="h-4 w-4" />
            Order on WhatsApp
          </a>
          <div className="hidden items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-medium text-white/80 md:flex md:bg-[var(--color-surface)] md:text-[var(--color-forest)]">
            <ShieldCheck className="h-4 w-4 text-[var(--color-gold)]" />
            COD Available
          </div>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
