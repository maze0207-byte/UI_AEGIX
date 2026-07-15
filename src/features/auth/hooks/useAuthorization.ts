/**
 * AEGIX Authorization Hooks
 * Reusable hooks for role and permission checks.
 */

import { useAuthStore } from '../store/authStore';
import type { UserRole, Permission } from '../types/roles';

/**
 * Hook to access user role.
 */
export const useRole = (): UserRole | null => {
  return useAuthStore((state) => state.userRole);
};

/**
 * Hook to access user permissions.
 */
export const usePermissions = (): Permission[] => {
  return useAuthStore((state) => state.userPermissions);
};

/**
 * Hook to check if user has a specific role.
 */
export const useHasRole = (role: UserRole | UserRole[]): boolean => {
  return useAuthStore((state) => state.hasRole(role));
};

/**
 * Hook to check if user has a specific permission.
 */
export const useHasPermission = (permission: Permission): boolean => {
  return useAuthStore((state) => state.hasPermission(permission));
};

/**
 * Hook to check if user has any of the specified permissions.
 */
export const useHasAnyPermission = (permissions: Permission[]): boolean => {
  return useAuthStore((state) => state.hasAnyPermission(permissions));
};

/**
 * Hook to check if user has all of the specified permissions.
 */
export const useHasAllPermissions = (permissions: Permission[]): boolean => {
  return useAuthStore((state) => state.hasAllPermissions(permissions));
};

/**
 * Hook to get authorization context with all helpers.
 */
export const useAuthorization = () => {
  const userRole = useAuthStore((state) => state.userRole);
  const userPermissions = useAuthStore((state) => state.userPermissions);
  const hasRole = useAuthStore((state) => state.hasRole);
  const hasPermission = useAuthStore((state) => state.hasPermission);
  const hasAnyPermission = useAuthStore((state) => state.hasAnyPermission);
  const hasAllPermissions = useAuthStore((state) => state.hasAllPermissions);

  return {
    userRole,
    userPermissions,
    hasRole,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  };
};