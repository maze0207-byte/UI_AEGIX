/**
 * AEGIX Maps Components
 * Reusable components for Maps & Asset Tracking Workspace
 */

// MapWidget - Map display component
import React from 'react';
import { Map, Maximize2, ZoomIn, ZoomOut, Layers, Search } from 'lucide-react';

interface MapWidgetProps {
  devices: { id: string; hostname: string; latitude: number; longitude: number; status: 'online' | 'offline' | 'unknown' }[];
  onFullscreen?: () => void;
  onLayerChange?: () => void;
}

export const MapWidget: React.FC<MapWidgetProps> = ({
  devices,
  onFullscreen,
  onLayerChange,
}) => {
  return (
    <div className="relative rounded-sm border border-neutral-800 bg-neutral-900">
      {/* Map placeholder */}
      <div className="h-96 w-full bg-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <Map className="h-12 w-12 text-neutral-600 mx-auto mb-2" />
          <p className="text-sm text-neutral-400">Interactive Map</p>
          <p className="text-xs text-neutral-500 mt-1">{devices.length} devices displayed</p>
        </div>
      </div>

      {/* Map controls */}
      <div className="absolute top-3 right-3 flex flex-col gap-2">
        <button
          onClick={onLayerChange}
          className="rounded-sm border border-neutral-700 bg-neutral-900 p-2 text-neutral-400 hover:bg-neutral-800"
          title="Layers"
        >
          <Layers className="h-4 w-4" />
        </button>
        <button
          onClick={onFullscreen}
          className="rounded-sm border border-neutral-700 bg-neutral-900 p-2 text-neutral-400 hover:bg-neutral-800"
          title="Fullscreen"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-3 right-3 flex flex-col gap-1">
        <button className="rounded-sm border border-neutral-700 bg-neutral-900 p-2 text-neutral-400 hover:bg-neutral-800">
          <ZoomIn className="h-4 w-4" />
        </button>
        <button className="rounded-sm border border-neutral-700 bg-neutral-900 p-2 text-neutral-400 hover:bg-neutral-800">
          <ZoomOut className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

// DeviceMarker - Device marker component

interface DeviceMarkerProps {
  hostname: string;
  status: 'online' | 'offline' | 'unknown';
  riskScore?: number;
  onClick?: () => void;
}

export const DeviceMarker: React.FC<DeviceMarkerProps> = ({
  hostname,
  status,
  riskScore,
  onClick,
}) => {
  const statusColors = {
    online: 'bg-primary-500',
    offline: 'bg-neutral-500',
    unknown: 'bg-warning-500',
  };

  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center gap-2 rounded-sm border border-neutral-700 bg-neutral-900 px-2 py-1 text-xs"
    >
      <div className={`h-2 w-2 rounded-full ${statusColors[status]}`} />
      <span className="text-neutral-200">{hostname}</span>
      {riskScore && (
        <span className="text-neutral-500">{riskScore}</span>
      )}
    </div>
  );
};

// BuildingCard - Building display component
interface BuildingCardProps {
  building: {
    id: string;
    name: string;
    floors: number;
    totalDevices: number;
    onlineDevices: number;
  };
  onClick?: () => void;
}

export const BuildingCard: React.FC<BuildingCardProps> = ({ building, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="rounded-sm border border-neutral-800 bg-neutral-900 p-4 cursor-pointer hover:bg-neutral-800/50"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-neutral-200">{building.name}</h3>
          <p className="text-xs text-neutral-500">{building.floors} floors</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-neutral-200">{building.totalDevices}</p>
          <p className="text-xs text-neutral-500">devices</p>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-primary-500" />
        <span className="text-xs text-neutral-400">{building.onlineDevices} online</span>
      </div>
    </div>
  );
};

// LabCard - Lab display component
interface LabCardProps {
  lab: {
    id: string;
    name: string;
    department: string;
    building: string;
    capacity: number;
    assignedDevices: number;
    currentStatus: 'operational' | 'maintenance' | 'offline';
  };
  onClick?: () => void;
}

export const LabCard: React.FC<LabCardProps> = ({ lab, onClick }) => {
  const statusColors = {
    operational: 'bg-primary-500/10 text-primary-400',
    maintenance: 'bg-warning-500/10 text-warning-500',
    offline: 'bg-danger-500/10 text-danger-500',
  };

  return (
    <div
      onClick={onClick}
      className="rounded-sm border border-neutral-800 bg-neutral-900 p-4 cursor-pointer hover:bg-neutral-800/50"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-neutral-200">{lab.name}</h3>
          <p className="text-xs text-neutral-500">{lab.department}</p>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-sm ${statusColors[lab.currentStatus]}`}>
          {lab.currentStatus}
        </span>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-neutral-500">Building:</span>
          <span className="ml-1 text-neutral-300">{lab.building}</span>
        </div>
        <div>
          <span className="text-neutral-500">Devices:</span>
          <span className="ml-1 text-neutral-300">{lab.assignedDevices}/{lab.capacity}</span>
        </div>
      </div>
    </div>
  );
};

// LocationTimeline - Location history timeline
interface LocationTimelineProps {
  locations: {
    timestamp: string;
    building?: string;
    floor?: string;
    room?: string;
  }[];
}

export const LocationTimeline: React.FC<LocationTimelineProps> = ({ locations }) => {
  return (
    <div className="space-y-3">
      {locations.map((location, index) => (
        <div key={index} className="flex items-start gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500/10">
            <Map className="h-3 w-3 text-primary-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-200">
              {location.building || 'Unknown Location'}
            </p>
            <p className="text-xs text-neutral-500">
              {location.floor && `Floor ${location.floor}`}
              {location.room && ` - Room ${location.room}`}
            </p>
            <p className="text-xs text-neutral-500">{location.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// TrackingStatusBadge
interface TrackingStatusBadgeProps {
  status: 'active' | 'inactive';
}

export const TrackingStatusBadge: React.FC<TrackingStatusBadgeProps> = ({ status }) => {
  const config = {
    active: { color: 'bg-primary-500/10 text-primary-500', label: 'Active' },
    inactive: { color: 'bg-neutral-500/10 text-neutral-400', label: 'Inactive' },
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 text-xs font-medium ${config[status].color} border-${config[status].color.split('/')[1]}-20`}>
      <div className={`h-1.5 w-1.5 rounded-full ${status === 'active' ? 'bg-primary-500' : 'bg-neutral-500'}`} />
      {config[status].label}
    </span>
  );
};

// GeofenceCard
interface GeofenceCardProps {
  geofence: {
    id: string;
    name: string;
    type: 'building' | 'lab' | 'custom';
    assignedDevices: number;
    entryEvents: number;
    exitEvents: number;
  };
  onClick?: () => void;
}

export const GeofenceCard: React.FC<GeofenceCardProps> = ({ geofence, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="rounded-sm border border-neutral-800 bg-neutral-900 p-4 cursor-pointer hover:bg-neutral-800/50"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-neutral-200">{geofence.name}</h3>
          <p className="text-xs text-neutral-500 capitalize">{geofence.type} geofence</p>
        </div>
        <span className="text-xs text-neutral-400">{geofence.assignedDevices} devices</span>
      </div>
      <div className="mt-2 flex items-center gap-4 text-xs">
        <div>
          <span className="text-neutral-500">Entries:</span>
          <span className="ml-1 text-neutral-300">{geofence.entryEvents}</span>
        </div>
        <div>
          <span className="text-neutral-500">Exits:</span>
          <span className="ml-1 text-neutral-300">{geofence.exitEvents}</span>
        </div>
      </div>
    </div>
  );
};

// MapToolbar
interface MapToolbarProps {
  onSearch: (value: string) => void;
  onFilter: () => void;
  onFullscreen: () => void;
}

export const MapToolbar: React.FC<MapToolbarProps> = ({ onSearch, onFilter, onFullscreen }) => {
  return (
    <div className="flex items-center gap-2 rounded-sm border border-neutral-800 bg-neutral-900 p-3">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
        <input
          type="text"
          placeholder="Search devices, buildings, labs..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full rounded-sm border border-neutral-700 bg-neutral-950 py-1.5 pl-8 pr-3 text-sm text-neutral-200 placeholder:text-neutral-500 focus:border-primary-500 focus:outline-none"
        />
      </div>
      <button
        onClick={onFilter}
        className="flex items-center gap-2 rounded-sm border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800"
      >
        <Layers className="h-3.5 w-3.5" />
        Filters
      </button>
      <button
        onClick={onFullscreen}
        className="flex items-center gap-2 rounded-sm border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800"
      >
        <Maximize2 className="h-3.5 w-3.5" />
        Fullscreen
      </button>
    </div>
  );
};

// LocationHistoryTable
interface LocationHistoryTableProps {
  history: {
    timestamp: string;
    location: string;
    entryTime?: string;
    exitTime?: string;
    duration?: string;
  }[];
}

export const LocationHistoryTable: React.FC<LocationHistoryTableProps> = ({ history }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-neutral-800/50">
            <th className="px-4 py-2 text-left text-xs font-medium text-neutral-400">Timestamp</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-neutral-400">Location</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-neutral-400">Entry Time</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-neutral-400">Exit Time</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-neutral-400">Duration</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, index) => (
            <tr key={index} className="border-b border-neutral-800/30">
              <td className="px-4 py-2 text-sm text-neutral-300">{item.timestamp}</td>
              <td className="px-4 py-2 text-sm text-neutral-300">{item.location}</td>
              <td className="px-4 py-2 text-sm text-neutral-300">{item.entryTime || '-'}</td>
              <td className="px-4 py-2 text-sm text-neutral-300">{item.exitTime || '-'}</td>
              <td className="px-4 py-2 text-sm text-neutral-300">{item.duration || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};