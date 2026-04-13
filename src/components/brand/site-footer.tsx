import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { buildWhatsAppUrl } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer id="contact" className="mt-20 border-t border-[var(--color-line)] bg-[#163322] text-white">
      <div className="page-shell grid gap-10 py-14 md:grid-cols-[1.2fr_0.85fr_0.85fr_0.9fr]">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--color-gold)]">
            {BRAND.name}
          </p>
          <h2 className="max-w-md font-serif-display text-4xl leading-[0.95]">
            Premium Ayurvedic shopping built around curated routines, not crowded shelves.
          </h2>
          <p className="max-w-md text-sm leading-7 text-white/72">
            Explore wellness kits, oils, powders, raw herbs, and bundle-led rituals in one calm, premium storefront.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-[var(--color-gold)]">Shop</p>
          <div className="grid gap-2 text-sm text-white/72">
            <Link href="/wellness-kits">Wellness Kits</Link>
            <Link href="/herbal-powders">Herbal Powders</Link>
            <Link href="/herbal-oils">Herbal Oils</Link>
            <Link href="/combos">Combos</Link>
            <Link href="/raw-herbs">Raw Herbs</Link>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-[var(--color-gold)]">Explore</p>
          <div className="grid gap-2 text-sm text-white/72">
            <Link href="/how-it-works">How It Works</Link>
            <Link href="/#testimonials">Testimonials</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/admin/login">Admin</Link>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-[var(--color-gold)]">Contact</p>
          <p className="text-sm leading-7 text-white/72">{BRAND.supportPhone}</p>
          <p className="text-sm leading-7 text-white/72">{BRAND.supportEmail}</p>
          <a
            href={buildWhatsAppUrl(BRAND.whatsappNumber, BRAND.whatsappOrderMessage)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full bg-[var(--color-gold)] px-4 py-3 text-sm font-semibold text-white"
          >
            Order on WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
