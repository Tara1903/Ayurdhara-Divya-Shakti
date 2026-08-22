import { products } from '../src/data/productData';
console.log('Total products in productData:', products.length);
const packs = products.filter(p => p.slug.includes('pack') || p.slug.includes('trial') || p.category.toLowerCase().includes('pack') || p.category.toLowerCase().includes('trial'));
console.log('Packs in productData:', packs.length);
packs.forEach(p => console.log(`Slug: ${p.slug} | Name: "${p.name}" | Cat: "${p.category}"`));
