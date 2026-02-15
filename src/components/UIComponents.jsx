import React from 'react';

export const Card = ({ children, className = '' }) => {
    return <div className={`card ${className}`}>{children}</div>;
};

export const Button = ({
    children,
    variant = 'primary',
    onClick,
    className = '',
    ...props
}) => {
    const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
    return (
        <button
            className={`btn ${variantClass} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export const Input = ({
    type = 'text',
    value,
    onChange,
    placeholder,
    className = '',
    ...props
}) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`input ${className}`}
            {...props}
        />
    );
};

export const ErrorState = ({ title, message, action }) => {
    return (
        <div className="error-state">
            <div className="error-state__title">{title}</div>
            <div className="error-state__message">{message}</div>
            {action && <div className="error-state__action">{action}</div>}
        </div>
    );
};

export const EmptyState = ({ message, action }) => {
    return (
        <div className="empty-state">
            <div className="empty-state__message">{message}</div>
            {action && action}
        </div>
    );
};
