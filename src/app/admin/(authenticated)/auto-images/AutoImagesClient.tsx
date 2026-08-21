'use client';

import { useState, useMemo } from 'react';
import { Sparkles, Search, RefreshCw, CheckCircle, AlertCircle, Image as ImageIcon, ExternalLink, Filter, Layers, Check } from 'lucide-react';
import { analyzeProductForImages } from '@/lib/image-system';
import toast from 'react-hot-toast';

interface ProductItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  categoryId: string;
  imageUrl: string;
  isActive: boolean;
}

export default function AutoImagesClient({
  initialProducts,
  categories
}: {
  initialProducts: ProductItem[];
  categories: any[];
}) {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedForm, setSelectedForm] = useState('ALL');
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [isBatchRunning, setIsBatchRunning] = useState(false);
  const [batchProgress, setBatchProgress] = useState({ current: 0, total: 0 });

  // Analyze products on the fly
  const analyzedProducts = useMemo(() => {
    return products.map(p => {
      const intel = analyzeProductForImages(p.name, p.category);
      const isMissing = !p.imageUrl || p.imageUrl.includes('placeholder') || p.imageUrl.includes('cat_');
      return {
        ...p,
        intel,
        status: isMissing ? 'Needs Review' : 'Active Image',
      };
    });
  }, [products]);

  const filteredProducts = useMemo(() => {
    return analyzedProducts.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.intel.cleanIngredient.includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
      const matchesForm = selectedForm === 'ALL' || p.intel.productForm === selectedForm;
      return matchesSearch && matchesCategory && matchesForm;
    });
  }, [analyzedProducts, searchTerm, selectedCategory, selectedForm]);

  const handleResolveSingle = async (product: ProductItem) => {
    setResolvingId(product.id);
    const toastId = toast.loading(`Resolving image for ${product.name}...`);
    try {
      const res = await fetch('/api/admin/auto-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          name: product.name,
          category: product.category,
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to resolve image');

      setProducts(prev => prev.map(p => p.id === product.id ? { ...p, imageUrl: data.imageUrl } : p));
      toast.success(`Image updated for ${product.name}!`, { id: toastId });
    } catch (err: any) {
      toast.error(err.message || 'Error resolving image', { id: toastId });
    } finally {
      setResolvingId(null);
    }
  };

  const handleBatchResolveMissing = async () => {
    const missing = analyzedProducts.filter(p => p.status === 'Needs Review');
    if (missing.length === 0) {
      toast.success('All products already have active images!');
      return;
    }

    if (!confirm(`Resolve images for ${missing.length} products with smart delay?`)) return;

    setIsBatchRunning(true);
    setBatchProgress({ current: 0, total: missing.length });

    let count = 0;
    for (const p of missing) {
      count++;
      setBatchProgress({ current: count, total: missing.length });
      try {
        const res = await fetch('/api/admin/auto-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: p.id,
            name: p.name,
            category: p.category,
          })
        });
        const data = await res.json();
        if (res.ok && data.imageUrl) {
          setProducts(prev => prev.map(item => item.id === p.id ? { ...item, imageUrl: data.imageUrl } : item));
        }
      } catch (e) {
        console.error('Batch error on', p.name, e);
      }
      await new Promise(r => setTimeout(r, 1200));
    }

    setIsBatchRunning(false);
    toast.success('Batch image resolution complete!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#2D5A27] flex items-center gap-2">
            <Sparkles className="text-[#E88B23]" /> Master Product Image System
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Automatic botanical intelligence, keyword extraction, and high-accuracy product photography mapping
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleBatchResolveMissing}
            disabled={isBatchRunning}
            className="px-4 py-2.5 bg-[#2D5A27] hover:bg-[#23471f] text-white rounded-lg font-bold text-sm flex items-center gap-2 shadow-sm transition-colors disabled:opacity-50"
          >
            <RefreshCw size={16} className={isBatchRunning ? 'animate-spin' : ''} />
            {isBatchRunning ? `Processing (${batchProgress.current}/${batchProgress.total})...` : '✨ Batch Auto-Resolve All'}
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search product or ingredient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-1 focus:ring-[#4B7B3B] outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 outline-none"
          >
            <option value="ALL">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>

          <select
            value={selectedForm}
            onChange={(e) => setSelectedForm(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 outline-none"
          >
            <option value="ALL">All Product Forms</option>
            <option value="raw_herb">🌱 Raw Herb (Whole/Root)</option>
            <option value="powder">🌿 Herbal Powder</option>
            <option value="oil">🫒 Cold Pressed Oil</option>
            <option value="tea">🍵 Herbal Tea</option>
            <option value="kadha">🌿 Traditional Kadha</option>
            <option value="honey">🍯 Natural Honey</option>
            <option value="ghee">🧈 Traditional Ghee</option>
            <option value="dry_fruit">🥜 Dry Fruit</option>
            <option value="seed">🌱 Edible Seed</option>
            <option value="jaggery">🍯 Natural Jaggery</option>
          </select>

          <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-2 rounded-lg">
            {filteredProducts.length} Products
          </span>
        </div>
      </div>

      {/* Products Grid / Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-[#f8fbf7] text-[#2D5A27] font-bold text-xs uppercase border-b border-gray-200">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Product Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Detected Form</th>
                <th className="p-4">Keywords & Rule</th>
                <th className="p-4">Confidence</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filteredProducts.map((p) => {
                const isResolving = resolvingId === p.id;
                return (
                  <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4">
                      <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 relative flex items-center justify-center shadow-sm">
                        {p.imageUrl ? (
                          <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-[10px] text-gray-400">No Image</span>
                        )}
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="font-bold text-gray-900">{p.name}</div>
                      <div className="text-xs text-gray-400 font-mono">/products/{p.slug}</div>
                    </td>

                    <td className="p-4">
                      <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded">
                        {p.category}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-[#2D5A27]/10 text-[#2D5A27] border border-[#2D5A27]/20">
                        {p.intel.productForm.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="p-4 max-w-xs">
                      <div className="text-xs text-gray-700 truncate" title={p.intel.generatedKeywords}>
                        {p.intel.generatedKeywords}
                      </div>
                      {p.intel.validationNotes.length > 0 && (
                        <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                          {p.intel.validationNotes[0]}
                        </div>
                      )}
                    </td>

                    <td className="p-4">
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-700">
                        <CheckCircle size={14} /> {p.intel.confidenceScore}%
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleResolveSingle(p)}
                          disabled={isResolving}
                          className="px-3 py-1.5 bg-gray-100 hover:bg-[#2D5A27] hover:text-white text-gray-700 rounded-md font-bold text-xs flex items-center gap-1.5 transition-colors"
                          title="Auto-resolve high-accuracy image"
                        >
                          <RefreshCw size={12} className={isResolving ? 'animate-spin' : ''} />
                          {isResolving ? 'Resolving...' : 'Auto-Resolve'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
