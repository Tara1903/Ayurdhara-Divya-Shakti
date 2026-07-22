'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, MessageSquare, Image as ImageIcon } from 'lucide-react';

interface Popup {
  id: string; title: string; description: string; image_url: string;
  cta_text: string; cta_link: string; popup_type: string;
  delay_seconds: number; frequency: string; is_active: boolean;
}

export function PopupsClient({ popups }: { popups: Popup[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Popup | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({ title: '', description: '', image_url: '', cta_text: '', cta_link: '', popup_type: 'promotional', delay_seconds: 3, frequency: 'once_per_session', is_active: true });

  const resetForm = () => { setForm({ title: '', description: '', image_url: '', cta_text: '', cta_link: '', popup_type: 'promotional', delay_seconds: 3, frequency: 'once_per_session', is_active: true }); setEditing(null); setShowForm(false); };

  const openEdit = (p: Popup) => {
    setEditing(p);
    setForm({ title: p.title, description: p.description || '', image_url: p.image_url || '', cta_text: p.cta_text || '', cta_link: p.cta_link || '', popup_type: p.popup_type || 'promotional', delay_seconds: p.delay_seconds || 3, frequency: p.frequency || 'once_per_session', is_active: p.is_active });
    setShowForm(true);
  };

  const handleSave = async () => {
    setLoading(true);
    const url = editing ? `/api/admin/popups/${editing.id}` : '/api/admin/popups';
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setLoading(false);
    if (res.ok) { resetForm(); router.refresh(); } else alert('Failed to save.');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this popup?')) return;
    await fetch(`/api/admin/popups/${id}`, { method: 'DELETE' });
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Popups</h1>
          <p className="text-gray-500 mt-1">Manage marketing and informational popups on your store.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg">
          <Plus size={16} /> New Popup
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {popups.map(p => (
          <div key={p.id} className={`bg-white border rounded-xl p-5 flex flex-col gap-3 ${p.is_active ? 'border-gray-200' : 'border-gray-100 opacity-70'}`}>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                {p.image_url ? (
                  <img src={p.image_url} alt={p.title} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <MessageSquare size={20} />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-gray-900 leading-tight">{p.title}</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">{p.popup_type.replace('_', ' ')}</span>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(p)} className="p-1.5 text-gray-400 hover:text-blue-600"><Edit2 size={16} /></button>
                <button onClick={() => handleDelete(p.id)} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
              </div>
            </div>
            {p.description && <p className="text-sm text-gray-600 line-clamp-2">{p.description}</p>}
            <div className="flex items-center gap-3 mt-auto pt-2 text-xs">
              <span className={`px-2 py-0.5 rounded-full ${p.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {p.is_active ? 'Active' : 'Inactive'}
              </span>
              <span className="text-gray-400">Delay: {p.delay_seconds}s</span>
              <span className="text-gray-400 capitalize">{p.frequency.replace(/_/g, ' ')}</span>
            </div>
          </div>
        ))}
        {popups.length === 0 && (
          <div className="col-span-full p-8 text-center bg-white border border-gray-200 rounded-xl text-gray-500">No popups created yet.</div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={resetForm}>
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="font-semibold text-gray-900 mb-4">{editing ? 'Edit Popup' : 'New Popup'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows={2} value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Popup Type</label>
                <select value={form.popup_type} onChange={e => setForm(f => ({...f, popup_type: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500">
                  <option value="promotional">Promotional</option>
                  <option value="newsletter">Newsletter</option>
                  <option value="new_product">New Product</option>
                  <option value="sale">Sale</option>
                  <option value="announcement">Announcement</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Frequency</label>
                <select value={form.frequency} onChange={e => setForm(f => ({...f, frequency: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500">
                  <option value="once_per_session">Once per session</option>
                  <option value="once_per_day">Once per day</option>
                  <option value="once_per_campaign">Once ever</option>
                  <option value="always">Always (Debugging)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delay (seconds)</label>
                <input type="number" value={form.delay_seconds} onChange={e => setForm(f => ({...f, delay_seconds: Number(e.target.value)}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input value={form.image_url} onChange={e => setForm(f => ({...f, image_url: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                <input value={form.cta_text} onChange={e => setForm(f => ({...f, cta_text: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
                <input value={form.cta_link} onChange={e => setForm(f => ({...f, cta_link: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              
              <div className="md:col-span-2 flex items-center gap-2 pt-2">
                <input type="checkbox" id="popup_active" checked={form.is_active} onChange={e => setForm(f => ({...f, is_active: e.target.checked}))} className="w-4 h-4 text-emerald-600" />
                <label htmlFor="popup_active" className="text-sm font-medium text-gray-700">Popup is active</label>
              </div>

              <div className="md:col-span-2 flex gap-3 pt-4 border-t border-gray-100">
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
