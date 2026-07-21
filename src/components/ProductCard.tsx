"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Lock } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useAuthStore } from "@/store/authStore";

interface ProductCardProps {
  product: {
    slug: string;
    name: string;
    category: string;
    price: number;
    originalPrice: number;
    goldMemberPrice?: number;
    goldMembershipEligible?: boolean;
    discount: number;
    badge?: string;
    image: string;
    rating: number;
    reviewCount: number;
    benefit: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { hasItem, addItem, removeItem } = useWishlistStore();
  const { user } = useAuthStore();
  const inWishlist = hasItem(product.slug); // using slug as ID for simplicity here
  const isGoldMember = user?.isGoldMember || false;

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeItem(product.slug);
    } else {
      addItem({
        id: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
        slug: product.slug
      });
    }
  };

  return (
    <div className="product-card col-product-card">
      <Link href={`/products/${product.slug}`} className="product-image-container">
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <Image 
          src={product.image} 
          alt={product.name}
          width={400}
          height={400}
          className="product-main-img"
          style={{ objectFit: 'cover' }}
        />
        <button 
          onClick={toggleWishlist}
          style={{ 
            position: 'absolute', top: '12px', right: '12px', background: 'white', 
            border: 'none', borderRadius: '50%', width: '36px', height: '36px', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            cursor: 'pointer', zIndex: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}
          aria-label="Toggle Wishlist"
        >
          <Heart size={18} fill={inWishlist ? "var(--olive)" : "none"} color={inWishlist ? "var(--olive)" : "var(--charcoal)"} />
        </button>
        <button className="col-card-quickview">Quick View</button>
      </Link>
      
      <div className="product-info col-card-info">
        <div className="col-card-header">
          <span className="col-card-category">{product.category}</span>
          <div className="col-card-rating">
            <span className="star">★</span> {product.rating} <span>({product.reviewCount})</span>
          </div>
        </div>
        
        <Link href={`/products/${product.slug}`}>
          <h3 className="col-card-title">{product.name}</h3>
        </Link>
        <p className="col-card-benefit">{product.benefit}</p>
        
        <div className="col-card-price-row">
          <span className="col-card-price">₹{product.price}</span>
          <span className="col-card-original-price">₹{product.originalPrice}</span>
          <span className="col-card-discount">Save {product.discount}%</span>
        </div>

        {product.goldMemberPrice && (
          <div style={{ marginTop: '0.5rem', padding: '0.5rem', background: isGoldMember ? '#FAF7F2' : '#F9F9F9', borderRadius: '4px', border: isGoldMember ? '1px solid #D4AF37' : '1px dashed #CCC', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              {!isGoldMember && <Lock size={12} color="#888" />}
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: isGoldMember ? '#B8860B' : '#666', textTransform: 'uppercase' }}>Gold Member</span>
            </div>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: isGoldMember ? '#B8860B' : '#888' }}>
              ₹{product.goldMemberPrice}
            </span>
          </div>
        )}
        
        <button className="btn btn-primary add-to-cart-btn" style={{ marginTop: '0.75rem' }}>Add to Cart</button>
      </div>
    </div>
  );
}
