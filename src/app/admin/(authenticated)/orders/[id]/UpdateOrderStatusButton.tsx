'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function UpdateOrderStatusButton({ 
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
    const res = await fetch('/api/admin/orders/update-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, status }),
    });
    setLoading(false);
    if (res.ok) router.refresh();
    else alert('Failed to update status');
  };

  return (
    <div className="flex gap-3 items-center">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md text-sm capitalize focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
      >
        {statuses.map(s => (
          <option key={s} value={s} className="capitalize">{s.replace(/_/g, ' ')}</option>
        ))}
      </select>
      <button
        onClick={handleUpdate}
        disabled={loading || status === currentStatus}
        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-medium rounded-md transition-colors"
      >
        {loading ? 'Updating...' : 'Update Status'}
      </button>
    </div>
  );
}
