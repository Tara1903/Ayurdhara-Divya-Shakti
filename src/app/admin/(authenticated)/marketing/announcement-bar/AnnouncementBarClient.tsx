'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Megaphone, Save } from 'lucide-react';

interface Settings { enabled: boolean; message: string; cta_text: string; cta_link: string; variant: string; }

export function AnnouncementBarClient({ settings }: { settings: Settings }) {
  const [form, setForm] = useState(settings);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/site-settings/announcement_bar', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 2000); router.refresh(); }
    else alert('Failed to save');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-serif text-gray-900">Announcement Bar</h1>
        <p className="text-gray-500 mt-1">Manage the site-wide announcement banner. Changes appear instantly without redeployment.</p>
      </div>

      {/* Preview */}
      {form.enabled && form.message && (
        <div className="rounded-xl overflow-hidden">
          <div className="bg-emerald-800 text-white text-sm text-center py-2.5 px-4 flex items-center justify-center gap-4">
            <span>{form.message}</span>
            {form.cta_text && <span className="bg-white text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold">{form.cta_text}</span>}
          </div>
          <p className="text-center text-xs text-gray-400 pt-2">Live preview</p>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Enable Announcement Bar</p>
            <p className="text-sm text-gray-500">Show/hide the banner across all pages</p>
          </div>
          <button
            onClick={() => setForm(f => ({...f, enabled: !f.enabled}))}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              form.enabled ? 'bg-emerald-600' : 'bg-gray-300'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              form.enabled ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
          <input
            value={form.message}
            onChange={e => setForm(f => ({...f, message: e.target.value}))}
            placeholder="e.g. Free shipping on orders above ₹2000! 🎉"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button Text</label>
            <input
              value={form.cta_text}
              onChange={e => setForm(f => ({...f, cta_text: e.target.value}))}
              placeholder="e.g. Shop Now"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CTA Link</label>
            <input
              value={form.cta_link}
              onChange={e => setForm(f => ({...f, cta_link: e.target.value}))}
              placeholder="e.g. /collections"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Visual Style</label>
          <select value={form.variant} onChange={e => setForm(f => ({...f, variant: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500">
            <option value="default">Default (Dark Green)</option>
            <option value="gold">Gold</option>
            <option value="urgent">Urgent (Red)</option>
          </select>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Save size={16} />
          {saved ? 'Saved!' : loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-700">
          <strong>Live Update:</strong> Changes to the announcement bar are saved to Supabase and will appear on your website immediately when customers refresh the page. No redeployment required.
        </p>
      </div>
    </div>
  );
}
