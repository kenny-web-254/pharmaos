import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  glass?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = true, onClick, glass = false }) => {
  const baseClasses = glass
    ? 'card-glass p-6'
    : 'card bg-white/80 dark:bg-slate-900/80 p-6';

  return (
    <motion.div
      whileHover={hover ? { y: -2, boxShadow: '0 20px 40px -10px rgba(16, 185, 129, 0.15)' } : {}}
      onClick={onClick}
      className={`${baseClasses} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;
