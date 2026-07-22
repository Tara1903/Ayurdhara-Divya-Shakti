'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, ShieldAlert } from 'lucide-react';

export function AdminUsersClient({ admins }: { admins: any[] }) {
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();

  const handleDemote = async (id: string) => {
    if (!confirm('Demote this user to a regular customer? They will lose all admin access.')) return;
    setLoading(id);
    await fetch(`/api/admin/admin-users/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ role: 'customer' }) });
    setLoading(null);
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif text-gray-900">Admin Users</h1>
        <p className="text-gray-500 mt-1">Manage users with administrative access to the store.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-700">User</th>
              <th className="px-6 py-4 font-medium text-gray-700">Role</th>
              <th className="px-6 py-4 font-medium text-gray-700">Joined Date</th>
              <th className="px-6 py-4 font-medium text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {admins.map(a => (
              <tr key={a.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-medium">
                      {(a.full_name || 'A').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{a.full_name || 'Unnamed Admin'}</p>
                      <p className="text-xs text-gray-500">{a.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 w-max ${a.role === 'super_admin' ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {a.role === 'super_admin' ? <ShieldAlert size={12}/> : <Shield size={12}/>}
                    {a.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {new Date(a.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    disabled={loading === a.id || a.role === 'super_admin'} 
                    onClick={() => handleDemote(a.id)} 
                    className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Revoke Access
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500">Note: New admins must first create an account as a customer on the storefront. A Super Admin can then elevate their role using the database directly for security reasons.</p>
    </div>
  );
}
