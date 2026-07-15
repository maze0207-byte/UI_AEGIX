/**
 * AEGIX Role-Based Access Control Types
 * Centralized type definitions for RBAC system.
 */

/**
 * Available user roles in the system.
 * Roles are hierarchical - higher roles inherit permissions from lower roles.
 */
export type UserRole = 
  | 'super_admin'
  | 'administrator'
  | 'soc_analyst'
  | 'it_operator'
  | 'auditor'
  | 'viewer';

/**
 * Available permissions in the system.
 * Format: resource.action
 */
export type Permission =
  // Dashboard
  | 'dashboard.view'
  // Assets
  | 'assets.view'
  | 'assets.create'
  | 'assets.edit'
  | 'assets.delete'
  // Monitoring
  | 'monitoring.view'
  // Alerts
  | 'alerts.view'
  | 'alerts.acknowledge'
  // Threat Hunting
  | 'threat_hunting.view'
  | 'threat_hunting.execute'
  // Compliance
  | 'compliance.view'
  | 'compliance.manage'
  // Settings
  | 'settings.view'
  | 'settings.manage'
  // Users
  | 'users.view'
  | 'users.manage';

/**
 * Role configuration with associated permissions.
 */
export interface RoleConfig {
  name: UserRole;
  label: string;
  description: string;
  permissions: Permission[];
}

/**
 * User authorization information.
 */
export interface UserAuthorization {
  role: UserRole | null;
  permissions: Permission[];
}

/**
 * Authorization context for components.
 */
export interface AuthorizationContext {
  userRole: UserRole | null;
  userPermissions: Permission[];
  hasRole: (role: UserRole | UserRole[]) => boolean;
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
}

/**
 * Navigation item with required permission.
 */
export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  requiredPermission: Permission;
}