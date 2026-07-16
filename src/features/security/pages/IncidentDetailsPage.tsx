import React from 'react';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { StatCard } from '@/app/StatCard';
import { RiskIndicator } from '../components/RiskIndicator';
import { PriorityBadge } from '../components/PriorityBadge';
import { StatusBadge } from '../components/StatusBadge';
import { SectionHeader } from '../components/SectionHeader';
import { ArrowLeft, Shield, FileText, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { SecurityIncident } from '../types/security';

const mockIncident: SecurityIncident = {
  id: '1',
  title: 'Ransomware Activity',
  description: 'Potential ransomware encryption detected on endpoint WS-ENG-001',
  status: 'investigating',
  priority: 'critical',
  severity: 'critical',
  assignedTo: 'Analyst 1',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T11:30:00Z',
  deviceIds: ['dev-001'],
  alertIds: ['alert-001'],
};

const mockTimeline = [
  { id: '1', time: '10:00 AM', action: 'Incident Created', user: 'System' },
  { id: '2', time: '10:15 AM', action: 'Assigned to Analyst 1', user: 'SOC Lead' },
  { id: '3', time: '10:30 AM', action: 'Investigation Started', user: 'Analyst 1' },
  { id: '4', time: '11:00 AM', action: 'Evidence Collected', user: 'Analyst 1' },
];

export const IncidentDetailsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6 pb-8">
          {/* Header */}
          <SectionHeader
            title="Incident Details"
            description="Detailed view of security incident"
            action={
              <button
                onClick={() => navigate('/security/incidents')}
                className="flex items-center gap-2 rounded-sm border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Incidents
              </button>
            }
          />

          {/* Incident Summary */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Priority"
              value={<PriorityBadge priority={mockIncident.priority} />}
              description="Incident priority level"
            />
            <StatCard
              title="Status"
              value={<StatusBadge status={mockIncident.status} />}
              description="Current incident status"
            />
            <StatCard
              title="Assigned To"
              value={mockIncident.assignedTo ?? 'Unassigned'}
              description="Incident owner"
            />
            <StatCard
              title="Devices"
              value={`${mockIncident.deviceIds.length} device(s)`}
              description="Affected endpoints"
            />
          </div>

          {/* Incident Information */}
          <SectionContainer title="Incident Information">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-neutral-400">Title</p>
                <p className="text-sm text-neutral-200">{mockIncident.title}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-neutral-400">Created</p>
                <p className="text-sm text-neutral-200">{mockIncident.createdAt}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs font-medium text-neutral-400">Description</p>
                <p className="text-sm text-neutral-200">{mockIncident.description}</p>
              </div>
            </div>
          </SectionContainer>

          {/* Related Alerts */}
          <SectionContainer title="Related Alerts">
            <div className="space-y-2">
              {mockIncident.alertIds.map((alertId) => (
                <div key={alertId} className="flex items-center justify-between rounded-sm border border-neutral-800 bg-neutral-950 p-3">
                  <div>
                    <p className="text-sm font-medium text-neutral-200">Suspicious Process Detected</p>
                    <p className="text-xs text-neutral-500">WS-ENG-001 - 2 hours ago</p>
                  </div>
                  <RiskIndicator level="critical" score={95} />
                </div>
              ))}
            </div>
          </SectionContainer>

          {/* Incident Timeline */}
          <SectionContainer title="Incident Timeline">
            <div className="space-y-3">
              {mockTimeline.map((event) => (
                <div key={event.id} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500/10">
                    <Clock className="h-3 w-3 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-200">{event.action}</p>
                    <p className="text-xs text-neutral-500">{event.time} by {event.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionContainer>

          {/* Actions */}
          <SectionContainer title="Incident Actions">
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 rounded-sm bg-primary-500/20 px-4 py-2 text-sm font-medium text-primary-400 hover:bg-primary-500/30">
                <Shield className="h-4 w-4" />
                Containment
              </button>
              <button className="flex items-center gap-2 rounded-sm border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800">
                <CheckCircle className="h-4 w-4" />
                Resolve
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