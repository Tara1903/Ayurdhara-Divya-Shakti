export type OrderStatus = "pending" | "shipped" | "delivered";

export type ProductCategory =
  | "full-body-wellness"
  | "muscle-recovery-energy"
  | "queen-beauty-hormonal-balance"
  | "vridh-strength-joint-care"
  | "kids-growth-immunity"
  | "daily-health-balance";

export interface ProductOil {
  name: string;
  purpose: string;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortBenefit: string;
  description: string;
  category: ProductCategory;
  image: string;
  problemStatement: string;
  benefits: string[];
  ingredientsFeel: string[];
  usageMethod: string[];
  whoShouldUse: string[];
  expectedTimeline: string[];
  whatsInside: ProductOil[];
  faqs: ProductFaq[];
  price: number;
  originalPrice: number;
  durationLabel: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItemInput {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  address: string;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  items: OrderItemInput[];
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
}

export interface CheckoutPayload {
  customerName: string;
  phone: string;
  address: string;
  items: OrderItemInput[];
}

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
}
