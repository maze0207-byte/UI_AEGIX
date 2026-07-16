import React, { useState } from 'react';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { EnterpriseTable, type Column } from '../../security/components/EnterpriseTable';
import { SearchBar } from '../../security/components/SearchBar';
import { SectionHeader } from '../../security/components/SectionHeader';
import type { AdminUser, AdminFilters } from '../types/administration';

const mockUsers: AdminUser[] = [
  { id: '1', username: 'admin', email: 'admin@aegix.com', firstName: 'Admin', lastName: 'User', status: 'active', lastLogin: '2024-01-15T10:00:00Z', roles: ['Administrator'], department: 'IT' },
  { id: '2', username: 'john.doe', email: 'john@aegix.com', firstName: 'John', lastName: 'Doe', status: 'active', lastLogin: '2024-01-15T09:00:00Z', roles: ['Analyst'], department: 'Security' },
  { id: '3', username: 'jane.smith', email: 'jane@aegix.com', firstName: 'Jane', lastName: 'Smith', status: 'inactive', roles: ['Manager'], department: 'Operations' },
];

const userColumns: Column<AdminUser>[] = [
  { id: 'username', header: 'Username', accessor: 'username', sortable: true },
  { id: 'email', header: 'Email', accessor: 'email', sortable: true },
  { id: 'status', header: 'Status', accessor: (item) => (
    <span className={`inline-flex items-center rounded-sm px-2 py-0.5 text-xs ${item.status === 'active' ? 'bg-primary-500/10 text-primary-400' : 'bg-neutral-500/10 text-neutral-400'}`}>
      {item.status}
    </span>
  ), sortable: true },
  { id: 'roles', header: 'Roles', accessor: (item) => item.roles.join(', '), sortable: true },
  { id: 'department', header: 'Department', accessor: (item) => item.department ?? '-', sortable: true },
  { id: 'lastLogin', header: 'Last Login', accessor: (item) => item.lastLogin ?? '-', sortable: true },
];

export const UsersPage: React.FC = () => {
  const [filters, setFilters] = useState<AdminFilters>({ search: '', status: 'all' });

  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6 pb-8">
          <SectionHeader title="Users" description="User management and access control" />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <SearchBar
              value={filters.search}
              onChange={(value) => setFilters({ ...filters, search: value })}
              placeholder="Search users..."
              className="w-full sm:w-64"
            />
          </div>

          <SectionContainer title="User List" className="p-0">
            <EnterpriseTable
              data={mockUsers}
              columns={userColumns}
              total={mockUsers.length}
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