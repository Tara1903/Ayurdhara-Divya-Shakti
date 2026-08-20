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
      amount: 100,
      currency: 'INR',
      description: 'Test',
      customerName: 'Test',
      customerEmail: 'test@example.com',
      customerPhone: '9999999999',
      returnUrl: 'https://test.com',
      webhookUrl: 'https://test.com',
      metadata: {},
    }),
  });

  console.log('Status:', res.status);
  const json = await res.json();
  console.log('Response:', json);
}

test();
