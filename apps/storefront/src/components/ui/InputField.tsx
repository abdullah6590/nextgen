import React, { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function InputField({ label, error, className = '', id, ...props }: InputFieldProps) {
  const inputId = id || Array.from({ length: 8 }, () => Math.random().toString(36)[2]).join('');

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="font-label text-on-surface-variant text-sm tracking-wide">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          w-full 
          bg-surface-container-lowest 
          ghost-border 
          rounded-md 
          px-4 py-3 
          text-on-surface 
          font-body
          transition-all 
          duration-300 
          placeholder-on-surface-variant 
          focus:outline-none 
          focus:border-primary 
          focus:shadow-[0_0_4px_theme(colors.primary)]
          ${error ? 'border-error focus:border-error focus:shadow-[0_0_4px_theme(colors.error)]' : ''}
        `}
        {...props}
      />
      {error && (
        <span className="text-error text-xs font-label mt-1">{error}</span>
      )}
    </div>
  );
}
