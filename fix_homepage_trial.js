const fs = require('fs');
let c = fs.readFileSync('src/app/(storefront)/HomepageClient.tsx', 'utf8');

c = c.replace(/case 'feet': return cat\.includes\('feet'\) \|\| isTrial;/g, "case 'feet': return cat.includes('feet');");
c = c.replace(/case 'body': return cat\.includes\('body'\) \|\| isTrial;/g, "case 'body': return cat.includes('body');");
c = c.replace(/case 'hair': return cat\.includes\('hair'\) \|\| isTrial;/g, "case 'hair': return cat.includes('hair');");

fs.writeFileSync('src/app/(storefront)/HomepageClient.tsx', c);
console.log('Fixed trial inclusion');
