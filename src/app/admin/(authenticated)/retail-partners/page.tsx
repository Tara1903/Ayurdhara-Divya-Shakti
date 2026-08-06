import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function AdminRetailPartners() {
  const supabase = await createClient();
  
  const { data: partners, error } = await supabase
    .from('retail_partners')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <div className="p-6 text-red-500">Failed to load retail partners.</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Retail Partners</h1>
          <p className="text-gray-500 mt-1">Manage RP accounts, approvals, and wallets</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Partner details</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Shop Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Sales / Wallet</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {partners && partners.length > 0 ? (
                partners.map((rp) => (
                  <tr key={rp.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{rp.name}</div>
                      <div className="text-sm text-gray-500">{rp.mobile}</div>
                      <div className="text-xs text-gray-400 mt-1 font-mono">
                        {rp.partner_id !== rp.partner_code ? rp.partner_id : 'PENDING-ID'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{rp.shop_name}</div>
                      <div className="text-xs text-gray-500">{rp.shop_location}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${rp.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 
                          rp.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                          rp.status === 'SUSPENDED' ? 'bg-red-100 text-red-800' : 
                          'bg-gray-100 text-gray-800'}`}
                      >
                        {rp.status.toLowerCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">₹{rp.total_sales || 0}</div>
                      <div className="text-xs font-medium text-green-600 mt-1">Wallet: ₹{rp.wallet_balance || 0}</div>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <Link href={`/admin/retail-partners/${rp.id}`} className="text-[#2C3E2D] hover:text-green-800 bg-[#2C3E2D]/5 px-3 py-1.5 rounded inline-flex items-center gap-1 transition-colors">
                        View / Manage
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No retail partners found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
