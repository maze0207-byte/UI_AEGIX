import React from 'react';
import { cn } from '@/shared/utils/cn';

interface StatCardProps {
  title: string;
  value: string | number | React.ReactNode;
  icon?: React.ReactNode;
  description?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  description,
  onClick,
  className,
}) => {
  const isClickable = !!onClick;

  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-sm border border-neutral-800 bg-neutral-900 p-4 transition-colors',
        isClickable && 'cursor-pointer hover:bg-neutral-800/50',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-neutral-400">{title}</p>
        {icon}
      </div>
      <p className="mt-1 text-2xl font-semibold text-neutral-100">{value}</p>
      {description && <div className="mt-2 text-xs text-neutral-500">{description}</div>}
    </div>
  );
};