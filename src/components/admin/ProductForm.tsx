'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Save, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

interface ProductFormProps {
  initialData?: any; // To be properly typed later
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
    description: initialData?.description || '',
    category_id: initialData?.category_id || '',
    price: initialData?.price || '',
    is_active: initialData?.is_active ?? true,
    primary_image_url: initialData?.primary_image_url || '',
    gold_membership_eligible: initialData?.gold_membership_eligible ?? false,
    total_quantity_ml: initialData?.total_quantity_ml || '',
    duration_text: initialData?.duration_text || '',
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        category_id: formData.category_id || null,
        price: parseFloat(formData.price.toString()) || 0,
        is_active: formData.is_active,
        primary_image_url: formData.primary_image_url,
        gold_membership_eligible: formData.gold_membership_eligible,
        total_quantity_ml: formData.total_quantity_ml ? parseInt(formData.total_quantity_ml.toString()) : null,
        duration_text: formData.duration_text || null,
      };

      let result;
      if (isEditing) {
        result = await supabase
          .from('products')
          .update(payload)
          .eq('id', initialData.id)
          .select();
      } else {
        result = await supabase
          .from('products')
          .insert([payload])
          .select();
      }

      if (result.error) throw result.error;

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
          <div>
            <h1 className="text-2xl font-serif text-gray-900 tracking-wide">
              {isEditing ? 'Edit Product' : 'Add New Product'}
            </h1>
          </div>
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50"
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
            <h2 className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-2">Basic Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                onBlur={!isEditing && !formData.slug ? generateSlug : undefined}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
              <div className="flex gap-2">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  /products/
                </span>
                <input 
                  type="text" 
                  name="slug"
                  required
                  value={formData.slug}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* Pricing & Eligibility */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-2">Pricing & Eligibility</h2>
            
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                <input 
                  type="number" 
                  name="price"
                  step="0.01"
                  min="0"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center mt-4">
              <input
                id="gold_membership_eligible"
                type="checkbox"
                name="gold_membership_eligible"
                checked={formData.gold_membership_eligible}
                onChange={handleChange}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label htmlFor="gold_membership_eligible" className="ml-2 block text-sm text-gray-900 font-medium">
                Unlocks Gold Membership on Purchase (Courses only)
              </label>
            </div>
          </div>

          {/* Details */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-2">Specifications</h2>
            
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Quantity (ml)</label>
                <input 
                  type="number" 
                  name="total_quantity_ml"
                  min="0"
                  value={formData.total_quantity_ml}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration Text (e.g. 1 Month)</label>
                <input 
                  type="text" 
                  name="duration_text"
                  value={formData.duration_text}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Organization */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-2">Organization</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select 
                name="is_active"
                value={formData.is_active ? "true" : "false"}
                onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.value === "true" }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              >
                <option value="true">Active (Published)</option>
                <option value="false">Draft (Hidden)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select 
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              >
                <option value="">Select Category...</option>
                {categories?.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Media */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-2">Media</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <div className="mb-4">
                {formData.primary_image_url ? (
                  <img src={formData.primary_image_url} alt="Preview" className="w-full aspect-square object-cover rounded-md border border-gray-200" />
                ) : (
                  <div className="w-full aspect-square bg-gray-50 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-400">
                    <ImageIcon size={32} className="mb-2" />
                    <span className="text-sm">No Image</span>
                  </div>
                )}
              </div>
              <input 
                type="text" 
                name="primary_image_url"
                placeholder="https://..."
                value={formData.primary_image_url}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">Enter absolute URL to product image</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
