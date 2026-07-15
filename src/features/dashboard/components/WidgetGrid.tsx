import React, { ReactNode } from 'react';

interface WidgetGridProps {
  children: ReactNode;
}

export const WidgetGrid: React.FC<WidgetGridProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {children}
    </div>
  );
};
