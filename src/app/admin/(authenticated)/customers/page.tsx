'use client';

import { useState, useEffect } from 'react';
import { getAdminCustomers, type AdminCustomerSummary } from '@/actions/customerActions';
import { toggleGoldMembership } from '@/actions/adminActions';
import { Shield, ShieldOff, Sparkles, User, ShoppingBag, Store, Search } from 'lucide-react';
import Link from 'next/link';

export default function CustomersAdminPage() {
  const [customers, setCustomers] = useState<AdminCustomerSummary[]>([]);
  const [filtered, setFiltered] = useState<AdminCustomerSummary[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const data = await getAdminCustomers();
    setCustomers(data);
    setFiltered(data);
    setLoading(false);
  };

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(customers);
      return;
    }
    const q = search.toLowerCase();
    setFiltered(customers.filter(c => 
      c.name.toLowerCase().includes(q) || 
      (c.mobile && c.mobile.includes(q)) || 
      (c.email && c.email.toLowerCase().includes(q))
    ));
  }, [search, customers]);

  const handleToggleGold = async (id: string, currentStatus: boolean) => {
    if (id.startsWith('guest_')) {
      alert("Guest customers cannot be given Gold Membership. They must register an account first.");
      return;
    }
    const newStatus = !currentStatus;
    setCustomers(customers.map(c => c.id === id ? { ...c, isGoldMember: newStatus } : c));
    
    const { success } = await toggleGoldMembership(id, newStatus);
    if (!success) {
      setCustomers(customers.map(c => c.id === id ? { ...c, isGoldMember: currentStatus } : c));
      alert('Failed to update Gold Membership status');
    }
  };

  if (loading) return <div className="p-8">Loading customers...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Customers</h1>
          <p className="text-gray-500 mt-1">Unified view of online and offline store customers.</p>
        </div>
      </div>

      <div className="flex bg-white px-4 py-2 rounded-lg border border-gray-200 items-center gap-2 max-w-md">
        <Search size={18} className="text-gray-400" />
        <input 
          type="text" 
          placeholder="Search by name, mobile, or email..." 
          className="bg-transparent border-none focus:outline-none w-full text-sm"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase text-center">Online Orders</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase text-center">Cash Orders</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase">Last Purchase</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map(customer => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-gray-900">{customer.name}</div>
                      {customer.type === 'guest' ? (
                        <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[0.65rem] font-bold rounded uppercase">Guest</span>
                      ) : customer.isGoldMember && (
                        <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[0.65rem] font-bold rounded uppercase flex items-center gap-1">
                          <Sparkles size={10} /> Gold
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div>{customer.mobile || 'No Mobile'}</div>
                    <div className="text-xs">{customer.email || ''}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {customer.onlineOrderCount > 0 ? (
                      <span className="inline-flex items-center justify-center bg-blue-50 text-blue-700 font-bold h-6 w-6 rounded-full text-xs">
                        {customer.onlineOrderCount}
                      </span>
                    ) : '-'}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {customer.cashOrderCount > 0 ? (
                      <span className="inline-flex items-center justify-center bg-green-50 text-green-700 font-bold h-6 w-6 rounded-full text-xs">
                        {customer.cashOrderCount}
                      </span>
                    ) : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {customer.lastPurchaseDate ? new Date(customer.lastPurchaseDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Never'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link 
                        href={`/admin/customers/${customer.id}`}
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200"
                      >
                        <User size={14} /> Profile
                      </Link>
                      {customer.type === 'registered' && (
                        <button
                          onClick={() => handleToggleGold(customer.id, customer.isGoldMember)}
                          className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md transition-colors ${customer.isGoldMember ? 'text-red-700 bg-red-50 hover:bg-red-100 border border-red-200' : 'text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200'}`}
                        >
                          {customer.isGoldMember ? 'Revoke Gold' : 'Grant Gold'}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No customers found.
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

