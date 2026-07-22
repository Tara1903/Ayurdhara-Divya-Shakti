import { notFound } from "next/navigation";
import { getAllActiveProductSlugs, getProductBySlugFromDB } from "@/lib/dal/products";
import { getProductBySlug as getStaticProductBySlug, getAllProductSlugs as getStaticSlugs } from "@/data/productData";
import PDPClient from "@/components/PDPClient";

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateStaticParams() {
  // Try Supabase first, fall back to static
  try {
    const slugs = await getAllActiveProductSlugs();
    if (slugs.length > 0) {
      return slugs.map((slug) => ({ slug }));
    }
  } catch {}
  
  // Fallback to static
  const slugs = getStaticSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  // Try Supabase first
  let product = null;
  try {
    product = await getProductBySlugFromDB(resolvedParams.slug);
  } catch {}
  
  // Fall back to static data
  if (!product) {
    product = getStaticProductBySlug(resolvedParams.slug) || null;
  }

  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | Ayurdhara Divya Shakti`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.images[0] ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  // Try Supabase first
  let product = null;
  try {
    product = await getProductBySlugFromDB(resolvedParams.slug);
  } catch {}
  
  // Fall back to static data if Supabase returns nothing
  if (!product) {
    const staticProduct = getStaticProductBySlug(resolvedParams.slug);
    if (staticProduct) {
      product = staticProduct;
    }
  }

  if (!product) {
    notFound();
  }

  return <PDPClient product={product} />;
}
