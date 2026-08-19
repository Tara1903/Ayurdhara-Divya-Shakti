'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function UpdatePaymentStatusButton({ 
  orderId, 
  currentStatus, 
  statuses 
}: { 
  orderId: string; 
  currentStatus: string; 
  statuses: string[] 
}) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async () => {
    if (status === currentStatus) return;
    setLoading(true);
    const res = await fetch('/api/admin/orders/update-payment-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, paymentStatus: status }),
    });
    setLoading(false);
    if (res.ok) router.refresh();
    else alert('Failed to update payment status');
  };

  return (
    <div className="flex gap-3 items-center justify-between">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="px-3 py-1.5 border border-gray-300 rounded-md text-sm capitalize focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
      >
        {statuses.map(s => (
          <option key={s} value={s} className="capitalize">{s.replace(/_/g, ' ')}</option>
        ))}
      </select>
      <button
        onClick={handleUpdate}
        disabled={loading || status === currentStatus}
        className="px-3 py-1.5 bg-gray-800 hover:bg-gray-900 disabled:opacity-50 text-white text-xs font-medium rounded-md transition-colors"
      >
        {loading ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
}
