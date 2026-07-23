'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const setSession = useAuthStore((state) => state.setSession);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
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
      setError(authError);
      setLoading(false);
    } else if (user) {
      // Auto sign-in sets the session in the mock backend
      const sessionData = await authService.getSession();
      if (sessionData) {
        setSession(sessionData);
      }
      setLoading(false);
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
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join us to track orders and save your wellness rituals.</p>
      </div>

      {error && <div className="auth-alert">{error}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-field">
          <label className="auth-label" htmlFor="fullName">Full Name</label>
          <input 
            type="text" 
            id="fullName" 
            className="auth-input" 
            placeholder="e.g. Divya Sharma" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required 
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <div className="auth-field">
            <label className="auth-label" htmlFor="email">Email</label>
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
            <label className="auth-label" htmlFor="mobile">Mobile Number</label>
            <input 
              type="tel" 
              id="mobile" 
              className="auth-input" 
              placeholder="99999 99999" 
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required 
            />
          </div>
        </div>

        <div className="auth-field">
          <label className="auth-label" htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            className="auth-input" 
            placeholder="Minimum 8 characters" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            minLength={8}
          />
        </div>

        <button type="submit" className="auth-btn" disabled={loading} style={{ marginTop: '0.5rem' }}>
          {loading ? <div className="btn-spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> : 'Create Account'}
        </button>
      </form>

      <div className="auth-footer">
        Already have an account? <Link href={`/login?redirect=${encodeURIComponent(redirect)}`} className="auth-link">Sign In</Link>
      </div>
    </>
  );
}

export default function RegisterPage() {
  return (
    <div className="auth-page">
      <div className="auth-container" style={{ maxWidth: '480px' }}>
        <Suspense fallback={<div className="btn-spinner" style={{ width: 24, height: 24, margin: '2rem auto' }} />}>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
}
