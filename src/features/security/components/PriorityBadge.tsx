import React from 'react';
import { AlertCircle, ShieldAlert, Shield, AlertTriangle } from 'lucide-react';
import type { IncidentPriority } from '../types/security';

interface PriorityBadgeProps {
  priority: IncidentPriority;
}

const priorityConfig: Record<IncidentPriority, { color: string; icon: typeof Shield; label: string }> = {
  critical: {
    color: 'bg-danger-500/10 text-danger-500 border-danger-500/20',
    icon: ShieldAlert,
    label: 'Critical',
  },
  high: {
    color: 'bg-danger-400/10 text-danger-400 border-danger-400/20',
    icon: AlertCircle,
    label: 'High',
  },
  medium: {
    color: 'bg-warning-500/10 text-warning-500 border-warning-500/20',
    icon: AlertTriangle,
    label: 'Medium',
  },
  low: {
    color: 'bg-primary-500/10 text-primary-500 border-primary-500/20',
    icon: Shield,
    label: 'Low',
  },
};

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const config = priorityConfig[priority];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 text-xs font-medium ${config.color}`}>
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
};