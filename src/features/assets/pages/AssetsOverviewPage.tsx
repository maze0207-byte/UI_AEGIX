import React from 'react';
import { WidgetGrid } from '../../dashboard/components/WidgetGrid';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import {
  TotalAssetsWidget,
  ManagedAssetsWidget,
  UnmanagedAssetsWidget,
  OnlineAssetsWidget,
  OfflineAssetsWidget,
  CriticalAssetsWidget,
  AssetsByDepartmentWidget,
  AssetsByBuildingWidget,
  AssetsByOSWidget,
  AssetsByDeviceTypeWidget,
  AssetsByManufacturerWidget,
  AssetsWithAgentWidget,
  AssetsWithoutAgentWidget,
  RecentAssetChangesWidget,
  RecentlyAddedAssetsWidget,
  QuickAssetActionsWidget,
} from '../components/widgets/AssetOverviewWidgets';

export const AssetsOverviewPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-8 pb-8">
          {/* Quick Actions Section */}
          <SectionContainer title="Quick Actions" className="bg-transparent border-none p-0">
            <QuickAssetActionsWidget />
          </SectionContainer>

          {/* Asset Summary Section */}
          <SectionContainer title="Asset Summary">
            <WidgetGrid>
              <TotalAssetsWidget />
              <ManagedAssetsWidget />
              <UnmanagedAssetsWidget />
              <OnlineAssetsWidget />
              <OfflineAssetsWidget />
              <CriticalAssetsWidget />
            </WidgetGrid>
          </SectionContainer>

          {/* Asset Distribution Section */}
          <SectionContainer title="Asset Distribution">
            <WidgetGrid>
              <AssetsByDepartmentWidget />
              <AssetsByBuildingWidget />
              <AssetsByOSWidget />
              <AssetsByDeviceTypeWidget />
              <AssetsByManufacturerWidget />
            </WidgetGrid>
          </SectionContainer>

          {/* Agent Status Section */}
          <SectionContainer title="Agent Status">
            <WidgetGrid>
              <AssetsWithAgentWidget />
              <AssetsWithoutAgentWidget />
            </WidgetGrid>
          </SectionContainer>

          {/* Recent Activity Section */}
          <SectionContainer title="Recent Activity">
            <WidgetGrid>
              <RecentAssetChangesWidget />
              <RecentlyAddedAssetsWidget />
            </WidgetGrid>
          </SectionContainer>
        </div>
      </DashboardLayout>
    </DashboardContainer>
  );
};