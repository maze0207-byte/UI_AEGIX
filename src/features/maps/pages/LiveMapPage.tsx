import React, { useState } from 'react';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { MapWidget, MapToolbar, DeviceMarker } from '../components/MapsComponents';
import { SectionHeader } from '../../security/components/SectionHeader';
import { RefreshCw } from 'lucide-react';
import type { DeviceLocation, MapFilters } from '../types/maps';

const mockDevices: DeviceLocation[] = [
  {
    deviceId: '1',
    hostname: 'WS-ENG-001',
    latitude: 40.7128,
    longitude: -74.006,
    accuracy: 10,
    lastUpdate: '2024-01-15T10:30:00Z',
    status: 'online',
    building: 'HQ - NYC',
    floor: '3',
    room: '301',
  },
  {
    deviceId: '2',
    hostname: 'WS-ENG-002',
    latitude: 40.7130,
    longitude: -74.007,
    accuracy: 15,
    lastUpdate: '2024-01-15T10:25:00Z',
    status: 'online',
    building: 'HQ - NYC',
    floor: '3',
    room: '302',
  },
  {
    deviceId: '3',
    hostname: 'SRV-DC-001',
    latitude: 40.7135,
    longitude: -74.008,
    accuracy: 5,
    lastUpdate: '2024-01-15T10:00:00Z',
    status: 'online',
    building: 'Data Center 1',
    floor: '1',
    room: 'Server Room',
  },
  {
    deviceId: '4',
    hostname: 'LAP-MKT-003',
    latitude: 40.7140,
    longitude: -74.009,
    accuracy: 20,
    lastUpdate: '2024-01-15T09:00:00Z',
    status: 'offline',
    building: 'HQ - NYC',
    floor: '2',
    room: '205',
  },
];

export const LiveMapPage: React.FC = () => {
  const [filters, setFilters] = useState<MapFilters>({
    search: '',
    department: '',
    building: '',
    lab: '',
    status: 'all',
    operatingSystem: '',
    deviceType: '',
    trackingStatus: 'all',
    riskScore: '',
  });

  const handleSearch = (value: string) => {
    setFilters({ ...filters, search: value });
  };

  const handleFilter = () => {
    // TODO: Open filter panel
  };

  const handleFullscreen = () => {
    // TODO: Enter fullscreen mode
  };

  const handleRefresh = () => {
    // TODO: Refresh device locations
  };

  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6 pb-8">
          {/* Header */}
          <SectionHeader
            title="Live Map"
            description="Real-time asset location tracking"
            action={
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 rounded-sm border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Refresh
              </button>
            }
          />

          {/* Map Toolbar */}
          <MapToolbar
            onSearch={handleSearch}
            onFilter={handleFilter}
            onFullscreen={handleFullscreen}
          />

          {/* Map */}
          <SectionContainer title="Live Tracking Map" className="p-0">
            <MapWidget
              devices={mockDevices.map((d) => ({
                id: d.deviceId,
                hostname: d.hostname,
                latitude: d.latitude,
                longitude: d.longitude,
                status: d.status,
              }))}
            />
          </SectionContainer>

          {/* Device List */}
          <SectionContainer title="Tracked Devices">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {mockDevices.map((device) => (
                <DeviceMarker
                  key={device.deviceId}
                  hostname={device.hostname}
                  status={device.status}
                />
              ))}
            </div>
          </SectionContainer>
        </div>
      </DashboardLayout>
    </DashboardContainer>
  );
};