const fs = require('fs');

const headerHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Collections | Ayurdhara Divya Shakti</title>
  <meta name="description" content="Explore our premium collections of authentic Ayurvedic wellness products, crafted for immunity, stress relief, skin care, and holistic balance.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Outfit:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/src/styles/index.css">
</head>
<body class="text-charcoal" id="app">
  <!-- Navigation -->
  <nav class="site-nav" id="site-nav">
    <div class="container flex justify-between items-center">
      <a href="/index.html" class="nav-brand flex items-center magnetic" style="gap: 0.75rem; text-decoration: none;">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.2">
          <path d="M12 22C12 22 4 15 4 8.5C4 4 7.5 2 12 2C16.5 2 20 4 20 8.5C20 15 12 22 12 22Z" stroke-linejoin="round" />
          <path d="M12 22V8" />
          <path d="M12 15C10 12 8 10.5 8 10.5" stroke-linecap="round" />
          <path d="M12 15C14 12 16 10.5 16 10.5" stroke-linecap="round" />
        </svg>
        <span style="font-family: 'Cormorant Garamond', serif; font-size: 1.35rem; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase;">Ayurdhara Divya Shakti</span>
      </a>
      <div class="nav-links">
        <a href="/index.html#philosophy" class="nav-link magnetic">Philosophy</a>
        <a href="/collections.html" class="nav-link magnetic" style="color: var(--gold);">Collections</a>
        <a href="/index.html#craft" class="nav-link magnetic">Craft</a>
        <a href="/index.html#journal" class="nav-link magnetic">Journal</a>
        <a href="/index.html#circle" class="nav-link magnetic">Circle</a>
      </div>
      <button class="nav-toggle magnetic" id="nav-toggle">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    </div>
  </nav>

  <!-- Mobile Nav Overlay -->
  <div class="mobile-nav-overlay" id="mobile-nav-overlay">
    <button class="nav-close" id="nav-close">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
    <div class="mobile-nav-links">
      <a href="/index.html#philosophy" class="mobile-nav-link text-ivory">Philosophy</a>
      <a href="/collections.html" class="mobile-nav-link text-ivory">Collections</a>
      <a href="/index.html#craft" class="mobile-nav-link text-ivory">Craft</a>
      <a href="/index.html#journal" class="mobile-nav-link text-ivory">Journal</a>
      <a href="/index.html#circle" class="mobile-nav-link text-ivory">Circle</a>
    </div>
  </div>

  <!-- Collection Hero -->
  <div class="collection-hero">
    <div class="collection-hero-bg">
      <img src="/images/hero_botanical_1784053776794.png" alt="Ayurvedic botanical collection">
    </div>
    <div class="collection-hero-overlay"></div>
    <div class="collection-hero-content">
      <div class="collection-hero-breadcrumb">
        <a href="/index.html">Home</a>
        <span class="breadcrumb-sep">→</span>
        <a href="/collections.html">Collections</a>
        <span class="breadcrumb-sep">→</span>
        <span>Immunity</span>
      </div>
      <h1 class="collection-hero-title">Immunity Collection</h1>
      <p class="collection-hero-subtitle">Natural formulations crafted to strengthen daily wellness, rooted in 5,000 years of Ayurvedic tradition.</p>
    </div>
  </div>

  <!-- Collection Stats -->
  <div class="collection-stats">
    <div class="container">
      <div class="collection-stats-grid reveal">
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
`;

const footerHtml = `
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

  <footer style="background-color: var(--deep); color: var(--ivory); padding: 4rem 0 2rem;">
    <div class="container text-center">
      <p style="font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 300; margin-bottom: 1rem;">Ayurdhara Divya Shakti</p>
      <p style="font-family: 'Outfit', sans-serif; font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(250,247,242,0.4);">Ancient Wisdom · Modern Science</p>
      <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(250,247,242,0.08);">
        <p style="font-family: 'Outfit', sans-serif; font-size: 0.7rem; color: rgba(250,247,242,0.3);">© 2026 Ayurdhara Divya Shakti. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script type="module" src="/src/collections.js"></script>
</body>
</html>
`;

const productsHtmlPath = require('path').join(__dirname, 'products_html.txt');
const productsHtml = require('fs').readFileSync(productsHtmlPath, 'utf8');

const fullHtml = headerHtml + productsHtml + footerHtml;

require('fs').writeFileSync('collections.html', fullHtml);
console.log('Successfully wrote collections.html');
