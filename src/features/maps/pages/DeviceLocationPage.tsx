import React from 'react';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { StatCard } from '@/app/StatCard';
import { LocationTimeline } from '../components/MapsComponents';
import { SectionHeader } from '../../security/components/SectionHeader';
import { Map, Monitor, Clock, Shield, Lock, Activity } from 'lucide-react';
import type { DeviceLocation } from '../types/maps';

const mockDevice: DeviceLocation = {
  deviceId: 'dev-001',
  hostname: 'WS-ENG-001',
  latitude: 40.7128,
  longitude: -74.006,
  accuracy: 10,
  lastUpdate: '2024-01-15T10:30:00Z',
  status: 'online',
  building: 'HQ - NYC',
  floor: '3',
  room: '301',
};

const mockLocationHistory = [
  { timestamp: '2024-01-15T10:30:00Z', building: 'HQ - NYC', floor: '3', room: '301' },
  { timestamp: '2024-01-15T09:00:00Z', building: 'HQ - NYC', floor: '3', room: 'Lab A' },
  { timestamp: '2024-01-14T17:00:00Z', building: 'Data Center 1', floor: '1', room: 'Server Room' },
];

export const DeviceLocationPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6 pb-8">
          {/* Header */}
          <SectionHeader
            title="Device Location"
            description={`Location tracking for ${mockDevice.hostname}`}
          />

          {/* Device Summary */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Current Location"
              value={mockDevice.building || 'Unknown'}
              description={`${mockDevice.floor && `Floor ${mockDevice.floor}`}${mockDevice.room && ` - Room ${mockDevice.room}`}`}
              icon={<Map className="h-4 w-4 text-primary-400" />}
            />
            <StatCard
              title="Status"
              value="Active"
              description="Tracking status"
            />
            <StatCard
              title="Last Update"
              value={mockDevice.lastUpdate}
              description="Location timestamp"
              icon={<Clock className="h-4 w-4 text-primary-400" />}
            />
            <StatCard
              title="Accuracy"
              value={`${mockDevice.accuracy}m`}
              description="Location accuracy"
              icon={<Map className="h-4 w-4 text-primary-400" />}
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
                  <span className="text-xs text-primary-400">Enabled</span>
                </div>
              </div>
              <div className="rounded-sm border border-neutral-800 bg-neutral-900 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary-400" />
                    <span className="text-sm font-medium text-neutral-200">Secure Boot</span>
                  </div>
                  <span className="text-xs text-primary-400">Active</span>
                </div>
              </div>
              <div className="rounded-sm border border-neutral-800 bg-neutral-900 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-primary-400" />
                    <span className="text-sm font-medium text-neutral-200">Firewall</span>
                  </div>
                  <span className="text-xs text-primary-400">Active</span>
                </div>
              </div>
              <div className="rounded-sm border border-neutral-800 bg-neutral-900 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-primary-400" />
                    <span className="text-sm font-medium text-neutral-200">Agent</span>
                  </div>
                  <span className="text-xs text-primary-400">Online</span>
                </div>
              </div>
            </div>
          </SectionContainer>

          {/* Location Timeline */}
          <SectionContainer title="Location Timeline">
            <LocationTimeline locations={mockLocationHistory} />
          </SectionContainer>
        </div>
      </DashboardLayout>
    </DashboardContainer>
  );
};