import React from 'react';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { EnterpriseTable, type Column } from '../../security/components/EnterpriseTable';
import { SectionHeader } from '../../security/components/SectionHeader';
import type { SoftwarePackage } from '../types/administration';

const mockPackages: SoftwarePackage[] = [
  { id: '1', name: 'AEGIX Agent', version: '1.2.0', category: 'Agent', size: 15000000, deploymentGroups: ['All Devices'], status: 'active' },
  { id: '2', name: 'Security Plugin', version: '2.0.1', category: 'Plugin', size: 5000000, deploymentGroups: ['Security'], status: 'active' },
  { id: '3', name: 'Legacy Tool', version: '1.0.0', category: 'Tool', size: 10000000, deploymentGroups: ['Legacy'], status: 'deprecated' },
];

const packageColumns: Column<SoftwarePackage>[] = [
  { id: 'name', header: 'Package', accessor: 'name', sortable: true },
  { id: 'version', header: 'Version', accessor: 'version', sortable: true },
  { id: 'category', header: 'Category', accessor: 'category', sortable: true },
  { id: 'size', header: 'Size', accessor: (item) => `${(item.size / 1024 / 1024).toFixed(1)} MB`, sortable: true },
  { id: 'deploymentGroups', header: 'Groups', accessor: (item) => item.deploymentGroups.join(', '), sortable: true },
  { id: 'status', header: 'Status', accessor: (item) => (
    <span className={`inline-flex items-center rounded-sm px-2 py-0.5 text-xs ${item.status === 'active' ? 'bg-primary-500/10 text-primary-400' : 'bg-warning-500/10 text-warning-500'}`}>
      {item.status}
    </span>
  ), sortable: true },
];

export const SoftwareRepositoryPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6 pb-8">
          <SectionHeader title="Software Repository" description="Package management" />

          <SectionContainer title="Package List" className="p-0">
            <EnterpriseTable
              data={mockPackages}
              columns={packageColumns}
              total={mockPackages.length}
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