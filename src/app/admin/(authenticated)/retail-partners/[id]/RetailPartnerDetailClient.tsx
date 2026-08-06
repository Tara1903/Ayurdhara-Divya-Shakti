'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { approveRetailPartner, updatePartnerStatus, processPayout } from '@/actions/retailPartnerActions';
import Link from 'next/link';

export default function AdminRetailPartnerDetail({ params, rp }: { params: { id: string }, rp: any }) {
  const router = useRouter();
  const [isApproving, setIsApproving] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  // If rp is not passed from a server component wrapper, we can fetch it, 
  // but let's assume this is the client part and it receives rp as a prop.
  
  if (!rp) return <div>Loading...</div>;

  const handleApprove = async () => {
    setIsApproving(true);
    await approveRetailPartner(rp.id, rp.name);
    setIsApproving(false);
    router.refresh();
  };

  const handleStatusChange = async (newStatus: 'ACTIVE' | 'SUSPENDED') => {
    await updatePartnerStatus(rp.id, newStatus);
    router.refresh();
  };

  const handlePayout = async () => {
    if (!payoutAmount || isNaN(Number(payoutAmount))) return;
    setIsPaying(true);
    await processPayout(rp.id, Number(payoutAmount), 'Manual payout from admin');
    setPayoutAmount('');
    setIsPaying(false);
    router.refresh();
  };

  const qrUrl = typeof window !== 'undefined' ? `${window.location.origin}/rp/${rp.partner_code}` : `https://ayurdhara.com/rp/${rp.partner_code}`;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Link href="/admin/retail-partners" className="text-sm text-green-700 hover:underline mb-2 inline-block">
            &larr; Back to Retail Partners
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{rp.shop_name}</h1>
          <p className="text-gray-500 mt-1">Partner: {rp.name} • {rp.partner_id}</p>
        </div>
        
        <div className="flex gap-3">
          {rp.status === 'PENDING' && (
            <button 
              onClick={handleApprove}
              disabled={isApproving}
              className="bg-green-700 text-white px-4 py-2 rounded font-medium hover:bg-green-800 disabled:opacity-50"
            >
              {isApproving ? 'Approving...' : 'Approve Application'}
            </button>
          )}
          {rp.status === 'ACTIVE' && (
            <button 
              onClick={() => handleStatusChange('SUSPENDED')}
              className="bg-red-50 text-red-700 border border-red-200 px-4 py-2 rounded font-medium hover:bg-red-100"
            >
              Suspend Partner
            </button>
          )}
          {rp.status === 'SUSPENDED' && (
            <button 
              onClick={() => handleStatusChange('ACTIVE')}
              className="bg-green-50 text-green-700 border border-green-200 px-4 py-2 rounded font-medium hover:bg-green-100"
            >
              Reactivate Partner
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Wallet Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Wallet & Earnings</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800 mb-1">Available Balance</p>
              <p className="text-2xl font-bold text-green-700">₹{rp.wallet_balance}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Total Earned</p>
              <p className="text-xl font-semibold text-gray-900">₹{rp.total_earned}</p>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Process Payout</h4>
            <div className="flex gap-2">
              <input 
                type="number" 
                placeholder="Amount" 
                className="border border-gray-300 rounded px-3 py-2 w-full"
                value={payoutAmount}
                onChange={e => setPayoutAmount(e.target.value)}
              />
              <button 
                onClick={handlePayout}
                disabled={isPaying || !payoutAmount}
                className="bg-gray-900 text-white px-4 py-2 rounded whitespace-nowrap hover:bg-gray-800 disabled:opacity-50"
              >
                Pay
              </button>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Partner Details</h3>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-gray-500">Contact</dt>
              <dd className="font-medium text-gray-900">{rp.mobile} {rp.email && `• ${rp.email}`}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Location</dt>
              <dd className="font-medium text-gray-900">{rp.shop_location}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Business Type</dt>
              <dd className="font-medium text-gray-900">{rp.business_details || 'N/A'}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Status</dt>
              <dd className="font-medium text-gray-900 capitalize">{rp.status.toLowerCase()}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Fixed Commission</dt>
              <dd className="font-medium text-gray-900">{rp.fixed_commission_rate}% per order</dd>
            </div>
          </dl>
        </div>

        {/* QR Code Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 w-full text-left">Partner QR Code</h3>
          {rp.status === 'ACTIVE' ? (
            <>
              <div className="bg-white p-4 border-2 border-green-700 rounded-xl mb-4 shadow-sm inline-block">
                <QRCodeSVG value={qrUrl} size={150} level="M" />
              </div>
              <p className="text-sm font-bold text-gray-900">{rp.partner_code}</p>
              <p className="text-xs text-gray-500 mt-2 truncate w-full px-4">{qrUrl}</p>
              <a 
                href={`/api/admin/retail-partners/download-qr?code=${rp.partner_code}`} 
                className="mt-4 text-green-700 text-sm font-medium hover:underline"
                target="_blank"
              >
                Download Wellness Kit Assets
              </a>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 border-2 border-dashed border-gray-200 rounded-lg w-full">
              <p>QR Code will be generated once application is approved.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
