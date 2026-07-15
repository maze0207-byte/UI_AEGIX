import React from 'react';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import { AICommandBarWidget } from '../components/widgets/OrchestratorWidgets';

const PlaceholderContent: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex h-48 items-center justify-center rounded border border-dashed border-neutral-700 bg-neutral-900/50 text-xs text-neutral-500">
    [{label}]
  </div>
);

export const CommandsPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-100">Command Center</h1>
            <p className="text-sm text-neutral-400">Execute commands across managed devices</p>
          </div>

          <SectionContainer title="AI Command Bar" className="bg-transparent border-none p-0">
            <AICommandBarWidget />
          </SectionContainer>

          <SectionContainer title="Command Templates">
            <PlaceholderContent label="Command Templates" />
          </SectionContainer>

          <SectionContainer title="Restart Device">
            <PlaceholderContent label="Restart Device Command" />
          </SectionContainer>

          <SectionContainer title="Shutdown Device">
            <PlaceholderContent label="Shutdown Device Command" />
          </SectionContainer>

          <SectionContainer title="Lock Device">
            <PlaceholderContent label="Lock Device Command" />
          </SectionContainer>

          <SectionContainer title="Wake Device">
            <PlaceholderContent label="Wake Device Command" />
          </SectionContainer>

          <SectionContainer title="Collect Logs">
            <PlaceholderContent label="Collect Logs Command" />
          </SectionContainer>

          <SectionContainer title="Collect Evidence">
            <PlaceholderContent label="Collect Evidence Command" />
          </SectionContainer>

          <SectionContainer title="Update Agent">
            <PlaceholderContent label="Update Agent Command" />
          </SectionContainer>

          <SectionContainer title="Refresh Inventory">
            <PlaceholderContent label="Refresh Inventory Command" />
          </SectionContainer>

          <SectionContainer title="Sync Policies">
            <PlaceholderContent label="Sync Policies Command" />
          </SectionContainer>

          <SectionContainer title="Run Script">
            <PlaceholderContent label="Run Script Command" />
          </SectionContainer>

          <SectionContainer title="Run PowerShell">
            <PlaceholderContent label="Run PowerShell Command" />
          </SectionContainer>

          <SectionContainer title="Run CMD">
            <PlaceholderContent label="Run CMD Command" />
          </SectionContainer>

          <SectionContainer title="Run Bash">
            <PlaceholderContent label="Run Bash Command" />
          </SectionContainer>

          <SectionContainer title="Run Python">
            <PlaceholderContent label="Run Python Command" />
          </SectionContainer>
        </div>
      </DashboardLayout>
    </DashboardContainer>
  );
};