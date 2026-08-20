async function test() {
  const url = 'https://payment-gateway-web-kappa.vercel.app/api/orders';
  const apiKey = '508d0154d38e49c5a4a7e489310218e77e1be6468eac4123a532ba9e0cfac26f';
  
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify({
        amount: 298,
        description: 'Ayurdhara Order AYD-2026-104174',
        customerName: 'Test',
        customerEmail: undefined,
        customerPhone: '9876543210',
        returnUrl: 'https://ayurdharadivyashakti.store/checkout/success',
        webhookUrl: 'https://ayurdharadivyashakti.store/api/webhooks/payment',
      }),
    });

    const json = await res.json();
    console.log("Status:", res.status);
    console.log("Response:", json);
  } catch(e) {
    console.error(e);
  }
}
test();
