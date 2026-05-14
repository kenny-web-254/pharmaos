import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import MainLayout from './components/layouts/MainLayout';
import OnboardingPage from './pages/OnboardingPage';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import InventoryPage from './pages/InventoryPage';
import POSPage from './pages/POSPage';
import CustomersPage from './pages/CustomersPage';
import SuppliersPage from './pages/SuppliersPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import NotificationsPage from './pages/NotificationsPage';

// Protected Route Component
const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuthStore();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  const { loadFromStorage, isAuthenticated } = useAuthStore();

  useEffect(() => {
    loadFromStorage();
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW registration failed:', err));
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* Protected Routes */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<ProtectedRoute element={<DashboardPage />} />} />
          <Route path="/inventory" element={<ProtectedRoute element={<InventoryPage />} />} />
          <Route path="/pos" element={<ProtectedRoute element={<POSPage />} />} />
          <Route path="/customers" element={<ProtectedRoute element={<CustomersPage />} />} />
          <Route path="/suppliers" element={<ProtectedRoute element={<SuppliersPage />} />} />
          <Route path="/reports" element={<ProtectedRoute element={<ReportsPage />} />} />
          <Route path="/notifications" element={<ProtectedRoute element={<NotificationsPage />} />} />
          <Route path="/settings" element={<ProtectedRoute element={<SettingsPage />} />} />
        </Route>

        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
};

export default App;
