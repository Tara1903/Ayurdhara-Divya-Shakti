'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Search, Globe, Image as ImageIcon } from 'lucide-react';

export function SeoClient({ settings }: { settings: Record<string, any> }) {
  const [seo, setSeo] = useState({
    global_meta_title: settings.global_meta_title || 'Ayurdhara Divya Shakti - Healthy Life Wellness Therapy',
    global_meta_description: settings.global_meta_description || 'Premium luxury modern Ayurvedic wellness and health products.',
    global_meta_keywords: settings.global_meta_keywords || 'ayurveda, wellness, health, organic, pure',
    social_share_image: settings.social_share_image || '',
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setLoading(true);
    await Promise.all([
      fetch('/api/admin/site-settings/global_meta_title', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(seo.global_meta_title) }),
      fetch('/api/admin/site-settings/global_meta_description', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(seo.global_meta_description) }),
      fetch('/api/admin/site-settings/global_meta_keywords', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(seo.global_meta_keywords) }),
      fetch('/api/admin/site-settings/social_share_image', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(seo.social_share_image) }),
    ]);
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    router.refresh();
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-serif text-gray-900">SEO & Metadata</h1>
        <p className="text-gray-500 mt-1">Manage global search engine optimization settings.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <Search size={18} className="text-emerald-600" />
          <h3 className="font-semibold text-gray-900">Global Meta Tags</h3>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Default Meta Title</label>
          <input 
            value={seo.global_meta_title} 
            onChange={e => setSeo(s => ({...s, global_meta_title: e.target.value}))} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" 
            placeholder="Store Name - Tagline"
          />
          <p className="text-xs text-gray-400 mt-1">{seo.global_meta_title.length} characters (Recommended: 50-60)</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Default Meta Description</label>
          <textarea 
            rows={3}
            value={seo.global_meta_description} 
            onChange={e => setSeo(s => ({...s, global_meta_description: e.target.value}))} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" 
          />
          <p className="text-xs text-gray-400 mt-1">{seo.global_meta_description.length} characters (Recommended: 150-160)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords (Comma separated)</label>
          <input 
            value={seo.global_meta_keywords} 
            onChange={e => setSeo(s => ({...s, global_meta_keywords: e.target.value}))} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" 
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <Globe size={18} className="text-emerald-600" />
          <h3 className="font-semibold text-gray-900">Social Sharing (Open Graph)</h3>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Default Social Share Image URL</label>
          <input 
            value={seo.social_share_image} 
            onChange={e => setSeo(s => ({...s, social_share_image: e.target.value}))} 
            placeholder="https://..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" 
          />
          <p className="text-xs text-gray-400 mt-1">This image will appear when your store is linked on WhatsApp, Facebook, Twitter, etc. (Recommended: 1200x630px)</p>
          
          {seo.social_share_image ? (
            <img src={seo.social_share_image} alt="Social Share Preview" className="mt-4 rounded-lg border border-gray-200 max-h-48 object-cover" />
          ) : (
            <div className="mt-4 h-32 bg-gray-50 border border-gray-200 border-dashed rounded-lg flex flex-col items-center justify-center text-gray-400">
              <ImageIcon size={24} className="mb-2" />
              <span className="text-xs">No image provided</span>
            </div>
          )}
        </div>
      </div>

      {/* Live Preview Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Google Search Preview</h3>
        <div className="max-w-xl p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
          <div className="text-sm text-gray-700 mb-1 flex items-center gap-2">
            <span className="bg-gray-200 w-6 h-6 rounded-full inline-block"></span>
            https://ayurdharadivyashakti.com
          </div>
          <div className="text-xl text-blue-800 hover:underline cursor-pointer truncate">
            {seo.global_meta_title || 'Store Title'}
          </div>
          <div className="text-sm text-gray-600 mt-1 line-clamp-2">
            {seo.global_meta_description || 'Store Description'}
          </div>
        </div>
      </div>

      <button onClick={handleSave} disabled={loading} className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg">
        <Save size={16} />{saved ? 'Saved!' : loading ? 'Saving...' : 'Save SEO Settings'}
      </button>
    </div>
  );
}
