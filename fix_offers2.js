const fs = require('fs');
let c = fs.readFileSync('src/app/(storefront)/HomepageClient.tsx', 'utf8');

c = c.replace(
  "{ id: 'trial', label: 'Trial Starter', image: '/images/products/nabhi-kids-smart-10ml.jpg' }",
  "{ id: 'trial', label: 'Trial Starter', image: '/images/categories/cat_trial_pack.jpg' }"
);

const target = /const filteredProducts = useMemo\(\(\) => \{\s*return products\.filter\(p => \{\s*const isCombo = p\.category\.toLowerCase\(\)\.includes\('pack'\) \|\| p\.category\.toLowerCase\(\)\.includes\('combo'\) \|\| p\.name\.toLowerCase\(\)\.includes\('pack'\);\s*switch\(activeTab\) \{\s*case 'trial': return p\.variants\.some\(v => v\.size\.toLowerCase\(\)\.includes\('trial'\) \|\| v\.size\.toLowerCase\(\)\.includes\('10ml'\)\);\s*case 'gold': return p\.variants\.some\(v => v\.size\.toLowerCase\(\)\.includes\('gold'\)\);\s*case 'premium': return p\.variants\.some\(v => v\.size\.toLowerCase\(\)\.includes\('premium'\)\);\s*case 'family': return p\.variants\.some\(v => v\.size\.toLowerCase\(\)\.includes\('family'\)\);\s*case 'combo': return isCombo;\s*default: return false;\s*\}\s*\}\);\s*\}, \[products, activeTab\]\);/;

const replacement = `const filteredProducts = useMemo(() => {
      return products.filter(p => {
        const isCombo = p.category.toLowerCase().includes('pack') || p.category.toLowerCase().includes('combo') || p.name.toLowerCase().includes('pack');
        
        const hasVariant = (term) => p.variants && p.variants.some(v => v.size.toLowerCase().includes(term));
        const nameOrCat = (term) => p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term);

        switch(activeTab) {
          case 'trial': return nameOrCat('trial') || nameOrCat('starter') || hasVariant('trial') || hasVariant('10ml') || hasVariant('10 ml');
          case 'gold': return nameOrCat('gold') || hasVariant('gold') || hasVariant('15ml') || hasVariant('15 ml');
          case 'premium': return nameOrCat('premium') || nameOrCat('diamond') || hasVariant('premium') || hasVariant('diamond') || hasVariant('30ml') || hasVariant('30 ml');
          case 'family': return nameOrCat('family') || hasVariant('family');
          case 'combo': return isCombo;
          default: return false;
        }
      });
    }, [products, activeTab]);`;

c = c.replace(target, replacement);

fs.writeFileSync('src/app/(storefront)/HomepageClient.tsx', c);
console.log('Fixed offers again');
