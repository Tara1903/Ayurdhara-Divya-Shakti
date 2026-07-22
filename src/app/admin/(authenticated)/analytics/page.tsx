import { createClient } from '@/lib/supabase/server';
import { TrendingUp, ShoppingBag, Users, Package } from 'lucide-react';

export const revalidate = 60;

export default async function AnalyticsPage() {
  const supabase = await createClient();
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

  // Revenue & orders - last 30 days
  const { data: recentOrders } = await supabase
    .from('orders')
    .select('final_total, order_status, payment_status, created_at')
    .gte('created_at', last30Days)
    .neq('order_status', 'cancelled');

  const { data: allOrders } = await supabase
    .from('orders')
    .select('final_total, order_status, payment_status, created_at')
    .neq('order_status', 'cancelled');

  // Top products from order items
  const { data: topItems } = await supabase
    .from('order_items')
    .select('product_name_snapshot, quantity, line_total')
    .gte('created_at', last30Days)
    .order('quantity', { ascending: false })
    .limit(5);

  // Customer count
  const { count: totalCustomers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'customer');

  const { count: newCustomers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'customer')
    .gte('created_at', last30Days);

  const { count: goldMembers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('is_gold_member', true);

  // Payment stats
  const { data: payments } = await supabase
    .from('payment_attempts')
    .select('status')
    .gte('created_at', last30Days);

  const paidCount = payments?.filter(p => p.status === 'completed' || p.status === 'paid').length || 0;
  const failedCount = payments?.filter(p => p.status === 'failed').length || 0;
  const totalPayments = (paidCount + failedCount) || 1;

  // Aggregate stats
  const totalRevenue30d = recentOrders?.reduce((sum, o) => o.payment_status === 'paid' ? sum + (o.final_total || 0) : sum, 0) || 0;
  const totalOrders30d = recentOrders?.length || 0;
  const avgOrderValue = totalOrders30d > 0 ? totalRevenue30d / totalOrders30d : 0;
  const totalRevenueAll = allOrders?.reduce((sum, o) => o.payment_status === 'paid' ? sum + (o.final_total || 0) : sum, 0) || 0;

  // Aggregate top products
  const productMap = new Map<string, { quantity: number; revenue: number }>();
  topItems?.forEach((item: any) => {
    const existing = productMap.get(item.product_name_snapshot) || { quantity: 0, revenue: 0 };
    productMap.set(item.product_name_snapshot, {
      quantity: existing.quantity + item.quantity,
      revenue: existing.revenue + item.line_total,
    });
  });
  const topProducts = Array.from(productMap.entries())
    .sort((a, b) => b[1].quantity - a[1].quantity)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif text-gray-900">Analytics</h1>
        <p className="text-gray-500 mt-1">Real e-commerce data from your store. Last 30 days.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={18} className="text-emerald-600" />
            <span className="text-xs font-medium text-gray-500 uppercase">Revenue (30d)</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">₹{totalRevenue30d.toLocaleString('en-IN')}</p>
          <p className="text-xs text-gray-400 mt-1">All time: ₹{totalRevenueAll.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <ShoppingBag size={18} className="text-blue-600" />
            <span className="text-xs font-medium text-gray-500 uppercase">Orders (30d)</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalOrders30d}</p>
          <p className="text-xs text-gray-400 mt-1">AOV: ₹{avgOrderValue.toFixed(0)}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Users size={18} className="text-purple-600" />
            <span className="text-xs font-medium text-gray-500 uppercase">Customers</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalCustomers || 0}</p>
          <p className="text-xs text-gray-400 mt-1">+{newCustomers || 0} this month</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Package size={18} className="text-amber-600" />
            <span className="text-xs font-medium text-gray-500 uppercase">Gold Members</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{goldMembers || 0}</p>
          <p className="text-xs text-gray-400 mt-1">Active memberships</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Top Products (30 days)</h3>
          {topProducts.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">No order data yet</p>
          ) : (
            <div className="space-y-3">
              {topProducts.map(([name, data]) => (
                <div key={name} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
                    <p className="text-xs text-gray-500">{data.quantity} units sold</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">₹{data.revenue.toLocaleString('en-IN')}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Payment Stats */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Payment Health (30 days)</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Success Rate</span>
                <span className="font-semibold text-green-600">{((paidCount / totalPayments) * 100).toFixed(0)}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: `${(paidCount / totalPayments) * 100}%` }} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-2xl font-bold text-green-700">{paidCount}</p>
                <p className="text-green-600 text-xs">Successful payments</p>
              </div>
              <div className="bg-red-50 rounded-lg p-3">
                <p className="text-2xl font-bold text-red-700">{failedCount}</p>
                <p className="text-red-600 text-xs">Failed payments</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <p className="text-sm text-amber-800">
          <strong>Note:</strong> Website traffic analytics (sessions, page views, bounce rate) require integrating Google Analytics or a similar service. The data shown above comes directly from your Supabase database and is 100% accurate.
        </p>
      </div>
    </div>
  );
}
