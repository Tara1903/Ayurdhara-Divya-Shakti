'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Plus, Trash2, GripVertical, Menu, Layout } from 'lucide-react';

interface LinkItem {
  id: string;
  label: string;
  url: string;
}

export function NavigationClient({ header, footer }: { header: any, footer: any }) {
  const [headerLinks, setHeaderLinks] = useState<LinkItem[]>(header.links || []);
  const [footerCols, setFooterCols] = useState<{title: string, links: LinkItem[]}[]>(footer.columns || [
    { title: 'Shop', links: [] },
    { title: 'Information', links: [] }
  ]);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setLoading(true);
    await Promise.all([
      fetch('/api/admin/site-content/nav_header', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ links: headerLinks }) }),
      fetch('/api/admin/site-content/nav_footer', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ columns: footerCols }) }),
    ]);
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    router.refresh();
  };

  const addHeaderLink = () => {
    setHeaderLinks([...headerLinks, { id: Math.random().toString(36).substring(7), label: 'New Link', url: '/' }]);
  };

  const updateHeaderLink = (id: string, field: 'label'|'url', value: string) => {
    setHeaderLinks(headerLinks.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  const removeHeaderLink = (id: string) => {
    setHeaderLinks(headerLinks.filter(l => l.id !== id));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Navigation Builder</h1>
          <p className="text-gray-500 mt-1">Manage header and footer menus.</p>
        </div>
        <button onClick={handleSave} disabled={loading} className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg">
          <Save size={16} />{saved ? 'Saved!' : loading ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
          <Menu size={18} className="text-emerald-600" />
          <h3 className="font-semibold text-gray-900 text-lg">Header Navigation</h3>
        </div>
        
        <div className="space-y-3">
          {headerLinks.map((link, idx) => (
            <div key={link.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <GripVertical size={16} className="text-gray-400 cursor-move" />
              <input 
                value={link.label} 
                onChange={e => updateHeaderLink(link.id, 'label', e.target.value)} 
                placeholder="Label (e.g. Shop)"
                className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" 
              />
              <input 
                value={link.url} 
                onChange={e => updateHeaderLink(link.id, 'url', e.target.value)} 
                placeholder="URL (e.g. /products)"
                className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500 font-mono" 
              />
              <button onClick={() => removeHeaderLink(link.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
        <button onClick={addHeaderLink} className="mt-4 flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors">
          <Plus size={16} /> Add Header Link
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
          <Layout size={18} className="text-emerald-600" />
          <h3 className="font-semibold text-gray-900 text-lg">Footer Columns</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {footerCols.map((col, cIdx) => (
            <div key={cIdx} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="mb-4 flex items-center justify-between">
                <input 
                  value={col.title}
                  onChange={e => {
                    const nc = [...footerCols];
                    nc[cIdx].title = e.target.value;
                    setFooterCols(nc);
                  }}
                  className="font-medium text-gray-900 bg-transparent border-b border-dashed border-gray-400 outline-none focus:border-emerald-500 pb-1"
                  placeholder="Column Title"
                />
              </div>
              <div className="space-y-2">
                {col.links.map((link, lIdx) => (
                  <div key={link.id} className="flex items-center gap-2">
                    <input 
                      value={link.label}
                      onChange={e => {
                        const nc = [...footerCols];
                        nc[cIdx].links[lIdx].label = e.target.value;
                        setFooterCols(nc);
                      }}
                      className="w-1/2 px-2 py-1 text-sm border border-gray-300 rounded outline-none"
                      placeholder="Label"
                    />
                    <input 
                      value={link.url}
                      onChange={e => {
                        const nc = [...footerCols];
                        nc[cIdx].links[lIdx].url = e.target.value;
                        setFooterCols(nc);
                      }}
                      className="w-1/2 px-2 py-1 text-sm border border-gray-300 rounded outline-none font-mono"
                      placeholder="URL"
                    />
                    <button onClick={() => {
                      const nc = [...footerCols];
                      nc[cIdx].links = nc[cIdx].links.filter((_, i) => i !== lIdx);
                      setFooterCols(nc);
                    }} className="text-gray-400 hover:text-red-500"><Trash2 size={14}/></button>
                  </div>
                ))}
              </div>
              <button onClick={() => {
                const nc = [...footerCols];
                nc[cIdx].links.push({ id: Math.random().toString(36).substring(7), label: 'New Link', url: '/' });
                setFooterCols(nc);
              }} className="mt-3 text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"><Plus size={14}/> Add Link</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
