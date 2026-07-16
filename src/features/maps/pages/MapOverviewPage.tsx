import React from 'react';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { StatCard } from '@/app/StatCard';
import { WidgetGrid } from '../../dashboard/components/WidgetGrid';
import { MapWidget } from '../components/MapsComponents';
import { SectionHeader } from '../../security/components/SectionHeader';
import { Map } from 'lucide-react';
import type { MapOverview } from '../types/maps';

const mockOverview: MapOverview = {
  totalDevices: 1250,
  onlineDevices: 1180,
  offlineDevices: 70,
  devicesWithLocation: 950,
  unknownLocation: 300,
  buildingsSummary: [
    { building: 'HQ - NYC', deviceCount: 450, onlineCount: 420 },
    { building: 'HQ - LA', deviceCount: 320, onlineCount: 300 },
    { building: 'Branch - Chicago', deviceCount: 280, onlineCount: 260 },
    { building: 'Data Center 1', deviceCount: 200, onlineCount: 200 },
  ],
  labsSummary: [
    { lab: 'Lab A', deviceCount: 45, status: 'operational' },
    { lab: 'Lab B', deviceCount: 32, status: 'operational' },
    { lab: 'Lab C', deviceCount: 28, status: 'maintenance' },
  ],
  departmentsSummary: [
    { department: 'Engineering', deviceCount: 520, onlineCount: 490 },
    { department: 'Marketing', deviceCount: 280, onlineCount: 260 },
    { department: 'Sales', deviceCount: 200, onlineCount: 190 },
    { department: 'Operations', deviceCount: 150, onlineCount: 130 },
    { department: 'HR', deviceCount: 100, onlineCount: 100 },
  ],
  recentLocationChanges: [
    { deviceId: 'dev-001', deviceName: 'WS-ENG-001', fromLocation: 'HQ - NYC', toLocation: 'Branch - Chicago', timestamp: '2 hours ago' },
    { deviceId: 'dev-002', deviceName: 'SRV-DC-001', fromLocation: 'Data Center 1', toLocation: 'HQ - NYC', timestamp: '4 hours ago' },
  ],
};

const mockDevices = [
  { id: '1', hostname: 'WS-ENG-001', latitude: 40.7128, longitude: -74.006, status: 'online' as const },
  { id: '2', hostname: 'WS-ENG-002', latitude: 40.7130, longitude: -74.007, status: 'online' as const },
  { id: '3', hostname: 'SRV-DC-001', latitude: 40.7135, longitude: -74.008, status: 'online' as const },
];

export const MapOverviewPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6 pb-8">
          {/* Header */}
          <SectionHeader
            title="Asset Tracking Center"
            description="Enterprise asset location and tracking overview"
          />

          {/* Summary Stats */}
          <WidgetGrid>
            <StatCard
              title="Total Devices"
              value={mockOverview.totalDevices}
              description="All tracked assets"
              icon={<Map className="h-4 w-4 text-primary-400" />}
            />
            <StatCard
              title="Online Devices"
              value={mockOverview.onlineDevices}
              description="Active connections"
              icon={<Map className="h-4 w-4 text-primary-400" />}
            />
            <StatCard
              title="Offline Devices"
              value={mockOverview.offlineDevices}
              description="No connection"
              icon={<Map className="h-4 w-4 text-neutral-400" />}
            />
            <StatCard
              title="With Location"
              value={mockOverview.devicesWithLocation}
              description="Geolocation available"
              icon={<Map className="h-4 w-4 text-primary-400" />}
            />
          </WidgetGrid>

          {/* Map Widget */}
          <SectionContainer title="Enterprise Map">
            <MapWidget devices={mockDevices} />
          </SectionContainer>

          {/* Buildings Summary */}
          <SectionContainer title="Buildings Summary">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {mockOverview.buildingsSummary.map((building) => (
                <div key={building.building} className="rounded-sm border border-neutral-800 bg-neutral-900 p-4">
                  <h3 className="text-sm font-medium text-neutral-200">{building.building}</h3>
                  <p className="text-xs text-neutral-500">{building.deviceCount} devices</p>
                  <p className="text-xs text-primary-400">{building.onlineCount} online</p>
                </div>
              ))}
            </div>
          </SectionContainer>

          {/* Labs Summary */}
          <SectionContainer title="Labs Summary">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mockOverview.labsSummary.map((lab) => (
                <div key={lab.lab} className="rounded-sm border border-neutral-800 bg-neutral-900 p-4">
                  <h3 className="text-sm font-medium text-neutral-200">{lab.lab}</h3>
                  <p className="text-xs text-neutral-500">{lab.deviceCount} devices</p>
                  <p className="text-xs text-primary-400">{lab.status}</p>
                </div>
              ))}
            </div>
          </SectionContainer>

          {/* Departments Summary */}
          <SectionContainer title="Departments Summary">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {mockOverview.departmentsSummary.map((dept) => (
                <div key={dept.department} className="rounded-sm border border-neutral-800 bg-neutral-900 p-4 text-center">
                  <p className="text-sm font-medium text-neutral-200">{dept.department}</p>
                  <p className="text-xs text-neutral-500">{dept.deviceCount} devices</p>
                  <p className="text-xs text-primary-400">{dept.onlineCount} online</p>
                </div>
              ))}
            </div>
          </SectionContainer>

          {/* Recent Location Changes */}
          <SectionContainer title="Recent Location Changes">
            <div className="space-y-2">
              {mockOverview.recentLocationChanges.map((change) => (
                <div key={change.deviceId} className="flex items-center justify-between rounded-sm border border-neutral-800 bg-neutral-950 p-3">
                  <div>
                    <p className="text-sm font-medium text-neutral-200">{change.deviceName}</p>
                    <p className="text-xs text-neutral-500">
                      {change.fromLocation} → {change.toLocation}
                    </p>
                  </div>
                  <p className="text-xs text-neutral-500">{change.timestamp}</p>
                </div>
              ))}
            </div>
          </SectionContainer>
        </div>
      </DashboardLayout>
    </DashboardContainer>
  );
};