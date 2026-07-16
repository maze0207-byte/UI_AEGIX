import React from 'react';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { SectionHeader } from '../../security/components/SectionHeader';
import { Activity, Database, Server, Mail, Users, Webhook } from 'lucide-react';
import type { Integration } from '../types/administration';

const mockIntegrations: Integration[] = [
  { id: '1', name: 'MQTT Broker', type: 'mqtt', status: 'connected', lastSync: '2024-01-15T10:00:00Z' },
  { id: '2', name: 'PostgreSQL', type: 'postgresql', status: 'connected', lastSync: '2024-01-15T10:00:00Z' },
  { id: '3', name: 'Redis Cache', type: 'redis', status: 'connected', lastSync: '2024-01-15T10:00:00Z' },
  { id: '4', name: 'SMTP Server', type: 'smtp', status: 'disconnected' },
  { id: '5', name: 'LDAP Server', type: 'ldap', status: 'error' },
];

const typeIcons: Record<string, typeof Activity> = {
  mqtt: Activity,
  postgresql: Database,
  redis: Server,
  smtp: Mail,
  ldap: Users,
  webhook: Webhook,
};

export const IntegrationsPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6 pb-8">
          <SectionHeader title="Integrations" description="External system integrations" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {mockIntegrations.map((integration) => {
              const Icon = typeIcons[integration.type] || Activity;
              return (
                <div key={integration.id} className="rounded-sm border border-neutral-800 bg-neutral-900 p-4">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-primary-400" />
                    <span className="text-sm font-medium text-neutral-200">{integration.name}</span>
                  </div>
                  <p className="mt-2 text-xs">
                    <span className={`inline-flex items-center rounded-sm px-2 py-0.5 ${integration.status === 'connected' ? 'bg-primary-500/10 text-primary-400' : integration.status === 'disconnected' ? 'bg-neutral-500/10 text-neutral-400' : 'bg-danger-500/10 text-danger-400'}`}>
                      {integration.status}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </DashboardLayout>
    </DashboardContainer>
  );
};