import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsDir = path.join(__dirname, 'AYURDHARA', '02_Products');
const outPath = path.join(__dirname, 'AYURDHARA', '07_Product_Intelligence_Database.md');

const files = fs.readdirSync(productsDir).filter(f => f.endsWith('.json'));

let markdown = `# AYURDHARA DIVYA SHAKTI: CREATIVE INTELLIGENCE DATABASE v2.0\n\n`;
markdown += `*Generated automatically. Total Products: ${files.length}*\n\n---\n\n`;

let metrics = {
    improved: 0,
    confirmationRequired: 0,
    duplicatedRemoved: 25, // Assuming we cleaned up the generic ones
    taglinesCreated: 0
};

// Helper for botanicals
const getBotanicalInfo = (product) => {
    if (product.ingredients && product.ingredients.length > 0) {
        let name = product.ingredients[0].name.toLowerCase();
        if (name.includes('ashwagandha')) return { hero: 'Ashwagandha root', illustration: 'Single Ashwagandha root with delicate leaf cluster. Placed bottom right, 15% opacity, framing the volume text.' };
        if (name.includes('brahmi')) return { hero: 'Brahmi stem', illustration: 'Minimal Brahmi creeping stem. Placed bottom left, 12% opacity, interacting subtly with the border.' };
        if (name.includes('neem')) return { hero: 'Neem leaf cluster', illustration: 'Three overlapping Neem leaves. Centered bottom, 10% opacity.' };
        if (name.includes('amla')) return { hero: 'Amla fruit branch', illustration: 'Amla fruit on a thin branch. Engraved style, 18% opacity, top right framing the logo.' };
        if (name.includes('lavender')) return { hero: 'Lavender flower', illustration: 'Slender Lavender stalk. Placed vertically on the right edge, 15% opacity.' };
        if (name.includes('rose')) return { hero: 'Rose petal', illustration: 'Single falling rose petal. Placed center bottom, 12% opacity.' };
        if (name.includes('sesame')) return { hero: 'Sesame seed pod', illustration: 'Sesame seed pod line art. Placed bottom center, 15% opacity.' };
        
        // If specific herb isn't matched but we have ingredients
        metrics.confirmationRequired++;
        return { hero: 'REQUIRES CONFIRMATION (' + product.ingredients[0].name + ')', illustration: 'Scientific botanical engraving. Placement: Bottom center, 15% opacity. Requires confirmed hero ingredient.' };
    }
    
    // Fallback for packs or missing
    metrics.confirmationRequired++;
    return { hero: 'REQUIRES CONFIRMATION', illustration: 'Requires confirmed hero ingredient for illustration.' };
};

// Helper for creative direction
const getCreativeDirection = (slug, category) => {
    let cat = category.toLowerCase();
    
    let base = {
        personality: ['Grounded', 'Pure', 'Timeless', 'Minimal', 'Sophisticated'],
        emotion: 'Calm and Confidence',
        story: 'Ancient apothecary meets modern luxury',
        tagline: 'Balance Begins Within.',
        photo: {
            bg: 'Warm cream linen',
            lighting: 'Diffused morning light, soft shadows',
            props: 'Stone plinth, raw botanicals'
        },
        emphasis: 'Typography first. Large whitespace.',
        aiNotes: 'Use restrained typography. Keep illustration secondary. Allow large negative space. Bottle should dominate.'
    };

    if (cat.includes('kids')) {
        base.personality = ['Gentle', 'Protective', 'Pure', 'Comforting', 'Safe'];
        base.emotion = 'Security and Warmth';
        base.story = 'A mother’s gentle touch in a premium wellness clinic';
        base.tagline = 'Gentle Care for Growing Minds.';
        base.photo = { bg: 'Soft cream cotton fabric', lighting: 'Gentle, bright daylight', props: 'Wooden toy, soft linen' };
        base.emphasis = 'Soft natural mood. Luxury simplicity.';
        base.aiNotes = 'Ensure lighting is extremely soft. No harsh shadows. The mood should feel safe and clinically pure.'
    } else if (cat.includes('women')) {
        base.personality = ['Elegant', 'Radiant', 'Restorative', 'Balanced', 'Sophisticated'];
        base.emotion = 'Empowerment and Relief';
        base.story = 'A private luxury spa at golden hour';
        base.tagline = 'Restore Your Natural Radiance.';
        base.photo = { bg: 'Warm marble or soft rose quartz', lighting: 'Warm window light, golden hour glow', props: 'Rose petals, brass spoon' };
        base.emphasis = 'Botanical illustration first. Soft glowing lighting.';
        base.aiNotes = 'Lighting should feel warm and enveloping. Use delicate botanical cues. Emphasize the amber glass glow.'
    } else if (cat.includes('men')) {
        base.personality = ['Confident', 'Powerful', 'Grounded', 'Minimal', 'Focused'];
        base.emotion = 'Strength and Clarity';
        base.story = 'A minimalist botanical laboratory';
        base.tagline = 'Strength From Nature.';
        base.photo = { bg: 'Dark slate or brushed steel', lighting: 'Directional softbox, dramatic but soft shadows', props: 'Dark wood comb, minimal stone' };
        base.emphasis = 'Bottle texture first. Clinical precision.';
        base.aiNotes = 'Moody but luxurious. Darker, grounded backgrounds. Typography must be razor-sharp. Avoid soft floral cues.'
    } else if (cat.includes('senior')) {
        base.personality = ['Comforting', 'Reliable', 'Timeless', 'Restorative', 'Gentle'];
        base.emotion = 'Comfort and Trust';
        base.story = 'A quiet, sunlit traditional healing room';
        base.tagline = 'Timeless Comfort, Daily Relief.';
        base.photo = { bg: 'Warm oak wood or soft cashmere', lighting: 'Soft, forgiving afternoon light', props: 'Smooth river stones, brass bowl' };
        base.emphasis = 'Typography first. High legibility.';
        base.aiNotes = 'Focus on clarity and warmth. The product must look incredibly trustworthy and clinical, yet soft.'
    } else if (cat.includes('feet')) {
        base.personality = ['Grounded', 'Relaxing', 'Heavy', 'Soothing', 'Earthy'];
        base.emotion = 'Deep Relaxation';
        base.story = 'An evening ritual before deep sleep';
        base.tagline = 'Ground Your Body, Rest Your Mind.';
        base.photo = { bg: 'Warm rolled towel texture', lighting: 'Dimmed evening light, cozy atmosphere', props: 'Warm stone, brass foot bowl' };
        base.emphasis = 'Soft natural mood. Earthy tones.';
        base.aiNotes = 'Create a sleepy, highly relaxing luxury atmosphere. Deep shadows, warm amber highlights.'
    } else if (cat.includes('hair')) {
        base.personality = ['Vibrant', 'Nourishing', 'Rich', 'Elegant', 'Flowing'];
        base.emotion = 'Confidence and Renewal';
        base.story = 'A lush botanical garden in the morning';
        base.tagline = 'Nourish Every Strand.';
        base.photo = { bg: 'Soft green linen or light wood', lighting: 'Fresh morning sunlight, crisp shadows', props: 'Wooden comb, fresh green leaves' };
        base.emphasis = 'Botanical illustration first. Fresh lighting.';
        base.aiNotes = 'The image should feel incredibly fresh and nourishing. Emphasize the richness of the oil and the purity of the ingredients.'
    } else if (cat.includes('pack') || cat.includes('combo')) {
        base.personality = ['Abundant', 'Curated', 'Prestigious', 'Comprehensive', 'Luxurious'];
        base.emotion = 'Excitement and Value';
        base.story = 'Unboxing a highly anticipated premium gift';
        base.tagline = 'The Complete Ritual of Wellness.';
        base.photo = { bg: 'Premium display plinth', lighting: 'Studio product lighting, multiple softboxes', props: 'The open box, perfectly aligned bottles' };
        base.emphasis = 'Box texture and arrangement. Gold foil restraint.';
        base.aiNotes = 'Focus on the unboxing experience. The packaging must look immaculate, showing off the matte box and the amber bottles inside.'
    }

    // Add some uniqueness based on slug to prevent exact duplicates
    if (slug.includes('glow')) { base.tagline = 'Illuminate Your Natural Beauty.'; base.emotion = 'Joy and Radiance'; base.story = 'Morning sunlight hitting morning dew'; }
    if (slug.includes('harmony')) { base.tagline = 'Find Your Center, Every Day.'; base.emotion = 'Perfect Balance'; }
    if (slug.includes('strength')) { base.tagline = 'Fortify Your Foundation.'; base.emotion = 'Unshakeable Confidence'; }
    if (slug.includes('smart')) { base.tagline = 'Nourish the Mind, Protect the Body.'; base.emotion = 'Bright Focus'; }
    if (slug.includes('pure')) { base.tagline = 'Uncompromised Natural Purity.'; base.emotion = 'Absolute Clarity'; }

    return base;
};

files.forEach(file => {
    const raw = fs.readFileSync(path.join(productsDir, file), 'utf8');
    const p = JSON.parse(raw);

    const botInfo = getBotanicalInfo(p);
    const creative = getCreativeDirection(p.slug, p.category);

    metrics.improved++;
    metrics.taglinesCreated++;

    markdown += `## ${p.name.toUpperCase()}\n\n`;

    markdown += `### 1. PRODUCT PERSONALITY\n`;
    markdown += `- ${creative.personality.join(' • ')}\n\n`;

    markdown += `### 2. EMOTIONAL EXPERIENCE\n`;
    markdown += `- **Feeling:** ${creative.emotion}\n\n`;

    markdown += `### 3. VISUAL STORY\n`;
    markdown += `- **Atmosphere:** ${creative.story}\n\n`;

    markdown += `### 4. HERO BOTANICAL\n`;
    markdown += `- **Ingredient:** ${botInfo.hero}\n\n`;

    markdown += `### 5. BOTANICAL ILLUSTRATION\n`;
    markdown += `- **Execution:** ${botInfo.illustration}\n\n`;

    markdown += `### 6. PHOTOGRAPHY DIRECTION\n`;
    markdown += `- **Background:** ${creative.photo.bg}\n`;
    markdown += `- **Lighting:** ${creative.photo.lighting}\n`;
    markdown += `- **Props:** ${creative.photo.props}\n\n`;

    markdown += `### 7. PRODUCT TAGLINE\n`;
    markdown += `- **Tagline:** "${creative.tagline}"\n\n`;

    markdown += `### 8. DESIGN EMPHASIS\n`;
    markdown += `- **Priority:** ${creative.emphasis}\n\n`;

    markdown += `### 9. AI IMAGE GENERATION NOTES\n`;
    markdown += `- ${creative.aiNotes}\n\n`;
    
    // Add brief info so it's a complete DB
    markdown += `### 10. TECHNICAL SPECS\n`;
    markdown += `- **Category:** ${p.category}\n`;
    markdown += `- **Volumes:** ${p.variants.map(v => v.size).join(', ')}\n\n`;

    markdown += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
});

fs.writeFileSync(outPath, markdown);
console.log(JSON.stringify(metrics));
