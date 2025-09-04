
import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';
import PostCreatePage from './pages/PostCreatePage';
import SuccessPage from './pages/SuccessPage';
//import PostEditPage from './pages/PostEditPage';

const BoardPage = () => {
  return (
    <Routes>
      <Route path="/" element={<PostListPage />} />
      <Route path="/post/:id" element={<PostDetailPage />} />
      <Route path="/create" element={<PostCreatePage />} />
      <Route path="/create/success" element={<SuccessPage />} />
      <Route path="/edit/:id" element={<PostCreatePage />} />
    </Routes>
  );
};

export default BoardPage;