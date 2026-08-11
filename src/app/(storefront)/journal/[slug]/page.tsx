import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

// Dynamic rendering for immediate updates when posts are published
export const dynamic = "force-dynamic";

export default async function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("journal_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !post) {
    notFound();
  }

  // A basic markdown parser for demo purposes. 
  // In production, use a library like 'marked' or 'react-markdown'
  const parseMarkdown = (text: string) => {
    let html = text
      .replace(/^### (.*$)/gim, '<h3 className="text-2xl font-bold mt-8 mb-4">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 className="text-3xl font-bold mt-10 mb-5">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 className="text-4xl font-bold mt-12 mb-6">$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p className="mb-6 leading-relaxed">');
    
    return `<p className="mb-6 leading-relaxed">${html}</p>`;
  };

  const formattedDate = new Date(post.published_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Article Header */}
      <div className="max-w-3xl mx-auto px-4 pt-16 pb-8">
        <Link href="/journal" className="inline-flex items-center gap-2 text-[#4B7B3B] font-semibold hover:underline mb-8">
          <ArrowLeft size={16} /> Back to Journal
        </Link>
        
        <div className="flex items-center gap-2 text-xs font-bold text-[#E88B23] uppercase tracking-wider mb-4">
          <span>Wellness</span>
          <span className="w-1 h-1 bg-[#E88B23] rounded-full"></span>
          <span>Ayurveda</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-sans leading-tight mb-6">
          {post.title}
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between border-y border-gray-100 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 font-bold overflow-hidden">
              <Image src="/images/logo.png" alt="Ayurdhara" width={40} height={40} className="object-cover" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Ayurdhara Experts</p>
              <div className="flex items-center gap-1 text-gray-500 text-xs">
                <Calendar size={12} /> {formattedDate}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-gray-400">
            <span className="text-sm font-medium mr-2">Share</span>
            <button className="p-2 hover:bg-gray-50 rounded-full transition-colors hover:text-[#3b5998]"><Facebook size={18} /></button>
            <button className="p-2 hover:bg-gray-50 rounded-full transition-colors hover:text-[#1da1f2]"><Twitter size={18} /></button>
            <button className="p-2 hover:bg-gray-50 rounded-full transition-colors hover:text-[#0077b5]"><Linkedin size={18} /></button>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      {post.cover_image && (
        <div className="max-w-5xl mx-auto px-4 mb-12">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-gray-100">
            <Image 
              src={post.cover_image} 
              alt={post.title} 
              fill 
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4">
        <div 
          className="prose prose-lg prose-gray max-w-none prose-headings:font-sans prose-headings:font-bold prose-a:text-[#4B7B3B] prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
        />
        
        {/* End of article marker */}
        <div className="flex items-center justify-center my-12">
          <div className="w-2 h-2 bg-[#4B7B3B] rounded-full mx-1"></div>
          <div className="w-2 h-2 bg-[#4B7B3B] rounded-full mx-1 opacity-50"></div>
          <div className="w-2 h-2 bg-[#4B7B3B] rounded-full mx-1 opacity-25"></div>
        </div>
      </div>
    </div>
  );
}
