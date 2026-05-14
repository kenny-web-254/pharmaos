import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Plus, Search, Trash2, Edit, AlertTriangle, Download, X, QrCode } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import formatCurrency from '../services/currencyService';
import { useCurrency } from '../hooks/useAuth';
import { useAuthStore } from '../store/authStore';
import { productService } from '../services/api';
import { Product } from '../types';
import toast from 'react-hot-toast';

const InventoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { currency } = useCurrency();
  const { organization } = useAuthStore();

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!organization) return;

    setLoading(true);
    try {
      if (selectedProduct) {
        await productService.updateProduct(organization._id, selectedProduct._id, formData);
        toast.success('Product updated successfully');
        setShowEditModal(false);
      } else {
        await productService.createProduct(organization._id, formData);
        toast.success('Product created successfully');
        setShowAddModal(false);
      }
      resetForm();
      fetchProducts();
    } catch (err: any) {
      console.error('Product save error:', err);
      toast.error(err.response?.data?.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    if (!organization) return;

    setLoading(true);
    try {
      await productService.deleteProduct(organization._id, productId);
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (err: any) {
      console.error('Delete error:', err);
      toast.error('Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      sku: product.sku,
      quantity: product.quantity,
      minStockLevel: product.minStockLevel,
      buyingPrice: product.buyingPrice,
      sellingPrice: product.sellingPrice,
      category: product.category?.name || 'medicines',
    });
    setShowEditModal(true);
  };

  const handleExport = () => {
    toast('Export feature coming soon!', { icon: '📊' });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      sku: '',
      quantity: 0,
      minStockLevel: 10,
      buyingPrice: 0,
      sellingPrice: 0,
    });
    setSelectedProduct(null);
  };

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
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
          <Button variant="primary" onClick={() => { resetForm(); setShowAddModal(true); }}>
            <Plus className="w-4 h-4 mr-2" /> Add Product
          </Button>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by product name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl"
          />
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
                 {filteredProducts.map((product) => {
                   const isLowStock = product.quantity <= product.minStockLevel;
                   return (
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
                             {isLowStock && (
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
                           isLowStock
                             ? 'bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 text-yellow-700 dark:text-yellow-300'
                             : 'bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300'
                         }`}>
                           {product.quantity}
                         </span>
                       </td>
                    <td className="py-4 px-4 text-center text-slate-600 dark:text-slate-400">{product.minStockLevel}</td>
                    <td className="py-4 px-4 text-right text-slate-900 dark:text-white text-sm">{formatCurrency(product.buyingPrice, currency)}</td>
                    <td className="py-4 px-4 text-right text-slate-900 dark:text-white font-bold text-sm">{formatCurrency(product.sellingPrice, currency)}</td>
                    <td className="py-4 px-4 text-right text-emerald-600 font-bold">{product.margin}%</td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => toast('QR code feature coming soon!', { icon: '📱' })}
                          className="p-2 glass rounded-lg hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all"
                          title="Scan QR"
                        >
                          <QrCode className="w-4 h-4 text-emerald-600" />
                        </button>
                        <button
                          onClick={() => handleEditProduct(product as any)}
                          className="p-2 glass rounded-lg hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all"
                          title="Edit product"
                        >
                          <Edit className="w-4 h-4 text-slate-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="p-2 glass rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                 ))}
               </tbody>
            </table>
          </div>
        </Card>
      </motion.div>

      {/* Add/Edit Product Modal */}
      {(showAddModal || showEditModal) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => { setShowAddModal(false); setShowEditModal(false); resetForm(); }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {selectedProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={() => { setShowAddModal(false); setShowEditModal(false); resetForm(); }}
                className="p-2 glass rounded-lg hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <form onSubmit={handleSubmitProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  placeholder="Enter product name"
                  required
                />
              </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    SKU
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="input-field"
                    placeholder="e.g., IBU-200"
                  />
                </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Buying Price (KES)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.buyingPrice}
                    onChange={(e) => setFormData({ ...formData, buyingPrice: parseFloat(e.target.value) || 0 })}
                    className="input-field"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Selling Price (KES)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.sellingPrice}
                    onChange={(e) => setFormData({ ...formData, sellingPrice: parseFloat(e.target.value) || 0 })}
                    className="input-field"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Initial Quantity
                  </label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                    className="input-field"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Min Stock Level
                  </label>
                  <input
                    type="number"
                    value={formData.minStockLevel}
                    onChange={(e) => setFormData({ ...formData, minStockLevel: parseInt(e.target.value) || 10 })}
                    className="input-field"
                    placeholder="10"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  fullWidth
                  onClick={() => { setShowAddModal(false); setShowEditModal(false); resetForm(); }}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" fullWidth loading={loading}>
                  {selectedProduct ? 'Update' : 'Create'} Product
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default InventoryPage;
