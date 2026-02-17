import React from 'react';
import { Button } from './Button';
import { Card } from './Card';

export const ProofFooter = ({
    checklist = [],
    onCheck,
    onVerify,
    isVerified,
    status
}) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-24 px-40 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex gap-24">
                    {checklist.map((item, index) => (
                        <label
                            key={index}
                            className="flex items-center gap-8 cursor-pointer group"
                        >
                            <input
                                type="checkbox"
                                checked={item.checked}
                                onChange={() => onCheck(index)}
                                className="w-16 h-16 rounded border-gray-300 text-accent focus:ring-accent transition-colors"
                            />
                            <span className="text-14 font-medium text-gray-600 group-hover:text-primary transition-colors">
                                {item.label}
                            </span>
                        </label>
                    ))}
                </div>

                <div className="flex gap-16">
                    {/* Logic for verify button or status could go here */}
                    <Button
                        variant={isVerified ? "secondary" : "primary"}
                        onClick={onVerify}
                        disabled={isVerified}
                    >
                        {isVerified ? "Verified" : "Verify & Continue"}
                    </Button>
                </div>
            </div>
        </div>
    );
};
