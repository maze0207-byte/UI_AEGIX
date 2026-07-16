import React from 'react';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { StatCard } from '@/app/StatCard';
import { SectionHeader } from '../../security/components/SectionHeader';
import { Server, Database, Cpu, CheckCircle } from 'lucide-react';
import type { License } from '../types/administration';

const mockLicense: License = {
  version: 'v1.0.0',
  licenseKey: 'XXXX-XXXX-XXXX-XXXX',
  expiryDate: '2025-12-31',
  maxUsers: 500,
  maxDevices: 10000,
  features: ['assets', 'security', 'monitoring', 'orchestrator'],
};

export const LicensesPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6 pb-8">
          <SectionHeader title="Licensing" description="License and subscription management" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Platform Version"
              value={mockLicense.version}
              description="Current version"
              icon={<Server className="h-4 w-4 text-primary-400" />}
            />
            <StatCard
              title="Max Users"
              value={mockLicense.maxUsers}
              description="License limit"
              icon={<Database className="h-4 w-4 text-primary-400" />}
            />
            <StatCard
              title="Max Devices"
              value={mockLicense.maxDevices}
              description="License limit"
              icon={<Cpu className="h-4 w-4 text-primary-400" />}
            />
            <StatCard
              title="Expiry Date"
              value={mockLicense.expiryDate}
              description="License valid until"
              icon={<CheckCircle className="h-4 w-4 text-primary-400" />}
            />
          </div>

          <SectionContainer title="License Details">
            <div className="space-y-4">
              <div className="rounded-sm border border-neutral-800 bg-neutral-900 p-4">
                <p className="text-sm font-medium text-neutral-200">License Key</p>
                <p className="mt-1 font-mono text-xs text-neutral-400">{mockLicense.licenseKey}</p>
              </div>
              <div className="rounded-sm border border-neutral-800 bg-neutral-900 p-4">
                <p className="text-sm font-medium text-neutral-200">Features</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {mockLicense.features.map((feature) => (
                    <span key={feature} className="text-xs px-2 py-0.5 rounded-sm bg-primary-500/10 text-primary-400">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </SectionContainer>
        </div>
      </DashboardLayout>
    </DashboardContainer>
  );
};