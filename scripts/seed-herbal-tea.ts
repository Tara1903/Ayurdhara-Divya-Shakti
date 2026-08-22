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

const HERBAL_TEAS = [
  { name: 'Daily Herbal Tea', slug: 'daily-herbal-tea', cat: 'Herbal Teas', desc: 'A refreshing herbal tea blend combining aromatic botanicals for a simple everyday tea routine.', sizes: ['25 g', '50 g', '100 g'], mrps: [149, 269, 499], prices: [129, 229, 429], ingredients: 'Tulsi, Lemongrass, Ginger' },
  { name: 'Tulsi Herbal Tea', slug: 'tulsi-herbal-tea', cat: 'Herbal Teas', desc: 'A light and aromatic herbal tea blend featuring tulsi and refreshing botanical notes.', sizes: ['25 g', '50 g', '100 g'], mrps: [149, 269, 499], prices: [129, 229, 429], ingredients: 'Tulsi, Lemongrass' },
  { name: 'Ginger Lemon Herbal Tea', slug: 'ginger-lemon-herbal-tea', cat: 'Herbal Teas', desc: 'A bright, fresh herbal tea blend with warm ginger and refreshing citrus notes.', sizes: ['25 g', '50 g', '100 g'], mrps: [159, 289, 529], prices: [139, 249, 449], ingredients: 'Ginger, Lemongrass, Lemon Peel' },
  { name: 'Rose Herbal Tea', slug: 'rose-herbal-tea', cat: 'Herbal Teas', desc: 'A delicate floral herbal tea blend with a naturally pleasant aroma and colour.', sizes: ['25 g', '50 g', '100 g'], mrps: [179, 329, 599], prices: [149, 279, 509], ingredients: 'Rose Petals, Hibiscus, Natural Botanicals' },
  { name: 'Chamomile Herbal Tea', slug: 'chamomile-herbal-tea', cat: 'Herbal Teas', desc: 'A gentle floral herbal tea blend with a soft and naturally soothing aroma.', sizes: ['25 g', '50 g', '100 g'], mrps: [199, 369, 699], prices: [169, 319, 599], ingredients: 'Chamomile, selected botanical ingredients' },
  { name: 'Fresh Mint Herbal Tea', slug: 'fresh-mint-herbal-tea', cat: 'Herbal Teas', desc: 'A fresh and aromatic herbal tea blend with naturally crisp mint notes.', sizes: ['25 g', '50 g', '100 g'], mrps: [149, 269, 499], prices: [129, 229, 429], ingredients: 'Mint, Lemongrass, Tulsi' },
  { name: 'Cinnamon Spice Herbal Tea', slug: 'cinnamon-spice-herbal-tea', cat: 'Herbal Teas', desc: 'A warm and aromatic herbal tea blend inspired by traditional Indian spice notes.', sizes: ['25 g', '50 g', '100 g'], mrps: [159, 289, 529], prices: [139, 249, 449], ingredients: 'Cinnamon, Clove, Cardamom' },
  { name: 'Hibiscus Herbal Tea', slug: 'hibiscus-herbal-tea', cat: 'Herbal Teas', desc: 'A naturally vibrant floral herbal tea blend with a refreshing botanical character.', sizes: ['25 g', '50 g', '100 g'], mrps: [179, 329, 599], prices: [149, 279, 509], ingredients: 'Hibiscus, Rose Petals, selected botanicals' }
];

const KADHAS = [
  { name: 'Daily Herbal Kadha', slug: 'daily-herbal-kadha', cat: 'Kadha', desc: 'A traditional-style herbal spice blend for preparing a warm and aromatic kadha.', sizes: ['50 g', '100 g', '200 g'], mrps: [149, 269, 499], prices: [129, 229, 429], ingredients: 'Tulsi, Ginger, Cinnamon, Black Pepper, Clove' },
  { name: 'Winter Kadha', slug: 'winter-kadha', cat: 'Kadha', desc: 'A warming seasonal herbal blend inspired by traditional winter drink preparations.', sizes: ['50 g', '100 g', '200 g'], mrps: [159, 289, 529], prices: [139, 249, 449], ingredients: 'Dry Ginger, Cinnamon, Clove, Black Pepper, Tulsi' },
  { name: 'Herbal Spice Kadha', slug: 'herbal-spice-kadha', cat: 'Kadha', desc: 'Aromatic herbal spice blend for preparing a traditional-style warm drink.', sizes: ['50 g', '100 g', '200 g'], mrps: [159, 289, 529], prices: [139, 249, 449], ingredients: 'Cinnamon, Cardamom, Clove, Ginger, Black Pepper' },
  { name: 'Tulsi Ginger Kadha', slug: 'tulsi-ginger-kadha', cat: 'Kadha', desc: 'A simple herbal blend combining tulsi and ginger for a warm, aromatic drink.', sizes: ['50 g', '100 g', '200 g'], mrps: [149, 269, 499], prices: [129, 229, 429], ingredients: 'Tulsi, Dry Ginger, Lemongrass' },
  { name: 'Family Kadha Blend', slug: 'family-kadha-blend', cat: 'Kadha', desc: 'A convenient family-sized traditional-style herbal blend for preparing warm kadha at home.', sizes: ['100 g', '200 g', '500 g'], mrps: [249, 449, 899], prices: [219, 379, 769], ingredients: 'Tulsi, Ginger, Cinnamon, Clove, Cardamom, Black Pepper' }
];

const DRINKS = [
  { name: 'Daily Wellness Drink Mix', slug: 'daily-wellness-drink-mix', cat: 'Wellness Drinks', desc: 'A convenient botanical drink mix designed to be incorporated into an everyday beverage routine.', sizes: ['100 g', '250 g', '500 g'], mrps: [299, 599, 999], prices: [259, 519, 849], ingredients: 'Amla, Moringa, selected food ingredients' },
  { name: 'Lemon Herbal Drink Mix', slug: 'lemon-herbal-drink-mix', cat: 'Wellness Drinks', desc: 'A refreshing drink mix with bright citrus and botanical notes.', sizes: ['100 g', '250 g', '500 g'], mrps: [249, 499, 899], prices: [219, 429, 769], ingredients: 'Lemon, Ginger, selected botanical ingredients' },
  { name: 'Rose Herbal Drink Mix', slug: 'rose-herbal-drink-mix', cat: 'Wellness Drinks', desc: 'A naturally floral drink mix with a delicate botanical aroma and colour.', sizes: ['100 g', '250 g', '500 g'], mrps: [299, 599, 999], prices: [259, 519, 849], ingredients: 'Rose, Hibiscus, selected botanical ingredients' },
  { name: 'Amla Herbal Drink Mix', slug: 'amla-herbal-drink-mix', cat: 'Wellness Drinks', desc: 'A convenient amla-based drink mix for everyday beverage preparation.', sizes: ['100 g', '250 g', '500 g'], mrps: [299, 599, 999], prices: [259, 519, 849], ingredients: 'Amla, selected food ingredients' },
  { name: 'Summer Herbal Drink Mix', slug: 'summer-herbal-drink-mix', cat: 'Wellness Drinks', desc: 'A refreshing seasonal drink mix featuring naturally aromatic botanical ingredients.', sizes: ['100 g', '250 g', '500 g'], mrps: [299, 599, 999], prices: [259, 519, 849], ingredients: 'Fennel, Rose, Mint, selected botanical ingredients' },
  { name: 'Herbal Drink Discovery Combo', slug: 'herbal-drink-discovery-combo', cat: 'Wellness Drinks', desc: 'A convenient discovery set featuring three different botanical drink flavours.', sizes: ['3 x 100 g'], mrps: [899], prices: [749], ingredients: 'Daily Wellness Drink Mix, Lemon Herbal Drink Mix, Rose Herbal Drink Mix' }
];

const ALL_PRODUCTS = [...HERBAL_TEAS, ...KADHAS, ...DRINKS];

async function seed() {
  console.log(`Seeding categories and ${ALL_PRODUCTS.length} drinks...`);
  
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
    
    let badge = 'HERBAL TEA COLLECTION';
    let prepInstructions = 'Add the recommended quantity to hot water and allow it to steep according to the product instructions.';
    if (p.cat === 'Kadha') {
        badge = 'TRADITIONAL HERBAL KADHA';
        prepInstructions = 'Add the recommended quantity to water and prepare according to the instructions provided on the pack.';
    }
    if (p.cat === 'Wellness Drinks') {
        badge = 'WELLNESS DRINK COLLECTION';
        prepInstructions = 'Mix the recommended serving with water or another suitable beverage according to the product instructions.';
    }

    const storage = 'Store in a cool, dry place away from direct sunlight and moisture. Keep the pack tightly closed after opening.';
    
    const usageInstructions = {
      serving: 'As recommended on pack',
      timing: 'Any time',
      instructions: prepInstructions
    };

    const idealFor = ['Everyday beverage routine', 'Seasonal wellness', 'Natural living'];
    
    const specifications = {
      'Storage': storage,
      'Type': p.cat,
      'Contents / Ingredients': p.ingredients,
      'Preparation': prepInstructions,
      'Disclaimer': 'This product is a natural botanical preparation. It is not intended to diagnose, treat, cure, or prevent any disease.'
    };

    const benefits = [
      { text: 'Selected botanical ingredients' },
      { text: 'Aromatic and refreshing' },
      { text: 'Designed for everyday use' }
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
        review_count: 32,
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
        url: `/images/categories/cat_herbal_tea_1786557231547.jpg`,
        display_order: 1
      });

    if (iErr) {
        console.error(`Error inserting image for ${p.name}`, iErr);
    }
  }
  console.log('Herbal drinks seeded successfully!');
}

seed();
