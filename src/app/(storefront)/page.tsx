import { getActiveProducts } from "@/lib/dal/products";
import HomepageClient from "./HomepageClient";
import PopupManager from "@/components/PopupManager";

export default async function Home() {
  const products = await getActiveProducts();

  return (
    <main>
      {/* Popup Manager handles sequencing of Newsletter -> Wellness popups */}
      <PopupManager />
      <HomepageClient products={products} />
    </main>
  );
}