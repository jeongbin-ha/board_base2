
import React from 'react';
import {
  TabContainer,
  Tab,
  HotIcon,
  CreateBtnContainer,
} from '../styles/commonStyles';
import SearchBarTop from './SearchBarTop'
import FloatingButton from './FloatingButton';
import useResponsive from '../hooks/useResponsive'

const TabBar = ({ activeTab, onTabChange, showFloatingButton }) => {
  const tabs = [
    { id: 'general', label: '일반' },
    { id: 'hot', label: 'Hot', icon: '🔥' },
    { id: 'promotion', label: '홍보' }
  ];
  const handleSearch = (searchTerm) => {
    console.log('검색:', searchTerm);
    // 검색 기능 구현
  };

  const isPC = useResponsive();

  return (
    <>
      {isPC && ( <SearchBarTop onSearch={handleSearch} /> )}
      {isPC && ( <div style={{marginLeft: '60px', fontSize: '24px', fontWeight: 'bold', marginBottom: '12px'}}>게시판</div> )}
      <CreateBtnContainer>
        <TabContainer>
          {tabs.map(tab => (
            <Tab
              key={tab.id}
              active={activeTab === tab.id}
              type={tab.id}
              onClick={() => onTabChange(tab.id)}
            >
              {!isPC && tab.icon && <HotIcon>{tab.icon}</HotIcon>}
              {tab.label}
            </Tab>
          ))}
        </TabContainer>
        {isPC && (
          <FloatingButton 
            show={showFloatingButton} 
            category={activeTab} 
          />
        )}
      </CreateBtnContainer>
    </>
  );
};

export default TabBar;