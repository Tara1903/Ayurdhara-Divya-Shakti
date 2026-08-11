// StarPayService — Production Payment Integration
// Connects the Ayurdhara storefront to the custom StarPay UPI gateway.

const STARPAY_API_URL = process.env.STARPAY_API_URL || 'https://payment-gateway-web-kappa.vercel.app';
const STARPAY_API_KEY = process.env.STARPAY_INTERNAL_API_KEY || '';

export interface StarPayOrderResponse {
  orderId: string;
  orderRef: string;
  amount: number;
  reservedAmount: number;
  currency: string;
  paymentToken: string;
  upiTxnRef: string;
  expiresAt: string;
  checkoutUrl: string;
}

export interface StarPayStatusResponse {
  orderId: string;
  orderRef: string;
  amount: number;
  reservedAmount: number;
  currency: string;
  description: string;
  status: 'CREATED' | 'AWAITING_PAYMENT' | 'PAID' | 'FAILED' | 'EXPIRED' | 'REFUNDED';
  upiTxnRef: string;
  expiresAt: string;
  paidAt: string | null;
  createdAt: string;
}

/**
 * Creates a payment order in StarPay.
 * Called server-side from orderActions after creating the Ayurdhara order.
 */
export async function createStarPayOrder(params: {
  amount: number;
  description: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  metadata?: Record<string, unknown>;
}): Promise<{ success: true; data: StarPayOrderResponse } | { success: false; error: string }> {
  try {
    const res = await fetch(`${STARPAY_API_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': STARPAY_API_KEY,
      },
      body: JSON.stringify({
        amount: params.amount,
        currency: 'INR',
        description: params.description,
        customerName: params.customerName,
        customerEmail: params.customerEmail,
        customerPhone: params.customerPhone,
        metadata: params.metadata,
      }),
    });

    const json = await res.json();

    if (!res.ok || !json.success) {
      return { success: false, error: json.error?.message || 'Failed to create StarPay order' };
    }

    return { success: true, data: json.data };
  } catch (err) {
    console.error('[StarPay] createOrder error:', err);
    return { success: false, error: 'Network error connecting to StarPay' };
  }
}

/**
 * Polls the status of a StarPay order.
 * Called from the Ayurdhara callback/status pages.
 */
export async function getStarPayOrderStatus(
  orderId: string,
  paymentToken: string
): Promise<{ success: true; data: StarPayStatusResponse } | { success: false; error: string }> {
  try {
    const res = await fetch(`${STARPAY_API_URL}/api/orders/${orderId}?token=${paymentToken}`, {
      headers: {
        'X-Payment-Token': paymentToken,
      },
      cache: 'no-store',
    });

    const json = await res.json();

    if (!res.ok || !json.success) {
      return { success: false, error: json.error?.message || 'Failed to fetch order status' };
    }

    return { success: true, data: json.data };
  } catch (err) {
    console.error('[StarPay] getOrderStatus error:', err);
    return { success: false, error: 'Network error connecting to StarPay' };
  }
}
