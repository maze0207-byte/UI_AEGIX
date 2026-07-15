import React, { ReactNode } from 'react';

interface DashboardContainerProps {
  children: ReactNode;
}

export const DashboardContainer: React.FC<DashboardContainerProps> = ({ children }) => {
  return (
    <div className="mx-auto w-full max-w-[1600px] px-2 sm:px-4 lg:px-8">
      {children}
    </div>
  );
};
