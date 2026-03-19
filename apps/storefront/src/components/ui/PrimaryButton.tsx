import React, { ButtonHTMLAttributes } from 'react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function PrimaryButton({ children, className = '', ...props }: PrimaryButtonProps) {
  return (
    <button
      className={`
        bg-gradient-primary 
        text-surface-container-lowest 
        rounded-full 
        font-label 
        font-bold 
        uppercase 
        tracking-[0.05em] 
        px-6 py-2 
        transition-all 
        duration-300 
        hover:opacity-90 
        focus:outline-none 
        focus:ring-2 
        focus:ring-primary 
        focus:ring-offset-2 
        focus:ring-offset-surface-dim
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
