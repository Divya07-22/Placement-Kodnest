import React from 'react';

export const Input = ({ label, error, className = '', ...props }) => {
    return (
        <div className="flex flex-col gap-8 w-full">
            {label && (
                <label className="text-16 font-medium text-primary">
                    {label}
                </label>
            )}
            <input
                className={`
                    w-full px-16 py-16 
                    bg-white border border-gray-200 rounded-md
                    text-primary placeholder-gray-400
                    transition-all duration-200
                    focus:outline-none focus:border-accent
                    disabled:bg-gray-50 disabled:text-gray-500
                    ${error ? 'border-red-500' : 'hover:border-gray-300'}
                    ${className}
                `}
                {...props}
            />
            {error && (
                <span className="text-16 text-red-500 mt-4">{error}</span>
            )}
        </div>
    );
};
