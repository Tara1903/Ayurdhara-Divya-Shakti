const fs = require('fs');
let c = fs.readFileSync('src/app/(storefront)/HomepageClient.tsx', 'utf8');

const t = `{ name: 'Wellness Packs', image: '/images/categories/cat_wellness_packs_1786557692487.jpg', link: '/wellness-combos' },`;
const r = `{ name: 'Wellness Packs', image: '/images/categories/cat_wellness_packs_1786557692487.jpg', link: '/wellness-packs' },
      { name: 'Natural Fragrance & Essential Oils', image: '/images/categories/cat_natural_fragrance.jpg', link: '/natural-fragrance-essential-oils' },`;

c = c.replace(t, r);
fs.writeFileSync('src/app/(storefront)/HomepageClient.tsx', c);
console.log('Updated icons');
