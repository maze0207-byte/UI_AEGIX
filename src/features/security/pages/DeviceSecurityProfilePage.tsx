import React from 'react';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { StatCard } from '@/app/StatCard';
import { SecurityScoreCard } from '../components/SecurityScoreCard';
import { RiskIndicator } from '../components/RiskIndicator';
import { SectionHeader } from '../components/SectionHeader';
import { Shield, Lock, Monitor, Activity, CheckCircle, XCircle } from 'lucide-react';
import type { TopRiskDevice } from '../types/security';

const mockDevice: TopRiskDevice = {
  id: 'dev-001',
  hostname: 'WS-ENG-001',
  riskScore: 85,
  riskLevel: 'critical',
  department: 'Engineering',
  building: 'HQ - NYC',
  lastSeen: '2024-01-15T10:30:00Z',
};

export const DeviceSecurityProfilePage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6 pb-8">
          {/* Header */}
          <SectionHeader
            title="Device Security Profile"
            description={`Security analysis for ${mockDevice.hostname}`}
          />

          {/* Security Score & Risk */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SecurityScoreCard
              score={78}
              level="fair"
              trend="down"
              lastUpdated="1 hour ago"
            />
            <StatCard
              title="Risk Score"
              value={<RiskIndicator level={mockDevice.riskLevel} score={mockDevice.riskScore} />}
              description="Overall risk assessment"
            />
            <StatCard
              title="Department"
              value={mockDevice.department}
              description="Device location"
            />
            <StatCard
              title="Building"
              value={mockDevice.building}
              description="Physical location"
            />
          </div>

          {/* Security Controls */}
          <SectionContainer title="Security Controls">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-sm border border-neutral-800 bg-neutral-900 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-primary-400" />
                    <span className="text-sm font-medium text-neutral-200">BitLocker</span>
                  </div>
                  <CheckCircle className="h-4 w-4 text-primary-500" />
                </div>
                <p className="mt-2 text-xs text-neutral-500">Encryption enabled</p>
              </div>
              <div className="rounded-sm border border-neutral-800 bg-neutral-900 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary-400" />
                    <span className="text-sm font-medium text-neutral-200">Secure Boot</span>
                  </div>
                  <CheckCircle className="h-4 w-4 text-primary-500" />
                </div>
                <p className="mt-2 text-xs text-neutral-500">UEFI Secure Boot active</p>
              </div>
              <div className="rounded-sm border border-neutral-800 bg-neutral-900 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-primary-400" />
                    <span className="text-sm font-medium text-neutral-200">TPM</span>
                  </div>
                  <CheckCircle className="h-4 w-4 text-primary-500" />
                </div>
                <p className="mt-2 text-xs text-neutral-500">TPM 2.0 present</p>
              </div>
              <div className="rounded-sm border border-neutral-800 bg-neutral-900 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-primary-400" />
                    <span className="text-sm font-medium text-neutral-200">Firewall</span>
                  </div>
                  <XCircle className="h-4 w-4 text-danger-500" />
                </div>
                <p className="mt-2 text-xs text-neutral-500">Firewall disabled</p>
              </div>
            </div>
          </SectionContainer>

          {/* Security Metrics */}
          <SectionContainer title="Security Metrics">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Alert Count"
                value={12}
                description="Active alerts"
              />
              <StatCard
                title="Incident Count"
                value={2}
                description="Related incidents"
              />
              <StatCard
                title="Evidence Count"
                value={5}
                description="Collected items"
              />
              <StatCard
                title="Agent Status"
                value="Online"
                description="Last seen 2 hours ago"
              />
            </div>
          </SectionContainer>

          {/* Recent Alerts */}
          <SectionContainer title="Recent Alerts">
            <div className="space-y-2">
              {[
                { id: '1', title: 'Suspicious Process', severity: 'critical' as const, time: '2 hours ago' },
                { id: '2', title: 'Network Anomaly', severity: 'high' as const, time: '4 hours ago' },
                { id: '3', title: 'Failed Login', severity: 'medium' as const, time: '1 day ago' },
              ].map((alert) => (
                <div key={alert.id} className="flex items-center justify-between rounded-sm border border-neutral-800 bg-neutral-950 p-3">
                  <div>
                    <p className="text-sm font-medium text-neutral-200">{alert.title}</p>
                    <p className="text-xs text-neutral-500">{alert.time}</p>
                  </div>
                  <RiskIndicator level={alert.severity} score={alert.severity === 'critical' ? 95 : alert.severity === 'high' ? 75 : 50} />
                </div>
              ))}
            </div>
          </SectionContainer>
        </div>
      </DashboardLayout>
    </DashboardContainer>
  );
};