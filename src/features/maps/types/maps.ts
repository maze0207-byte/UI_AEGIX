/**
 * AEGIX Maps Types
 * Types for Maps & Asset Tracking Workspace
 */

// Device location
export interface DeviceLocation {
  deviceId: string;
  hostname: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  lastUpdate: string;
  status: 'online' | 'offline' | 'unknown';
  building?: string;
  floor?: string;
  room?: string;
  lab?: string;
}

// Building
export interface Building {
  id: string;
  name: string;
  address: string;
  floors: number;
  departments: string[];
  totalDevices: number;
  onlineDevices: number;
  offlineDevices: number;
}

// Lab
export interface Lab {
  id: string;
  name: string;
  department: string;
  building: string;
  room: string;
  capacity: number;
  assignedDevices: number;
  currentStatus: 'operational' | 'maintenance' | 'offline';
  responsibleUser?: string;
}

// Geofence
export interface Geofence {
  id: string;
  name: string;
  type: 'building' | 'lab' | 'custom';
  coordinates: [number, number][];
  assignedDevices: string[];
  policies: string[];
  entryEvents: number;
  exitEvents: number;
  violationHistory: GeofenceViolation[];
}

// Geofence violation
export interface GeofenceViolation {
  id: string;
  deviceId: string;
  deviceName: string;
  timestamp: string;
  action: 'entry' | 'exit';
  policy: string;
}

// Location history
export interface LocationHistory {
  id: string;
  deviceId: string;
  deviceName: string;
  locations: LocationPoint[];
}

// Location point
export interface LocationPoint {
  timestamp: string;
  latitude: number;
  longitude: number;
  building?: string;
  floor?: string;
  room?: string;
}

// Map filters
export interface MapFilters {
  search: string;
  department: string;
  building: string;
  lab: string;
  status: 'online' | 'offline' | 'unknown' | 'all';
  operatingSystem: string;
  deviceType: string;
  trackingStatus: 'active' | 'inactive' | 'all';
  riskScore: string;
}

// Map overview data
export interface MapOverview {
  totalDevices: number;
  onlineDevices: number;
  offlineDevices: number;
  devicesWithLocation: number;
  unknownLocation: number;
  buildingsSummary: BuildingSummary[];
  labsSummary: LabSummary[];
  departmentsSummary: DepartmentSummary[];
  recentLocationChanges: LocationChange[];
}

// Building summary
export interface BuildingSummary {
  building: string;
  deviceCount: number;
  onlineCount: number;
}

// Lab summary
export interface LabSummary {
  lab: string;
  deviceCount: number;
  status: string;
}

// Department summary
export interface DepartmentSummary {
  department: string;
  deviceCount: number;
  onlineCount: number;
}

// Location change
export interface LocationChange {
  deviceId: string;
  deviceName: string;
  fromLocation: string;
  toLocation: string;
  timestamp: string;
}