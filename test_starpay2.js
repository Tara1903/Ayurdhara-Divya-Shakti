const STARPAY_API_URL = 'https://payment-gateway-web-kappa.vercel.app';
const INTERNAL_API_KEY = '508d0154d38e49c5a4a7e489310218e77e1be6468eac4123a532ba9e0cfac26f';

async function test() {
  const res = await fetch(`${STARPAY_API_URL}/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': INTERNAL_API_KEY,
    },
    body: JSON.stringify({
      amount: 298.00,
      currency: 'INR',
      description: 'Ayurdhara Order AYD-2026-104174',
      customerName: 'Test',
      // customerEmail: 'test@example.com', // REMOVED
      customerPhone: '9999999999',
      returnUrl: 'https://test.com',
      webhookUrl: 'https://test.com',
      metadata: {
        storefrontOrderId: 'uuid-here',
        ayurdharaOrderRef: 'AYD-2026-104174',
        customerId: 'guest',
        isGoldMember: 'false',
        couponCode: 'NONE',
        partnerCode: 'NONE',
      },
    }),
  });

  console.log('Status:', res.status);
  const json = await res.json();
  console.log('Response:', json);
}

test();
