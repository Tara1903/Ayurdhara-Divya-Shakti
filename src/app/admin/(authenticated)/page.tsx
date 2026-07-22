import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { 
  TrendingUp, ShoppingBag, Users, Package, AlertTriangle, 
  XCircle, CreditCard, Star, ArrowRight, CheckCircle2
} from 'lucide-react';

export const revalidate = 60;

export default async function AdminDashboard() {
  const supabase = await createClient();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  // Parallel fetch everything
  const [
    { count: totalOrders },
    { count: todayOrders },
    { count: pendingOrders },
    { count: processingOrders },
    { count: shippedOrders },
    { count: totalCustomers },
    { count: goldMembers },
    { count: newCustomers },
    { data: revenueToday },
    { data: revenueMonth },
    { data: pendingPayments },
    { data: recentOrders },
    { data: lowStockVariants },
    { data: outOfStockVariants },
  ] = await Promise.all([
    supabase.from('orders').select('*', { count: 'exact', head: true }).neq('order_status', 'cancelled'),
    supabase.from('orders').select('*', { count: 'exact', head: true }).gte('created_at', today.toISOString()).neq('order_status', 'cancelled'),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('order_status', 'pending'),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('order_status', 'processing'),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('order_status', 'shipped'),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'customer'),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('is_gold_member', true),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'customer').gte('created_at', monthStart.toISOString()),
    supabase.from('orders').select('final_total').eq('payment_status', 'paid').gte('created_at', today.toISOString()),
    supabase.from('orders').select('final_total').eq('payment_status', 'paid').gte('created_at', monthStart.toISOString()),
    supabase.from('orders').select('id').eq('payment_status', 'pending').neq('payment_method', 'cod'),
    supabase.from('orders').select('id, order_ref, final_total, order_status, created_at, profiles(full_name)').order('created_at', { ascending: false }).limit(5),
    supabase.from('product_variants').select('id, size, stock_quantity, reserved_quantity, low_stock_threshold, products(name)').lte('stock_quantity', 10).gt('stock_quantity', 0),
    supabase.from('product_variants').select('id, size, products(name)').eq('stock_quantity', 0),
  ]);

  const todayRevenue = (revenueToday || []).reduce((sum, o: any) => sum + (o.final_total || 0), 0);
  const monthRevenue = (revenueMonth || []).reduce((sum, o: any) => sum + (o.final_total || 0), 0);

  const statusColor: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    processing: 'bg-purple-100 text-purple-800',
    shipped: 'bg-cyan-100 text-cyan-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Live overview of your Ayurdhara Divya Shakti store.</p>
      </div>

      {/* Action Center */}
      {((pendingOrders || 0) > 0 || (lowStockVariants || []).length > 0 || (outOfStockVariants || []).length > 0 || (pendingPayments || []).length > 0) && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
            <AlertTriangle size={18} /> Action Required
          </h3>
          <div className="space-y-2">
            {(pendingOrders || 0) > 0 && (
              <Link href="/admin/orders?status=pending" className="flex items-center justify-between p-3 bg-white rounded-lg border border-amber-200 hover:border-amber-400 transition-colors group">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={16} className="text-amber-600" />
                  <span className="text-sm font-medium text-gray-900">{pendingOrders} order{(pendingOrders || 0) > 1 ? 's' : ''} awaiting confirmation</span>
                </div>
                <ArrowRight size={16} className="text-gray-400 group-hover:text-amber-600" />
              </Link>
            )}
            {(outOfStockVariants || []).length > 0 && (
              <Link href="/admin/inventory" className="flex items-center justify-between p-3 bg-white rounded-lg border border-amber-200 hover:border-amber-400 transition-colors group">
                <div className="flex items-center gap-2">
                  <XCircle size={16} className="text-red-600" />
                  <span className="text-sm font-medium text-gray-900">{(outOfStockVariants || []).length} variant{(outOfStockVariants || []).length > 1 ? 's' : ''} out of stock</span>
                </div>
                <ArrowRight size={16} className="text-gray-400 group-hover:text-amber-600" />
              </Link>
            )}
            {(lowStockVariants || []).length > 0 && (
              <Link href="/admin/inventory" className="flex items-center justify-between p-3 bg-white rounded-lg border border-amber-200 hover:border-amber-400 transition-colors group">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={16} className="text-amber-600" />
                  <span className="text-sm font-medium text-gray-900">{(lowStockVariants || []).length} variant{(lowStockVariants || []).length > 1 ? 's' : ''} running low on stock</span>
                </div>
                <ArrowRight size={16} className="text-gray-400 group-hover:text-amber-600" />
              </Link>
            )}
            {(pendingPayments || []).length > 0 && (
              <Link href="/admin/orders?payment=pending" className="flex items-center justify-between p-3 bg-white rounded-lg border border-amber-200 hover:border-amber-400 transition-colors group">
                <div className="flex items-center gap-2">
                  <CreditCard size={16} className="text-amber-600" />
                  <span className="text-sm font-medium text-gray-900">{(pendingPayments || []).length} payment{(pendingPayments || []).length > 1 ? 's' : ''} pending verification</span>
                </div>
                <ArrowRight size={16} className="text-gray-400 group-hover:text-amber-600" />
              </Link>
            )}
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-emerald-50 rounded-md"><TrendingUp size={16} className="text-emerald-600" /></div>
            <span className="text-xs font-medium text-gray-500 uppercase">Revenue Today</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">₹{todayRevenue.toLocaleString('en-IN')}</p>
          <p className="text-xs text-gray-400 mt-1">This month: ₹{monthRevenue.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-blue-50 rounded-md"><ShoppingBag size={16} className="text-blue-600" /></div>
            <span className="text-xs font-medium text-gray-500 uppercase">Orders Today</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{todayOrders || 0}</p>
          <p className="text-xs text-gray-400 mt-1">Total all time: {totalOrders || 0}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-purple-50 rounded-md"><Users size={16} className="text-purple-600" /></div>
            <span className="text-xs font-medium text-gray-500 uppercase">Customers</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalCustomers || 0}</p>
          <p className="text-xs text-gray-400 mt-1">+{newCustomers || 0} this month</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-amber-50 rounded-md"><Star size={16} className="text-amber-600" /></div>
            <span className="text-xs font-medium text-gray-500 uppercase">Gold Members</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{goldMembers || 0}</p>
          <p className="text-xs text-gray-400 mt-1">Active memberships</p>
        </div>
      </div>

      {/* Order Pipeline */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Order Pipeline</h3>
        <div className="grid grid-cols-3 gap-4">
          <Link href="/admin/orders?status=pending" className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200 hover:border-yellow-400 transition-colors">
            <p className="text-2xl font-bold text-yellow-800">{pendingOrders || 0}</p>
            <p className="text-xs text-yellow-700 mt-1">Pending</p>
          </Link>
          <Link href="/admin/orders?status=processing" className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200 hover:border-purple-400 transition-colors">
            <p className="text-2xl font-bold text-purple-800">{processingOrders || 0}</p>
            <p className="text-xs text-purple-700 mt-1">Processing</p>
          </Link>
          <Link href="/admin/orders?status=shipped" className="text-center p-4 bg-cyan-50 rounded-lg border border-cyan-200 hover:border-cyan-400 transition-colors">
            <p className="text-2xl font-bold text-cyan-800">{shippedOrders || 0}</p>
            <p className="text-xs text-cyan-700 mt-1">Shipped</p>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-semibold text-gray-900">Recent Orders</h3>
            <Link href="/admin/orders" className="text-xs text-emerald-600 hover:text-emerald-800 font-medium">View all →</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentOrders?.map((order: any) => (
              <Link key={order.id} href={`/admin/orders/${order.id}`} className="flex items-center px-5 py-3 hover:bg-gray-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-sm text-gray-900">{order.order_ref}</p>
                  <p className="text-xs text-gray-500">{order.profiles?.full_name || 'Guest'}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">₹{order.final_total?.toLocaleString('en-IN')}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full capitalize font-medium ${statusColor[order.order_status] || 'bg-gray-100 text-gray-700'}`}>
                    {order.order_status}
                  </span>
                </div>
              </Link>
            ))}
            {(!recentOrders || recentOrders.length === 0) && (
              <div className="px-5 py-8 text-center text-gray-400 text-sm">No orders yet</div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Add Product', href: '/admin/products/new', color: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700' },
              { label: 'View Orders', href: '/admin/orders', color: 'bg-blue-50 hover:bg-blue-100 text-blue-700' },
              { label: 'Manage Coupons', href: '/admin/marketing/coupons', color: 'bg-amber-50 hover:bg-amber-100 text-amber-700' },
              { label: 'Create Offer', href: '/admin/marketing/offers', color: 'bg-purple-50 hover:bg-purple-100 text-purple-700' },
              { label: 'Add Journal Post', href: '/admin/journal', color: 'bg-pink-50 hover:bg-pink-100 text-pink-700' },
              { label: 'View Inventory', href: '/admin/inventory', color: 'bg-red-50 hover:bg-red-100 text-red-700' },
              { label: 'FAQs', href: '/admin/content/faqs', color: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700' },
              { label: 'Analytics', href: '/admin/analytics', color: 'bg-teal-50 hover:bg-teal-100 text-teal-700' },
            ].map(action => (
              <Link key={action.href} href={action.href} className={`flex items-center justify-center p-3 rounded-lg text-sm font-medium transition-colors ${action.color}`}>
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
