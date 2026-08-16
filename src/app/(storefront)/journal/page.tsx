import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

// Using dynamic rendering to always fetch fresh journal posts
export const dynamic = "force-dynamic";

export default async function JournalPage() {
  const supabase = await createClient();
  
  // Fetch published journal posts
  const { data: posts, error } = await supabase
    .from("journal_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return (
    <div className="bg-[#f9f9f9] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <div className="w-16 h-16 bg-[#4B7B3B]/10 text-[#4B7B3B] rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-sans mb-4">Ayurdhara Journal</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover ancient Ayurvedic wisdom, wellness tips, and holistic living guides straight from our experts.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {error ? (
          <div className="text-center py-6 md:py-8 text-red-500">Failed to load journal posts. Please try again later.</div>
        ) : !posts || posts.length === 0 ? (
          <div className="text-center py-6 md:py-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Articles Yet</h3>
            <p className="text-gray-500">Check back soon for new insights on Ayurvedic wellness.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.id} href={`/journal/${post.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col h-full">
                <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
                  {post.cover_image ? (
                    <Image 
                      src={post.cover_image} 
                      alt={post.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#4B7B3B]/5 text-[#4B7B3B]">
                      <BookOpen size={40} className="opacity-20" />
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs font-bold text-[#E88B23] uppercase tracking-wider mb-2">Wellness</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#4B7B3B] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-1">
                    {post.excerpt || post.content.substring(0, 150) + "..."}
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                    <span className="text-xs text-gray-500 font-medium">
                      {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1 text-[#4B7B3B] font-semibold text-sm group-hover:gap-2 transition-all">
                      Read More <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
