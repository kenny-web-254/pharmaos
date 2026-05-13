import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Package, AlertTriangle, DollarSign } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAuthStore } from '../store/authStore';
import StatCard from '../components/StatCard';
import Card from '../components/Card';

// Mock data
const chartData = [
  { name: 'Mon', sales: 4000, revenue: 2400 },
  { name: 'Tue', sales: 3000, revenue: 1398 },
  { name: 'Wed', sales: 3500, revenue: 9800 },
  { name: 'Thu', sales: 4200, revenue: 3908 },
  { name: 'Fri', sales: 2780, revenue: 9800 },
  { name: 'Sat', sales: 1890, revenue: 4300 },
  { name: 'Sun', sales: 2390, revenue: 3800 },
];

const COLORS = ['#10b981', '#06b6d4', '#f59e0b', '#ef4444'];

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
        <p className="text-slate-600 dark:text-slate-400">Welcome back to {organization?.name}</p>
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
          <Card>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Sales & Revenue</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#10b981" />
                <Line type="monotone" dataKey="revenue" stroke="#06b6d4" />
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
          <Card>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Top Products</h2>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex justify-between items-center p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Product {i}</div>
                  <div className="text-emerald-600 font-bold">${(i * 150).toFixed(2)}</div>
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
          <Card>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Recent Sales</h2>
            <div className="space-y-3">
              {recentSales.map((sale) => (
                <div key={sale.id} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{sale.customer}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{sale.time}</p>
                  </div>
                  <p className="font-bold text-emerald-600">${sale.amount.toFixed( 2)}</p>
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
          <Card>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="text-yellow-600" />
              Low Stock Alert
            </h2>
            <div className="space-y-3">
              {lowStockItems.map((item) => (
                <div key={item.id} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{item.name}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                        {item.stock} left (threshold: {item.threshold})
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-yellow-200 dark:bg-yellow-800">
                        <span className="text-sm font-bold text-yellow-900">{Math.round((item.stock / item.threshold) * 100)}%</span>
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
