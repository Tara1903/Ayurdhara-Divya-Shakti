import { BrandStory } from "@/components/brand/brand-story";
import { CategoryGrid } from "@/components/brand/category-grid";
import { FeaturedProductsGrid } from "@/components/brand/featured-products-grid";
import { HeroCarousel } from "@/components/brand/hero-carousel";
import { ProductCarouselRow } from "@/components/brand/product-carousel-row";
import { TestimonialsStrip } from "@/components/brand/testimonials-strip";
import { TrustBadges } from "@/components/brand/trust-badges";
import { testimonials } from "@/lib/data";
import {
  brandStory,
  buildFeaturedProducts,
  buildHeroSlides,
  buildProductRails,
  categoryShowcase,
  trustBadges,
} from "@/lib/storefront/home";
import type { Product } from "@/types";

export function HomepageContent({ products }: { products: Product[] }) {
  const heroSlides = buildHeroSlides(products);
  const featuredProducts = buildFeaturedProducts(products);
  const productRails = buildProductRails(products);

  return (
    <>
      <HeroCarousel slides={heroSlides} />
      <FeaturedProductsGrid products={featuredProducts} />
      <CategoryGrid categories={categoryShowcase} />

      <section className="page-shell section-space pb-12 pt-2">
        <div className="space-y-2 pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--color-gold)]">
            Shop Faster
          </p>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-3xl font-serif-display text-4xl leading-[0.94] text-[var(--color-ink)] md:text-5xl">
              Amazon-style product rails, adapted for a premium Ayurvedic storefront.
            </h2>
            <p className="max-w-xl text-sm leading-7 text-[var(--color-muted)] md:text-base">
              Swipe, scan, compare, and move deeper into the catalog without fighting long content blocks.
            </p>
          </div>
        </div>

        <div className="space-y-12">
          {productRails.map((rail) => (
            <ProductCarouselRow
              key={rail.id}
              title={rail.title}
              subtitle={rail.subtitle}
              href={rail.href}
              products={rail.products}
            />
          ))}
        </div>
      </section>

      <TrustBadges items={trustBadges} />
      <BrandStory story={brandStory} />
      <TestimonialsStrip items={testimonials.slice(0, 5)} />
    </>
  );
}
