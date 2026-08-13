'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

function PartnerLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const setSession = useAuthStore((state) => state.setSession);

  const [identifier, setIdentifier] = useState(''); // email or mobile
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Default to email auth for now. If it's a mobile, it could be implemented later via OTP.
    const { session, error: authError } = await authService.signIn(identifier, password);
    
    if (authError) {
      let errorMessage = 'Invalid login credentials.';
      if (typeof authError === 'string') {
        errorMessage = authError === '{}' ? 'Invalid email or password.' : authError;
      } else if (authError && typeof authError === 'object') {
        errorMessage = (authError as any).message || JSON.stringify(authError);
      }
      setError(errorMessage);
      setLoading(false);
      return;
    } 

    if (session) {
      setSession(session);
      
      // Auto-detect partner type and check status
      const supabase = createClient();
      const { data: partnerAccount, error: fetchError } = await supabase
        .from('partner_accounts')
        .select('partner_type, status')
        .eq('user_id', session.user.id)
        .single();
        
      setLoading(false);
      
      if (fetchError || !partnerAccount) {
        // Not a partner? Redirect them to business opportunity page to sign up.
        router.push('/account/business-opportunity');
        return;
      }

      if (partnerAccount.status !== 'active') {
        setError('Your account is pending admin approval. Please wait until your account is approved.');
        // Optionally sign them out since they can't access the dashboard
        await authService.signOut();
        setSession(null);
        return;
      }

      const pType = partnerAccount.partner_type;
      const target = redirect || `/partner/dashboard/${pType}`;
      toast.success('Login successful!');
      router.push(target);
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
        <h1 className="auth-title">Partner Login</h1>
        <p className="auth-subtitle">Access your Wellness, Retail, or Distributor dashboard.</p>
      </div>

      {error && <div className="auth-alert">{typeof error === 'string' ? error : JSON.stringify(error)}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-field">
          <label className="auth-label" htmlFor="identifier">Email Address or Mobile</label>
          <input 
            type="text" 
            id="identifier" 
            className="auth-input" 
            placeholder="you@example.com" 
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
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

      <div className="auth-footer" style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div>Want to partner with us?</div>
        <Link href="/partner/wellness-signup" className="auth-link">Join as Wellness Partner</Link>
        <Link href="/partner/retailer-signup" className="auth-link">Join as Retail Partner</Link>
        <Link href="/partner/distributor-signup" className="auth-link">Become a Distributor</Link>
      </div>
    </>
  );
}

export default function PartnerLoginPage() {
  return (
    <div className="auth-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', background: 'var(--ivory)' }}>
      <div className="auth-container" style={{ width: '100%', maxWidth: '400px', background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <Suspense fallback={<div className="btn-spinner" style={{ width: 24, height: 24, margin: '2rem auto' }} />}>
          <PartnerLoginForm />
        </Suspense>
      </div>
    </div>
  );
}
