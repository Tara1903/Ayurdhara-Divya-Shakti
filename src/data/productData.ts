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
    selectionType?: 'single' | 'four-distinct' | 'per-member';
    memberCount?: number;
  durationText?: string;
  inclusions?: string;
  totalQuantityMl?: string;
  goldMembershipEligible?: boolean;
}

export const products: Product[] = [
  {
    "id": "kids-smart-oil-blend",
    "slug": "kids-smart-oil-blend",
    "name": "Kids Smart Oil Blend",
    "category": "Kids Care Oil Blend",
    "shortDescription": "Premium Ayurvedic wellness blend.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts.",
    "benefit": "Supports daily vitality.",
    "benefits": [],
    "ingredients": [],
    "images": [
      "/images/products/kids-smart-oil-blend.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": ""
      },
      {
        "size": "20 ml",
        "price": 349,
        "originalPrice": 499,
        "image": ""
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 5,
    "reviewCount": 12,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1 Month",
    "healthGoals": [],
    "idealFor": [],
    "usageInstructions": {
      "serving": "3 Drops",
      "timing": "Night",
      "instructions": "Apply in belly button."
    },
    "specifications": {},
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "kids-growth-oil-blend",
    "slug": "kids-growth-oil-blend",
    "name": "Kids Growth Oil Blend",
    "category": "Kids Care Oil Blend",
    "shortDescription": "Premium Ayurvedic wellness blend.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts.",
    "benefit": "Supports daily vitality.",
    "benefits": [],
    "ingredients": [],
    "images": [
      "/images/products/kids-growth-oil-blend.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": ""
      },
      {
        "size": "20 ml",
        "price": 349,
        "originalPrice": 499,
        "image": ""
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 5,
    "reviewCount": 12,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1 Month",
    "healthGoals": [],
    "idealFor": [],
    "usageInstructions": {
      "serving": "3 Drops",
      "timing": "Night",
      "instructions": "Apply in belly button."
    },
    "specifications": {},
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "kids-calm-oil-blend",
    "slug": "kids-calm-oil-blend",
    "name": "Kids Calm Oil Blend",
    "category": "Kids Care Oil Blend",
    "shortDescription": "Premium Ayurvedic wellness blend.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts.",
    "benefit": "Supports daily vitality.",
    "benefits": [],
    "ingredients": [],
    "images": [
      "/images/products/kids-calm-oil-blend.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": ""
      },
      {
        "size": "20 ml",
        "price": 349,
        "originalPrice": 499,
        "image": ""
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 5,
    "reviewCount": 12,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1 Month",
    "healthGoals": [],
    "idealFor": [],
    "usageInstructions": {
      "serving": "3 Drops",
      "timing": "Night",
      "instructions": "Apply in belly button."
    },
    "specifications": {},
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "kids-daily-care-oil-blend",
    "slug": "kids-daily-care-oil-blend",
    "name": "Kids Daily Care Oil Blend",
    "category": "Kids Care Oil Blend",
    "shortDescription": "Premium Ayurvedic wellness blend.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts.",
    "benefit": "Supports daily vitality.",
    "benefits": [],
    "ingredients": [],
    "images": [
      "/images/products/kids-daily-care-oil-blend.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": ""
      },
      {
        "size": "20 ml",
        "price": 349,
        "originalPrice": 499,
        "image": ""
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 5,
    "reviewCount": 12,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1 Month",
    "healthGoals": [],
    "idealFor": [],
    "usageInstructions": {
      "serving": "3 Drops",
      "timing": "Night",
      "instructions": "Apply in belly button."
    },
    "specifications": {},
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "men-strength-oil-blend",
    "slug": "men-strength-oil-blend",
    "name": "Men Strength Oil Blend",
    "category": "Men Wellness Oil Blend",
    "shortDescription": "Premium Ayurvedic wellness blend.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts.",
    "benefit": "Supports daily vitality.",
    "benefits": [],
    "ingredients": [],
    "images": [
      "/images/products/men-strength-oil-blend.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": ""
      },
      {
        "size": "20 ml",
        "price": 349,
        "originalPrice": 499,
        "image": ""
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 5,
    "reviewCount": 12,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1 Month",
    "healthGoals": [],
    "idealFor": [],
    "usageInstructions": {
      "serving": "3 Drops",
      "timing": "Night",
      "instructions": "Apply in belly button."
    },
    "specifications": {},
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "men-active-oil-blend",
    "slug": "men-active-oil-blend",
    "name": "Men Active Oil Blend",
    "category": "Men Wellness Oil Blend",
    "shortDescription": "Premium Ayurvedic wellness blend.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts.",
    "benefit": "Supports daily vitality.",
    "benefits": [],
    "ingredients": [],
    "images": [
      "/images/products/men-active-oil-blend.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": ""
      },
      {
        "size": "20 ml",
        "price": 349,
        "originalPrice": 499,
        "image": ""
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 5,
    "reviewCount": 12,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1 Month",
    "healthGoals": [],
    "idealFor": [],
    "usageInstructions": {
      "serving": "3 Drops",
      "timing": "Night",
      "instructions": "Apply in belly button."
    },
    "specifications": {},
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "men-heart-balance-oil-blend",
    "slug": "men-heart-balance-oil-blend",
    "name": "Men Heart Balance Oil Blend",
    "category": "Men Wellness Oil Blend",
    "shortDescription": "Premium Ayurvedic wellness blend.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts.",
    "benefit": "Supports daily vitality.",
    "benefits": [],
    "ingredients": [],
    "images": [
      "/images/products/men-heart-balance-oil-blend.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": ""
      },
      {
        "size": "20 ml",
        "price": 349,
        "originalPrice": 499,
        "image": ""
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 5,
    "reviewCount": 12,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1 Month",
    "healthGoals": [],
    "idealFor": [],
    "usageInstructions": {
      "serving": "3 Drops",
      "timing": "Night",
      "instructions": "Apply in belly button."
    },
    "specifications": {},
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "men-daily-wellness-oil-blend",
    "slug": "men-daily-wellness-oil-blend",
    "name": "Men Daily Wellness Oil Blend",
    "category": "Men Wellness Oil Blend",
    "shortDescription": "Premium Ayurvedic wellness blend.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts.",
    "benefit": "Supports daily vitality.",
    "benefits": [],
    "ingredients": [],
    "images": [
      "/images/products/men-daily-wellness-oil-blend.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": ""
      },
      {
        "size": "20 ml",
        "price": 349,
        "originalPrice": 499,
        "image": ""
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 5,
    "reviewCount": 12,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1 Month",
    "healthGoals": [],
    "idealFor": [],
    "usageInstructions": {
      "serving": "3 Drops",
      "timing": "Night",
      "instructions": "Apply in belly button."
    },
    "specifications": {},
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "women-harmony-oil-blend",
    "slug": "women-harmony-oil-blend",
    "name": "Women Harmony Oil Blend",
    "category": "Women Wellness Oil Blend",
    "shortDescription": "Premium Ayurvedic wellness blend.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts.",
    "benefit": "Supports daily vitality.",
    "benefits": [],
    "ingredients": [],
    "images": [
      "/images/products/women-harmony-oil-blend.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": ""
      },
      {
        "size": "20 ml",
        "price": 349,
        "originalPrice": 499,
        "image": ""
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 5,
    "reviewCount": 12,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1 Month",
    "healthGoals": [],
    "idealFor": [],
    "usageInstructions": {
      "serving": "3 Drops",
      "timing": "Night",
      "instructions": "Apply in belly button."
    },
    "specifications": {},
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "women-care-oil-blend",
    "slug": "women-care-oil-blend",
    "name": "Women Care Oil Blend",
    "category": "Women Wellness Oil Blend",
    "shortDescription": "Premium Ayurvedic wellness blend.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts.",
    "benefit": "Supports daily vitality.",
    "benefits": [],
    "ingredients": [],
    "images": [
      "/images/products/women-care-oil-blend.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": ""
      },
      {
        "size": "20 ml",
        "price": 349,
        "originalPrice": 499,
        "image": ""
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 5,
    "reviewCount": 12,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1 Month",
    "healthGoals": [],
    "idealFor": [],
    "usageInstructions": {
      "serving": "3 Drops",
      "timing": "Night",
      "instructions": "Apply in belly button."
    },
    "specifications": {},
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "women-glow-oil-blend",
    "slug": "women-glow-oil-blend",
    "name": "Women Glow Oil Blend",
    "category": "Women Wellness Oil Blend",
    "shortDescription": "Premium Ayurvedic wellness blend.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts.",
    "benefit": "Supports daily vitality.",
    "benefits": [],
    "ingredients": [],
    "images": [
      "/images/products/women-glow-oil-blend.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": ""
      },
      {
        "size": "20 ml",
        "price": 349,
        "originalPrice": 499,
        "image": ""
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 5,
    "reviewCount": 12,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1 Month",
    "healthGoals": [],
    "idealFor": [],
    "usageInstructions": {
      "serving": "3 Drops",
      "timing": "Night",
      "instructions": "Apply in belly button."
    },
    "specifications": {},
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "women-daily-wellness-oil-blend",
    "slug": "women-daily-wellness-oil-blend",
    "name": "Women Daily Wellness Oil Blend",
    "category": "Women Wellness Oil Blend",
    "shortDescription": "Premium Ayurvedic wellness blend.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts.",
    "benefit": "Supports daily vitality.",
    "benefits": [],
    "ingredients": [],
    "images": [
      "/images/products/women-daily-wellness-oil-blend.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": ""
      },
      {
        "size": "20 ml",
        "price": 349,
        "originalPrice": 499,
        "image": ""
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 5,
    "reviewCount": 12,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1 Month",
    "healthGoals": [],
    "idealFor": [],
    "usageInstructions": {
      "serving": "3 Drops",
      "timing": "Night",
      "instructions": "Apply in belly button."
    },
    "specifications": {},
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "senior-comfort-oil-blend",
    "slug": "senior-comfort-oil-blend",
    "name": "Senior Comfort Oil Blend",
    "category": "Senior Care Oil Blend",
    "shortDescription": "Premium Ayurvedic wellness blend.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts.",
    "benefit": "Supports daily vitality.",
    "benefits": [],
    "ingredients": [],
    "images": [
      "/images/products/senior-comfort-oil-blend.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": ""
      },
      {
        "size": "20 ml",
        "price": 349,
        "originalPrice": 499,
        "image": ""
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 5,
    "reviewCount": 12,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1 Month",
    "healthGoals": [],
    "idealFor": [],
    "usageInstructions": {
      "serving": "3 Drops",
      "timing": "Night",
      "instructions": "Apply in belly button."
    },
    "specifications": {},
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "senior-active-oil-blend",
    "slug": "senior-active-oil-blend",
    "name": "Senior Active Oil Blend",
    "category": "Senior Care Oil Blend",
    "shortDescription": "Premium Ayurvedic wellness blend.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts.",
    "benefit": "Supports daily vitality.",
    "benefits": [],
    "ingredients": [],
    "images": [
      "/images/products/senior-active-oil-blend.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": ""
      },
      {
        "size": "20 ml",
        "price": 349,
        "originalPrice": 499,
        "image": ""
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 5,
    "reviewCount": 12,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1 Month",
    "healthGoals": [],
    "idealFor": [],
    "usageInstructions": {
      "serving": "3 Drops",
      "timing": "Night",
      "instructions": "Apply in belly button."
    },
    "specifications": {},
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "senior-balance-oil-blend",
    "slug": "senior-balance-oil-blend",
    "name": "Senior Balance Oil Blend",
    "category": "Senior Care Oil Blend",
    "shortDescription": "Premium Ayurvedic wellness blend.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts.",
    "benefit": "Supports daily vitality.",
    "benefits": [],
    "ingredients": [],
    "images": [
      "/images/products/senior-balance-oil-blend.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": ""
      },
      {
        "size": "20 ml",
        "price": 349,
        "originalPrice": 499,
        "image": ""
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 5,
    "reviewCount": 12,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1 Month",
    "healthGoals": [],
    "idealFor": [],
    "usageInstructions": {
      "serving": "3 Drops",
      "timing": "Night",
      "instructions": "Apply in belly button."
    },
    "specifications": {},
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "senior-daily-wellness-oil-blend",
    "slug": "senior-daily-wellness-oil-blend",
    "name": "Senior Daily Wellness Oil Blend",
    "category": "Senior Care Oil Blend",
    "shortDescription": "Premium Ayurvedic wellness blend.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts.",
    "benefit": "Supports daily vitality.",
    "benefits": [],
    "ingredients": [],
    "images": [
      "/images/products/senior-daily-wellness-oil-blend.jpg"
    ],
    "variants": [
      {
        "size": "10 ml",
        "price": 199,
        "originalPrice": 299,
        "image": ""
      },
      {
        "size": "20 ml",
        "price": 349,
        "originalPrice": 499,
        "image": ""
      }
    ],
    "price": 199,
    "originalPrice": 299,
    "discount": 33,
    "rating": 5,
    "reviewCount": 12,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1 Month",
    "healthGoals": [],
    "idealFor": [],
    "usageInstructions": {
      "serving": "3 Drops",
      "timing": "Night",
      "instructions": "Apply in belly button."
    },
    "specifications": {},
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "body-massage-oil",
    "slug": "body-massage-oil",
    "name": "Body Massage Oil",
    "selectionType": "single",
    "category": "Body Massage Oil",
    "shortDescription": "Premium Ayurvedic wellness massage oil.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts.",
    "benefit": "Supports daily vitality.",
    "benefits": [],
    "ingredients": [],
    "images": [
      "/images/products/body-massage-oil.jpg"
    ],
    "variants": [
      { "size": "50 ml", "price": 349, "originalPrice": 499, "image": "/images/products/body-massage-oil-50ml.jpg" },
      { "size": "100 ml", "price": 599, "originalPrice": 899, "image": "/images/products/body-massage-oil-100ml.jpg" },
      { "size": "200 ml", "price": 999, "originalPrice": 1499, "image": "/images/products/body-massage-oil-200ml.jpg" }
    ],
    "price": 349,
    "originalPrice": 499,
    "discount": 30,
    "rating": 5,
    "reviewCount": 12,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Varies by usage",
    "healthGoals": [],
    "idealFor": [],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Apply and massage gently."
    },
    "specifications": {},
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "feet-massage-oil",
    "slug": "feet-massage-oil",
    "name": "Feet Massage Oil",
    "selectionType": "single",
    "category": "Feet Massage Oil",
    "shortDescription": "Premium Ayurvedic wellness massage oil.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts.",
    "benefit": "Supports daily vitality.",
    "benefits": [],
    "ingredients": [],
    "images": [
      "/images/products/feet-massage-oil.jpg"
    ],
    "variants": [
      { "size": "30 ml", "price": 399, "originalPrice": 599, "image": "/images/products/feet-massage-oil-30ml.jpg" },
      { "size": "100 ml", "price": 1199, "originalPrice": 1799, "image": "/images/products/feet-massage-oil-100ml.jpg" },
      { "size": "200 ml", "price": 2199, "originalPrice": 3299, "image": "/images/products/feet-massage-oil-200ml.jpg" }
    ],
    "price": 399,
    "originalPrice": 599,
    "discount": 33,
    "rating": 5,
    "reviewCount": 12,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Varies by usage",
    "healthGoals": [],
    "idealFor": [],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Apply and massage gently."
    },
    "specifications": {},
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "hair-wellness-oil",
    "slug": "hair-wellness-oil",
    "name": "Hair Wellness Oil",
    "selectionType": "single",
    "category": "Hair Wellness Oil",
    "shortDescription": "Premium Ayurvedic wellness massage oil.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient Ayurvedic texts.",
    "benefit": "Supports daily vitality.",
    "benefits": [],
    "ingredients": [],
    "images": [
      "/images/products/hair-wellness-oil.jpg"
    ],
    "variants": [
      { "size": "50 ml", "price": 499, "originalPrice": 699, "image": "/images/products/hair-wellness-oil-50ml.jpg" },
      { "size": "100 ml", "price": 899, "originalPrice": 1299, "image": "/images/products/hair-wellness-oil-100ml.jpg" },
      { "size": "200 ml", "price": 1799, "originalPrice": 2499, "image": "/images/products/hair-wellness-oil-200ml.jpg" }
    ],
    "price": 499,
    "originalPrice": 699,
    "discount": 29,
    "rating": 5,
    "reviewCount": 12,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Varies by usage",
    "healthGoals": [],
    "idealFor": [],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Apply and massage gently."
    },
    "specifications": {},
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "trial-wellness-pack",
    "slug": "trial-wellness-pack",
    "name": "Trial Wellness Pack",
    "selectionType": "single",
    "category": "Individual Wellness Packs",
    "shortDescription": "Premium Family Wellness Pack for holistic care.",
    "fullDescription": "Experience the timeless benefits of daily self-care together.",
    "story": "Rooted in ancient Ayurvedic texts.",
    "benefit": "Supports daily vitality for the family.",
    "benefits": [],
    "ingredients": [],
    "images": [
      "/images/products/trial-wellness-pack.jpg"
    ],
    "variants": [],
    "price": 499,
    "originalPrice": 749,
    "discount": 33,
    "rating": 5,
    "reviewCount": 12,
    "badge": "🌱 STARTER TRIAL",
    "inclusions": "• 10 ml Nabhi Wellness Oil Blend\n• 30 ml Feet Massage Oil",
    "durationText": "Up to 1 Month Wellness Care",
    "healthGoals": [],
    "idealFor": [],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Use as directed."
    },
    "specifications": {},
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "diamond-trial-wellness-pack",
    "slug": "diamond-trial-wellness-pack",
    "name": "Diamond Trial Wellness Pack",
    "selectionType": "single",
    "category": "Individual Wellness Packs",
    "shortDescription": "Premium Family Wellness Pack for holistic care.",
    "fullDescription": "Experience the timeless benefits of daily self-care together.",
    "story": "Rooted in ancient Ayurvedic texts.",
    "benefit": "Supports daily vitality for the family.",
    "benefits": [],
    "ingredients": [],
    "images": [
      "/images/products/diamond-trial-wellness-pack.jpg"
    ],
    "variants": [],
    "price": 999,
    "originalPrice": 1499,
    "discount": 33,
    "rating": 5,
    "reviewCount": 12,
    "badge": "💎 COMPLETE TRIAL",
    "inclusions": "• 10 ml Nabhi Wellness Oil Blend\n• 30 ml Feet Massage Oil\n• 100 ml Body Wellness Massage Oil",
    "durationText": "Complete 3-Step Wellness Trial",
    "healthGoals": [],
    "idealFor": [],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Use as directed."
    },
    "specifications": {},
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "gold-wellness-pack",
    "slug": "gold-wellness-pack",
    "name": "Gold Wellness Pack",
    "selectionType": "four-distinct",
    "category": "Individual Wellness Packs",
    "shortDescription": "Premium Family Wellness Pack for holistic care.",
    "fullDescription": "Experience the timeless benefits of daily self-care together.",
    "story": "Rooted in ancient Ayurvedic texts.",
    "benefit": "Supports daily vitality for the family.",
    "benefits": [],
    "ingredients": [],
    "images": [
      "/images/products/gold-wellness-pack.jpg"
    ],
    "variants": [],
    "price": 1799,
    "originalPrice": 2499,
    "discount": 28,
    "rating": 5,
    "reviewCount": 12,
    "badge": "🟡 BEST VALUE",
    "inclusions": "• 40 ml Nabhi Wellness Oil Blend (4 × 10 ml)\n• 100 ml Feet Massage Oil",
    "durationText": "Up to 4 Months Wellness Care",
    "healthGoals": [],
    "idealFor": [],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Use as directed."
    },
    "specifications": {},
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "premium-wellness-pack",
    "slug": "premium-wellness-pack",
    "name": "Premium Wellness Pack",
    "selectionType": "four-distinct",
    "category": "Individual Wellness Packs",
    "shortDescription": "Premium Family Wellness Pack for holistic care.",
    "fullDescription": "Experience the timeless benefits of daily self-care together.",
    "story": "Rooted in ancient Ayurvedic texts.",
    "benefit": "Supports daily vitality for the family.",
    "benefits": [],
    "ingredients": [],
    "images": [
      "/images/products/premium-wellness-pack.jpg"
    ],
    "variants": [],
    "price": 3299,
    "originalPrice": 4999,
    "discount": 34,
    "rating": 5,
    "reviewCount": 12,
    "badge": "💚 LONG-TERM VALUE",
    "inclusions": "• 80 ml Nabhi Wellness Oil Blend (4 × 20 ml)\n• 200 ml Feet Massage Oil",
    "durationText": "Up to 8 Months Wellness Care",
    "healthGoals": [],
    "idealFor": [],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Use as directed."
    },
    "specifications": {},
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "2-member-family-trial",
    "slug": "2-member-family-trial",
    "name": "2 Member Family Trial",
    "selectionType": "per-member",
    "memberCount": 2,
    "category": "Family Trial Wellness Packs",
    "shortDescription": "Premium Family Wellness Pack for holistic care.",
    "fullDescription": "Experience the timeless benefits of daily self-care together.",
    "story": "Rooted in ancient Ayurvedic texts.",
    "benefit": "Supports daily vitality for the family.",
    "benefits": [],
    "ingredients": [],
    "images": [
      "/images/products/2-member-family-trial.jpg"
    ],
    "variants": [],
    "price": 3199,
    "originalPrice": 4999,
    "discount": 36,
    "rating": 5,
    "reviewCount": 12,
    "badge": "👨‍👩‍👧 GOLD FAMILY VALUE",
    "inclusions": "2x Member Trial",
    "durationText": "Up to 4 Months",
    "healthGoals": [],
    "idealFor": [],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Use as directed."
    },
    "specifications": {},
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "3-member-family-trial",
    "slug": "3-member-family-trial",
    "name": "3 Member Family Trial",
    "selectionType": "per-member",
    "memberCount": 3,
    "category": "Family Trial Wellness Packs",
    "shortDescription": "Premium Family Wellness Pack for holistic care.",
    "fullDescription": "Experience the timeless benefits of daily self-care together.",
    "story": "Rooted in ancient Ayurvedic texts.",
    "benefit": "Supports daily vitality for the family.",
    "benefits": [],
    "ingredients": [],
    "images": [
      "/images/products/3-member-family-trial.jpg"
    ],
    "variants": [],
    "price": 4799,
    "originalPrice": 7499,
    "discount": 36,
    "rating": 5,
    "reviewCount": 12,
    "badge": "👨‍👩‍👧 GOLD FAMILY VALUE",
    "inclusions": "3x Member Trial",
    "durationText": "Up to 4 Months",
    "healthGoals": [],
    "idealFor": [],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Use as directed."
    },
    "specifications": {},
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "4-member-family-trial",
    "slug": "4-member-family-trial",
    "name": "4 Member Family Trial",
    "selectionType": "per-member",
    "memberCount": 4,
    "category": "Family Trial Wellness Packs",
    "shortDescription": "Premium Family Wellness Pack for holistic care.",
    "fullDescription": "Experience the timeless benefits of daily self-care together.",
    "story": "Rooted in ancient Ayurvedic texts.",
    "benefit": "Supports daily vitality for the family.",
    "benefits": [],
    "ingredients": [],
    "images": [
      "/images/products/4-member-family-trial.jpg"
    ],
    "variants": [],
    "price": 6399,
    "originalPrice": 9999,
    "discount": 36,
    "rating": 5,
    "reviewCount": 12,
    "badge": "👨‍👩‍👧 GOLD FAMILY VALUE",
    "inclusions": "4x Member Trial",
    "durationText": "Up to 4 Months",
    "healthGoals": [],
    "idealFor": [],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Use as directed."
    },
    "specifications": {},
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "5-member-family-trial",
    "slug": "5-member-family-trial",
    "name": "5 Member Family Trial",
    "selectionType": "per-member",
    "memberCount": 5,
    "category": "Family Trial Wellness Packs",
    "shortDescription": "Premium Family Wellness Pack for holistic care.",
    "fullDescription": "Experience the timeless benefits of daily self-care together.",
    "story": "Rooted in ancient Ayurvedic texts.",
    "benefit": "Supports daily vitality for the family.",
    "benefits": [],
    "ingredients": [],
    "images": [
      "/images/products/5-member-family-trial.jpg"
    ],
    "variants": [],
    "price": 7999,
    "originalPrice": 12499,
    "discount": 36,
    "rating": 5,
    "reviewCount": 12,
    "badge": "👨‍👩‍👧 GOLD FAMILY VALUE",
    "inclusions": "5x Member Trial",
    "durationText": "Up to 4 Months",
    "healthGoals": [],
    "idealFor": [],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Use as directed."
    },
    "specifications": {},
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "2-member-family-gold",
    "slug": "2-member-family-gold",
    "name": "2 Member Family Gold",
    "selectionType": "per-member",
    "memberCount": 2,
    "category": "Family Gold Wellness Packs",
    "shortDescription": "Premium Family Wellness Pack for holistic care.",
    "fullDescription": "Experience the timeless benefits of daily self-care together.",
    "story": "Rooted in ancient Ayurvedic texts.",
    "benefit": "Supports daily vitality for the family.",
    "benefits": [],
    "ingredients": [],
    "images": [
      "/images/products/2-member-family-gold.jpg"
    ],
    "variants": [],
    "price": 3999,
    "originalPrice": 5499,
    "discount": 27,
    "rating": 5,
    "reviewCount": 12,
    "badge": "👨‍👩‍👧 GOLD FAMILY VALUE",
    "inclusions": "2x Member Gold",
    "durationText": "Up to 4 Months",
    "healthGoals": [],
    "idealFor": [],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Use as directed."
    },
    "specifications": {},
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "3-member-family-gold",
    "slug": "3-member-family-gold",
    "name": "3 Member Family Gold",
    "selectionType": "per-member",
    "memberCount": 3,
    "category": "Family Gold Wellness Packs",
    "shortDescription": "Premium Family Wellness Pack for holistic care.",
    "fullDescription": "Experience the timeless benefits of daily self-care together.",
    "story": "Rooted in ancient Ayurvedic texts.",
    "benefit": "Supports daily vitality for the family.",
    "benefits": [],
    "ingredients": [],
    "images": [
      "/images/products/3-member-family-gold.jpg"
    ],
    "variants": [],
    "price": 5799,
    "originalPrice": 8249,
    "discount": 30,
    "rating": 5,
    "reviewCount": 12,
    "badge": "👨‍👩‍👧 GOLD FAMILY VALUE",
    "inclusions": "3x Member Gold",
    "durationText": "Up to 4 Months",
    "healthGoals": [],
    "idealFor": [],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Use as directed."
    },
    "specifications": {},
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "4-member-family-gold",
    "slug": "4-member-family-gold",
    "name": "4 Member Family Gold",
    "selectionType": "per-member",
    "memberCount": 4,
    "category": "Family Gold Wellness Packs",
    "shortDescription": "Premium Family Wellness Pack for holistic care.",
    "fullDescription": "Experience the timeless benefits of daily self-care together.",
    "story": "Rooted in ancient Ayurvedic texts.",
    "benefit": "Supports daily vitality for the family.",
    "benefits": [],
    "ingredients": [],
    "images": [
      "/images/products/4-member-family-gold.jpg"
    ],
    "variants": [],
    "price": 7499,
    "originalPrice": 10999,
    "discount": 32,
    "rating": 5,
    "reviewCount": 12,
    "badge": "👨‍👩‍👧 GOLD FAMILY VALUE",
    "inclusions": "4x Member Gold",
    "durationText": "Up to 4 Months",
    "healthGoals": [],
    "idealFor": [],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Use as directed."
    },
    "specifications": {},
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "5-member-family-gold",
    "slug": "5-member-family-gold",
    "name": "5 Member Family Gold",
    "selectionType": "per-member",
    "memberCount": 5,
    "category": "Family Gold Wellness Packs",
    "shortDescription": "Premium Family Wellness Pack for holistic care.",
    "fullDescription": "Experience the timeless benefits of daily self-care together.",
    "story": "Rooted in ancient Ayurvedic texts.",
    "benefit": "Supports daily vitality for the family.",
    "benefits": [],
    "ingredients": [],
    "images": [
      "/images/products/5-member-family-gold.jpg"
    ],
    "variants": [],
    "price": 8999,
    "originalPrice": 13749,
    "discount": 35,
    "rating": 5,
    "reviewCount": 12,
    "badge": "👨‍👩‍👧 GOLD FAMILY VALUE",
    "inclusions": "5x Member Gold",
    "durationText": "Up to 4 Months",
    "healthGoals": [],
    "idealFor": [],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Use as directed."
    },
    "specifications": {},
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return products.map(p => p.slug);
}
