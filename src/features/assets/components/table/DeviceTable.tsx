import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal, RefreshCw, Download, Columns } from 'lucide-react';
import { StatusBadge, HealthBadge, RiskBadge, ComplianceBadge, TagBadge } from '../badges/AssetBadges';
import type { Device, DeviceSortField, DeviceSortOrder } from '../../types/asset';

export interface DeviceTableProps {
  devices: Device[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSortChange: (field: DeviceSortField, order: DeviceSortOrder) => void;
  onRefresh: () => void;
  onExport: () => void;
  onColumnVisibilityChange?: (columns: string[]) => void;
}

// All available columns
const ALL_COLUMNS = [
  'hostname',
  'deviceName',
  'department',
  'assignedUser',
  'building',
  'operatingSystem',
  'osVersion',
  'manufacturer',
  'model',
  'serialNumber',
  'ipAddress',
  'macAddress',
  'agentVersion',
  'connectionStatus',
  'healthStatus',
  'riskScore',
  'compliance',
  'lastSeen',
  'enrollmentDate',
];

export const DeviceTable: React.FC<DeviceTableProps> = ({
  devices,
  total,
  page,
  pageSize,
  totalPages,
  onPageChange,
  onSortChange,
  onRefresh,
  onExport,
  onColumnVisibilityChange,
}) => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(ALL_COLUMNS);
  const [showColumnSelector, setShowColumnSelector] = useState(false);

  const handleColumnToggle = (column: string) => {
    const newColumns = visibleColumns.includes(column)
      ? visibleColumns.filter((c) => c !== column)
      : [...visibleColumns, column];
    setVisibleColumns(newColumns);
    onColumnVisibilityChange?.(newColumns);
  };

  const SortableHeader: React.FC<{ field: DeviceSortField; label: string }> = ({ field, label }) => (
    <button
      onClick={() => onSortChange(field, 'asc')}
      className="flex items-center gap-1 text-left text-xs font-medium text-neutral-400 hover:text-neutral-200"
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col">
      {/* Table Header with Actions */}
      <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900/50 px-4 py-3">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-neutral-200">Devices</h3>
          <span className="text-xs text-neutral-500">{total} total</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            className="flex items-center gap-2 rounded-sm border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </button>
          <button
            onClick={onExport}
            className="flex items-center gap-2 rounded-sm border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800"
          >
            <Download className="h-3.5 w-3.5" />
            Export
          </button>
          <div className="relative">
            <button
              onClick={() => setShowColumnSelector(!showColumnSelector)}
              className="flex items-center gap-2 rounded-sm border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800"
            >
              <Columns className="h-3.5 w-3.5" />
              Columns
            </button>
            {showColumnSelector && (
              <div className="absolute right-0 mt-1 w-56 rounded-sm border border-neutral-700 bg-neutral-900 p-2 shadow-lg">
                <p className="mb-2 text-xs font-medium text-neutral-400">Toggle columns</p>
                <div className="max-h-64 overflow-y-auto">
                  {ALL_COLUMNS.map((column) => (
                    <label key={column} className="flex items-center gap-2 py-1 text-xs text-neutral-300">
                      <input
                        type="checkbox"
                        checked={visibleColumns.includes(column)}
                        onChange={() => handleColumnToggle(column)}
                        className="rounded border-neutral-600 bg-neutral-800"
                      />
                      {column.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-neutral-800/50">
              <th className="w-10 px-4 py-2">
                <input type="checkbox" className="rounded border-neutral-600 bg-neutral-800" />
              </th>
              {visibleColumns.includes('hostname') && (
                <th className="px-4 py-2 text-left">
                  <SortableHeader field="hostname" label="Hostname" />
                </th>
              )}
              {visibleColumns.includes('deviceName') && (
                <th className="px-4 py-2 text-left">
                  <SortableHeader field="hostname" label="Device Name" />
                </th>
              )}
              {visibleColumns.includes('department') && (
                <th className="px-4 py-2 text-left">
                  <SortableHeader field="hostname" label="Department" />
                </th>
              )}
              {visibleColumns.includes('assignedUser') && (
                <th className="px-4 py-2 text-left">
                  <SortableHeader field="hostname" label="Assigned User" />
                </th>
              )}
              {visibleColumns.includes('building') && (
                <th className="px-4 py-2 text-left">
                  <SortableHeader field="hostname" label="Building" />
                </th>
              )}
              {visibleColumns.includes('operatingSystem') && (
                <th className="px-4 py-2 text-left">
                  <SortableHeader field="hostname" label="OS" />
                </th>
              )}
              {visibleColumns.includes('connectionStatus') && (
                <th className="px-4 py-2 text-left">
                  <SortableHeader field="status" label="Status" />
                </th>
              )}
              {visibleColumns.includes('healthStatus') && (
                <th className="px-4 py-2 text-left">
                  <SortableHeader field="health" label="Health" />
                </th>
              )}
              {visibleColumns.includes('riskScore') && (
                <th className="px-4 py-2 text-left">
                  <SortableHeader field="risk" label="Risk" />
                </th>
              )}
              {visibleColumns.includes('compliance') && (
                <th className="px-4 py-2 text-left">
                  <SortableHeader field="hostname" label="Compliance" />
                </th>
              )}
              {visibleColumns.includes('lastSeen') && (
                <th className="px-4 py-2 text-left">
                  <SortableHeader field="lastSeen" label="Last Seen" />
                </th>
              )}
              <th className="w-10 px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => (
              <tr
                key={device.id}
                className="border-b border-neutral-800/30 hover:bg-neutral-800/30 transition-colors"
              >
                <td className="px-4 py-3">
                  <input type="checkbox" className="rounded border-neutral-600 bg-neutral-800" />
                </td>
                {visibleColumns.includes('hostname') && (
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-neutral-100">{device.hostname}</p>
                      <p className="text-xs text-neutral-500">{device.id}</p>
                    </div>
                  </td>
                )}
                {visibleColumns.includes('deviceName') && (
                  <td className="px-4 py-3 text-sm text-neutral-300">{device.deviceName}</td>
                )}
                {visibleColumns.includes('department') && (
                  <td className="px-4 py-3">
                    <TagBadge label="Dept" value={device.department} />
                  </td>
                )}
                {visibleColumns.includes('assignedUser') && (
                  <td className="px-4 py-3 text-sm text-neutral-300">{device.assignedUser}</td>
                )}
                {visibleColumns.includes('building') && (
                  <td className="px-4 py-3 text-sm text-neutral-300">{device.building}</td>
                )}
                {visibleColumns.includes('operatingSystem') && (
                  <td className="px-4 py-3">
                    <TagBadge label="OS" value={device.operatingSystem} />
                  </td>
                )}
                {visibleColumns.includes('connectionStatus') && (
                  <td className="px-4 py-3">
                    <StatusBadge status={device.connectionStatus} />
                  </td>
                )}
                {visibleColumns.includes('healthStatus') && (
                  <td className="px-4 py-3">
                    <HealthBadge health={device.healthStatus} />
                  </td>
                )}
                {visibleColumns.includes('riskScore') && (
                  <td className="px-4 py-3">
                    <RiskBadge risk={device.riskScore} />
                  </td>
                )}
                {visibleColumns.includes('compliance') && (
                  <td className="px-4 py-3">
                    <ComplianceBadge compliance={device.compliance} />
                  </td>
                )}
                {visibleColumns.includes('lastSeen') && (
                  <td className="px-4 py-3 text-xs text-neutral-500">{device.lastSeen}</td>
                )}
                <td className="px-4 py-3">
                  <button className="rounded-sm p-1 text-neutral-500 hover:bg-neutral-800 hover:text-neutral-200">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-neutral-800 bg-neutral-900/50 px-4 py-3">
        <div className="text-xs text-neutral-500">
          Showing <span className="font-medium text-neutral-200">{page}</span> to{' '}
          <span className="font-medium text-neutral-200">{pageSize}</span> of{' '}
          <span className="font-medium text-neutral-200">{total}</span> devices
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="rounded-sm border border-neutral-700 bg-neutral-900 p-1.5 text-neutral-400 hover:bg-neutral-800 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNumber = i + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                className={`rounded-sm px-3 py-1 text-xs font-medium ${
                  page === pageNumber
                    ? 'bg-primary-500/20 text-primary-400'
                    : 'text-neutral-400 hover:bg-neutral-800'
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
          {totalPages > 5 && <span className="px-2 text-neutral-600">...</span>}
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className="rounded-sm border border-neutral-700 bg-neutral-900 p-1.5 text-neutral-400 hover:bg-neutral-800 disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};