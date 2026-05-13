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
  _id: string;
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'super_admin' | 'owner' | 'manager' | 'cashier' | 'staff' | 'pharmacist' | 'storekeeper' | 'branch_manager';
  avatar?: string;
  phone?: string;
  organization: Organization;
  branch?: Branch;
  permissions?: string[];
  isActive: boolean;
  lastLogin?: string;
}

// Organization Types
export interface Organization {
  _id: string;
  id?: string;
  name: string;
  businessType: 'pharmacy' | 'retail' | 'restaurant' | 'hardware' | 'beauty' | 'electronics' | 'warehouse' | 'clinic' | 'supermarket' | 'salon' | 'cafe';
  email: string;
  logo?: string;
  owner: User;
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
    enableInventory: boolean;
    enablePOS: boolean;
    enableOnline: boolean;
  };
  modules: Record<string, boolean>;
  status: 'active' | 'inactive' | 'suspended';
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
  organization: Organization;
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
  supplier?: Supplier;
  quantity: number;
  minStockLevel: number;
  buyingPrice: number;
  sellingPrice: number;
  unitType: 'pieces' | 'kg' | 'liter' | 'meter' | 'box' | 'pack' | 'dozen';
  genericName?: string;
  strength?: string;
  dosageForm?: string;
  manufacturer?: string;
  batchNumber?: string;
  expiryDate?: string;
  margin: number;
  images?: string[];
  isActive: boolean;
  organization: Organization;
  branch?: Branch;
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
  organization: Organization;
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
  branch?: Branch;
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

// Notification Types
export interface Notification {
  _id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  isRead: boolean;
  organization: Organization;
  createdAt: string;
}
