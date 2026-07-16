import React from 'react';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { EnterpriseTable, type Column } from '../../security/components/EnterpriseTable';
import { SectionHeader } from '../../security/components/SectionHeader';
import type { AdminLab } from '../types/administration';

const mockLabs: AdminLab[] = [
  { id: '1', name: 'Lab A', building: 'HQ - NYC', department: 'Engineering', responsibleUser: 'Dr. Smith', capacity: 50, assignedDevices: 45 },
  { id: '2', name: 'Lab B', building: 'HQ - NYC', department: 'Engineering', responsibleUser: 'Dr. Johnson', capacity: 40, assignedDevices: 32 },
  { id: '3', name: 'Lab C', building: 'HQ - LA', department: 'Research', responsibleUser: 'Dr. Williams', capacity: 30, assignedDevices: 28 },
];

const labColumns: Column<AdminLab>[] = [
  { id: 'name', header: 'Lab', accessor: 'name', sortable: true },
  { id: 'building', header: 'Building', accessor: 'building', sortable: true },
  { id: 'department', header: 'Department', accessor: 'department', sortable: true },
  { id: 'responsibleUser', header: 'Responsible', accessor: (item) => item.responsibleUser ?? '-', sortable: true },
  { id: 'capacity', header: 'Capacity', accessor: 'capacity', sortable: true },
  { id: 'assignedDevices', header: 'Devices', accessor: 'assignedDevices', sortable: true },
];

export const LabsPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6 pb-8">
          <SectionHeader title="Labs" description="Laboratory management" />

          <SectionContainer title="Lab List" className="p-0">
            <EnterpriseTable
              data={mockLabs}
              columns={labColumns}
              total={mockLabs.length}
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