import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination: React.FC = () => {
  return (
    <div className="flex items-center justify-between border-t border-neutral-800 pt-4">
      <div className="text-sm text-neutral-500">
        Showing <span className="font-medium text-neutral-200">1</span> to <span className="font-medium text-neutral-200">10</span> of{' '}
        <span className="font-medium text-neutral-200">97</span> devices
      </div>
      <div className="flex items-center gap-2">
        <button className="rounded-sm border border-neutral-700 bg-neutral-900 p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200 disabled:opacity-50">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-1">
          <button className="rounded-sm bg-primary-500/20 px-3 py-1 text-sm font-medium text-primary-400">1</button>
          <button className="rounded-sm px-3 py-1 text-sm font-medium text-neutral-400 hover:bg-neutral-800">2</button>
          <button className="rounded-sm px-3 py-1 text-sm font-medium text-neutral-400 hover:bg-neutral-800">3</button>
          <span className="px-2 text-neutral-600">...</span>
          <button className="rounded-sm px-3 py-1 text-sm font-medium text-neutral-400 hover:bg-neutral-800">10</button>
        </div>
        <button className="rounded-sm border border-neutral-700 bg-neutral-900 p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200 disabled:opacity-50">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
