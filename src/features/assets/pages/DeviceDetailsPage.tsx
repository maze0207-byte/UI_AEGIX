import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Laptop, 
  Monitor, 
  Network, 
  Package, 
  Users, 
  Activity, 
  Shield, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Terminal, 
  FileText,
  ChevronLeft,
} from 'lucide-react';
import { DetailSection } from '@/app/DetailSection';
import { DetailItem } from '@/app/DetailItem';
import { StatusBadge, HealthBadge, RiskBadge, ComplianceBadge, AgentStatusBadge } from '../components/badges/AssetBadges';

type DeviceDetailTab = 
  | 'overview'
  | 'hardware'
  | 'operating-system'
  | 'network'
  | 'installed-software'
  | 'users'
  | 'processes'
  | 'services'
  | 'monitoring'
  | 'security'
  | 'alerts'
  | 'evidence'
  | 'commands'
  | 'timeline'
  | 'location';

const TABS: { id: DeviceDetailTab; label: string; icon: typeof Laptop }[] = [
  { id: 'overview', label: 'Overview', icon: Laptop },
  { id: 'hardware', label: 'Hardware', icon: Monitor },
  { id: 'operating-system', label: 'Operating System', icon: Monitor },
  { id: 'network', label: 'Network', icon: Network },
  { id: 'installed-software', label: 'Installed Software', icon: Package },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'processes', label: 'Processes', icon: Activity },
  { id: 'services', label: 'Services', icon: Activity },
  { id: 'monitoring', label: 'Monitoring', icon: Monitor },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
  { id: 'evidence', label: 'Evidence', icon: FileText },
  { id: 'commands', label: 'Commands', icon: Terminal },
  { id: 'timeline', label: 'Timeline', icon: Clock },
  { id: 'location', label: 'Location', icon: MapPin },
];

const PlaceholderContent: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex h-48 items-center justify-center rounded border border-dashed border-neutral-700 bg-neutral-900/50 text-xs text-neutral-500">
    [{label}]
  </div>
);

export const DeviceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<DeviceDetailTab>('overview');

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/assets/devices')}
          className="rounded-sm border border-neutral-700 bg-neutral-900 p-2 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-100">
            Device: {id}
          </h1>
          <p className="text-sm text-neutral-400">Enterprise Asset Profile</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-neutral-800">
        <div className="flex items-center gap-1 overflow-x-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-t-sm border border-b-0 border-neutral-800 px-4 py-2 text-sm transition-colors ${
                  isActive
                    ? 'border-primary-500/50 bg-neutral-900 text-primary-400'
                    : 'border-transparent text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex flex-col gap-6">
        {activeTab === 'overview' && (
          <>
            <DetailSection title="Device Identity">
              <DetailItem label="Hostname">LPT-DEV-{id}</DetailItem>
              <DetailItem label="Device Name">Workstation {id}</DetailItem>
              <DetailItem label="Serial Number">SN-{id}-XXXX</DetailItem>
              <DetailItem label="Manufacturer">Dell Inc.</DetailItem>
              <DetailItem label="Model">OptiPlex 7090</DetailItem>
            </DetailSection>

            <DetailSection title="Device Status">
              <div className="flex items-center gap-4">
                <StatusBadge status="online" />
                <HealthBadge health="good" />
                <RiskBadge risk="low" />
                <ComplianceBadge compliance="compliant" />
              </div>
            </DetailSection>

            <DetailSection title="Assigned User">
              <DetailItem label="User">John Smith</DetailItem>
              <DetailItem label="Email">john.smith@company.com</DetailItem>
              <DetailItem label="Department">Engineering</DetailItem>
            </DetailSection>

            <DetailSection title="Location">
              <DetailItem label="Building">HQ - NYC</DetailItem>
              <DetailItem label="Floor">5th Floor</DetailItem>
              <DetailItem label="Office">5A-124</DetailItem>
            </DetailSection>

            <DetailSection title="Agent Status">
              <AgentStatusBadge status="installed" />
              <DetailItem label="Agent Version">1.2.3</DetailItem>
              <DetailItem label="Last Check-in">2024-01-15 14:30:00</DetailItem>
            </DetailSection>
          </>
        )}

        {activeTab === 'hardware' && (
          <DetailSection title="Hardware Information">
            <DetailItem label="CPU">Intel Core i7-10700</DetailItem>
            <DetailItem label="RAM">16 GB DDR4</DetailItem>
            <DetailItem label="Storage">512 GB SSD</DetailItem>
            <DetailItem label="GPU">Intel UHD Graphics 630</DetailItem>
          </DetailSection>
        )}

        {activeTab === 'operating-system' && (
          <DetailSection title="Operating System">
            <DetailItem label="OS">Windows 11 Pro</DetailItem>
            <DetailItem label="Version">22H2</DetailItem>
            <DetailItem label="Build">22621.2715</DetailItem>
            <DetailItem label="Install Date">2023-06-15</DetailItem>
          </DetailSection>
        )}

        {activeTab === 'network' && (
          <DetailSection title="Network Information">
            <DetailItem label="IP Address">192.168.1.100</DetailItem>
            <DetailItem label="MAC Address">00:1A:2B:3C:4D:5E</DetailItem>
            <DetailItem label="Subnet">192.168.1.0/24</DetailItem>
            <DetailItem label="Gateway">192.168.1.1</DetailItem>
          </DetailSection>
        )}

        {activeTab === 'installed-software' && (
          <PlaceholderContent label="Installed Software List" />
        )}

        {activeTab === 'users' && (
          <PlaceholderContent label="User Accounts" />
        )}

        {activeTab === 'processes' && (
          <PlaceholderContent label="Running Processes" />
        )}

        {activeTab === 'services' && (
          <PlaceholderContent label="System Services" />
        )}

        {activeTab === 'monitoring' && (
          <PlaceholderContent label="Monitoring Data" />
        )}

        {activeTab === 'security' && (
          <PlaceholderContent label="Security Information" />
        )}

        {activeTab === 'alerts' && (
          <PlaceholderContent label="Device Alerts" />
        )}

        {activeTab === 'evidence' && (
          <PlaceholderContent label="Evidence Collection" />
        )}

        {activeTab === 'commands' && (
          <PlaceholderContent label="Command History" />
        )}

        {activeTab === 'timeline' && (
          <PlaceholderContent label="Event Timeline" />
        )}

        {activeTab === 'location' && (
          <PlaceholderContent label="Location Map" />
        )}
      </div>
    </div>
  );
};