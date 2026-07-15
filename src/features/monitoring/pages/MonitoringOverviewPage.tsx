import React from 'react';
import { WidgetGrid } from '../../dashboard/components/WidgetGrid';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import {
  EnterpriseHealthScoreWidget,
  InfrastructureAvailabilityWidget,
  AgentConnectivityWidget,
  CPUUsageSummaryWidget,
  MemoryUsageSummaryWidget,
  DiskUsageSummaryWidget,
  NetworkSummaryWidget,
  TopCriticalDevicesWidget,
  TopResourceConsumersWidget,
  OfflineDevicesWidget,
  PerformanceTrendsWidget,
  HealthTrendsWidget,
  MonitoringTimelineWidget,
} from '../components/widgets/MonitoringWidgets';

export const MonitoringOverviewPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-8 pb-8">
          {/* Health Summary Section */}
          <SectionContainer title="Health Summary">
            <WidgetGrid>
              <EnterpriseHealthScoreWidget />
              <InfrastructureAvailabilityWidget />
              <AgentConnectivityWidget />
            </WidgetGrid>
          </SectionContainer>

          {/* Resource Usage Section */}
          <SectionContainer title="Resource Usage">
            <WidgetGrid>
              <CPUUsageSummaryWidget />
              <MemoryUsageSummaryWidget />
              <DiskUsageSummaryWidget />
              <NetworkSummaryWidget />
            </WidgetGrid>
          </SectionContainer>

          {/* Critical Devices Section */}
          <SectionContainer title="Critical Devices">
            <WidgetGrid>
              <TopCriticalDevicesWidget />
              <TopResourceConsumersWidget />
              <OfflineDevicesWidget />
            </WidgetGrid>
          </SectionContainer>

          {/* Trends Section */}
          <SectionContainer title="Trends">
            <WidgetGrid>
              <PerformanceTrendsWidget />
              <HealthTrendsWidget />
            </WidgetGrid>
          </SectionContainer>

          {/* Timeline Section */}
          <SectionContainer title="Monitoring Timeline">
            <WidgetGrid>
              <MonitoringTimelineWidget />
            </WidgetGrid>
          </SectionContainer>
        </div>
      </DashboardLayout>
    </DashboardContainer>
  );
};