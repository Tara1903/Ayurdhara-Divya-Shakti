import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/brand/add-to-cart-button";
import { buttonStyles } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-[var(--color-line)] bg-white/88 shadow-[0_18px_60px_rgba(61,44,20,0.08)]">
      <div className="relative aspect-[1/1.05] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="space-y-5 p-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">
            5+1 Nabhi Therapy Kit
          </p>
          <h3 className="font-serif-display text-3xl leading-tight text-[var(--color-ink)]">
            {product.name}
          </h3>
          <p className="text-sm leading-7 text-[var(--color-muted)]">
            {product.shortBenefit}
          </p>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div className="space-y-1">
            <p className="text-2xl font-semibold text-[var(--color-forest)]">
              {formatCurrency(product.price)}
            </p>
            <p className="text-sm text-[var(--color-muted)]">
              <span className="line-through">
                {formatCurrency(product.originalPrice)}
              </span>{" "}
              <span className="font-medium text-[var(--color-gold)]">
                Save ₹1600
              </span>
            </p>
          </div>
          <p className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-xs font-semibold text-[var(--color-forest)]">
            30-60 Day System
          </p>
        </div>

        <div className="grid gap-3">
          <Link
            href={`/products/${product.slug}`}
            className={buttonStyles({ variant: "secondary", className: "w-full" })}
          >
            View Details
          </Link>
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}
