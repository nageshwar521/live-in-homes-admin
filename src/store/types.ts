export interface ApiSuccessResponse {
  success: boolean;
  message: string;
  data: any;
}

export interface ApiErrorResponse {
  success: boolean;
  message: string;
  error: any;
}

export interface CafeItem {
  id?: string;
  name: string;
  logoUrl: string;
  description: string;
  phone_number: string;
  address: string;
  location: string;
  pincode: string;
}

export interface EmployeeItem {
  first_name: string;
  last_name: string;
  phone_number: string;
  gender: string;
  address: string;
  role?: string;
  cafe: string;
  email_address: string;
  start_date: string;
  password?: string;
}

export interface LocationItem {
  id: string;
  name: string;
}

export interface CategoryItem {
  id: string;
  name: string;
}

export interface BranchItem {
  id?: string;
  name: string;
  logoUrl: string;
  description: string;
  phone_number: string;
  address: string;
  location: string;
  pincode: string;
}

export interface DrinkItem {
  id?: string;
  name: string;
  altName?: string;
  imageUrl?: string;
  description?: string;
  price: string;
  category?: string;
  label?: string;
  discount?: number;
  discountType?: string;
  quantity?: number;
  units?: string;
}
