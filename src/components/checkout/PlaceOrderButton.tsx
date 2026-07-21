'use client';

import { useRouter } from 'next/navigation';
import { useCheckoutStore } from '@/store/checkoutStore';
import { useCartStore } from '@/store/cartStore';
import { calculatePricing, formatINR } from '@/services/pricingService';
import { createPendingOrder } from '@/services/orderService';
import { paymentService } from '@/services/paymentService';

export default function PlaceOrderButton() {
  const router = useRouter();
  const {
    contact,
    address,
    selectedShippingMethod,
    selectedPaymentMethod,
    shippingCharge,
    couponDiscount,
    appliedCouponCode,
    idempotencyKey,
    isSubmitting,
    submissionError,
    completedSteps,
    setSubmitting,
    setSubmissionError,
    setPlacedOrderRef,
    resetCheckout,
  } = useCheckoutStore();

  const { items, clearCart, getCartSubtotal } = useCartStore();

  const subtotal = getCartSubtotal();
  const pricing = calculatePricing(items, couponDiscount, shippingCharge);

  // All 4 steps must be completed before placing order
  const allStepsComplete =
    completedSteps.includes('contact') &&
    completedSteps.includes('address') &&
    completedSteps.includes('shipping') &&
    completedSteps.includes('payment');

  const isCod = selectedPaymentMethod === 'cod';

  const buttonLabel = isSubmitting
    ? null
    : isCod
    ? 'Place COD Order'
    : `Pay ${formatINR(pricing.finalTotal)}`;

  const handlePlaceOrder = async () => {
    if (isSubmitting || !allStepsComplete || !selectedPaymentMethod) return;

    setSubmitting(true);
    setSubmissionError(null);

    try {
      // 1. Create the pending order (backend validates pricing server-side in production)
      const order = await createPendingOrder({
        items: items.map((item) => ({
          productId: item.productId,
          variant: item.size,
          quantity: item.quantity,
        })),
        shippingAddress: {
          fullName: address.fullName || '',
          mobile: address.mobile || '',
          addressLine1: address.addressLine1 || '',
          addressLine2: address.addressLine2,
          landmark: address.landmark,
          pinCode: address.pinCode || '',
          city: address.city || '',
          state: address.state || '',
          country: address.country || 'India',
          addressType: address.addressType || 'home',
        },
        paymentMethod: selectedPaymentMethod,
        couponCode: appliedCouponCode || undefined,
        idempotencyKey,
        guestMobile: contact.mobile,
        guestEmail: contact.email || undefined,
      });

      // 2. Build a rich confirmation object to persist in session storage
      const confirmation = {
        orderRef: order.orderRef,
        customerName: contact.fullName,
        email: contact.email,
        mobile: contact.mobile,
        shippingAddress: order.shippingAddress,
        items: items.map((item) => ({
          productId: item.productId,
          productSlug: item.productId,
          name: item.name,
          variant: item.size,
          image: item.image,
          quantity: item.quantity,
          unitPrice: item.price,
          originalUnitPrice: item.originalPrice,
          lineTotal: item.price * item.quantity,
        })),
        pricing: {
          subtotal: pricing.subtotal,
          itemDiscount: pricing.itemDiscount,
          couponCode: appliedCouponCode || undefined,
          couponDiscount: pricing.couponDiscount,
          shippingCharge: pricing.shippingCharge,
          finalTotal: pricing.finalTotal,
        },
        paymentMethod: selectedPaymentMethod,
        paymentStatus: isCod ? 'pending' : 'pending',
        orderStatus: isCod ? 'confirmed' : 'payment_pending',
        shippingMethod: selectedShippingMethod,
        createdAt: new Date().toISOString(),
      };

      // 3. Persist to session storage so confirmation page can read it
      try {
        sessionStorage.setItem(
          `order_${order.orderRef}`,
          JSON.stringify(confirmation)
        );
      } catch {
        // Session storage unavailable — confirm page will show fallback
      }

      // 4. For prepaid: create a payment session (does NOT trigger actual payment)
      if (!isCod) {
        const session = await paymentService.createPaymentSession(
          order.orderRef,
          pricing.finalTotal,
          selectedPaymentMethod
        );
        // In production: redirect to gateway or open payment modal
        // For now: treat as "payment pending" — store session info
        try {
          sessionStorage.setItem(
            `payment_session_${order.orderRef}`,
            JSON.stringify(session)
          );
        } catch {}
      }

      // 5. Clear cart ONLY after order is successfully created
      // (For prepaid, we'd wait for backend verification — but clearing on pending is acceptable for COD)
      if (isCod) {
        clearCart();
      }
      // For prepaid: cart is kept until payment is verified

      // 6. Store order ref and navigate to confirmation
      setPlacedOrderRef(order.orderRef);
      resetCheckout();
      router.push(`/order-confirmation/${order.orderRef}`);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setSubmissionError(message);
      setSubmitting(false);
    }
  };

  if (!allStepsComplete) return null;

  return (
    <div style={{ marginTop: '1.5rem' }}>
      {submissionError && (
        <div
          role="alert"
          style={{
            background: 'rgba(220,38,38,0.06)',
            border: '1px solid rgba(220,38,38,0.2)',
            borderRadius: '8px',
            padding: '0.875rem 1rem',
            fontSize: '0.85rem',
            color: '#DC2626',
            marginBottom: '1rem',
            lineHeight: 1.5,
          }}
        >
          <strong>Order could not be placed.</strong> {submissionError}
          <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={handlePlaceOrder}
              className="btn-retry"
              style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
            >
              Retry
            </button>
            <a href="/cart" className="btn-outline-small" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
              Return to Cart
            </a>
          </div>
        </div>
      )}

      <button
        className={`place-order-btn ${isSubmitting ? 'loading' : ''}`}
        onClick={handlePlaceOrder}
        disabled={isSubmitting || !allStepsComplete}
        aria-busy={isSubmitting}
        aria-label={isSubmitting ? 'Placing your order, please wait' : buttonLabel || ''}
      >
        {isSubmitting ? (
          <>
            <span className="btn-spinner" aria-hidden="true" />
            Processing...
          </>
        ) : (
          <>
            {isCod ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            )}
            {buttonLabel}
          </>
        )}
      </button>

      <p style={{
        fontSize: '0.72rem',
        color: 'var(--stone)',
        textAlign: 'center',
        marginTop: '0.75rem',
        lineHeight: 1.5,
      }}>
        {isCod
          ? 'By placing this order, you agree to our Terms of Service. Pay cash at delivery.'
          : 'Your payment will be securely processed. You will not be charged until payment is confirmed.'}
      </p>
    </div>
  );
}
