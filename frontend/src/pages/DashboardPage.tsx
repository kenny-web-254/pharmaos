import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Package, AlertTriangle, DollarSign, ShoppingCart, Calendar } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAuthStore } from '../store/authStore';
import StatCard from '../components/StatCard';
import Card from '../components/Card';

const chartData = [
  { name: 'Mon', sales: 4000, revenue: 2400 },
  { name: 'Tue', sales: 3000, revenue: 1398 },
  { name: 'Wed', sales: 3500, revenue: 9800 },
  { name: 'Thu', sales: 4200, revenue: 3908 },
  { name: 'Fri', sales: 2780, revenue: 9800 },
  { name: 'Sat', sales: 1890, revenue: 4300 },
  { name: 'Sun', sales: 2390, revenue: 3800 },
];

const pieData = [
  { name: 'Medicines', value: 45 },
  { name: 'Supplements', value: 30 },
  { name: 'Medical Devices', value: 15 },
  { name: 'Other', value: 10 },
];

const COLORS = ['#10b981', '#06b6d4', '#0ea5e9', '#8b5cf6'];

const DashboardPage = () => {
  const { organization } = useAuthStore();
  const [stats] = useState({
    totalRevenue: 125430,
    totalSales: 342,
    totalCustomers: 156,
    lowStockProducts: 12,
  });

  const recentSales = [
    { id: 1, customer: 'John Smith', amount: 250.50, time: '2 hours ago' },
    { id: 2, customer: 'Emma Wilson', amount: 125.00, time: '4 hours ago' },
    { id: 3, customer: 'David Brown', amount: 450.75, time: '6 hours ago' },
    { id: 4, customer: 'Sarah Davis', amount: 85.25, time: '1 day ago' },
  ];

  const lowStockItems = [
    { id: 1, name: 'Ibuprofen 200mg', stock: 8, threshold: 20 },
    { id: 2, name: 'Paracetamol 500mg', stock: 5, threshold: 15 },
    { id: 3, name: 'Cough Syrup', stock: 3, threshold: 10 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400">Welcome back to <span className="gradient-text font-semibold">{organization?.name}</span></p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <StatCard
            icon={<DollarSign size={24} />}
            label="Total Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            trend={12.5}
            color="emerald"
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <StatCard
            icon={<BarChart3 size={24} />}
            label="Total Sales"
            value={stats.totalSales}
            trend={8.2}
            color="teal"
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <StatCard
            icon={<Users size={24} />}
            label="Customers"
            value={stats.totalCustomers}
            trend={5.1}
            color="blue"
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <StatCard
            icon={<AlertTriangle size={24} />}
            label="Low Stock"
            value={stats.lowStockProducts}
            color="yellow"
          />
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card glass>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Sales & Revenue</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 183, 0.2)" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid rgba(148, 163, 183, 0.3)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="revenue" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Top Selling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card glass>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Top Products</h2>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex justify-between items-center p-2.5 rounded-lg hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-emerald flex items-center justify-center text-white text-xs font-bold">
                      #{i}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">Product {i}</p>
                      <p className="text-xs text-slate-500">250 sold</p>
                    </div>
                  </div>
                  <p className="text-emerald-600 font-bold">${(i * 150).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card glass>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <ShoppingCart className="text-emerald-600" />
              Recent Sales
            </h2>
            <div className="space-y-3">
              {recentSales.map((sale) => (
                <div key={sale.id} className="flex justify-between items-center p-3 glass rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{sale.customer}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{sale.time}</p>
                  </div>
                  <p className="font-bold text-emerald-600">${sale.amount.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Low Stock Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card glass>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="text-yellow-600" />
              Low Stock Alert
            </h2>
            <div className="space-y-3">
              {lowStockItems.map((item) => (
                <div key={item.id} className="p-3 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-200/50 dark:border-yellow-800/50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{item.name}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                        {item.stock} left (threshold: {item.threshold})
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-yellow-200 to-amber-200 dark:from-yellow-800 dark:to-amber-800 shadow-inner">
                        <span className="text-sm font-bold text-yellow-900 dark:text-yellow-100">{Math.round((item.stock / item.threshold) * 100)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
