"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Star, Shield, Leaf, Heart, ChevronDown, Lock } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useAuthStore } from "@/store/authStore";
import { Product } from "@/data/productData";

export default function PDPClient({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [activeVariantIdx, setActiveVariantIdx] = useState(0);
  const [qty, setQty] = useState(1);
  
  const { hasItem, addItem, removeItem } = useWishlistStore();
  const { user } = useAuthStore();
  const isGoldMember = user?.isGoldMember || false;
  const inWishlist = hasItem(product.slug);

  const toggleWishlist = () => {
    if (inWishlist) {
      removeItem(product.slug);
    } else {
      addItem({
        id: product.slug,
        name: product.name,
        price: product.price,
        image: product.images[0],
        slug: product.slug
      });
    }
  };

  // Derive current price, original price, discount, and image from selected variant (if any)
  const currentVariant = product.variants && product.variants.length > 0 ? product.variants[activeVariantIdx] : null;
  const currentPrice = currentVariant ? currentVariant.price : product.price;
  const currentOriginalPrice = currentVariant ? currentVariant.originalPrice : product.originalPrice;
  const currentGoldMemberPrice = currentVariant ? currentVariant.goldMemberPrice : product.goldMemberPrice;
  const currentDiscount = currentOriginalPrice ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100) : product.discount;

  const handleVariantChange = (idx: number) => {
    setActiveVariantIdx(idx);
    const variant = product.variants[idx];
    if (variant && variant.image) {
      const imgIdx = product.images.findIndex(img => img === variant.image);
      if (imgIdx !== -1) {
        setActiveImage(imgIdx);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar only on mobile after scrolling past 600px
      if (window.innerWidth < 768 && window.scrollY > 600) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="pdp-container">
      {/* 1. Breadcrumbs */}
      <div className="pdp-breadcrumbs">
        <Link href="/">Home</Link> &gt; <Link href="/collections">Shop</Link> &gt; <span className="current">{product.name}</span>
      </div>

      {/* 2. Hero Section (Split Layout) */}
      <section className="pdp-hero">
        <div className="pdp-gallery">
          {/* Main Image */}
          <div className="pdp-main-image-container">
            <Image src={product.images[activeImage]} alt={product.name} fill style={{ objectFit: 'contain' }} priority />
          </div>
          {/* Thumbnails */}
          <div className="pdp-thumbnails">
            {product.images.map((img, i) => (
              <div 
                key={i} 
                className={`thumbnail ${i === activeImage ? 'active' : ''}`}
                onClick={() => setActiveImage(i)}
              >
                <Image src={img} alt={`${product.name} view ${i}`} fill style={{ objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

        <div className="pdp-info-panel">
          {product.badge && <span className="product-badge">{product.badge}</span>}
          <h1 className="pdp-title">{product.name}</h1>
          <p className="pdp-category">{product.category}</p>
          
          <div className="pdp-rating">
            <Star size={16} fill="#FACC15" color="#FACC15" />
            <span>{product.rating}</span>
            <span className="text-muted">({product.reviewCount} Reviews)</span>
          </div>

          <p className="pdp-benefit-line">{product.benefit}</p>

          <div className="pdp-pricing" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span className="pdp-price">₹{currentPrice}</span>
            <span className="pdp-mrp">₹{currentOriginalPrice}</span>
            <span className="pdp-discount" style={{background: '#FACC15', color: '#1A1A1A', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600}}>Save {currentDiscount}%</span>
          </div>

          {currentGoldMemberPrice && (
            <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: isGoldMember ? '#FAF7F2' : '#F9F9F9', borderRadius: '6px', border: isGoldMember ? '1px solid #D4AF37' : '1px dashed #CCC', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {!isGoldMember && <Lock size={16} color="#888" />}
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: isGoldMember ? '#B8860B' : '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Gold Member Price</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: isGoldMember ? '#B8860B' : '#888' }}>
                  ₹{currentGoldMemberPrice}
                </span>
              </div>
            </div>
          )}
          {!isGoldMember && currentGoldMemberPrice && (
            <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
              <Link href="/collections" style={{ color: 'var(--olive)', textDecoration: 'underline' }}>Explore Gold Wellness Courses</Link> to unlock this price.
            </p>
          )}

          <p className="pdp-tax-info" style={{ marginTop: '0.5rem' }}>Inclusive of all taxes</p>

          {/* Variant Selector */}
          {product.variants && product.variants.length > 0 && (
            <div className="variant-selector" style={{marginTop: '1.5rem', marginBottom: '1.5rem'}}>
              <h4 style={{fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--charcoal)', marginBottom: '0.5rem'}}>Select Size</h4>
              <div className="variant-pills" style={{display: 'flex', gap: '0.75rem', flexWrap: 'wrap'}}>
                {product.variants.map((v, i) => (
                  <button 
                    key={i}
                    className={`variant-pill ${i === activeVariantIdx ? 'active' : ''}`}
                    onClick={() => handleVariantChange(i)}
                    style={{
                      padding: '0.5rem 1rem',
                      border: i === activeVariantIdx ? '2px solid var(--charcoal)' : '1px solid #E5E7EB',
                      background: i === activeVariantIdx ? 'var(--charcoal)' : 'white',
                      color: i === activeVariantIdx ? 'white' : 'var(--charcoal)',
                      borderRadius: '50px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontWeight: 500
                    }}
                  >
                    {v.size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pdp-actions-row" style={{display: 'flex', gap: '1rem', marginBottom: '1rem'}}>
            <div className="quantity-selector" style={{display: 'flex', alignItems: 'center', border: '1px solid #E5E7EB', borderRadius: 'var(--radius)'}}>
              <button className="qty-btn" style={{padding: '0 1rem', height: '48px', background: 'transparent', border: 'none', cursor: 'pointer'}} onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
              <input type="number" className="qty-input" value={qty} readOnly style={{width: '40px', textAlign: 'center', border: 'none', background: 'transparent'}} />
              <button className="qty-btn" style={{padding: '0 1rem', height: '48px', background: 'transparent', border: 'none', cursor: 'pointer'}} onClick={() => setQty(Math.min(10, qty + 1))}>+</button>
            </div>
            <button 
              onClick={toggleWishlist}
              style={{
                width: '48px', height: '48px', borderRadius: 'var(--radius)', border: '1px solid var(--sand)',
                background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                flexShrink: 0
              }}
              aria-label="Toggle Wishlist"
            >
              <Heart size={20} fill={inWishlist ? "var(--olive)" : "none"} color={inWishlist ? "var(--olive)" : "var(--charcoal)"} />
            </button>
            <button 
              className="btn btn-primary btn-large" 
              style={{flex: 1}}
              onClick={() => {
                useCartStore.getState().addItem({
                  productId: product.slug,
                  name: product.name,
                  image: currentVariant && currentVariant.image ? currentVariant.image : product.images[0],
                  price: currentPrice,
                  originalPrice: currentOriginalPrice,
                  goldMemberPrice: currentGoldMemberPrice,
                  size: currentVariant ? currentVariant.size : 'Standard Size',
                  quantity: qty
                });
              }}
            >
              Add to Cart
            </button>
          </div>
          
          <div style={{display: 'flex', gap: '1rem', marginBottom: '1.5rem'}}>
            <Link href="/cart" className="btn-large buy-now-btn" style={{flex: 1, textAlign: 'center', textDecoration: 'none', color: 'var(--charcoal)'}}>Buy It Now</Link>
            <a href={`https://wa.me/919876543210?text=I'm%20interested%20in%20${encodeURIComponent(product.name)}`} target="_blank" rel="noopener noreferrer" className="btn-large" style={{flex: 1, textAlign: 'center', textDecoration: 'none', background: '#25D366', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px'}}>
              Order on WhatsApp
            </a>
          </div>

          <div style={{textAlign: 'center', marginBottom: '2rem'}}>
            <button onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: product.name,
                  url: window.location.href
                });
              }
            }} style={{background: 'transparent', border: 'none', color: 'var(--charcoal)', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.9rem'}}>
              Share this product
            </button>
          </div>
          
          <div className="pdp-trust-badges">
            <div className="trust-badge"><Shield size={20} /> 100% Secure Payments</div>
            <div className="trust-badge"><Leaf size={20} /> Pure Ayurvedic</div>
          </div>
        </div>
      </section>

      {/* 3. Key Benefits */}
      <section className="pdp-section pdp-benefits-section">
        <h2>Why You'll Love It</h2>
        <div className="benefits-grid">
          {product.benefits.map((b, i) => (
            <div key={i} className="benefit-card">
              <Heart className="benefit-icon" size={32} />
              <p>{b.text}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* 4. Product Story */}
      <section className="pdp-story">
        <div className="story-content">
          <h2>The Story Behind {product.name}</h2>
          <p>{product.story}</p>
        </div>
      </section>

      {/* 5. Ingredients */}
      <section className="pdp-section pdp-ingredients">
        <h2>Key Ingredients</h2>
        <div className="ingredients-grid">
          {product.ingredients.map((ing, i) => (
            <div key={i} className="ingredient-card">
              {ing.image && <div className="ing-img-container"><Image src={ing.image} alt={ing.name} fill style={{objectFit: 'cover'}} /></div>}
              <div className="ingredient-info">
                <h3>{ing.name}</h3>
                <p className="botanical-name">{ing.botanical}</p>
                <p>{ing.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. How to Use */}
      <section className="pdp-section pdp-usage">
        <h2>How to Use</h2>
        <div className="usage-grid">
          <div className="usage-step">
            <h4>Recommended Serving</h4>
            <p>{product.usageInstructions.serving}</p>
          </div>
          <div className="usage-step">
            <h4>When to Take</h4>
            <p>{product.usageInstructions.timing}</p>
          </div>
          <div className="usage-step">
            <h4>Instructions</h4>
            <p>{product.usageInstructions.instructions}</p>
          </div>
          <div className="usage-step">
            <h4>Who Can Use</h4>
            <p>{product.idealFor ? product.idealFor.join(', ') : 'Everyone'}</p>
          </div>
        </div>
      </section>

      {/* 7. Storage Instructions */}
      <section className="pdp-section pdp-storage" style={{background: '#FAF7F2', padding: '3rem', borderRadius: 'var(--radius-lg)', marginTop: '4rem'}}>
        <h2 style={{textAlign: 'center', marginBottom: '1.5rem'}}>Storage Instructions</h2>
        <p style={{textAlign: 'center', maxWidth: '600px', margin: '0 auto', color: 'var(--text-muted)'}}>
          Store in a cool, dry place away from direct sunlight. Keep the bottle tightly closed when not in use. Ensure no water gets into the oil to maintain its purity and effectiveness.
        </p>
      </section>

      {/* 8. Specifications & 12. FAQ */}
      <section className="pdp-section pdp-details">
        <div className="pdp-specs">
          <h2>Product Information</h2>
          <table className="specs-table">
            <tbody>
              {Object.entries(product.specifications).map(([key, val]) => (
                <tr key={key}>
                  <th>{key}</th>
                  <td>{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="pdp-faqs" style={{marginTop: '4rem'}}>
          <h2>Frequently Asked Questions</h2>
          <div className="accordion">
            {product.faqs.map((faq, i) => (
              <div 
                key={i} 
                className={`accordion-item ${openFaq === i ? 'open' : ''}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="accordion-header">
                  <h4>{faq.question}</h4>
                  <ChevronDown className="accordion-icon" size={20} />
                </div>
                <div className="accordion-content">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Customer Reviews */}
      <section className="pdp-section pdp-reviews">
        <h2>Customer Reviews</h2>
        <div className="reviews-summary" style={{textAlign: 'center'}}>
          <div className="rating-big" style={{fontSize: '4rem', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
            <span>{product.rating}</span>
            <Star fill="#FACC15" color="#FACC15" size={48} />
          </div>
          <p style={{fontSize: '1.2rem', color: 'var(--text-muted)'}}>Based on {product.reviewCount} verified reviews</p>
        </div>
      </section>

      {/* 13. Recommendations */}
      {product.relatedProductIds && product.relatedProductIds.length > 0 && (
        <section className="pdp-section recommendations-section">
          <h2>Complete Your Routine</h2>
          <div className="collection-grid" style={{marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem'}}>
            {product.relatedProductIds.map((slug, idx) => {
              // Note: Ideally pass the full related products from Server Component instead of having Client Component fetch them.
              // For now, we render simple linked cards.
              return (
                <div key={idx} className="product-card col-product-card" style={{border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', overflow: 'hidden'}}>
                  <Link href={`/products/${slug}`} style={{textDecoration: 'none', color: 'inherit'}}>
                    <div style={{height: 250, background: 'var(--surface-light)', position: 'relative'}}>
                      <Image src={`/images/products/${slug}-15ml.jpg`} alt={slug} fill style={{objectFit: 'cover'}} />
                    </div>
                    <div style={{padding: '1.5rem', textAlign: 'center'}}>
                      <h3 style={{fontSize: '1.2rem', marginBottom: '0.5rem', textTransform: 'capitalize'}}>{slug.replace(/-/g, ' ')}</h3>
                      <button className="btn btn-primary" style={{width: '100%', marginTop: '1rem'}}>View Details</button>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Mobile Sticky Add to Cart */}
      <div className={`mobile-sticky-bar ${showStickyBar ? 'visible' : ''}`}>
        <div className="mobile-sticky-content">
          <div>
            <div style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>{product.name}</div>
            <div className="mobile-sticky-price">₹{product.price}</div>
          </div>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
