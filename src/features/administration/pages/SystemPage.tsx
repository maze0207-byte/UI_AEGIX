import React from 'react';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { SectionHeader } from '../../security/components/SectionHeader';
import { Globe, Clock, Palette, Building2 } from 'lucide-react';

export const SystemPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6 pb-8">
          <SectionHeader title="System" description="Platform settings" />

          <SectionContainer title="Platform Settings">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
              <div className="rounded-sm border border-neutral-800 bg-neutral-900 p-4">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4 text-primary-400" />
                  <span className="text-sm font-medium text-neutral-200">Theme</span>
                </div>
                <p className="mt-2 text-xs text-neutral-400">Dark</p>
              </div>
              <div className="rounded-sm border border-neutral-800 bg-neutral-900 p-4">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary-400" />
                  <span className="text-sm font-medium text-neutral-200">Language</span>
                </div>
                <p className="mt-2 text-xs text-neutral-400">English</p>
              </div>
              <div className="rounded-sm border border-neutral-800 bg-neutral-900 p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary-400" />
                  <span className="text-sm font-medium text-neutral-200">Session Timeout</span>
                </div>
                <p className="mt-2 text-xs text-neutral-400">30 minutes</p>
              </div>
              <div className="rounded-sm border border-neutral-800 bg-neutral-900 p-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary-400" />
                  <span className="text-sm font-medium text-neutral-200">Branding</span>
                </div>
                <p className="mt-2 text-xs text-neutral-400">AEGIX Corporation</p>
              </div>
            </div>
          </SectionContainer>
        </div>
      </DashboardLayout>
    </DashboardContainer>
  );
};