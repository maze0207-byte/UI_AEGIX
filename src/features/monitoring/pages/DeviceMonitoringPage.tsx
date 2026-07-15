import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { WidgetGrid } from '../../dashboard/components/WidgetGrid';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import {
  CPUMetricsWidget,
  MemoryMetricsWidget,
  DiskMetricsWidget,
  NetworkMetricsWidget,
  TemperatureWidget,
  BatteryWidget,
  HeartbeatWidget,
  UptimeWidget,
} from '../components/widgets/MonitoringWidgets';
import { DetailSection } from '@/app/DetailSection';
import { DetailItem } from '@/app/DetailItem';
import { ChevronLeft } from 'lucide-react';

export const DeviceMonitoringPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/monitoring')}
              className="rounded-sm border border-neutral-700 bg-neutral-900 p-2 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-neutral-100">
                Device Monitoring: {id}
              </h1>
              <p className="text-sm text-neutral-400">Real-time monitoring data</p>
            </div>
          </div>

          {/* Device Info Section */}
          <DetailSection title="Device Information">
            <DetailItem label="Hostname">LPT-DEV-{id}</DetailItem>
            <DetailItem label="Status">Online</DetailItem>
            <DetailItem label="Last Check-in">2024-01-15 14:30:00</DetailItem>
            <DetailItem label="Agent Version">1.2.3</DetailItem>
          </DetailSection>

          {/* Resource Metrics Section */}
          <SectionContainer title="Resource Metrics">
            <WidgetGrid>
              <CPUMetricsWidget />
              <MemoryMetricsWidget />
              <DiskMetricsWidget />
              <NetworkMetricsWidget />
            </WidgetGrid>
          </SectionContainer>

          {/* Hardware Metrics Section */}
          <SectionContainer title="Hardware Metrics">
            <WidgetGrid>
              <TemperatureWidget />
              <BatteryWidget />
            </WidgetGrid>
          </SectionContainer>

          {/* Agent Status Section */}
          <SectionContainer title="Agent Status">
            <WidgetGrid>
              <HeartbeatWidget />
              <UptimeWidget />
            </WidgetGrid>
          </SectionContainer>
        </div>
      </DashboardLayout>
    </DashboardContainer>
  );
};