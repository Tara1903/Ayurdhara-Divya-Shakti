'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, BookOpen, Eye } from 'lucide-react';

interface Article {
  id: string; title: string; slug: string; excerpt: string;
  status: string; category: string; publish_date: string; created_at: string;
}

const CATEGORIES = ['Wellness', 'Ayurveda', 'Hair Care', 'Skin Care', 'Nutrition', 'Lifestyle', 'Research'];

export function JournalClient({ articles }: { articles: Article[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', content: '', category: 'Wellness', status: 'draft', publish_date: '', seo_title: '', seo_description: '' });

  const resetForm = () => { setForm({ title: '', slug: '', excerpt: '', content: '', category: 'Wellness', status: 'draft', publish_date: '', seo_title: '', seo_description: '' }); setEditing(null); setShowForm(false); };

  const openEdit = (article: Article) => {
    setEditing(article);
    setForm({ title: article.title, slug: article.slug, excerpt: article.excerpt || '', content: '', category: article.category || 'Wellness', status: article.status, publish_date: article.publish_date?.slice(0, 16) || '', seo_title: '', seo_description: '' });
    setShowForm(true);
  };

  const handleSave = async () => {
    setLoading(true);
    const url = editing ? `/api/admin/journal/${editing.id}` : '/api/admin/journal';
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setLoading(false);
    if (res.ok) { resetForm(); router.refresh(); } else alert('Failed to save');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this article?')) return;
    await fetch(`/api/admin/journal/${id}`, { method: 'DELETE' });
    router.refresh();
  };

  const statusColor: Record<string, string> = { draft: 'bg-gray-100 text-gray-700', published: 'bg-green-100 text-green-800', scheduled: 'bg-blue-100 text-blue-800', archived: 'bg-red-100 text-red-700' };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Journal</h1>
          <p className="text-gray-500 mt-1">Manage blog articles and wellness guides.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg">
          <Plus size={16} /> New Article
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {articles.length === 0 ? (
          <div className="py-12 text-center text-gray-400">
            <BookOpen className="mx-auto mb-3 opacity-30" size={32} />
            <p>No articles yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {articles.map(article => (
              <div key={article.id} className="p-5 flex items-center gap-4 hover:bg-gray-50">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium capitalize ${statusColor[article.status] || 'bg-gray-100 text-gray-700'}`}>{article.status}</span>
                    {article.category && <span className="px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-700">{article.category}</span>}
                  </div>
                  <p className="font-medium text-gray-900">{article.title}</p>
                  {article.excerpt && <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{article.excerpt}</p>}
                  <p className="text-xs text-gray-400 mt-1">
                    {article.publish_date ? `Published: ${new Date(article.publish_date).toLocaleDateString('en-IN')}` : `Created: ${new Date(article.created_at).toLocaleDateString('en-IN')}`}
                  </p>
                </div>
                <div className="flex gap-2">
                  {article.status === 'published' && <a href={`/journal/${article.slug}`} target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-400 hover:text-green-600"><Eye size={16} /></a>}
                  <button onClick={() => openEdit(article)} className="p-1.5 text-gray-400 hover:text-blue-600"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(article.id)} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={resetForm}>
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="font-semibold text-gray-900 mb-4">{editing ? 'Edit Article' : 'New Article'}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input value={form.title} onChange={e => { setForm(f => ({...f, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input value={form.slug} onChange={e => setForm(f => ({...f, slug: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm(f => ({...f, status: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500">
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Publish Date</label>
                <input type="datetime-local" value={form.publish_date} onChange={e => setForm(f => ({...f, publish_date: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                <textarea rows={2} value={form.excerpt} onChange={e => setForm(f => ({...f, excerpt: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea rows={8} value={form.content} onChange={e => setForm(f => ({...f, content: e.target.value}))} placeholder="Write your article content here..." className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500 resize-none font-mono text-xs" />
              </div>
              <div className="border-t pt-4">
                <p className="text-xs font-medium text-gray-500 uppercase mb-3">SEO</p>
                <div className="space-y-3">
                  <input value={form.seo_title} onChange={e => setForm(f => ({...f, seo_title: e.target.value}))} placeholder="SEO Title" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
                  <textarea rows={2} value={form.seo_description} onChange={e => setForm(f => ({...f, seo_description: e.target.value}))} placeholder="Meta Description" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500 resize-none" />
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
