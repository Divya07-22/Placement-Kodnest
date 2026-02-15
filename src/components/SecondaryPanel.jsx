import React from 'react';

export const SecondaryPanel = ({
    stepExplanation,
    promptText,
    onCopy,
    onBuildInLovable,
    onItWorked,
    onError,
    onAddScreenshot
}) => {
    return (
        <div className="secondary-panel">
            <div className="card">
                <h4 className="mb-sm">Step Explanation</h4>
                <p style={{ fontSize: '15px', opacity: 0.8 }}>{stepExplanation}</p>
            </div>

            <div className="card">
                <h4 className="mb-sm">Prompt</h4>
                <div className="prompt-box mb-md">{promptText}</div>
                <button className="btn btn-secondary" onClick={onCopy} style={{ width: '100%' }}>
                    Copy
                </button>
            </div>

            <div className="card">
                <h4 className="mb-sm">Actions</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                    <button className="btn btn-primary" onClick={onBuildInLovable}>
                        Build in Lovable
                    </button>
                    <button className="btn btn-secondary" onClick={onItWorked}>
                        It Worked
                    </button>
                    <button className="btn btn-secondary" onClick={onError}>
                        Error
                    </button>
                    <button className="btn btn-secondary" onClick={onAddScreenshot}>
                        Add Screenshot
                    </button>
                </div>
            </div>
        </div>
    );
};
