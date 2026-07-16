import React, { useState } from 'react';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { SearchBar } from '../components/SearchBar';
import { EnterpriseFiltersPanel } from '../components/EnterpriseFilters';
import { EnterpriseTable, type Column } from '../components/EnterpriseTable';
import { SeverityBadge } from '../components/SeverityBadge';
import type { SecurityTimelineEvent, SecurityFilters } from '../types/security';

const mockTimelineEvents: SecurityTimelineEvent[] = [
  {
    id: '1',
    timestamp: '2024-01-15T10:30:00Z',
    type: 'alert',
    title: 'Suspicious Process Detected',
    description: 'Unknown process running with elevated privileges',
    severity: 'critical',
    relatedId: 'alert-001',
  },
  {
    id: '2',
    timestamp: '2024-01-15T09:15:00Z',
    type: 'incident',
    title: 'Ransomware Activity',
    description: 'Potential ransomware encryption detected on endpoint',
    severity: 'critical',
    relatedId: 'incident-001',
  },
  {
    id: '3',
    timestamp: '2024-01-15T08:45:00Z',
    type: 'threat',
    title: 'Malicious IP Detected',
    description: 'Connection to known malicious IP address',
    relatedId: 'threat-001',
  },
  {
    id: '4',
    timestamp: '2024-01-15T07:00:00Z',
    type: 'evidence',
    title: 'Evidence Collected',
    description: 'Memory dump collected from compromised device',
    relatedId: 'evidence-001',
  },
  {
    id: '5',
    timestamp: '2024-01-15T06:30:00Z',
    type: 'action',
    title: 'Alert Acknowledged',
    description: 'Alert acknowledged by SOC analyst',
    relatedId: 'alert-002',
  },
];

const timelineColumns: Column<SecurityTimelineEvent>[] = [
  { id: 'timestamp', header: 'Timestamp', accessor: 'timestamp', sortable: true },
  { id: 'type', header: 'Type', accessor: 'type', sortable: true },
  { id: 'title', header: 'Title', accessor: 'title', sortable: true },
  { id: 'description', header: 'Description', accessor: 'description', sortable: true },
  { id: 'severity', header: 'Severity', accessor: (item) => (item.severity ? <SeverityBadge severity={item.severity} /> : '-'), sortable: true },
];

export const TimelinePage: React.FC = () => {
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
              placeholder="Search timeline events..."
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

          {/* Timeline Table */}
          <SectionContainer title="Security Timeline" className="p-0">
            <EnterpriseTable
              data={mockTimelineEvents}
              columns={timelineColumns}
              total={mockTimelineEvents.length}
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