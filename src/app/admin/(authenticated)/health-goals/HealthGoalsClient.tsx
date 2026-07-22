'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, Target } from 'lucide-react';

interface HealthGoal {
  id: string; name: string; slug: string; created_at: string;
}

export function HealthGoalsClient({ goals }: { goals: HealthGoal[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<HealthGoal | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({ name: '', slug: '' });

  const resetForm = () => { setForm({ name: '', slug: '' }); setEditing(null); setShowForm(false); };

  const openEdit = (g: HealthGoal) => {
    setEditing(g);
    setForm({ name: g.name, slug: g.slug });
    setShowForm(true);
  };

  const handleSave = async () => {
    setLoading(true);
    const url = editing ? `/api/admin/health-goals/${editing.id}` : '/api/admin/health-goals';
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setLoading(false);
    if (res.ok) { resetForm(); router.refresh(); } else alert('Failed to save. Ensure name and slug are unique.');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this health goal? This removes the tag from all associated products.')) return;
    await fetch(`/api/admin/health-goals/${id}`, { method: 'DELETE' });
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Health Goals</h1>
          <p className="text-gray-500 mt-1">Manage health conditions and wellness goals products are tagged with.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg">
          <Plus size={16} /> New Goal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {goals.map(g => (
          <div key={g.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                <Target size={18} />
              </div>
              <div className="truncate">
                <h3 className="font-medium text-gray-900 truncate">{g.name}</h3>
                <p className="text-xs text-gray-500 font-mono truncate">/{g.slug}</p>
              </div>
            </div>
            <div className="flex gap-1 shrink-0 ml-2">
              <button onClick={() => openEdit(g)} className="p-1.5 text-gray-400 hover:text-blue-600"><Edit2 size={14} /></button>
              <button onClick={() => handleDelete(g.id)} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={resetForm}>
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="font-semibold text-gray-900 mb-4">{editing ? 'Edit Health Goal' : 'New Health Goal'}</h3>
            <div className="space-y-4">
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
