import React, { useState } from 'react';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { SearchBar } from '../components/SearchBar';
import { EnterpriseFiltersPanel } from '../components/EnterpriseFilters';
import { EnterpriseTable, type Column } from '../components/EnterpriseTable';
import { RiskIndicator } from '../components/RiskIndicator';
import type { ThreatIntelligence, SecurityFilters, ThreatLevel } from '../types/security';

type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

const threatLevelToRiskLevel = (level: ThreatLevel): RiskLevel => {
  if (level === 'unknown') return 'low';
  return level;
};

const mockThreats: ThreatIntelligence[] = [
  {
    id: '1',
    indicator: '192.168.1.100',
    type: 'ip',
    threatLevel: 'critical',
    confidence: 95,
    source: 'VirusTotal',
    description: 'Known malicious IP address',
    firstSeen: '2024-01-10T00:00:00Z',
    lastSeen: '2024-01-15T10:30:00Z',
    tags: ['malware', 'c2'],
  },
  {
    id: '2',
    indicator: 'malicious-domain.com',
    type: 'domain',
    threatLevel: 'high',
    confidence: 87,
    source: 'AlienVault OTX',
    description: 'Phishing domain',
    firstSeen: '2024-01-12T00:00:00Z',
    lastSeen: '2024-01-15T09:15:00Z',
    tags: ['phishing'],
  },
  {
    id: '3',
    indicator: 'a1b2c3d4e5f6g7h8',
    type: 'hash',
    threatLevel: 'medium',
    confidence: 72,
    source: 'Internal',
    description: 'Suspicious file hash',
    firstSeen: '2024-01-14T00:00:00Z',
    lastSeen: '2024-01-15T08:45:00Z',
    tags: ['suspicious'],
  },
];

const threatColumns: Column<ThreatIntelligence>[] = [
  { id: 'indicator', header: 'Indicator', accessor: 'indicator', sortable: true },
  { id: 'type', header: 'Type', accessor: 'type', sortable: true },
  { id: 'threatLevel', header: 'Threat Level', accessor: (item) => <RiskIndicator level={threatLevelToRiskLevel(item.threatLevel)} />, sortable: true },
  { id: 'confidence', header: 'Confidence', accessor: (item) => `${item.confidence}%`, sortable: true },
  { id: 'source', header: 'Source', accessor: 'source', sortable: true },
  { id: 'lastSeen', header: 'Last Seen', accessor: 'lastSeen', sortable: true },
];

export const ThreatIntelligencePage: React.FC = () => {
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
              placeholder="Search threat intelligence..."
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

          {/* Threat Intelligence Table */}
          <SectionContainer title="Threat Intelligence" className="p-0">
            <EnterpriseTable
              data={mockThreats}
              columns={threatColumns}
              total={mockThreats.length}
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