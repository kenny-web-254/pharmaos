import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = true, onClick }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -2 } : {}}
      onClick={onClick}
      className={`card bg-white dark:bg-slate-800 p-6 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;
