/**
 * AEGIX Assets Types
 * Type definitions for the Assets Workspace
 */

// Device status types
export type DeviceStatus = 'online' | 'offline' | 'unknown';

// Health status types
export type HealthStatus = 'good' | 'warning' | 'critical';

// Risk level types
export type RiskLevel = 'low' | 'medium' | 'high';

// Compliance status types
export type ComplianceStatus = 'compliant' | 'non-compliant' | 'pending' | 'unknown';

// Device type categories
export type DeviceType = 'desktop' | 'laptop' | 'server' | 'mobile' | 'tablet' | 'iot' | 'network';

// Operating system types
export type OperatingSystem = 'windows' | 'macos' | 'linux' | 'ios' | 'android' | 'unknown';

// Agent status types
export type AgentStatus = 'installed' | 'not-installed' | 'outdated' | 'error';

// Asset summary for overview widgets
export interface AssetSummary {
  totalAssets: number;
  managedAssets: number;
  unmanagedAssets: number;
  onlineAssets: number;
  offlineAssets: number;
  criticalAssets: number;
}

// Asset distribution for charts
export interface AssetDistribution {
  byDepartment: Record<string, number>;
  byBuilding: Record<string, number>;
  byOperatingSystem: Record<string, number>;
  byDeviceType: Record<string, number>;
  byManufacturer: Record<string, number>;
  withAgent: number;
  withoutAgent: number;
}

// Device entity
export interface Device {
  id: string;
  hostname: string;
  deviceName: string;
  department: string;
  assignedUser: string;
  building: string;
  operatingSystem: OperatingSystem;
  osVersion: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  ipAddress: string;
  macAddress: string;
  agentVersion: string;
  connectionStatus: DeviceStatus;
  healthStatus: HealthStatus;
  riskScore: RiskLevel;
  compliance: ComplianceStatus;
  lastSeen: string;
  enrollmentDate: string;
  agentStatus: AgentStatus;
}

// Device filter options
export interface DeviceFilters {
  search: string;
  operatingSystem: OperatingSystem | 'all';
  department: string;
  building: string;
  manufacturer: string;
  deviceType: DeviceType | 'all';
  status: DeviceStatus | 'all';
  risk: RiskLevel | 'all';
  agentInstalled: 'all' | 'installed' | 'not-installed';
}

// Device sort options
export type DeviceSortField = 'hostname' | 'status' | 'health' | 'risk' | 'lastSeen' | 'enrollmentDate';
export type DeviceSortOrder = 'asc' | 'desc';

// Device query parameters
export interface DeviceQueryParams {
  filters: DeviceFilters;
  sort: {
    field: DeviceSortField;
    order: DeviceSortOrder;
  };
  pagination: {
    page: number;
    pageSize: number;
  };
}

// Device list response
export interface DeviceListResponse {
  devices: Device[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Device details tab types
export type DeviceDetailTab = 
  | 'overview'
  | 'hardware'
  | 'operating-system'
  | 'network'
  | 'installed-software'
  | 'users'
  | 'processes'
  | 'services'
  | 'monitoring'
  | 'security'
  | 'alerts'
  | 'evidence'
  | 'commands'
  | 'timeline'
  | 'location';

// Device action types (UI only)
export type DeviceAction = 
  | 'open-details'
  | 'view-monitoring'
  | 'view-alerts'
  | 'view-evidence'
  | 'open-timeline'
  | 'locate-device'
  | 'open-commands'
  | 'deploy-software'
  | 'restart-device'
  | 'shutdown-device'
  | 'lock-device'
  | 'remote-support';

// Device action definition
export interface DeviceActionDefinition {
  id: DeviceAction;
  label: string;
  icon: string;
  requiresConfirmation?: boolean;
}