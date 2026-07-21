'use client';

import { useEffect } from 'react';
import { useCheckoutStore } from '@/store/checkoutStore';
import { useCartStore } from '@/store/cartStore';
import { getShippingMethods } from '@/services/shippingService';
import { formatINR } from '@/services/pricingService';
import type { ShippingMethodType } from '@/types/checkout';

export default function ShippingSelector() {
  const { selectedShippingMethod, setShippingMethod, completeStep, completedSteps, goToStep } = useCheckoutStore();
  const { getCartSubtotal } = useCartStore();

  const subtotal = getCartSubtotal();
  const methods = getShippingMethods(subtotal);

  // Auto-select the first (cheapest) method on mount
  useEffect(() => {
    if (methods.length > 0 && !selectedShippingMethod) {
      setShippingMethod(methods[0].id, methods[0].charge);
    }
  }, []);

  const handleSelect = (methodId: ShippingMethodType, charge: number) => {
    setShippingMethod(methodId, charge);
  };

  const isCompleted = completedSteps.includes('shipping');

  const selectedMethod = methods.find((m) => m.id === selectedShippingMethod);

  if (isCompleted) {
    return (
      <div className="checkout-section">
        <div className="checkout-section-header">
          <span className="checkout-section-title">
            <span style={{ color: 'var(--olive)', marginRight: '0.5rem' }}>✓</span>
            Shipping Method
          </span>
          <button className="checkout-section-edit" onClick={() => goToStep('shipping')}>Edit</button>
        </div>
        <div className="checkout-section-body">
          <div className="confirmed-value">
            {selectedMethod?.label}
            <span> · {selectedMethod?.estimatedDays}</span>
          </div>
          <div className="confirmed-value" style={{ marginTop: '0.25rem' }}>
            {selectedMethod?.charge === 0 ? (
              <span style={{ color: 'var(--olive)', fontWeight: 600 }}>FREE</span>
            ) : (
              formatINR(selectedMethod?.charge ?? 0)
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-section">
      <div className="checkout-section-header">
        <span className="checkout-section-title">Shipping Method</span>
        <span className="checkout-section-badge">Step 3</span>
      </div>
      <div className="checkout-section-body">
        <div className="shipping-options" role="radiogroup" aria-label="Shipping method">
          {methods.map((method) => (
            <div
              key={method.id}
              className={`shipping-option ${selectedShippingMethod === method.id ? 'selected' : ''}`}
              onClick={() => handleSelect(method.id, method.charge)}
              role="radio"
              aria-checked={selectedShippingMethod === method.id}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(method.id, method.charge)}
            >
              <div className="shipping-radio" aria-hidden="true">
                <div className="shipping-radio-dot" />
              </div>
              <div className="shipping-option-info">
                <div className="shipping-option-label">{method.label}</div>
                <div className="shipping-option-desc">{method.description}</div>
              </div>
              <div className={`shipping-option-price ${method.charge === 0 ? 'free' : ''}`}>
                {method.charge === 0 ? 'FREE' : formatINR(method.charge)}
              </div>
            </div>
          ))}
        </div>

        {/* Serviceability Note */}
        <p style={{
          fontSize: '0.72rem',
          color: 'var(--stone)',
          padding: '0.75rem 0 0',
          borderTop: '1px solid var(--sand)',
          marginTop: '1rem',
          lineHeight: 1.5,
        }}>
          📍 Demo mode: Delivery available to all PIN codes. Real-time serviceability checks will be enabled when connected to our delivery partner.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
          <button
            type="button"
            onClick={() => goToStep('address')}
            className="btn-outline-small"
            style={{ flex: '0 0 auto', padding: '0.875rem 1.25rem' }}
          >
            ← Back
          </button>
          <button
            className="place-order-btn"
            style={{ flex: 1, marginTop: 0 }}
            onClick={() => completeStep('shipping')}
            disabled={!selectedShippingMethod}
          >
            Continue to Payment
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
