import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

const SINGLE_HERB_POWDER = [
  { name: 'Ashwagandha Powder', slug: 'ashwagandha-powder', cat: 'Single Herb Powder', desc: 'Finely powdered ashwagandha root, presented as a single botanical ingredient.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [149, 269, 599, 999], prices: [129, 229, 499, 849], ingredients: '100% Ashwagandha Powder' },
  { name: 'Shatavari Powder', slug: 'shatavari-powder', cat: 'Single Herb Powder', desc: 'Fine shatavari root powder prepared as a single botanical ingredient.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [169, 299, 699, 1099], prices: [149, 259, 599, 949], ingredients: '100% Shatavari Powder' },
  { name: 'Brahmi Powder', slug: 'brahmi-powder', cat: 'Single Herb Powder', desc: 'Finely powdered brahmi herb with a naturally herbal character.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [139, 249, 549, 899], prices: [119, 209, 469, 769], ingredients: '100% Brahmi Powder' },
  { name: 'Amla Powder', slug: 'amla-powder', cat: 'Single Herb Powder', desc: 'Finely powdered dried amla with its naturally tangy botanical character.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [99, 179, 399, 699], prices: [85, 149, 339, 599], ingredients: '100% Amla Powder' },
  { name: 'Moringa Powder', slug: 'moringa-powder', cat: 'Single Herb Powder', desc: 'Finely powdered moringa leaves with a naturally green herbal profile.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [99, 179, 399, 699], prices: [85, 149, 339, 599], ingredients: '100% Moringa Powder' },
  { name: 'Turmeric Powder', slug: 'turmeric-powder', cat: 'Single Herb Powder', desc: 'Finely ground turmeric with its naturally warm colour and characteristic earthy aroma.', sizes: ['100 g', '250 g', '500 g', '1 kg'], mrps: [79, 179, 329, 599], prices: [69, 149, 279, 499], ingredients: '100% Turmeric Powder' },
  { name: 'Neem Powder', slug: 'neem-powder', cat: 'Single Herb Powder', desc: 'Finely powdered neem leaves presented as a single botanical ingredient.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [89, 159, 349, 649], prices: [75, 135, 299, 549], ingredients: '100% Neem Powder' },
  { name: 'Giloy Powder', slug: 'giloy-powder', cat: 'Single Herb Powder', desc: 'Finely powdered dried giloy stem presented as a traditional botanical ingredient.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [99, 179, 399, 699], prices: [85, 149, 339, 599], ingredients: '100% Giloy Powder' },
  { name: 'Mulethi Powder', slug: 'mulethi-powder', cat: 'Single Herb Powder', desc: 'Finely powdered mulethi root with its naturally sweet and earthy character.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [99, 179, 399, 699], prices: [85, 149, 339, 599], ingredients: '100% Mulethi Powder' },
  { name: 'Hibiscus Powder', slug: 'hibiscus-powder', cat: 'Single Herb Powder', desc: 'Finely powdered hibiscus flowers with a naturally floral botanical profile.', sizes: ['50 g', '100 g', '250 g'], mrps: [129, 229, 499], prices: [109, 199, 429], ingredients: '100% Hibiscus Powder' }
];

const WELLNESS_POWDER_BLENDS = [
  { name: 'Daily Herbal Blend', slug: 'daily-herbal-blend', cat: 'Wellness Powder Blends', desc: 'A balanced botanical powder blend created for a simple everyday wellness routine.', sizes: ['100 g', '250 g', '500 g'], mrps: [249, 499, 899], prices: [219, 429, 769], ingredients: 'Amla, Moringa, Tulsi, Ginger' },
  { name: 'Calm Herbal Blend', slug: 'calm-herbal-blend', cat: 'Wellness Powder Blends', desc: 'A gentle botanical blend with a naturally mild and floral character.', sizes: ['100 g', '250 g', '500 g'], mrps: [299, 599, 999], prices: [259, 519, 849], ingredients: 'Brahmi, Chamomile, Rose' },
  { name: 'Active Herbal Blend', slug: 'active-herbal-blend', cat: 'Wellness Powder Blends', desc: 'A thoughtfully combined botanical powder blend for an active everyday lifestyle.', sizes: ['100 g', '250 g', '500 g'], mrps: [299, 599, 999], prices: [259, 519, 849], ingredients: 'Ashwagandha, Moringa, Amla' },
  { name: 'Women\'s Wellness Blend', slug: 'womens-wellness-blend', cat: 'Wellness Powder Blends', desc: 'A botanical blend created around a simple women-focused wellness routine.', sizes: ['100 g', '250 g', '500 g'], mrps: [299, 599, 999], prices: [259, 519, 849], ingredients: 'Shatavari, Amla, Rose' },
  { name: 'Senior Wellness Blend', slug: 'senior-wellness-blend', cat: 'Wellness Powder Blends', desc: 'A simple botanical powder blend designed around an everyday senior wellness lifestyle.', sizes: ['100 g', '250 g', '500 g'], mrps: [299, 599, 999], prices: [259, 519, 849], ingredients: 'Amla, Moringa, Brahmi' }
];

const SUPERFOOD_POWDERS = [
  { name: 'Moringa Superfood Powder', slug: 'moringa-superfood-powder', cat: 'Superfood Powders', desc: 'Fine moringa leaf powder with a naturally green colour and earthy botanical character.', sizes: ['100 g', '250 g', '500 g'], mrps: [199, 449, 799], prices: [169, 379, 679], ingredients: '100% Moringa Powder' },
  { name: 'Beetroot Powder', slug: 'beetroot-powder', cat: 'Superfood Powders', desc: 'Finely powdered beetroot with its naturally rich colour and earthy-sweet character.', sizes: ['100 g', '250 g', '500 g'], mrps: [199, 449, 799], prices: [169, 379, 679], ingredients: '100% Beetroot Powder' },
  { name: 'Amaranth Powder', slug: 'amaranth-powder', cat: 'Superfood Powders', desc: 'Finely milled amaranth as a convenient food-based powder.', sizes: ['100 g', '250 g', '500 g'], mrps: [179, 399, 699], prices: [149, 339, 599], ingredients: '100% Amaranth Powder' },
  { name: 'Flaxseed Powder', slug: 'flaxseed-powder', cat: 'Superfood Powders', desc: 'Freshly milled flaxseed powder with its naturally nutty character.', sizes: ['100 g', '250 g', '500 g'], mrps: [149, 329, 599], prices: [129, 279, 509], ingredients: '100% Flaxseed Powder' },
  { name: 'Chia Seed Powder', slug: 'chia-seed-powder', cat: 'Superfood Powders', desc: 'Finely milled chia seed powder for convenient everyday food use.', sizes: ['100 g', '250 g', '500 g'], mrps: [199, 449, 799], prices: [169, 379, 679], ingredients: '100% Chia Seed Powder' },
  { name: 'Cocoa Powder', slug: 'cocoa-powder', cat: 'Superfood Powders', desc: 'Fine cocoa powder with a naturally rich and deep cocoa flavour.', sizes: ['100 g', '250 g', '500 g'], mrps: [199, 399, 699], prices: [169, 339, 599], ingredients: '100% Cocoa Powder' }
];

const DAILY_NUTRITION_POWDERS = [
  { name: 'Daily Nutrition Mix', slug: 'daily-nutrition-mix', cat: 'Daily Nutrition Powders', desc: 'A convenient everyday nutrition mix designed to complement regular meals and beverages.', sizes: ['200 g', '500 g'], mrps: [399, 799], prices: [349, 699], ingredients: 'Roasted grains, seeds, selected food ingredients' },
  { name: 'Family Nutrition Mix', slug: 'family-nutrition-mix', cat: 'Daily Nutrition Powders', desc: 'A family-friendly food powder mix designed for convenient everyday use.', sizes: ['250 g', '500 g', '1 kg'], mrps: [449, 799, 1399], prices: [399, 699, 1199], ingredients: 'A blend of family-friendly nutritional food powders' },
  { name: 'Morning Nutrition Mix', slug: 'morning-nutrition-mix', cat: 'Daily Nutrition Powders', desc: 'A convenient morning powder mix that can be incorporated into everyday food or beverage routines.', sizes: ['200 g', '500 g'], mrps: [399, 799], prices: [349, 699], ingredients: 'Morning-focused food and botanical ingredients' },
  { name: 'Daily Seed & Grain Mix', slug: 'daily-seed-grain-mix', cat: 'Daily Nutrition Powders', desc: 'A convenient blend of selected seeds and grains for everyday food use.', sizes: ['200 g', '500 g'], mrps: [349, 699], prices: [299, 599], ingredients: 'Selected seeds and grains' }
];

const ALL_PRODUCTS = [...SINGLE_HERB_POWDER, ...WELLNESS_POWDER_BLENDS, ...SUPERFOOD_POWDERS, ...DAILY_NUTRITION_POWDERS];

async function seed() {
  console.log(`Seeding categories and ${ALL_PRODUCTS.length} herbal powders...`);
  
  const uniqueCategories = Array.from(new Set(ALL_PRODUCTS.map(p => p.cat)));
  const categoryMap = new Map<string, string>();
  
  for (const catName of uniqueCategories) {
    const { data, error } = await supabase
      .from('categories')
      .upsert({ name: catName, slug: slugify(catName) }, { onConflict: 'slug' })
      .select()
      .single();
    
    if (error) {
      console.error(`Error inserting category ${catName}`, error);
      continue;
    }
    categoryMap.set(catName, data.id);
  }

  for (const p of ALL_PRODUCTS) {
    const categoryId = categoryMap.get(p.cat);
    
    let badge = 'PURE SINGLE HERB POWDER';
    if (p.cat === 'Wellness Powder Blends') badge = 'MULTI-HERB BLENDS';
    if (p.cat === 'Superfood Powders') badge = 'SUPERFOOD COLLECTION';
    if (p.cat === 'Daily Nutrition Powders') badge = 'EVERYDAY NUTRITION';

    const storage = 'Store in a cool, dry place away from direct sunlight and moisture. Keep the container tightly closed after opening.';
    
    const usageInstructions = {
      serving: 'As required',
      timing: 'Any time',
      instructions: 'Use as a natural ingredient in your daily wellness routine or culinary preparation.'
    };

    const idealFor = ['Everyday natural living', 'Traditional wellness use', 'Culinary preparation'];
    
    const specifications = {
      'Storage': storage,
      'Type': 'Herbal / Botanical Powder',
      'Contents / Ingredients': p.ingredients,
      'Disclaimer': 'This product is a natural botanical ingredient. It is not intended to diagnose, treat, cure, or prevent any disease. Results may vary.'
    };

    const benefits = [
      { text: 'Selected premium botanical powder' },
      { text: 'Finely milled for convenient use' },
      { text: 'Ideal for everyday natural living' }
    ];

    // 1. Insert product
    const { data: product, error: pErr } = await supabase
      .from('products')
      .upsert({
        slug: p.slug,
        name: p.name,
        category_id: categoryId,
        short_description: p.desc,
        full_description: p.desc,
        is_active: true,
        rating: 5,
        review_count: 24,
        badge: badge,
        usage_instructions: usageInstructions,
        ideal_for: idealFor,
        specifications: specifications,
        benefits: benefits
      }, { onConflict: 'slug' })
      .select('id')
      .single();

    if (pErr) {
      console.error('Error inserting product', p.name, pErr);
      continue;
    }

    const productId = product.id;

    // Delete existing variants and images to replace them cleanly
    await supabase.from('product_variants').delete().eq('product_id', productId);
    await supabase.from('product_images').delete().eq('product_id', productId);

    // 2. Insert variants
    for (let i = 0; i < p.sizes.length; i++) {
      const { error: vErr } = await supabase
        .from('product_variants')
        .insert({
          product_id: productId,
          size: p.sizes[i],
          price: p.prices[i],
          original_price: p.mrps[i],
          gold_member_price: Math.floor(p.prices[i] * 0.9),
          stock_quantity: 100
        });

      if (vErr) {
        console.error(`Error inserting variant ${p.sizes[i]} for ${p.name}`, vErr);
      }
    }

    // 3. Insert image
    const { error: iErr } = await supabase
      .from('product_images')
      .insert({
        product_id: productId,
        url: `/images/categories/cat_herbal_powders.jpg`, // Default placeholder
        display_order: 1
      });

    if (iErr) {
        console.error(`Error inserting image for ${p.name}`, iErr);
    }
  }
  console.log('Herbal powders seeded successfully!');
}

seed();
