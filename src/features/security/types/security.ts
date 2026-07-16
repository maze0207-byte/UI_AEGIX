/**
 * AEGIX Security Types
 * Type definitions for the Security Operations Center (SOC) Workspace
 */

// Security score level
export type SecurityScoreLevel = 'excellent' | 'good' | 'fair' | 'poor' | 'critical';

// Alert severity
export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info';

// Alert status
export type AlertStatus = 'open' | 'acknowledged' | 'resolved' | 'dismissed';

// Incident status
export type IncidentStatus = 'open' | 'investigating' | 'contained' | 'resolved' | 'closed';

// Incident priority
export type IncidentPriority = 'critical' | 'high' | 'medium' | 'low';

// Threat level
export type ThreatLevel = 'critical' | 'high' | 'medium' | 'low' | 'unknown';

// Evidence type
export type EvidenceType = 'file' | 'process' | 'network' | 'registry' | 'log' | 'memory';

// Evidence status
export type EvidenceStatus = 'collected' | 'analyzed' | 'preserved' | 'archived';

// Security score data
export interface SecurityScore {
  overall: number;
  level: SecurityScoreLevel;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

// Enterprise risk data
export interface EnterpriseRisk {
  score: number;
  level: 'low' | 'medium' | 'high' | 'critical';
  change: number;
  trend: 'up' | 'down' | 'stable';
}

// Security alert
export interface SecurityAlert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  status: AlertStatus;
  deviceId: string;
  deviceName: string;
  timestamp: string;
  source: string;
  ruleId: string;
  ruleName: string;
}

// Security incident
export interface SecurityIncident {
  id: string;
  title: string;
  description: string;
  status: IncidentStatus;
  priority: IncidentPriority;
  severity: AlertSeverity;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
  deviceIds: string[];
  alertIds: string[];
}

// Threat intelligence
export interface ThreatIntelligence {
  id: string;
  indicator: string;
  type: 'ip' | 'domain' | 'hash' | 'url' | 'email';
  threatLevel: ThreatLevel;
  confidence: number;
  source: string;
  description: string;
  firstSeen: string;
  lastSeen: string;
  tags: string[];
}

// Evidence item
export interface Evidence {
  id: string;
  type: EvidenceType;
  deviceId: string;
  deviceName: string;
  status: EvidenceStatus;
  collectedAt: string;
  size: number;
  hash: string;
  path: string;
  description: string;
}

// Security timeline event
export interface SecurityTimelineEvent {
  id: string;
  timestamp: string;
  type: 'alert' | 'incident' | 'threat' | 'evidence' | 'action';
  title: string;
  description: string;
  severity?: AlertSeverity;
  relatedId?: string;
}

// Security filters
export interface SecurityFilters {
  search: string;
  department: string;
  building: string;
  severity: AlertSeverity | 'all';
  priority: IncidentPriority | 'all';
  status: AlertStatus | 'all';
  operatingSystem: string;
  dateFrom: string;
  dateTo: string;
  risk: string;
}

// Security overview data
export interface SecurityOverview {
  securityScore: SecurityScore;
  enterpriseRisk: EnterpriseRisk;
  openIncidents: number;
  criticalAlerts: number;
  warningAlerts: number;
  devicesAtRisk: number;
}

// Top risk device
export interface TopRiskDevice {
  id: string;
  hostname: string;
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  department: string;
  building: string;
  lastSeen: string;
}

// Department risk
export interface DepartmentRisk {
  department: string;
  riskScore: number;
  incidentCount: number;
  alertCount: number;
}

// Building risk
export interface BuildingRisk {
  building: string;
  riskScore: number;
  incidentCount: number;
  alertCount: number;
}

// Security trends data
export interface SecurityTrends {
  timestamp: string;
  alerts: number;
  incidents: number;
  threats: number;
}

// Security list response
export interface SecurityListResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}