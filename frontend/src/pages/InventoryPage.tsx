import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Plus, Search, Trash2, Edit, AlertTriangle } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

const InventoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const products = [
    { id: 1, name: 'Ibuprofen 200mg', sku: 'IBU-200', quantity: 150, minStock: 20, buyingPrice: 2.5, sellingPrice: 5.99, margin: '139.6%' },
    { id: 2, name: 'Vitamin C 1000mg', sku: 'VIT-C1000', quantity: 200, minStock: 30, buyingPrice: 3.0, sellingPrice: 7.99, margin: '166.3%' },
    { id: 3, name: 'Paracetamol 500mg', sku: 'PAR-500', quantity: 8, minStock: 20, buyingPrice: 2.0, sellingPrice: 4.99, margin: '149.5%', warning: true },
    { id: 4, name: 'Cough Syrup 200ml', sku: 'COUGH-200', quantity: 45, minStock: 10, buyingPrice: 3.5, sellingPrice: 7.99, margin: '128.3%' },
  ];

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
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
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          <Plus size={20} className="mr-2" /> Add Product
        </Button>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by product name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-12 w-full"
          />
        </div>
      </motion.div>

      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Product</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">SKU</th>
                  <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">Qty</th>
                  <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">Min</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900 dark:text-white">Buy Price</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900 dark:text-white">Sell Price</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900 dark:text-white">Margin</th>
                  <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <motion.tr
                    key={product.id}
                    whileHover={{ backgroundColor: 'rgba(15, 185, 129, 0.05)' }}
                    className="border-b border-slate-100 dark:border-slate-700"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-emerald rounded-lg flex items-center justify-center">
                          <Package className="text-white" size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">{product.name}</p>
                          {product.warning && (
                            <div className="flex items-center gap-1 mt-1 text-yellow-600 text-xs font-medium">
                              <AlertTriangle size={12} /> Low Stock
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-600 dark:text-slate-400">{product.sku}</td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        product.warning ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
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
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                          <Edit size={16} className="text-emerald-600" />
                        </button>
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                          <Trash2 size={16} className="text-red-600" />
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

      {/* Add: Product Modal would go here in a real implementation */}
    </div>
  );
};

export default InventoryPage;
