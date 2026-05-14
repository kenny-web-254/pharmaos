import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Check, Trash2, AlertCircle, Info, AlertTriangle, CheckCircle, X } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAuthStore } from '../store/authStore';
import { Notification } from '../types/index';
import formatCurrency from '../services/currencyService';
import { useCurrency } from '../hooks/useAuth';

const NotificationsPage = () => {
  const { organization } = useAuthStore();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const { currency } = useCurrency();

  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        _id: '1',
        title: 'Low Stock Alert',
        message: 'Ibuprofen 200mg is running low (8 units remaining)',
        type: 'warning',
        isRead: false,
        organization: organization?._id || '',
        createdAt: new Date().toISOString(),
      },
      {
        _id: '2',
        title: 'New Sale',
        message: `A new sale of ${formatCurrency(250.5, currency)} was recorded`,
        type: 'success',
        isRead: false,
        organization: organization?._id || '',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        _id: '3',
        title: 'System Update',
        message: 'NexaCore v2.0 is now available with new features',
        type: 'info',
        isRead: true,
        organization: organization?._id || '',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ];
    setNotifications(mockNotifications);
  }, [organization]);

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.isRead)
    : notifications;

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-600" />;
      default: return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-yellow-50/50 dark:bg-yellow-900/20';
      case 'success': return 'bg-emerald-50/50 dark:bg-emerald-900/20';
      case 'error': return 'bg-red-50/50 dark:bg-red-900/20';
      default: return 'bg-blue-50/50 dark:bg-blue-900/20';
    }
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n._id !== id));
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
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Notifications</h1>
          <p className="text-slate-600 dark:text-slate-400">Stay updated with important alerts</p>
        </div>
        <div className="flex gap-3">
          <div className="glass rounded-xl p-1 flex gap-1">
            {(['all', 'unread'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === f 
                    ? 'bg-gradient-emerald text-white' 
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {f === 'all' ? 'All' : 'Unread'}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Notifications List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="space-y-4"
      >
        {filteredNotifications.length === 0 ? (
          <Card glass className="p-12 text-center">
            <Bell className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No notifications</h3>
            <p className="text-slate-600 dark:text-slate-400">You're all caught up!</p>
          </Card>
        ) : (
          filteredNotifications.map(notification => (
            <motion.div
              key={notification._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`glass-card rounded-xl p-5 border-l-4 ${
                notification.type === 'warning' ? 'border-yellow-500' :
                notification.type === 'success' ? 'border-emerald-500' :
                notification.type === 'error' ? 'border-red-500' : 'border-blue-500'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2.5 rounded-lg ${getBgColor(notification.type)}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className={`font-bold text-slate-900 dark:text-white ${!notification.isRead ? 'gradient-text' : ''}`}>
                      {notification.title}
                    </h3>
                    <div className="flex gap-1">
                      {!notification.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(notification._id)}
                          className="p-1.5 glass rounded-lg hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4 text-emerald-600" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(notification._id)}
                        className="p-1.5 glass rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">{notification.message}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Mark All as Read */}
      {notifications.some(n => !n.isRead) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center"
        >
          <Button variant="outline" onClick={() => setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))}>
            <Check className="w-4 h-4 mr-2" /> Mark All as Read
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default NotificationsPage;