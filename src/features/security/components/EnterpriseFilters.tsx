import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import type { SecurityFilters } from '../types/security';

interface EnterpriseFiltersProps {
  filters: SecurityFilters;
  onFiltersChange: (filters: SecurityFilters) => void;
  onApply: () => void;
  onReset: () => void;
}

export const EnterpriseFiltersPanel: React.FC<EnterpriseFiltersProps> = ({
  filters,
  onFiltersChange,
  onApply,
  onReset,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (key: keyof SecurityFilters, value: string) => {
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

            {/* Severity Filter */}
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">Severity</label>
              <select
                value={filters.severity}
                onChange={(e) => handleChange('severity', e.target.value)}
                className="w-full rounded-sm border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-200"
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
                <option value="info">Info</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">Priority</label>
              <select
                value={filters.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
                className="w-full rounded-sm border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-200"
              >
                <option value="all">All Priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
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
                <option value="open">Open</option>
                <option value="acknowledged">Acknowledged</option>
                <option value="resolved">Resolved</option>
                <option value="dismissed">Dismissed</option>
              </select>
            </div>

            {/* Operating System Filter */}
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">Operating System</label>
              <select
                value={filters.operatingSystem}
                onChange={(e) => handleChange('operatingSystem', e.target.value)}
                className="w-full rounded-sm border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-200"
              >
                <option value="">All OS</option>
                <option value="windows">Windows</option>
                <option value="macos">macOS</option>
                <option value="linux">Linux</option>
                <option value="ios">iOS</option>
                <option value="android">Android</option>
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
                <option value="">All Risk Levels</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            {/* Date From Filter */}
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">Date From</label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => handleChange('dateFrom', e.target.value)}
                className="w-full rounded-sm border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-200"
              />
            </div>

            {/* Date To Filter */}
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">Date To</label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => handleChange('dateTo', e.target.value)}
                className="w-full rounded-sm border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-200"
              />
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