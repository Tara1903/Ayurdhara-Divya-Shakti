// Address Types — Phase 5
// DB-ready interfaces for Supabase or any backend

export type AddressType = 'home' | 'work' | 'other';

export interface Address {
  id?: string;              // Will be set by backend
  customerId?: string;      // For logged-in users — Phase 6
  fullName: string;
  mobile: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  pinCode: string;
  city: string;
  state: string;
  country: string;
  addressType: AddressType;
  isDefault?: boolean;
}

export interface PinServiceabilityResult {
  pinCode: string;
  isServiceable: boolean;
  estimatedDeliveryDays?: number;
  estimatedDeliveryDate?: string;
  isCodAvailable?: boolean;
  shippingCharge?: number;
  message?: string;
}

// Indian states list for the address form dropdown
export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];
