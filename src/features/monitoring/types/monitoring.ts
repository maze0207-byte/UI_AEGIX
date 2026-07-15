/**
 * AEGIX Monitoring Types
 * Type definitions for the Monitoring Workspace
 */

// Monitoring status types
export type MonitoringStatus = 'online' | 'offline' | 'warning' | 'critical' | 'unknown';

// Resource types
export type ResourceType = 'cpu' | 'memory' | 'disk' | 'network' | 'gpu' | 'temperature' | 'battery';

// Alert severity
export type AlertSeverity = 'critical' | 'warning' | 'info';

// Monitoring event types
export type MonitoringEventType = 
  | 'cpu_spike'
  | 'memory_spike'
  | 'disk_full'
  | 'offline'
  | 'recovered'
  | 'network_lost'
  | 'high_temperature'
  | 'service_stopped';

// Device monitoring data
export interface DeviceMonitoring {
  deviceId: string;
  hostname: string;
  status: MonitoringStatus;
  lastCheckin: string;
  agentVersion: string;
  uptime: string;
}

// CPU metrics
export interface CPUMetrics {
  usage: number;
  cores: number;
  temperature: number;
  topProcesses: ProcessInfo[];
}

// Memory metrics
export interface MemoryMetrics {
  total: number;
  used: number;
  available: number;
  usage: number;
  topConsumers: ProcessInfo[];
}

// Disk metrics
export interface DiskMetrics {
  total: number;
  used: number;
  available: number;
  usage: number;
  drives: DriveInfo[];
}

// Network metrics
export interface NetworkMetrics {
  ipAddress: string;
  macAddress: string;
  gateway: string;
  dns: string[];
  upload: number;
  download: number;
  latency: number;
  packetLoss: number;
}

// Process info
export interface ProcessInfo {
  id: string;
  name: string;
  cpu: number;
  memory: number;
  status: 'running' | 'stopped';
}

// Drive info
export interface DriveInfo {
  name: string;
  total: number;
  used: number;
  available: number;
  usage: number;
}

// Monitoring event
export interface MonitoringEvent {
  id: string;
  deviceId: string;
  type: MonitoringEventType;
  severity: AlertSeverity;
  timestamp: string;
  message: string;
}

// Monitoring alert
export interface MonitoringAlert {
  id: string;
  deviceId: string;
  deviceName: string;
  severity: AlertSeverity;
  type: string;
  message: string;
  timestamp: string;
}

// Monitoring filters
export interface MonitoringFilters {
  department: string;
  building: string;
  operatingSystem: string;
  status: MonitoringStatus | 'all';
  risk: string;
  health: string;
}

// Monitoring overview data
export interface MonitoringOverview {
  enterpriseHealthScore: number;
  infrastructureAvailability: number;
  agentConnectivity: number;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkUsage: number;
}

// Trend data
export interface TrendData {
  timestamp: string;
  value: number;
}