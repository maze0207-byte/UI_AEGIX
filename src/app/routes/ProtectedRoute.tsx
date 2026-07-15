/**
 * AEGIX Protected Route
 * Route guard for authenticated application routes with role and permission support.
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../features/auth';
import { AuthLoadingState } from '../../features/auth/components/AuthErrorDisplay';
import type { UserRole, Permission } from '../../features/auth/types/roles';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole | UserRole[];
  requiredPermission?: Permission | Permission[];
  requireAllPermissions?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  requiredPermission,
  requireAllPermissions = false,
}) => {
  const { isAuthenticated, isLoading, hasRole, hasAnyPermission, hasAllPermissions } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <AuthLoadingState />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/access-denied" replace />;
  }

  // Check permission-based access
  if (requiredPermission) {
    const permissions = Array.isArray(requiredPermission) ? requiredPermission : [requiredPermission];
    
    if (requireAllPermissions) {
      if (!hasAllPermissions(permissions)) {
        return <Navigate to="/access-denied" replace />;
      }
    } else {
      if (!hasAnyPermission(permissions)) {
        return <Navigate to="/access-denied" replace />;
      }
    }
  }

  return <>{children}</>;
};