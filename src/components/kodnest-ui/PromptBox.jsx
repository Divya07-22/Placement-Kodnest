import React, { useState } from 'react';
import { Button } from './Button';

export const PromptBox = ({ prompt, label = 'Prompt', className = '' }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`flex flex-col gap-8 w-full ${className}`}>
            <div className="flex justify-between items-center">
                <label className="text-14 font-medium text-gray-600 uppercase tracking-wide">
                    {label}
                </label>
                {copied && <span className="text-12 text-green-600 transition-all duration-200">Copied!</span>}
            </div>
            <div className="relative group">
                <textarea
                    readOnly
                    value={prompt}
                    className="w-full h-120 p-16 text-14 bg-gray-50 border border-gray-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-700 font-mono leading-relaxed"
                />
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button
                        variant="secondary"
                        className="px-12 py-4 text-12 h-auto hover:bg-white"
                        onClick={handleCopy}
                    >
                        Copy
                    </Button>
                </div>
            </div>
        </div>
    );
};
