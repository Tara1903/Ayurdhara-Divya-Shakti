import { getActiveProducts } from "@/lib/dal/products";
import HomepageClient from "./HomepageClient";
import WellnessPopup from "@/components/WellnessPopup";

export default async function Home() {
  const products = await getActiveProducts();

  return (
    <main>
      <WellnessPopup />
      <HomepageClient products={products} />
    </main>
  );
}