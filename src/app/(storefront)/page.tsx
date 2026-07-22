import { getActiveProducts } from "@/lib/dal/products";
import HomepageClient from "./HomepageClient";

export default async function Home() {
  const products = await getActiveProducts();

  return (
    <main>
      <HomepageClient products={products} />
    </main>
  );
}