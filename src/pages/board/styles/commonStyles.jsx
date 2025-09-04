
import styled from 'styled-components';

// 반응형 미디어쿼리 상수
const media = {
  mobile: `@media (max-width: 767px)`,
  pc: `@media (min-width: 768px)`,
};

// 전체 컨테이너
export const Container = styled.div`
  ${media.mobile} {
    // min-width: 402px;
    height: 100vh;
    background: white;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    margin: 0 auto;
  }
  ${media.pc} {
    min-width: 768px;
    height: 100vh;
    margin: 0 auto;
    padding-left: 100px;
    background: white;
    display: flex;
    flex-direction: column;
  }
`;

// 헤더 관련 스타일
export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  position: relative;
  height: 72px;
  background: white;
`;

export const HeaderTitle = styled.h1`
  font-size: 16px;
  font-weight: 700;
  color: #000000;
  margin: 0;
`;

export const HeaderIcons = styled.div`
  display: flex;
  gap: 12px;
`;

export const HeaderIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const EmptyHeaderIcon = styled.img`
  width: 24px;
  height: 24px;
  visibility: hidden;
`;

export const BackButton = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.disabled ? '#929292' : '#F67676'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`;

// 탭(게시판 종류) 관련 스타일
export const TabContainer = styled.div`
  height: auto;
  background: white;
  display: flex;
  align-items: center;
  padding: 20px 20px;
  gap: 12px;

  ${media.pc} {
    margin-left: 60px;
    padding: 0;
    gap: 32px;
    margin-bottom: 20px;
  }
`;

export const Tab = styled.div.withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) => !['active', 'type'].includes(prop)
})`
  ${media.mobile} {
    padding: 8px 20px;
    border-radius: 24.5px;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    transition: all 0.2s;
    color: ${props => props.active ? 'white' : '#696969'};
    background: ${props => props.active ? '#F67676' : '#F8F8F8'};
  }
  ${media.pc} {
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    color: ${props => props.active ? '#F67676' : '#FFBEBB'};
  }
`;

export const HotIcon = styled.span`
  font-size: 14px;
`;

// 검색바 관련 스타일
export const SearchContainer = styled.div`
  ${media.mobile} {
    padding: 15px 20px;
    background: white;
    margin-bottom: 12px;
  }
  ${media.pc} {
    padding: 20px 100px 20px 60px;
    background: white;
    margin-bottom: 10px;
  }
`;

export const SearchBox = styled.div`
  ${media.mobile} {
    display: flex;
    align-items: center;
    padding: 4px 0px;
    position: relative;
    border-bottom: 1px solid #DDDDDD;
  }
  ${media.pc} {
    display: flex;
    align-items: center;
    padding: 8px 20px;
    border: 1px solid #DDDDDD;
    border-radius: 3px;
    height: 42px;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 13px;
  color: black;
  outline: none;

  ${media.pc} {
    margin-left: 12px;
    font-size: 14px;
  }

  &::placeholder {
    color: #929292;
  }
`;

export const SearchIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;

  ${media.pc} {
    width: 28px;
    height: 28px;
  }
`;

export const SearchNotice = styled.div`
  margin-top: 8px;
  font-size: 10px;
  color: #FF8585;

  ${media.pc} {
    font-size: 14px;
    color: #696969;
  }
`;

// 글 작성 버튼(플로팅)
export const FloatingButton = styled.div`
  ${media.mobile} {
    position: absolute;
    bottom: 20%;
    right: 20px;
    width: 44px;
    height: 44px;
    background: #FF8585;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(255, 138, 138, 0.3);
    transition: all 0.2s;
    z-index: 100;
  }
  ${media.pc} {
    width: 76px;
    height: 33px;
    background: #F67676;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(255, 138, 138, 0.4);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const FloatingIcon = styled.img`
  width: 24px;
  height: 24px;
`;

// 메인 컨텐츠 영역 스타일
export const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  background: white;
  
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: #999;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #999;
  text-align: center;
`;

export const IconButton = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

export const CreateBtnContainer = styled.div`
  ${media.mobile} {
  
  }

  ${media.pc} {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-right: 104px;
  }
`;

// PC용 더보기 버튼 관련 스타일
export const LoadMoreContainer = styled.div`
  ${media.pc} {
    display: flex;
    justify-content: center;
    margin: 40px 60px 100px 100px;
  }
`;

export const LoadMoreButton = styled.button`
  ${media.pc} {
    width: 400px;
    height: 40px;
    background: white;
    border: 1px solid #DDDDDD;
    border-radius: 3px;
    font-size: 16px;
    font-weight: bold;
    color: #000000;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
      background: #f8f8f8;
    }
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;

// 사이드 메뉴
export const SideMenuWrapper = styled.div`
  width: 101px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  flex-shrink: 0;
  display: none;
  background-color: ${({ theme }) => theme.colors.grayWhite};
  @media (min-width: 768px) {
    display: block;
  }
`;