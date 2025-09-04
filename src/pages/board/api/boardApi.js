import apiClient from './apiConfig';

// 게시판 타입 매핑
export const BOARD_TYPE = {
  general: 'NORMAL',
  promotion: 'PROMOTION',
  hot: 'NORMAL' // HOT은 일반 게시판에서 좋아요 10개 이상인 것들
};

// 게시글 목록 조회 (일반, 홍보)
export const getBoardList = async (category = 'general', page = 0, size = 20) => {
  const boardType = BOARD_TYPE[category];
  
  const response = await apiClient.get('/boards', {
    params: { boardType, page, size }
  });

  return response;
};

// 핫게시판 조회 (좋아요 10개 이상)
export const getHotBoards = async () => {
  const response = await apiClient.get('/boards/hot');
  return response;
};

// 게시글 상세 조회
export const getBoardDetail = async (boardId) => {
  const response = await apiClient.get(`/boards/${boardId}`);
  return response;
};

// 게시글 작성
export const createBoard = async (boardData) => {
  const response = await apiClient.post('/boards', boardData);
  return response;
};

// 게시글 수정
export const updateBoard = async (boardId, boardData) => {
  const response = await apiClient.put(`/boards/${boardId}`, boardData);
  return response;
};

// 게시글 삭제
export const deleteBoard = async (boardId) => {
  await apiClient.delete(`/boards/${boardId}`);
  return { success: true };
};

// 게시글 좋아요 토글
export const toggleBoardLike = async (boardId) => {
  const response = await apiClient.post(`/boards/${boardId}/like`);
  return response;
};

// 게시글 검색
export const searchBoards = async (keyword, category = 'general', page = 0, size = 20) => {
  const boardType = BOARD_TYPE[category];
  
  const response = await apiClient.get('/boards/search', {
    params: { keyword, boardType, page, size }
  });
  
  return response;
};

// 댓글 목록 조회
export const getComments = async (boardId) => {
  const response = await apiClient.get(`/boards/${boardId}/comments`);
  return response;
};

// 댓글 작성
export const createComment = async (boardId, commentData) => {
  const response = await apiClient.post(`/boards/${boardId}/comments`, commentData);
  return response;
};

// 댓글 수정 (boardId도 함께 전달)
export const updateComment = async (boardId, commentId, content) => {
  const response = await apiClient.patch(`/boards/${boardId}/comments/${commentId}`, content, {
    headers: { 'Content-Type': 'application/json' }
  });
  return response;
};

// 댓글 삭제 (boardId도 함께 전달)
export const deleteComment = async (boardId, commentId) => {
  await apiClient.delete(`/boards/${boardId}/comments/${commentId}`);
  return { success: true };
};

// 댓글 좋아요 토글 (boardId 필요)
export const toggleCommentLike = async (boardId, commentId) => {
  const response = await apiClient.post(`/boards/${boardId}/comments/${commentId}/like`);
  return response;
};
