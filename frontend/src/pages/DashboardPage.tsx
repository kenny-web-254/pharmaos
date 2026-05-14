import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Package, AlertTriangle, DollarSign, ShoppingCart } from 'lucide-react';
import { LineChart, Line, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAuthStore } from '../store/authStore';
import StatCard from '../components/StatCard';
import Card from '../components/Card';
import formatCurrency from '../services/currencyService';
import { useCurrency } from '../hooks/useAuth';
import { salesService, customerService, productService, organizationService } from '../services/api';
import toast from 'react-hot-toast';
import { Branch } from '../types';
import { Branch } from '../types';

const chartData = [
  { name: 'Mon', sales: 4000, revenue: 312000 },
  { name: 'Tue', sales: 3000, revenue: 181740 },
  { name: 'Wed', sales: 3500, revenue: 1274000 },
  { name: 'Thu', sales: 4200, revenue: 508040 },
  { name: 'Fri', sales: 2780, revenue: 1274000 },
  { name: 'Sat', sales: 1890, revenue: 559000 },
  { name: 'Sun', sales: 2390, revenue: 494000 },
];

const DashboardPage = () => {
  const { organization, selectedBranch } = useAuthStore();
  const { currency } = useCurrency();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalSales: 0,
    totalCustomers: 0,
    lowStockProducts: 0,
  });
  const [recentSales, setRecentSales] = useState<any[]>([]);
  const [lowStockItems, setLowStockItems] = useState<any[]>([]);

  useEffect(() => {
    if (!organization || !selectedBranch) return;
    fetchDashboardData();
  }, [organization, selectedBranch]);

  // Ensure at least one branch exists
  useEffect(() => {
    const ensureBranch = async () => {
      if (!organization) return;
      try {
        const branchesRes = await organizationService.getBranches(organization._id);
        if (branchesRes.data.branches.length === 0) {
          // Create a default main branch
          const defaultBranch = {
            name: 'Main Branch',
            address: 'Headquarters',
            city: 'Nairobi',
            state: 'Nairobi',
            postalCode: '00100',
            country: 'Kenya',
            phone: '+254-700-000-000',
            email: organization.email,
          };
          const createRes = await organizationService.createBranch(organization._id, defaultBranch);
          const newBranch = createRes.data.branch as Branch;
          // Set as selected branch
          useAuthStore.getState().setSelectedBranch(newBranch);
          toast.success('Default branch created');
        }
      } catch (error) {
        console.error('Branch check failed:', error);
      }
    };
    ensureBranch();
  }, [organization]);

  const fetchDashboardData = async () => {
    if (!organization || !selectedBranch) return;
    setLoading(true);
    try {
      // Fetch customers count
      const customersRes = await customerService.getCustomers(organization._id, 1, 1);
      const totalCustomers = customersRes.data.pagination.total;

      // Fetch low stock products
      const lowStockRes = await productService.getLowStockProducts(organization._id);
      const lowStockProductsArray = lowStockRes.data.products;

      // Fetch sales history
      const salesRes = await salesService.getSalesHistory(organization._id, selectedBranch._id, 1, 50);
      const sales = salesRes.data.sales;
      const totalRevenue = sales.reduce((sum: number, s: any) => sum + s.total, 0);

      // Get recent sales (last 4)
      const recent = sales
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 4)
        .map((s: any) => ({
          id: s._id,
          customer: s.customer ? `${s.customer.firstName} ${s.customer.lastName}` : 'Walk-in Customer',
          amount: s.total,
          time: new Date(s.createdAt).toLocaleString(),
        }));

      // Low stock items details
      const lowStockItemsList = lowStockProductsArray.slice(0, 3).map((p: any) => ({
        id: p._id,
        name: p.name,
        stock: p.quantity,
        threshold: p.minStockLevel,
      }));

      setStats({
        totalRevenue,
        totalSales: salesRes.data.pagination.total,
        totalCustomers,
        lowStockProducts: lowStockProductsArray.length,
      });
      setRecentSales(recent);
      setLowStockItems(lowStockItemsList);
    } catch (error: any) {
      console.error('Dashboard fetch error:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

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
            value={formatCurrency(stats.totalRevenue, currency)}
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
                  <p className="text-emerald-600 font-bold text-sm">{formatCurrency(i * 19500, currency)}</p>
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
              {recentSales.length === 0 ? (
                <p className="text-center text-slate-500 py-8">No recent sales</p>
              ) : (
                recentSales.map((sale) => (
                  <div key={sale.id} className="flex justify-between items-center p-3 glass rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{sale.customer}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{sale.time}</p>
                    </div>
                    <p className="font-bold text-emerald-600 text-sm">{formatCurrency(sale.amount, currency)}</p>
                  </div>
                ))
              )}
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
              {lowStockItems.length === 0 ? (
                <p className="text-center text-slate-500 py-8">All products well stocked</p>
              ) : (
                lowStockItems.map((item) => (
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
                ))
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
