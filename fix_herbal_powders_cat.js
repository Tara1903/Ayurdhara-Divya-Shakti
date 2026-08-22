const fs = require('fs');
let c = fs.readFileSync('src/data/categoryData.ts', 'utf8');

c = c.replace(
  /\{\s*name:\s*"Single Herb Powders",\s*slug:\s*"single-herb-powders"\s*\}/g,
  `{ name: "Single Herb Powder", slug: "single-herb-powder" }`
);

fs.writeFileSync('src/data/categoryData.ts', c);
console.log('Fixed categories');
