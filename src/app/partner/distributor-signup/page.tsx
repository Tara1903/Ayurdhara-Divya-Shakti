'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';
import toast from 'react-hot-toast';

export default function DistributorSignupPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  
  const [step, setStep] = useState(user ? 2 : 1);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  
  // Step 2: Personal
  const [name, setName] = useState((user as any)?.user_metadata?.full_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [pin, setPin] = useState('');

  // Step 3: Business Details
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('distributor');
  const [yearsInBusiness, setYearsInBusiness] = useState('');
  const [storageCapacity, setStorageCapacity] = useState('');
  const [prefArea, setPrefArea] = useState('');

  // Step 4: Verification
  const [pan, setPan] = useState('');
  const [gstin, setGstin] = useState('');
  
  // Step 5: Bank Details
  const [accHolder, setAccHolder] = useState('');
  const [bankName, setBankName] = useState('');
  const [accNumber, setAccNumber] = useState('');
  const [ifsc, setIfsc] = useState('');
  
  // Step 6: Terms
  const [termsAccepted, setTermsAccepted] = useState({
    agreement: false,
    pricing: false,
    brand: false,
    territory: false,
    purchase: false,
  });

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
      setName((session.user as any)?.user_metadata?.full_name || '');
      setStep(2);
      setError(null);
      toast.success('Email verified successfully!');
    }
  };

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStep(s => s + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!Object.values(termsAccepted).every(v => v)) {
      setError('You must accept all terms to proceed.');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('/api/partner/distributor/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mobile, name, email, address, city, state: stateName, pin,
          businessName, businessType, yearsInBusiness, storageCapacity, prefArea,
          pan, gstin,
          bank: { accHolder, bankName, accNumber, ifsc }
        })
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to register');
      
      router.push(`/partner/checkout/opening-purchase?type=distributor&partner_id=${data.data.partner_id}`);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', background: 'var(--ivory)' }}>
      <div className="auth-container" style={{ width: '100%', maxWidth: '650px', background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        
        <div className="auth-header text-center mb-8">
          <h1 className="text-2xl font-semibold text-charcoal mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Become a Distributor Partner
          </h1>
          <p className="text-sm text-gray-600">
            Build an approved distribution network. (Minimum opening purchase: ₹50,000)
          </p>
          
          <div className="flex justify-between items-center mt-6 px-4">
            {[1, 2, 3, 4, 5, 6].map(s => (
              <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= s ? 'bg-olive text-white' : 'bg-gray-200 text-gray-500'}`}>
                {s}
              </div>
            ))}
          </div>
        </div>

        {error && <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 rounded-md">{typeof error === 'string' ? (error === '{}' ? 'An error occurred. Please try again.' : error) : JSON.stringify(error)}</div>}

        <form onSubmit={step === 6 ? handleSubmit : nextStep} className="space-y-4">
          
          {step === 1 && (
            <div className="space-y-4">
              {!otpSent ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900" placeholder="you@example.com" />
                  </div>
                  <button type="button" onClick={handleSendOtp} disabled={loading} className="w-full bg-charcoal text-white py-2 rounded font-medium hover:bg-opacity-90 disabled:opacity-70 flex justify-center items-center">
                    {loading ? <div className="btn-spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> : 'Send OTP'}
                  </button>
                  <div className="text-center text-sm mt-4">
                    Already have a website account? <Link href="/partner/login?redirect=/partner/distributor-signup" className="text-olive underline">Login here</Link> to join faster.
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
                    <input type="text" value={otp} onChange={e => setOtp(e.target.value)} required className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900" placeholder="Enter the 6-digit code sent to your email" />
                  </div>
                  <button type="button" onClick={handleVerifyOtp} disabled={loading} className="w-full bg-charcoal text-white py-2 rounded font-medium hover:bg-opacity-90 disabled:opacity-70 flex justify-center items-center">
                    {loading ? <div className="btn-spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> : 'Verify OTP'}
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900" readOnly={!!user && !!name} />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input type="tel" value={mobile || ((user as any)?.phone || '')} onChange={e => setMobile(e.target.value)} required className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900" readOnly={!!user || !!mobile} />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900" readOnly={!!user && !!email} />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Residential Address</label>
                <textarea value={address} onChange={e => setAddress(e.target.value)} required className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900" rows={2}></textarea>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input type="text" value={city} onChange={e => setCity(e.target.value)} required className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input type="text" value={stateName} onChange={e => setStateName(e.target.value)} required className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                <input type="text" value={pin} onChange={e => setPin(e.target.value)} required className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                <input type="text" value={businessName} onChange={e => setBusinessName(e.target.value)} required className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Years in Business</label>
                  <input type="number" value={yearsInBusiness} onChange={e => setYearsInBusiness(e.target.value)} required className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Storage Capacity (sq ft)</label>
                  <input type="text" value={storageCapacity} onChange={e => setStorageCapacity(e.target.value)} required className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Distribution Area</label>
                <input type="text" value={prefArea} onChange={e => setPrefArea(e.target.value)} required className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900" placeholder="e.g. South Delhi, Mumbai Suburbs" />
                <p className="text-xs text-gray-500 mt-1">Note: Distribution area is subject to company approval and availability.</p>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                <input type="text" value={pan} onChange={e => setPan(e.target.value)} required className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 uppercase" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GSTIN (Mandatory for Distributors)</label>
                <input type="text" value={gstin} onChange={e => setGstin(e.target.value)} required className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 uppercase" />
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder Name</label>
                <input type="text" value={accHolder} onChange={e => setAccHolder(e.target.value)} required className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                <input type="text" value={bankName} onChange={e => setBankName(e.target.value)} required className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                <input type="text" value={ifsc} onChange={e => setIfsc(e.target.value)} required className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 uppercase" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                <input type="text" value={accNumber} onChange={e => setAccNumber(e.target.value)} required className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900" />
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-charcoal border-b pb-2">Distributor Agreement Terms</h3>
              <div className="space-y-3">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" checked={termsAccepted.agreement} onChange={e => setTermsAccepted({...termsAccepted, agreement: e.target.checked})} className="mt-1" />
                  <span className="text-sm text-gray-700">I agree to the Distributor Agreement.</span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" checked={termsAccepted.pricing} onChange={e => setTermsAccepted({...termsAccepted, pricing: e.target.checked})} className="mt-1" />
                  <span className="text-sm text-gray-700">I agree to the Pricing Policy.</span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" checked={termsAccepted.brand} onChange={e => setTermsAccepted({...termsAccepted, brand: e.target.checked})} className="mt-1" />
                  <span className="text-sm text-gray-700">I agree to the Brand Protection and Product Claims Policy.</span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" checked={termsAccepted.territory} onChange={e => setTermsAccepted({...termsAccepted, territory: e.target.checked})} className="mt-1" />
                  <span className="text-sm text-gray-700">I understand that Area allocation is not exclusively guaranteed without Admin assignment.</span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" checked={termsAccepted.purchase} onChange={e => setTermsAccepted({...termsAccepted, purchase: e.target.checked})} className="mt-1" />
                  <span className="text-sm text-gray-700">I agree to the minimum opening purchase requirement of ₹50,000 to activate my distribution account.</span>
                </label>
              </div>
            </div>
          )}

          {step > 1 && (
            <div className="pt-4 flex gap-4">
              <button type="button" onClick={() => setStep(s => s - 1)} className="px-6 py-2 border border-gray-300 rounded text-gray-700 font-medium hover:bg-gray-50">
                Back
              </button>
              <button type="submit" className="flex-1 bg-charcoal text-white py-2 rounded font-medium hover:bg-opacity-90 flex justify-center items-center" disabled={loading}>
                {loading ? <div className="btn-spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> : (step === 6 ? 'Proceed to Opening Purchase' : 'Next Step')}
              </button>
            </div>
          )}
          
        </form>
      </div>
    </div>
  );
}
