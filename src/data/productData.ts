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
    "fullDescription": "A gentle-feel, traditional-inspired wellness oil designed specifically for children's regular personal care routines. This nourishing blend makes everyday self-care simple, focusing on comfort and a relaxing massage experience.",
    "story": "Rooted in the timeless principles of gentle care, this natural-inspired formulation is crafted to introduce children to a comforting daily wellness ritual.",
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
    "fullDescription": "A gentle-feel, traditional-inspired wellness oil designed specifically for children's regular personal care routines. This nourishing blend makes everyday self-care simple, focusing on comfort and a relaxing massage experience.",
    "story": "Rooted in the timeless principles of gentle care, this natural-inspired formulation is crafted to introduce children to a comforting daily wellness ritual.",
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
    "fullDescription": "A gentle-feel, traditional-inspired wellness oil designed specifically for children's regular personal care routines. This nourishing blend makes everyday self-care simple, focusing on comfort and a relaxing massage experience.",
    "story": "Rooted in the timeless principles of gentle care, this natural-inspired formulation is crafted to introduce children to a comforting daily wellness ritual.",
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
    "fullDescription": "A gentle-feel, traditional-inspired wellness oil designed specifically for children's regular personal care routines. This nourishing blend makes everyday self-care simple, focusing on comfort and a relaxing massage experience.",
    "story": "Rooted in the timeless principles of gentle care, this natural-inspired formulation is crafted to introduce children to a comforting daily wellness ritual.",
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
    "fullDescription": "A premium, natural-inspired wellness oil crafted for men's daily self-care rituals. Experience a relaxing-feel massage routine designed to complement an active lifestyle and support everyday vitality.",
    "story": "Inspired by traditional wellness practices, this oil provides a comforting and nourishing-feel experience, designed specifically for modern men's personal care.",
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
    "fullDescription": "A premium, natural-inspired wellness oil crafted for men's daily self-care rituals. Experience a relaxing-feel massage routine designed to complement an active lifestyle and support everyday vitality.",
    "story": "Inspired by traditional wellness practices, this oil provides a comforting and nourishing-feel experience, designed specifically for modern men's personal care.",
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
    "fullDescription": "A premium, natural-inspired wellness oil crafted for men's daily self-care rituals. Experience a relaxing-feel massage routine designed to complement an active lifestyle and support everyday vitality.",
    "story": "Inspired by traditional wellness practices, this oil provides a comforting and nourishing-feel experience, designed specifically for modern men's personal care.",
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
    "fullDescription": "A premium, natural-inspired wellness oil crafted for men's daily self-care rituals. Experience a relaxing-feel massage routine designed to complement an active lifestyle and support everyday vitality.",
    "story": "Inspired by traditional wellness practices, this oil provides a comforting and nourishing-feel experience, designed specifically for modern men's personal care.",
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
    "fullDescription": "A nourishing-feel, traditional-inspired wellness oil curated for women's daily self-care. This premium blend supports a relaxing massage routine, focusing on everyday comfort and natural-inspired care.",
    "story": "Drawing from ancient wellness principles, this luxurious blend was created to bring a moment of peaceful self-care into the modern woman's daily routine.",
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
    "fullDescription": "A nourishing-feel, traditional-inspired wellness oil curated for women's daily self-care. This premium blend supports a relaxing massage routine, focusing on everyday comfort and natural-inspired care.",
    "story": "Drawing from ancient wellness principles, this luxurious blend was created to bring a moment of peaceful self-care into the modern woman's daily routine.",
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
    "fullDescription": "A nourishing-feel, traditional-inspired wellness oil curated for women's daily self-care. This premium blend supports a relaxing massage routine, focusing on everyday comfort and natural-inspired care.",
    "story": "Drawing from ancient wellness principles, this luxurious blend was created to bring a moment of peaceful self-care into the modern woman's daily routine.",
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
    "fullDescription": "A nourishing-feel, traditional-inspired wellness oil curated for women's daily self-care. This premium blend supports a relaxing massage routine, focusing on everyday comfort and natural-inspired care.",
    "story": "Drawing from ancient wellness principles, this luxurious blend was created to bring a moment of peaceful self-care into the modern woman's daily routine.",
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
    "fullDescription": "A comforting-feel, traditional-inspired wellness oil designed to support seniors in their everyday personal care. This gentle blend is ideal for a relaxing massage routine, bringing a sense of daily comfort.",
    "story": "Crafted with deep respect for traditional wellness, this nourishing-feel oil is formulated to provide gentle, everyday care for mature skin and daily vitality.",
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
    "fullDescription": "A comforting-feel, traditional-inspired wellness oil designed to support seniors in their everyday personal care. This gentle blend is ideal for a relaxing massage routine, bringing a sense of daily comfort.",
    "story": "Crafted with deep respect for traditional wellness, this nourishing-feel oil is formulated to provide gentle, everyday care for mature skin and daily vitality.",
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
    "fullDescription": "A comforting-feel, traditional-inspired wellness oil designed to support seniors in their everyday personal care. This gentle blend is ideal for a relaxing massage routine, bringing a sense of daily comfort.",
    "story": "Crafted with deep respect for traditional wellness, this nourishing-feel oil is formulated to provide gentle, everyday care for mature skin and daily vitality.",
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
    "fullDescription": "A comforting-feel, traditional-inspired wellness oil designed to support seniors in their everyday personal care. This gentle blend is ideal for a relaxing massage routine, bringing a sense of daily comfort.",
    "story": "Crafted with deep respect for traditional wellness, this nourishing-feel oil is formulated to provide gentle, everyday care for mature skin and daily vitality.",
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
    "fullDescription": "A gentle-feel, traditional-inspired wellness oil designed specifically for children's regular personal care routines. This nourishing blend makes everyday self-care simple, focusing on comfort and a relaxing massage experience.",
    "story": "Rooted in the timeless principles of gentle care, this natural-inspired formulation is crafted to introduce children to a comforting daily wellness ritual.",
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
    "fullDescription": "A premium, natural-inspired wellness oil crafted for men's daily self-care rituals. Experience a relaxing-feel massage routine designed to complement an active lifestyle and support everyday vitality.",
    "story": "Inspired by traditional wellness practices, this oil provides a comforting and nourishing-feel experience, designed specifically for modern men's personal care.",
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
    "fullDescription": "A nourishing-feel, traditional-inspired wellness oil curated for women's daily self-care. This premium blend supports a relaxing massage routine, focusing on everyday comfort and natural-inspired care.",
    "story": "Drawing from ancient wellness principles, this luxurious blend was created to bring a moment of peaceful self-care into the modern woman's daily routine.",
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
    "fullDescription": "A comforting-feel, traditional-inspired wellness oil designed to support seniors in their everyday personal care. This gentle blend is ideal for a relaxing massage routine, bringing a sense of daily comfort.",
    "story": "Crafted with deep respect for traditional wellness, this nourishing-feel oil is formulated to provide gentle, everyday care for mature skin and daily vitality.",
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
    "fullDescription": "A gentle-feel, traditional-inspired wellness oil designed specifically for children's regular personal care routines. This nourishing blend makes everyday self-care simple, focusing on comfort and a relaxing massage experience.",
    "story": "Rooted in the timeless principles of gentle care, this natural-inspired formulation is crafted to introduce children to a comforting daily wellness ritual.",
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
    "fullDescription": "A premium, natural-inspired wellness oil crafted for men's daily self-care rituals. Experience a relaxing-feel massage routine designed to complement an active lifestyle and support everyday vitality.",
    "story": "Inspired by traditional wellness practices, this oil provides a comforting and nourishing-feel experience, designed specifically for modern men's personal care.",
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
    "fullDescription": "A nourishing-feel, traditional-inspired wellness oil curated for women's daily self-care. This premium blend supports a relaxing massage routine, focusing on everyday comfort and natural-inspired care.",
    "story": "Drawing from ancient wellness principles, this luxurious blend was created to bring a moment of peaceful self-care into the modern woman's daily routine.",
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
    "fullDescription": "A comforting-feel, traditional-inspired wellness oil designed to support seniors in their everyday personal care. This gentle blend is ideal for a relaxing massage routine, bringing a sense of daily comfort.",
    "story": "Crafted with deep respect for traditional wellness, this nourishing-feel oil is formulated to provide gentle, everyday care for mature skin and daily vitality.",
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
    "fullDescription": "A gentle-feel, traditional-inspired wellness oil designed specifically for children's regular personal care routines. This nourishing blend makes everyday self-care simple, focusing on comfort and a relaxing massage experience.",
    "story": "Rooted in the timeless principles of gentle care, this natural-inspired formulation is crafted to introduce children to a comforting daily wellness ritual.",
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
    "fullDescription": "A premium, natural-inspired wellness oil crafted for men's daily self-care rituals. Experience a relaxing-feel massage routine designed to complement an active lifestyle and support everyday vitality.",
    "story": "Inspired by traditional wellness practices, this oil provides a comforting and nourishing-feel experience, designed specifically for modern men's personal care.",
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
    "fullDescription": "A nourishing-feel, traditional-inspired wellness oil curated for women's daily self-care. This premium blend supports a relaxing massage routine, focusing on everyday comfort and natural-inspired care.",
    "story": "Drawing from ancient wellness principles, this luxurious blend was created to bring a moment of peaceful self-care into the modern woman's daily routine.",
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
    "fullDescription": "A comforting-feel, traditional-inspired wellness oil designed to support seniors in their everyday personal care. This gentle blend is ideal for a relaxing massage routine, bringing a sense of daily comfort.",
    "story": "Crafted with deep respect for traditional wellness, this nourishing-feel oil is formulated to provide gentle, everyday care for mature skin and daily vitality.",
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
    "id": "nabhi-2-variant-trial-pack",
    "slug": "nabhi-2-variant-trial-pack",
    "name": "Nabhi 2-Variant Trial Pack",
    "category": "Nabhi Trial Packs",
    "shortDescription": "2 x 5 ml = 10 ml Nabhi Wellness Oils. Up to 1 Month* Wellness Care. Select any 2 variants from one category.",
    "fullDescription": "Customizable 2-variant Nabhi oil trial pack. Select any 2 targeted formulations from Kids, Men, Women, or Senior Care categories for up to 1 month of restorative daily wellness.",
    "story": "Rooted in timeless Ayurvedic texts and handcrafted with 100% natural botanical extracts.",
    "benefit": "2 x 5 ml = 10 ml Nabhi Wellness Oils. Up to 1 Month* Wellness Care",
    "benefits": [
      { "icon": "Check", "text": "2 x 5 ml Nabhi Oils" },
      { "icon": "Check", "text": "10 ml Total Volume" },
      { "icon": "Check", "text": "Up to 1 Month Wellness Care" }
    ],
    "ingredients": [],
    "images": ["/images/categories/cat_trial_pack.jpg"],
    "variants": [{ "size": "2 x 5 ml (10 ml)", "price": 349, "originalPrice": 499, "goldMemberPrice": 314, "image": "" }],
    "price": 349,
    "originalPrice": 499,
    "discount": 30,
    "rating": 5,
    "reviewCount": 34,
    "badge": "POPULAR TRIAL",
    "durationText": "Up to 1 Month*",
    "totalQuantityMl": "10 ml",
    "healthGoals": [],
    "idealFor": ["All"],
    "usageInstructions": { "serving": "As needed", "timing": "Morning & Night", "instructions": "Apply 2-3 drops on navel daily." },
    "specifications": { "Net Quantity": "10 ml", "Storage": "Store in a cool, dry place" },
    "certifications": ["100% Natural", "GMP Certified", "Ayush Approved"],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "nabhi-4-variant-trial-pack",
    "slug": "nabhi-4-variant-trial-pack",
    "name": "Nabhi 4-Variant Trial Pack",
    "category": "Nabhi Trial Packs",
    "shortDescription": "4 x 5 ml = 20 ml Nabhi Wellness Oils. Up to 2 Months* Wellness Care. All 4 variants from one category.",
    "fullDescription": "Complete 4-variant Nabhi oil collection for a full category. Includes all 4 specialized formulations for comprehensive wellness care lasting up to 2 months.",
    "story": "Rooted in timeless Ayurvedic texts and handcrafted with 100% natural botanical extracts.",
    "benefit": "4 x 5 ml = 20 ml Nabhi Wellness Oils. Up to 2 Months* Wellness Care",
    "benefits": [
      { "icon": "Check", "text": "4 x 5 ml Nabhi Oils" },
      { "icon": "Check", "text": "20 ml Total Volume" },
      { "icon": "Check", "text": "Up to 2 Months Wellness Care" }
    ],
    "ingredients": [],
    "images": ["/images/categories/cat_trial_pack.jpg"],
    "variants": [{ "size": "4 x 5 ml (20 ml)", "price": 599, "originalPrice": 999, "goldMemberPrice": 539, "image": "" }],
    "price": 599,
    "originalPrice": 999,
    "discount": 40,
    "rating": 5,
    "reviewCount": 42,
    "badge": "COMPLETE PACK",
    "durationText": "Up to 2 Months*",
    "totalQuantityMl": "20 ml",
    "healthGoals": [],
    "idealFor": ["All"],
    "usageInstructions": { "serving": "As needed", "timing": "Morning & Night", "instructions": "Apply 2-3 drops on navel daily." },
    "specifications": { "Net Quantity": "20 ml", "Storage": "Store in a cool, dry place" },
    "certifications": ["100% Natural", "GMP Certified", "Ayush Approved"],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "feet-wellness-trial-pack",
    "slug": "feet-wellness-trial-pack",
    "name": "Feet Wellness Trial Pack",
    "category": "Feet Massage Oil",
    "shortDescription": "30 ml Restorative Feet Wellness Oil. Up to 15 Days* Wellness Care.",
    "fullDescription": "Traditional Padabhyanga foot massage oil infused with cooling, soothing herbs to relieve daily fatigue and promote deep restorative sleep.",
    "story": "Rooted in timeless Ayurvedic texts and handcrafted with 100% natural botanical extracts.",
    "benefit": "30 ml Restorative Feet Wellness Oil. Up to 15 Days* Wellness Care",
    "benefits": [
      { "icon": "Check", "text": "30 ml Foot Massage Oil" },
      { "icon": "Check", "text": "Up to 15 Days Wellness Care" }
    ],
    "ingredients": [],
    "images": ["/images/categories/cat_oil_wellness_1786556871303.jpg"],
    "variants": [{ "size": "30 ml", "price": 349, "originalPrice": 499, "goldMemberPrice": 314, "image": "" }],
    "price": 349,
    "originalPrice": 499,
    "discount": 30,
    "rating": 5,
    "reviewCount": 29,
    "badge": "15 DAYS TRIAL",
    "durationText": "Up to 15 Days*",
    "totalQuantityMl": "30 ml",
    "healthGoals": [],
    "idealFor": ["All"],
    "usageInstructions": { "serving": "As needed", "timing": "Night Before Bed", "instructions": "Massage on feet soles before sleeping." },
    "specifications": { "Net Quantity": "30 ml", "Storage": "Store in a cool, dry place" },
    "certifications": ["100% Natural", "GMP Certified", "Ayush Approved"],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "feet-wellness-routine-pack",
    "slug": "feet-wellness-routine-pack",
    "name": "Feet Wellness Routine Pack",
    "category": "Feet Massage Oil",
    "shortDescription": "60 ml Daily Feet Wellness Oil. Up to 1 Month* Wellness Care.",
    "fullDescription": "Full 1-month supply of our signature Padabhyanga foot massage oil for sustained relaxation, improved circulation, and overnight calm.",
    "story": "Rooted in timeless Ayurvedic texts and handcrafted with 100% natural botanical extracts.",
    "benefit": "60 ml Daily Feet Wellness Oil. Up to 1 Month* Wellness Care",
    "benefits": [
      { "icon": "Check", "text": "60 ml Foot Massage Oil" },
      { "icon": "Check", "text": "Up to 1 Month Wellness Care" }
    ],
    "ingredients": [],
    "images": ["/images/categories/cat_oil_wellness_1786556871303.jpg"],
    "variants": [{ "size": "60 ml", "price": 499, "originalPrice": 699, "goldMemberPrice": 449, "image": "" }],
    "price": 499,
    "originalPrice": 699,
    "discount": 28,
    "rating": 5,
    "reviewCount": 51,
    "badge": "1 MONTH ROUTINE",
    "durationText": "Up to 1 Month*",
    "totalQuantityMl": "60 ml",
    "healthGoals": [],
    "idealFor": ["All"],
    "usageInstructions": { "serving": "As needed", "timing": "Night Before Bed", "instructions": "Massage on feet soles before sleeping." },
    "specifications": { "Net Quantity": "60 ml", "Storage": "Store in a cool, dry place" },
    "certifications": ["100% Natural", "GMP Certified", "Ayush Approved"],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "prime-trial-pack",
    "slug": "prime-trial-pack",
    "name": "Prime Trial Pack",
    "category": "Combo Trial Packs",
    "shortDescription": "2 x 5 ml Nabhi + 60 ml Feet Oil. Total: 70 ml. Up to 1 Month* Wellness Care.",
    "fullDescription": "Starter wellness combo pairing 2 targeted 5 ml Nabhi wellness oils with 60 ml Feet massage oil for a synchronized 1-month daily routine.",
    "story": "Rooted in timeless Ayurvedic texts and handcrafted with 100% natural botanical extracts.",
    "benefit": "2 x 5 ml Nabhi + 60 ml Feet Oil. Total: 70 ml. Up to 1 Month* Wellness Care",
    "benefits": [
      { "icon": "Check", "text": "2 x 5 ml Nabhi Oils" },
      { "icon": "Check", "text": "60 ml Feet Massage Oil" },
      { "icon": "Check", "text": "Up to 1 Month Wellness Care" }
    ],
    "ingredients": [],
    "images": ["/images/categories/cat_wellness_packs_1786557692487.jpg"],
    "variants": [{ "size": "70 ml Combo", "price": 699, "originalPrice": 999, "goldMemberPrice": 629, "image": "" }],
    "price": 699,
    "originalPrice": 999,
    "discount": 30,
    "rating": 5,
    "reviewCount": 67,
    "badge": "STARTER COMBO",
    "durationText": "Up to 1 Month*",
    "totalQuantityMl": "70 ml",
    "healthGoals": [],
    "idealFor": ["All"],
    "usageInstructions": { "serving": "As needed", "timing": "Morning & Night", "instructions": "Apply Nabhi oil on navel and massage feet oil before bed." },
    "specifications": { "Net Quantity": "70 ml", "Storage": "Store in a cool, dry place" },
    "certifications": ["100% Natural", "GMP Certified", "Ayush Approved"],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "silver-trial-pack",
    "slug": "silver-trial-pack",
    "name": "Silver Trial Pack",
    "category": "Combo Trial Packs",
    "shortDescription": "4 x 5 ml Nabhi + 120 ml Feet Oil. Total: 140 ml. Up to 2 Months* Wellness Care.",
    "fullDescription": "Best value wellness combo offering all 4 category Nabhi oils (20 ml) plus double feet oil (120 ml) for 2 months of restorative care.",
    "story": "Rooted in timeless Ayurvedic texts and handcrafted with 100% natural botanical extracts.",
    "benefit": "4 x 5 ml Nabhi + 120 ml Feet Oil. Total: 140 ml. Up to 2 Months* Wellness Care",
    "benefits": [
      { "icon": "Check", "text": "4 x 5 ml Nabhi Oils" },
      { "icon": "Check", "text": "120 ml Feet Massage Oil" },
      { "icon": "Check", "text": "Up to 2 Months Wellness Care" }
    ],
    "ingredients": [],
    "images": ["/images/categories/cat_wellness_packs_1786557692487.jpg"],
    "variants": [{ "size": "140 ml Combo", "price": 999, "originalPrice": 1499, "goldMemberPrice": 899, "image": "" }],
    "price": 999,
    "originalPrice": 1499,
    "discount": 33,
    "rating": 5,
    "reviewCount": 84,
    "badge": "BEST VALUE",
    "durationText": "Up to 2 Months*",
    "totalQuantityMl": "140 ml",
    "healthGoals": [],
    "idealFor": ["All"],
    "usageInstructions": { "serving": "As needed", "timing": "Morning & Night", "instructions": "Apply Nabhi oil on navel and massage feet oil before bed." },
    "specifications": { "Net Quantity": "140 ml", "Storage": "Store in a cool, dry place" },
    "certifications": ["100% Natural", "GMP Certified", "Ayush Approved"],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "gold-trial-pack",
    "slug": "gold-trial-pack",
    "name": "Gold Trial Pack",
    "category": "Combo Trial Packs",
    "shortDescription": "2 x 5 ml Nabhi + 60 ml Feet Oil + 100 ml Body Massage Oil. Total: 170 ml. Up to 1 Month* Wellness Care.",
    "fullDescription": "Complete head-to-toe self-care regimen combining Nabhi oils, Feet oil, and 100 ml full-body Abhyanga massage oil for whole-body rejuvenation.",
    "story": "Rooted in timeless Ayurvedic texts and handcrafted with 100% natural botanical extracts.",
    "benefit": "2 x 5 ml Nabhi + 60 ml Feet Oil + 100 ml Body Massage Oil. Total: 170 ml. Up to 1 Month* Wellness Care",
    "benefits": [
      { "icon": "Check", "text": "2 x 5 ml Nabhi Oils" },
      { "icon": "Check", "text": "60 ml Feet Massage Oil" },
      { "icon": "Check", "text": "100 ml Body Massage Oil" },
      { "icon": "Check", "text": "Up to 1 Month Wellness Care" }
    ],
    "ingredients": [],
    "images": ["/images/categories/cat_wellness_packs_1786557692487.jpg"],
    "variants": [{ "size": "170 ml Combo", "price": 1199, "originalPrice": 1799, "goldMemberPrice": 1079, "image": "" }],
    "price": 1199,
    "originalPrice": 1799,
    "discount": 33,
    "rating": 5,
    "reviewCount": 92,
    "badge": "COMPLETE SELF-CARE",
    "durationText": "Up to 1 Month*",
    "totalQuantityMl": "170 ml",
    "healthGoals": [],
    "idealFor": ["All"],
    "usageInstructions": { "serving": "As needed", "timing": "Morning & Night", "instructions": "Apply Nabhi oil on navel, use body massage oil before bath, and massage feet oil before bed." },
    "specifications": { "Net Quantity": "170 ml", "Storage": "Store in a cool, dry place" },
    "certifications": ["100% Natural", "GMP Certified", "Ayush Approved"],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "diamond-trial-pack",
    "slug": "diamond-trial-pack",
    "name": "Diamond Trial Pack",
    "category": "Combo Trial Packs",
    "shortDescription": "4 x 5 ml Nabhi + 120 ml Feet Oil + 100 ml Body Massage Oil. Total: 240 ml. Up to 2 Months* Wellness Care.",
    "fullDescription": "The ultimate flagship Ayurvedic wellness combo. Includes all 4 category Nabhi oils (20 ml), 120 ml Feet massage oil, and 100 ml Body massage oil for up to 2 full months of complete luxury wellness care.",
    "story": "Rooted in timeless Ayurvedic texts and handcrafted with 100% natural botanical extracts.",
    "benefit": "4 x 5 ml Nabhi + 120 ml Feet Oil + 100 ml Body Massage Oil. Total: 240 ml. Up to 2 Months* Wellness Care",
    "benefits": [
      { "icon": "Check", "text": "4 x 5 ml Nabhi Oils" },
      { "icon": "Check", "text": "120 ml Feet Massage Oil" },
      { "icon": "Check", "text": "100 ml Body Massage Oil" },
      { "icon": "Check", "text": "Up to 2 Months Wellness Care" }
    ],
    "ingredients": [],
    "images": ["/images/categories/cat_wellness_packs_1786557692487.jpg"],
    "variants": [{ "size": "240 ml Combo", "price": 1599, "originalPrice": 2299, "goldMemberPrice": 1439, "image": "" }],
    "price": 1599,
    "originalPrice": 2299,
    "discount": 30,
    "rating": 5,
    "reviewCount": 115,
    "badge": "COMPLETE WELLNESS COMBO",
    "durationText": "Up to 2 Months*",
    "totalQuantityMl": "240 ml",
    "healthGoals": [],
    "idealFor": ["All"],
    "usageInstructions": { "serving": "As needed", "timing": "Morning & Night", "instructions": "Apply Nabhi oil on navel, use body massage oil before bath, and massage feet oil before bed." },
    "specifications": { "Net Quantity": "240 ml", "Storage": "Store in a cool, dry place" },
    "certifications": ["100% Natural", "GMP Certified", "Ayush Approved"],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "pure-lavender-essential-oil",
    "slug": "pure-lavender-essential-oil",
    "name": "Pure Lavender Essential Oil",
    "category": "Natural Aroma",
    "shortDescription": "100% Pure therapeutic-grade steam-distilled Lavender essential oil for deep calmness and soothing relaxation.",
    "fullDescription": "Distilled from pristine lavender blossoms, this pure essential oil delivers an exquisite floral and calming botanical aroma. Perfect for diffusers, pillow misting, and stress-relieving evening rituals.",
    "story": "Crafted using traditional steam distillation to capture the pure volatile essence of mountain-grown lavender.",
    "benefit": "Promotes deep relaxation, calms the mind, and creates a tranquil atmosphere for restful sleep.",
    "benefits": [
      { "icon": "Check", "text": "100% Pure Steam Distilled" },
      { "icon": "Check", "text": "Calms Mind & Relieves Tension" },
      { "icon": "Check", "text": "Ideal for Diffusers & Evening Care" }
    ],
    "ingredients": [],
    "images": ["https://images.unsplash.com/photo-1597714026720-8f74c62310ba?auto=format&fit=crop&w=900&q=80"],
    "variants": [
      { "size": "15 ml", "price": 349, "originalPrice": 499, "goldMemberPrice": 314, "image": "" },
      { "size": "30 ml", "price": 599, "originalPrice": 899, "goldMemberPrice": 539, "image": "" }
    ],
    "price": 349,
    "originalPrice": 499,
    "discount": 30,
    "rating": 5,
    "reviewCount": 42,
    "badge": "BESTSELLER",
    "healthGoals": ["Stress Relief", "Sleep Care"],
    "idealFor": ["All"],
    "usageInstructions": { "serving": "3-5 drops", "timing": "Evening / Night", "instructions": "Add 3-5 drops to a diffuser with water, or blend with carrier oil for relaxing topical touch points." },
    "specifications": { "Net Quantity": "15 ml", "Form": "Pure Essential Oil", "Extraction": "Steam Distillation" },
    "certifications": ["100% Natural", "Therapeutic Grade", "Chemical Free"],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "natural-sandalwood-aroma-roll-on",
    "slug": "natural-sandalwood-aroma-roll-on",
    "name": "Natural Sandalwood Aroma Roll-On",
    "category": "Natural Aroma",
    "shortDescription": "Pure sandalwood and sacred botanical aroma in a convenient pocket roll-on for instant mindfulness and tranquility.",
    "fullDescription": "An enriching, sacred sandalwood aroma roll-on blended in pure jojoba base. Designed for effortless pulse-point application throughout the day to evoke mental clarity and grounded peace.",
    "story": "Inspired by age-old temple fragrances and royal sandalwood ceremonies of ancient India.",
    "benefit": "Instantly grounds the senses, enhances focus, and surrounds you with an earthy, regal fragrance.",
    "benefits": [
      { "icon": "Check", "text": "Pure Sacred Sandalwood Notes" },
      { "icon": "Check", "text": "Convenient Pocket Pulse-Point Roll-On" },
      { "icon": "Check", "text": "Zero Alcohol & Zero Synthetic Fixatives" }
    ],
    "ingredients": [],
    "images": ["https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80"],
    "variants": [
      { "size": "10 ml Roll-On", "price": 399, "originalPrice": 599, "goldMemberPrice": 359, "image": "" }
    ],
    "price": 399,
    "originalPrice": 599,
    "discount": 33,
    "rating": 5,
    "reviewCount": 38,
    "badge": "PREMIUM",
    "healthGoals": ["Mindfulness", "Daily Energy"],
    "idealFor": ["All"],
    "usageInstructions": { "serving": "1 application", "timing": "Anytime", "instructions": "Gently roll over pulse points (wrists, temples, behind ears) and breathe in deeply." },
    "specifications": { "Net Quantity": "10 ml", "Form": "Pocket Aroma Roll-On", "Alcohol Content": "0%" },
    "certifications": ["100% Natural", "Cruelty Free", "Non-Toxic"],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "mogra-jasmine-wellness-fragrance-oil",
    "slug": "mogra-jasmine-wellness-fragrance-oil",
    "name": "Mogra & Jasmine Wellness Fragrance Oil",
    "category": "Natural Aroma",
    "shortDescription": "Enchanting Indian Mogra & royal Jasmine blossom extract for a blissful, uplifting natural floral aura.",
    "fullDescription": "Experience the opulent, sweet floral essence of fresh night-blooming Mogra and Royal Jasmine flowers. Handcrafted to uplift mood and surround your sacred living space with pure joy.",
    "story": "Harvested in early dawn when jasmine petals retain their peak aromatic nectar and vital life force.",
    "benefit": "Elevates mood, sparks creativity, and leaves an enchanting natural floral fragrance.",
    "benefits": [
      { "icon": "Check", "text": "Authentic Indian Mogra & Jasmine" },
      { "icon": "Check", "text": "Uplifting & Mood-Enhancing" },
      { "icon": "Check", "text": "Long-Lasting Natural Scent" }
    ],
    "ingredients": [],
    "images": ["https://images.unsplash.com/photo-1597714026720-8f74c62310ba?auto=format&fit=crop&w=900&q=80"],
    "variants": [
      { "size": "15 ml", "price": 349, "originalPrice": 499, "goldMemberPrice": 314, "image": "" }
    ],
    "price": 349,
    "originalPrice": 499,
    "discount": 30,
    "rating": 5,
    "reviewCount": 29,
    "badge": "FLORAL ESSENCE",
    "healthGoals": ["Mood Elevation", "Home Wellness"],
    "idealFor": ["All"],
    "usageInstructions": { "serving": "3-4 drops", "timing": "Morning & Evening", "instructions": "Diffuse in ultrasonic or reed diffusers, or add to potpourri and bathwater." },
    "specifications": { "Net Quantity": "15 ml", "Form": "Pure Botanical Oil", "Aroma": "Exotic Sweet Floral" },
    "certifications": ["100% Natural", "Ayurvedic Inspired", "Chemical Free"],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "eucalyptus-lemongrass-diffuser-blend",
    "slug": "eucalyptus-lemongrass-diffuser-blend",
    "name": "Eucalyptus & Lemongrass Diffuser Blend",
    "category": "Natural Aroma",
    "shortDescription": "Crisp Nilgiri Eucalyptus paired with zesty organic Lemongrass for fresh air purification and respiratory vitality.",
    "fullDescription": "A refreshing and invigorating synergy of cool Nilgiri Eucalyptus and bright South Indian Lemongrass. Clears the ambiance, supports open airways, and revitalizes tired minds.",
    "story": "Harnessing the high-altitude vitality of Nilgiri eucalyptus groves and organic lemongrass farms.",
    "benefit": "Purifies ambient indoor air, clears congestion, and promotes energetic focus.",
    "benefits": [
      { "icon": "Check", "text": "Clears Air & Vitalizes Energy" },
      { "icon": "Check", "text": "Fresh Lemongrass & Nilgiri Eucalyptus" },
      { "icon": "Check", "text": "Ideal for Workspaces & Living Rooms" }
    ],
    "ingredients": [],
    "images": ["https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80"],
    "variants": [
      { "size": "20 ml", "price": 329, "originalPrice": 499, "goldMemberPrice": 296, "image": "" }
    ],
    "price": 329,
    "originalPrice": 499,
    "discount": 34,
    "rating": 5,
    "reviewCount": 31,
    "badge": "AIR PURIFYING",
    "healthGoals": ["Daily Energy", "Immunity Care"],
    "idealFor": ["All"],
    "usageInstructions": { "serving": "4-6 drops", "timing": "Morning / Daytime", "instructions": "Add 4-6 drops to diffuser or vaporizing bowl with warm water." },
    "specifications": { "Net Quantity": "20 ml", "Form": "Diffuser Blend", "Aroma": "Fresh Citrus & Herbal Crisp" },
    "certifications": ["100% Natural", "Therapeutic Grade", "Chemical Free"],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
  {
    "id": "holistic-aromatherapy-combo-pack",
    "slug": "holistic-aromatherapy-combo-pack",
    "name": "Holistic Aromatherapy 3-Oil Combo Pack",
    "category": "Natural Aroma",
    "shortDescription": "Complete 3-piece wellness set: Lavender (Sleep), Eucalyptus (Focus), and Sandalwood (Peace). Total: 45 ml.",
    "fullDescription": "The ultimate therapeutic aroma starter set for holistic self-care. Contains 15 ml Lavender for restful nights, 15 ml Eucalyptus for clear mornings, and 15 ml Sandalwood for centered afternoons.",
    "story": "Curated by Ayurvedic aromatherapy specialists to align your senses with the natural circadian cycle.",
    "benefit": "Provides all-day sensory balance: uplifting focus in the day and serene tranquility at night.",
    "benefits": [
      { "icon": "Check", "text": "3 Full-Size 15 ml Bottles" },
      { "icon": "Check", "text": "Complete Morning, Afternoon & Night Care" },
      { "icon": "Check", "text": "Luxury Gift Box Packaging" }
    ],
    "ingredients": [],
    "images": ["/images/categories/cat_natural_fragrance.jpg"],
    "variants": [
      { "size": "3 x 15 ml Combo (45 ml)", "price": 899, "originalPrice": 1299, "goldMemberPrice": 809, "image": "" }
    ],
    "price": 899,
    "originalPrice": 1299,
    "discount": 31,
    "rating": 5,
    "reviewCount": 56,
    "badge": "VALUE COMBO",
    "healthGoals": ["Stress Relief", "Daily Energy", "Sleep Care"],
    "idealFor": ["All"],
    "usageInstructions": { "serving": "As needed", "timing": "All-Day Circadian Care", "instructions": "Use Eucalyptus in morning, Sandalwood in afternoon, and Lavender before bedtime." },
    "specifications": { "Net Quantity": "45 ml (3 x 15 ml)", "Packaging": "Luxury Amber Dropper Bottles" },
    "certifications": ["100% Natural", "GMP Certified", "Ayush Approved"],
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
