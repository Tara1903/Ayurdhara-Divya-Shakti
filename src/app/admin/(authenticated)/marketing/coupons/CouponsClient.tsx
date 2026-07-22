'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, Ticket } from 'lucide-react';

interface Coupon {
  id: string; code: string; discount_type: string; discount_value: number;
  minimum_order_value: number; maximum_discount: number;
  expiry_date: string; total_usage_limit: number; used_count: number;
  per_customer_limit: number; is_active: boolean;
  start_date: string;
}

export function CouponsClient({ coupons }: { coupons: Coupon[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Coupon | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({ code: '', discount_type: 'percentage', discount_value: 0, minimum_order_value: 0, maximum_discount: 0, start_date: '', expiry_date: '', total_usage_limit: 0, per_customer_limit: 1, is_active: true });

  const resetForm = () => { setForm({ code: '', discount_type: 'percentage', discount_value: 0, minimum_order_value: 0, maximum_discount: 0, start_date: '', expiry_date: '', total_usage_limit: 0, per_customer_limit: 1, is_active: true }); setEditing(null); setShowForm(false); };

  const openEdit = (c: Coupon) => {
    setEditing(c);
    setForm({ code: c.code, discount_type: c.discount_type, discount_value: c.discount_value, minimum_order_value: c.minimum_order_value, maximum_discount: c.maximum_discount || 0, start_date: c.start_date?.slice(0, 16) || '', expiry_date: c.expiry_date?.slice(0, 16) || '', total_usage_limit: c.total_usage_limit || 0, per_customer_limit: c.per_customer_limit || 1, is_active: c.is_active });
    setShowForm(true);
  };

  const handleSave = async () => {
    setLoading(true);
    const url = editing ? `/api/admin/coupons/${editing.id}` : '/api/admin/coupons';
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setLoading(false);
    if (res.ok) { resetForm(); router.refresh(); } else alert('Failed to save');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this coupon?')) return;
    await fetch(`/api/admin/coupons/${id}`, { method: 'DELETE' });
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Coupons</h1>
          <p className="text-gray-500 mt-1">Create and manage discount coupon codes.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg">
          <Plus size={16} /> New Coupon
        </button>
      </div>

      <div className="space-y-3">
        {coupons.map(c => (
          <div key={c.id} className={`bg-white border rounded-xl p-5 flex items-center gap-4 ${c.is_active ? 'border-gray-200' : 'border-gray-100 opacity-60'}`}>
            <div className="p-2 bg-blue-50 rounded-lg"><Ticket size={20} className="text-blue-600" /></div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-gray-900 text-base">{c.code}</span>
                <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${c.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{c.is_active ? 'Active' : 'Inactive'}</span>
              </div>
              <div className="flex gap-4 mt-1 text-xs text-gray-500">
                <span>{c.discount_type === 'percentage' ? `${c.discount_value}% off` : `₹${c.discount_value} off`}</span>
                {c.minimum_order_value > 0 && <span>Min: ₹{c.minimum_order_value}</span>}
                {c.expiry_date && <span>Expires: {new Date(c.expiry_date).toLocaleDateString('en-IN')}</span>}
                <span>Used: {c.used_count || 0}{c.total_usage_limit > 0 ? `/${c.total_usage_limit}` : ''}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(c)} className="p-1.5 text-gray-400 hover:text-blue-600"><Edit2 size={16} /></button>
              <button onClick={() => handleDelete(c.id)} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {coupons.length === 0 && (
          <div className="bg-white border border-dashed border-gray-300 rounded-xl py-12 text-center">
            <Ticket className="mx-auto mb-3 text-gray-300" size={32} />
            <p className="text-gray-500">No coupons yet.</p>
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={resetForm}>
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="font-semibold text-gray-900 mb-4">{editing ? 'Edit Coupon' : 'New Coupon'}</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code *</label>
                  <input value={form.code} onChange={e => setForm(f => ({...f, code: e.target.value.toUpperCase()}))} placeholder="e.g. WELCOME20" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select value={form.discount_type} onChange={e => setForm(f => ({...f, discount_type: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500">
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                  <input type="number" value={form.discount_value} onChange={e => setForm(f => ({...f, discount_value: Number(e.target.value)}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Order (₹)</label>
                  <input type="number" value={form.minimum_order_value} onChange={e => setForm(f => ({...f, minimum_order_value: Number(e.target.value)}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Discount (₹)</label>
                  <input type="number" value={form.maximum_discount} onChange={e => setForm(f => ({...f, maximum_discount: Number(e.target.value)}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Usage Limit (0=unlimited)</label>
                  <input type="number" value={form.total_usage_limit} onChange={e => setForm(f => ({...f, total_usage_limit: Number(e.target.value)}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Per Customer Limit</label>
                  <input type="number" value={form.per_customer_limit} onChange={e => setForm(f => ({...f, per_customer_limit: Number(e.target.value)}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input type="datetime-local" value={form.start_date} onChange={e => setForm(f => ({...f, start_date: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input type="datetime-local" value={form.expiry_date} onChange={e => setForm(f => ({...f, expiry_date: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <input type="checkbox" id="coupon_active" checked={form.is_active} onChange={e => setForm(f => ({...f, is_active: e.target.checked}))} className="w-4 h-4" />
                  <label htmlFor="coupon_active" className="text-sm font-medium text-gray-700">Active</label>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={resetForm} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50">Cancel</button>
                <button onClick={handleSave} disabled={loading} className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-medium rounded-md">
                  {loading ? 'Saving...' : (editing ? 'Update' : 'Create')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
