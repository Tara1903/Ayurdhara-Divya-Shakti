const fs = require('fs');
let c = fs.readFileSync('src/app/(storefront)/HomepageClient.tsx', 'utf8');

c = c.replace(
  /className="flex overflow-x-auto pb-8 mb-10 gap-4 sm:gap-6 md:gap-8 scrollbar-hide justify-start (xl|lg):justify-center px-4 max-w-7xl mx-auto w-full"/g,
  'className="flex overflow-x-auto pb-8 mb-10 gap-4 sm:gap-6 md:gap-8 scrollbar-hide justify-start xl:justify-center px-4 sm:px-6 lg:px-8 w-full"'
);

fs.writeFileSync('src/app/(storefront)/HomepageClient.tsx', c);
console.log('Fixed tabs width');
