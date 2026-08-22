const fs = require('fs');
let c = fs.readFileSync('src/app/(storefront)/HomepageClient.tsx', 'utf8');

let count = 0;
c = c.replace(/<div className="flex overflow-x-auto pb-8 mb-10 gap-4 sm:gap-6 md:gap-8 scrollbar-hide justify-start px-4 max-w-7xl mx-auto w-full">/g, (match) => {
  count++;
  if (count === 1) {
    // Section 3: 9 tabs -> needs xl
    return '<div className="flex overflow-x-auto pb-8 mb-10 gap-4 sm:gap-6 md:gap-8 scrollbar-hide justify-start xl:justify-center px-4 max-w-7xl mx-auto w-full">';
  } else if (count === 2) {
    // Section 5: 8 tabs -> needs xl
    return '<div className="flex overflow-x-auto pb-8 mb-10 gap-4 sm:gap-6 md:gap-8 scrollbar-hide justify-start xl:justify-center px-4 max-w-7xl mx-auto w-full">';
  } else if (count === 3) {
    // Section 7: 6 tabs -> needs lg
    return '<div className="flex overflow-x-auto pb-8 mb-10 gap-4 sm:gap-6 md:gap-8 scrollbar-hide justify-start lg:justify-center px-4 max-w-7xl mx-auto w-full">';
  } else if (count === 4) {
    // Section 9: 5 tabs -> needs lg
    return '<div className="flex overflow-x-auto pb-8 mb-10 gap-4 sm:gap-6 md:gap-8 scrollbar-hide justify-start lg:justify-center px-4 max-w-7xl mx-auto w-full">';
  }
  return match;
});

fs.writeFileSync('src/app/(storefront)/HomepageClient.tsx', c);
console.log('Fixed alignments');
