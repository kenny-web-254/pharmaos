import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Plus, Search, Trash2, Edit, AlertTriangle, QrCode, Download, Filter } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

const InventoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    { _id: '1', name: 'Ibuprofen 200mg', sku: 'IBU-200', quantity: 150, minStock: 20, buyingPrice: 2.5, sellingPrice: 5.99, margin: '139.6%', category: 'medicines' },
    { _id: '2', name: 'Vitamin C 1000mg', sku: 'VIT-C1000', quantity: 200, minStock: 30, buyingPrice: 3.0, sellingPrice: 7.99, margin: '166.3%', category: 'supplements' },
    { _id: '3', name: 'Paracetamol 500mg', sku: 'PAR-500', quantity: 8, minStock: 20, buyingPrice: 2.0, sellingPrice: 4.99, margin: '149.5%', warning: true, category: 'medicines' },
    { _id: '4', name: 'Cough Syrup 200ml', sku: 'COUGH-200', quantity: 45, minStock: 10, buyingPrice: 3.5, sellingPrice: 7.99, margin: '128.3%', category: 'medicines' },
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'medicines', name: 'Medicines' },
    { id: 'supplements', name: 'Supplements' },
  ];

  const filteredProducts = products.filter(p =>
    (p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     p.sku.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === 'all' || p.category === selectedCategory)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Inventory</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage your products and stock</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Product
          </Button>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by product name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gradient-emerald text-white shadow-md'
                  : 'glass text-slate-700 dark:text-slate-300'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card glass>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/30 dark:border-slate-700/50">
                  <th className="text-left py-4 px-4 font-semibold text-slate-900 dark:text-white">Product</th>
                  <th className="text-left py-4 px-4 font-semibold text-slate-900 dark:text-white">SKU</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-900 dark:text-white">Qty</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-900 dark:text-white">Min</th>
                  <th className="text-right py-4 px-4 font-semibold text-slate-900 dark:text-white">Buy</th>
                  <th className="text-right py-4 px-4 font-semibold text-slate-900 dark:text-white">Sell</th>
                  <th className="text-right py-4 px-4 font-semibold text-slate-900 dark:text-white">Margin</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <motion.tr
                    key={product._id}
                    whileHover={{ backgroundColor: 'rgba(16, 185, 129, 0.05)' }}
                    className="border-b border-white/20 dark:border-slate-700/30"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-gradient-emerald rounded-xl flex items-center justify-center shadow-md">
                          <Package className="text-white w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{product.name}</p>
                          {product.warning && (
                            <div className="flex items-center gap-1 mt-1">
                              <AlertTriangle className="w-3 h-3 text-yellow-600" />
                              <span className="text-yellow-600 text-xs font-medium">Low Stock</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-600 dark:text-slate-400 font-mono text-sm">{product.sku}</td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-3 py-1.5 rounded-full text-sm font-bold ${
                        product.warning 
                          ? 'bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 text-yellow-700 dark:text-yellow-300' 
                          : 'bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300'
                      }`}>
                        {product.quantity}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center text-slate-600 dark:text-slate-400">{product.minStock}</td>
                    <td className="py-4 px-4 text-right text-slate-900 dark:text-white">${product.buyingPrice.toFixed(2)}</td>
                    <td className="py-4 px-4 text-right text-slate-900 dark:text-white font-bold">${product.sellingPrice.toFixed(2)}</td>
                    <td className="py-4 px-4 text-right text-emerald-600 font-bold">{product.margin}</td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button className="p-2 glass rounded-lg hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all">
                          <QrCode className="w-4 h-4 text-emerald-600" />
                        </button>
                        <button className="p-2 glass rounded-lg hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all">
                          <Edit className="w-4 h-4 text-slate-600" />
                        </button>
                        <button className="p-2 glass rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default InventoryPage;
