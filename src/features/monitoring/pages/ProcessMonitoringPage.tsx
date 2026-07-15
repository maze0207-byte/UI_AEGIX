import React from 'react';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';

const PlaceholderContent: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex h-48 items-center justify-center rounded border border-dashed border-neutral-700 bg-neutral-900/50 text-xs text-neutral-500">
    [{label}]
  </div>
);

export const ProcessMonitoringPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-100">Process Monitoring</h1>
            <p className="text-sm text-neutral-400">Monitor running processes and services</p>
          </div>

          <SectionContainer title="Top Processes">
            <PlaceholderContent label="Top Processes Table" />
          </SectionContainer>

          <SectionContainer title="CPU Consumers">
            <PlaceholderContent label="CPU Consumers List" />
          </SectionContainer>

          <SectionContainer title="Memory Consumers">
            <PlaceholderContent label="Memory Consumers List" />
          </SectionContainer>

          <SectionContainer title="Background Services">
            <PlaceholderContent label="Background Services List" />
          </SectionContainer>

          <SectionContainer title="Running Services">
            <PlaceholderContent label="Running Services List" />
          </SectionContainer>

          <SectionContainer title="Stopped Services">
            <PlaceholderContent label="Stopped Services List" />
          </SectionContainer>
        </div>
      </DashboardLayout>
    </DashboardContainer>
  );
};