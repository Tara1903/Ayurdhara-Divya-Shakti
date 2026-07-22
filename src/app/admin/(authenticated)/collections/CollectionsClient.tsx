'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, LayoutGrid, Image as ImageIcon } from 'lucide-react';

interface Collection {
  id: string; name: string; slug: string; description: string;
  hero_image_url: string; mobile_image_url: string; is_active: boolean;
  seo_title: string; seo_description: string;
}

export function CollectionsClient({ collections }: { collections: Collection[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({ name: '', slug: '', description: '', hero_image_url: '', mobile_image_url: '', is_active: true, seo_title: '', seo_description: '' });

  const resetForm = () => { setForm({ name: '', slug: '', description: '', hero_image_url: '', mobile_image_url: '', is_active: true, seo_title: '', seo_description: '' }); setEditing(null); setShowForm(false); };

  const openEdit = (c: Collection) => {
    setEditing(c);
    setForm({ name: c.name, slug: c.slug, description: c.description || '', hero_image_url: c.hero_image_url || '', mobile_image_url: c.mobile_image_url || '', is_active: c.is_active, seo_title: c.seo_title || '', seo_description: c.seo_description || '' });
    setShowForm(true);
  };

  const handleSave = async () => {
    setLoading(true);
    const url = editing ? `/api/admin/collections/${editing.id}` : '/api/admin/collections';
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setLoading(false);
    if (res.ok) { resetForm(); router.refresh(); } else alert('Failed to save. Ensure slug is unique.');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this collection?')) return;
    await fetch(`/api/admin/collections/${id}`, { method: 'DELETE' });
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Collections</h1>
          <p className="text-gray-500 mt-1">Group products into curated collections (e.g., Summer Skincare, Immunity Boosters).</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg">
          <Plus size={16} /> New Collection
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {collections.map(c => (
          <div key={c.id} className={`bg-white border rounded-xl overflow-hidden flex flex-col ${c.is_active ? 'border-gray-200' : 'border-gray-100 opacity-70'}`}>
            <div className="h-32 bg-gray-100 relative">
              {c.hero_image_url ? (
                <img src={c.hero_image_url} alt={c.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <ImageIcon size={32} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                  <h3 className="font-semibold text-white text-lg leading-tight">{c.name}</h3>
                  <p className="text-xs text-gray-200 mt-0.5 font-mono">/{c.slug}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs ${c.is_active ? 'bg-green-500/20 text-green-200 border border-green-500/30' : 'bg-gray-500/40 text-gray-200'}`}>
                  {c.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            
            <div className="p-4 flex flex-col flex-1">
              {c.description && <p className="text-sm text-gray-600 line-clamp-2 mb-4">{c.description}</p>}
              <div className="flex gap-2 mt-auto justify-end border-t border-gray-100 pt-3">
                <button onClick={() => openEdit(c)} className="px-3 py-1.5 flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"><Edit2 size={14} /> Edit</button>
                <button onClick={() => handleDelete(c.id)} className="px-3 py-1.5 flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={14} /> Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={resetForm}>
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="font-semibold text-gray-900 mb-4">{editing ? 'Edit Collection' : 'New Collection'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input value={form.name} onChange={e => {
                  const name = e.target.value;
                  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                  setForm(f => ({...f, name, slug: editing ? f.slug : slug}));
                }} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                <input value={form.slug} onChange={e => setForm(f => ({...f, slug: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500 font-mono" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows={3} value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              
              <div className="md:col-span-2 pt-2 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Media</h4>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image URL (Desktop)</label>
                <input value={form.hero_image_url} onChange={e => setForm(f => ({...f, hero_image_url: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Image URL</label>
                <input value={form.mobile_image_url} onChange={e => setForm(f => ({...f, mobile_image_url: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>

              <div className="md:col-span-2 pt-2 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-900 mb-3">SEO</h4>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
                <input value={form.seo_title} onChange={e => setForm(f => ({...f, seo_title: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SEO Description</label>
                <input value={form.seo_description} onChange={e => setForm(f => ({...f, seo_description: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              
              <div className="md:col-span-2 flex items-center gap-2 pt-4">
                <input type="checkbox" id="col_active" checked={form.is_active} onChange={e => setForm(f => ({...f, is_active: e.target.checked}))} className="w-4 h-4" />
                <label htmlFor="col_active" className="text-sm font-medium text-gray-700">Collection is active</label>
              </div>

              <div className="md:col-span-2 flex gap-3 pt-4 border-t border-gray-100 mt-2">
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
