import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'tertiary';
    loading?: boolean;
}

export function Button({
    variant = 'primary',
    loading = false,
    children,
    className = '',
    ...props
}: ButtonProps) {
    const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center';

    const variantClasses = {
        primary: 'bg-primary text-on-primary hover:bg-primary/90',
        secondary: 'bg-surface-container-highest text-on-surface hover:bg-surface-container-high',
        tertiary: 'bg-transparent text-primary border border-primary hover:bg-primary/10'
    };

    const disabledClasses = props.disabled ? 'opacity-50 cursor-not-allowed' : '';

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`}
            disabled={loading || props.disabled}
            {...props}
        >
            {loading ? (
                <span className="flex items-center">
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></span>
                    Processing...
                </span>
            ) : children}
        </button>
    );
}