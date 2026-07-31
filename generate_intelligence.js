import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsDir = path.join(__dirname, 'AYURDHARA', '02_Products');
const outPath = path.join(__dirname, 'AYURDHARA', '07_Product_Intelligence_Database.md');

const files = fs.readdirSync(productsDir).filter(f => f.endsWith('.json'));

let markdown = `# AYURDHARA DIVYA SHAKTI: PRODUCT INTELLIGENCE DATABASE\n\n`;
markdown += `*Generated automatically from the brand repository. Total Products: ${files.length}*\n\n---\n\n`;

files.forEach(file => {
    const raw = fs.readFileSync(path.join(productsDir, file), 'utf8');
    const p = JSON.parse(raw);

    // Derive accent color and target customer
    let accentColor = 'Premium Gold';
    let targetCustomer = 'All adults seeking natural wellness.';
    let ageGroup = 'Adults 25-60';
    let gender = 'Unisex';
    
    if (p.category.toLowerCase().includes('kids')) {
        accentColor = 'Sage Green (#8BC34A)';
        targetCustomer = 'Parents seeking safe, natural wellness for their children.';
        ageGroup = 'Children 3-12';
        gender = 'Unisex (Kids)';
    } else if (p.category.toLowerCase().includes('men')) {
        accentColor = 'Navy Blue (#1A237E)';
        targetCustomer = 'Men prioritizing strength, balance, and daily vitality.';
        ageGroup = 'Adult Men 25-55';
        gender = 'Male';
    } else if (p.category.toLowerCase().includes('women')) {
        accentColor = 'Elegant Rose (#880E4F)';
        targetCustomer = 'Women seeking holistic balance, beauty, and wellness.';
        ageGroup = 'Adult Women 20-55';
        gender = 'Female';
    } else if (p.category.toLowerCase().includes('senior')) {
        accentColor = 'Walnut Brown (#4E342E)';
        targetCustomer = 'Seniors needing gentle, comforting daily care.';
        ageGroup = 'Seniors 55+';
        gender = 'Unisex (Seniors)';
    }

    const isPack = p.category.toLowerCase().includes('pack') || p.category.toLowerCase().includes('combo');
    const bottleType = isPack ? 'Multiple Amber Bottles (Boxed Set)' : 'Amber Brown Glass Bottle';
    const capType = isPack ? 'Varies by bottle' : 'Matte Black Ribbed Cap';

    markdown += `## ${p.name.toUpperCase()}\n\n`;

    markdown += `### 1. BASIC INFORMATION\n`;
    markdown += `- **Product Name:** ${p.name}\n`;
    markdown += `- **Product Category:** ${p.category}\n`;
    markdown += `- **Variant:** ${p.slug}\n`;
    markdown += `- **Product Code / SKU:** SKU-${p.slug.toUpperCase().substring(0, 8)}\n`;
    markdown += `- **Launch Status:** Active\n`;
    markdown += `- **Sizes/Volumes:** ${p.variants.map(v => v.size).join(', ')}\n`;
    markdown += `- **Product Type:** Ayurvedic Oil Blend ${isPack ? '(Combo Pack)' : ''}\n\n`;

    markdown += `### 2. PRODUCT PURPOSE\n`;
    markdown += `- **Primary Purpose:** ${p.shortDescription}\n`;
    markdown += `- **Target Health Goal:** ${p.healthGoals.join(', ')}\n`;
    markdown += `- **Expected Customer Outcome:** ${p.benefit}\n`;
    markdown += `- **Unique Selling Proposition:** 100% pure Ayurvedic formulation tailored specifically for ${gender.toLowerCase()}.\n\n`;

    markdown += `### 3. TARGET CUSTOMER\n`;
    markdown += `- **Age Group:** ${ageGroup}\n`;
    markdown += `- **Gender:** ${gender}\n`;
    markdown += `- **Lifestyle:** Health-conscious, values natural premium products.\n`;
    markdown += `- **Pain Points:** Needs authentic, chemical-free solutions for ${p.healthGoals[0] || 'daily wellness'}.\n`;
    markdown += `- **Luxury Positioning:** Premium accessible wellness.\n\n`;

    markdown += `### 4. INGREDIENTS\n`;
    if (p.ingredients && p.ingredients.length > 0) {
        markdown += `- **Hero Ingredient:** ${p.ingredients[0].name} (${p.ingredients[0].botanical})\n`;
        markdown += `- **Supporting Ingredients:** ${p.ingredients.slice(1).map(i => i.name).join(', ')}\n`;
        markdown += `- **Ingredient Story:** Carefully selected cold-pressed and botanical extracts providing a nourishing base.\n`;
    } else {
        markdown += `- *Ingredient data missing or is a combo pack.*\n`;
    }
    markdown += `\n`;

    markdown += `### 5. BRAND STORY\n`;
    markdown += `- **Why does this product exist?** ${p.story}\n`;
    markdown += `- **What emotions should it create?** Trust, calm, and reassurance.\n`;
    markdown += `- **What should customers feel while holding it?** The weight of premium quality and ancient wisdom.\n\n`;

    markdown += `### 6. VISUAL DIRECTION\n`;
    markdown += `- **Recommended Accent Color:** ${accentColor}\n`;
    markdown += `- **Recommended Botanical Illustration:** 19th-century scientific engraving of ${p.ingredients && p.ingredients.length > 0 ? p.ingredients[0].name : 'Ayurvedic Herbs'}.\n`;
    markdown += `- **Mood:** Clinical, Calming, Premium.\n`;
    markdown += `- **Visual Keywords:** Elegant, Traditional, Modern.\n\n`;

    markdown += `### 7. PACKAGING\n`;
    markdown += `- **Bottle Type:** ${bottleType}\n`;
    markdown += `- **Bottle Material:** Heavy Amber Glass\n`;
    markdown += `- **Cap Type:** ${capType}\n`;
    markdown += `- **Label Size:** Varies by volume (e.g., 38x45mm for 10ml)\n`;
    markdown += `- **Outer Box:** 350 GSM White Duplex, Premium Matte.\n\n`;

    markdown += `### 8. PHOTOGRAPHY DIRECTION\n`;
    markdown += `- **Recommended Background:** Soft natural stone or warm cream linen.\n`;
    markdown += `- **Lighting:** Diffused softbox, single continuous reflection.\n`;
    markdown += `- **Props:** Raw ingredients related to the blend. Minimalist styling.\n\n`;

    markdown += `### 9. WEBSITE\n`;
    markdown += `- **Collection Category:** ${p.category}\n`;
    markdown += `- **Product Page Style:** Sticky hero image, clean accordion details.\n`;
    markdown += `- **SEO Keywords:** Ayurvedic oil for ${p.healthGoals.join(', ')}, natural wellness.\n\n`;

    markdown += `### 10. MARKETING\n`;
    markdown += `- **Key Benefits:** ${p.benefits.map(b => b.text).join(', ')}\n`;
    markdown += `- **Short Description:** ${p.shortDescription}\n`;
    markdown += `- **Tagline:** Natural Wellness, Every Day.\n\n`;

    markdown += `### 11. PRINT INFORMATION\n`;
    markdown += `- **Required Warnings:** External use only. Patch test recommended.\n`;
    markdown += `- **Directions:** ${p.usageInstructions ? p.usageInstructions.instructions : 'Apply directly to navel or affected area.'}\n`;
    markdown += `- **Barcode & QR:** Yes (Back bottom left/right).\n\n`;

    markdown += `### 12. DESIGN PRIORITY\n`;
    markdown += `- Minimal: 9/10\n`;
    markdown += `- Luxury: 10/10\n`;
    markdown += `- Clinical: 8/10\n`;
    markdown += `- Traditional: 7/10\n\n`;

    markdown += `### 13. IMAGE GENERATION NOTES\n`;
    markdown += `- **Emphasize:** Whitespace, precise typography (Cinzel/Montserrat), amber glass texture.\n`;
    markdown += `- **Never Appear:** Clipart, loud colors, cluttered layouts.\n`;
    markdown += `- **Premium Cues:** Matte labels, gold foil accents, ribbed cap details.\n\n`;

    markdown += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
});

fs.writeFileSync(outPath, markdown);
console.log('Database generated at', outPath);
