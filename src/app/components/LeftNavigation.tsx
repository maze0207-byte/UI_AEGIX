import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  BellRing,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Monitor,
  Settings,
  Shield,
} from 'lucide-react';
import { useAuth } from '../../features/auth';
import { PERMISSIONS } from '../../features/auth/config/permissions';
import type { NavigationItem } from '../../features/auth/types/roles';

const navigationItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard', requiredPermission: PERMISSIONS.DASHBOARD_VIEW },
  { id: 'assets', label: 'Assets', icon: 'Shield', path: '/assets', requiredPermission: PERMISSIONS.ASSETS_VIEW },
  { id: 'monitoring', label: 'Monitoring', icon: 'Monitor', path: '/monitoring', requiredPermission: PERMISSIONS.MONITORING_VIEW },
  { id: 'alerts', label: 'Alerts', icon: 'BellRing', path: '/alerts', requiredPermission: PERMISSIONS.ALERTS_VIEW },
  { id: 'threat-hunting', label: 'Threat Hunting', icon: 'AlertTriangle', path: '/threat-hunting', requiredPermission: PERMISSIONS.THREAT_HUNTING_VIEW },
  { id: 'compliance', label: 'Compliance', icon: 'Shield', path: '/compliance', requiredPermission: PERMISSIONS.COMPLIANCE_VIEW },
  { id: 'settings', label: 'Settings', icon: 'Settings', path: '/settings', requiredPermission: PERMISSIONS.SETTINGS_VIEW },
];

const iconMap: Record<string, typeof LayoutDashboard> = {
  LayoutDashboard,
  Shield,
  Monitor,
  BellRing,
  AlertTriangle,
  Settings,
};

export const LeftNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, hasPermission } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.localStorage.getItem('aegix-sidebar-collapsed') === 'true';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('aegix-sidebar-collapsed', isCollapsed ? 'true' : 'false');
    }
  }, [isCollapsed]);

  const currentPath = useMemo(() => location.pathname, [location.pathname]);

  const handleLogout = async (): Promise<void> => {
    await logout();
    navigate('/login', { replace: true });
  };

  // Filter navigation items based on user permissions
  // Dashboard is always visible for authenticated users
  const visibleItems = useMemo(() => {
    return navigationItems.filter((item) => {
      // Dashboard is always visible
      if (item.id === 'dashboard') {
        return true;
      }
      return hasPermission(item.requiredPermission);
    });
  }, [hasPermission]);

  return (
    <aside className={`flex flex-col border-r border-neutral-800 bg-neutral-900 transition-all duration-200 ${isCollapsed ? 'w-20' : 'w-72'}`}>
      <div className="flex h-16 items-center border-b border-neutral-800 px-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary-500/15 text-primary-400">
          <Shield className="h-5 w-5" />
        </div>
        {!isCollapsed && (
          <div className="ml-3 min-w-0">
            <p className="truncate text-sm font-semibold text-neutral-100">AEGIX</p>
            <p className="truncate text-xs text-neutral-500">Enterprise platform</p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {visibleItems.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = currentPath === item.path || (item.path !== '/dashboard' && currentPath.startsWith(item.path));

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate(item.path)}
              className={`flex w-full items-center rounded-sm px-3 py-2.5 text-sm transition-colors ${isActive ? 'bg-primary-500/15 text-primary-300' : 'text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100'}`}
              title={item.label}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!isCollapsed && <span className="ml-3 truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-neutral-800 p-3">
        <button
          type="button"
          onClick={() => setIsCollapsed((value) => !value)}
          className="mb-2 flex w-full items-center justify-center rounded-sm border border-neutral-800 bg-neutral-950 px-3 py-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-100"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center justify-center rounded-sm bg-neutral-950 px-3 py-2 text-sm text-neutral-400 transition-colors hover:bg-danger-500/10 hover:text-danger-400"
        >
          <LogOut className="mr-2 h-4 w-4" />
          {!isCollapsed && 'Logout'}
        </button>
      </div>
    </aside>
  );
};