import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { products } from '../data/productData';

// Load environment variables
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
  const startTime = Date.now();
  console.log('🌱 Starting Supabase database seed...');

  const report = {
    inserted: 0,
    updated: 0,
    skipped: 0,
    errors: 0
  };

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
    console.log(`✅ Upserted ${insertedCategories?.length || 0} categories.`);

    const categoryMap = new Map(insertedCategories?.map(c => [c.name, c.id]));

    // 2. Seed Products
    console.log('Seeding Products...');
    for (const product of products) {
      try {
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

        const { data: existingProduct } = await supabase
          .from('products')
          .select('id')
          .eq('slug', product.slug)
          .single();

        const { data: upsertedProduct, error: productError } = await supabase
          .from('products')
          .upsert(productPayload, { onConflict: 'slug' })
          .select()
          .single();

        if (productError) {
          console.error(`❌ Failed to seed product: ${product.name}`, productError);
          report.errors++;
          continue;
        }

        if (existingProduct) {
          report.updated++;
        } else {
          report.inserted++;
        }

        // Seed Variants
        if (product.variants && upsertedProduct) {
          // Delete existing variants for fresh insert to ensure idempotency
          await supabase
            .from('product_variants')
            .delete()
            .eq('product_id', upsertedProduct.id);

          const variantsToInsert = product.variants.map(v => ({
            product_id: upsertedProduct.id,
            size: v.size,
            price: v.price,
            original_price: v.originalPrice,
            gold_member_price: v.goldMemberPrice,
            is_active: true
          }));

          const { error: variantError } = await supabase
            .from('product_variants')
            .insert(variantsToInsert);
            
          if (variantError) {
             console.error(`   ⚠️ Failed to seed variants for ${product.name}:`, variantError);
             report.errors++;
          }
        }
      } catch (err) {
        console.error(`❌ Unexpected error processing ${product.name}:`, err);
        report.errors++;
      }
    }

    // 3. Update app_metadata
    console.log('Updating app_metadata...');
    const { error: metadataError } = await supabase
      .from('app_metadata')
      .update({
        database_initialized: true,
        seed_version: '1.0.0',
        last_seeded_at: new Date().toISOString()
      })
      .eq('id', '00000000-0000-0000-0000-000000000000');

    if (metadataError) {
       console.error('⚠️ Could not update app_metadata:', metadataError);
    } else {
       console.log('✅ app_metadata updated successfully.');
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);

    console.log('\n==============================');
    console.log('         SEED REPORT          ');
    console.log('==============================');
    console.log(`Inserted : ${report.inserted}`);
    console.log(`Updated  : ${report.updated}`);
    console.log(`Skipped  : ${report.skipped}`);
    console.log(`Errors   : ${report.errors}`);
    console.log(`\nCompleted in ${duration}s`);
    console.log('==============================\n');
    
  } catch (err) {
    console.error('❌ Seeding failed with critical error:', err);
    process.exit(1);
  }
}

seedDatabase();
