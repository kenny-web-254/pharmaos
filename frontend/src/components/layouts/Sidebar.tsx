import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Store,
  FileText,
  Bell,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const { logout, organization } = useAuthStore();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Package, label: 'Inventory', path: '/inventory' },
    { icon: ShoppingCart, label: 'POS', path: '/pos' },
    { icon: Users, label: 'Customers', path: '/customers' },
    { icon: Store, label: 'Suppliers', path: '/suppliers' },
    { icon: BarChart3, label: 'Reports', path: '/reports' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className={`${
        isOpen ? 'w-64' : 'w-20'
      } glass-card rounded-r-3xl m-3 flex flex-col shadow-premium overflow-hidden`}
    >
      {/* Logo */}
      <div className="p-6 flex items-center justify-between border-b border-white/30 dark:border-slate-700/50">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1"
          >
            <h1 className="text-2xl font-bold gradient-text">NexaCore</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{organization?.name}</p>
          </motion.div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 glass rounded-xl hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all"
        >
          {isOpen ? <X className="w-4 h-4 text-slate-700 dark:text-slate-300" /> : <Menu className="w-4 h-4 text-slate-700 dark:text-slate-300" />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
              title={!isOpen ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span>{item.label}</span>}
              {isActive && isOpen && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute right-3 w-2 h-2 bg-emerald-500 rounded-full"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-white/30 dark:border-slate-700/50">
        <button
          onClick={logout}
          className="sidebar-item w-full hover:bg-red-50/50 dark:hover:bg-red-900/20 hover:text-red-600"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
