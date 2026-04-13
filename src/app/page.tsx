import { HomepageContent } from "@/components/brand/homepage-content";
import { products as fallbackProducts } from "@/lib/data";
import { listProducts } from "@/lib/repositories";

function mergeProductsBySlug(primary: typeof fallbackProducts, fallback: typeof fallbackProducts) {
  const merged = new Map(fallback.map((product) => [product.slug, product]));

  primary.forEach((product) => {
    merged.set(product.slug, product);
  });

  return Array.from(merged.values());
}

export default async function HomePage() {
  const liveProducts = await listProducts();
  const storefrontProducts = mergeProductsBySlug(liveProducts, fallbackProducts);

  return <HomepageContent products={storefrontProducts} />;
}
