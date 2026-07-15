import React from 'react';
import { Activity, ShieldAlert, AlertTriangle, CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import type { DeviceStatus, HealthStatus, RiskLevel, ComplianceStatus, AgentStatus } from '../../types/asset';

/**
 * Status Badge - shows device connection status
 */
export const StatusBadge: React.FC<{ status: DeviceStatus }> = ({ status }) => {
  const config = {
    online: {
      color: 'bg-primary-500/10 text-primary-500 border-primary-500/20',
      label: 'Online',
    },
    offline: {
      color: 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20',
      label: 'Offline',
    },
    unknown: {
      color: 'bg-warning-500/10 text-warning-500 border-warning-500/20',
      label: 'Unknown',
    },
  };

  return (
    <span className={`inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-medium ${config[status].color}`}>
      {config[status].label}
    </span>
  );
};

/**
 * Health Badge - shows device health status
 */
export const HealthBadge: React.FC<{ health: HealthStatus }> = ({ health }) => {
  const config = {
    good: { color: 'text-primary-500', icon: Activity },
    warning: { color: 'text-warning-500', icon: AlertTriangle },
    critical: { color: 'text-danger-500', icon: ShieldAlert },
  };

  const Icon = config[health].icon;

  return (
    <div className={`flex items-center gap-1.5 ${config[health].color}`}>
      <Icon className="h-4 w-4" />
      <span className="text-xs font-medium capitalize">{health}</span>
    </div>
  );
};

/**
 * Risk Badge - shows device risk level
 */
export const RiskBadge: React.FC<{ risk: RiskLevel }> = ({ risk }) => {
  const colors = {
    low: 'bg-primary-500 text-white',
    medium: 'bg-warning-500 text-white',
    high: 'bg-danger-500 text-white',
  };

  return (
    <span className={`inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium capitalize ${colors[risk]}`}>
      Risk: {risk}
    </span>
  );
};

/**
 * Compliance Badge - shows device compliance status
 */
export const ComplianceBadge: React.FC<{ compliance: ComplianceStatus }> = ({ compliance }) => {
  const config = {
    compliant: {
      color: 'bg-primary-500/10 text-primary-500 border-primary-500/20',
      icon: CheckCircle,
    },
    'non-compliant': {
      color: 'bg-danger-500/10 text-danger-500 border-danger-500/20',
      icon: XCircle,
    },
    pending: {
      color: 'bg-warning-500/10 text-warning-500 border-warning-500/20',
      icon: AlertTriangle,
    },
    unknown: {
      color: 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20',
      icon: HelpCircle,
    },
  };

  const Icon = config[compliance].icon;

  return (
    <span className={`inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 text-xs font-medium ${config[compliance].color}`}>
      <Icon className="h-3 w-3" />
      {compliance === 'non-compliant' ? 'Non-compliant' : compliance}
    </span>
  );
};

/**
 * Agent Status Badge - shows agent installation status
 */
export const AgentStatusBadge: React.FC<{ status: AgentStatus }> = ({ status }) => {
  const config = {
    installed: {
      color: 'bg-primary-500/10 text-primary-500 border-primary-500/20',
      label: 'Installed',
    },
    'not-installed': {
      color: 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20',
      label: 'Not Installed',
    },
    outdated: {
      color: 'bg-warning-500/10 text-warning-500 border-warning-500/20',
      label: 'Outdated',
    },
    error: {
      color: 'bg-danger-500/10 text-danger-500 border-danger-500/20',
      label: 'Error',
    },
  };

  return (
    <span className={`inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-medium ${config[status].color}`}>
      {config[status].label}
    </span>
  );
};

/**
 * Tag Badge - generic label/value badge
 */
export const TagBadge: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <span className="inline-flex items-center gap-1 rounded-sm bg-neutral-800 px-2 py-1 text-xs text-neutral-300">
    <span className="text-neutral-500">{label}:</span> {value}
  </span>
);

/**
 * Device Type Badge
 */
export const DeviceTypeBadge: React.FC<{ type: string }> = ({ type }) => {
  return (
    <span className="inline-flex items-center rounded-sm bg-neutral-800 px-2 py-1 text-xs text-neutral-300 capitalize">
      {type}
    </span>
  );
};