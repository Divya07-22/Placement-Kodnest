import React from 'react';

export const ProgressBar = ({ currentStep, totalSteps }) => {
    const progress = Math.min((currentStep / totalSteps) * 100, 100);

    return (
        <div className="flex flex-col w-full max-w-[200px]">
            <div className="flex justify-between text-12 text-gray-500 mb-8 font-medium">
                <span>Step {currentStep}</span>
                <span>of {totalSteps}</span>
            </div>
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className="h-full bg-accent transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};
