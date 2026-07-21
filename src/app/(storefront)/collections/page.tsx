'use client';
import { useEffect } from 'react';

export default function CollectionsPage() {
  useEffect(() => {
    // Dynamically load the collections.js script to run the filter logic
    const script = document.createElement('script');
    script.src = '/collections.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <div id="app" className="text-charcoal" dangerouslySetInnerHTML={{ __html: `<!-- Collection Hero -->
  <div class="collection-hero">
    <div class="collection-hero-bg">
      <img src="/images/hero_botanical_1784053776794.png" alt="Ayurvedic botanical collection">
    </div>
    <div class="collection-hero-overlay"></div>
    <div class="collection-hero-content">
      <div class="collection-hero-breadcrumb">
        <a href="/">Home</a>
        <span class="breadcrumb-sep">→</span>
        <a href="/collections">Collections</a>
        <span class="breadcrumb-sep" id="breadcrumb-sep-cat">→</span>
        <span id="breadcrumb-cat">Immunity</span>
      </div>
      <h1 class="collection-hero-title" id="hero-title">Immunity Collection</h1>
      <p class="collection-hero-subtitle" id="hero-subtitle">Natural formulations crafted to strengthen daily wellness, rooted in 5,000 years of Ayurvedic tradition.</p>
    </div>
  </div>

  <!-- Collection Stats -->
  <div class="collection-stats">
    <div class="container">
      <div class="collection-stats-grid visible">
        <div class="collection-stat">
          <div class="collection-stat-value">24</div>
          <div class="collection-stat-label">Products</div>
        </div>
        <div class="collection-stat">
          <div class="collection-stat-value">100%</div>
          <div class="collection-stat-label">Ayurvedic</div>
        </div>
        <div class="collection-stat">
          <div class="collection-stat-value">Lab</div>
          <div class="collection-stat-label">Tested</div>
        </div>
        <div class="collection-stat">
          <div class="collection-stat-value">India</div>
          <div class="collection-stat-label">Made with Love</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Category Switcher -->
  <div class="category-switcher">
    <div class="container">
      <div class="category-pills">
        <button class="category-pill active" data-category="all">All</button>
        <button class="category-pill" data-category="immunity">Immunity</button>
        <button class="category-pill" data-category="digestive">Digestive Wellness</button>
        <button class="category-pill" data-category="hair-care">Hair Care</button>
        <button class="category-pill" data-category="skin-care">Skin Care</button>
        <button class="category-pill" data-category="stress-relief">Stress Relief</button>
        <button class="category-pill" data-category="womens">Women's Wellness</button>
        <button class="category-pill" data-category="kids">Kids</button>
      </div>
    </div>
  </div>

  <!-- Sticky Toolbar -->
  <div class="collection-toolbar">
    <div class="container">
      <div class="toolbar-inner">
        <div class="toolbar-search">
          <svg class="toolbar-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" class="toolbar-search-input" id="toolbar-search" placeholder="Search products...">
        </div>
        <div class="toolbar-sort">
          <select id="toolbar-sort">
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>
        <button class="toolbar-filter-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
          Filters
        </button>
        <div class="toolbar-view-toggles">
          <button class="toolbar-view-btn active" data-view="grid" aria-label="Grid view">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          </button>
          <button class="toolbar-view-btn" data-view="compact" aria-label="Compact view">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="5" height="16"></rect><rect x="9.5" y="4" width="5" height="16"></rect><rect x="17" y="4" width="5" height="16"></rect></svg>
          </button>
        </div>
        <span class="toolbar-product-count">Showing <span id="product-count-display">8</span> products</span>
      </div>
    </div>
  </div>

  <!-- Mobile Filter Drawer -->
  <div class="filter-drawer-overlay" id="filter-drawer-overlay">
    <div class="filter-drawer">
      <div class="filter-drawer-header">
        <span class="filter-drawer-title">Filters</span>
        <button class="filter-drawer-close" id="filter-drawer-close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <div class="filter-drawer-body">
        <div class="filter-group">
          <div class="filter-group-header">
            <span class="filter-group-title">Health Goals</span>
            <span class="filter-group-toggle"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></span>
          </div>
          <div class="filter-group-body">
            <label class="filter-checkbox"><input type="checkbox" value="immunity"> Immunity</label>
            <label class="filter-checkbox"><input type="checkbox" value="digestion"> Digestion</label>
            <label class="filter-checkbox"><input type="checkbox" value="hair"> Hair Care</label>
            <label class="filter-checkbox"><input type="checkbox" value="skin"> Skin Care</label>
            <label class="filter-checkbox"><input type="checkbox" value="stress"> Stress Relief</label>
            <label class="filter-checkbox"><input type="checkbox" value="sleep"> Sleep</label>
            <label class="filter-checkbox"><input type="checkbox" value="energy"> Energy</label>
            <label class="filter-checkbox"><input type="checkbox" value="detox"> Detox</label>
          </div>
        </div>
      </div>
      <div class="filter-drawer-footer">
        <button class="filter-drawer-reset" id="filter-drawer-reset">Reset</button>
        <button class="filter-drawer-apply" id="filter-drawer-apply">Apply Filters</button>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="collection-main">
    <div class="container">
      <div class="collection-layout">
        <!-- Filter Sidebar (Desktop) -->
        <aside class="filter-sidebar">
          <div class="filter-sidebar-title">
            Filters
            <button class="filter-clear-btn">Clear All</button>
          </div>

          <div class="filter-group">
            <div class="filter-group-header">
              <span class="filter-group-title">Health Goals</span>
              <span class="filter-group-toggle"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></span>
            </div>
            <div class="filter-group-body">
              <label class="filter-checkbox"><input type="checkbox" value="immunity"> Immunity</label>
              <label class="filter-checkbox"><input type="checkbox" value="digestion"> Digestion</label>
              <label class="filter-checkbox"><input type="checkbox" value="hair"> Hair Care</label>
              <label class="filter-checkbox"><input type="checkbox" value="skin"> Skin Care</label>
              <label class="filter-checkbox"><input type="checkbox" value="stress"> Stress Relief</label>
              <label class="filter-checkbox"><input type="checkbox" value="sleep"> Sleep</label>
              <label class="filter-checkbox"><input type="checkbox" value="energy"> Energy</label>
              <label class="filter-checkbox"><input type="checkbox" value="detox"> Detox</label>
            </div>
          </div>

          <div class="filter-group">
            <div class="filter-group-header">
              <span class="filter-group-title">Ingredients</span>
              <span class="filter-group-toggle"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></span>
            </div>
            <div class="filter-group-body">
              <label class="filter-checkbox"><input type="checkbox" value="turmeric"> Turmeric</label>
              <label class="filter-checkbox"><input type="checkbox" value="ashwagandha"> Ashwagandha</label>
              <label class="filter-checkbox"><input type="checkbox" value="amla"> Amla</label>
              <label class="filter-checkbox"><input type="checkbox" value="tulsi"> Tulsi</label>
              <label class="filter-checkbox"><input type="checkbox" value="neem"> Neem</label>
              <label class="filter-checkbox"><input type="checkbox" value="brahmi"> Brahmi</label>
              <label class="filter-checkbox"><input type="checkbox" value="triphala"> Triphala</label>
            </div>
          </div>

          <div class="filter-group">
            <div class="filter-group-header">
              <span class="filter-group-title">Product Type</span>
              <span class="filter-group-toggle"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></span>
            </div>
            <div class="filter-group-body">
              <label class="filter-checkbox"><input type="checkbox" value="capsules"> Capsules</label>
              <label class="filter-checkbox"><input type="checkbox" value="powders"> Powders</label>
              <label class="filter-checkbox"><input type="checkbox" value="oils"> Oils</label>
              <label class="filter-checkbox"><input type="checkbox" value="teas"> Teas</label>
              <label class="filter-checkbox"><input type="checkbox" value="serums"> Serums</label>
            </div>
          </div>

          <div class="filter-group">
            <div class="filter-group-header">
              <span class="filter-group-title">Price Range</span>
              <span class="filter-group-toggle"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></span>
            </div>
            <div class="filter-group-body">
              <div class="filter-price-range">
                <input type="number" placeholder="₹ Min" id="price-min" class="filter-price-input">
                <span class="filter-price-sep">—</span>
                <input type="number" placeholder="₹ Max" id="price-max" class="filter-price-input">
              </div>
            </div>
          </div>
        </aside>

        <!-- Product Grid -->
        <div class="product-grid-collection" id="product-grid">

        <!-- Product 1 -->
        <div class="col-product-card visible"  data-category="kids" data-goals="energy" data-price="149" data-rating="5" data-name="Kids Smart Blend">
          <div class="col-card-img-wrap">
            <div class="col-card-badge badge-bestseller">Bestseller</div>
            <button class="col-card-wishlist" aria-label="Add to wishlist">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <a href="/products/kids-smart-blend"><img src="/images/products/nabhi-kids-smart-10ml.jpg" loading="lazy" alt="Kids Smart Blend" class="product-main-img"></a>
            <button class="col-card-quickview">Quick View</button>
          </div>
          <div class="col-card-details">
            <a href="/products/kids-smart-blend" style="text-decoration:none;color:inherit;"><h3 class="col-card-name">Kids Smart Blend</h3></a>
            <span class="col-card-benefit">Supports Focus, Memory & Learning</span>
            <div class="col-card-rating">
              <span class="col-card-stars">★★★★★</span>
              <span class="col-card-reviews">(120)</span>
            </div>
            <div class="col-card-variants">
      
        <button class="variant-pill active" 
          data-price="149" 
          data-mrp="249" 
          data-img="/images/products/nabhi-kids-smart-10ml.jpg">
          10 ml
        </button>
      
        <button class="variant-pill " 
          data-price="249" 
          data-mrp="399" 
          data-img="/images/products/nabhi-kids-smart-15ml.jpg">
          15 ml
        </button>
      
        <button class="variant-pill " 
          data-price="599" 
          data-mrp="899" 
          data-img="/images/products/nabhi-kids-smart-15ml.jpg">
          50 ml
        </button>
      
    </div>
            <div class="col-card-pricing">
              <span class="col-card-price">₹149</span>
              <span class="col-card-original-price">₹249</span>
              <span class="col-card-discount">Save 40%</span>
            </div>
            <a href="/products/kids-smart-blend" class="col-card-add-btn" style="display:block;text-align:center;text-decoration:none;line-height:48px;">View Options</a>
          </div>
        </div>

        <!-- Product 2 -->
        <div class="col-product-card visible"  data-category="kids" data-goals="sleep" data-price="149" data-rating="5" data-name="Kids Gentle Blend">
          <div class="col-card-img-wrap">
            <div class="col-card-badge badge-bestseller">Bestseller</div>
            <button class="col-card-wishlist" aria-label="Add to wishlist">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <a href="/products/kids-gentle-blend"><img src="/images/products/nabhi-kids-gentle-10ml.jpg" loading="lazy" alt="Kids Gentle Blend" class="product-main-img"></a>
            <button class="col-card-quickview">Quick View</button>
          </div>
          <div class="col-card-details">
            <a href="/products/kids-gentle-blend" style="text-decoration:none;color:inherit;"><h3 class="col-card-name">Kids Gentle Blend</h3></a>
            <span class="col-card-benefit">Gentle Care, Calms & Soothes</span>
            <div class="col-card-rating">
              <span class="col-card-stars">★★★★★</span>
              <span class="col-card-reviews">(120)</span>
            </div>
            <div class="col-card-variants">
      
        <button class="variant-pill active" 
          data-price="149" 
          data-mrp="249" 
          data-img="/images/products/nabhi-kids-gentle-10ml.jpg">
          10 ml
        </button>
      
        <button class="variant-pill " 
          data-price="249" 
          data-mrp="399" 
          data-img="/images/products/nabhi-kids-gentle-15ml.jpg">
          15 ml
        </button>
      
        <button class="variant-pill " 
          data-price="599" 
          data-mrp="899" 
          data-img="/images/products/nabhi-kids-gentle-15ml.jpg">
          50 ml
        </button>
      
    </div>
            <div class="col-card-pricing">
              <span class="col-card-price">₹149</span>
              <span class="col-card-original-price">₹249</span>
              <span class="col-card-discount">Save 40%</span>
            </div>
            <a href="/products/kids-gentle-blend" class="col-card-add-btn" style="display:block;text-align:center;text-decoration:none;line-height:48px;">View Options</a>
          </div>
        </div>

        <!-- Product 3 -->
        <div class="col-product-card visible"  data-category="kids" data-goals="immunity" data-price="149" data-rating="5" data-name="Kids Daily Blend">
          <div class="col-card-img-wrap">
            <div class="col-card-badge badge-bestseller">Bestseller</div>
            <button class="col-card-wishlist" aria-label="Add to wishlist">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <a href="/products/kids-daily-blend"><img src="/images/products/nabhi-kids-daily-10ml.jpg" loading="lazy" alt="Kids Daily Blend" class="product-main-img"></a>
            <button class="col-card-quickview">Quick View</button>
          </div>
          <div class="col-card-details">
            <a href="/products/kids-daily-blend" style="text-decoration:none;color:inherit;"><h3 class="col-card-name">Kids Daily Blend</h3></a>
            <span class="col-card-benefit">Daily Wellness, Stronger Immunity</span>
            <div class="col-card-rating">
              <span class="col-card-stars">★★★★★</span>
              <span class="col-card-reviews">(120)</span>
            </div>
            <div class="col-card-variants">
      
        <button class="variant-pill active" 
          data-price="149" 
          data-mrp="249" 
          data-img="/images/products/nabhi-kids-daily-10ml.jpg">
          10 ml
        </button>
      
        <button class="variant-pill " 
          data-price="249" 
          data-mrp="399" 
          data-img="/images/products/nabhi-kids-daily-15ml.jpg">
          15 ml
        </button>
      
        <button class="variant-pill " 
          data-price="599" 
          data-mrp="899" 
          data-img="/images/products/nabhi-kids-daily-15ml.jpg">
          50 ml
        </button>
      
    </div>
            <div class="col-card-pricing">
              <span class="col-card-price">₹149</span>
              <span class="col-card-original-price">₹249</span>
              <span class="col-card-discount">Save 40%</span>
            </div>
            <a href="/products/kids-daily-blend" class="col-card-add-btn" style="display:block;text-align:center;text-decoration:none;line-height:48px;">View Options</a>
          </div>
        </div>

        <!-- Product 4 -->
        <div class="col-product-card visible"  data-category="kids" data-goals="detox" data-price="149" data-rating="5" data-name="Kids Pure Blend">
          <div class="col-card-img-wrap">
            
            <button class="col-card-wishlist" aria-label="Add to wishlist">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <a href="/products/kids-pure-blend"><img src="/images/products/nabhi-kids-pure-10ml.jpg" loading="lazy" alt="Kids Pure Blend" class="product-main-img"></a>
            <button class="col-card-quickview">Quick View</button>
          </div>
          <div class="col-card-details">
            <a href="/products/kids-pure-blend" style="text-decoration:none;color:inherit;"><h3 class="col-card-name">Kids Pure Blend</h3></a>
            <span class="col-card-benefit">Pure & Natural, Safe for Kids</span>
            <div class="col-card-rating">
              <span class="col-card-stars">★★★★★</span>
              <span class="col-card-reviews">(120)</span>
            </div>
            <div class="col-card-variants">
      
        <button class="variant-pill active" 
          data-price="149" 
          data-mrp="249" 
          data-img="/images/products/nabhi-kids-pure-10ml.jpg">
          10 ml
        </button>
      
        <button class="variant-pill " 
          data-price="249" 
          data-mrp="399" 
          data-img="/images/products/nabhi-kids-pure-15ml.jpg">
          15 ml
        </button>
      
        <button class="variant-pill " 
          data-price="599" 
          data-mrp="899" 
          data-img="/images/products/nabhi-kids-pure-15ml.jpg">
          50 ml
        </button>
      
    </div>
            <div class="col-card-pricing">
              <span class="col-card-price">₹149</span>
              <span class="col-card-original-price">₹249</span>
              <span class="col-card-discount">Save 40%</span>
            </div>
            <a href="/products/kids-pure-blend" class="col-card-add-btn" style="display:block;text-align:center;text-decoration:none;line-height:48px;">View Options</a>
          </div>
        </div>

        <!-- Product 5 -->
        <div class="col-product-card visible"  data-category="stress-relief" data-goals="energy" data-price="149" data-rating="5" data-name="Men Strength Blend">
          <div class="col-card-img-wrap">
            
            <button class="col-card-wishlist" aria-label="Add to wishlist">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <a href="/products/men-strength-blend"><img src="/images/products/nabhi-men-strength-10ml.jpg" loading="lazy" alt="Men Strength Blend" class="product-main-img"></a>
            <button class="col-card-quickview">Quick View</button>
          </div>
          <div class="col-card-details">
            <a href="/products/men-strength-blend" style="text-decoration:none;color:inherit;"><h3 class="col-card-name">Men Strength Blend</h3></a>
            <span class="col-card-benefit">Builds Strength, Stamina & Energy</span>
            <div class="col-card-rating">
              <span class="col-card-stars">★★★★★</span>
              <span class="col-card-reviews">(120)</span>
            </div>
            <div class="col-card-variants">
      
        <button class="variant-pill active" 
          data-price="149" 
          data-mrp="249" 
          data-img="/images/products/nabhi-men-strength-10ml.jpg">
          10 ml
        </button>
      
        <button class="variant-pill " 
          data-price="249" 
          data-mrp="399" 
          data-img="/images/products/nabhi-men-strength-15ml.jpg">
          15 ml
        </button>
      
        <button class="variant-pill " 
          data-price="599" 
          data-mrp="899" 
          data-img="/images/products/nabhi-men-strength-15ml.jpg">
          50 ml
        </button>
      
    </div>
            <div class="col-card-pricing">
              <span class="col-card-price">₹149</span>
              <span class="col-card-original-price">₹249</span>
              <span class="col-card-discount">Save 40%</span>
            </div>
            <a href="/products/men-strength-blend" class="col-card-add-btn" style="display:block;text-align:center;text-decoration:none;line-height:48px;">View Options</a>
          </div>
        </div>

        <!-- Product 6 -->
        <div class="col-product-card visible"  data-category="stress-relief" data-goals="energy" data-price="149" data-rating="5" data-name="Men Vital Blend">
          <div class="col-card-img-wrap">
            
            <button class="col-card-wishlist" aria-label="Add to wishlist">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <a href="/products/men-vital-blend"><img src="/images/products/nabhi-men-vital-10ml.jpg" loading="lazy" alt="Men Vital Blend" class="product-main-img"></a>
            <button class="col-card-quickview">Quick View</button>
          </div>
          <div class="col-card-details">
            <a href="/products/men-vital-blend" style="text-decoration:none;color:inherit;"><h3 class="col-card-name">Men Vital Blend</h3></a>
            <span class="col-card-benefit">Boosts Vitality, Power & Confidence</span>
            <div class="col-card-rating">
              <span class="col-card-stars">★★★★★</span>
              <span class="col-card-reviews">(120)</span>
            </div>
            <div class="col-card-variants">
      
        <button class="variant-pill active" 
          data-price="149" 
          data-mrp="249" 
          data-img="/images/products/nabhi-men-vital-10ml.jpg">
          10 ml
        </button>
      
        <button class="variant-pill " 
          data-price="249" 
          data-mrp="399" 
          data-img="/images/products/nabhi-men-vital-15ml.jpg">
          15 ml
        </button>
      
        <button class="variant-pill " 
          data-price="599" 
          data-mrp="899" 
          data-img="/images/products/nabhi-men-vital-15ml.jpg">
          50 ml
        </button>
      
    </div>
            <div class="col-card-pricing">
              <span class="col-card-price">₹149</span>
              <span class="col-card-original-price">₹249</span>
              <span class="col-card-discount">Save 40%</span>
            </div>
            <a href="/products/men-vital-blend" class="col-card-add-btn" style="display:block;text-align:center;text-decoration:none;line-height:48px;">View Options</a>
          </div>
        </div>

        <!-- Product 7 -->
        <div class="col-product-card visible"  data-category="stress-relief" data-goals="stress" data-price="149" data-rating="5" data-name="Men Balance Blend">
          <div class="col-card-img-wrap">
            
            <button class="col-card-wishlist" aria-label="Add to wishlist">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <a href="/products/men-balance-blend"><img src="/images/products/nabhi-men-balance-10ml.jpg" loading="lazy" alt="Men Balance Blend" class="product-main-img"></a>
            <button class="col-card-quickview">Quick View</button>
          </div>
          <div class="col-card-details">
            <a href="/products/men-balance-blend" style="text-decoration:none;color:inherit;"><h3 class="col-card-name">Men Balance Blend</h3></a>
            <span class="col-card-benefit">Balances Body, Mind & Emotions</span>
            <div class="col-card-rating">
              <span class="col-card-stars">★★★★★</span>
              <span class="col-card-reviews">(120)</span>
            </div>
            <div class="col-card-variants">
      
        <button class="variant-pill active" 
          data-price="149" 
          data-mrp="249" 
          data-img="/images/products/nabhi-men-balance-10ml.jpg">
          10 ml
        </button>
      
        <button class="variant-pill " 
          data-price="249" 
          data-mrp="399" 
          data-img="/images/products/nabhi-men-balance-15ml.jpg">
          15 ml
        </button>
      
        <button class="variant-pill " 
          data-price="599" 
          data-mrp="899" 
          data-img="/images/products/nabhi-men-balance-15ml.jpg">
          50 ml
        </button>
      
    </div>
            <div class="col-card-pricing">
              <span class="col-card-price">₹149</span>
              <span class="col-card-original-price">₹249</span>
              <span class="col-card-discount">Save 40%</span>
            </div>
            <a href="/products/men-balance-blend" class="col-card-add-btn" style="display:block;text-align:center;text-decoration:none;line-height:48px;">View Options</a>
          </div>
        </div>

        <!-- Product 8 -->
        <div class="col-product-card visible"  data-category="stress-relief" data-goals="detox" data-price="149" data-rating="5" data-name="Men Pure Blend">
          <div class="col-card-img-wrap">
            
            <button class="col-card-wishlist" aria-label="Add to wishlist">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <a href="/products/men-pure-blend"><img src="/images/products/nabhi-men-pure-10ml.jpg" loading="lazy" alt="Men Pure Blend" class="product-main-img"></a>
            <button class="col-card-quickview">Quick View</button>
          </div>
          <div class="col-card-details">
            <a href="/products/men-pure-blend" style="text-decoration:none;color:inherit;"><h3 class="col-card-name">Men Pure Blend</h3></a>
            <span class="col-card-benefit">Pure & Natural, Daily Wellness</span>
            <div class="col-card-rating">
              <span class="col-card-stars">★★★★★</span>
              <span class="col-card-reviews">(120)</span>
            </div>
            <div class="col-card-variants">
      
        <button class="variant-pill active" 
          data-price="149" 
          data-mrp="249" 
          data-img="/images/products/nabhi-men-pure-10ml.jpg">
          10 ml
        </button>
      
        <button class="variant-pill " 
          data-price="249" 
          data-mrp="399" 
          data-img="/images/products/nabhi-men-pure-15ml.jpg">
          15 ml
        </button>
      
        <button class="variant-pill " 
          data-price="599" 
          data-mrp="899" 
          data-img="/images/products/nabhi-men-pure-15ml.jpg">
          50 ml
        </button>
      
    </div>
            <div class="col-card-pricing">
              <span class="col-card-price">₹149</span>
              <span class="col-card-original-price">₹249</span>
              <span class="col-card-discount">Save 40%</span>
            </div>
            <a href="/products/men-pure-blend" class="col-card-add-btn" style="display:block;text-align:center;text-decoration:none;line-height:48px;">View Options</a>
          </div>
        </div>

        <!-- Product 9 -->
        <div class="col-product-card visible load-more-item" style="display:none;" data-category="womens" data-goals="stress" data-price="149" data-rating="5" data-name="Women Harmony Blend">
          <div class="col-card-img-wrap">
            
            <button class="col-card-wishlist" aria-label="Add to wishlist">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <a href="/products/women-harmony-blend"><img src="/images/products/nabhi-women-harmony-10ml.jpg" loading="lazy" alt="Women Harmony Blend" class="product-main-img"></a>
            <button class="col-card-quickview">Quick View</button>
          </div>
          <div class="col-card-details">
            <a href="/products/women-harmony-blend" style="text-decoration:none;color:inherit;"><h3 class="col-card-name">Women Harmony Blend</h3></a>
            <span class="col-card-benefit">Hormonal Balance, Inner Harmony</span>
            <div class="col-card-rating">
              <span class="col-card-stars">★★★★★</span>
              <span class="col-card-reviews">(120)</span>
            </div>
            <div class="col-card-variants">
      
        <button class="variant-pill active" 
          data-price="149" 
          data-mrp="249" 
          data-img="/images/products/nabhi-women-harmony-10ml.jpg">
          10 ml
        </button>
      
        <button class="variant-pill " 
          data-price="249" 
          data-mrp="399" 
          data-img="/images/products/nabhi-women-harmony-15ml.jpg">
          15 ml
        </button>
      
        <button class="variant-pill " 
          data-price="599" 
          data-mrp="899" 
          data-img="/images/products/nabhi-women-harmony-15ml.jpg">
          50 ml
        </button>
      
    </div>
            <div class="col-card-pricing">
              <span class="col-card-price">₹149</span>
              <span class="col-card-original-price">₹249</span>
              <span class="col-card-discount">Save 40%</span>
            </div>
            <a href="/products/women-harmony-blend" class="col-card-add-btn" style="display:block;text-align:center;text-decoration:none;line-height:48px;">View Options</a>
          </div>
        </div>

        <!-- Product 10 -->
        <div class="col-product-card visible load-more-item" style="display:none;" data-category="womens" data-goals="stress" data-price="149" data-rating="5" data-name="Women Care Blend">
          <div class="col-card-img-wrap">
            
            <button class="col-card-wishlist" aria-label="Add to wishlist">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <a href="/products/women-care-blend"><img src="/images/products/nabhi-women-care-10ml.jpg" loading="lazy" alt="Women Care Blend" class="product-main-img"></a>
            <button class="col-card-quickview">Quick View</button>
          </div>
          <div class="col-card-details">
            <a href="/products/women-care-blend" style="text-decoration:none;color:inherit;"><h3 class="col-card-name">Women Care Blend</h3></a>
            <span class="col-card-benefit">Daily Care, Comfort & Relief</span>
            <div class="col-card-rating">
              <span class="col-card-stars">★★★★★</span>
              <span class="col-card-reviews">(120)</span>
            </div>
            <div class="col-card-variants">
      
        <button class="variant-pill active" 
          data-price="149" 
          data-mrp="249" 
          data-img="/images/products/nabhi-women-care-10ml.jpg">
          10 ml
        </button>
      
        <button class="variant-pill " 
          data-price="249" 
          data-mrp="399" 
          data-img="/images/products/nabhi-women-care-15ml.jpg">
          15 ml
        </button>
      
        <button class="variant-pill " 
          data-price="599" 
          data-mrp="899" 
          data-img="/images/products/nabhi-women-care-15ml.jpg">
          50 ml
        </button>
      
    </div>
            <div class="col-card-pricing">
              <span class="col-card-price">₹149</span>
              <span class="col-card-original-price">₹249</span>
              <span class="col-card-discount">Save 40%</span>
            </div>
            <a href="/products/women-care-blend" class="col-card-add-btn" style="display:block;text-align:center;text-decoration:none;line-height:48px;">View Options</a>
          </div>
        </div>

        <!-- Product 11 -->
        <div class="col-product-card visible load-more-item" style="display:none;" data-category="skin-care" data-goals="skin" data-price="149" data-rating="5" data-name="Women Glow Blend">
          <div class="col-card-img-wrap">
            
            <button class="col-card-wishlist" aria-label="Add to wishlist">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <a href="/products/women-glow-blend"><img src="/images/products/nabhi-women-glow-10ml.jpg" loading="lazy" alt="Women Glow Blend" class="product-main-img"></a>
            <button class="col-card-quickview">Quick View</button>
          </div>
          <div class="col-card-details">
            <a href="/products/women-glow-blend" style="text-decoration:none;color:inherit;"><h3 class="col-card-name">Women Glow Blend</h3></a>
            <span class="col-card-benefit">Natural Glow, Radiant Skin</span>
            <div class="col-card-rating">
              <span class="col-card-stars">★★★★★</span>
              <span class="col-card-reviews">(120)</span>
            </div>
            <div class="col-card-variants">
      
        <button class="variant-pill active" 
          data-price="149" 
          data-mrp="249" 
          data-img="/images/products/nabhi-women-glow-10ml.jpg">
          10 ml
        </button>
      
        <button class="variant-pill " 
          data-price="249" 
          data-mrp="399" 
          data-img="/images/products/nabhi-women-glow-15ml.jpg">
          15 ml
        </button>
      
        <button class="variant-pill " 
          data-price="599" 
          data-mrp="899" 
          data-img="/images/products/nabhi-women-glow-15ml.jpg">
          50 ml
        </button>
      
    </div>
            <div class="col-card-pricing">
              <span class="col-card-price">₹149</span>
              <span class="col-card-original-price">₹249</span>
              <span class="col-card-discount">Save 40%</span>
            </div>
            <a href="/products/women-glow-blend" class="col-card-add-btn" style="display:block;text-align:center;text-decoration:none;line-height:48px;">View Options</a>
          </div>
        </div>

        <!-- Product 12 -->
        <div class="col-product-card visible load-more-item" style="display:none;" data-category="womens" data-goals="detox" data-price="149" data-rating="5" data-name="Women Pure Blend">
          <div class="col-card-img-wrap">
            
            <button class="col-card-wishlist" aria-label="Add to wishlist">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <a href="/products/women-pure-blend"><img src="/images/products/nabhi-women-pure-10ml.jpg" loading="lazy" alt="Women Pure Blend" class="product-main-img"></a>
            <button class="col-card-quickview">Quick View</button>
          </div>
          <div class="col-card-details">
            <a href="/products/women-pure-blend" style="text-decoration:none;color:inherit;"><h3 class="col-card-name">Women Pure Blend</h3></a>
            <span class="col-card-benefit">Pure & Natural, Complete Wellness</span>
            <div class="col-card-rating">
              <span class="col-card-stars">★★★★★</span>
              <span class="col-card-reviews">(120)</span>
            </div>
            <div class="col-card-variants">
      
        <button class="variant-pill active" 
          data-price="149" 
          data-mrp="249" 
          data-img="/images/products/nabhi-women-pure-10ml.jpg">
          10 ml
        </button>
      
        <button class="variant-pill " 
          data-price="249" 
          data-mrp="399" 
          data-img="/images/products/nabhi-women-pure-15ml.jpg">
          15 ml
        </button>
      
        <button class="variant-pill " 
          data-price="599" 
          data-mrp="899" 
          data-img="/images/products/nabhi-women-pure-15ml.jpg">
          50 ml
        </button>
      
    </div>
            <div class="col-card-pricing">
              <span class="col-card-price">₹149</span>
              <span class="col-card-original-price">₹249</span>
              <span class="col-card-discount">Save 40%</span>
            </div>
            <a href="/products/women-pure-blend" class="col-card-add-btn" style="display:block;text-align:center;text-decoration:none;line-height:48px;">View Options</a>
          </div>
        </div>

        <!-- Product 13 -->
        <div class="col-product-card visible load-more-item" style="display:none;" data-category="stress-relief" data-goals="stress" data-price="149" data-rating="5" data-name="Senior Comfort Blend">
          <div class="col-card-img-wrap">
            
            <button class="col-card-wishlist" aria-label="Add to wishlist">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <a href="/products/senior-comfort-blend"><img src="/images/products/nabhi-senior-comfort-10ml.jpg" loading="lazy" alt="Senior Comfort Blend" class="product-main-img"></a>
            <button class="col-card-quickview">Quick View</button>
          </div>
          <div class="col-card-details">
            <a href="/products/senior-comfort-blend" style="text-decoration:none;color:inherit;"><h3 class="col-card-name">Senior Comfort Blend</h3></a>
            <span class="col-card-benefit">Relieves Discomfort, Joint Ease</span>
            <div class="col-card-rating">
              <span class="col-card-stars">★★★★★</span>
              <span class="col-card-reviews">(120)</span>
            </div>
            <div class="col-card-variants">
      
        <button class="variant-pill active" 
          data-price="149" 
          data-mrp="249" 
          data-img="/images/products/nabhi-senior-comfort-10ml.jpg">
          10 ml
        </button>
      
        <button class="variant-pill " 
          data-price="249" 
          data-mrp="399" 
          data-img="/images/products/nabhi-senior-comfort-15ml.jpg">
          15 ml
        </button>
      
        <button class="variant-pill " 
          data-price="599" 
          data-mrp="899" 
          data-img="/images/products/nabhi-senior-comfort-15ml.jpg">
          50 ml
        </button>
      
    </div>
            <div class="col-card-pricing">
              <span class="col-card-price">₹149</span>
              <span class="col-card-original-price">₹249</span>
              <span class="col-card-discount">Save 40%</span>
            </div>
            <a href="/products/senior-comfort-blend" class="col-card-add-btn" style="display:block;text-align:center;text-decoration:none;line-height:48px;">View Options</a>
          </div>
        </div>

        <!-- Product 14 -->
        <div class="col-product-card visible load-more-item" style="display:none;" data-category="stress-relief" data-goals="energy" data-price="149" data-rating="5" data-name="Senior Vital Blend">
          <div class="col-card-img-wrap">
            
            <button class="col-card-wishlist" aria-label="Add to wishlist">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <a href="/products/senior-vital-blend"><img src="/images/products/nabhi-senior-vital-10ml.jpg" loading="lazy" alt="Senior Vital Blend" class="product-main-img"></a>
            <button class="col-card-quickview">Quick View</button>
          </div>
          <div class="col-card-details">
            <a href="/products/senior-vital-blend" style="text-decoration:none;color:inherit;"><h3 class="col-card-name">Senior Vital Blend</h3></a>
            <span class="col-card-benefit">Improves Vitality, Energy</span>
            <div class="col-card-rating">
              <span class="col-card-stars">★★★★★</span>
              <span class="col-card-reviews">(120)</span>
            </div>
            <div class="col-card-variants">
      
        <button class="variant-pill active" 
          data-price="149" 
          data-mrp="249" 
          data-img="/images/products/nabhi-senior-vital-10ml.jpg">
          10 ml
        </button>
      
        <button class="variant-pill " 
          data-price="249" 
          data-mrp="399" 
          data-img="/images/products/nabhi-senior-vital-15ml.jpg">
          15 ml
        </button>
      
        <button class="variant-pill " 
          data-price="599" 
          data-mrp="899" 
          data-img="/images/products/nabhi-senior-vital-15ml.jpg">
          50 ml
        </button>
      
    </div>
            <div class="col-card-pricing">
              <span class="col-card-price">₹149</span>
              <span class="col-card-original-price">₹249</span>
              <span class="col-card-discount">Save 40%</span>
            </div>
            <a href="/products/senior-vital-blend" class="col-card-add-btn" style="display:block;text-align:center;text-decoration:none;line-height:48px;">View Options</a>
          </div>
        </div>

        <!-- Product 15 -->
        <div class="col-product-card visible load-more-item" style="display:none;" data-category="stress-relief" data-goals="sleep" data-price="149" data-rating="5" data-name="Senior Balance Blend">
          <div class="col-card-img-wrap">
            
            <button class="col-card-wishlist" aria-label="Add to wishlist">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <a href="/products/senior-balance-blend"><img src="/images/products/nabhi-senior-balance-10ml.jpg" loading="lazy" alt="Senior Balance Blend" class="product-main-img"></a>
            <button class="col-card-quickview">Quick View</button>
          </div>
          <div class="col-card-details">
            <a href="/products/senior-balance-blend" style="text-decoration:none;color:inherit;"><h3 class="col-card-name">Senior Balance Blend</h3></a>
            <span class="col-card-benefit">Restores Balance, Calm & Relax</span>
            <div class="col-card-rating">
              <span class="col-card-stars">★★★★★</span>
              <span class="col-card-reviews">(120)</span>
            </div>
            <div class="col-card-variants">
      
        <button class="variant-pill active" 
          data-price="149" 
          data-mrp="249" 
          data-img="/images/products/nabhi-senior-balance-10ml.jpg">
          10 ml
        </button>
      
        <button class="variant-pill " 
          data-price="249" 
          data-mrp="399" 
          data-img="/images/products/nabhi-senior-balance-15ml.jpg">
          15 ml
        </button>
      
        <button class="variant-pill " 
          data-price="599" 
          data-mrp="899" 
          data-img="/images/products/nabhi-senior-balance-15ml.jpg">
          50 ml
        </button>
      
    </div>
            <div class="col-card-pricing">
              <span class="col-card-price">₹149</span>
              <span class="col-card-original-price">₹249</span>
              <span class="col-card-discount">Save 40%</span>
            </div>
            <a href="/products/senior-balance-blend" class="col-card-add-btn" style="display:block;text-align:center;text-decoration:none;line-height:48px;">View Options</a>
          </div>
        </div>

        <!-- Product 16 -->
        <div class="col-product-card visible load-more-item" style="display:none;" data-category="stress-relief" data-goals="detox" data-price="149" data-rating="5" data-name="Senior Pure Blend">
          <div class="col-card-img-wrap">
            
            <button class="col-card-wishlist" aria-label="Add to wishlist">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <a href="/products/senior-pure-blend"><img src="/images/products/nabhi-senior-pure-10ml.jpg" loading="lazy" alt="Senior Pure Blend" class="product-main-img"></a>
            <button class="col-card-quickview">Quick View</button>
          </div>
          <div class="col-card-details">
            <a href="/products/senior-pure-blend" style="text-decoration:none;color:inherit;"><h3 class="col-card-name">Senior Pure Blend</h3></a>
            <span class="col-card-benefit">Pure & Natural, Daily Wellness</span>
            <div class="col-card-rating">
              <span class="col-card-stars">★★★★★</span>
              <span class="col-card-reviews">(120)</span>
            </div>
            <div class="col-card-variants">
      
        <button class="variant-pill active" 
          data-price="149" 
          data-mrp="249" 
          data-img="/images/products/nabhi-senior-pure-10ml.jpg">
          10 ml
        </button>
      
        <button class="variant-pill " 
          data-price="249" 
          data-mrp="399" 
          data-img="/images/products/nabhi-senior-pure-15ml.jpg">
          15 ml
        </button>
      
        <button class="variant-pill " 
          data-price="599" 
          data-mrp="899" 
          data-img="/images/products/nabhi-senior-pure-15ml.jpg">
          50 ml
        </button>
      
    </div>
            <div class="col-card-pricing">
              <span class="col-card-price">₹149</span>
              <span class="col-card-original-price">₹249</span>
              <span class="col-card-discount">Save 40%</span>
            </div>
            <a href="/products/senior-pure-blend" class="col-card-add-btn" style="display:block;text-align:center;text-decoration:none;line-height:48px;">View Options</a>
          </div>
        </div>

        <!-- Product 17 -->
        <div class="col-product-card visible load-more-item" style="display:none;" data-category="kids" data-goals="sleep" data-price="399" data-rating="5" data-name="Kids Soft Steps Blend">
          <div class="col-card-img-wrap">
            
            <button class="col-card-wishlist" aria-label="Add to wishlist">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <a href="/products/kids-soft-steps-blend"><img src="/images/products/feet-kids-soft-steps-30ml.jpg" loading="lazy" alt="Kids Soft Steps Blend" class="product-main-img"></a>
            <button class="col-card-quickview">Quick View</button>
          </div>
          <div class="col-card-details">
            <a href="/products/kids-soft-steps-blend" style="text-decoration:none;color:inherit;"><h3 class="col-card-name">Kids Soft Steps Blend</h3></a>
            <span class="col-card-benefit">Nourishes, Soothes & Supports Growth</span>
            <div class="col-card-rating">
              <span class="col-card-stars">★★★★★</span>
              <span class="col-card-reviews">(120)</span>
            </div>
            <div class="col-card-variants">
      
        <button class="variant-pill active" 
          data-price="399" 
          data-mrp="599" 
          data-img="/images/products/feet-kids-soft-steps-30ml.jpg">
          30 ml
        </button>
      
        <button class="variant-pill " 
          data-price="1499" 
          data-mrp="2199" 
          data-img="/images/products/feet-kids-soft-steps-150ml.jpg">
          150 ml
        </button>
      
        <button class="variant-pill " 
          data-price="2999" 
          data-mrp="5999" 
          data-img="/images/products/feet-kids-soft-steps-150ml.jpg">
          500 ml
        </button>
      
    </div>
            <div class="col-card-pricing">
              <span class="col-card-price">₹399</span>
              <span class="col-card-original-price">₹599</span>
              <span class="col-card-discount">Save 33%</span>
            </div>
            <a href="/products/kids-soft-steps-blend" class="col-card-add-btn" style="display:block;text-align:center;text-decoration:none;line-height:48px;">View Options</a>
          </div>
        </div>

        <!-- Product 18 -->
        <div class="col-product-card visible load-more-item" style="display:none;" data-category="stress-relief" data-goals="energy" data-price="399" data-rating="5" data-name="Men Active Steps Blend">
          <div class="col-card-img-wrap">
            
            <button class="col-card-wishlist" aria-label="Add to wishlist">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <a href="/products/men-active-steps-blend"><img src="/images/products/feet-men-active-steps-30ml.jpg" loading="lazy" alt="Men Active Steps Blend" class="product-main-img"></a>
            <button class="col-card-quickview">Quick View</button>
          </div>
          <div class="col-card-details">
            <a href="/products/men-active-steps-blend" style="text-decoration:none;color:inherit;"><h3 class="col-card-name">Men Active Steps Blend</h3></a>
            <span class="col-card-benefit">Relieves Fatigue, Refreshes</span>
            <div class="col-card-rating">
              <span class="col-card-stars">★★★★★</span>
              <span class="col-card-reviews">(120)</span>
            </div>
            <div class="col-card-variants">
      
        <button class="variant-pill active" 
          data-price="399" 
          data-mrp="599" 
          data-img="/images/products/feet-men-active-steps-30ml.jpg">
          30 ml
        </button>
      
        <button class="variant-pill " 
          data-price="1499" 
          data-mrp="2199" 
          data-img="/images/products/feet-men-active-steps-150ml.jpg">
          150 ml
        </button>
      
        <button class="variant-pill " 
          data-price="2999" 
          data-mrp="5999" 
          data-img="/images/products/feet-men-active-steps-150ml.jpg">
          500 ml
        </button>
      
    </div>
            <div class="col-card-pricing">
              <span class="col-card-price">₹399</span>
              <span class="col-card-original-price">₹599</span>
              <span class="col-card-discount">Save 33%</span>
            </div>
            <a href="/products/men-active-steps-blend" class="col-card-add-btn" style="display:block;text-align:center;text-decoration:none;line-height:48px;">View Options</a>
          </div>
        </div>

        <!-- Product 19 -->
        <div class="col-product-card visible load-more-item" style="display:none;" data-category="womens" data-goals="stress" data-price="399" data-rating="5" data-name="Women Comfort Steps Blend">
          <div class="col-card-img-wrap">
            
            <button class="col-card-wishlist" aria-label="Add to wishlist">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <a href="/products/women-comfort-steps-blend"><img src="/images/products/feet-women-comfort-steps-30ml.jpg" loading="lazy" alt="Women Comfort Steps Blend" class="product-main-img"></a>
            <button class="col-card-quickview">Quick View</button>
          </div>
          <div class="col-card-details">
            <a href="/products/women-comfort-steps-blend" style="text-decoration:none;color:inherit;"><h3 class="col-card-name">Women Comfort Steps Blend</h3></a>
            <span class="col-card-benefit">Relieves Stress, Reduces Swelling</span>
            <div class="col-card-rating">
              <span class="col-card-stars">★★★★★</span>
              <span class="col-card-reviews">(120)</span>
            </div>
            <div class="col-card-variants">
      
        <button class="variant-pill active" 
          data-price="399" 
          data-mrp="599" 
          data-img="/images/products/feet-women-comfort-steps-30ml.jpg">
          30 ml
        </button>
      
        <button class="variant-pill " 
          data-price="1499" 
          data-mrp="2199" 
          data-img="/images/products/feet-women-comfort-steps-150ml.jpg">
          150 ml
        </button>
      
        <button class="variant-pill " 
          data-price="2999" 
          data-mrp="5999" 
          data-img="/images/products/feet-women-comfort-steps-150ml.jpg">
          500 ml
        </button>
      
    </div>
            <div class="col-card-pricing">
              <span class="col-card-price">₹399</span>
              <span class="col-card-original-price">₹599</span>
              <span class="col-card-discount">Save 33%</span>
            </div>
            <a href="/products/women-comfort-steps-blend" class="col-card-add-btn" style="display:block;text-align:center;text-decoration:none;line-height:48px;">View Options</a>
          </div>
        </div>

        <!-- Product 20 -->
        <div class="col-product-card visible load-more-item" style="display:none;" data-category="stress-relief" data-goals="sleep" data-price="399" data-rating="5" data-name="Senior Relax Steps Blend">
          <div class="col-card-img-wrap">
            
            <button class="col-card-wishlist" aria-label="Add to wishlist">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <a href="/products/senior-relax-steps-blend"><img src="/images/products/feet-senior-relax-steps-30ml.jpg" loading="lazy" alt="Senior Relax Steps Blend" class="product-main-img"></a>
            <button class="col-card-quickview">Quick View</button>
          </div>
          <div class="col-card-details">
            <a href="/products/senior-relax-steps-blend" style="text-decoration:none;color:inherit;"><h3 class="col-card-name">Senior Relax Steps Blend</h3></a>
            <span class="col-card-benefit">Relaxes Muscles, Restful Sleep</span>
            <div class="col-card-rating">
              <span class="col-card-stars">★★★★★</span>
              <span class="col-card-reviews">(120)</span>
            </div>
            <div class="col-card-variants">
      
        <button class="variant-pill active" 
          data-price="399" 
          data-mrp="599" 
          data-img="/images/products/feet-senior-relax-steps-30ml.jpg">
          30 ml
        </button>
      
        <button class="variant-pill " 
          data-price="1499" 
          data-mrp="2199" 
          data-img="/images/products/feet-senior-relax-steps-150ml.jpg">
          150 ml
        </button>
      
        <button class="variant-pill " 
          data-price="2999" 
          data-mrp="5999" 
          data-img="/images/products/feet-senior-relax-steps-150ml.jpg">
          500 ml
        </button>
      
    </div>
            <div class="col-card-pricing">
              <span class="col-card-price">₹399</span>
              <span class="col-card-original-price">₹599</span>
              <span class="col-card-discount">Save 33%</span>
            </div>
            <a href="/products/senior-relax-steps-blend" class="col-card-add-btn" style="display:block;text-align:center;text-decoration:none;line-height:48px;">View Options</a>
          </div>
        </div>

        <!-- Product 21 -->
        <div class="col-product-card visible load-more-item" style="display:none;" data-category="immunity" data-goals="detox" data-price="480" data-rating="5" data-name="Individual Trial Combo">
          <div class="col-card-img-wrap">
            
            <button class="col-card-wishlist" aria-label="Add to wishlist">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <a href="/products/individual-trial-combo"><img src="/images/products/combo-individual-trial.jpg" loading="lazy" alt="Individual Trial Combo" class="product-main-img"></a>
            <button class="col-card-quickview">Quick View</button>
          </div>
          <div class="col-card-details">
            <a href="/products/individual-trial-combo" style="text-decoration:none;color:inherit;"><h3 class="col-card-name">Individual Trial Combo</h3></a>
            <span class="col-card-benefit">10ml Nabhi + 30ml Feet</span>
            <div class="col-card-rating">
              <span class="col-card-stars">★★★★★</span>
              <span class="col-card-reviews">(120)</span>
            </div>
            <div class="col-card-variants"><span class="variant-label">Combo Pack</span></div>
            <div class="col-card-pricing">
              <span class="col-card-price">₹480</span>
              <span class="col-card-original-price">₹599</span>
              <span class="col-card-discount">Save 20%</span>
            </div>
            <a href="/products/individual-trial-combo" class="col-card-add-btn" style="display:block;text-align:center;text-decoration:none;line-height:48px;">View Options</a>
          </div>
        </div>

        <!-- Product 22 -->
        <div class="col-product-card visible load-more-item" style="display:none;" data-category="immunity" data-goals="detox" data-price="1399" data-rating="5" data-name="Family Trial Pack">
          <div class="col-card-img-wrap">
            <div class="col-card-badge badge-limited">Value Pack</div>
            <button class="col-card-wishlist" aria-label="Add to wishlist">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <a href="/products/family-trial-pack"><img src="/images/products/combo-family-trial.jpg" loading="lazy" alt="Family Trial Pack" class="product-main-img"></a>
            <button class="col-card-quickview">Quick View</button>
          </div>
          <div class="col-card-details">
            <a href="/products/family-trial-pack" style="text-decoration:none;color:inherit;"><h3 class="col-card-name">Family Trial Pack</h3></a>
            <span class="col-card-benefit">Complete family wellness</span>
            <div class="col-card-rating">
              <span class="col-card-stars">★★★★★</span>
              <span class="col-card-reviews">(120)</span>
            </div>
            <div class="col-card-variants"><span class="variant-label">Combo Pack</span></div>
            <div class="col-card-pricing">
              <span class="col-card-price">₹1399</span>
              <span class="col-card-original-price">₹1799</span>
              <span class="col-card-discount">Save 22%</span>
            </div>
            <a href="/products/family-trial-pack" class="col-card-add-btn" style="display:block;text-align:center;text-decoration:none;line-height:48px;">View Options</a>
          </div>
        </div>

        <!-- Product 23 -->
        <div class="col-product-card visible load-more-item" style="display:none;" data-category="immunity" data-goals="detox" data-price="1899" data-rating="5" data-name="Individual Gold Wellness Pack">
          <div class="col-card-img-wrap">
            <div class="col-card-badge badge-limited">Value Pack</div>
            <button class="col-card-wishlist" aria-label="Add to wishlist">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <a href="/products/individual-gold-wellness-pack"><img src="/images/products/combo-individual-gold.jpg" loading="lazy" alt="Individual Gold Wellness Pack" class="product-main-img"></a>
            <button class="col-card-quickview">Quick View</button>
          </div>
          <div class="col-card-details">
            <a href="/products/individual-gold-wellness-pack" style="text-decoration:none;color:inherit;"><h3 class="col-card-name">Individual Gold Wellness Pack</h3></a>
            <span class="col-card-benefit">4 x 15ml Nabhi + 150ml Feet</span>
            <div class="col-card-rating">
              <span class="col-card-stars">★★★★★</span>
              <span class="col-card-reviews">(120)</span>
            </div>
            <div class="col-card-variants"><span class="variant-label">Combo Pack</span></div>
            <div class="col-card-pricing">
              <span class="col-card-price">₹1899</span>
              <span class="col-card-original-price">₹2599</span>
              <span class="col-card-discount">Save 27%</span>
            </div>
            <a href="/products/individual-gold-wellness-pack" class="col-card-add-btn" style="display:block;text-align:center;text-decoration:none;line-height:48px;">View Options</a>
          </div>
        </div>

        <!-- Product 24 -->
        <div class="col-product-card visible load-more-item" style="display:none;" data-category="immunity" data-goals="detox" data-price="5999" data-rating="5" data-name="Family Gold Wellness Pack">
          <div class="col-card-img-wrap">
            <div class="col-card-badge badge-limited">Value Pack</div>
            <button class="col-card-wishlist" aria-label="Add to wishlist">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <a href="/products/family-gold-wellness-pack"><img src="/images/products/combo-family-gold.jpg" loading="lazy" alt="Family Gold Wellness Pack" class="product-main-img"></a>
            <button class="col-card-quickview">Quick View</button>
          </div>
          <div class="col-card-details">
            <a href="/products/family-gold-wellness-pack" style="text-decoration:none;color:inherit;"><h3 class="col-card-name">Family Gold Wellness Pack</h3></a>
            <span class="col-card-benefit">240ml Nabhi + 600ml Feet</span>
            <div class="col-card-rating">
              <span class="col-card-stars">★★★★★</span>
              <span class="col-card-reviews">(120)</span>
            </div>
            <div class="col-card-variants"><span class="variant-label">Combo Pack</span></div>
            <div class="col-card-pricing">
              <span class="col-card-price">₹5999</span>
              <span class="col-card-original-price">₹10499</span>
              <span class="col-card-discount">Save 43%</span>
            </div>
            <a href="/products/family-gold-wellness-pack" class="col-card-add-btn" style="display:block;text-align:center;text-decoration:none;line-height:48px;">View Options</a>
          </div>
        </div>

        <!-- Product 25 -->
        <div class="col-product-card visible load-more-item" style="display:none;" data-category="immunity" data-goals="detox" data-price="3999" data-rating="5" data-name="Premium Wellness Pack">
          <div class="col-card-img-wrap">
            <div class="col-card-badge badge-limited">Value Pack</div>
            <button class="col-card-wishlist" aria-label="Add to wishlist">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <a href="/products/premium-wellness-pack"><img src="/images/products/combo-individual-premium.jpg" loading="lazy" alt="Premium Wellness Pack" class="product-main-img"></a>
            <button class="col-card-quickview">Quick View</button>
          </div>
          <div class="col-card-details">
            <a href="/products/premium-wellness-pack" style="text-decoration:none;color:inherit;"><h3 class="col-card-name">Premium Wellness Pack</h3></a>
            <span class="col-card-benefit">4 x 50ml Nabhi + 500ml Feet</span>
            <div class="col-card-rating">
              <span class="col-card-stars">★★★★★</span>
              <span class="col-card-reviews">(120)</span>
            </div>
            <div class="col-card-variants"><span class="variant-label">Combo Pack</span></div>
            <div class="col-card-pricing">
              <span class="col-card-price">₹3999</span>
              <span class="col-card-original-price">₹8999</span>
              <span class="col-card-discount">Save 56%</span>
            </div>
            <a href="/products/premium-wellness-pack" class="col-card-add-btn" style="display:block;text-align:center;text-decoration:none;line-height:48px;">View Options</a>
          </div>
        </div>

        </div>
      </div>
    </div>

    <!-- Load More -->
    <div class="collection-load-more">
      <button class="load-more-btn" id="load-more-btn">Load More Products</button>
      <p class="load-more-count">Showing 8 of 25 products</p>
    </div>

    <!-- Empty State -->
    <div class="collection-empty">
      <svg class="collection-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
        <path d="M12 22C12 22 4 15 4 8.5C4 4 7.5 2 12 2C16.5 2 20 4 20 8.5C20 15 12 22 12 22Z" stroke-linejoin="round" />
        <circle cx="12" cy="11" r="3"></circle>
      </svg>
      <h3 class="collection-empty-title">No products found</h3>
      <p class="collection-empty-text">Try adjusting your filters or explore our other collections.</p>
      <div class="collection-empty-suggestions">
        <button class="category-pill" data-category="all">All Products</button>
        <button class="category-pill" data-category="immunity">Immunity</button>
        <button class="category-pill" data-category="skin-care">Skin Care</button>
        <button class="category-pill" data-category="stress-relief">Stress Relief</button>
      </div>
      <button class="collection-empty-reset">Reset All Filters</button>
    </div>
  </div>

  ` }} />
  );
}