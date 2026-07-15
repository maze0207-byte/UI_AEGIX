/**
 * AEGIX Authentication Store
 * Centralized Zustand store for authentication state and persistence.
 */

import { create } from 'zustand';
import { authService, tokenStorage } from '../services/authService';
import { createAuthError } from '../utils/authErrorMapper';
import { hasRole as checkRole, hasPermission as checkPermission, hasAnyPermission as checkAnyPermission, hasAllPermissions as checkAllPermissions } from '../utils/authorization';
import type { AuthError, LoginCredentials, User } from '../types/auth';
import type { UserRole, Permission } from '../types/roles';

interface AuthStore {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  userRole: UserRole | null;
  userPermissions: Permission[];
  loading: boolean;
  error: AuthError | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
  refresh: () => Promise<void>;
  clearError: () => void;
  hasRole: (role: UserRole | UserRole[]) => boolean;
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
}

// Track in-flight requests to prevent duplicates
let loginPromise: Promise<void> | null = null;
let logoutPromise: Promise<void> | null = null;
let restoreSessionPromise: Promise<void> | null = null;
let refreshPromise: Promise<void> | null = null;

export const useAuthStore = create<AuthStore>((set, get) => ({
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  user: null,
  userRole: null,
  userPermissions: [],
  loading: false,
  error: null,

  clearError: () => {
    set({ error: null });
  },

  hasRole: (role: UserRole | UserRole[]): boolean => {
    const { userRole } = get();
    return checkRole(userRole, role);
  },

  hasPermission: (permission: Permission): boolean => {
    const { userRole, userPermissions } = get();
    return checkPermission(userRole, userPermissions, permission);
  },

  hasAnyPermission: (permissions: Permission[]): boolean => {
    const { userRole, userPermissions } = get();
    return checkAnyPermission(userRole, userPermissions, permissions);
  },

  hasAllPermissions: (permissions: Permission[]): boolean => {
    const { userRole, userPermissions } = get();
    return checkAllPermissions(userRole, userPermissions, permissions);
  },

  login: async (credentials: LoginCredentials) => {
    // Prevent duplicate login requests
    if (loginPromise) {
      return loginPromise;
    }

    // Validate credentials
    if (!credentials.username || !credentials.password) {
      const error = createAuthError({ status: 400, message: 'Missing credentials', code: 'INVALID_CREDENTIALS' });
      set({ loading: false, error });
      throw error;
    }

    // Create the login promise
    loginPromise = (async () => {
      set({ loading: true, error: null });

      try {
        const response = await authService.login({
          username: credentials.username,
          password: credentials.password,
        });

        set({
          isAuthenticated: true,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          user: response.user,
          loading: false,
          error: null,
        });
      } catch (error) {
        const authError = createAuthError(error as Error);
        set({
          loading: false,
          error: authError,
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
          user: null,
        });
        throw authError;
      } finally {
        loginPromise = null;
      }
    })();

    return loginPromise;
  },

  logout: async () => {
    // Prevent duplicate logout requests
    if (logoutPromise) {
      return logoutPromise;
    }

    logoutPromise = (async () => {
      set({ loading: true, error: null });

      try {
        await authService.logout();
      } catch {
        // Continue with local cleanup on backend errors
      } finally {
        // Always clear auth state
        tokenStorage.clearAuth();
        set({
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
          user: null,
          userRole: null,
          userPermissions: [],
          loading: false,
          error: null,
        });
        logoutPromise = null;
      }
    })();

    return logoutPromise;
  },

  restoreSession: async () => {
    // Prevent duplicate restore session requests
    if (restoreSessionPromise) {
      return restoreSessionPromise;
    }

    restoreSessionPromise = (async () => {
      const accessToken = tokenStorage.getAccessToken();
      const refreshToken = tokenStorage.getRefreshToken();
      const storedUser = tokenStorage.getStoredUser();

      if (!accessToken || !refreshToken) {
        set({
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
          user: null,
          userRole: null,
          userPermissions: [],
          loading: false,
          error: null,
        });
        restoreSessionPromise = null;
        return;
      }

      set({ loading: true, error: null });

      try {
        const user = storedUser ?? await authService.getCurrentUser();
        set({
          isAuthenticated: true,
          accessToken,
          refreshToken,
          user,
          loading: false,
          error: null,
        });
      } catch (error) {
        // On restore failure, clear auth and don't set error (silent failure)
        tokenStorage.clearAuth();
        set({
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
          user: null,
          userRole: null,
          userPermissions: [],
          loading: false,
          error: null,
        });
      } finally {
        restoreSessionPromise = null;
      }
    })();

    return restoreSessionPromise;
  },

  refresh: async () => {
    // Prevent duplicate refresh requests
    if (refreshPromise) {
      return refreshPromise;
    }

    refreshPromise = (async () => {
      set({ loading: true, error: null });

      try {
        const response = await authService.refreshToken();
        set({
          isAuthenticated: true,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          loading: false,
          error: null,
        });
      } catch (error) {
        // On refresh failure, clear auth state
        tokenStorage.clearAuth();
        set({
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
          user: null,
          userRole: null,
          userPermissions: [],
          loading: false,
          error: null,
        });
        throw error;
      } finally {
        refreshPromise = null;
      }
    })();

    return refreshPromise;
  },
}));

export const useSession = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useAuthLoading = () => useAuthStore((state) => state.loading);
export const useAuthError = () => useAuthStore((state) => state.error);
export const useCurrentUser = () => useAuthStore((state) => state.user);
export const useCurrentOrganization = () => null;
export const useUserPermissions = () => useAuthStore((state) => state.userPermissions);
export const useUserRoles = () => useAuthStore((state) => state.userRole);
export const useUserRole = () => useAuthStore((state) => state.userRole);