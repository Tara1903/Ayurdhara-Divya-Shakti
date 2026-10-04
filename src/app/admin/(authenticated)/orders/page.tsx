import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Package, Search, Filter, Eye, Smartphone, Globe, ShoppingBag } from 'lucide-react';

export const revalidate = 0;

export default async function OrdersPage({ searchParams }: { searchParams: Promise<any> }) {
  const supabase = await createClient();
  const params = await searchParams;
  
  // Build query
  let query = supabase
    .from('orders')
    .select(`
      id, order_ref, order_status, payment_status, payment_method, 
      final_total, created_at, shipping_address_snapshot,
      profiles(full_name)
    `)
    .order('created_at', { ascending: false })
    .limit(100);
  
  if (params.status && params.status !== 'all') {
    query = query.eq('order_status', params.status);
  }
  if (params.payment) {
    query = query.eq('payment_status', params.payment);
  }
  if (params.source === 'android') {
    query = query.filter('shipping_address_snapshot->>platform', 'eq', 'android');
  } else if (params.source === 'web') {
    query = query.or('shipping_address_snapshot->>platform.is.null,shipping_address_snapshot->>platform.eq.web');
  }
  
  const { data: orders } = await query;
  
  // Status badge color helper
  const statusColor: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    processing: 'bg-purple-100 text-purple-800',
    packed: 'bg-indigo-100 text-indigo-800',
    shipped: 'bg-cyan-100 text-cyan-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    returned: 'bg-gray-100 text-gray-800',
  };

  // Channel counts for quick summary
  const totalOrders = orders?.length || 0;
  const appOrdersCount = orders?.filter(o => o.shipping_address_snapshot?.platform === 'android' || o.shipping_address_snapshot?.source === 'android').length || 0;
  const webOrdersCount = totalOrders - appOrdersCount;
  
  const buildFilterUrl = (newStatus?: string, newSource?: string) => {
    const s = newStatus !== undefined ? newStatus : (params.status || 'all');
    const src = newSource !== undefined ? newSource : (params.source || 'all');
    const queryParts: string[] = [];
    if (s && s !== 'all') queryParts.push(`status=${s}`);
    if (src && src !== 'all') queryParts.push(`source=${src}`);
    return queryParts.length > 0 ? `/admin/orders?${queryParts.join('&')}` : '/admin/orders';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Orders Management</h1>
          <p className="text-gray-500 mt-1">Unified control center for Website & Android App customer orders.</p>
        </div>
        
        {/* Quick Multi-Channel Summary Pills */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 shadow-sm text-xs font-medium text-gray-700">
            <Globe size={14} className="text-blue-600" />
            <span>Web: <strong>{webOrdersCount}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 shadow-sm text-xs font-semibold text-emerald-800">
            <Smartphone size={14} className="text-emerald-700" />
            <span>App: <strong>{appOrdersCount}</strong></span>
          </div>
        </div>
      </div>
      
      {/* Platform & Status Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
        {/* Channel Filter (All vs Web vs App) */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'all', label: 'All Channels', icon: ShoppingBag },
            { id: 'web', label: 'Website (Web)', icon: Globe },
            { id: 'android', label: 'Android App', icon: Smartphone }
          ].map(c => {
            const active = (params.source === c.id) || (!params.source && c.id === 'all');
            const Icon = c.icon;
            return (
              <Link
                key={c.id}
                href={buildFilterUrl(undefined, c.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  active ? 'bg-white text-emerald-900 font-semibold shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon size={13} className={active ? 'text-emerald-600' : 'text-gray-400'} />
                {c.label}
              </Link>
            );
          })}
        </div>

        {/* Status Pills */}
        <div className="flex gap-1.5 flex-wrap">
          {['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => {
            const active = (params.status === s || (!params.status && s === 'all'));
            return (
              <Link
                key={s}
                href={buildFilterUrl(s, undefined)}
                className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors ${
                  active
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >{s}</Link>
            );
          })}
        </div>
      </div>
      
      {/* Orders Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Channel</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders?.map((order: any) => {
                const isAndroid = order.shipping_address_snapshot?.platform === 'android' || order.shipping_address_snapshot?.source === 'android';
                return (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm font-semibold text-gray-900">{order.order_ref}</span>
                    </td>
                    <td className="px-6 py-4">
                      {isAndroid ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <Smartphone size={12} className="text-emerald-600" />
                          Android App
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                          <Globe size={12} className="text-blue-600" />
                          Website
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {order.profiles?.full_name || order.shipping_address_snapshot?.name || 'Guest'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{order.final_total?.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 
                        order.payment_status === 'failed' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.payment_status || 'pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        statusColor[order.order_status] || 'bg-gray-100 text-gray-800'
                      }`}>
                        {order.order_status || 'pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-800 font-medium"
                      >
                        <Eye size={16} /> View
                      </Link>
                    </td>
                  </tr>
                );
              })}
              {(!orders || orders.length === 0) && (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-400">
                    <Package className="mx-auto mb-3 opacity-30" size={32} />
                    <p>No orders found matching the filters</p>
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
