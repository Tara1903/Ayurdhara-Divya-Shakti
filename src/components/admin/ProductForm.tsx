import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Save, ArrowLeft, Plus, Trash2, UploadCloud, Sparkles, RefreshCw, CheckCircle, Info } from 'lucide-react';
import Link from 'next/link';
import { revalidateStorefront } from '@/app/actions/revalidate';
import toast from 'react-hot-toast';
import { analyzeProductForImages, ProductImageIntelligence } from '@/lib/image-system';

interface ProductFormProps {
  initialData?: any;
  categories?: any[];
}

export default function ProductForm({ initialData, categories = [] }: ProductFormProps) {
  const isEditing = !!initialData;
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    short_description: initialData?.short_description || '',
    category_id: initialData?.category_id || '',
    is_active: initialData?.is_active ?? true,
    image_mode: 'Auto',
    image_keyword: '',
  });

  const [imageIntelligence, setImageIntelligence] = useState<ProductImageIntelligence | null>(null);
  const [isAutoGenerating, setIsAutoGenerating] = useState(false);

  const [variants, setVariants] = useState<any[]>(
    initialData?.product_variants?.length > 0 
      ? initialData.product_variants 
      : [{ size: 'Standard', price: 0, original_price: 0 }]
  );

  const [images, setImages] = useState<any[]>(
    initialData?.product_images?.length > 0 
      ? initialData.product_images 
      : [{ url: '', display_order: 0 }]
  );

  // Automatically compute Image Intelligence & Keywords on name / category changes
  useEffect(() => {
    if (formData.name) {
      const selectedCategory = categories?.find(c => c.id === formData.category_id)?.name || '';
      const intel = analyzeProductForImages(formData.name, selectedCategory);
      setImageIntelligence(intel);
      if (!formData.image_keyword || formData.image_mode === 'Auto') {
        setFormData(prev => ({ ...prev, image_keyword: intel.generatedKeywords }));
      }
    }
  }, [formData.name, formData.category_id, categories]);

  const handleAutoGenerateImage = async () => {
    if (!formData.name) {
      toast.error('Please enter a product name first.');
      return;
    }
    setIsAutoGenerating(true);
    const toastId = toast.loading('Resolving best product image...');
    try {
      const selectedCategory = categories?.find(c => c.id === formData.category_id)?.name || '';
      const res = await fetch('/api/admin/auto-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          category: selectedCategory,
          customKeyword: formData.image_keyword
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to resolve image');
      
      setImages([{ url: data.imageUrl, display_order: 0 }]);
      toast.success('Automatic image resolved & attached!', { id: toastId });
    } catch (err: any) {
      toast.error(err.message || 'Error generating image', { id: toastId });
    } finally {
      setIsAutoGenerating(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const generateSlug = () => {
    if (!formData.name) return;
    const slug = formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData(prev => ({ ...prev, slug }));
  };

  const handleVariantChange = (index: number, field: string, value: string) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index].url = value;
    setImages(newImages);
  };

  const handleFileUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const toastId = toast.loading('Uploading image...');
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('bucket', 'products');
      uploadFormData.append('files', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Upload failed');
      
      handleImageChange(index, data.urls[0]);
      toast.success('Image uploaded successfully!', { id: toastId });
    } catch (error: any) {
      toast.error(error.message || 'Error uploading image', { id: toastId });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const productPayload = {
        name: formData.name,
        slug: formData.slug,
        short_description: formData.short_description,
        category_id: formData.category_id || null,
        is_active: formData.is_active,
        updated_at: new Date().toISOString()
      };

      let productId = initialData?.id;

      if (isEditing) {
        const { error: pErr } = await supabase
          .from('products')
          .update(productPayload)
          .eq('id', productId);
        if (pErr) throw pErr;
      } else {
        const { data, error: pErr } = await supabase
          .from('products')
          .insert([productPayload])
          .select('id')
          .single();
        if (pErr) throw pErr;
        productId = data.id;
      }

      // Handle Variants (Simple delete and recreate for now to avoid complex diffing)
      if (isEditing) {
        await supabase.from('product_variants').delete().eq('product_id', productId);
      }
      const validVariants = variants.filter(v => v.size && Number(v.price) > 0);
      if (validVariants.length > 0) {
        const variantsPayload = validVariants.map(v => ({
          product_id: productId,
          size: v.size,
          price: Number(v.price),
          original_price: Number(v.original_price) || Number(v.price),
          is_active: true
        }));
        await supabase.from('product_variants').insert(variantsPayload);
      }

      // Handle Images
      if (isEditing) {
        await supabase.from('product_images').delete().eq('product_id', productId);
      }
      const validImages = images.filter(i => i.url);
      if (validImages.length > 0) {
        const imagesPayload = validImages.map((i, idx) => ({
          product_id: productId,
          url: i.url,
          display_order: idx
        }));
        await supabase.from('product_images').insert(imagesPayload);
      }

      await revalidateStorefront();

      router.push('/admin/products');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-200 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-serif text-gray-900 tracking-wide">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h1>
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="flex items-center gap-2 bg-[#2D5A27] hover:bg-[#1a3816] text-white px-6 py-2 rounded-xl font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
        >
          <Save size={18} />
          <span>{loading ? 'Saving...' : 'Save Product'}</span>
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-md border border-red-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-[#2D5A27] border-b border-gray-100 pb-2 uppercase tracking-wide">Basic Information</h2>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Product Name</label>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                onBlur={!isEditing && !formData.slug ? generateSlug : undefined}
                className="w-full px-3 py-2 border bg-white text-gray-900 border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-[#4B7B3B] focus:border-[#4B7B3B] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Slug (URL)</label>
              <div className="flex gap-2">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm font-mono">
                  /products/
                </span>
                <input 
                  type="text" 
                  name="slug"
                  required
                  value={formData.slug}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border bg-white text-gray-900 border-gray-300 rounded-r-lg text-sm focus:ring-1 focus:ring-[#4B7B3B] focus:border-[#4B7B3B] outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Short Description</label>
              <textarea 
                name="short_description"
                rows={3}
                value={formData.short_description}
                onChange={handleChange}
                className="w-full px-3 py-2 border bg-white text-gray-900 border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-[#4B7B3B] focus:border-[#4B7B3B] outline-none"
              />
            </div>
          </div>

          {/* Variants */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <h2 className="text-lg font-bold text-[#2D5A27] uppercase tracking-wide">Variants & Pricing</h2>
              <button 
                type="button" 
                onClick={() => setVariants([...variants, { size: '', price: 0, original_price: 0 }])}
                className="text-sm font-bold text-[#E88B23] flex items-center gap-1 hover:underline"
              >
                <Plus size={16} /> Add Variant
              </button>
            </div>
            
            <div className="space-y-4">
              {variants.map((variant, index) => (
                <div key={index} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Size / Title</label>
                    <input 
                      type="text" 
                      value={variant.size}
                      placeholder="e.g. 10 ml"
                      onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                      className="w-full px-3 py-2 border bg-white text-gray-900 border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-[#4B7B3B] outline-none"
                      required
                    />
                  </div>
                  <div className="w-1/4">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Offer Price</label>
                    <input 
                      type="number" 
                      value={variant.price}
                      onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                      className="w-full px-3 py-2 border bg-white text-gray-900 border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-[#4B7B3B] outline-none"
                      required
                    />
                  </div>
                  <div className="w-1/4">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">MRP</label>
                    <input 
                      type="number" 
                      value={variant.original_price}
                      onChange={(e) => handleVariantChange(index, 'original_price', e.target.value)}
                      className="w-full px-3 py-2 border bg-white text-gray-900 border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-[#4B7B3B] outline-none"
                    />
                  </div>
                  {variants.length > 1 && (
                    <button type="button" onClick={() => setVariants(variants.filter((_, i) => i !== index))} className="mt-5 text-red-500 hover:text-red-700">
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Automatic Product Image System */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <div>
                <h2 className="text-lg font-bold text-[#2D5A27] uppercase tracking-wide flex items-center gap-2">
                  <Sparkles size={18} className="text-[#E88B23]" /> Product Image System
                </h2>
                <p className="text-xs text-gray-500">Automatic product photography and multi-tier asset resolver</p>
              </div>
              <button 
                type="button" 
                onClick={() => setImages([...images, { url: '', display_order: images.length }])}
                className="text-xs font-bold text-[#E88B23] flex items-center gap-1 hover:underline"
              >
                <Plus size={14} /> Add Additional Image
              </button>
            </div>

            {/* Image Mode & Keyword Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#fbfdfa] p-4 rounded-lg border border-[#e5efe3]">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Image Mode</label>
                <select
                  name="image_mode"
                  value={formData.image_mode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border bg-white text-gray-900 border-gray-300 rounded-md text-xs font-semibold focus:ring-1 focus:ring-[#4B7B3B] outline-none"
                >
                  <option value="Auto">✨ Auto (Recommended - Dynamic Resolver)</option>
                  <option value="Upload">📁 Manual Upload</option>
                  <option value="AI Generate">🤖 AI Generate</option>
                  <option value="Library">🖼️ Select from Library</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Image Keywords (Editable)</label>
                <input
                  type="text"
                  name="image_keyword"
                  value={formData.image_keyword}
                  onChange={handleChange}
                  placeholder="e.g. ashwagandha root dried raw herbs bowl"
                  className="w-full px-3 py-2 border bg-white text-gray-900 border-gray-300 rounded-md text-xs focus:ring-1 focus:ring-[#4B7B3B] outline-none"
                />
              </div>
            </div>

            {/* Intelligence Insights Badge */}
            {imageIntelligence && (
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">Detected Form:</span>
                  <span className="px-2 py-0.5 rounded bg-[#2D5A27] text-white font-bold uppercase text-[10px]">
                    {imageIntelligence.productForm.replace('_', ' ')}
                  </span>
                  <span className="text-gray-400">|</span>
                  <span className="text-green-700 font-semibold flex items-center gap-1">
                    <CheckCircle size={12} /> {imageIntelligence.confidenceScore}% Confidence
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleAutoGenerateImage}
                  disabled={isAutoGenerating}
                  className="px-3 py-1.5 bg-[#2D5A27] hover:bg-[#23471f] text-white rounded font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <RefreshCw size={12} className={isAutoGenerating ? 'animate-spin' : ''} />
                  {isAutoGenerating ? 'Resolving Image...' : 'Auto-Resolve Image'}
                </button>
              </div>
            )}
            
            <div className="space-y-4 pt-2">
              {images.map((image, index) => (
                <div key={index} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="w-20 h-20 bg-white border border-gray-300 rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center relative shadow-sm">
                    {image.url ? (
                      <img src={image.url} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs text-gray-400">Empty</span>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Upload / Image URL</label>
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer bg-white border border-gray-300 hover:border-[#4B7B3B] text-gray-700 rounded-md px-3 py-1.5 text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm">
                        <UploadCloud size={14} />
                        <span>Choose File</span>
                        <input 
                          type="file" 
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(index, e)}
                        />
                      </label>
                      <input 
                        type="text" 
                        value={image.url}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        placeholder="Or enter image URL directly..."
                        className="flex-1 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-xs text-gray-800 outline-none focus:ring-1 focus:ring-[#4B7B3B]"
                      />
                    </div>
                  </div>
                  {images.length > 1 && (
                    <button type="button" onClick={() => setImages(images.filter((_, i) => i !== index))} className="mt-5 text-red-500 hover:text-red-700">
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="space-y-6">
          {/* Organization */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-[#2D5A27] border-b border-gray-100 pb-2 uppercase tracking-wide">Organization</h2>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Status</label>
              <select 
                name="is_active"
                value={formData.is_active ? "true" : "false"}
                onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.value === "true" }))}
                className="w-full px-3 py-2 border bg-white text-gray-900 border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-[#4B7B3B] outline-none bg-white"
              >
                <option value="true">Active (Published)</option>
                <option value="false">Draft (Hidden)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
              <select 
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border bg-white text-gray-900 border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-[#4B7B3B] outline-none bg-white"
              >
                <option value="">Select Category...</option>
                {categories?.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
