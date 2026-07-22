import { createClient } from '@/lib/supabase/server';

export const revalidate = 0;

export default async function AuditLogPage() {
  const supabase = await createClient();
  
  const { data: logs } = await supabase
    .from('audit_logs')
    .select(`
      id, action, resource_type, resource_id, old_data, new_data, created_at,
      profiles!actor_id(full_name)
    `)
    .order('created_at', { ascending: false })
    .limit(100);

  const actionColor: Record<string, string> = {
    'product.created': 'bg-green-100 text-green-800',
    'product.updated': 'bg-blue-100 text-blue-800',
    'product.published': 'bg-emerald-100 text-emerald-800',
    'product.archived': 'bg-gray-100 text-gray-800',
    'product.duplicated': 'bg-purple-100 text-purple-800',
    'order.status_updated': 'bg-cyan-100 text-cyan-800',
    'inventory.adjusted': 'bg-amber-100 text-amber-800',
    'gold_membership.granted': 'bg-yellow-100 text-yellow-800',
    'gold_membership.revoked': 'bg-red-100 text-red-800',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif text-gray-900">Audit Log</h1>
        <p className="text-gray-500 mt-1">Track all admin actions and changes. Read-only.</p>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Changes</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs?.map((log: any) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      actionColor[log.action] || 'bg-gray-100 text-gray-800'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="text-gray-500">{log.resource_type}</span>
                    {log.resource_id && <span className="font-mono text-xs text-gray-400 ml-2">...{log.resource_id.slice(-8)}</span>}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{log.profiles?.full_name || 'System'}</td>
                  <td className="px-6 py-4">
                    {log.new_data && (
                      <pre className="text-xs text-gray-500 max-w-xs truncate">{JSON.stringify(log.new_data)}</pre>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {new Date(log.created_at).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </td>
                </tr>
              ))}
              {(!logs || logs.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">No audit logs yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
