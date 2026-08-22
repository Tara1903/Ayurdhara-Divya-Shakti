const fs = require('fs');
let c = fs.readFileSync('src/app/(storefront)/HomepageClient.tsx', 'utf8');

const t1 = `<div className="flex justify-start lg:justify-center gap-3 sm:gap-4 md:gap-4 xl:gap-6 overflow-x-auto scrollbar-hide pb-4 flex-nowrap md:flex-wrap lg:flex-nowrap max-w-[1400px] mx-auto w-full">`;
const r1 = `<div className="flex justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-3 xl:gap-6 flex-wrap lg:flex-nowrap max-w-[1400px] mx-auto w-full">`;

c = c.replace(t1, r1);

const t2 = `<Link href={cat.link} key={i} className="group flex flex-col items-center text-center w-24 md:w-[104px] xl:w-28 shrink-0">`;
const r2 = `<Link href={cat.link} key={i} className="group flex flex-col items-center text-center w-24 md:w-28 lg:w-24 xl:w-28 shrink-0">`;

c = c.replace(t2, r2);

// Wait, I also need to adjust the image container width inside!
const t3 = `<div className="w-16 h-16 md:w-20 md:h-20 relative rounded-full overflow-hidden mb-3 bg-gray-100 shadow-sm border-[3px] border-white group-hover:border-[#E88B23] transition-all duration-300 group-hover:shadow-lg">`;
const r3 = `<div className="w-16 h-16 md:w-20 md:h-20 lg:w-16 lg:h-16 xl:w-20 xl:h-20 relative rounded-full overflow-hidden mb-3 bg-gray-100 shadow-sm border-[3px] border-white group-hover:border-[#E88B23] transition-all duration-300 group-hover:shadow-lg">`;

c = c.replace(t3, r3);

fs.writeFileSync('src/app/(storefront)/HomepageClient.tsx', c);
console.log('Fixed layout 3');
