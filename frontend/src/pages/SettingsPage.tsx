import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Store, Palette, Bell, CreditCard, User, Save } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAuthStore } from '../store/authStore';
import { organizationService } from '../services/api';
import toast from 'react-hot-toast';

type Tab = 'general' | 'appearance' | 'notifications' | 'billing';

const SettingsPage = () => {
  const { organization, setOrganization } = useAuthStore();
  const [activeTab, setActiveTab] = useState<Tab>('general');
  const [loading, setLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState('emerald');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessType: '',
    timezone: 'Africa/Nairobi',
    dateFormat: 'DD/MM/YYYY',
    currency: 'KES',
    taxEnabled: false,
    taxRate: 16,
    enableInventory: true,
    enablePOS: true,
    enableOnline: false,
  });

  useEffect(() => {
    if (organization) {
      setFormData({
        name: organization.name,
        email: organization.email,
        businessType: organization.businessType,
        timezone: organization.settings.timezone || 'Africa/Nairobi',
        dateFormat: organization.settings.dateFormat || 'DD/MM/YYYY',
        currency: organization.settings.currency || 'KES',
        taxEnabled: organization.settings.taxType === 'vat',
        taxRate: organization.settings.taxRate || 16,
        enableInventory: organization.settings.enableInventory !== false,
        enablePOS: organization.settings.enablePOS !== false,
        enableOnline: organization.settings.enableOnline || false,
      });
      setSelectedColor(organization.theme?.primaryColor || 'emerald');
    }
  }, [organization]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!organization) return;

    setLoading(true);
    try {
      const updates = {
        name: formData.name,
        email: formData.email,
        businessType: formData.businessType,
        settings: {
          timezone: formData.timezone,
          dateFormat: formData.dateFormat,
          currency: formData.currency,
          taxType: formData.taxEnabled ? 'vat' : 'none',
          taxRate: formData.taxRate,
          enableInventory: formData.enableInventory,
          enablePOS: formData.enablePOS,
          enableOnline: formData.enableOnline,
        },
        theme: {
          primaryColor: selectedColor || organization.theme?.primaryColor || 'emerald',
          secondaryColor: 'teal',
        },
      };

      const response = await organizationService.updateSettings(organization._id, updates);
      setOrganization(response.data.organization);
      toast.success('Settings saved successfully');
    } catch (err: any) {
      console.error('Settings save error:', err);
      toast.error(err.response?.data?.message || 'Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Store },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Settings</h1>
        <p className="text-slate-600 dark:text-slate-400">Manage your organization and preferences</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <Card glass className="p-2">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as Tab)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-gradient-emerald text-white shadow-md'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </Card>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3"
        >
          <Card glass>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* General Settings */}
              {activeTab === 'general' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">General Settings</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-field"
                    />
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
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Business Type
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="input-field"
                  >
                    <option value="pharmacy">Pharmacy</option>
                    <option value="retail">Retail Store</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="hardware">Hardware</option>
                    <option value="beauty">Beauty Salon</option>
                    <option value="electronics">Electronics</option>
                  </select>
                </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Timezone
                    </label>
                    <select
                      value={formData.timezone}
                      onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                      className="input-field"
                    >
                      <option value="Africa/Nairobi">East Africa Time (EAT)</option>
                      <option value="Africa/Lagos">West Africa Time (WAT)</option>
                      <option value="Africa/Johannesburg">South Africa Time (SAST)</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Date Format
                    </label>
                    <select
                      value={formData.dateFormat}
                      onChange={(e) => setFormData({ ...formData, dateFormat: e.target.value })}
                      className="input-field"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Currency
                    </label>
                    <select
                      value={formData.currency}
                      onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                      className="input-field"
                    >
                      <option value="KES">Kenyan Shilling (KES)</option>
                      <option value="USD">US Dollar (USD)</option>
                      <option value="EUR">Euro (EUR)</option>
                      <option value="GBP">British Pound (GBP)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 glass rounded-xl">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Enable Inventory Management</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Track stock levels and get low stock alerts</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, enableInventory: !formData.enableInventory })}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        formData.enableInventory ? 'bg-emerald-500' : 'bg-slate-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${formData.enableInventory ? 'translate-x-6' : 'translate-x-0.5'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 glass rounded-xl">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Enable POS</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Allow point-of-sale transactions</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, enablePOS: !formData.enablePOS })}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        formData.enablePOS ? 'bg-emerald-500' : 'bg-slate-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${formData.enablePOS ? 'translate-x-6' : 'translate-x-0.5'}`} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Appearance - Simplified placeholder */}
              {activeTab === 'appearance' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Appearance</h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    Theme customization options coming soon.
                  </p>
                </motion.div>
              )}

              {/* Notifications placeholder */}
              {activeTab === 'notifications' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Notifications</h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    Notification preferences coming soon.
                  </p>
                </motion.div>
              )}

              {/* Billing placeholder */}
              {activeTab === 'billing' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Billing</h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    Billing and subscription management coming soon.
                  </p>
                </motion.div>
              )}

              {/* Save Button */}
              <div className="flex justify-end pt-4 border-t border-white/30 dark:border-slate-700/50">
                <Button type="submit" variant="primary" loading={loading}>
                  <Save className="w-4 h-4 mr-2" /> Save Changes
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;
