import React from 'react';
import { WidgetGrid } from '../../dashboard/components/WidgetGrid';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import {
  PendingCommandsWidget,
  RunningCommandsWidget,
  CompletedCommandsWidget,
  FailedCommandsWidget,
  WaitingDevicesWidget,
  ExecutionQueueWidget,
  DeploymentQueueWidget,
  WorkflowQueueWidget,
  AICommandBarWidget,
} from '../components/widgets/OrchestratorWidgets';

export const OrchestratorOverviewPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-8 pb-8">
          {/* AI Command Bar Section */}
          <SectionContainer title="AI Command Bar" className="bg-transparent border-none p-0">
            <AICommandBarWidget />
          </SectionContainer>

          {/* Command Status Section */}
          <SectionContainer title="Command Status">
            <WidgetGrid>
              <PendingCommandsWidget />
              <RunningCommandsWidget />
              <CompletedCommandsWidget />
              <FailedCommandsWidget />
              <WaitingDevicesWidget />
            </WidgetGrid>
          </SectionContainer>

          {/* Queues Section */}
          <SectionContainer title="Queues">
            <WidgetGrid>
              <ExecutionQueueWidget />
              <DeploymentQueueWidget />
              <WorkflowQueueWidget />
            </WidgetGrid>
          </SectionContainer>
        </div>
      </DashboardLayout>
    </DashboardContainer>
  );
};