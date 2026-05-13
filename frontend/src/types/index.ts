// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  token?: string;
  [key: string]: any;
}

// Auth Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar?: string;
  organization?: Organization;
  branch?: Branch;
}

// Organization Types
export interface Organization {
  _id: string;
  id?: string;
  name: string;
  businessType: string;
  email: string;
  logo?: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
  };
  subscription: {
    plan: 'free' | 'pro' | 'enterprise';
    status: 'active' | 'inactive' | 'cancelled';
    startDate: string;
    renewalDate: string;
  };
  settings: {
    currency: string;
    timezone: string;
    dateFormat: string;
    taxType: string;
    taxRate: number;
  };
  modules: Record<string, boolean>;
}

// Branch Types
export interface Branch {
  _id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  manager?: User;
  isActive: boolean;
}

// Product Types
export interface Product {
  _id: string;
  name: string;
  description?: string;
  sku: string;
  barcode?: string;
  category?: ProductCategory;
  quantity: number;
  minStockLevel: number;
  buyingPrice: number;
  sellingPrice: number;
  unitType: string;
  genericName?: string;
  strength?: string;
  dosageForm?: string;
  manufacturer?: string;
  batchNumber?: string;
  expiryDate?: string;
  margin: number;
  images?: string[];
  isActive: boolean;
}

export interface ProductCategory {
  _id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
}

// Customer Types
export interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  customerType: 'retail' | 'wholesale' | 'corporate';
  loyaltyPoints: number;
  totalPurchases: number;
  notes?: string;
  isActive: boolean;
}

// Sale Types
export interface SaleItem {
  product: Product;
  quantity: number;
  unitPrice: number;
  discount?: number;
  tax?: number;
  total: number;
}

export interface Sale {
  _id: string;
  receiptNumber: string;
  items: SaleItem[];
  customer?: Customer;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'online' | 'check';
  paymentStatus: 'paid' | 'pending' | 'failed';
  status: 'completed' | 'cancelled' | 'pending';
  cashier?: User;
  notes?: string;
  createdAt: string;
}

// Supplier Types
export interface Supplier {
  _id: string;
  name: string;
  email?: string;
  phone: string;
  website?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  contactPerson?: string;
  paymentTerms?: string;
  products?: Product[];
  totalDeliveries?: number;
  isActive: boolean;
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
  discountPercent?: number;
}

// Dashboard Analytics Types
export interface DashboardStats {
  totalRevenue: number;
  totalSales: number;
  totalCustomers: number;
  lowStockProducts: number;
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}
