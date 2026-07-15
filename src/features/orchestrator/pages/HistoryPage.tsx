import React from 'react';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';

const PlaceholderContent: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex h-48 items-center justify-center rounded border border-dashed border-neutral-700 bg-neutral-900/50 text-xs text-neutral-500">
    [{label}]
  </div>
);

export const HistoryPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-100">Command History</h1>
            <p className="text-sm text-neutral-400">View historical command executions</p>
          </div>

          <SectionContainer title="All Commands">
            <PlaceholderContent label="Command History Table" />
          </SectionContainer>

          <SectionContainer title="Execution Details">
            <PlaceholderContent label="Execution Details" />
          </SectionContainer>
        </div>
      </DashboardLayout>
    </DashboardContainer>
  );
};