import { processServerOrder } from './src/actions/orderActions';

const payload = {
  items: [{ productId: 'senior-comfort-oil-blend', variant: '10 ml', quantity: 1 }],
  shippingAddress: {
    fullName: 'Tara Singh',
    mobile: '8360818034',
    addressLine1: 'INDORE',
    pinCode: '452020',
    city: 'Indore',
    state: 'MP',
  },
  paymentMethod: 'UPI',
  guestMobile: '8360818034',
};

async function test() {
  const result = await processServerOrder(payload as any);
  console.log(JSON.stringify(result, null, 2));
}

test();
