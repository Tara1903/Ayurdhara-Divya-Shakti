import Image from "next/image";
import { ArrowRight, CheckCircle2, MessageCircle, MoonStar, ShieldCheck, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/brand/product-card";
import { PurchaseLink } from "@/components/brand/purchase-link";
import { Reveal } from "@/components/brand/reveal";
import { SectionHeading } from "@/components/brand/section-heading";
import { BRAND } from "@/lib/brand";
import {
  howItWorks,
  lifestyleProblems,
  products as fallbackProducts,
  testimonials,
  whyChooseUs,
} from "@/lib/data";
import { listProducts } from "@/lib/repositories";
import { buildWhatsAppUrl, formatCurrency } from "@/lib/utils";

export default async function HomePage() {
  const products = await listProducts();
  const featuredVisual = products[0] ?? fallbackProducts[0];

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="ambient-orb -left-10 top-24 h-36 w-36 bg-[rgba(31,94,52,0.18)]" />
        <div className="ambient-orb right-0 top-0 h-48 w-48 bg-[rgba(223,194,137,0.35)]" />
        <div className="page-shell grid min-h-[calc(100svh-5.25rem)] items-center gap-12 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:py-16">
          <Reveal>
            <div className="max-w-xl space-y-8">
              <div className="space-y-4">
                <p className="eyebrow">AYURDHARA DIVYA SHAKTI</p>
                <h1 className="font-serif-display text-5xl leading-[0.88] text-[var(--color-ink)] md:text-7xl">
                  Ancient Ayurvedic Healing for modern lifestyle imbalance.
                </h1>
                <p className="max-w-lg text-lg leading-8 text-[var(--color-muted)]">
                  Premium Ayurvedic Nabhi Wellness Kits designed as a complete 5+1
                  nightly ritual for stress, sleep, digestion, immunity, beauty,
                  recovery, and daily body balance.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <PurchaseLink href="/kits" className="gap-2">
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </PurchaseLink>
                <a
                  href={buildWhatsAppUrl(BRAND.whatsappNumber, BRAND.whatsappOrderMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white/80 px-5 py-3 text-sm font-semibold text-[var(--color-forest)]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Order via WhatsApp
                </a>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-[var(--color-muted)]">
                    Offer Price
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-[var(--color-forest)]">
                    {formatCurrency(BRAND.offerPrice)}
                  </p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-[var(--color-muted)]">
                    Original
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-[var(--color-ink)] line-through opacity-60">
                    {formatCurrency(BRAND.originalPrice)}
                  </p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-[var(--color-muted)]">
                    Savings
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-[var(--color-gold)]">
                    ₹{BRAND.savings} OFF
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-[var(--color-muted)]">
                <span className="rounded-full bg-white/70 px-4 py-2">6 specialized Ayurvedic oils</span>
                <span className="rounded-full bg-white/70 px-4 py-2">30-60 day healing system</span>
                <span className="rounded-full bg-white/70 px-4 py-2">Cash on Delivery available</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative hero-glow overflow-hidden rounded-[40px] p-4 md:p-6">
              <div className="soft-grid absolute inset-0 opacity-40" />
              <div className="relative grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="relative aspect-[0.92/1.08] overflow-hidden rounded-[32px]">
                  <Image
                    src={featuredVisual.image}
                    alt={featuredVisual.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                  <div className="absolute inset-x-4 bottom-4 rounded-[24px] bg-[rgba(18,39,27,0.72)] p-4 text-white backdrop-blur">
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gold-soft)]">
                      5+1 Nabhi Therapy
                    </p>
                    <p className="mt-2 font-serif-display text-3xl">{featuredVisual.name}</p>
                    <p className="mt-2 text-sm leading-7 text-white/80">
                      {featuredVisual.shortBenefit}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-5 rounded-[32px] bg-[rgba(255,251,244,0.78)] p-6">
                  <div className="space-y-4">
                    <p className="eyebrow">Why it feels premium</p>
                    <h2 className="font-serif-display text-4xl leading-[0.95] text-[var(--color-ink)]">
                      A complete wellness system, not just another oil bottle.
                    </h2>
                    <p className="text-base leading-7 text-[var(--color-muted)]">
                      Each kit is positioned as a premium alternative to scattered
                      therapies, with a structured nightly ritual built around the
                      navel as a calm absorption point.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      "5 targeted navel oils plus 1 support oil",
                      "Daily ritual designed for stress, sleep, digestion, and vitality",
                      "Alternative to fragmented wellness spending that can cross ₹5000+",
                    ].map((point) => (
                      <div key={point} className="flex gap-3">
                        <CheckCircle2 className="mt-1 h-5 w-5 text-[var(--color-gold)]" />
                        <p className="text-sm leading-7 text-[var(--color-muted)]">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="page-shell section-space pt-8">
        <Reveal>
          <SectionHeading
            eyebrow="Modern Problems"
            title="Built for the lifestyle signals your body keeps repeating."
            description="The first job of the storefront is clarity: helping the customer recognize the pattern before introducing the healing ritual."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-5">
          {lifestyleProblems.map((problem, index) => (
            <Reveal key={problem} delay={index * 0.04}>
              <div className="section-frame px-5 py-6 text-center">
                <p className="font-serif-display text-3xl text-[var(--color-ink)]">{problem}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="nabhi-therapy" className="page-shell section-space">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div className="space-y-6">
              <p className="eyebrow">Nabhi Therapy</p>
              <h2 className="font-serif-display text-5xl leading-[0.94] text-[var(--color-ink)]">
                A simple bedtime ritual rooted in Ayurvedic wisdom.
              </h2>
              <p className="max-w-xl text-base leading-8 text-[var(--color-muted)]">
                Nabhi therapy is explained simply: the navel is treated as a
                central point linked with multiple body nerves. Oils placed here
                are absorbed slowly and become part of a calming, daily support
                routine for internal balance.
              </p>
              <div className="section-frame grid gap-4 p-6">
                <div className="flex gap-3">
                  <MoonStar className="mt-1 h-5 w-5 text-[var(--color-gold)]" />
                  <p className="text-sm leading-7 text-[var(--color-muted)]">
                    Apply 2-3 drops in the navel before sleep.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Sparkles className="mt-1 h-5 w-5 text-[var(--color-gold)]" />
                  <p className="text-sm leading-7 text-[var(--color-muted)]">
                    Use daily as a calm, disciplined ritual rather than an
                    occasional fix.
                  </p>
                </div>
                <div className="flex gap-3">
                  <ShieldCheck className="mt-1 h-5 w-5 text-[var(--color-gold)]" />
                  <p className="text-sm leading-7 text-[var(--color-muted)]">
                    Visible changes are often noticed within 7-14 days, with
                    deeper routine value over 30-60 days.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid gap-4">
              {howItWorks.map((item) => (
                <div key={item.step} className="section-frame flex gap-5 px-6 py-6 md:px-8">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[var(--color-forest)] text-sm font-semibold tracking-[0.2em] text-white">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-serif-display text-3xl text-[var(--color-ink)]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="page-shell section-space">
        <Reveal>
          <SectionHeading
            eyebrow="Wellness Kits"
            title="Choose the 5+1 Nabhi Therapy system that matches your need."
            description="Each kit is built as a complete 30-60 day healing system with clear benefits, usage guidance, and a price point that feels justified."
            action={<PurchaseLink href="/kits" variant="secondary">View All Kits</PurchaseLink>}
          />
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.04}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="page-shell section-space">
        <div className="section-frame overflow-hidden p-6 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="space-y-5">
                <p className="eyebrow">Price Justification</p>
                <h2 className="font-serif-display text-5xl leading-[0.94] text-[var(--color-ink)]">
                  Why the ₹4100 value feels real.
                </h2>
                <p className="text-base leading-8 text-[var(--color-muted)]">
                  The offer is anchored in six specialized Ayurvedic oils, a
                  multi-problem routine, long-term use, and the relief of not
                  chasing separate treatments for each concern.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[30px] bg-[var(--color-forest)] p-6 text-white">
                  <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-gold-soft)]">
                    Comparison
                  </p>
                  <p className="mt-4 font-serif-display text-4xl leading-[0.95]">
                    {BRAND.treatmentComparisonLabel}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-white/76">
                    Individual consultations, topical products, or fragmented
                    therapies often cost more and feel less structured.
                  </p>
                </div>
                <div className="rounded-[30px] bg-[var(--color-surface)] p-6">
                  <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-gold)]">
                    Our System
                  </p>
                  <p className="mt-4 font-serif-display text-4xl leading-[0.95] text-[var(--color-ink)]">
                    {BRAND.treatmentComparisonValue}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                    One nightly ritual, one clear purchase decision, and one
                    premium healing narrative.
                  </p>
                </div>
                <div className="md:col-span-2">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {whyChooseUs.map((item) => (
                      <div key={item} className="rounded-[24px] border border-[var(--color-line)] bg-white/80 px-5 py-5">
                        <p className="text-sm leading-7 text-[var(--color-muted)]">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="testimonials" className="page-shell section-space">
        <Reveal>
          <SectionHeading
            eyebrow="Testimonials"
            title="Customers describe the kits as calming, structured, and worth the ritual."
            description="Trust grows when the product feels like a thoughtful system instead of a rushed quick-fix."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.05}>
              <blockquote className="section-frame h-full px-6 py-6">
                <p className="font-serif-display text-3xl leading-[1.05] text-[var(--color-ink)]">
                  “{testimonial.quote}”
                </p>
                <footer className="mt-6 text-sm text-[var(--color-muted)]">
                  {testimonial.name} · {testimonial.location}
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="page-shell section-space pt-4">
        <Reveal>
          <div className="overflow-hidden rounded-[40px] bg-[var(--color-forest)] px-6 py-10 text-white md:px-10 md:py-12">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--color-gold-soft)]">
                  Final Call To Action
                </p>
                <h2 className="font-serif-display text-5xl leading-[0.92]">
                  Bring Ayurvedic healing into your nightly lifestyle.
                </h2>
                <p className="max-w-2xl text-base leading-8 text-white/78">
                  Shop the full range of 5+1 Nabhi Therapy wellness kits or place
                  your order directly on WhatsApp for a simpler buying journey.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <PurchaseLink
                  href="/kits"
                  className="bg-white text-[var(--color-forest)] hover:bg-[var(--color-surface)]"
                >
                  Buy Now
                </PurchaseLink>
                <a
                  href={buildWhatsAppUrl(BRAND.whatsappNumber, BRAND.whatsappOrderMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 px-5 py-3 text-sm font-semibold text-white"
                >
                  <MessageCircle className="h-4 w-4" />
                  Order via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
