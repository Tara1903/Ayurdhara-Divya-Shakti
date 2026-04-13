import { ProductShowcaseCard } from "@/components/brand/product-showcase-card";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  return <ProductShowcaseCard product={product} variant="standard" />;
}
