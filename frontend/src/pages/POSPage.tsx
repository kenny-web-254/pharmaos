import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Trash2, Home, User, Percent, DollarSign, Save, Scan, Search } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { usePosStore } from '../store/posStore';

const POSPage = () => {
  const { cart, discount, paymentMethod, addToCart, removeFromCart, setDiscount, setPaymentMethod, clearCart } = usePosStore();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showScanner, setShowScanner] = useState(false);

  const products = [
    { _id: '1', name: 'Ibuprofen 200mg', sellingPrice: 5.99, category: 'medicines', quantity: 100 },
    { _id: '2', name: 'Vitamin C 1000mg', sellingPrice: 7.99, category: 'supplements', quantity: 50 },
    { _id: '3', name: 'Paracetamol 500mg', sellingPrice: 4.99, category: 'medicines', quantity: 75 },
    { _id: '4', name: 'Multivitamin Daily', sellingPrice: 9.99, category: 'supplements', quantity: 30 },
    { _id: '5', name: 'Amoxicillin 500mg', sellingPrice: 12.50, category: 'medicines', quantity: 20 },
    { _id: '6', name: 'Omega-3 Capsules', sellingPrice: 15.99, category: 'supplements', quantity: 40 },
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'medicines', name: 'Medicines' },
    { id: 'supplements', name: 'Supplements' },
  ];

  const filteredProducts = products
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const subtotal = cart.reduce((sum, item) => sum + item.product.sellingPrice * item.quantity, 0);
  const total = Math.max(0, subtotal - discount);

  const handleBarcodeScan = () => {
    setShowScanner(true);
    setTimeout(() => {
      setShowScanner(false);
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
      {/* Products Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:col-span-2 flex flex-col space-y-4 overflow-hidden"
      >
        {/* Search & Scanner */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl"
            />
          </div>
          <Button variant="outline" onClick={handleBarcodeScan} className="px-4">
            <Scan className="w-5 h-5" />
          </Button>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gradient-emerald text-white shadow-md'
                  : 'glass text-slate-700 dark:text-slate-300 hover:bg-white/60'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <Card glass className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredProducts.map(product => (
              <motion.button
                key={product._id}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => addToCart(product as any, 1)}
                className="p-4 glass-card rounded-xl text-left transition-all hover:shadow-premium group"
              >
                <div className="mb-2">
                  <p className="font-bold text-slate-900 dark:text-white text-sm group-hover:gradient-text transition-all">{product.name}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">${product.sellingPrice.toFixed(2)}</span>
                    <span className="text-xs text-slate-500 bg-slate-200/50 dark:bg-slate-700/50 px-2 py-0.5 rounded-full">
                      {product.quantity} left
                    </span>
                  </div>
                </div>
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
        <Card glass className="flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Order Summary</h3>
            <ShoppingCart className="w-5 h-5 text-emerald-600" />
          </div>

          {cart.length === 0 ? (
            <div className="h-32 flex items-center justify-center text-slate-500 dark:text-slate-400">
              <p className="text-center">
                <ShoppingCart className="w-10 h-10 mx-auto mb-2 opacity-30" />
                Cart is empty
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map(item => (
                <motion.div
                  key={item.product._id}
                  layout
                  exit={{ opacity: 0, x: -100 }}
                  className="p-3 glass rounded-lg flex justify-between items-center"
                >
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{item.product.name}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {item.quantity} × ${item.product.sellingPrice.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </Card>

        {/* Summary */}
        <Card glass>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Subtotal:</span>
              <span className="font-bold text-slate-900 dark:text-white">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm items-center">
              <span className="text-slate-600 dark:text-slate-400">Discount:</span>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                className="w-20 px-2 py-1 rounded-lg text-right bg-white/50 dark:bg-slate-800/50 backdrop-blur border border-white/30"
                placeholder="0"
              />
            </div>
            <div className="border-t border-white/30 dark:border-slate-700/50 pt-3 flex justify-between">
              <span className="font-bold text-slate-900 dark:text-white">Total:</span>
              <span className="text-3xl font-bold gradient-text">${total.toFixed(2)}</span>
            </div>

            <div className="pt-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="input-field text-sm bg-white/50 dark:bg-slate-800/50"
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="online">Online</option>
              </select>
            </div>

            <div className="pt-2 space-y-2">
              <Button variant="primary" fullWidth size="lg" className="shadow-lg">
                <Save className="mr-2 w-5 h-5" /> Complete Sale
              </Button>
              <Button variant="outline" fullWidth onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default POSPage;
