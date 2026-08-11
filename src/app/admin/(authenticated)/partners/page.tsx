'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from('partner_accounts')
      .select('*, partner_wallets(*)')
      .order('created_at', { ascending: false });
      
    if (data) setPartners(data);
    setLoading(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const supabase = createClient();
    await supabase.from('partner_accounts').update({ status: newStatus }).eq('id', id);
    fetchPartners();
  };

  if (loading) return <div className="p-8">Loading Partners...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Partner Management</h1>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner ID / Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wallets (Ap. / Pe.)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {partners.map(p => (
              <tr key={p.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{p.partner_id}</div>
                  <div className="text-sm text-gray-500">{p.business_name || p.kyc_details?.name || 'N/A'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${p.partner_type === 'wellness' ? 'bg-green-100 text-green-800' : 
                      p.partner_type === 'retailer' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                    {p.partner_type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${p.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {p.status}
                  </span>
                  {!p.opening_purchase_completed && p.partner_type !== 'wellness' && (
                     <div className="text-xs text-red-500 mt-1">Pending Opening Purchase</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {p.partner_wallets?.[0] ? `₹${p.partner_wallets[0].approved_balance} / ₹${p.partner_wallets[0].pending_balance}` : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-900">View KYC</button>
                  {p.status !== 'active' && (
                    <button onClick={() => updateStatus(p.id, 'active')} className="text-green-600 hover:text-green-900">Approve</button>
                  )}
                  {p.status === 'active' && (
                    <button onClick={() => updateStatus(p.id, 'suspended')} className="text-red-600 hover:text-red-900">Suspend</button>
                  )}
                </td>
              </tr>
            ))}
            {partners.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No partners found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
