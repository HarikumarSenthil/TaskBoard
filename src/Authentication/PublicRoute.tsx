// src/components/authentication/PublicRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const token = Cookies.get('jwtToken');

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
