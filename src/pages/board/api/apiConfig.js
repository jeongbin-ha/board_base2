
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_SERVER_URL;
const ACCESS_TOKEN = import.meta.env.VITE_APP_ACCESS_TOKEN;

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 - 토큰 자동 추가
apiClient.interceptors.request.use(
  (config) => {
    if (ACCESS_TOKEN) {
      config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 에러 처리
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      // 토큰 만료 처리
      console.error('토큰이 만료되었습니다.');
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;