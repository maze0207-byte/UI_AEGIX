import React from 'react';
import { cn } from '~/shared/utils/cn';

interface DetailSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const DetailSection: React.FC<DetailSectionProps> = ({ title, children, className }) => {
  return (
    <div className={cn('rounded-sm border border-neutral-800 bg-neutral-900', className)}>
      <h3 className="border-b border-neutral-800 px-4 py-3 text-base font-semibold text-neutral-200">{title}</h3>
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 p-4 md:grid-cols-2 lg:grid-cols-3">{children}</div>
    </div>
  );
};