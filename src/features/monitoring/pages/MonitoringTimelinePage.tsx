import React from 'react';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';

const PlaceholderContent: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex h-48 items-center justify-center rounded border border-dashed border-neutral-700 bg-neutral-900/50 text-xs text-neutral-500">
    [{label}]
  </div>
);

export const MonitoringTimelinePage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-100">Monitoring Timeline</h1>
            <p className="text-sm text-neutral-400">Historical monitoring events</p>
          </div>

          <SectionContainer title="All Events">
            <PlaceholderContent label="Timeline Events List" />
          </SectionContainer>

          <SectionContainer title="CPU Spikes">
            <PlaceholderContent label="CPU Spike Events" />
          </SectionContainer>

          <SectionContainer title="Memory Spikes">
            <PlaceholderContent label="Memory Spike Events" />
          </SectionContainer>

          <SectionContainer title="Disk Full Events">
            <PlaceholderContent label="Disk Full Events" />
          </SectionContainer>

          <SectionContainer title="Offline Events">
            <PlaceholderContent label="Offline Events" />
          </SectionContainer>

          <SectionContainer title="Recovered Events">
            <PlaceholderContent label="Recovered Events" />
          </SectionContainer>

          <SectionContainer title="Network Lost Events">
            <PlaceholderContent label="Network Lost Events" />
          </SectionContainer>

          <SectionContainer title="High Temperature Events">
            <PlaceholderContent label="High Temperature Events" />
          </SectionContainer>

          <SectionContainer title="Service Stopped Events">
            <PlaceholderContent label="Service Stopped Events" />
          </SectionContainer>
        </div>
      </DashboardLayout>
    </DashboardContainer>
  );
};