import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2, MessageCircle, ShieldCheck } from "lucide-react";
import { AddToCartButton } from "@/components/brand/add-to-cart-button";
import { PurchaseLink } from "@/components/brand/purchase-link";
import { Reveal } from "@/components/brand/reveal";
import { BRAND } from "@/lib/brand";
import { products as fallbackProducts } from "@/lib/data";
import { getProductBySlug } from "@/lib/repositories";
import { buildWhatsAppUrl, formatCurrency } from "@/lib/utils";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return fallbackProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: `Product Not Found | ${BRAND.name}`,
    };
  }

  return {
    title: `${product.name} | ${BRAND.name}`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const orderMessage = `Hi, I want to order the ${product.name} from Ayurdhara Divya Shakti.`;

  return (
    <section className="page-shell section-space">
      <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
        <Reveal>
          <div className="relative aspect-[0.96/1] overflow-hidden rounded-[40px]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-x-6 bottom-6 rounded-[28px] bg-[rgba(15,38,25,0.74)] p-5 text-white backdrop-blur">
              <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-gold-soft)]">
                5+1 Nabhi Therapy Kit
              </p>
              <p className="mt-2 font-serif-display text-4xl leading-none">{product.name}</p>
              <p className="mt-3 text-sm leading-7 text-white/80">
                {product.durationLabel}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="eyebrow">Premium Ayurvedic Wellness Kit</p>
              <h1 className="font-serif-display text-5xl leading-[0.92] text-[var(--color-ink)] md:text-6xl">
                {product.name}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[var(--color-muted)]">
                {product.description}
              </p>
            </div>

            <div className="section-frame p-6">
              <div className="flex flex-wrap items-end gap-4">
                <p className="text-4xl font-semibold text-[var(--color-forest)]">
                  {formatCurrency(product.price)}
                </p>
                <p className="text-xl text-[var(--color-muted)] line-through">
                  {formatCurrency(product.originalPrice)}
                </p>
                <p className="rounded-full bg-[var(--color-gold)] px-4 py-2 text-sm font-semibold text-white">
                  Save ₹1600
                </p>
              </div>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                Alternative to fragmented care routines that can easily cost
                ₹5000+, while still leaving the customer with no single daily system.
              </p>

              <div className="mt-6 grid gap-3">
                <AddToCartButton product={product} />
                <a
                  href={buildWhatsAppUrl(BRAND.whatsappNumber, orderMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-line)] bg-white/80 px-5 py-3 text-sm font-semibold text-[var(--color-forest)]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Order on WhatsApp
                </a>
              </div>

              <div className="mt-6 flex items-center gap-3 text-sm text-[var(--color-muted)]">
                <ShieldCheck className="h-4 w-4 text-[var(--color-gold)]" />
                Cash on Delivery Available
              </div>
            </div>

            <div className="grid gap-3">
              <div className="section-frame p-6">
                <p className="eyebrow">Problem It Solves</p>
                <p className="mt-3 text-base leading-8 text-[var(--color-muted)]">
                  {product.problemStatement}
                </p>
              </div>
              <div className="section-frame p-6">
                <p className="eyebrow">Results Timeline</p>
                <div className="mt-4 grid gap-3">
                  {product.expectedTimeline.map((step) => (
                    <div key={step} className="flex gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 text-[var(--color-gold)]" />
                      <p className="text-sm leading-7 text-[var(--color-muted)]">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal>
          <div className="space-y-8">
            <section className="section-frame p-6 md:p-8">
              <p className="eyebrow">Benefits</p>
              <div className="mt-5 grid gap-3">
                {product.benefits.map((benefit) => (
                  <div key={benefit} className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-[var(--color-gold)]" />
                    <p className="text-sm leading-7 text-[var(--color-muted)]">{benefit}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="section-frame p-6 md:p-8">
              <p className="eyebrow">What&apos;s Inside</p>
              <div className="mt-5 grid gap-4">
                {product.whatsInside.map((oil) => (
                  <div key={oil.name} className="rounded-[24px] bg-[var(--color-surface)] px-5 py-5">
                    <h2 className="font-serif-display text-3xl text-[var(--color-ink)]">
                      {oil.name}
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                      {oil.purpose}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="space-y-8">
            <section className="section-frame p-6 md:p-8">
              <p className="eyebrow">How To Use</p>
              <div className="mt-5 grid gap-4">
                {product.usageMethod.map((item) => (
                  <div key={item} className="rounded-[24px] bg-[var(--color-surface)] px-5 py-5">
                    <p className="text-sm leading-7 text-[var(--color-muted)]">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="section-frame p-6 md:p-8">
              <p className="eyebrow">Who Should Use</p>
              <div className="mt-5 grid gap-4">
                {product.whoShouldUse.map((item) => (
                  <div key={item} className="rounded-[24px] bg-[var(--color-surface)] px-5 py-5">
                    <p className="text-sm leading-7 text-[var(--color-muted)]">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="section-frame p-6 md:p-8">
              <p className="eyebrow">Ingredients Feel</p>
              <div className="mt-5 grid gap-4">
                {product.ingredientsFeel.map((item) => (
                  <div key={item} className="rounded-[24px] bg-[var(--color-surface)] px-5 py-5">
                    <p className="text-sm leading-7 text-[var(--color-muted)]">{item}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <section className="mt-16 section-frame p-6 md:p-8">
          <div className="max-w-2xl">
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-3 font-serif-display text-4xl text-[var(--color-ink)]">
              Answers before the order.
            </h2>
          </div>

          <div className="mt-8 grid gap-4">
            {product.faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-[26px] border border-[var(--color-line)] bg-white/82 px-5 py-5"
              >
                <summary className="cursor-pointer font-medium text-[var(--color-ink)]">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <AddToCartButton product={product} />
            <PurchaseLink href="/checkout" variant="secondary">
              Go to Checkout
            </PurchaseLink>
          </div>
        </section>
      </Reveal>
    </section>
  );
}
