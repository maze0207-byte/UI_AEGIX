import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { NotFoundPage } from '../pages/NotFoundPage';
import { DashboardPage } from '../features/dashboard';
import { DevicesPage } from '../features/devices/pages/DevicesPage';
import { AccessDeniedPage } from '../pages/AccessDeniedPage';
import { PERMISSIONS } from '../features/auth/config/permissions';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<AuthLayout />}>
        <Route index element={<LoginPage />} />
      </Route>

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route 
          path="dashboard" 
          element={<DashboardPage />} 
        />
        <Route 
          path="devices" 
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.ASSETS_VIEW}>
              <DevicesPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="assets" 
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.ASSETS_VIEW}>
              <div className="rounded-sm border border-neutral-800 bg-neutral-900 p-6 text-neutral-300">Assets placeholder</div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="monitoring" 
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.MONITORING_VIEW}>
              <div className="rounded-sm border border-neutral-800 bg-neutral-900 p-6 text-neutral-300">Monitoring placeholder</div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="alerts" 
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.ALERTS_VIEW}>
              <div className="rounded-sm border border-neutral-800 bg-neutral-900 p-6 text-neutral-300">Alerts placeholder</div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="threat-hunting" 
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.THREAT_HUNTING_VIEW}>
              <div className="rounded-sm border border-neutral-800 bg-neutral-900 p-6 text-neutral-300">Threat Hunting placeholder</div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="compliance" 
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.COMPLIANCE_VIEW}>
              <div className="rounded-sm border border-neutral-800 bg-neutral-900 p-6 text-neutral-300">Compliance placeholder</div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="settings" 
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.SETTINGS_VIEW}>
              <div className="rounded-sm border border-neutral-800 bg-neutral-900 p-6 text-neutral-300">Settings placeholder</div>
            </ProtectedRoute>
          } 
        />
      </Route>

      <Route path="/access-denied" element={<AccessDeniedPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};