const fs = require('fs');

const dataPath = './src/data/productData.ts';
let content = fs.readFileSync(dataPath, 'utf8');

const productsMatch = content.match(/export const products: Product\[\] = (\[[\s\S]*\]);/);
if (!productsMatch) {
    console.log('Could not find products array');
    process.exit(1);
}

let products;
try {
    products = eval(productsMatch[1]);
} catch (e) {
    console.error('Error evaluating products:', e);
    process.exit(1);
}

products.forEach(p => {
    if (p.category.includes('Oil Blend') && p.category !== 'Hair Wellness Oil' && p.category !== 'Feet Massage Oil') {
        p.variants = [
            { size: '10 ml', originalPrice: 299, price: 199, image: `/images/products/${p.slug}-10-ml.jpg` },
            { size: '20 ml', originalPrice: 499, price: 349, image: `/images/products/${p.slug}-20-ml.jpg` }
        ];
        p.price = 199;
        p.originalPrice = 299;
        p.discount = Math.round(((299-199)/299)*100);
    } else if (p.name === 'Feet Massage Oil') {
        p.variants = [
            { size: '30 ml', originalPrice: 599, price: 399, image: `/images/products/${p.slug}-30-ml.jpg` },
            { size: '100 ml', originalPrice: 1799, price: 1199, image: `/images/products/${p.slug}-100-ml.jpg` },
            { size: '200 ml', originalPrice: 3299, price: 2199, image: `/images/products/${p.slug}-200-ml.jpg` }
        ];
        p.price = 399;
        p.originalPrice = 599;
        p.discount = Math.round(((599-399)/599)*100);
    } else if (p.name === 'Hair Wellness Oil') {
        p.variants = [
            { size: '50 ml', originalPrice: 699, price: 499, image: `/images/products/${p.slug}-50-ml.jpg` },
            { size: '100 ml', originalPrice: 1299, price: 899, image: `/images/products/${p.slug}-100-ml.jpg` },
            { size: '200 ml', originalPrice: 2499, price: 1799, image: `/images/products/${p.slug}-200-ml.jpg` }
        ];
        p.price = 499;
        p.originalPrice = 699;
        p.discount = Math.round(((699-499)/699)*100);
    } else if (p.name === 'Trial Wellness Pack') {
        p.variants = [{ size: 'Standard', originalPrice: 749, price: 499, image: `/images/products/${p.slug}.jpg` }];
        p.price = 499; p.originalPrice = 749;
        p.discount = Math.round(((749-499)/749)*100);
    } else if (p.name === 'Gold Wellness Pack') {
        p.variants = [{ size: 'Standard', originalPrice: 2999, price: 2199, image: `/images/products/${p.slug}.jpg` }];
        p.price = 2199; p.originalPrice = 2999;
        p.discount = Math.round(((2999-2199)/2999)*100);
    } else if (p.name === 'Premium Wellness Pack') {
        p.variants = [{ size: 'Standard', originalPrice: 5499, price: 3999, image: `/images/products/${p.slug}.jpg` }];
        p.price = 3999; p.originalPrice = 5499;
        p.discount = Math.round(((5499-3999)/5499)*100);
    }
    
    const familyMatch = p.name.match(/^(\d) Member Family (Trial|Gold) Wellness Pack$/) || p.name.match(/^(\d) Member Family (Trial) Pack$/);
    if (familyMatch) {
        const members = parseInt(familyMatch[1]);
        const type = familyMatch[2]; // Trial or Gold
        if (type === 'Trial') {
            const prices = {2: {mrp: 1499, off: 899}, 3: {mrp: 2249, off: 1299}, 4: {mrp: 2999, off: 1699}, 5: {mrp: 3749, off: 2099}};
            const cur = prices[members];
            if(cur) {
                p.price = cur.off; p.originalPrice = cur.mrp;
                p.variants = [{ size: 'Standard', originalPrice: cur.mrp, price: cur.off, image: `/images/products/${p.slug}.jpg` }];
                p.discount = Math.round(((cur.mrp-cur.off)/cur.mrp)*100);
            }
        } else if (type === 'Gold') {
            const prices = {2: {mrp: 5499, off: 3999}, 3: {mrp: 8249, off: 5799}, 4: {mrp: 10999, off: 7499}, 5: {mrp: 13749, off: 8999}};
            const cur = prices[members];
            if(cur) {
                p.price = cur.off; p.originalPrice = cur.mrp;
                p.variants = [{ size: 'Standard', originalPrice: cur.mrp, price: cur.off, image: `/images/products/${p.slug}.jpg` }];
                p.discount = Math.round(((cur.mrp-cur.off)/cur.mrp)*100);
            }
        }
    }
});

const newContent = content.substring(0, productsMatch.index) + 'export const products: Product[] = ' + JSON.stringify(products, null, 2) + ';' + content.substring(productsMatch.index + productsMatch[0].length);

fs.writeFileSync(dataPath, newContent);
console.log('Successfully updated productData.ts');
