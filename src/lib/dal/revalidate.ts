import { revalidateTag, revalidatePath } from 'next/cache';

/**
 * Revalidate all product-related caches.
 * Called after ANY product admin action.
 */
export function revalidateAllProducts() {
  try {
    revalidateTag('products', 'default');
    revalidateTag('metadata', 'default');
    revalidateTag('categories', 'default');
    revalidateTag('homepage-content', 'default');
  } catch {}
  try {
    revalidatePath('/', 'layout');
    revalidatePath('/');
    revalidatePath('/collections');
    revalidatePath('/wellness-packs');
    revalidatePath('/trial-packs');
  } catch {}
}

/**
 * Revalidate a specific product page.
 */
export function revalidateProduct(slug: string) {
  try {
    revalidateTag('products', 'default');
    revalidateTag('metadata', 'default');
  } catch {}
  try {
    revalidatePath(`/products/${slug}`);
    revalidatePath('/collections');
    revalidatePath('/wellness-packs');
    revalidatePath('/trial-packs');
    revalidatePath('/', 'layout');
    revalidatePath('/');
  } catch {}
}

/**
 * Revalidate the homepage.
 */
export function revalidateHomepage() {
  revalidatePath('/');
  revalidateTag('homepage-content', 'default');
}

/**
 * Revalidate marketing content (banners, announcement bar, offers).
 */
export function revalidateMarketing() {
  revalidatePath('/');
  revalidatePath('/collections');
  revalidatePath('/products', 'layout');
  revalidateTag('marketing', 'default');
}

/**
 * Revalidate content pages.
 */
export function revalidateContent(path?: string) {
  revalidateTag('content', 'default');
  if (path) {
    revalidatePath(path);
  }
}

/**
 * Revalidate journal/blog.
 */
export function revalidateJournal(slug?: string) {
  revalidateTag('journal', 'default');
  revalidatePath('/journal');
  if (slug) {
    revalidatePath(`/journal/${slug}`);
  }
}
