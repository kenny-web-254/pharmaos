// Business Types
export const BUSINESS_TYPES = {
  PHARMACY: "pharmacy",
  RETAIL: "retail",
  RESTAURANT: "restaurant",
  HARDWARE: "hardware",
  BEAUTY: "beauty",
  ELECTRONICS: "electronics",
  WAREHOUSE: "warehouse",
  CLINIC: "clinic",
  SUPERMARKET: "supermarket",
  SALON: "salon",
  CAFE: "cafe",
};

// User Roles
export const USER_ROLES = {
  SUPER_ADMIN: "super_admin",
  OWNER: "owner",
  MANAGER: "manager",
  CASHIER: "cashier",
  STAFF: "staff",
  PHARMACIST: "pharmacist",
  STOREKEEPER: "storekeeper",
  BRANCH_MANAGER: "branch_manager",
};

// Permissions
export const PERMISSIONS = {
  // Organization
  CREATE_ORGANIZATION: "create_organization",
  MANAGE_ORGANIZATION: "manage_organization",
  VIEW_ORGANIZATION: "view_organization",

  // Users
  MANAGE_USERS: "manage_users",
  VIEW_USERS: "view_users",
  CREATE_USERS: "create_users",

  // Inventory
  MANAGE_INVENTORY: "manage_inventory",
  VIEW_INVENTORY: "view_inventory",
  ADD_PRODUCTS: "add_products",
  EDIT_PRODUCTS: "edit_products",
  DELETE_PRODUCTS: "delete_products",

  // Sales & POS
  ACCESS_POS: "access_pos",
  CREATE_SALES: "create_sales",
  VIEW_SALES: "view_sales",
  VOID_SALES: "void_sales",

  // Reports
  VIEW_REPORTS: "view_reports",
  EXPORT_REPORTS: "export_reports",

  // Settings
  MANAGE_SETTINGS: "manage_settings",
  MANAGE_BRANCHES: "manage_branches",

  // Customers
  MANAGE_CUSTOMERS: "manage_customers",
  VIEW_CUSTOMERS: "view_customers",

  // Suppliers
  MANAGE_SUPPLIERS: "manage_suppliers",
  VIEW_SUPPLIERS: "view_suppliers",
};

// Subscription Plans
export const SUBSCRIPTION_PLANS = {
  FREE: "free",
  PRO: "pro",
  ENTERPRISE: "enterprise",
};

// Plan Limits
export const PLAN_LIMITS = {
  free: {
    branches: 1,
    users: 1,
    products: 100,
    storageGB: 1,
  },
  pro: {
    branches: 5,
    users: 20,
    products: 10000,
    storageGB: 50,
  },
  enterprise: {
    branches: -1, // unlimited
    users: -1,
    products: -1,
    storageGB: -1,
  },
};

// Tax Types
export const TAX_TYPES = {
  VAT: "vat",
  GST: "gst",
  SALES_TAX: "sales_tax",
  CUSTOM: "custom",
};

// Unit Types
export const UNIT_TYPES = {
  PIECES: "pieces",
  KG: "kg",
  LITER: "liter",
  METER: "meter",
  BOX: "box",
  PACK: "pack",
  DOZEN: "dozen",
};

// Currencies
export const CURRENCIES = {
  USD: "USD",
  EUR: "EUR",
  GBP: "GBP",
  INR: "INR",
  PKR: "PKR",
  AED: "AED",
};

// Alert Types
export const ALERT_TYPES = {
  LOW_STOCK: "low_stock",
  EXPIRY: "expiry",
  SYSTEM: "system",
  USER: "user",
};

// Industry Modules
export const INDUSTRY_MODULES = {
  pharmacy: {
    inventory: true,
    pos: true,
    prescriptions: true,
    expiryTracking: true,
    customers: true,
    suppliers: true,
  },
  retail: {
    inventory: true,
    pos: true,
    customers: true,
    suppliers: true,
    barcodeScanning: true,
  },
  restaurant: {
    menu: true,
    kitchen: true,
    pos: true,
    tables: true,
    orders: true,
  },
  clinic: {
    patients: true,
    appointments: true,
    prescriptions: true,
    records: true,
  },
  beauty: {
    appointments: true,
    pos: true,
    customers: true,
    staff: true,
  },
};

// Role Permissions Map
export const ROLE_PERMISSIONS = {
  super_admin: ['*'],
  owner: [
    'manage_organization',
    'manage_users',
    'manage_inventory',
    'access_pos',
    'create_sales',
    'view_sales',
    'void_sales',
    'view_reports',
    'export_reports',
    'manage_settings',
    'manage_branches',
    'manage_customers',
    'manage_suppliers',
  ],
  manager: [
    'view_inventory',
    'manage_inventory',
    'access_pos',
    'create_sales',
    'view_sales',
    'view_reports',
    'manage_customers',
    'manage_suppliers',
  ],
  cashier: [
    'access_pos',
    'create_sales',
    'view_sales',
  ],
  staff: [
    'view_inventory',
    'view_sales',
  ],
  pharmacist: [
    'manage_inventory',
    'view_inventory',
    'access_pos',
    'create_sales',
    'manage_prescriptions',
  ],
  storekeeper: [
    'manage_inventory',
    'view_inventory',
    'manage_suppliers',
  ],
  branch_manager: [
    'manage_inventory',
    'access_pos',
    'create_sales',
    'view_sales',
    'view_reports',
    'manage_customers',
  ],
};
