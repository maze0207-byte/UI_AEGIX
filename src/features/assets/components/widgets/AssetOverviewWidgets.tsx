import React from 'react';
import { Widget, type WidgetProps } from '../../../dashboard/components/widgets/Widget';
import { StatCard } from '@/app/StatCard';
import { 
  Laptop, 
  Server, 
  Monitor, 
  Shield, 
  Building2, 
  Users, 
  Activity, 
  AlertTriangle, 
  Clock, 
  Package,
  Cpu,
  Wifi,
  WifiOff,
} from 'lucide-react';

/**
 * Placeholder content for widgets
 */
const PlaceholderContent: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex h-full min-h-[80px] items-center justify-center rounded border border-dashed border-neutral-700 bg-neutral-900/50 text-xs text-neutral-500">
    [{label}]
  </div>
);

/**
 * Total Assets Widget
 */
export const TotalAssetsWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Total Assets" icon={<Laptop className="h-4 w-4" />} {...props}>
    <StatCard
      title="Total Assets"
      value="1,247"
      description="All managed and unmanaged assets"
    />
  </Widget>
);

/**
 * Managed Assets Widget
 */
export const ManagedAssetsWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Managed Assets" icon={<Shield className="h-4 w-4" />} {...props}>
    <StatCard
      title="Managed Assets"
      value="1,182"
      description="Assets with active management"
    />
  </Widget>
);

/**
 * Unmanaged Assets Widget
 */
export const UnmanagedAssetsWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Unmanaged Assets" icon={<AlertTriangle className="h-4 w-4" />} {...props}>
    <StatCard
      title="Unmanaged Assets"
      value="65"
      description="Assets requiring attention"
    />
  </Widget>
);

/**
 * Online Assets Widget
 */
export const OnlineAssetsWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Online Assets" icon={<Wifi className="h-4 w-4" />} {...props}>
    <StatCard
      title="Online Assets"
      value="892"
      description="Currently connected"
    />
  </Widget>
);

/**
 * Offline Assets Widget
 */
export const OfflineAssetsWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Offline Assets" icon={<WifiOff className="h-4 w-4" />} {...props}>
    <StatCard
      title="Offline Assets"
      value="355"
      description="Not connected in last 24h"
    />
  </Widget>
);

/**
 * Critical Assets Widget
 */
export const CriticalAssetsWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Critical Assets" icon={<AlertTriangle className="h-4 w-4 text-danger-500" />} {...props}>
    <StatCard
      title="Critical Assets"
      value="23"
      description="High risk or health issues"
    />
  </Widget>
);

/**
 * Assets by Department Widget
 */
export const AssetsByDepartmentWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="By Department" icon={<Users className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="Department Distribution Chart" />
  </Widget>
);

/**
 * Assets by Building Widget
 */
export const AssetsByBuildingWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="By Building" icon={<Building2 className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="Building Distribution Chart" />
  </Widget>
);

/**
 * Assets by Operating System Widget
 */
export const AssetsByOSWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="By Operating System" icon={<Monitor className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="OS Distribution Chart" />
  </Widget>
);

/**
 * Assets by Device Type Widget
 */
export const AssetsByDeviceTypeWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="By Device Type" icon={<Server className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="Device Type Distribution Chart" />
  </Widget>
);

/**
 * Assets by Manufacturer Widget
 */
export const AssetsByManufacturerWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="By Manufacturer" icon={<Cpu className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="Manufacturer Distribution Chart" />
  </Widget>
);

/**
 * Assets with Agent Widget
 */
export const AssetsWithAgentWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="With Agent" icon={<Activity className="h-4 w-4" />} {...props}>
    <StatCard
      title="With Agent"
      value="1,047"
      description="Agent installed and active"
    />
  </Widget>
);

/**
 * Assets without Agent Widget
 */
export const AssetsWithoutAgentWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Without Agent" icon={<AlertTriangle className="h-4 w-4" />} {...props}>
    <StatCard
      title="Without Agent"
      value="200"
      description="Agent not installed"
    />
  </Widget>
);

/**
 * Recent Asset Changes Widget
 */
export const RecentAssetChangesWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Recent Changes" icon={<Clock className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="Recent Asset Changes List" />
  </Widget>
);

/**
 * Recently Added Assets Widget
 */
export const RecentlyAddedAssetsWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Recently Added" icon={<Package className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="Recently Added Assets List" />
  </Widget>
);

/**
 * Quick Asset Actions Widget
 */
export const QuickAssetActionsWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Quick Actions" icon={<Activity className="h-4 w-4" />} {...props}>
    <div className="flex flex-wrap gap-2">
      <button className="rounded-sm border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800">
        Add Device
      </button>
      <button className="rounded-sm border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800">
        Import Assets
      </button>
      <button className="rounded-sm border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800">
        Export Report
      </button>
    </div>
  </Widget>
);