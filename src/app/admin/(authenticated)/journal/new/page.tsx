"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

export default function NewJournalPost() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    status: "draft"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Auto-generate slug from title if slug is empty or currently matches the slugified title
    if (name === "title") {
      const slugified = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setFormData(prev => ({
        ...prev,
        title: value,
        slug: prev.slug === "" || prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') === prev.slug ? slugified : prev.slug
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          author_id: user?.id,
          cover_image: "/images/placeholder.jpg" // Placeholder until image upload is added
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save post");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/journal"); // For demo, redirecting to public journal. Ideally redirect to /admin/journal.
      }, 1500);
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="p-2 text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Create Journal Post</h1>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 bg-[#4B7B3B] hover:bg-[#3A602D] text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <Save size={18} />
          )}
          {loading ? "Saving..." : "Save Post"}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
          Post saved successfully! Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Editor Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Post Title"
              required
              className="w-full text-3xl font-bold text-gray-900 placeholder:text-gray-300 border-none focus:ring-0 p-0 mb-4 bg-transparent outline-none"
            />
            
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your content here... (Supports Markdown)"
              required
              className="w-full h-[500px] text-gray-700 placeholder:text-gray-400 border-none focus:ring-0 p-0 resize-none bg-transparent outline-none"
            ></textarea>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-3">Publish Settings</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-[#4B7B3B] focus:border-[#4B7B3B] outline-none"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600 focus:ring-1 focus:ring-[#4B7B3B] focus:border-[#4B7B3B] outline-none"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-3">SEO & Metadata</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                placeholder="A brief summary for previews..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-[#4B7B3B] focus:border-[#4B7B3B] outline-none resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer">
                <ImageIcon className="text-gray-400 mb-2" size={24} />
                <span className="text-sm font-medium text-gray-600">Click to upload</span>
                <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
