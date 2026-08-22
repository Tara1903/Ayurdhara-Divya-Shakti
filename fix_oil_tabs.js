const fs = require('fs');
let c = fs.readFileSync('src/app/(storefront)/HomepageClient.tsx', 'utf8');

c = c.replace(
  "{ id: 'kids', label: 'Kids Nabhi Oil Care', image: '/images/products/nabhi-kids-smart-15ml.jpg' },",
  "{ id: 'kids', label: 'Kids Nabhi Oil Care', image: '/images/categories/cat_kids_care.jpg' },"
);
c = c.replace(
  "{ id: 'men', label: 'Men Nabhi Oil Care', image: '/images/products/nabhi-men-15ml.jpg' },",
  "{ id: 'men', label: 'Men Nabhi Oil Care', image: '/images/categories/cat_mens_wellness.jpg' },"
);
c = c.replace(
  "{ id: 'women', label: 'Women Nabhi Oil Care', image: '/images/products/nabhi-women-15ml.jpg' },",
  "{ id: 'women', label: 'Women Nabhi Oil Care', image: '/images/categories/cat_womens_wellness.jpg' },"
);
c = c.replace(
  "{ id: 'senior', label: 'Senior Nabhi Oil Care', image: '/images/products/nabhi-senior-15ml.jpg' },",
  "{ id: 'senior', label: 'Senior Nabhi Oil Care', image: '/images/categories/cat_senior_care.jpg' },"
);

c = c.replace(
  /<div className="flex overflow-x-auto pb-8 mb-10 gap-6 md:gap-12 scrollbar-hide justify-start lg:justify-center px-4 max-w-6xl mx-auto">/g,
  '<div className="flex overflow-x-auto pb-8 mb-10 gap-4 sm:gap-6 md:gap-8 scrollbar-hide justify-start px-4 max-w-7xl mx-auto w-full">'
);

fs.writeFileSync('src/app/(storefront)/HomepageClient.tsx', c);
console.log('Fixed oil tabs');
