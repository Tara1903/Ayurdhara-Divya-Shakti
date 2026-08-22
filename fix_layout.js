const fs = require('fs');
let c = fs.readFileSync('src/app/(storefront)/HomepageClient.tsx', 'utf8');

const target = `<div className="flex justify-center gap-4 md:gap-6 flex-wrap max-w-6xl mx-auto">`;
const replacement = `<div className="flex justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 flex-wrap xl:flex-nowrap max-w-[1400px] mx-auto">`;

c = c.replace(target, replacement);

fs.writeFileSync('src/app/(storefront)/HomepageClient.tsx', c);
console.log('Fixed layout');
