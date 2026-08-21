const fs = require('fs');
let c = fs.readFileSync('src/data/categoryData.ts', 'utf8');

const newCategory = `
    {
      name: "Wellness Packs",
      slug: "wellness-packs",
      description: "Curated combinations of our finest products for complete holistic care.",
      subcategories: [
        { name: "Starter Packs", slug: "starter-packs" },
        { name: "Family Packs", slug: "family-packs" },
        { name: "Premium Collections", slug: "premium-collections" },
        { name: "Gift Sets", slug: "gift-sets" },
      ]
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
    }`;

// Replace the Wellness Packs object completely to insert the new one after it
c = c.replace(/\{\s*name:\s*"Wellness Packs"[\s\S]*?\]\s*\}/, newCategory.trim());

fs.writeFileSync('src/data/categoryData.ts', c);
console.log('Updated categoryData.ts');
