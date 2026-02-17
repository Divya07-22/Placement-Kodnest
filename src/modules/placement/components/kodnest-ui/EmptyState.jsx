import React from 'react';
import { Button } from './Button';

// Default calm illustration or icon placeholder
const DefaultIcon = () => (
    <svg className="w-48 h-48 text-gray-300 mb-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
);

export const EmptyState = ({
    title,
    description,
    actionLabel,
    onAction,
    icon: Icon = DefaultIcon,
    className = ''
}) => {
    return (
        <div className={`flex flex-col items-center justify-center text-center p-40 rounded-md border border-dashed border-gray-200 bg-gray-50/50 ${className}`}>
            <Icon />
            <h3 className="text-18 font-serif font-bold text-gray-900 mb-8">{title}</h3>
            <p className="text-14 text-gray-500 max-w-sm mb-24 leading-relaxed">
                {description}
            </p>
            {actionLabel && onAction && (
                <Button variant="primary" onClick={onAction}>
                    {actionLabel}
                </Button>
            )}
        </div>
    );
};
