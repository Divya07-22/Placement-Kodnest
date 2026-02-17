import React from 'react';

export const StatusBadge = ({ status = 'not_started', className = '' }) => {
    const variants = {
        not_started: 'bg-gray-100 text-gray-600',
        in_progress: 'bg-amber-100 text-amber-800',
        shipped: 'bg-green-100 text-green-800',
    };

    const labels = {
        not_started: 'Not Started',
        in_progress: 'In Progress',
        shipped: 'Shipped',
    };

    const variantClass = variants[status.toLowerCase().replace(' ', '_')] || variants.not_started;
    const label = labels[status.toLowerCase().replace(' ', '_')] || status;

    return (
        <span
            className={`inline-flex items-center px-16 py-8 rounded-full text-12 font-medium uppercase tracking-wide ${variantClass} ${className}`}
        >
            <span className="w-8 h-8 mr-8 rounded-full bg-current opacity-50" />
            {label}
        </span>
    );
};
