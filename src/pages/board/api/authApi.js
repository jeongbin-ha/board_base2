
import apiClient from './apiConfig';

// 현재 사용자 정보 조회
export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get('/member/myPage');
    return response.result;
  } catch (error) {
    console.error('사용자 정보 조회 실패:', error);
    return null;
  }
};

// 사용자 권한 확인 (홍보 게시판 작성 권한)
export const checkPromotionPermission = (userInfo) => {
  // API 응답에서 사용자 타입을 확인하는 로직
  // 실제 API 응답 구조에 따라 조정 필요
  return userInfo?.status === 'ACTIVE' && userInfo?.id; // 임시 로직
};

// 내가 작성한 게시글인지 확인
export const isMyPost = (post, currentUserId) => {
  return post?.memberId === currentUserId;
};

// 내가 작성한 댓글인지 확인
export const isMyComment = (comment, currentUserId) => {
  return comment?.memberId === currentUserId;
};