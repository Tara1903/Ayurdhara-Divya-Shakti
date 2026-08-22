const fs = require('fs');
let c = fs.readFileSync('src/app/(storefront)/HomepageClient.tsx', 'utf8');

c = c.replace(
  /const hasVariant = \(term\) =>/g,
  'const hasVariant = (term: string) =>'
);
c = c.replace(
  /const nameOrCat = \(term\) =>/g,
  'const nameOrCat = (term: string) =>'
);

fs.writeFileSync('src/app/(storefront)/HomepageClient.tsx', c);
console.log('Fixed implicit any');
