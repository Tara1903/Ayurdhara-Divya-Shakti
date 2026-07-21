import { notFound } from "next/navigation";
import { getProductBySlug, getAllProductSlugs } from "@/data/productData";
import PDPClient from "@/components/PDPClient";

export async function generateStaticParams() {
  const slugs = getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | Ayurdhara Divya Shakti`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [product.images[0]],
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return <PDPClient product={product} />;
}
