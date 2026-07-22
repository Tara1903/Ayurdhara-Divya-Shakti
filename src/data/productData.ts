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
    "name": "Kids Smart Oil Blend",
    "category": "Kids Care",
    "shortDescription": "Premium Kids Care daily wellness support.",
    "fullDescription": "The Kids Smart Oil Blend is meticulously crafted to support your daily wellness routine. Applied to the navel, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts, our navel therapy (Nabhi Chikitsa) blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
    "benefit": "Supports daily vitality, balance, and holistic wellness.",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "Deep Nourishment"
      },
      {
        "icon": "Leaf",
        "text": "100% Pure & Natural"
      },
      {
        "icon": "Shield",
        "text": "Holistic Balance"
      }
    ],
    "ingredients": [
      {
        "name": "Cold-pressed Sesame Oil",
        "botanical": "Sesamum indicum",
        "role": "Nourishing base"
      },
      {
        "name": "Pure Almond Oil",
        "botanical": "Prunus amygdalus",
        "role": "Rich in vitamins"
      },
      {
        "name": "Traditional Ayurvedic Herbs",
        "botanical": "Various",
        "role": "Holistic wellness"
      }
    ],
    "images": [
      "/images/products/nabhi-kids-smart-15ml.jpg"
    ],
    "variants": [
      {
        "size": "Trial 10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": "/images/products/nabhi-kids-smart-10ml.jpg"
      },
      {
        "size": "Gold 15 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/nabhi-kids-smart-15ml.jpg"
      },
      {
        "size": "Premium 60 ml",
        "price": 899,
        "originalPrice": 1199,
        "image": "/images/products/nabhi-kids-smart-15ml.jpg"
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 4.8,
    "reviewCount": 219,
    "badge": "Bestseller",
    "healthGoals": [
      "Daily Wellness",
      "Nourishment",
      "Balance"
    ],
    "idealFor": [
      "Kids",
      "Daily Use"
    ],
    "usageInstructions": {
      "serving": "2-5 drops",
      "timing": "Before bedtime",
      "instructions": "Apply 2-5 drops on the navel and massage gently in a circular motion. Leave overnight for best results."
    },
    "specifications": {
      "Form": "Oil",
      "Application": "Navel (Nabhi)",
      "Purity": "100% Natural"
    },
    "certifications": [
      "100% Natural",
      "Cruelty-Free",
      "Ayurvedic Formulation"
    ],
    "faqs": [
      {
        "question": "How often should I use this?",
        "answer": "For best results, use daily before bedtime."
      },
      {
        "question": "Is it safe for sensitive skin?",
        "answer": "Yes, our oils are 100% natural and gentle. However, we recommend a patch test first."
      }
    ],
    "relatedProductIds": [
      "feet-wellness-oil"
    ],
    "routineProductIds": [
      "feet-wellness-oil"
    ],
    "goldMembershipEligible": true
  },
  {
    "id": "kids-gentle-blend",
    "slug": "kids-gentle-blend",
    "name": "Kids Gentle Oil Blend",
    "category": "Kids Care",
    "shortDescription": "Premium Kids Care daily wellness support.",
    "fullDescription": "The Kids Gentle Oil Blend is meticulously crafted to support your daily wellness routine. Applied to the navel, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts, our navel therapy (Nabhi Chikitsa) blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
    "benefit": "Supports daily vitality, balance, and holistic wellness.",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "Deep Nourishment"
      },
      {
        "icon": "Leaf",
        "text": "100% Pure & Natural"
      },
      {
        "icon": "Shield",
        "text": "Holistic Balance"
      }
    ],
    "ingredients": [
      {
        "name": "Cold-pressed Sesame Oil",
        "botanical": "Sesamum indicum",
        "role": "Nourishing base"
      },
      {
        "name": "Pure Almond Oil",
        "botanical": "Prunus amygdalus",
        "role": "Rich in vitamins"
      },
      {
        "name": "Traditional Ayurvedic Herbs",
        "botanical": "Various",
        "role": "Holistic wellness"
      }
    ],
    "images": [
      "/images/products/nabhi-kids-gentle-15ml.jpg"
    ],
    "variants": [
      {
        "size": "Trial 10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": "/images/products/nabhi-kids-gentle-10ml.jpg"
      },
      {
        "size": "Gold 15 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/nabhi-kids-gentle-15ml.jpg"
      },
      {
        "size": "Premium 60 ml",
        "price": 899,
        "originalPrice": 1199,
        "image": "/images/products/nabhi-kids-gentle-15ml.jpg"
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 4.8,
    "reviewCount": 143,
    "badge": "Bestseller",
    "healthGoals": [
      "Daily Wellness",
      "Nourishment",
      "Balance"
    ],
    "idealFor": [
      "Kids",
      "Daily Use"
    ],
    "usageInstructions": {
      "serving": "2-5 drops",
      "timing": "Before bedtime",
      "instructions": "Apply 2-5 drops on the navel and massage gently in a circular motion. Leave overnight for best results."
    },
    "specifications": {
      "Form": "Oil",
      "Application": "Navel (Nabhi)",
      "Purity": "100% Natural"
    },
    "certifications": [
      "100% Natural",
      "Cruelty-Free",
      "Ayurvedic Formulation"
    ],
    "faqs": [
      {
        "question": "How often should I use this?",
        "answer": "For best results, use daily before bedtime."
      },
      {
        "question": "Is it safe for sensitive skin?",
        "answer": "Yes, our oils are 100% natural and gentle. However, we recommend a patch test first."
      }
    ],
    "relatedProductIds": [
      "feet-wellness-oil"
    ],
    "routineProductIds": [
      "feet-wellness-oil"
    ],
    "goldMembershipEligible": true
  },
  {
    "id": "kids-daily-blend",
    "slug": "kids-daily-blend",
    "name": "Kids Daily Oil Blend",
    "category": "Kids Care",
    "shortDescription": "Premium Kids Care daily wellness support.",
    "fullDescription": "The Kids Daily Oil Blend is meticulously crafted to support your daily wellness routine. Applied to the navel, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts, our navel therapy (Nabhi Chikitsa) blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
    "benefit": "Supports daily vitality, balance, and holistic wellness.",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "Deep Nourishment"
      },
      {
        "icon": "Leaf",
        "text": "100% Pure & Natural"
      },
      {
        "icon": "Shield",
        "text": "Holistic Balance"
      }
    ],
    "ingredients": [
      {
        "name": "Cold-pressed Sesame Oil",
        "botanical": "Sesamum indicum",
        "role": "Nourishing base"
      },
      {
        "name": "Pure Almond Oil",
        "botanical": "Prunus amygdalus",
        "role": "Rich in vitamins"
      },
      {
        "name": "Traditional Ayurvedic Herbs",
        "botanical": "Various",
        "role": "Holistic wellness"
      }
    ],
    "images": [
      "/images/products/nabhi-kids-daily-15ml.jpg"
    ],
    "variants": [
      {
        "size": "Trial 10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": "/images/products/nabhi-kids-daily-10ml.jpg"
      },
      {
        "size": "Gold 15 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/nabhi-kids-daily-15ml.jpg"
      },
      {
        "size": "Premium 60 ml",
        "price": 899,
        "originalPrice": 1199,
        "image": "/images/products/nabhi-kids-daily-15ml.jpg"
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 4.8,
    "reviewCount": 128,
    "badge": "Bestseller",
    "healthGoals": [
      "Daily Wellness",
      "Nourishment",
      "Balance"
    ],
    "idealFor": [
      "Kids",
      "Daily Use"
    ],
    "usageInstructions": {
      "serving": "2-5 drops",
      "timing": "Before bedtime",
      "instructions": "Apply 2-5 drops on the navel and massage gently in a circular motion. Leave overnight for best results."
    },
    "specifications": {
      "Form": "Oil",
      "Application": "Navel (Nabhi)",
      "Purity": "100% Natural"
    },
    "certifications": [
      "100% Natural",
      "Cruelty-Free",
      "Ayurvedic Formulation"
    ],
    "faqs": [
      {
        "question": "How often should I use this?",
        "answer": "For best results, use daily before bedtime."
      },
      {
        "question": "Is it safe for sensitive skin?",
        "answer": "Yes, our oils are 100% natural and gentle. However, we recommend a patch test first."
      }
    ],
    "relatedProductIds": [
      "feet-wellness-oil"
    ],
    "routineProductIds": [
      "feet-wellness-oil"
    ],
    "goldMembershipEligible": true
  },
  {
    "id": "kids-pure-blend",
    "slug": "kids-pure-blend",
    "name": "Kids Pure Oil Blend",
    "category": "Kids Care",
    "shortDescription": "Premium Kids Care daily wellness support.",
    "fullDescription": "The Kids Pure Oil Blend is meticulously crafted to support your daily wellness routine. Applied to the navel, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts, our navel therapy (Nabhi Chikitsa) blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
    "benefit": "Supports daily vitality, balance, and holistic wellness.",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "Deep Nourishment"
      },
      {
        "icon": "Leaf",
        "text": "100% Pure & Natural"
      },
      {
        "icon": "Shield",
        "text": "Holistic Balance"
      }
    ],
    "ingredients": [
      {
        "name": "Cold-pressed Sesame Oil",
        "botanical": "Sesamum indicum",
        "role": "Nourishing base"
      },
      {
        "name": "Pure Almond Oil",
        "botanical": "Prunus amygdalus",
        "role": "Rich in vitamins"
      },
      {
        "name": "Traditional Ayurvedic Herbs",
        "botanical": "Various",
        "role": "Holistic wellness"
      }
    ],
    "images": [
      "/images/products/nabhi-kids-pure-15ml.jpg"
    ],
    "variants": [
      {
        "size": "Trial 10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": "/images/products/nabhi-kids-pure-10ml.jpg"
      },
      {
        "size": "Gold 15 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/nabhi-kids-pure-15ml.jpg"
      },
      {
        "size": "Premium 60 ml",
        "price": 899,
        "originalPrice": 1199,
        "image": "/images/products/nabhi-kids-pure-15ml.jpg"
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 4.8,
    "reviewCount": 244,
    "badge": "Bestseller",
    "healthGoals": [
      "Daily Wellness",
      "Nourishment",
      "Balance"
    ],
    "idealFor": [
      "Kids",
      "Daily Use"
    ],
    "usageInstructions": {
      "serving": "2-5 drops",
      "timing": "Before bedtime",
      "instructions": "Apply 2-5 drops on the navel and massage gently in a circular motion. Leave overnight for best results."
    },
    "specifications": {
      "Form": "Oil",
      "Application": "Navel (Nabhi)",
      "Purity": "100% Natural"
    },
    "certifications": [
      "100% Natural",
      "Cruelty-Free",
      "Ayurvedic Formulation"
    ],
    "faqs": [
      {
        "question": "How often should I use this?",
        "answer": "For best results, use daily before bedtime."
      },
      {
        "question": "Is it safe for sensitive skin?",
        "answer": "Yes, our oils are 100% natural and gentle. However, we recommend a patch test first."
      }
    ],
    "relatedProductIds": [
      "feet-wellness-oil"
    ],
    "routineProductIds": [
      "feet-wellness-oil"
    ],
    "goldMembershipEligible": true
  },
  {
    "id": "men-strength-blend",
    "slug": "men-strength-blend",
    "name": "Men Strength Oil Blend",
    "category": "Men Care",
    "shortDescription": "Premium Men Care daily wellness support.",
    "fullDescription": "The Men Strength Oil Blend is meticulously crafted to support your daily wellness routine. Applied to the navel, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts, our navel therapy (Nabhi Chikitsa) blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
    "benefit": "Supports daily vitality, balance, and holistic wellness.",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "Deep Nourishment"
      },
      {
        "icon": "Leaf",
        "text": "100% Pure & Natural"
      },
      {
        "icon": "Shield",
        "text": "Holistic Balance"
      }
    ],
    "ingredients": [
      {
        "name": "Cold-pressed Sesame Oil",
        "botanical": "Sesamum indicum",
        "role": "Nourishing base"
      },
      {
        "name": "Pure Almond Oil",
        "botanical": "Prunus amygdalus",
        "role": "Rich in vitamins"
      },
      {
        "name": "Traditional Ayurvedic Herbs",
        "botanical": "Various",
        "role": "Holistic wellness"
      }
    ],
    "images": [
      "/images/products/nabhi-men-strength-15ml.jpg"
    ],
    "variants": [
      {
        "size": "Trial 10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": "/images/products/nabhi-men-strength-10ml.jpg"
      },
      {
        "size": "Gold 15 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/nabhi-men-strength-15ml.jpg"
      },
      {
        "size": "Premium 60 ml",
        "price": 899,
        "originalPrice": 1199,
        "image": "/images/products/nabhi-men-strength-15ml.jpg"
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 4.8,
    "reviewCount": 87,
    "badge": "Bestseller",
    "healthGoals": [
      "Daily Wellness",
      "Nourishment",
      "Balance"
    ],
    "idealFor": [
      "Men",
      "Daily Use"
    ],
    "usageInstructions": {
      "serving": "2-5 drops",
      "timing": "Before bedtime",
      "instructions": "Apply 2-5 drops on the navel and massage gently in a circular motion. Leave overnight for best results."
    },
    "specifications": {
      "Form": "Oil",
      "Application": "Navel (Nabhi)",
      "Purity": "100% Natural"
    },
    "certifications": [
      "100% Natural",
      "Cruelty-Free",
      "Ayurvedic Formulation"
    ],
    "faqs": [
      {
        "question": "How often should I use this?",
        "answer": "For best results, use daily before bedtime."
      },
      {
        "question": "Is it safe for sensitive skin?",
        "answer": "Yes, our oils are 100% natural and gentle. However, we recommend a patch test first."
      }
    ],
    "relatedProductIds": [
      "feet-wellness-oil"
    ],
    "routineProductIds": [
      "feet-wellness-oil"
    ],
    "goldMembershipEligible": true
  },
  {
    "id": "men-vital-blend",
    "slug": "men-vital-blend",
    "name": "Men Vital Oil Blend",
    "category": "Men Care",
    "shortDescription": "Premium Men Care daily wellness support.",
    "fullDescription": "The Men Vital Oil Blend is meticulously crafted to support your daily wellness routine. Applied to the navel, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts, our navel therapy (Nabhi Chikitsa) blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
    "benefit": "Supports daily vitality, balance, and holistic wellness.",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "Deep Nourishment"
      },
      {
        "icon": "Leaf",
        "text": "100% Pure & Natural"
      },
      {
        "icon": "Shield",
        "text": "Holistic Balance"
      }
    ],
    "ingredients": [
      {
        "name": "Cold-pressed Sesame Oil",
        "botanical": "Sesamum indicum",
        "role": "Nourishing base"
      },
      {
        "name": "Pure Almond Oil",
        "botanical": "Prunus amygdalus",
        "role": "Rich in vitamins"
      },
      {
        "name": "Traditional Ayurvedic Herbs",
        "botanical": "Various",
        "role": "Holistic wellness"
      }
    ],
    "images": [
      "/images/products/nabhi-men-vital-15ml.jpg"
    ],
    "variants": [
      {
        "size": "Trial 10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": "/images/products/nabhi-men-vital-10ml.jpg"
      },
      {
        "size": "Gold 15 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/nabhi-men-vital-15ml.jpg"
      },
      {
        "size": "Premium 60 ml",
        "price": 899,
        "originalPrice": 1199,
        "image": "/images/products/nabhi-men-vital-15ml.jpg"
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 4.8,
    "reviewCount": 172,
    "badge": "Bestseller",
    "healthGoals": [
      "Daily Wellness",
      "Nourishment",
      "Balance"
    ],
    "idealFor": [
      "Men",
      "Daily Use"
    ],
    "usageInstructions": {
      "serving": "2-5 drops",
      "timing": "Before bedtime",
      "instructions": "Apply 2-5 drops on the navel and massage gently in a circular motion. Leave overnight for best results."
    },
    "specifications": {
      "Form": "Oil",
      "Application": "Navel (Nabhi)",
      "Purity": "100% Natural"
    },
    "certifications": [
      "100% Natural",
      "Cruelty-Free",
      "Ayurvedic Formulation"
    ],
    "faqs": [
      {
        "question": "How often should I use this?",
        "answer": "For best results, use daily before bedtime."
      },
      {
        "question": "Is it safe for sensitive skin?",
        "answer": "Yes, our oils are 100% natural and gentle. However, we recommend a patch test first."
      }
    ],
    "relatedProductIds": [
      "feet-wellness-oil"
    ],
    "routineProductIds": [
      "feet-wellness-oil"
    ],
    "goldMembershipEligible": true
  },
  {
    "id": "men-balance-blend",
    "slug": "men-balance-blend",
    "name": "Men Balance Oil Blend",
    "category": "Men Care",
    "shortDescription": "Premium Men Care daily wellness support.",
    "fullDescription": "The Men Balance Oil Blend is meticulously crafted to support your daily wellness routine. Applied to the navel, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts, our navel therapy (Nabhi Chikitsa) blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
    "benefit": "Supports daily vitality, balance, and holistic wellness.",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "Deep Nourishment"
      },
      {
        "icon": "Leaf",
        "text": "100% Pure & Natural"
      },
      {
        "icon": "Shield",
        "text": "Holistic Balance"
      }
    ],
    "ingredients": [
      {
        "name": "Cold-pressed Sesame Oil",
        "botanical": "Sesamum indicum",
        "role": "Nourishing base"
      },
      {
        "name": "Pure Almond Oil",
        "botanical": "Prunus amygdalus",
        "role": "Rich in vitamins"
      },
      {
        "name": "Traditional Ayurvedic Herbs",
        "botanical": "Various",
        "role": "Holistic wellness"
      }
    ],
    "images": [
      "/images/products/nabhi-men-balance-15ml.jpg"
    ],
    "variants": [
      {
        "size": "Trial 10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": "/images/products/nabhi-men-balance-10ml.jpg"
      },
      {
        "size": "Gold 15 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/nabhi-men-balance-15ml.jpg"
      },
      {
        "size": "Premium 60 ml",
        "price": 899,
        "originalPrice": 1199,
        "image": "/images/products/nabhi-men-balance-15ml.jpg"
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 4.8,
    "reviewCount": 244,
    "badge": "Bestseller",
    "healthGoals": [
      "Daily Wellness",
      "Nourishment",
      "Balance"
    ],
    "idealFor": [
      "Men",
      "Daily Use"
    ],
    "usageInstructions": {
      "serving": "2-5 drops",
      "timing": "Before bedtime",
      "instructions": "Apply 2-5 drops on the navel and massage gently in a circular motion. Leave overnight for best results."
    },
    "specifications": {
      "Form": "Oil",
      "Application": "Navel (Nabhi)",
      "Purity": "100% Natural"
    },
    "certifications": [
      "100% Natural",
      "Cruelty-Free",
      "Ayurvedic Formulation"
    ],
    "faqs": [
      {
        "question": "How often should I use this?",
        "answer": "For best results, use daily before bedtime."
      },
      {
        "question": "Is it safe for sensitive skin?",
        "answer": "Yes, our oils are 100% natural and gentle. However, we recommend a patch test first."
      }
    ],
    "relatedProductIds": [
      "feet-wellness-oil"
    ],
    "routineProductIds": [
      "feet-wellness-oil"
    ],
    "goldMembershipEligible": true
  },
  {
    "id": "men-pure-blend",
    "slug": "men-pure-blend",
    "name": "Men Pure Oil Blend",
    "category": "Men Care",
    "shortDescription": "Premium Men Care daily wellness support.",
    "fullDescription": "The Men Pure Oil Blend is meticulously crafted to support your daily wellness routine. Applied to the navel, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts, our navel therapy (Nabhi Chikitsa) blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
    "benefit": "Supports daily vitality, balance, and holistic wellness.",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "Deep Nourishment"
      },
      {
        "icon": "Leaf",
        "text": "100% Pure & Natural"
      },
      {
        "icon": "Shield",
        "text": "Holistic Balance"
      }
    ],
    "ingredients": [
      {
        "name": "Cold-pressed Sesame Oil",
        "botanical": "Sesamum indicum",
        "role": "Nourishing base"
      },
      {
        "name": "Pure Almond Oil",
        "botanical": "Prunus amygdalus",
        "role": "Rich in vitamins"
      },
      {
        "name": "Traditional Ayurvedic Herbs",
        "botanical": "Various",
        "role": "Holistic wellness"
      }
    ],
    "images": [
      "/images/products/nabhi-men-pure-15ml.jpg"
    ],
    "variants": [
      {
        "size": "Trial 10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": "/images/products/nabhi-men-pure-10ml.jpg"
      },
      {
        "size": "Gold 15 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/nabhi-men-pure-15ml.jpg"
      },
      {
        "size": "Premium 60 ml",
        "price": 899,
        "originalPrice": 1199,
        "image": "/images/products/nabhi-men-pure-15ml.jpg"
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 4.8,
    "reviewCount": 138,
    "badge": "Bestseller",
    "healthGoals": [
      "Daily Wellness",
      "Nourishment",
      "Balance"
    ],
    "idealFor": [
      "Men",
      "Daily Use"
    ],
    "usageInstructions": {
      "serving": "2-5 drops",
      "timing": "Before bedtime",
      "instructions": "Apply 2-5 drops on the navel and massage gently in a circular motion. Leave overnight for best results."
    },
    "specifications": {
      "Form": "Oil",
      "Application": "Navel (Nabhi)",
      "Purity": "100% Natural"
    },
    "certifications": [
      "100% Natural",
      "Cruelty-Free",
      "Ayurvedic Formulation"
    ],
    "faqs": [
      {
        "question": "How often should I use this?",
        "answer": "For best results, use daily before bedtime."
      },
      {
        "question": "Is it safe for sensitive skin?",
        "answer": "Yes, our oils are 100% natural and gentle. However, we recommend a patch test first."
      }
    ],
    "relatedProductIds": [
      "feet-wellness-oil"
    ],
    "routineProductIds": [
      "feet-wellness-oil"
    ],
    "goldMembershipEligible": true
  },
  {
    "id": "women-harmony-blend",
    "slug": "women-harmony-blend",
    "name": "Women Harmony Oil Blend",
    "category": "Women Wellness",
    "shortDescription": "Premium Women Wellness daily wellness support.",
    "fullDescription": "The Women Harmony Oil Blend is meticulously crafted to support your daily wellness routine. Applied to the navel, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts, our navel therapy (Nabhi Chikitsa) blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
    "benefit": "Supports daily vitality, balance, and holistic wellness.",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "Deep Nourishment"
      },
      {
        "icon": "Leaf",
        "text": "100% Pure & Natural"
      },
      {
        "icon": "Shield",
        "text": "Holistic Balance"
      }
    ],
    "ingredients": [
      {
        "name": "Cold-pressed Sesame Oil",
        "botanical": "Sesamum indicum",
        "role": "Nourishing base"
      },
      {
        "name": "Pure Almond Oil",
        "botanical": "Prunus amygdalus",
        "role": "Rich in vitamins"
      },
      {
        "name": "Traditional Ayurvedic Herbs",
        "botanical": "Various",
        "role": "Holistic wellness"
      }
    ],
    "images": [
      "/images/products/nabhi-women-harmony-15ml.jpg"
    ],
    "variants": [
      {
        "size": "Trial 10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": "/images/products/nabhi-women-harmony-10ml.jpg"
      },
      {
        "size": "Gold 15 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/nabhi-women-harmony-15ml.jpg"
      },
      {
        "size": "Premium 60 ml",
        "price": 899,
        "originalPrice": 1199,
        "image": "/images/products/nabhi-women-harmony-15ml.jpg"
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 4.8,
    "reviewCount": 86,
    "badge": "Bestseller",
    "healthGoals": [
      "Daily Wellness",
      "Nourishment",
      "Balance"
    ],
    "idealFor": [
      "Women",
      "Daily Use"
    ],
    "usageInstructions": {
      "serving": "2-5 drops",
      "timing": "Before bedtime",
      "instructions": "Apply 2-5 drops on the navel and massage gently in a circular motion. Leave overnight for best results."
    },
    "specifications": {
      "Form": "Oil",
      "Application": "Navel (Nabhi)",
      "Purity": "100% Natural"
    },
    "certifications": [
      "100% Natural",
      "Cruelty-Free",
      "Ayurvedic Formulation"
    ],
    "faqs": [
      {
        "question": "How often should I use this?",
        "answer": "For best results, use daily before bedtime."
      },
      {
        "question": "Is it safe for sensitive skin?",
        "answer": "Yes, our oils are 100% natural and gentle. However, we recommend a patch test first."
      }
    ],
    "relatedProductIds": [
      "feet-wellness-oil"
    ],
    "routineProductIds": [
      "feet-wellness-oil"
    ],
    "goldMembershipEligible": true
  },
  {
    "id": "women-care-blend",
    "slug": "women-care-blend",
    "name": "Women Care Oil Blend",
    "category": "Women Wellness",
    "shortDescription": "Premium Women Wellness daily wellness support.",
    "fullDescription": "The Women Care Oil Blend is meticulously crafted to support your daily wellness routine. Applied to the navel, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts, our navel therapy (Nabhi Chikitsa) blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
    "benefit": "Supports daily vitality, balance, and holistic wellness.",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "Deep Nourishment"
      },
      {
        "icon": "Leaf",
        "text": "100% Pure & Natural"
      },
      {
        "icon": "Shield",
        "text": "Holistic Balance"
      }
    ],
    "ingredients": [
      {
        "name": "Cold-pressed Sesame Oil",
        "botanical": "Sesamum indicum",
        "role": "Nourishing base"
      },
      {
        "name": "Pure Almond Oil",
        "botanical": "Prunus amygdalus",
        "role": "Rich in vitamins"
      },
      {
        "name": "Traditional Ayurvedic Herbs",
        "botanical": "Various",
        "role": "Holistic wellness"
      }
    ],
    "images": [
      "/images/products/nabhi-women-care-15ml.jpg"
    ],
    "variants": [
      {
        "size": "Trial 10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": "/images/products/nabhi-women-care-10ml.jpg"
      },
      {
        "size": "Gold 15 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/nabhi-women-care-15ml.jpg"
      },
      {
        "size": "Premium 60 ml",
        "price": 899,
        "originalPrice": 1199,
        "image": "/images/products/nabhi-women-care-15ml.jpg"
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 4.8,
    "reviewCount": 64,
    "badge": "Bestseller",
    "healthGoals": [
      "Daily Wellness",
      "Nourishment",
      "Balance"
    ],
    "idealFor": [
      "Women",
      "Daily Use"
    ],
    "usageInstructions": {
      "serving": "2-5 drops",
      "timing": "Before bedtime",
      "instructions": "Apply 2-5 drops on the navel and massage gently in a circular motion. Leave overnight for best results."
    },
    "specifications": {
      "Form": "Oil",
      "Application": "Navel (Nabhi)",
      "Purity": "100% Natural"
    },
    "certifications": [
      "100% Natural",
      "Cruelty-Free",
      "Ayurvedic Formulation"
    ],
    "faqs": [
      {
        "question": "How often should I use this?",
        "answer": "For best results, use daily before bedtime."
      },
      {
        "question": "Is it safe for sensitive skin?",
        "answer": "Yes, our oils are 100% natural and gentle. However, we recommend a patch test first."
      }
    ],
    "relatedProductIds": [
      "feet-wellness-oil"
    ],
    "routineProductIds": [
      "feet-wellness-oil"
    ],
    "goldMembershipEligible": true
  },
  {
    "id": "women-glow-blend",
    "slug": "women-glow-blend",
    "name": "Women Glow Oil Blend",
    "category": "Women Wellness",
    "shortDescription": "Premium Women Wellness daily wellness support.",
    "fullDescription": "The Women Glow Oil Blend is meticulously crafted to support your daily wellness routine. Applied to the navel, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts, our navel therapy (Nabhi Chikitsa) blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
    "benefit": "Supports daily vitality, balance, and holistic wellness.",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "Deep Nourishment"
      },
      {
        "icon": "Leaf",
        "text": "100% Pure & Natural"
      },
      {
        "icon": "Shield",
        "text": "Holistic Balance"
      }
    ],
    "ingredients": [
      {
        "name": "Cold-pressed Sesame Oil",
        "botanical": "Sesamum indicum",
        "role": "Nourishing base"
      },
      {
        "name": "Pure Almond Oil",
        "botanical": "Prunus amygdalus",
        "role": "Rich in vitamins"
      },
      {
        "name": "Traditional Ayurvedic Herbs",
        "botanical": "Various",
        "role": "Holistic wellness"
      }
    ],
    "images": [
      "/images/products/nabhi-women-glow-15ml.jpg"
    ],
    "variants": [
      {
        "size": "Trial 10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": "/images/products/nabhi-women-glow-10ml.jpg"
      },
      {
        "size": "Gold 15 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/nabhi-women-glow-15ml.jpg"
      },
      {
        "size": "Premium 60 ml",
        "price": 899,
        "originalPrice": 1199,
        "image": "/images/products/nabhi-women-glow-15ml.jpg"
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 4.8,
    "reviewCount": 178,
    "badge": "Bestseller",
    "healthGoals": [
      "Daily Wellness",
      "Nourishment",
      "Balance"
    ],
    "idealFor": [
      "Women",
      "Daily Use"
    ],
    "usageInstructions": {
      "serving": "2-5 drops",
      "timing": "Before bedtime",
      "instructions": "Apply 2-5 drops on the navel and massage gently in a circular motion. Leave overnight for best results."
    },
    "specifications": {
      "Form": "Oil",
      "Application": "Navel (Nabhi)",
      "Purity": "100% Natural"
    },
    "certifications": [
      "100% Natural",
      "Cruelty-Free",
      "Ayurvedic Formulation"
    ],
    "faqs": [
      {
        "question": "How often should I use this?",
        "answer": "For best results, use daily before bedtime."
      },
      {
        "question": "Is it safe for sensitive skin?",
        "answer": "Yes, our oils are 100% natural and gentle. However, we recommend a patch test first."
      }
    ],
    "relatedProductIds": [
      "feet-wellness-oil"
    ],
    "routineProductIds": [
      "feet-wellness-oil"
    ],
    "goldMembershipEligible": true
  },
  {
    "id": "women-pure-blend",
    "slug": "women-pure-blend",
    "name": "Women Pure Oil Blend",
    "category": "Women Wellness",
    "shortDescription": "Premium Women Wellness daily wellness support.",
    "fullDescription": "The Women Pure Oil Blend is meticulously crafted to support your daily wellness routine. Applied to the navel, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts, our navel therapy (Nabhi Chikitsa) blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
    "benefit": "Supports daily vitality, balance, and holistic wellness.",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "Deep Nourishment"
      },
      {
        "icon": "Leaf",
        "text": "100% Pure & Natural"
      },
      {
        "icon": "Shield",
        "text": "Holistic Balance"
      }
    ],
    "ingredients": [
      {
        "name": "Cold-pressed Sesame Oil",
        "botanical": "Sesamum indicum",
        "role": "Nourishing base"
      },
      {
        "name": "Pure Almond Oil",
        "botanical": "Prunus amygdalus",
        "role": "Rich in vitamins"
      },
      {
        "name": "Traditional Ayurvedic Herbs",
        "botanical": "Various",
        "role": "Holistic wellness"
      }
    ],
    "images": [
      "/images/products/nabhi-women-pure-15ml.jpg"
    ],
    "variants": [
      {
        "size": "Trial 10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": "/images/products/nabhi-women-pure-10ml.jpg"
      },
      {
        "size": "Gold 15 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/nabhi-women-pure-15ml.jpg"
      },
      {
        "size": "Premium 60 ml",
        "price": 899,
        "originalPrice": 1199,
        "image": "/images/products/nabhi-women-pure-15ml.jpg"
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 4.8,
    "reviewCount": 58,
    "badge": "Bestseller",
    "healthGoals": [
      "Daily Wellness",
      "Nourishment",
      "Balance"
    ],
    "idealFor": [
      "Women",
      "Daily Use"
    ],
    "usageInstructions": {
      "serving": "2-5 drops",
      "timing": "Before bedtime",
      "instructions": "Apply 2-5 drops on the navel and massage gently in a circular motion. Leave overnight for best results."
    },
    "specifications": {
      "Form": "Oil",
      "Application": "Navel (Nabhi)",
      "Purity": "100% Natural"
    },
    "certifications": [
      "100% Natural",
      "Cruelty-Free",
      "Ayurvedic Formulation"
    ],
    "faqs": [
      {
        "question": "How often should I use this?",
        "answer": "For best results, use daily before bedtime."
      },
      {
        "question": "Is it safe for sensitive skin?",
        "answer": "Yes, our oils are 100% natural and gentle. However, we recommend a patch test first."
      }
    ],
    "relatedProductIds": [
      "feet-wellness-oil"
    ],
    "routineProductIds": [
      "feet-wellness-oil"
    ],
    "goldMembershipEligible": true
  },
  {
    "id": "senior-comfort-blend",
    "slug": "senior-comfort-blend",
    "name": "Senior Comfort Oil Blend",
    "category": "Senior Care",
    "shortDescription": "Premium Senior Care daily wellness support.",
    "fullDescription": "The Senior Comfort Oil Blend is meticulously crafted to support your daily wellness routine. Applied to the navel, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts, our navel therapy (Nabhi Chikitsa) blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
    "benefit": "Supports daily vitality, balance, and holistic wellness.",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "Deep Nourishment"
      },
      {
        "icon": "Leaf",
        "text": "100% Pure & Natural"
      },
      {
        "icon": "Shield",
        "text": "Holistic Balance"
      }
    ],
    "ingredients": [
      {
        "name": "Cold-pressed Sesame Oil",
        "botanical": "Sesamum indicum",
        "role": "Nourishing base"
      },
      {
        "name": "Pure Almond Oil",
        "botanical": "Prunus amygdalus",
        "role": "Rich in vitamins"
      },
      {
        "name": "Traditional Ayurvedic Herbs",
        "botanical": "Various",
        "role": "Holistic wellness"
      }
    ],
    "images": [
      "/images/products/nabhi-senior-comfort-15ml.jpg"
    ],
    "variants": [
      {
        "size": "Trial 10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": "/images/products/nabhi-senior-comfort-10ml.jpg"
      },
      {
        "size": "Gold 15 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/nabhi-senior-comfort-15ml.jpg"
      },
      {
        "size": "Premium 60 ml",
        "price": 899,
        "originalPrice": 1199,
        "image": "/images/products/nabhi-senior-comfort-15ml.jpg"
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 4.8,
    "reviewCount": 117,
    "badge": "Bestseller",
    "healthGoals": [
      "Daily Wellness",
      "Nourishment",
      "Balance"
    ],
    "idealFor": [
      "Senior",
      "Daily Use"
    ],
    "usageInstructions": {
      "serving": "2-5 drops",
      "timing": "Before bedtime",
      "instructions": "Apply 2-5 drops on the navel and massage gently in a circular motion. Leave overnight for best results."
    },
    "specifications": {
      "Form": "Oil",
      "Application": "Navel (Nabhi)",
      "Purity": "100% Natural"
    },
    "certifications": [
      "100% Natural",
      "Cruelty-Free",
      "Ayurvedic Formulation"
    ],
    "faqs": [
      {
        "question": "How often should I use this?",
        "answer": "For best results, use daily before bedtime."
      },
      {
        "question": "Is it safe for sensitive skin?",
        "answer": "Yes, our oils are 100% natural and gentle. However, we recommend a patch test first."
      }
    ],
    "relatedProductIds": [
      "feet-wellness-oil"
    ],
    "routineProductIds": [
      "feet-wellness-oil"
    ],
    "goldMembershipEligible": true
  },
  {
    "id": "senior-vital-blend",
    "slug": "senior-vital-blend",
    "name": "Senior Vital Oil Blend",
    "category": "Senior Care",
    "shortDescription": "Premium Senior Care daily wellness support.",
    "fullDescription": "The Senior Vital Oil Blend is meticulously crafted to support your daily wellness routine. Applied to the navel, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts, our navel therapy (Nabhi Chikitsa) blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
    "benefit": "Supports daily vitality, balance, and holistic wellness.",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "Deep Nourishment"
      },
      {
        "icon": "Leaf",
        "text": "100% Pure & Natural"
      },
      {
        "icon": "Shield",
        "text": "Holistic Balance"
      }
    ],
    "ingredients": [
      {
        "name": "Cold-pressed Sesame Oil",
        "botanical": "Sesamum indicum",
        "role": "Nourishing base"
      },
      {
        "name": "Pure Almond Oil",
        "botanical": "Prunus amygdalus",
        "role": "Rich in vitamins"
      },
      {
        "name": "Traditional Ayurvedic Herbs",
        "botanical": "Various",
        "role": "Holistic wellness"
      }
    ],
    "images": [
      "/images/products/nabhi-senior-vital-15ml.jpg"
    ],
    "variants": [
      {
        "size": "Trial 10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": "/images/products/nabhi-senior-vital-10ml.jpg"
      },
      {
        "size": "Gold 15 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/nabhi-senior-vital-15ml.jpg"
      },
      {
        "size": "Premium 60 ml",
        "price": 899,
        "originalPrice": 1199,
        "image": "/images/products/nabhi-senior-vital-15ml.jpg"
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 4.8,
    "reviewCount": 117,
    "badge": "Bestseller",
    "healthGoals": [
      "Daily Wellness",
      "Nourishment",
      "Balance"
    ],
    "idealFor": [
      "Senior",
      "Daily Use"
    ],
    "usageInstructions": {
      "serving": "2-5 drops",
      "timing": "Before bedtime",
      "instructions": "Apply 2-5 drops on the navel and massage gently in a circular motion. Leave overnight for best results."
    },
    "specifications": {
      "Form": "Oil",
      "Application": "Navel (Nabhi)",
      "Purity": "100% Natural"
    },
    "certifications": [
      "100% Natural",
      "Cruelty-Free",
      "Ayurvedic Formulation"
    ],
    "faqs": [
      {
        "question": "How often should I use this?",
        "answer": "For best results, use daily before bedtime."
      },
      {
        "question": "Is it safe for sensitive skin?",
        "answer": "Yes, our oils are 100% natural and gentle. However, we recommend a patch test first."
      }
    ],
    "relatedProductIds": [
      "feet-wellness-oil"
    ],
    "routineProductIds": [
      "feet-wellness-oil"
    ],
    "goldMembershipEligible": true
  },
  {
    "id": "senior-balance-blend",
    "slug": "senior-balance-blend",
    "name": "Senior Balance Oil Blend",
    "category": "Senior Care",
    "shortDescription": "Premium Senior Care daily wellness support.",
    "fullDescription": "The Senior Balance Oil Blend is meticulously crafted to support your daily wellness routine. Applied to the navel, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts, our navel therapy (Nabhi Chikitsa) blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
    "benefit": "Supports daily vitality, balance, and holistic wellness.",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "Deep Nourishment"
      },
      {
        "icon": "Leaf",
        "text": "100% Pure & Natural"
      },
      {
        "icon": "Shield",
        "text": "Holistic Balance"
      }
    ],
    "ingredients": [
      {
        "name": "Cold-pressed Sesame Oil",
        "botanical": "Sesamum indicum",
        "role": "Nourishing base"
      },
      {
        "name": "Pure Almond Oil",
        "botanical": "Prunus amygdalus",
        "role": "Rich in vitamins"
      },
      {
        "name": "Traditional Ayurvedic Herbs",
        "botanical": "Various",
        "role": "Holistic wellness"
      }
    ],
    "images": [
      "/images/products/nabhi-senior-balance-15ml.jpg"
    ],
    "variants": [
      {
        "size": "Trial 10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": "/images/products/nabhi-senior-balance-10ml.jpg"
      },
      {
        "size": "Gold 15 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/nabhi-senior-balance-15ml.jpg"
      },
      {
        "size": "Premium 60 ml",
        "price": 899,
        "originalPrice": 1199,
        "image": "/images/products/nabhi-senior-balance-15ml.jpg"
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 4.8,
    "reviewCount": 107,
    "badge": "Bestseller",
    "healthGoals": [
      "Daily Wellness",
      "Nourishment",
      "Balance"
    ],
    "idealFor": [
      "Senior",
      "Daily Use"
    ],
    "usageInstructions": {
      "serving": "2-5 drops",
      "timing": "Before bedtime",
      "instructions": "Apply 2-5 drops on the navel and massage gently in a circular motion. Leave overnight for best results."
    },
    "specifications": {
      "Form": "Oil",
      "Application": "Navel (Nabhi)",
      "Purity": "100% Natural"
    },
    "certifications": [
      "100% Natural",
      "Cruelty-Free",
      "Ayurvedic Formulation"
    ],
    "faqs": [
      {
        "question": "How often should I use this?",
        "answer": "For best results, use daily before bedtime."
      },
      {
        "question": "Is it safe for sensitive skin?",
        "answer": "Yes, our oils are 100% natural and gentle. However, we recommend a patch test first."
      }
    ],
    "relatedProductIds": [
      "feet-wellness-oil"
    ],
    "routineProductIds": [
      "feet-wellness-oil"
    ],
    "goldMembershipEligible": true
  },
  {
    "id": "senior-pure-blend",
    "slug": "senior-pure-blend",
    "name": "Senior Pure Oil Blend",
    "category": "Senior Care",
    "shortDescription": "Premium Senior Care daily wellness support.",
    "fullDescription": "The Senior Pure Oil Blend is meticulously crafted to support your daily wellness routine. Applied to the navel, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts, our navel therapy (Nabhi Chikitsa) blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
    "benefit": "Supports daily vitality, balance, and holistic wellness.",
    "benefits": [
      {
        "icon": "Sparkles",
        "text": "Deep Nourishment"
      },
      {
        "icon": "Leaf",
        "text": "100% Pure & Natural"
      },
      {
        "icon": "Shield",
        "text": "Holistic Balance"
      }
    ],
    "ingredients": [
      {
        "name": "Cold-pressed Sesame Oil",
        "botanical": "Sesamum indicum",
        "role": "Nourishing base"
      },
      {
        "name": "Pure Almond Oil",
        "botanical": "Prunus amygdalus",
        "role": "Rich in vitamins"
      },
      {
        "name": "Traditional Ayurvedic Herbs",
        "botanical": "Various",
        "role": "Holistic wellness"
      }
    ],
    "images": [
      "/images/products/nabhi-senior-pure-15ml.jpg"
    ],
    "variants": [
      {
        "size": "Trial 10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": "/images/products/nabhi-senior-pure-10ml.jpg"
      },
      {
        "size": "Gold 15 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/nabhi-senior-pure-15ml.jpg"
      },
      {
        "size": "Premium 60 ml",
        "price": 899,
        "originalPrice": 1199,
        "image": "/images/products/nabhi-senior-pure-15ml.jpg"
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 4.8,
    "reviewCount": 230,
    "badge": "Bestseller",
    "healthGoals": [
      "Daily Wellness",
      "Nourishment",
      "Balance"
    ],
    "idealFor": [
      "Senior",
      "Daily Use"
    ],
    "usageInstructions": {
      "serving": "2-5 drops",
      "timing": "Before bedtime",
      "instructions": "Apply 2-5 drops on the navel and massage gently in a circular motion. Leave overnight for best results."
    },
    "specifications": {
      "Form": "Oil",
      "Application": "Navel (Nabhi)",
      "Purity": "100% Natural"
    },
    "certifications": [
      "100% Natural",
      "Cruelty-Free",
      "Ayurvedic Formulation"
    ],
    "faqs": [
      {
        "question": "How often should I use this?",
        "answer": "For best results, use daily before bedtime."
      },
      {
        "question": "Is it safe for sensitive skin?",
        "answer": "Yes, our oils are 100% natural and gentle. However, we recommend a patch test first."
      }
    ],
    "relatedProductIds": [
      "feet-wellness-oil"
    ],
    "routineProductIds": [
      "feet-wellness-oil"
    ],
    "goldMembershipEligible": true
  },
  {
    "id": "feet-wellness-oil",
    "slug": "feet-wellness-oil",
    "name": "Feet Wellness Oil",
    "category": "Feet Care",
    "shortDescription": "Deep relaxation and foot nourishment.",
    "fullDescription": "Our Feet Wellness Oil is formulated to provide deep relaxation and nourishment for tired feet. A daily foot massage (Padabhyanga) is a cornerstone of Ayurvedic self-care, promoting better sleep and holistic balance.",
    "story": "Padabhyanga has been practiced for thousands of years to center the mind and soothe the body. We source the finest grounding herbs and cooling oils for this premium blend.",
    "benefit": "Deeply relaxes, softens feet, and supports restful sleep.",
    "benefits": [
      {
        "icon": "Moon",
        "text": "Promotes Restful Sleep"
      },
      {
        "icon": "Heart",
        "text": "Soothes Tired Feet"
      },
      {
        "icon": "Droplets",
        "text": "Intense Hydration"
      }
    ],
    "ingredients": [
      {
        "name": "Cold-pressed Sesame Oil",
        "botanical": "Sesamum indicum",
        "role": "Deep penetration"
      },
      {
        "name": "Lavender Essential Oil",
        "botanical": "Lavandula",
        "role": "Relaxation"
      },
      {
        "name": "Brahmi",
        "botanical": "Bacopa monnieri",
        "role": "Calming"
      }
    ],
    "images": [
      "/images/products/feet-women-150ml.jpg"
    ],
    "variants": [
      {
        "size": "Trial 20 ml",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/feet-women-30ml.jpg"
      },
      {
        "size": "Gold 50 ml",
        "price": 699,
        "originalPrice": 999,
        "image": "/images/products/feet-women-150ml.jpg"
      },
      {
        "size": "Premium 200 ml",
        "price": 1999,
        "originalPrice": 2999,
        "image": "/images/products/feet-women-150ml.jpg"
      }
    ],
    "price": 349,
    "originalPrice": 499,
    "discount": 30,
    "rating": 4.9,
    "reviewCount": 342,
    "badge": "Essential",
    "healthGoals": [
      "Relaxation",
      "Better Sleep",
      "Foot Care"
    ],
    "idealFor": [
      "Everyone",
      "Daily Routine"
    ],
    "usageInstructions": {
      "serving": "Few drops per foot",
      "timing": "Before bedtime",
      "instructions": "Massage onto both feet for 3-5 minutes, focusing on the soles and pressure points."
    },
    "specifications": {
      "Form": "Oil",
      "Application": "Feet"
    },
    "certifications": [
      "100% Natural",
      "Ayurvedic"
    ],
    "faqs": [
      {
        "question": "Can I use this during the day?",
        "answer": "While you can use it anytime, it is highly recommended before bedtime for maximum relaxation."
      }
    ],
    "relatedProductIds": [
      "kids-smart-blend",
      "women-harmony-blend",
      "men-strength-blend"
    ],
    "routineProductIds": [],
    "goldMembershipEligible": true
  },
  {
    "id": "hair-wellness-oil",
    "slug": "hair-wellness-oil",
    "name": "Hair Wellness Oil",
    "category": "Hair Care",
    "shortDescription": "Premium nourishment for strong, healthy-looking hair.",
    "fullDescription": "Experience the ultimate scalp and hair care with our Hair Wellness Oil. A luxurious blend of premium base oils and traditional Ayurvedic herbs designed to deeply condition and soften your hair.",
    "story": "Crafted from ancient recipes, this blend combines Bhringraj and Amla with rich base oils to provide unparalleled nourishment for your crown.",
    "benefit": "Nourishes scalp, conditions hair, and enhances natural shine.",
    "benefits": [
      {
        "icon": "Star",
        "text": "Enhanced Shine"
      },
      {
        "icon": "Shield",
        "text": "Deep Conditioning"
      },
      {
        "icon": "Leaf",
        "text": "Scalp Nourishment"
      }
    ],
    "ingredients": [
      {
        "name": "Bhringraj",
        "botanical": "Eclipta prostrata",
        "role": "Hair vitality"
      },
      {
        "name": "Amla",
        "botanical": "Phyllanthus emblica",
        "role": "Rich in Vitamin C"
      },
      {
        "name": "Coconut Oil",
        "botanical": "Cocos nucifera",
        "role": "Moisture"
      }
    ],
    "images": [
      "/images/products/feet-women-150ml.jpg"
    ],
    "variants": [
      {
        "size": "50 ml",
        "price": 499,
        "originalPrice": 799,
        "image": "/images/products/feet-women-30ml.jpg"
      },
      {
        "size": "100 ml",
        "price": 899,
        "originalPrice": 1399,
        "image": "/images/products/feet-women-150ml.jpg"
      },
      {
        "size": "200 ml",
        "price": 1599,
        "originalPrice": 2499,
        "image": "/images/products/feet-women-150ml.jpg"
      }
    ],
    "price": 499,
    "originalPrice": 799,
    "discount": 37,
    "rating": 4.8,
    "reviewCount": 215,
    "badge": "New",
    "healthGoals": [
      "Hair Health",
      "Scalp Care"
    ],
    "idealFor": [
      "All Hair Types"
    ],
    "usageInstructions": {
      "serving": "As needed based on hair length",
      "timing": "1-2 times a week",
      "instructions": "Massage gently into the scalp and hair length. Leave on for at least an hour or overnight before washing."
    },
    "specifications": {
      "Form": "Oil",
      "Application": "Hair & Scalp"
    },
    "certifications": [
      "100% Natural",
      "Ayurvedic"
    ],
    "faqs": [
      {
        "question": "Is this sticky?",
        "answer": "It is a rich, traditional oil blend. We recommend using a gentle cleanser to wash it out."
      }
    ],
    "relatedProductIds": [
      "feet-wellness-oil"
    ],
    "routineProductIds": [],
    "goldMembershipEligible": true
  },
  {
    "id": "trial-starter-pack",
    "slug": "trial-starter-pack",
    "name": "Trial Starter Pack",
    "category": "Wellness Packs",
    "shortDescription": "The perfect introduction to your daily wellness routine.",
    "fullDescription": "The Trial Starter Pack provides an exceptional array of premium Ayurvedic oils curated for your lifestyle. Incorporating these into your daily routine supports holistic well-being.",
    "story": "Curated by our expert Ayurvedic practitioners, this pack offers the perfect synergy of traditional formulations.",
    "benefit": "Comprehensive wellness and self-care made easy.",
    "benefits": [
      {
        "icon": "Gift",
        "text": "Curated Selection"
      },
      {
        "icon": "Heart",
        "text": "Holistic Health"
      }
    ],
    "ingredients": [
      {
        "name": "Multiple Pure Oils",
        "botanical": "Various",
        "role": "Complete Wellness"
      }
    ],
    "images": [
      "/images/products/combo-individual-trial.jpg"
    ],
    "variants": [
      {
        "size": "Pack of 2",
        "price": 349,
        "originalPrice": 499,
        "image": "/images/products/combo-individual-trial.jpg"
      }
    ],
    "price": 349,
    "originalPrice": 499,
    "discount": 30,
    "rating": 5,
    "reviewCount": 109,
    "badge": "Combo",
    "healthGoals": [
      "Daily Routine",
      "Holistic Wellness"
    ],
    "idealFor": [
      "Everyone"
    ],
    "usageInstructions": {
      "serving": "As directed on individual bottles",
      "timing": "Daily Routine",
      "instructions": "Please refer to the individual bottles for specific usage instructions."
    },
    "specifications": {
      "Form": "Oil Kit",
      "Contents": "1 Nabhi Oil Blend (10 ml), 1 Feet Wellness Oil (20 ml)"
    },
    "certifications": [
      "100% Natural",
      "Ayurvedic Formulation"
    ],
    "faqs": [
      {
        "question": "Can I customize the blends in this pack?",
        "answer": "Currently, our packs are pre-curated to offer the best synergistic benefits."
      }
    ],
    "relatedProductIds": [
      "feet-wellness-oil"
    ],
    "routineProductIds": [],
    "durationText": "Up to 10 Days",
    "goldMembershipEligible": true
  },
  {
    "id": "gold-wellness-pack",
    "slug": "gold-wellness-pack",
    "name": "Gold Oil Wellness Pack",
    "category": "Wellness Packs",
    "shortDescription": "A month of holistic balance and relaxation.",
    "fullDescription": "The Gold Oil Wellness Pack provides an exceptional array of premium Ayurvedic oils curated for your lifestyle. Incorporating these into your daily routine supports holistic well-being.",
    "story": "Curated by our expert Ayurvedic practitioners, this pack offers the perfect synergy of traditional formulations.",
    "benefit": "Comprehensive wellness and self-care made easy.",
    "benefits": [
      {
        "icon": "Gift",
        "text": "Curated Selection"
      },
      {
        "icon": "Heart",
        "text": "Holistic Health"
      }
    ],
    "ingredients": [
      {
        "name": "Multiple Pure Oils",
        "botanical": "Various",
        "role": "Complete Wellness"
      }
    ],
    "images": [
      "/images/products/combo-individual-gold.jpg"
    ],
    "variants": [
      {
        "size": "Pack of 2",
        "price": 699,
        "originalPrice": 999,
        "image": "/images/products/combo-individual-gold.jpg"
      }
    ],
    "price": 699,
    "originalPrice": 999,
    "discount": 30,
    "rating": 5,
    "reviewCount": 58,
    "badge": "Combo",
    "healthGoals": [
      "Daily Routine",
      "Holistic Wellness"
    ],
    "idealFor": [
      "Everyone"
    ],
    "usageInstructions": {
      "serving": "As directed on individual bottles",
      "timing": "Daily Routine",
      "instructions": "Please refer to the individual bottles for specific usage instructions."
    },
    "specifications": {
      "Form": "Oil Kit",
      "Contents": "1 Nabhi Oil Blend (15 ml), 1 Feet Wellness Oil (50 ml)"
    },
    "certifications": [
      "100% Natural",
      "Ayurvedic Formulation"
    ],
    "faqs": [
      {
        "question": "Can I customize the blends in this pack?",
        "answer": "Currently, our packs are pre-curated to offer the best synergistic benefits."
      }
    ],
    "relatedProductIds": [
      "feet-wellness-oil"
    ],
    "routineProductIds": [],
    "durationText": "Up to 30 Days",
    "goldMembershipEligible": true
  },
  {
    "id": "premium-wellness-pack",
    "slug": "premium-wellness-pack",
    "name": "Premium Oil Wellness Pack",
    "category": "Wellness Packs",
    "shortDescription": "The ultimate luxury wellness experience for months to come.",
    "fullDescription": "The Premium Oil Wellness Pack provides an exceptional array of premium Ayurvedic oils curated for your lifestyle. Incorporating these into your daily routine supports holistic well-being.",
    "story": "Curated by our expert Ayurvedic practitioners, this pack offers the perfect synergy of traditional formulations.",
    "benefit": "Comprehensive wellness and self-care made easy.",
    "benefits": [
      {
        "icon": "Gift",
        "text": "Curated Selection"
      },
      {
        "icon": "Heart",
        "text": "Holistic Health"
      }
    ],
    "ingredients": [
      {
        "name": "Multiple Pure Oils",
        "botanical": "Various",
        "role": "Complete Wellness"
      }
    ],
    "images": [
      "/images/products/combo-individual-premium.jpg"
    ],
    "variants": [
      {
        "size": "Pack of 5",
        "price": 2499,
        "originalPrice": 4999,
        "image": "/images/products/combo-individual-premium.jpg"
      }
    ],
    "price": 2499,
    "originalPrice": 4999,
    "discount": 50,
    "rating": 5,
    "reviewCount": 58,
    "badge": "Combo",
    "healthGoals": [
      "Daily Routine",
      "Holistic Wellness"
    ],
    "idealFor": [
      "Everyone"
    ],
    "usageInstructions": {
      "serving": "As directed on individual bottles",
      "timing": "Daily Routine",
      "instructions": "Please refer to the individual bottles for specific usage instructions."
    },
    "specifications": {
      "Form": "Oil Kit",
      "Contents": "4 Special Oil Blend Variants (15 ml each), 1 Premium Feet Wellness Oil (200 ml)"
    },
    "certifications": [
      "100% Natural",
      "Ayurvedic Formulation"
    ],
    "faqs": [
      {
        "question": "Can I customize the blends in this pack?",
        "answer": "Currently, our packs are pre-curated to offer the best synergistic benefits."
      }
    ],
    "relatedProductIds": [
      "feet-wellness-oil"
    ],
    "routineProductIds": [],
    "durationText": "Up to 4 Months",
    "goldMembershipEligible": true
  },
  {
    "id": "family-gold-pack",
    "slug": "family-gold-pack",
    "name": "Family Gold Oil Wellness Pack",
    "category": "Wellness Packs",
    "shortDescription": "Holistic care for the entire family.",
    "fullDescription": "The Family Gold Oil Wellness Pack provides an exceptional array of premium Ayurvedic oils curated for your lifestyle. Incorporating these into your daily routine supports holistic well-being.",
    "story": "Curated by our expert Ayurvedic practitioners, this pack offers the perfect synergy of traditional formulations.",
    "benefit": "Comprehensive wellness and self-care made easy.",
    "benefits": [
      {
        "icon": "Gift",
        "text": "Curated Selection"
      },
      {
        "icon": "Heart",
        "text": "Holistic Health"
      }
    ],
    "ingredients": [
      {
        "name": "Multiple Pure Oils",
        "botanical": "Various",
        "role": "Complete Wellness"
      }
    ],
    "images": [
      "/images/products/combo-family-gold.jpg"
    ],
    "variants": [
      {
        "size": "Pack of 5",
        "price": 2499,
        "originalPrice": 4999,
        "image": "/images/products/combo-family-gold.jpg"
      }
    ],
    "price": 2499,
    "originalPrice": 4999,
    "discount": 50,
    "rating": 5,
    "reviewCount": 54,
    "badge": "Combo",
    "healthGoals": [
      "Daily Routine",
      "Holistic Wellness"
    ],
    "idealFor": [
      "Everyone"
    ],
    "usageInstructions": {
      "serving": "As directed on individual bottles",
      "timing": "Daily Routine",
      "instructions": "Please refer to the individual bottles for specific usage instructions."
    },
    "specifications": {
      "Form": "Oil Kit",
      "Contents": "Kids Care (15ml), Men Care (15ml), Women Wellness (15ml), Senior Care (15ml), Feet Wellness Oil (200 ml)"
    },
    "certifications": [
      "100% Natural",
      "Ayurvedic Formulation"
    ],
    "faqs": [
      {
        "question": "Can I customize the blends in this pack?",
        "answer": "Currently, our packs are pre-curated to offer the best synergistic benefits."
      }
    ],
    "relatedProductIds": [
      "feet-wellness-oil"
    ],
    "routineProductIds": [],
    "durationText": "Up to 30 Days",
    "goldMembershipEligible": true
  },
  {
    "id": "family-premium-pack",
    "slug": "family-premium-pack",
    "name": "Family Premium Oil Wellness Pack",
    "category": "Wellness Packs",
    "shortDescription": "Complete comprehensive care for the whole family.",
    "fullDescription": "The Family Premium Oil Wellness Pack provides an exceptional array of premium Ayurvedic oils curated for your lifestyle. Incorporating these into your daily routine supports holistic well-being.",
    "story": "Curated by our expert Ayurvedic practitioners, this pack offers the perfect synergy of traditional formulations.",
    "benefit": "Comprehensive wellness and self-care made easy.",
    "benefits": [
      {
        "icon": "Gift",
        "text": "Curated Selection"
      },
      {
        "icon": "Heart",
        "text": "Holistic Health"
      }
    ],
    "ingredients": [
      {
        "name": "Multiple Pure Oils",
        "botanical": "Various",
        "role": "Complete Wellness"
      }
    ],
    "images": [
      "/images/products/combo-family-trial.jpg"
    ],
    "variants": [
      {
        "size": "3 Person Family",
        "price": 5999,
        "originalPrice": 10000,
        "image": "/images/products/combo-family-trial.jpg"
      },
      {
        "size": "4 Person Family",
        "price": 7199,
        "originalPrice": 12000,
        "image": "/images/products/combo-family-trial.jpg"
      }
    ],
    "price": 5999,
    "originalPrice": 10000,
    "discount": 40,
    "rating": 5,
    "reviewCount": 42,
    "badge": "Combo",
    "healthGoals": [
      "Daily Routine",
      "Holistic Wellness"
    ],
    "idealFor": [
      "Everyone"
    ],
    "usageInstructions": {
      "serving": "As directed on individual bottles",
      "timing": "Daily Routine",
      "instructions": "Please refer to the individual bottles for specific usage instructions."
    },
    "specifications": {
      "Form": "Oil Kit",
      "Contents": "All 16 Oil Blend Variants (15 ml each), Premium Feet Wellness Oil (200 ml)"
    },
    "certifications": [
      "100% Natural",
      "Ayurvedic Formulation"
    ],
    "faqs": [
      {
        "question": "Can I customize the blends in this pack?",
        "answer": "Currently, our packs are pre-curated to offer the best synergistic benefits."
      }
    ],
    "relatedProductIds": [
      "feet-wellness-oil"
    ],
    "routineProductIds": [],
    "durationText": "Up to 4 Months",
    "goldMembershipEligible": true
  },
  {
    "id": "hair-trial-combo",
    "slug": "hair-trial-combo",
    "name": "Hair Trial Combo",
    "category": "Wellness Packs",
    "shortDescription": "Discover vibrant hair and holistic wellness.",
    "fullDescription": "The Hair Trial Combo provides an exceptional array of premium Ayurvedic oils curated for your lifestyle. Incorporating these into your daily routine supports holistic well-being.",
    "story": "Curated by our expert Ayurvedic practitioners, this pack offers the perfect synergy of traditional formulations.",
    "benefit": "Comprehensive wellness and self-care made easy.",
    "benefits": [
      {
        "icon": "Gift",
        "text": "Curated Selection"
      },
      {
        "icon": "Heart",
        "text": "Holistic Health"
      }
    ],
    "ingredients": [
      {
        "name": "Multiple Pure Oils",
        "botanical": "Various",
        "role": "Complete Wellness"
      }
    ],
    "images": [
      "/images/products/combo-individual-trial.jpg"
    ],
    "variants": [
      {
        "size": "Pack of 2",
        "price": 699,
        "originalPrice": 1099,
        "image": "/images/products/combo-individual-trial.jpg"
      }
    ],
    "price": 699,
    "originalPrice": 1099,
    "discount": 36,
    "rating": 5,
    "reviewCount": 58,
    "badge": "Combo",
    "healthGoals": [
      "Daily Routine",
      "Holistic Wellness"
    ],
    "idealFor": [
      "Everyone"
    ],
    "usageInstructions": {
      "serving": "As directed on individual bottles",
      "timing": "Daily Routine",
      "instructions": "Please refer to the individual bottles for specific usage instructions."
    },
    "specifications": {
      "Form": "Oil Kit",
      "Contents": "Hair Wellness Oil (50 ml), Nabhi Oil Blend (10 ml)"
    },
    "certifications": [
      "100% Natural",
      "Ayurvedic Formulation"
    ],
    "faqs": [
      {
        "question": "Can I customize the blends in this pack?",
        "answer": "Currently, our packs are pre-curated to offer the best synergistic benefits."
      }
    ],
    "relatedProductIds": [
      "feet-wellness-oil"
    ],
    "routineProductIds": [],
    "goldMembershipEligible": true
  },
  {
    "id": "hair-gold-combo",
    "slug": "hair-gold-combo",
    "name": "Hair Gold Combo",
    "category": "Wellness Packs",
    "shortDescription": "Comprehensive care for your hair, navel, and feet.",
    "fullDescription": "The Hair Gold Combo provides an exceptional array of premium Ayurvedic oils curated for your lifestyle. Incorporating these into your daily routine supports holistic well-being.",
    "story": "Curated by our expert Ayurvedic practitioners, this pack offers the perfect synergy of traditional formulations.",
    "benefit": "Comprehensive wellness and self-care made easy.",
    "benefits": [
      {
        "icon": "Gift",
        "text": "Curated Selection"
      },
      {
        "icon": "Heart",
        "text": "Holistic Health"
      }
    ],
    "ingredients": [
      {
        "name": "Multiple Pure Oils",
        "botanical": "Various",
        "role": "Complete Wellness"
      }
    ],
    "images": [
      "/images/products/combo-individual-gold.jpg"
    ],
    "variants": [
      {
        "size": "Pack of 3",
        "price": 1499,
        "originalPrice": 2499,
        "image": "/images/products/combo-individual-gold.jpg"
      }
    ],
    "price": 1499,
    "originalPrice": 2499,
    "discount": 40,
    "rating": 5,
    "reviewCount": 43,
    "badge": "Combo",
    "healthGoals": [
      "Daily Routine",
      "Holistic Wellness"
    ],
    "idealFor": [
      "Everyone"
    ],
    "usageInstructions": {
      "serving": "As directed on individual bottles",
      "timing": "Daily Routine",
      "instructions": "Please refer to the individual bottles for specific usage instructions."
    },
    "specifications": {
      "Form": "Oil Kit",
      "Contents": "Hair Wellness Oil (100 ml), Nabhi Oil Blend (15 ml), Feet Wellness Oil (50 ml)"
    },
    "certifications": [
      "100% Natural",
      "Ayurvedic Formulation"
    ],
    "faqs": [
      {
        "question": "Can I customize the blends in this pack?",
        "answer": "Currently, our packs are pre-curated to offer the best synergistic benefits."
      }
    ],
    "relatedProductIds": [
      "feet-wellness-oil"
    ],
    "routineProductIds": [],
    "goldMembershipEligible": true
  }
];
export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return products.map(p => p.slug);
}
