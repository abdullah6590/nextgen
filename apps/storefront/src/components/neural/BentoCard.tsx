'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils'; // I will create a simple utils or just use basic template literals, wait I'll make a simple utility or just inline. Let's make it inline if `cn` doesn't exist, wait, standard is to use `clsx` and `tailwind-merge` but I can just use template literals.

interface BentoCardProps extends HTMLMotionProps<'div'> {
  className?: string;
  children: React.ReactNode;
  gradientHover?: boolean;
}

export const BentoCard = ({ className, children, gradientHover = false, ...props }: BentoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -8, 
        scale: 1.01,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(6, 182, 212, 0.2)"
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`relative rounded-[24px] overflow-hidden bg-[#13141A] border border-white/5 shadow-[0_4px_24px_-10px_rgba(0,0,0,0.5)] ${className || ''}`}
      {...props}
    >
      {gradientHover && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
      {children}
    </motion.div>
  );
};
