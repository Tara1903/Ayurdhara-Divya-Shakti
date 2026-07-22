import { Suspense } from 'react';
import { getActiveProducts } from "@/lib/dal/products";
import CollectionsClient from "./CollectionsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Collections - Ayurdhara Divya Shakti",
  description: "Browse our complete range of premium Ayurvedic wellness products.",
};

export default async function CollectionsPage() {
  const products = await getActiveProducts();
  
  return (
    <div className="bg-sand min-h-screen">
      <div className="container py-8">
        <h1 className="heading-brand text-4xl mb-2 text-charcoal">All Products</h1>
        <p className="text-body text-stone mb-8">Discover our range of authentic Ayurvedic formulations designed for your specific wellness needs.</p>
        <Suspense fallback={<div className="py-20 text-center text-stone">Loading collection...</div>}>
          <CollectionsClient initialProducts={products} />
        </Suspense>
      </div>
    </div>
  );
}