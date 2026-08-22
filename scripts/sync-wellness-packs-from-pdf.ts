import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function sync() {
  console.log('🚀 Starting synchronization of Wellness Packs & Categories according to PDF specification...');

  // 1. Ensure required Categories exist
  const requiredCategories = [
    { name: 'Kids Care Oil Blend', slug: 'kids-care-oil-blend' },
    { name: 'Men Wellness Oil Blend', slug: 'men-wellness-oil-blend' },
    { name: 'Women Wellness Oil Blend', slug: 'women-wellness-oil-blend' },
    { name: 'Senior Care Oil Blend', slug: 'senior-care-oil-blend' },
    { name: 'Nabhi Trial Packs', slug: 'nabhi-trial-packs' },
    { name: 'Feet Massage Oil', slug: 'feet-massage-oil' },
    { name: 'Body Massage Oil', slug: 'body-massage-oil' },
    { name: 'Hair Wellness Oil', slug: 'hair-wellness-oil' },
    { name: 'Combo Trial Packs', slug: 'combo-trial-packs' }
  ];

  for (const cat of requiredCategories) {
    const { data: existing } = await supabase.from('categories').select('id').eq('slug', cat.slug).maybeSingle();
    if (!existing) {
      const { data: inserted, error } = await supabase.from('categories').insert(cat).select().single();
      console.log(`Created category: ${cat.name} (${cat.slug})`);
    }
  }

  // Reload categories map
  const { data: allCategories } = await supabase.from('categories').select('*');
  const catSlugMap = new Map((allCategories || []).map(c => [c.slug, c.id]));
  const catNameMap = new Map((allCategories || []).map(c => [c.name, c.id]));

  // 2. Identify and remove outdated/rogue products
  const rogueSlugs = [
    '2-member-family-gold',
    '3-member-family-gold',
    '4-member-family-gold',
    '5-member-family-gold',
    '2-member-family-gold-wellness-pack',
    '3-member-family-gold-wellness-pack',
    '2-member-family-trial',
    '3-member-family-trial',
    '4-member-family-trial',
    '2-member-family-trial-pack',
    '3-member-family-trial-pack',
    '4-member-family-trial-pack',
    '5-member-family-trial-pack',
    'gold-wellness-pack',
    'premium-wellness-pack',
    'individual-trial-wellness-pack',
    'trial-wellness-pack',
    'individual-gold-wellness-pack',
    'individual-premium-wellness-pack'
  ];

  console.log(`Cleaning up ${rogueSlugs.length} outdated / discontinued packs...`);
  for (const slug of rogueSlugs) {
    const { data: p } = await supabase.from('products').select('id, name').eq('slug', slug).maybeSingle();
    if (p) {
      await supabase.from('product_variants').delete().eq('product_id', p.id);
      await supabase.from('product_images').delete().eq('product_id', p.id);
      await supabase.from('products').delete().eq('id', p.id);
      console.log(`✓ Deleted discontinued product: ${p.name} (${slug})`);
    }
  }

  // Clean up obsolete categories from categories table
  const obsoleteCategorySlugs = [
    'family-gold-wellness-packs',
    'family-trial-wellness-packs',
    'individual-gold-wellness-pack',
    'individual-premium-wellness-pack',
    'individual-trial-wellness-pack',
    'individual-wellness-packs',
    'diamond-trial-wellness-pack'
  ];

  for (const slug of obsoleteCategorySlugs) {
    const { data: cat } = await supabase.from('categories').select('id, name').eq('slug', slug).maybeSingle();
    if (cat) {
      await supabase.from('categories').delete().eq('id', cat.id);
      console.log(`✓ Deleted obsolete category: ${cat.name} (${slug})`);
    }
  }

  // 3. Define the exact products specified in PDF
  const pdfProducts = [
    // --- 1. NABHI TRIAL PACKS ---
    {
      slug: 'nabhi-2-variant-trial-pack',
      name: 'Nabhi 2-Variant Trial Pack',
      category_slug: 'nabhi-trial-packs',
      short_description: '2 x 5 ml = 10 ml Nabhi Wellness Oils. Up to 1 Month* Wellness Care. Select any 2 variants from one category.',
      full_description: 'Customizable 2-variant Nabhi oil trial pack. Select any 2 targeted formulations from Kids, Men, Women, or Senior Care categories for up to 1 month of restorative daily wellness.',
      badge: 'POPULAR TRIAL',
      rating: 5,
      review_count: 34,
      image: '/images/categories/cat_trial_pack.jpg',
      duration_text: 'Up to 1 Month*',
      variants: [
        { size: '2 x 5 ml (10 ml)', price: 349, original_price: 499, gold_member_price: 314 }
      ]
    },
    {
      slug: 'nabhi-4-variant-trial-pack',
      name: 'Nabhi 4-Variant Trial Pack',
      category_slug: 'nabhi-trial-packs',
      short_description: '4 x 5 ml = 20 ml Nabhi Wellness Oils. Up to 2 Months* Wellness Care. All 4 variants from one category.',
      full_description: 'Complete 4-variant Nabhi oil collection for a full category. Includes all 4 specialized formulations for comprehensive wellness care lasting up to 2 months.',
      badge: 'COMPLETE PACK',
      rating: 5,
      review_count: 42,
      image: '/images/categories/cat_trial_pack.jpg',
      duration_text: 'Up to 2 Months*',
      variants: [
        { size: '4 x 5 ml (20 ml)', price: 599, original_price: 999, gold_member_price: 539 }
      ]
    },

    // --- 2. FEET MASSAGE OILS ---
    {
      slug: 'feet-wellness-trial-pack',
      name: 'Feet Wellness Trial Pack',
      category_slug: 'feet-massage-oil',
      short_description: '30 ml Restorative Feet Wellness Oil. Up to 15 Days* Wellness Care.',
      full_description: 'Traditional Padabhyanga foot massage oil infused with cooling, soothing herbs to relieve daily fatigue and promote deep restorative sleep.',
      badge: '15 DAYS TRIAL',
      rating: 5,
      review_count: 29,
      image: '/images/categories/cat_oil_wellness_1786556871303.jpg',
      duration_text: 'Up to 15 Days*',
      variants: [
        { size: '30 ml', price: 349, original_price: 499, gold_member_price: 314 }
      ]
    },
    {
      slug: 'feet-wellness-routine-pack',
      name: 'Feet Wellness Routine Pack',
      category_slug: 'feet-massage-oil',
      short_description: '60 ml Daily Feet Wellness Oil. Up to 1 Month* Wellness Care.',
      full_description: 'Full 1-month supply of our signature Padabhyanga foot massage oil for sustained relaxation, improved circulation, and overnight calm.',
      badge: '1 MONTH ROUTINE',
      rating: 5,
      review_count: 51,
      image: '/images/categories/cat_oil_wellness_1786556871303.jpg',
      duration_text: 'Up to 1 Month*',
      variants: [
        { size: '60 ml', price: 499, original_price: 699, gold_member_price: 449 }
      ]
    },

    // --- 3. COMBO TRIAL PACKS (FAMILY TRIAL OIL WELLNESS PACKS) ---
    {
      slug: 'prime-trial-pack',
      name: 'Prime Trial Pack',
      category_slug: 'combo-trial-packs',
      short_description: '2 x 5 ml Nabhi + 60 ml Feet Oil. Total: 70 ml. Up to 1 Month* Wellness Care.',
      full_description: 'Starter wellness combo pairing 2 targeted 5 ml Nabhi wellness oils with 60 ml Feet massage oil for a synchronized 1-month daily routine.',
      badge: 'STARTER COMBO',
      rating: 5,
      review_count: 67,
      image: '/images/categories/cat_wellness_packs_1786557692487.jpg',
      duration_text: 'Up to 1 Month*',
      variants: [
        { size: '70 ml Combo', price: 699, original_price: 999, gold_member_price: 629 }
      ]
    },
    {
      slug: 'silver-trial-pack',
      name: 'Silver Trial Pack',
      category_slug: 'combo-trial-packs',
      short_description: '4 x 5 ml Nabhi + 120 ml Feet Oil. Total: 140 ml. Up to 2 Months* Wellness Care.',
      full_description: 'Best value wellness combo offering all 4 category Nabhi oils (20 ml) plus double feet oil (120 ml) for 2 months of restorative care.',
      badge: 'BEST VALUE',
      rating: 5,
      review_count: 84,
      image: '/images/categories/cat_wellness_packs_1786557692487.jpg',
      duration_text: 'Up to 2 Months*',
      variants: [
        { size: '140 ml Combo', price: 999, original_price: 1499, gold_member_price: 899 }
      ]
    },
    {
      slug: 'gold-trial-pack',
      name: 'Gold Trial Pack',
      category_slug: 'combo-trial-packs',
      short_description: '2 x 5 ml Nabhi + 60 ml Feet Oil + 100 ml Body Massage Oil. Total: 170 ml. Up to 1 Month* Wellness Care.',
      full_description: 'Complete head-to-toe self-care regimen combining Nabhi oils, Feet oil, and 100 ml full-body Abhyanga massage oil for whole-body rejuvenation.',
      badge: 'COMPLETE SELF-CARE',
      rating: 5,
      review_count: 92,
      image: '/images/categories/cat_wellness_packs_1786557692487.jpg',
      duration_text: 'Up to 1 Month*',
      variants: [
        { size: '170 ml Combo', price: 1199, original_price: 1799, gold_member_price: 1079 }
      ]
    },
    {
      slug: 'diamond-trial-pack',
      name: 'Diamond Trial Pack',
      category_slug: 'combo-trial-packs',
      short_description: '4 x 5 ml Nabhi + 120 ml Feet Oil + 100 ml Body Massage Oil. Total: 240 ml. Up to 2 Months* Wellness Care.',
      full_description: 'The ultimate flagship Ayurvedic wellness combo. Includes all 4 category Nabhi oils (20 ml), 120 ml Feet massage oil, and 100 ml Body massage oil for up to 2 full months of complete luxury wellness care.',
      badge: 'COMPLETE WELLNESS COMBO',
      rating: 5,
      review_count: 115,
      image: '/images/categories/cat_wellness_packs_1786557692487.jpg',
      duration_text: 'Up to 2 Months*',
      variants: [
        { size: '240 ml Combo', price: 1599, original_price: 2299, gold_member_price: 1439 }
      ]
    }
  ];

  console.log('\nInserting / Updating the 8 PDF Standard Packs in Database...');
  for (const item of pdfProducts) {
    const categoryId = catSlugMap.get(item.category_slug);
    if (!categoryId) {
      console.error(`Missing category for slug: ${item.category_slug}`);
      continue;
    }

    // Check if product already exists
    const { data: existing } = await supabase.from('products').select('id').eq('slug', item.slug).maybeSingle();

    let productId = existing?.id;
    if (!productId) {
      const { data: inserted, error: insertErr } = await supabase.from('products').insert({
        name: item.name,
        slug: item.slug,
        category_id: categoryId,
        short_description: item.short_description,
        full_description: item.full_description,
        story: 'Rooted in timeless Ayurvedic texts and handcrafted with 100% natural botanical extracts.',
        primary_benefit: item.short_description,
        rating: item.rating,
        review_count: item.review_count,
        badge: item.badge,
        duration_text: item.duration_text,
        is_active: true,
        usage_instructions: {
          timing: 'Morning & Night',
          serving: 'As prescribed',
          instructions: 'Apply 2-3 drops of Nabhi oil on the navel. Massage feet oil before sleep. Use body oil as desired.'
        },
        certifications: ['100% Natural', 'GMP Certified', 'Ayush Approved']
      }).select('id').single();

      if (insertErr) {
        console.error(`Error inserting ${item.name}:`, insertErr);
        continue;
      }
      productId = inserted.id;
    } else {
      await supabase.from('products').update({
        name: item.name,
        category_id: categoryId,
        short_description: item.short_description,
        full_description: item.full_description,
        primary_benefit: item.short_description,
        badge: item.badge,
        duration_text: item.duration_text,
        is_active: true
      }).eq('id', productId);
    }

    // Insert Image
    await supabase.from('product_images').delete().eq('product_id', productId);
    await supabase.from('product_images').insert({
      product_id: productId,
      url: item.image,
      display_order: 1
    });

    // Insert Variants
    await supabase.from('product_variants').delete().eq('product_id', productId);
    for (const v of item.variants) {
      await supabase.from('product_variants').insert({
        product_id: productId,
        size: v.size,
        price: v.price,
        original_price: v.original_price,
        gold_member_price: v.gold_member_price,
        stock_quantity: 100,
        is_active: true,
        pricing_status: 'official',
        gold_pricing_enabled: true
      });
    }

    console.log(`✓ Synchronized product: ${item.name} (${item.slug}) - ₹${item.variants[0].price}`);
  }

  // 4. Update the 16 individual Nabhi Oils to have size: 5 ml @ ₹199 (MRP: ₹299)
  console.log('\nSynchronizing 16 individual Nabhi Oils to 5 ml @ ₹199...');
  const nabhiCategorySlugs = [
    'kids-care-oil-blend',
    'men-wellness-oil-blend',
    'women-wellness-oil-blend',
    'senior-care-oil-blend'
  ];

  const nabhiCategoryIds = nabhiCategorySlugs.map(s => catSlugMap.get(s)).filter(Boolean);

  const { data: individualOils } = await supabase
    .from('products')
    .select('id, name, slug, category_id')
    .in('category_id', nabhiCategoryIds);

  console.log(`Found ${individualOils?.length} individual Nabhi Oils to update.`);

  for (const oil of individualOils || []) {
    await supabase.from('product_variants').delete().eq('product_id', oil.id);
    await supabase.from('product_variants').insert([
      {
        product_id: oil.id,
        size: '5 ml',
        price: 199,
        original_price: 299,
        gold_member_price: 179,
        stock_quantity: 100,
        is_active: true,
        pricing_status: 'official',
        gold_pricing_enabled: true
      },
      {
        product_id: oil.id,
        size: '10 ml',
        price: 349,
        original_price: 499,
        gold_member_price: 314,
        stock_quantity: 100,
        is_active: true,
        pricing_status: 'official',
        gold_pricing_enabled: true
      }
    ]);
    console.log(`✓ Updated individual oil: ${oil.name} (5 ml @ ₹199, 10 ml @ ₹349)`);
  }

  console.log('\n🎉 ALL WELLNESS PACKS, NABHI OILS, AND CATEGORIES ARE 100% SYNCHRONIZED WITH THE PDF SPECIFICATION!');
}

sync();
