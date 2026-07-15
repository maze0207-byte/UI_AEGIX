import React from 'react';
import { Search, Filter, LayoutGrid, List } from 'lucide-react';

export interface DevicesToolbarProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export const DevicesToolbar: React.FC<DevicesToolbarProps> = ({ viewMode, onViewModeChange }) => {
  return (
    <div className="flex flex-col gap-4 border-b border-neutral-800 pb-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-3 md:max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Search devices..."
            className="w-full rounded-sm border border-neutral-700 bg-neutral-900 py-2 pl-9 pr-4 text-sm text-neutral-100 placeholder-neutral-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
        <button className="flex items-center gap-2 rounded-sm border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800">
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Advanced Filters</span>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <select className="rounded-sm border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-300 focus:outline-none focus:ring-1 focus:ring-primary-500">
          <option value="name">Sort by: Name</option>
          <option value="status">Sort by: Status</option>
          <option value="health">Sort by: Health</option>
          <option value="risk">Sort by: Risk</option>
        </select>

        <div className="flex items-center rounded-sm border border-neutral-700 bg-neutral-900 p-1">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`rounded p-1.5 ${viewMode === 'grid' ? 'bg-neutral-800 text-neutral-100' : 'text-neutral-500 hover:text-neutral-300'}`}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`rounded p-1.5 ${viewMode === 'list' ? 'bg-neutral-800 text-neutral-100' : 'text-neutral-500 hover:text-neutral-300'}`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
