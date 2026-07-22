'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, X, Star, User, Trash2 } from 'lucide-react';

export function ReviewsClient({ reviews }: { reviews: any[] }) {
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();

  const handleUpdate = async (id: string, is_approved: boolean) => {
    setLoading(id);
    await fetch(`/api/admin/reviews/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ is_approved }) });
    setLoading(null);
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently delete this review?')) return;
    setLoading(id);
    await fetch(`/api/admin/reviews/${id}`, { method: 'DELETE' });
    setLoading(null);
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif text-gray-900">Product Reviews</h1>
        <p className="text-gray-500 mt-1">Approve, moderate, or remove customer reviews before they appear on the storefront.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-700">Review</th>
              <th className="px-6 py-4 font-medium text-gray-700">Product</th>
              <th className="px-6 py-4 font-medium text-gray-700">Customer</th>
              <th className="px-6 py-4 font-medium text-gray-700">Status</th>
              <th className="px-6 py-4 font-medium text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {reviews.map(r => (
              <tr key={r.id} className={`hover:bg-gray-50 ${!r.is_approved ? 'bg-amber-50/50' : ''}`}>
                <td className="px-6 py-4">
                  <div className="flex text-amber-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill={i < r.rating ? 'currentColor' : 'none'} className={i < r.rating ? '' : 'text-gray-300'} />
                    ))}
                  </div>
                  {r.title && <p className="font-medium text-gray-900 text-xs mb-0.5">{r.title}</p>}
                  <p className="text-gray-600 line-clamp-2 max-w-xs">{r.comment}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium text-emerald-700">{r.products?.name || 'Unknown'}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{r.profiles?.full_name || 'Anonymous'}</p>
                      <p className="text-xs text-gray-500">{r.profiles?.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${r.is_approved ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {r.is_approved ? 'Approved' : 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    {!r.is_approved ? (
                      <button disabled={loading === r.id} onClick={() => handleUpdate(r.id, true)} className="p-1.5 text-green-600 hover:bg-green-50 rounded-md disabled:opacity-50" title="Approve">
                        <Check size={16} />
                      </button>
                    ) : (
                      <button disabled={loading === r.id} onClick={() => handleUpdate(r.id, false)} className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-md disabled:opacity-50" title="Unapprove">
                        <X size={16} />
                      </button>
                    )}
                    <button disabled={loading === r.id} onClick={() => handleDelete(r.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md disabled:opacity-50" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {reviews.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No product reviews yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
