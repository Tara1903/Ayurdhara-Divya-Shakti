import { createClient } from '@/lib/supabase/server';
import { Truck } from 'lucide-react';

export const revalidate = 0;

export default async function ShipmentsPage() {
  const supabase = await createClient();
  
  const { data: shipments } = await supabase
    .from('shipments')
    .select(`
      *,
      orders(order_ref, order_status, profiles(full_name))
    `)
    .order('created_at', { ascending: false })
    .limit(50);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif text-gray-900">Shipments</h1>
        <p className="text-gray-500 mt-1">Track and manage all order shipments.</p>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Tracking</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Delivery</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {shipments?.map((s: any) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-sm">{s.orders?.order_ref}</td>
                  <td className="px-6 py-4 text-sm">{s.orders?.profiles?.full_name || 'Guest'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{s.provider || '—'}</td>
                  <td className="px-6 py-4">
                    {s.tracking_number ? (
                      s.tracking_url ? (
                        <a href={s.tracking_url} target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-600 hover:underline font-mono">{s.tracking_number}</a>
                      ) : (
                        <span className="text-sm font-mono">{s.tracking_number}</span>
                      )
                    ) : <span className="text-gray-400">—</span>}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                      s.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      s.status === 'in_transit' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>{s.status?.replace(/_/g, ' ') || 'pending'}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {s.estimated_delivery ? new Date(s.estimated_delivery).toLocaleDateString('en-IN') : '—'}
                  </td>
                </tr>
              ))}
              {(!shipments || shipments.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    <Truck className="mx-auto mb-3 opacity-30" size={32} />
                    <p>No shipments recorded yet</p>
                    <p className="text-xs mt-1">Shipments are created when you add tracking to an order</p>
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
