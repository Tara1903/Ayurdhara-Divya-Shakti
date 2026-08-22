const fs = require('fs');
let c = fs.readFileSync('src/app/(storefront)/HomepageClient.tsx', 'utf8');

const t2 = `<Link href={cat.link} key={i} className="group flex flex-col items-center text-center w-24 md:w-28">`;
const r2 = `<Link href={cat.link} key={i} className="group flex flex-col items-center text-center w-24 md:w-[104px] xl:w-28 shrink-0">`;

c = c.replace(t2, r2);

const target = `<div className="flex justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 flex-wrap xl:flex-nowrap max-w-[1400px] mx-auto">`;
const replacement = `<div className="flex justify-start lg:justify-center gap-3 sm:gap-4 md:gap-4 xl:gap-6 overflow-x-auto scrollbar-hide pb-4 flex-nowrap md:flex-wrap lg:flex-nowrap max-w-[1400px] mx-auto w-full">`;

c = c.replace(target, replacement);

fs.writeFileSync('src/app/(storefront)/HomepageClient.tsx', c);
console.log('Fixed layout 2');
