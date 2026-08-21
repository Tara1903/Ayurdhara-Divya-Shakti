const fs = require('fs');
let c = fs.readFileSync('src/data/categoryData.ts', 'utf8');

const replacement = `    ]
  },
  {
    name: "Natural Fragrance & Essential Oils",
    slug: "natural-fragrance-essential-oils",
    description: "Pure-inspired aromas and essential oils for everyday self-care, relaxation and natural living.",
    subcategories: [
      { name: "Essential Oils", slug: "essential-oils" },
      { name: "Natural Fragrance", slug: "natural-fragrance" },
      { name: "Wellness Aroma", slug: "wellness-aroma" },
      { name: "Diffuser Blends", slug: "diffuser-blends" },
      { name: "Essential Oil Combos", slug: "essential-oil-combos" }
    ]
  }
];

export const wellnessGuideLinks`;

c = c.replace(/\]\s*\}\s*\];\s*export const wellnessGuideLinks/, replacement);
fs.writeFileSync('src/data/categoryData.ts', c);
