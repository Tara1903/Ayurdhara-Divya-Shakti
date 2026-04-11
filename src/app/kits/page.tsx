import type { Metadata } from "next";
import { ProductCard } from "@/components/brand/product-card";
import { PurchaseLink } from "@/components/brand/purchase-link";
import { Reveal } from "@/components/brand/reveal";
import { SectionHeading } from "@/components/brand/section-heading";
import { BRAND } from "@/lib/brand";
import { listProducts } from "@/lib/repositories";

export const metadata: Metadata = {
  title: `All Wellness Kits | ${BRAND.name}`,
  description:
    "Explore all 5+1 Nabhi Therapy wellness kits from Ayurdhara Divya Shakti, designed for stress, sleep, digestion, beauty, recovery, family care, and daily balance.",
};

export default async function KitsPage() {
  const products = await listProducts();

  return (
    <section className="page-shell section-space">
      <Reveal>
        <SectionHeading
          eyebrow="Wellness Kits"
          title="Six targeted Nabhi Therapy systems for six different lifestyle needs."
          description="Every product is framed as a premium 5+1 healing routine, with clear benefits, usage guidance, and long-term value."
          action={<PurchaseLink href="/cart" variant="secondary">View Cart</PurchaseLink>}
        />
      </Reveal>

      <div className="mt-10 flex flex-wrap gap-3">
        {products.map((product) => (
          <a
            key={product.id}
            href={`#${product.slug}`}
            className="rounded-full border border-[var(--color-line)] bg-white/70 px-4 py-2 text-sm font-medium text-[var(--color-forest)]"
          >
            {product.name}
          </a>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {products.map((product, index) => (
          <Reveal key={product.id} delay={index * 0.04}>
            <div id={product.slug}>
              <ProductCard product={product} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
