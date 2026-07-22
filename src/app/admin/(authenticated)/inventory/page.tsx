import { createClient } from '@/lib/supabase/server';
import { AdjustStockButton } from './AdjustStockButton';
import { Package, AlertTriangle, XCircle } from 'lucide-react';

export const revalidate = 0;

export default async function InventoryPage() {
  const supabase = await createClient();
  
  const { data: variants } = await supabase
    .from('product_variants')
    .select(`
      id, size, price, sku, stock_quantity, reserved_quantity, is_active, low_stock_threshold,
      products!inner(id, name, slug, is_active)
    `)
    .eq('products.is_active', true)
    .order('stock_quantity', { ascending: true });

  const getStatus = (v: any) => {
    const available = (v.stock_quantity || 0) - (v.reserved_quantity || 0);
    if (available <= 0) return 'out_of_stock';
    if (available <= (v.low_stock_threshold || 10)) return 'low_stock';
    return 'in_stock';
  };

  const outOfStock = (variants || []).filter(v => getStatus(v) === 'out_of_stock');
  const lowStock = (variants || []).filter(v => getStatus(v) === 'low_stock');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif text-gray-900">Inventory</h1>
        <p className="text-gray-500 mt-1">Monitor and manage stock levels for all product variants.</p>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg"><Package className="text-green-600" size={20} /></div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{(variants || []).length - outOfStock.length - lowStock.length}</p>
              <p className="text-sm text-gray-500">In Stock</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-amber-200 rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 rounded-lg"><AlertTriangle className="text-amber-600" size={20} /></div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{lowStock.length}</p>
              <p className="text-sm text-gray-500">Low Stock</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-red-200 rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 rounded-lg"><XCircle className="text-red-600" size={20} /></div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{outOfStock.length}</p>
              <p className="text-sm text-gray-500">Out of Stock</p>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Product / Variant</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Physical</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Reserved</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Available</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Adjust</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(variants || []).map((v: any) => {
                const status = getStatus(v);
                const available = (v.stock_quantity || 0) - (v.reserved_quantity || 0);
                return (
                  <tr key={v.id} className={`hover:bg-gray-50 transition-colors ${
                    status === 'out_of_stock' ? 'bg-red-50/30' : 
                    status === 'low_stock' ? 'bg-amber-50/30' : ''
                  }`}>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 text-sm">{v.products?.name}</div>
                      <div className="text-xs text-gray-500">{v.size}</div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-gray-500">{v.sku || '—'}</td>
                    <td className="px-6 py-4 text-center text-sm">{v.stock_quantity || 0}</td>
                    <td className="px-6 py-4 text-center text-sm text-amber-700">{v.reserved_quantity || 0}</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold">{available}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        status === 'out_of_stock' ? 'bg-red-100 text-red-800' :
                        status === 'low_stock' ? 'bg-amber-100 text-amber-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <AdjustStockButton variantId={v.id} productName={`${v.products?.name} (${v.size})`} currentStock={v.stock_quantity || 0} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
