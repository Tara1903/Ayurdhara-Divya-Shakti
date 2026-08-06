import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Package, Plus, Eye, DollarSign } from 'lucide-react';

export const revalidate = 0;

export default async function CashOrdersPage({ searchParams }: { searchParams: Promise<any> }) {
  const supabase = await createClient();
  const params = await searchParams;
  
  // Build query
  let query = supabase
    .from('cash_orders')
    .select(`*`)
    .order('created_at', { ascending: false })
    .limit(50);
  
  if (params.status) query = query.eq('order_status', params.status);
  
  const { data: orders } = await query;
  
  const statusColor: Record<string, string> = {
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    returned: 'bg-gray-100 text-gray-800',
    refunded: 'bg-orange-100 text-orange-800',
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Cash / Offline Orders</h1>
          <p className="text-gray-500 mt-1">Manage physical store purchases and offline cash orders.</p>
        </div>
        <Link 
          href="/admin/cash-orders/new" 
          className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#333] text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          <Plus size={18} />
          Create Cash Order
        </Link>
      </div>
      
      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'completed', 'cancelled', 'returned', 'refunded'].map(s => (
          <Link
            key={s}
            href={s === 'all' ? '/admin/cash-orders' : `/admin/cash-orders?status=${s}`}
            className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
              (params.status === s || (!params.status && s === 'all'))
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >{s}</Link>
        ))}
      </div>
      
      {/* Orders Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Ref</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Partner</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders?.map((order: any) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm font-medium text-gray-900">{order.order_ref}</span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="font-medium text-gray-900">{order.customer_name}</div>
                    <div className="text-gray-500 text-xs">{order.mobile_number}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(order.sale_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    ₹{order.final_total?.toLocaleString('en-IN')}
                    <div className="text-xs text-green-600 flex items-center gap-1 mt-0.5"><DollarSign size={12} /> Cash</div>
                  </td>
                  <td className="px-6 py-4">
                    {order.wellness_partner_code ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                        WP: {order.wellness_partner_code}
                      </span>
                    ) : order.retail_partner_code ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        RP: {order.retail_partner_code}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                      statusColor[order.order_status] || 'bg-gray-100 text-gray-800'
                    }`}>
                      {order.order_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/cash-orders/${order.id}`}
                      className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-800 font-medium"
                    >
                      <Eye size={16} /> View
                    </Link>
                  </td>
                </tr>
              ))}
              {(!orders || orders.length === 0) && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                    <Package className="mx-auto mb-3 opacity-30" size={32} />
                    <p>No cash orders found</p>
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
