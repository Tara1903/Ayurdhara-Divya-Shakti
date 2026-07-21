'use client';
export default function Page() {
  return (
    <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: `
      <!-- Custom Cursor -->
      <div class="custom-cursor" id="custom-cursor"></div>

      <!-- Navigation -->
      

      <!-- Mobile Nav Overlay -->
      <div class="mobile-nav-overlay" id="mobile-nav-overlay">
        <button class="nav-close" id="nav-close">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div class="mobile-nav-links">
          <a href="#philosophy" class="mobile-nav-link text-ivory">Philosophy</a>
          <a href="/collections.html" class="mobile-nav-link text-ivory">Collections</a>
          <a href="#ingredients" class="mobile-nav-link text-ivory">Ingredients</a>
          <a href="#craft" class="mobile-nav-link text-ivory">Craft</a>
          <a href="#journal" class="mobile-nav-link text-ivory">Journal</a>
          <a href="#circle" class="mobile-nav-link text-ivory">Circle</a>
        </div>
      </div>

      <!-- Chapter I: Arrival -->
      <div id="intro-sequence">
        <h1 class="intro-brand text-display italic">Ayurdhara Divya Shakti</h1>
      </div>

      <header class="hero-chapter" id="hero">
        <div class="hero-bg" id="hero-bg">
          <img src="/images/hero_botanical_1784053776794.png" alt="Lush botanical garden">
        </div>
        <div class="hero-overlay"></div>
        <div class="hero-vignette"></div>
        
        <!-- Canvas for Gold Dust Particles -->
        <canvas id="particles-canvas" class="particles-container"></canvas>

        <div class="container hero-content" id="hero-content">
          <h1 class="hero-title font-display">Ayurdhara</h1>
          <p class="hero-subtitle font-display italic">Divya Shakti</p>
        </div>
        
        <div class="hero-bottom pb-32">
          <div class="scroll-indicator magnetic" id="scroll-indicator">
            <span class="scroll-text text-overline text-ivory">Begin</span>
            <div class="scroll-line-container">
              <div class="scroll-line"></div>
            </div>
          </div>
        </div>
      </header>

      <!-- Chapter II: Manifesto -->
      <section class="manifesto-chapter" id="manifesto">
        <div class="container">
          <div class="manifesto-line visible stagger-1">
            <h2 class="text-display italic">"We did not create a brand."</h2>
          </div>
          <div class="gold-divider scroll-divider"></div>
          <div class="manifesto-line visible stagger-2">
            <h2 class="text-display italic">"We inherited a tradition."</h2>
          </div>
          <div class="gold-divider scroll-divider"></div>
          <div class="manifesto-line visible stagger-3">
            <h2 class="text-title italic">"5,000 years of wisdom.<br>Distilled into every formulation."</h2>
          </div>
        </div>
      </section>

      <!-- [NEW] E-Commerce Integration: Featured Products -->
      <section class="section-spacing bg-sand" id="featured-products">
        <div class="container">
          <div class="flex justify-between items-end mb-48 visible">
            <div>
              <span class="text-overline text-stone">Featured Collection</span>
              <h2 class="text-title text-forest mt-8">Curated for the Season</h2>
            </div>
            <a href="#" class="link-editorial text-sm">Shop All Collections &rarr;</a>
          </div>
          
          <div class="grid-ecommerce">
            <!-- Product 1 -->
            <a href="/products/kids-gentle-blend" class="product-card-premium visible stagger-1">
              <div class="product-card-premium-img">
                <img src="/images/products/nabhi-kids-gentle-10ml.jpg" loading="lazy" alt="Kids Gentle Blend">
                <button class="wishlist-btn" aria-label="Add to wishlist">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
                <div class="quick-view">Quick View</div>
              </div>
              <div class="product-card-details">
                <h3 class="product-title">Kids Gentle Blend</h3>
                <p class="product-benefit">Promotes Calm & Relaxation</p>
                <div class="product-meta">
                  <span class="star-rating">★★★★★</span>
                  <span class="review-count">(112)</span>
                </div>
                <div class="product-price-row">
                  <div style="display: flex; flex-direction: column; gap: 4px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span class="product-price">₹199</span>
                      <span style="text-decoration: line-through; color: #888; font-size: 0.8rem;">₹299</span>
                    </div>
                    <div style="background: #FAF7F2; padding: 4px 8px; border: 1px solid #D4AF37; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px; font-size: 0.75rem;">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#D4AF37" stroke="#D4AF37" stroke-width="1"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                      <span style="color: #B8860B; font-weight: 600;">Gold Member: ₹149</span>
                    </div>
                  </div>
                  <button class="btn-add-to-cart">View Options</button>
                </div>
              </div>
            </a>

            <!-- Product 2 -->
            <a href="/products/men-vital-blend" class="product-card-premium visible stagger-2">
              <div class="product-card-premium-img">
                <img src="/images/products/nabhi-men-vital-10ml.jpg" loading="lazy" alt="Men Vital Blend">
                <button class="wishlist-btn" aria-label="Add to wishlist">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
                <div class="quick-view">Quick View</div>
              </div>
              <div class="product-card-details">
                <h3 class="product-title">Men Vital Blend</h3>
                <p class="product-benefit">Endurance & Vitality</p>
                <div class="product-meta">
                  <span class="star-rating">★★★★☆</span>
                  <span class="review-count">(94)</span>
                </div>
                <div class="product-price-row">
                  <div style="display: flex; flex-direction: column; gap: 4px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span class="product-price">₹199</span>
                      <span style="text-decoration: line-through; color: #888; font-size: 0.8rem;">₹299</span>
                    </div>
                    <div style="background: #FAF7F2; padding: 4px 8px; border: 1px solid #D4AF37; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px; font-size: 0.75rem;">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#D4AF37" stroke="#D4AF37" stroke-width="1"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                      <span style="color: #B8860B; font-weight: 600;">Gold Member: ₹149</span>
                    </div>
                  </div>
                  <button class="btn-add-to-cart">View Options</button>
                </div>
              </div>
            </a>

            <!-- Product 3 -->
            <a href="/products/women-care-blend" class="product-card-premium visible stagger-3">
              <div class="product-card-premium-img">
                <img src="/images/products/nabhi-women-care-10ml.jpg" loading="lazy" alt="Women Care Blend">
                <button class="wishlist-btn" aria-label="Add to wishlist">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
                <div class="quick-view">Quick View</div>
              </div>
              <div class="product-card-details">
                <h3 class="product-title">Women Care Blend</h3>
                <p class="product-benefit">Soothing & Nurturing Care</p>
                <div class="product-meta">
                  <span class="star-rating">★★★★★</span>
                  <span class="review-count">(156)</span>
                </div>
                <div class="product-price-row">
                  <div style="display: flex; flex-direction: column; gap: 4px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span class="product-price">₹199</span>
                      <span style="text-decoration: line-through; color: #888; font-size: 0.8rem;">₹299</span>
                    </div>
                    <div style="background: #FAF7F2; padding: 4px 8px; border: 1px solid #D4AF37; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px; font-size: 0.75rem;">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#D4AF37" stroke="#D4AF37" stroke-width="1"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                      <span style="color: #B8860B; font-weight: 600;">Gold Member: ₹149</span>
                    </div>
                  </div>
                  <button class="btn-add-to-cart">View Options</button>
                </div>
              </div>
            </a>

            <!-- Product 4 -->
            <a href="/products/senior-vital-blend" class="product-card-premium visible stagger-4">
              <div class="product-card-premium-img">
                <img src="/images/products/nabhi-senior-vital-10ml.jpg" loading="lazy" alt="Senior Vital Blend">
                <button class="wishlist-btn" aria-label="Add to wishlist">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
                <div class="quick-view">Quick View</div>
              </div>
              <div class="product-card-details">
                <h3 class="product-title">Senior Vital Blend</h3>
                <p class="product-benefit">Daily Energy & Wellness</p>
                <div class="product-meta">
                  <span class="star-rating">★★★★★</span>
                  <span class="review-count">(88)</span>
                </div>
                <div class="product-price-row">
                  <div style="display: flex; flex-direction: column; gap: 4px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span class="product-price">₹199</span>
                      <span style="text-decoration: line-through; color: #888; font-size: 0.8rem;">₹299</span>
                    </div>
                    <div style="background: #FAF7F2; padding: 4px 8px; border: 1px solid #D4AF37; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px; font-size: 0.75rem;">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#D4AF37" stroke="#D4AF37" stroke-width="1"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                      <span style="color: #B8860B; font-weight: 600;">Gold Member: ₹149</span>
                    </div>
                  </div>
                  <button class="btn-add-to-cart">View Options</button>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <!-- Chapter III: Philosophy -->
      <section class="philosophy-chapter section-spacing chapter-breath" id="philosophy">
        <div class="container grid md:grid-cols-2 gap-48 items-center">
          <div class="flex-col gap-32">
            <div class="visible stagger-1">
              <span class="text-overline text-stone">Philosophy</span>
              <h2 class="text-title mt-16 text-forest">The Three Pillars</h2>
            </div>
            
            <div class="flex-col gap-24">
              <div class="visible stagger-2">
                <h3 class="text-subtitle font-display">Purity</h3>
                <p class="text-body text-charcoal mt-8">Sourced directly from the most pristine environments, untouched by modern compromise.</p>
              </div>
              <div class="visible stagger-3">
                <h3 class="text-subtitle font-display">Balance</h3>
                <p class="text-body text-charcoal mt-8">Formulated to align the elements within, creating harmony between body and mind.</p>
              </div>
              <div class="visible stagger-4">
                <h3 class="text-subtitle font-display">Ritual</h3>
                <p class="text-body text-charcoal mt-8">Elevating daily routines into moments of profound connection and self-care.</p>
              </div>
            </div>

            <blockquote class="text-subtitle font-display italic text-earth visible stagger-5 mt-16">
              "Wellness is not a product. It is a practice."
            </blockquote>
          </div>
          <div class="philosophy-image-wrap visible">
            <img src="/images/philosophy_nature_1784053797402.png" alt="Serene mist in forest" class="parallax-img">
          </div>
        </div>
      </section>


      <!-- [NEW] E-Commerce Integration: Best Sellers -->
      <section class="section-spacing bg-sand" id="best-sellers">
        <div class="container">
          <div class="flex justify-between items-end mb-48 visible">
            <div>
              <span class="text-overline text-stone">Community Favorites</span>
              <h2 class="text-title text-forest mt-8">Best Sellers</h2>
            </div>
            <a href="#" class="link-editorial text-sm">Shop All &rarr;</a>
          </div>
          
          <div class="grid-ecommerce">
            <!-- Product 1 -->
            <a href="/products/kids-pure-blend" class="product-card-premium visible stagger-1">
              <div class="product-card-premium-img">
                <img src="/images/products/nabhi-kids-pure-10ml.jpg" loading="lazy" alt="Kids Pure Blend">
                <button class="wishlist-btn" aria-label="Add to wishlist">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
                <div class="quick-view">Quick View</div>
              </div>
              <div class="product-card-details">
                <h3 class="product-title">Kids Pure Blend</h3>
                <p class="product-benefit">Pure & Gentle Protection</p>
                <div class="product-meta">
                  <span class="star-rating">★★★★★</span>
                  <span class="review-count">(105)</span>
                </div>
                <div class="product-price-row">
                  <div style="display: flex; flex-direction: column; gap: 4px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span class="product-price">₹199</span>
                      <span style="text-decoration: line-through; color: #888; font-size: 0.8rem;">₹299</span>
                    </div>
                    <div style="background: #FAF7F2; padding: 4px 8px; border: 1px solid #D4AF37; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px; font-size: 0.75rem;">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#D4AF37" stroke="#D4AF37" stroke-width="1"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                      <span style="color: #B8860B; font-weight: 600;">Gold Member: ₹149</span>
                    </div>
                  </div>
                  <button class="btn-add-to-cart">View Options</button>
                </div>
              </div>
            </a>

            <!-- Product 2 -->
            <a href="/products/men-balance-blend" class="product-card-premium visible stagger-2">
              <div class="product-card-premium-img">
                <img src="/images/products/nabhi-men-balance-10ml.jpg" loading="lazy" alt="Men Balance Blend">
                <button class="wishlist-btn" aria-label="Add to wishlist">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
                <div class="quick-view">Quick View</div>
              </div>
              <div class="product-card-details">
                <h3 class="product-title">Men Balance Blend</h3>
                <p class="product-benefit">Stress Relief & Balance</p>
                <div class="product-meta">
                  <span class="star-rating">★★★★☆</span>
                  <span class="review-count">(120)</span>
                </div>
                <div class="product-price-row">
                  <div style="display: flex; flex-direction: column; gap: 4px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span class="product-price">₹199</span>
                      <span style="text-decoration: line-through; color: #888; font-size: 0.8rem;">₹299</span>
                    </div>
                    <div style="background: #FAF7F2; padding: 4px 8px; border: 1px solid #D4AF37; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px; font-size: 0.75rem;">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#D4AF37" stroke="#D4AF37" stroke-width="1"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                      <span style="color: #B8860B; font-weight: 600;">Gold Member: ₹149</span>
                    </div>
                  </div>
                  <button class="btn-add-to-cart">View Options</button>
                </div>
              </div>
            </a>

            <!-- Product 3 -->
            <a href="/products/women-glow-blend" class="product-card-premium visible stagger-3">
              <div class="product-card-premium-img">
                <img src="/images/products/nabhi-women-glow-10ml.jpg" loading="lazy" alt="Women Glow Blend">
                <button class="wishlist-btn" aria-label="Add to wishlist">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
                <div class="quick-view">Quick View</div>
              </div>
              <div class="product-card-details">
                <h3 class="product-title">Women Glow Blend</h3>
                <p class="product-benefit">Radiance & Inner Glow</p>
                <div class="product-meta">
                  <span class="star-rating">★★★★★</span>
                  <span class="review-count">(215)</span>
                </div>
                <div class="product-price-row">
                  <div style="display: flex; flex-direction: column; gap: 4px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span class="product-price">₹199</span>
                      <span style="text-decoration: line-through; color: #888; font-size: 0.8rem;">₹299</span>
                    </div>
                    <div style="background: #FAF7F2; padding: 4px 8px; border: 1px solid #D4AF37; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px; font-size: 0.75rem;">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#D4AF37" stroke="#D4AF37" stroke-width="1"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                      <span style="color: #B8860B; font-weight: 600;">Gold Member: ₹149</span>
                    </div>
                  </div>
                  <button class="btn-add-to-cart">View Options</button>
                </div>
              </div>
            </a>

            <!-- Product 4 -->
            <a href="/products/senior-balance-blend" class="product-card-premium visible stagger-4">
              <div class="product-card-premium-img">
                <img src="/images/products/nabhi-senior-balance-10ml.jpg" loading="lazy" alt="Senior Balance Blend">
                <button class="wishlist-btn" aria-label="Add to wishlist">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
                <div class="quick-view">Quick View</div>
              </div>
              <div class="product-card-details">
                <h3 class="product-title">Senior Balance Blend</h3>
                <p class="product-benefit">Steadiness & Equilibrium</p>
                <div class="product-meta">
                  <span class="star-rating">★★★★★</span>
                  <span class="review-count">(110)</span>
                </div>
                <div class="product-price-row">
                  <div style="display: flex; flex-direction: column; gap: 4px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span class="product-price">₹199</span>
                      <span style="text-decoration: line-through; color: #888; font-size: 0.8rem;">₹299</span>
                    </div>
                    <div style="background: #FAF7F2; padding: 4px 8px; border: 1px solid #D4AF37; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px; font-size: 0.75rem;">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#D4AF37" stroke="#D4AF37" stroke-width="1"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                      <span style="color: #B8860B; font-weight: 600;">Gold Member: ₹149</span>
                    </div>
                  </div>
                  <button class="btn-add-to-cart">View Options</button>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <!-- Chapter V: Craft -->
      <section class="craft-chapter section-spacing chapter-breath" id="craft">
        <div class="container text-center mb-48 visible">
          <span class="text-overline text-stone">The Process</span>
          <h2 class="text-title text-forest mt-8">Craftsmanship in Every Drop</h2>
        </div>
        <div class="container process-steps">
          <div class="process-step visible stagger-1">
            <div class="step-number">01</div>
            <h3 class="text-subtitle font-display">Source</h3>
            <p class="text-caption mt-4">Ethically harvested from indigenous soils.</p>
            <div class="process-img mt-16">
              <img src="/images/craft_source_1784055479865.png" loading="lazy" alt="Sourcing">
            </div>
            <p class="text-body mt-16">We partner directly with generations of farmers who cultivate the earth using regenerative, chemical-free practices. Only the most potent botanicals are chosen at their peak harvest time.</p>
          </div>
          <div class="process-step visible stagger-2">
            <div class="step-number">02</div>
            <h3 class="text-subtitle font-display">Extract</h3>
            <p class="text-caption mt-4">Cold-pressed to preserve vital prana.</p>
            <div class="process-img mt-16">
              <img src="/images/craft_extract_1784055489353.png" loading="lazy" alt="Extracting">
            </div>
            <p class="text-body mt-16">Using traditional cold-press and slow-decoction methods, we gently coax the active compounds from the plants without using harsh heat or synthetic solvents, ensuring maximum bio-availability.</p>
          </div>
          <div class="process-step visible stagger-3">
            <div class="step-number">03</div>
            <h3 class="text-subtitle font-display">Formulate</h3>
            <p class="text-caption mt-4">Blended according to ancient texts.</p>
            <div class="process-img mt-16">
              <img src="/images/craft_formulate_1784055499258.png" loading="lazy" alt="Formulating">
            </div>
            <p class="text-body mt-16">Our master Ayurvedic practitioners meticulously blend the extracts, strictly adhering to thousands of years of recorded wisdom to balance the three doshas and amplify synergistic effects.</p>
          </div>
          <div class="process-step visible stagger-4">
            <div class="step-number">04</div>
            <h3 class="text-subtitle font-display">Test</h3>
            <p class="text-caption mt-4">Rigorous modern clinical validation.</p>
            <div class="process-img mt-16">
              <img src="/images/craft_test_1784055508740.png" loading="lazy" alt="Testing">
            </div>
            <p class="text-body mt-16">Ancient wisdom is verified by modern science. Every batch undergoes rigorous third-party clinical testing for purity, heavy metals, and active compound potency before it ever leaves our facility.</p>
          </div>
          <div class="process-step visible stagger-5">
            <div class="step-number">05</div>
            <h3 class="text-subtitle font-display">Deliver</h3>
            <p class="text-caption mt-4">Poured into amber glass, sealed with care.</p>
            <div class="process-img mt-16">
              <img src="/images/product_oil_1784053857878.png" loading="lazy" alt="Delivering">
            </div>
            <p class="text-body mt-16">To protect the vital energies of the botanicals from UV degradation, the final formulations are poured into premium dark amber glass, preserving their purity until the moment they touch your skin.</p>
          </div>
        </div>
      </section>

      <!-- Chapter VI: Category Discovery -->
      <section class="collections-chapter section-spacing chapter-breath bg-sand" id="categories">
        <div class="container">
          <div class="flex justify-between items-end mb-48 visible">
            <div>
              <span class="text-overline text-stone">Shop by Benefit</span>
              <h2 class="text-title text-forest mt-8">Category Discovery</h2>
            </div>
            <a href="#" class="link-editorial text-sm">View All Categories &rarr;</a>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-16 md:gap-24">
            <a href="#" class="collection-card visible img-reveal stagger-1" style="display: block; overflow: hidden; border-radius: 8px;">
              <img src="/images/collection_ritual_1784053923143.png" loading="lazy" alt="Immunity" style="width: 100%; aspect-ratio: 3/4; object-fit: cover;">
              <div class="collection-info" style="padding: 1.5rem; text-align: center; position: absolute; bottom: 0; width: 100%; background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);">
                <h3 class="text-subtitle font-display text-ivory">Immunity</h3>
              </div>
            </a>
            <a href="#" class="collection-card visible img-reveal stagger-2" style="display: block; overflow: hidden; border-radius: 8px;">
              <img src="/images/philosophy_nature_1784053797402.png" loading="lazy" alt="Skin Care" style="width: 100%; aspect-ratio: 3/4; object-fit: cover;">
              <div class="collection-info" style="padding: 1.5rem; text-align: center; position: absolute; bottom: 0; width: 100%; background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);">
                <h3 class="text-subtitle font-display text-ivory">Skin Care</h3>
              </div>
            </a>
            <a href="#" class="collection-card visible img-reveal stagger-3" style="display: block; overflow: hidden; border-radius: 8px;">
              <img src="/images/hero_botanical_1784053776794.png" loading="lazy" alt="Stress Relief" style="width: 100%; aspect-ratio: 3/4; object-fit: cover;">
              <div class="collection-info" style="padding: 1.5rem; text-align: center; position: absolute; bottom: 0; width: 100%; background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);">
                <h3 class="text-subtitle font-display text-ivory">Stress Relief</h3>
              </div>
            </a>
            <a href="#" class="collection-card visible img-reveal stagger-4" style="display: block; overflow: hidden; border-radius: 8px;">
              <img src="/images/ingredient_turmeric_1784053818956.png" loading="lazy" alt="Digestive Wellness" style="width: 100%; aspect-ratio: 3/4; object-fit: cover;">
              <div class="collection-info" style="padding: 1.5rem; text-align: center; position: absolute; bottom: 0; width: 100%; background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);">
                <h3 class="text-subtitle font-display text-ivory">Digestive</h3>
              </div>
            </a>
          </div>
        </div>
      </section>

      <!-- Chapter VIII: Trust -->
      <section class="trust-chapter section-spacing chapter-breath" id="trust">
        <div class="container">
          <h2 class="text-title text-forest visible stagger-1 mb-32">Backed by Science.<br>Rooted in Tradition.</h2>
          <div class="grid md:grid-cols-4 gap-24 mb-48">
            <div class="visible stagger-2">
              <div class="stat-number count-up" data-target="5000">0</div>
              <span class="text-overline text-stone">Years of Heritage</span>
            </div>
            <div class="visible stagger-3">
              <div class="stat-number count-up" data-target="100">0</div>
              <span class="text-overline text-stone">% Natural</span>
            </div>
            <div class="visible stagger-4">
              <div class="stat-number count-up" data-target="12">0</div>
              <span class="text-overline text-stone">Clinical Studies</span>
            </div>
             <div class="visible stagger-5">
              <div class="stat-number count-up" data-target="0">0</div>
              <span class="text-overline text-stone">Synthetic Additives</span>
            </div>
          </div>
          <p class="text-body max-w-2xl mx-auto visible stagger-6">
            We bridge the gap between ancient botanical wisdom and rigorous modern extraction techniques to deliver unmatched purity and efficacy.
          </p>
        </div>
      </section>

      <!-- Chapter IX: Knowledge -->
      <section class="knowledge-chapter section-spacing chapter-breath" id="journal">
        <div class="container">
          <div class="flex justify-between items-end mb-48 visible">
            <span class="text-overline text-stone">The Journal</span>
            <a href="#" class="link-editorial">Read all &rarr;</a>
          </div>
          <div class="journal-feature mb-32 journal-card hover-lift visible stagger-1">
            <div class="journal-feature-img img-zoom">
              <img src="/images/journal_wellness_1784053903809.png" loading="lazy" alt="Wellness Morning">
            </div>
            <div class="p-32">
              <span class="badge mb-16">Ritual</span>
              <h3 class="text-title text-forest mb-16">The Art of Dinacharya: Crafting Your Morning Routine</h3>
              <p class="text-body text-charcoal">How aligning with the sun's rhythm can transform your energy levels and mental clarity for the day ahead.</p>
            </div>
          </div>
          <div class="grid md:grid-cols-2 gap-32">
             <div class="journal-card hover-lift visible stagger-2">
              <div class="journal-feature-img img-zoom aspect-video">
                <img src="/images/journal_herbs_1784053913858.png" loading="lazy" alt="Herbs Study">
              </div>
              <div class="pt-16">
                 <span class="badge mb-8">Ingredient</span>
                 <h4 class="text-subtitle font-display">Adaptogens: Nature's Answer to Stress</h4>
              </div>
            </div>
            <div class="journal-card hover-lift visible stagger-3">
              <div class="journal-feature-img img-zoom aspect-video" style="background: var(--sand)">
                 <!-- Placeholder for image -->
              </div>
              <div class="pt-16">
                 <span class="badge mb-8">Wellness</span>
                 <h4 class="text-subtitle font-display">Understanding Your Dosha in Modern Times</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- [NEW] E-Commerce Integration: Recommended Products -->
      <section class="section-spacing" id="recommended-products">
        <div class="container">
          <div class="flex justify-between items-end mb-48 visible">
            <div>
              <span class="text-overline text-stone">Complete Your Ritual</span>
              <h2 class="text-title text-forest mt-8">Recommended For You</h2>
            </div>
          </div>
          
          <div class="grid-ecommerce">
            <!-- Product 1 -->
            <a href="/products/kids-smart-blend" class="product-card-premium visible stagger-1">
              <div class="product-card-premium-img">
                <img src="/images/products/nabhi-kids-smart-10ml.jpg" loading="lazy" alt="Kids Smart Blend">
                <button class="wishlist-btn" aria-label="Add to wishlist">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
                <div class="quick-view">Quick View</div>
              </div>
              <div class="product-card-details">
                <h3 class="product-title">Kids Smart Blend</h3>
                <p class="product-benefit">Supports Focus, Memory & Learning</p>
                <div class="product-meta">
                  <span class="star-rating">★★★★★</span>
                  <span class="review-count">(124)</span>
                </div>
                <div class="product-price-row">
                  <div style="display: flex; flex-direction: column; gap: 4px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span class="product-price">₹199</span>
                      <span style="text-decoration: line-through; color: #888; font-size: 0.8rem;">₹299</span>
                    </div>
                    <div style="background: #FAF7F2; padding: 4px 8px; border: 1px solid #D4AF37; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px; font-size: 0.75rem;">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#D4AF37" stroke="#D4AF37" stroke-width="1"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                      <span style="color: #B8860B; font-weight: 600;">Gold Member: ₹149</span>
                    </div>
                  </div>
                  <button class="btn-add-to-cart">View Options</button>
                </div>
              </div>
            </a>

            <!-- Product 2 -->
            <a href="/products/women-harmony-blend" class="product-card-premium visible stagger-2">
              <div class="product-card-premium-img">
                <img src="/images/products/nabhi-women-harmony-10ml.jpg" loading="lazy" alt="Women Harmony Blend">
                <button class="wishlist-btn" aria-label="Add to wishlist">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
                <div class="quick-view">Quick View</div>
              </div>
              <div class="product-card-details">
                <h3 class="product-title">Women Harmony Blend</h3>
                <p class="product-benefit">Hormonal Balance & Vitality</p>
                <div class="product-meta">
                  <span class="star-rating">★★★★★</span>
                  <span class="review-count">(142)</span>
                </div>
                <div class="product-price-row">
                  <div style="display: flex; flex-direction: column; gap: 4px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span class="product-price">₹199</span>
                      <span style="text-decoration: line-through; color: #888; font-size: 0.8rem;">₹299</span>
                    </div>
                    <div style="background: #FAF7F2; padding: 4px 8px; border: 1px solid #D4AF37; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px; font-size: 0.75rem;">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#D4AF37" stroke="#D4AF37" stroke-width="1"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                      <span style="color: #B8860B; font-weight: 600;">Gold Member: ₹149</span>
                    </div>
                  </div>
                  <button class="btn-add-to-cart">View Options</button>
                </div>
              </div>
            </a>

            <!-- Product 3 -->
            <a href="/products/senior-comfort-blend" class="product-card-premium visible stagger-3">
              <div class="product-card-premium-img">
                <img src="/images/products/nabhi-senior-comfort-10ml.jpg" loading="lazy" alt="Senior Comfort Blend">
                <button class="wishlist-btn" aria-label="Add to wishlist">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
                <div class="quick-view">Quick View</div>
              </div>
              <div class="product-card-details">
                <h3 class="product-title">Senior Comfort Blend</h3>
                <p class="product-benefit">Joint Support & Mobility</p>
                <div class="product-meta">
                  <span class="star-rating">★★★★★</span>
                  <span class="review-count">(98)</span>
                </div>
                <div class="product-price-row">
                  <div style="display: flex; flex-direction: column; gap: 4px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span class="product-price">₹199</span>
                      <span style="text-decoration: line-through; color: #888; font-size: 0.8rem;">₹299</span>
                    </div>
                    <div style="background: #FAF7F2; padding: 4px 8px; border: 1px solid #D4AF37; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px; font-size: 0.75rem;">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#D4AF37" stroke="#D4AF37" stroke-width="1"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                      <span style="color: #B8860B; font-weight: 600;">Gold Member: ₹149</span>
                    </div>
                  </div>
                  <button class="btn-add-to-cart">View Options</button>
                </div>
              </div>
            </a>

            <!-- Product 4 -->
            <a href="/products/men-active-steps-blend" class="product-card-premium visible stagger-4">
              <div class="product-card-premium-img">
                <img src="/images/products/nabhi-men-active-10ml.jpg" loading="lazy" alt="Men Active Steps Blend">
                <button class="wishlist-btn" aria-label="Add to wishlist">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
                <div class="quick-view">Quick View</div>
              </div>
              <div class="product-card-details">
                <h3 class="product-title">Men Active Steps Blend</h3>
                <p class="product-benefit">Energy & Performance</p>
                <div class="product-meta">
                  <span class="star-rating">★★★★★</span>
                  <span class="review-count">(115)</span>
                </div>
                <div class="product-price-row">
                  <div style="display: flex; flex-direction: column; gap: 4px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span class="product-price">₹199</span>
                      <span style="text-decoration: line-through; color: #888; font-size: 0.8rem;">₹299</span>
                    </div>
                    <div style="background: #FAF7F2; padding: 4px 8px; border: 1px solid #D4AF37; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px; font-size: 0.75rem;">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#D4AF37" stroke="#D4AF37" stroke-width="1"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                      <span style="color: #B8860B; font-weight: 600;">Gold Member: ₹149</span>
                    </div>
                  </div>
                  <button class="btn-add-to-cart">View Options</button>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <!-- Chapter X: Circle -->
      <section class="circle-chapter chapter-breath" id="circle">
        <div class="container visible">
          <span class="text-overline text-gold mb-16 block">Membership</span>
          <h2 class="text-title text-forest mb-32">Join the Inner Circle</h2>
          <ul class="flex-col gap-16 mb-48 text-body text-charcoal max-w-lg mx-auto">
            <li>Early access to limited small-batch releases.</li>
            <li>Complimentary consultations with our Ayurvedic practitioners.</li>
            <li>Exclusive invitations to wellness retreats.</li>
          </ul>
          <button class="btn btn-primary magnetic">Request Invitation</button>
        </div>
      </section>

      <!-- Chapter XI: Closing -->
      <section class="closing-chapter">
        <div class="container visible">
          <h2 class="text-title mb-16">Begin Your Journey</h2>
          <p class="text-body mb-32">Subscribe for quiet letters on wellness, rituals, and early access.</p>
          <form class="flex-col items-center gap-24 max-w-md mx-auto">
            <input type="email" placeholder="Your email address" class="newsletter-input" required>
            <button type="submit" class="btn btn-outline text-ivory border-ivory magnetic">Join Our Circle</button>
          </form>
        </div>
      </section>
      
      <section class="brand-statement">
        <div class="container visible">
          <h2 class="text-display text-forest">
            Ancient wisdom.<br>Modern craft.<br>Timeless wellness.
          </h2>
        </div>
      </section>

      <!-- Chapter XII: Foundation -->
      <footer class="footer-chapter">
        <div class="container">
          <div class="grid md:grid-cols-4 gap-48 mb-64">
            <div class="col-span-1">
              <span class="text-overline text-ivory block mb-24">Ayurdhara Divya Shakti</span>
              <p class="text-caption text-stone">Elevating Ayurvedic wellness for the modern era.</p>
            </div>
            <div class="footer-nav flex-col gap-16">
              <a href="#philosophy" class="text-body">Philosophy</a>
              <a href="/collections.html" class="text-body">Collections</a>
              <a href="#ingredients" class="text-body">Ingredients</a>
            </div>
            <div class="footer-nav flex-col gap-16">
              <a href="#craft" class="text-body">Craft</a>
              <a href="#journal" class="text-body">Journal</a>
              <a href="#circle" class="text-body">Circle</a>
            </div>
            <div class="footer-nav flex-col gap-16">
              <a href="#" class="text-body">Contact</a>
              <a href="#" class="text-body">Shipping & Returns</a>
              <a href="#" class="text-body">Terms of Service</a>
            </div>
          </div>
          <div class="flex justify-between items-center pt-32 border-t border-subtle">
            <span class="text-caption text-stone">&copy; 2026 Ayurdhara Divya Shakti. All rights reserved.</span>
            <div class="flex gap-16">
              <!-- Social Icons -->
              <a href="#" class="text-stone hover:text-ivory">IG</a>
              <a href="#" class="text-stone hover:text-ivory">PT</a>
            </div>
          </div>
        </div>
      </footer>
    ` }} />
  );
}