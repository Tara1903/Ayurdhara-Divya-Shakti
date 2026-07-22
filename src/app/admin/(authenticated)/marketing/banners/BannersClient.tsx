'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';

const PLACEMENTS = ['homepage', 'collections', 'product', 'checkout', 'global'];

interface Banner {
  id: string; title: string; subtitle: string; desktop_image_url: string;
  cta_text: string; cta_link: string; placement: string;
  start_date: string; end_date: string; is_active: boolean; priority: number;
}

export function BannersClient({ banners }: { banners: Banner[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Banner | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({ title: '', subtitle: '', desktop_image_url: '', cta_text: '', cta_link: '', placement: 'homepage', start_date: '', end_date: '', is_active: true, priority: 0 });

  const resetForm = () => { setForm({ title: '', subtitle: '', desktop_image_url: '', cta_text: '', cta_link: '', placement: 'homepage', start_date: '', end_date: '', is_active: true, priority: 0 }); setEditing(null); setShowForm(false); };

  const openEdit = (b: Banner) => {
    setEditing(b);
    setForm({ title: b.title, subtitle: b.subtitle || '', desktop_image_url: b.desktop_image_url || '', cta_text: b.cta_text || '', cta_link: b.cta_link || '', placement: b.placement || 'homepage', start_date: b.start_date?.slice(0, 16) || '', end_date: b.end_date?.slice(0, 16) || '', is_active: b.is_active, priority: b.priority || 0 });
    setShowForm(true);
  };

  const handleSave = async () => {
    setLoading(true);
    const url = editing ? `/api/admin/banners/${editing.id}` : '/api/admin/banners';
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setLoading(false);
    if (res.ok) { resetForm(); router.refresh(); } else alert('Failed to save');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this banner?')) return;
    await fetch(`/api/admin/banners/${id}`, { method: 'DELETE' });
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Banners</h1>
          <p className="text-gray-500 mt-1">Manage promotional banners across the storefront.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg">
          <Plus size={16} /> New Banner
        </button>
      </div>

      <div className="space-y-3">
        {banners.map(b => (
          <div key={b.id} className={`bg-white border rounded-xl p-5 flex items-start gap-4 ${b.is_active ? 'border-gray-200' : 'border-gray-100 opacity-60'}`}>
            {b.desktop_image_url ? (
              <img src={b.desktop_image_url} alt={b.title} className="w-20 h-12 object-cover rounded-md flex-shrink-0" />
            ) : (
              <div className="w-20 h-12 bg-gray-100 rounded-md flex items-center justify-center flex-shrink-0">
                <ImageIcon size={20} className="text-gray-300" />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-900">{b.title}</p>
                <span className={`px-2 py-0.5 text-xs rounded-full capitalize ${b.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{b.is_active ? 'Active' : 'Inactive'}</span>
                <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700 capitalize">{b.placement}</span>
              </div>
              {b.subtitle && <p className="text-sm text-gray-500 mt-0.5">{b.subtitle}</p>}
              <div className="flex gap-4 mt-1 text-xs text-gray-400">
                {b.cta_text && <span>CTA: {b.cta_text}</span>}
                {b.end_date && <span>Expires: {new Date(b.end_date).toLocaleDateString('en-IN')}</span>}
                <span>Priority: {b.priority}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(b)} className="p-1.5 text-gray-400 hover:text-blue-600"><Edit2 size={16} /></button>
              <button onClick={() => handleDelete(b.id)} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {banners.length === 0 && (
          <div className="bg-white border border-dashed border-gray-300 rounded-xl py-12 text-center">
            <ImageIcon className="mx-auto mb-3 text-gray-300" size={32} />
            <p className="text-gray-500">No banners yet.</p>
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={resetForm}>
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="font-semibold text-gray-900 mb-4">{editing ? 'Edit Banner' : 'New Banner'}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                <input value={form.subtitle} onChange={e => setForm(f => ({...f, subtitle: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input value={form.desktop_image_url} onChange={e => setForm(f => ({...f, desktop_image_url: e.target.value}))} placeholder="https://..." className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
                {form.desktop_image_url && <img src={form.desktop_image_url} alt="Preview" className="mt-2 h-20 object-cover rounded-md" />}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CTA Text</label>
                  <input value={form.cta_text} onChange={e => setForm(f => ({...f, cta_text: e.target.value}))} placeholder="Shop Now" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CTA Link</label>
                  <input value={form.cta_link} onChange={e => setForm(f => ({...f, cta_link: e.target.value}))} placeholder="/collections" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Placement</label>
                  <select value={form.placement} onChange={e => setForm(f => ({...f, placement: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500">
                    {PLACEMENTS.map(p => <option key={p} className="capitalize">{p}</option>)}
                  </select>
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
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="banner_active" checked={form.is_active} onChange={e => setForm(f => ({...f, is_active: e.target.checked}))} className="w-4 h-4" />
                <label htmlFor="banner_active" className="text-sm font-medium text-gray-700">Active</label>
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
