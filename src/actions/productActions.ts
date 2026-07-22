'use server';
import { createAdminClient } from '@/lib/supabase/admin';
import { revalidateAllProducts, revalidateProduct } from '@/lib/dal/revalidate';

// ─── Audit Log Helper ──────────────────────────────────────────────────────
async function createAuditLog(
  adminId: string,
  action: string,
  resourceType: string,
  resourceId: string,
  oldData?: any,
  newData?: any
) {
  const supabase = createAdminClient();
  await supabase.from('audit_logs').insert({
    actor_id: adminId,
    action,
    resource_type: resourceType,
    resource_id: resourceId,
    old_data: oldData || null,
    new_data: newData || null,
  });
}

// ─── Create Product ────────────────────────────────────────────────────────
export async function createProduct(formData: any, adminId: string) {
  const supabase = createAdminClient();

  try {
    // 1. Get or create category
    let categoryId = formData.category_id;

    // 2. Insert product
    const { data: product, error: productError } = await supabase
      .from('products')
      .insert({
        slug: formData.slug,
        name: formData.name,
        category_id: categoryId || null,
        short_description: formData.short_description || '',
        full_description: formData.full_description || '',
        story: formData.story || '',
        primary_benefit: formData.primary_benefit || '',
        benefits: formData.benefits || [],
        ideal_for: formData.ideal_for || [],
        usage_instructions: formData.usage_instructions || {},
        specifications: formData.specifications || {},
        certifications: formData.certifications || [],
        faqs: formData.faqs || [],
        related_product_ids: formData.related_product_ids || [],
        routine_product_ids: formData.routine_product_ids || [],
        badge: formData.badge || null,
        rating: formData.rating || 0,
        review_count: formData.review_count || 0,
        duration_text: formData.duration_text || null,
        total_quantity_ml: formData.total_quantity_ml || null,
        gold_membership_eligible: formData.gold_membership_eligible || false,
        is_active: formData.is_active ?? false,
        primary_image_url: formData.images?.[0] || null,
      })
      .select()
      .single();

    if (productError) throw productError;

    // 3. Insert variants
    if (formData.variants && formData.variants.length > 0) {
      const variantRows = formData.variants.map((v: any) => ({
        product_id: product.id,
        size: v.size,
        price: v.price,
        original_price: v.original_price,
        sku: v.sku || null,
        stock_quantity: v.stock_quantity || 0,
        reserved_quantity: 0,
        is_active: true,
        gold_member_price: v.gold_member_price || null,
        pricing_status: v.pricing_status || 'official',
        gold_pricing_enabled: v.gold_pricing_enabled || false,
      }));
      await supabase.from('product_variants').insert(variantRows);
    }

    // 4. Insert images
    if (formData.images && formData.images.length > 0) {
      const imageRows = formData.images.map((url: string, idx: number) => ({
        product_id: product.id,
        url,
        display_order: idx,
        variant_id: null,
      }));
      await supabase.from('product_images').insert(imageRows);
    }

    // 5. Insert ingredient links
    if (formData.ingredient_ids && formData.ingredient_ids.length > 0) {
      const ingredientRows = formData.ingredient_ids.map((ingredientId: string, idx: number) => ({
        product_id: product.id,
        ingredient_id: ingredientId,
        display_order: idx,
      }));
      await supabase.from('product_ingredients').insert(ingredientRows);
    }

    // 6. Insert health goal links
    if (formData.health_goal_ids && formData.health_goal_ids.length > 0) {
      const goalRows = formData.health_goal_ids.map((goalId: string) => ({
        product_id: product.id,
        health_goal_id: goalId,
      }));
      await supabase.from('product_health_goals').insert(goalRows);
    }

    // 7. Audit log
    await createAuditLog(adminId, 'product.created', 'product', product.id, null, { name: product.name, slug: product.slug });

    // 8. Revalidate caches
    revalidateAllProducts();

    return { success: true, productId: product.id, slug: product.slug };
  } catch (error: any) {
    console.error('[productActions] createProduct error:', error);
    return { success: false, error: error.message };
  }
}

// ─── Update Product ────────────────────────────────────────────────────────
export async function updateProduct(productId: string, formData: any, adminId: string) {
  const supabase = createAdminClient();

  try {
    // Fetch old data for audit
    const { data: oldProduct } = await supabase
      .from('products')
      .select('name, slug, is_active')
      .eq('id', productId)
      .single();

    // Update product core fields
    const { error: productError } = await supabase
      .from('products')
      .update({
        name: formData.name,
        slug: formData.slug,
        category_id: formData.category_id || null,
        short_description: formData.short_description || '',
        full_description: formData.full_description || '',
        story: formData.story || '',
        primary_benefit: formData.primary_benefit || '',
        benefits: formData.benefits || [],
        ideal_for: formData.ideal_for || [],
        usage_instructions: formData.usage_instructions || {},
        specifications: formData.specifications || {},
        certifications: formData.certifications || [],
        faqs: formData.faqs || [],
        related_product_ids: formData.related_product_ids || [],
        routine_product_ids: formData.routine_product_ids || [],
        badge: formData.badge || null,
        rating: formData.rating,
        review_count: formData.review_count,
        duration_text: formData.duration_text || null,
        total_quantity_ml: formData.total_quantity_ml || null,
        gold_membership_eligible: formData.gold_membership_eligible || false,
        is_active: formData.is_active ?? false,
        primary_image_url: formData.images?.[0] || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', productId);

    if (productError) throw productError;

    // Update variants (delete existing, re-insert)
    if (formData.variants) {
      await supabase.from('product_variants').delete().eq('product_id', productId);
      if (formData.variants.length > 0) {
        const variantRows = formData.variants.map((v: any) => ({
          product_id: productId,
          size: v.size,
          price: v.price,
          original_price: v.original_price,
          sku: v.sku || null,
          stock_quantity: v.stock_quantity || 0,
          reserved_quantity: 0,
          is_active: true,
          gold_member_price: v.gold_member_price || null,
          pricing_status: v.pricing_status || 'official',
          gold_pricing_enabled: v.gold_pricing_enabled || false,
        }));
        await supabase.from('product_variants').insert(variantRows);
      }
    }

    // Update images (delete existing, re-insert)
    if (formData.images) {
      await supabase.from('product_images').delete().eq('product_id', productId);
      if (formData.images.length > 0) {
        const imageRows = formData.images.map((url: string, idx: number) => ({
          product_id: productId,
          url,
          display_order: idx,
          variant_id: null,
        }));
        await supabase.from('product_images').insert(imageRows);
      }
    }

    // Update ingredient links
    if (formData.ingredient_ids !== undefined) {
      await supabase.from('product_ingredients').delete().eq('product_id', productId);
      if (formData.ingredient_ids.length > 0) {
        const ingredientRows = formData.ingredient_ids.map((ingredientId: string, idx: number) => ({
          product_id: productId,
          ingredient_id: ingredientId,
          display_order: idx,
        }));
        await supabase.from('product_ingredients').insert(ingredientRows);
      }
    }

    // Update health goal links
    if (formData.health_goal_ids !== undefined) {
      await supabase.from('product_health_goals').delete().eq('product_id', productId);
      if (formData.health_goal_ids.length > 0) {
        const goalRows = formData.health_goal_ids.map((goalId: string) => ({
          product_id: productId,
          health_goal_id: goalId,
        }));
        await supabase.from('product_health_goals').insert(goalRows);
      }
    }

    // Audit log
    await createAuditLog(adminId, 'product.updated', 'product', productId, oldProduct, { name: formData.name, is_active: formData.is_active });

    // Revalidate
    revalidateProduct(formData.slug);
    if (oldProduct?.slug && oldProduct.slug !== formData.slug) {
      revalidateProduct(oldProduct.slug);
    }

    return { success: true };
  } catch (error: any) {
    console.error('[productActions] updateProduct error:', error);
    return { success: false, error: error.message };
  }
}

// ─── Archive Product ───────────────────────────────────────────────────────
export async function archiveProduct(productId: string, slug: string, adminId: string) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from('products')
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq('id', productId);

  if (error) return { success: false, error: error.message };

  await createAuditLog(adminId, 'product.archived', 'product', productId);
  revalidateProduct(slug);

  return { success: true };
}

// ─── Publish / Unpublish ───────────────────────────────────────────────────
export async function toggleProductPublish(productId: string, slug: string, publish: boolean, adminId: string) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from('products')
    .update({ is_active: publish, updated_at: new Date().toISOString() })
    .eq('id', productId);

  if (error) return { success: false, error: error.message };

  await createAuditLog(adminId, publish ? 'product.published' : 'product.unpublished', 'product', productId);
  revalidateProduct(slug);

  return { success: true };
}

// ─── Duplicate Product ─────────────────────────────────────────────────────
export async function duplicateProduct(productId: string, adminId: string) {
  const supabase = createAdminClient();

  const { data: original } = await supabase
    .from('products')
    .select('*, product_variants(*), product_images(*), product_ingredients(*), product_health_goals(*)')
    .eq('id', productId)
    .single();

  if (!original) return { success: false, error: 'Product not found' };

  const newSlug = `${original.slug}-copy-${Date.now()}`;
  const { data: newProduct, error } = await supabase
    .from('products')
    .insert({ ...original, id: undefined, slug: newSlug, name: `${original.name} (Copy)`, is_active: false, created_at: undefined, updated_at: undefined })
    .select()
    .single();

  if (error || !newProduct) return { success: false, error: error?.message };

  // Duplicate variants
  const variants = original.product_variants.map((v: any) => ({ ...v, id: undefined, product_id: newProduct.id, sku: v.sku ? `${v.sku}-copy` : null }));
  if (variants.length > 0) await supabase.from('product_variants').insert(variants);

  // Duplicate images
  const images = original.product_images.map((img: any) => ({ ...img, id: undefined, product_id: newProduct.id }));
  if (images.length > 0) await supabase.from('product_images').insert(images);

  // Duplicate ingredient links
  const ingredients = original.product_ingredients.map((pi: any) => ({ ...pi, product_id: newProduct.id }));
  if (ingredients.length > 0) await supabase.from('product_ingredients').insert(ingredients);

  // Duplicate health goal links
  const goals = original.product_health_goals.map((phg: any) => ({ ...phg, product_id: newProduct.id }));
  if (goals.length > 0) await supabase.from('product_health_goals').insert(goals);

  await createAuditLog(adminId, 'product.duplicated', 'product', newProduct.id, null, { from: productId });
  revalidateAllProducts();

  return { success: true, productId: newProduct.id, slug: newSlug };
}
