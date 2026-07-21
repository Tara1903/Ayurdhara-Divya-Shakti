import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { ArrowUpRight, TrendingUp, Package, ShoppingCart, Users, AlertCircle, LayoutTemplate, Gift } from 'lucide-react';

export const revalidate = 0;

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Basic Stats (in a real scenario, these would be calculated correctly or via materialized views)
  const [{ count: totalOrders }, { count: totalProducts }, { count: totalCustomers }] = await Promise.all([
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'customer')
  ]);

  // Recent Orders
  const { data: recentOrders } = await supabase
    .from('orders')
    .select('id, user_id, total_amount, status, created_at, profiles(full_name, email)')
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif text-gray-900 tracking-wide">Overview</h1>
        <p className="text-gray-500 mt-1">Welcome to the Ayurdhara Divya Shakti Business Operating System.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <TrendingUp size={20} />
            </div>
            <span className="text-sm font-medium text-emerald-600 flex items-center gap-1">
              +12.5% <ArrowUpRight size={14} />
            </span>
          </div>
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Total Revenue</p>
          <p className="text-3xl font-light text-gray-900">$24,590</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <ShoppingCart size={20} />
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Total Orders</p>
          <p className="text-3xl font-light text-gray-900">{totalOrders || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <Users size={20} />
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Total Customers</p>
          <p className="text-3xl font-light text-gray-900">{totalCustomers || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <Package size={20} />
            </div>
            <span className="text-sm font-medium text-amber-600 flex items-center gap-1">
              <AlertCircle size={14} /> 3 Low Stock
            </span>
          </div>
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Active Products</p>
          <p className="text-3xl font-light text-gray-900">{totalProducts || 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
            <h2 className="font-semibold text-gray-900">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3 font-medium">Order ID</th>
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders && recentOrders.length > 0 ? (
                  recentOrders.map((order: any) => (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        <Link href={`/admin/orders/${order.id}`} className="hover:text-emerald-600">
                          #{order.id.slice(0, 8)}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{order.profiles?.full_name || 'Guest'}</div>
                        <div className="text-xs text-gray-500">{order.profiles?.email || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                          ${order.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 
                            order.status === 'pending' ? 'bg-amber-100 text-amber-800' : 
                            'bg-gray-100 text-gray-800'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 text-right">
                        ${order.total_amount.toFixed(2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
                      No recent orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Center */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
            <h2 className="font-semibold text-gray-900">Action Center</h2>
          </div>
          <div className="p-4 flex-1 flex flex-col gap-3">
            <Link href="/admin/products/new" className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50 transition-colors group">
              <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-emerald-100 flex items-center justify-center text-gray-600 group-hover:text-emerald-600">
                <Package size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 group-hover:text-emerald-700">Add Product</p>
                <p className="text-xs text-gray-500">Create a new product listing</p>
              </div>
            </Link>

            <Link href="/admin/content/homepage" className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50 transition-colors group">
              <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-emerald-100 flex items-center justify-center text-gray-600 group-hover:text-emerald-600">
                <LayoutTemplate size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 group-hover:text-emerald-700">Edit Homepage</p>
                <p className="text-xs text-gray-500">Update hero banner & featured sections</p>
              </div>
            </Link>

            <Link href="/admin/marketing/offers" className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50 transition-colors group">
              <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-emerald-100 flex items-center justify-center text-gray-600 group-hover:text-emerald-600">
                <Gift size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 group-hover:text-emerald-700">Create Offer</p>
                <p className="text-xs text-gray-500">Set up a new discount or promotion</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
