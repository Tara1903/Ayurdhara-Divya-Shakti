const STARPAY_API_URL = process.env.STARPAY_API_URL || 'https://payment-gateway-web-kappa.vercel.app';
const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY || process.env.STARPAY_INTERNAL_API_KEY || '';

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

export async function createStarPayOrder(params: {
  amount: number;
  description: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  returnUrl: string;
  webhookUrl: string;
  metadata?: Record<string, unknown>;
}): Promise<{ success: true; data: StarPayOrderResponse } | { success: false; error: string }> {
  try {
    const res = await fetch("${STARPAY_API_URL}/api/orders", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': INTERNAL_API_KEY,
      },
      body: JSON.stringify({
        amount: params.amount,
        currency: 'INR',
        description: params.description,
        customerName: params.customerName || 'Guest',
        customerEmail: params.customerEmail,
        customerPhone: params.customerPhone,
        returnUrl: params.returnUrl,
        webhookUrl: params.webhookUrl,
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
