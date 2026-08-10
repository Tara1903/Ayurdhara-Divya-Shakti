import { NextResponse } from 'next/server';
import { getProductBySlugFromDB } from '@/lib/dal/products';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const product = await getProductBySlugFromDB(params.slug);
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Product Detail API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product details' },
      { status: 500 }
    );
  }
}
