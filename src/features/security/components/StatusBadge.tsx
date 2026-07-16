import React from 'react';
import { CheckCircle, Clock, XCircle, PauseCircle, FileText } from 'lucide-react';
import type { AlertStatus, IncidentStatus, EvidenceStatus } from '../types/security';

interface StatusBadgeProps {
  status: AlertStatus | IncidentStatus | EvidenceStatus;
}

const alertStatusConfig: Record<AlertStatus, { color: string; icon: typeof CheckCircle; label: string }> = {
  open: {
    color: 'bg-danger-500/10 text-danger-500 border-danger-500/20',
    icon: XCircle,
    label: 'Open',
  },
  acknowledged: {
    color: 'bg-warning-500/10 text-warning-500 border-warning-500/20',
    icon: Clock,
    label: 'Acknowledged',
  },
  resolved: {
    color: 'bg-primary-500/10 text-primary-500 border-primary-500/20',
    icon: CheckCircle,
    label: 'Resolved',
  },
  dismissed: {
    color: 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20',
    icon: PauseCircle,
    label: 'Dismissed',
  },
};

const incidentStatusConfig: Record<IncidentStatus, { color: string; icon: typeof CheckCircle; label: string }> = {
  open: {
    color: 'bg-danger-500/10 text-danger-500 border-danger-500/20',
    icon: XCircle,
    label: 'Open',
  },
  investigating: {
    color: 'bg-warning-500/10 text-warning-500 border-warning-500/20',
    icon: Clock,
    label: 'Investigating',
  },
  contained: {
    color: 'bg-primary-500/10 text-primary-500 border-primary-500/20',
    icon: CheckCircle,
    label: 'Contained',
  },
  resolved: {
    color: 'bg-primary-500/10 text-primary-500 border-primary-500/20',
    icon: CheckCircle,
    label: 'Resolved',
  },
  closed: {
    color: 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20',
    icon: PauseCircle,
    label: 'Closed',
  },
};

const evidenceStatusConfig: Record<EvidenceStatus, { color: string; icon: typeof CheckCircle; label: string }> = {
  collected: {
    color: 'bg-primary-500/10 text-primary-500 border-primary-500/20',
    icon: FileText,
    label: 'Collected',
  },
  analyzed: {
    color: 'bg-warning-500/10 text-warning-500 border-warning-500/20',
    icon: Clock,
    label: 'Analyzed',
  },
  preserved: {
    color: 'bg-primary-500/10 text-primary-500 border-primary-500/20',
    icon: CheckCircle,
    label: 'Preserved',
  },
  archived: {
    color: 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20',
    icon: PauseCircle,
    label: 'Archived',
  },
};

// Check if it's an alert status or incident status
const isAlertStatus = (s: string): s is AlertStatus =>
  ['open', 'acknowledged', 'resolved', 'dismissed'].includes(s);

const isIncidentStatus = (s: string): s is IncidentStatus =>
  ['open', 'investigating', 'contained', 'resolved', 'closed'].includes(s);

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = isAlertStatus(status)
    ? alertStatusConfig[status]
    : isIncidentStatus(status)
      ? incidentStatusConfig[status]
      : evidenceStatusConfig[status as EvidenceStatus];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 text-xs font-medium ${config.color}`}>
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
};