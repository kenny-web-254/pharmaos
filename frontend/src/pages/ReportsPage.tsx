import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Download, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import Card from '../components/Card';
import Button from '../components/Button';

const ReportsPage = () => {
  const [reportType, setReportType] = useState('sales');
  const [dateRange, setDateRange] = useState('month');

  const salesData = [
    { date: '2024-01-01', sales: 4500, revenue: 28000 },
    { date: '2024-01-02', sales: 3200, revenue: 19800 },
    { date: '2024-01-03', sales: 5100, revenue: 31500 },
    { date: '2024-01-04', sales: 4800, revenue: 29600 },
    { date: '2024-01-05', sales: 6200, revenue: 38100 },
    { date: '2024-01-06', sales: 5900, revenue: 36400 },
  ];

  const categoryData = [
    { category: 'Medicines', sales: 45000, margin: '35%' },
    { category: 'Supplements', sales: 28000, margin: '42%' },
    { category: 'Medical Devices', sales: 15000, margin: '28%' },
    { category: 'Other', sales: 12000, margin: '38%' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Reports & Analytics</h1>
        <p className="text-slate-600 dark:text-slate-400">View detailed business analytics and reports</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-4 items-center flex-wrap"
      >
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="input-field py-2"
        >
          <option value="sales">Sales Report</option>
          <option value="revenue">Revenue Report</option>
          <option value="inventory">Inventory Report</option>
          <option value="customers">Customer Report</option>
        </select>

        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="input-field py-2"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>

        <Button variant="secondary">
          <Filter size={18} className="mr-2" /> More Filters
        </Button>

        <Button variant="primary" className="ml-auto">
          <Download size={18} className="mr-2" /> Export PDF
        </Button>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Total Revenue', value: '$125,430', trend: '+12.5%' },
          { label: 'Total Sales', value: '342', trend: '+8.2%' },
          { label: 'Avg Order Value', value: '$366.47', trend: '+3.1%' },
          { label: 'Growth Rate', value: '15.3%', trend: '+2.1%' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">{stat.label}</p>
              <div className="flex justify-between items-baseline">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                <p className="text-emerald-600 text-sm font-semibold">{stat.trend}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Sales Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#10b981" />
              <Line type="monotone" dataKey="revenue" stroke="#06b6d4" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      {/* Category Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Sales by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>
    </div>
  );
};

export default ReportsPage;
