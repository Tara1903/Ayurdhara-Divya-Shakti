'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Image as ImageIcon, Layout, Type } from 'lucide-react';

export function HomepageClient({ hero, featured, about }: { hero: any, featured: any, about: any }) {
  const [heroForm, setHeroForm] = useState({
    title: hero.title || 'Discover Ancient Ayurvedic Wellness',
    subtitle: hero.subtitle || 'Pure, potent, and sustainably sourced botanicals for your health journey.',
    image_url: hero.image_url || '',
    cta_text: hero.cta_text || 'Shop Collection',
    cta_link: hero.cta_link || '/products'
  });
  
  const [featuredForm, setFeaturedForm] = useState({
    title: featured.title || 'Featured Remedies',
    subtitle: featured.subtitle || 'Our most loved holistic formulas',
  });

  const [aboutForm, setAboutForm] = useState({
    title: about.title || 'Our Philosophy',
    content: about.content || 'We believe in the power of nature to heal and restore balance.',
    image_url: about.image_url || ''
  });

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setLoading(true);
    await Promise.all([
      fetch('/api/admin/site-content/homepage_hero', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(heroForm) }),
      fetch('/api/admin/site-content/homepage_featured', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(featuredForm) }),
      fetch('/api/admin/site-content/homepage_about', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(aboutForm) }),
    ]);
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    router.refresh();
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Homepage Builder</h1>
          <p className="text-gray-500 mt-1">Manage the content and layout of your storefront homepage.</p>
        </div>
        <button onClick={handleSave} disabled={loading} className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg">
          <Save size={16} />{saved ? 'Saved!' : loading ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
          <Layout size={18} className="text-emerald-600" />
          <h3 className="font-semibold text-gray-900 text-lg">Hero Section</h3>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
              <input value={heroForm.title} onChange={e => setHeroForm(s => ({...s, title: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500 font-serif" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <textarea rows={3} value={heroForm.subtitle} onChange={e => setHeroForm(s => ({...s, subtitle: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                <input value={heroForm.cta_text} onChange={e => setHeroForm(s => ({...s, cta_text: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
                <input value={heroForm.cta_link} onChange={e => setHeroForm(s => ({...s, cta_link: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Background Image URL</label>
            <input value={heroForm.image_url} onChange={e => setHeroForm(s => ({...s, image_url: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500 mb-3" />
            {heroForm.image_url ? (
              <img src={heroForm.image_url} alt="Hero" className="w-full h-48 object-cover rounded-lg border border-gray-200" />
            ) : (
              <div className="w-full h-48 bg-gray-50 border border-gray-200 border-dashed rounded-lg flex flex-col items-center justify-center text-gray-400">
                <ImageIcon size={24} className="mb-2" />
                <span className="text-xs">No image preview</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
          <Type size={18} className="text-emerald-600" />
          <h3 className="font-semibold text-gray-900 text-lg">Featured Products Section</h3>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
            <input value={featuredForm.title} onChange={e => setFeaturedForm(s => ({...s, title: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section Subtitle</label>
            <input value={featuredForm.subtitle} onChange={e => setFeaturedForm(s => ({...s, subtitle: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">Note: The actual products shown are managed in the Products section by toggling the "Featured" status.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
          <Layout size={18} className="text-emerald-600" />
          <h3 className="font-semibold text-gray-900 text-lg">About / Philosophy Section</h3>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input value={aboutForm.title} onChange={e => setAboutForm(s => ({...s, title: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content Text</label>
              <textarea rows={6} value={aboutForm.content} onChange={e => setAboutForm(s => ({...s, content: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input value={aboutForm.image_url} onChange={e => setAboutForm(s => ({...s, image_url: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500 mb-3" />
            {aboutForm.image_url ? (
              <img src={aboutForm.image_url} alt="About" className="w-full h-48 object-cover rounded-lg border border-gray-200" />
            ) : (
              <div className="w-full h-48 bg-gray-50 border border-gray-200 border-dashed rounded-lg flex flex-col items-center justify-center text-gray-400">
                <ImageIcon size={24} className="mb-2" />
                <span className="text-xs">No image preview</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
