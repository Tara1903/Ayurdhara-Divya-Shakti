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

const SINGLE_HERBS = [
  { name: 'Ajwain Seeds', slug: 'ajwain-seeds', cat: 'Single Herbs', desc: 'Whole ajwain seeds with their naturally distinctive, warm and aromatic character.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [45, 75, 165, 299], prices: [39, 65, 139, 249] },
  { name: 'Saunf Seeds', slug: 'saunf-seeds', cat: 'Single Herbs', desc: 'Fresh aromatic fennel seeds selected for their naturally sweet and refreshing flavour.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [40, 70, 155, 285], prices: [35, 59, 129, 239] },
  { name: 'Cumin Seeds', slug: 'cumin-seeds', cat: 'Single Herbs', desc: 'Whole cumin seeds with a naturally warm, earthy and aromatic flavour.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [45, 80, 175, 329], prices: [39, 69, 149, 279] },
  { name: 'Fenugreek Seeds', slug: 'fenugreek-seeds', cat: 'Single Herbs', desc: 'Whole fenugreek seeds with their characteristic earthy and slightly bitter flavour.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [35, 60, 135, 249], prices: [29, 49, 109, 209] },
  { name: 'Kalonji Seeds', slug: 'kalonji-seeds', cat: 'Single Herbs', desc: 'Small aromatic black seeds traditionally valued for their distinctive flavour.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [45, 80, 175, 329], prices: [39, 69, 149, 279] },
  { name: 'Mustard Seeds', slug: 'mustard-seeds', cat: 'Single Herbs', desc: 'Whole mustard seeds with a naturally sharp and pungent character.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [30, 50, 110, 199], prices: [25, 42, 89, 169] },
  { name: 'Coriander Seeds', slug: 'coriander-seeds', cat: 'Single Herbs', desc: 'Whole coriander seeds with a naturally fresh, warm and citrus-like aroma.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [30, 50, 110, 199], prices: [25, 42, 89, 169] },
  { name: 'Whole Black Pepper', slug: 'whole-black-pepper', cat: 'Single Herbs', desc: 'Whole black peppercorns with a naturally bold, warm and aromatic flavour.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [70, 125, 285, 529], prices: [59, 105, 239, 449] },
  { name: 'Whole Cloves', slug: 'whole-cloves', cat: 'Single Herbs', desc: 'Whole aromatic cloves with a naturally warm and intense fragrance.', sizes: ['25 g', '50 g', '100 g', '250 g'], mrps: [45, 80, 145, 329], prices: [39, 69, 119, 279] },
  { name: 'Cinnamon Sticks', slug: 'cinnamon-sticks', cat: 'Single Herbs', desc: 'Natural cinnamon sticks with a warm, sweet and woody aroma.', sizes: ['25 g', '50 g', '100 g', '250 g'], mrps: [40, 70, 125, 279], prices: [35, 59, 105, 229] },
  { name: 'Green Cardamom', slug: 'green-cardamom', cat: 'Single Herbs', desc: 'Selected green cardamom pods with a naturally sweet and refreshing aroma.', sizes: ['25 g', '50 g', '100 g', '250 g'], mrps: [90, 165, 299, 699], prices: [79, 139, 249, 599] },
  { name: 'Whole Dry Ginger', slug: 'whole-dry-ginger', cat: 'Single Herbs', desc: 'Whole dried ginger with a naturally warm, sharp and aromatic character.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [45, 80, 175, 329], prices: [39, 69, 149, 279] },
  { name: 'Dried Amla Pieces', slug: 'dried-amla-pieces', cat: 'Single Herbs', desc: 'Carefully dried amla pieces with their naturally tangy character.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [50, 90, 199, 369], prices: [42, 75, 169, 309] },
  { name: 'Dried Tulsi Leaves', slug: 'dried-tulsi-leaves', cat: 'Single Herbs', desc: 'Dried tulsi leaves with a naturally fresh, herbal and aromatic profile.', sizes: ['25 g', '50 g', '100 g', '250 g'], mrps: [45, 80, 145, 299], prices: [39, 69, 119, 249] },
  { name: 'Dried Neem Leaves', slug: 'dried-neem-leaves', cat: 'Single Herbs', desc: 'Carefully dried neem leaves with their naturally distinctive herbal character.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [40, 70, 155, 285], prices: [35, 59, 129, 239] }
];

const PREMIUM_HERBS = [
  { name: 'Ashwagandha Root', slug: 'ashwagandha-root', cat: 'Premium Herbs', desc: 'Selected dried ashwagandha roots, carefully packed as a traditional botanical ingredient.', sizes: ['50 g', '100 g', '250 g'], mrps: [149, 269, 599], prices: [129, 229, 499] },
  { name: 'Shatavari Root', slug: 'shatavari-root', cat: 'Premium Herbs', desc: 'Carefully selected dried shatavari root for customers seeking a premium botanical ingredient.', sizes: ['50 g', '100 g', '250 g'], mrps: [169, 299, 699], prices: [149, 259, 599] },
  { name: 'Brahmi', slug: 'brahmi', cat: 'Premium Herbs', desc: 'Selected dried brahmi herb with a naturally herbal and earthy character.', sizes: ['50 g', '100 g', '250 g'], mrps: [139, 249, 549], prices: [119, 209, 469] },
  { name: 'Jatamansi', slug: 'jatamansi', cat: 'Premium Herbs', desc: 'A premium aromatic botanical ingredient known for its distinctive earthy fragrance.', sizes: ['25 g', '50 g', '100 g'], mrps: [199, 359, 649], prices: [169, 299, 549] },
  { name: 'Safed Musli', slug: 'safed-musli', cat: 'Premium Herbs', desc: 'Carefully selected dried safed musli as a premium botanical ingredient.', sizes: ['25 g', '50 g', '100 g'], mrps: [199, 369, 699], prices: [169, 319, 599] },
  { name: 'Gokhru', slug: 'gokhru', cat: 'Premium Herbs', desc: 'Selected dried gokhru as part of our premium botanical range.', sizes: ['50 g', '100 g', '250 g'], mrps: [129, 229, 499], prices: [109, 199, 429] },
  { name: 'Arjuna Bark', slug: 'arjuna-bark', cat: 'Premium Herbs', desc: 'Carefully selected dried arjuna bark with a natural woody botanical profile.', sizes: ['50 g', '100 g', '250 g'], mrps: [99, 179, 399], prices: [85, 155, 339] },
  { name: 'Mulethi', slug: 'mulethi', cat: 'Premium Herbs', desc: 'Natural dried mulethi root with its characteristic sweet and earthy flavour.', sizes: ['50 g', '100 g', '250 g'], mrps: [99, 179, 399], prices: [85, 155, 339] },
  { name: 'Dried Giloy Stem', slug: 'dried-giloy-stem', cat: 'Premium Herbs', desc: 'Selected dried giloy stems presented as a traditional botanical ingredient.', sizes: ['50 g', '100 g', '250 g'], mrps: [99, 179, 399], prices: [85, 155, 339] },
  { name: 'Dried Moringa Leaves', slug: 'dried-moringa-leaves', cat: 'Premium Herbs', desc: 'Carefully dried moringa leaves with a naturally green, herbal character.', sizes: ['50 g', '100 g', '250 g'], mrps: [99, 179, 399], prices: [85, 155, 339] },
  { name: 'Dried Hibiscus Flowers', slug: 'dried-hibiscus-flowers', cat: 'Premium Herbs', desc: 'Beautifully dried hibiscus flowers with a naturally floral and tangy botanical profile.', sizes: ['25 g', '50 g', '100 g'], mrps: [99, 179, 329], prices: [85, 149, 279] },
  { name: 'Dried Chamomile Flowers', slug: 'dried-chamomile-flowers', cat: 'Premium Herbs', desc: 'Delicately dried chamomile flowers with a soft floral aroma.', sizes: ['25 g', '50 g', '100 g'], mrps: [129, 229, 399], prices: [109, 199, 339] },
  { name: 'Dried Rose Petals', slug: 'dried-rose-petals', cat: 'Premium Herbs', desc: 'Carefully dried rose petals with a naturally delicate floral aroma.', sizes: ['25 g', '50 g', '100 g'], mrps: [99, 179, 329], prices: [85, 149, 279] },
  { name: 'Dried Vetiver Root', slug: 'dried-vetiver-root', cat: 'Premium Herbs', desc: 'Natural dried vetiver roots with a distinctive earthy and cooling aromatic character.', sizes: ['50 g', '100 g', '250 g'], mrps: [129, 229, 499], prices: [109, 199, 429] },
  { name: 'Premium Saffron / Kesar', slug: 'premium-saffron-kesar', cat: 'Premium Herbs', desc: 'Premium saffron threads carefully packed for customers looking for a refined botanical ingredient.', sizes: ['1 g', '2 g', '5 g'], mrps: [299, 549, 1299], prices: [249, 469, 1099] }
];

const SEASONAL_COLLECTIONS = [
  { name: 'Winter Herb Collection', slug: 'winter-herb-collection', cat: 'Seasonal Collections', desc: 'A thoughtfully assembled winter-season herb collection featuring warm, aromatic whole botanicals.', sizes: ['250 g'], mrps: [399], prices: [349] },
  { name: 'Summer Herb Collection', slug: 'summer-herb-collection', cat: 'Seasonal Collections', desc: 'A refreshing seasonal collection featuring aromatic and cooling-inspired botanical ingredients.', sizes: ['250 g'], mrps: [399], prices: [349] },
  { name: 'Monsoon Herb Collection', slug: 'monsoon-herb-collection', cat: 'Seasonal Collections', desc: 'A seasonal collection of familiar aromatic herbs selected for monsoon-time natural living.', sizes: ['250 g'], mrps: [399], prices: [349] },
  { name: 'Festive Herb Collection', slug: 'festive-herb-collection', cat: 'Seasonal Collections', desc: 'A premium aromatic collection bringing together naturally fragrant whole herbs for festive and everyday use.', sizes: ['250 g'], mrps: [449], prices: [399] }
];

const ALL_PRODUCTS = [...SINGLE_HERBS, ...PREMIUM_HERBS, ...SEASONAL_COLLECTIONS];

async function seed() {
  console.log(`Seeding categories and ${ALL_PRODUCTS.length} products...`);
  
  const uniqueCategories = [...new Set(ALL_PRODUCTS.map(p => p.cat))];
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
        badge: p.cat === 'Premium Herbs' ? 'PREMIUM BOTANICAL COLLECTION' : (p.cat === 'Single Herbs' ? 'EVERYDAY HERBS' : 'SEASONAL COLLECTION')
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
        url: `/images/categories/cat_raw_herbs.jpg`,
        display_order: 1
      });

    if (iErr) {
        console.error(`Error inserting image for ${p.name}`, iErr);
    }
  }
  console.log('Done!');
}

seed();
