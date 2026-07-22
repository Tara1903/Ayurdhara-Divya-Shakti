'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, MessageCircle, Star } from 'lucide-react';

interface Testimonial {
  id: string; author_name: string; author_image_url: string; 
  content: string; rating: number; is_featured: boolean;
  product_id: string | null; is_active: boolean;
}

export function TestimonialsClient({ testimonials }: { testimonials: Testimonial[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({ author_name: '', author_image_url: '', content: '', rating: 5, is_featured: false, is_active: true });

  const resetForm = () => { setForm({ author_name: '', author_image_url: '', content: '', rating: 5, is_featured: false, is_active: true }); setEditing(null); setShowForm(false); };

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({ author_name: t.author_name, author_image_url: t.author_image_url || '', content: t.content, rating: t.rating || 5, is_featured: t.is_featured, is_active: t.is_active });
    setShowForm(true);
  };

  const handleSave = async () => {
    setLoading(true);
    const url = editing ? `/api/admin/content/testimonials/${editing.id}` : '/api/admin/content/testimonials';
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setLoading(false);
    if (res.ok) { resetForm(); router.refresh(); } else alert('Failed to save.');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    await fetch(`/api/admin/content/testimonials/${id}`, { method: 'DELETE' });
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Testimonials</h1>
          <p className="text-gray-500 mt-1">Manage customer reviews and featured testimonials.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg">
          <Plus size={16} /> New Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map(t => (
          <div key={t.id} className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                {t.author_image_url ? (
                  <img src={t.author_image_url} alt={t.author_name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <MessageCircle size={18} />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-gray-900">{t.author_name}</h3>
                  <div className="flex text-amber-400 mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill={i < (t.rating || 5) ? 'currentColor' : 'none'} className={i < (t.rating || 5) ? '' : 'text-gray-300'} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(t)} className="p-1.5 text-gray-400 hover:text-blue-600"><Edit2 size={16} /></button>
                <button onClick={() => handleDelete(t.id)} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
              </div>
            </div>
            <p className="text-sm text-gray-600 italic mt-2 line-clamp-3">"{t.content}"</p>
            <div className="flex items-center gap-3 mt-auto pt-4 text-xs font-medium">
              <span className={`px-2 py-0.5 rounded-full ${t.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {t.is_active ? 'Active' : 'Hidden'}
              </span>
              {t.is_featured && <span className="text-emerald-700">★ Featured</span>}
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={resetForm}>
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="font-semibold text-gray-900 mb-4">{editing ? 'Edit Testimonial' : 'New Testimonial'}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author Name *</label>
                <input value={form.author_name} onChange={e => setForm(f => ({...f, author_name: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author Image URL</label>
                <input value={form.author_image_url} onChange={e => setForm(f => ({...f, author_image_url: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
                <textarea rows={4} value={form.content} onChange={e => setForm(f => ({...f, content: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                  <input type="number" min="1" max="5" value={form.rating} onChange={e => setForm(f => ({...f, rating: Number(e.target.value)}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
                <div className="flex flex-col justify-center gap-2 pt-4">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="test_active" checked={form.is_active} onChange={e => setForm(f => ({...f, is_active: e.target.checked}))} className="w-4 h-4 text-emerald-600" />
                    <label htmlFor="test_active" className="text-sm font-medium text-gray-700">Active</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="test_feat" checked={form.is_featured} onChange={e => setForm(f => ({...f, is_featured: e.target.checked}))} className="w-4 h-4 text-emerald-600" />
                    <label htmlFor="test_feat" className="text-sm font-medium text-gray-700">Featured on Homepage</label>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 pt-2">
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
