'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import PartnerKYCUpload from '@/components/PartnerKYCUpload';

export default function RetailerDashboard() {
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
        .eq('partner_type', 'retailer')
        .single();
        
      if (!pData) {
        router.push('/partner/retailer-signup');
        return;
      }
      
      // Safety check: if pending, boot them out
      if (pData.status !== 'active') {
        router.push('/partner/login');
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

  if (loading) return <div className="text-gray-500 flex items-center justify-center h-64">Loading Retail Dashboard...</div>;

  const referralUrl = `https://ayurdhara.com/?ref=${partner.partner_id}&src=shop`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(referralUrl)}&color=2E3A2F`;

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {partner.business_name || 'Retail Partner'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">Retailer ID: <span className="font-mono font-medium text-gray-900">{partner.partner_id}</span></p>
        </div>
        <div className="flex gap-3">
          <Link href="/products" className="bg-[#4B7B3B] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#3A5F2D] transition-colors shadow-sm">
            Place Wholesale Order
          </Link>
        </div>
      </div>

      <PartnerKYCUpload partnerId={partner.id} currentKyc={partner.kyc_details} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Wallet & Ordering Overview */}
        <div className="col-span-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col justify-center">
            <h3 className="text-sm text-gray-500 font-medium mb-2 uppercase tracking-wider">Total Sales Earned</h3>
            <div className="text-4xl font-bold text-gray-900">₹{wallet?.approved_balance?.toLocaleString('en-IN') || '0.00'}</div>
            <button className="mt-6 w-full bg-gray-900 text-white py-2.5 rounded-md text-sm font-medium hover:bg-black transition-colors shadow-sm">
              Withdraw to Bank
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col">
            <h3 className="text-sm text-gray-500 font-medium mb-4 uppercase tracking-wider">Quick Stats</h3>
            <div className="space-y-4 flex-grow">
              <div className="flex justify-between items-center py-1 border-b border-gray-100">
                <span className="text-sm text-gray-600">Pending Earnings</span>
                <span className="font-semibold text-gray-900">₹{wallet?.pending_balance?.toLocaleString('en-IN') || '0.00'}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-100">
                <span className="text-sm text-gray-600">Current Stock Value</span>
                <span className="font-semibold text-gray-900">₹0.00</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-100">
                <span className="text-sm text-gray-600">Customers Scan Linked</span>
                <span className="font-semibold text-gray-900">0</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-sm text-gray-600">Lifetime Orders</span>
                <span className="font-semibold text-gray-900">0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Counter QR Standee */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center">
          <h3 className="font-semibold text-gray-900 mb-4">Counter QR Standee</h3>
          <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg mb-4 bg-gray-50">
            <img src={qrCodeUrl} alt="Shop QR Code" className="w-32 h-32 rounded mix-blend-multiply" />
          </div>
          <p className="text-xs text-gray-500 mb-6 px-2">Customers scan to order directly. They get 2% off, and you earn full margin without stocking the physical product!</p>
          
          <a href="/api/retail-partners/download-qr" download className="w-full bg-gray-100 border border-gray-200 text-gray-700 py-2.5 rounded-md text-sm font-medium hover:bg-gray-200 hover:text-gray-900 transition-colors flex justify-center items-center gap-2">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Download PDF
          </a>
        </div>

      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-white flex justify-between items-center">
          <h3 className="font-semibold text-gray-900">Recent Wholesale Orders</h3>
          <Link href="/partner/dashboard/retailer/orders" className="text-sm font-medium text-[#4B7B3B] hover:text-[#3A5F2D]">View All Orders</Link>
        </div>
        <div className="p-12 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No wholesale orders</h3>
          <p className="mt-1 text-sm text-gray-500 mb-6">Get started by creating your first restock order.</p>
          {partner.opening_purchase_completed ? (
            <Link href="/products" className="inline-flex items-center rounded-md bg-[#4B7B3B] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#3A5F2D]">Place Restock Order</Link>
          ) : (
             <Link href={`/partner/checkout/opening-purchase?type=retailer&partner_id=${partner.partner_id}`} className="inline-flex items-center rounded-md bg-[#E88B23] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#D9381E]">Complete Opening Purchase</Link>
          )}
        </div>
      </div>

    </div>
  );
}
