const fs = require('fs');
let c = fs.readFileSync('src/app/(storefront)/HomepageClient.tsx', 'utf8');

c = c.replace(
  "{ id: 'daily', label: 'Daily Wellness', image: '/images/products/nabhi-kids-smart-15ml.jpg' },",
  "{ id: 'daily', label: 'Daily Wellness', image: '/images/categories/cat_daily_wellness.jpg' },"
);
c = c.replace(
  "{ id: 'women', label: \"Women's Wellness\", image: '/images/products/nabhi-women-15ml.jpg' },",
  "{ id: 'women', label: \"Women's Wellness\", image: '/images/categories/cat_womens_wellness.jpg' },"
);
c = c.replace(
  "{ id: 'men', label: \"Men's Wellness\", image: '/images/products/nabhi-men-15ml.jpg' },",
  "{ id: 'men', label: \"Men's Wellness\", image: '/images/categories/cat_mens_wellness.jpg' },"
);
c = c.replace(
  "{ id: 'kids', label: 'Kids Care', image: '/images/products/nabhi-kids-smart-15ml.jpg' },",
  "{ id: 'kids', label: 'Kids Care', image: '/images/categories/cat_kids_care.jpg' },"
);
c = c.replace(
  "{ id: 'senior', label: 'Senior Care', image: '/images/products/nabhi-senior-15ml.jpg' },",
  "{ id: 'senior', label: 'Senior Care', image: '/images/categories/cat_senior_care.jpg' },"
);

fs.writeFileSync('src/app/(storefront)/HomepageClient.tsx', c);
console.log('Updated goal icons');
