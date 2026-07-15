import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { PublicRoute } from './routes/PublicRoute';
import { NotFoundPage } from '../pages/NotFoundPage';
import { AccessDeniedPage } from '../pages/AccessDeniedPage';
import { PERMISSIONS } from '../features/auth/config/permissions';
import { DashboardPage } from '../features/dashboard';
import { AssetRoutes } from '../features/assets/routes/AssetRoutes';

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Root route - show login for unauthenticated, redirect to dashboard for authenticated */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      {/* Login route - redirect authenticated users to dashboard */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      {/* Protected routes - require authentication */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="assets/*" element={<AssetRoutes />} />
        <Route path="devices" element={<Navigate to="/assets/devices" replace />} />
        <Route
          path="security"
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.ASSETS_VIEW}>
              <div className="rounded-sm border border-neutral-800 bg-neutral-900 p-6 text-neutral-300">Security placeholder</div>
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
          path="orchestrator"
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.ASSETS_VIEW}>
              <div className="rounded-sm border border-neutral-800 bg-neutral-900 p-6 text-neutral-300">Orchestrator placeholder</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="administration"
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.USERS_MANAGE}>
              <div className="rounded-sm border border-neutral-800 bg-neutral-900 p-6 text-neutral-300">Administration placeholder</div>
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