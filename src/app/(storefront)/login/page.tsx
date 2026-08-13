'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const setSession = useAuthStore((state) => state.setSession);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { session, error: authError } = await authService.signIn(email, password);
    
    setLoading(false);
    
    if (authError) {
      let errorMessage = 'Invalid login credentials.';
      if (typeof authError === 'string') {
        errorMessage = authError === '{}' ? 'Invalid email or password.' : authError;
      } else if (authError && typeof authError === 'object') {
        errorMessage = (authError as any).message || JSON.stringify(authError);
      }
      setError(errorMessage);
    } else if (session) {
      setSession(session);
      toast.success('Login successful!');
      router.push(redirect);
    }
  };

  return (
    <>
      <div className="text-center mb-8">
        <Link href="/" className="inline-block mb-6 text-[#1A1A1A] hover:text-[#4B7B3B] transition-colors">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M12 22C12 22 4 15 4 8.5C4 4 7.5 2 12 2C16.5 2 20 4 20 8.5C20 15 12 22 12 22Z" strokeLinejoin="round" />
            <path d="M12 22V8" />
            <path d="M12 15C10 12 8 10.5 8 10.5" strokeLinecap="round" />
            <path d="M12 15C14 12 16 10.5 16 10.5" strokeLinecap="round" />
          </svg>
        </Link>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1A1A1A] mb-3">Welcome Back</h1>
        <p className="text-gray-600 text-sm md:text-base">Sign in to access your wellness account.</p>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm font-medium mb-6 border border-red-100">{typeof error === 'string' ? error : JSON.stringify(error)}</div>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">Email Address</label>
          <input 
            type="email" 
            id="email" 
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#4B7B3B] focus:ring-1 focus:ring-[#4B7B3B] transition-all" 
            placeholder="you@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#4B7B3B] focus:ring-1 focus:ring-[#4B7B3B] transition-all" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-800 transition-colors">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#4B7B3B] focus:ring-[#4B7B3B] accent-[#4B7B3B]" />
            Remember me
          </label>
          <Link href="/forgot-password" className="text-sm font-semibold text-[#E88B23] hover:text-[#D9381E] transition-colors">Forgot Password?</Link>
        </div>

        <button 
          type="submit" 
          className="w-full mt-6 bg-[#1A1A1A] hover:bg-[#333] text-white py-3.5 px-6 rounded-lg font-bold text-sm tracking-wide transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed" 
          disabled={loading}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : 'Sign In'}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-600">
        Don&apos;t have an account? <Link href={`/register?redirect=${encodeURIComponent(redirect)}`} className="font-bold text-[#4B7B3B] hover:text-[#2D5A27] transition-colors">Create Account</Link>
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 sm:p-10 border border-gray-100">
        <Suspense fallback={<div className="flex justify-center p-12"><svg className="animate-spin h-8 w-8 text-[#4B7B3B]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
