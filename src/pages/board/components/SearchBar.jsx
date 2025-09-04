
import React, { useState } from 'react';
import {
  SearchContainer,
  SearchBox,
  SearchInput,
  SearchIcon,
  SearchNotice
} from '../styles/commonStyles';
import SearchBlack from './Icons/SearchBlack.svg';
import useResponsive from '../hooks/useResponsive'

const SearchBar = ({ onSearch, showNotice = true }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const isPC = useResponsive();

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <SearchContainer>
      <SearchBox>
        {isPC && ( <SearchIcon onClick={handleSearch} src={SearchBlack} /> )}
        <SearchInput
          placeholder="원하시는 내용을 검색하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        {!isPC && ( <SearchIcon onClick={handleSearch} src={SearchBlack} /> )}
      </SearchBox>
      {showNotice && (
        <SearchNotice>
          좋아요 10개를 받으면 HOT 게시물로 자동 선정됩니다.
        </SearchNotice>
      )}
    </SearchContainer>
  );
};

export default SearchBar;