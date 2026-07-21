'use client';

import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Shield, Sparkles } from 'lucide-react';

import type { Order } from '@/types/order';

export default function AccountOverview() {
  const user = useAuthStore((state) => state.user);
  const [recentOrder, setRecentOrder] = useState<Order | null>(null);

  useEffect(() => {
    // We'll simulate fetching the most recent order by checking localStorage
    // In real app: fetch from API /orders?limit=1
    try {
      // Very basic simulation to grab the last local order if available
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
    <div className="account-main">
      <div className="account-header">
        <h1 className="account-title">Welcome back, {user?.fullName?.split(' ')[0] || 'Guest'}</h1>
        <p className="account-subtitle">Manage your orders, profile, and wellness preferences.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        
        {/* Recent Order Card */}
        <div className="account-card">
          <div className="account-card-header">
            <h3 className="account-card-title">Recent Order</h3>
            {recentOrder && <Link href="/account/orders" className="account-card-action">View All</Link>}
          </div>
          
          {recentOrder ? (
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--stone)', marginBottom: '0.5rem' }}>
                Order {recentOrder.orderRef || recentOrder.id}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <span className={`confirmation-status-badge ${recentOrder.orderStatus === 'confirmed' ? 'confirmed' : 'pending'}`} style={{ margin: 0 }}>
                  {recentOrder.orderStatus === 'confirmed' ? 'Confirmed' : 'Pending'}
                </span>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--charcoal)' }}>
                  ₹{recentOrder.pricing?.finalTotal}
                </span>
              </div>
              <Link 
                href={`/account/orders/${recentOrder.id || recentOrder.orderRef}`} 
                style={{
                  display: 'inline-block', padding: '0.625rem 1rem', background: 'var(--charcoal)',
                  color: 'white', textDecoration: 'none', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 500
                }}
              >
                Track Order
              </Link>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: '0.9rem', color: 'var(--stone)', marginBottom: '1rem' }}>Your wellness journey starts here.</p>
              <Link 
                href="/collections" 
                style={{
                  display: 'inline-block', padding: '0.625rem 1rem', border: '1.5px solid var(--charcoal)',
                  color: 'var(--charcoal)', textDecoration: 'none', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 500
                }}
              >
                Explore Products
              </Link>
            </div>
          )}
        </div>

        {/* Gold Membership Status Card */}
        <div className="account-card" style={{ background: user?.isGoldMember ? '#FAF7F2' : '#FFF', border: user?.isGoldMember ? '1px solid #D4AF37' : '1px solid #E5E7EB' }}>
          <div className="account-card-header">
            <h3 className="account-card-title" style={{ color: user?.isGoldMember ? '#B8860B' : 'var(--charcoal)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {user?.isGoldMember ? <Sparkles size={18} /> : <Shield size={18} />}
              {user?.isGoldMember ? 'Gold Member' : 'Unlock Gold Benefits'}
            </h3>
          </div>
          {user?.isGoldMember ? (
            <div>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                Thank you for being a part of our premium wellness community. You have exclusive access to Gold Member Pricing across all our products.
              </p>
              <ul style={{ fontSize: '0.85rem', color: 'var(--charcoal)', paddingLeft: '1rem', marginBottom: '1rem', listStyleType: 'disc' }}>
                <li style={{ marginBottom: '0.25rem' }}>Special pricing on individual Ayurvedic formulations</li>
                <li style={{ marginBottom: '0.25rem' }}>Priority support and consultation access</li>
                <li style={{ marginBottom: '0.25rem' }}>Early access to new product launches</li>
              </ul>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: '0.9rem', color: 'var(--stone)', marginBottom: '1rem' }}>
                Upgrade your experience. Purchase any qualifying Ayurvedic Wellness Course to automatically unlock lifetime Gold Membership benefits.
              </p>
              <Link 
                href="/collections" 
                style={{
                  display: 'inline-block', padding: '0.625rem 1rem', background: '#D4AF37', border: 'none',
                  color: '#FFF', textDecoration: 'none', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600
                }}
              >
                Explore Courses
              </Link>
            </div>
          )}
        </div>

        {/* Wishlist Quick Link */}
        <div className="account-card">
          <div className="account-card-header">
            <h3 className="account-card-title">Wishlist</h3>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--stone)', marginBottom: '1rem' }}>
            Save the formulations you'd like to explore later.
          </p>
          <Link 
            href="/account/wishlist" 
            style={{
              display: 'inline-block', padding: '0.625rem 1rem', background: 'var(--ivory)', border: '1px solid var(--sand)',
              color: 'var(--charcoal)', textDecoration: 'none', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 500
            }}
          >
            View Wishlist
          </Link>
        </div>

      </div>
    </div>
  );
}
