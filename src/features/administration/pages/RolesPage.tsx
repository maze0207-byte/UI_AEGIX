import React from 'react';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { EnterpriseTable, type Column } from '../../security/components/EnterpriseTable';
import { SectionHeader } from '../../security/components/SectionHeader';
import type { AdminRole } from '../types/administration';

const mockRoles: AdminRole[] = [
  { id: '1', name: 'Administrator', description: 'Full system access', permissions: ['*'], userCount: 2, isSystem: true },
  { id: '2', name: 'Analyst', description: 'Security analysis access', permissions: ['security.read', 'alerts.read'], userCount: 15 },
  { id: '3', name: 'Manager', description: 'Department management', permissions: ['users.read', 'departments.manage'], userCount: 8 },
];

const roleColumns: Column<AdminRole>[] = [
  { id: 'name', header: 'Role Name', accessor: 'name', sortable: true },
  { id: 'description', header: 'Description', accessor: 'description', sortable: true },
  { id: 'userCount', header: 'Users', accessor: 'userCount', sortable: true },
  { id: 'isSystem', header: 'System', accessor: (item) => item.isSystem ? 'Yes' : 'No', sortable: true },
];

export const RolesPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6 pb-8">
          <SectionHeader title="Roles" description="Role-based access control management" />

          <SectionContainer title="Role List" className="p-0">
            <EnterpriseTable
              data={mockRoles}
              columns={roleColumns}
              total={mockRoles.length}
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