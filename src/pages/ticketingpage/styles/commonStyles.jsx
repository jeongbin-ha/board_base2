
import styled from 'styled-components';

// 반응형 미디어쿼리 상수
const media = {
  mobile: `@media (max-width: 767px)`,
  pc: `@media (min-width: 768px)`,
};

// 앱 전체 컨테이너
export const AppContainer = styled.div`
  ${media.mobile} {
    width: 402px;
    height: 830px;
    margin: 0 auto;
    background-color: white;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  ${media.pc} {
    width: 1440px;
    height: 1024px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }
`;

// 헤더 관련 스타일
export const Header = styled.header`
  ${media.mobile} {
    display: flex;
    align-items: center;
    padding: 10px 16px;
    position: relative;
    height: 72px;
    border-bottom: 1px solid white;
    flex-shrink: 0;
  }

  ${media.pc} {
    display: flex;
    flex-direction: row;
    margin: 105px 100px 80px 160px;
    align-items: center;
    justify-content: space-between;
  }
`;

export const BackButton = styled.button`
  ${media.mobile} {
    background: none;
    border: none;
    color: #F67676;
    font-size: 24px;
    padding: 0;
    cursor: pointer;
  }
  ${media.pc} {
    width: 400px;
    height: 40px;
    border: 1px solid #DDDDDD;
    border-radius: 3px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    color: #000000;
    background-color: #FFFFFF;
  }
`;

export const PageTitle = styled.h1`
  ${media.mobile} {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    font-size: 18px;
    font-weight: bold;
  }

  ${media.pc} {
    font-size: 16px;
    font-weight: 500;
    color: #929292;

    &.active {
      color: #F67676;
    }
    &.done {
      color: #FFBEBB;
    }
  }
`;

// 스크롤
export const ScrollableContent = styled.div`
  ${media.mobile} {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    
    /* 스크롤바 완전히 숨김 */
    &::-webkit-scrollbar {
      display: none; /* 웹킷 브라우저에서 스크롤바 숨김 */
    }
    
    /* Firefox에서 스크롤바 숨김 */
    scrollbar-width: none;
    
    /* IE에서 스크롤바 숨김 */
    -ms-overflow-style: none;
  }
  ${media.pc} {
  
  }
`;

// 메인 컨텐츠 영역
export const MainContent = styled.main`
  ${media.mobile} {
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-height: 100%;
    position: relative;
  }
  ${media.pc} {
    display: flex;
    flex-direction: row;
    gap: 220px;
    margin-left: 160px;
    margin-right: 100px;
  }
`;

// 포스터 및 공연 정보 영역
export const PosterContainer = styled.div`
  ${media.mobile} {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }
  ${media.pc} {
  }
`;

export const Poster = styled.img`
  ${media.mobile} {
    width: 160px;
    height: 220px;
    border-radius: 3px;
  }
  ${media.pc} {
    width: 500px;
    height: 700px;
    border-radius: 5px;
  }
`;

export const EventInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 14px;
  margin-top: 115px;
  margin-bottom: 32px;
`;

export const EventTitle = styled.h2`
  ${media.mobile} {
    font-size: 20px;
    font-weight: bold;
    margin: 5px 0;
  }
  ${media.pc} {
    font-size: 24px;
    font-weight: bold;
  }
`;

export const EventLink = styled.img`
  cursor: pointer;
`;

export const EventVenue = styled.p`
  ${media.mobile} {
    font-size: 14px;
    font-weight: 500;
    color: #929292;
    text-align: center;
  }
  ${media.pc} {
    font-size: 16px;
    font-weight: 500;
    color: #000000;
    text-align: left;
    margin-bottom: 8px;
  }
`;

export const EventPeriod = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #929292;
  text-align: left;
  width: 460px;
  height: 36px;
  margin-bottom: 32px;
  border-bottom: 1px solid #DDDDDD;
`;

// 섹션 관련 스타일
export const FormSection = styled.div`
  margin-bottom: 20px;
`;

export const FormSection2 = styled.div`
  ${media.mobile} {
    margin-bottom: 20px;
  }
  ${media.pc} {
    width: 578px;
    height: fit-content;
    padding: 20px;
    border: 1px solid #DDDDDD;
    border-radius: 3px;
  }
`;

export const SummarySection = styled.div`
  ${media.mobile} {
    margin-bottom: 20px;
  }
  ${media.pc} {
    width: 400px;
  }  
`;

export const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 800;
  color: #F67676;
  margin-bottom: 20px;
`;

export const SelectionSection = styled.div`
  display: flex;
  position: relative;
  ${media.pc} {
    flex-direction: column;
  } 
`;

// 액션 버튼 스타일
export const ActionButton = styled.button`
  ${media.mobile} {
    width: 100%;
    height: 60px;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 20px;
    
    &.primary {
      background-color: #F67676;
      color: white;
    }
    
    &.disabled {
      background-color: #e0e0e0;
      color: #999;
      cursor: not-allowed;
    }

    &.bottom {
      position: absolute;
      bottom: 30px;
      width: 362px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;
    }
  }
  ${media.pc} {
    width: 400px;
    height: 40px;
    border: none;
    border-radius: 3px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;

    &.primary {
      background-color: #F67676;
      color: white;
    }
    &.disabled {
      background-color: #e0e0e0;
      color: #999;
      cursor: not-allowed;
    }
    &.bottom {
      border: 1px solid #DDDDDD;
      border-radius: 3px;
      color: #000000;
      background-color: #FFFFFF;
      font-weight: 500;
    }
  }
`;

export const SuccessMessage = styled.div`
  ${media.mobile} {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    color: #F67676;
    font-size: 18px;
    font-weight: bold;
  }
  ${media.pc} {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh; /* 전체 화면 높이 */
    color: #F67676;
    font-size: 18px;
    font-weight: bold;
    margin: 0 auto;
    padding: 0;
  }
`;

// PC 화면
export const PcLayout = styled.div`
  ${media.mobile} {

  }
  ${media.pc} {
    display: flex;
    flex-direction: row;
    margin-top: 44px;
    gap: 140px;
  }
`;