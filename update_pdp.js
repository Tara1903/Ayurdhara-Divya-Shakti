const fs = require('fs');
let c = fs.readFileSync('src/components/PDPClient.tsx', 'utf8');

c = c.replace(/<h1 className="text-\[20px\] md:text-\[24px\] font-medium mb-2 text-gray-900 leading-snug">\{product\.name\}<\/h1>/, `<div className="text-[10px] md:text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1 mt-2">PRODUCT TYPE: <span className="text-[#2D5A27] font-bold">{product.category}</span></div>\n              <h1 className="text-[20px] md:text-[24px] font-medium mb-2 text-gray-900 leading-snug">{product.name}</h1>`);

fs.writeFileSync('src/components/PDPClient.tsx', c);
console.log('Updated PDP');
