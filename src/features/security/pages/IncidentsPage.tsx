import React, { useState } from 'react';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { SearchBar } from '../components/SearchBar';
import { EnterpriseFiltersPanel } from '../components/EnterpriseFilters';
import { EnterpriseTable, type Column } from '../components/EnterpriseTable';
import { PriorityBadge } from '../components/PriorityBadge';
import { StatusBadge } from '../components/StatusBadge';
import type { SecurityIncident, SecurityFilters } from '../types/security';

const mockIncidents: SecurityIncident[] = [
  {
    id: '1',
    title: 'Ransomware Activity',
    description: 'Potential ransomware encryption detected on endpoint',
    status: 'investigating',
    priority: 'critical',
    severity: 'critical',
    assignedTo: 'Analyst 1',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T11:30:00Z',
    deviceIds: ['dev-001'],
    alertIds: ['alert-001'],
  },
  {
    id: '2',
    title: 'Data Exfiltration',
    description: 'Large data transfer to external IP detected',
    status: 'open',
    priority: 'high',
    severity: 'high',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z',
    deviceIds: ['dev-002'],
    alertIds: ['alert-002'],
  },
  {
    id: '3',
    title: 'Phishing Campaign',
    description: 'Multiple users reported phishing emails',
    status: 'contained',
    priority: 'medium',
    severity: 'medium',
    assignedTo: 'Analyst 2',
    createdAt: '2024-01-14T14:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z',
    deviceIds: ['dev-003', 'dev-004'],
    alertIds: ['alert-003', 'alert-004'],
  },
];

const incidentColumns: Column<SecurityIncident>[] = [
  { id: 'title', header: 'Title', accessor: 'title', sortable: true },
{ id: 'priority', header: 'Priority', accessor: (item) => <PriorityBadge priority={item.priority} />, sortable: true },
  { id: 'status', header: 'Status', accessor: (item) => <StatusBadge status={item.status} />, sortable: true },
  { id: 'assignedTo', header: 'Assigned To', accessor: (item) => item.assignedTo ?? 'Unassigned', sortable: true },
  { id: 'createdAt', header: 'Created', accessor: 'createdAt', sortable: true },
  { id: 'deviceIds', header: 'Devices', accessor: (item) => `${item.deviceIds.length} device(s)`, sortable: true },
];

export const IncidentsPage: React.FC = () => {
  const [filters, setFilters] = useState<SecurityFilters>({
    search: '',
    department: '',
    building: '',
    severity: 'all',
    priority: 'all',
    status: 'all',
    operatingSystem: '',
    dateFrom: '',
    dateTo: '',
    risk: '',
  });

  const handleFiltersChange = (newFilters: SecurityFilters) => {
    setFilters(newFilters);
  };

  const handleApply = () => {
    // TODO: Apply filters
  };

  const handleReset = () => {
    setFilters({
      search: '',
      department: '',
      building: '',
      severity: 'all',
      priority: 'all',
      status: 'all',
      operatingSystem: '',
      dateFrom: '',
      dateTo: '',
      risk: '',
    });
  };

  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6 pb-8">
          {/* Search and Filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <SearchBar
              value={filters.search}
              onChange={(value) => handleFiltersChange({ ...filters, search: value })}
              placeholder="Search incidents..."
              className="w-full sm:w-64"
            />
          </div>

          {/* Filters Panel */}
          <EnterpriseFiltersPanel
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onApply={handleApply}
            onReset={handleReset}
          />

          {/* Incidents Table */}
          <SectionContainer title="Security Incidents" className="p-0">
            <EnterpriseTable
              data={mockIncidents}
              columns={incidentColumns}
              total={mockIncidents.length}
              page={1}
              pageSize={10}
              totalPages={1}
              onPageChange={() => {}}
              onRefresh={() => {}}
              onExport={() => {}}
            />
          </SectionContainer>
        </div>
      </DashboardLayout>
    </DashboardContainer>
  );
};