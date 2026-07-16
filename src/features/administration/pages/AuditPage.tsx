import React from 'react';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { EnterpriseTable, type Column } from '../../security/components/EnterpriseTable';
import { SearchBar } from '../../security/components/SearchBar';
import { SectionHeader } from '../../security/components/SectionHeader';
import type { AuditLog } from '../types/administration';

const mockAuditLogs: AuditLog[] = [
  { id: '1', user: 'admin', action: 'login', resource: 'auth', timestamp: '2024-01-15T10:00:00Z', ipAddress: '192.168.1.1' },
  { id: '2', user: 'admin', action: 'create_user', resource: 'users', timestamp: '2024-01-15T09:30:00Z', ipAddress: '192.168.1.1' },
  { id: '3', user: 'admin', action: 'update_role', resource: 'roles', timestamp: '2024-01-15T09:00:00Z', ipAddress: '192.168.1.1' },
];

const auditColumns: Column<AuditLog>[] = [
  { id: 'timestamp', header: 'Timestamp', accessor: 'timestamp', sortable: true },
  { id: 'user', header: 'User', accessor: 'user', sortable: true },
  { id: 'action', header: 'Action', accessor: 'action', sortable: true },
  { id: 'resource', header: 'Resource', accessor: 'resource', sortable: true },
  { id: 'ipAddress', header: 'IP Address', accessor: (item) => item.ipAddress ?? '-', sortable: true },
];

export const AuditPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6 pb-8">
          <SectionHeader title="Audit Logs" description="Administrative event logging" />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <SearchBar
              value=""
              onChange={() => {}}
              placeholder="Search audit logs..."
              className="w-full sm:w-64"
            />
          </div>

          <SectionContainer title="Audit Log" className="p-0">
            <EnterpriseTable
              data={mockAuditLogs}
              columns={auditColumns}
              total={mockAuditLogs.length}
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