
import apiClient from './apiConfig';
import axios from 'axios';

// 파일 확장자 추출
const getFileExtension = (file) => {
  return file.name.split('.').pop().toLowerCase();
};

// 단일 이미지 Presigned URL 요청
export const getPresignedUrl = async (file) => {
  const extension = getFileExtension(file);
  
  const response = await apiClient.get('/upload/s3/presignedUrl', {
    params: {
      imageExtension: extension,
      filePath: 'board'
    }
  });
  
  return response.result;
};

// 다중 이미지 Presigned URL 요청
export const getPresignedUrls = async (files) => {
  const extensions = files.map(file => getFileExtension(file));
  
  const response = await apiClient.post('/upload/s3/presignedUrls?filePath=board', extensions);
  
  return response.result;
};

// S3에 파일 업로드
const uploadToS3 = async (presignedUrl, file) => {
  await axios.put(presignedUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  });
};

// DB에 이미지 정보 저장
export const saveImageToDB = async (keyName, imageUrl) => {
  const response = await apiClient.post('/images', {
    keyName,
    imageUrl
  });
  
  return response.result;
};

// DB에 다중 이미지 정보 저장
export const saveMultipleImagesToDB = async (imageRequests) => {
  const response = await apiClient.post('/images/multipleImages', imageRequests);
  return response.result;
};

// 단일 이미지 전체 업로드 프로세스
export const uploadSingleImage = async (file) => {
  try {
    // 1. Presigned URL 요청
    const urlResponse = await getPresignedUrl(file);
    const { presignedUrl, keyName, publicUrl } = urlResponse;
    
    // 2. S3에 파일 업로드
    await uploadToS3(presignedUrl, file);
    
    // 3. DB에 이미지 정보 저장
    const dbResponse = await saveImageToDB(keyName, publicUrl);
    
    return {
      id: dbResponse.id,
      keyName: dbResponse.keyName,
      imageUrl: dbResponse.imageUrl,
      originalFile: file
    };
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    throw error;
  }
};

// 다중 이미지 전체 업로드 프로세스
export const uploadMultipleImages = async (files, filePath = 'board') => {
  try {
    if (!files || files.length === 0) return [];
    
    // 1. Presigned URLs 요청
    const extensions = files.map(file => getFileExtension(file));
    const urlsResponse = await apiClient.post(`/upload/s3/presignedUrls?filePath=${filePath}`, extensions);
    const urlsData = urlsResponse.result;
    
    // 2. S3에 파일들 업로드
    const uploadPromises = files.map(async (file, index) => {
      const urlData = urlsData[index];
      await uploadToS3(urlData.presignedUrl, file);
      return {
        keyName: urlData.keyName,
        imageUrl: urlData.publicUrl,
        originalFile: file
      };
    });
    
    const uploadResults = await Promise.all(uploadPromises);
    
    // 3. DB에 이미지 정보들 저장
    const imageRequests = uploadResults.map(result => ({
      keyName: result.keyName,
      imageUrl: result.imageUrl
    }));
    
    const dbResults = await saveMultipleImagesToDB(imageRequests);
    
    // 결과 매핑
    return dbResults.map((dbResult, index) => ({
      id: dbResult.id,
      keyName: dbResult.keyName,
      imageUrl: dbResult.imageUrl,
      originalFile: uploadResults[index].originalFile
    }));
    
  } catch (error) {
    console.error('다중 이미지 업로드 실패:', error);
    throw error;
  }
};