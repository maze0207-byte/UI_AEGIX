/**
 * AEGIX Administration Types
 * Types for Administration Workspace
 */

// User
export interface AdminUser {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin?: string;
  roles: string[];
  department?: string;
}

// Role
export interface AdminRole {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  isSystem?: boolean;
}

// Department
export interface AdminDepartment {
  id: string;
  name: string;
  manager?: string;
  userCount: number;
  buildingCount: number;
  labCount: number;
  assetCount: number;
}

// Building
export interface AdminBuilding {
  id: string;
  name: string;
  address: string;
  floors: number;
  departmentCount: number;
  labCount: number;
  deviceCount: number;
}

// Lab
export interface AdminLab {
  id: string;
  name: string;
  building: string;
  department: string;
  responsibleUser?: string;
  capacity: number;
  assignedDevices: number;
}

// Agent Policy
export interface AgentPolicy {
  id: string;
  name: string;
  description: string;
  heartbeat: boolean;
  monitoring: boolean;
  telemetry: boolean;
  security: boolean;
  evidenceCollection: boolean;
  softwareUpdate: boolean;
  offlineCache: boolean;
}

// Software Package
export interface SoftwarePackage {
  id: string;
  name: string;
  version: string;
  category: string;
  size: number;
  deploymentGroups: string[];
  status: 'active' | 'deprecated' | 'testing';
}

// Integration
export interface Integration {
  id: string;
  name: string;
  type: 'mqtt' | 'postgresql' | 'redis' | 'smtp' | 'ldap' | 'webhook';
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: string;
  config?: Record<string, unknown>;
}

// Audit Log
export interface AuditLog {
  id: string;
  user: string;
  action: string;
  resource: string;
  timestamp: string;
  ipAddress?: string;
  details?: string;
}

// License
export interface License {
  version: string;
  licenseKey: string;
  expiryDate: string;
  maxUsers: number;
  maxDevices: number;
  features: string[];
}

// System Settings
export interface SystemSettings {
  theme: 'dark' | 'light';
  language: string;
  timezone: string;
  sessionTimeout: number;
  branding: {
    logo?: string;
    companyName: string;
  };
}

// Admin Filters
export interface AdminFilters {
  search: string;
  status: 'all' | 'active' | 'inactive';
  dateFrom?: string;
  dateTo?: string;
}