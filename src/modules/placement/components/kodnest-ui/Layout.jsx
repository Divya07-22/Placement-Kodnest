import React from 'react';
import { ProgressBar } from './ProgressBar';
import { StatusBadge } from './StatusBadge';
import { ProofFooter } from './ProofFooter';

export const Layout = ({
    children, // Primary content
    secondaryPanel, // Secondary content
    projectName = "KodNest Premium Build",
    currentStep = 1,
    totalSteps = 5,
    status = "not_started",
    title,
    subtitle,
    checklist,
    onVerify
}) => {
    return (
        <div className="min-h-screen bg-background flex flex-col font-sans text-primary">
            {/* Top Bar */}
            <header className="h-64 border-b border-gray-100 bg-white/80 backdrop-blur-sm fixed top-0 w-full z-40 px-40 flex items-center justify-between">
                <div className="flex items-center gap-16">
                    <div className="w-24 h-24 bg-accent rounded-full opacity-10"></div>
                    <span className="font-serif font-bold text-18 tracking-tight">{projectName}</span>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-sm">
                    <div className="mx-auto w-fit">
                        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
                    </div>
                </div>

                <div>
                    <StatusBadge status={status} />
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 pt-[88px] pb-[100px] px-40 max-w-screen-2xl mx-auto w-full">

                {/* Context Header */}
                <div className="mb-40 fade-in">
                    <h1 className="font-serif text-40 md:text-5xl font-bold mb-16 tracking-tight leading-tight">
                        {title}
                    </h1>
                    <p className="text-18 text-gray-500 max-w-3xl leading-relaxed">
                        {subtitle}
                    </p>
                </div>

                {/* Workspace Split */}
                <div className="flex flex-col lg:flex-row gap-40 h-full">
                    {/* Primary Workspace (70%) */}
                    <div className="flex-1 lg:w-[70%] space-y-24 min-h-[500px]">
                        {children}
                    </div>

                    {/* Secondary Panel (30%) */}
                    {secondaryPanel && (
                        <aside className="lg:w-[30%] space-y-24">
                            <div className="sticky top-[100px]">
                                {secondaryPanel}
                            </div>
                        </aside>
                    )}
                </div>
            </main>

            {/* Proof Footer */}
            <ProofFooter
                checklist={checklist}
                onVerify={onVerify}
                isVerified={status === 'shipped'}
            />
        </div>
    );
};
