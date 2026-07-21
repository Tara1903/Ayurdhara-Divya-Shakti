import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Search, Filter, Edit, Trash2, Image as ImageIcon } from 'lucide-react';

export const revalidate = 0;

export default async function ProductsListPage() {
  const supabase = await createClient();
  
  const { data: products } = await supabase
    .from('products')
    .select(`
      id,
      name,
      slug,
      is_active,
      primary_image_url,
      categories(name)
    `)
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif text-gray-900 tracking-wide">Products</h1>
          <p className="text-gray-500 mt-1">Manage your catalog, pricing, and inventory.</p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          <Plus size={18} />
          <span>Add Product</span>
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-50/50">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Filter size={16} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products?.map((product: any) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-md bg-gray-100 border border-gray-200 overflow-hidden relative flex-shrink-0">
                        {product.primary_image_url ? (
                          <img src={product.primary_image_url} alt={product.name} className="object-cover w-full h-full" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <ImageIcon size={20} />
                          </div>
                        )}
                      </div>
                      <div>
                        <Link href={`/admin/products/${product.id}`} className="font-medium text-gray-900 hover:text-emerald-600">
                          {product.name}
                        </Link>
                        <p className="text-xs text-gray-500 mt-0.5">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {product.categories ? product.categories.name : 'Uncategorized'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {product.is_active ? 'Active' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/admin/products/${product.id}`} className="p-2 text-gray-400 hover:text-emerald-600 rounded-md hover:bg-emerald-50">
                        <Edit size={16} />
                      </Link>
                      <button className="p-2 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {(!products || products.length === 0) && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    No products found. Start by creating your first product.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
