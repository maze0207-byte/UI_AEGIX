import { Routes, Route } from 'react-router-dom';
import { MonitoringOverviewPage } from '../pages/MonitoringOverviewPage';
import { DeviceMonitoringPage } from '../pages/DeviceMonitoringPage';
import { ProcessMonitoringPage } from '../pages/ProcessMonitoringPage';
import { NetworkMonitoringPage } from '../pages/NetworkMonitoringPage';
import { MonitoringTimelinePage } from '../pages/MonitoringTimelinePage';
import { AlertPreviewPage } from '../pages/AlertPreviewPage';

export const MonitoringRoutes = () => {
  return (
    <Routes>
      <Route index element={<MonitoringOverviewPage />} />
      <Route path="overview" element={<MonitoringOverviewPage />} />
      <Route path="devices" element={<ProcessMonitoringPage />} />
      <Route path="device/:id" element={<DeviceMonitoringPage />} />
      <Route path="process" element={<ProcessMonitoringPage />} />
      <Route path="network" element={<NetworkMonitoringPage />} />
      <Route path="timeline" element={<MonitoringTimelinePage />} />
      <Route path="alerts" element={<AlertPreviewPage />} />
    </Routes>
  );
};