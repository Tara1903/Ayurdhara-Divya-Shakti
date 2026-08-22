const fs = require('fs');
let c = fs.readFileSync('src/data/categoryData.ts', 'utf8');

c = c.replace(
  /\{\s*name:\s*"Herbal Tea",\s*slug:\s*"herbal-tea"\s*\}/g,
  `{ name: "Herbal Teas", slug: "herbal-teas" }`
);

fs.writeFileSync('src/data/categoryData.ts', c);
console.log('Fixed categories');
