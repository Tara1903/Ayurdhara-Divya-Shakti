const fs = require('fs');

let c = fs.readFileSync('src/app/(storefront)/HomepageClient.tsx', 'utf8');

c = c.replace(
  "{ id: 'trial', label: 'Trial Wellness Oil Packs', image: '/images/products/nabhi-kids-smart-10ml.jpg' }",
  "{ id: 'trial', label: 'Trial Wellness Oil Packs', image: '/images/categories/cat_trial_pack.jpg' }"
);

fs.writeFileSync('src/app/(storefront)/HomepageClient.tsx', c);
console.log('Updated Trial Pack icon');
