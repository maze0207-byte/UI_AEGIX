import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAuthStore } from './authStore';

// Mock the auth service
vi.mock('../services/authService', () => ({
  authService: {
    login: vi.fn(),
    logout: vi.fn(),
    refreshToken: vi.fn(),
    getCurrentUser: vi.fn(),
  },
  tokenStorage: {
    getAccessToken: () => localStorage.getItem('aegix_access_token'),
    getRefreshToken: () => localStorage.getItem('aegix_refresh_token'),
    getStoredUser: () => {
      const user = localStorage.getItem('aegix_user');
      return user ? JSON.parse(user) : null;
    },
    setTokens: vi.fn((accessToken: string, refreshToken: string, expiresIn: number) => {
      localStorage.setItem('aegix_access_token', accessToken);
      localStorage.setItem('aegix_refresh_token', refreshToken);
      localStorage.setItem('aegix_token_expires', String(Date.now() + expiresIn * 1000));
    }),
    setUser: vi.fn((user: unknown) => {
      localStorage.setItem('aegix_user', JSON.stringify(user));
    }),
    clearAuth: vi.fn(() => {
      localStorage.removeItem('aegix_access_token');
      localStorage.removeItem('aegix_refresh_token');
      localStorage.removeItem('aegix_user');
      localStorage.removeItem('aegix_token_expires');
    }),
  },
}));

describe('auth store', () => {
  beforeEach(() => {
    localStorage.clear();
    useAuthStore.setState({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      user: null,
      loading: false,
      error: null,
    });
  });

  describe('login', () => {
    it('should successfully login and set authentication state', async () => {
      const mockResponse = {
        accessToken: 'test-access-token',
        refreshToken: 'test-refresh-token',
        expiresIn: 3600,
        tokenType: 'Bearer',
        user: {
          id: 'user-1',
          username: 'testuser',
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
          isActive: true,
          lastLoginAt: null,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
      };

      const { authService } = await import('../services/authService');
      (authService.login as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockResponse);

      await useAuthStore.getState().login({
        username: 'testuser',
        password: 'password123',
        rememberMe: true,
      });

      expect(useAuthStore.getState().isAuthenticated).toBe(true);
      expect(useAuthStore.getState().accessToken).toBe('test-access-token');
      expect(useAuthStore.getState().refreshToken).toBe('test-refresh-token');
      expect(useAuthStore.getState().user?.username).toBe('testuser');
      expect(useAuthStore.getState().loading).toBe(false);
      expect(useAuthStore.getState().error).toBeNull();
    });

    it('should handle login failure and set error state', async () => {
      const { authService } = await import('../services/authService');
      (authService.login as ReturnType<typeof vi.fn>).mockRejectedValueOnce({
        status: 401,
        message: 'Invalid credentials',
        code: 'INVALID_CREDENTIALS',
      });

      await expect(
        useAuthStore.getState().login({
          username: 'testuser',
          password: 'wrongpassword',
          rememberMe: true,
        })
      ).rejects.toThrow();

      expect(useAuthStore.getState().isAuthenticated).toBe(false);
      expect(useAuthStore.getState().loading).toBe(false);
      expect(useAuthStore.getState().error).not.toBeNull();
    });

    it('should validate credentials before login', async () => {
      await expect(
        useAuthStore.getState().login({
          username: '',
          password: '',
          rememberMe: true,
        })
      ).rejects.toThrow();

      expect(useAuthStore.getState().error?.type).toBe('INVALID_CREDENTIALS');
    });
  });

  describe('logout', () => {
    it('should clear authentication state on logout', async () => {
      // First login
      const mockResponse = {
        accessToken: 'test-access-token',
        refreshToken: 'test-refresh-token',
        expiresIn: 3600,
        tokenType: 'Bearer',
        user: {
          id: 'user-1',
          username: 'testuser',
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
          isActive: true,
          lastLoginAt: null,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
      };

      const { authService } = await import('../services/authService');
      (authService.login as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockResponse);
      await useAuthStore.getState().login({
        username: 'testuser',
        password: 'password123',
        rememberMe: true,
      });

      // Then logout
      (authService.logout as ReturnType<typeof vi.fn>).mockResolvedValueOnce(undefined);
      await useAuthStore.getState().logout();

      expect(useAuthStore.getState().isAuthenticated).toBe(false);
      expect(useAuthStore.getState().accessToken).toBeNull();
      expect(useAuthStore.getState().refreshToken).toBeNull();
      expect(useAuthStore.getState().user).toBeNull();
      expect(useAuthStore.getState().loading).toBe(false);
    });
  });

  describe('restoreSession', () => {
    it('should clear state when no tokens are present', async () => {
      await useAuthStore.getState().restoreSession();

      expect(useAuthStore.getState().isAuthenticated).toBe(false);
      expect(useAuthStore.getState().accessToken).toBeNull();
      expect(useAuthStore.getState().refreshToken).toBeNull();
    });
  });

  describe('refresh', () => {
    it('should clear state on refresh failure', async () => {
      localStorage.setItem('aegix_access_token', 'old-access-token');
      localStorage.setItem('aegix_refresh_token', 'old-refresh-token');

      const { authService } = await import('../services/authService');
      (authService.refreshToken as ReturnType<typeof vi.fn>).mockRejectedValueOnce({
        status: 401,
        message: 'Invalid refresh token',
        code: 'REFRESH_TOKEN_INVALID',
      });

      await expect(useAuthStore.getState().refresh()).rejects.toThrow();

      expect(useAuthStore.getState().isAuthenticated).toBe(false);
      expect(useAuthStore.getState().accessToken).toBeNull();
      expect(useAuthStore.getState().refreshToken).toBeNull();
    });
  });

  describe('clearError', () => {
    it('should clear error state', () => {
      useAuthStore.setState({ error: { type: 'SESSION_EXPIRED', title: 'Test', description: 'Test' } });
      useAuthStore.getState().clearError();
      expect(useAuthStore.getState().error).toBeNull();
    });
  });
});