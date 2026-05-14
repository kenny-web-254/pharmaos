import React, { useState } from 'react';
import { Bell, Settings, Search, User, ChevronDown, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import Button from '../Button';

const Header = () => {
  const { user, logout } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="glass border-b border-white/30 dark:border-slate-700/50 sticky top-0 z-40">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products, customers..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl input-glass"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 ml-4">
          {/* Notifications */}
          <button className="relative p-2.5 glass rounded-xl hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors">
            <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          {/* Settings */}
          <button className="p-2.5 glass rounded-xl hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors">
            <Settings className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-3 py-2 glass rounded-xl hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors"
            >
              {user?.avatar ? (
                <img src={user.avatar} alt={user.firstName} className="w-9 h-9 rounded-lg object-cover" />
              ) : (
                <div className="w-9 h-9 rounded-lg bg-gradient-emerald flex items-center justify-center text-white font-bold shadow-md">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </div>
              )}
              <div className="hidden sm:block text-left text-sm">
                <p className="font-semibold text-slate-900 dark:text-white">{user?.firstName}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{user?.role?.replace('_', ' ')}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 glass-card rounded-xl shadow-premium border border-white/30 dark:border-slate-700/50 p-2">
                <div className="px-3 py-2 mb-2 border-b border-white/30 dark:border-slate-700/50">
                  <p className="font-medium text-slate-900 dark:text-white">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
                </div>
                <a href="/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50">
                  <User className="w-4 h-4" />
                  Profile
                </a>
                <a href="/settings" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50">
                  <Settings className="w-4 h-4" />
                  Settings
                </a>
                <hr className="border-white/30 dark:border-slate-700/50 my-2" />
                <button 
                  onClick={logout}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50/50 dark:hover:bg-red-900/20"
                >
                  <LogOut className="w-4 h-4" />
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
