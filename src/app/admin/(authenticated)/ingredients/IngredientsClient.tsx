'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, Leaf, Image as ImageIcon } from 'lucide-react';

interface Ingredient {
  id: string; name: string; slug: string; botanical_name: string;
  short_description: string; role: string; image_url: string; is_active: boolean;
}

export function IngredientsClient({ ingredients }: { ingredients: Ingredient[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Ingredient | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({ name: '', slug: '', botanical_name: '', short_description: '', role: '', image_url: '', is_active: true });

  const resetForm = () => { setForm({ name: '', slug: '', botanical_name: '', short_description: '', role: '', image_url: '', is_active: true }); setEditing(null); setShowForm(false); };

  const openEdit = (i: Ingredient) => {
    setEditing(i);
    setForm({ name: i.name, slug: i.slug, botanical_name: i.botanical_name || '', short_description: i.short_description || '', role: i.role || '', image_url: i.image_url || '', is_active: i.is_active });
    setShowForm(true);
  };

  const handleSave = async () => {
    setLoading(true);
    const url = editing ? `/api/admin/ingredients/${editing.id}` : '/api/admin/ingredients';
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setLoading(false);
    if (res.ok) { resetForm(); router.refresh(); } else alert('Failed to save. Ensure name and slug are unique.');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this ingredient? This removes it from all associated products.')) return;
    await fetch(`/api/admin/ingredients/${id}`, { method: 'DELETE' });
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Ingredients</h1>
          <p className="text-gray-500 mt-1">Manage the Ayurvedic herbs and botanicals used in your products.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg">
          <Plus size={16} /> New Ingredient
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ingredients.map(i => (
          <div key={i.id} className={`bg-white border rounded-xl p-5 flex flex-col gap-3 ${i.is_active ? 'border-gray-200' : 'border-gray-100 opacity-70'}`}>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                {i.image_url ? (
                  <img src={i.image_url} alt={i.name} className="w-12 h-12 rounded-full object-cover bg-gray-100 border border-gray-200" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <Leaf size={20} />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-gray-900 leading-tight">{i.name}</h3>
                  {i.botanical_name && <p className="text-xs text-emerald-700 italic">{i.botanical_name}</p>}
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(i)} className="p-1.5 text-gray-400 hover:text-blue-600"><Edit2 size={16} /></button>
                <button onClick={() => handleDelete(i.id)} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
              </div>
            </div>
            {i.short_description && <p className="text-sm text-gray-600 line-clamp-2 flex-1">{i.short_description}</p>}
            <div className="flex items-center gap-3 mt-auto pt-2 text-xs">
              <span className={`px-2 py-0.5 rounded-full ${i.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {i.is_active ? 'Active' : 'Inactive'}
              </span>
              {i.role && <span className="text-gray-500 px-2 py-0.5 bg-gray-50 rounded-md border border-gray-100">{i.role}</span>}
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={resetForm}>
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="font-semibold text-gray-900 mb-4">{editing ? 'Edit Ingredient' : 'New Ingredient'}</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Botanical Name (Latin)</label>
                  <input value={form.botanical_name} onChange={e => setForm(f => ({...f, botanical_name: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500 italic" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role (e.g. Active, Carrier)</label>
                  <input value={form.role} onChange={e => setForm(f => ({...f, role: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                <textarea rows={3} value={form.short_description} onChange={e => setForm(f => ({...f, short_description: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input value={form.image_url} onChange={e => setForm(f => ({...f, image_url: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="ing_active" checked={form.is_active} onChange={e => setForm(f => ({...f, is_active: e.target.checked}))} className="w-4 h-4" />
                <label htmlFor="ing_active" className="text-sm font-medium text-gray-700">Active</label>
              </div>
              <div className="flex gap-3 pt-2 border-t border-gray-100">
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
