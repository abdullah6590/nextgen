import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className, ...props }: ButtonProps) {
  let baseClass = '';
  if (variant === 'primary') baseClass = 'btn-neon-primary';
  if (variant === 'secondary') baseClass = 'btn-neon-secondary';
  if (variant === 'glass') baseClass = 'glass-panel px-6 py-2 uppercase tracking-widest font-bold hover:bg-[rgba(255,255,255,0.1)] transition-colors';

  return (
    <button className={`${baseClass} ${className || ''}`} {...props}>
      {children}
    </button>
  );
}
