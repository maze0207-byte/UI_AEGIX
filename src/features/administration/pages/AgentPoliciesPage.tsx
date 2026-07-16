import React from 'react';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { StatCard } from '@/app/StatCard';
import { SectionHeader } from '../../security/components/SectionHeader';
import { Monitor, Activity, Database, Shield, FileText, HardDrive } from 'lucide-react';
import type { AgentPolicy } from '../types/administration';

const mockPolicies: AgentPolicy[] = [
  { id: '1', name: 'Default Agent', description: 'Standard agent configuration', heartbeat: true, monitoring: true, telemetry: true, security: true, evidenceCollection: true, softwareUpdate: true, offlineCache: false },
  { id: '2', name: 'High Security', description: 'Enhanced security settings', heartbeat: true, monitoring: true, telemetry: true, security: true, evidenceCollection: true, softwareUpdate: true, offlineCache: true },
];

export const AgentPoliciesPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6 pb-8">
          <SectionHeader title="Agent Policies" description="Agent configuration policies" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Policies"
              value={mockPolicies.length}
              description="Configured policies"
              icon={<Monitor className="h-4 w-4 text-primary-400" />}
            />
            <StatCard
              title="Heartbeat"
              value="Enabled"
              description="All policies"
              icon={<Activity className="h-4 w-4 text-primary-400" />}
            />
            <StatCard
              title="Security"
              value="Enabled"
              description="All policies"
              icon={<Shield className="h-4 w-4 text-primary-400" />}
            />
            <StatCard
              title="Offline Cache"
              value="1"
              description="Policies enabled"
              icon={<HardDrive className="h-4 w-4 text-primary-400" />}
            />
          </div>

          <SectionContainer title="Policy List">
            <div className="space-y-4">
              {mockPolicies.map((policy) => (
                <div key={policy.id} className="rounded-sm border border-neutral-800 bg-neutral-900 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-neutral-200">{policy.name}</h3>
                      <p className="text-xs text-neutral-500">{policy.description}</p>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="flex items-center gap-2">
                      <Activity className="h-3 w-3 text-primary-400" />
                      <span className="text-xs text-neutral-300">Monitoring: {policy.monitoring ? 'On' : 'Off'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Database className="h-3 w-3 text-primary-400" />
                      <span className="text-xs text-neutral-300">Telemetry: {policy.telemetry ? 'On' : 'Off'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-3 w-3 text-primary-400" />
                      <span className="text-xs text-neutral-300">Security: {policy.security ? 'On' : 'Off'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-3 w-3 text-primary-400" />
                      <span className="text-xs text-neutral-300">Evidence: {policy.evidenceCollection ? 'On' : 'Off'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionContainer>
        </div>
      </DashboardLayout>
    </DashboardContainer>
  );
};