import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { getActiveProducts } from '@/lib/dal/products';
import ProductsTableClient, { AdminProductItem } from '@/components/admin/ProductsTableClient';

export const revalidate = 0;

export default async function ProductsListPage() {
  const supabase = await createClient();

  // Fetch products and categories from Supabase concurrently
  const [productsRes, categoriesRes] = await Promise.all([
    supabase
      .from('products')
      .select('id, name, slug, is_active, category_id, categories(id, name, slug), product_images(url, display_order)')
      .order('created_at', { ascending: false }),
    supabase
      .from('categories')
      .select('id, name')
      .order('name')
  ]);

  let products: AdminProductItem[] = [];

  if (productsRes.data && productsRes.data.length > 0) {
    products = productsRes.data.map((p: any) => {
      const sortedImages = (p.product_images || []).sort(
        (a: any, b: any) => (a.display_order ?? 0) - (b.display_order ?? 0)
      );
      const catName = p.categories?.name || 'Uncategorized';

      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        is_active: p.is_active ?? true,
        primary_image_url: sortedImages[0]?.url || null,
        categoryName: catName,
        category_id: p.category_id,
        categoryNames: [catName],
      };
    });
  } else {
    // Graceful fallback to DAL catalog if DB returned empty or error
    const dalProducts = await getActiveProducts();
    products = dalProducts.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      is_active: true,
      primary_image_url: p.images[0] || null,
      categoryName: p.category || 'Ayurvedic Wellness',
      category_id: null,
      categoryNames: p.categories && p.categories.length > 0 ? p.categories : [p.category],
    }));
  }

  return (
    <div className="space-y-6">
      {/* Header with Title and Add Product Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif text-gray-900 tracking-wide">Products</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your catalog, pricing, and inventory.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm w-full sm:w-auto"
        >
          <Plus size={18} />
          <span>Add Product</span>
        </Link>
      </div>

      {/* Interactive Products Table & Mobile Cards with Real-time Search */}
      <ProductsTableClient
        initialProducts={products}
        categories={categoriesRes.data || []}
      />
    </div>
  );
}
