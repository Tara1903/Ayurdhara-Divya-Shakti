const fs = require('fs');
let c = fs.readFileSync('src/actions/orderActions.ts', 'utf8');

c = c.replace(
  /.eq\('address_line1', payload.shippingAddress.addressLine1\)\s*.eq\('pin_code', payload.shippingAddress.pinCode\);/g,
  ".eq('address_line_1', payload.shippingAddress.addressLine1)\n        .eq('pincode', payload.shippingAddress.pinCode);"
);

c = c.replace(
  /address_line1: payload.shippingAddress.addressLine1,\s*address_line2: payload.shippingAddress.addressLine2 \|\| null,\s*landmark: payload.shippingAddress.landmark \|\| null,\s*pin_code: payload.shippingAddress.pinCode,/g,
  "address_line_1: payload.shippingAddress.addressLine1,\n          address_line_2: payload.shippingAddress.addressLine2 || null,\n          landmark: payload.shippingAddress.landmark || null,\n          pincode: payload.shippingAddress.pinCode,"
);

fs.writeFileSync('src/actions/orderActions.ts', c);
console.log('Fixed address insertion');
