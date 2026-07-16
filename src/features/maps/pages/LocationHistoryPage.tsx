import React from 'react';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { StatCard } from '@/app/StatCard';
import { LocationHistoryTable } from '../components/MapsComponents';
import { SectionHeader } from '../../security/components/SectionHeader';
import { Map, Clock, Building } from 'lucide-react';

const mockHistory = [
  {
    timestamp: '2024-01-15T10:30:00Z',
    location: 'HQ - NYC, Floor 3, Room 301',
    entryTime: '09:00 AM',
    exitTime: '05:00 PM',
    duration: '8 hours',
  },
  {
    timestamp: '2024-01-15T09:00:00Z',
    location: 'HQ - NYC, Floor 3, Lab A',
    entryTime: '08:00 AM',
    exitTime: '09:00 AM',
    duration: '1 hour',
  },
  {
    timestamp: '2024-01-14T17:00:00Z',
    location: 'Data Center 1, Server Room',
    entryTime: '02:00 PM',
    exitTime: '05:00 PM',
    duration: '3 hours',
  },
];

export const LocationHistoryPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6 pb-8">
          {/* Header */}
          <SectionHeader
            title="Location History"
            description="Device movement and location tracking history"
          />

          {/* Summary */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Events"
              value={mockHistory.length}
              description="Location changes"
              icon={<Map className="h-4 w-4 text-primary-400" />}
            />
            <StatCard
              title="Unique Locations"
              value={3}
              description="Visited places"
              icon={<Building className="h-4 w-4 text-primary-400" />}
            />
            <StatCard
              title="Total Time"
              value="12 hours"
              description="Tracking period"
              icon={<Clock className="h-4 w-4 text-primary-400" />}
            />
            <StatCard
              title="Avg Duration"
              value="4 hours"
              description="Per location"
              icon={<Clock className="h-4 w-4 text-primary-400" />}
            />
          </div>

          {/* Location History Table */}
          <SectionContainer title="Movement Timeline">
            <LocationHistoryTable history={mockHistory} />
          </SectionContainer>
        </div>
      </DashboardLayout>
    </DashboardContainer>
  );
};