import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = path.join(__dirname, '..', 'src', 'data', 'productData.ts');
let content = fs.readFileSync(file, 'utf8');

const newProducts = `
  {
    "id": "kids-body-wellness-massage-oil",
    "slug": "kids-body-wellness-massage-oil",
    "name": "Kids Body Wellness Massage Oil",
    "category": "Body Massage Oil",
    "shortDescription": "Natural Body Wellness Massage Oil crafted for kids.",
    "fullDescription": "Designed for daily body massage, relaxation, and a self-care routine. The Kids Body Wellness Massage Oil is meticulously crafted to support everyday wellness. Experience the timeless benefits of traditional oil massage rituals.",
    "story": "Rooted in traditional practices, our wellness blends are crafted using only the most pristine, cold-pressed oils.",
    "benefit": "Supports relaxation and everyday wellness.",
    "benefits": [
      { "icon": "Sparkles", "text": "Deep Nourishment" },
      { "icon": "Leaf", "text": "100% Pure & Natural" }
    ],
    "ingredients": [
      { "name": "Natural Oil Base", "botanical": "Natural Oils", "role": "Nourishing base" }
    ],
    "images": [ "/images/categories/cat_oil_wellness_1786556871303.jpg" ],
    "variants": [
      { "id": "kids-bmo-50", "size": "50 ml", "originalPrice": 399, "price": 249, "image": "/images/placeholder.jpg" },
      { "id": "kids-bmo-100", "size": "100 ml", "originalPrice": 699, "price": 449, "image": "/images/placeholder.jpg" },
      { "id": "kids-bmo-200", "size": "200 ml", "originalPrice": 1299, "price": 799, "image": "/images/placeholder.jpg" },
      { "id": "kids-bmo-500", "size": "500 ml", "originalPrice": 2999, "price": 1799, "image": "/images/placeholder.jpg" }
    ],
    "price": 249,
    "originalPrice": 399,
    "discount": 38,
    "rating": 5.0,
    "reviewCount": 0,
    "healthGoals": ["Daily Wellness", "Relaxation"],
    "idealFor": ["Kids"],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Apply to the body and gently massage."
    },
    "specifications": { "Form": "Massage Oil", "Packaging": "Amber Glass Bottle", "Purity": "100% Natural" },
    "certifications": ["100% Natural"],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "men-body-wellness-massage-oil",
    "slug": "men-body-wellness-massage-oil",
    "name": "Men Body Wellness Massage Oil",
    "category": "Body Massage Oil",
    "shortDescription": "Natural Body Wellness Massage Oil crafted for men.",
    "fullDescription": "Designed for daily body massage, relaxation, and a self-care routine. The Men Body Wellness Massage Oil is meticulously crafted to support everyday wellness. Experience the timeless benefits of traditional oil massage rituals.",
    "story": "Rooted in traditional practices, our wellness blends are crafted using only the most pristine, cold-pressed oils.",
    "benefit": "Supports relaxation and everyday wellness.",
    "benefits": [
      { "icon": "Sparkles", "text": "Deep Nourishment" },
      { "icon": "Leaf", "text": "100% Pure & Natural" }
    ],
    "ingredients": [
      { "name": "Natural Oil Base", "botanical": "Natural Oils", "role": "Nourishing base" }
    ],
    "images": [ "/images/categories/cat_oil_wellness_1786556871303.jpg" ],
    "variants": [
      { "id": "men-bmo-50", "size": "50 ml", "originalPrice": 399, "price": 249, "image": "/images/placeholder.jpg" },
      { "id": "men-bmo-100", "size": "100 ml", "originalPrice": 699, "price": 449, "image": "/images/placeholder.jpg" },
      { "id": "men-bmo-200", "size": "200 ml", "originalPrice": 1299, "price": 799, "image": "/images/placeholder.jpg" },
      { "id": "men-bmo-500", "size": "500 ml", "originalPrice": 2999, "price": 1799, "image": "/images/placeholder.jpg" }
    ],
    "price": 249,
    "originalPrice": 399,
    "discount": 38,
    "rating": 5.0,
    "reviewCount": 0,
    "healthGoals": ["Daily Wellness", "Relaxation"],
    "idealFor": ["Men"],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Apply to the body and gently massage."
    },
    "specifications": { "Form": "Massage Oil", "Packaging": "Amber Glass Bottle", "Purity": "100% Natural" },
    "certifications": ["100% Natural"],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "women-body-wellness-massage-oil",
    "slug": "women-body-wellness-massage-oil",
    "name": "Women Body Wellness Massage Oil",
    "category": "Body Massage Oil",
    "shortDescription": "Natural Body Wellness Massage Oil crafted for women.",
    "fullDescription": "Designed for daily body massage, relaxation, and a self-care routine. The Women Body Wellness Massage Oil is meticulously crafted to support everyday wellness. Experience the timeless benefits of traditional oil massage rituals.",
    "story": "Rooted in traditional practices, our wellness blends are crafted using only the most pristine, cold-pressed oils.",
    "benefit": "Supports relaxation and everyday wellness.",
    "benefits": [
      { "icon": "Sparkles", "text": "Deep Nourishment" },
      { "icon": "Leaf", "text": "100% Pure & Natural" }
    ],
    "ingredients": [
      { "name": "Natural Oil Base", "botanical": "Natural Oils", "role": "Nourishing base" }
    ],
    "images": [ "/images/categories/cat_oil_wellness_1786556871303.jpg" ],
    "variants": [
      { "id": "women-bmo-50", "size": "50 ml", "originalPrice": 399, "price": 249, "image": "/images/placeholder.jpg" },
      { "id": "women-bmo-100", "size": "100 ml", "originalPrice": 699, "price": 449, "image": "/images/placeholder.jpg" },
      { "id": "women-bmo-200", "size": "200 ml", "originalPrice": 1299, "price": 799, "image": "/images/placeholder.jpg" },
      { "id": "women-bmo-500", "size": "500 ml", "originalPrice": 2999, "price": 1799, "image": "/images/placeholder.jpg" }
    ],
    "price": 249,
    "originalPrice": 399,
    "discount": 38,
    "rating": 5.0,
    "reviewCount": 0,
    "healthGoals": ["Daily Wellness", "Relaxation"],
    "idealFor": ["Women"],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Apply to the body and gently massage."
    },
    "specifications": { "Form": "Massage Oil", "Packaging": "Amber Glass Bottle", "Purity": "100% Natural" },
    "certifications": ["100% Natural"],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "senior-body-wellness-massage-oil",
    "slug": "senior-body-wellness-massage-oil",
    "name": "Senior Body Wellness Massage Oil",
    "category": "Body Massage Oil",
    "shortDescription": "Natural Body Wellness Massage Oil crafted for seniors.",
    "fullDescription": "Designed for daily body massage, relaxation, and a self-care routine. The Senior Body Wellness Massage Oil is meticulously crafted to support everyday wellness. Experience the timeless benefits of traditional oil massage rituals.",
    "story": "Rooted in traditional practices, our wellness blends are crafted using only the most pristine, cold-pressed oils.",
    "benefit": "Supports relaxation and everyday wellness.",
    "benefits": [
      { "icon": "Sparkles", "text": "Deep Nourishment" },
      { "icon": "Leaf", "text": "100% Pure & Natural" }
    ],
    "ingredients": [
      { "name": "Natural Oil Base", "botanical": "Natural Oils", "role": "Nourishing base" }
    ],
    "images": [ "/images/categories/cat_oil_wellness_1786556871303.jpg" ],
    "variants": [
      { "id": "senior-bmo-50", "size": "50 ml", "originalPrice": 399, "price": 249, "image": "/images/placeholder.jpg" },
      { "id": "senior-bmo-100", "size": "100 ml", "originalPrice": 699, "price": 449, "image": "/images/placeholder.jpg" },
      { "id": "senior-bmo-200", "size": "200 ml", "originalPrice": 1299, "price": 799, "image": "/images/placeholder.jpg" },
      { "id": "senior-bmo-500", "size": "500 ml", "originalPrice": 2999, "price": 1799, "image": "/images/placeholder.jpg" }
    ],
    "price": 249,
    "originalPrice": 399,
    "discount": 38,
    "rating": 5.0,
    "reviewCount": 0,
    "healthGoals": ["Daily Wellness", "Relaxation"],
    "idealFor": ["Seniors"],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Apply to the body and gently massage."
    },
    "specifications": { "Form": "Massage Oil", "Packaging": "Amber Glass Bottle", "Purity": "100% Natural" },
    "certifications": ["100% Natural"],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
`;

const insertIndex = content.indexOf('export const products: Product[] = [') + 'export const products: Product[] = ['.length;
content = content.slice(0, insertIndex) + newProducts + content.slice(insertIndex);

fs.writeFileSync(file, content, 'utf8');
console.log('Products inserted.');
