import React from 'react';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { StatCard } from '@/app/StatCard';
import { SectionHeader } from '../../security/components/SectionHeader';
import { Building as BuildingIcon, Monitor, AlertTriangle } from 'lucide-react';
import type { Building } from '../types/maps';

const mockBuildings: Building[] = [
  {
    id: '1',
    name: 'HQ - NYC',
    address: '123 Main Street, New York, NY',
    floors: 10,
    departments: ['Engineering', 'Marketing', 'Sales', 'HR'],
    totalDevices: 450,
    onlineDevices: 420,
    offlineDevices: 30,
  },
  {
    id: '2',
    name: 'HQ - LA',
    address: '456 Sunset Blvd, Los Angeles, CA',
    floors: 8,
    departments: ['Engineering', 'Sales'],
    totalDevices: 320,
    onlineDevices: 300,
    offlineDevices: 20,
  },
  {
    id: '3',
    name: 'Branch - Chicago',
    address: '789 Michigan Ave, Chicago, IL',
    floors: 5,
    departments: ['Sales', 'HR'],
    totalDevices: 280,
    onlineDevices: 260,
    offlineDevices: 20,
  },
  {
    id: '4',
    name: 'Data Center 1',
    address: '101 Server Lane, New York, NY',
    floors: 2,
    departments: ['Operations'],
    totalDevices: 200,
    onlineDevices: 200,
    offlineDevices: 0,
  },
];

export const BuildingsPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6 pb-8">
          {/* Header */}
          <SectionHeader
            title="Buildings"
            description="Enterprise building management and asset tracking"
          />

          {/* Summary */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Buildings"
              value={mockBuildings.length}
              description="Managed locations"
              icon={<BuildingIcon className="h-4 w-4 text-primary-400" />}
            />
            <StatCard
              title="Total Devices"
              value={mockBuildings.reduce((sum, b) => sum + b.totalDevices, 0)}
              description="All building assets"
              icon={<Monitor className="h-4 w-4 text-primary-400" />}
            />
            <StatCard
              title="Online"
              value={mockBuildings.reduce((sum, b) => sum + b.onlineDevices, 0)}
              description="Active devices"
              icon={<Monitor className="h-4 w-4 text-primary-400" />}
            />
            <StatCard
              title="Offline"
              value={mockBuildings.reduce((sum, b) => sum + b.offlineDevices, 0)}
              description="Offline devices"
              icon={<AlertTriangle className="h-4 w-4 text-warning-500" />}
            />
          </div>

          {/* Buildings Grid */}
          <SectionContainer title="Buildings">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {mockBuildings.map((building) => (
                <div key={building.id} className="rounded-sm border border-neutral-800 bg-neutral-900 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-neutral-200">{building.name}</h3>
                      <p className="text-sm text-neutral-500">{building.address}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-neutral-200">{building.floors} floors</p>
                      <p className="text-xs text-neutral-500">{building.departments.length} departments</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-neutral-500">Total Devices</p>
                      <p className="text-sm font-medium text-neutral-200">{building.totalDevices}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500">Online</p>
                      <p className="text-sm font-medium text-primary-400">{building.onlineDevices}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-neutral-500 mb-1">Departments</p>
                    <div className="flex flex-wrap gap-1">
                      {building.departments.map((dept: string) => (
                        <span key={dept} className="text-xs px-2 py-0.5 rounded-sm bg-primary-500/10 text-primary-400">
                          {dept}
                        </span>
                      ))}
                    </div>
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