'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';

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
      setError(authError);
    } else if (session) {
      setSession(session);
      router.push(redirect);
    }
  };

  return (
    <>
      <div className="auth-header">
        <Link href="/" style={{ display: 'inline-block', marginBottom: '1.5rem', color: 'var(--charcoal)' }}>
          <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M12 22C12 22 4 15 4 8.5C4 4 7.5 2 12 2C16.5 2 20 4 20 8.5C20 15 12 22 12 22Z" strokeLinejoin="round" />
            <path d="M12 22V8" />
            <path d="M12 15C10 12 8 10.5 8 10.5" strokeLinecap="round" />
            <path d="M12 15C14 12 16 10.5 16 10.5" strokeLinecap="round" />
          </svg>
        </Link>
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to access your wellness account.</p>
      </div>

      {error && <div className="auth-alert">{error}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-field">
          <label className="auth-label" htmlFor="email">Email Address</label>
          <input 
            type="email" 
            id="email" 
            className="auth-input" 
            placeholder="you@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>

        <div className="auth-field">
          <label className="auth-label" htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            className="auth-input" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>

        <div className="auth-actions">
          <label className="auth-checkbox-label">
            <input type="checkbox" style={{ accentColor: 'var(--olive)' }} />
            Remember me
          </label>
          <Link href="/forgot-password" className="auth-link">Forgot Password?</Link>
        </div>

        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? <div className="btn-spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> : 'Sign In'}
        </button>
      </form>

      <div className="auth-footer">
        Don&apos;t have an account? <Link href={`/register?redirect=${encodeURIComponent(redirect)}`} className="auth-link">Create Account</Link>
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <Suspense fallback={<div className="btn-spinner" style={{ width: 24, height: 24, margin: '2rem auto' }} />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
