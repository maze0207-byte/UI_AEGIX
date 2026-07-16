import React from 'react';
import { Widget, type WidgetProps } from '../../../dashboard/components/widgets/Widget';
import { StatCard } from '@/app/StatCard';
import { SecurityScoreCard } from '../SecurityScoreCard';
import { RiskIndicator } from '../RiskIndicator';
import { Shield, AlertTriangle, FileText, TrendingUp, Building, Users, Activity } from 'lucide-react';

/**
 * Security Score Widget
 */
export const SecurityScoreWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Security Score" icon={<Shield className="h-4 w-4" />} {...props}>
    <SecurityScoreCard
      score={87}
      level="good"
      trend="up"
      lastUpdated="2 hours ago"
    />
  </Widget>
);

/**
 * Enterprise Risk Widget
 */
export const EnterpriseRiskWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Enterprise Risk" icon={<Shield className="h-4 w-4" />} {...props}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-2xl font-semibold text-neutral-100">Medium</p>
        <p className="text-xs text-neutral-500">Risk level</p>
      </div>
      <RiskIndicator level="medium" score={65} />
    </div>
  </Widget>
);

/**
 * Open Incidents Widget
 */
export const OpenIncidentsWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Open Incidents" icon={<AlertTriangle className="h-4 w-4" />} {...props}>
    <StatCard
      title="Open Incidents"
      value="12"
      description="Active security incidents"
    />
  </Widget>
);

/**
 * Critical Alerts Widget
 */
export const CriticalAlertsWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Critical Alerts" icon={<AlertTriangle className="h-4 w-4 text-danger-500" />} {...props}>
    <StatCard
      title="Critical Alerts"
      value="3"
      description="Requires immediate attention"
    />
  </Widget>
);

/**
 * Warning Alerts Widget
 */
export const WarningAlertsWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Warning Alerts" icon={<AlertTriangle className="h-4 w-4 text-warning-500" />} {...props}>
    <StatCard
      title="Warning Alerts"
      value="18"
      description="Under investigation"
    />
  </Widget>
);

/**
 * Devices At Risk Widget
 */
export const DevicesAtRiskWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Devices At Risk" icon={<Shield className="h-4 w-4" />} {...props}>
    <StatCard
      title="At Risk"
      value="24"
      description="Devices with high risk score"
    />
  </Widget>
);

/**
 * Threat Intelligence Widget
 */
export const ThreatIntelligenceWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Threat Intelligence" icon={<Activity className="h-4 w-4" />} {...props}>
    <StatCard
      title="Threats Detected"
      value="156"
      description="Active threat indicators"
    />
  </Widget>
);

/**
 * Evidence Summary Widget
 */
export const EvidenceSummaryWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Evidence Summary" icon={<FileText className="h-4 w-4" />} {...props}>
    <StatCard
      title="Evidence Items"
      value="89"
      description="Collected and preserved"
    />
  </Widget>
);

/**
 * Top Risk Devices Widget
 */
export const TopRiskDevicesWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Top Risk Devices" icon={<AlertTriangle className="h-4 w-4 text-danger-500" />} {...props}>
    <div className="space-y-2">
      {[
        { hostname: 'WS-ENG-001', risk: 95, department: 'Engineering' },
        { hostname: 'SRV-DC-001', risk: 88, department: 'Data Center' },
        { hostname: 'LAP-MKT-003', risk: 76, department: 'Marketing' },
      ].map((device) => (
        <div key={device.hostname} className="flex items-center justify-between py-1">
          <div>
            <p className="text-sm font-medium text-neutral-200">{device.hostname}</p>
            <p className="text-xs text-neutral-500">{device.department}</p>
          </div>
          <RiskIndicator level={device.risk > 90 ? 'critical' : device.risk > 70 ? 'high' : 'medium'} score={device.risk} />
        </div>
      ))}
    </div>
  </Widget>
);

/**
 * Security Trends Widget
 */
export const SecurityTrendsWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Security Trends" icon={<TrendingUp className="h-4 w-4" />} {...props}>
    <div className="h-24 flex items-center justify-center">
      <p className="text-xs text-neutral-500">[Trends Chart]</p>
    </div>
  </Widget>
);

/**
 * Top Departments Widget
 */
export const TopDepartmentsWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Top Departments" icon={<Users className="h-4 w-4" />} {...props}>
    <div className="space-y-2">
      {[
        { name: 'Engineering', risk: 78, alerts: 12 },
        { name: 'Data Center', risk: 65, alerts: 8 },
        { name: 'Marketing', risk: 45, alerts: 5 },
      ].map((dept) => (
        <div key={dept.name} className="flex items-center justify-between py-1">
          <div>
            <p className="text-sm font-medium text-neutral-200">{dept.name}</p>
            <p className="text-xs text-neutral-500">{dept.alerts} alerts</p>
          </div>
          <RiskIndicator level={dept.risk > 70 ? 'high' : dept.risk > 50 ? 'medium' : 'low'} score={dept.risk} />
        </div>
      ))}
    </div>
  </Widget>
);

/**
 * Top Buildings Widget
 */
export const TopBuildingsWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Top Buildings" icon={<Building className="h-4 w-4" />} {...props}>
    <div className="space-y-2">
      {[
        { name: 'HQ - NYC', risk: 72, alerts: 15 },
        { name: 'Data Center 1', risk: 68, alerts: 10 },
        { name: 'Branch - Chicago', risk: 42, alerts: 3 },
      ].map((building) => (
        <div key={building.name} className="flex items-center justify-between py-1">
          <div>
            <p className="text-sm font-medium text-neutral-200">{building.name}</p>
            <p className="text-xs text-neutral-500">{building.alerts} alerts</p>
          </div>
          <RiskIndicator level={building.risk > 70 ? 'high' : building.risk > 50 ? 'medium' : 'low'} score={building.risk} />
        </div>
      ))}
    </div>
  </Widget>
);