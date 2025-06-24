import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import BoardView from './Pages/BoardView';
import BoardDetail from './Pages/BoardDetail';
import Layout from './layout/Layout';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<BoardView />} />
          <Route path="/board/:boardId" element={<BoardDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
