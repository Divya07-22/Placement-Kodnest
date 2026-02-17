import React from 'react';

export const Button = ({
    children,
    variant = 'primary',
    className = '',
    ...props
}) => {
    const baseStyles = "px-24 py-16 font-medium transition-all duration-200 ease-in-out rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-accent text-white hover:bg-[#6d0000] border border-transparent",
        secondary: "bg-transparent text-accent border border-accent hover:bg-accent/5",
        ghost: "bg-transparent text-primary hover:bg-gray-100"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
