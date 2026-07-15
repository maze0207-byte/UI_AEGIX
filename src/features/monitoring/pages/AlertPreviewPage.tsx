import React from 'react';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';

const PlaceholderContent: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex h-48 items-center justify-center rounded border border-dashed border-neutral-700 bg-neutral-900/50 text-xs text-neutral-500">
    [{label}]
  </div>
);

export const AlertPreviewPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-100">Monitoring Alerts</h1>
            <p className="text-sm text-neutral-400">Latest monitoring alerts and notifications</p>
          </div>

          <SectionContainer title="Critical Alerts">
            <PlaceholderContent label="Critical Alerts List" />
          </SectionContainer>

          <SectionContainer title="Warning Alerts">
            <PlaceholderContent label="Warning Alerts List" />
          </SectionContainer>

          <SectionContainer title="Info Alerts">
            <PlaceholderContent label="Info Alerts List" />
          </SectionContainer>
        </div>
      </DashboardLayout>
    </DashboardContainer>
  );
};