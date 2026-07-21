'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Shield, ShieldOff, Sparkles, Check } from 'lucide-react';
import { toggleGoldMembership } from '@/actions/adminActions';

export default function CustomersAdminPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) {
      setCustomers(data);
    }
    setLoading(false);
  };

  const handleToggleGold = async (id: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    // Optimistic update
    setCustomers(customers.map(c => c.id === id ? { ...c, is_gold_member: newStatus } : c));
    
    const { success } = await toggleGoldMembership(id, newStatus);
    if (!success) {
      // Revert on failure
      setCustomers(customers.map(c => c.id === id ? { ...c, is_gold_member: currentStatus } : c));
      alert('Failed to update Gold Membership status');
    }
  };

  if (loading) return <div className="p-8">Loading customers...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-serif text-gray-900">Customers</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-sm font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-500 uppercase">Gold Status</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.map(customer => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{customer.full_name || 'No Name'}</div>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {customer.email || 'N/A'}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                    {customer.role || 'customer'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {customer.is_gold_member ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full border border-amber-200">
                      <Sparkles size={12} /> Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleToggleGold(customer.id, customer.is_gold_member)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${customer.is_gold_member ? 'text-red-700 bg-red-50 hover:bg-red-100 border border-red-200' : 'text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200'}`}
                  >
                    {customer.is_gold_member ? (
                      <><ShieldOff size={16} /> Revoke Gold</>
                    ) : (
                      <><Shield size={16} /> Grant Gold</>
                    )}
                  </button>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

