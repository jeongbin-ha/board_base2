
import { useState, useEffect } from 'react';

const useResponsive = () => {
  // 초기값을 실제 화면 크기로 설정
  const [isPC, setIsPC] = useState(() => {
    // SSR 환경 체크 (window가 undefined인 경우)
    if (typeof window === 'undefined') return false;
    return window.innerWidth >= 768;
  });
  
  useEffect(() => {
    const checkDevice = () => {
      setIsPC(window.innerWidth >= 768);
    };

    // 초기 체크
    checkDevice();
    
    // 리사이즈 이벤트 리스너 등록
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return isPC;
};

export default useResponsive;