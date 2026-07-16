import React from 'react';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { StatCard } from '@/app/StatCard';
import { SectionHeader } from '../../security/components/SectionHeader';
import { FlaskConical, Monitor, AlertTriangle } from 'lucide-react';
import type { Lab } from '../types/maps';

const mockLabs: Lab[] = [
  {
    id: '1',
    name: 'Lab A',
    department: 'Engineering',
    building: 'HQ - NYC',
    room: '301',
    capacity: 50,
    assignedDevices: 45,
    currentStatus: 'operational',
    responsibleUser: 'Dr. Smith',
  },
  {
    id: '2',
    name: 'Lab B',
    department: 'Engineering',
    building: 'HQ - NYC',
    room: '302',
    capacity: 40,
    assignedDevices: 32,
    currentStatus: 'operational',
    responsibleUser: 'Dr. Johnson',
  },
  {
    id: '3',
    name: 'Lab C',
    department: 'Research',
    building: 'HQ - LA',
    room: '201',
    capacity: 30,
    assignedDevices: 28,
    currentStatus: 'maintenance',
    responsibleUser: 'Dr. Williams',
  },
];

export const LabsPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6 pb-8">
          {/* Header */}
          <SectionHeader
            title="Labs"
            description="Enterprise laboratory management and asset tracking"
          />

          {/* Summary */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Labs"
              value={mockLabs.length}
              description="Managed laboratories"
              icon={<FlaskConical className="h-4 w-4 text-primary-400" />}
            />
            <StatCard
              title="Total Devices"
              value={mockLabs.reduce((sum, l) => sum + l.assignedDevices, 0)}
              description="Assigned assets"
              icon={<Monitor className="h-4 w-4 text-primary-400" />}
            />
            <StatCard
              title="Operational"
              value={mockLabs.filter((l) => l.currentStatus === 'operational').length}
              description="Active labs"
              icon={<FlaskConical className="h-4 w-4 text-primary-400" />}
            />
            <StatCard
              title="Maintenance"
              value={mockLabs.filter((l) => l.currentStatus === 'maintenance').length}
              description="Under maintenance"
              icon={<AlertTriangle className="h-4 w-4 text-warning-500" />}
            />
          </div>

          {/* Labs Grid */}
          <SectionContainer title="Laboratories">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {mockLabs.map((lab) => (
                <div key={lab.id} className="rounded-sm border border-neutral-800 bg-neutral-900 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-neutral-200">{lab.name}</h3>
                      <p className="text-sm text-neutral-500">{lab.department}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-neutral-200">{lab.building}</p>
                      <p className="text-xs text-neutral-500">Room {lab.room}</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-neutral-500">Capacity</p>
                      <p className="text-sm font-medium text-neutral-200">{lab.capacity}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500">Assigned</p>
                      <p className="text-sm font-medium text-primary-400">{lab.assignedDevices}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-neutral-500">Responsible: {lab.responsibleUser}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionContainer>
        </div>
      </DashboardLayout>
    </DashboardContainer>
  );
};