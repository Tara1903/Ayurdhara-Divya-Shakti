import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { buildWhatsAppUrl } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[var(--color-line)] bg-[#173324] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_0.8fr_0.8fr] md:px-8">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--color-gold)]">
            AYURDHARA DIVYA SHAKTI
          </p>
          <h2 className="max-w-md font-serif-display text-4xl leading-[0.95]">
            Premium Ayurvedic nabhi wellness for the modern lifestyle body.
          </h2>
          <p className="max-w-md text-sm leading-7 text-white/72">
            A calm, trust-led healing commerce experience built to educate,
            justify value, and convert visitors into long-term ritual buyers.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-[var(--color-gold)]">Explore</p>
          <div className="grid gap-2 text-sm text-white/72">
            <Link href="/kits">All Kits</Link>
            <Link href="/#nabhi-therapy">Nabhi Therapy</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/admin/login">Admin</Link>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-[var(--color-gold)]">
            Order Support
          </p>
          <a
            href={buildWhatsAppUrl(BRAND.whatsappNumber, BRAND.whatsappOrderMessage)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full bg-[var(--color-gold)] px-4 py-3 text-sm font-semibold text-white"
          >
            Order on WhatsApp
          </a>
          <p className="text-sm leading-7 text-white/72">
            Cash on Delivery available across the order flow.
          </p>
        </div>
      </div>
    </footer>
  );
}
