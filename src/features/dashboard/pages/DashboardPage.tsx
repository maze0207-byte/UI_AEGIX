import React from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { DashboardHeader } from '../components/DashboardHeader';
import { DashboardNavigation } from '../components/DashboardNavigation';
import { DashboardContainer } from '../components/DashboardContainer';
import { WidgetGrid } from '../components/WidgetGrid';
import { SectionContainer } from '../components/SectionContainer';

// Overview Widgets
import {
  ExecutiveKPIWidget,
  FleetHealthWidget,
  EnterpriseHealthWidget,
  SystemHealthWidget,
  SecurityHealthWidget,
  ComplianceHealthWidget,
  OnlineOfflineSummaryWidget,
  CriticalDevicesSummaryWidget,
  ActiveAlertsSummaryWidget,
  ActiveIncidentsSummaryWidget,
  AgentHealthSummaryWidget,
} from '../components/widgets/OverviewWidgets';

// Charts
import {
  LineChartWidget,
  BarChartWidget,
  PieChartWidget,
  TrendWidget,
} from '../components/charts/DashboardCharts';

// Activities
import {
  RecentActivityWidget,
  RecentAlertsWidget,
  RecentDeviceChangesWidget,
  RecentCommandsWidget,
  EventTimelineWidget,
  NotificationFeedWidget,
} from '../components/activity/DashboardActivities';

// Actions
import { DashboardActions } from '../components/actions/DashboardActions';

export const DashboardPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <DashboardHeader />
        <DashboardNavigation />
        
        <div className="flex flex-col gap-8 pb-8">
          
          <SectionContainer title="Quick Actions" className="bg-transparent border-none p-0">
            <DashboardActions />
          </SectionContainer>

          <SectionContainer title="Global Overview">
            <WidgetGrid>
              <ExecutiveKPIWidget className="md:col-span-2 lg:col-span-3 xl:col-span-4" />
              <FleetHealthWidget />
              <EnterpriseHealthWidget />
              <SystemHealthWidget />
              <SecurityHealthWidget />
              <ComplianceHealthWidget />
              <OnlineOfflineSummaryWidget />
              <CriticalDevicesSummaryWidget />
              <ActiveAlertsSummaryWidget />
              <ActiveIncidentsSummaryWidget />
              <AgentHealthSummaryWidget />
            </WidgetGrid>
          </SectionContainer>
          
          <SectionContainer title="Analytics & Trends">
            <WidgetGrid>
              <TrendWidget className="md:col-span-2 lg:col-span-3 xl:col-span-4" />
              <LineChartWidget className="md:col-span-2 lg:col-span-2 xl:col-span-2" />
              <BarChartWidget className="md:col-span-2 lg:col-span-1 xl:col-span-1" />
              <PieChartWidget className="md:col-span-2 lg:col-span-1 xl:col-span-1" />
            </WidgetGrid>
          </SectionContainer>

          <SectionContainer title="Live Activity">
            <WidgetGrid>
              <RecentActivityWidget className="md:col-span-2 lg:col-span-1 xl:col-span-2" />
              <RecentAlertsWidget className="md:col-span-2 lg:col-span-1 xl:col-span-2" />
              <EventTimelineWidget className="md:col-span-2 lg:col-span-1 xl:col-span-2" />
              <NotificationFeedWidget className="md:col-span-2 lg:col-span-1 xl:col-span-2" />
              <RecentDeviceChangesWidget className="md:col-span-2 lg:col-span-1 xl:col-span-2" />
              <RecentCommandsWidget className="md:col-span-2 lg:col-span-1 xl:col-span-2" />
            </WidgetGrid>
          </SectionContainer>

        </div>
      </DashboardLayout>
    </DashboardContainer>
  );
};
