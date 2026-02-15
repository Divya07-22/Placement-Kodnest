import React from 'react';

export const TopBar = ({ projectName, currentStep, totalSteps, status }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'Not Started':
        return 'badge--not-started';
      case 'In Progress':
        return 'badge--in-progress';
      case 'Shipped':
        return 'badge--shipped';
      default:
        return 'badge--not-started';
    }
  };

  return (
    <div className="top-bar">
      <div className="top-bar__project-name">{projectName}</div>
      <div className="top-bar__progress">
        Step {currentStep} / {totalSteps}
      </div>
      <div className={`badge ${getStatusClass(status)}`}>{status}</div>
    </div>
  );
};
