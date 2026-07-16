import { Routes, Route } from 'react-router-dom';
import { AdminDashboardPage } from '../pages/AdminDashboardPage';
import { UsersPage } from '../pages/UsersPage';
import { RolesPage } from '../pages/RolesPage';
import { DepartmentsPage } from '../pages/DepartmentsPage';
import { BuildingsPage } from '../pages/BuildingsPage';
import { LabsPage } from '../pages/LabsPage';
import { AgentPoliciesPage } from '../pages/AgentPoliciesPage';
import { SoftwareRepositoryPage } from '../pages/SoftwareRepositoryPage';
import { IntegrationsPage } from '../pages/IntegrationsPage';
import { SystemPage } from '../pages/SystemPage';
import { AuditPage } from '../pages/AuditPage';
import { LicensesPage } from '../pages/LicensesPage';

export const AdministrationRoutes = () => {
  return (
    <Routes>
      <Route index element={<AdminDashboardPage />} />
      <Route path="dashboard" element={<AdminDashboardPage />} />
      <Route path="users" element={<UsersPage />} />
      <Route path="roles" element={<RolesPage />} />
      <Route path="departments" element={<DepartmentsPage />} />
      <Route path="buildings" element={<BuildingsPage />} />
      <Route path="labs" element={<LabsPage />} />
      <Route path="agent-policies" element={<AgentPoliciesPage />} />
      <Route path="software-repository" element={<SoftwareRepositoryPage />} />
      <Route path="integrations" element={<IntegrationsPage />} />
      <Route path="system" element={<SystemPage />} />
      <Route path="audit" element={<AuditPage />} />
      <Route path="licenses" element={<LicensesPage />} />
    </Routes>
  );
};