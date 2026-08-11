'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { createClient } from '@/lib/supabase/client';

export default function WellnessDashboard() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const [partner, setPartner] = useState<any>(null);
  const [wallet, setWallet] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/partner/login');
      return;
    }

    const fetchDashboard = async () => {
      const supabase = createClient();
      
      const { data: pData } = await supabase
        .from('partner_accounts')
        .select('*')
        .eq('user_id', user.id)
        .eq('partner_type', 'wellness')
        .single();
        
      if (!pData) {
        router.push('/partner/wellness-signup');
        return;
      }
      
      setPartner(pData);
      
      const { data: wData } = await supabase
        .from('partner_wallets')
        .select('*')
        .eq('partner_account_id', pData.id)
        .single();
        
      setWallet(wData);
      setLoading(false);
    };

    fetchDashboard();
  }, [user, router]);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Dashboard...</div>;

  const referralUrl = `https://ayurdhara.com/?ref=${partner.partner_id}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(referralUrl)}&color=2E3A2F`;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-charcoal" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Wellness Partner Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">Partner ID: <span className="font-mono font-medium text-olive">{partner.partner_id}</span></p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-200">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          {partner.status.toUpperCase()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Wallet Overview */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center">
            <h3 className="text-sm text-gray-500 font-medium mb-1">Withdrawable Balance</h3>
            <div className="text-4xl font-semibold text-charcoal">₹{wallet?.approved_balance?.toLocaleString('en-IN') || '0.00'}</div>
            <button className="mt-4 w-full bg-olive text-white py-2 rounded text-sm font-medium hover:bg-opacity-90">
              Request Payout
            </button>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center">
            <h3 className="text-sm text-gray-500 font-medium mb-1">Pending Earnings</h3>
            <div className="text-3xl font-semibold text-gray-400 mb-2">₹{wallet?.pending_balance?.toLocaleString('en-IN') || '0.00'}</div>
            <p className="text-xs text-gray-400">Earnings unlock after the 7-day return period of eligible orders.</p>
          </div>
        </div>

        {/* Share Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
          <h3 className="font-semibold text-charcoal mb-4">Your Referral QR</h3>
          <img src={qrCodeUrl} alt="Referral QR Code" className="w-32 h-32 mb-4 rounded border border-gray-100 p-1" />
          
          <div className="w-full bg-gray-50 p-2 rounded border border-gray-200 text-xs font-mono text-gray-600 truncate mb-3 select-all">
            {referralUrl}
          </div>
          
          <div className="flex gap-2 w-full">
            <button className="flex-1 bg-green-600 text-white py-2 rounded text-sm font-medium hover:bg-green-700 flex justify-center items-center gap-1">
              WhatsApp
            </button>
            <button className="flex-1 bg-gray-800 text-white py-2 rounded text-sm font-medium hover:bg-gray-900 flex justify-center items-center gap-1">
              Copy Link
            </button>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-semibold text-charcoal">Earnings History</h3>
          </div>
          <div className="p-6 text-center text-gray-500 text-sm">
            <p className="mb-2">No transactions yet.</p>
            <p className="text-xs">Share your link to start earning on eligible product sales.</p>
          </div>
        </div>

        {/* Digital Kit */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-semibold text-charcoal">Digital Wellness Kit</h3>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              <li className="flex justify-between items-center pb-4 border-b border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded flex items-center justify-center">📄</div>
                  <div>
                    <div className="font-medium text-sm text-charcoal">Product Catalog PDF</div>
                    <div className="text-xs text-gray-500">12 MB</div>
                  </div>
                </div>
                <button className="text-olive text-sm font-medium">Download</button>
              </li>
              <li className="flex justify-between items-center pb-4 border-b border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-50 text-green-600 rounded flex items-center justify-center">🖼️</div>
                  <div>
                    <div className="font-medium text-sm text-charcoal">WhatsApp Social Posters</div>
                    <div className="text-xs text-gray-500">ZIP File</div>
                  </div>
                </div>
                <button className="text-olive text-sm font-medium">Download</button>
              </li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
}
