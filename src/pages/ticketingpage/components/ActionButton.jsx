
import React from 'react';
import { ActionButton as StyledActionButton } from '../styles/commonStyles';

const ActionButton = ({ children, isActive, onClick, className = '' }) => {
  
  const stateClass = isActive ? 'primary' : 'disabled';
  const combinedClassName = `${stateClass} ${className}`.trim(); // className 누적

  return (
    <StyledActionButton
      className={combinedClassName}
      onClick={isActive ? onClick : undefined}
    >
      {children}
    </StyledActionButton>
  );
};

export default ActionButton;