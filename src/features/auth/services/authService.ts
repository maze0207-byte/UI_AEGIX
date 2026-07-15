import { apiClient, authStorage } from '../../../api/client';
import { AUTH_ENDPOINTS } from '../config/authEndpoints';
import type { AuthenticatedUser, LoginRequest, LoginResponse, TokenResponse } from '../types/auth';

import { mockAuthService } from './mockAuthService';

const isDevMode = import.meta.env.VITE_DEV_MODE === 'true';

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    if (isDevMode) {
      const response = await mockAuthService.login(credentials as unknown as import('../types/auth').LoginCredentials);
      authStorage.setTokens(response.accessToken, response.refreshToken, response.expiresIn);
      authStorage.setUser(response.user);
      return response as unknown as LoginResponse;
    }
    const response = await apiClient.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, credentials, { withAuth: false });
    authStorage.setTokens(response.accessToken, response.refreshToken, response.expiresIn);
    authStorage.setUser(response.user);
    return response;
  },

  async logout(): Promise<void> {
    if (isDevMode) {
      await mockAuthService.logout();
      authStorage.clearAuth();
      return;
    }
    try {
      await apiClient.post(AUTH_ENDPOINTS.LOGOUT, {}, { withAuth: true, skipRefresh: true });
    } catch {
      // Ignore backend errors and still clear local session.
    } finally {
      authStorage.clearAuth();
    }
  },

  async refreshToken(): Promise<TokenResponse> {
    if (isDevMode) {
      const response = await mockAuthService.refresh();
      authStorage.setTokens(response.accessToken, response.refreshToken, response.expiresIn);
      return response as unknown as TokenResponse;
    }
    const refreshToken = authStorage.getRefreshToken();
    if (!refreshToken) {
      authStorage.clearAuth();
      throw new Error('Missing refresh token');
    }

    const response = await apiClient.post<TokenResponse>(AUTH_ENDPOINTS.REFRESH, { refreshToken }, { withAuth: false, skipRefresh: true });
    authStorage.setTokens(response.accessToken, response.refreshToken, response.expiresIn);
    return response;
  },

  async getCurrentUser(): Promise<AuthenticatedUser> {
    const user = authStorage.getStoredUser();
    if (user) {
      return user;
    }

    if (isDevMode) {
      const response = await mockAuthService.me();
      authStorage.setUser(response);
      return response as unknown as AuthenticatedUser;
    }

    const response = await apiClient.get<AuthenticatedUser>(AUTH_ENDPOINTS.CURRENT_USER);
    authStorage.setUser(response);
    return response;
  },
};

export const tokenStorage = authStorage;

export const sessionUtils = {
  isValid: (): boolean => {
    const accessToken = authStorage.getAccessToken();
    const refreshToken = authStorage.getRefreshToken();
    return Boolean(accessToken && refreshToken);
  },
};