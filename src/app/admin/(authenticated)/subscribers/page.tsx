import { createClient } from '@/lib/supabase/server';
import { Mail, CheckCircle2, XCircle, Calendar } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0; // Always fetch fresh data

export default async function AdminSubscribersPage() {
  const supabase = await createClient();

  const { data: subscribers, error } = await supabase
    .from('subscribers')
    .select('*')
    .order('subscribed_at', { ascending: false });

  if (error) {
    console.error('Error fetching subscribers:', error);
  }

  const totalSubscribers = subscribers?.length || 0;
  const emailsSent = subscribers?.filter(s => s.welcome_email_sent).length || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Newsletter Subscribers</h1>
          <p className="text-gray-500 mt-1">Manage leads from the welcome popup discount.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-blue-50 rounded-md">
              <Mail size={16} className="text-blue-600" />
            </div>
            <span className="text-xs font-medium text-gray-500 uppercase">Total Subscribers</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalSubscribers}</p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-green-50 rounded-md">
              <CheckCircle2 size={16} className="text-green-600" />
            </div>
            <span className="text-xs font-medium text-gray-500 uppercase">Welcome Emails Sent</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{emailsSent}</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs text-gray-500 font-medium uppercase border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Email Address</th>
                <th className="px-6 py-4">Subscribed On</th>
                <th className="px-6 py-4 text-center">Welcome Email Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subscribers && subscribers.length > 0 ? (
                subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {subscriber.email}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-gray-400" />
                        {new Date(subscriber.subscribed_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {subscriber.welcome_email_sent ? (
                        <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle2 size={12} /> Sent
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          <XCircle size={12} /> Pending / Error
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                    <Mail size={24} className="mx-auto text-gray-300 mb-3" />
                    <p>No subscribers yet. Once users sign up through the popup, they will appear here.</p>
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
