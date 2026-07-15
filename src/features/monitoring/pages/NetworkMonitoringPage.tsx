import React from 'react';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import { DetailSection } from '@/app/DetailSection';
import { DetailItem } from '@/app/DetailItem';

const PlaceholderContent: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex h-48 items-center justify-center rounded border border-dashed border-neutral-700 bg-neutral-900/50 text-xs text-neutral-500">
    [{label}]
  </div>
);

export const NetworkMonitoringPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-100">Network Monitoring</h1>
            <p className="text-sm text-neutral-400">Network connectivity and performance</p>
          </div>

          <DetailSection title="Network Configuration">
            <DetailItem label="IP Address">192.168.1.100</DetailItem>
            <DetailItem label="MAC Address">00:1A:2B:3C:4D:5E</DetailItem>
            <DetailItem label="Gateway">192.168.1.1</DetailItem>
            <DetailItem label="DNS">8.8.8.8, 8.8.4.4</DetailItem>
          </DetailSection>

          <SectionContainer title="Network Performance">
            <PlaceholderContent label="Network Performance Chart" />
          </SectionContainer>

          <SectionContainer title="Upload">
            <PlaceholderContent label="Upload Metrics" />
          </SectionContainer>

          <SectionContainer title="Download">
            <PlaceholderContent label="Download Metrics" />
          </SectionContainer>

          <SectionContainer title="Latency">
            <PlaceholderContent label="Latency Metrics" />
          </SectionContainer>

          <SectionContainer title="Packet Loss">
            <PlaceholderContent label="Packet Loss Metrics" />
          </SectionContainer>
        </div>
      </DashboardLayout>
    </DashboardContainer>
  );
};