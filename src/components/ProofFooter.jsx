import React from 'react';

export const ProofFooter = ({ checklistItems, onChecklistChange }) => {
    return (
        <div className="proof-footer">
            <h4 className="mb-md">Proof Checklist</h4>
            <div style={{ display: 'flex', gap: 'var(--space-lg)', flexWrap: 'wrap' }}>
                {checklistItems.map((item, index) => (
                    <div key={index} className="checkbox-item">
                        <input
                            type="checkbox"
                            id={`checklist-${index}`}
                            checked={item.checked}
                            onChange={() => onChecklistChange(index)}
                        />
                        <label htmlFor={`checklist-${index}`}>{item.label}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};
