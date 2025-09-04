import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Board from './pages/board/Board';

const App = () => {
  return (
    <Routes>
      <Route path="/board/*" element={<Board />} />
    </Routes>
  );
};

export default App;