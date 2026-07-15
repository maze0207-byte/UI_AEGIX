import React from 'react';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';

const PlaceholderContent: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex h-48 items-center justify-center rounded border border-dashed border-neutral-700 bg-neutral-900/50 text-xs text-neutral-500">
    [{label}]
  </div>
);

export const WorkflowsPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-100">Workflow Builder</h1>
            <p className="text-sm text-neutral-400">Create and manage orchestration workflows</p>
          </div>

          <SectionContainer title="Workflow Designer">
            <PlaceholderContent label="Visual Workflow Designer" />
          </SectionContainer>

          <SectionContainer title="Install Software Workflow">
            <PlaceholderContent label="Install Software Template" />
          </SectionContainer>

          <SectionContainer title="Restart Workflow">
            <PlaceholderContent label="Restart Template" />
          </SectionContainer>

          <SectionContainer title="Verify Workflow">
            <PlaceholderContent label="Verify Template" />
          </SectionContainer>

          <SectionContainer title="Collect Result Workflow">
            <PlaceholderContent label="Collect Result Template" />
          </SectionContainer>

          <SectionContainer title="Notify Workflow">
            <PlaceholderContent label="Notify Template" />
          </SectionContainer>

          <SectionContainer title="Finish Workflow">
            <PlaceholderContent label="Finish Template" />
          </SectionContainer>
        </div>
      </DashboardLayout>
    </DashboardContainer>
  );
};