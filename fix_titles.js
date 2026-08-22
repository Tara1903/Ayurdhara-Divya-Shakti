const fs = require('fs');
let c = fs.readFileSync('src/app/(storefront)/HomepageClient.tsx', 'utf8');

const oldStr1 = `<div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1A1A1A] mb-2">Shop By Form</h2>
            <p className="text-gray-500">Find products in the format you love most.</p>
          </div>
        </div>`;

const newStr1 = `<div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1A1A1A] mb-4">Shop By Form</h2>
          <p className="text-gray-500">Find products in the format you love most.</p>
        </div>`;

const oldStr2 = `<div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1A1A1A] mb-2">Shop By Offers</h2>
            <p className="text-gray-500">Discover our best values and curated wellness combinations.</p>
          </div>
        </div>`;

const newStr2 = `<div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1A1A1A] mb-4">Shop By Offers</h2>
          <p className="text-gray-500">Discover our best values and curated wellness combinations.</p>
        </div>`;

// Note: checking actual file formatting
c = c.replace(/<div className="flex flex-col md:flex-row justify-between items-center mb-12">\s*<div className="text-center md:text-left mb-6 md:mb-0">\s*<h2 className="text-3xl md:text-4xl font-serif font-bold text-\[#1A1A1A\] mb-2">Shop By Form<\/h2>\s*<p className="text-gray-500">Find products in the format you love most\.<\/p>\s*<\/div>\s*<\/div>/g, newStr1);
c = c.replace(/<div className="flex flex-col md:flex-row justify-between items-center mb-12">\s*<div className="text-center md:text-left mb-6 md:mb-0">\s*<h2 className="text-3xl md:text-4xl font-serif font-bold text-\[#1A1A1A\] mb-2">Shop By Offers<\/h2>\s*<p className="text-gray-500">Discover our best values and curated wellness combinations\.<\/p>\s*<\/div>\s*<\/div>/g, newStr2);

fs.writeFileSync('src/app/(storefront)/HomepageClient.tsx', c);
console.log('Fixed titles');
