const fs = require('fs');
let c = fs.readFileSync('src/app/(storefront)/HomepageClient.tsx', 'utf8');

const t = `      return products.filter(p => {
        const isCombo = p.category.toLowerCase().includes('pack') || p.category.toLowerCase().includes('combo') || p.name.toLowerCase().includes('pack');
        
        switch(activeTab) {
          case 'trial': return p.variants.some(v => v.size.toLowerCase().includes('trial') || v.size.toLowerCase().includes('10ml'));
          case 'gold': return p.variants.some(v => v.size.toLowerCase().includes('gold'));
          case 'premium': return p.variants.some(v => v.size.toLowerCase().includes('premium'));
          case 'family': return p.variants.some(v => v.size.toLowerCase().includes('family'));
          case 'combo': return isCombo;
          default: return false;
        }
      });`;

const r = `      return products.filter(p => {
        const isCombo = p.category.toLowerCase().includes('pack') || p.category.toLowerCase().includes('combo') || p.name.toLowerCase().includes('pack') || p.name.toLowerCase().includes('kit');
        
        const hasVariant = (term) => p.variants && p.variants.some(v => v.size.toLowerCase().includes(term));
        const nameOrCat = (term) => p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term);

        switch(activeTab) {
          case 'trial': return nameOrCat('trial') || nameOrCat('starter') || hasVariant('trial') || hasVariant('10ml') || hasVariant('10 ml') || hasVariant('starter');
          case 'gold': return nameOrCat('gold') || hasVariant('gold') || hasVariant('15ml') || hasVariant('15 ml');
          case 'premium': return nameOrCat('premium') || nameOrCat('diamond') || hasVariant('premium') || hasVariant('diamond') || hasVariant('30ml') || hasVariant('30 ml');
          case 'family': return nameOrCat('family') || hasVariant('family');
          case 'combo': return isCombo;
          default: return false;
        }
      });`;

c = c.replace(t, r);
fs.writeFileSync('src/app/(storefront)/HomepageClient.tsx', c);
console.log('Fixed offers');
