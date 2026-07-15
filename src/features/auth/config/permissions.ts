/**
 * AEGIX Permission Registry
 * Centralized permission definitions and role-to-permission mapping.
 */

import type { UserRole, Permission, RoleConfig } from '../types/roles';

/**
 * All available permissions in the system.
 * This is the single source of truth for permissions.
 */
export const PERMISSIONS = {
  // Dashboard
  DASHBOARD_VIEW: 'dashboard.view',

  // Assets
  ASSETS_VIEW: 'assets.view',
  ASSETS_CREATE: 'assets.create',
  ASSETS_EDIT: 'assets.edit',
  ASSETS_DELETE: 'assets.delete',

  // Monitoring
  MONITORING_VIEW: 'monitoring.view',

  // Alerts
  ALERTS_VIEW: 'alerts.view',
  ALERTS_ACKNOWLEDGE: 'alerts.acknowledge',

  // Threat Hunting
  THREAT_HUNTING_VIEW: 'threat_hunting.view',
  THREAT_HUNTING_EXECUTE: 'threat_hunting.execute',

  // Compliance
  COMPLIANCE_VIEW: 'compliance.view',
  COMPLIANCE_MANAGE: 'compliance.manage',

  // Settings
  SETTINGS_VIEW: 'settings.view',
  SETTINGS_MANAGE: 'settings.manage',

  // Users
  USERS_VIEW: 'users.view',
  USERS_MANAGE: 'users.manage',
} as const satisfies Record<string, Permission>;

/**
 * Role-to-permission mapping.
 * Each role has a specific set of permissions.
 * Higher roles inherit permissions from lower roles.
 */
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  // Super Admin: Full access to everything
  super_admin: Object.values(PERMISSIONS),

  // Administrator: Full access except some user management
  administrator: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.ASSETS_VIEW,
    PERMISSIONS.ASSETS_CREATE,
    PERMISSIONS.ASSETS_EDIT,
    PERMISSIONS.ASSETS_DELETE,
    PERMISSIONS.MONITORING_VIEW,
    PERMISSIONS.ALERTS_VIEW,
    PERMISSIONS.ALERTS_ACKNOWLEDGE,
    PERMISSIONS.THREAT_HUNTING_VIEW,
    PERMISSIONS.THREAT_HUNTING_EXECUTE,
    PERMISSIONS.COMPLIANCE_VIEW,
    PERMISSIONS.COMPLIANCE_MANAGE,
    PERMISSIONS.SETTINGS_VIEW,
    PERMISSIONS.SETTINGS_MANAGE,
    PERMISSIONS.USERS_VIEW,
    PERMISSIONS.USERS_MANAGE,
  ],

  // SOC Analyst: Monitoring, alerts, threat hunting, compliance
  soc_analyst: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.MONITORING_VIEW,
    PERMISSIONS.ALERTS_VIEW,
    PERMISSIONS.ALERTS_ACKNOWLEDGE,
    PERMISSIONS.THREAT_HUNTING_VIEW,
    PERMISSIONS.THREAT_HUNTING_EXECUTE,
    PERMISSIONS.COMPLIANCE_VIEW,
  ],

  // IT Operator: Assets and monitoring
  it_operator: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.ASSETS_VIEW,
    PERMISSIONS.ASSETS_CREATE,
    PERMISSIONS.ASSETS_EDIT,
    PERMISSIONS.MONITORING_VIEW,
    PERMISSIONS.ALERTS_VIEW,
    PERMISSIONS.ALERTS_ACKNOWLEDGE,
  ],

  // Auditor: Read-only access to most features
  auditor: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.ASSETS_VIEW,
    PERMISSIONS.MONITORING_VIEW,
    PERMISSIONS.ALERTS_VIEW,
    PERMISSIONS.THREAT_HUNTING_VIEW,
    PERMISSIONS.COMPLIANCE_VIEW,
  ],

  // Viewer: Limited read-only access
  viewer: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.ASSETS_VIEW,
    PERMISSIONS.MONITORING_VIEW,
  ],
};

/**
 * Role configurations with metadata.
 */
export const ROLE_CONFIGS: RoleConfig[] = [
  {
    name: 'super_admin',
    label: 'Super Admin',
    description: 'Full system access with all permissions',
    permissions: ROLE_PERMISSIONS.super_admin,
  },
  {
    name: 'administrator',
    label: 'Administrator',
    description: 'Full access to manage all system features',
    permissions: ROLE_PERMISSIONS.administrator,
  },
  {
    name: 'soc_analyst',
    label: 'SOC Analyst',
    description: 'Security operations center analyst with monitoring and threat hunting access',
    permissions: ROLE_PERMISSIONS.soc_analyst,
  },
  {
    name: 'it_operator',
    label: 'IT Operator',
    description: 'IT operations with asset and alert management access',
    permissions: ROLE_PERMISSIONS.it_operator,
  },
  {
    name: 'auditor',
    label: 'Auditor',
    description: 'Read-only access for compliance and audit purposes',
    permissions: ROLE_PERMISSIONS.auditor,
  },
  {
    name: 'viewer',
    label: 'Viewer',
    description: 'Limited read-only access to view assets and monitoring',
    permissions: ROLE_PERMISSIONS.viewer,
  },
];

/**
 * Get permissions for a specific role.
 */
export const getRolePermissions = (role: UserRole | null): Permission[] => {
  if (!role) return [];
  return ROLE_PERMISSIONS[role] ?? [];
};

/**
 * Get role label for display.
 */
export const getRoleLabel = (role: UserRole | null): string => {
  if (!role) return 'Unknown';
  const config = ROLE_CONFIGS.find((r) => r.name === role);
  return config?.label ?? role;
};

/**
 * Check if a permission exists in the system.
 */
export const isValidPermission = (permission: string): permission is Permission => {
  return Object.values(PERMISSIONS).includes(permission as Permission);
};

/**
 * Check if a role exists in the system.
 */
export const isValidRole = (role: string): role is UserRole => {
  return Object.keys(ROLE_PERMISSIONS).includes(role as UserRole);
};