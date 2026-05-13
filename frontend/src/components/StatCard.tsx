import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: number;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, trend, color = 'emerald' }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`stat-card bg-gradient-to-br from-${color}-500/10 to-${color}-500/5 border-${color}-200 dark:border-${color}-800`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-400">{label}</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{value}</p>
          {trend !== undefined && (
            <p className={`text-sm mt-2 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '+' : ''}{trend}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 bg-${color}-500/20 rounded-lg text-${color}-600`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
