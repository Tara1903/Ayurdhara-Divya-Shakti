const fs = require('fs');
const path = 'src/data/productData.ts';
let content = fs.readFileSync(path, 'utf8');

// Replace all variant images
content = content.replace(/"image":\s*"[^"]+"/g, '"image": "/images/products/diamond-trial.jpg"');

// Replace all product images arrays
content = content.replace(/"images":\s*\[\s*"[^"]+"\s*\]/g, '"images": [ "/images/products/diamond-trial.jpg" ]');
content = content.replace(/"images":\s*\[\s*("[^"]+",\s*)*"[^"]+"\s*\]/g, '"images": [ "/images/products/diamond-trial.jpg" ]');

fs.writeFileSync(path, content);
console.log('productData.ts updated');
