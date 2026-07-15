import React, { useState } from 'react';
import { Widget } from '../../dashboard/components/widgets/Widget';
import { DeviceCard } from '../components/views/DeviceCard';
import { DeviceListItem } from '../components/views/DeviceListItem';
import { DevicesToolbar } from '../components/toolbar/DevicesToolbar';
import { Pagination } from '../components/toolbar/Pagination';

const DeviceGridSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="rounded-md border border-neutral-800 bg-neutral-900 p-4">
        <div className="flex items-start justify-between border-b border-neutral-800/50 pb-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded bg-neutral-800 animate-pulse"></div>
            <div className="flex flex-col gap-1">
              <div className="h-4 w-24 rounded bg-neutral-800 animate-pulse"></div>
              <div className="h-3 w-16 rounded bg-neutral-800 animate-pulse"></div>
            </div>
          </div>
          <div className="h-5 w-14 rounded bg-neutral-800 animate-pulse"></div>
        </div>
        <div className="mt-3 flex flex-col gap-3">
          <div className="flex justify-between">
            <div className="h-4 w-16 rounded bg-neutral-800 animate-pulse"></div>
            <div className="h-5 w-12 rounded bg-neutral-800 animate-pulse"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-5 w-16 rounded bg-neutral-800 animate-pulse"></div>
            <div className="h-5 w-16 rounded bg-neutral-800 animate-pulse"></div>
          </div>
          <div className="h-3 w-32 rounded bg-neutral-800 animate-pulse"></div>
        </div>
      </div>
    ))}
  </div>
);

const DeviceListSkeleton: React.FC = () => (
  <div className="flex flex-col">
    {Array.from({ length: 10 }).map((_, i) => (
      <div key={i} className="flex items-center justify-between border-b border-neutral-800/50 bg-neutral-900 p-4 last:border-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-neutral-800 animate-pulse"></div>
            <div className="flex flex-col gap-1">
              <div className="h-4 w-24 rounded bg-neutral-800 animate-pulse"></div>
              <div className="h-3 w-16 rounded bg-neutral-800 animate-pulse"></div>
            </div>
          </div>
          <div className="hidden h-5 w-14 rounded bg-neutral-800 animate-pulse md:block"></div>
          <div className="hidden h-4 w-12 rounded bg-neutral-800 animate-pulse md:block"></div>
          <div className="hidden h-5 w-12 rounded bg-neutral-800 animate-pulse md:block"></div>
        </div>
        <div className="h-3 w-24 rounded bg-neutral-800 animate-pulse xl:hidden"></div>
      </div>
    ))}
  </div>
);

export const DevicesPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, _setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isEmpty, _setIsEmpty] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-100">Devices</h1>
        <p className="text-sm text-neutral-400">Manage and monitor your enterprise assets</p>
      </div>

      <DevicesToolbar viewMode={viewMode} onViewModeChange={setViewMode} />

      <Widget
        title="Devices"
        description="All registered devices in your fleet"
        isLoading={isLoading}
        isEmpty={isEmpty}
        isError={isError}
        onRetry={() => setIsError(false)}
        contentClassName="p-0"
      >
        {isLoading ? (
          viewMode === 'grid' ? <DeviceGridSkeleton /> : <DeviceListSkeleton />
        ) : (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <DeviceCard key={i} id={`device-${i + 1}`} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
              {Array.from({ length: 10 }).map((_, i) => (
                <DeviceListItem key={i} id={`device-${i + 1}`} />
              ))}
            </div>
          )
        )}
      </Widget>

      <Pagination />
    </div>
  );
};