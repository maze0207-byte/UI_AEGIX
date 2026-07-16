import React from 'react';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { EnterpriseTable, type Column } from '../../security/components/EnterpriseTable';
import { SectionHeader } from '../../security/components/SectionHeader';
import type { AdminBuilding } from '../types/administration';

const mockBuildings: AdminBuilding[] = [
  { id: '1', name: 'HQ - NYC', address: '123 Main St, New York, NY', floors: 10, departmentCount: 4, labCount: 3, deviceCount: 450 },
  { id: '2', name: 'HQ - LA', address: '456 Sunset Blvd, Los Angeles, CA', floors: 8, departmentCount: 2, labCount: 0, deviceCount: 320 },
  { id: '3', name: 'Data Center 1', address: '101 Server Lane, New York, NY', floors: 2, departmentCount: 1, labCount: 0, deviceCount: 200 },
];

const buildingColumns: Column<AdminBuilding>[] = [
  { id: 'name', header: 'Building', accessor: 'name', sortable: true },
  { id: 'address', header: 'Address', accessor: 'address', sortable: true },
  { id: 'floors', header: 'Floors', accessor: 'floors', sortable: true },
  { id: 'departmentCount', header: 'Departments', accessor: 'departmentCount', sortable: true },
  { id: 'labCount', header: 'Labs', accessor: 'labCount', sortable: true },
  { id: 'deviceCount', header: 'Devices', accessor: 'deviceCount', sortable: true },
];

export const BuildingsPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6 pb-8">
          <SectionHeader title="Buildings" description="Building management" />

          <SectionContainer title="Building List" className="p-0">
            <EnterpriseTable
              data={mockBuildings}
              columns={buildingColumns}
              total={mockBuildings.length}
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