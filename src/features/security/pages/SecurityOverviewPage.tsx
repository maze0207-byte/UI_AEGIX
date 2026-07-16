import React from 'react';
import { WidgetGrid } from '../../dashboard/components/WidgetGrid';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import {
  SecurityScoreWidget,
  EnterpriseRiskWidget,
  OpenIncidentsWidget,
  CriticalAlertsWidget,
  WarningAlertsWidget,
  DevicesAtRiskWidget,
  ThreatIntelligenceWidget,
  EvidenceSummaryWidget,
  TopRiskDevicesWidget,
  SecurityTrendsWidget,
  TopDepartmentsWidget,
  TopBuildingsWidget,
} from '../components/widgets/SecurityWidgets';

export const SecurityOverviewPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-8 pb-8">
          {/* Security Summary Section */}
          <SectionContainer title="Security Summary">
            <WidgetGrid>
              <SecurityScoreWidget />
              <EnterpriseRiskWidget />
              <OpenIncidentsWidget />
              <CriticalAlertsWidget />
              <WarningAlertsWidget />
              <DevicesAtRiskWidget />
            </WidgetGrid>
          </SectionContainer>

          {/* Threat Intelligence Section */}
          <SectionContainer title="Threat Intelligence">
            <WidgetGrid>
              <ThreatIntelligenceWidget />
              <EvidenceSummaryWidget />
            </WidgetGrid>
          </SectionContainer>

          {/* Risk Analysis Section */}
          <SectionContainer title="Risk Analysis">
            <WidgetGrid>
              <TopRiskDevicesWidget />
              <TopDepartmentsWidget />
              <TopBuildingsWidget />
            </WidgetGrid>
          </SectionContainer>

          {/* Trends Section */}
          <SectionContainer title="Security Trends">
            <WidgetGrid>
              <SecurityTrendsWidget />
            </WidgetGrid>
          </SectionContainer>
        </div>
      </DashboardLayout>
    </DashboardContainer>
  );
};