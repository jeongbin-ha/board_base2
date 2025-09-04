
import React, { useEffect } from 'react';
import {
  ModalOverlay,
  ActionSheet as StyledActionSheet,
  ActionSheetHeader,
  ActionSheetTitle,
  ActionSheetBody,
  ActionSheetButton,
  ActionSheetIcon
} from '../styles/modalStyles';

const ActionSheet = ({ isOpen, onClose, title, actions }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; 
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // isOpen이 false면 아예 렌더링하지 않음
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <StyledActionSheet show={isOpen}>
        {title && (
          <ActionSheetHeader>
            <ActionSheetTitle>{title}</ActionSheetTitle>
          </ActionSheetHeader>
        )}
        
        <ActionSheetBody>
          {actions.map((action, index) => (
            <ActionSheetButton
              key={index}
              className={action.type || 'default'}
              onClick={() => {
                action.onClick();
                onClose();
              }}
            >
              {action.icon && (
                <ActionSheetIcon>{action.icon}</ActionSheetIcon>
              )}
              {action.label}
            </ActionSheetButton>
          ))}
        </ActionSheetBody>
      </StyledActionSheet>
    </ModalOverlay>
  );
};

export default ActionSheet;