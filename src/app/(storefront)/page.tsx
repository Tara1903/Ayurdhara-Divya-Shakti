import { getActiveProducts, getActiveCategories } from "@/lib/dal/products";
import HomepageClient from "./HomepageClient";
import PopupManager from "@/components/PopupManager";

export const revalidate = 60;

export default async function Home() {
  const [products, categories] = await Promise.all([
    getActiveProducts(),
    getActiveCategories(),
  ]);

  return (
    <main>
      {/* Popup Manager handles sequencing of Newsletter -> Wellness popups */}
      <PopupManager />
      <HomepageClient products={products} categories={categories} />
    </main>
  );
}