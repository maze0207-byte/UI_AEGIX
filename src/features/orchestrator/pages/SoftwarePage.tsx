import React from 'react';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';

const PlaceholderContent: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex h-48 items-center justify-center rounded border border-dashed border-neutral-700 bg-neutral-900/50 text-xs text-neutral-500">
    [{label}]
  </div>
);

export const SoftwarePage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-100">Software Deployment</h1>
            <p className="text-sm text-neutral-400">Deploy software across managed devices</p>
          </div>

          <SectionContainer title="Software Library">
            <PlaceholderContent label="Software Library" />
          </SectionContainer>

          <SectionContainer title="Deployment Queue">
            <PlaceholderContent label="Deployment Queue" />
          </SectionContainer>

          <SectionContainer title="Deployment History">
            <PlaceholderContent label="Deployment History" />
          </SectionContainer>

          <SectionContainer title="Deployment Progress">
            <PlaceholderContent label="Deployment Progress" />
          </SectionContainer>

          <SectionContainer title="Package Details">
            <PlaceholderContent label="Package Details" />
          </SectionContainer>
        </div>
      </DashboardLayout>
    </DashboardContainer>
  );
};