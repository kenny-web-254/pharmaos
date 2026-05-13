import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Trash2, Home, User, Percent, DollarSign, Save } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { usePosStore } from '../store/posStore';

const POSPage = () => {
  const { cart, discount, paymentMethod, addToCart, removeFromCart, setDiscount, setPaymentMethod, clearCart } = usePosStore();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock products
  const products = [
    { id: 1, name: 'Ibuprofen 200mg', price: 5.99, category: 'medicines' },
    { id: 2, name: 'Vitamin C 1000mg', price: 7.99, category: 'supplements' },
    { id: 3, name: 'Paracetamol 500mg', price: 4.99, category: 'medicines' },
    { id: 4, name: 'Multivitamin Daily', price: 9.99, category: 'supplements' },
  ];

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'medicines', name: 'Medicines' },
    { id: 'supplements', name: 'Supplements' },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const subtotal = cart.reduce((sum, item) => sum + item.product.sellingPrice * item.quantity, 0);
  const total = Math.max(0, subtotal - discount);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
      {/* Products Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:col-span-2 flex flex-col space-y-4 overflow-hidden"
      >
        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gradient-emerald text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <Card className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredProducts.map(product => (
              <motion.button
                key={product.id}
                whileHover={{ y: -4 }}
                onClick={() => addToCart(product as any, 1)}
                className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-lg hover:shadow-lg transition-all text-left"
              >
                <p className="font-bold text-slate-900 dark:text-white text-sm mb-1">{product.name}</p>
                <p className="text-emerald-600 dark:text-emerald-400 font-bold">${product.price.toFixed(2)}</p>
              </motion.button>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Cart Section */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:col-span-1 flex flex-col space-y-4"
      >
        {/* Cart Items */}
        <Card className="flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Order</h3>
            <ShoppingCart size={20} className="text-emerald-600" />
          </div>

          {cart.length === 0 ? (
            <div className="h-32 flex items-center justify-center text-slate-500 dark:text-slate-400">
              <p className="text-center">
                <ShoppingCart size={32} className="mx-auto mb-2 opacity-50" />
                Cart is empty
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {cart.map(item => (
                <motion.div
                  key={item.product.id}
                  layout
                  exit={{ opacity: 0, x: -100 }}
                  className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg flex justify-between items-center"
                >
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{item.product.name}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {item.quantity} × ${item.product.sellingPrice.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </Card>

        {/* Summary */}
        <Card>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Subtotal:</span>
              <span className="font-bold text-slate-900 dark:text-white">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Discount:</span>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                className="w-20 px-2 py-1 rounded text-right bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div className="border-t border-slate-200 dark:border-slate-600 pt-3 flex justify-between">
              <span className="font-bold text-slate-900 dark:text-white">Total:</span>
              <span className="text-2xl font-bold text-emerald-600">${total.toFixed(2)}</span>
            </div>

            <div className="pt-3">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="input-field text-sm"
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="online">Online</option>
              </select>
            </div>

            <Button variant="success" fullWidth size="lg">
              <Save className="mr-2" /> Complete Sale
            </Button>
            <Button variant="secondary" fullWidth onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default POSPage;
