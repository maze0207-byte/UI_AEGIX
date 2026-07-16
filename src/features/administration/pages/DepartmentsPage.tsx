import React from 'react';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { EnterpriseTable, type Column } from '../../security/components/EnterpriseTable';
import { SectionHeader } from '../../security/components/SectionHeader';
import type { AdminDepartment } from '../types/administration';

const mockDepartments: AdminDepartment[] = [
  { id: '1', name: 'Engineering', manager: 'Dr. Smith', userCount: 45, buildingCount: 2, labCount: 3, assetCount: 120 },
  { id: '2', name: 'Marketing', manager: 'Jane Doe', userCount: 28, buildingCount: 1, labCount: 0, assetCount: 35 },
  { id: '3', name: 'Sales', manager: 'Bob Johnson', userCount: 20, buildingCount: 1, labCount: 0, assetCount: 25 },
];

const departmentColumns: Column<AdminDepartment>[] = [
  { id: 'name', header: 'Department', accessor: 'name', sortable: true },
  { id: 'manager', header: 'Manager', accessor: (item) => item.manager ?? '-', sortable: true },
  { id: 'userCount', header: 'Users', accessor: 'userCount', sortable: true },
  { id: 'buildingCount', header: 'Buildings', accessor: 'buildingCount', sortable: true },
  { id: 'labCount', header: 'Labs', accessor: 'labCount', sortable: true },
  { id: 'assetCount', header: 'Assets', accessor: 'assetCount', sortable: true },
];

export const DepartmentsPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6 pb-8">
          <SectionHeader title="Departments" description="Department management" />

          <SectionContainer title="Department List" className="p-0">
            <EnterpriseTable
              data={mockDepartments}
              columns={departmentColumns}
              total={mockDepartments.length}
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