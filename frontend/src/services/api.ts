import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// Auth Services
export const authService = {
  register: (data: any) => api.post('/auth/register', data),
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  getCurrentUser: () => api.get('/auth/me'),
  updateProfile: (data: any) => api.put('/auth/profile', data),
  changePassword: (data: any) => api.post('/auth/change-password', data),
};

// Organization Services
export const organizationService = {
  getOrganization: (orgId: string) => api.get(`/organizations/${orgId}`),
  updateSettings: (orgId: string, data: any) =>
    api.put(`/organizations/${orgId}/settings`, data),
  getUsers: (orgId: string, page = 1, limit = 10) =>
    api.get(`/organizations/${orgId}/users`, { params: { page, limit } }),
  inviteUser: (orgId: string, data: any) =>
    api.post(`/organizations/${orgId}/users/invite`, data),
  updateUserRole: (orgId: string, userId: string, data: any) =>
    api.put(`/organizations/${orgId}/users/${userId}/role`, data),
  deactivateUser: (orgId: string, userId: string) =>
    api.put(`/organizations/${orgId}/users/${userId}/deactivate`),
  getBranches: (orgId: string) => api.get(`/organizations/${orgId}/branches`),
  createBranch: (orgId: string, data: any) =>
    api.post(`/organizations/${orgId}/branches`, data),
};

// Product Services
export const productService = {
  getProducts: (orgId: string, params: any = {}) =>
    api.get(`/inventory/${orgId}/products`, { params }),
  getProductById: (orgId: string, productId: string) =>
    api.get(`/inventory/${orgId}/products/${productId}`),
  createProduct: (orgId: string, data: any) =>
    api.post(`/inventory/${orgId}/products`, data),
  updateProduct: (orgId: string, productId: string, data: any) =>
    api.put(`/inventory/${orgId}/products/${productId}`, data),
  deleteProduct: (orgId: string, productId: string) =>
    api.delete(`/inventory/${orgId}/products/${productId}`),
  adjustStock: (orgId: string, productId: string, data: any) =>
    api.post(`/inventory/${orgId}/products/${productId}/adjust-stock`, data),
  getLowStockProducts: (orgId: string) =>
    api.get(`/inventory/${orgId}/products/low-stock`),
  getCategories: (orgId: string) =>
    api.get(`/inventory/${orgId}/categories`),
  createCategory: (orgId: string, data: any) =>
    api.post(`/inventory/${orgId}/categories`, data),
};

// Sales Services
export const salesService = {
  createSale: (orgId: string, branchId: string, data: any) =>
    api.post(`/pos/${orgId}/branches/${branchId}/sales`, data),
  getSalesHistory: (orgId: string, branchId: string, params: any = {}) =>
    api.get(`/pos/${orgId}/branches/${branchId}/sales`, { params }),
  getSaleDetails: (orgId: string, saleId: string) =>
    api.get(`/pos/${orgId}/sales/${saleId}`),
  voidSale: (orgId: string, saleId: string, data: any) =>
    api.post(`/pos/${orgId}/sales/${saleId}/void`, data),
  getDailySalesReport: (orgId: string, branchId: string, date: string) =>
    api.get(`/pos/${orgId}/branches/${branchId}/sales/reports/daily`, {
      params: { date },
    }),
};

// Customer Services
export const customerService = {
  getCustomers: (orgId: string, params: any = {}) =>
    api.get(`/managers/${orgId}/customers`, { params }),
  createCustomer: (orgId: string, data: any) =>
    api.post(`/managers/${orgId}/customers`, data),
  updateCustomer: (orgId: string, customerId: string, data: any) =>
    api.put(`/managers/${orgId}/customers/${customerId}`, data),
  getCustomerDetails: (orgId: string, customerId: string) =>
    api.get(`/managers/${orgId}/customers/${customerId}`),
};

// Supplier Services
export const supplierService = {
  getSuppliers: (orgId: string, params: any = {}) =>
    api.get(`/managers/${orgId}/suppliers`, { params }),
  createSupplier: (orgId: string, data: any) =>
    api.post(`/managers/${orgId}/suppliers`, data),
  updateSupplier: (orgId: string, supplierId: string, data: any) =>
    api.put(`/managers/${orgId}/suppliers/${supplierId}`, data),
};
