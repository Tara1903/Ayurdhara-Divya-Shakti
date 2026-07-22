'use client';

import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Shield, Sparkles, Package, Heart, User, MapPin } from 'lucide-react';

import type { Order } from '@/types/order';

export default function AccountOverview() {
  const user = useAuthStore((state) => state.user);
  const [recentOrder, setRecentOrder] = useState<Order | null>(null);

  useEffect(() => {
    // We'll simulate fetching the most recent order by checking localStorage
    try {
      const allKeys = Object.keys(sessionStorage).filter(k => k.startsWith('order_'));
      if (allKeys.length > 0) {
        const lastOrder = JSON.parse(sessionStorage.getItem(allKeys[allKeys.length - 1]) || '{}');
        if (lastOrder.orderId) {
          setRecentOrder(lastOrder);
        }
      }
    } catch {}
  }, []);

  return (
    <div className="bg-sand min-h-[60vh] py-8 md:py-12">
      <div className="container max-w-5xl">
        <div className="mb-8 md:mb-12">
          <h1 className="heading-brand text-3xl md:text-4xl text-charcoal mb-2">Welcome back, {user?.fullName?.split(' ')[0] || 'Guest'}</h1>
          <p className="text-stone">Manage your orders, profile, and wellness preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Recent Order Card */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Package size={20} className="text-stone" />
                Recent Order
              </h3>
              {recentOrder && <Link href="/account/orders" className="text-sm font-semibold text-forest hover:underline">View All</Link>}
            </div>
            
            {recentOrder ? (
              <div className="flex flex-col flex-1">
                <div className="text-sm text-stone mb-2">
                  Order {recentOrder.orderRef || recentOrder.id}
                </div>
                <div className="flex items-center justify-between mb-6">
                  <span className={`px-2 py-1 text-xs font-bold uppercase tracking-wider rounded ${recentOrder.orderStatus === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {recentOrder.orderStatus === 'confirmed' ? 'Confirmed' : 'Pending'}
                  </span>
                  <span className="font-bold text-charcoal">
                    ₹{recentOrder.pricing?.finalTotal}
                  </span>
                </div>
                <Link 
                  href={`/account/orders/${recentOrder.id || recentOrder.orderRef}`} 
                  className="mt-auto block w-full text-center py-2 px-4 bg-charcoal text-white rounded font-semibold text-sm hover:bg-black transition-colors"
                >
                  Track Order
                </Link>
              </div>
            ) : (
              <div className="flex flex-col flex-1 justify-center items-center text-center py-6">
                <p className="text-sm text-stone mb-4">Your wellness journey starts here.</p>
                <Link 
                  href="/collections" 
                  className="w-full text-center py-2 px-4 border border-charcoal text-charcoal rounded font-semibold text-sm hover:bg-charcoal hover:text-white transition-colors"
                >
                  Explore Products
                </Link>
              </div>
            )}
          </div>

          {/* Gold Membership Status Card */}
          <div className={`rounded-lg p-6 shadow-sm border flex flex-col h-full ${user?.isGoldMember ? 'bg-gold/10 border-gold' : 'bg-white border-gray-100'}`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`font-semibold text-lg flex items-center gap-2 ${user?.isGoldMember ? 'text-gold' : 'text-charcoal'}`}>
                {user?.isGoldMember ? <Sparkles size={20} /> : <Shield size={20} />}
                {user?.isGoldMember ? 'Gold Member' : 'Unlock Gold Benefits'}
              </h3>
            </div>
            {user?.isGoldMember ? (
              <div className="flex flex-col flex-1">
                <p className="text-sm text-charcoal mb-4">
                  Thank you for being a part of our premium wellness community. You have exclusive access to Gold Member Pricing.
                </p>
                <ul className="text-sm text-charcoal space-y-2 mb-6 list-disc pl-4">
                  <li>Special pricing on all products</li>
                  <li>Priority support access</li>
                  <li>Early access to new launches</li>
                </ul>
                <div className="mt-auto px-4 py-2 bg-gold text-white text-center rounded font-semibold text-sm uppercase tracking-wider">
                  Active
                </div>
              </div>
            ) : (
              <div className="flex flex-col flex-1">
                <p className="text-sm text-stone mb-6">
                  Upgrade your experience. Purchase any qualifying Ayurvedic Wellness Course to automatically unlock lifetime Gold Membership benefits.
                </p>
                <Link 
                  href="/collections" 
                  className="mt-auto block w-full text-center py-2 px-4 bg-gold text-white rounded font-semibold text-sm uppercase tracking-wider hover:bg-yellow-600 transition-colors"
                >
                  Explore Courses
                </Link>
              </div>
            )}
          </div>

          {/* Quick Links Group */}
          <div className="flex flex-col gap-4">
            {/* Wishlist */}
            <Link href="/account/wishlist" className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-forest/10 rounded-full flex items-center justify-center text-forest group-hover:scale-110 transition-transform">
                <Heart size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-charcoal">Wishlist</h4>
                <p className="text-xs text-stone">View saved products</p>
              </div>
            </Link>

            {/* Profile Settings */}
            <Link href="/account/profile" className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-charcoal/10 rounded-full flex items-center justify-center text-charcoal group-hover:scale-110 transition-transform">
                <User size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-charcoal">Profile Details</h4>
                <p className="text-xs text-stone">Update personal info</p>
              </div>
            </Link>

            {/* Addresses */}
            <Link href="/account/addresses" className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-stone/10 rounded-full flex items-center justify-center text-stone group-hover:scale-110 transition-transform">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-charcoal">Addresses</h4>
                <p className="text-xs text-stone">Manage shipping addresses</p>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
