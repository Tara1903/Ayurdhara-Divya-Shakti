export interface RetailPartner {
  id: string;
  partner_id: string; // e.g., ADS-RP-0001
  partner_code: string; // e.g., SHARMA20
  name: string;
  shop_name: string;
  mobile: string;
  email?: string;
  shop_location?: string;
  business_details?: string;
  preferred_contact?: string;
  status: 'PENDING' | 'APPROVED' | 'ACTIVE' | 'SUSPENDED';
  wallet_balance: number;
  total_earned: number;
  paid_amount: number;
  total_orders: number;
  total_sales: number;
  fixed_commission_rate: number;
  user_id?: string;
  created_at: string;
  updated_at: string;
}

export interface RetailPartnerTransaction {
  id: string;
  retail_partner_id: string;
  type: 'commission' | 'payout' | 'reversal';
  amount: number;
  order_id?: string;
  order_ref?: string;
  product_details?: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}

export interface RetailPartnerRegistrationPayload {
  name: string;
  shop_name: string;
  mobile: string;
  email?: string;
  shop_location: string;
  business_details: string;
  preferred_contact: 'mobile' | 'email' | 'whatsapp';
}
