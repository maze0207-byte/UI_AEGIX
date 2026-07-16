import React from 'react';
import { Shield, ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';
import type { SecurityScoreLevel } from '../types/security';

interface SecurityScoreCardProps {
  score: number;
  level: SecurityScoreLevel;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
  onClick?: () => void;
}

const scoreConfig: Record<SecurityScoreLevel, { color: string; icon: typeof Shield; label: string }> = {
  excellent: {
    color: 'text-primary-500',
    icon: ShieldCheck,
    label: 'Excellent',
  },
  good: {
    color: 'text-primary-400',
    icon: ShieldCheck,
    label: 'Good',
  },
  fair: {
    color: 'text-warning-500',
    icon: Shield,
    label: 'Fair',
  },
  poor: {
    color: 'text-danger-400',
    icon: AlertTriangle,
    label: 'Poor',
  },
  critical: {
    color: 'text-danger-500',
    icon: ShieldAlert,
    label: 'Critical',
  },
};

const trendConfig = {
  up: { color: 'text-primary-500', label: 'Improving' },
  down: { color: 'text-danger-500', label: 'Declining' },
  stable: { color: 'text-neutral-400', label: 'Stable' },
};

export const SecurityScoreCard: React.FC<SecurityScoreCardProps> = ({
  score,
  level,
  trend,
  lastUpdated,
  onClick,
}) => {
  const config = scoreConfig[level];
  const Icon = config.icon;
  const trendInfo = trendConfig[trend];

  return (
    <div
      onClick={onClick}
      className={`rounded-sm border border-neutral-800 bg-neutral-900 p-4 ${
        onClick ? 'cursor-pointer hover:bg-neutral-800/50' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 ${config.color}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-400">Security Score</p>
            <p className="text-2xl font-semibold text-neutral-100">{score}</p>
          </div>
        </div>
        <div className="text-right">
          <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
          <p className={`text-xs ${trendInfo.color}`}>{trendInfo.label}</p>
        </div>
      </div>
      <p className="mt-2 text-xs text-neutral-500">Last updated: {lastUpdated}</p>
    </div>
  );
};