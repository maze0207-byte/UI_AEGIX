/**
 * AEGIX Authorization Utilities
 * Reusable authorization helper functions.
 */

import type { UserRole, Permission } from '../types/roles';
import { getRolePermissions } from '../config/permissions';

/**
 * Check if user has a specific role.
 */
export const hasRole = (
  userRole: UserRole | null,
  requiredRole: UserRole | UserRole[]
): boolean => {
  if (!userRole) return false;
  
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  return roles.includes(userRole);
};

/**
 * Check if user has a specific permission.
 */
export const hasPermission = (
  userRole: UserRole | null,
  userPermissions: Permission[],
  requiredPermission: Permission
): boolean => {
  if (!userRole) return false;
  
  // Get permissions from role
  const rolePermissions = getRolePermissions(userRole);
  
  // Check if permission is in role permissions or user-specific permissions
  return rolePermissions.includes(requiredPermission) || userPermissions.includes(requiredPermission);
};

/**
 * Check if user has any of the specified permissions.
 */
export const hasAnyPermission = (
  userRole: UserRole | null,
  userPermissions: Permission[],
  requiredPermissions: Permission[]
): boolean => {
  if (!userRole || requiredPermissions.length === 0) return false;
  
  const rolePermissions = getRolePermissions(userRole);
  const allPermissions = new Set([...rolePermissions, ...userPermissions]);
  
  return requiredPermissions.some((permission) => allPermissions.has(permission));
};

/**
 * Check if user has all of the specified permissions.
 */
export const hasAllPermissions = (
  userRole: UserRole | null,
  userPermissions: Permission[],
  requiredPermissions: Permission[]
): boolean => {
  if (!userRole || requiredPermissions.length === 0) return false;
  
  const rolePermissions = getRolePermissions(userRole);
  const allPermissions = new Set([...rolePermissions, ...userPermissions]);
  
  return requiredPermissions.every((permission) => allPermissions.has(permission));
};

/**
 * Get all permissions for a user (role + user-specific).
 */
export const getUserAllPermissions = (
  userRole: UserRole | null,
  userPermissions: Permission[]
): Permission[] => {
  const rolePermissions = getRolePermissions(userRole);
  return [...new Set([...rolePermissions, ...userPermissions])];
};

/**
 * Check if user can access a navigation item.
 */
export const canAccessNavigation = (
  userRole: UserRole | null,
  userPermissions: Permission[],
  requiredPermission: Permission
): boolean => {
  return hasPermission(userRole, userPermissions, requiredPermission);
};