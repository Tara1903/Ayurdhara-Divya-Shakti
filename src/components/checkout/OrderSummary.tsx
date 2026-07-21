'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';
import { useAuthStore } from '@/store/authStore';
import { calculatePricing, formatINR } from '@/services/pricingService';
import { validateCoupon } from '@/services/couponService';

export default function OrderSummary() {
  const { items } = useCartStore();
  const {
    shippingCharge,
    appliedCouponCode,
    couponDiscount,
    applyCoupon,
    removeCoupon,
  } = useCheckoutStore();
  const { user } = useAuthStore();
  const isGoldMember = user?.isGoldMember || false;

  const [couponInput, setCouponInput] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMessage, setCouponMessage] = useState('');
  const [couponError, setCouponError] = useState(false);

  // Sync coupon input if coupon already applied (e.g. from cart)
  useEffect(() => {
    if (appliedCouponCode) setCouponInput(appliedCouponCode);
  }, [appliedCouponCode]);

  const pricing = calculatePricing(items, couponDiscount, shippingCharge, isGoldMember);

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    setCouponMessage('');
    setCouponError(false);

    const result = await validateCoupon(couponInput, pricing.subtotal);
    
    if (result.isValid) {
      applyCoupon(result.code, result.discountAmount);
      setCouponMessage(result.message);
      setCouponError(false);
    } else {
      setCouponMessage(result.message);
      setCouponError(true);
    }
    setCouponLoading(false);
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponInput('');
    setCouponMessage('');
    setCouponError(false);
  };

  return (
    <div className="order-summary-card">
      <div className="order-summary-header">
        <span className="order-summary-title">Order Summary</span>
      </div>

      <div className="order-summary-body">
        {/* Cart Items */}
        <div>
          {items.map((item) => (
            <div key={item.id} className="order-item-row">
              <div className="order-item-img">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="56px"
                />
                {/* Quantity badge */}
                <span style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  background: 'var(--charcoal)',
                  color: 'white',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {item.quantity}
                </span>
              </div>
              <div className="order-item-details">
                <span className="order-item-name">{item.name}</span>
                <span className="order-item-variant">{item.size}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--stone)', textDecoration: 'line-through' }}>
                  {formatINR(item.originalPrice * item.quantity)}
                </span>
              </div>
              <span className="order-item-price" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.2rem' }}>
                {isGoldMember && item.goldMemberPrice && item.goldMemberPrice < item.price ? (
                  <>
                    <span style={{ fontSize: '0.65rem', color: '#B8860B', textTransform: 'uppercase', fontWeight: 700 }}>Gold Price</span>
                    <span>{formatINR(item.goldMemberPrice * item.quantity)}</span>
                  </>
                ) : (
                  <span>{formatINR(item.price * item.quantity)}</span>
                )}
              </span>
            </div>
          ))}
        </div>

        {/* Edit Cart Link */}
        <Link
          href="/cart"
          style={{
            display: 'block',
            textAlign: 'center',
            fontSize: '0.78rem',
            color: 'var(--olive)',
            textDecoration: 'underline',
            textUnderlineOffset: '2px',
            padding: '0.5rem 0',
            fontWeight: 500,
          }}
        >
          Edit cart
        </Link>

        {/* Coupon */}
        <div className="summary-coupon">
          {appliedCouponCode ? (
            <div className="summary-coupon-applied">
              <span>🎉 {appliedCouponCode} — {formatINR(couponDiscount)} off</span>
              <button
                className="summary-coupon-remove"
                onClick={handleRemoveCoupon}
                aria-label="Remove coupon"
              >
                ×
              </button>
            </div>
          ) : (
            <div className="summary-coupon-row">
              <label htmlFor="coupon-input" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
                Coupon code
              </label>
              <input
                id="coupon-input"
                className="summary-coupon-input"
                placeholder="COUPON CODE"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                disabled={couponLoading}
              />
              <button
                className="summary-coupon-btn"
                onClick={handleApplyCoupon}
                disabled={couponLoading || !couponInput.trim()}
              >
                {couponLoading ? '...' : 'Apply'}
              </button>
            </div>
          )}
          {couponMessage && (
            <p style={{ fontSize: '0.75rem', color: couponError ? '#DC2626' : 'var(--olive)', margin: 0 }}>
              {couponMessage}
            </p>
          )}
        </div>

        {/* Pricing Breakdown */}
        <div className="summary-pricing">
          <div className="summary-pricing-row">
            <span className="summary-pricing-label">Subtotal</span>
            <span className="summary-pricing-value">{formatINR(pricing.subtotal)}</span>
          </div>
          {pricing.itemDiscount > 0 && (
            <div className="summary-pricing-row">
              <span className="summary-pricing-label">Product discount</span>
              <span className="summary-pricing-value discount">−{formatINR(pricing.itemDiscount)}</span>
            </div>
          )}
          {pricing.couponDiscount > 0 && (
            <div className="summary-pricing-row">
              <span className="summary-pricing-label">Coupon discount</span>
              <span className="summary-pricing-value discount">−{formatINR(pricing.couponDiscount)}</span>
            </div>
          )}
          <div className="summary-pricing-row">
            <span className="summary-pricing-label">Shipping</span>
            <span className={`summary-pricing-value ${pricing.shippingCharge === 0 ? 'free' : ''}`}>
              {pricing.shippingCharge === 0 ? 'FREE' : formatINR(pricing.shippingCharge)}
            </span>
          </div>
        </div>

        {/* Final Total */}
        <div className="summary-total-row">
          <span className="summary-total-label">Total</span>
          <span className="summary-total-value">{formatINR(pricing.finalTotal)}</span>
        </div>
        <p className="summary-tax-note">All taxes included · Prices in INR</p>

        {/* Trust Badges */}
        <div className="checkout-trust">
          <span className="trust-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Secure
          </span>
          <span className="trust-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            Safe Pay
          </span>
          <span className="trust-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            100% Natural
          </span>
        </div>
      </div>
    </div>
  );
}
