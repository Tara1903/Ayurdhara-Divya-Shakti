import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { UpdateOrderStatusButton } from './UpdateOrderStatusButton';

export const revalidate = 0;

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: order } = await supabase
    .from('orders')
    .select(`
      *,
      profiles(full_name, email: id, mobile),
      order_items(*),
      payment_attempts(*),
      shipments(*)
    `)
    .eq('id', id)
    .single();
  
  if (!order) notFound();
  
  const statuses = ['pending', 'confirmed', 'processing', 'packed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'returned'];
  
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Order {order.order_ref}</h1>
          <p className="text-gray-500 mt-1">{new Date(order.created_at).toLocaleString('en-IN')}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
          order.order_status === 'delivered' ? 'bg-green-100 text-green-800' :
          order.order_status === 'cancelled' ? 'bg-red-100 text-red-800' :
          'bg-blue-100 text-blue-800'
        }`}>{order.order_status}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Customer */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">Customer</h3>
          <p className="font-medium text-gray-900">{order.profiles?.full_name || 'Guest'}</p>
          {order.guest_email && <p className="text-sm text-gray-500">{order.guest_email}</p>}
          {order.guest_mobile && <p className="text-sm text-gray-500">{order.guest_mobile}</p>}
        </div>
        
        {/* Delivery Address */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">Delivery Address</h3>
          {order.shipping_address_snapshot && (
            <div className="text-sm text-gray-700 space-y-1">
              <p className="font-medium">{order.shipping_address_snapshot.full_name}</p>
              <p>{order.shipping_address_snapshot.address_line_1}</p>
              {order.shipping_address_snapshot.address_line_2 && <p>{order.shipping_address_snapshot.address_line_2}</p>}
              <p>{order.shipping_address_snapshot.city}, {order.shipping_address_snapshot.state} - {order.shipping_address_snapshot.pincode}</p>
              <p className="text-gray-500">{order.shipping_address_snapshot.mobile}</p>
            </div>
          )}
        </div>
        
        {/* Payment Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">Payment</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Method</span><span className="uppercase font-medium">{order.payment_method}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Status</span><span className={`font-medium ${order.payment_status === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>{order.payment_status}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>₹{order.subtotal?.toLocaleString('en-IN')}</span></div>
            {order.coupon_discount > 0 && <div className="flex justify-between text-green-600"><span>Coupon ({order.coupon_code})</span><span>-₹{order.coupon_discount}</span></div>}
            <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span>{order.shipping_charge > 0 ? `₹${order.shipping_charge}` : 'Free'}</span></div>
            <div className="flex justify-between font-bold text-base border-t pt-1 mt-1"><span>Total</span><span>₹{order.final_total?.toLocaleString('en-IN')}</span></div>
          </div>
        </div>
      </div>
      
      {/* Order Items */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Order Items</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 text-xs font-medium text-gray-500 uppercase">
            <tr>
              <th className="px-5 py-3 text-left">Product</th>
              <th className="px-5 py-3 text-left">Variant</th>
              <th className="px-5 py-3 text-center">Qty</th>
              <th className="px-5 py-3 text-right">Unit Price</th>
              <th className="px-5 py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {order.order_items?.map((item: any) => (
              <tr key={item.id}>
                <td className="px-5 py-4 text-sm font-medium text-gray-900">{item.product_name_snapshot}</td>
                <td className="px-5 py-4 text-sm text-gray-500">{item.variant_snapshot}</td>
                <td className="px-5 py-4 text-sm text-center">{item.quantity}</td>
                <td className="px-5 py-4 text-sm text-right">₹{item.unit_final_price || item.unit_price}</td>
                <td className="px-5 py-4 text-sm font-semibold text-right">₹{item.line_total?.toLocaleString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Update Status */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Update Order Status</h3>
        <UpdateOrderStatusButton orderId={order.id} currentStatus={order.order_status} statuses={statuses} />
      </div>
    </div>
  );
}
