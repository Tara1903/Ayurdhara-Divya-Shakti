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
    "shortDescription": "Gentle-feel, traditional-inspired Nabhi wellness oil care designed for children's regular personal wellness routine.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Gentle-feel, traditional-inspired Nabhi wellness oil care designed for children's regular personal wellness routine.",
    "benefits": [
      {
        "icon": "ShieldCheck",
        "text": "Traditional-inspired care"
      },
      {
        "icon": "Smile",
        "text": "Gentle-feel"
      },
      {
        "icon": "Heart",
        "text": "Everyday self-care"
      }
    ],
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
    "durationText": "Up to 1 Month Wellness Care",
    "healthGoals": [],
    "idealFor": [
      "Kids"
    ],
    "usageInstructions": {
      "serving": "3 Drops",
      "timing": "Night",
      "instructions": "Apply in belly button."
    },
    "specifications": {
      "Net Quantity": "10ml / 20ml",
      "Storage": "Store in a cool, dry place"
    },
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
    "shortDescription": "Gentle-feel, traditional-inspired Nabhi wellness oil care designed for children's regular personal wellness routine.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Gentle-feel, traditional-inspired Nabhi wellness oil care designed for children's regular personal wellness routine.",
    "benefits": [
      {
        "icon": "ShieldCheck",
        "text": "Traditional-inspired care"
      },
      {
        "icon": "Smile",
        "text": "Gentle-feel"
      },
      {
        "icon": "Heart",
        "text": "Everyday self-care"
      }
    ],
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
    "durationText": "Up to 1 Month Wellness Care",
    "healthGoals": [],
    "idealFor": [
      "Kids"
    ],
    "usageInstructions": {
      "serving": "3 Drops",
      "timing": "Night",
      "instructions": "Apply in belly button."
    },
    "specifications": {
      "Net Quantity": "10ml / 20ml",
      "Storage": "Store in a cool, dry place"
    },
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
    "shortDescription": "Gentle-feel, traditional-inspired Nabhi wellness oil care designed for children's regular personal wellness routine.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Gentle-feel, traditional-inspired Nabhi wellness oil care designed for children's regular personal wellness routine.",
    "benefits": [
      {
        "icon": "ShieldCheck",
        "text": "Traditional-inspired care"
      },
      {
        "icon": "Smile",
        "text": "Gentle-feel"
      },
      {
        "icon": "Heart",
        "text": "Everyday self-care"
      }
    ],
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
    "durationText": "Up to 1 Month Wellness Care",
    "healthGoals": [],
    "idealFor": [
      "Kids"
    ],
    "usageInstructions": {
      "serving": "3 Drops",
      "timing": "Night",
      "instructions": "Apply in belly button."
    },
    "specifications": {
      "Net Quantity": "10ml / 20ml",
      "Storage": "Store in a cool, dry place"
    },
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
    "shortDescription": "Gentle-feel, traditional-inspired Nabhi wellness oil care designed for children's regular personal wellness routine.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Gentle-feel, traditional-inspired Nabhi wellness oil care designed for children's regular personal wellness routine.",
    "benefits": [
      {
        "icon": "ShieldCheck",
        "text": "Traditional-inspired care"
      },
      {
        "icon": "Smile",
        "text": "Gentle-feel"
      },
      {
        "icon": "Heart",
        "text": "Everyday self-care"
      }
    ],
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
    "durationText": "Up to 1 Month Wellness Care",
    "healthGoals": [],
    "idealFor": [
      "Kids"
    ],
    "usageInstructions": {
      "serving": "3 Drops",
      "timing": "Night",
      "instructions": "Apply in belly button."
    },
    "specifications": {
      "Net Quantity": "10ml / 20ml",
      "Storage": "Store in a cool, dry place"
    },
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
    "shortDescription": "Men's traditional-inspired Nabhi wellness oil routine focused on everyday self-care and personal wellness.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Men's traditional-inspired Nabhi wellness oil routine focused on everyday self-care and personal wellness.",
    "benefits": [
      {
        "icon": "ShieldCheck",
        "text": "Traditional-inspired care"
      },
      {
        "icon": "Heart",
        "text": "Everyday self-care"
      }
    ],
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
    "reviewCount": 15,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1 Month Wellness Care",
    "healthGoals": [],
    "idealFor": [
      "Men"
    ],
    "usageInstructions": {
      "serving": "3 Drops",
      "timing": "Night",
      "instructions": "Apply in belly button."
    },
    "specifications": {
      "Net Quantity": "10ml / 20ml",
      "Storage": "Store in a cool, dry place"
    },
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
    "shortDescription": "Men's traditional-inspired Nabhi wellness oil routine focused on everyday self-care and personal wellness.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Men's traditional-inspired Nabhi wellness oil routine focused on everyday self-care and personal wellness.",
    "benefits": [
      {
        "icon": "ShieldCheck",
        "text": "Traditional-inspired care"
      },
      {
        "icon": "Heart",
        "text": "Everyday self-care"
      }
    ],
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
    "reviewCount": 15,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1 Month Wellness Care",
    "healthGoals": [],
    "idealFor": [
      "Men"
    ],
    "usageInstructions": {
      "serving": "3 Drops",
      "timing": "Night",
      "instructions": "Apply in belly button."
    },
    "specifications": {
      "Net Quantity": "10ml / 20ml",
      "Storage": "Store in a cool, dry place"
    },
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
    "shortDescription": "Men's traditional-inspired Nabhi wellness oil routine focused on everyday self-care and personal wellness.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Men's traditional-inspired Nabhi wellness oil routine focused on everyday self-care and personal wellness.",
    "benefits": [
      {
        "icon": "ShieldCheck",
        "text": "Traditional-inspired care"
      },
      {
        "icon": "Heart",
        "text": "Everyday self-care"
      }
    ],
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
    "reviewCount": 15,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1 Month Wellness Care",
    "healthGoals": [],
    "idealFor": [
      "Men"
    ],
    "usageInstructions": {
      "serving": "3 Drops",
      "timing": "Night",
      "instructions": "Apply in belly button."
    },
    "specifications": {
      "Net Quantity": "10ml / 20ml",
      "Storage": "Store in a cool, dry place"
    },
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
    "shortDescription": "Men's traditional-inspired Nabhi wellness oil routine focused on everyday self-care and personal wellness.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Men's traditional-inspired Nabhi wellness oil routine focused on everyday self-care and personal wellness.",
    "benefits": [
      {
        "icon": "ShieldCheck",
        "text": "Traditional-inspired care"
      },
      {
        "icon": "Heart",
        "text": "Everyday self-care"
      }
    ],
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
    "reviewCount": 15,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1 Month Wellness Care",
    "healthGoals": [],
    "idealFor": [
      "Men"
    ],
    "usageInstructions": {
      "serving": "3 Drops",
      "timing": "Night",
      "instructions": "Apply in belly button."
    },
    "specifications": {
      "Net Quantity": "10ml / 20ml",
      "Storage": "Store in a cool, dry place"
    },
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
    "shortDescription": "Women's traditional-inspired Nabhi oil-care routine designed for simple everyday personal wellness.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Women's traditional-inspired Nabhi oil-care routine designed for simple everyday personal wellness.",
    "benefits": [
      {
        "icon": "ShieldCheck",
        "text": "Traditional-inspired care"
      },
      {
        "icon": "Heart",
        "text": "Everyday self-care"
      }
    ],
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
    "reviewCount": 22,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1 Month Wellness Care",
    "healthGoals": [],
    "idealFor": [
      "Women"
    ],
    "usageInstructions": {
      "serving": "3 Drops",
      "timing": "Night",
      "instructions": "Apply in belly button."
    },
    "specifications": {
      "Net Quantity": "10ml / 20ml",
      "Storage": "Store in a cool, dry place"
    },
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
    "shortDescription": "Women's traditional-inspired Nabhi oil-care routine designed for simple everyday personal wellness.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Women's traditional-inspired Nabhi oil-care routine designed for simple everyday personal wellness.",
    "benefits": [
      {
        "icon": "ShieldCheck",
        "text": "Traditional-inspired care"
      },
      {
        "icon": "Heart",
        "text": "Everyday self-care"
      }
    ],
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
    "reviewCount": 22,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1 Month Wellness Care",
    "healthGoals": [],
    "idealFor": [
      "Women"
    ],
    "usageInstructions": {
      "serving": "3 Drops",
      "timing": "Night",
      "instructions": "Apply in belly button."
    },
    "specifications": {
      "Net Quantity": "10ml / 20ml",
      "Storage": "Store in a cool, dry place"
    },
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
    "shortDescription": "Women's traditional-inspired Nabhi oil-care routine designed for simple everyday personal wellness.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Women's traditional-inspired Nabhi oil-care routine designed for simple everyday personal wellness.",
    "benefits": [
      {
        "icon": "ShieldCheck",
        "text": "Traditional-inspired care"
      },
      {
        "icon": "Heart",
        "text": "Everyday self-care"
      }
    ],
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
    "reviewCount": 22,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1 Month Wellness Care",
    "healthGoals": [],
    "idealFor": [
      "Women"
    ],
    "usageInstructions": {
      "serving": "3 Drops",
      "timing": "Night",
      "instructions": "Apply in belly button."
    },
    "specifications": {
      "Net Quantity": "10ml / 20ml",
      "Storage": "Store in a cool, dry place"
    },
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
    "shortDescription": "Women's traditional-inspired Nabhi oil-care routine designed for simple everyday personal wellness.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Women's traditional-inspired Nabhi oil-care routine designed for simple everyday personal wellness.",
    "benefits": [
      {
        "icon": "ShieldCheck",
        "text": "Traditional-inspired care"
      },
      {
        "icon": "Heart",
        "text": "Everyday self-care"
      }
    ],
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
    "reviewCount": 22,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1 Month Wellness Care",
    "healthGoals": [],
    "idealFor": [
      "Women"
    ],
    "usageInstructions": {
      "serving": "3 Drops",
      "timing": "Night",
      "instructions": "Apply in belly button."
    },
    "specifications": {
      "Net Quantity": "10ml / 20ml",
      "Storage": "Store in a cool, dry place"
    },
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
    "shortDescription": "Comfort-focused, traditional-inspired Nabhi oil-care routine for senior personal wellness.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Comfort-focused, traditional-inspired Nabhi oil-care routine for senior personal wellness.",
    "benefits": [
      {
        "icon": "ShieldCheck",
        "text": "Traditional-inspired care"
      },
      {
        "icon": "Heart",
        "text": "Comfort-focused"
      }
    ],
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
    "reviewCount": 18,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1 Month Wellness Care",
    "healthGoals": [],
    "idealFor": [
      "Seniors"
    ],
    "usageInstructions": {
      "serving": "3 Drops",
      "timing": "Night",
      "instructions": "Apply in belly button."
    },
    "specifications": {
      "Net Quantity": "10ml / 20ml",
      "Storage": "Store in a cool, dry place"
    },
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
    "shortDescription": "Comfort-focused, traditional-inspired Nabhi oil-care routine for senior personal wellness.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Comfort-focused, traditional-inspired Nabhi oil-care routine for senior personal wellness.",
    "benefits": [
      {
        "icon": "ShieldCheck",
        "text": "Traditional-inspired care"
      },
      {
        "icon": "Heart",
        "text": "Comfort-focused"
      }
    ],
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
    "reviewCount": 18,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1 Month Wellness Care",
    "healthGoals": [],
    "idealFor": [
      "Seniors"
    ],
    "usageInstructions": {
      "serving": "3 Drops",
      "timing": "Night",
      "instructions": "Apply in belly button."
    },
    "specifications": {
      "Net Quantity": "10ml / 20ml",
      "Storage": "Store in a cool, dry place"
    },
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
    "shortDescription": "Comfort-focused, traditional-inspired Nabhi oil-care routine for senior personal wellness.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Comfort-focused, traditional-inspired Nabhi oil-care routine for senior personal wellness.",
    "benefits": [
      {
        "icon": "ShieldCheck",
        "text": "Traditional-inspired care"
      },
      {
        "icon": "Heart",
        "text": "Comfort-focused"
      }
    ],
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
    "reviewCount": 18,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1 Month Wellness Care",
    "healthGoals": [],
    "idealFor": [
      "Seniors"
    ],
    "usageInstructions": {
      "serving": "3 Drops",
      "timing": "Night",
      "instructions": "Apply in belly button."
    },
    "specifications": {
      "Net Quantity": "10ml / 20ml",
      "Storage": "Store in a cool, dry place"
    },
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
    "shortDescription": "Comfort-focused, traditional-inspired Nabhi oil-care routine for senior personal wellness.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Comfort-focused, traditional-inspired Nabhi oil-care routine for senior personal wellness.",
    "benefits": [
      {
        "icon": "ShieldCheck",
        "text": "Traditional-inspired care"
      },
      {
        "icon": "Heart",
        "text": "Comfort-focused"
      }
    ],
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
    "reviewCount": 18,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1 Month Wellness Care",
    "healthGoals": [],
    "idealFor": [
      "Seniors"
    ],
    "usageInstructions": {
      "serving": "3 Drops",
      "timing": "Night",
      "instructions": "Apply in belly button."
    },
    "specifications": {
      "Net Quantity": "10ml / 20ml",
      "Storage": "Store in a cool, dry place"
    },
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "kids-foot-comfort-oil",
    "slug": "kids-foot-comfort-oil",
    "name": "Kids Foot Comfort Oil",
    "category": "Feet Massage Oil",
    "shortDescription": "Relaxing-feel routine and traditional-inspired foot care for easy application and everyday personal wellness.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Relaxing-feel routine and traditional-inspired foot care for easy application and everyday personal wellness.",
    "benefits": [
      {
        "icon": "ShieldCheck",
        "text": "Foot massage"
      },
      {
        "icon": "Heart",
        "text": "Relaxing-feel routine"
      },
      {
        "icon": "Check",
        "text": "Traditional-inspired foot care"
      },
      {
        "icon": "Check",
        "text": "Easy application"
      },
      {
        "icon": "Check",
        "text": "Everyday personal wellness"
      }
    ],
    "ingredients": [],
    "images": [
      "/images/products/kids-foot-comfort-oil.jpg"
    ],
    "variants": [
      {
        "size": "30 ml",
        "price": 399,
        "originalPrice": 599,
        "image": ""
      },
      {
        "size": "100 ml",
        "price": 1199,
        "originalPrice": 1799,
        "image": ""
      },
      {
        "size": "200 ml",
        "price": 2199,
        "originalPrice": 3299,
        "image": ""
      }
    ],
    "price": 399,
    "originalPrice": 599,
    "discount": 33,
    "rating": 5,
    "reviewCount": 10,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1-3 Months Wellness Care",
    "healthGoals": [],
    "idealFor": [
      "All"
    ],
    "usageInstructions": {
      "serving": "Few Drops",
      "timing": "Night",
      "instructions": "Massage on feet."
    },
    "specifications": {
      "Net Quantity": "30ml / 100ml / 200ml",
      "Storage": "Store in a cool, dry place"
    },
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "men-active-foot-wellness-oil",
    "slug": "men-active-foot-wellness-oil",
    "name": "Men Active Foot Wellness Oil",
    "category": "Feet Massage Oil",
    "shortDescription": "Relaxing-feel routine and traditional-inspired foot care for easy application and everyday personal wellness.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Relaxing-feel routine and traditional-inspired foot care for easy application and everyday personal wellness.",
    "benefits": [
      {
        "icon": "ShieldCheck",
        "text": "Foot massage"
      },
      {
        "icon": "Heart",
        "text": "Relaxing-feel routine"
      },
      {
        "icon": "Check",
        "text": "Traditional-inspired foot care"
      },
      {
        "icon": "Check",
        "text": "Easy application"
      },
      {
        "icon": "Check",
        "text": "Everyday personal wellness"
      }
    ],
    "ingredients": [],
    "images": [
      "/images/products/men-active-foot-wellness-oil.jpg"
    ],
    "variants": [
      {
        "size": "30 ml",
        "price": 399,
        "originalPrice": 599,
        "image": ""
      },
      {
        "size": "100 ml",
        "price": 1199,
        "originalPrice": 1799,
        "image": ""
      },
      {
        "size": "200 ml",
        "price": 2199,
        "originalPrice": 3299,
        "image": ""
      }
    ],
    "price": 399,
    "originalPrice": 599,
    "discount": 33,
    "rating": 5,
    "reviewCount": 10,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1-3 Months Wellness Care",
    "healthGoals": [],
    "idealFor": [
      "All"
    ],
    "usageInstructions": {
      "serving": "Few Drops",
      "timing": "Night",
      "instructions": "Massage on feet."
    },
    "specifications": {
      "Net Quantity": "30ml / 100ml / 200ml",
      "Storage": "Store in a cool, dry place"
    },
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "women-foot-harmony-oil",
    "slug": "women-foot-harmony-oil",
    "name": "Women Foot Harmony Oil",
    "category": "Feet Massage Oil",
    "shortDescription": "Relaxing-feel routine and traditional-inspired foot care for easy application and everyday personal wellness.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Relaxing-feel routine and traditional-inspired foot care for easy application and everyday personal wellness.",
    "benefits": [
      {
        "icon": "ShieldCheck",
        "text": "Foot massage"
      },
      {
        "icon": "Heart",
        "text": "Relaxing-feel routine"
      },
      {
        "icon": "Check",
        "text": "Traditional-inspired foot care"
      },
      {
        "icon": "Check",
        "text": "Easy application"
      },
      {
        "icon": "Check",
        "text": "Everyday personal wellness"
      }
    ],
    "ingredients": [],
    "images": [
      "/images/products/women-foot-harmony-oil.jpg"
    ],
    "variants": [
      {
        "size": "30 ml",
        "price": 399,
        "originalPrice": 599,
        "image": ""
      },
      {
        "size": "100 ml",
        "price": 1199,
        "originalPrice": 1799,
        "image": ""
      },
      {
        "size": "200 ml",
        "price": 2199,
        "originalPrice": 3299,
        "image": ""
      }
    ],
    "price": 399,
    "originalPrice": 599,
    "discount": 33,
    "rating": 5,
    "reviewCount": 10,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1-3 Months Wellness Care",
    "healthGoals": [],
    "idealFor": [
      "All"
    ],
    "usageInstructions": {
      "serving": "Few Drops",
      "timing": "Night",
      "instructions": "Massage on feet."
    },
    "specifications": {
      "Net Quantity": "30ml / 100ml / 200ml",
      "Storage": "Store in a cool, dry place"
    },
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "senior-foot-comfort-oil",
    "slug": "senior-foot-comfort-oil",
    "name": "Senior Foot Comfort Oil",
    "category": "Feet Massage Oil",
    "shortDescription": "Relaxing-feel routine and traditional-inspired foot care for easy application and everyday personal wellness.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Relaxing-feel routine and traditional-inspired foot care for easy application and everyday personal wellness.",
    "benefits": [
      {
        "icon": "ShieldCheck",
        "text": "Foot massage"
      },
      {
        "icon": "Heart",
        "text": "Relaxing-feel routine"
      },
      {
        "icon": "Check",
        "text": "Traditional-inspired foot care"
      },
      {
        "icon": "Check",
        "text": "Easy application"
      },
      {
        "icon": "Check",
        "text": "Everyday personal wellness"
      }
    ],
    "ingredients": [],
    "images": [
      "/images/products/senior-foot-comfort-oil.jpg"
    ],
    "variants": [
      {
        "size": "30 ml",
        "price": 399,
        "originalPrice": 599,
        "image": ""
      },
      {
        "size": "100 ml",
        "price": 1199,
        "originalPrice": 1799,
        "image": ""
      },
      {
        "size": "200 ml",
        "price": 2199,
        "originalPrice": 3299,
        "image": ""
      }
    ],
    "price": 399,
    "originalPrice": 599,
    "discount": 33,
    "rating": 5,
    "reviewCount": 10,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1-3 Months Wellness Care",
    "healthGoals": [],
    "idealFor": [
      "All"
    ],
    "usageInstructions": {
      "serving": "Few Drops",
      "timing": "Night",
      "instructions": "Massage on feet."
    },
    "specifications": {
      "Net Quantity": "30ml / 100ml / 200ml",
      "Storage": "Store in a cool, dry place"
    },
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "kids-gentle-body-wellness-oil",
    "slug": "kids-gentle-body-wellness-oil",
    "name": "Kids Gentle Body Wellness Oil",
    "category": "Body Massage Oil",
    "shortDescription": "Traditional-inspired oil care offering a nourishing-feel full-body massage experience for personal self-care.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Traditional-inspired oil care offering a nourishing-feel full-body massage experience for personal self-care.",
    "benefits": [
      {
        "icon": "ShieldCheck",
        "text": "Full-body massage"
      },
      {
        "icon": "Check",
        "text": "Traditional-inspired oil care"
      },
      {
        "icon": "Heart",
        "text": "Nourishing-feel massage experience"
      },
      {
        "icon": "Check",
        "text": "Personal self-care"
      }
    ],
    "ingredients": [],
    "images": [
      "/images/products/kids-gentle-body-wellness-oil.jpg"
    ],
    "variants": [
      {
        "size": "50 ml",
        "price": 349,
        "originalPrice": 499,
        "image": ""
      },
      {
        "size": "100 ml",
        "price": 599,
        "originalPrice": 899,
        "image": ""
      },
      {
        "size": "200 ml",
        "price": 999,
        "originalPrice": 1499,
        "image": ""
      }
    ],
    "price": 349,
    "originalPrice": 499,
    "discount": 30,
    "rating": 5,
    "reviewCount": 14,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1-3 Months Wellness Care",
    "healthGoals": [],
    "idealFor": [
      "All"
    ],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Anytime",
      "instructions": "Massage gently on body."
    },
    "specifications": {
      "Net Quantity": "50ml / 100ml / 200ml",
      "Storage": "Store in a cool, dry place"
    },
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "men-active-body-wellness-oil",
    "slug": "men-active-body-wellness-oil",
    "name": "Men Active Body Wellness Oil",
    "category": "Body Massage Oil",
    "shortDescription": "Traditional-inspired oil care offering a nourishing-feel full-body massage experience for personal self-care.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Traditional-inspired oil care offering a nourishing-feel full-body massage experience for personal self-care.",
    "benefits": [
      {
        "icon": "ShieldCheck",
        "text": "Full-body massage"
      },
      {
        "icon": "Check",
        "text": "Traditional-inspired oil care"
      },
      {
        "icon": "Heart",
        "text": "Nourishing-feel massage experience"
      },
      {
        "icon": "Check",
        "text": "Personal self-care"
      }
    ],
    "ingredients": [],
    "images": [
      "/images/products/men-active-body-wellness-oil.jpg"
    ],
    "variants": [
      {
        "size": "50 ml",
        "price": 349,
        "originalPrice": 499,
        "image": ""
      },
      {
        "size": "100 ml",
        "price": 599,
        "originalPrice": 899,
        "image": ""
      },
      {
        "size": "200 ml",
        "price": 999,
        "originalPrice": 1499,
        "image": ""
      }
    ],
    "price": 349,
    "originalPrice": 499,
    "discount": 30,
    "rating": 5,
    "reviewCount": 14,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1-3 Months Wellness Care",
    "healthGoals": [],
    "idealFor": [
      "All"
    ],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Anytime",
      "instructions": "Massage gently on body."
    },
    "specifications": {
      "Net Quantity": "50ml / 100ml / 200ml",
      "Storage": "Store in a cool, dry place"
    },
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "women-harmony-body-wellness-oil",
    "slug": "women-harmony-body-wellness-oil",
    "name": "Women Harmony Body Wellness Oil",
    "category": "Body Massage Oil",
    "shortDescription": "Traditional-inspired oil care offering a nourishing-feel full-body massage experience for personal self-care.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Traditional-inspired oil care offering a nourishing-feel full-body massage experience for personal self-care.",
    "benefits": [
      {
        "icon": "ShieldCheck",
        "text": "Full-body massage"
      },
      {
        "icon": "Check",
        "text": "Traditional-inspired oil care"
      },
      {
        "icon": "Heart",
        "text": "Nourishing-feel massage experience"
      },
      {
        "icon": "Check",
        "text": "Personal self-care"
      }
    ],
    "ingredients": [],
    "images": [
      "/images/products/women-harmony-body-wellness-oil.jpg"
    ],
    "variants": [
      {
        "size": "50 ml",
        "price": 349,
        "originalPrice": 499,
        "image": ""
      },
      {
        "size": "100 ml",
        "price": 599,
        "originalPrice": 899,
        "image": ""
      },
      {
        "size": "200 ml",
        "price": 999,
        "originalPrice": 1499,
        "image": ""
      }
    ],
    "price": 349,
    "originalPrice": 499,
    "discount": 30,
    "rating": 5,
    "reviewCount": 14,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1-3 Months Wellness Care",
    "healthGoals": [],
    "idealFor": [
      "All"
    ],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Anytime",
      "instructions": "Massage gently on body."
    },
    "specifications": {
      "Net Quantity": "50ml / 100ml / 200ml",
      "Storage": "Store in a cool, dry place"
    },
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "senior-comfort-body-wellness-oil",
    "slug": "senior-comfort-body-wellness-oil",
    "name": "Senior Comfort Body Wellness Oil",
    "category": "Body Massage Oil",
    "shortDescription": "Traditional-inspired oil care offering a nourishing-feel full-body massage experience for personal self-care.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Traditional-inspired oil care offering a nourishing-feel full-body massage experience for personal self-care.",
    "benefits": [
      {
        "icon": "ShieldCheck",
        "text": "Full-body massage"
      },
      {
        "icon": "Check",
        "text": "Traditional-inspired oil care"
      },
      {
        "icon": "Heart",
        "text": "Nourishing-feel massage experience"
      },
      {
        "icon": "Check",
        "text": "Personal self-care"
      }
    ],
    "ingredients": [],
    "images": [
      "/images/products/senior-comfort-body-wellness-oil.jpg"
    ],
    "variants": [
      {
        "size": "50 ml",
        "price": 349,
        "originalPrice": 499,
        "image": ""
      },
      {
        "size": "100 ml",
        "price": 599,
        "originalPrice": 899,
        "image": ""
      },
      {
        "size": "200 ml",
        "price": 999,
        "originalPrice": 1499,
        "image": ""
      }
    ],
    "price": 349,
    "originalPrice": 499,
    "discount": 30,
    "rating": 5,
    "reviewCount": 14,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1-3 Months Wellness Care",
    "healthGoals": [],
    "idealFor": [
      "All"
    ],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Anytime",
      "instructions": "Massage gently on body."
    },
    "specifications": {
      "Net Quantity": "50ml / 100ml / 200ml",
      "Storage": "Store in a cool, dry place"
    },
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "kids-gentle-hair-wellness-oil",
    "slug": "kids-gentle-hair-wellness-oil",
    "name": "Kids Gentle Hair Wellness Oil",
    "category": "Hair Wellness Oil",
    "shortDescription": "Traditional-inspired hair care with a nourishing-feel oil application for a regular grooming routine.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Traditional-inspired hair care with a nourishing-feel oil application for a regular grooming routine.",
    "benefits": [
      {
        "icon": "Check",
        "text": "Traditional-inspired hair care"
      },
      {
        "icon": "Check",
        "text": "Regular grooming routine"
      },
      {
        "icon": "Heart",
        "text": "Nourishing-feel oil application"
      },
      {
        "icon": "Check",
        "text": "Easy massage/application"
      }
    ],
    "ingredients": [],
    "images": [
      "/images/products/kids-gentle-hair-wellness-oil.jpg"
    ],
    "variants": [
      {
        "size": "50 ml",
        "price": 499,
        "originalPrice": 699,
        "image": ""
      },
      {
        "size": "100 ml",
        "price": 899,
        "originalPrice": 1299,
        "image": ""
      },
      {
        "size": "200 ml",
        "price": 1799,
        "originalPrice": 2499,
        "image": ""
      }
    ],
    "price": 499,
    "originalPrice": 699,
    "discount": 29,
    "rating": 5,
    "reviewCount": 20,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1-3 Months Wellness Care",
    "healthGoals": [],
    "idealFor": [
      "All"
    ],
    "usageInstructions": {
      "serving": "Few Drops",
      "timing": "Anytime",
      "instructions": "Massage on scalp."
    },
    "specifications": {
      "Net Quantity": "50ml / 100ml / 200ml",
      "Storage": "Store in a cool, dry place"
    },
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "men-hair-strength-wellness-oil",
    "slug": "men-hair-strength-wellness-oil",
    "name": "Men Hair Strength Wellness Oil",
    "category": "Hair Wellness Oil",
    "shortDescription": "Traditional-inspired hair care with a nourishing-feel oil application for a regular grooming routine.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Traditional-inspired hair care with a nourishing-feel oil application for a regular grooming routine.",
    "benefits": [
      {
        "icon": "Check",
        "text": "Traditional-inspired hair care"
      },
      {
        "icon": "Check",
        "text": "Regular grooming routine"
      },
      {
        "icon": "Heart",
        "text": "Nourishing-feel oil application"
      },
      {
        "icon": "Check",
        "text": "Easy massage/application"
      }
    ],
    "ingredients": [],
    "images": [
      "/images/products/men-hair-strength-wellness-oil.jpg"
    ],
    "variants": [
      {
        "size": "50 ml",
        "price": 499,
        "originalPrice": 699,
        "image": ""
      },
      {
        "size": "100 ml",
        "price": 899,
        "originalPrice": 1299,
        "image": ""
      },
      {
        "size": "200 ml",
        "price": 1799,
        "originalPrice": 2499,
        "image": ""
      }
    ],
    "price": 499,
    "originalPrice": 699,
    "discount": 29,
    "rating": 5,
    "reviewCount": 20,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1-3 Months Wellness Care",
    "healthGoals": [],
    "idealFor": [
      "All"
    ],
    "usageInstructions": {
      "serving": "Few Drops",
      "timing": "Anytime",
      "instructions": "Massage on scalp."
    },
    "specifications": {
      "Net Quantity": "50ml / 100ml / 200ml",
      "Storage": "Store in a cool, dry place"
    },
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "women-hair-harmony-wellness-oil",
    "slug": "women-hair-harmony-wellness-oil",
    "name": "Women Hair Harmony Wellness Oil",
    "category": "Hair Wellness Oil",
    "shortDescription": "Traditional-inspired hair care with a nourishing-feel oil application for a regular grooming routine.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Traditional-inspired hair care with a nourishing-feel oil application for a regular grooming routine.",
    "benefits": [
      {
        "icon": "Check",
        "text": "Traditional-inspired hair care"
      },
      {
        "icon": "Check",
        "text": "Regular grooming routine"
      },
      {
        "icon": "Heart",
        "text": "Nourishing-feel oil application"
      },
      {
        "icon": "Check",
        "text": "Easy massage/application"
      }
    ],
    "ingredients": [],
    "images": [
      "/images/products/women-hair-harmony-wellness-oil.jpg"
    ],
    "variants": [
      {
        "size": "50 ml",
        "price": 499,
        "originalPrice": 699,
        "image": ""
      },
      {
        "size": "100 ml",
        "price": 899,
        "originalPrice": 1299,
        "image": ""
      },
      {
        "size": "200 ml",
        "price": 1799,
        "originalPrice": 2499,
        "image": ""
      }
    ],
    "price": 499,
    "originalPrice": 699,
    "discount": 29,
    "rating": 5,
    "reviewCount": 20,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1-3 Months Wellness Care",
    "healthGoals": [],
    "idealFor": [
      "All"
    ],
    "usageInstructions": {
      "serving": "Few Drops",
      "timing": "Anytime",
      "instructions": "Massage on scalp."
    },
    "specifications": {
      "Net Quantity": "50ml / 100ml / 200ml",
      "Storage": "Store in a cool, dry place"
    },
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "senior-hair-care-wellness-oil",
    "slug": "senior-hair-care-wellness-oil",
    "name": "Senior Hair Care Wellness Oil",
    "category": "Hair Wellness Oil",
    "shortDescription": "Traditional-inspired hair care with a nourishing-feel oil application for a regular grooming routine.",
    "fullDescription": "Experience the timeless benefits of daily self-care.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Traditional-inspired hair care with a nourishing-feel oil application for a regular grooming routine.",
    "benefits": [
      {
        "icon": "Check",
        "text": "Traditional-inspired hair care"
      },
      {
        "icon": "Check",
        "text": "Regular grooming routine"
      },
      {
        "icon": "Heart",
        "text": "Nourishing-feel oil application"
      },
      {
        "icon": "Check",
        "text": "Easy massage/application"
      }
    ],
    "ingredients": [],
    "images": [
      "/images/products/senior-hair-care-wellness-oil.jpg"
    ],
    "variants": [
      {
        "size": "50 ml",
        "price": 499,
        "originalPrice": 699,
        "image": ""
      },
      {
        "size": "100 ml",
        "price": 899,
        "originalPrice": 1299,
        "image": ""
      },
      {
        "size": "200 ml",
        "price": 1799,
        "originalPrice": 2499,
        "image": ""
      }
    ],
    "price": 499,
    "originalPrice": 699,
    "discount": 29,
    "rating": 5,
    "reviewCount": 20,
    "badge": "100% NATURAL",
    "inclusions": "1x Bottle",
    "durationText": "Up to 1-3 Months Wellness Care",
    "healthGoals": [],
    "idealFor": [
      "All"
    ],
    "usageInstructions": {
      "serving": "Few Drops",
      "timing": "Anytime",
      "instructions": "Massage on scalp."
    },
    "specifications": {
      "Net Quantity": "50ml / 100ml / 200ml",
      "Storage": "Store in a cool, dry place"
    },
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "individual-trial-wellness-pack",
    "slug": "individual-trial-wellness-pack",
    "name": "Individual Trial Wellness Pack",
    "category": "Individual Trial Wellness Pack",
    "shortDescription": "10 ml Nabhi Wellness Oil + 30 ml Feet Massage Oil. 40 ml total volume. Up to 1 Month Wellness Care",
    "fullDescription": "A complete wellness routine in one convenient pack.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "10 ml Nabhi Wellness Oil + 30 ml Feet Massage Oil. 40 ml total volume. Up to 1 Month Wellness Care",
    "benefits": [
      {
        "icon": "Check",
        "text": "10 ml Nabhi Wellness Oil + 30 ml Feet Massage Oil"
      },
      {
        "icon": "Check",
        "text": "40 ml"
      },
      {
        "icon": "Check",
        "text": "Up to 1 Month Wellness Care"
      }
    ],
    "ingredients": [],
    "images": [
      "/images/products/individual-trial-wellness-pack.jpg"
    ],
    "variants": [
      {
        "size": "Pack",
        "price": 499,
        "originalPrice": 749,
        "image": ""
      }
    ],
    "price": 499,
    "originalPrice": 749,
    "discount": 33,
    "rating": 5,
    "reviewCount": 25,
    "badge": "100% NATURAL",
    "inclusions": "10 ml Nabhi Wellness Oil + 30 ml Feet Massage Oil",
    "durationText": "Up to 1 Month Wellness Care",
    "totalQuantityMl": "40 ml",
    "selectionType": "single",
    "memberCount": 1,
    "healthGoals": [],
    "idealFor": [
      "All"
    ],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Use as part of personal wellness routine."
    },
    "specifications": {
      "Net Quantity": "40 ml",
      "Storage": "Store in a cool, dry place"
    },
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
    "category": "Diamond Trial Wellness Pack",
    "shortDescription": "10 ml Nabhi Wellness Oil + 30 ml Feet Massage Oil + 100 ml Body Massage Oil. 140 ml total volume. Up to 1 Month Wellness Care",
    "fullDescription": "A complete wellness routine in one convenient pack.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "10 ml Nabhi Wellness Oil + 30 ml Feet Massage Oil + 100 ml Body Massage Oil. 140 ml total volume. Up to 1 Month Wellness Care",
    "benefits": [
      {
        "icon": "Check",
        "text": "10 ml Nabhi Wellness Oil + 30 ml Feet Massage Oil + 100 ml Body Massage Oil"
      },
      {
        "icon": "Check",
        "text": "140 ml"
      },
      {
        "icon": "Check",
        "text": "Up to 1 Month Wellness Care"
      }
    ],
    "ingredients": [],
    "images": [
      "/images/products/diamond-trial-wellness-pack.jpg"
    ],
    "variants": [
      {
        "size": "Pack",
        "price": 999,
        "originalPrice": 1499,
        "image": ""
      }
    ],
    "price": 999,
    "originalPrice": 1499,
    "discount": 33,
    "rating": 5,
    "reviewCount": 25,
    "badge": "100% NATURAL",
    "inclusions": "10 ml Nabhi Wellness Oil + 30 ml Feet Massage Oil + 100 ml Body Massage Oil",
    "durationText": "Up to 1 Month Wellness Care",
    "totalQuantityMl": "140 ml",
    "selectionType": "single",
    "memberCount": 1,
    "healthGoals": [],
    "idealFor": [
      "All"
    ],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Use as part of personal wellness routine."
    },
    "specifications": {
      "Net Quantity": "140 ml",
      "Storage": "Store in a cool, dry place"
    },
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "individual-gold-wellness-pack",
    "slug": "individual-gold-wellness-pack",
    "name": "Individual Gold Wellness Pack",
    "category": "Individual Gold Wellness Pack",
    "shortDescription": "4 x 10 ml Nabhi Oil Blends + 100 ml Feet Massage Oil. 140 ml total volume. Up to 4 Months Wellness Care",
    "fullDescription": "A complete wellness routine in one convenient pack.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "4 x 10 ml Nabhi Oil Blends + 100 ml Feet Massage Oil. 140 ml total volume. Up to 4 Months Wellness Care",
    "benefits": [
      {
        "icon": "Check",
        "text": "4 x 10 ml Nabhi Oil Blends + 100 ml Feet Massage Oil"
      },
      {
        "icon": "Check",
        "text": "140 ml"
      },
      {
        "icon": "Check",
        "text": "Up to 4 Months Wellness Care"
      }
    ],
    "ingredients": [],
    "images": [
      "/images/products/individual-gold-wellness-pack.jpg"
    ],
    "variants": [
      {
        "size": "Pack",
        "price": 1799,
        "originalPrice": 2499,
        "image": ""
      }
    ],
    "price": 1799,
    "originalPrice": 2499,
    "discount": 28,
    "rating": 5,
    "reviewCount": 25,
    "badge": "100% NATURAL",
    "inclusions": "4 x 10 ml Nabhi Oil Blends + 100 ml Feet Massage Oil",
    "durationText": "Up to 4 Months Wellness Care",
    "totalQuantityMl": "140 ml",
    "selectionType": "single",
    "memberCount": 1,
    "healthGoals": [],
    "idealFor": [
      "All"
    ],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Use as part of personal wellness routine."
    },
    "specifications": {
      "Net Quantity": "140 ml",
      "Storage": "Store in a cool, dry place"
    },
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "individual-premium-wellness-pack",
    "slug": "individual-premium-wellness-pack",
    "name": "Individual Premium Wellness Pack",
    "category": "Individual Premium Wellness Pack",
    "shortDescription": "4 x 20 ml Nabhi Oil Blends + 200 ml Feet Massage Oil. 280 ml total volume. Up to 8 Months Wellness Care",
    "fullDescription": "A complete wellness routine in one convenient pack.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "4 x 20 ml Nabhi Oil Blends + 200 ml Feet Massage Oil. 280 ml total volume. Up to 8 Months Wellness Care",
    "benefits": [
      {
        "icon": "Check",
        "text": "4 x 20 ml Nabhi Oil Blends + 200 ml Feet Massage Oil"
      },
      {
        "icon": "Check",
        "text": "280 ml"
      },
      {
        "icon": "Check",
        "text": "Up to 8 Months Wellness Care"
      }
    ],
    "ingredients": [],
    "images": [
      "/images/products/individual-premium-wellness-pack.jpg"
    ],
    "variants": [
      {
        "size": "Pack",
        "price": 3999,
        "originalPrice": 5999,
        "image": ""
      }
    ],
    "price": 3999,
    "originalPrice": 5999,
    "discount": 33,
    "rating": 5,
    "reviewCount": 25,
    "badge": "100% NATURAL",
    "inclusions": "4 x 20 ml Nabhi Oil Blends + 200 ml Feet Massage Oil",
    "durationText": "Up to 8 Months Wellness Care",
    "totalQuantityMl": "280 ml",
    "selectionType": "single",
    "memberCount": 1,
    "healthGoals": [],
    "idealFor": [
      "All"
    ],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Use as part of personal wellness routine."
    },
    "specifications": {
      "Net Quantity": "280 ml",
      "Storage": "Store in a cool, dry place"
    },
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "2-member-family-trial-pack",
    "slug": "2-member-family-trial-pack",
    "name": "2 Member Family Trial Pack",
    "category": "Family Trial Wellness Packs",
    "shortDescription": "Trial packs for 2 members. 80 ml total volume. Up to 1 Month Wellness Care",
    "fullDescription": "A complete wellness routine in one convenient pack.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Trial packs for 2 members. 80 ml total volume. Up to 1 Month Wellness Care",
    "benefits": [
      {
        "icon": "Check",
        "text": "Trial packs for 2 members"
      },
      {
        "icon": "Check",
        "text": "80 ml"
      },
      {
        "icon": "Check",
        "text": "Up to 1 Month Wellness Care"
      }
    ],
    "ingredients": [],
    "images": [
      "/images/products/2-member-family-trial-pack.jpg"
    ],
    "variants": [
      {
        "size": "Pack",
        "price": 899,
        "originalPrice": 1499,
        "image": ""
      }
    ],
    "price": 899,
    "originalPrice": 1499,
    "discount": 40,
    "rating": 5,
    "reviewCount": 25,
    "badge": "100% NATURAL",
    "inclusions": "Trial packs for 2 members",
    "durationText": "Up to 1 Month Wellness Care",
    "totalQuantityMl": "80 ml",
    "selectionType": "per-member",
    "memberCount": 2,
    "healthGoals": [],
    "idealFor": [
      "All"
    ],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Use as part of personal wellness routine."
    },
    "specifications": {
      "Net Quantity": "80 ml",
      "Storage": "Store in a cool, dry place"
    },
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "3-member-family-trial-pack",
    "slug": "3-member-family-trial-pack",
    "name": "3 Member Family Trial Pack",
    "category": "Family Trial Wellness Packs",
    "shortDescription": "Trial packs for 3 members. 120 ml total volume. Up to 1 Month Wellness Care",
    "fullDescription": "A complete wellness routine in one convenient pack.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Trial packs for 3 members. 120 ml total volume. Up to 1 Month Wellness Care",
    "benefits": [
      {
        "icon": "Check",
        "text": "Trial packs for 3 members"
      },
      {
        "icon": "Check",
        "text": "120 ml"
      },
      {
        "icon": "Check",
        "text": "Up to 1 Month Wellness Care"
      }
    ],
    "ingredients": [],
    "images": [
      "/images/products/3-member-family-trial-pack.jpg"
    ],
    "variants": [
      {
        "size": "Pack",
        "price": 1299,
        "originalPrice": 2249,
        "image": ""
      }
    ],
    "price": 1299,
    "originalPrice": 2249,
    "discount": 42,
    "rating": 5,
    "reviewCount": 25,
    "badge": "100% NATURAL",
    "inclusions": "Trial packs for 3 members",
    "durationText": "Up to 1 Month Wellness Care",
    "totalQuantityMl": "120 ml",
    "selectionType": "per-member",
    "memberCount": 3,
    "healthGoals": [],
    "idealFor": [
      "All"
    ],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Use as part of personal wellness routine."
    },
    "specifications": {
      "Net Quantity": "120 ml",
      "Storage": "Store in a cool, dry place"
    },
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "4-member-family-trial-pack",
    "slug": "4-member-family-trial-pack",
    "name": "4 Member Family Trial Pack",
    "category": "Family Trial Wellness Packs",
    "shortDescription": "Trial packs for 4 members. 160 ml total volume. Up to 1 Month Wellness Care",
    "fullDescription": "A complete wellness routine in one convenient pack.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Trial packs for 4 members. 160 ml total volume. Up to 1 Month Wellness Care",
    "benefits": [
      {
        "icon": "Check",
        "text": "Trial packs for 4 members"
      },
      {
        "icon": "Check",
        "text": "160 ml"
      },
      {
        "icon": "Check",
        "text": "Up to 1 Month Wellness Care"
      }
    ],
    "ingredients": [],
    "images": [
      "/images/products/4-member-family-trial-pack.jpg"
    ],
    "variants": [
      {
        "size": "Pack",
        "price": 1699,
        "originalPrice": 2999,
        "image": ""
      }
    ],
    "price": 1699,
    "originalPrice": 2999,
    "discount": 43,
    "rating": 5,
    "reviewCount": 25,
    "badge": "100% NATURAL",
    "inclusions": "Trial packs for 4 members",
    "durationText": "Up to 1 Month Wellness Care",
    "totalQuantityMl": "160 ml",
    "selectionType": "per-member",
    "memberCount": 4,
    "healthGoals": [],
    "idealFor": [
      "All"
    ],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Use as part of personal wellness routine."
    },
    "specifications": {
      "Net Quantity": "160 ml",
      "Storage": "Store in a cool, dry place"
    },
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "5-member-family-trial-pack",
    "slug": "5-member-family-trial-pack",
    "name": "5 Member Family Trial Pack",
    "category": "Family Trial Wellness Packs",
    "shortDescription": "Trial packs for 5 members. 200 ml total volume. Up to 1 Month Wellness Care",
    "fullDescription": "A complete wellness routine in one convenient pack.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Trial packs for 5 members. 200 ml total volume. Up to 1 Month Wellness Care",
    "benefits": [
      {
        "icon": "Check",
        "text": "Trial packs for 5 members"
      },
      {
        "icon": "Check",
        "text": "200 ml"
      },
      {
        "icon": "Check",
        "text": "Up to 1 Month Wellness Care"
      }
    ],
    "ingredients": [],
    "images": [
      "/images/products/5-member-family-trial-pack.jpg"
    ],
    "variants": [
      {
        "size": "Pack",
        "price": 2099,
        "originalPrice": 3749,
        "image": ""
      }
    ],
    "price": 2099,
    "originalPrice": 3749,
    "discount": 44,
    "rating": 5,
    "reviewCount": 25,
    "badge": "100% NATURAL",
    "inclusions": "Trial packs for 5 members",
    "durationText": "Up to 1 Month Wellness Care",
    "totalQuantityMl": "200 ml",
    "selectionType": "per-member",
    "memberCount": 5,
    "healthGoals": [],
    "idealFor": [
      "All"
    ],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Use as part of personal wellness routine."
    },
    "specifications": {
      "Net Quantity": "200 ml",
      "Storage": "Store in a cool, dry place"
    },
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "2-member-family-gold-wellness-pack",
    "slug": "2-member-family-gold-wellness-pack",
    "name": "2 Member Family Gold Wellness Pack",
    "category": "Family Gold Wellness Packs",
    "shortDescription": "Gold packs for 2 members. 280 ml total volume. Up to 4 Months Wellness Care",
    "fullDescription": "A complete wellness routine in one convenient pack.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Gold packs for 2 members. 280 ml total volume. Up to 4 Months Wellness Care",
    "benefits": [
      {
        "icon": "Check",
        "text": "Gold packs for 2 members"
      },
      {
        "icon": "Check",
        "text": "280 ml"
      },
      {
        "icon": "Check",
        "text": "Up to 4 Months Wellness Care"
      }
    ],
    "ingredients": [],
    "images": [
      "/images/products/2-member-family-gold-wellness-pack.jpg"
    ],
    "variants": [
      {
        "size": "Pack",
        "price": 3999,
        "originalPrice": 5499,
        "image": ""
      }
    ],
    "price": 3999,
    "originalPrice": 5499,
    "discount": 27,
    "rating": 5,
    "reviewCount": 25,
    "badge": "100% NATURAL",
    "inclusions": "Gold packs for 2 members",
    "durationText": "Up to 4 Months Wellness Care",
    "totalQuantityMl": "280 ml",
    "selectionType": "per-member",
    "memberCount": 2,
    "healthGoals": [],
    "idealFor": [
      "All"
    ],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Use as part of personal wellness routine."
    },
    "specifications": {
      "Net Quantity": "280 ml",
      "Storage": "Store in a cool, dry place"
    },
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "3-member-family-gold-wellness-pack",
    "slug": "3-member-family-gold-wellness-pack",
    "name": "3 Member Family Gold Wellness Pack",
    "category": "Family Gold Wellness Packs",
    "shortDescription": "Gold packs for 3 members. 420 ml total volume. Up to 4 Months Wellness Care",
    "fullDescription": "A complete wellness routine in one convenient pack.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Gold packs for 3 members. 420 ml total volume. Up to 4 Months Wellness Care",
    "benefits": [
      {
        "icon": "Check",
        "text": "Gold packs for 3 members"
      },
      {
        "icon": "Check",
        "text": "420 ml"
      },
      {
        "icon": "Check",
        "text": "Up to 4 Months Wellness Care"
      }
    ],
    "ingredients": [],
    "images": [
      "/images/products/3-member-family-gold-wellness-pack.jpg"
    ],
    "variants": [
      {
        "size": "Pack",
        "price": 5799,
        "originalPrice": 8249,
        "image": ""
      }
    ],
    "price": 5799,
    "originalPrice": 8249,
    "discount": 30,
    "rating": 5,
    "reviewCount": 25,
    "badge": "100% NATURAL",
    "inclusions": "Gold packs for 3 members",
    "durationText": "Up to 4 Months Wellness Care",
    "totalQuantityMl": "420 ml",
    "selectionType": "per-member",
    "memberCount": 3,
    "healthGoals": [],
    "idealFor": [
      "All"
    ],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Use as part of personal wellness routine."
    },
    "specifications": {
      "Net Quantity": "420 ml",
      "Storage": "Store in a cool, dry place"
    },
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "4-member-family-gold-wellness-pack",
    "slug": "4-member-family-gold-wellness-pack",
    "name": "4 Member Family Gold Wellness Pack",
    "category": "Family Gold Wellness Packs",
    "shortDescription": "Gold packs for 4 members. 560 ml total volume. Up to 4 Months Wellness Care",
    "fullDescription": "A complete wellness routine in one convenient pack.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Gold packs for 4 members. 560 ml total volume. Up to 4 Months Wellness Care",
    "benefits": [
      {
        "icon": "Check",
        "text": "Gold packs for 4 members"
      },
      {
        "icon": "Check",
        "text": "560 ml"
      },
      {
        "icon": "Check",
        "text": "Up to 4 Months Wellness Care"
      }
    ],
    "ingredients": [],
    "images": [
      "/images/products/4-member-family-gold-wellness-pack.jpg"
    ],
    "variants": [
      {
        "size": "Pack",
        "price": 7499,
        "originalPrice": 10999,
        "image": ""
      }
    ],
    "price": 7499,
    "originalPrice": 10999,
    "discount": 32,
    "rating": 5,
    "reviewCount": 25,
    "badge": "100% NATURAL",
    "inclusions": "Gold packs for 4 members",
    "durationText": "Up to 4 Months Wellness Care",
    "totalQuantityMl": "560 ml",
    "selectionType": "per-member",
    "memberCount": 4,
    "healthGoals": [],
    "idealFor": [
      "All"
    ],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Use as part of personal wellness routine."
    },
    "specifications": {
      "Net Quantity": "560 ml",
      "Storage": "Store in a cool, dry place"
    },
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "5-member-family-gold-wellness-pack",
    "slug": "5-member-family-gold-wellness-pack",
    "name": "5 Member Family Gold Wellness Pack",
    "category": "Family Gold Wellness Packs",
    "shortDescription": "Gold packs for 5 members. 700 ml total volume. Up to 4 Months Wellness Care",
    "fullDescription": "A complete wellness routine in one convenient pack.",
    "story": "Rooted in ancient wellness texts.",
    "benefit": "Gold packs for 5 members. 700 ml total volume. Up to 4 Months Wellness Care",
    "benefits": [
      {
        "icon": "Check",
        "text": "Gold packs for 5 members"
      },
      {
        "icon": "Check",
        "text": "700 ml"
      },
      {
        "icon": "Check",
        "text": "Up to 4 Months Wellness Care"
      }
    ],
    "ingredients": [],
    "images": [
      "/images/products/5-member-family-gold-wellness-pack.jpg"
    ],
    "variants": [
      {
        "size": "Pack",
        "price": 8999,
        "originalPrice": 13749,
        "image": ""
      }
    ],
    "price": 8999,
    "originalPrice": 13749,
    "discount": 35,
    "rating": 5,
    "reviewCount": 25,
    "badge": "100% NATURAL",
    "inclusions": "Gold packs for 5 members",
    "durationText": "Up to 4 Months Wellness Care",
    "totalQuantityMl": "700 ml",
    "selectionType": "per-member",
    "memberCount": 5,
    "healthGoals": [],
    "idealFor": [
      "All"
    ],
    "usageInstructions": {
      "serving": "As needed",
      "timing": "Daily",
      "instructions": "Use as part of personal wellness routine."
    },
    "specifications": {
      "Net Quantity": "700 ml",
      "Storage": "Store in a cool, dry place"
    },
    "certifications": [
      "100% Natural"
    ],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  }
];
