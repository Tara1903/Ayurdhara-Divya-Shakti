'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import PartnerKYCUpload from '@/components/PartnerKYCUpload';

export default function DistributorDashboard() {
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
        .eq('partner_type', 'distributor')
        .single();
        
      if (!pData) {
        router.push('/partner/distributor-signup');
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

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Distributor Dashboard...</div>;

  const isPending = partner.status === 'pending_approval';

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      
      {isPending && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Your application is currently <b>Pending Admin Review</b>. Territory allocation will be confirmed via email.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-charcoal" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {partner.business_name || 'Distributor Dashboard'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">ID: <span className="font-mono font-medium text-olive">{partner.partner_id}</span> | Area: {partner.kyc_details?.prefArea || 'Pending'}</p>
        </div>
        <div className="flex gap-3">
          <Link href="/products?bulk=true" className="bg-charcoal text-white px-4 py-2 rounded text-sm font-medium hover:bg-opacity-90">
            Place Bulk Order
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Wallet Overview */}
        <div className="col-span-1 lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center">
          <h3 className="text-sm text-gray-500 font-medium mb-1">Available Funds</h3>
          <div className="text-3xl font-semibold text-charcoal mb-4">₹{wallet?.approved_balance?.toLocaleString('en-IN') || '0.00'}</div>
          
          <div className="space-y-2 mt-auto">
             <button className="w-full bg-olive text-white py-2 rounded text-sm font-medium hover:bg-opacity-90">
              Withdraw
            </button>
          </div>
        </div>
        
        {/* Network Stats */}
        <div className="col-span-1 lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
            <h3 className="text-sm text-gray-500 font-medium mb-2">Assigned Retailers</h3>
            <div className="text-3xl font-semibold text-charcoal">0</div>
            <Link href="/partner/dashboard/distributor/network" className="text-xs text-olive mt-auto pt-4 underline">Manage Network →</Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
            <h3 className="text-sm text-gray-500 font-medium mb-2">Network Sales (This Month)</h3>
            <div className="text-3xl font-semibold text-charcoal">₹0.00</div>
            <p className="text-xs text-gray-400 mt-auto pt-4">Your override: 0%</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
            <h3 className="text-sm text-gray-500 font-medium mb-2">Inventory Health</h3>
            <div className="text-xl font-medium text-gray-800">No Data</div>
            <p className="text-xs text-gray-400 mt-auto pt-4">Upload stock report to track.</p>
          </div>
        </div>

      </div>

      <PartnerKYCUpload partnerId={partner.id} currentKyc={partner.kyc_details} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h3 className="font-semibold text-charcoal">Recent Bulk Orders</h3>
            <Link href="/account/orders" className="text-sm text-olive hover:underline">View All</Link>
          </div>
          <div className="p-6 text-center text-gray-500 text-sm">
            <p className="mb-2">No bulk orders found.</p>
            {partner.opening_purchase_completed ? (
              <Link href="/products?bulk=true" className="text-olive underline">Place a bulk order</Link>
            ) : (
               <Link href={`/partner/checkout/opening-purchase?type=distributor&partner_id=${partner.partner_id}`} className="text-olive underline">Complete your Opening Purchase</Link>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-semibold text-charcoal">Retailer Network Requests</h3>
          </div>
          <div className="p-6 text-center text-gray-500 text-sm">
            <p>No new requests to join your network.</p>
          </div>
        </div>

      </div>

    </div>
  );
}
