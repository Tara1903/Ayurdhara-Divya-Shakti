const fs = require('fs');
let c = fs.readFileSync('src/data/categoryData.ts', 'utf8');

c = c.replace(
  /\{\s*name:\s*"Single Herbs",\s*slug:\s*"single-herbs"\s*\},[\s\S]*?\{\s*name:\s*"Herb Collection",\s*slug:\s*"herb-collection"\s*\}/g,
  `{ name: "Single Herbs", slug: "single-herbs" },
      { name: "Premium Herbs", slug: "premium-herbs" },
      { name: "Seasonal Collections", slug: "seasonal-collections" }`
);

fs.writeFileSync('src/data/categoryData.ts', c);
console.log('Fixed categories');
