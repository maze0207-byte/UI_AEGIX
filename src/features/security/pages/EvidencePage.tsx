import React, { useState } from 'react';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { SearchBar } from '../components/SearchBar';
import { EnterpriseFiltersPanel } from '../components/EnterpriseFilters';
import { EnterpriseTable, type Column } from '../components/EnterpriseTable';
import { StatusBadge } from '../components/StatusBadge';
import type { Evidence, SecurityFilters } from '../types/security';

const mockEvidence: Evidence[] = [
  {
    id: '1',
    type: 'file',
    deviceId: 'dev-001',
    deviceName: 'WS-ENG-001',
    status: 'collected',
    collectedAt: '2024-01-15T10:30:00Z',
    size: 1024567,
    hash: 'a1b2c3d4e5f6',
    path: '/tmp/suspicious.exe',
    description: 'Suspicious executable file',
  },
  {
    id: '2',
    type: 'memory',
    deviceId: 'dev-002',
    deviceName: 'SRV-DC-001',
    status: 'analyzed',
    collectedAt: '2024-01-15T09:15:00Z',
    size: 512345,
    hash: 'f6e5d4c3b2a1',
    path: 'memory_dump_001',
    description: 'Memory dump for analysis',
  },
  {
    id: '3',
    type: 'network',
    deviceId: 'dev-003',
    deviceName: 'LAP-MKT-003',
    status: 'preserved',
    collectedAt: '2024-01-15T08:45:00Z',
    size: 2048,
    hash: '1a2b3c4d5e6f',
    path: 'pcap_capture_001.pcap',
    description: 'Network packet capture',
  },
];

const evidenceColumns: Column<Evidence>[] = [
  { id: 'type', header: 'Type', accessor: 'type', sortable: true },
  { id: 'deviceName', header: 'Device', accessor: 'deviceName', sortable: true },
  { id: 'status', header: 'Status', accessor: (item) => <StatusBadge status={item.status} />, sortable: true },
  { id: 'collectedAt', header: 'Collected', accessor: 'collectedAt', sortable: true },
  { id: 'size', header: 'Size', accessor: (item) => `${(item.size / 1024).toFixed(2)} KB`, sortable: true },
  { id: 'hash', header: 'Hash', accessor: 'hash', sortable: true },
];

export const EvidencePage: React.FC = () => {
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
              placeholder="Search evidence..."
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

          {/* Evidence Table */}
          <SectionContainer title="Evidence" className="p-0">
            <EnterpriseTable
              data={mockEvidence}
              columns={evidenceColumns}
              total={mockEvidence.length}
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