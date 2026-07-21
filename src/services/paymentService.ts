// PaymentService — Phase 5
// Provider-independent payment abstraction layer.
// The checkout UI ONLY communicates with this interface.
// The underlying implementation is swapped in when the custom payment backend is ready.

import type { PaymentSession, PaymentResult, PaymentStatus, PaymentMethodType } from '@/types/payment';

/**
 * IPaymentService — the abstract contract.
 * Future custom payment gateway implementations must fulfill this interface.
 */
export interface IPaymentService {
  createPaymentSession(
    orderId: string,
    amount: number,
    method: PaymentMethodType
  ): Promise<PaymentSession>;

  initiatePayment(session: PaymentSession): Promise<PaymentResult>;

  getPaymentStatus(paymentId: string): Promise<PaymentStatus>;

  verifyPayment(paymentId: string): Promise<boolean>;

  cancelPayment(paymentId: string): Promise<void>;
}

/**
 * DemoPaymentService — used during development only.
 * 
 * SECURITY NOTES:
 * - Does NOT collect any sensitive credentials
 * - Does NOT simulate a "successful" payment as if it were real
 * - Returns a payment session with status "pending"
 * - The order is NOT marked as paid — backend verification is required
 * 
 * PRODUCTION: Replace this class with your custom payment gateway implementation.
 * The checkout UI will NOT need to change when you swap in the real gateway.
 */
export class DemoPaymentService implements IPaymentService {
  async createPaymentSession(
    orderId: string,
    amount: number,
    method: PaymentMethodType
  ): Promise<PaymentSession> {
    // In production, this makes a POST to your backend:
    // POST /api/payments/create-session
    // Body: { orderId, amount, method, idempotencyKey }
    // The backend creates the session and returns gateway-specific data

    await new Promise((resolve) => setTimeout(resolve, 800));

    const sessionId = `ps_demo_${Date.now()}`;
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 min

    return {
      sessionId,
      orderId,
      amount, // In paise — set by backend in production
      currency: 'INR',
      method,
      status: 'created',
      idempotencyKey: orderId, // Uses orderId as key in demo
      expiresAt,
      // gatewaySessionData: {} // Custom gateway data goes here
    };
  }

  async initiatePayment(session: PaymentSession): Promise<PaymentResult> {
    // In production, this triggers the payment flow on your gateway.
    // For COD, this immediately returns a "pending" result.
    // For UPI/card, this would redirect to or open the payment UI.

    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      paymentId: `pay_demo_${Date.now()}`,
      sessionId: session.sessionId,
      orderId: session.orderId,
      status: 'pending', // NEVER 'paid' — only backend verification can mark paid
      method: session.method,
      amount: session.amount,
      timestamp: new Date().toISOString(),
    };
  }

  async getPaymentStatus(paymentId: string): Promise<PaymentStatus> {
    // Poll payment status from backend
    // GET /api/payments/{paymentId}/status
    console.log('Checking payment status for:', paymentId);
    return 'pending';
  }

  async verifyPayment(paymentId: string): Promise<boolean> {
    // CRITICAL: This MUST be done server-side in production.
    // The frontend should call your backend, which verifies directly with the payment gateway.
    // NEVER verify payments client-side.
    console.log('Payment verification must be done server-side:', paymentId);
    return false; // Always false in demo — no real payment exists
  }

  async cancelPayment(paymentId: string): Promise<void> {
    console.log('Cancelling payment:', paymentId);
    // POST /api/payments/{paymentId}/cancel
  }
}

// Singleton payment service instance
// Swap this for your production implementation when ready:
// export const paymentService: IPaymentService = new CustomPaymentService();
export const paymentService: IPaymentService = new DemoPaymentService();
