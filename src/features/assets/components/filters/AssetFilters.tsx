import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import type { DeviceFilters } from '../../types/asset';

export interface AssetFiltersProps {
  filters: DeviceFilters;
  onFiltersChange: (filters: DeviceFilters) => void;
  onApply: () => void;
  onReset: () => void;
}

export const AssetFiltersPanel: React.FC<AssetFiltersProps> = ({
  filters,
  onFiltersChange,
  onApply,
  onReset,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (key: keyof DeviceFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="rounded-sm border border-neutral-800 bg-neutral-900">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-neutral-200"
      >
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Advanced Filters
        </div>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      {isOpen && (
        <div className="border-t border-neutral-800 p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Operating System Filter */}
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">Operating System</label>
              <select
                value={filters.operatingSystem}
                onChange={(e) => handleChange('operatingSystem', e.target.value)}
                className="w-full rounded-sm border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-200"
              >
                <option value="all">All OS</option>
                <option value="windows">Windows</option>
                <option value="macos">macOS</option>
                <option value="linux">Linux</option>
                <option value="ios">iOS</option>
                <option value="android">Android</option>
              </select>
            </div>

            {/* Department Filter */}
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">Department</label>
              <select
                value={filters.department}
                onChange={(e) => handleChange('department', e.target.value)}
                className="w-full rounded-sm border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-200"
              >
                <option value="">All Departments</option>
                <option value="engineering">Engineering</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Sales</option>
                <option value="operations">Operations</option>
                <option value="hr">HR</option>
                <option value="finance">Finance</option>
              </select>
            </div>

            {/* Building Filter */}
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">Building</label>
              <select
                value={filters.building}
                onChange={(e) => handleChange('building', e.target.value)}
                className="w-full rounded-sm border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-200"
              >
                <option value="">All Buildings</option>
                <option value="hq-nyc">HQ - NYC</option>
                <option value="hq-la">HQ - LA</option>
                <option value="branch-chicago">Branch - Chicago</option>
                <option value="branch-dallas">Branch - Dallas</option>
                <option value="datacenter-1">Data Center 1</option>
              </select>
            </div>

            {/* Manufacturer Filter */}
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">Manufacturer</label>
              <select
                value={filters.manufacturer}
                onChange={(e) => handleChange('manufacturer', e.target.value)}
                className="w-full rounded-sm border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-200"
              >
                <option value="">All Manufacturers</option>
                <option value="dell">Dell</option>
                <option value="hp">HP</option>
                <option value="lenovo">Lenovo</option>
                <option value="apple">Apple</option>
                <option value="microsoft">Microsoft</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Device Type Filter */}
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">Device Type</label>
              <select
                value={filters.deviceType}
                onChange={(e) => handleChange('deviceType', e.target.value)}
                className="w-full rounded-sm border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-200"
              >
                <option value="all">All Types</option>
                <option value="desktop">Desktop</option>
                <option value="laptop">Laptop</option>
                <option value="server">Server</option>
                <option value="mobile">Mobile</option>
                <option value="tablet">Tablet</option>
                <option value="iot">IoT</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full rounded-sm border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-200"
              >
                <option value="all">All Statuses</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>

            {/* Risk Filter */}
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">Risk Level</label>
              <select
                value={filters.risk}
                onChange={(e) => handleChange('risk', e.target.value)}
                className="w-full rounded-sm border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-200"
              >
                <option value="all">All Risk Levels</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Agent Installed Filter */}
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">Agent Status</label>
              <select
                value={filters.agentInstalled}
                onChange={(e) => handleChange('agentInstalled', e.target.value)}
                className="w-full rounded-sm border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-200"
              >
                <option value="all">All Agents</option>
                <option value="installed">Installed</option>
                <option value="not-installed">Not Installed</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-2">
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 rounded-sm border border-neutral-700 bg-neutral-950 px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800"
            >
              <X className="h-3.5 w-3.5" />
              Reset
            </button>
            <button
              onClick={onApply}
              className="flex items-center gap-1.5 rounded-sm bg-primary-500/20 px-3 py-1.5 text-xs font-medium text-primary-400 hover:bg-primary-500/30"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
