"use client";

import { useState, useEffect } from "react";
import { Star, Upload, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";

export default function ProductReviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuthStore();

  // Form state
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews?productId=${productId}`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data.reviews || []);
      }
    } catch (e) {
      console.error("Failed to fetch reviews", e);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).slice(0, 3); // Max 3 images
      setFiles(selectedFiles);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setSubmitError("");

    try {
      // 1. Upload images first (using a new upload route we'll build)
      const media_urls: string[] = [];
      if (files.length > 0) {
        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));
        // Also send bucket info
        formData.append("bucket", "product-reviews");

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        
        if (!uploadRes.ok) throw new Error("Failed to upload images");
        const uploadData = await uploadRes.json();
        media_urls.push(...uploadData.urls);
      }

      // 2. Submit Review
      const reviewRes = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          user_id: user?.id || null,
          rating,
          title,
          content, 
          media_urls,
        }),
      });

      if (!reviewRes.ok) throw new Error("Failed to submit review");

      setSubmitSuccess(true);
      setShowForm(false);
      setRating(5);
      setTitle("");
      setContent("");
      setFiles([]);
    } catch (err: any) {
      setSubmitError(err.message || "An error occurred");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div id="reviews" className="py-12 border-t border-gray-100 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 font-sans">Customer Reviews</h2>
            <p className="text-gray-500 mt-2">Real feedback from real customers</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="mt-4 md:mt-0 px-6 py-3 bg-[#4B7B3B] text-white font-bold rounded-lg hover:bg-[#3A602D] transition-colors"
          >
            {showForm ? "Cancel" : "Write a Review"}
          </button>
        </div>

        {submitSuccess && (
          <div className="mb-8 p-4 bg-green-50 text-green-800 rounded-xl border border-green-200">
            Thank you! Your review has been submitted and is pending moderation.
          </div>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-12 bg-[#f9f9f9] p-6 md:p-8 rounded-2xl border border-gray-100">
            <h3 className="text-xl font-bold mb-6 text-gray-900">Write your review</h3>
            
            {submitError && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{submitError}</div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      size={28}
                      fill={star <= rating ? "#E88B23" : "none"}
                      color={star <= rating ? "#E88B23" : "#D1D5DB"}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Summarize your experience"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#4B7B3B] focus:ring-1 focus:ring-[#4B7B3B] outline-none bg-white text-gray-900"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">Review</label>
              <textarea
                required
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What did you like or dislike?"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#4B7B3B] focus:ring-1 focus:ring-[#4B7B3B] outline-none resize-none bg-white text-gray-900"
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-2">Add Photos (Max 3)</label>
              <div className="flex flex-wrap gap-4">
                {files.map((file, idx) => (
                  <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                    <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-red-500"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                
                {files.length < 3 && (
                  <label className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-[#4B7B3B] hover:bg-[#4B7B3B]/5 transition-colors">
                    <Upload size={24} className="text-gray-400 mb-1" />
                    <span className="text-[10px] text-gray-500 font-bold uppercase">Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full sm:w-auto px-8 py-3 bg-[#E88B23] hover:bg-[#D67A18] text-white font-bold rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {uploading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        )}

        {/* Reviews List */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-gray-500 font-medium">No reviews yet. Be the first to review this product!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#4B7B3B]/10 flex items-center justify-center text-[#4B7B3B] font-bold">
                      {(review.profiles?.full_name || "Guest").charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{review.profiles?.full_name || "Guest"}</h4>
                      <div className="flex text-[#E88B23]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} color="currentColor" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                <h5 className="font-bold text-gray-800 mb-2">{review.title}</h5>
                <p className="text-gray-600 leading-relaxed mb-4">{review.content}</p>

                {/* Display Media */}
                {review.media_urls && review.media_urls.length > 0 && (
                  <div className="flex gap-3 mt-4">
                    {review.media_urls.map((url: string, idx: number) => (
                      <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:opacity-90">
                        <Image src={url} alt={`Review photo ${idx + 1}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
