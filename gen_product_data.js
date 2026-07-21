const fs = require('fs');

const html = fs.readFileSync('products_html.txt', 'utf8');

// Simple regex to extract products
const productRegex = /<div class="col-product-card[^>]*data-category="([^"]*)"[^>]*data-price="([^"]*)"[^>]*data-name="([^"]*)"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g;

const products = [];

let match;
while ((match = productRegex.exec(html)) !== null) {
  const categoryId = match[1];
  const price = parseInt(match[2]);
  const name = match[3];
  const innerHtml = match[4];
  
  // Extract benefit
  const benefitMatch = innerHtml.match(/<span class="col-card-benefit">([^<]+)<\/span>/);
  const benefit = benefitMatch ? benefitMatch[1] : '';
  
  // Extract images
  const imgMatches = [...innerHtml.matchAll(/data-img="([^"]+)"/g)];
  let images = imgMatches.map(m => m[1]);
  if (images.length === 0) {
     const mainImgMatch = innerHtml.match(/<img src="([^"]+)"/);
     if (mainImgMatch) images.push(mainImgMatch[1]);
  }
  // Deduplicate images
  images = [...new Set(images)];
  
  // Extract original price
  const mrpMatch = innerHtml.match(/data-mrp="([^"]+)"/);
  const originalPrice = mrpMatch ? parseInt(mrpMatch[1]) : Math.round(price * 1.5);
  // Extract variants
  const variants = [];
  const variantRegex = /<button class="variant-pill[^"]*"[^>]*data-price="([^"]*)"[^>]*data-mrp="([^"]*)"[^>]*data-img="([^"]*)"[^>]*>\s*(.*?)\s*<\/button>/g;
  let varMatch;
  while ((varMatch = variantRegex.exec(innerHtml)) !== null) {
    variants.push({
      size: varMatch[4].trim(),
      price: parseInt(varMatch[1]),
      originalPrice: parseInt(varMatch[2]),
      image: varMatch[3]
    });
  }
  
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  products.push({
    id: slug,
    slug: slug,
    name: name,
    category: categoryId === 'kids' || categoryId === 'men' || categoryId === 'women' || categoryId === 'senior' ? 'Nabhi Oil Blend' : categoryId === 'feet' ? 'Feet Wellness Oil' : 'Premium Combo',
    shortDescription: benefit,
    fullDescription: `Ayurdhara Divya Shakti ${name} is a 100% natural, cold-pressed formulation designed specifically for your daily routine.`,
    story: `Wellness is a journey. We created the ${name} to ensure that you have access to premium Ayurvedic care. It's an investment in your daily vitality.`,
    benefit: benefit,
    benefits: [
      { icon: "Sparkles", text: "100% Natural Formulation" },
      { icon: "Shield", text: "Safe for Daily Use" }
    ],
    ingredients: [
      { 
        name: "Premium Cold-Pressed Base Oil", 
        botanical: "Ayurvedic Base", 
        role: "Nourishes deeply and acts as a carrier for the therapeutic herbs.",
      }
    ],
    images: images,
    variants: variants,
    price: price,
    originalPrice: originalPrice,
    discount: Math.round(((originalPrice - price) / originalPrice) * 100),
    rating: 4.8,
    reviewCount: 124,
    healthGoals: ["Overall Wellness"],
    idealFor: ["Daily use for optimal wellness"],
    usageInstructions: {
      serving: "2-3 drops / Varies by product",
      timing: "Nightly, before bedtime",
      instructions: "Apply 2-3 drops into the navel or massage onto the soles of the feet before bed."
    },
    specifications: {
      "Net Quantity": "Varies by variant",
      "Form": "Cold-pressed Oil",
      "Diet Preference": "Vegetarian, Vegan",
      "Shelf Life": "24 Months",
      "Country of Origin": "India"
    },
    certifications: [
      "Ayurvedic Formulation",
      "100% Natural",
      "Made in India"
    ],
    faqs: [
      { question: "Is this safe for daily use?", answer: "Yes, our blends are formulated with 100% natural, cold-pressed oils and are completely safe for daily use." }
    ],
    relatedProductIds: [],
    routineProductIds: []
  });
}

// Generate the TypeScript file
let tsCode = `export interface ProductVariant {
  size: string;
  price: number;
  originalPrice: number;
  image: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  story: string;
  benefit: string;
  benefits: { icon: string; text: string }[];
  ingredients: { name: string; botanical: string; role: string; image?: string }[];
  images: string[];
  variants: ProductVariant[];
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  healthGoals: string[];
  idealFor: string[];
  usageInstructions: { serving: string; timing: string; instructions: string };
  specifications: Record<string, string>;
  certifications: string[];
  faqs: { question: string; answer: string }[];
  relatedProductIds: string[];
  routineProductIds: string[];
}

export const products: Product[] = ${JSON.stringify(products, null, 2)};

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return products.map(p => p.slug);
}
`;

fs.writeFileSync('src/data/productData.ts', tsCode);
console.log(`Generated ${products.length} products`);
