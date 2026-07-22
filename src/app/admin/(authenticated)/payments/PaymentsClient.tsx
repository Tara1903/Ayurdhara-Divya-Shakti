'use client';
import { CreditCard, CheckCircle, XCircle, Clock } from 'lucide-react';

export function PaymentsClient({ payments }: { payments: any[] }) {
  const getStatusIcon = (status: string) => {
    switch(status.toLowerCase()) {
      case 'success':
      case 'paid': return <CheckCircle size={16} className="text-green-500" />;
      case 'failed': return <XCircle size={16} className="text-red-500" />;
      default: return <Clock size={16} className="text-amber-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif text-gray-900">Payment Attempts</h1>
        <p className="text-gray-500 mt-1">View the log of Razorpay payment transactions and their status.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-700">Transaction ID</th>
              <th className="px-6 py-4 font-medium text-gray-700">Order #</th>
              <th className="px-6 py-4 font-medium text-gray-700">Amount</th>
              <th className="px-6 py-4 font-medium text-gray-700">Provider</th>
              <th className="px-6 py-4 font-medium text-gray-700">Status</th>
              <th className="px-6 py-4 font-medium text-gray-700">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {payments.map(p => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-mono text-gray-600 text-xs">{p.transaction_id || 'N/A'}</td>
                <td className="px-6 py-4 text-emerald-600 font-medium">{p.orders?.order_number || 'Unknown'}</td>
                <td className="px-6 py-4 font-medium">₹{(p.amount || 0).toLocaleString()}</td>
                <td className="px-6 py-4 text-gray-600 capitalize">{p.provider || 'razorpay'}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    {getStatusIcon(p.status)}
                    <span className="capitalize">{p.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500 text-xs">{new Date(p.created_at).toLocaleString()}</td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">No payment attempts found in the database.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
