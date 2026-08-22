const fs = require('fs');
let c = fs.readFileSync('src/data/categoryData.ts', 'utf8');

c = c.replace(
  /\{\s*name:\s*"Natural Foods"[\s\S]*?subcategories:\s*\[[\s\S]*?\]\s*\}/g,
  `{
      name: "Natural Foods",
      slug: "natural-foods",
      description: "Pure, unprocessed natural foods for a healthy lifestyle.",
      subcategories: [
        { name: "Cold Pressed Oils", slug: "cold-pressed-oils" },
        { name: "Honey", slug: "honey" },
        { name: "Ghee", slug: "ghee" },
        { name: "Dry Fruits", slug: "dry-fruits" },
        { name: "Seeds", slug: "seeds" },
        { name: "Jaggery", slug: "jaggery" }
      ]
    }`
);

fs.writeFileSync('src/data/categoryData.ts', c);
console.log('Fixed natural foods categories');
