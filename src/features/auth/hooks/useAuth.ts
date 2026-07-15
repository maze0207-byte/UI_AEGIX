/**
 * AEGIX Authentication Hooks
 * Lightweight auth hooks for the frontend shell.
 */

import { useEffect, useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import type { LoginCredentials } from '../types/auth';
import type { UserRole, Permission } from '../types/roles';

export const useAuth = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);
  const userRole = useAuthStore((state) => state.userRole);
  const userPermissions = useAuthStore((state) => state.userPermissions);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const restoreSession = useAuthStore((state) => state.restoreSession);
  const refresh = useAuthStore((state) => state.refresh);
  const clearError = useAuthStore((state) => state.clearError);
  const hasRole = useAuthStore((state) => state.hasRole);
  const hasPermission = useAuthStore((state) => state.hasPermission);
  const hasAnyPermission = useAuthStore((state) => state.hasAnyPermission);
  const hasAllPermissions = useAuthStore((state) => state.hasAllPermissions);

  useEffect(() => {
    void restoreSession();
  }, [restoreSession]);

  const handleLogin = useCallback(
    async (credentials: LoginCredentials) => {
      await login(credentials);
    },
    [login]
  );

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  const handleRefresh = useCallback(async () => {
    await refresh();
  }, [refresh]);

  return {
    isAuthenticated,
    accessToken,
    refreshToken,
    user,
    userRole,
    userPermissions,
    isLoading: loading,
    error,
    login: handleLogin,
    logout: handleLogout,
    refresh: handleRefresh,
    clearError,
    hasRole,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  };
};

export const useRequireAuth = (redirectTo: string = '/login') => {
  const { isAuthenticated, isLoading } = useAuth();

  return { isAuthenticated, isLoading, redirectTo };
};

export const useSessionStatus = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loading = useAuthStore((state) => state.loading);
  const user = useAuthStore((state) => state.user);

  return {
    isAuthenticated,
    isLoading: loading,
    user,
  };
};

export const usePermissionCheck = (permission: Permission): boolean => {
  return useAuthStore((state) => state.hasPermission(permission));
};

export const useRoleCheck = (role: UserRole | UserRole[]): boolean => {
  return useAuthStore((state) => state.hasRole(role));
};