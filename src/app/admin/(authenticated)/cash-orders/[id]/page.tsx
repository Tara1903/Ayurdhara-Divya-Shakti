'use client';

import { useState, useEffect, use } from 'react';
import { getCashOrderById, updateCashOrderStatus } from '@/actions/cashOrderActions';
import type { CashOrder } from '@/types/cashOrder';
import { ArrowLeft, Printer, Share2, CheckCircle2, Copy } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CashOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const [order, setOrder] = useState<CashOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      const { order, error } = await getCashOrderById(unwrappedParams.id);
      if (order) setOrder(order);
      else if (error) alert(error);
      setLoading(false);
    };
    fetchOrder();
  }, [unwrappedParams.id]);

  const handleStatusChange = async (newStatus: any) => {
    if (!order) return;
    setStatusUpdating(true);
    const { success, error } = await updateCashOrderStatus(order.id, newStatus);
    if (success) {
      setOrder({ ...order, orderStatus: newStatus });
    } else {
      alert(error || 'Failed to update status');
    }
    setStatusUpdating(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    // Generate guide access link for customer
    const url = `${window.location.origin}/account/wellness-guide`;
    navigator.clipboard.writeText(`View your Ayurdhara Divya Shakti Wellness Guide and Purchase History here:\n${url}\n\n(Sign in with your mobile number: ${order?.mobileNumber})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Order Details...</div>;
  if (!order) return <div className="p-8 text-center text-red-500">Order not found</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 print-container">
      {/* Header Actions (hidden in print) */}
      <div className="flex justify-between items-center no-print">
        <Link href="/admin/cash-orders" className="flex items-center gap-2 text-gray-500 hover:text-gray-900">
          <ArrowLeft size={18} /> Back to Orders
        </Link>
        <div className="flex items-center gap-3">
          <button onClick={handlePrint} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors">
            <Printer size={16} /> Print Receipt
          </button>
          <button onClick={handleCopyLink} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2D5A27] text-white hover:bg-[#23471f] rounded-md text-sm font-medium transition-colors">
            {copied ? <CheckCircle2 size={16} /> : <Share2 size={16} />}
            {copied ? 'Copied' : 'Share Guide Access'}
          </button>
        </div>
      </div>

      {/* Main Receipt Content */}
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm" id="receipt">
        
        {/* Receipt Header */}
        <div className="flex justify-between items-start border-b border-gray-200 pb-6 mb-6">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="ADS Logo" width={48} height={48} />
            <div>
              <h2 className="text-xl font-serif font-bold text-gray-900">AYURDHARA DIVYA SHAKTI</h2>
              <p className="text-sm text-gray-500">Wellness Store Receipt</p>
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-lg font-bold text-gray-900">{order.orderRef}</div>
            <div className="text-sm text-gray-500">{new Date(order.saleDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
            <div className="inline-block mt-2 px-2 py-0.5 bg-gray-100 border border-gray-300 text-gray-700 text-xs font-bold rounded">
              {order.paymentMethod.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Customer</h3>
            <p className="font-medium text-gray-900">{order.customerName}</p>
            <p className="text-gray-600">{order.mobileNumber}</p>
            {order.email && <p className="text-gray-600">{order.email}</p>}
          </div>
          <div className="text-right">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Details</h3>
            <p className="text-gray-600">Served by: <span className="font-medium text-gray-900">{order.staffName}</span></p>
            {order.partnerType !== 'none' && (
              <p className="text-gray-600 mt-1">
                Partner: <span className="font-medium text-gray-900">{order.wellnessPartnerCode || order.retailPartnerCode} ({order.partnerType})</span>
              </p>
            )}
          </div>
        </div>

        {/* Items */}
        <table className="w-full text-left mb-6">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500 text-sm">
              <th className="pb-3 font-medium">Product</th>
              <th className="pb-3 font-medium text-center">Qty</th>
              <th className="pb-3 font-medium text-right">Price</th>
              <th className="pb-3 font-medium text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {order.items?.map((item) => (
              <tr key={item.id}>
                <td className="py-4">
                  <div className="font-medium text-gray-900">{item.productName}</div>
                  <div className="text-sm text-gray-500">{item.variant}</div>
                </td>
                <td className="py-4 text-center text-gray-700">{item.quantity}</td>
                <td className="py-4 text-right text-gray-700">₹{item.unitPrice.toLocaleString('en-IN')}</td>
                <td className="py-4 text-right font-medium text-gray-900">₹{item.lineTotal.toLocaleString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end border-t border-gray-200 pt-4">
          <div className="w-64 space-y-2">
            <div className="flex justify-between font-serif text-xl font-bold text-gray-900 pt-2">
              <span>Total</span>
              <span>₹{order.finalTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
        
        {/* Footer instructions */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p className="font-medium text-gray-900 mb-1">Access Your Digital Wellness Guide</p>
          <p>Visit <strong>www.ayurdhara.com/account/wellness-guide</strong> and sign in with your mobile number to view your purchased routines.</p>
        </div>
      </div>

      {/* Admin Controls (hidden in print) */}
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 no-print">
        <h3 className="text-md font-medium text-gray-900 mb-4">Admin Controls</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Order Status</label>
            <select 
              value={order.orderStatus} 
              disabled={statusUpdating}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="completed">Completed (Eligible for Commission)</option>
              <option value="cancelled">Cancelled</option>
              <option value="returned">Returned</option>
              <option value="refunded">Refunded</option>
            </select>
            {order.orderStatus !== 'completed' && (
              <p className="text-xs text-red-600 mt-2">Note: Only completed orders are eligible for partner commissions.</p>
            )}
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Commission Details</h4>
            {order.partnerType !== 'none' && order.commissionAmount ? (
              <div className="bg-white p-3 border border-gray-200 rounded-md">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Rate:</span>
                  <span className="font-medium">{order.commissionRate}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Amount:</span>
                  <span className="font-medium text-emerald-600">₹{order.commissionAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ) : (
              <div className="bg-white p-3 border border-gray-200 rounded-md text-sm text-gray-500">
                No commission applicable for this order.
              </div>
            )}
          </div>
        </div>
        {order.notes && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-1">Internal Notes</h4>
            <p className="text-sm text-gray-600 bg-white p-3 rounded-md border border-gray-200">{order.notes}</p>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * { visibility: hidden; }
          .print-container, .print-container * { visibility: visible; }
          .print-container { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
          #receipt { border: none; box-shadow: none; }
        }
      `}} />
    </div>
  );
}
