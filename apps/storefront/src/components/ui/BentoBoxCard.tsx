import React, { ReactNode } from 'react';

interface BentoBoxCardProps {
  children: ReactNode;
  className?: string;
}

export function BentoBoxCard({ children, className = '' }: BentoBoxCardProps) {
  return (
    <div
      className={`
        bg-surface-container-low 
        rounded-md 
        p-[1.4rem] 
        hover-tilt 
        ghost-border 
        hover:ghost-border-hover 
        ${className}
      `}
    >
      {children}
    </div>
  );
}
