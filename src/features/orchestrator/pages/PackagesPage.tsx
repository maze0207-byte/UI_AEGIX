import React from 'react';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';

const PlaceholderContent: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex h-48 items-center justify-center rounded border border-dashed border-neutral-700 bg-neutral-900/50 text-xs text-neutral-500">
    [{label}]
  </div>
);

export const PackagesPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-100">Package Management</h1>
            <p className="text-sm text-neutral-400">Manage software packages for deployment</p>
          </div>

          <SectionContainer title="Upload Package">
            <PlaceholderContent label="Upload Package Form" />
          </SectionContainer>

          <SectionContainer title="Package Repository">
            <PlaceholderContent label="Package Repository" />
          </SectionContainer>

          <SectionContainer title="Version History">
            <PlaceholderContent label="Version History" />
          </SectionContainer>

          <SectionContainer title="Categories">
            <PlaceholderContent label="Categories" />
          </SectionContainer>

          <SectionContainer title="Silent Install Options">
            <PlaceholderContent label="Silent Install Options" />
          </SectionContainer>

          <SectionContainer title="Rollback Support">
            <PlaceholderContent label="Rollback Support" />
          </SectionContainer>
        </div>
      </DashboardLayout>
    </DashboardContainer>
  );
};