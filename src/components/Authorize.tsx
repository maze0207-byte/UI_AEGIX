/**
 * AEGIX Authorization Component
 * Component-level permission and role control.
 */

import React from 'react';
import { useAuth } from '../features/auth';
import type { UserRole, Permission } from '../features/auth/types/roles';

interface AuthorizeProps {
  children: React.ReactNode;
  role?: UserRole | UserRole[];
  permission?: Permission | Permission[];
  requireAllPermissions?: boolean;
  fallback?: React.ReactNode;
}

/**
 * Component that conditionally renders children based on role/permission checks.
 * If the user doesn't have the required access, renders the fallback (or nothing).
 */
export const Authorize: React.FC<AuthorizeProps> = ({
  children,
  role,
  permission,
  requireAllPermissions = false,
  fallback = null,
}) => {
  const { hasRole, hasAnyPermission, hasAllPermissions } = useAuth();

  // Check role-based access
  if (role && !hasRole(role)) {
    return <>{fallback}</>;
  }

  // Check permission-based access
  if (permission) {
    const permissions = Array.isArray(permission) ? permission : [permission];
    
    if (requireAllPermissions) {
      if (!hasAllPermissions(permissions)) {
        return <>{fallback}</>;
      }
    } else {
      if (!hasAnyPermission(permissions)) {
        return <>{fallback}</>;
      }
    }
  }

  return <>{children}</>;
};

/**
 * Component that conditionally renders children based on a single permission.
 * Returns null if the user doesn't have the permission.
 */
export const CanAccess: React.FC<{
  permission: Permission;
  children: React.ReactNode;
}> = ({ permission, children }) => {
  const { hasPermission } = useAuth();
  
  if (!hasPermission(permission)) {
    return null;
  }
  
  return <>{children}</>;
};

/**
 * Component that conditionally renders children based on a single role.
 * Returns null if the user doesn't have the role.
 */
export const CanRole: React.FC<{
  role: UserRole | UserRole[];
  children: React.ReactNode;
}> = ({ role, children }) => {
  const { hasRole } = useAuth();
  
  if (!hasRole(role)) {
    return null;
  }
  
  return <>{children}</>;
};