'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const cleanEmail = email.trim().toLowerCase();

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (authError || !data?.user) {
        throw new Error(authError?.message || 'Authentication failed');
      }

      // Auto-promote admin@ayurdhara.com if they don't have the admin role
      if (cleanEmail === 'admin@ayurdhara.com') {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (profile?.role !== 'super_admin') {
          await supabase
            .from('profiles')
            .update({ role: 'super_admin' })
            .eq('id', data.user.id);
        }
      } else {
        // Verify role before letting them proceed
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();
          
        const adminRoles = ['super_admin', 'store_manager', 'catalog_manager', 'content_manager', 'marketing_manager', 'order_manager', 'support'];
        if (!adminRoles.includes(profile?.role || '')) {
           await supabase.auth.signOut();
           throw new Error('Unauthorized: You do not have admin privileges.');
        }
      }

      router.push('/admin');
      router.refresh();
      
    } catch (err: any) {
      setError(err.message || 'Invalid credentials or unauthorized');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] font-sans">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-[#E0EBDC]">
        <div className="text-center mb-8">
          <img src="/images/logo.png" alt="Ayurdhara Divya Shakti" className="w-24 h-24 object-contain mx-auto mb-4" />
          <h1 className="text-2xl font-serif text-[#2D5A27] font-bold tracking-wide uppercase">Admin Login</h1>
          <p className="text-sm text-gray-500 mt-2 font-medium">Authorized Access Only</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-[#2D5A27] mb-2 uppercase tracking-wider">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E0EBDC] rounded-lg text-[#1A1A1A] focus:outline-none focus:border-[#4B7B3B] focus:ring-1 focus:ring-[#4B7B3B] transition-colors"
              placeholder="admin@ayurdhara.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#2D5A27] mb-2 uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E0EBDC] rounded-lg text-[#1A1A1A] focus:outline-none focus:border-[#4B7B3B] focus:ring-1 focus:ring-[#4B7B3B] transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 px-4 bg-[#2D5A27] hover:bg-[#1f401b] text-white rounded-lg font-bold uppercase tracking-wider transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
