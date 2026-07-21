import { createClient } from '@supabase/supabase-js';
import { products } from '../src/data/productData';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env.local
dotenv.config({ path: resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Utility to generate a slug from a string if one doesn't exist
const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

async function seed() {
  console.log("Starting Supabase Seed Process...");

  try {
    // 1. Categories
    console.log("Seeding Categories...");
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    const categoryMap = new Map<string, string>(); // name -> id

    for (const catName of uniqueCategories) {
      const { data, error } = await supabase
        .from('categories')
        .upsert({ name: catName, slug: slugify(catName) }, { onConflict: 'slug' })
        .select()
        .single();
      
      if (error) throw error;
      categoryMap.set(catName, data.id);
    }

    // 2. Health Goals
    console.log("Seeding Health Goals...");
    const allHealthGoals = products.flatMap(p => p.healthGoals || []);
    const uniqueHealthGoals = [...new Set(allHealthGoals)];
    const healthGoalMap = new Map<string, string>();

    for (const hg of uniqueHealthGoals) {
      const { data, error } = await supabase
        .from('health_goals')
        .upsert({ name: hg, slug: slugify(hg) }, { onConflict: 'slug' })
        .select()
        .single();
      
      if (error) throw error;
      healthGoalMap.set(hg, data.id);
    }

    // 3. Ingredients
    console.log("Seeding Ingredients...");
    const allIngredients = products.flatMap(p => p.ingredients || []);
    const uniqueIngredientsMap = new Map();
    allIngredients.forEach(ing => {
      if (!uniqueIngredientsMap.has(ing.name)) {
        uniqueIngredientsMap.set(ing.name, ing);
      }
    });
    
    const ingredientDbMap = new Map<string, string>();
    for (const [name, ing] of uniqueIngredientsMap) {
      const { data, error } = await supabase
        .from('ingredients')
        .upsert({
          name: ing.name,
          slug: slugify(ing.name),
          botanical_name: ing.botanical,
          role: ing.role,
          image_url: ing.image || null
        }, { onConflict: 'slug' })
        .select()
        .single();
      
      if (error) throw error;
      ingredientDbMap.set(name, data.id);
    }

    // 4. Products
    console.log("Seeding Products and relations...");
    for (const p of products) {
      console.log(`- Inserting product: ${p.name}`);
      
      // Insert Product
      const { data: prodData, error: prodError } = await supabase
        .from('products')
        .upsert({
          slug: p.slug, // using existing slug as conflict key
          name: p.name,
          category_id: categoryMap.get(p.category),
          short_description: p.shortDescription,
          full_description: p.fullDescription,
          story: p.story,
          primary_benefit: p.benefit,
          rating: p.rating,
          review_count: p.reviewCount,
          badge: p.badge || null,
          ideal_for: p.idealFor,
          usage_instructions: p.usageInstructions,
          benefits: p.benefits,
          specifications: p.specifications,
          certifications: p.certifications,
          faqs: p.faqs,
          related_product_ids: p.relatedProductIds,
          routine_product_ids: p.routineProductIds,
          is_active: true
        }, { onConflict: 'slug' })
        .select()
        .single();

      if (prodError) throw prodError;
      const productId = prodData.id;

      // Variants
      if (p.variants && p.variants.length > 0) {
        for (const v of p.variants) {
          const sku = `${p.slug}-${slugify(v.size)}`;
          const { data: varData, error: varError } = await supabase
            .from('product_variants')
            .upsert({
              product_id: productId,
              size: v.size,
              price: v.price,
              original_price: v.originalPrice,
              sku: sku,
              stock_quantity: 100 // default mock stock
            }, { onConflict: 'sku' })
            .select()
            .single();
          
          if (varError) throw varError;

          // Link image to variant
          if (v.image) {
             await supabase.from('product_images').insert({
               product_id: productId,
               variant_id: varData.id,
               url: v.image,
               display_order: 1
             });
          }
        }
      }

      // General Images
      for (let i = 0; i < p.images.length; i++) {
        await supabase.from('product_images').insert({
          product_id: productId,
          url: p.images[i],
          display_order: i
        });
      }

      // Product Health Goals
      if (p.healthGoals) {
        for (const hg of p.healthGoals) {
          const hgId = healthGoalMap.get(hg);
          if (hgId) {
            await supabase.from('product_health_goals').upsert({
              product_id: productId,
              health_goal_id: hgId
            }, { onConflict: 'product_id,health_goal_id' });
          }
        }
      }

      // Product Ingredients
      if (p.ingredients) {
        for (let i = 0; i < p.ingredients.length; i++) {
          const ingId = ingredientDbMap.get(p.ingredients[i].name);
          if (ingId) {
            await supabase.from('product_ingredients').upsert({
              product_id: productId,
              ingredient_id: ingId,
              display_order: i
            }, { onConflict: 'product_id,ingredient_id' });
          }
        }
      }
    }

    console.log("✅ Seed completed successfully!");

  } catch (err) {
    console.error("❌ Seed failed:", err);
  }
}

seed();
