import React from 'react';
import { Widget, type WidgetProps } from '../../../dashboard/components/widgets/Widget';
import { StatCard } from '@/app/StatCard';
import { 
  Activity, 
  Server, 
  Cpu, 
  HardDrive, 
  Network, 
  Thermometer, 
  Battery,
  AlertTriangle,
  Clock,
  TrendingUp,
  Gauge,
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
 * Enterprise Health Score Widget
 */
export const EnterpriseHealthScoreWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Enterprise Health Score" icon={<Activity className="h-4 w-4" />} {...props}>
    <StatCard
      title="Health Score"
      value="94%"
      description="Overall system health"
    />
  </Widget>
);

/**
 * Infrastructure Availability Widget
 */
export const InfrastructureAvailabilityWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Infrastructure Availability" icon={<Server className="h-4 w-4" />} {...props}>
    <StatCard
      title="Availability"
      value="99.8%"
      description="Uptime in last 30 days"
    />
  </Widget>
);

/**
 * Agent Connectivity Widget
 */
export const AgentConnectivityWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Agent Connectivity" icon={<Activity className="h-4 w-4" />} {...props}>
    <StatCard
      title="Connected Agents"
      value="1,047"
      description="89% of total devices"
    />
  </Widget>
);

/**
 * CPU Usage Summary Widget
 */
export const CPUUsageSummaryWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="CPU Usage" icon={<Cpu className="h-4 w-4" />} {...props}>
    <StatCard
      title="Avg CPU"
      value="24%"
      description="Across all devices"
    />
  </Widget>
);

/**
 * Memory Usage Summary Widget
 */
export const MemoryUsageSummaryWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Memory Usage" icon={<Gauge className="h-4 w-4" />} {...props}>
    <StatCard
      title="Avg Memory"
      value="42%"
      description="Across all devices"
    />
  </Widget>
);

/**
 * Disk Usage Summary Widget
 */
export const DiskUsageSummaryWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Disk Usage" icon={<HardDrive className="h-4 w-4" />} {...props}>
    <StatCard
      title="Avg Disk"
      value="56%"
      description="Across all devices"
    />
  </Widget>
);

/**
 * Network Summary Widget
 */
export const NetworkSummaryWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Network" icon={<Network className="h-4 w-4" />} {...props}>
    <StatCard
      title="Network"
      value="1.2 GB/s"
      description="Total throughput"
    />
  </Widget>
);

/**
 * Top Critical Devices Widget
 */
export const TopCriticalDevicesWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Top Critical Devices" icon={<AlertTriangle className="h-4 w-4 text-danger-500" />} {...props}>
    <PlaceholderContent label="Critical Devices List" />
  </Widget>
);

/**
 * Top Resource Consumers Widget
 */
export const TopResourceConsumersWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Top Resource Consumers" icon={<Cpu className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="Resource Consumers List" />
  </Widget>
);

/**
 * Offline Devices Widget
 */
export const OfflineDevicesWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Offline Devices" icon={<AlertTriangle className="h-4 w-4" />} {...props}>
    <StatCard
      title="Offline"
      value="23"
      description="Devices not connected"
    />
  </Widget>
);

/**
 * Performance Trends Widget
 */
export const PerformanceTrendsWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Performance Trends" icon={<TrendingUp className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="Performance Trends Chart" />
  </Widget>
);

/**
 * Health Trends Widget
 */
export const HealthTrendsWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Health Trends" icon={<Activity className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="Health Trends Chart" />
  </Widget>
);

/**
 * Monitoring Timeline Widget
 */
export const MonitoringTimelineWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Monitoring Timeline" icon={<Clock className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="Timeline Events" />
  </Widget>
);

/**
 * CPU Metrics Widget
 */
export const CPUMetricsWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="CPU" icon={<Cpu className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="CPU Metrics" />
  </Widget>
);

/**
 * Memory Metrics Widget
 */
export const MemoryMetricsWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Memory" icon={<Gauge className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="Memory Metrics" />
  </Widget>
);

/**
 * Disk Metrics Widget
 */
export const DiskMetricsWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Disk" icon={<HardDrive className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="Disk Metrics" />
  </Widget>
);

/**
 * Network Metrics Widget
 */
export const NetworkMetricsWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Network" icon={<Network className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="Network Metrics" />
  </Widget>
);

/**
 * Temperature Widget
 */
export const TemperatureWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Temperature" icon={<Thermometer className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="Temperature Metrics" />
  </Widget>
);

/**
 * Battery Widget
 */
export const BatteryWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Battery" icon={<Battery className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="Battery Metrics" />
  </Widget>
);

/**
 * Heartbeat Widget
 */
export const HeartbeatWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Heartbeat" icon={<Activity className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="Heartbeat Status" />
  </Widget>
);

/**
 * Uptime Widget
 */
export const UptimeWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Uptime" icon={<Clock className="h-4 w-4" />} {...props}>
    <StatCard
      title="Uptime"
      value="14d 3h"
      description="Device uptime"
    />
  </Widget>
);

/**
 * Monitoring Alerts Widget
 */
export const MonitoringAlertsWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Monitoring Alerts" icon={<AlertTriangle className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="Alerts List" />
  </Widget>
);