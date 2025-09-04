
import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  ContentArea,
  LoadingSpinner,
  EmptyState,
  LoadMoreButton,
  LoadMoreContainer,
  SideMenuWrapper 
} from '../styles/commonStyles';
import HomeIconMenu from '../../../components/HomeIconMenu';
import Header from '../components/BoardHeader';
import TabBar from '../components/TabBar';
import SearchBar from '../components/SearchBar';
import PostItem from '../components/PostItem';
import FloatingButton from '../components/FloatingButton';
import usePosts from '../hooks/usePosts';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import useResponsive from '../hooks/useResponsive';

const PostListPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const isPC = useResponsive();
  const contentAreaRef = useRef(null);

  const {
    posts, 
    loading, 
    hasMore, 
    userType,
    canCreatePost, 
    loadPosts, 
    loadMore, 
    setPage, 
    searchPosts
  } = usePosts();

  const { lastElementRef } = useInfiniteScroll(
    () => loadMore(activeTab),
    hasMore,
    loading,
    !isPC && !isSearchMode // 모바일만 무한스크롤
  );

  // 탭 변경 시 데이터 로드 + 스크롤 초기화
  useEffect(() => {
    // 검색 모드가 아닐 때만 탭 데이터 로드
    if (!isSearchMode) {
      setPage(0);
      loadPosts(activeTab, 0, true);
    }
    // 스크롤 초기화
    if (contentAreaRef.current) {
      contentAreaRef.current.scrollTop = 0;
    }
  }, [activeTab, loadPosts, setPage, isSearchMode]);

  // 탭 변경 핸들러
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsSearchMode(false); // 탭 변경 시 검색 모드 해제
    setSearchKeyword('');
    setSearchResults([]);
  };

  // 검색 핸들러
  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      // 검색어가 비어있으면 검색 모드 해제
      setIsSearchMode(false);
      setSearchKeyword('');
      setSearchResults([]);
      return;
    }

    setSearchKeyword(searchTerm);
    setIsSearchMode(true);
    setSearchLoading(true);

    try {
      const results = await searchPosts(searchTerm, activeTab, 0, 20);
      setSearchResults(results);
    } catch (error) {
      console.error('검색 실패:', error);
      alert('검색에 실패했습니다. 다시 시도해주세요.');
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  // PC용 더보기 버튼 핸들러
  const handleLoadMore = () => {
    if (!isSearchMode) {
      loadMore(activeTab);
    }
  };

  // 표시할 게시글 목록 결정
  const displayPosts = isSearchMode ? searchResults : posts;
  const displayLoading = isSearchMode ? searchLoading : loading;
  const displayHasMore = isSearchMode ? false : hasMore;

  const showFloatingButton = canCreatePost(activeTab);

  return (
    <div>
      <SideMenuWrapper>
        <HomeIconMenu isWeb={true} selectedMenu="board" />
      </SideMenuWrapper>

      <Container>
        {!isPC && (
          <Header 
            title="board" 
            onMenuClick={() => console.log('메뉴 클릭')}
            onSearchClick={() => console.log('검색 클릭')}
          />
        )}
        
        <TabBar 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
          showFloatingButton={showFloatingButton}
        />
        
        <SearchBar 
          onSearch={handleSearch} 
          showNotice={!isSearchMode} // 검색 모드가 아닐 때만 알림 표시
        />

        {/* 검색 결과 표시 */}
        {isSearchMode && (
          <div style={{ 
            padding: isPC ? '0 100px 0 60px' : '0 20px', 
            marginBottom: '10px', 
            fontSize: '14px', 
            color: '#666' 
          }}>
            {searchLoading ? (
              '검색 중...'
            ) : (
              `"${searchKeyword}" 검색 결과 ${searchResults.length}개`
            )}
            <button
              onClick={() => {
                setIsSearchMode(false);
                setSearchKeyword('');
                setSearchResults([]);
              }}
              style={{
                marginLeft: '10px',
                background: 'none',
                border: 'none',
                color: '#F67676',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              검색 취소
            </button>
          </div>
        )}
        
        <ContentArea ref={contentAreaRef}>
          {displayPosts.length === 0 && !displayLoading ? (
            <EmptyState>
              {isSearchMode ? (
                <>
                  <p>검색 결과가 없습니다.</p>
                  <p>다른 키워드로 검색해보세요.</p>
                </>
              ) : (
                <>
                  <p>게시글이 없습니다.</p>
                  <p>첫 게시글을 작성해보세요!</p>
                </>
              )}
            </EmptyState>
          ) : (
            <>
              {displayPosts.map((post, index) => (
                <PostItem
                  key={`${post.id}_${isSearchMode ? 'search' : 'normal'}`}
                  post={post}
                  isLast={index === displayPosts.length - 1}
                  lastElementRef={(!isPC && !isSearchMode) ? lastElementRef : null}
                />
              ))}

              {/* PC용 더보기 버튼 - 검색 모드가 아닐 때만 표시 */}
              {isPC && displayHasMore && !displayLoading && !isSearchMode && (
                <LoadMoreContainer>
                  <LoadMoreButton onClick={handleLoadMore}>
                    게시글 더보기
                  </LoadMoreButton>
                </LoadMoreContainer>
              )}
              
              {displayLoading && (
                <LoadingSpinner>
                  <p>{isSearchMode ? '검색 중...' : '로딩 중...'}</p>
                </LoadingSpinner>
              )}
            </>
          )}
        </ContentArea>
        
        {!isPC && (
          <FloatingButton 
            show={showFloatingButton} 
            category={activeTab} 
          />
        )}
      </Container>
    </div>
  );
};

export default PostListPage;