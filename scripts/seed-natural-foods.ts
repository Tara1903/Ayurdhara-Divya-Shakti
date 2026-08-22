import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '').replace(/--+/g, '-');
}

const OILS = [
  { name: 'Cold Pressed Mustard Oil', cat: 'Cold Pressed Oils', desc: 'Cold pressed mustard oil with its naturally distinctive aroma and flavour.', sizes: ['250 ml', '500 ml', '1 L'], mrps: [149, 269, 499], prices: [129, 229, 429], ing: '100% Mustard Oil' },
  { name: 'Cold Pressed Sesame Oil', cat: 'Cold Pressed Oils', desc: 'Cold pressed sesame oil with a naturally rich and nutty character.', sizes: ['250 ml', '500 ml', '1 L'], mrps: [199, 369, 699], prices: [169, 319, 599], ing: '100% Sesame Oil' },
  { name: 'Cold Pressed Groundnut Oil', cat: 'Cold Pressed Oils', desc: 'Cold pressed groundnut oil with a naturally mild and nutty flavour.', sizes: ['250 ml', '500 ml', '1 L'], mrps: [169, 319, 599], prices: [149, 279, 519], ing: '100% Groundnut Oil' },
  { name: 'Cold Pressed Coconut Oil', cat: 'Cold Pressed Oils', desc: 'Cold pressed coconut oil with a naturally pleasant coconut aroma.', sizes: ['250 ml', '500 ml', '1 L'], mrps: [199, 369, 699], prices: [169, 319, 599], ing: '100% Coconut Oil' },
  { name: 'Cold Pressed Flaxseed Oil', cat: 'Cold Pressed Oils', desc: 'Cold pressed flaxseed oil with its naturally distinctive nutty character.', sizes: ['100 ml', '250 ml', '500 ml'], mrps: [199, 449, 799], prices: [169, 379, 679], ing: '100% Flaxseed Oil' }
];

const HONEY = [
  { name: 'Pure Honey', cat: 'Honey', desc: 'Natural honey with a pleasant sweetness and characteristic floral character.', sizes: ['250 g', '500 g', '1 kg'], mrps: [249, 449, 799], prices: [219, 399, 699], ing: 'Pure Honey' },
  { name: 'Forest Honey', cat: 'Honey', desc: 'Honey with a naturally rich and distinctive flavour profile.', sizes: ['250 g', '500 g', '1 kg'], mrps: [299, 549, 999], prices: [259, 479, 849], ing: 'Forest Honey' },
  { name: 'Multifloral Honey', cat: 'Honey', desc: 'A naturally aromatic honey with flavour influenced by multiple floral sources.', sizes: ['250 g', '500 g', '1 kg'], mrps: [279, 499, 899], prices: [239, 429, 769], ing: 'Multifloral Honey' }
];

const GHEE = [
  { name: 'Cow Ghee', cat: 'Ghee', desc: 'Rich and aromatic ghee with a naturally smooth texture.', sizes: ['250 g', '500 g', '1 kg'], mrps: [399, 749, 1399], prices: [349, 649, 1199], ing: 'Cow Milk Fat' },
  { name: 'Desi Ghee', cat: 'Ghee', desc: 'Traditional-style ghee with a rich aroma and smooth texture.', sizes: ['250 g', '500 g', '1 kg'], mrps: [349, 649, 1199], prices: [299, 559, 999], ing: 'Milk Fat' },
  { name: 'A2 Cow Ghee', cat: 'Ghee', desc: 'Premium cow ghee product.', sizes: ['250 g', '500 g', '1 kg'], mrps: [499, 949, 1799], prices: [449, 829, 1549], ing: 'A2 Cow Milk Fat' }
];

const DRY_FRUITS = [
  { name: 'Almonds', cat: 'Dry Fruits', desc: 'Selected almonds with a naturally crunchy texture and mild nutty flavour.', sizes: ['100 g', '250 g', '500 g', '1 kg'], mrps: [129, 299, 549, 999], prices: [109, 259, 479, 849], ing: '100% Almonds' },
  { name: 'Cashews', cat: 'Dry Fruits', desc: 'Selected cashews with a naturally creamy texture and rich nutty flavour.', sizes: ['100 g', '250 g', '500 g', '1 kg'], mrps: [149, 349, 649, 1199], prices: [129, 299, 559, 1029], ing: '100% Cashews' },
  { name: 'Raisins', cat: 'Dry Fruits', desc: 'Naturally sweet dried grapes selected for everyday snacking and food use.', sizes: ['100 g', '250 g', '500 g', '1 kg'], mrps: [99, 219, 399, 749], prices: [85, 189, 349, 639], ing: '100% Raisins' },
  { name: 'Walnuts', cat: 'Dry Fruits', desc: 'Selected walnut kernels with a naturally rich and nutty character.', sizes: ['100 g', '250 g', '500 g'], mrps: [199, 449, 849], prices: [169, 389, 729], ing: '100% Walnuts' },
  { name: 'Dates', cat: 'Dry Fruits', desc: 'Naturally sweet dried dates with a soft and chewy texture.', sizes: ['250 g', '500 g', '1 kg'], mrps: [149, 279, 499], prices: [129, 239, 429], ing: '100% Dates' },
  { name: 'Figs / Anjeer', cat: 'Dry Fruits', desc: 'Dried figs with a naturally sweet flavour and chewy texture.', sizes: ['100 g', '250 g', '500 g'], mrps: [199, 449, 849], prices: [169, 389, 729], ing: '100% Figs' },
  { name: 'Pistachios', cat: 'Dry Fruits', desc: 'Selected pistachios with a naturally rich flavour and crunchy texture.', sizes: ['100 g', '250 g', '500 g'], mrps: [199, 449, 849], prices: [169, 389, 729], ing: '100% Pistachios' }
];

const SEEDS = [
  { name: 'Chia Seeds', cat: 'Seeds', desc: 'Small edible seeds with a naturally mild flavour and versatile food use.', sizes: ['100 g', '250 g', '500 g'], mrps: [149, 329, 599], prices: [129, 279, 509], ing: '100% Chia Seeds' },
  { name: 'Flaxseeds', cat: 'Seeds', desc: 'Whole flaxseeds with a naturally nutty character.', sizes: ['100 g', '250 g', '500 g'], mrps: [99, 219, 399], prices: [85, 189, 339], ing: '100% Flaxseeds' },
  { name: 'Pumpkin Seeds', cat: 'Seeds', desc: 'Crunchy pumpkin seeds with a naturally mild nutty flavour.', sizes: ['100 g', '250 g', '500 g'], mrps: [199, 449, 799], prices: [169, 379, 679], ing: '100% Pumpkin Seeds' },
  { name: 'Sunflower Seeds', cat: 'Seeds', desc: 'Crunchy sunflower seeds with a naturally mild flavour.', sizes: ['100 g', '250 g', '500 g'], mrps: [99, 219, 399], prices: [85, 189, 339], ing: '100% Sunflower Seeds' },
  { name: 'Sesame Seeds', cat: 'Seeds', desc: 'Whole sesame seeds with a naturally nutty aroma and flavour.', sizes: ['100 g', '250 g', '500 g'], mrps: [79, 179, 329], prices: [69, 149, 279], ing: '100% Sesame Seeds' },
  { name: 'Sabja Seeds', cat: 'Seeds', desc: 'Small edible basil seeds commonly used in refreshing beverages and food preparations.', sizes: ['100 g', '250 g', '500 g'], mrps: [99, 219, 399], prices: [85, 189, 339], ing: '100% Sabja Seeds' },
  { name: 'Halim Seeds', cat: 'Seeds', desc: 'Traditional edible halim seeds with a naturally distinctive character.', sizes: ['100 g', '250 g', '500 g'], mrps: [149, 329, 599], prices: [129, 279, 509], ing: '100% Halim Seeds' }
];

const JAGGERY = [
  { name: 'Jaggery Block', cat: 'Jaggery', desc: 'Traditional jaggery with a naturally rich sweetness and caramel-like character.', sizes: ['250 g', '500 g', '1 kg'], mrps: [79, 149, 279], prices: [69, 129, 239], ing: 'Jaggery (Sugarcane)' },
  { name: 'Jaggery Powder', cat: 'Jaggery', desc: 'Convenient powdered jaggery for everyday food and beverage preparation.', sizes: ['250 g', '500 g', '1 kg'], mrps: [89, 169, 299], prices: [75, 145, 259], ing: 'Jaggery Powder (Sugarcane)' },
  { name: 'Organic Jaggery', cat: 'Jaggery', desc: 'Jaggery sourced and processed according to applicable organic standards.', sizes: ['250 g', '500 g', '1 kg'], mrps: [99, 189, 349], prices: [85, 159, 299], ing: 'Organic Jaggery (Sugarcane)' }
];

const ALL_PRODUCTS = [...OILS, ...HONEY, ...GHEE, ...DRY_FRUITS, ...SEEDS, ...JAGGERY];

async function seed() {
  console.log(`Seeding categories and ${ALL_PRODUCTS.length} natural foods...`);
  
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
    
    let badge = '';
    let storage = 'Store in a cool, dry place away from direct sunlight and moisture. Keep the pack tightly closed after opening.';
    
    if (p.cat === 'Cold Pressed Oils') {
        badge = 'COLD PRESSED';
        storage = 'Store in a cool, dry place away from direct sunlight. Keep the bottle tightly closed.';
    } else if (p.cat === 'Honey') {
        badge = 'NATURAL HONEY';
    } else if (p.cat === 'Ghee') {
        badge = 'TRADITIONAL GHEE';
    } else if (p.cat === 'Dry Fruits') {
        badge = 'PREMIUM DRY FRUITS';
        storage = 'Store in a cool, dry place and protect from moisture. Refrigerate after opening if recommended on the final label.';
    } else if (p.cat === 'Seeds') {
        badge = 'EVERYDAY SEEDS';
        storage = 'Store in a cool, dry place and protect from moisture. Refrigerate after opening if recommended on the final label.';
    } else if (p.cat === 'Jaggery') {
        badge = 'NATURAL JAGGERY';
    }

    const usageInstructions = {
      serving: 'As required',
      timing: 'Any time',
      instructions: 'Use in everyday cooking, snacking or preparation as desired.'
    };

    const idealFor = ['Everyday natural living', 'Traditional food preparation', 'Everyday kitchen use'];
    
    const specifications = {
      'Storage': storage,
      'Type': p.cat,
      'Contents / Ingredients': p.ing,
      'Preparation': 'Use in everyday cooking, baking, or direct consumption.',
      'Disclaimer': 'This product is a natural food ingredient. It is not intended to diagnose, treat, cure, or prevent any disease. Results may vary.'
    };

    const benefits = [
      { text: 'Selected premium food ingredient' },
      { text: 'Designed for everyday use' },
      { text: 'Natural and carefully processed' }
    ];

    const slug = slugify(p.name);

    // 1. Insert product
    const { data: product, error: pErr } = await supabase
      .from('products')
      .upsert({
        slug: slug,
        name: p.name,
        category_id: categoryId,
        short_description: p.desc,
        full_description: p.desc,
        is_active: true,
        rating: 5,
        review_count: 50,
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
        url: `/images/categories/cat_natural_foods_1786557531655.jpg`, // Default placeholder
        display_order: 1
      });

    if (iErr) {
        console.error(`Error inserting image for ${p.name}`, iErr);
    }
  }
  console.log('Natural foods seeded successfully!');
}

seed();
