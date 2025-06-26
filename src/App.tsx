// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import BoardView from './Pages/BoardView';
import BoardDetail from './Pages/BoardDetail';
import Layout from './layout/Layout';
import LoginPage from './components/authentication/LoginPage';
import RegisterPage from './components/authentication/RegisterPage';
import ProtectedRoute from './Authentication/ProtectedRoute';
import PublicRoute from './Authentication/PublicRoute';
import NotFound from './layout/NotFound';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes*/}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        {/* Protected routes*/}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <BoardView />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/board/:boardId"
          element={
            <ProtectedRoute>
              <Layout>
                <BoardDetail />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Layout>
                <NotFound />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
