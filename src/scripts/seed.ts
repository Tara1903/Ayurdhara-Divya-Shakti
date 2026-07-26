import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { products } from '../data/productData';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey || supabaseUrl === 'https://placeholder.supabase.co') {
  console.error('❌ Missing Supabase credentials. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedDatabase() {
  console.log('🌱 Starting Supabase database seed...');

  try {
    // 1. Seed Categories
    console.log('Seeding Categories...');
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
    const categoriesToInsert = uniqueCategories.map(name => ({
      name,
      slug: name.toLowerCase().replace(/ /g, '-'),
      is_active: true
    }));

    const { data: insertedCategories, error: categoryError } = await supabase
      .from('categories')
      .upsert(categoriesToInsert, { onConflict: 'slug' })
      .select();

    if (categoryError) throw categoryError;
    console.log(`✅ Seeded ${insertedCategories?.length || 0} categories.`);

    // Helper map to quickly get category_id
    const categoryMap = new Map(insertedCategories?.map(c => [c.name, c.id]));

    // 2. Seed Products
    console.log('Seeding Products...');
    for (const product of products) {
      const categoryId = categoryMap.get(product.category);

      const productPayload = {
        slug: product.slug,
        name: product.name,
        category_id: categoryId,
        short_description: product.shortDescription,
        full_description: product.fullDescription,
        story: product.story,
        primary_benefit: product.benefit,
        rating: product.rating,
        review_count: product.reviewCount,
        badge: product.badge,
        ideal_for: product.idealFor,
        usage_instructions: product.usageInstructions,
        is_active: true
      };

      const { data: insertedProduct, error: productError } = await supabase
        .from('products')
        .upsert(productPayload, { onConflict: 'slug' })
        .select()
        .single();

      if (productError) {
        console.error(`❌ Failed to seed product: ${product.name}`, productError);
        continue;
      }

      console.log(`✅ Seeded product: ${product.name}`);

      // Seed Variants
      if (product.variants && insertedProduct) {
        const variantsToInsert = product.variants.map(v => ({
          product_id: insertedProduct.id,
          size: v.size,
          price: v.price,
          original_price: v.originalPrice,
          gold_member_price: v.goldMemberPrice,
          is_active: true
        }));

        const { error: variantError } = await supabase
          .from('product_variants')
          .insert(variantsToInsert);
          
        if (variantError && variantError.code !== '23505') { // ignore duplicate keys if re-running
           console.error(`   ⚠️ Failed to seed variants for ${product.name}:`, variantError);
        }
      }
    }

    console.log('🎉 Seeding completed successfully!');
    
  } catch (err) {
    console.error('❌ Seeding failed:', err);
  }
}

seedDatabase();
