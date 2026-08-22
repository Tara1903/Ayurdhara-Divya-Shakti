const fs = require('fs');

// 1. Update HomepageClient.tsx
let hc = fs.readFileSync('src/app/(storefront)/HomepageClient.tsx', 'utf8');
hc = hc.replace(
  "{ name: 'Natural Fragrance & Essential Oils', image: '/images/categories/cat_natural_fragrance.jpg', link: '/natural-fragrance-essential-oils' },",
  "{ name: 'Natural Aroma', image: '/images/categories/cat_natural_fragrance.jpg', link: '/natural-fragrance-essential-oils' },"
);
fs.writeFileSync('src/app/(storefront)/HomepageClient.tsx', hc);

// 2. Update categoryData.ts
let cd = fs.readFileSync('src/data/categoryData.ts', 'utf8');
cd = cd.replace(
  'name: "Natural Fragrance & Essential Oils",',
  'name: "Natural Aroma",'
);
fs.writeFileSync('src/data/categoryData.ts', cd);

console.log('Renamed category');
