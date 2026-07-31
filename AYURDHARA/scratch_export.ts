import * as fs from 'fs';
import * as path from 'path';

// Load the data directly
import { products } from '../src/data/productData';

const outDir = path.join(__dirname, '02_Products');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

products.forEach(product => {
  const filePath = path.join(outDir, `${product.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(product, null, 2));
});
console.log(`Exported ${products.length} products to JSON.`);
