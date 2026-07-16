import React, { useState } from 'react';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { SearchBar } from '../components/SearchBar';
import { EnterpriseFiltersPanel } from '../components/EnterpriseFilters';
import { EnterpriseTable, type Column } from '../components/EnterpriseTable';
import { SeverityBadge } from '../components/SeverityBadge';
import { StatusBadge } from '../components/StatusBadge';
import type { SecurityAlert, SecurityFilters } from '../types/security';

const mockAlerts: SecurityAlert[] = [
  {
    id: '1',
    title: 'Suspicious Process Detected',
    description: 'Unknown process running with elevated privileges',
    severity: 'critical',
    status: 'open',
    deviceId: 'dev-001',
    deviceName: 'WS-ENG-001',
    timestamp: '2024-01-15T10:30:00Z',
    source: 'EDR',
    ruleId: 'rule-001',
    ruleName: 'Suspicious Process',
  },
  {
    id: '2',
    title: 'Unusual Network Traffic',
    description: 'High volume of outbound connections detected',
    severity: 'high',
    status: 'acknowledged',
    deviceId: 'dev-002',
    deviceName: 'SRV-DC-001',
    timestamp: '2024-01-15T09:15:00Z',
    source: 'Network',
    ruleId: 'rule-002',
    ruleName: 'Network Anomaly',
  },
  {
    id: '3',
    title: 'Failed Login Attempts',
    description: 'Multiple failed authentication attempts',
    severity: 'medium',
    status: 'open',
    deviceId: 'dev-003',
    deviceName: 'LAP-MKT-003',
    timestamp: '2024-01-15T08:45:00Z',
    source: 'Auth',
    ruleId: 'rule-003',
    ruleName: 'Brute Force Detection',
  },
];

const alertColumns: Column<SecurityAlert>[] = [
  { id: 'title', header: 'Title', accessor: 'title', sortable: true },
  { id: 'deviceName', header: 'Device', accessor: 'deviceName', sortable: true },
  { id: 'severity', header: 'Severity', accessor: (item) => <SeverityBadge severity={item.severity} />, sortable: true },
  { id: 'status', header: 'Status', accessor: (item) => <StatusBadge status={item.status} />, sortable: true },
  { id: 'source', header: 'Source', accessor: 'source', sortable: true },
  { id: 'timestamp', header: 'Timestamp', accessor: 'timestamp', sortable: true },
];

export const AlertsPage: React.FC = () => {
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
              placeholder="Search alerts..."
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

          {/* Alerts Table */}
          <SectionContainer title="Security Alerts" className="p-0">
            <EnterpriseTable
              data={mockAlerts}
              columns={alertColumns}
              total={mockAlerts.length}
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