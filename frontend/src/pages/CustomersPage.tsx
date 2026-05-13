import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Search, Mail, Phone, Edit, Trash2 } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

const CustomersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const customers = [
    { id: 1, name: 'Emma Robinson', email: 'emma@email.com', phone: '+1-555-1001', totalSpent: 250.50, loyaltyPoints: 25, joinDate: '2024-01-15' },
    { id: 2, name: 'David Taylor', email: 'david@email.com', phone: '+1-555-1002', totalSpent: 180.75, loyaltyPoints: 18, joinDate: '2024-02-20' },
    { id: 3, name: 'Sarah Davis', email: 'sarah@email.com', phone: '+1-555-1003', totalSpent: 420.00, loyaltyPoints: 42, joinDate: '2024-03-10' },
    { id: 4, name: 'John Smith', email: 'john@email.com', phone: '+1-555-1004', totalSpent: 125.30, loyaltyPoints: 12, joinDate: '2024-04-05' },
  ];

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
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
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Customers</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage your customer relationships</p>
        </div>
        <Button variant="primary">
          <Plus size={20} className="mr-2" /> Add Customer
        </Button>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search customers by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-12 w-full"
          />
        </div>
      </motion.div>

      {/* Customers Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {filteredCustomers.map((customer, i) => (
          <motion.div
            key={customer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 rounded-full bg-gradient-emerald flex items-center justify-center text-white font-bold text-lg">
                    {customer.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 dark:text-white">{customer.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Since {customer.joinDate}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                    <Edit size={16} className="text-emerald-600" />
                  </button>
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Mail size={14} /> {customer.email}
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Phone size={14} /> {customer.phone}
                </div>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-700 mt-4 pt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Total Spent</p>
                  <p className="font-bold text-emerald-600 text-lg">${customer.totalSpent.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Loyalty Points</p>
                  <p className="font-bold text-teal-600 text-lg">{customer.loyaltyPoints}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CustomersPage;
