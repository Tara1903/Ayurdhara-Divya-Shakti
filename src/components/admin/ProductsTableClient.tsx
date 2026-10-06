'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, Filter, Edit, Trash2, Image as ImageIcon, Plus, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

export interface AdminProductItem {
  id: string;
  name: string;
  slug: string;
  is_active: boolean;
  primary_image_url: string | null;
  categoryNames?: string[];
  categoryName?: string;
  category_id?: string | null;
}

interface ProductsTableClientProps {
  initialProducts: AdminProductItem[];
  categories?: { id: string; name: string }[];
}

export default function ProductsTableClient({ initialProducts, categories = [] }: ProductsTableClientProps) {
  const [products, setProducts] = useState<AdminProductItem[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Filter products in real-time
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products.filter((p) => {
      // 1. Search filter (name, slug, category)
      const matchesSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.slug.toLowerCase().includes(query) ||
        (p.categoryName && p.categoryName.toLowerCase().includes(query)) ||
        (p.categoryNames && p.categoryNames.some((c) => c.toLowerCase().includes(query)));

      if (!matchesSearch) return false;

      // 2. Status filter
      if (selectedStatus === 'active' && !p.is_active) return false;
      if (selectedStatus === 'draft' && p.is_active) return false;

      // 3. Category filter
      if (selectedCategory !== 'all') {
        const catMatch =
          p.category_id === selectedCategory ||
          (p.categoryName && p.categoryName.toLowerCase() === selectedCategory.toLowerCase()) ||
          (p.categoryNames && p.categoryNames.some((c) => c.toLowerCase() === selectedCategory.toLowerCase()));
        if (!catMatch) return false;
      }

      return true;
    });
  }, [products, searchQuery, selectedCategory, selectedStatus]);

  // Handle delete product
  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    const toastId = toast.loading(`Deleting ${name}...`);

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to delete product');
      }

      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success(`Deleted "${name}"`, { id: toastId });
    } catch (err: any) {
      toast.error(err.message || 'Error deleting product', { id: toastId });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter Controls Toolbar - Mobile Optimized */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 shadow-sm flex flex-col gap-3">
        {/* Search input (full width on cell/mobile, flexible on desktop) */}
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by product name, slug, or category..."
            className="w-full pl-10 pr-10 py-2.5 bg-gray-50/70 hover:bg-gray-50 focus:bg-white border border-gray-300 focus:border-emerald-500 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
              title="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Filter controls row */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1 border-t border-gray-100">
          <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[240px]">
            {/* Category Dropdown Filter */}
            <div className="flex items-center gap-1.5 flex-1 sm:flex-initial">
              <span className="text-xs font-medium text-gray-500 hidden sm:inline">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-auto px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              >
                <option value="all">All Categories ({categories.length})</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Dropdown Filter */}
            <div className="flex items-center gap-1.5 flex-1 sm:flex-initial">
              <span className="text-xs font-medium text-gray-500 hidden sm:inline">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full sm:w-auto px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active Only</option>
                <option value="draft">Draft Only</option>
              </select>
            </div>

            {/* Reset Filters button if active */}
            {(searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedStatus('all');
                }}
                className="text-xs text-emerald-700 hover:text-emerald-800 underline font-medium px-1 py-1"
              >
                Reset filters
              </button>
            )}
          </div>

          {/* Product count stats */}
          <div className="text-xs font-semibold text-gray-500">
            Showing <span className="text-gray-900 font-bold">{filteredProducts.length}</span> of {products.length} products
          </div>
        </div>
      </div>

      {/* Products Content Container */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="px-4 py-16 text-center space-y-3">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
              <Search size={22} />
            </div>
            <h3 className="text-base font-semibold text-gray-900">No products match your search</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              {searchQuery
                ? `No products found matching "${searchQuery}". Try searching with another term or reset your filters.`
                : 'No products in this category or status.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedStatus('all');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            {/* 1. Mobile Cards View (Optimized for cell phones and small screens) */}
            <div className="block md:hidden divide-y divide-gray-100">
              {filteredProducts.map((product) => {
                const primaryCat =
                  (product.categoryNames && product.categoryNames[0]) ||
                  product.categoryName ||
                  'Uncategorized';

                return (
                  <div key={product.id} className="p-3.5 flex flex-col gap-3 hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-start gap-3">
                      {/* Thumbnail */}
                      <div className="w-14 h-14 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden relative flex-shrink-0 flex items-center justify-center">
                        {product.primary_image_url ? (
                          <img
                            src={product.primary_image_url}
                            alt={product.name}
                            className="object-cover w-full h-full"
                            loading="lazy"
                          />
                        ) : (
                          <ImageIcon size={22} className="text-gray-400" />
                        )}
                      </div>

                      {/* Product details */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="font-semibold text-sm text-gray-900 hover:text-emerald-700 line-clamp-1"
                        >
                          {product.name}
                        </Link>
                        <p className="text-xs text-gray-400 truncate mt-0.5">{product.slug}</p>
                        
                        <div className="flex flex-wrap items-center gap-1.5 mt-2">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 truncate max-w-[140px]">
                            {primaryCat}
                          </span>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              product.is_active
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {product.is_active ? 'Active' : 'Draft'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Touch-Friendly Action Buttons for Mobile Screen */}
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-50">
                      <Link
                        href={`/products/${product.slug}`}
                        target="_blank"
                        className="px-2.5 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center gap-1"
                        title="View on store"
                      >
                        <ExternalLink size={13} />
                        <span>View</span>
                      </Link>
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-md flex items-center gap-1.5"
                      >
                        <Edit size={13} />
                        <span>Edit</span>
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        disabled={deletingId === product.id}
                        className="px-2.5 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-md flex items-center gap-1 disabled:opacity-50"
                      >
                        <Trash2 size={13} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 2. Desktop Table View (Hidden on mobile, visible on md and up) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/70 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-3.5">Product</th>
                    <th className="px-6 py-3.5">Category</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredProducts.map((product) => {
                    const primaryCat =
                      (product.categoryNames && product.categoryNames[0]) ||
                      product.categoryName ||
                      'Uncategorized';

                    return (
                      <tr key={product.id} className="hover:bg-gray-50/70 transition-colors group">
                        {/* Product Image & Info */}
                        <td className="px-6 py-3.5">
                          <div className="flex items-center gap-3.5">
                            <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden relative flex-shrink-0 flex items-center justify-center">
                              {product.primary_image_url ? (
                                <img
                                  src={product.primary_image_url}
                                  alt={product.name}
                                  className="object-cover w-full h-full"
                                  loading="lazy"
                                />
                              ) : (
                                <ImageIcon size={20} className="text-gray-400" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <Link
                                href={`/admin/products/${product.id}`}
                                className="font-semibold text-sm text-gray-900 hover:text-emerald-700 transition-colors block truncate max-w-sm"
                              >
                                {product.name}
                              </Link>
                              <p className="text-xs text-gray-400 truncate max-w-sm">{product.slug}</p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-6 py-3.5 text-sm text-gray-600">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 max-w-xs truncate">
                            {primaryCat}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-3.5">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              product.is_active
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {product.is_active ? 'Active' : 'Draft'}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                            <Link
                              href={`/products/${product.slug}`}
                              target="_blank"
                              className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                              title="View on store"
                            >
                              <ExternalLink size={15} />
                            </Link>
                            <Link
                              href={`/admin/products/${product.id}`}
                              className="p-1.5 text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-md transition-colors"
                              title="Edit product"
                            >
                              <Edit size={16} />
                            </Link>
                            <button
                              onClick={() => handleDelete(product.id, product.name)}
                              disabled={deletingId === product.id}
                              className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                              title="Delete product"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
