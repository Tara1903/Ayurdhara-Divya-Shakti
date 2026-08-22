const fs = require('fs');
let c = fs.readFileSync('src/app/(storefront)/HomepageClient.tsx', 'utf8');

c = c.replace(/<h3 className="text-\[10px\] md:text-xs font-bold text-gray-700/g, '<h3 className="text-[10px] md:text-xs lg:text-[10px] xl:text-xs font-bold text-gray-700');

fs.writeFileSync('src/app/(storefront)/HomepageClient.tsx', c);
console.log('Fixed text');
