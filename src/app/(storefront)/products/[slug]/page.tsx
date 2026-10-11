import { notFound } from "next/navigation";
import { getAllActiveProductSlugs, getProductBySlugFromDB } from "@/lib/dal/products";
import PDPClient from "@/components/PDPClient";

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateStaticParams() {
  const isSafeSlug = (s: string) => !/[<>:"/\\|?*\x00-\x1F]/.test(s);
  try {
    const slugs = await getAllActiveProductSlugs();
    return slugs.filter(isSafeSlug).map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  let product = null;
  try {
    product = await getProductBySlugFromDB(resolvedParams.slug);
  } catch {}

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
  let product = null;
  try {
    product = await getProductBySlugFromDB(resolvedParams.slug);
  } catch {}

  if (!product) {
    notFound();
  }

  return <PDPClient product={product} />;
}
