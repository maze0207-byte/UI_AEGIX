import React from 'react';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { StatCard } from '@/app/StatCard';
import { GeofenceCard } from '../components/MapsComponents';
import { SectionHeader } from '../../security/components/SectionHeader';
import { Shield, Map } from 'lucide-react';
import type { Geofence } from '../types/maps';

const mockGeofences: Geofence[] = [
  {
    id: '1',
    name: 'HQ - NYC Perimeter',
    type: 'building',
    coordinates: [
      [40.7128, -74.006],
      [40.7130, -74.006],
      [40.7130, -74.005],
      [40.7128, -74.005],
    ],
    assignedDevices: ['dev-001', 'dev-002', 'dev-003'],
    policies: ['entry-alert', 'exit-alert'],
    entryEvents: 156,
    exitEvents: 142,
    violationHistory: [],
  },
  {
    id: '2',
    name: 'Lab A Zone',
    type: 'lab',
    coordinates: [
      [40.7128, -74.006],
      [40.7129, -74.006],
      [40.7129, -74.0055],
      [40.7128, -74.0055],
    ],
    assignedDevices: ['dev-001', 'dev-002'],
    policies: ['restricted-access'],
    entryEvents: 45,
    exitEvents: 42,
    violationHistory: [],
  },
  {
    id: '3',
    name: 'Data Center Restricted',
    type: 'custom',
    coordinates: [
      [40.7135, -74.008],
      [40.7136, -74.008],
      [40.7136, -74.007],
      [40.7135, -74.007],
    ],
    assignedDevices: ['dev-003'],
    policies: ['high-security'],
    entryEvents: 12,
    exitEvents: 10,
    violationHistory: [],
  },
];

export const GeofencesPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6 pb-8">
          {/* Header */}
          <SectionHeader
            title="Geofences"
            description="Location-based security boundaries and policies"
          />

          {/* Summary */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Geofences"
              value={mockGeofences.length}
              description="Active boundaries"
              icon={<Shield className="h-4 w-4 text-primary-400" />}
            />
            <StatCard
              title="Building Zones"
              value={mockGeofences.filter((g) => g.type === 'building').length}
              description="Building perimeters"
              icon={<Map className="h-4 w-4 text-primary-400" />}
            />
            <StatCard
              title="Lab Zones"
              value={mockGeofences.filter((g) => g.type === 'lab').length}
              description="Laboratory boundaries"
              icon={<Map className="h-4 w-4 text-primary-400" />}
            />
            <StatCard
              title="Custom Zones"
              value={mockGeofences.filter((g) => g.type === 'custom').length}
              description="Custom boundaries"
              icon={<Map className="h-4 w-4 text-primary-400" />}
            />
          </div>

          {/* Geofences Grid */}
          <SectionContainer title="Geofence List">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {mockGeofences.map((geofence) => (
                <GeofenceCard
                  key={geofence.id}
                  geofence={{
                    id: geofence.id,
                    name: geofence.name,
                    type: geofence.type,
                    assignedDevices: geofence.assignedDevices.length,
                    entryEvents: geofence.entryEvents,
                    exitEvents: geofence.exitEvents,
                  }}
                />
              ))}
            </div>
          </SectionContainer>
        </div>
      </DashboardLayout>
    </DashboardContainer>
  );
};