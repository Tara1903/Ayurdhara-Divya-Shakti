const fs = require('fs');
let c = fs.readFileSync('src/components/PDPClient.tsx', 'utf8');

c = c.replace(/name: product.name,/g, "name: displayTitle,");

fs.writeFileSync('src/components/PDPClient.tsx', c);
console.log('Fixed add to cart name');
