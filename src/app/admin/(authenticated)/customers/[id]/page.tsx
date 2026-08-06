'use client';

import { useState, useEffect, use } from 'react';
import { getAdminCustomerProfile, type CustomerProfileDetails } from '@/actions/customerActions';
import { ArrowLeft, User, Phone, Mail, ShoppingBag, Store, Award, Star, CreditCard, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function CustomerProfileAdminPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const [profile, setProfile] = useState<CustomerProfileDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await getAdminCustomerProfile(unwrappedParams.id);
      if (data) {
        setProfile(data);
      } else {
        alert(error || 'Failed to fetch customer profile');
      }
      setLoading(false);
    };
    fetchProfile();
  }, [unwrappedParams.id]);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Customer Profile...</div>;
  if (!profile) return <div className="p-8 text-center text-red-500">Customer not found</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <Link href="/admin/customers" className="text-gray-500 hover:text-gray-900">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-serif text-gray-900">{profile.name}</h1>
            {profile.type === 'guest' && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-bold rounded uppercase">Guest</span>
            )}
            {profile.isGoldMember && (
              <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded uppercase flex items-center gap-1">
                <Star size={12} /> Gold Member
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
            {profile.mobile && <span className="flex items-center gap-1"><Phone size={14} /> {profile.mobile}</span>}
            {profile.email && <span className="flex items-center gap-1"><Mail size={14} /> {profile.email}</span>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Summary & Rewards */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Award size={18} className="text-amber-500" /> Rewards & Stats
            </h2>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Total Spent</div>
                <div className="text-2xl font-serif font-bold text-gray-900">₹{profile.rewards.totalSpent.toLocaleString('en-IN')}</div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Online</div>
                  <div className="text-lg font-medium text-gray-900">{profile.onlineOrders.length}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Cash/Store</div>
                  <div className="text-lg font-medium text-gray-900">{profile.cashOrders.length}</div>
                </div>
              </div>
            </div>
          </div>

          {profile.partnerAttribution && (
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Partner Attribution</h2>
              <div>
                <div className="text-sm font-medium text-gray-900">{profile.partnerAttribution.code}</div>
                <div className="text-xs text-gray-500 uppercase mt-1">Source: {profile.partnerAttribution.type}</div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Orders & Products */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Purchased Products */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <ShoppingBag size={18} className="text-emerald-600" /> Purchased Products
            </h2>
            {profile.purchasedProducts.length === 0 ? (
              <p className="text-sm text-gray-500">No products purchased yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {profile.purchasedProducts.map((p, i) => (
                  <div key={i} className="flex gap-3 items-center p-3 border border-gray-100 rounded-lg bg-gray-50">
                    {p.imageUrl || p.image ? (
                      <div className="w-12 h-12 bg-white rounded flex-shrink-0 overflow-hidden">
                        <img src={p.imageUrl || p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0" />
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900 line-clamp-1">{p.name}</div>
                      <div className="text-xs text-gray-500">{p.variant}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cash Orders */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Store size={18} className="text-blue-600" /> Offline / Cash Orders
            </h2>
            {profile.cashOrders.length === 0 ? (
              <p className="text-sm text-gray-500">No offline cash orders.</p>
            ) : (
              <div className="space-y-3">
                {profile.cashOrders.map(order => (
                  <Link key={order.id} href={`/admin/cash-orders/${order.id}`} className="block">
                    <div className="flex justify-between items-center p-4 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 rounded-lg transition-colors">
                      <div>
                        <div className="font-medium text-gray-900 flex items-center gap-2">
                          {order.orderRef} 
                          <span className="text-[10px] uppercase font-bold bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">{order.order_status}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{new Date(order.sale_date).toLocaleDateString()} · Served by {order.staff_name}</div>
                      </div>
                      <div className="text-right flex items-center gap-4">
                        <div className="font-medium text-gray-900">₹{order.final_total.toLocaleString('en-IN')}</div>
                        <ChevronRight size={16} className="text-gray-400" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Online Orders */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <CreditCard size={18} className="text-purple-600" /> Online Orders
            </h2>
            {profile.onlineOrders.length === 0 ? (
              <p className="text-sm text-gray-500">No online orders.</p>
            ) : (
              <div className="space-y-3">
                {profile.onlineOrders.map(order => (
                  <Link key={order.id} href={`/admin/orders/${order.id}`} className="block">
                    <div className="flex justify-between items-center p-4 border border-gray-100 hover:border-purple-200 hover:bg-purple-50/50 rounded-lg transition-colors">
                      <div>
                        <div className="font-medium text-gray-900 flex items-center gap-2">
                          {order.order_ref}
                          <span className="text-[10px] uppercase font-bold bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">{order.order_status}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{new Date(order.created_at).toLocaleDateString()}</div>
                      </div>
                      <div className="text-right flex items-center gap-4">
                        <div className="font-medium text-gray-900">₹{order.final_total.toLocaleString('en-IN')}</div>
                        <ChevronRight size={16} className="text-gray-400" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
