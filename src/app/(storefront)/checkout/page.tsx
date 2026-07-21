'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';
import CheckoutProgress from '@/components/checkout/CheckoutProgress';
import ContactForm from '@/components/checkout/ContactForm';
import AddressForm from '@/components/checkout/AddressForm';
import ShippingSelector from '@/components/checkout/ShippingSelector';
import PaymentMethodSelector from '@/components/checkout/PaymentMethodSelector';
import OrderSummary from '@/components/checkout/OrderSummary';
import PlaceOrderButton from '@/components/checkout/PlaceOrderButton';
import { formatINR, calculatePricing } from '@/services/pricingService';

// --- Order Review Panel (inline, shown after all steps done) ---
function OrderReviewPanel() {
  const { contact, address, selectedShippingMethod, selectedPaymentMethod, shippingCharge, couponDiscount, completedSteps } = useCheckoutStore();
  const { items } = useCartStore();
  const pricing = calculatePricing(items, couponDiscount, shippingCharge);

  if (!completedSteps.includes('payment')) return null;

  const methodLabels: Record<string, string> = {
    upi: 'UPI', card: 'Credit / Debit Card', net_banking: 'Net Banking',
    wallet: 'Wallet', cod: 'Cash on Delivery',
  };
  const shippingLabels: Record<string, string> = {
    standard: 'Standard Delivery (4–6 days)',
    express: 'Express Delivery (1–2 days)',
    free: 'Free Delivery',
  };

  return (
    <div className="checkout-section" style={{ border: '1.5px solid var(--forest)' }}>
      <div className="checkout-section-header" style={{ background: 'rgba(44,62,45,0.04)' }}>
        <span className="checkout-section-title">Review & Place Order</span>
        <span className="checkout-section-badge" style={{ background: 'rgba(44,62,45,0.12)', color: 'var(--forest)' }}>
          Final Step
        </span>
      </div>
      <div className="checkout-section-body">
        {/* Quick recap */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', padding: '0.5rem 0 1rem', borderBottom: '1px solid var(--sand)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--stone)' }}>Delivering to</span>
            <span style={{ color: 'var(--charcoal)', fontWeight: 500, textAlign: 'right', maxWidth: '55%' }}>
              {address.fullName}, {address.city} – {address.pinCode}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--stone)' }}>Contact</span>
            <span style={{ color: 'var(--charcoal)', fontWeight: 500 }}>+91 {contact.mobile}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--stone)' }}>Shipping</span>
            <span style={{ color: 'var(--charcoal)', fontWeight: 500 }}>
              {shippingLabels[selectedShippingMethod || 'standard']}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--stone)' }}>Payment</span>
            <span style={{ color: 'var(--charcoal)', fontWeight: 500 }}>
              {methodLabels[selectedPaymentMethod || '']}
            </span>
          </div>
        </div>

        {/* Final total highlight */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0 0.5rem' }}>
          <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--charcoal)' }}>
            {selectedPaymentMethod === 'cod' ? 'Amount Payable at Door' : 'Amount to Pay'}
          </span>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--charcoal)' }}>
            {formatINR(pricing.finalTotal)}
          </span>
        </div>

        {/* Place Order Button */}
        <PlaceOrderButton />
      </div>
    </div>
  );
}

// --- Main Checkout Page ---
export default function CheckoutPage() {
  const router = useRouter();
  const { items } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Hydration guard: only render cart-dependent UI after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect to cart if empty (after mount)
  useEffect(() => {
    if (mounted && items.length === 0) {
      router.replace('/cart');
    }
  }, [mounted, items.length, router]);

  if (!mounted) {
    return (
      <div className="checkout-page">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <div className="btn-spinner" style={{ width: 32, height: 32, borderWidth: 3, borderColor: 'var(--sand)', borderTopColor: 'var(--forest)' }} />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="checkout-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ color: 'var(--stone)', marginBottom: '1rem' }}>Your cart is empty.</p>
          <Link href="/collections" className="place-order-btn" style={{ display: 'inline-flex', textDecoration: 'none', padding: '0.875rem 2rem' }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      {/* Minimal header for checkout */}
      <div style={{
        borderBottom: '1px solid var(--sand)',
        background: 'white',
        padding: '0 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 90,
        height: '64px',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', color: 'var(--charcoal)' }}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M12 22C12 22 4 15 4 8.5C4 4 7.5 2 12 2C16.5 2 20 4 20 8.5C20 15 12 22 12 22Z" strokeLinejoin="round" />
            <path d="M12 22V8" />
            <path d="M12 15C10 12 8 10.5 8 10.5" strokeLinecap="round" />
            <path d="M12 15C14 12 16 10.5 16 10.5" strokeLinecap="round" />
          </svg>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Ayurdhara Divya Shakti
          </span>
        </Link>

        <Link href="/cart" style={{ fontSize: '0.8rem', color: 'var(--olive)', textDecoration: 'underline', textUnderlineOffset: '2px', fontWeight: 500 }}>
          ← Back to Cart
        </Link>
      </div>

      <div className="checkout-container">
        {/* LEFT: Multi-step forms */}
        <div className="checkout-left">
          <CheckoutProgress />

          <ContactForm />
          <AddressForm />
          <ShippingSelector />
          <PaymentMethodSelector />
          <OrderReviewPanel />
        </div>

        {/* RIGHT: Sticky Order Summary */}
        <div className="checkout-right">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
