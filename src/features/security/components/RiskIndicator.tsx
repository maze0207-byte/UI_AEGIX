import React from 'react';
import { AlertTriangle, ShieldAlert, Shield, CheckCircle } from 'lucide-react';

type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

interface RiskIndicatorProps {
  level: RiskLevel;
  score?: number;
  size?: 'sm' | 'md' | 'lg';
}

const riskConfig: Record<RiskLevel, { color: string; bgColor: string; icon: typeof Shield; label: string }> = {
  low: {
    color: 'text-primary-500',
    bgColor: 'bg-primary-500/10',
    icon: CheckCircle,
    label: 'Low',
  },
  medium: {
    color: 'text-warning-500',
    bgColor: 'bg-warning-500/10',
    icon: Shield,
    label: 'Medium',
  },
  high: {
    color: 'text-danger-400',
    bgColor: 'bg-danger-400/10',
    icon: AlertTriangle,
    label: 'High',
  },
  critical: {
    color: 'text-danger-500',
    bgColor: 'bg-danger-500/10',
    icon: ShieldAlert,
    label: 'Critical',
  },
};

const sizeConfig = {
  sm: { iconSize: 'h-3 w-3', textSize: 'text-xs', container: 'px-1.5 py-0.5' },
  md: { iconSize: 'h-4 w-4', textSize: 'text-sm', container: 'px-2 py-1' },
  lg: { iconSize: 'h-5 w-5', textSize: 'text-base', container: 'px-3 py-1.5' },
};

export const RiskIndicator: React.FC<RiskIndicatorProps> = ({
  level,
  score,
  size = 'md',
}) => {
  const config = riskConfig[level];
  const Icon = config.icon;
  const sizes = sizeConfig[size];

  return (
    <div className={`inline-flex items-center gap-1 rounded-sm ${config.bgColor} ${sizes.container}`}>
      <Icon className={`${sizes.iconSize} ${config.color}`} />
      <span className={`font-medium ${config.color} ${sizes.textSize}`}>
        {score !== undefined ? `${score} - ${config.label}` : config.label}
      </span>
    </div>
  );
};