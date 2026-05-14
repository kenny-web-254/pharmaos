import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, Percent, DollarSign, Save, Scan, Search } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { usePosStore } from '../store/posStore';
import formatCurrency from '../services/currencyService';
import { useCurrency } from '../hooks/useAuth';
import { useAuthStore } from '../store/authStore';
import { salesService } from '../services/api';
import BarcodeScanner from '../components/BarcodeScanner';
import toast from 'react-hot-toast';

const POSPage = () => {
  const { cart, discount, paymentMethod, selectedCustomer, addToCart, removeFromCart, setDiscount, setPaymentMethod, setSelectedCustomer, clearCart } = usePosStore();
  const { currency } = useCurrency();
  const { organization, selectedBranch } = useAuthStore();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [processingSale, setProcessingSale] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<any | null>(null);

  const handleBarcodeScan = () => {
    setShowScanner(true);
  };

  const handleScanSuccess = (decodedText: string) => {
    setShowScanner(false);
    // Search for product by barcode or SKU in the products list
    const product = products.find(p => p._id === decodedText || p.sku === decodedText);
    if (product) {
      addToCart(product as any, 1);
      toast.success(`Added ${product.name} to cart`);
    } else {
      toast.error('Product not found');
    }
  };

  const products = [
    { _id: '1', name: 'Ibuprofen 200mg', sellingPrice: 779, category: 'medicines', quantity: 100 },
    { _id: '2', name: 'Vitamin C 1000mg', sellingPrice: 1039, category: 'supplements', quantity: 50 },
    { _id: '3', name: 'Paracetamol 500mg', sellingPrice: 649, category: 'medicines', quantity: 75 },
    { _id: '4', name: 'Multivitamin Daily', sellingPrice: 1299, category: 'supplements', quantity: 30 },
    { _id: '5', name: 'Amoxicillin 500mg', sellingPrice: 1625, category: 'medicines', quantity: 20 },
    { _id: '6', name: 'Omega-3 Capsules', sellingPrice: 2079, category: 'supplements', quantity: 40 },
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
  };

  const handleScanSuccess = (decodedText: string) => {
    setShowScanner(false);
    // Search for product by barcode or SKU in the products list
    const product = products.find(p => p._id === decodedText || p.sku === decodedText);
    if (product) {
      addToCart(product as any, 1);
      toast.success(`Added ${product.name} to cart`);
    } else {
      toast.error('Product not found');
    }
  };

  const handleCompleteSale = async () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    if (!organization) {
      toast.error('Organization not found. Please login again.');
      return;
    }

    if (!selectedBranch) {
      toast.error('Please select a branch first');
      return;
    }

    setProcessingSale(true);

    try {
      const items = cart.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        unitPrice: item.product.sellingPrice,
        discount: item.discountPercent || 0,
      }));

      const response = await salesService.createSale(
        organization._id,
        selectedBranch._id,
        {
          items,
          discount,
          paymentMethod,
          customer: selectedCustomer?._id || null,
        }
      );

      toast.success('Sale completed successfully!');
      clearCart();
      // TODO: Show receipt or navigate to receipt page
    } catch (err: any) {
      console.error('Sale error:', err);
      toast.error(err.response?.data?.message || 'Failed to complete sale');
    } finally {
      setProcessingSale(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 h-auto lg:h-[calc(100vh-120px)] p-2 lg:p-0">
      {/* Barcode Scanner Modal */}
      {showScanner && (
        <BarcodeScanner
          onScan={handleScanSuccess}
          onClose={() => setShowScanner(false)}
        />
      )}

      {/* Products Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:col-span-2 flex flex-col space-y-3 lg:space-y-4 overflow-hidden"
      >
        {/* Search & Scanner */}
        <div className="flex gap-2 lg:gap-3">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 lg:w-5 h-4 lg:h-5 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl text-sm lg:text-base w-full"
            />
          </div>
          <Button variant="outline" onClick={handleBarcodeScan} className="px-2 lg:px-4 py-2">
            <Scan className="w-4 lg:w-5 h-4 lg:h-5" />
          </Button>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 lg:px-4 py-2 rounded-xl whitespace-nowrap transition-all text-sm lg:text-base ${
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 lg:gap-3">
            {filteredProducts.map(product => (
              <motion.button
                key={product._id}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => addToCart(product as any, 1)}
                className="p-2 lg:p-4 glass-card rounded-xl text-left transition-all hover:shadow-premium group"
              >
                <div className="mb-2">
                  <p className="font-bold text-slate-900 dark:text-white text-xs lg:text-sm group-hover:gradient-text transition-all line-clamp-2">{product.name}</p>
                  <div className="flex items-center justify-between mt-2 flex-wrap gap-1">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs lg:text-sm">{formatCurrency(product.sellingPrice, currency)}</span>
                    <span className="text-xs text-slate-500 bg-slate-200/50 dark:bg-slate-700/50 px-2 py-0.5 rounded-full">
                      {product.quantity}
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
        className="lg:col-span-1 flex flex-col space-y-3 lg:space-y-4"
      >
        {/* Cart Items */}
        <Card glass className="flex-1 overflow-y-auto min-h-64 lg:min-h-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base lg:text-lg text-slate-900 dark:text-white">Order Summary</h3>
            <ShoppingCart className="w-4 lg:w-5 h-4 lg:h-5 text-emerald-600" />
          </div>

          {cart.length === 0 ? (
            <div className="h-32 flex items-center justify-center text-slate-500 dark:text-slate-400">
              <p className="text-center text-sm">
                <ShoppingCart className="w-8 lg:w-10 h-8 lg:h-10 mx-auto mb-2 opacity-30" />
                Cart is empty
              </p>
            </div>
          ) : (
            <div className="space-y-2 lg:space-y-3">
              {cart.map(item => (
                <motion.div
                  key={item.product._id}
                  layout
                  exit={{ opacity: 0, x: -100 }}
                  className="p-2 lg:p-3 glass rounded-lg flex justify-between items-center gap-2"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs lg:text-sm font-bold text-slate-900 dark:text-white truncate">{item.product.name}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {item.quantity} × {formatCurrency(item.product.sellingPrice, currency)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors flex-shrink-0"
                  >
                    <Trash2 className="w-3 lg:w-4 h-3 lg:h-4 text-red-600" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </Card>

        {/* Summary */}
        <Card glass>
          <div className="space-y-3 lg:space-y-4">
            <div className="flex justify-between text-xs lg:text-sm">
              <span className="text-slate-600 dark:text-slate-400">Subtotal:</span>
              <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(subtotal, currency)}</span>
            </div>
            <div className="flex justify-between text-xs lg:text-sm items-center gap-2">
              <span className="text-slate-600 dark:text-slate-400">Discount:</span>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                className="w-16 lg:w-20 px-2 py-1 rounded-lg text-right text-xs lg:text-sm bg-white/50 dark:bg-slate-800/50 backdrop-blur border border-white/30"
                placeholder="0"
              />
            </div>
            <div className="border-t border-white/30 dark:border-slate-700/50 pt-3 flex justify-between items-center">
              <span className="font-bold text-slate-900 dark:text-white text-sm lg:text-base">Total:</span>
              <span className="text-2xl lg:text-3xl font-bold gradient-text">{formatCurrency(total, currency)}</span>
            </div>

            <div className="pt-2">
              <label className="text-xs lg:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="input-field text-xs lg:text-sm bg-white/50 dark:bg-slate-800/50 w-full"
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="online">Online</option>
              </select>
            </div>

            <div className="pt-2 space-y-2">
              <Button
                variant="primary"
                fullWidth
                size="lg"
                className="shadow-lg text-xs lg:text-base"
                onClick={handleCompleteSale}
                loading={processingSale}
                disabled={cart.length === 0}
              >
                <Save className="w-3 lg:w-5 h-3 lg:h-5 mr-2" /> Complete Sale
              </Button>
              <Button variant="outline" fullWidth onClick={clearCart} className="text-xs lg:text-base">
                Clear Cart
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
};

export default POSPage;
