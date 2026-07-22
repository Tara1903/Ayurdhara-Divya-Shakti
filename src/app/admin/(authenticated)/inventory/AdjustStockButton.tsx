'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

const REASONS = ['Stock Added', 'Manual Adjustment', 'Return Restocked', 'Damaged Stock', 'Other'];

export function AdjustStockButton({ variantId, productName, currentStock }: { variantId: string; productName: string; currentStock: number }) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [reason, setReason] = useState(REASONS[0]);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (quantity === 0) return;
    setLoading(true);
    const res = await fetch('/api/admin/inventory/adjust', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ variantId, quantity, reason, note }),
    });
    setLoading(false);
    if (res.ok) { setOpen(false); router.refresh(); }
    else alert('Failed to adjust stock');
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-800 font-medium">
        <Plus size={16} /> Adjust
      </button>
      
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setOpen(false)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="font-semibold text-gray-900 mb-1">Adjust Stock</h3>
            <p className="text-sm text-gray-500 mb-4">{productName}</p>
            <p className="text-sm text-gray-700 mb-4">Current stock: <strong>{currentStock}</strong></p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity Change</label>
                <p className="text-xs text-gray-500 mb-2">Use positive number to add stock, negative to reduce</p>
                <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <select value={reason} onChange={e => setReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                  {REASONS.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Note (optional)</label>
                <input type="text" value={note} onChange={e => setNote(e.target.value)} placeholder="Additional details..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button onClick={() => setOpen(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50">Cancel</button>
              <button onClick={handleSubmit} disabled={loading || quantity === 0}
                className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-medium rounded-md">
                {loading ? 'Saving...' : 'Save Adjustment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
