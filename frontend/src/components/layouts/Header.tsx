import React, { useState } from 'react';
import { Bell, Settings, Search, User, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Header = () => {
  const { user } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search products, customers..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 ml-4">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
            <Bell size={20} className="text-slate-600 dark:text-slate-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Settings */}
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
            <Settings size={20} className="text-slate-600 dark:text-slate-300" />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              {user?.avatar ? (
                <img src={user.avatar} alt={user.firstName} className="w-8 h-8 rounded-full" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-emerald flex items-center justify-center text-white text-sm font-bold">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </div>
              )}
              <div className="hidden sm:block text-left text-sm">
                <p className="font-medium text-slate-900 dark:text-white">{user?.firstName}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{user?.role}</p>
              </div>
              <ChevronDown size={16} className="text-slate-600 dark:text-slate-300" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
                <a href="/profile" className="block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700">
                  Profile
                </a>
                <a href="/settings" className="block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700">
                  Settings
                </a>
                <hr className="border-slate-200 dark:border-slate-600" />
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100 dark:hover:bg-slate-700">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
