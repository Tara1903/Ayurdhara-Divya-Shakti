'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/store/authStore';
import { fetchCustomerOrders } from '@/services/orderService';
import type { Order } from '@/types/order';
import { formatINR } from '@/services/pricingService';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';

export default function OrderDetailsPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore(state => state.addItem);
  const toggleCart = useCartStore(state => state.toggleCart);

  useEffect(() => {
    if (user?.id) {
      fetchCustomerOrders(user.id).then(res => {
        const found = res.find(o => o.orderRef === orderId || o.id === orderId);
        setOrder(found || null);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [user, orderId]);

  if (loading) {
    return (
      <div className="account-main">
        <Link href="/account/orders" style={{ fontSize: '0.85rem', color: 'var(--stone)', textDecoration: 'none', marginBottom: '1rem', display: 'inline-block' }}>
          ← Back to Orders
        </Link>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
          <div className="btn-spinner" style={{ width: 32, height: 32, borderWidth: 3, borderColor: 'var(--sand)', borderTopColor: 'var(--forest)' }} />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="account-main">
        <div className="account-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--charcoal)', marginBottom: '0.5rem' }}>Order Not Found</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--stone)', marginBottom: '1.5rem' }}>We couldn't find an order with this reference.</p>
          <Link href="/account/orders" style={{ display: 'inline-block', padding: '0.75rem 1.5rem', background: 'var(--charcoal)', color: 'white', textDecoration: 'none', borderRadius: '6px', fontSize: '0.9rem' }}>
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const handleReorder = () => {
    if (!order.items) return;
    order.items.forEach(item => {
      addToCart({
        productId: item.productId,
        name: item.name,
        price: item.unitPrice,
        originalPrice: item.originalUnitPrice || item.unitPrice,
        image: item.image,
        size: item.variant,
        quantity: item.quantity,
      });
    });
    toggleCart();
  };

  const steps = ['Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
  const getStepIndex = (status: string) => {
    if (status === 'delivered') return 4;
    if (status === 'shipped') return 2;
    if (status === 'processing') return 1;
    if (status === 'confirmed') return 0;
    return -1;
  };
  const currentStep = getStepIndex(order.orderStatus);

  return (
    <div className="account-main">
      <Link href="/account/orders" style={{ fontSize: '0.85rem', color: 'var(--stone)', textDecoration: 'none', marginBottom: '0.5rem', display: 'inline-block', fontWeight: 500 }}>
        ← Back to Orders
      </Link>
      
      <div className="account-header" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="account-title" style={{ fontSize: '1.8rem', marginBottom: '0.25rem' }}>Order {order.orderRef}</h1>
          <p className="account-subtitle">Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        <button 
          onClick={handleReorder}
          style={{ padding: '0.75rem 1.25rem', background: 'white', border: '1.5px solid var(--charcoal)', color: 'var(--charcoal)', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
        >
          Reorder All Items
        </button>
      </div>

      {/* Order Timeline */}
      {currentStep >= 0 && order.orderStatus !== 'cancelled' && (
        <div className="account-card" style={{ marginBottom: '2rem' }}>
          <h3 className="account-card-title" style={{ marginBottom: '1.5rem' }}>Tracking Status</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', margin: '0 1rem' }}>
            {/* Progress Line */}
            <div style={{ position: 'absolute', top: '12px', left: 0, right: 0, height: '2px', background: 'var(--sand)', zIndex: 0 }} />
            <div style={{ position: 'absolute', top: '12px', left: 0, width: `${(Math.max(0, currentStep) / 4) * 100}%`, height: '2px', background: 'var(--olive)', zIndex: 1, transition: 'width 0.5s ease' }} />
            
            {steps.map((step, idx) => {
              const isCompleted = idx <= currentStep;
              const isActive = idx === currentStep;
              return (
                <div key={step} style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                  <div style={{ 
                    width: '24px', height: '24px', borderRadius: '50%', 
                    background: isCompleted ? 'var(--olive)' : 'white', 
                    border: `2px solid ${isCompleted ? 'var(--olive)' : 'var(--sand)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {isCompleted && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: isActive ? 600 : 400, color: isCompleted ? 'var(--charcoal)' : 'var(--stone)', textAlign: 'center' }}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        
        {/* Items */}
        <div className="account-card" style={{ gridColumn: '1 / -1' }}>
          <h3 className="account-card-title" style={{ marginBottom: '1rem' }}>Items</h3>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {order.items?.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '1rem', padding: '1rem 0', borderBottom: idx < order.items.length - 1 ? '1px solid var(--sand)' : 'none', alignItems: 'center' }}>
                <div style={{ width: 60, height: 70, borderRadius: 6, overflow: 'hidden', background: 'var(--ivory)', position: 'relative', flexShrink: 0 }}>
                  <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} sizes="60px" />
                </div>
                <div style={{ flex: 1 }}>
                  <Link href={`/products/${item.productSlug}`} style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--charcoal)', textDecoration: 'none' }}>
                    {item.name}
                  </Link>
                  <div style={{ fontSize: '0.8rem', color: 'var(--stone)' }}>{item.variant} &times; {item.quantity}</div>
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--charcoal)' }}>
                  {formatINR(item.lineTotal)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Address */}
        <div className="account-card">
          <h3 className="account-card-title" style={{ marginBottom: '1rem' }}>Delivery Address</h3>
          <div style={{ fontSize: '0.85rem', color: 'var(--charcoal)', lineHeight: 1.6 }}>
            <span style={{ fontWeight: 600 }}>{order.shippingAddress?.fullName}</span><br />
            {order.shippingAddress?.addressLine1}<br />
            {order.shippingAddress?.addressLine2 && <>{order.shippingAddress.addressLine2}<br /></>}
            {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.pinCode}
          </div>
        </div>

        {/* Summary */}
        <div className="account-card">
          <h3 className="account-card-title" style={{ marginBottom: '1rem' }}>Payment Summary</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--charcoal)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--stone)' }}>Subtotal</span>
              <span>{formatINR(order.pricing?.subtotal || 0)}</span>
            </div>
            {order.pricing?.itemDiscount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--olive)' }}>
                <span>Discounts</span>
                <span>-{formatINR(order.pricing.itemDiscount)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--stone)' }}>Shipping</span>
              <span>{order.pricing?.shippingCharge === 0 ? 'FREE' : formatINR(order.pricing?.shippingCharge || 0)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--sand)', marginTop: '0.25rem', fontWeight: 700, fontSize: '1rem' }}>
              <span>Total</span>
              <span>{formatINR(order.pricing?.finalTotal || 0)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
              <span style={{ color: 'var(--stone)' }}>Method</span>
              <span style={{ textTransform: 'uppercase' }}>{order.paymentMethod}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
