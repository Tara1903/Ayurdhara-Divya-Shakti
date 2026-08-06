export interface CashOrderItem {
  id?: string;
  cashOrderId?: string;
  productSlug: string;
  productName: string;
  variant: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  imageUrl?: string;
}

export interface CashOrder {
  id: string;
  orderRef: string;
  customerName: string;
  mobileNumber: string;
  email?: string;
  linkedAccountId?: string;
  staffName: string;
  saleDate: string;
  orderStatus: 'completed' | 'cancelled' | 'returned' | 'refunded';
  paymentMethod: 'cash';
  subtotal: number;
  finalTotal: number;
  wellnessPartnerCode?: string;
  retailPartnerCode?: string;
  partnerType?: 'wellness' | 'retail' | 'none';
  commissionRate?: number;
  commissionAmount?: number;
  notes?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
  items?: CashOrderItem[];
}

export interface CreateCashOrderPayload {
  customerName: string;
  mobileNumber: string;
  email?: string;
  staffName: string;
  saleDate: string;
  partnerCode?: string;
  partnerType?: 'wellness' | 'retail';
  notes?: string;
  items: {
    productSlug: string;
    productName: string;
    variant: string;
    quantity: number;
    unitPrice: number;
    imageUrl?: string;
  }[];
}
