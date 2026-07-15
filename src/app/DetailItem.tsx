import React from 'react';

interface DetailItemProps {
  label: string;
  children: React.ReactNode;
}

export const DetailItem: React.FC<DetailItemProps> = ({ label, children }) => {
  return (
    <div>
      <p className="text-xs font-medium text-neutral-500">{label}</p>
      <div className="mt-1 text-sm text-neutral-200">{children}</div>
    </div>
  );
};