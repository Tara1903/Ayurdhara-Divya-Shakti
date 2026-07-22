'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, HelpCircle } from 'lucide-react';

interface Faq {
  id: string; question: string; answer: string; context: string;
  context_id: string | null; display_order: number; is_active: boolean;
}

export function FaqsClient({ faqs }: { faqs: Faq[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Faq | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({ question: '', answer: '', context: 'global', display_order: 0, is_active: true });

  const resetForm = () => { setForm({ question: '', answer: '', context: 'global', display_order: 0, is_active: true }); setEditing(null); setShowForm(false); };

  const openEdit = (f: Faq) => {
    setEditing(f);
    setForm({ question: f.question, answer: f.answer, context: f.context, display_order: f.display_order, is_active: f.is_active });
    setShowForm(true);
  };

  const handleSave = async () => {
    setLoading(true);
    const url = editing ? `/api/admin/content/faqs/${editing.id}` : '/api/admin/content/faqs';
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setLoading(false);
    if (res.ok) { resetForm(); router.refresh(); } else alert('Failed to save.');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this FAQ?')) return;
    await fetch(`/api/admin/content/faqs/${id}`, { method: 'DELETE' });
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">FAQs</h1>
          <p className="text-gray-500 mt-1">Manage frequently asked questions.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg">
          <Plus size={16} /> New FAQ
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="divide-y divide-gray-100">
          {faqs.map(f => (
            <div key={f.id} className="p-4 hover:bg-gray-50 flex gap-4">
              <div className="mt-1 text-gray-400">
                <HelpCircle size={20} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900">{f.question}</h3>
                  <div className="flex gap-2 shrink-0">
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{f.context}</span>
                    <button onClick={() => openEdit(f)} className="p-1 text-gray-400 hover:text-blue-600"><Edit2 size={14} /></button>
                    <button onClick={() => handleDelete(f.id)} className="p-1 text-gray-400 hover:text-red-600"><Trash2 size={14} /></button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{f.answer}</p>
                <div className="text-xs text-gray-400 mt-3 flex items-center gap-3">
                  <span className={f.is_active ? 'text-green-600' : 'text-gray-400'}>{f.is_active ? 'Active' : 'Inactive'}</span>
                  <span>Order: {f.display_order}</span>
                </div>
              </div>
            </div>
          ))}
          {faqs.length === 0 && (
            <div className="p-8 text-center text-gray-500">No FAQs found. Create your first FAQ.</div>
          )}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={resetForm}>
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="font-semibold text-gray-900 mb-4">{editing ? 'Edit FAQ' : 'New FAQ'}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Context</label>
                <select value={form.context} onChange={e => setForm(f => ({...f, context: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500">
                  <option value="global">Global</option>
                  <option value="shipping">Shipping</option>
                  <option value="payment">Payment</option>
                  <option value="product">Product</option>
                  <option value="category">Category</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Question *</label>
                <input value={form.question} onChange={e => setForm(f => ({...f, question: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Answer *</label>
                <textarea rows={4} value={form.answer} onChange={e => setForm(f => ({...f, answer: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                  <input type="number" value={form.display_order} onChange={e => setForm(f => ({...f, display_order: Number(e.target.value)}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input type="checkbox" id="faq_active" checked={form.is_active} onChange={e => setForm(f => ({...f, is_active: e.target.checked}))} className="w-4 h-4 text-emerald-600" />
                  <label htmlFor="faq_active" className="text-sm font-medium text-gray-700">Active</label>
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
