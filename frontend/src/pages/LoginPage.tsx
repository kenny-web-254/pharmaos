import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, AlertCircle, Loader } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/api';
import Button from '../components/Button';

const LoginPage = () => {
  const [email, setEmail] = useState('demo@nexacore.com');
  const [password, setPassword] = useState('demo123456');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(email, password);
      const { token, user } = response.data;
      setAuth(user, token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 dark:from-slate-950 dark:via-emerald-950 dark:to-slate-950 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-4xl font-bold gradient-text mb-2"
          >
            NexaCore
          </motion.h1>
          <p className="text-slate-600 dark:text-slate-300">Enterprise Business Operating System</p>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-8 backdrop-blur-xl border border-white/20"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Welcome Back</h2>

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex gap-3"
            >
              <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
              <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {/* Demo Credentials Note */}
            <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
              Demo credentials: demo@nexacore.com / demo123456
            </div>

            {/* Submit Button */}
            <Button type="submit" variant="primary" fullWidth loading={loading} size="lg">
              {loading ? <Loader className="animate-spin" /> : 'Sign In'}
            </Button>

            {/* Create Account Link */}
            <div className="text-center text-sm">
              <span className="text-slate-600 dark:text-slate-400">Don't have an account? </span>
              <a href="/register" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
                Sign up
              </a>
            </div>
          </form>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 grid grid-cols-3 gap-4 text-center"
        >
          <div className="text-sm">
            <p className="font-semibold text-slate-900 dark:text-white">Multi-Tenant</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Isolated Workspaces</p>
          </div>
          <div className="text-sm">
            <p className="font-semibold text-slate-900 dark:text-white">Offline-First</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Works Anywhere</p>
          </div>
          <div className="text-sm">
            <p className="font-semibold text-slate-900 dark:text-white">Enterprise</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Production Ready</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
