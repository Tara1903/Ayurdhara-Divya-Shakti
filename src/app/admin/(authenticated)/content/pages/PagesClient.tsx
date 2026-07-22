'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, FileText, Globe } from 'lucide-react';

interface Page {
  id: string; title: string; slug: string; content: string;
  is_published: boolean; seo_title: string; seo_description: string;
}

export function PagesClient({ pages }: { pages: Page[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Page | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({ title: '', slug: '', content: '', is_published: false, seo_title: '', seo_description: '' });

  const resetForm = () => { setForm({ title: '', slug: '', content: '', is_published: false, seo_title: '', seo_description: '' }); setEditing(null); setShowForm(false); };

  const openEdit = (p: Page) => {
    setEditing(p);
    setForm({ title: p.title, slug: p.slug, content: p.content, is_published: p.is_published, seo_title: p.seo_title || '', seo_description: p.seo_description || '' });
    setShowForm(true);
  };

  const handleSave = async () => {
    setLoading(true);
    const url = editing ? `/api/admin/content/pages/${editing.id}` : '/api/admin/content/pages';
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setLoading(false);
    if (res.ok) { resetForm(); router.refresh(); } else alert('Failed to save. Ensure slug is unique.');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this page?')) return;
    await fetch(`/api/admin/content/pages/${id}`, { method: 'DELETE' });
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Pages</h1>
          <p className="text-gray-500 mt-1">Manage static pages like About Us, Privacy Policy, Terms, etc.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg">
          <Plus size={16} /> New Page
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-700">Page Title</th>
              <th className="px-6 py-4 font-medium text-gray-700">URL Slug</th>
              <th className="px-6 py-4 font-medium text-gray-700">Status</th>
              <th className="px-6 py-4 font-medium text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pages.map(p => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <FileText size={16} className="text-gray-400" />
                    <span className="font-medium text-gray-900">{p.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-gray-500">/{p.slug}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${p.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {p.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => openEdit(p)} className="p-1.5 text-gray-500 hover:text-blue-600 rounded-md hover:bg-blue-50"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(p.id)} className="p-1.5 text-gray-500 hover:text-red-600 rounded-md hover:bg-red-50"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {pages.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No pages found. Create your first page.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={resetForm}>
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl shadow-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="font-semibold text-gray-900 mb-4">{editing ? 'Edit Page' : 'New Page'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Main Content Area */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input value={form.title} onChange={e => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                    setForm(f => ({...f, title, slug: editing ? f.slug : slug}));
                  }} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500 font-serif text-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content (HTML/Markdown) *</label>
                  <textarea rows={16} value={form.content} onChange={e => setForm(f => ({...f, content: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500 font-mono text-xs" />
                </div>
              </div>

              {/* Sidebar Settings Area */}
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg space-y-4 border border-gray-100">
                  <h4 className="text-sm font-medium text-gray-900 flex items-center gap-2"><Globe size={14}/> Page Settings</h4>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">URL Slug</label>
                    <div className="flex text-sm">
                      <span className="inline-flex items-center px-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-gray-500 text-xs">/</span>
                      <input value={form.slug} onChange={e => setForm(f => ({...f, slug: e.target.value}))} className="flex-1 w-full px-2 py-1.5 border border-gray-300 rounded-r-md text-xs outline-none focus:ring-1 focus:ring-emerald-500 font-mono" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <input type="checkbox" id="pg_published" checked={form.is_published} onChange={e => setForm(f => ({...f, is_published: e.target.checked}))} className="w-4 h-4 text-emerald-600 rounded" />
                    <label htmlFor="pg_published" className="text-sm font-medium text-gray-700">Published</label>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg space-y-4 border border-gray-100">
                  <h4 className="text-sm font-medium text-gray-900">SEO Meta Tags</h4>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">SEO Title</label>
                    <input value={form.seo_title} onChange={e => setForm(f => ({...f, seo_title: e.target.value}))} className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-xs outline-none focus:ring-1 focus:ring-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">SEO Description</label>
                    <textarea rows={4} value={form.seo_description} onChange={e => setForm(f => ({...f, seo_description: e.target.value}))} className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-xs outline-none focus:ring-1 focus:ring-emerald-500" />
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-4">
                  <button onClick={handleSave} disabled={loading} className="w-full px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg">
                    {loading ? 'Saving...' : (editing ? 'Update Page' : 'Create Page')}
                  </button>
                  <button onClick={resetForm} className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50">Cancel</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
