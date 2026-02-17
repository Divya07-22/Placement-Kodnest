import React from 'react';

export const Card = ({ children, className = '', ...props }) => {
    return (
        <div
            className={`bg-white rounded-md border border-gray-100 p-24 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};
