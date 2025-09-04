
import React, { useEffect } from 'react';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalActions,
  ModalButton
} from '../styles/modalStyles';

const Modal = ({ isOpen, onClose, title, children, actions }) => {
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

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        {title && (
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
          </ModalHeader>
        )}
        
        {children && (
          <ModalBody>
            {children}
          </ModalBody>
        )}
        
        {actions && (
          <ModalActions>
            {actions.map((action, index) => (
              <ModalButton
                key={index}
                className={action.type || 'default'}
                onClick={action.onClick}
              >
                {action.label}
              </ModalButton>
            ))}
          </ModalActions>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;