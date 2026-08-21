const fs = require('fs');
let c = fs.readFileSync('src/components/ProductCard.tsx', 'utf8');

c = c.replace(/<p className="text-xs text-\[#2D5A27\] mb-2">\{product\.category\}<\/p>/, `<p className="text-[10px] md:text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wider">PRODUCT TYPE: <br className="hidden md:block" /><span className="text-[#2D5A27] font-bold">{product.category}</span></p>`);

fs.writeFileSync('src/components/ProductCard.tsx', c);
console.log('Updated card');
