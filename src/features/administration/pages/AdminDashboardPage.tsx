import React from 'react';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { StatCard } from '@/app/StatCard';
import { WidgetGrid } from '../../dashboard/components/WidgetGrid';
import { SectionHeader } from '../../security/components/SectionHeader';
import { Users, Shield, Building2, FlaskConical, Monitor, Database, Activity, Server, AlertTriangle } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6 pb-8">
          {/* Header */}
          <SectionHeader
            title="Administration"
            description="Platform administration and management"
          />

          {/* Summary Stats */}
          <WidgetGrid>
            <StatCard
              title="Total Users"
              value={125}
              description="Registered users"
              icon={<Users className="h-4 w-4 text-primary-400" />}
            />
            <StatCard
              title="Active Users"
              value={118}
              description="Currently active"
              icon={<Users className="h-4 w-4 text-primary-400" />}
            />
            <StatCard
              title="Roles"
              value={8}
              description="Configured roles"
              icon={<Shield className="h-4 w-4 text-primary-400" />}
            />
            <StatCard
              title="Departments"
              value={12}
              description="Active departments"
              icon={<Building2 className="h-4 w-4 text-primary-400" />}
            />
            <StatCard
              title="Buildings"
              value={4}
              description="Managed buildings"
              icon={<Building2 className="h-4 w-4 text-primary-400" />}
            />
            <StatCard
              title="Labs"
              value={3}
              description="Active labs"
              icon={<FlaskConical className="h-4 w-4 text-primary-400" />}
            />
            <StatCard
              title="Agent Policies"
              value={5}
              description="Active policies"
              icon={<Monitor className="h-4 w-4 text-primary-400" />}
            />
            <StatCard
              title="Software Packages"
              value={42}
              description="In repository"
              icon={<Database className="h-4 w-4 text-primary-400" />}
            />
          </WidgetGrid>

          {/* System Health */}
          <SectionContainer title="System Health">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-sm border border-neutral-800 bg-neutral-900 p-4">
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-primary-400" />
                  <span className="text-sm font-medium text-neutral-200">Database</span>
                </div>
                <p className="mt-2 text-xs text-primary-400">Connected</p>
              </div>
              <div className="rounded-sm border border-neutral-800 bg-neutral-900 p-4">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary-400" />
                  <span className="text-sm font-medium text-neutral-200">MQTT</span>
                </div>
                <p className="mt-2 text-xs text-primary-400">Connected</p>
              </div>
              <div className="rounded-sm border border-neutral-800 bg-neutral-900 p-4">
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-primary-400" />
                  <span className="text-sm font-medium text-neutral-200">Platform Version</span>
                </div>
                <p className="mt-2 text-xs text-neutral-300">v1.0.0</p>
              </div>
              <div className="rounded-sm border border-neutral-800 bg-neutral-900 p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning-500" />
                  <span className="text-sm font-medium text-neutral-200">License Status</span>
                </div>
                <p className="mt-2 text-xs text-primary-400">Valid until 2025</p>
              </div>
            </div>
          </SectionContainer>

          {/* Recent Activities */}
          <SectionContainer title="Recent Administrative Activities">
            <div className="space-y-2">
              {[
                { id: '1', user: 'admin', action: 'Created user', target: 'john.doe', time: '2 hours ago' },
                { id: '2', user: 'admin', action: 'Updated role', target: 'Analyst', time: '4 hours ago' },
                { id: '3', user: 'admin', action: 'Modified policy', target: 'Default Agent', time: '1 day ago' },
              ].map((activity) => (
                <div key={activity.id} className="flex items-center justify-between rounded-sm border border-neutral-800 bg-neutral-950 p-3">
                  <div>
                    <p className="text-sm font-medium text-neutral-200">{activity.user} {activity.action.toLowerCase()}</p>
                    <p className="text-xs text-neutral-500">{activity.target}</p>
                  </div>
                  <p className="text-xs text-neutral-500">{activity.time}</p>
                </div>
              ))}
            </div>
          </SectionContainer>
        </div>
      </DashboardLayout>
    </DashboardContainer>
  );
};