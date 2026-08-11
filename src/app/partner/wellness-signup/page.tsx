'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

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

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpSent(true);
    // In reality, trigger OTP API here
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === '1234') { // Dummy check for now
      setStep(2);
    } else {
      setError('Invalid OTP');
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
      
      router.push('/partner/dashboard/wellness');
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

        {error && <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 rounded-md">{error}</div>}

        {step === 1 && (
          <div className="space-y-4">
            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                  <input type="tel" value={mobile} onChange={e => setMobile(e.target.value)} required className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-olive focus:border-olive" placeholder="10-digit mobile" />
                </div>
                <button type="submit" className="w-full bg-charcoal text-white py-2 rounded font-medium hover:bg-opacity-90">Send OTP</button>
                <div className="text-center text-sm mt-4">
                  Already have a website account? <Link href="/partner/login?redirect=/partner/wellness-signup" className="text-olive underline">Login here</Link> to join faster.
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
                  <input type="text" value={otp} onChange={e => setOtp(e.target.value)} required className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-olive focus:border-olive" placeholder="Enter OTP (Use 1234 for demo)" />
                </div>
                <button type="submit" className="w-full bg-charcoal text-white py-2 rounded font-medium hover:bg-opacity-90">Verify OTP</button>
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

      </div>
    </div>
  );
}
