import React from 'react';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { StatCard } from '@/app/StatCard';
import { SecurityScoreCard } from '../components/SecurityScoreCard';
import { RiskIndicator } from '../components/RiskIndicator';
import { SeverityBadge } from '../components/SeverityBadge';
import { StatusBadge } from '../components/StatusBadge';
import { SectionHeader } from '../components/SectionHeader';
import { ArrowLeft, Shield, AlertTriangle, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { SecurityAlert } from '../types/security';

const mockAlert: SecurityAlert = {
  id: '1',
  title: 'Suspicious Process Detected',
  description: 'Unknown process running with elevated privileges on endpoint WS-ENG-001',
  severity: 'critical',
  status: 'open',
  deviceId: 'dev-001',
  deviceName: 'WS-ENG-001',
  timestamp: '2024-01-15T10:30:00Z',
  source: 'EDR',
  ruleId: 'rule-001',
  ruleName: 'Suspicious Process',
};

export const AlertDetailsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6 pb-8">
          {/* Header */}
          <SectionHeader
            title="Alert Details"
            description="Detailed view of security alert"
            action={
              <button
                onClick={() => navigate('/security/alerts')}
                className="flex items-center gap-2 rounded-sm border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Alerts
              </button>
            }
          />

          {/* Alert Summary */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Severity"
              value={<SeverityBadge severity={mockAlert.severity} />}
              description="Alert severity level"
            />
            <StatCard
              title="Status"
              value={<StatusBadge status={mockAlert.status} />}
              description="Current alert status"
            />
            <StatCard
              title="Device"
              value={mockAlert.deviceName}
              description="Affected endpoint"
            />
            <StatCard
              title="Source"
              value={mockAlert.source}
              description="Detection source"
            />
          </div>

          {/* Alert Information */}
          <SectionContainer title="Alert Information">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-neutral-400">Title</p>
                <p className="text-sm text-neutral-200">{mockAlert.title}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-neutral-400">Rule</p>
                <p className="text-sm text-neutral-200">{mockAlert.ruleName}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs font-medium text-neutral-400">Description</p>
                <p className="text-sm text-neutral-200">{mockAlert.description}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-neutral-400">Timestamp</p>
                <p className="text-sm text-neutral-200">{mockAlert.timestamp}</p>
              </div>
            </div>
          </SectionContainer>

          {/* Device Security Profile */}
          <SectionContainer title="Device Security Profile">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <SecurityScoreCard
                score={78}
                level="fair"
                trend="down"
                lastUpdated="1 hour ago"
              />
              <StatCard
                title="Risk Score"
                value={<RiskIndicator level="high" score={85} />}
                description="Overall risk assessment"
              />
              <StatCard
                title="BitLocker"
                value="Enabled"
                description="Encryption status"
              />
              <StatCard
                title="Antivirus"
                value="Active"
                description="Protection status"
              />
            </div>
          </SectionContainer>

          {/* Actions */}
          <SectionContainer title="Alert Actions">
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 rounded-sm bg-primary-500/20 px-4 py-2 text-sm font-medium text-primary-400 hover:bg-primary-500/30">
                <Shield className="h-4 w-4" />
                Acknowledge
              </button>
              <button className="flex items-center gap-2 rounded-sm border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800">
                <AlertTriangle className="h-4 w-4" />
                Escalate
              </button>
              <button className="flex items-center gap-2 rounded-sm border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800">
                <FileText className="h-4 w-4" />
                Add Note
              </button>
            </div>
          </SectionContainer>
        </div>
      </DashboardLayout>
    </DashboardContainer>
  );
};