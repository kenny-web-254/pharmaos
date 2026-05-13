import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: number;
  color?: 'emerald' | 'teal' | 'blue' | 'yellow' | 'red' | 'purple';
}

const colorClasses = {
  emerald: {
    icon: 'text-emerald-600 dark:text-emerald-400',
    bg: 'from-emerald-500/10 to-emerald-500/5',
    border: 'border-emerald-200/50 dark:border-emerald-800/50',
    glow: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]',
  },
  teal: {
    icon: 'text-teal-600 dark:text-teal-400',
    bg: 'from-teal-500/10 to-teal-500/5',
    border: 'border-teal-200/50 dark:border-teal-800/50',
    glow: 'shadow-[0_0_20px_rgba(6,182,212,0.15)]',
  },
  blue: {
    icon: 'text-blue-600 dark:text-blue-400',
    bg: 'from-blue-500/10 to-blue-500/5',
    border: 'border-blue-200/50 dark:border-blue-800/50',
    glow: 'shadow-[0_0_20px_rgba(59,130,246,0.15)]',
  },
  yellow: {
    icon: 'text-yellow-600 dark:text-yellow-400',
    bg: 'from-yellow-500/10 to-yellow-500/5',
    border: 'border-yellow-200/50 dark:border-yellow-800/50',
    glow: 'shadow-[0_0_20px_rgba(245,158,11,0.15)]',
  },
  red: {
    icon: 'text-red-600 dark:text-red-400',
    bg: 'from-red-500/10 to-red-500/5',
    border: 'border-red-200/50 dark:border-red-800/50',
    glow: 'shadow-[0_0_20px_rgba(239,68,68,0.15)]',
  },
  purple: {
    icon: 'text-purple-600 dark:text-purple-400',
    bg: 'from-purple-500/10 to-purple-500/5',
    border: 'border-purple-200/50 dark:border-purple-800/50',
    glow: 'shadow-[0_0_20px_rgba(139,92,246,0.15)]',
  },
};

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, trend, color = 'emerald' }) => {
  const classes = colorClasses[color];

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className={`card-glass p-5 bg-gradient-to-br ${classes.bg} ${classes.border} ${classes.glow}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{label}</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2 gradient-text">{value}</p>
          {trend !== undefined && (
            <div className="flex items-center gap-1 mt-3">
              {trend > 0 ? (
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <span className={`text-sm font-medium ${trend > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {trend > 0 ? '+' : ''}{trend}% from last month
              </span>
            </div>
          )}
        </div>
        <div className={`p-3.5 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-white/30 dark:border-slate-700/50 ${classes.icon} shadow-sm`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
