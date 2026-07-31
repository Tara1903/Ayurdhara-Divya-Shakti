export interface ProductVariant {
  id?: string;
  size: string;
  price: number;
  originalPrice: number;
  goldMemberPrice?: number;
  pricingStatus?: 'official' | 'demo';
  goldPricingEnabled?: boolean;
  image: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  story: string;
  benefit: string;
  benefits: { icon: string; text: string }[];
  ingredients: { name: string; botanical: string; role: string; image?: string }[];
  images: string[];
  variants: ProductVariant[];
  price: number;
  originalPrice: number;
  goldMemberPrice?: number;
  discount: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  healthGoals: string[];
  idealFor: string[];
  usageInstructions: { serving: string; timing: string; instructions: string };
  specifications: Record<string, string>;
  certifications: string[];
  faqs: { question: string; answer: string }[];
  relatedProductIds: string[];
  routineProductIds: string[];
  durationText?: string;
  totalQuantityMl?: string;
  goldMembershipEligible?: boolean;
}

export const products: Product[] = [
  // ========================================================
  // 🌿 1. KIDS CARE OIL BLEND
  // ========================================================
  {
    id: "kids-smart-oil-blend",
    slug: "kids-smart-oil-blend",
    name: "Kids Smart Oil Blend",
    category: "Kids Care Oil Blend",
    shortDescription: "Ayurvedic Nabhi oil blend formulated to support cognitive wellness, focus, and natural growth in children.",
    fullDescription: "Kids Smart Oil Blend is handcrafted using traditional cold-pressed sesame oil, almond oil, and child-safe Ayurvedic herbal extracts. Applied daily to the navel (Nabhi), it gently supports natural focus and vitality.",
    story: "Nabhi Chikitsa is an ancient Ayurvedic practice of applying therapeutic botanical oils to the belly button, nourishing vital energy channels (Nadis).",
    benefit: "Supports mental clarity, focus, and overall daily vitality for growing children.",
    benefits: [
      { icon: "Sparkles", text: "Cognitive Focus & Balance" },
      { icon: "Leaf", text: "100% Pure & Child-Safe" },
      { icon: "Shield", text: "Daily Nabhi Nourishment" }
    ],
    ingredients: [
      { name: "Cold-Pressed Sesame Oil", botanical: "Sesamum indicum", role: "Nourishing carrier base" },
      { name: "Pure Sweet Almond Oil", botanical: "Prunus amygdalus", role: "Rich in essential fatty acids" },
      { name: "Brahmi & Shankhpushpi", botanical: "Bacopa monnieri", role: "Traditional cognitive herb extracts" }
    ],
    images: ["/images/products/nabhi-kids-smart-15ml.jpg"],
    variants: [
      { size: "10 ml", price: 199, originalPrice: 299, image: "/images/products/nabhi-kids-smart-10ml.jpg" },
      { size: "20 ml", price: 349, originalPrice: 499, image: "/images/products/nabhi-kids-smart-15ml.jpg" }
    ],
    price: 199,
    originalPrice: 299,
    discount: 33,
    rating: 4.9,
    reviewCount: 128,
    badge: "Bestseller",
    healthGoals: ["Cognitive Focus", "Kids Wellness", "Daily Growth"],
    idealFor: ["Children aged 2+", "Students", "Daily Nabhi Care"],
    usageInstructions: { serving: "2-3 drops", timing: "Before bedtime or after bath", instructions: "Apply 2-3 drops into the navel and gently massage in a clockwise direction." },
    specifications: { "Form": "Nabhi Therapy Oil", "Base": "Cold-Pressed Sesame & Almond", "Origin": "India" },
    certifications: ["100% Organic", "AYUSH Formulated", "Cruelty Free"],
    faqs: [
      { question: "Is this safe for daily use on children?", answer: "Yes, it is specially blended with mild, non-irritating botanical oils suited for children." }
    ],
    relatedProductIds: ["kids-growth-oil-blend", "kids-calm-oil-blend"],
    routineProductIds: ["kids-daily-care-oil-blend"]
  },
  {
    id: "kids-growth-oil-blend",
    slug: "kids-growth-oil-blend",
    name: "Kids Growth Oil Blend",
    category: "Kids Care Oil Blend",
    shortDescription: "Targeted Ayurvedic oil blend formulated for holistic physical development and stamina in children.",
    fullDescription: "Formulated with nutrient-rich botanical oils, Kids Growth Oil Blend gently nourishes the abdominal reflex area, aiding digestion and natural energy absorption.",
    story: "Passed down through Ayurvedic pediatric care, this oil blend harmonizes bodily energies to encourage healthy, steady physical growth.",
    benefit: "Promotes healthy appetite, strong metabolism, and steady growth.",
    benefits: [
      { icon: "Sparkles", text: "Healthy Metabolism Support" },
      { icon: "Leaf", text: "Cold-Pressed Herbs" },
      { icon: "Shield", text: "Gentle Absorption" }
    ],
    ingredients: [
      { name: "Pure Sesame Oil", botanical: "Sesamum indicum", role: "Deep tissue nourishment" },
      { name: "Ashwagandha Extract", botanical: "Withania somnifera", role: "Strength & stamina" },
      { name: "Almond Oil", botanical: "Prunus dulcis", role: "Vitamins E & D" }
    ],
    images: ["/images/products/nabhi-kids-gentle-15ml.jpg"],
    variants: [
      { size: "10 ml", price: 199, originalPrice: 299, image: "/images/products/nabhi-kids-gentle-10ml.jpg" },
      { size: "20 ml", price: 349, originalPrice: 499, image: "/images/products/nabhi-kids-gentle-15ml.jpg" }
    ],
    price: 199,
    originalPrice: 299,
    discount: 33,
    rating: 4.8,
    reviewCount: 94,
    badge: "Popular",
    healthGoals: ["Kids Growth", "Stamina", "Metabolism"],
    idealFor: ["Growing children", "Active kids"],
    usageInstructions: { serving: "2 drops", timing: "Daily morning or evening", instructions: "Apply 2 drops into navel and rub gently for 1 minute." },
    specifications: { "Form": "Nabhi Oil Blend", "Volume": "10ml / 20ml", "Origin": "India" },
    certifications: ["AYUSH Certified", "GMP Certified"],
    faqs: [{ question: "When should this be applied?", answer: "Apply once daily, preferably after a warm bath or before sleep." }],
    relatedProductIds: ["kids-smart-oil-blend"],
    routineProductIds: ["kids-daily-care-oil-blend"]
  },
  {
    id: "kids-calm-oil-blend",
    slug: "kids-calm-oil-blend",
    name: "Kids Calm Oil Blend",
    category: "Kids Care Oil Blend",
    shortDescription: "Soothing Nabhi oil blend designed to relax restless children and promote restful sleep.",
    fullDescription: "Infused with calming herbal notes, Kids Calm Oil Blend eases evening restlessness and supports peaceful, uninterrupted sleep through abdominal reflexology.",
    story: "Created to help children wind down after active days, utilizing Ayurvedic aromatics and soothing botanical infusions.",
    benefit: "Calms evening restlessness and encourages peaceful sleep.",
    benefits: [
      { icon: "Sparkles", text: "Restful Night Sleep" },
      { icon: "Leaf", text: "Soothing Aromatics" },
      { icon: "Shield", text: "Natural Relaxation" }
    ],
    ingredients: [
      { name: "Cold-Pressed Sesame Oil", botanical: "Sesamum indicum", role: "Calming base" },
      { name: "Jatamansi & Lavender", botanical: "Nardostachys jatamansi", role: "Nervine relaxant" }
    ],
    images: ["/images/products/nabhi-kids-pure-15ml.jpg"],
    variants: [
      { size: "10 ml", price: 199, originalPrice: 299, image: "/images/products/nabhi-kids-pure-10ml.jpg" },
      { size: "20 ml", price: 349, originalPrice: 499, image: "/images/products/nabhi-kids-pure-15ml.jpg" }
    ],
    price: 199,
    originalPrice: 299,
    discount: 33,
    rating: 4.9,
    reviewCount: 112,
    badge: "Restful Sleep",
    healthGoals: ["Relaxation", "Restful Sleep", "Stress Relief"],
    idealFor: ["Kids with bedtime anxiety or high energy"],
    usageInstructions: { serving: "2 drops", timing: "Before bedtime", instructions: "Massage 2 drops into navel 15 minutes before sleep." },
    specifications: { "Form": "Nabhi Oil", "Base": "Pure Sesame & Botanicals" },
    certifications: ["100% Pure", "Toxin-Free"],
    faqs: [{ question: "Can this be used every night?", answer: "Yes, it is entirely natural and gentle for nightly sleep rituals." }],
    relatedProductIds: ["kids-smart-oil-blend"],
    routineProductIds: ["kids-daily-care-oil-blend"]
  },
  {
    id: "kids-daily-care-oil-blend",
    slug: "kids-daily-care-oil-blend",
    name: "Kids Daily Care Oil Blend",
    category: "Kids Care Oil Blend",
    shortDescription: "All-in-one daily Nabhi oil for childhood immunity, digestive harmony, and overall wellness.",
    fullDescription: "A balanced foundational Nabhi oil for daily childhood maintenance, helping protect against seasonal changes and maintaining digestive balance.",
    story: "Designed as an essential daily ritual for parents seeking holistic health for their growing family.",
    benefit: "Protects childhood immunity and balances daily digestion.",
    benefits: [
      { icon: "Sparkles", text: "Immunity & Gut Balance" },
      { icon: "Leaf", text: "Wild-Harvested Herbs" },
      { icon: "Shield", text: "Daily Defense" }
    ],
    ingredients: [
      { name: "Sesame & Almond Base", botanical: "Mixed", role: "Nutritive oil base" },
      { name: "Tulsi & Turmeric Extracts", botanical: "Ocimum sanctum", role: "Immunity support" }
    ],
    images: ["/images/products/nabhi-kids-daily-15ml.jpg"],
    variants: [
      { size: "10 ml", price: 199, originalPrice: 299, image: "/images/products/nabhi-kids-daily-10ml.jpg" },
      { size: "20 ml", price: 349, originalPrice: 499, image: "/images/products/nabhi-kids-daily-15ml.jpg" }
    ],
    price: 199,
    originalPrice: 299,
    discount: 33,
    rating: 4.9,
    reviewCount: 156,
    badge: "Daily Essential",
    healthGoals: ["Daily Immunity", "Gut Harmony"],
    idealFor: ["All children for daily care"],
    usageInstructions: { serving: "2-3 drops", timing: "Morning & Night", instructions: "Apply into navel daily after bath." },
    specifications: { "Form": "Nabhi Oil" },
    certifications: ["Organic", "AYUSH Approved"],
    faqs: [{ question: "Is it suitable for infants?", answer: "Recommended for children aged 2 years and above." }],
    relatedProductIds: ["kids-smart-oil-blend"],
    routineProductIds: ["kids-growth-oil-blend"]
  },

  // ========================================================
  // 🌿 2. MEN WELLNESS OIL BLEND
  // ========================================================
  {
    id: "men-strength-oil-blend",
    slug: "men-strength-oil-blend",
    name: "Men Strength Oil Blend",
    category: "Men Wellness Oil Blend",
    shortDescription: "Potent Ayurvedic Nabhi therapy blend engineered for vitality, vigor, and core muscle strength.",
    fullDescription: "Men Strength Oil Blend combines traditional cold-pressed sesame oil with potent Ayurvedic revitalizers. Applied via Nabhi therapy, it nourishes core abdominal energy points to support male vitality.",
    story: "Rooted in Rasayana and Vajikarana traditions, formulated to restore lost stamina and combat daily physical exhaustion.",
    benefit: "Enhances core vitality, stamina, and muscular energy.",
    benefits: [
      { icon: "Sparkles", text: "Vigor & Core Strength" },
      { icon: "Leaf", text: "Pure Herbal Extracts" },
      { icon: "Shield", text: "Energy Balance" }
    ],
    ingredients: [
      { name: "Cold-Pressed Sesame Oil", botanical: "Sesamum indicum", role: "Carrier" },
      { name: "Ashwagandha & Safed Musli", botanical: "Withania somnifera", role: "Strength & vigor" }
    ],
    images: ["/images/products/nabhi-men-strength-15ml.jpg"],
    variants: [
      { size: "10 ml", price: 199, originalPrice: 299, image: "/images/products/nabhi-men-strength-10ml.jpg" },
      { size: "20 ml", price: 349, originalPrice: 499, image: "/images/products/nabhi-men-strength-15ml.jpg" }
    ],
    price: 199,
    originalPrice: 299,
    discount: 33,
    rating: 4.9,
    reviewCount: 210,
    badge: "Top Rated",
    healthGoals: ["Men's Stamina", "Muscle Energy", "Vitality"],
    idealFor: ["Active men", "Fitness enthusiasts"],
    usageInstructions: { serving: "2-3 drops", timing: "Bedtime", instructions: "Apply into navel and rub gently in clockwise motion." },
    specifications: { "Form": "Nabhi Oil", "Base": "Sesame & Ayurvedic Extracts" },
    certifications: ["100% Ayurvedic", "GMP Certified"],
    faqs: [{ question: "How long until results are noticed?", answer: "Regular daily use for 3-4 weeks delivers optimal wellness balance." }],
    relatedProductIds: ["men-active-oil-blend"],
    routineProductIds: ["men-daily-wellness-oil-blend"]
  },
  {
    id: "men-active-oil-blend",
    slug: "men-active-oil-blend",
    name: "Men Active Oil Blend",
    category: "Men Wellness Oil Blend",
    shortDescription: "Refreshing wellness blend formulated for active lifestyles, stamina maintenance, and stress reduction.",
    fullDescription: "Men Active Oil Blend helps active individuals combat daily fatigue, supporting endurance and metabolic activity.",
    story: "Crafted for high-performance routines, blending energizing herbs into a deeply penetrating oil base.",
    benefit: "Boosts endurance, metabolic energy, and mental agility.",
    benefits: [
      { icon: "Sparkles", text: "Endurance & Agility" },
      { icon: "Leaf", text: "Cold-Pressed Oils" },
      { icon: "Shield", text: "Anti-Fatigue" }
    ],
    ingredients: [
      { name: "Sesame Oil Base", botanical: "Sesamum indicum", role: "Carrier" },
      { name: "Gokshura & Shatavari", botanical: "Tribulus terrestris", role: "Active vigor" }
    ],
    images: ["/images/products/nabhi-men-vital-15ml.jpg"],
    variants: [
      { size: "10 ml", price: 199, originalPrice: 299, image: "/images/products/nabhi-men-vital-10ml.jpg" },
      { size: "20 ml", price: 349, originalPrice: 499, image: "/images/products/nabhi-men-vital-15ml.jpg" }
    ],
    price: 199,
    originalPrice: 299,
    discount: 33,
    rating: 4.8,
    reviewCount: 165,
    badge: "Popular",
    healthGoals: ["Endurance", "Active Fitness", "Metabolism"],
    idealFor: ["Working professionals", "Athletes"],
    usageInstructions: { serving: "2 drops", timing: "Morning or Night", instructions: "Apply to navel after shower." },
    specifications: { "Form": "Nabhi Oil" },
    certifications: ["AYUSH Formulated"],
    faqs: [{ question: "Is it non-sticky?", answer: "Yes, it absorbs quickly when massaged properly into the navel." }],
    relatedProductIds: ["men-strength-oil-blend"],
    routineProductIds: ["men-daily-wellness-oil-blend"]
  },
  {
    id: "men-heart-balance-oil-blend",
    slug: "men-heart-balance-oil-blend",
    name: "Men Heart Balance Oil Blend",
    category: "Men Wellness Oil Blend",
    shortDescription: "Specialized Nabhi oil to support emotional calm, circulatory harmony, and stress management.",
    fullDescription: "Formulated with Arjuna and soothing adaptogens, Men Heart Balance Oil Blend supports cardiovascular calmness and stress resilience.",
    story: "Harmonizes the heart lotus (Hridaya) and solar plexus energies via abdominal oil therapy.",
    benefit: "Promotes cardiovascular relaxation and reduces mental tension.",
    benefits: [
      { icon: "Sparkles", text: "Circulatory Harmony" },
      { icon: "Leaf", text: "Arjuna Infused" },
      { icon: "Shield", text: "Stress Defense" }
    ],
    ingredients: [
      { name: "Sesame Oil", botanical: "Sesamum indicum", role: "Carrier" },
      { name: "Arjuna Bark Extract", botanical: "Terminalia arjuna", role: "Heart tonic" }
    ],
    images: ["/images/products/nabhi-men-balance-15ml.jpg"],
    variants: [
      { size: "10 ml", price: 199, originalPrice: 299, image: "/images/products/nabhi-men-balance-10ml.jpg" },
      { size: "20 ml", price: 349, originalPrice: 499, image: "/images/products/nabhi-men-balance-15ml.jpg" }
    ],
    price: 199,
    originalPrice: 299,
    discount: 33,
    rating: 4.9,
    reviewCount: 142,
    badge: "Heart Care",
    healthGoals: ["Cardiovascular Calm", "Stress Reduction"],
    idealFor: ["Men seeking stress balance"],
    usageInstructions: { serving: "2 drops", timing: "Bedtime", instructions: "Massage gently into navel." },
    specifications: { "Form": "Nabhi Oil Blend" },
    certifications: ["Organic", "Cruelty Free"],
    faqs: [{ question: "Can it be used alongside medications?", answer: "Yes, Nabhi application is external and complementary." }],
    relatedProductIds: ["men-strength-oil-blend"],
    routineProductIds: ["men-daily-wellness-oil-blend"]
  },
  {
    id: "men-daily-wellness-oil-blend",
    slug: "men-daily-wellness-oil-blend",
    name: "Men Daily Wellness Oil Blend",
    category: "Men Wellness Oil Blend",
    shortDescription: "Comprehensive daily Nabhi oil for men to sustain stamina, digestion, and systemic balance.",
    fullDescription: "A foundational daily oil blend crafted to keep men energized, balanced, and resilient against everyday environmental stressors.",
    story: "Designed as an indispensable daily self-care ritual for modern male health.",
    benefit: "Maintains peak daily energy, gut balance, and systemic harmony.",
    benefits: [
      { icon: "Sparkles", text: "Daily Energy & Vigor" },
      { icon: "Leaf", text: "100% Herbal" },
      { icon: "Shield", text: "Systemic Balance" }
    ],
    ingredients: [
      { name: "Cold-Pressed Oils Base", botanical: "Mixed", role: "Nourishment" },
      { name: "Tridoshic Herbal Blend", botanical: "Various", role: "Balance" }
    ],
    images: ["/images/products/nabhi-men-pure-15ml.jpg"],
    variants: [
      { size: "10 ml", price: 199, originalPrice: 299, image: "/images/products/nabhi-men-pure-10ml.jpg" },
      { size: "20 ml", price: 349, originalPrice: 499, image: "/images/products/nabhi-men-pure-15ml.jpg" }
    ],
    price: 199,
    originalPrice: 299,
    discount: 33,
    rating: 4.9,
    reviewCount: 230,
    badge: "Daily Ritual",
    healthGoals: ["Daily Vitality", "Immunity"],
    idealFor: ["All men for everyday care"],
    usageInstructions: { serving: "2-3 drops", timing: "Daily morning/night", instructions: "Apply into navel daily." },
    specifications: { "Form": "Nabhi Oil" },
    certifications: ["AYUSH Approved"],
    faqs: [{ question: "How often should I use it?", answer: "Daily application provides consistent energy and vitality." }],
    relatedProductIds: ["men-strength-oil-blend"],
    routineProductIds: ["men-active-oil-blend"]
  },

  // ========================================================
  // 🌿 3. WOMEN WELLNESS OIL BLEND
  // ========================================================
  {
    id: "women-harmony-oil-blend",
    slug: "women-harmony-oil-blend",
    name: "Women Harmony Oil Blend",
    category: "Women Wellness Oil Blend",
    shortDescription: "Ayurvedic Nabhi therapy formulated for hormonal balance, menstrual comfort, and emotional poise.",
    fullDescription: "Women Harmony Oil Blend combines Shatavari, Lodhra, and rich sesame oil to support female reproductive wellness and hormonal equilibrium.",
    story: "Derived from classic Stree Roga Ayurvedic scriptures to honor and support natural female monthly cycles.",
    benefit: "Balances hormones, eases menstrual cramps, and promotes emotional equilibrium.",
    benefits: [
      { icon: "Sparkles", text: "Hormonal Equilibrium" },
      { icon: "Leaf", text: "Shatavari Infused" },
      { icon: "Shield", text: "Menstrual Comfort" }
    ],
    ingredients: [
      { name: "Cold-Pressed Sesame Oil", botanical: "Sesamum indicum", role: "Carrier" },
      { name: "Shatavari Extract", botanical: "Asparagus racemosus", role: "Hormonal harmony" },
      { name: "Lodhra & Ashoka", botanical: "Symplocos racemosa", role: "Uterine tonic" }
    ],
    images: ["/images/products/nabhi-women-harmony-15ml.jpg"],
    variants: [
      { size: "10 ml", price: 199, originalPrice: 299, image: "/images/products/nabhi-women-harmony-10ml.jpg" },
      { size: "20 ml", price: 349, originalPrice: 499, image: "/images/products/nabhi-women-harmony-15ml.jpg" }
    ],
    price: 199,
    originalPrice: 299,
    discount: 33,
    rating: 4.9,
    reviewCount: 310,
    badge: "Bestseller",
    healthGoals: ["Hormonal Balance", "Menstrual Care", "Emotional Harmony"],
    idealFor: ["Women of all ages", "Cycle balance"],
    usageInstructions: { serving: "2-3 drops", timing: "Nightly", instructions: "Massage into navel in clockwise circles before sleep." },
    specifications: { "Form": "Nabhi Oil", "Origin": "India" },
    certifications: ["100% Organic", "AYUSH Formulated"],
    faqs: [{ question: "Can it be used during period days?", answer: "Yes, gentle Nabhi therapy during periods helps ease abdominal tightness." }],
    relatedProductIds: ["women-care-oil-blend", "women-glow-oil-blend"],
    routineProductIds: ["women-daily-wellness-oil-blend"]
  },
  {
    id: "women-care-oil-blend",
    slug: "women-care-oil-blend",
    name: "Women Care Oil Blend",
    category: "Women Wellness Oil Blend",
    shortDescription: "Gentle restorative blend crafted for pelvic wellness, vitality, and internal balance.",
    fullDescription: "Formulated for overall gynecological vitality, Women Care Oil Blend strengthens internal abdominal channels through daily Nabhi oil massage.",
    story: "Restores female inner strength (Ojas) using traditional cold-pressed herbal infusions.",
    benefit: "Enhances pelvic vitality, digestive ease, and overall stamina.",
    benefits: [
      { icon: "Sparkles", text: "Pelvic Vitality" },
      { icon: "Leaf", text: "Pure Herbal Care" },
      { icon: "Shield", text: "Inner Strength" }
    ],
    ingredients: [
      { name: "Sesame Oil", botanical: "Sesamum indicum", role: "Carrier" },
      { name: "Manjistha & Dashmula", botanical: "Rubia cordifolia", role: "Detoxification" }
    ],
    images: ["/images/products/nabhi-women-care-15ml.jpg"],
    variants: [
      { size: "10 ml", price: 199, originalPrice: 299, image: "/images/products/nabhi-women-care-10ml.jpg" },
      { size: "20 ml", price: 349, originalPrice: 499, image: "/images/products/nabhi-women-care-15ml.jpg" }
    ],
    price: 199,
    originalPrice: 299,
    discount: 33,
    rating: 4.8,
    reviewCount: 185,
    badge: "Restorative",
    healthGoals: ["Women's Vitality", "Pelvic Care"],
    idealFor: ["Women seeking daily abdominal wellness"],
    usageInstructions: { serving: "2 drops", timing: "Bedtime", instructions: "Apply into navel and rub gently." },
    specifications: { "Form": "Nabhi Oil Blend" },
    certifications: ["GMP Certified"],
    faqs: [{ question: "Is it suitable for postpartum care?", answer: "Yes, it provides wonderful gentle nourishment after childbirth once cleared by your practitioner." }],
    relatedProductIds: ["women-harmony-oil-blend"],
    routineProductIds: ["women-daily-wellness-oil-blend"]
  },
  {
    id: "women-glow-oil-blend",
    slug: "women-glow-oil-blend",
    name: "Women Glow Oil Blend",
    category: "Women Wellness Oil Blend",
    shortDescription: "Radiance-boosting Nabhi oil designed to detoxify blood and enhance natural skin glow from within.",
    fullDescription: "True skin radiance begins in the gut and blood. Women Glow Oil Blend delivers blood-purifying Ayurvedic herbs straight through the Nabhi plexus to promote luminous skin.",
    story: "Ayurveda teaches that clear skin reflects pure blood (Rakta Dhatu). This blend targets blood purification at the core.",
    benefit: "Purifies blood, reduces blemishes, and restores natural skin radiance.",
    benefits: [
      { icon: "Sparkles", text: "Natural Skin Radiance" },
      { icon: "Leaf", text: "Kumkumadi & Rose" },
      { icon: "Shield", text: "Blood Detox" }
    ],
    ingredients: [
      { name: "Almond & Sesame Base", botanical: "Prunus dulcis", role: "Skin nourishment" },
      { name: "Saffron & Manjistha", botanical: "Crocus sativus", role: "Complexion enhancer" }
    ],
    images: ["/images/products/nabhi-women-glow-15ml.jpg"],
    variants: [
      { size: "10 ml", price: 199, originalPrice: 299, image: "/images/products/nabhi-women-glow-10ml.jpg" },
      { size: "20 ml", price: 349, originalPrice: 499, image: "/images/products/nabhi-women-glow-15ml.jpg" }
    ],
    price: 199,
    originalPrice: 299,
    discount: 33,
    rating: 4.9,
    reviewCount: 275,
    badge: "Skin Radiance",
    healthGoals: ["Skin Glow", "Blood Detox", "Complexion"],
    idealFor: ["Women desiring healthy, radiant skin"],
    usageInstructions: { serving: "2-3 drops", timing: "Bedtime", instructions: "Apply into navel every night before sleep." },
    specifications: { "Form": "Nabhi Oil" },
    certifications: ["Organic", "Toxin Free"],
    faqs: [{ question: "Do I apply this on the face or navel?", answer: "Apply strictly into the navel; it works internally to purify the skin." }],
    relatedProductIds: ["women-harmony-oil-blend"],
    routineProductIds: ["women-daily-wellness-oil-blend"]
  },
  {
    id: "women-daily-wellness-oil-blend",
    slug: "women-daily-wellness-oil-blend",
    name: "Women Daily Wellness Oil Blend",
    category: "Women Wellness Oil Blend",
    shortDescription: "Essential daily foundation Nabhi oil for female vitality, digestive balance, and energetic warmth.",
    fullDescription: "Designed for everyday use, this oil supports female vitality, immunity, and digestive comfort in every season.",
    story: "A classic daily Nabhi wellness formula for busy modern women.",
    benefit: "Maintains daily vitality, digestive harmony, and overall immunity.",
    benefits: [
      { icon: "Sparkles", text: "Daily Vitality" },
      { icon: "Leaf", text: "100% Natural" },
      { icon: "Shield", text: "Gut Balance" }
    ],
    ingredients: [
      { name: "Pure Cold-Pressed Oils", botanical: "Mixed", role: "Base" },
      { name: "Traditional Botanical Blend", botanical: "Various", role: "Daily care" }
    ],
    images: ["/images/products/nabhi-women-pure-15ml.jpg"],
    variants: [
      { size: "10 ml", price: 199, originalPrice: 299, image: "/images/products/nabhi-women-pure-10ml.jpg" },
      { size: "20 ml", price: 349, originalPrice: 499, image: "/images/products/nabhi-women-pure-15ml.jpg" }
    ],
    price: 199,
    originalPrice: 299,
    discount: 33,
    rating: 4.9,
    reviewCount: 240,
    badge: "Daily Essential",
    healthGoals: ["Daily Wellness", "Immunity"],
    idealFor: ["All women for daily self-care"],
    usageInstructions: { serving: "2 drops", timing: "Daily morning/night", instructions: "Apply to navel daily." },
    specifications: { "Form": "Nabhi Oil" },
    certifications: ["AYUSH Approved"],
    faqs: [{ question: "Is it suitable for long term use?", answer: "Yes, it is designed specifically for daily maintenance." }],
    relatedProductIds: ["women-harmony-oil-blend"],
    routineProductIds: ["women-care-oil-blend"]
  },

  // ========================================================
  // 🌿 4. SENIOR CARE OIL BLEND
  // ========================================================
  {
    id: "senior-comfort-oil-blend",
    slug: "senior-comfort-oil-blend",
    name: "Senior Comfort Oil Blend",
    category: "Senior Care Oil Blend",
    shortDescription: "Therapeutic Nabhi oil formulated for senior joint mobility, abdominal comfort, and Vata balance.",
    fullDescription: "Senior Comfort Oil Blend delivers deep Vata-soothing herbs through Nabhi therapy, helping relieve abdominal stiffness, joint discomfort, and dryness in seniors.",
    story: "In Ayurveda, aging is associated with Vata dosha accumulation. This formula pacifies Vata at its primary seat in the lower abdomen.",
    benefit: "Pacifies Vata dosha, supports joint flexibility, and relieves abdominal dryness.",
    benefits: [
      { icon: "Sparkles", text: "Vata Pacifying & Comfort" },
      { icon: "Leaf", text: "Mahanarayana Infused" },
      { icon: "Shield", text: "Mobility Support" }
    ],
    ingredients: [
      { name: "Cold-Pressed Sesame Oil", botanical: "Sesamum indicum", role: "Vata soothing" },
      { name: "Nirgundi & Shallaki", botanical: "Boswellia serrata", role: "Joint comfort" },
      { name: "Eucalyptus & Camphor", botanical: "Eucalyptus globulus", role: "Warming ease" }
    ],
    images: ["/images/products/nabhi-senior-comfort-15ml.jpg"],
    variants: [
      { size: "10 ml", price: 199, originalPrice: 299, image: "/images/products/nabhi-senior-comfort-10ml.jpg" },
      { size: "20 ml", price: 349, originalPrice: 499, image: "/images/products/nabhi-senior-comfort-15ml.jpg" }
    ],
    price: 199,
    originalPrice: 299,
    discount: 33,
    rating: 4.9,
    reviewCount: 198,
    badge: "Vata Care",
    healthGoals: ["Senior Mobility", "Vata Balance", "Joint Ease"],
    idealFor: ["Seniors aged 50+", "Joint & gut comfort"],
    usageInstructions: { serving: "3 drops", timing: "Morning & Evening", instructions: "Apply into navel and gently massage abdominal area." },
    specifications: { "Form": "Nabhi Oil", "Origin": "India" },
    certifications: ["AYUSH Formulated", "100% Natural"],
    faqs: [{ question: "Can seniors use this twice a day?", answer: "Yes, morning and evening application is highly beneficial for seniors." }],
    relatedProductIds: ["senior-active-oil-blend", "senior-balance-oil-blend"],
    routineProductIds: ["senior-daily-wellness-oil-blend"]
  },
  {
    id: "senior-active-oil-blend",
    slug: "senior-active-oil-blend",
    name: "Senior Active Oil Blend",
    category: "Senior Care Oil Blend",
    shortDescription: "Energizing Ayurvedic oil blend to maintain active movement, stamina, and vitality in golden years.",
    fullDescription: "Senior Active Oil Blend nourishes vital organs and supports steady circulation, encouraging healthy activity levels in older adults.",
    story: "Formulated to help seniors remain active, vibrant, and independent in their daily lives.",
    benefit: "Sustains physical activity, vitality, and circulation in older adults.",
    benefits: [
      { icon: "Sparkles", text: "Active Vitality" },
      { icon: "Leaf", text: "Warm Botanicals" },
      { icon: "Shield", text: "Circulatory Support" }
    ],
    ingredients: [
      { name: "Sesame Oil Base", botanical: "Sesamum indicum", role: "Carrier" },
      { name: "Bala & Ashwagandha", botanical: "Sida cordifolia", role: "Strength" }
    ],
    images: ["/images/products/nabhi-senior-vital-15ml.jpg"],
    variants: [
      { size: "10 ml", price: 199, originalPrice: 299, image: "/images/products/nabhi-senior-vital-10ml.jpg" },
      { size: "20 ml", price: 349, originalPrice: 499, image: "/images/products/nabhi-senior-vital-15ml.jpg" }
    ],
    price: 199,
    originalPrice: 299,
    discount: 33,
    rating: 4.8,
    reviewCount: 145,
    badge: "Popular",
    healthGoals: ["Senior Energy", "Circulation"],
    idealFor: ["Active seniors"],
    usageInstructions: { serving: "2-3 drops", timing: "Morning", instructions: "Apply into navel in the morning." },
    specifications: { "Form": "Nabhi Oil" },
    certifications: ["GMP Certified"],
    faqs: [{ question: "Is it suitable for daily walking routines?", answer: "Yes, it supports stamina for daily exercise." }],
    relatedProductIds: ["senior-comfort-oil-blend"],
    routineProductIds: ["senior-daily-wellness-oil-blend"]
  },
  {
    id: "senior-balance-oil-blend",
    slug: "senior-balance-oil-blend",
    name: "Senior Balance Oil Blend",
    category: "Senior Care Oil Blend",
    shortDescription: "Gentle digestive and sleep balancing Nabhi oil tailored for elderly health maintenance.",
    fullDescription: "Helps regulate digestion, prevent nighttime bloating, and encourage tranquil sleep for elderly users.",
    story: "Designed specifically to address gentle digestive sluggishness common in senior years.",
    benefit: "Eases digestive bloating and aids peaceful nighttime rest.",
    benefits: [
      { icon: "Sparkles", text: "Digestive Balance" },
      { icon: "Leaf", text: "Gentle Herbs" },
      { icon: "Shield", text: "Quiet Sleep" }
    ],
    ingredients: [
      { name: "Pure Cold-Pressed Oils", botanical: "Mixed", role: "Base" },
      { name: "Hing & Ajwain Extract", botanical: "Trachyspermum ammi", role: "Digestive ease" }
    ],
    images: ["/images/products/nabhi-senior-balance-15ml.jpg"],
    variants: [
      { size: "10 ml", price: 199, originalPrice: 299, image: "/images/products/nabhi-senior-balance-10ml.jpg" },
      { size: "20 ml", price: 349, originalPrice: 499, image: "/images/products/nabhi-senior-balance-15ml.jpg" }
    ],
    price: 199,
    originalPrice: 299,
    discount: 33,
    rating: 4.9,
    reviewCount: 160,
    badge: "Digestive Care",
    healthGoals: ["Senior Digestion", "Restful Sleep"],
    idealFor: ["Elderly individuals needing digestion support"],
    usageInstructions: { serving: "2-3 drops", timing: "Bedtime", instructions: "Apply into navel after dinner." },
    specifications: { "Form": "Nabhi Oil" },
    certifications: ["100% Ayurvedic"],
    faqs: [{ question: "Does it help with bloating?", answer: "Yes, Nabhi application with Hing/Ajwain extracts aids gas relief." }],
    relatedProductIds: ["senior-comfort-oil-blend"],
    routineProductIds: ["senior-daily-wellness-oil-blend"]
  },
  {
    id: "senior-daily-wellness-oil-blend",
    slug: "senior-daily-wellness-oil-blend",
    name: "Senior Daily Wellness Oil Blend",
    category: "Senior Care Oil Blend",
    shortDescription: "All-in-one daily Nabhi therapy for senior longevity, immunity, and organ nourishment.",
    fullDescription: "A comprehensive everyday Nabhi oil formulated to support senior longevity and overall well-being.",
    story: "An essential daily wellness companion for aging gracefully with Ayurvedic wisdom.",
    benefit: "Supports senior longevity, immunity, and daily digestive vitality.",
    benefits: [
      { icon: "Sparkles", text: "Longevity & Immunity" },
      { icon: "Leaf", text: "Tridosha Balance" },
      { icon: "Shield", text: "Daily Protection" }
    ],
    ingredients: [
      { name: "Cold-Pressed Sesame & Almond Base", botanical: "Mixed", role: "Carrier" },
      { name: "Rasayana Herb Blend", botanical: "Various", role: "Longevity" }
    ],
    images: ["/images/products/nabhi-senior-pure-15ml.jpg"],
    variants: [
      { size: "10 ml", price: 199, originalPrice: 299, image: "/images/products/nabhi-senior-pure-10ml.jpg" },
      { size: "20 ml", price: 349, originalPrice: 499, image: "/images/products/nabhi-senior-pure-15ml.jpg" }
    ],
    price: 199,
    originalPrice: 299,
    discount: 33,
    rating: 4.9,
    reviewCount: 220,
    badge: "Daily Essential",
    healthGoals: ["Senior Wellness", "Immunity"],
    idealFor: ["All seniors for daily care"],
    usageInstructions: { serving: "2-3 drops", timing: "Daily", instructions: "Apply to navel daily." },
    specifications: { "Form": "Nabhi Oil" },
    certifications: ["AYUSH Approved"],
    faqs: [{ question: "Is it easy to apply?", answer: "Yes, simply place 2-3 drops in the navel and massage." }],
    relatedProductIds: ["senior-comfort-oil-blend"],
    routineProductIds: ["senior-active-oil-blend"]
  },

  // ========================================================
  // 👣 5. FEET MASSAGE OIL
  // ========================================================
  {
    id: "feet-massage-oil",
    slug: "feet-massage-oil",
    name: "Feet Massage Oil",
    category: "Feet Massage Oil",
    shortDescription: "Traditional Padabhyanga oil infused with therapeutic cooling herbs to relieve tired feet, improve sleep, and draw out body heat.",
    fullDescription: "Feet Massage Oil (Padabhyanga) is a sacred Ayurvedic ritual oil. Hand-blended with cold-pressed sesame oil, mustard oil, camphor, and cooling botanicals, it releases heat from the soles, alleviates leg fatigue, and calms the nervous system.",
    story: "Padabhyanga (Ayurvedic Foot Massage) is traditionally practiced before sleep to soothe Kasa (bronchial channels), relax eyes, and promote deep sleeping states.",
    benefit: "Relieves tired muscles, cools body heat, and induces deep, restorative sleep.",
    benefits: [
      { icon: "Sparkles", text: "Padabhyanga Ritual Sleep" },
      { icon: "Leaf", text: "Cooling Botanical Infusion" },
      { icon: "Shield", text: "Relieves Fatigue & Heat" }
    ],
    ingredients: [
      { name: "Cold-Pressed Sesame Oil", botanical: "Sesamum indicum", role: "Penetrative base" },
      { name: "Pure Mustard Oil", botanical: "Brassica juncea", role: "Warming circulation" },
      { name: "Brimstone & Camphor", botanical: "Cinnamomum camphora", role: "Cooling & pain relief" }
    ],
    images: ["/images/category_feet_1784743921281.jpg"],
    variants: [
      { size: "30 ml", price: 399, originalPrice: 599, image: "/images/products/feet-women-30ml.jpg" },
      { size: "100 ml", price: 1199, originalPrice: 1799, image: "/images/category_feet_1784743921281.jpg" },
      { size: "200 ml", price: 2199, originalPrice: 3299, image: "/images/category_feet_1784743921281.jpg" }
    ],
    price: 399,
    originalPrice: 599,
    discount: 33,
    rating: 4.95,
    reviewCount: 420,
    badge: "Bestseller",
    healthGoals: ["Deep Sleep", "Foot Fatigue Relief", "Body Heat Reduction"],
    idealFor: ["People standing long hours", "Insomnia", "Bedtime relaxation"],
    usageInstructions: { serving: "5-10 ml", timing: "At night before bed", instructions: "Warm oil slightly, rub vigorously onto soles of both feet for 5-10 minutes." },
    specifications: { "Form": "Foot Massage Oil", "Origin": "India", "Packaging": "Amber Bottle" },
    certifications: ["100% Natural", "AYUSH Formulated", "Chemical Free"],
    faqs: [{ question: "Should I wear socks after applying?", answer: "Yes, wearing cotton socks after massaging keeps feet warm and protects bedding." }],
    relatedProductIds: ["hair-wellness-oil", "trial-wellness-pack"],
    routineProductIds: ["kids-smart-oil-blend", "women-harmony-oil-blend"]
  },

  // ========================================================
  // 🌿 6. HAIR WELLNESS OIL
  // ========================================================
  {
    id: "hair-wellness-oil",
    slug: "hair-wellness-oil",
    name: "Hair Wellness Oil",
    category: "Hair Wellness Oil",
    shortDescription: "Authentic Kshirapak Ayurvedic hair oil enriched with Bhringraj, Amla, and Coconut oil to reduce hair fall and nourish roots.",
    fullDescription: "Hair Wellness Oil is slow-cooked using ancient Kshirapak Vidhi with 18 potent hair herbs including Keshraj Bhringraj, Amla, Brahmi, and Neelini. Deeply conditions scalp, fortifies roots, and prevents premature graying.",
    story: "Formulated according to Sahasrayogam text, slow-steeped over copper vessels for 72 hours to extract pure botanical alkaloids.",
    benefit: "Reduces hair fall, strengthens hair follicles, and promotes thick scalp growth.",
    benefits: [
      { icon: "Sparkles", text: "Root Fortification & Density" },
      { icon: "Leaf", text: "72-Hour Kshirapak Process" },
      { icon: "Shield", text: "Anti-Dandruff & Anti-Hairfall" }
    ],
    ingredients: [
      { name: "Bhringraj (King of Hair)", botanical: "Eclipta alba", role: "Root stimulant" },
      { name: "Fresh Amla Extract", botanical: "Phyllanthus emblica", role: "Vitamin C & hair strength" },
      { name: "Cold-Pressed Coconut Oil", botanical: "Cocos nucifera", role: "Deep conditioning" },
      { name: "Sesame & Rosemary Oil", botanical: "Rosmarinus officinalis", role: "Scalp circulation" }
    ],
    images: ["/images/category_hair_1784743931871.jpg"],
    variants: [
      { size: "50 ml", price: 499, originalPrice: 699, image: "/images/category_hair_1784743931871.jpg" },
      { size: "100 ml", price: 899, originalPrice: 1299, image: "/images/category_hair_1784743931871.jpg" },
      { size: "200 ml", price: 1799, originalPrice: 2499, image: "/images/category_hair_1784743931871.jpg" }
    ],
    price: 499,
    originalPrice: 699,
    discount: 28,
    rating: 4.92,
    reviewCount: 380,
    badge: "Top Growth",
    healthGoals: ["Hairfall Control", "Scalp Nourishment", "Hair Density"],
    idealFor: ["Thinning hair", "Dandruff scalp", "Weekly head massage"],
    usageInstructions: { serving: "10-15 ml", timing: "2-3 times a week", instructions: "Apply warm oil to scalp, partition hair, massage gently for 15 mins. Wash off after 2 hours or leave overnight." },
    specifications: { "Form": "Herbal Scalp Oil", "Method": "Kshirapak Vidhi", "Origin": "India" },
    certifications: ["100% Pure", "No Mineral Oils", "No Artificial Fragrance"],
    faqs: [{ question: "How often should I use this oil?", answer: "Applying 2 to 3 times per week delivers visible improvements in scalp texture and root strength." }],
    relatedProductIds: ["feet-massage-oil", "gold-wellness-pack"],
    routineProductIds: ["women-glow-oil-blend"]
  },

  // ========================================================
  // 🌿 7. INDIVIDUAL WELLNESS PACKS
  // ========================================================
  {
    id: "trial-wellness-pack",
    slug: "trial-wellness-pack",
    name: "Trial Wellness Pack",
    category: "Individual Wellness Packs",
    shortDescription: "Starter Ayurvedic oil kit featuring 10 ml Nabhi Oil Blend and 30 ml Feet Massage Oil for 1 Month of complete care.",
    fullDescription: "Experience the profound benefits of Nabhi Chikitsa & Padabhyanga. The Trial Wellness Pack includes 10 ml Nabhi Oil Blend and 30 ml Feet Massage Oil, offering up to 1 Month of daily holistic self-care.",
    story: "Designed for beginners to experience authentic Ayurvedic internal Nabhi therapy combined with evening foot relaxation.",
    benefit: "Up to 1 Month complete body-mind wellness care.",
    benefits: [
      { icon: "Sparkles", text: "Complete Starter Ritual" },
      { icon: "Leaf", text: "10 ml Nabhi + 30 ml Feet Oil" },
      { icon: "Shield", text: "Up to 1 Month Wellness" }
    ],
    ingredients: [
      { name: "Nabhi Oil Blend", botanical: "Ayurvedic Blends", role: "Navel therapy" },
      { name: "Feet Massage Oil", botanical: "Herbal Infusion", role: "Foot relaxation" }
    ],
    images: ["/images/products/combo-individual-trial.jpg"],
    variants: [
      { size: "1 Pack (10ml Nabhi + 30ml Feet)", price: 499, originalPrice: 749, image: "/images/products/combo-individual-trial.jpg" }
    ],
    price: 499,
    originalPrice: 749,
    discount: 33,
    rating: 4.9,
    reviewCount: 195,
    badge: "Starter Kit",
    durationText: "Up to 1 Month",
    healthGoals: ["Trial Care", "Nabhi & Feet Routine"],
    idealFor: ["First-time users", "Gifting"],
    usageInstructions: { serving: "Daily kit use", timing: "Morning & Bedtime", instructions: "Use Nabhi oil daily in navel, and Feet oil on soles at night." },
    specifications: { "Contents": "10 ml Nabhi Oil + 30 ml Feet Oil", "Duration": "Up to 1 Month Care" },
    certifications: ["AYUSH Formulated", "100% Organic"],
    faqs: [{ question: "How long does this kit last?", answer: "When used daily as directed, it provides up to 1 month of wellness care." }],
    relatedProductIds: ["gold-wellness-pack", "premium-wellness-pack"],
    routineProductIds: ["feet-massage-oil"]
  },
  {
    id: "gold-wellness-pack",
    slug: "gold-wellness-pack",
    name: "Gold Wellness Pack",
    category: "Individual Wellness Packs",
    shortDescription: "4-Month complete Ayurvedic oil regimen with 40 ml Nabhi Oil Blend (4 × 10 ml) and 100 ml Feet Massage Oil.",
    fullDescription: "Deepen your transformation with the Gold Wellness Pack. Includes 40 ml Nabhi Oil Blend (4 × 10 ml bottles) and 100 ml Feet Massage Oil, providing up to 4 Months of continuous Ayurvedic care.",
    story: "Extended wellness regimen formulated to sustain long-term digestive vitality, deep sleep, and bodily equilibrium.",
    benefit: "Up to 4 Months continuous Ayurvedic wellness transformation.",
    benefits: [
      { icon: "Sparkles", text: "4-Month Complete Regimen" },
      { icon: "Leaf", text: "40 ml Nabhi (4x10ml) + 100 ml Feet Oil" },
      { icon: "Shield", text: "Up to 4 Months Wellness" }
    ],
    ingredients: [
      { name: "4x 10ml Nabhi Blends", botanical: "Ayurvedic Blends", role: "Deep navel care" },
      { name: "100ml Feet Massage Oil", botanical: "Cooling Botanicals", role: "Sleep & fatigue relief" }
    ],
    images: ["/images/products/combo-individual-gold.jpg"],
    variants: [
      { size: "1 Pack (40ml Nabhi + 100ml Feet)", price: 2199, originalPrice: 2999, image: "/images/products/combo-individual-gold.jpg" }
    ],
    price: 2199,
    originalPrice: 2999,
    discount: 27,
    rating: 4.96,
    reviewCount: 310,
    badge: "Most Popular",
    durationText: "Up to 4 Months",
    healthGoals: ["Long-term Balance", "4-Month Care"],
    idealFor: ["Dedicated wellness seekers"],
    usageInstructions: { serving: "Daily use", timing: "Daily", instructions: "Apply Nabhi oil to navel daily and Feet oil to soles every night." },
    specifications: { "Contents": "40 ml Nabhi Oil (4x10ml) + 100 ml Feet Oil", "Duration": "Up to 4 Months Care" },
    certifications: ["Organic", "AYUSH Certified"],
    faqs: [{ question: "Can I choose different Nabhi oil variants?", answer: "Yes, you can customize your Nabhi oil variant preferences during checkout." }],
    relatedProductIds: ["trial-wellness-pack", "premium-wellness-pack"],
    routineProductIds: ["feet-massage-oil"]
  },
  {
    id: "premium-wellness-pack",
    slug: "premium-wellness-pack",
    name: "Premium Wellness Pack",
    category: "Individual Wellness Packs",
    shortDescription: "Ultimate 8-Month Ayurvedic health kit containing 80 ml Nabhi Oil Blend (4 × 20 ml) and 200 ml Feet Massage Oil.",
    fullDescription: "Our pinnacle individual wellness solution. Features 80 ml Nabhi Oil Blend (4 × 20 ml bottles) and 200 ml Feet Massage Oil for up to 8 Months of comprehensive wellness care.",
    story: "Designed for full annual Ayurvedic maintenance, ensuring uncompromised health, glowing skin, and peaceful sleep all year round.",
    benefit: "Up to 8 Months of ultimate holistic wellness care.",
    benefits: [
      { icon: "Sparkles", text: "8-Month Ultimate Transformation" },
      { icon: "Leaf", text: "80 ml Nabhi (4x20ml) + 200 ml Feet Oil" },
      { icon: "Shield", text: "Up to 8 Months Wellness" }
    ],
    ingredients: [
      { name: "4x 20ml Nabhi Blends", botanical: "Ayurvedic Blends", role: "Full navel therapy" },
      { name: "200ml Feet Massage Oil", botanical: "Cooling Herbal Base", role: "Restful sleep ritual" }
    ],
    images: ["/images/products/combo-individual-premium.jpg"],
    variants: [
      { size: "1 Pack (80ml Nabhi + 200ml Feet)", price: 3999, originalPrice: 5499, image: "/images/products/combo-individual-premium.jpg" }
    ],
    price: 3999,
    originalPrice: 5499,
    discount: 27,
    rating: 4.98,
    reviewCount: 260,
    badge: "Best Savings",
    durationText: "Up to 8 Months",
    healthGoals: ["Full Year Care", "Ultimate Wellness"],
    idealFor: ["Complete annual wellness commitment"],
    usageInstructions: { serving: "Daily use", timing: "Daily", instructions: "Apply Nabhi oil into navel daily and Feet oil onto soles at night." },
    specifications: { "Contents": "80 ml Nabhi Oil (4x20ml) + 200 ml Feet Oil", "Duration": "Up to 8 Months Care" },
    certifications: ["AYUSH Certified", "100% Pure"],
    faqs: [{ question: "What is the shelf life of this pack?", answer: "All oils have a 3-year shelf life when stored in a cool, dry place." }],
    relatedProductIds: ["gold-wellness-pack"],
    routineProductIds: ["feet-massage-oil"]
  },

  // ========================================================
  // 👨‍👩 8. FAMILY TRIAL WELLNESS PACKS
  // ========================================================
  {
    id: "2-member-family-trial-pack",
    slug: "2-member-family-trial-pack",
    name: "2 Member Family Trial Pack",
    category: "Family Trial Wellness Packs",
    shortDescription: "Ayurvedic wellness trial kit for 2 family members providing up to 1 Month of shared care.",
    fullDescription: "Curated for couples or 2 family members, providing Nabhi Chikitsa oils and Feet Massage oils tailored for up to 1 Month of daily care.",
    story: "Share the gift of natural Ayurvedic living with your partner or family member.",
    benefit: "Up to 1 Month of shared care for 2 family members.",
    benefits: [
      { icon: "Sparkles", text: "2 Member Shared Kit" },
      { icon: "Leaf", text: "Custom Oil Selections" },
      { icon: "Shield", text: "Up to 1 Month Care" }
    ],
    ingredients: [
      { name: "2x Nabhi Oil Blends", botanical: "Ayurvedic", role: "Navel care" },
      { name: "2x Feet Massage Oils", botanical: "Herbal", role: "Foot relaxation" }
    ],
    images: ["/images/products/combo-family-trial.jpg"],
    variants: [
      { size: "2 Member Pack", price: 899, originalPrice: 1499, image: "/images/products/combo-family-trial.jpg" }
    ],
    price: 899,
    originalPrice: 1499,
    discount: 40,
    rating: 4.9,
    reviewCount: 150,
    badge: "Family Pack",
    durationText: "Up to 1 Month",
    healthGoals: ["Family Health", "2 Member Care"],
    idealFor: ["Couples", "2 Family Members"],
    usageInstructions: { serving: "Daily use", timing: "Daily", instructions: "Each member applies designated Nabhi and Feet oil daily." },
    specifications: { "Target": "2 Members", "Duration": "Up to 1 Month Care" },
    certifications: ["AYUSH Approved"],
    faqs: [{ question: "Can we mix Men and Women blends?", answer: "Yes, you can choose any combination of oils for your family members." }],
    relatedProductIds: ["3-member-family-trial-pack", "4-member-family-trial-pack"],
    routineProductIds: ["2-member-family-gold-pack"]
  },
  {
    id: "3-member-family-trial-pack",
    slug: "3-member-family-trial-pack",
    name: "3 Member Family Trial Pack",
    category: "Family Trial Wellness Packs",
    shortDescription: "Ayurvedic wellness trial kit for 3 family members providing up to 1 Month of care.",
    fullDescription: "Ideal for small families of 3, providing individual Nabhi oils and Feet oils for up to 1 Month of health care.",
    story: "Bring holistic health into your home with a comprehensive 3-person Ayurvedic trial kit.",
    benefit: "Up to 1 Month of care for 3 family members.",
    benefits: [
      { icon: "Sparkles", text: "3 Member Kit" },
      { icon: "Leaf", text: "Kids / Adult Blends" },
      { icon: "Shield", text: "Up to 1 Month Care" }
    ],
    ingredients: [
      { name: "3x Nabhi Oils", botanical: "Ayurvedic", role: "Navel therapy" },
      { name: "3x Feet Oils", botanical: "Botanical", role: "Foot massage" }
    ],
    images: ["/images/products/combo-family-trial.jpg"],
    variants: [
      { size: "3 Member Pack", price: 1299, originalPrice: 2249, image: "/images/products/combo-family-trial.jpg" }
    ],
    price: 1299,
    originalPrice: 2249,
    discount: 42,
    rating: 4.9,
    reviewCount: 180,
    badge: "Family Choice",
    durationText: "Up to 1 Month",
    healthGoals: ["Family Health", "3 Member Care"],
    idealFor: ["Small families of 3"],
    usageInstructions: { serving: "Daily use", timing: "Daily", instructions: "Daily application for 3 family members." },
    specifications: { "Target": "3 Members", "Duration": "Up to 1 Month Care" },
    certifications: ["AYUSH Certified"],
    faqs: [{ question: "Are Kids oils included?", answer: "Yes, you can include Kids Care blends as part of your 3-member pack." }],
    relatedProductIds: ["2-member-family-trial-pack", "4-member-family-trial-pack"],
    routineProductIds: ["3-member-family-gold-pack"]
  },
  {
    id: "4-member-family-trial-pack",
    slug: "4-member-family-trial-pack",
    name: "4 Member Family Trial Pack",
    category: "Family Trial Wellness Packs",
    shortDescription: "Complete Ayurvedic trial pack for 4 family members with up to 1 Month of daily care.",
    fullDescription: "Tailored for a family of 4 (e.g. 2 Adults + 2 Kids/Seniors) to embark on a 1-Month Ayurvedic self-care trial.",
    story: "Empower your entire household with traditional wellness rituals.",
    benefit: "Up to 1 Month of complete care for 4 family members.",
    benefits: [
      { icon: "Sparkles", text: "4 Member Household Kit" },
      { icon: "Leaf", text: "Full Customization" },
      { icon: "Shield", text: "Up to 1 Month Care" }
    ],
    ingredients: [
      { name: "4x Nabhi Oils", botanical: "Various", role: "Abdominal care" },
      { name: "4x Feet Oils", botanical: "Cooling", role: "Nightly sleep" }
    ],
    images: ["/images/products/combo-family-trial.jpg"],
    variants: [
      { size: "4 Member Pack", price: 1699, originalPrice: 2999, image: "/images/products/combo-family-trial.jpg" }
    ],
    price: 1699,
    originalPrice: 2999,
    discount: 43,
    rating: 4.95,
    reviewCount: 240,
    badge: "Best Value",
    durationText: "Up to 1 Month",
    healthGoals: ["Household Wellness", "4 Member Care"],
    idealFor: ["Families of 4"],
    usageInstructions: { serving: "Daily use", timing: "Daily", instructions: "Apply designated oils to each family member daily." },
    specifications: { "Target": "4 Members", "Duration": "Up to 1 Month Care" },
    certifications: ["AYUSH Formulated"],
    faqs: [{ question: "Can senior oils be included?", answer: "Yes, Senior Care blends can be selected." }],
    relatedProductIds: ["3-member-family-trial-pack", "5-member-family-trial-pack"],
    routineProductIds: ["4-member-family-gold-pack"]
  },
  {
    id: "5-member-family-trial-pack",
    slug: "5-member-family-trial-pack",
    name: "5 Member Family Trial Pack",
    category: "Family Trial Wellness Packs",
    shortDescription: "Grand family trial kit for 5 members providing up to 1 Month of holistic Ayurvedic care.",
    fullDescription: "Comprehensive wellness kit for larger families of 5, offering custom Nabhi and Feet care for every generation under one roof.",
    story: "Unite three generations in wellness—Kids, Adults, and Seniors.",
    benefit: "Up to 1 Month of full care for 5 family members.",
    benefits: [
      { icon: "Sparkles", text: "5 Member Grand Kit" },
      { icon: "Leaf", text: "Multi-Generational" },
      { icon: "Shield", text: "Up to 1 Month Care" }
    ],
    ingredients: [
      { name: "5x Nabhi Oils", botanical: "Ayurvedic", role: "Navel wellness" },
      { name: "5x Feet Oils", botanical: "Herbal", role: "Soles massage" }
    ],
    images: ["/images/products/combo-family-trial.jpg"],
    variants: [
      { size: "5 Member Pack", price: 2099, originalPrice: 3749, image: "/images/products/combo-family-trial.jpg" }
    ],
    price: 2099,
    originalPrice: 3749,
    discount: 44,
    rating: 4.97,
    reviewCount: 290,
    badge: "Grand Family",
    durationText: "Up to 1 Month",
    healthGoals: ["Multi-Generational Health", "5 Member Care"],
    idealFor: ["Joint families of 5"],
    usageInstructions: { serving: "Daily use", timing: "Daily", instructions: "Daily Nabhi and Feet oil care for 5 members." },
    specifications: { "Target": "5 Members", "Duration": "Up to 1 Month Care" },
    certifications: ["AYUSH Approved"],
    faqs: [{ question: "How are the oils assigned?", answer: "Select specific blends for each member during checkout." }],
    relatedProductIds: ["4-member-family-trial-pack"],
    routineProductIds: ["5-member-family-gold-pack"]
  },

  // ========================================================
  // 👨‍👩 9. FAMILY GOLD WELLNESS PACKS
  // ========================================================
  {
    id: "2-member-family-gold-pack",
    slug: "2-member-family-gold-pack",
    name: "2 Member Family Gold Wellness Pack",
    category: "Family Gold Wellness Packs",
    shortDescription: "4-Month continuous Ayurvedic health regimen for 2 family members.",
    fullDescription: "Long-term Gold wellness pack for 2 members, delivering up to 4 Months of continuous Nabhi Chikitsa and Feet Massage oils.",
    story: "Sustained long-term health transformation for couples and 2-person households.",
    benefit: "Up to 4 Months of continuous care for 2 family members.",
    benefits: [
      { icon: "Sparkles", text: "4-Month Couple Regimen" },
      { icon: "Leaf", text: "Continuous Nabhi & Feet Care" },
      { icon: "Shield", text: "Up to 4 Months Care" }
    ],
    ingredients: [
      { name: "Gold Nabhi Oil Set", botanical: "Ayurvedic", role: "Navel therapy" },
      { name: "Gold Feet Oil Set", botanical: "Botanical", role: "Foot massage" }
    ],
    images: ["/images/products/combo-family-gold.jpg"],
    variants: [
      { size: "2 Member Pack", price: 3999, originalPrice: 5499, image: "/images/products/combo-family-gold.jpg" }
    ],
    price: 3999,
    originalPrice: 5499,
    discount: 27,
    rating: 4.96,
    reviewCount: 210,
    badge: "Gold Regimen",
    durationText: "Up to 4 Months",
    healthGoals: ["4-Month Care", "2 Member Gold"],
    idealFor: ["Couples seeking long-term wellness"],
    usageInstructions: { serving: "Daily use", timing: "Daily", instructions: "Follow daily Nabhi & Feet oil routine for 4 months." },
    specifications: { "Target": "2 Members", "Duration": "Up to 4 Months Care" },
    certifications: ["AYUSH Certified"],
    faqs: [{ question: "Does it come with instructions?", answer: "Yes, a comprehensive wellness guide is included." }],
    relatedProductIds: ["3-member-family-gold-pack", "4-member-family-gold-pack"],
    routineProductIds: ["2-member-family-trial-pack"]
  },
  {
    id: "3-member-family-gold-pack",
    slug: "3-member-family-gold-pack",
    name: "3 Member Family Gold Wellness Pack",
    category: "Family Gold Wellness Packs",
    shortDescription: "4-Month continuous Ayurvedic regimen for 3 family members.",
    fullDescription: "Long-term Gold care pack tailored for 3 family members, sustaining vital energy and digestive harmony for up to 4 Months.",
    story: "Keep your small family thriving with 4 months of dedicated natural oil therapy.",
    benefit: "Up to 4 Months of continuous care for 3 family members.",
    benefits: [
      { icon: "Sparkles", text: "4-Month 3 Member Regimen" },
      { icon: "Leaf", text: "Custom Blend Selections" },
      { icon: "Shield", text: "Up to 4 Months Care" }
    ],
    ingredients: [
      { name: "Gold Nabhi Oils", botanical: "Mixed", role: "Nabhi care" },
      { name: "Gold Feet Oils", botanical: "Cooling", role: "Soles care" }
    ],
    images: ["/images/products/combo-family-gold.jpg"],
    variants: [
      { size: "3 Member Pack", price: 5799, originalPrice: 8249, image: "/images/products/combo-family-gold.jpg" }
    ],
    price: 5799,
    originalPrice: 8249,
    discount: 30,
    rating: 4.97,
    reviewCount: 230,
    badge: "Gold Choice",
    durationText: "Up to 4 Months",
    healthGoals: ["4-Month Care", "3 Member Gold"],
    idealFor: ["Families of 3 seeking continuous health"],
    usageInstructions: { serving: "Daily use", timing: "Daily", instructions: "Daily routine for 3 members across 4 months." },
    specifications: { "Target": "3 Members", "Duration": "Up to 4 Months Care" },
    certifications: ["AYUSH Approved"],
    faqs: [{ question: "Is this suitable for all seasons?", answer: "Yes, the oils are formulated for year-round balance." }],
    relatedProductIds: ["2-member-family-gold-pack", "4-member-family-gold-pack"],
    routineProductIds: ["3-member-family-trial-pack"]
  },
  {
    id: "4-member-family-gold-pack",
    slug: "4-member-family-gold-pack",
    name: "4 Member Family Gold Wellness Pack",
    category: "Family Gold Wellness Packs",
    shortDescription: "4-Month comprehensive Ayurvedic regimen for 4 family members.",
    fullDescription: "Gold standard 4-Month wellness regimen for a family of 4, ensuring full-body balance, restorative sleep, and immunity.",
    story: "The ultimate 4-month health shield for medium-sized households.",
    benefit: "Up to 4 Months of complete care for 4 family members.",
    benefits: [
      { icon: "Sparkles", text: "4-Month Household Gold Kit" },
      { icon: "Leaf", text: "Multi-Variant Selection" },
      { icon: "Shield", text: "Up to 4 Months Care" }
    ],
    ingredients: [
      { name: "Complete Gold Nabhi Set", botanical: "Ayurvedic", role: "Navel therapy" },
      { name: "Complete Gold Feet Set", botanical: "Herbal", role: "Feet therapy" }
    ],
    images: ["/images/products/combo-family-gold.jpg"],
    variants: [
      { size: "4 Member Pack", price: 7499, originalPrice: 10999, image: "/images/products/combo-family-gold.jpg" }
    ],
    price: 7499,
    originalPrice: 10999,
    discount: 32,
    rating: 4.98,
    reviewCount: 310,
    badge: "Family Gold Bestseller",
    durationText: "Up to 4 Months",
    healthGoals: ["4-Month Care", "4 Member Gold"],
    idealFor: ["Families of 4"],
    usageInstructions: { serving: "Daily use", timing: "Daily", instructions: "Daily Nabhi and Feet oil care for 4 family members." },
    specifications: { "Target": "4 Members", "Duration": "Up to 4 Months Care" },
    certifications: ["AYUSH Certified"],
    faqs: [{ question: "What is the total savings?", answer: "Saves up to 32% compared to buying individual monthly packs." }],
    relatedProductIds: ["3-member-family-gold-pack", "5-member-family-gold-pack"],
    routineProductIds: ["4-member-family-trial-pack"]
  },
  {
    id: "5-member-family-gold-pack",
    slug: "5-member-family-gold-pack",
    name: "5 Member Family Gold Wellness Pack",
    category: "Family Gold Wellness Packs",
    shortDescription: "Pinnacle 4-Month Ayurvedic wellness pack for 5 family members.",
    fullDescription: "Our flagship family wellness investment. Provides 5 family members with 4 Months of continuous Ayurvedic Nabhi and Feet care.",
    story: "Complete peace of mind for multi-generational homes seeking natural health.",
    benefit: "Up to 4 Months of full care for 5 family members.",
    benefits: [
      { icon: "Sparkles", text: "4-Month Grand Family Gold" },
      { icon: "Leaf", text: "Maximum Health Savings" },
      { icon: "Shield", text: "Up to 4 Months Care" }
    ],
    ingredients: [
      { name: "Grand Gold Nabhi Set", botanical: "Ayurvedic", role: "Navel therapy" },
      { name: "Grand Gold Feet Set", botanical: "Herbal", role: "Foot massage" }
    ],
    images: ["/images/products/combo-family-gold.jpg"],
    variants: [
      { size: "5 Member Pack", price: 8999, originalPrice: 13749, image: "/images/products/combo-family-gold.jpg" }
    ],
    price: 8999,
    originalPrice: 13749,
    discount: 35,
    rating: 4.99,
    reviewCount: 350,
    badge: "Ultimate Family Pack",
    durationText: "Up to 4 Months",
    healthGoals: ["4-Month Care", "5 Member Gold"],
    idealFor: ["Joint families of 5"],
    usageInstructions: { serving: "Daily use", timing: "Daily", instructions: "Daily oil care for all 5 members across 4 months." },
    specifications: { "Target": "5 Members", "Duration": "Up to 4 Months Care" },
    certifications: ["AYUSH Formulated"],
    faqs: [{ question: "Can we reorder refill bottles?", answer: "Yes, refill packs are available anytime on our site." }],
    relatedProductIds: ["4-member-family-gold-pack"],
    routineProductIds: ["5-member-family-trial-pack"]
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}

export function getProductsByCategory(categoryName: string): Product[] {
  return products.filter((p) => p.category.toLowerCase() === categoryName.toLowerCase());
}

