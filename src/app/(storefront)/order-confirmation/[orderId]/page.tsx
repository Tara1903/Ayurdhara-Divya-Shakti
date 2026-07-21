'use client';

import { useEffect, useState } from 'react';
import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatINR } from '@/services/pricingService';
import type { OrderConfirmation } from '@/types/order';

interface PageProps {
  params: Promise<{ orderId: string }>;
}

const STATUS_LABELS: Record<string, string> = {
  confirmed: 'Order Confirmed',
  payment_pending: 'Payment Pending',
  pending: 'Pending',
  paid: 'Paid',
  payment_failed: 'Payment Failed',
};

const PAYMENT_STATUS_LABELS: Record<string, string> = {
  pending: 'Pending (Pay at Delivery)',
  created: 'Payment Created',
  processing: 'Processing',
  paid: 'Paid',
  failed: 'Failed',
  cancelled: 'Cancelled',
};

export default function OrderConfirmationPage({ params }: PageProps) {
  const { orderId } = use(params);
  const [order, setOrder] = useState<OrderConfirmation | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Load order from session storage (demo mode)
    // PRODUCTION: fetch from /api/orders/:orderId
    try {
      const stored = sessionStorage.getItem(`order_${orderId}`);
      if (stored) {
        setOrder(JSON.parse(stored));
      }
    } catch {
      // sessionStorage unavailable
    }
    setLoading(false);
  }, [mounted, orderId]);

  if (!mounted || loading) {
    return (
      <div className="confirmation-page" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div className="btn-spinner" style={{ width: 36, height: 36, borderWidth: 3, borderColor: 'var(--sand)', borderTopColor: 'var(--forest)' }} />
      </div>
    );
  }

  // If no order found — show fallback (e.g. direct URL access)
  if (!order) {
    return (
      <div className="confirmation-page">
        <div className="confirmation-inner" style={{ textAlign: 'center' }}>
          <div className="confirmation-hero">
            <div className="confirmation-check" style={{ background: 'rgba(44,62,45,0.1)', margin: '0 auto 1.25rem' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--forest)" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="confirmation-title">Order Placed!</h1>
            <p className="confirmation-subtitle">
              Your order reference is: <strong>{orderId}</strong>
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--stone)', marginTop: '0.75rem', lineHeight: 1.6 }}>
              We&apos;ve received your order. Check your mobile or email for updates.
            </p>
            <div className="confirmation-order-ref">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              {orderId}
            </div>
          </div>
          <div className="confirmation-actions">
            <Link href="/" className="confirmation-btn-primary">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  const isCod = order.paymentMethod === 'cod';
  const isConfirmed = order.orderStatus === 'confirmed';
  const isPending = order.orderStatus === 'payment_pending';

  const methodLabels: Record<string, string> = {
    upi: 'UPI', card: 'Credit / Debit Card', net_banking: 'Net Banking',
    wallet: 'Wallet', cod: 'Cash on Delivery',
  };

  return (
    <div className="confirmation-page">
      <div className="confirmation-inner">

        {/* Hero */}
        <div className="confirmation-hero">
          <div className="confirmation-check">
            {isConfirmed ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--olive)" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#92400E" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            )}
          </div>
          <h1 className="confirmation-title">
            {isCod ? 'Order Confirmed! 🎉' : isPending ? 'Payment Pending' : 'Order Placed!'}
          </h1>
          <p className="confirmation-subtitle">
            {isCod
              ? `Pay ₹${formatINR(order.pricing.finalTotal).replace('₹', '')} in cash when your order arrives.`
              : isPending
              ? "We're waiting to confirm your payment. Please don't close this page."
              : 'Thank you for your order.'}
          </p>
          {order.orderRef && (
            <div className="confirmation-order-ref">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              {order.orderRef}
            </div>
          )}
        </div>

        {/* Order Details */}
        <div className="confirmation-card">
          <div className="confirmation-card-header">Order Details</div>
          <div className="confirmation-card-body">
            <div className="confirmation-detail-row">
              <span className="confirmation-detail-label">Customer</span>
              <span className="confirmation-detail-value">{order.customerName}</span>
            </div>
            <div className="confirmation-detail-row">
              <span className="confirmation-detail-label">Mobile</span>
              <span className="confirmation-detail-value">+91 {order.mobile}</span>
            </div>
            {order.email && (
              <div className="confirmation-detail-row">
                <span className="confirmation-detail-label">Email</span>
                <span className="confirmation-detail-value">{order.email}</span>
              </div>
            )}
            <div className="confirmation-detail-row">
              <span className="confirmation-detail-label">Order Status</span>
              <span className="confirmation-detail-value">
                <span className={`confirmation-status-badge ${isConfirmed ? 'confirmed' : 'pending'}`}>
                  {isConfirmed ? '✓ ' : '⏳ '}
                  {STATUS_LABELS[order.orderStatus] || order.orderStatus}
                </span>
              </span>
            </div>
            <div className="confirmation-detail-row">
              <span className="confirmation-detail-label">Payment</span>
              <span className="confirmation-detail-value">
                <span className={`confirmation-status-badge ${order.paymentStatus === 'paid' ? 'confirmed' : 'pending'}`}>
                  {methodLabels[order.paymentMethod]} · {PAYMENT_STATUS_LABELS[order.paymentStatus] || order.paymentStatus}
                </span>
              </span>
            </div>
            <div className="confirmation-detail-row">
              <span className="confirmation-detail-label">Delivery to</span>
              <span className="confirmation-detail-value">
                {order.shippingAddress.addressLine1},&nbsp;
                {order.shippingAddress.city},&nbsp;
                {order.shippingAddress.state}&nbsp;–&nbsp;
                {order.shippingAddress.pinCode}
              </span>
            </div>
            {order.estimatedDelivery && (
              <div className="confirmation-detail-row">
                <span className="confirmation-detail-label">Est. Delivery</span>
                <span className="confirmation-detail-value" style={{ color: 'var(--olive)', fontWeight: 600 }}>
                  {order.estimatedDelivery}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Items Ordered */}
        {order.items && order.items.length > 0 && (
          <div className="confirmation-card">
            <div className="confirmation-card-header">
              Items Ordered ({order.items.reduce((t, i) => t + i.quantity, 0)} items)
            </div>
            <div className="confirmation-card-body" style={{ padding: '0.75rem 1.5rem' }}>
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '0.875rem 0',
                    borderBottom: idx < order.items.length - 1 ? '1px solid var(--sand)' : 'none',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ width: 52, height: 60, borderRadius: 6, overflow: 'hidden', background: 'var(--ivory)', position: 'relative', flexShrink: 0 }}>
                    <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} sizes="52px" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--charcoal)' }}>{item.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--stone)' }}>{item.variant} × {item.quantity}</div>
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--charcoal)' }}>
                    {formatINR(item.lineTotal)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payment Summary */}
        <div className="confirmation-card">
          <div className="confirmation-card-header">Payment Summary</div>
          <div className="confirmation-card-body">
            {order.pricing.itemDiscount > 0 && (
              <div className="confirmation-detail-row">
                <span className="confirmation-detail-label">Product Savings</span>
                <span className="confirmation-detail-value" style={{ color: 'var(--olive)' }}>
                  −{formatINR(order.pricing.itemDiscount)}
                </span>
              </div>
            )}
            {order.pricing.couponDiscount > 0 && (
              <div className="confirmation-detail-row">
                <span className="confirmation-detail-label">Coupon ({order.pricing.couponCode})</span>
                <span className="confirmation-detail-value" style={{ color: 'var(--olive)' }}>
                  −{formatINR(order.pricing.couponDiscount)}
                </span>
              </div>
            )}
            <div className="confirmation-detail-row">
              <span className="confirmation-detail-label">Shipping</span>
              <span className="confirmation-detail-value" style={{ color: order.pricing.shippingCharge === 0 ? 'var(--olive)' : 'var(--charcoal)' }}>
                {order.pricing.shippingCharge === 0 ? 'FREE' : formatINR(order.pricing.shippingCharge)}
              </span>
            </div>
            <div className="confirmation-detail-row" style={{ paddingTop: '0.875rem', borderTop: '1px solid var(--sand)' }}>
              <span className="confirmation-detail-label" style={{ fontWeight: 700, color: 'var(--charcoal)', fontSize: '0.95rem' }}>
                {isCod ? 'Amount Payable at Door' : 'Total Paid'}
              </span>
              <span className="confirmation-detail-value" style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                {formatINR(order.pricing.finalTotal)}
              </span>
            </div>
          </div>
        </div>

        {/* COD note */}
        {isCod && (
          <div style={{
            background: 'rgba(197,165,114,0.08)',
            border: '1px solid rgba(197,165,114,0.25)',
            borderRadius: '10px',
            padding: '1rem 1.25rem',
            fontSize: '0.85rem',
            color: 'var(--earth)',
            lineHeight: 1.6,
          }}>
            <strong>Cash on Delivery:</strong> Please keep exact change of{' '}
            <strong>{formatINR(order.pricing.finalTotal)}</strong> ready at the time of delivery.
            Our delivery partner will collect the payment.
          </div>
        )}

        {/* Actions */}
        <div className="confirmation-actions">
          <Link href="/" className="confirmation-btn-primary">
            Continue Shopping
          </Link>
          <Link href="/collections" className="confirmation-btn-secondary">
            Explore More Products
          </Link>
        </div>

        {/* Guest account prompt */}
        <div style={{
          textAlign: 'center',
          padding: '1.5rem',
          background: 'white',
          border: '1px solid var(--sand)',
          borderRadius: '12px',
          marginTop: '1.5rem',
        }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--charcoal)', fontWeight: 600, marginBottom: '0.35rem' }}>
            Want to track your order?
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--stone)', marginBottom: '1rem' }}>
            Create an account to view order history, track shipments, and save addresses.
          </p>
          <Link
            href="#"
            style={{
              display: 'inline-block',
              padding: '0.625rem 1.5rem',
              background: 'var(--ivory)',
              border: '1.5px solid var(--sand)',
              borderRadius: '8px',
              fontSize: '0.825rem',
              fontWeight: 600,
              color: 'var(--charcoal)',
              textDecoration: 'none',
              transition: 'border-color 200ms',
            }}
          >
            Create Account (Coming Soon)
          </Link>
        </div>
      </div>
    </div>
  );
}
