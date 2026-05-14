import { create } from 'zustand';
import { Product, CartItem } from '../types/index';

interface PosStore {
  cart: CartItem[];
  discount: number;
  paymentMethod: 'cash' | 'card' | 'online' | 'check';
  selectedCustomer: any | null;

  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartItem: (productId: string, quantity: number, discount?: number) => void;
  setDiscount: (discount: number) => void;
  setPaymentMethod: (method: 'cash' | 'card' | 'online' | 'check') => void;
  setSelectedCustomer: (customer: any) => void;
  getCartTotal: () => number;
  clearCart: () => void;
}

export const usePosStore = create<PosStore>((set, get) => ({
  cart: [],
  discount: 0,
  paymentMethod: 'cash',
  selectedCustomer: null,

  addToCart: (product, quantity) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.product._id === product._id);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.product._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { product, quantity }] };
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.product._id !== productId),
    })),

  updateCartItem: (productId, quantity, discount) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.product._id === productId
          ? { ...item, quantity, discountPercent: discount }
          : item
      ),
    })),

  setDiscount: (discount) => set({ discount }),
  setPaymentMethod: (method) => set({ paymentMethod: method }),
  setSelectedCustomer: (customer) => set({ selectedCustomer: customer }),

   getCartTotal: () => {
     const state = get();
     let total = state.cart.reduce(
       (sum, item) => {
         const lineTotal = item.product.sellingPrice * item.quantity;
         const itemDiscount = item.discountPercent ? lineTotal * (item.discountPercent / 100) : 0;
         return sum + (lineTotal - itemDiscount);
       },
       0
     );
     total -= state.discount;
     return Math.max(0, total);
   },

  clearCart: () =>
    set({ cart: [], discount: 0, paymentMethod: 'cash', selectedCustomer: null }),
}));
