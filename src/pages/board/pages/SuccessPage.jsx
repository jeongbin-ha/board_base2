
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container } from '../styles/commonStyles';
import { SuccessMessage } from '../../ticketingpage/styles/commonStyles';
import ActionButton from '../../ticketingpage/components/ActionButton';
import useResponsive from '../hooks/useResponsive';

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isPC = useResponsive();
  
  // URL에서 생성된 게시글 ID 받기
  const searchParams = new URLSearchParams(location.search);
  const postId = searchParams.get('postId');

  // 글 보러가기 버튼
  const handleViewPost = () => {
    if (postId) {
      navigate(`/board/post/${postId}`);
    } else {
      navigate('/board'); // fallback
    }
  };

  return (
    <Container>
      <SuccessMessage>
        {isPC && (
          <p style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#F67676',
            marginBottom: '60px'
          }}>
            글 작성 완료하였습니다!
          </p>
        )}
        {!isPC && (
          <p>글 작성 완료하였습니다!</p>
        )}
        <ActionButton isActive={true} onClick={handleViewPost} className="bottom">
          내가 쓴 글 보러가기
        </ActionButton>
      </SuccessMessage>
    </Container>
  );
};

export default SuccessPage;