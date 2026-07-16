import { Routes, Route } from 'react-router-dom';
import { SecurityOverviewPage } from '../pages/SecurityOverviewPage';
import { AlertsPage } from '../pages/AlertsPage';
import { AlertDetailsPage } from '../pages/AlertDetailsPage';
import { IncidentsPage } from '../pages/IncidentsPage';
import { IncidentDetailsPage } from '../pages/IncidentDetailsPage';
import { EvidencePage } from '../pages/EvidencePage';
import { EvidenceCenterPage } from '../pages/EvidenceCenterPage';
import { ThreatIntelligencePage } from '../pages/ThreatIntelligencePage';
import { TimelinePage } from '../pages/TimelinePage';
import { DeviceSecurityProfilePage } from '../pages/DeviceSecurityProfilePage';
import { AISecurityInsightsPage } from '../pages/AISecurityInsightsPage';

export const SecurityRoutes = () => {
  return (
    <Routes>
      <Route index element={<SecurityOverviewPage />} />
      <Route path="dashboard" element={<SecurityOverviewPage />} />
      <Route path="alerts" element={<AlertsPage />} />
      <Route path="alerts/:id" element={<AlertDetailsPage />} />
      <Route path="incidents" element={<IncidentsPage />} />
      <Route path="incidents/:id" element={<IncidentDetailsPage />} />
      <Route path="evidence" element={<EvidencePage />} />
      <Route path="evidence-center" element={<EvidenceCenterPage />} />
      <Route path="threat-intelligence" element={<ThreatIntelligencePage />} />
      <Route path="timeline" element={<TimelinePage />} />
      <Route path="devices/:id" element={<DeviceSecurityProfilePage />} />
      <Route path="ai-insights" element={<AISecurityInsightsPage />} />
    </Routes>
  );
};
