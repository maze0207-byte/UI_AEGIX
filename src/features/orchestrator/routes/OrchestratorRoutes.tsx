import { Routes, Route } from 'react-router-dom';
import { OrchestratorOverviewPage } from '../pages/OrchestratorOverviewPage';
import { CommandsPage } from '../pages/CommandsPage';
import { WorkflowsPage } from '../pages/WorkflowsPage';
import { SoftwarePage } from '../pages/SoftwarePage';
import { HistoryPage } from '../pages/HistoryPage';
import { PackagesPage } from '../pages/PackagesPage';

export const OrchestratorRoutes = () => {
  return (
    <Routes>
      <Route index element={<OrchestratorOverviewPage />} />
      <Route path="commands" element={<CommandsPage />} />
      <Route path="workflows" element={<WorkflowsPage />} />
      <Route path="software" element={<SoftwarePage />} />
      <Route path="history" element={<HistoryPage />} />
      <Route path="packages" element={<PackagesPage />} />
    </Routes>
  );
};