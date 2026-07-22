import { NextRequest, NextResponse } from 'next/server';
import { searchProductsFromDB } from '@/lib/dal/products';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim();

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const products = await searchProductsFromDB(q, 6);
    const results = products.map(p => ({
      slug: p.slug,
      name: p.name,
      category: p.category,
      price: p.price,
      originalPrice: p.originalPrice,
      image: p.images[0] || '',
      badge: p.badge,
    }));

    return NextResponse.json({ results });
  } catch (error) {
    console.error('[Search API] Error:', error);
    return NextResponse.json({ results: [] });
  }
}
