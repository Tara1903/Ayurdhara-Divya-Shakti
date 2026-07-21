'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { fetchCustomerOrders } from '@/services/orderService';
import type { Order } from '@/types/order';
import { formatINR } from '@/services/pricingService';

const STATUS_LABELS: Record<string, string> = {
  confirmed: 'Confirmed',
  payment_pending: 'Payment Pending',
  pending: 'Pending',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled'
};

const PAYMENT_STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  created: 'Created',
  processing: 'Processing',
  paid: 'Paid',
  failed: 'Failed',
  cancelled: 'Cancelled',
};

export default function OrdersPage() {
  const user = useAuthStore((state) => state.user);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchCustomerOrders(user.id).then(res => {
        // Sort descending by date
        setOrders(res.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="account-main">
        <h1 className="account-title" style={{ marginBottom: '2rem' }}>My Orders</h1>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
          <div className="btn-spinner" style={{ width: 32, height: 32, borderWidth: 3, borderColor: 'var(--sand)', borderTopColor: 'var(--forest)' }} />
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="account-main">
        <h1 className="account-title" style={{ marginBottom: '2rem' }}>My Orders</h1>
        <div className="account-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <p style={{ fontSize: '1rem', color: 'var(--stone)', marginBottom: '1.5rem' }}>Your wellness journey starts here.</p>
          <Link 
            href="/collections" 
            style={{
              display: 'inline-block', padding: '0.875rem 2rem', background: 'var(--charcoal)',
              color: 'white', textDecoration: 'none', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 600
            }}
          >
            Explore Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="account-main">
      <div className="account-header" style={{ marginBottom: '2rem' }}>
        <h1 className="account-title">My Orders</h1>
        <p className="account-subtitle">View and track your previous purchases.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {orders.map(order => {
          const isConfirmed = order.orderStatus === 'confirmed' || order.orderStatus === 'shipped' || order.orderStatus === 'delivered';
          const isFailed = order.paymentStatus === 'failed';

          return (
            <div key={order.id} className="account-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ background: 'rgba(44,62,45,0.03)', padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--sand)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--stone)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                    Order Placed
                  </div>
                  <div style={{ fontWeight: 600, color: 'var(--charcoal)' }}>
                    {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--stone)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                    Order Total
                  </div>
                  <div style={{ fontWeight: 600, color: 'var(--charcoal)' }}>
                    {formatINR(order.pricing.finalTotal)}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--stone)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                    Order ID
                  </div>
                  <div style={{ fontWeight: 600, color: 'var(--charcoal)' }}>
                    {order.orderRef}
                  </div>
                </div>
              </div>
              
              <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--stone)' }}>Order Status:</span>
                      <span className={`confirmation-status-badge ${isConfirmed ? 'confirmed' : 'pending'}`} style={{ margin: 0, display: 'inline-block', width: 'fit-content' }}>
                        {STATUS_LABELS[order.orderStatus] || order.orderStatus}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--stone)' }}>Payment Status:</span>
                      <span className={`confirmation-status-badge ${order.paymentStatus === 'paid' ? 'confirmed' : isFailed ? 'failed' : 'pending'}`} style={{ margin: 0, display: 'inline-block', width: 'fit-content' }}>
                        {PAYMENT_STATUS_LABELS[order.paymentStatus] || order.paymentStatus}
                      </span>
                    </div>
                  </div>
                  
                  <div style={{ fontSize: '0.9rem', color: 'var(--charcoal)' }}>
                    {order.items.length} {order.items.length === 1 ? 'Item' : 'Items'}
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <Link 
                    href={`/account/orders/${order.id || order.orderRef}`} 
                    style={{
                      padding: '0.75rem 1.25rem', background: 'white', border: '1.5px solid var(--charcoal)',
                      color: 'var(--charcoal)', textDecoration: 'none', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600
                    }}
                  >
                    View Details
                  </Link>
                  <Link 
                    href={`/account/orders/${order.id || order.orderRef}`} 
                    style={{
                      padding: '0.75rem 1.25rem', background: 'var(--charcoal)',
                      color: 'white', textDecoration: 'none', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600
                    }}
                  >
                    Track Order
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
