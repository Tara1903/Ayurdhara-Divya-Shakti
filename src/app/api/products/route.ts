import { NextResponse } from 'next/server';
import { getActiveProducts } from '@/lib/dal/products';

export const revalidate = 60;

/**
 * GET /api/products
 * Returns all active products from the live Supabase database.
 * Used by client-side components (e.g., cart page recommendations).
 */
export async function GET() {
  try {
    const products = await getActiveProducts();
    return NextResponse.json(products);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
