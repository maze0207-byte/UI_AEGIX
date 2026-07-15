import React, { ReactNode } from 'react';

interface DashboardNavigationProps {
  children?: ReactNode;
}

export const DashboardNavigation: React.FC<DashboardNavigationProps> = ({ children }) => {
  return (
    <nav className="mb-6 flex gap-4 overflow-x-auto border-b border-neutral-800 pb-2 text-sm text-neutral-400">
      {children || (
        <div className="flex gap-4 min-w-max">
          <div className="border-b-2 border-neutral-500 pb-2 px-1 text-neutral-100 font-medium">
            [Navigation Structure]
          </div>
          <div className="border-b-2 border-transparent pb-2 px-1 hover:text-neutral-200 cursor-pointer">
            [Tab Placeholder]
          </div>
          <div className="border-b-2 border-transparent pb-2 px-1 hover:text-neutral-200 cursor-pointer">
            [Tab Placeholder]
          </div>
        </div>
      )}
    </nav>
  );
};
