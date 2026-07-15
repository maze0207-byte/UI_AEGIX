import React from 'react';
import { Activity, ShieldAlert, AlertTriangle } from 'lucide-react';

export const StatusBadge: React.FC<{ status: 'online' | 'offline' | 'unknown' }> = ({ status }) => {
  const colors = {
    online: 'bg-primary-500/10 text-primary-500 border-primary-500/20',
    offline: 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20',
    unknown: 'bg-warning-500/10 text-warning-500 border-warning-500/20',
  };
  return (
    <span className={`inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-medium capitalize ${colors[status]}`}>
      {status}
    </span>
  );
};

export const HealthBadge: React.FC<{ health: 'good' | 'warning' | 'critical' }> = ({ health }) => {
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

export const RiskBadge: React.FC<{ risk: 'low' | 'medium' | 'high' }> = ({ risk }) => {
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

export const TagBadge: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <span className="inline-flex items-center gap-1 rounded-sm bg-neutral-800 px-2 py-1 text-xs text-neutral-300">
    <span className="text-neutral-500">{label}:</span> {value}
  </span>
);
