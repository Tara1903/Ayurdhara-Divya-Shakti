'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';
import { updateUserMobileInProfile } from '@/app/actions/authActions';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const prefillEmail = searchParams.get('email') || '';
  const prefillMobile = searchParams.get('mobile') || '';
  const prefillName = searchParams.get('name') || '';
  
  const setSession = useAuthStore((state) => state.setSession);

  const [fullName, setFullName] = useState(prefillName);
  const [email, setEmail] = useState(prefillEmail);
  const [mobile, setMobile] = useState(prefillMobile);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password.length < 10) {
      setError('Password must be at least 10 characters long.');
      setLoading(false);
      return;
    }

    const { user, error: authError } = await authService.signUp({
      fullName,
      email,
      mobile,
      password,
    });
    
    if (authError) {
      // Ensure we always extract a readable string message, even if authError is an object
      let errorMessage = 'An error occurred during registration. Please try again.';
      if (typeof authError === 'string') {
        errorMessage = authError === '{}' ? 'This email or mobile number may already be in use.' : authError;
      } else if (authError && typeof authError === 'object') {
        errorMessage = (authError as any).message || JSON.stringify(authError);
      }
      setError(errorMessage);
      setLoading(false);
    } else if (user) {
      // Safely update the profile mobile number bypassing RLS
      await updateUserMobileInProfile(user.id, mobile);
      
      const sessionData = await authService.getSession();
      if (sessionData) {
        setSession(sessionData);
        setLoading(false);
        router.push(redirect);
      } else {
        // Registration successful but email confirmation required
        setLoading(false);
        setError(null);
        setIsSuccess(true);
      }
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-10 px-4 flex flex-col items-center justify-center">
        <div className="mb-6 w-16 h-16 bg-[#FAF7F2] border border-[#E0EBDC] rounded-full flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2D5A27" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" />
            <rect x="3" y="5" width="18" height="14" rx="2" />
          </svg>
        </div>
        <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-3">Check your email</h2>
        <p className="text-gray-600 mb-8 max-w-sm mx-auto text-sm leading-relaxed">
          We just sent a verification link to <strong className="text-gray-900">{email}</strong>.
        </p>
        <Link 
          href={`/login?redirect=${encodeURIComponent(redirect)}`}
          className="inline-flex items-center justify-center bg-[#1A1A1A] hover:bg-[#333] text-white px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition-colors"
        >
          Go to login
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    );
  }

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
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1A1A1A] mb-3">Create Account</h1>
        <p className="text-gray-600 text-sm md:text-base">Join us to track orders and save your wellness rituals.</p>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm font-medium mb-6 border border-red-100">{typeof error === 'string' ? error : JSON.stringify(error)}</div>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="fullName">Full Name</label>
          <input 
            type="text" 
            id="fullName" 
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#4B7B3B] focus:ring-1 focus:ring-[#4B7B3B] transition-all" 
            placeholder="e.g. Divya Sharma" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">Email</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="mobile">Mobile Number</label>
            <input 
              type="tel" 
              id="mobile" 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#4B7B3B] focus:ring-1 focus:ring-[#4B7B3B] transition-all" 
              placeholder="99999 99999" 
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#4B7B3B] focus:ring-1 focus:ring-[#4B7B3B] transition-all" 
            placeholder="Minimum 10 characters" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            minLength={10}
          />
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
          ) : 'Create Account'}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-600">
        Already have an account? <Link href={`/login?redirect=${encodeURIComponent(redirect)}`} className="font-bold text-[#4B7B3B] hover:text-[#2D5A27] transition-colors">Sign In</Link>
      </div>
    </>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[500px] bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 sm:p-10 border border-gray-100">
        <Suspense fallback={<div className="flex justify-center p-12"><svg className="animate-spin h-8 w-8 text-[#4B7B3B]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div>}>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
}
