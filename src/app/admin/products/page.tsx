import { AdminShell } from "@/components/admin/admin-shell";
import { ProductEditorForm } from "@/components/admin/product-editor-form";
import { requireAdmin } from "@/lib/admin-auth";
import { listProducts } from "@/lib/repositories";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  await requireAdmin();
  const products = await listProducts();

  return (
    <AdminShell
      title="Product Management"
      description="Create, refine, and manage the six Nabhi therapy kits with all product messaging and structured details in one place."
    >
      <div className="grid gap-6">
        <ProductEditorForm />
        {products.map((product) => (
          <ProductEditorForm key={product.id} product={product} />
        ))}
      </div>
    </AdminShell>
  );
}
