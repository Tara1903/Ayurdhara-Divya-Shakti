const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Ayurdhara Divya Shakti - Complete Oil Wellness Care Brochure</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: #F8F6F0;
      color: #242E28;
      font-size: 13px;
      line-height: 1.45;
    }
    .page {
      width: 210mm;
      min-height: 297mm;
      height: 297mm;
      padding: 16mm 18mm;
      position: relative;
      page-break-after: always;
      background: #FAF8F2;
      border: 1px solid transparent;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .page::before {
      content: '';
      position: absolute;
      top: 6mm;
      left: 6mm;
      right: 6mm;
      bottom: 6mm;
      border: 1.5px solid #D6B97B;
      pointer-events: none;
      border-radius: 4px;
    }
    .page::after {
      content: '';
      position: absolute;
      top: 8mm;
      left: 8mm;
      right: 8mm;
      bottom: 8mm;
      border: 0.5px solid rgba(214, 185, 123, 0.4);
      pointer-events: none;
    }

    /* Typography */
    h1, h2, h3, h4, .serif {
      font-family: 'Cinzel', serif;
      letter-spacing: 0.5px;
    }
    .playfair {
      font-family: 'Playfair Display', serif;
    }

    /* Colors */
    .bg-green-dark { background-color: #123C2C; }
    .bg-green-medium { background-color: #1E513D; }
    .bg-green-light { background-color: #EDF3ED; }
    .bg-gold-light { background-color: #FAF4E6; }
    .text-gold { color: #C49746; }
    .text-dark-green { color: #123C2C; }
    .text-forest { color: #1A543E; }
    .border-gold { border-color: #D4AF37; }

    /* Header */
    .header-bar {
      text-align: center;
      padding-bottom: 12px;
      border-bottom: 2px solid #D4AF37;
      margin-bottom: 14px;
      position: relative;
    }
    .brand-logo-text {
      font-size: 26px;
      font-weight: 800;
      color: #123C2C;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
    .brand-subtitle {
      font-size: 10.5px;
      font-weight: 600;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #C49746;
      margin-top: 2px;
    }
    .catalog-title-badge {
      display: inline-block;
      background: linear-gradient(135deg, #123C2C, #1B563F);
      color: #F8F6F0;
      padding: 4px 18px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      margin-top: 8px;
      border: 1px solid #D4AF37;
    }

    /* Category Title Strip */
    .section-header {
      background: linear-gradient(90deg, #123C2C 0%, #1D543F 100%);
      color: #FAF8F2;
      padding: 7px 14px;
      border-radius: 6px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-left: 4px solid #D4AF37;
    }
    .section-header h2 {
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .section-header .tagline {
      font-size: 10px;
      color: #E8D39E;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 600;
    }

    /* Grid Layouts */
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .grid-4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
    }

    /* Cards */
    .card {
      background: #FFFFFF;
      border: 1px solid #E5DEC9;
      border-radius: 8px;
      padding: 11px 13px;
      position: relative;
      box-shadow: 0 2px 5px rgba(0,0,0,0.03);
    }
    .card.highlighted {
      border: 1.5px solid #D4AF37;
      background: #FFFCF5;
    }
    .card-title {
      font-size: 13.5px;
      font-weight: 700;
      color: #123C2C;
      margin-bottom: 3px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .card-subtitle {
      font-size: 10.5px;
      color: #7A6F5D;
      font-weight: 500;
      margin-bottom: 6px;
    }

    /* Variant Box */
    .variant-group {
      background: #F8F6F0;
      border: 1px solid #E6DEC8;
      border-radius: 6px;
      padding: 8px 10px;
      margin-bottom: 7px;
    }
    .variant-group-header {
      font-weight: 700;
      font-size: 11.5px;
      color: #1A543E;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
      border-bottom: 1px solid #E2D7BE;
      padding-bottom: 2px;
    }
    .variant-item {
      font-size: 10.5px;
      display: flex;
      align-items: flex-start;
      margin-bottom: 3px;
      line-height: 1.35;
    }
    .variant-item .bullet {
      color: #C49746;
      font-weight: bold;
      margin-right: 5px;
    }
    .variant-item strong {
      color: #123C2C;
      font-weight: 700;
    }

    /* Price Badge */
    .price-box {
      background: #123C2C;
      color: #FFFFFF;
      border-radius: 5px;
      padding: 6px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 6px;
      border: 1px solid #D4AF37;
    }
    .price-main {
      font-size: 16px;
      font-weight: 800;
      color: #EED69F;
    }
    .price-mrp {
      font-size: 10.5px;
      color: #C2D6CA;
      text-decoration: line-through;
    }
    .price-save {
      background: #C49746;
      color: #FFFFFF;
      font-size: 9.5px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 3px;
      text-transform: uppercase;
    }

    /* Pack Features Pill */
    .specs-pill {
      font-size: 10px;
      background: #E8F0EA;
      color: #1A543E;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 12px;
      display: inline-block;
      margin-top: 4px;
    }
    .cat-selector-pill {
      font-size: 9.5px;
      background: #FAF0D8;
      border: 1px dashed #C49746;
      color: #7A5210;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      display: inline-block;
      margin-top: 4px;
    }

    /* Footer */
    .footer-bar {
      margin-top: auto;
      padding-top: 10px;
      border-top: 1px solid #D6B97B;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 10px;
      color: #706859;
    }
    .footer-bar strong {
      color: #123C2C;
    }
    .trust-badges-row {
      display: flex;
      justify-content: space-around;
      background: #EDF3ED;
      border: 1px solid #C7D9C9;
      border-radius: 6px;
      padding: 6px 10px;
      margin-bottom: 12px;
      text-align: center;
    }
    .trust-badge-item {
      font-size: 9.5px;
      font-weight: 700;
      color: #123C2C;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .trust-badge-item span {
      color: #C49746;
      margin-right: 4px;
    }
  </style>
</head>
<body>

  <!-- PAGE 1: NABHI WELLNESS CARE & NABHI TRIAL PACKS -->
  <div class="page">
    <div class="header-bar">
      <div class="brand-logo-text">Ayurdhara Divya Shakti</div>
      <div class="brand-subtitle">Pure Classical Ayurvedic Wellness & Oil Formulations</div>
      <div class="catalog-title-badge">Official Price & Pack Structure Catalog</div>
    </div>

    <div class="trust-badges-row">
      <div class="trust-badge-item"><span>✦</span> 100% Pure & Natural</div>
      <div class="trust-badge-item"><span>✦</span> GMP Certified Facility</div>
      <div class="trust-badge-item"><span>✦</span> Classical Nabhi Chikitsa</div>
      <div class="trust-badge-item"><span>✦</span> Zero Chemicals / Toxins</div>
      <div class="trust-badge-item"><span>✦</span> Ayush Approved</div>
    </div>

    <!-- SECTION 1: 4 NABHI CATEGORIES (16 VARIANTS) -->
    <div class="section-header">
      <h2>1. Nabhi Wellness Care (16 Targeted Oil Blends)</h2>
      <div class="tagline">Standard Individual Variant Size: 5 ml @ ₹199 each (MRP: ₹299)</div>
    </div>

    <div class="grid-2" style="margin-bottom: 14px;">
      <!-- KIDS CARE -->
      <div class="card">
        <div class="card-title">
          <span>Kids Care Oil Blend (0–12 Yrs)</span>
          <span class="specs-pill">5 ml • ₹199</span>
        </div>
        <div class="card-subtitle">Gentle Ayurvedic nourishment for developing minds & immunity</div>
        <div class="variant-group">
          <div class="variant-item"><span class="bullet">1.</span><div><strong>Kids Smart Oil Blend:</strong> Focus, memory retention & brain vitality</div></div>
          <div class="variant-item"><span class="bullet">2.</span><div><strong>Kids Growth Oil Blend:</strong> Natural physical growth, stamina & bone health</div></div>
          <div class="variant-item"><span class="bullet">3.</span><div><strong>Kids Calm Oil Blend:</strong> Sound restorative sleep & evening relaxation</div></div>
          <div class="variant-item"><span class="bullet">4.</span><div><strong>Kids Daily Care Oil Blend:</strong> Everyday digestion & natural immunity</div></div>
        </div>
      </div>

      <!-- MENS CARE -->
      <div class="card">
        <div class="card-title">
          <span>Men's Care Oil Blend</span>
          <span class="specs-pill">5 ml • ₹199</span>
        </div>
        <div class="card-subtitle">Potent botanical energies for strength, endurance & vitality</div>
        <div class="variant-group">
          <div class="variant-item"><span class="bullet">1.</span><div><strong>Men Strength Oil Blend:</strong> Core stamina, muscle tone & physical power</div></div>
          <div class="variant-item"><span class="bullet">2.</span><div><strong>Men Active Oil Blend:</strong> Sustained daytime energy & active metabolism</div></div>
          <div class="variant-item"><span class="bullet">3.</span><div><strong>Men Heart Balance Oil Blend:</strong> Cardiovascular health & stress modulation</div></div>
          <div class="variant-item"><span class="bullet">4.</span><div><strong>Men Daily Wellness Oil Blend:</strong> Everyday whole-body vitality & vigor</div></div>
        </div>
      </div>

      <!-- WOMENS CARE -->
      <div class="card">
        <div class="card-title">
          <span>Women's Care Oil Blend</span>
          <span class="specs-pill">5 ml • ₹199</span>
        </div>
        <div class="card-subtitle">Harmonizing feminine wellness, hormonal balance & radiance</div>
        <div class="variant-group">
          <div class="variant-item"><span class="bullet">1.</span><div><strong>Women Care Oil Blend:</strong> Hormonal rhythm, cycle ease & feminine balance</div></div>
          <div class="variant-item"><span class="bullet">2.</span><div><strong>Women Daily Wellness:</strong> Sustained energy & natural daily vitality</div></div>
          <div class="variant-item"><span class="bullet">3.</span><div><strong>Women Glow Oil Blend:</strong> Deep skin nourishment & internal detox</div></div>
          <div class="variant-item"><span class="bullet">4.</span><div><strong>Women Harmony Oil Blend:</strong> Emotional tranquility & nervous calm</div></div>
        </div>
      </div>

      <!-- SENIOR CARE -->
      <div class="card">
        <div class="card-title">
          <span>Senior Care Oil Blend (60+ Yrs)</span>
          <span class="specs-pill">5 ml • ₹199</span>
        </div>
        <div class="card-subtitle">Restorative longevity care, joint ease & mental clarity</div>
        <div class="variant-group">
          <div class="variant-item"><span class="bullet">1.</span><div><strong>Senior Active Oil Blend:</strong> Joint flexibility, cartilage support & mobility</div></div>
          <div class="variant-item"><span class="bullet">2.</span><div><strong>Senior Daily Wellness:</strong> Daily vitality & immune defense for golden years</div></div>
          <div class="variant-item"><span class="bullet">3.</span><div><strong>Senior Comfort Oil Blend:</strong> Soothing localized stiffness & discomfort</div></div>
          <div class="variant-item"><span class="bullet">4.</span><div><strong>Senior Balance Oil Blend:</strong> Cognitive serenity & peaceful sleep</div></div>
        </div>
      </div>
    </div>

    <!-- SECTION 2: NABHI TRIAL PACKS -->
    <div class="section-header">
      <h2>2. Nabhi Trial Packs (Category-Specific Trial Packs)</h2>
      <div class="tagline">Family Oil Wellness Packs — Select Any Category</div>
    </div>

    <div class="grid-2" style="margin-bottom: 12px;">
      <!-- NABHI 2-VARIANT -->
      <div class="card highlighted">
        <div class="card-title">
          <span>Nabhi 2-Variant Trial Pack</span>
          <span class="specs-pill" style="background:#C49746; color:#FFF;">POPULAR TRIAL</span>
        </div>
        <div class="card-subtitle"><strong>Inclusions:</strong> 2 x 5 ml Nabhi Oils = 10 ml Total Volume</div>
        <div style="font-size:11px; color:#4A4235; margin-bottom:6px; line-height:1.4;">
          • Select any <strong>2 targeted variants</strong> from one chosen category<br>
          • <strong>Wellness Duration:</strong> Up to 1 Month* Wellness Care
        </div>
        <div class="cat-selector-pill">✦ Category Selector: Kids Care | Men's | Women's | Senior</div>
        <div class="price-box">
          <div>
            <span class="price-main">₹349</span>
            <span class="price-mrp" style="margin-left:6px;">₹499</span>
          </div>
          <div class="price-save">Save 30%</div>
        </div>
      </div>

      <!-- NABHI 4-VARIANT -->
      <div class="card highlighted">
        <div class="card-title">
          <span>Nabhi 4-Variant Trial Pack</span>
          <span class="specs-pill" style="background:#123C2C; color:#EED69F;">FULL CATEGORY</span>
        </div>
        <div class="card-subtitle"><strong>Inclusions:</strong> 4 x 5 ml Nabhi Oils = 20 ml Total Volume</div>
        <div style="font-size:11px; color:#4A4235; margin-bottom:6px; line-height:1.4;">
          • Complete collection: <strong>All 4 variants</strong> from one chosen category<br>
          • <strong>Wellness Duration:</strong> Up to 2 Months* Wellness Care
        </div>
        <div class="cat-selector-pill">✦ Category Selector: Kids Care | Men's | Women's | Senior</div>
        <div class="price-box">
          <div>
            <span class="price-main">₹599</span>
            <span class="price-mrp" style="margin-left:6px;">₹999</span>
          </div>
          <div class="price-save">Save 40%</div>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <div>Official Store: <strong>www.ayurdharadivyashakti.store</strong></div>
      <div>Page 1 of 2 • Nabhi Wellness & Trial Packs</div>
      <div>Ayurvedic Wellness Simplified</div>
    </div>
  </div>


  <!-- PAGE 2: FEET MASSAGE OILS & COMBO TRIAL PACKS -->
  <div class="page">
    <div class="header-bar">
      <div class="brand-logo-text">Ayurdhara Divya Shakti</div>
      <div class="brand-subtitle">Complete Oil Wellness Care & Master Combos</div>
    </div>

    <!-- SECTION 3: FEET MASSAGE OILS -->
    <div class="section-header">
      <h2>3. Feet Massage Oils (Padabhyanga Therapy)</h2>
      <div class="tagline">Restorative Foot Sole Oil for Stress Relief & Sound Sleep</div>
    </div>

    <div class="grid-2" style="margin-bottom: 14px;">
      <!-- FEET TRIAL PACK -->
      <div class="card highlighted">
        <div class="card-title">
          <span>Feet Wellness Trial Pack</span>
          <span class="specs-pill">30 ml • 15 Days</span>
        </div>
        <div class="card-subtitle"><strong>Volume:</strong> 30 ml Bottle • Up to 15 Days* Wellness Care</div>
        <div style="font-size:11px; color:#4A4235; margin-bottom:6px; line-height:1.4;">
          • Infused with cooling, calming herbs to relieve daily foot fatigue & leg strain.<br>
          • Promotes rapid relaxation before bedtime when massaged onto foot soles.
        </div>
        <div class="cat-selector-pill">✦ Category Selector: Kids Care | Men's | Women's | Senior</div>
        <div class="price-box">
          <div>
            <span class="price-main">₹349</span>
            <span class="price-mrp" style="margin-left:6px;">₹499</span>
          </div>
          <div class="price-save">Save 30%</div>
        </div>
      </div>

      <!-- FEET ROUTINE PACK -->
      <div class="card highlighted">
        <div class="card-title">
          <span>Feet Wellness Routine Pack</span>
          <span class="specs-pill">60 ml • 1 Month</span>
        </div>
        <div class="card-subtitle"><strong>Volume:</strong> 60 ml Bottle • Up to 1 Month* Wellness Care</div>
        <div style="font-size:11px; color:#4A4235; margin-bottom:6px; line-height:1.4;">
          • Full 30-day nightly supply for chronic stress relief, deep sleep & circulation.<br>
          • Ideal daily routine companion for working professionals and seniors.
        </div>
        <div class="cat-selector-pill">✦ Category Selector: Kids Care | Men's | Women's | Senior</div>
        <div class="price-box">
          <div>
            <span class="price-main">₹499</span>
            <span class="price-mrp" style="margin-left:6px;">₹699</span>
          </div>
          <div class="price-save">Save 28%</div>
        </div>
      </div>
    </div>

    <!-- SECTION 4: COMBO TRIAL PACKS -->
    <div class="section-header">
      <h2>4. Combo Trial Packs (Family Oil Wellness Combos)</h2>
      <div class="tagline">Integrated Nabhi + Feet + Body Massage Regimens</div>
    </div>

    <div class="grid-2" style="gap: 12px; margin-bottom: 14px;">
      <!-- PRIME TRIAL PACK -->
      <div class="card highlighted">
        <div class="card-title">
          <span>Prime Trial Pack</span>
          <span class="specs-pill" style="background:#1A543E; color:#FFF;">STARTER COMBO</span>
        </div>
        <div class="card-subtitle"><strong>Total Volume: 70 ml</strong> • Up to 1 Month* Wellness Care</div>
        <div style="font-size:11px; color:#4A4235; margin-bottom:6px; line-height:1.4;">
          • <strong>2 x 5 ml Nabhi Oils</strong> (Choice of category)<br>
          • <strong>+ 60 ml Feet Massage Oil</strong>
        </div>
        <div class="cat-selector-pill">✦ Category Selector: Kids Care | Men's | Women's | Senior</div>
        <div class="price-box">
          <div>
            <span class="price-main">₹699</span>
            <span class="price-mrp" style="margin-left:6px;">₹999</span>
          </div>
          <div class="price-save">Save 30%</div>
        </div>
      </div>

      <!-- SILVER TRIAL PACK -->
      <div class="card highlighted">
        <div class="card-title">
          <span>Silver Trial Pack</span>
          <span class="specs-pill" style="background:#708090; color:#FFF;">BEST VALUE</span>
        </div>
        <div class="card-subtitle"><strong>Total Volume: 140 ml</strong> • Up to 2 Months* Wellness Care</div>
        <div style="font-size:11px; color:#4A4235; margin-bottom:6px; line-height:1.4;">
          • <strong>4 x 5 ml Nabhi Oils</strong> (Full category set)<br>
          • <strong>+ 120 ml Feet Massage Oil</strong> (2 x 60 ml)
        </div>
        <div class="cat-selector-pill">✦ Category Selector: Kids Care | Men's | Women's | Senior</div>
        <div class="price-box">
          <div>
            <span class="price-main">₹999</span>
            <span class="price-mrp" style="margin-left:6px;">₹1,499</span>
          </div>
          <div class="price-save">Save 33%</div>
        </div>
      </div>

      <!-- GOLD TRIAL PACK -->
      <div class="card highlighted">
        <div class="card-title">
          <span>Gold Trial Pack</span>
          <span class="specs-pill" style="background:#C49746; color:#FFF;">COMPLETE SELF-CARE</span>
        </div>
        <div class="card-subtitle"><strong>Total Volume: 170 ml</strong> • Up to 1 Month* Wellness Care</div>
        <div style="font-size:11px; color:#4A4235; margin-bottom:6px; line-height:1.4;">
          • <strong>2 x 5 ml Nabhi Oils</strong> (Choice of category)<br>
          • <strong>+ 60 ml Feet Oil + 100 ml Body Massage Oil</strong>
        </div>
        <div class="cat-selector-pill">✦ Category Selector: Kids Care | Men's | Women's | Senior</div>
        <div class="price-box">
          <div>
            <span class="price-main">₹1,199</span>
            <span class="price-mrp" style="margin-left:6px;">₹1,799</span>
          </div>
          <div class="price-save">Save 33%</div>
        </div>
      </div>

      <!-- DIAMOND TRIAL PACK -->
      <div class="card highlighted">
        <div class="card-title">
          <span>Diamond Trial Pack</span>
          <span class="specs-pill" style="background:#123C2C; color:#EED69F;">FLAGSHIP COMBO</span>
        </div>
        <div class="card-subtitle"><strong>Total Volume: 240 ml</strong> • Up to 2 Months* Wellness Care</div>
        <div style="font-size:11px; color:#4A4235; margin-bottom:6px; line-height:1.4;">
          • <strong>4 x 5 ml Nabhi Oils</strong> (Full category set)<br>
          • <strong>+ 120 ml Feet Oil + 100 ml Body Massage Oil</strong>
        </div>
        <div class="cat-selector-pill">✦ Category Selector: Kids Care | Men's | Women's | Senior</div>
        <div class="price-box">
          <div>
            <span class="price-main">₹1,599</span>
            <span class="price-mrp" style="margin-left:6px;">₹2,299</span>
          </div>
          <div class="price-save">Save 30%</div>
        </div>
      </div>
    </div>

    <!-- USAGE & ROUTINE GUIDELINES -->
    <div style="background:#EDF3ED; border:1px solid #CADBCB; border-radius:6px; padding:8px 12px; margin-bottom:10px;">
      <div style="font-weight:700; font-size:11px; color:#123C2C; text-transform:uppercase; margin-bottom:4px;">
        ✦ Daily Application & Routine Guidelines:
      </div>
      <div style="font-size:10px; color:#3A4D3E; line-height:1.45;">
        <strong>• Nabhi Oils (Navel Therapy):</strong> Apply 2–3 drops directly inside the navel button twice daily (morning & night). Gently massage clockwise for 1 minute.<br>
        <strong>• Feet Oils (Padabhyanga):</strong> Apply 5–10 drops on soles before sleep. Massage gently for 3–5 minutes to activate vital reflex points and induce deep sleep.<br>
        <strong>• Body Oil (Abhyanga):</strong> Warm slightly and apply across the body 20 minutes prior to a warm bath for complete cellular rejuvenation.
      </div>
    </div>

    <div class="footer-bar">
      <div>Official Store: <strong>www.ayurdharadivyashakti.store</strong></div>
      <div>Page 2 of 2 • Feet Oils & Combo Wellness Packs</div>
      <div>Helpline: <strong>+91 98765 43210</strong></div>
    </div>
  </div>

</body>
</html>
`;

const htmlFilePath = path.resolve('scripts/catalog_document.html');
fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');
console.log('Wrote HTML template to:', htmlFilePath);

const outputPdfPublic = path.resolve('public/Ayurdhara_Divya_Shakti_Oil_Wellness_Catalog.pdf');
const outputPdfDownloads = 'C:\\Users\\taras\\Downloads\\Ayurdhara_Divya_Shakti_Oil_Wellness_Catalog.pdf';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

let browserPath = fs.existsSync(chromePath) ? chromePath : edgePath;
console.log('Using browser executable for PDF generation:', browserPath);

const cmd = `"${browserPath}" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="${outputPdfPublic}" "${htmlFilePath}"`;
console.log('Executing:', cmd);
execSync(cmd);

fs.copyFileSync(outputPdfPublic, outputPdfDownloads);
console.log('Successfully generated PDF at:');
console.log('1. ', outputPdfPublic);
console.log('2. ', outputPdfDownloads);
