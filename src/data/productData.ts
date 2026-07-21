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
  {
    "id": "kids-smart-blend",
    "slug": "kids-smart-blend",
    "name": "Kids Smart Blend",
    "category": "Nabhi Oil Blend",
    "shortDescription": "Supports Focus, Memory & Learning",
    "fullDescription": "Ayurdhara Divya Shakti Kids Smart Blend is a 100% natural, cold-pressed formulation designed specifically for your daily routine.",
    "story": "Wellness is a journey. We created the Kids Smart Blend to ensure that you have access to premium Ayurvedic care. It's an investment in your daily vitality.",
    "benefit": "Supports Focus, Memory & Learning",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "100% Natural Formulation"
      },
      {
        "icon": "Shield",
        "text": "Safe for Daily Use"
      }
    ],
    "ingredients": [
      {
        "name": "Premium Cold-Pressed Base Oil",
        "botanical": "Ayurvedic Base",
        "role": "Nourishes deeply and acts as a carrier for the therapeutic herbs."
      }
    ],
    "images": [
      "/images/products/nabhi-kids-smart-10ml.jpg",
      "/images/products/nabhi-kids-smart-15ml.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": "/images/products/nabhi-kids-smart-10ml.jpg",
        "goldMemberPrice": 149,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "15 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/nabhi-kids-smart-15ml.jpg",
        "goldMemberPrice": 249,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "60 ml",
        "price": 899,
        "originalPrice": 1199,
        "image": "/images/products/nabhi-kids-smart-15ml.jpg",
        "goldMemberPrice": 699,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 40,
    "rating": 4.8,
    "reviewCount": 124,
    "healthGoals": [
      "Overall Wellness"
    ],
    "idealFor": [
      "Daily use for optimal wellness"
    ],
    "usageInstructions": {
      "serving": "2-3 drops / Varies by product",
      "timing": "Nightly, before bedtime",
      "instructions": "Apply 2-3 drops into the navel or massage onto the soles of the feet before bed."
    },
    "specifications": {
      "Net Quantity": "Varies by variant",
      "Form": "Cold-pressed Oil",
      "Diet Preference": "Vegetarian, Vegan",
      "Shelf Life": "24 Months",
      "Country of Origin": "India"
    },
    "certifications": [
      "Ayurvedic Formulation",
      "100% Natural",
      "Made in India"
    ],
    "faqs": [
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, our blends are formulated with 100% natural, cold-pressed oils and are completely safe for daily use."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": [],
    "goldMemberPrice": 149
  },
  {
    "id": "kids-gentle-blend",
    "slug": "kids-gentle-blend",
    "name": "Kids Gentle Blend",
    "category": "Nabhi Oil Blend",
    "shortDescription": "Gentle Care, Calms & Soothes",
    "fullDescription": "Ayurdhara Divya Shakti Kids Gentle Blend is a 100% natural, cold-pressed formulation designed specifically for your daily routine.",
    "story": "Wellness is a journey. We created the Kids Gentle Blend to ensure that you have access to premium Ayurvedic care. It's an investment in your daily vitality.",
    "benefit": "Gentle Care, Calms & Soothes",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "100% Natural Formulation"
      },
      {
        "icon": "Shield",
        "text": "Safe for Daily Use"
      }
    ],
    "ingredients": [
      {
        "name": "Premium Cold-Pressed Base Oil",
        "botanical": "Ayurvedic Base",
        "role": "Nourishes deeply and acts as a carrier for the therapeutic herbs."
      }
    ],
    "images": [
      "/images/products/nabhi-kids-gentle-10ml.jpg",
      "/images/products/nabhi-kids-gentle-15ml.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": "/images/products/nabhi-kids-gentle-10ml.jpg",
        "goldMemberPrice": 149,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "15 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/nabhi-kids-gentle-15ml.jpg",
        "goldMemberPrice": 249,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "60 ml",
        "price": 899,
        "originalPrice": 1199,
        "image": "/images/products/nabhi-kids-gentle-15ml.jpg",
        "goldMemberPrice": 699,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 40,
    "rating": 4.8,
    "reviewCount": 124,
    "healthGoals": [
      "Overall Wellness"
    ],
    "idealFor": [
      "Daily use for optimal wellness"
    ],
    "usageInstructions": {
      "serving": "2-3 drops / Varies by product",
      "timing": "Nightly, before bedtime",
      "instructions": "Apply 2-3 drops into the navel or massage onto the soles of the feet before bed."
    },
    "specifications": {
      "Net Quantity": "Varies by variant",
      "Form": "Cold-pressed Oil",
      "Diet Preference": "Vegetarian, Vegan",
      "Shelf Life": "24 Months",
      "Country of Origin": "India"
    },
    "certifications": [
      "Ayurvedic Formulation",
      "100% Natural",
      "Made in India"
    ],
    "faqs": [
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, our blends are formulated with 100% natural, cold-pressed oils and are completely safe for daily use."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": [],
    "goldMemberPrice": 149
  },
  {
    "id": "kids-daily-blend",
    "slug": "kids-daily-blend",
    "name": "Kids Daily Blend",
    "category": "Nabhi Oil Blend",
    "shortDescription": "Daily Wellness, Stronger Immunity",
    "fullDescription": "Ayurdhara Divya Shakti Kids Daily Blend is a 100% natural, cold-pressed formulation designed specifically for your daily routine.",
    "story": "Wellness is a journey. We created the Kids Daily Blend to ensure that you have access to premium Ayurvedic care. It's an investment in your daily vitality.",
    "benefit": "Daily Wellness, Stronger Immunity",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "100% Natural Formulation"
      },
      {
        "icon": "Shield",
        "text": "Safe for Daily Use"
      }
    ],
    "ingredients": [
      {
        "name": "Premium Cold-Pressed Base Oil",
        "botanical": "Ayurvedic Base",
        "role": "Nourishes deeply and acts as a carrier for the therapeutic herbs."
      }
    ],
    "images": [
      "/images/products/nabhi-kids-daily-10ml.jpg",
      "/images/products/nabhi-kids-daily-15ml.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": "/images/products/nabhi-kids-daily-10ml.jpg",
        "goldMemberPrice": 149,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "15 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/nabhi-kids-daily-15ml.jpg",
        "goldMemberPrice": 249,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "60 ml",
        "price": 899,
        "originalPrice": 1199,
        "image": "/images/products/nabhi-kids-daily-15ml.jpg",
        "goldMemberPrice": 699,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 40,
    "rating": 4.8,
    "reviewCount": 124,
    "healthGoals": [
      "Overall Wellness"
    ],
    "idealFor": [
      "Daily use for optimal wellness"
    ],
    "usageInstructions": {
      "serving": "2-3 drops / Varies by product",
      "timing": "Nightly, before bedtime",
      "instructions": "Apply 2-3 drops into the navel or massage onto the soles of the feet before bed."
    },
    "specifications": {
      "Net Quantity": "Varies by variant",
      "Form": "Cold-pressed Oil",
      "Diet Preference": "Vegetarian, Vegan",
      "Shelf Life": "24 Months",
      "Country of Origin": "India"
    },
    "certifications": [
      "Ayurvedic Formulation",
      "100% Natural",
      "Made in India"
    ],
    "faqs": [
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, our blends are formulated with 100% natural, cold-pressed oils and are completely safe for daily use."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": [],
    "goldMemberPrice": 149
  },
  {
    "id": "kids-pure-blend",
    "slug": "kids-pure-blend",
    "name": "Kids Pure Blend",
    "category": "Nabhi Oil Blend",
    "shortDescription": "Pure & Natural, Safe for Kids",
    "fullDescription": "Ayurdhara Divya Shakti Kids Pure Blend is a 100% natural, cold-pressed formulation designed specifically for your daily routine.",
    "story": "Wellness is a journey. We created the Kids Pure Blend to ensure that you have access to premium Ayurvedic care. It's an investment in your daily vitality.",
    "benefit": "Pure & Natural, Safe for Kids",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "100% Natural Formulation"
      },
      {
        "icon": "Shield",
        "text": "Safe for Daily Use"
      }
    ],
    "ingredients": [
      {
        "name": "Premium Cold-Pressed Base Oil",
        "botanical": "Ayurvedic Base",
        "role": "Nourishes deeply and acts as a carrier for the therapeutic herbs."
      }
    ],
    "images": [
      "/images/products/nabhi-kids-pure-10ml.jpg",
      "/images/products/nabhi-kids-pure-15ml.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": "/images/products/nabhi-kids-pure-10ml.jpg",
        "goldMemberPrice": 149,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "15 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/nabhi-kids-pure-15ml.jpg",
        "goldMemberPrice": 249,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "60 ml",
        "price": 899,
        "originalPrice": 1199,
        "image": "/images/products/nabhi-kids-pure-15ml.jpg",
        "goldMemberPrice": 699,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 40,
    "rating": 4.8,
    "reviewCount": 124,
    "healthGoals": [
      "Overall Wellness"
    ],
    "idealFor": [
      "Daily use for optimal wellness"
    ],
    "usageInstructions": {
      "serving": "2-3 drops / Varies by product",
      "timing": "Nightly, before bedtime",
      "instructions": "Apply 2-3 drops into the navel or massage onto the soles of the feet before bed."
    },
    "specifications": {
      "Net Quantity": "Varies by variant",
      "Form": "Cold-pressed Oil",
      "Diet Preference": "Vegetarian, Vegan",
      "Shelf Life": "24 Months",
      "Country of Origin": "India"
    },
    "certifications": [
      "Ayurvedic Formulation",
      "100% Natural",
      "Made in India"
    ],
    "faqs": [
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, our blends are formulated with 100% natural, cold-pressed oils and are completely safe for daily use."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": [],
    "goldMemberPrice": 149
  },
  {
    "id": "men-strength-blend",
    "slug": "men-strength-blend",
    "name": "Men Strength Blend",
    "category": "Premium Combo",
    "shortDescription": "Builds Strength, Stamina & Energy",
    "fullDescription": "Ayurdhara Divya Shakti Men Strength Blend is a 100% natural, cold-pressed formulation designed specifically for your daily routine.",
    "story": "Wellness is a journey. We created the Men Strength Blend to ensure that you have access to premium Ayurvedic care. It's an investment in your daily vitality.",
    "benefit": "Builds Strength, Stamina & Energy",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "100% Natural Formulation"
      },
      {
        "icon": "Shield",
        "text": "Safe for Daily Use"
      }
    ],
    "ingredients": [
      {
        "name": "Premium Cold-Pressed Base Oil",
        "botanical": "Ayurvedic Base",
        "role": "Nourishes deeply and acts as a carrier for the therapeutic herbs."
      }
    ],
    "images": [
      "/images/products/nabhi-men-strength-10ml.jpg",
      "/images/products/nabhi-men-strength-15ml.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": "/images/products/nabhi-men-strength-10ml.jpg",
        "goldMemberPrice": 149,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "15 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/nabhi-men-strength-15ml.jpg",
        "goldMemberPrice": 249,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "60 ml",
        "price": 899,
        "originalPrice": 1199,
        "image": "/images/products/nabhi-men-strength-15ml.jpg",
        "goldMemberPrice": 699,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 40,
    "rating": 4.8,
    "reviewCount": 124,
    "healthGoals": [
      "Overall Wellness"
    ],
    "idealFor": [
      "Daily use for optimal wellness"
    ],
    "usageInstructions": {
      "serving": "2-3 drops / Varies by product",
      "timing": "Nightly, before bedtime",
      "instructions": "Apply 2-3 drops into the navel or massage onto the soles of the feet before bed."
    },
    "specifications": {
      "Net Quantity": "Varies by variant",
      "Form": "Cold-pressed Oil",
      "Diet Preference": "Vegetarian, Vegan",
      "Shelf Life": "24 Months",
      "Country of Origin": "India"
    },
    "certifications": [
      "Ayurvedic Formulation",
      "100% Natural",
      "Made in India"
    ],
    "faqs": [
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, our blends are formulated with 100% natural, cold-pressed oils and are completely safe for daily use."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": [],
    "goldMemberPrice": 149
  },
  {
    "id": "men-vital-blend",
    "slug": "men-vital-blend",
    "name": "Men Vital Blend",
    "category": "Premium Combo",
    "shortDescription": "Boosts Vitality, Power & Confidence",
    "fullDescription": "Ayurdhara Divya Shakti Men Vital Blend is a 100% natural, cold-pressed formulation designed specifically for your daily routine.",
    "story": "Wellness is a journey. We created the Men Vital Blend to ensure that you have access to premium Ayurvedic care. It's an investment in your daily vitality.",
    "benefit": "Boosts Vitality, Power & Confidence",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "100% Natural Formulation"
      },
      {
        "icon": "Shield",
        "text": "Safe for Daily Use"
      }
    ],
    "ingredients": [
      {
        "name": "Premium Cold-Pressed Base Oil",
        "botanical": "Ayurvedic Base",
        "role": "Nourishes deeply and acts as a carrier for the therapeutic herbs."
      }
    ],
    "images": [
      "/images/products/nabhi-men-vital-10ml.jpg",
      "/images/products/nabhi-men-vital-15ml.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": "/images/products/nabhi-men-vital-10ml.jpg",
        "goldMemberPrice": 149,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "15 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/nabhi-men-vital-15ml.jpg",
        "goldMemberPrice": 249,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "60 ml",
        "price": 899,
        "originalPrice": 1199,
        "image": "/images/products/nabhi-men-vital-15ml.jpg",
        "goldMemberPrice": 699,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 40,
    "rating": 4.8,
    "reviewCount": 124,
    "healthGoals": [
      "Overall Wellness"
    ],
    "idealFor": [
      "Daily use for optimal wellness"
    ],
    "usageInstructions": {
      "serving": "2-3 drops / Varies by product",
      "timing": "Nightly, before bedtime",
      "instructions": "Apply 2-3 drops into the navel or massage onto the soles of the feet before bed."
    },
    "specifications": {
      "Net Quantity": "Varies by variant",
      "Form": "Cold-pressed Oil",
      "Diet Preference": "Vegetarian, Vegan",
      "Shelf Life": "24 Months",
      "Country of Origin": "India"
    },
    "certifications": [
      "Ayurvedic Formulation",
      "100% Natural",
      "Made in India"
    ],
    "faqs": [
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, our blends are formulated with 100% natural, cold-pressed oils and are completely safe for daily use."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": [],
    "goldMemberPrice": 149
  },
  {
    "id": "men-balance-blend",
    "slug": "men-balance-blend",
    "name": "Men Balance Blend",
    "category": "Premium Combo",
    "shortDescription": "Balances Body, Mind & Emotions",
    "fullDescription": "Ayurdhara Divya Shakti Men Balance Blend is a 100% natural, cold-pressed formulation designed specifically for your daily routine.",
    "story": "Wellness is a journey. We created the Men Balance Blend to ensure that you have access to premium Ayurvedic care. It's an investment in your daily vitality.",
    "benefit": "Balances Body, Mind & Emotions",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "100% Natural Formulation"
      },
      {
        "icon": "Shield",
        "text": "Safe for Daily Use"
      }
    ],
    "ingredients": [
      {
        "name": "Premium Cold-Pressed Base Oil",
        "botanical": "Ayurvedic Base",
        "role": "Nourishes deeply and acts as a carrier for the therapeutic herbs."
      }
    ],
    "images": [
      "/images/products/nabhi-men-balance-10ml.jpg",
      "/images/products/nabhi-men-balance-15ml.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": "/images/products/nabhi-men-balance-10ml.jpg",
        "goldMemberPrice": 149,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "15 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/nabhi-men-balance-15ml.jpg",
        "goldMemberPrice": 249,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "60 ml",
        "price": 899,
        "originalPrice": 1199,
        "image": "/images/products/nabhi-men-balance-15ml.jpg",
        "goldMemberPrice": 699,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 40,
    "rating": 4.8,
    "reviewCount": 124,
    "healthGoals": [
      "Overall Wellness"
    ],
    "idealFor": [
      "Daily use for optimal wellness"
    ],
    "usageInstructions": {
      "serving": "2-3 drops / Varies by product",
      "timing": "Nightly, before bedtime",
      "instructions": "Apply 2-3 drops into the navel or massage onto the soles of the feet before bed."
    },
    "specifications": {
      "Net Quantity": "Varies by variant",
      "Form": "Cold-pressed Oil",
      "Diet Preference": "Vegetarian, Vegan",
      "Shelf Life": "24 Months",
      "Country of Origin": "India"
    },
    "certifications": [
      "Ayurvedic Formulation",
      "100% Natural",
      "Made in India"
    ],
    "faqs": [
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, our blends are formulated with 100% natural, cold-pressed oils and are completely safe for daily use."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": [],
    "goldMemberPrice": 149
  },
  {
    "id": "men-pure-blend",
    "slug": "men-pure-blend",
    "name": "Men Pure Blend",
    "category": "Premium Combo",
    "shortDescription": "Pure & Natural, Daily Wellness",
    "fullDescription": "Ayurdhara Divya Shakti Men Pure Blend is a 100% natural, cold-pressed formulation designed specifically for your daily routine.",
    "story": "Wellness is a journey. We created the Men Pure Blend to ensure that you have access to premium Ayurvedic care. It's an investment in your daily vitality.",
    "benefit": "Pure & Natural, Daily Wellness",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "100% Natural Formulation"
      },
      {
        "icon": "Shield",
        "text": "Safe for Daily Use"
      }
    ],
    "ingredients": [
      {
        "name": "Premium Cold-Pressed Base Oil",
        "botanical": "Ayurvedic Base",
        "role": "Nourishes deeply and acts as a carrier for the therapeutic herbs."
      }
    ],
    "images": [
      "/images/products/nabhi-men-pure-10ml.jpg",
      "/images/products/nabhi-men-pure-15ml.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": "/images/products/nabhi-men-pure-10ml.jpg",
        "goldMemberPrice": 149,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "15 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/nabhi-men-pure-15ml.jpg",
        "goldMemberPrice": 249,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "60 ml",
        "price": 899,
        "originalPrice": 1199,
        "image": "/images/products/nabhi-men-pure-15ml.jpg",
        "goldMemberPrice": 699,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 40,
    "rating": 4.8,
    "reviewCount": 124,
    "healthGoals": [
      "Overall Wellness"
    ],
    "idealFor": [
      "Daily use for optimal wellness"
    ],
    "usageInstructions": {
      "serving": "2-3 drops / Varies by product",
      "timing": "Nightly, before bedtime",
      "instructions": "Apply 2-3 drops into the navel or massage onto the soles of the feet before bed."
    },
    "specifications": {
      "Net Quantity": "Varies by variant",
      "Form": "Cold-pressed Oil",
      "Diet Preference": "Vegetarian, Vegan",
      "Shelf Life": "24 Months",
      "Country of Origin": "India"
    },
    "certifications": [
      "Ayurvedic Formulation",
      "100% Natural",
      "Made in India"
    ],
    "faqs": [
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, our blends are formulated with 100% natural, cold-pressed oils and are completely safe for daily use."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": [],
    "goldMemberPrice": 149
  },
  {
    "id": "women-harmony-blend",
    "slug": "women-harmony-blend",
    "name": "Women Harmony Blend",
    "category": "Premium Combo",
    "shortDescription": "Hormonal Balance, Inner Harmony",
    "fullDescription": "Ayurdhara Divya Shakti Women Harmony Blend is a 100% natural, cold-pressed formulation designed specifically for your daily routine.",
    "story": "Wellness is a journey. We created the Women Harmony Blend to ensure that you have access to premium Ayurvedic care. It's an investment in your daily vitality.",
    "benefit": "Hormonal Balance, Inner Harmony",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "100% Natural Formulation"
      },
      {
        "icon": "Shield",
        "text": "Safe for Daily Use"
      }
    ],
    "ingredients": [
      {
        "name": "Premium Cold-Pressed Base Oil",
        "botanical": "Ayurvedic Base",
        "role": "Nourishes deeply and acts as a carrier for the therapeutic herbs."
      }
    ],
    "images": [
      "/images/products/nabhi-women-harmony-10ml.jpg",
      "/images/products/nabhi-women-harmony-15ml.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": "/images/products/nabhi-women-harmony-10ml.jpg",
        "goldMemberPrice": 149,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "15 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/nabhi-women-harmony-15ml.jpg",
        "goldMemberPrice": 249,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "60 ml",
        "price": 899,
        "originalPrice": 1199,
        "image": "/images/products/nabhi-women-harmony-15ml.jpg",
        "goldMemberPrice": 699,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 40,
    "rating": 4.8,
    "reviewCount": 124,
    "healthGoals": [
      "Overall Wellness"
    ],
    "idealFor": [
      "Daily use for optimal wellness"
    ],
    "usageInstructions": {
      "serving": "2-3 drops / Varies by product",
      "timing": "Nightly, before bedtime",
      "instructions": "Apply 2-3 drops into the navel or massage onto the soles of the feet before bed."
    },
    "specifications": {
      "Net Quantity": "Varies by variant",
      "Form": "Cold-pressed Oil",
      "Diet Preference": "Vegetarian, Vegan",
      "Shelf Life": "24 Months",
      "Country of Origin": "India"
    },
    "certifications": [
      "Ayurvedic Formulation",
      "100% Natural",
      "Made in India"
    ],
    "faqs": [
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, our blends are formulated with 100% natural, cold-pressed oils and are completely safe for daily use."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": [],
    "goldMemberPrice": 149
  },
  {
    "id": "women-care-blend",
    "slug": "women-care-blend",
    "name": "Women Care Blend",
    "category": "Premium Combo",
    "shortDescription": "Daily Care, Comfort & Relief",
    "fullDescription": "Ayurdhara Divya Shakti Women Care Blend is a 100% natural, cold-pressed formulation designed specifically for your daily routine.",
    "story": "Wellness is a journey. We created the Women Care Blend to ensure that you have access to premium Ayurvedic care. It's an investment in your daily vitality.",
    "benefit": "Daily Care, Comfort & Relief",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "100% Natural Formulation"
      },
      {
        "icon": "Shield",
        "text": "Safe for Daily Use"
      }
    ],
    "ingredients": [
      {
        "name": "Premium Cold-Pressed Base Oil",
        "botanical": "Ayurvedic Base",
        "role": "Nourishes deeply and acts as a carrier for the therapeutic herbs."
      }
    ],
    "images": [
      "/images/products/nabhi-women-care-10ml.jpg",
      "/images/products/nabhi-women-care-15ml.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": "/images/products/nabhi-women-care-10ml.jpg",
        "goldMemberPrice": 149,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "15 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/nabhi-women-care-15ml.jpg",
        "goldMemberPrice": 249,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "60 ml",
        "price": 899,
        "originalPrice": 1199,
        "image": "/images/products/nabhi-women-care-15ml.jpg",
        "goldMemberPrice": 699,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 40,
    "rating": 4.8,
    "reviewCount": 124,
    "healthGoals": [
      "Overall Wellness"
    ],
    "idealFor": [
      "Daily use for optimal wellness"
    ],
    "usageInstructions": {
      "serving": "2-3 drops / Varies by product",
      "timing": "Nightly, before bedtime",
      "instructions": "Apply 2-3 drops into the navel or massage onto the soles of the feet before bed."
    },
    "specifications": {
      "Net Quantity": "Varies by variant",
      "Form": "Cold-pressed Oil",
      "Diet Preference": "Vegetarian, Vegan",
      "Shelf Life": "24 Months",
      "Country of Origin": "India"
    },
    "certifications": [
      "Ayurvedic Formulation",
      "100% Natural",
      "Made in India"
    ],
    "faqs": [
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, our blends are formulated with 100% natural, cold-pressed oils and are completely safe for daily use."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": [],
    "goldMemberPrice": 149
  },
  {
    "id": "women-glow-blend",
    "slug": "women-glow-blend",
    "name": "Women Glow Blend",
    "category": "Premium Combo",
    "shortDescription": "Natural Glow, Radiant Skin",
    "fullDescription": "Ayurdhara Divya Shakti Women Glow Blend is a 100% natural, cold-pressed formulation designed specifically for your daily routine.",
    "story": "Wellness is a journey. We created the Women Glow Blend to ensure that you have access to premium Ayurvedic care. It's an investment in your daily vitality.",
    "benefit": "Natural Glow, Radiant Skin",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "100% Natural Formulation"
      },
      {
        "icon": "Shield",
        "text": "Safe for Daily Use"
      }
    ],
    "ingredients": [
      {
        "name": "Premium Cold-Pressed Base Oil",
        "botanical": "Ayurvedic Base",
        "role": "Nourishes deeply and acts as a carrier for the therapeutic herbs."
      }
    ],
    "images": [
      "/images/products/nabhi-women-glow-10ml.jpg",
      "/images/products/nabhi-women-glow-15ml.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": "/images/products/nabhi-women-glow-10ml.jpg",
        "goldMemberPrice": 149,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "15 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/nabhi-women-glow-15ml.jpg",
        "goldMemberPrice": 249,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "60 ml",
        "price": 899,
        "originalPrice": 1199,
        "image": "/images/products/nabhi-women-glow-15ml.jpg",
        "goldMemberPrice": 699,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 40,
    "rating": 4.8,
    "reviewCount": 124,
    "healthGoals": [
      "Overall Wellness"
    ],
    "idealFor": [
      "Daily use for optimal wellness"
    ],
    "usageInstructions": {
      "serving": "2-3 drops / Varies by product",
      "timing": "Nightly, before bedtime",
      "instructions": "Apply 2-3 drops into the navel or massage onto the soles of the feet before bed."
    },
    "specifications": {
      "Net Quantity": "Varies by variant",
      "Form": "Cold-pressed Oil",
      "Diet Preference": "Vegetarian, Vegan",
      "Shelf Life": "24 Months",
      "Country of Origin": "India"
    },
    "certifications": [
      "Ayurvedic Formulation",
      "100% Natural",
      "Made in India"
    ],
    "faqs": [
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, our blends are formulated with 100% natural, cold-pressed oils and are completely safe for daily use."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": [],
    "goldMemberPrice": 149
  },
  {
    "id": "women-pure-blend",
    "slug": "women-pure-blend",
    "name": "Women Pure Blend",
    "category": "Premium Combo",
    "shortDescription": "Pure & Natural, Complete Wellness",
    "fullDescription": "Ayurdhara Divya Shakti Women Pure Blend is a 100% natural, cold-pressed formulation designed specifically for your daily routine.",
    "story": "Wellness is a journey. We created the Women Pure Blend to ensure that you have access to premium Ayurvedic care. It's an investment in your daily vitality.",
    "benefit": "Pure & Natural, Complete Wellness",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "100% Natural Formulation"
      },
      {
        "icon": "Shield",
        "text": "Safe for Daily Use"
      }
    ],
    "ingredients": [
      {
        "name": "Premium Cold-Pressed Base Oil",
        "botanical": "Ayurvedic Base",
        "role": "Nourishes deeply and acts as a carrier for the therapeutic herbs."
      }
    ],
    "images": [
      "/images/products/nabhi-women-pure-10ml.jpg",
      "/images/products/nabhi-women-pure-15ml.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": "/images/products/nabhi-women-pure-10ml.jpg",
        "goldMemberPrice": 149,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "15 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/nabhi-women-pure-15ml.jpg",
        "goldMemberPrice": 249,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "60 ml",
        "price": 899,
        "originalPrice": 1199,
        "image": "/images/products/nabhi-women-pure-15ml.jpg",
        "goldMemberPrice": 699,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 40,
    "rating": 4.8,
    "reviewCount": 124,
    "healthGoals": [
      "Overall Wellness"
    ],
    "idealFor": [
      "Daily use for optimal wellness"
    ],
    "usageInstructions": {
      "serving": "2-3 drops / Varies by product",
      "timing": "Nightly, before bedtime",
      "instructions": "Apply 2-3 drops into the navel or massage onto the soles of the feet before bed."
    },
    "specifications": {
      "Net Quantity": "Varies by variant",
      "Form": "Cold-pressed Oil",
      "Diet Preference": "Vegetarian, Vegan",
      "Shelf Life": "24 Months",
      "Country of Origin": "India"
    },
    "certifications": [
      "Ayurvedic Formulation",
      "100% Natural",
      "Made in India"
    ],
    "faqs": [
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, our blends are formulated with 100% natural, cold-pressed oils and are completely safe for daily use."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": [],
    "goldMemberPrice": 149
  },
  {
    "id": "senior-comfort-blend",
    "slug": "senior-comfort-blend",
    "name": "Senior Comfort Blend",
    "category": "Premium Combo",
    "shortDescription": "Relieves Discomfort, Joint Ease",
    "fullDescription": "Ayurdhara Divya Shakti Senior Comfort Blend is a 100% natural, cold-pressed formulation designed specifically for your daily routine.",
    "story": "Wellness is a journey. We created the Senior Comfort Blend to ensure that you have access to premium Ayurvedic care. It's an investment in your daily vitality.",
    "benefit": "Relieves Discomfort, Joint Ease",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "100% Natural Formulation"
      },
      {
        "icon": "Shield",
        "text": "Safe for Daily Use"
      }
    ],
    "ingredients": [
      {
        "name": "Premium Cold-Pressed Base Oil",
        "botanical": "Ayurvedic Base",
        "role": "Nourishes deeply and acts as a carrier for the therapeutic herbs."
      }
    ],
    "images": [
      "/images/products/nabhi-senior-comfort-10ml.jpg",
      "/images/products/nabhi-senior-comfort-15ml.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": "/images/products/nabhi-senior-comfort-10ml.jpg",
        "goldMemberPrice": 149,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "15 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/nabhi-senior-comfort-15ml.jpg",
        "goldMemberPrice": 249,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "60 ml",
        "price": 899,
        "originalPrice": 1199,
        "image": "/images/products/nabhi-senior-comfort-15ml.jpg",
        "goldMemberPrice": 699,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 40,
    "rating": 4.8,
    "reviewCount": 124,
    "healthGoals": [
      "Overall Wellness"
    ],
    "idealFor": [
      "Daily use for optimal wellness"
    ],
    "usageInstructions": {
      "serving": "2-3 drops / Varies by product",
      "timing": "Nightly, before bedtime",
      "instructions": "Apply 2-3 drops into the navel or massage onto the soles of the feet before bed."
    },
    "specifications": {
      "Net Quantity": "Varies by variant",
      "Form": "Cold-pressed Oil",
      "Diet Preference": "Vegetarian, Vegan",
      "Shelf Life": "24 Months",
      "Country of Origin": "India"
    },
    "certifications": [
      "Ayurvedic Formulation",
      "100% Natural",
      "Made in India"
    ],
    "faqs": [
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, our blends are formulated with 100% natural, cold-pressed oils and are completely safe for daily use."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": [],
    "goldMemberPrice": 149
  },
  {
    "id": "senior-vital-blend",
    "slug": "senior-vital-blend",
    "name": "Senior Vital Blend",
    "category": "Premium Combo",
    "shortDescription": "Improves Vitality, Energy",
    "fullDescription": "Ayurdhara Divya Shakti Senior Vital Blend is a 100% natural, cold-pressed formulation designed specifically for your daily routine.",
    "story": "Wellness is a journey. We created the Senior Vital Blend to ensure that you have access to premium Ayurvedic care. It's an investment in your daily vitality.",
    "benefit": "Improves Vitality, Energy",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "100% Natural Formulation"
      },
      {
        "icon": "Shield",
        "text": "Safe for Daily Use"
      }
    ],
    "ingredients": [
      {
        "name": "Premium Cold-Pressed Base Oil",
        "botanical": "Ayurvedic Base",
        "role": "Nourishes deeply and acts as a carrier for the therapeutic herbs."
      }
    ],
    "images": [
      "/images/products/nabhi-senior-vital-10ml.jpg",
      "/images/products/nabhi-senior-vital-15ml.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": "/images/products/nabhi-senior-vital-10ml.jpg",
        "goldMemberPrice": 149,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "15 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/nabhi-senior-vital-15ml.jpg",
        "goldMemberPrice": 249,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "60 ml",
        "price": 899,
        "originalPrice": 1199,
        "image": "/images/products/nabhi-senior-vital-15ml.jpg",
        "goldMemberPrice": 699,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 40,
    "rating": 4.8,
    "reviewCount": 124,
    "healthGoals": [
      "Overall Wellness"
    ],
    "idealFor": [
      "Daily use for optimal wellness"
    ],
    "usageInstructions": {
      "serving": "2-3 drops / Varies by product",
      "timing": "Nightly, before bedtime",
      "instructions": "Apply 2-3 drops into the navel or massage onto the soles of the feet before bed."
    },
    "specifications": {
      "Net Quantity": "Varies by variant",
      "Form": "Cold-pressed Oil",
      "Diet Preference": "Vegetarian, Vegan",
      "Shelf Life": "24 Months",
      "Country of Origin": "India"
    },
    "certifications": [
      "Ayurvedic Formulation",
      "100% Natural",
      "Made in India"
    ],
    "faqs": [
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, our blends are formulated with 100% natural, cold-pressed oils and are completely safe for daily use."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": [],
    "goldMemberPrice": 149
  },
  {
    "id": "senior-balance-blend",
    "slug": "senior-balance-blend",
    "name": "Senior Balance Blend",
    "category": "Premium Combo",
    "shortDescription": "Restores Balance, Calm & Relax",
    "fullDescription": "Ayurdhara Divya Shakti Senior Balance Blend is a 100% natural, cold-pressed formulation designed specifically for your daily routine.",
    "story": "Wellness is a journey. We created the Senior Balance Blend to ensure that you have access to premium Ayurvedic care. It's an investment in your daily vitality.",
    "benefit": "Restores Balance, Calm & Relax",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "100% Natural Formulation"
      },
      {
        "icon": "Shield",
        "text": "Safe for Daily Use"
      }
    ],
    "ingredients": [
      {
        "name": "Premium Cold-Pressed Base Oil",
        "botanical": "Ayurvedic Base",
        "role": "Nourishes deeply and acts as a carrier for the therapeutic herbs."
      }
    ],
    "images": [
      "/images/products/nabhi-senior-balance-10ml.jpg",
      "/images/products/nabhi-senior-balance-15ml.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": "/images/products/nabhi-senior-balance-10ml.jpg",
        "goldMemberPrice": 149,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "15 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/nabhi-senior-balance-15ml.jpg",
        "goldMemberPrice": 249,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "60 ml",
        "price": 899,
        "originalPrice": 1199,
        "image": "/images/products/nabhi-senior-balance-15ml.jpg",
        "goldMemberPrice": 699,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 40,
    "rating": 4.8,
    "reviewCount": 124,
    "healthGoals": [
      "Overall Wellness"
    ],
    "idealFor": [
      "Daily use for optimal wellness"
    ],
    "usageInstructions": {
      "serving": "2-3 drops / Varies by product",
      "timing": "Nightly, before bedtime",
      "instructions": "Apply 2-3 drops into the navel or massage onto the soles of the feet before bed."
    },
    "specifications": {
      "Net Quantity": "Varies by variant",
      "Form": "Cold-pressed Oil",
      "Diet Preference": "Vegetarian, Vegan",
      "Shelf Life": "24 Months",
      "Country of Origin": "India"
    },
    "certifications": [
      "Ayurvedic Formulation",
      "100% Natural",
      "Made in India"
    ],
    "faqs": [
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, our blends are formulated with 100% natural, cold-pressed oils and are completely safe for daily use."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": [],
    "goldMemberPrice": 149
  },
  {
    "id": "senior-pure-blend",
    "slug": "senior-pure-blend",
    "name": "Senior Pure Blend",
    "category": "Premium Combo",
    "shortDescription": "Pure & Natural, Daily Wellness",
    "fullDescription": "Ayurdhara Divya Shakti Senior Pure Blend is a 100% natural, cold-pressed formulation designed specifically for your daily routine.",
    "story": "Wellness is a journey. We created the Senior Pure Blend to ensure that you have access to premium Ayurvedic care. It's an investment in your daily vitality.",
    "benefit": "Pure & Natural, Daily Wellness",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "100% Natural Formulation"
      },
      {
        "icon": "Shield",
        "text": "Safe for Daily Use"
      }
    ],
    "ingredients": [
      {
        "name": "Premium Cold-Pressed Base Oil",
        "botanical": "Ayurvedic Base",
        "role": "Nourishes deeply and acts as a carrier for the therapeutic herbs."
      }
    ],
    "images": [
      "/images/products/nabhi-senior-pure-10ml.jpg",
      "/images/products/nabhi-senior-pure-15ml.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": "/images/products/nabhi-senior-pure-10ml.jpg",
        "goldMemberPrice": 149,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "15 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/nabhi-senior-pure-15ml.jpg",
        "goldMemberPrice": 249,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "60 ml",
        "price": 899,
        "originalPrice": 1199,
        "image": "/images/products/nabhi-senior-pure-15ml.jpg",
        "goldMemberPrice": 699,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 40,
    "rating": 4.8,
    "reviewCount": 124,
    "healthGoals": [
      "Overall Wellness"
    ],
    "idealFor": [
      "Daily use for optimal wellness"
    ],
    "usageInstructions": {
      "serving": "2-3 drops / Varies by product",
      "timing": "Nightly, before bedtime",
      "instructions": "Apply 2-3 drops into the navel or massage onto the soles of the feet before bed."
    },
    "specifications": {
      "Net Quantity": "Varies by variant",
      "Form": "Cold-pressed Oil",
      "Diet Preference": "Vegetarian, Vegan",
      "Shelf Life": "24 Months",
      "Country of Origin": "India"
    },
    "certifications": [
      "Ayurvedic Formulation",
      "100% Natural",
      "Made in India"
    ],
    "faqs": [
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, our blends are formulated with 100% natural, cold-pressed oils and are completely safe for daily use."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": [],
    "goldMemberPrice": 149
  },
  {
    "id": "kids-soft-steps-blend",
    "slug": "kids-soft-steps-blend",
    "name": "Kids Soft Steps Blend",
    "category": "Nabhi Oil Blend",
    "shortDescription": "Nourishes, Soothes & Supports Growth",
    "fullDescription": "Ayurdhara Divya Shakti Kids Soft Steps Blend is a 100% natural, cold-pressed formulation designed specifically for your daily routine.",
    "story": "Wellness is a journey. We created the Kids Soft Steps Blend to ensure that you have access to premium Ayurvedic care. It's an investment in your daily vitality.",
    "benefit": "Nourishes, Soothes & Supports Growth",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "100% Natural Formulation"
      },
      {
        "icon": "Shield",
        "text": "Safe for Daily Use"
      }
    ],
    "ingredients": [
      {
        "name": "Premium Cold-Pressed Base Oil",
        "botanical": "Ayurvedic Base",
        "role": "Nourishes deeply and acts as a carrier for the therapeutic herbs."
      }
    ],
    "images": [
      "/images/products/feet-kids-soft-steps-30ml.jpg",
      "/images/products/feet-kids-soft-steps-150ml.jpg"
    ],
    "variants": [
      {
        "size": "30 ml",
        "price": 499,
        "originalPrice": 699,
        "image": "/images/products/feet-kids-soft-steps-30ml.jpg",
        "goldMemberPrice": 399,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "500 ml",
        "price": 3999,
        "originalPrice": 5999,
        "image": "/images/products/feet-kids-soft-steps-150ml.jpg",
        "goldMemberPrice": 2999,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "500 ml",
        "price": 3999,
        "originalPrice": 5999,
        "image": "/images/products/feet-kids-soft-steps-150ml.jpg",
        "goldMemberPrice": 2999,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      }
    ],
    "price": 499,
    "originalPrice": 699,
    "discount": 33,
    "rating": 4.8,
    "reviewCount": 124,
    "healthGoals": [
      "Overall Wellness"
    ],
    "idealFor": [
      "Daily use for optimal wellness"
    ],
    "usageInstructions": {
      "serving": "2-3 drops / Varies by product",
      "timing": "Nightly, before bedtime",
      "instructions": "Apply 2-3 drops into the navel or massage onto the soles of the feet before bed."
    },
    "specifications": {
      "Net Quantity": "Varies by variant",
      "Form": "Cold-pressed Oil",
      "Diet Preference": "Vegetarian, Vegan",
      "Shelf Life": "24 Months",
      "Country of Origin": "India"
    },
    "certifications": [
      "Ayurvedic Formulation",
      "100% Natural",
      "Made in India"
    ],
    "faqs": [
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, our blends are formulated with 100% natural, cold-pressed oils and are completely safe for daily use."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": [],
    "goldMemberPrice": 399
  },
  {
    "id": "men-active-steps-blend",
    "slug": "men-active-steps-blend",
    "name": "Men Active Steps Blend",
    "category": "Premium Combo",
    "shortDescription": "Relieves Fatigue, Refreshes",
    "fullDescription": "Ayurdhara Divya Shakti Men Active Steps Blend is a 100% natural, cold-pressed formulation designed specifically for your daily routine.",
    "story": "Wellness is a journey. We created the Men Active Steps Blend to ensure that you have access to premium Ayurvedic care. It's an investment in your daily vitality.",
    "benefit": "Relieves Fatigue, Refreshes",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "100% Natural Formulation"
      },
      {
        "icon": "Shield",
        "text": "Safe for Daily Use"
      }
    ],
    "ingredients": [
      {
        "name": "Premium Cold-Pressed Base Oil",
        "botanical": "Ayurvedic Base",
        "role": "Nourishes deeply and acts as a carrier for the therapeutic herbs."
      }
    ],
    "images": [
      "/images/products/feet-men-active-steps-30ml.jpg",
      "/images/products/feet-men-active-steps-150ml.jpg"
    ],
    "variants": [
      {
        "size": "30 ml",
        "price": 499,
        "originalPrice": 699,
        "image": "/images/products/feet-men-active-steps-30ml.jpg",
        "goldMemberPrice": 399,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "500 ml",
        "price": 3999,
        "originalPrice": 5999,
        "image": "/images/products/feet-men-active-steps-150ml.jpg",
        "goldMemberPrice": 2999,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "500 ml",
        "price": 3999,
        "originalPrice": 5999,
        "image": "/images/products/feet-men-active-steps-150ml.jpg",
        "goldMemberPrice": 2999,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      }
    ],
    "price": 499,
    "originalPrice": 699,
    "discount": 33,
    "rating": 4.8,
    "reviewCount": 124,
    "healthGoals": [
      "Overall Wellness"
    ],
    "idealFor": [
      "Daily use for optimal wellness"
    ],
    "usageInstructions": {
      "serving": "2-3 drops / Varies by product",
      "timing": "Nightly, before bedtime",
      "instructions": "Apply 2-3 drops into the navel or massage onto the soles of the feet before bed."
    },
    "specifications": {
      "Net Quantity": "Varies by variant",
      "Form": "Cold-pressed Oil",
      "Diet Preference": "Vegetarian, Vegan",
      "Shelf Life": "24 Months",
      "Country of Origin": "India"
    },
    "certifications": [
      "Ayurvedic Formulation",
      "100% Natural",
      "Made in India"
    ],
    "faqs": [
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, our blends are formulated with 100% natural, cold-pressed oils and are completely safe for daily use."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": [],
    "goldMemberPrice": 399
  },
  {
    "id": "women-comfort-steps-blend",
    "slug": "women-comfort-steps-blend",
    "name": "Women Comfort Steps Blend",
    "category": "Premium Combo",
    "shortDescription": "Relieves Stress, Reduces Swelling",
    "fullDescription": "Ayurdhara Divya Shakti Women Comfort Steps Blend is a 100% natural, cold-pressed formulation designed specifically for your daily routine.",
    "story": "Wellness is a journey. We created the Women Comfort Steps Blend to ensure that you have access to premium Ayurvedic care. It's an investment in your daily vitality.",
    "benefit": "Relieves Stress, Reduces Swelling",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "100% Natural Formulation"
      },
      {
        "icon": "Shield",
        "text": "Safe for Daily Use"
      }
    ],
    "ingredients": [
      {
        "name": "Premium Cold-Pressed Base Oil",
        "botanical": "Ayurvedic Base",
        "role": "Nourishes deeply and acts as a carrier for the therapeutic herbs."
      }
    ],
    "images": [
      "/images/products/feet-women-comfort-steps-30ml.jpg",
      "/images/products/feet-women-comfort-steps-150ml.jpg"
    ],
    "variants": [
      {
        "size": "30 ml",
        "price": 499,
        "originalPrice": 699,
        "image": "/images/products/feet-women-comfort-steps-30ml.jpg",
        "goldMemberPrice": 399,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "500 ml",
        "price": 3999,
        "originalPrice": 5999,
        "image": "/images/products/feet-women-comfort-steps-150ml.jpg",
        "goldMemberPrice": 2999,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "500 ml",
        "price": 3999,
        "originalPrice": 5999,
        "image": "/images/products/feet-women-comfort-steps-150ml.jpg",
        "goldMemberPrice": 2999,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      }
    ],
    "price": 499,
    "originalPrice": 699,
    "discount": 33,
    "rating": 4.8,
    "reviewCount": 124,
    "healthGoals": [
      "Overall Wellness"
    ],
    "idealFor": [
      "Daily use for optimal wellness"
    ],
    "usageInstructions": {
      "serving": "2-3 drops / Varies by product",
      "timing": "Nightly, before bedtime",
      "instructions": "Apply 2-3 drops into the navel or massage onto the soles of the feet before bed."
    },
    "specifications": {
      "Net Quantity": "Varies by variant",
      "Form": "Cold-pressed Oil",
      "Diet Preference": "Vegetarian, Vegan",
      "Shelf Life": "24 Months",
      "Country of Origin": "India"
    },
    "certifications": [
      "Ayurvedic Formulation",
      "100% Natural",
      "Made in India"
    ],
    "faqs": [
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, our blends are formulated with 100% natural, cold-pressed oils and are completely safe for daily use."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": [],
    "goldMemberPrice": 399
  },
  {
    "id": "senior-relax-steps-blend",
    "slug": "senior-relax-steps-blend",
    "name": "Senior Relax Steps Blend",
    "category": "Premium Combo",
    "shortDescription": "Relaxes Muscles, Restful Sleep",
    "fullDescription": "Ayurdhara Divya Shakti Senior Relax Steps Blend is a 100% natural, cold-pressed formulation designed specifically for your daily routine.",
    "story": "Wellness is a journey. We created the Senior Relax Steps Blend to ensure that you have access to premium Ayurvedic care. It's an investment in your daily vitality.",
    "benefit": "Relaxes Muscles, Restful Sleep",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "100% Natural Formulation"
      },
      {
        "icon": "Shield",
        "text": "Safe for Daily Use"
      }
    ],
    "ingredients": [
      {
        "name": "Premium Cold-Pressed Base Oil",
        "botanical": "Ayurvedic Base",
        "role": "Nourishes deeply and acts as a carrier for the therapeutic herbs."
      }
    ],
    "images": [
      "/images/products/feet-senior-relax-steps-30ml.jpg",
      "/images/products/feet-senior-relax-steps-150ml.jpg"
    ],
    "variants": [
      {
        "size": "30 ml",
        "price": 499,
        "originalPrice": 699,
        "image": "/images/products/feet-senior-relax-steps-30ml.jpg",
        "goldMemberPrice": 399,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "500 ml",
        "price": 3999,
        "originalPrice": 5999,
        "image": "/images/products/feet-senior-relax-steps-150ml.jpg",
        "goldMemberPrice": 2999,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      },
      {
        "size": "500 ml",
        "price": 3999,
        "originalPrice": 5999,
        "image": "/images/products/feet-senior-relax-steps-150ml.jpg",
        "goldMemberPrice": 2999,
        "pricingStatus": "official",
        "goldPricingEnabled": true
      }
    ],
    "price": 499,
    "originalPrice": 699,
    "discount": 33,
    "rating": 4.8,
    "reviewCount": 124,
    "healthGoals": [
      "Overall Wellness"
    ],
    "idealFor": [
      "Daily use for optimal wellness"
    ],
    "usageInstructions": {
      "serving": "2-3 drops / Varies by product",
      "timing": "Nightly, before bedtime",
      "instructions": "Apply 2-3 drops into the navel or massage onto the soles of the feet before bed."
    },
    "specifications": {
      "Net Quantity": "Varies by variant",
      "Form": "Cold-pressed Oil",
      "Diet Preference": "Vegetarian, Vegan",
      "Shelf Life": "24 Months",
      "Country of Origin": "India"
    },
    "certifications": [
      "Ayurvedic Formulation",
      "100% Natural",
      "Made in India"
    ],
    "faqs": [
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, our blends are formulated with 100% natural, cold-pressed oils and are completely safe for daily use."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": [],
    "goldMemberPrice": 399
  },
  {
    "id": "individual-trial-combo",
    "slug": "individual-trial-combo",
    "name": "Individual Trial Combo",
    "category": "Premium Combo",
    "shortDescription": "10ml Nabhi + 30ml Feet",
    "fullDescription": "Ayurdhara Divya Shakti Individual Trial Combo is a 100% natural, cold-pressed formulation designed specifically for your daily routine.",
    "story": "Wellness is a journey. We created the Individual Trial Combo to ensure that you have access to premium Ayurvedic care. It's an investment in your daily vitality.",
    "benefit": "10ml Nabhi + 30ml Feet",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "100% Natural Formulation"
      },
      {
        "icon": "Shield",
        "text": "Safe for Daily Use"
      }
    ],
    "ingredients": [
      {
        "name": "Premium Cold-Pressed Base Oil",
        "botanical": "Ayurvedic Base",
        "role": "Nourishes deeply and acts as a carrier for the therapeutic herbs."
      }
    ],
    "images": [
      "/images/products/combo-individual-trial.jpg"
    ],
    "variants": [],
    "price": 499,
    "originalPrice": 999,
    "discount": 33,
    "rating": 4.8,
    "reviewCount": 124,
    "healthGoals": [
      "Overall Wellness"
    ],
    "idealFor": [
      "Daily use for optimal wellness"
    ],
    "usageInstructions": {
      "serving": "2-3 drops / Varies by product",
      "timing": "Nightly, before bedtime",
      "instructions": "Apply 2-3 drops into the navel or massage onto the soles of the feet before bed."
    },
    "specifications": {
      "Net Quantity": "Varies by variant",
      "Form": "Cold-pressed Oil",
      "Diet Preference": "Vegetarian, Vegan",
      "Shelf Life": "24 Months",
      "Country of Origin": "India"
    },
    "certifications": [
      "Ayurvedic Formulation",
      "100% Natural",
      "Made in India"
    ],
    "faqs": [
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, our blends are formulated with 100% natural, cold-pressed oils and are completely safe for daily use."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": [],
    "goldMembershipEligible": false
  },
  {
    "id": "family-trial-pack",
    "slug": "family-trial-pack",
    "name": "Family Trial Pack",
    "category": "Premium Combo",
    "shortDescription": "Complete family wellness",
    "fullDescription": "Ayurdhara Divya Shakti Family Trial Pack is a 100% natural, cold-pressed formulation designed specifically for your daily routine.",
    "story": "Wellness is a journey. We created the Family Trial Pack to ensure that you have access to premium Ayurvedic care. It's an investment in your daily vitality.",
    "benefit": "Complete family wellness",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "100% Natural Formulation"
      },
      {
        "icon": "Shield",
        "text": "Safe for Daily Use"
      }
    ],
    "ingredients": [
      {
        "name": "Premium Cold-Pressed Base Oil",
        "botanical": "Ayurvedic Base",
        "role": "Nourishes deeply and acts as a carrier for the therapeutic herbs."
      }
    ],
    "images": [
      "/images/products/combo-family-trial.jpg"
    ],
    "variants": [],
    "price": 999,
    "originalPrice": 1999,
    "discount": 33,
    "rating": 4.8,
    "reviewCount": 124,
    "healthGoals": [
      "Overall Wellness"
    ],
    "idealFor": [
      "Daily use for optimal wellness"
    ],
    "usageInstructions": {
      "serving": "2-3 drops / Varies by product",
      "timing": "Nightly, before bedtime",
      "instructions": "Apply 2-3 drops into the navel or massage onto the soles of the feet before bed."
    },
    "specifications": {
      "Net Quantity": "Varies by variant",
      "Form": "Cold-pressed Oil",
      "Diet Preference": "Vegetarian, Vegan",
      "Shelf Life": "24 Months",
      "Country of Origin": "India"
    },
    "certifications": [
      "Ayurvedic Formulation",
      "100% Natural",
      "Made in India"
    ],
    "faqs": [
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, our blends are formulated with 100% natural, cold-pressed oils and are completely safe for daily use."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": [],
    "goldMembershipEligible": false
  },
  {
    "id": "individual-gold-wellness-pack",
    "slug": "individual-gold-wellness-pack",
    "name": "Individual Gold Wellness Pack",
    "category": "Premium Combo",
    "shortDescription": "4 x 15ml Nabhi + 150ml Feet",
    "fullDescription": "Ayurdhara Divya Shakti Individual Gold Wellness Pack is a 100% natural, cold-pressed formulation designed specifically for your daily routine.",
    "story": "Wellness is a journey. We created the Individual Gold Wellness Pack to ensure that you have access to premium Ayurvedic care. It's an investment in your daily vitality.",
    "benefit": "4 x 15ml Nabhi + 150ml Feet",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "100% Natural Formulation"
      },
      {
        "icon": "Shield",
        "text": "Safe for Daily Use"
      }
    ],
    "ingredients": [
      {
        "name": "Premium Cold-Pressed Base Oil",
        "botanical": "Ayurvedic Base",
        "role": "Nourishes deeply and acts as a carrier for the therapeutic herbs."
      }
    ],
    "images": [
      "/images/products/combo-individual-gold.jpg"
    ],
    "variants": [],
    "price": 1899,
    "originalPrice": 3999,
    "discount": 33,
    "rating": 4.8,
    "reviewCount": 124,
    "healthGoals": [
      "Overall Wellness"
    ],
    "idealFor": [
      "Daily use for optimal wellness"
    ],
    "usageInstructions": {
      "serving": "2-3 drops / Varies by product",
      "timing": "Nightly, before bedtime",
      "instructions": "Apply 2-3 drops into the navel or massage onto the soles of the feet before bed."
    },
    "specifications": {
      "Net Quantity": "Varies by variant",
      "Form": "Cold-pressed Oil",
      "Diet Preference": "Vegetarian, Vegan",
      "Shelf Life": "24 Months",
      "Country of Origin": "India"
    },
    "certifications": [
      "Ayurvedic Formulation",
      "100% Natural",
      "Made in India"
    ],
    "faqs": [
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, our blends are formulated with 100% natural, cold-pressed oils and are completely safe for daily use."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": [],
    "goldMembershipEligible": true,
    "durationText": "Up to 90 Days",
    "totalQuantityMl": "210 ml"
  },
  {
    "id": "family-gold-wellness-pack",
    "slug": "family-gold-wellness-pack",
    "name": "Family Gold Wellness Pack",
    "category": "Premium Combo",
    "shortDescription": "240ml Nabhi + 600ml Feet",
    "fullDescription": "Ayurdhara Divya Shakti Family Gold Wellness Pack is a 100% natural, cold-pressed formulation designed specifically for your daily routine.",
    "story": "Wellness is a journey. We created the Family Gold Wellness Pack to ensure that you have access to premium Ayurvedic care. It's an investment in your daily vitality.",
    "benefit": "240ml Nabhi + 600ml Feet",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "100% Natural Formulation"
      },
      {
        "icon": "Shield",
        "text": "Safe for Daily Use"
      }
    ],
    "ingredients": [
      {
        "name": "Premium Cold-Pressed Base Oil",
        "botanical": "Ayurvedic Base",
        "role": "Nourishes deeply and acts as a carrier for the therapeutic herbs."
      }
    ],
    "images": [
      "/images/products/combo-family-gold.jpg"
    ],
    "variants": [],
    "price": 4999,
    "originalPrice": 9999,
    "discount": 33,
    "rating": 4.8,
    "reviewCount": 124,
    "healthGoals": [
      "Overall Wellness"
    ],
    "idealFor": [
      "Daily use for optimal wellness"
    ],
    "usageInstructions": {
      "serving": "2-3 drops / Varies by product",
      "timing": "Nightly, before bedtime",
      "instructions": "Apply 2-3 drops into the navel or massage onto the soles of the feet before bed."
    },
    "specifications": {
      "Net Quantity": "Varies by variant",
      "Form": "Cold-pressed Oil",
      "Diet Preference": "Vegetarian, Vegan",
      "Shelf Life": "24 Months",
      "Country of Origin": "India"
    },
    "certifications": [
      "Ayurvedic Formulation",
      "100% Natural",
      "Made in India"
    ],
    "faqs": [
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, our blends are formulated with 100% natural, cold-pressed oils and are completely safe for daily use."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": [],
    "goldMembershipEligible": true,
    "durationText": "Up to 90 Days",
    "totalQuantityMl": "840 ml"
  },
  {
    "id": "premium-wellness-pack",
    "slug": "premium-wellness-pack",
    "name": "Premium Wellness Pack",
    "category": "Premium Combo",
    "shortDescription": "4 x 50ml Nabhi + 500ml Feet",
    "fullDescription": "Ayurdhara Divya Shakti Premium Wellness Pack is a 100% natural, cold-pressed formulation designed specifically for your daily routine.",
    "story": "Wellness is a journey. We created the Premium Wellness Pack to ensure that you have access to premium Ayurvedic care. It's an investment in your daily vitality.",
    "benefit": "4 x 50ml Nabhi + 500ml Feet",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "100% Natural Formulation"
      },
      {
        "icon": "Shield",
        "text": "Safe for Daily Use"
      }
    ],
    "ingredients": [
      {
        "name": "Premium Cold-Pressed Base Oil",
        "botanical": "Ayurvedic Base",
        "role": "Nourishes deeply and acts as a carrier for the therapeutic herbs."
      }
    ],
    "images": [
      "/images/products/combo-individual-premium.jpg"
    ],
    "variants": [],
    "price": 4499,
    "originalPrice": 9999,
    "discount": 33,
    "rating": 4.8,
    "reviewCount": 124,
    "healthGoals": [
      "Overall Wellness"
    ],
    "idealFor": [
      "Daily use for optimal wellness"
    ],
    "usageInstructions": {
      "serving": "2-3 drops / Varies by product",
      "timing": "Nightly, before bedtime",
      "instructions": "Apply 2-3 drops into the navel or massage onto the soles of the feet before bed."
    },
    "specifications": {
      "Net Quantity": "Varies by variant",
      "Form": "Cold-pressed Oil",
      "Diet Preference": "Vegetarian, Vegan",
      "Shelf Life": "24 Months",
      "Country of Origin": "India"
    },
    "certifications": [
      "Ayurvedic Formulation",
      "100% Natural",
      "Made in India"
    ],
    "faqs": [
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, our blends are formulated with 100% natural, cold-pressed oils and are completely safe for daily use."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": [],
    "goldMembershipEligible": true,
    "durationText": "Up to 9-10 Months",
    "totalQuantityMl": "740 ml"
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return products.map(p => p.slug);
}
