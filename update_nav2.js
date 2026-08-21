const fs = require('fs');
let c = fs.readFileSync('src/data/categoryData.ts', 'utf8');

c = c.replace(/name: "Wellness Combos",\s*slug: "wellness-combos",/, 'name: "Wellness Packs",\n      slug: "wellness-packs",');

const newCategory = `
    },
    {
      name: "Natural Fragrance & Essential Oils",
      slug: "natural-fragrance-and-essential-oils",
      description: "Pure-inspired aromas and essential oils for everyday self-care, relaxation and natural living.",
      subcategories: [
        { name: "Essential Oils", slug: "essential-oils" },
        { name: "Natural Fragrance", slug: "natural-fragrance" },
        { name: "Wellness Aroma", slug: "wellness-aroma" },
        { name: "Diffuser Blends", slug: "diffuser-blends" },
        { name: "Essential Oil Combos", slug: "essential-oil-combos" }
      ]
    }
  ];`;

c = c.replace(/    \}\n  \];/, newCategory.trim());

fs.writeFileSync('src/data/categoryData.ts', c);
console.log('Updated categoryData.ts');
