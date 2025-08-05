import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  gradient?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false, 
  glass = false,
  gradient = false 
}) => {
  const baseClasses = 'card bg-base-100 shadow-xl';
  const hoverClasses = hover ? 'card-hover cursor-pointer' : '';
  const glassClasses = glass ? 'glass' : '';
  const gradientClasses = gradient ? 'bg-gradient-to-br from-primary/10 to-secondary/10' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${baseClasses} ${hoverClasses} ${glassClasses} ${gradientClasses} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;