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
  inclusions?: string;
  totalQuantityMl?: string;
  goldMembershipEligible?: boolean;
}

export const products: Product[] = [
  {
    "id": "kids-body-wellness-massage-oil",
    "slug": "kids-body-wellness-massage-oil",
    "name": "Kids Body Wellness Massage Oil",
    "category": "Body Massage Oil",
    "shortDescription": "Natural Body Wellness Massage Oil crafted for kids.",
    "fullDescription": "Designed for daily body massage, relaxation, and a self-care routine. The Kids Body Wellness Massage Oil is meticulously crafted to support everyday wellness. Experience the timeless benefits of traditional oil massage rituals.",
    "story": "Rooted in traditional practices, our wellness blends are crafted using only the most pristine, cold-pressed oils.",
    "benefit": "Supports relaxation and everyday wellness.",
    "benefits": [
      { "icon": "Sparkles", "text": "Deep Nourishment" },
      { "icon": "Leaf", "text": "100% Pure & Natural" }
    ],
    "ingredients": [
      { "name": "Natural Oil Base", "botanical": "Natural Oils", "role": "Nourishing base" }
    ],
    "images": [ "/images/categories/cat_oil_wellness_1786556871303.jpg" ],
    "variants": [
      { "id": "kids-bmo-50", "size": "50 ml", "originalPrice": 499, "price": 349, "image": "/images/placeholder.jpg" },
      { "id": "kids-bmo-100", "size": "100 ml", "originalPrice": 799, "price": 599, "image": "/images/placeholder.jpg" },
      { "id": "kids-bmo-200", "size": "200 ml", "originalPrice": 1499, "price": 999, "image": "/images/placeholder.jpg" }
    ],
    "price": 349,
    "originalPrice": 499,
    "discount": 30,
    "rating": 5.0,
    "reviewCount": 0,
    "healthGoals": ["Daily Wellness", "Relaxation"],
    "idealFor": ["Kids"],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Apply to the body and gently massage."
    },
    "specifications": { "Form": "Massage Oil", "Packaging": "Amber Glass Bottle", "Purity": "100% Natural" },
    "certifications": ["100% Natural"],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "men-body-wellness-massage-oil",
    "slug": "men-body-wellness-massage-oil",
    "name": "Men Body Wellness Massage Oil",
    "category": "Body Massage Oil",
    "shortDescription": "Natural Body Wellness Massage Oil crafted for men.",
    "fullDescription": "Designed for daily body massage, relaxation, and a self-care routine. The Men Body Wellness Massage Oil is meticulously crafted to support everyday wellness. Experience the timeless benefits of traditional oil massage rituals.",
    "story": "Rooted in traditional practices, our wellness blends are crafted using only the most pristine, cold-pressed oils.",
    "benefit": "Supports relaxation and everyday wellness.",
    "benefits": [
      { "icon": "Sparkles", "text": "Deep Nourishment" },
      { "icon": "Leaf", "text": "100% Pure & Natural" }
    ],
    "ingredients": [
      { "name": "Natural Oil Base", "botanical": "Natural Oils", "role": "Nourishing base" }
    ],
    "images": [ "/images/categories/cat_oil_wellness_1786556871303.jpg" ],
    "variants": [
      { "id": "men-bmo-50", "size": "50 ml", "originalPrice": 499, "price": 349, "image": "/images/placeholder.jpg" },
      { "id": "men-bmo-100", "size": "100 ml", "originalPrice": 799, "price": 599, "image": "/images/placeholder.jpg" },
      { "id": "men-bmo-200", "size": "200 ml", "originalPrice": 1499, "price": 999, "image": "/images/placeholder.jpg" }
    ],
    "price": 349,
    "originalPrice": 499,
    "discount": 30,
    "rating": 5.0,
    "reviewCount": 0,
    "healthGoals": ["Daily Wellness", "Relaxation"],
    "idealFor": ["Men"],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Apply to the body and gently massage."
    },
    "specifications": { "Form": "Massage Oil", "Packaging": "Amber Glass Bottle", "Purity": "100% Natural" },
    "certifications": ["100% Natural"],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "women-body-wellness-massage-oil",
    "slug": "women-body-wellness-massage-oil",
    "name": "Women Body Wellness Massage Oil",
    "category": "Body Massage Oil",
    "shortDescription": "Natural Body Wellness Massage Oil crafted for women.",
    "fullDescription": "Designed for daily body massage, relaxation, and a self-care routine. The Women Body Wellness Massage Oil is meticulously crafted to support everyday wellness. Experience the timeless benefits of traditional oil massage rituals.",
    "story": "Rooted in traditional practices, our wellness blends are crafted using only the most pristine, cold-pressed oils.",
    "benefit": "Supports relaxation and everyday wellness.",
    "benefits": [
      { "icon": "Sparkles", "text": "Deep Nourishment" },
      { "icon": "Leaf", "text": "100% Pure & Natural" }
    ],
    "ingredients": [
      { "name": "Natural Oil Base", "botanical": "Natural Oils", "role": "Nourishing base" }
    ],
    "images": [ "/images/categories/cat_oil_wellness_1786556871303.jpg" ],
    "variants": [
      { "id": "women-bmo-50", "size": "50 ml", "originalPrice": 499, "price": 349, "image": "/images/placeholder.jpg" },
      { "id": "women-bmo-100", "size": "100 ml", "originalPrice": 799, "price": 599, "image": "/images/placeholder.jpg" },
      { "id": "women-bmo-200", "size": "200 ml", "originalPrice": 1499, "price": 999, "image": "/images/placeholder.jpg" }
    ],
    "price": 349,
    "originalPrice": 499,
    "discount": 30,
    "rating": 5.0,
    "reviewCount": 0,
    "healthGoals": ["Daily Wellness", "Relaxation"],
    "idealFor": ["Women"],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Apply to the body and gently massage."
    },
    "specifications": { "Form": "Massage Oil", "Packaging": "Amber Glass Bottle", "Purity": "100% Natural" },
    "certifications": ["100% Natural"],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "senior-body-wellness-massage-oil",
    "slug": "senior-body-wellness-massage-oil",
    "name": "Senior Body Wellness Massage Oil",
    "category": "Body Massage Oil",
    "shortDescription": "Natural Body Wellness Massage Oil crafted for seniors.",
    "fullDescription": "Designed for daily body massage, relaxation, and a self-care routine. The Senior Body Wellness Massage Oil is meticulously crafted to support everyday wellness. Experience the timeless benefits of traditional oil massage rituals.",
    "story": "Rooted in traditional practices, our wellness blends are crafted using only the most pristine, cold-pressed oils.",
    "benefit": "Supports relaxation and everyday wellness.",
    "benefits": [
      { "icon": "Sparkles", "text": "Deep Nourishment" },
      { "icon": "Leaf", "text": "100% Pure & Natural" }
    ],
    "ingredients": [
      { "name": "Natural Oil Base", "botanical": "Natural Oils", "role": "Nourishing base" }
    ],
    "images": [ "/images/categories/cat_oil_wellness_1786556871303.jpg" ],
    "variants": [
      { "id": "senior-bmo-50", "size": "50 ml", "originalPrice": 499, "price": 349, "image": "/images/placeholder.jpg" },
      { "id": "senior-bmo-100", "size": "100 ml", "originalPrice": 799, "price": 599, "image": "/images/placeholder.jpg" },
      { "id": "senior-bmo-200", "size": "200 ml", "originalPrice": 1499, "price": 999, "image": "/images/placeholder.jpg" }
    ],
    "price": 349,
    "originalPrice": 499,
    "discount": 30,
    "rating": 5.0,
    "reviewCount": 0,
    "healthGoals": ["Daily Wellness", "Relaxation"],
    "idealFor": ["Seniors"],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Apply to the body and gently massage."
    },
    "specifications": { "Form": "Massage Oil", "Packaging": "Amber Glass Bottle", "Purity": "100% Natural" },
    "certifications": ["100% Natural"],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },

  {
    "id": "kids-smart-oil-blend",
    "slug": "kids-smart-oil-blend",
    "name": "Kids Smart Oil Blend",
    "category": "Kids Care Oil Blend",
    "shortDescription": "Premium Kids Smart Oil Blend crafted for holistic wellness.",
    "fullDescription": "The Kids Smart Oil Blend is meticulously crafted to support your daily wellness routine. Applied to the navel or specific areas, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care with our premium botanical blends.",
    "story": "Rooted in ancient Ayurvedic texts, our wellness blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
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
        "role": "Targeted holistic wellness"
      }
    ],
    "images": [
      "/images/products/kids-smart-oil-blend-10-ml.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "originalPrice": 299,
        "price": 199,
        "image": "/images/products/kids-smart-oil-blend-10-ml.jpg"
      },
      {
        "size": "20 ml",
        "originalPrice": 499,
        "price": 349,
        "image": "/images/products/kids-smart-oil-blend-20-ml.jpg"
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 4.9,
    "reviewCount": 161,
    "healthGoals": [
      "Daily Wellness",
      "Immunity",
      "Balance"
    ],
    "idealFor": [
      "All body types"
    ],
    "usageInstructions": {
      "serving": "3-4 drops",
      "timing": "Before bedtime",
      "instructions": "Apply to the navel and gently massage in a circular motion until fully absorbed."
    },
    "specifications": {
      "Form": "Oil Blend",
      "Packaging": "Amber Glass Dropper Bottle",
      "Purity": "100% Natural, Unrefined",
      "Origin": "Made in India"
    },
    "certifications": [
      "100% Natural",
      "Cruelty Free",
      "Toxin Free",
      "GMP Certified"
    ],
    "faqs": [
      {
        "question": "How to use this product?",
        "answer": "Apply 3-4 drops to the belly button before sleeping."
      },
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, it is entirely formulated with gentle, natural ingredients safe for daily application."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "kids-growth-oil-blend",
    "slug": "kids-growth-oil-blend",
    "name": "Kids Growth Oil Blend",
    "category": "Kids Care Oil Blend",
    "shortDescription": "Premium Kids Growth Oil Blend crafted for holistic wellness.",
    "fullDescription": "The Kids Growth Oil Blend is meticulously crafted to support your daily wellness routine. Applied to the navel or specific areas, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care with our premium botanical blends.",
    "story": "Rooted in ancient Ayurvedic texts, our wellness blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
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
        "role": "Targeted holistic wellness"
      }
    ],
    "images": [
      "/images/products/kids-growth-oil-blend-10-ml.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "originalPrice": 299,
        "price": 199,
        "image": "/images/products/kids-growth-oil-blend-10-ml.jpg"
      },
      {
        "size": "20 ml",
        "originalPrice": 499,
        "price": 349,
        "image": "/images/products/kids-growth-oil-blend-20-ml.jpg"
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 4.9,
    "reviewCount": 155,
    "healthGoals": [
      "Daily Wellness",
      "Immunity",
      "Balance"
    ],
    "idealFor": [
      "All body types"
    ],
    "usageInstructions": {
      "serving": "3-4 drops",
      "timing": "Before bedtime",
      "instructions": "Apply to the navel and gently massage in a circular motion until fully absorbed."
    },
    "specifications": {
      "Form": "Oil Blend",
      "Packaging": "Amber Glass Dropper Bottle",
      "Purity": "100% Natural, Unrefined",
      "Origin": "Made in India"
    },
    "certifications": [
      "100% Natural",
      "Cruelty Free",
      "Toxin Free",
      "GMP Certified"
    ],
    "faqs": [
      {
        "question": "How to use this product?",
        "answer": "Apply 3-4 drops to the belly button before sleeping."
      },
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, it is entirely formulated with gentle, natural ingredients safe for daily application."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "kids-calm-oil-blend",
    "slug": "kids-calm-oil-blend",
    "name": "Kids Calm Oil Blend",
    "category": "Kids Care Oil Blend",
    "shortDescription": "Premium Kids Calm Oil Blend crafted for holistic wellness.",
    "fullDescription": "The Kids Calm Oil Blend is meticulously crafted to support your daily wellness routine. Applied to the navel or specific areas, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care with our premium botanical blends.",
    "story": "Rooted in ancient Ayurvedic texts, our wellness blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
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
        "role": "Targeted holistic wellness"
      }
    ],
    "images": [
      "/images/products/kids-calm-oil-blend-10-ml.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "originalPrice": 299,
        "price": 199,
        "image": "/images/products/kids-calm-oil-blend-10-ml.jpg"
      },
      {
        "size": "20 ml",
        "originalPrice": 499,
        "price": 349,
        "image": "/images/products/kids-calm-oil-blend-20-ml.jpg"
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 4.9,
    "reviewCount": 143,
    "healthGoals": [
      "Daily Wellness",
      "Immunity",
      "Balance"
    ],
    "idealFor": [
      "All body types"
    ],
    "usageInstructions": {
      "serving": "3-4 drops",
      "timing": "Before bedtime",
      "instructions": "Apply to the navel and gently massage in a circular motion until fully absorbed."
    },
    "specifications": {
      "Form": "Oil Blend",
      "Packaging": "Amber Glass Dropper Bottle",
      "Purity": "100% Natural, Unrefined",
      "Origin": "Made in India"
    },
    "certifications": [
      "100% Natural",
      "Cruelty Free",
      "Toxin Free",
      "GMP Certified"
    ],
    "faqs": [
      {
        "question": "How to use this product?",
        "answer": "Apply 3-4 drops to the belly button before sleeping."
      },
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, it is entirely formulated with gentle, natural ingredients safe for daily application."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "kids-daily-care-oil-blend",
    "slug": "kids-daily-care-oil-blend",
    "name": "Kids Daily Care Oil Blend",
    "category": "Kids Care Oil Blend",
    "shortDescription": "Premium Kids Daily Care Oil Blend crafted for holistic wellness.",
    "fullDescription": "The Kids Daily Care Oil Blend is meticulously crafted to support your daily wellness routine. Applied to the navel or specific areas, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care with our premium botanical blends.",
    "story": "Rooted in ancient Ayurvedic texts, our wellness blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
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
        "role": "Targeted holistic wellness"
      }
    ],
    "images": [
      "/images/products/kids-daily-care-oil-blend-10-ml.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "originalPrice": 299,
        "price": 199,
        "image": "/images/products/kids-daily-care-oil-blend-10-ml.jpg"
      },
      {
        "size": "20 ml",
        "originalPrice": 499,
        "price": 349,
        "image": "/images/products/kids-daily-care-oil-blend-20-ml.jpg"
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 4.9,
    "reviewCount": 152,
    "healthGoals": [
      "Daily Wellness",
      "Immunity",
      "Balance"
    ],
    "idealFor": [
      "All body types"
    ],
    "usageInstructions": {
      "serving": "3-4 drops",
      "timing": "Before bedtime",
      "instructions": "Apply to the navel and gently massage in a circular motion until fully absorbed."
    },
    "specifications": {
      "Form": "Oil Blend",
      "Packaging": "Amber Glass Dropper Bottle",
      "Purity": "100% Natural, Unrefined",
      "Origin": "Made in India"
    },
    "certifications": [
      "100% Natural",
      "Cruelty Free",
      "Toxin Free",
      "GMP Certified"
    ],
    "faqs": [
      {
        "question": "How to use this product?",
        "answer": "Apply 3-4 drops to the belly button before sleeping."
      },
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, it is entirely formulated with gentle, natural ingredients safe for daily application."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "men-strength-oil-blend",
    "slug": "men-strength-oil-blend",
    "name": "Men Strength Oil Blend",
    "category": "Men Wellness Oil Blend",
    "shortDescription": "Premium Men Strength Oil Blend crafted for holistic wellness.",
    "fullDescription": "The Men Strength Oil Blend is meticulously crafted to support your daily wellness routine. Applied to the navel or specific areas, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care with our premium botanical blends.",
    "story": "Rooted in ancient Ayurvedic texts, our wellness blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
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
        "role": "Targeted holistic wellness"
      }
    ],
    "images": [
      "/images/products/men-strength-oil-blend-10-ml.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "originalPrice": 299,
        "price": 199,
        "image": "/images/products/men-strength-oil-blend-10-ml.jpg"
      },
      {
        "size": "20 ml",
        "originalPrice": 499,
        "price": 349,
        "image": "/images/products/men-strength-oil-blend-20-ml.jpg"
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 4.9,
    "reviewCount": 130,
    "healthGoals": [
      "Daily Wellness",
      "Immunity",
      "Balance"
    ],
    "idealFor": [
      "All body types"
    ],
    "usageInstructions": {
      "serving": "3-4 drops",
      "timing": "Before bedtime",
      "instructions": "Apply to the navel and gently massage in a circular motion until fully absorbed."
    },
    "specifications": {
      "Form": "Oil Blend",
      "Packaging": "Amber Glass Dropper Bottle",
      "Purity": "100% Natural, Unrefined",
      "Origin": "Made in India"
    },
    "certifications": [
      "100% Natural",
      "Cruelty Free",
      "Toxin Free",
      "GMP Certified"
    ],
    "faqs": [
      {
        "question": "How to use this product?",
        "answer": "Apply 3-4 drops to the belly button before sleeping."
      },
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, it is entirely formulated with gentle, natural ingredients safe for daily application."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "men-active-oil-blend",
    "slug": "men-active-oil-blend",
    "name": "Men Active Oil Blend",
    "category": "Men Wellness Oil Blend",
    "shortDescription": "Premium Men Active Oil Blend crafted for holistic wellness.",
    "fullDescription": "The Men Active Oil Blend is meticulously crafted to support your daily wellness routine. Applied to the navel or specific areas, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care with our premium botanical blends.",
    "story": "Rooted in ancient Ayurvedic texts, our wellness blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
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
        "role": "Targeted holistic wellness"
      }
    ],
    "images": [
      "/images/products/men-active-oil-blend-10-ml.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "originalPrice": 299,
        "price": 199,
        "image": "/images/products/men-active-oil-blend-10-ml.jpg"
      },
      {
        "size": "20 ml",
        "originalPrice": 499,
        "price": 349,
        "image": "/images/products/men-active-oil-blend-20-ml.jpg"
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 4.9,
    "reviewCount": 124,
    "healthGoals": [
      "Daily Wellness",
      "Immunity",
      "Balance"
    ],
    "idealFor": [
      "All body types"
    ],
    "usageInstructions": {
      "serving": "3-4 drops",
      "timing": "Before bedtime",
      "instructions": "Apply to the navel and gently massage in a circular motion until fully absorbed."
    },
    "specifications": {
      "Form": "Oil Blend",
      "Packaging": "Amber Glass Dropper Bottle",
      "Purity": "100% Natural, Unrefined",
      "Origin": "Made in India"
    },
    "certifications": [
      "100% Natural",
      "Cruelty Free",
      "Toxin Free",
      "GMP Certified"
    ],
    "faqs": [
      {
        "question": "How to use this product?",
        "answer": "Apply 3-4 drops to the belly button before sleeping."
      },
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, it is entirely formulated with gentle, natural ingredients safe for daily application."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "men-heart-balance-oil-blend",
    "slug": "men-heart-balance-oil-blend",
    "name": "Men Heart Balance Oil Blend",
    "category": "Men Wellness Oil Blend",
    "shortDescription": "Premium Men Heart Balance Oil Blend crafted for holistic wellness.",
    "fullDescription": "The Men Heart Balance Oil Blend is meticulously crafted to support your daily wellness routine. Applied to the navel or specific areas, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care with our premium botanical blends.",
    "story": "Rooted in ancient Ayurvedic texts, our wellness blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
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
        "role": "Targeted holistic wellness"
      }
    ],
    "images": [
      "/images/products/men-heart-balance-oil-blend-10-ml.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "originalPrice": 299,
        "price": 199,
        "image": "/images/products/men-heart-balance-oil-blend-10-ml.jpg"
      },
      {
        "size": "20 ml",
        "originalPrice": 499,
        "price": 349,
        "image": "/images/products/men-heart-balance-oil-blend-20-ml.jpg"
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 4.9,
    "reviewCount": 132,
    "healthGoals": [
      "Daily Wellness",
      "Immunity",
      "Balance"
    ],
    "idealFor": [
      "All body types"
    ],
    "usageInstructions": {
      "serving": "3-4 drops",
      "timing": "Before bedtime",
      "instructions": "Apply to the navel and gently massage in a circular motion until fully absorbed."
    },
    "specifications": {
      "Form": "Oil Blend",
      "Packaging": "Amber Glass Dropper Bottle",
      "Purity": "100% Natural, Unrefined",
      "Origin": "Made in India"
    },
    "certifications": [
      "100% Natural",
      "Cruelty Free",
      "Toxin Free",
      "GMP Certified"
    ],
    "faqs": [
      {
        "question": "How to use this product?",
        "answer": "Apply 3-4 drops to the belly button before sleeping."
      },
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, it is entirely formulated with gentle, natural ingredients safe for daily application."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "men-daily-wellness-oil-blend",
    "slug": "men-daily-wellness-oil-blend",
    "name": "Men Daily Wellness Oil Blend",
    "category": "Men Wellness Oil Blend",
    "shortDescription": "Premium Men Daily Wellness Oil Blend crafted for holistic wellness.",
    "fullDescription": "The Men Daily Wellness Oil Blend is meticulously crafted to support your daily wellness routine. Applied to the navel or specific areas, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care with our premium botanical blends.",
    "story": "Rooted in ancient Ayurvedic texts, our wellness blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
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
        "role": "Targeted holistic wellness"
      }
    ],
    "images": [
      "/images/products/men-daily-wellness-oil-blend-10-ml.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "originalPrice": 299,
        "price": 199,
        "image": "/images/products/men-daily-wellness-oil-blend-10-ml.jpg"
      },
      {
        "size": "20 ml",
        "originalPrice": 499,
        "price": 349,
        "image": "/images/products/men-daily-wellness-oil-blend-20-ml.jpg"
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 4.9,
    "reviewCount": 132,
    "healthGoals": [
      "Daily Wellness",
      "Immunity",
      "Balance"
    ],
    "idealFor": [
      "All body types"
    ],
    "usageInstructions": {
      "serving": "3-4 drops",
      "timing": "Before bedtime",
      "instructions": "Apply to the navel and gently massage in a circular motion until fully absorbed."
    },
    "specifications": {
      "Form": "Oil Blend",
      "Packaging": "Amber Glass Dropper Bottle",
      "Purity": "100% Natural, Unrefined",
      "Origin": "Made in India"
    },
    "certifications": [
      "100% Natural",
      "Cruelty Free",
      "Toxin Free",
      "GMP Certified"
    ],
    "faqs": [
      {
        "question": "How to use this product?",
        "answer": "Apply 3-4 drops to the belly button before sleeping."
      },
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, it is entirely formulated with gentle, natural ingredients safe for daily application."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "women-harmony-oil-blend",
    "slug": "women-harmony-oil-blend",
    "name": "Women Harmony Oil Blend",
    "category": "Women Wellness Oil Blend",
    "shortDescription": "Premium Women Harmony Oil Blend crafted for holistic wellness.",
    "fullDescription": "The Women Harmony Oil Blend is meticulously crafted to support your daily wellness routine. Applied to the navel or specific areas, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care with our premium botanical blends.",
    "story": "Rooted in ancient Ayurvedic texts, our wellness blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
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
        "role": "Targeted holistic wellness"
      }
    ],
    "images": [
      "/images/products/women-harmony-oil-blend-10-ml.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "originalPrice": 299,
        "price": 199,
        "image": "/images/products/women-harmony-oil-blend-10-ml.jpg"
      },
      {
        "size": "20 ml",
        "originalPrice": 499,
        "price": 349,
        "image": "/images/products/women-harmony-oil-blend-20-ml.jpg"
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 4.9,
    "reviewCount": 129,
    "healthGoals": [
      "Daily Wellness",
      "Immunity",
      "Balance"
    ],
    "idealFor": [
      "All body types"
    ],
    "usageInstructions": {
      "serving": "3-4 drops",
      "timing": "Before bedtime",
      "instructions": "Apply to the navel and gently massage in a circular motion until fully absorbed."
    },
    "specifications": {
      "Form": "Oil Blend",
      "Packaging": "Amber Glass Dropper Bottle",
      "Purity": "100% Natural, Unrefined",
      "Origin": "Made in India"
    },
    "certifications": [
      "100% Natural",
      "Cruelty Free",
      "Toxin Free",
      "GMP Certified"
    ],
    "faqs": [
      {
        "question": "How to use this product?",
        "answer": "Apply 3-4 drops to the belly button before sleeping."
      },
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, it is entirely formulated with gentle, natural ingredients safe for daily application."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "women-care-oil-blend",
    "slug": "women-care-oil-blend",
    "name": "Women Care Oil Blend",
    "category": "Women Wellness Oil Blend",
    "shortDescription": "Premium Women Care Oil Blend crafted for holistic wellness.",
    "fullDescription": "The Women Care Oil Blend is meticulously crafted to support your daily wellness routine. Applied to the navel or specific areas, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care with our premium botanical blends.",
    "story": "Rooted in ancient Ayurvedic texts, our wellness blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
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
        "role": "Targeted holistic wellness"
      }
    ],
    "images": [
      "/images/products/women-care-oil-blend-10-ml.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "originalPrice": 299,
        "price": 199,
        "image": "/images/products/women-care-oil-blend-10-ml.jpg"
      },
      {
        "size": "20 ml",
        "originalPrice": 499,
        "price": 349,
        "image": "/images/products/women-care-oil-blend-20-ml.jpg"
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 4.9,
    "reviewCount": 155,
    "healthGoals": [
      "Daily Wellness",
      "Immunity",
      "Balance"
    ],
    "idealFor": [
      "All body types"
    ],
    "usageInstructions": {
      "serving": "3-4 drops",
      "timing": "Before bedtime",
      "instructions": "Apply to the navel and gently massage in a circular motion until fully absorbed."
    },
    "specifications": {
      "Form": "Oil Blend",
      "Packaging": "Amber Glass Dropper Bottle",
      "Purity": "100% Natural, Unrefined",
      "Origin": "Made in India"
    },
    "certifications": [
      "100% Natural",
      "Cruelty Free",
      "Toxin Free",
      "GMP Certified"
    ],
    "faqs": [
      {
        "question": "How to use this product?",
        "answer": "Apply 3-4 drops to the belly button before sleeping."
      },
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, it is entirely formulated with gentle, natural ingredients safe for daily application."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "women-glow-oil-blend",
    "slug": "women-glow-oil-blend",
    "name": "Women Glow Oil Blend",
    "category": "Women Wellness Oil Blend",
    "shortDescription": "Premium Women Glow Oil Blend crafted for holistic wellness.",
    "fullDescription": "The Women Glow Oil Blend is meticulously crafted to support your daily wellness routine. Applied to the navel or specific areas, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care with our premium botanical blends.",
    "story": "Rooted in ancient Ayurvedic texts, our wellness blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
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
        "role": "Targeted holistic wellness"
      }
    ],
    "images": [
      "/images/products/women-glow-oil-blend-10-ml.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "originalPrice": 299,
        "price": 199,
        "image": "/images/products/women-glow-oil-blend-10-ml.jpg"
      },
      {
        "size": "20 ml",
        "originalPrice": 499,
        "price": 349,
        "image": "/images/products/women-glow-oil-blend-20-ml.jpg"
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 4.9,
    "reviewCount": 142,
    "healthGoals": [
      "Daily Wellness",
      "Immunity",
      "Balance"
    ],
    "idealFor": [
      "All body types"
    ],
    "usageInstructions": {
      "serving": "3-4 drops",
      "timing": "Before bedtime",
      "instructions": "Apply to the navel and gently massage in a circular motion until fully absorbed."
    },
    "specifications": {
      "Form": "Oil Blend",
      "Packaging": "Amber Glass Dropper Bottle",
      "Purity": "100% Natural, Unrefined",
      "Origin": "Made in India"
    },
    "certifications": [
      "100% Natural",
      "Cruelty Free",
      "Toxin Free",
      "GMP Certified"
    ],
    "faqs": [
      {
        "question": "How to use this product?",
        "answer": "Apply 3-4 drops to the belly button before sleeping."
      },
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, it is entirely formulated with gentle, natural ingredients safe for daily application."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "women-daily-wellness-oil-blend",
    "slug": "women-daily-wellness-oil-blend",
    "name": "Women Daily Wellness Oil Blend",
    "category": "Women Wellness Oil Blend",
    "shortDescription": "Premium Women Daily Wellness Oil Blend crafted for holistic wellness.",
    "fullDescription": "The Women Daily Wellness Oil Blend is meticulously crafted to support your daily wellness routine. Applied to the navel or specific areas, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care with our premium botanical blends.",
    "story": "Rooted in ancient Ayurvedic texts, our wellness blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
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
        "role": "Targeted holistic wellness"
      }
    ],
    "images": [
      "/images/products/women-daily-wellness-oil-blend-10-ml.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "originalPrice": 299,
        "price": 199,
        "image": "/images/products/women-daily-wellness-oil-blend-10-ml.jpg"
      },
      {
        "size": "20 ml",
        "originalPrice": 499,
        "price": 349,
        "image": "/images/products/women-daily-wellness-oil-blend-20-ml.jpg"
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 4.9,
    "reviewCount": 149,
    "healthGoals": [
      "Daily Wellness",
      "Immunity",
      "Balance"
    ],
    "idealFor": [
      "All body types"
    ],
    "usageInstructions": {
      "serving": "3-4 drops",
      "timing": "Before bedtime",
      "instructions": "Apply to the navel and gently massage in a circular motion until fully absorbed."
    },
    "specifications": {
      "Form": "Oil Blend",
      "Packaging": "Amber Glass Dropper Bottle",
      "Purity": "100% Natural, Unrefined",
      "Origin": "Made in India"
    },
    "certifications": [
      "100% Natural",
      "Cruelty Free",
      "Toxin Free",
      "GMP Certified"
    ],
    "faqs": [
      {
        "question": "How to use this product?",
        "answer": "Apply 3-4 drops to the belly button before sleeping."
      },
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, it is entirely formulated with gentle, natural ingredients safe for daily application."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "senior-comfort-oil-blend",
    "slug": "senior-comfort-oil-blend",
    "name": "Senior Comfort Oil Blend",
    "category": "Senior Care Oil Blend",
    "shortDescription": "Premium Senior Comfort Oil Blend crafted for holistic wellness.",
    "fullDescription": "The Senior Comfort Oil Blend is meticulously crafted to support your daily wellness routine. Applied to the navel or specific areas, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care with our premium botanical blends.",
    "story": "Rooted in ancient Ayurvedic texts, our wellness blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
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
        "role": "Targeted holistic wellness"
      }
    ],
    "images": [
      "/images/products/senior-comfort-oil-blend-10-ml.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "originalPrice": 299,
        "price": 199,
        "image": "/images/products/senior-comfort-oil-blend-10-ml.jpg"
      },
      {
        "size": "20 ml",
        "originalPrice": 499,
        "price": 349,
        "image": "/images/products/senior-comfort-oil-blend-20-ml.jpg"
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 4.9,
    "reviewCount": 162,
    "healthGoals": [
      "Daily Wellness",
      "Immunity",
      "Balance"
    ],
    "idealFor": [
      "All body types"
    ],
    "usageInstructions": {
      "serving": "3-4 drops",
      "timing": "Before bedtime",
      "instructions": "Apply to the navel and gently massage in a circular motion until fully absorbed."
    },
    "specifications": {
      "Form": "Oil Blend",
      "Packaging": "Amber Glass Dropper Bottle",
      "Purity": "100% Natural, Unrefined",
      "Origin": "Made in India"
    },
    "certifications": [
      "100% Natural",
      "Cruelty Free",
      "Toxin Free",
      "GMP Certified"
    ],
    "faqs": [
      {
        "question": "How to use this product?",
        "answer": "Apply 3-4 drops to the belly button before sleeping."
      },
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, it is entirely formulated with gentle, natural ingredients safe for daily application."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "senior-active-oil-blend",
    "slug": "senior-active-oil-blend",
    "name": "Senior Active Oil Blend",
    "category": "Senior Care Oil Blend",
    "shortDescription": "Premium Senior Active Oil Blend crafted for holistic wellness.",
    "fullDescription": "The Senior Active Oil Blend is meticulously crafted to support your daily wellness routine. Applied to the navel or specific areas, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care with our premium botanical blends.",
    "story": "Rooted in ancient Ayurvedic texts, our wellness blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
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
        "role": "Targeted holistic wellness"
      }
    ],
    "images": [
      "/images/products/senior-active-oil-blend-10-ml.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "originalPrice": 299,
        "price": 199,
        "image": "/images/products/senior-active-oil-blend-10-ml.jpg"
      },
      {
        "size": "20 ml",
        "originalPrice": 499,
        "price": 349,
        "image": "/images/products/senior-active-oil-blend-20-ml.jpg"
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 4.9,
    "reviewCount": 145,
    "healthGoals": [
      "Daily Wellness",
      "Immunity",
      "Balance"
    ],
    "idealFor": [
      "All body types"
    ],
    "usageInstructions": {
      "serving": "3-4 drops",
      "timing": "Before bedtime",
      "instructions": "Apply to the navel and gently massage in a circular motion until fully absorbed."
    },
    "specifications": {
      "Form": "Oil Blend",
      "Packaging": "Amber Glass Dropper Bottle",
      "Purity": "100% Natural, Unrefined",
      "Origin": "Made in India"
    },
    "certifications": [
      "100% Natural",
      "Cruelty Free",
      "Toxin Free",
      "GMP Certified"
    ],
    "faqs": [
      {
        "question": "How to use this product?",
        "answer": "Apply 3-4 drops to the belly button before sleeping."
      },
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, it is entirely formulated with gentle, natural ingredients safe for daily application."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "senior-balance-oil-blend",
    "slug": "senior-balance-oil-blend",
    "name": "Senior Balance Oil Blend",
    "category": "Senior Care Oil Blend",
    "shortDescription": "Premium Senior Balance Oil Blend crafted for holistic wellness.",
    "fullDescription": "The Senior Balance Oil Blend is meticulously crafted to support your daily wellness routine. Applied to the navel or specific areas, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care with our premium botanical blends.",
    "story": "Rooted in ancient Ayurvedic texts, our wellness blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
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
        "role": "Targeted holistic wellness"
      }
    ],
    "images": [
      "/images/products/senior-balance-oil-blend-10-ml.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "originalPrice": 299,
        "price": 199,
        "image": "/images/products/senior-balance-oil-blend-10-ml.jpg"
      },
      {
        "size": "20 ml",
        "originalPrice": 499,
        "price": 349,
        "image": "/images/products/senior-balance-oil-blend-20-ml.jpg"
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 4.9,
    "reviewCount": 165,
    "healthGoals": [
      "Daily Wellness",
      "Immunity",
      "Balance"
    ],
    "idealFor": [
      "All body types"
    ],
    "usageInstructions": {
      "serving": "3-4 drops",
      "timing": "Before bedtime",
      "instructions": "Apply to the navel and gently massage in a circular motion until fully absorbed."
    },
    "specifications": {
      "Form": "Oil Blend",
      "Packaging": "Amber Glass Dropper Bottle",
      "Purity": "100% Natural, Unrefined",
      "Origin": "Made in India"
    },
    "certifications": [
      "100% Natural",
      "Cruelty Free",
      "Toxin Free",
      "GMP Certified"
    ],
    "faqs": [
      {
        "question": "How to use this product?",
        "answer": "Apply 3-4 drops to the belly button before sleeping."
      },
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, it is entirely formulated with gentle, natural ingredients safe for daily application."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "senior-daily-wellness-oil-blend",
    "slug": "senior-daily-wellness-oil-blend",
    "name": "Senior Daily Wellness Oil Blend",
    "category": "Senior Care Oil Blend",
    "shortDescription": "Premium Senior Daily Wellness Oil Blend crafted for holistic wellness.",
    "fullDescription": "The Senior Daily Wellness Oil Blend is meticulously crafted to support your daily wellness routine. Applied to the navel or specific areas, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care with our premium botanical blends.",
    "story": "Rooted in ancient Ayurvedic texts, our wellness blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
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
        "role": "Targeted holistic wellness"
      }
    ],
    "images": [
      "/images/products/senior-daily-wellness-oil-blend-10-ml.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "originalPrice": 299,
        "price": 199,
        "image": "/images/products/senior-daily-wellness-oil-blend-10-ml.jpg"
      },
      {
        "size": "20 ml",
        "originalPrice": 499,
        "price": 349,
        "image": "/images/products/senior-daily-wellness-oil-blend-20-ml.jpg"
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 4.9,
    "reviewCount": 150,
    "healthGoals": [
      "Daily Wellness",
      "Immunity",
      "Balance"
    ],
    "idealFor": [
      "All body types"
    ],
    "usageInstructions": {
      "serving": "3-4 drops",
      "timing": "Before bedtime",
      "instructions": "Apply to the navel and gently massage in a circular motion until fully absorbed."
    },
    "specifications": {
      "Form": "Oil Blend",
      "Packaging": "Amber Glass Dropper Bottle",
      "Purity": "100% Natural, Unrefined",
      "Origin": "Made in India"
    },
    "certifications": [
      "100% Natural",
      "Cruelty Free",
      "Toxin Free",
      "GMP Certified"
    ],
    "faqs": [
      {
        "question": "How to use this product?",
        "answer": "Apply 3-4 drops to the belly button before sleeping."
      },
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, it is entirely formulated with gentle, natural ingredients safe for daily application."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "feet-massage-oil",
    "slug": "feet-massage-oil",
    "name": "Feet Massage Oil",
    "category": "Feet Massage Oil",
    "shortDescription": "Premium Feet Massage Oil crafted for holistic wellness.",
    "fullDescription": "The Feet Massage Oil is meticulously crafted to support your daily wellness routine. Applied to the navel or specific areas, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care with our premium botanical blends.",
    "story": "Rooted in ancient Ayurvedic texts, our wellness blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
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
        "role": "Targeted holistic wellness"
      }
    ],
    "images": [
      "/images/products/feet-massage-oil-30-ml.jpg"
    ],
    "variants": [
      {
        "size": "30 ml",
        "originalPrice": 599,
        "price": 399,
        "image": "/images/products/feet-massage-oil-30-ml.jpg"
      },
      {
        "size": "100 ml",
        "originalPrice": 1799,
        "price": 1199,
        "image": "/images/products/feet-massage-oil-100-ml.jpg"
      },
      {
        "size": "200 ml",
        "originalPrice": 3299,
        "price": 2199,
        "image": "/images/products/feet-massage-oil-200-ml.jpg"
      }
    ],
    "price": 399,
    "originalPrice": 599,
    "discount": 33,
    "rating": 4.9,
    "reviewCount": 139,
    "healthGoals": [
      "Daily Wellness",
      "Immunity",
      "Balance"
    ],
    "idealFor": [
      "All body types"
    ],
    "usageInstructions": {
      "serving": "3-4 drops",
      "timing": "Before bedtime",
      "instructions": "Apply to the navel and gently massage in a circular motion until fully absorbed."
    },
    "specifications": {
      "Form": "Oil Blend",
      "Packaging": "Amber Glass Dropper Bottle",
      "Purity": "100% Natural, Unrefined",
      "Origin": "Made in India"
    },
    "certifications": [
      "100% Natural",
      "Cruelty Free",
      "Toxin Free",
      "GMP Certified"
    ],
    "faqs": [
      {
        "question": "How to use this product?",
        "answer": "Apply 3-4 drops to the belly button before sleeping."
      },
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, it is entirely formulated with gentle, natural ingredients safe for daily application."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "hair-wellness-oil",
    "slug": "hair-wellness-oil",
    "name": "Hair Wellness Oil",
    "category": "Hair Wellness Oil",
    "shortDescription": "Premium Hair Wellness Oil crafted for holistic wellness.",
    "fullDescription": "The Hair Wellness Oil is meticulously crafted to support your daily wellness routine. Applied to the navel or specific areas, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care with our premium botanical blends.",
    "story": "Rooted in ancient Ayurvedic texts, our wellness blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
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
        "role": "Targeted holistic wellness"
      }
    ],
    "images": [
      "/images/products/hair-wellness-oil-50-ml.jpg"
    ],
    "variants": [
      {
        "size": "50 ml",
        "originalPrice": 699,
        "price": 499,
        "image": "/images/products/hair-wellness-oil-50-ml.jpg"
      },
      {
        "size": "100 ml",
        "originalPrice": 1299,
        "price": 899,
        "image": "/images/products/hair-wellness-oil-100-ml.jpg"
      },
      {
        "size": "200 ml",
        "originalPrice": 2499,
        "price": 1799,
        "image": "/images/products/hair-wellness-oil-200-ml.jpg"
      }
    ],
    "price": 499,
    "originalPrice": 699,
    "discount": 29,
    "rating": 4.9,
    "reviewCount": 159,
    "healthGoals": [
      "Daily Wellness",
      "Immunity",
      "Balance"
    ],
    "idealFor": [
      "All body types"
    ],
    "usageInstructions": {
      "serving": "3-4 drops",
      "timing": "Before bedtime",
      "instructions": "Apply to the navel and gently massage in a circular motion until fully absorbed."
    },
    "specifications": {
      "Form": "Oil Blend",
      "Packaging": "Amber Glass Dropper Bottle",
      "Purity": "100% Natural, Unrefined",
      "Origin": "Made in India"
    },
    "certifications": [
      "100% Natural",
      "Cruelty Free",
      "Toxin Free",
      "GMP Certified"
    ],
    "faqs": [
      {
        "question": "How to use this product?",
        "answer": "Apply 3-4 drops to the belly button before sleeping."
      },
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, it is entirely formulated with gentle, natural ingredients safe for daily application."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "trial-wellness-pack",
    "slug": "trial-wellness-pack",
    "name": "Trial Wellness Pack",
    "category": "Individual Wellness Packs",
    "shortDescription": "Premium Trial Wellness Pack crafted for holistic wellness.",
    "fullDescription": "The Trial Wellness Pack is meticulously crafted to support your daily wellness routine. Applied to the navel or specific areas, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care with our premium botanical blends.",
    "story": "Rooted in ancient Ayurvedic texts, our wellness blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
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
        "role": "Targeted holistic wellness"
      }
    ],
    "images": [
      "/images/products/trial-wellness-pack-1-pack.jpg"
    ],
    "variants": [
      {
        "size": "Standard",
        "originalPrice": 749,
        "price": 499,
        "image": "/images/products/trial-wellness-pack.jpg"
      }
    ],
    "price": 499,
    "originalPrice": 749,
    "discount": 33,
    "rating": 4.9,
    "reviewCount": 164,
    "healthGoals": [
      "Daily Wellness",
      "Immunity",
      "Balance"
    ],
    "idealFor": [
      "All body types"
    ],
    "usageInstructions": {
      "serving": "3-4 drops",
      "timing": "Before bedtime",
      "instructions": "Apply to the navel and gently massage in a circular motion until fully absorbed."
    },
    "specifications": {
      "Form": "Oil Blend",
      "Packaging": "Amber Glass Dropper Bottle",
      "Purity": "100% Natural, Unrefined",
      "Origin": "Made in India"
    },
    "certifications": [
      "100% Natural",
      "Cruelty Free",
      "Toxin Free",
      "GMP Certified"
    ],
    "faqs": [
      {
        "question": "How to use this product?",
        "answer": "Apply 3-4 drops to the belly button before sleeping."
      },
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, it is entirely formulated with gentle, natural ingredients safe for daily application."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": [],
    "durationText": "Up to 1 Month Wellness Care",
    "inclusions": "10 ml Nabhi Oil Blend, 30 ml Feet Massage Oil"
  },
  {
    "id": "diamond-trial-wellness-pack",
    "slug": "diamond-trial-wellness-pack",
    "name": "💎 Diamond Trial Wellness Pack",
    "category": "Individual Wellness Packs",
    "shortDescription": "Experience three simple wellness rituals in one premium trial pack.",
    "fullDescription": "Complete 3-Step Wellness Trial. Experience three simple wellness rituals in one premium trial pack. Designed for daily self-care and holistic wellness.",
    "story": "Rooted in ancient Ayurvedic texts, our wellness blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
    "benefit": "Complete 3-Step Wellness Trial (Nabhi • Feet • Body)",
    "benefits": [
      { "icon": "Sparkles", "text": "Deep Nourishment" },
      { "icon": "Leaf", "text": "100% Pure & Natural" }
    ],
    "ingredients": [
      { "name": "Premium Oil Blends", "botanical": "Natural Extracts", "role": "Active" }
    ],
    "images": [ "/images/products/diamond-trial.jpg" ],
    "variants": [
      { "id": "diamond-trial-pack-1", "size": "1 Pack", "originalPrice": 1499, "price": 999, "image": "/images/products/diamond-trial.jpg" }
    ],
    "price": 999,
    "originalPrice": 1499,
    "discount": 33,
    "rating": 5.0,
    "reviewCount": 0,
    "badge": "DIAMOND TRIAL",
    "healthGoals": ["Daily Wellness", "Holistic Health"],
    "idealFor": ["Everyone"],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Follow the 3-step routine: Apply Nabhi Wellness Oil, Massage with Feet Massage Oil, and complete with Body Wellness Massage Oil."
    },
    "specifications": { "Form": "Oil Blends", "Packaging": "Premium Kit", "Purity": "100% Natural" },
    "certifications": ["100% Natural"],
    "inclusions": "10 ml Nabhi Wellness Oil Blend\n30 ml Feet Massage Oil\n100 ml Body Wellness Massage Oil",
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "gold-wellness-pack",
    "slug": "gold-wellness-pack",
    "name": "Gold Wellness Pack",
    "category": "Individual Wellness Packs",
    "shortDescription": "Premium Gold Wellness Pack crafted for holistic wellness.",
    "fullDescription": "The Gold Wellness Pack is meticulously crafted to support your daily wellness routine. Applied to the navel or specific areas, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care with our premium botanical blends.",
    "story": "Rooted in ancient Ayurvedic texts, our wellness blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
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
        "role": "Targeted holistic wellness"
      }
    ],
    "images": [
      "/images/products/gold-wellness-pack-1-pack.jpg"
    ],
    "variants": [
      {
        "size": "Standard",
        "originalPrice": 2999,
        "price": 2199,
        "image": "/images/products/gold-wellness-pack.jpg"
      }
    ],
    "price": 2199,
    "originalPrice": 2999,
    "discount": 27,
    "rating": 4.9,
    "reviewCount": 143,
    "healthGoals": [
      "Daily Wellness",
      "Immunity",
      "Balance"
    ],
    "idealFor": [
      "All body types"
    ],
    "usageInstructions": {
      "serving": "3-4 drops",
      "timing": "Before bedtime",
      "instructions": "Apply to the navel and gently massage in a circular motion until fully absorbed."
    },
    "specifications": {
      "Form": "Oil Blend",
      "Packaging": "Amber Glass Dropper Bottle",
      "Purity": "100% Natural, Unrefined",
      "Origin": "Made in India"
    },
    "certifications": [
      "100% Natural",
      "Cruelty Free",
      "Toxin Free",
      "GMP Certified"
    ],
    "faqs": [
      {
        "question": "How to use this product?",
        "answer": "Apply 3-4 drops to the belly button before sleeping."
      },
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, it is entirely formulated with gentle, natural ingredients safe for daily application."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": [],
    "durationText": "Up to 4 Months Wellness Care",
    "inclusions": "40 ml Nabhi Oil Blend (4 × 10 ml), 100 ml Feet Massage Oil"
  },
  {
    "id": "premium-wellness-pack",
    "slug": "premium-wellness-pack",
    "name": "Premium Wellness Pack",
    "category": "Individual Wellness Packs",
    "shortDescription": "Premium Premium Wellness Pack crafted for holistic wellness.",
    "fullDescription": "The Premium Wellness Pack is meticulously crafted to support your daily wellness routine. Applied to the navel or specific areas, this traditional Ayurvedic formulation nourishes deeply. Experience the timeless benefits of daily self-care with our premium botanical blends.",
    "story": "Rooted in ancient Ayurvedic texts, our wellness blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.",
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
        "role": "Targeted holistic wellness"
      }
    ],
    "images": [
      "/images/products/premium-wellness-pack-1-pack.jpg"
    ],
    "variants": [
      {
        "size": "Standard",
        "originalPrice": 5499,
        "price": 3999,
        "image": "/images/products/premium-wellness-pack.jpg"
      }
    ],
    "price": 3999,
    "originalPrice": 5499,
    "discount": 27,
    "rating": 4.9,
    "reviewCount": 138,
    "healthGoals": [
      "Daily Wellness",
      "Immunity",
      "Balance"
    ],
    "idealFor": [
      "All body types"
    ],
    "usageInstructions": {
      "serving": "3-4 drops",
      "timing": "Before bedtime",
      "instructions": "Apply to the navel and gently massage in a circular motion until fully absorbed."
    },
    "specifications": {
      "Form": "Oil Blend",
      "Packaging": "Amber Glass Dropper Bottle",
      "Purity": "100% Natural, Unrefined",
      "Origin": "Made in India"
    },
    "certifications": [
      "100% Natural",
      "Cruelty Free",
      "Toxin Free",
      "GMP Certified"
    ],
    "faqs": [
      {
        "question": "How to use this product?",
        "answer": "Apply 3-4 drops to the belly button before sleeping."
      },
      {
        "question": "Is this safe for daily use?",
        "answer": "Yes, it is entirely formulated with gentle, natural ingredients safe for daily application."
      }
    ],
    "relatedProductIds": [],
    "routineProductIds": [],
    "durationText": "Up to 8 Months Wellness Care",
    "inclusions": "80 ml Nabhi Oil Blend (4 × 20 ml), 200 ml Feet Massage Oil"
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return products.map(p => p.slug);
}
