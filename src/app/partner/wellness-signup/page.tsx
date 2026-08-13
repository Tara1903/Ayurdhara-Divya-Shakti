'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';
import toast from 'react-hot-toast';

export default function WellnessSignupPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  
  const [step, setStep] = useState(user ? 2 : 1);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  
  // Form fields
  const [isExisting, setIsExisting] = useState(!!user);
  const [name, setName] = useState((user as any)?.user_metadata?.full_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return setError("Please enter your email address");
    setLoading(true);
    const { error: otpError } = await authService.sendEmailOtp(email);
    setLoading(false);
    
    if (otpError) {
      setError(otpError);
    } else {
      setOtpSent(true);
      setError(null);
      toast.success('OTP sent to your email!');
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return setError("Please enter OTP");
    setLoading(true);
    const { session, error: verifyError } = await authService.verifyEmailOtp(email, otp);
    setLoading(false);
    
    if (verifyError) {
      setError(verifyError);
    } else if (session) {
      useAuthStore.getState().setSession(session);
      setIsExisting(true);
      setStep(2);
      setError(null);
      toast.success('Email verified successfully!');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      setError('You must accept the terms & conditions.');
      return;
    }
    setLoading(true);
    
    try {
      const response = await fetch('/api/partner/wellness/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, mobile, email, city, state: stateName, isExisting
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Failed to register');
      
      setStep(3);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', background: 'var(--ivory)' }}>
      <div className="auth-container" style={{ width: '100%', maxWidth: '500px', background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        
        <div className="auth-header text-center mb-8">
          <h1 className="text-2xl font-semibold text-charcoal mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Join as a Wellness Referral Partner
          </h1>
          <p className="text-sm text-gray-600">
            Recommend Ayurdhara Divya Shakti wellness products and earn on eligible sales. No compulsory purchase required.
          </p>
        </div>

        {error && <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 rounded-md">{typeof error === 'string' ? (error === '{}' ? 'An error occurred. Please try again.' : error) : JSON.stringify(error)}</div>}

        {step === 1 && (
          <div className="space-y-4">
            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-olive focus:border-olive" placeholder="you@example.com" />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-charcoal text-white py-2 rounded font-medium hover:bg-opacity-90 disabled:opacity-70 flex justify-center items-center">
                  {loading ? <div className="btn-spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> : 'Send OTP'}
                </button>
                <div className="text-center text-sm mt-4">
                  Already have a website account? <Link href="/partner/login?redirect=/partner/wellness-signup" className="text-olive underline">Login here</Link> to join faster.
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
                  <input type="text" value={otp} onChange={e => setOtp(e.target.value)} required className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-olive focus:border-olive" placeholder="Enter the 6-digit code sent to your email" />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-charcoal text-white py-2 rounded font-medium hover:bg-opacity-90 disabled:opacity-70 flex justify-center items-center">
                  {loading ? <div className="btn-spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> : 'Verify OTP'}
                </button>
              </form>
            )}
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {!user && (
              <div className="flex gap-4 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" checked={isExisting} onChange={() => setIsExisting(true)} name="customer_type" style={{ accentColor: 'var(--olive)' }} />
                  <span className="text-sm font-medium">Existing Customer</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" checked={!isExisting} onChange={() => setIsExisting(false)} name="customer_type" style={{ accentColor: 'var(--olive)' }} />
                  <span className="text-sm font-medium">New Customer</span>
                </label>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-olive focus:border-olive" readOnly={!!user && !!name} />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input type="tel" value={mobile || ((user as any)?.phone || '')} onChange={e => setMobile(e.target.value)} required className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-olive focus:border-olive" readOnly={!!user || !!mobile} />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-olive focus:border-olive" readOnly={!!user && !!email} />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input type="text" value={city} onChange={e => setCity(e.target.value)} required className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-olive focus:border-olive" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input type="text" value={stateName} onChange={e => setStateName(e.target.value)} required className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-olive focus:border-olive" />
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded border border-gray-200">
              <h3 className="text-sm font-semibold mb-2">Partner Terms</h3>
              <label className="flex items-start gap-2 cursor-pointer mb-2">
                <input type="checkbox" checked={termsAccepted} onChange={e => setTermsAccepted(e.target.checked)} className="mt-1" style={{ accentColor: 'var(--olive)' }} />
                <span className="text-sm text-gray-600">I agree to the Wellness Referral Partner Terms & Conditions, and understand that earnings depend on eligible product sales and are not guaranteed.</span>
              </label>
            </div>

            <button type="submit" className="w-full bg-olive text-white py-3 rounded font-semibold text-lg hover:bg-opacity-90 mt-4 flex justify-center items-center gap-2" disabled={loading}>
              {loading ? <div className="btn-spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> : 'Create Wellness Partner Account'}
            </button>
          </form>
        )}

        {step === 3 && (
          <div className="text-center space-y-6 py-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7"/></svg>
            </div>
            <h2 className="text-xl font-semibold text-charcoal">Application Submitted Successfully!</h2>
            <p className="text-gray-600">
              Your partner account has been successfully created and sent for admin verification. You will be notified once your account is approved and ready to use.
            </p>
            <div className="pt-4">
              <Link href="/" className="inline-block bg-olive text-white py-2 px-6 rounded font-medium hover:bg-opacity-90">
                Return to Home
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
