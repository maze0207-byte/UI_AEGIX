import React from 'react';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { StatCard } from '@/app/StatCard';
import { StatusBadge } from '../components/StatusBadge';
import { SectionHeader } from '../components/SectionHeader';
import { FileText, Monitor, Database, Network, Code, Settings } from 'lucide-react';
import type { Evidence } from '../types/security';

interface EvidenceCardProps {
  evidence: Evidence;
}

const EvidenceCard: React.FC<EvidenceCardProps> = ({ evidence }) => {
  const typeIcons: Record<string, typeof FileText> = {
    file: FileText,
    process: Code,
    network: Network,
    registry: Settings,
    log: Database,
    memory: Monitor,
  };

  const Icon = typeIcons[evidence.type] || FileText;

  return (
    <div className="rounded-sm border border-neutral-800 bg-neutral-900 p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary-500/10">
            <Icon className="h-5 w-5 text-primary-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-200">{evidence.path}</p>
            <p className="text-xs text-neutral-500">{evidence.deviceName}</p>
          </div>
        </div>
        <StatusBadge status={evidence.status} />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-neutral-500">Type:</span>
          <span className="ml-1 text-neutral-300">{evidence.type}</span>
        </div>
        <div>
          <span className="text-neutral-500">Size:</span>
          <span className="ml-1 text-neutral-300">{(evidence.size / 1024).toFixed(2)} KB</span>
        </div>
        <div className="col-span-2">
          <span className="text-neutral-500">Hash:</span>
          <span className="ml-1 font-mono text-neutral-300">{evidence.hash}</span>
        </div>
      </div>
    </div>
  );
};

const mockEvidence: Evidence[] = [
  {
    id: '1',
    type: 'file',
    deviceId: 'dev-001',
    deviceName: 'WS-ENG-001',
    status: 'collected',
    collectedAt: '2024-01-15T10:30:00Z',
    size: 1024567,
    hash: 'a1b2c3d4e5f6',
    path: '/tmp/suspicious.exe',
    description: 'Suspicious executable file',
  },
  {
    id: '2',
    type: 'memory',
    deviceId: 'dev-002',
    deviceName: 'SRV-DC-001',
    status: 'analyzed',
    collectedAt: '2024-01-15T09:15:00Z',
    size: 512345,
    hash: 'f6e5d4c3b2a1',
    path: 'memory_dump_001',
    description: 'Memory dump for analysis',
  },
  {
    id: '3',
    type: 'network',
    deviceId: 'dev-003',
    deviceName: 'LAP-MKT-003',
    status: 'preserved',
    collectedAt: '2024-01-15T08:45:00Z',
    size: 2048,
    hash: '1a2b3c4d5e6f',
    path: 'pcap_capture_001.pcap',
    description: 'Network packet capture',
  },
  {
    id: '4',
    type: 'process',
    deviceId: 'dev-001',
    deviceName: 'WS-ENG-001',
    status: 'collected',
    collectedAt: '2024-01-15T07:00:00Z',
    size: 1024,
    hash: 'abcdef123456',
    path: 'suspicious_process',
    description: 'Malicious process tree',
  },
  {
    id: '5',
    type: 'registry',
    deviceId: 'dev-002',
    deviceName: 'SRV-DC-001',
    status: 'analyzed',
    collectedAt: '2024-01-15T06:30:00Z',
    size: 2048,
    hash: 'fedcba654321',
    path: 'HKLM\\Software\\Malware',
    description: 'Registry persistence entry',
  },
  {
    id: '6',
    type: 'log',
    deviceId: 'dev-003',
    deviceName: 'LAP-MKT-003',
    status: 'collected',
    collectedAt: '2024-01-15T05:00:00Z',
    size: 4096,
    hash: '123456abcdef',
    path: 'security.log',
    description: 'Windows event log',
  },
];

export const EvidenceCenterPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6 pb-8">
          {/* Header */}
          <SectionHeader title="Evidence Center" description="Collected and preserved digital evidence" />

          {/* Evidence Summary */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Evidence"
              value={mockEvidence.length}
              description="Items collected"
            />
            <StatCard
              title="Collected"
              value={mockEvidence.filter((e) => e.status === 'collected').length}
              description="Pending analysis"
            />
            <StatCard
              title="Analyzed"
              value={mockEvidence.filter((e) => e.status === 'analyzed').length}
              description="Under review"
            />
            <StatCard
              title="Preserved"
              value={mockEvidence.filter((e) => e.status === 'preserved').length}
              description="Ready for case"
            />
          </div>

          {/* Evidence by Type */}
          <SectionContainer title="Evidence by Type">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {['file', 'process', 'network', 'registry', 'log', 'memory'].map((type) => (
                <div key={type} className="rounded-sm border border-neutral-800 bg-neutral-900 p-4 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-500/10 mx-auto mb-2">
                    {type === 'file' && <FileText className="h-6 w-6 text-primary-400" />}
                    {type === 'process' && <Code className="h-6 w-6 text-primary-400" />}
                    {type === 'network' && <Network className="h-6 w-6 text-primary-400" />}
                    {type === 'registry' && <Settings className="h-6 w-6 text-primary-400" />}
                    {type === 'log' && <Database className="h-6 w-6 text-primary-400" />}
                    {type === 'memory' && <Monitor className="h-6 w-6 text-primary-400" />}
                  </div>
                  <p className="text-sm font-medium text-neutral-200 capitalize">{type}</p>
                  <p className="text-xs text-neutral-500">{mockEvidence.filter((e) => e.type === type).length} items</p>
                </div>
              ))}
            </div>
          </SectionContainer>

          {/* Evidence List */}
          <SectionContainer title="Evidence Items">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {mockEvidence.map((evidence) => (
                <EvidenceCard key={evidence.id} evidence={evidence} />
              ))}
            </div>
          </SectionContainer>
        </div>
      </DashboardLayout>
    </DashboardContainer>
  );
};