import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuthStore from "../../store/authStore";
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = () => {
  const { isAuthenticated } = useAuthStore();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    // prevent background scroll when mobile sidebar is open
    document.body.style.overflow = mobileSidebarOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileSidebarOpen]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar mobileOpen={mobileSidebarOpen} setMobileOpen={setMobileSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onToggleMobileSidebar={() => setMobileSidebarOpen((v) => !v)} />
        <main className="flex-1 overflow-auto">
          <div className="p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
