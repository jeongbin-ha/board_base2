
import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

// 모달 관련 스타일
export const ModalContent = styled.div`
  background: white;
  border-radius: 10px;
  padding: 0;
  width: 300px;
  height: 120px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  z-index: 1000;
`;

export const ModalHeader = styled.div`
  margin-top: 40px;
  text-align: center;
`;

export const ModalTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  margin: 0;
`;

export const ModalBody = styled.div`
  padding: 20px;
`;

export const ModalActions = styled.div`
  padding: 0 40px;
  display: flex;
`;

export const ModalButton = styled.button`
  flex: 1;
  padding: 15px;
  border: none;
  background: transparent;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:first-child {
  }
  
  &.cancel {
    color: #000000;
    font-weight: 500;
  }
  
  &.confirm {
    color: #ED0505;
    font-weight: 500;
  }
  
  &.primary {
    color: #FF8A8A;
    font-weight: 500;
  }
`;

// 액션시트 관련 스타일
export const ActionSheet = styled.div.withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) => !['show'].includes(prop)
})`
  width: 360px;
  height: 240px;
  background: #F8F8F8;
  border-radius: 5px;
  z-index: 1000;
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ActionSheetHeader = styled.div`
  margin-top: 28px;
`;

export const ActionSheetTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  margin: 0;
`;

export const ActionSheetBody = styled.div`
  border-radius: 5px;
  width: 320px;
  height: 104px;
  background: white;
  margin-top: 36px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ActionSheetButton = styled.button.withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) => !['edit', 'delete'].includes(prop)
})`
  width: 100%;
  height: 52px;
  padding: 18px 20px;
  border: none;
  background: transparent;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: background-color 0.2s;
  
  &.edit {
    color: #000000;
    border-bottom: 1px solid #D8D8D8
  }
  
  &.delete {
    color: #FF3737;
  }
`;

export const ActionSheetIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;