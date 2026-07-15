/**
 * AEGIX Public Route
 * Route for unauthenticated users - redirects to dashboard if already authenticated.
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../features/auth';
import { AuthLoadingState } from '../../features/auth/components/AuthErrorDisplay';

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <AuthLoadingState />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};