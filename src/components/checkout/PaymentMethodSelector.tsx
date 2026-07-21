'use client';

import { useCheckoutStore } from '@/store/checkoutStore';
import type { PaymentMethodType } from '@/types/payment';

const PAYMENT_METHODS: Array<{
  type: PaymentMethodType;
  label: string;
  description: string;
  icon: string;
}> = [
  {
    type: 'upi',
    label: 'UPI',
    description: 'Pay via any UPI app — GPay, PhonePe, Paytm, BHIM',
    icon: '⚡',
  },
  {
    type: 'card',
    label: 'Credit / Debit Card',
    description: 'Visa, Mastercard, RuPay — all cards accepted',
    icon: '💳',
  },
  {
    type: 'net_banking',
    label: 'Net Banking',
    description: 'All major Indian banks supported',
    icon: '🏦',
  },
  {
    type: 'wallet',
    label: 'Wallet',
    description: 'Paytm, Amazon Pay, MobiKwik and more',
    icon: '👛',
  },
  {
    type: 'cod',
    label: 'Cash on Delivery',
    description: 'Pay when your order arrives at your door',
    icon: '🏠',
  },
];

export default function PaymentMethodSelector() {
  const { selectedPaymentMethod, setPaymentMethod, completeStep, completedSteps, goToStep } = useCheckoutStore();

  const isCompleted = completedSteps.includes('payment');
  const selected = PAYMENT_METHODS.find((m) => m.type === selectedPaymentMethod);

  if (isCompleted) {
    return (
      <div className="checkout-section">
        <div className="checkout-section-header">
          <span className="checkout-section-title">
            <span style={{ color: 'var(--olive)', marginRight: '0.5rem' }}>✓</span>
            Payment Method
          </span>
          <button className="checkout-section-edit" onClick={() => goToStep('payment')}>Edit</button>
        </div>
        <div className="checkout-section-body">
          <div className="confirmed-value">
            {selected?.icon} {selected?.label}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-section">
      <div className="checkout-section-header">
        <span className="checkout-section-title">Payment Method</span>
        <span className="checkout-section-badge">Step 4</span>
      </div>
      <div className="checkout-section-body">
        <div className="payment-methods" role="radiogroup" aria-label="Payment method">
          {PAYMENT_METHODS.map((method) => (
            <div
              key={method.type}
              className={`payment-method-option ${selectedPaymentMethod === method.type ? 'selected' : ''}`}
              onClick={() => setPaymentMethod(method.type)}
              role="radio"
              aria-checked={selectedPaymentMethod === method.type}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setPaymentMethod(method.type)}
            >
              <div className="shipping-radio" aria-hidden="true">
                <div className="shipping-radio-dot" />
              </div>
              <div className="payment-method-icon" aria-hidden="true">{method.icon}</div>
              <div className="payment-method-info">
                <div className="payment-method-label">{method.label}</div>
                <div className="payment-method-desc">{method.description}</div>
              </div>
              {method.type === 'cod' && (
                <span style={{
                  fontSize: '0.7rem',
                  background: 'rgba(197,165,114,0.15)',
                  color: '#92400E',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '4px',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}>
                  +₹0 extra
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Security note */}
        <div className="payment-security-note">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Your payment credentials are never stored on our servers. All transactions are secured and encrypted.
        </div>

        {/* Coming Soon note for non-COD */}
        {selectedPaymentMethod && selectedPaymentMethod !== 'cod' && (
          <div style={{
            marginTop: '0.75rem',
            padding: '0.75rem 1rem',
            background: 'rgba(197, 165, 114, 0.08)',
            border: '1px dashed rgba(197, 165, 114, 0.3)',
            borderRadius: '8px',
            fontSize: '0.8rem',
            color: 'var(--earth)',
            lineHeight: 1.5,
          }}>
            <strong>Custom Payment System — Coming Soon.</strong> Online payment processing will be enabled when our secure custom payment gateway is connected. Use <strong>Cash on Delivery</strong> to place your order today.
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
          <button
            type="button"
            onClick={() => goToStep('shipping')}
            className="btn-outline-small"
            style={{ flex: '0 0 auto', padding: '0.875rem 1.25rem' }}
          >
            ← Back
          </button>
          <button
            className="place-order-btn"
            style={{ flex: 1, marginTop: 0 }}
            onClick={() => selectedPaymentMethod && completeStep('payment')}
            disabled={!selectedPaymentMethod}
          >
            Review Order
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
