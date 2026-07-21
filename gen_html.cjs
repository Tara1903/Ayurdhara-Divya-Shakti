const fs = require('fs');

const products = [
  // Nabhi Oils (Kids)
  { name: "Kids Smart Blend", benefit: "Supports Focus, Memory & Learning", cat: "kids", goals: "energy", type: "nabhi" },
  { name: "Kids Gentle Blend", benefit: "Gentle Care, Calms & Soothes", cat: "kids", goals: "sleep", type: "nabhi" },
  { name: "Kids Daily Blend", benefit: "Daily Wellness, Stronger Immunity", cat: "kids", goals: "immunity", type: "nabhi" },
  { name: "Kids Pure Blend", benefit: "Pure & Natural, Safe for Kids", cat: "kids", goals: "detox", type: "nabhi" },
  
  // Nabhi Oils (Men)
  { name: "Men Strength Blend", benefit: "Builds Strength, Stamina & Energy", cat: "stress-relief", goals: "energy", type: "nabhi" },
  { name: "Men Vital Blend", benefit: "Boosts Vitality, Power & Confidence", cat: "stress-relief", goals: "energy", type: "nabhi" },
  { name: "Men Balance Blend", benefit: "Balances Body, Mind & Emotions", cat: "stress-relief", goals: "stress", type: "nabhi" },
  { name: "Men Pure Blend", benefit: "Pure & Natural, Daily Wellness", cat: "stress-relief", goals: "detox", type: "nabhi" },
  
  // Nabhi Oils (Women)
  { name: "Women Harmony Blend", benefit: "Hormonal Balance, Inner Harmony", cat: "womens", goals: "stress", type: "nabhi" },
  { name: "Women Care Blend", benefit: "Daily Care, Comfort & Relief", cat: "womens", goals: "stress", type: "nabhi" },
  { name: "Women Glow Blend", benefit: "Natural Glow, Radiant Skin", cat: "skin-care", goals: "skin", type: "nabhi" },
  { name: "Women Pure Blend", benefit: "Pure & Natural, Complete Wellness", cat: "womens", goals: "detox", type: "nabhi" },

  // Nabhi Oils (Senior)
  { name: "Senior Comfort Blend", benefit: "Relieves Discomfort, Joint Ease", cat: "stress-relief", goals: "stress", type: "nabhi" },
  { name: "Senior Vital Blend", benefit: "Improves Vitality, Energy", cat: "stress-relief", goals: "energy", type: "nabhi" },
  { name: "Senior Balance Blend", benefit: "Restores Balance, Calm & Relax", cat: "stress-relief", goals: "sleep", type: "nabhi" },
  { name: "Senior Pure Blend", benefit: "Pure & Natural, Daily Wellness", cat: "stress-relief", goals: "detox", type: "nabhi" },

  // Feet Wellness Oils
  { name: "Kids Soft Steps Blend", benefit: "Nourishes, Soothes & Supports Growth", cat: "kids", goals: "sleep", type: "feet" },
  { name: "Men Active Steps Blend", benefit: "Relieves Fatigue, Refreshes", cat: "stress-relief", goals: "energy", type: "feet" },
  { name: "Women Comfort Steps Blend", benefit: "Relieves Stress, Reduces Swelling", cat: "womens", goals: "stress", type: "feet" },
  { name: "Senior Relax Steps Blend", benefit: "Relaxes Muscles, Restful Sleep", cat: "stress-relief", goals: "sleep", type: "feet" },

  // Combos
  { name: "Individual Trial Combo", benefit: "10ml Nabhi + 30ml Feet", cat: "immunity", goals: "detox", type: "combo", id: "combo-individual-trial", mrp: 599, price: 480 },
  { name: "Family Trial Pack", benefit: "Complete family wellness", cat: "immunity", goals: "detox", type: "combo", id: "combo-family-trial", mrp: 1799, price: 1399 },
  { name: "Individual Gold Wellness Pack", benefit: "4 x 15ml Nabhi + 150ml Feet", cat: "immunity", goals: "detox", type: "combo", id: "combo-individual-gold", mrp: 2599, price: 1899 },
  { name: "Family Gold Wellness Pack", benefit: "240ml Nabhi + 600ml Feet", cat: "immunity", goals: "detox", type: "combo", id: "combo-family-gold", mrp: 10499, price: 5999 },
  { name: "Premium Wellness Pack", benefit: "4 x 50ml Nabhi + 500ml Feet", cat: "immunity", goals: "detox", type: "combo", id: "combo-individual-premium", mrp: 8999, price: 3999 }
];

let html = "";
products.forEach((p, i) => {
  let badge = "";
  if (i < 3) badge = `<div class="col-card-badge badge-bestseller">Bestseller</div>`;
  else if (i > 20) badge = `<div class="col-card-badge badge-limited">Value Pack</div>`;

  let slug = p.name.toLowerCase().replace(/ /g, '-').replace(/,/g, '').replace(/&/g, 'and');
  
  // Calculate discount percentage
  let defaultPrice, defaultMrp, discount;
  if (p.type === 'nabhi') {
    defaultPrice = 149; defaultMrp = 249;
  } else if (p.type === 'feet') {
    defaultPrice = 399; defaultMrp = 599;
  } else {
    defaultPrice = p.price; defaultMrp = p.mrp;
  }
  discount = Math.round(((defaultMrp - defaultPrice) / defaultMrp) * 100);

  let defaultImg = "";
  let variantsHtml = "";

  if (p.type === 'nabhi') {
    let imgSlug = slug;
    // Fix slug for nabhi based on our crop names
    // nabhi-kids-smart, nabhi-men-strength, etc.
    imgSlug = "nabhi-" + slug.replace('-blend', '');
    
    defaultImg = `/images/products/${imgSlug}-10ml.jpg`;
    
    let variants = [
      { size: "10 ml", price: 149, mrp: 249, img: `/images/products/${imgSlug}-10ml.jpg` },
      { size: "15 ml", price: 249, mrp: 399, img: `/images/products/${imgSlug}-15ml.jpg` },
      { size: "50 ml", price: 599, mrp: 899, img: `/images/products/${imgSlug}-15ml.jpg` } // fallback img
    ];

    variantsHtml = `<div class="col-card-variants">
      ${variants.map((v, idx) => `
        <button class="variant-pill ${idx===0?'active':''}" 
          data-price="${v.price}" 
          data-mrp="${v.mrp}" 
          data-img="${v.img}">
          ${v.size}
        </button>
      `).join('')}
    </div>`;
  } else if (p.type === 'feet') {
    let imgSlug = "feet-" + slug.replace('-blend', '');
    
    defaultImg = `/images/products/${imgSlug}-30ml.jpg`;
    
    let variants = [
      { size: "30 ml", price: 399, mrp: 599, img: `/images/products/${imgSlug}-30ml.jpg` },
      { size: "150 ml", price: 1499, mrp: 2199, img: `/images/products/${imgSlug}-150ml.jpg` },
      { size: "500 ml", price: 2999, mrp: 5999, img: `/images/products/${imgSlug}-150ml.jpg` } // fallback img
    ];

    variantsHtml = `<div class="col-card-variants">
      ${variants.map((v, idx) => `
        <button class="variant-pill ${idx===0?'active':''}" 
          data-price="${v.price}" 
          data-mrp="${v.mrp}" 
          data-img="${v.img}">
          ${v.size}
        </button>
      `).join('')}
    </div>`;
  } else {
    // combo
    defaultImg = `/images/products/${p.id}.jpg`;
    variantsHtml = `<div class="col-card-variants"><span class="variant-label">Combo Pack</span></div>`;
  }

  // First 8 items visible, rest load-more
  const displayClass = i >= 8 ? "reveal load-more-item" : "reveal";
  const displayStyle = i >= 8 ? `style="display:none;"` : "";

  html += `
        <!-- Product ${i+1} -->
        <div class="col-product-card ${displayClass}" ${displayStyle} data-category="${p.cat}" data-goals="${p.goals}" data-price="${defaultPrice}" data-rating="5" data-name="${p.name}">
          <div class="col-card-img-wrap">
            ${badge}
            <button class="col-card-wishlist" aria-label="Add to wishlist">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <img src="${defaultImg}" loading="lazy" alt="${p.name}" class="product-main-img">
            <button class="col-card-quickview">Quick View</button>
          </div>
          <div class="col-card-details">
            <h3 class="col-card-name">${p.name}</h3>
            <span class="col-card-benefit">${p.benefit}</span>
            <div class="col-card-rating">
              <span class="col-card-stars">★★★★★</span>
              <span class="col-card-reviews">(120)</span>
            </div>
            ${variantsHtml}
            <div class="col-card-pricing">
              <span class="col-card-price">₹${defaultPrice}</span>
              <span class="col-card-original-price">₹${defaultMrp}</span>
              <span class="col-card-discount">Save ${discount}%</span>
            </div>
            <button class="col-card-add-btn">Add to Cart</button>
          </div>
        </div>
`;
});

fs.writeFileSync('products_html.txt', html);
console.log('Done writing products_html.txt');
