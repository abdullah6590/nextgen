import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, id, ...props }: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={inputId} className="text-sm font-bold tracking-widest text-textSub uppercase">
        {label}
      </label>
      <input
        id={inputId}
        className="input-futuristic"
        {...props}
      />
    </div>
  );
}
