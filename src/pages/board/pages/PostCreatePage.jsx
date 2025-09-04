
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Container } from '../styles/commonStyles';
import {
  ContentArea,
  FormContainer,
  CategoryLabel,
  FormField,
  TitleInput,
  ContentTextarea,
  ImageSection,
  ImageAddButton,
  ImageAddIcon,
  ImageAddText,
  ImagePreviewContainer,
  ImagePreview,
  ImageDeleteButton,
  RegisterBtnContainer,
  RegisterButton,
} from '../styles/formStyles';
import Header from '../components/BoardHeader';
import Modal from '../components/Modal';
import useModal from '../hooks/useModal';
import usePosts from '../hooks/usePosts';
import Camera from '../components/Icons/Camera.svg';
import useResponsive from '../hooks/useResponsive';

const PostCreatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { addPost, getPost, updatePost } = usePosts();
  const isPC = useResponsive();

  const isEditMode = Boolean(id);
  const searchParams = new URLSearchParams(location.search);
  const categoryFromUrl = searchParams.get('category') || 'general';
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: categoryFromUrl,
    images: []
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [historyPushed, setHistoryPushed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [originalData, setOriginalData] = useState(null);
  const { isOpen: isExitModalOpen, openModal: openExitModal, closeModal: closeExitModal } = useModal();

  // 수정 모드일 때 기존 게시글 데이터 로드
  useEffect(() => {
    if (isEditMode && id) {
      loadExistingPost();
    }
  }, [isEditMode, id]);

  const loadExistingPost = async () => {
    setIsLoading(true);
    try {
      const existingPost = await getPost(id);
      
      if (existingPost) {
        // 기존 이미지를 formData.images 형식으로 변환
        const existingImages = existingPost.image 
          ? (Array.isArray(existingPost.image) 
              ? existingPost.image.map((url, index) => ({
                  id: `existing_${index}`,
                  url: url,
                  file: null
                }))
              : [{
                  id: 'existing_0',
                  url: existingPost.image,
                  file: null
                }])
          : [];

        const initialData = {
          title: existingPost.title,
          content: existingPost.content,
          category: existingPost.category,
          images: existingImages
        };

        setFormData(initialData);
        setOriginalData(initialData);
      } else {
        navigate('/board');
      }
    } catch (error) {
      console.error('게시글 로드 실패:', error);
      navigate('/board');
    } finally {
      setIsLoading(false);
    }
  };

  // hasUnsavedChanges 계산
  useEffect(() => {
    if (isEditMode && originalData) {
      const hasChanges = 
        formData.title !== originalData.title ||
        formData.content !== originalData.content ||
        formData.images.length !== originalData.images.length ||
        formData.images.some((img, index) => {
          const originalImg = originalData.images[index];
          return !originalImg || img.url !== originalImg.url;
        });
      setHasUnsavedChanges(hasChanges);
    } else {
      const hasContent = formData.title.trim() || formData.content.trim() || formData.images.length > 0;
      setHasUnsavedChanges(hasContent);
    }
  }, [formData, originalData, isEditMode]);

  // 브라우저 이벤트 처리
  useEffect(() => {
    if (!historyPushed) {
      window.history.pushState(null, '', window.location.href);
      setHistoryPushed(true);
    }

    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    const handlePopState = (e) => {
      e.preventDefault();
      
      if (hasUnsavedChanges) {
        openExitModal();
      } else {
        navigate('/board');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [hasUnsavedChanges, openExitModal, navigate, historyPushed]);

  const getCategoryDisplayName = (cat) => {
    switch(cat) {
      case 'general': return '일반 게시판';
      case 'promotion': return '홍보 게시판';
      case 'hot': return '일반 게시판';
      default: return '일반 게시판';
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageAdd = (event) => {
    const files = Array.from(event.target.files);
    const remainingSlots = 5 - formData.images.length;
    const filesToAdd = files.slice(0, remainingSlots);
    
    filesToAdd.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, {
            id: Date.now() + Math.random(),
            file: file,
            url: e.target.result
          }]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageDelete = (imageId) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId)
    }));
  };

  const isFormValid = formData.title.trim() && formData.content.trim();

  // 게시글 작성/수정 완료 - API 연동
  const handleSubmit = async () => {
    if (!isFormValid) return;

    try {
      setIsLoading(true);

      if (isEditMode) {
        // 수정 모드
        const updateData = {
          title: formData.title.trim(),
          content: formData.content.trim(),
          category: formData.category,
          // 이미지 처리 로직 (기존 + 새로 추가된 것들)
          imageRequestDTOs: formData.images.map(img => ({
            keyName: img.keyName || '',
            imageUrl: img.url
          }))
        };

        await updatePost(id, updateData);
        navigate(`/board/post/${id}`);
      } else {
        // 작성 모드
        const newPost = {
          title: formData.title.trim(),
          content: formData.content.trim(),
          category: formData.category === 'hot' ? 'general' : formData.category,
          images: formData.images // usePosts에서 이미지 업로드 처리
        };

        const createdPost = await addPost(newPost);
        navigate(`/board/create/success?postId=${createdPost.id}`);
      }
    } catch (error) {
      console.error(`게시글 ${isEditMode ? '수정' : '작성'} 실패:`, error);
      alert(`게시글 ${isEditMode ? '수정' : '작성'}에 실패했습니다. 다시 시도해주세요.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (hasUnsavedChanges) {
      openExitModal();
    } else {
      if (isEditMode) {
        navigate(`/board/post/${id}`);
      } else {
        navigate('/board');
      }
    }
  };

  const exitModalActions = [
    {
      label: '취소',
      type: 'cancel',
      onClick: closeExitModal
    },
    {
      label: '나가기',
      type: 'confirm',
      onClick: () => {
        closeExitModal();
        if (isEditMode) {
          navigate(`/board/post/${id}`);
        } else {
          navigate('/board');
        }
      }
    }
  ];

  if (isEditMode && isLoading) {
    return (
      <Container>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}>
          로딩 중...
        </div>
      </Container>
    );
  }

  return (
    <Container>
      {!isPC && (
        <Header
          title={isEditMode ? "edit" : "create"}
          showBack={true}
          onBack={handleBack}
          onComplete={handleSubmit}
          completeDisabled={!isFormValid || isLoading}
        />
      )}

      <ContentArea>
        <FormContainer>
          <FormField>
            <RegisterBtnContainer>
              <TitleInput
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="제목을 입력하세요"
                maxLength={100}
                disabled={isLoading}
              />
              {isPC && (
                <RegisterButton 
                  disabled={!isFormValid || isLoading} 
                  onClick={isFormValid && !isLoading ? handleSubmit : undefined}
                >
                  {isLoading ? '처리중...' : (isEditMode ? '수정' : '등록')}
                </RegisterButton>
              )}
            </RegisterBtnContainer>
          </FormField>

          <CategoryLabel>{getCategoryDisplayName(formData.category)}</CategoryLabel>
          
          {isPC && (
            <div style={{display: 'flex', justifyContent: 'end'}}>
              <ImageAddButton disabled={formData.images.length >= 5 || isLoading}>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageAdd}
                  style={{ display: 'none' }}
                  id="image-upload"
                  disabled={formData.images.length >= 5 || isLoading}
                />
                <label htmlFor="image-upload" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  cursor: (formData.images.length >= 5 || isLoading) ? 'not-allowed' : 'pointer',
                  opacity: (formData.images.length >= 5 || isLoading) ? 0.5 : 1
                }}>
                  <ImageAddIcon src={Camera} alt="사진 추가" />
                  <ImageAddText>사진</ImageAddText>
                </label>
              </ImageAddButton>
            </div>
          )}

          <FormField>
            <ContentTextarea
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder="다양한 사람들과 공연에 관해 이야기를 나눠봐요!"
              rows={8}
              disabled={isLoading}
            />
          </FormField>

          <ImageSection>
            {!isPC && ( 
              <ImageAddButton disabled={formData.images.length >= 5 || isLoading}>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageAdd}
                  style={{ display: 'none' }}
                  id="image-upload"
                  disabled={formData.images.length >= 5 || isLoading}
                />
                <label htmlFor="image-upload" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  cursor: (formData.images.length >= 5 || isLoading) ? 'not-allowed' : 'pointer',
                  opacity: (formData.images.length >= 5 || isLoading) ? 0.5 : 1
                }}>
                  <ImageAddIcon src={Camera} alt="사진 추가" />
                  <ImageAddText>사진</ImageAddText>
                </label>
              </ImageAddButton>
            )}
            
            {formData.images.length > 0 && (
              <ImagePreviewContainer>
                {formData.images.map((image) => (
                  <ImagePreview key={image.id}>
                    <img src={image.url} alt="미리보기" />
                    <ImageDeleteButton 
                      onClick={() => handleImageDelete(image.id)}
                      disabled={isLoading}
                    >
                      ✕
                    </ImageDeleteButton>
                  </ImagePreview>
                ))}
              </ImagePreviewContainer>
            )}
          </ImageSection>
        </FormContainer>
      </ContentArea>

      <Modal
        isOpen={isExitModalOpen}
        onClose={closeExitModal}
        title={isEditMode ? "수정을 취소하시겠어요?" : "작성을 취소하시겠어요?"}
        actions={exitModalActions}
      />
    </Container>
  );
};

export default PostCreatePage;