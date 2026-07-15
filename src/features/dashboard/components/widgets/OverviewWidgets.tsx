import React from 'react';
import { Widget, type WidgetProps } from './Widget';
import { Activity, ShieldCheck, Server, ShieldAlert, FileCheck, Wifi, AlertTriangle, Info, MonitorCheck } from 'lucide-react';

const PlaceholderContent: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex h-full min-h-[80px] items-center justify-center rounded border border-dashed border-neutral-700 bg-neutral-900/50 text-xs text-neutral-500">
    [{label}]
  </div>
);

export const ExecutiveKPIWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Executive KPI Area" icon={<Activity className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="KPI Metrics Placeholder" />
  </Widget>
);

export const FleetHealthWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Fleet Health" icon={<MonitorCheck className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="Fleet Health Data Placeholder" />
  </Widget>
);

export const EnterpriseHealthWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Enterprise Health" icon={<ShieldCheck className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="Enterprise Health Status" />
  </Widget>
);

export const SystemHealthWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="System Health" icon={<Server className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="System Health Metrics" />
  </Widget>
);

export const SecurityHealthWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Security Health" icon={<ShieldAlert className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="Security Health Overview" />
  </Widget>
);

export const ComplianceHealthWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Compliance Health" icon={<FileCheck className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="Compliance Status Indicator" />
  </Widget>
);

export const OnlineOfflineSummaryWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Online / Offline Summary" icon={<Wifi className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="Online/Offline Breakdown" />
  </Widget>
);

export const CriticalDevicesSummaryWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Critical Devices Summary" icon={<AlertTriangle className="h-4 w-4 text-warning-500" />} {...props}>
    <PlaceholderContent label="Critical Devices List Placeholder" />
  </Widget>
);

export const ActiveAlertsSummaryWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Active Alerts Summary" icon={<AlertTriangle className="h-4 w-4 text-danger-500" />} {...props}>
    <PlaceholderContent label="Active Alerts Overview" />
  </Widget>
);

export const ActiveIncidentsSummaryWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Active Incidents Summary" icon={<Info className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="Incidents Summary Chart" />
  </Widget>
);

export const AgentHealthSummaryWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Agent Health Summary" icon={<Activity className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="Agent Health Metrics" />
  </Widget>
);
