'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, Tag } from 'lucide-react';

const OFFER_TYPES = ['percentage', 'fixed', 'free_shipping', 'buy_x_get_y', 'bundle'];

interface Offer {
  id: string;
  internal_name: string;
  title: string;
  description: string;
  offer_type: string;
  discount_value: number;
  minimum_order_value: number;
  maximum_discount: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
  badge_text: string;
  priority: number;
}

export function OffersClient({ offers }: { offers: Offer[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    internal_name: '', title: '', description: '',
    offer_type: 'percentage', discount_value: 0,
    minimum_order_value: 0, maximum_discount: 0,
    badge_text: '', priority: 0,
    start_date: '', end_date: '', is_active: true,
  });

  const resetForm = () => {
    setForm({ internal_name: '', title: '', description: '', offer_type: 'percentage', discount_value: 0, minimum_order_value: 0, maximum_discount: 0, badge_text: '', priority: 0, start_date: '', end_date: '', is_active: true });
    setEditing(null);
    setShowForm(false);
  };

  const openEdit = (offer: Offer) => {
    setEditing(offer);
    setForm({
      internal_name: offer.internal_name,
      title: offer.title,
      description: offer.description || '',
      offer_type: offer.offer_type,
      discount_value: offer.discount_value,
      minimum_order_value: offer.minimum_order_value,
      maximum_discount: offer.maximum_discount || 0,
      badge_text: offer.badge_text || '',
      priority: offer.priority || 0,
      start_date: offer.start_date?.slice(0, 16) || '',
      end_date: offer.end_date?.slice(0, 16) || '',
      is_active: offer.is_active,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    setLoading(true);
    const url = editing ? `/api/admin/offers/${editing.id}` : '/api/admin/offers';
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setLoading(false);
    if (res.ok) { resetForm(); router.refresh(); }
    else alert('Failed to save offer');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this offer?')) return;
    await fetch(`/api/admin/offers/${id}`, { method: 'DELETE' });
    router.refresh();
  };

  const handleToggle = async (offer: Offer) => {
    await fetch(`/api/admin/offers/${offer.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...offer, is_active: !offer.is_active }),
    });
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Offers</h1>
          <p className="text-gray-500 mt-1">Create and manage promotional offers.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors">
          <Plus size={16} /> New Offer
        </button>
      </div>

      {/* Offers List */}
      <div className="space-y-3">
        {offers.map(offer => (
          <div key={offer.id} className={`bg-white border rounded-xl p-5 flex items-start gap-4 ${offer.is_active ? 'border-gray-200' : 'border-gray-100 opacity-60'}`}>
            <div className="p-2 bg-amber-50 rounded-lg flex-shrink-0">
              <Tag size={20} className="text-amber-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-gray-900">{offer.internal_name}</h3>
                {offer.badge_text && <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full">{offer.badge_text}</span>}
                <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${offer.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                  {offer.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-0.5">{offer.title}</p>
              <div className="flex gap-4 mt-2 text-xs text-gray-500">
                <span className="capitalize">{offer.offer_type?.replace('_', ' ')}</span>
                {offer.discount_value > 0 && <span>Discount: {offer.offer_type === 'percentage' ? `${offer.discount_value}%` : `₹${offer.discount_value}`}</span>}
                {offer.minimum_order_value > 0 && <span>Min order: ₹{offer.minimum_order_value}</span>}
                {offer.end_date && <span>Expires: {new Date(offer.end_date).toLocaleDateString('en-IN')}</span>}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => handleToggle(offer)} className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                offer.is_active ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' : 'bg-green-50 hover:bg-green-100 text-green-700'
              }`}>{offer.is_active ? 'Pause' : 'Activate'}</button>
              <button onClick={() => openEdit(offer)} className="p-1.5 text-gray-400 hover:text-blue-600 rounded transition-colors"><Edit2 size={16} /></button>
              <button onClick={() => handleDelete(offer.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded transition-colors"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {offers.length === 0 && (
          <div className="bg-white border border-dashed border-gray-300 rounded-xl py-12 text-center">
            <Tag className="mx-auto mb-3 text-gray-300" size={32} />
            <p className="text-gray-500">No offers yet. Create your first offer.</p>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={resetForm}>
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="font-semibold text-gray-900 mb-4">{editing ? 'Edit Offer' : 'New Offer'}</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Internal Name *</label>
                  <input value={form.internal_name} onChange={e => setForm(f => ({...f, internal_name: e.target.value}))} placeholder="e.g. Summer Sale 2025" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer-Facing Title</label>
                  <input value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} placeholder="e.g. 20% Off All Products" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Offer Type</label>
                  <select value={form.offer_type} onChange={e => setForm(f => ({...f, offer_type: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500">
                    {OFFER_TYPES.map(t => <option key={t} value={t} className="capitalize">{t.replace('_', ' ')}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Value {form.offer_type === 'percentage' ? '(%)' : '(₹)'}</label>
                  <input type="number" value={form.discount_value} onChange={e => setForm(f => ({...f, discount_value: Number(e.target.value)}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Order Value (₹)</label>
                  <input type="number" value={form.minimum_order_value} onChange={e => setForm(f => ({...f, minimum_order_value: Number(e.target.value)}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Discount (₹, 0=unlimited)</label>
                  <input type="number" value={form.maximum_discount} onChange={e => setForm(f => ({...f, maximum_discount: Number(e.target.value)}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
                  <input value={form.badge_text} onChange={e => setForm(f => ({...f, badge_text: e.target.value}))} placeholder="e.g. SALE" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <input type="number" value={form.priority} onChange={e => setForm(f => ({...f, priority: Number(e.target.value)}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input type="datetime-local" value={form.start_date} onChange={e => setForm(f => ({...f, start_date: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input type="datetime-local" value={form.end_date} onChange={e => setForm(f => ({...f, end_date: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <input type="checkbox" id="is_active" checked={form.is_active} onChange={e => setForm(f => ({...f, is_active: e.target.checked}))} className="w-4 h-4" />
                  <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Active</label>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={resetForm} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50">Cancel</button>
                <button onClick={handleSave} disabled={loading} className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-medium rounded-md">
                  {loading ? 'Saving...' : (editing ? 'Update Offer' : 'Create Offer')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
