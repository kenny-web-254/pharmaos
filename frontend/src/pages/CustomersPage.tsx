import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Search, Mail, Phone, Edit, Trash2, Award, ShoppingBag, X } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import formatCurrency from '../services/currencyService';
import { useCurrency } from '../hooks/useAuth';
import { useAuthStore } from '../store/authStore';
import { customerService } from '../services/api';
import { Customer } from '../types';
import toast from 'react-hot-toast';

const CustomersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(false);
  const { currency } = useCurrency();
  const { organization } = useAuthStore();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    customerType: 'retail' as 'retail' | 'wholesale' | 'corporate',
  });

  useEffect(() => {
    if (organization) {
      fetchCustomers();
    }
  }, [organization]);

  const fetchCustomers = async () => {
    if (!organization) return;
    setLoading(true);
    try {
      const response = await customerService.getCustomers(organization._id);
      setCustomers(response.data.customers);
    } catch (error: any) {
      console.error('Error fetching customers:', error);
      toast.error('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(c =>
    c.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  const handleSubmitCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!organization) return;

    setLoading(true);
    try {
      if (selectedCustomer) {
        await customerService.updateCustomer(organization._id, selectedCustomer._id, formData);
        toast.success('Customer updated successfully');
        setShowEditModal(false);
      } else {
        await customerService.createCustomer(organization._id, formData);
        toast.success('Customer created successfully');
        setShowAddModal(false);
      }
      resetForm();
      fetchCustomers();
    } catch (err: any) {
      console.error('Customer save error:', err);
      toast.error(err.response?.data?.message || 'Failed to save customer');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCustomer = async (customerId: string) => {
    if (!window.confirm('Are you sure you want to delete this customer?')) return;
    if (!organization) return;

    setLoading(true);
    try {
      // Soft delete - set isActive to false
      await customerService.updateCustomer(organization._id, customerId, { isActive: false });
      toast.success('Customer deleted successfully');
      fetchCustomers();
    } catch (err: any) {
      console.error('Delete error:', err);
      toast.error('Failed to delete customer');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setFormData({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email || '',
      phone: customer.phone,
      address: customer.address || '',
      city: customer.city || '',
      state: customer.state || '',
      customerType: customer.customerType,
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      customerType: 'retail',
    });
    setSelectedCustomer(null);
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
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Customers</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage your customer relationships</p>
        </div>
        <Button variant="primary" onClick={() => { resetForm(); setShowAddModal(true); }}>
          <Plus className="w-4 h-4 mr-2" /> Add Customer
        </Button>
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
            placeholder="Search customers by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl"
          />
        </div>
      </motion.div>

      {/* Customers Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {filteredCustomers.map((customer, i) => (
          <motion.div
            key={customer._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <Card glass className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-emerald flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {customer.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 dark:text-white">{customer.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Since {customer.joinDate}</p>
                  </div>
               </div>
                 <div className="flex gap-2">
                   <button
                     onClick={() => handleEditCustomer(customer as any)}
                     className="p-2 glass rounded-lg hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all"
                     title="Edit customer"
                   >
                     <Edit className="w-4 h-4 text-slate-600" />
                   </button>
                   <button
                     onClick={() => handleDeleteCustomer(customer._id)}
                     className="p-2 glass rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                     title="Delete customer"
                   >
                     <Trash2 className="w-4 h-4 text-red-600" />
                   </button>
                 </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Mail className="w-3.5 h-3.5" /> {customer.email}
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Phone className="w-3.5 h-3.5" /> {customer.phone}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/30 dark:border-slate-700/50 grid grid-cols-2 gap-3">
                <div className="text-center p-2 glass rounded-lg">
                  <ShoppingBag className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <p className="text-xs text-slate-500 dark:text-slate-400">Total Spent</p>
                  <p className="font-bold text-slate-900 dark:text-white">{formatCurrency(customer.totalSpent, currency)}</p>
                </div>
                <div className="text-center p-2 glass rounded-lg">
                  <Award className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                  <p className="text-xs text-slate-500 dark:text-slate-400">Loyalty</p>
                  <p className="font-bold text-slate-900 dark:text-white">{customer.loyaltyPoints}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Add/Edit Customer Modal */}
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
                {selectedCustomer ? 'Edit Customer' : 'Add New Customer'}
              </h2>
              <button
                onClick={() => { setShowAddModal(false); setShowEditModal(false); resetForm(); }}
                className="p-2 glass rounded-lg hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <form onSubmit={handleSubmitCustomer} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="input-field"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="input-field"
                    placeholder="Smith"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="input-field"
                  placeholder="+1-555-1000"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Customer Type
                </label>
                <select
                  value={formData.customerType}
                  onChange={(e) => setFormData({ ...formData, customerType: e.target.value as any })}
                  className="input-field"
                >
                  <option value="retail">Retail</option>
                  <option value="wholesale">Wholesale</option>
                  <option value="corporate">Corporate</option>
                </select>
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
                  {selectedCustomer ? 'Update' : 'Create'} Customer
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default CustomersPage;
