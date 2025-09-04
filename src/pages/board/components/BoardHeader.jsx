
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Header as StyledHeader,
  HeaderTitle,
  HeaderIcons,
  HeaderIcon,
  HeaderText,
  BackButton,
  IconButton,
  EmptyHeaderIcon
} from '../styles/commonStyles';
import Back from './Icons/Back.svg';
import HamburgerBar from './Icons/HamburgerBar.svg';
import Bell from './Icons/Bell.svg';
import Search from './Icons/Search.svg';
import Dots from './Icons/Dots.svg';

// 헤더 좌측영역 - showBack true->뒤로가기, false->햄버거 / onMenuClick-햄버거클릭
// 헤더 중앙영역 - title
// 헤더 우측영역 - myPost 면 Dots표시, 그 외에 title로 결정
const Header = ({ 
  title, 
  showBack = false, 
  onMenuClick, 
  myPost ,
  onSearchClick,
  onComplete, 
  completeDisabled = false, // 완료 버튼 비활성화 상태
  onBack  // 게시글 작성 중 뒤로가기(작성취소)
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack(); // 부모 컴포넌트의 커스텀 핸들러 실행
    } else {
      navigate('/board'); // 기본 브라우저 뒤로가기
    }
  };

  const Title = {
    board: "게시판",
    promotion: "홍보 게시판",
    general: "일반 게시판",
    create: "게시글 작성",
    edit: "게시글 수정",
  };

  // 우측 아이콘 렌더링 함수
  const renderRightIcons = () => {
    switch (title) {
      case 'board':
        return (
          <HeaderIcons>
            <HeaderIcon src={Bell} />
            <HeaderIcon onClick={onSearchClick} src={Search} />
          </HeaderIcons>
        );
      
      case 'promotion':
      case 'general':
        return (
          <HeaderIcons>
            {myPost ? (
              <HeaderIcon onClick={myPost} src={Dots} />
            ) : (
              <EmptyHeaderIcon />
            )}
          </HeaderIcons>
        );
      
      case 'create':
      case 'edit':
        return (
          <HeaderIcons>
            <HeaderText 
              onClick={completeDisabled ? undefined : onComplete}
              disabled={completeDisabled}
            >완료</HeaderText>
          </HeaderIcons>
        );
      
      default:
        return (
          <HeaderIcons>
            <EmptyHeaderIcon />
          </HeaderIcons>
        );
    }
  };

  return (
    <StyledHeader>
      {showBack ? (
        <BackButton onClick={handleBack} src={Back} />
      ) : (
        <HeaderIcons>
          <HeaderIcon onClick={onMenuClick} src={HamburgerBar}/>
          <EmptyHeaderIcon />
        </HeaderIcons>
      )}
      
      <HeaderTitle>{ Title[title] || "none" }</HeaderTitle>
      
      {renderRightIcons()}
    </StyledHeader>
  );
};

export default Header;