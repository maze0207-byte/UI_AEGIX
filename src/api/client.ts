import type { ApiError, TokenResponse, User } from '../features/auth/types/auth';
import { AUTH_ENDPOINTS } from '../features/auth/config/authEndpoints';

const DEFAULT_TIMEOUT_MS = 10000;

// Track in-flight refresh to prevent duplicate refresh requests
let refreshPromise: Promise<TokenResponse> | null = null;

export const authStorage = {
  accessTokenKey: 'aegix_access_token',
  refreshTokenKey: 'aegix_refresh_token',
  userKey: 'aegix_user',
  expiresAtKey: 'aegix_token_expires',

  getAccessToken: (): string | null => {
    if (typeof window === 'undefined') {
      return null;
    }

    return window.localStorage.getItem(authStorage.accessTokenKey);
  },

  getRefreshToken: (): string | null => {
    if (typeof window === 'undefined') {
      return null;
    }

    return window.localStorage.getItem(authStorage.refreshTokenKey);
  },

  getStoredUser: (): User | null => {
    if (typeof window === 'undefined') {
      return null;
    }

    const rawUser = window.localStorage.getItem(authStorage.userKey);
    if (!rawUser) {
      return null;
    }

    try {
      return JSON.parse(rawUser) as User;
    } catch {
      return null;
    }
  },

  setTokens: (accessToken: string, refreshToken: string, expiresIn: number): void => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(authStorage.accessTokenKey, accessToken);
    window.localStorage.setItem(authStorage.refreshTokenKey, refreshToken);
    window.localStorage.setItem(authStorage.expiresAtKey, String(Date.now() + expiresIn * 1000));
  },

  setUser: (user: User): void => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(authStorage.userKey, JSON.stringify(user));
  },

  clearAuth: (): void => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.removeItem(authStorage.accessTokenKey);
    window.localStorage.removeItem(authStorage.refreshTokenKey);
    window.localStorage.removeItem(authStorage.userKey);
    window.localStorage.removeItem(authStorage.expiresAtKey);
  },
};

interface RequestOptions extends RequestInit {
  timeoutMs?: number;
  withAuth?: boolean;
  skipRefresh?: boolean;
}

class ApiClient {
  private readonly baseUrl: string;
  private readonly timeoutMs: number;

  constructor(baseUrl: string, timeoutMs: number = DEFAULT_TIMEOUT_MS) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.timeoutMs = timeoutMs;
  }

  private buildUrl(path: string): string {
    return `${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
  }

  private createApiError(status: number, message: string, code?: string): ApiError {
    return { message, status, code };
  }

  private async refreshAccessToken(): Promise<TokenResponse> {
    // Return existing promise if refresh is already in progress
    if (refreshPromise) {
      return refreshPromise;
    }

    const refreshToken = authStorage.getRefreshToken();
    if (!refreshToken) {
      authStorage.clearAuth();
      throw this.createApiError(401, 'Missing refresh token', 'REFRESH_TOKEN_INVALID');
    }

    // Create the refresh promise
    refreshPromise = (async () => {
      try {
        const response = await this.request<TokenResponse>(AUTH_ENDPOINTS.REFRESH, {
          method: 'POST',
          body: JSON.stringify({ refreshToken }),
          withAuth: false,
          skipRefresh: true,
        });

        authStorage.setTokens(response.accessToken, response.refreshToken, response.expiresIn);
        return response;
      } catch (error) {
        // On refresh failure, clear auth state
        authStorage.clearAuth();
        throw error;
      } finally {
        refreshPromise = null;
      }
    })();

    return refreshPromise;
  }

  async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const method = options.method ?? 'GET';
    const headers = new Headers(options.headers ?? {});
    const withAuth = options.withAuth ?? true;
    const skipRefresh = options.skipRefresh ?? false;

    if (options.body && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    if (withAuth) {
      const accessToken = authStorage.getAccessToken();
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), options.timeoutMs ?? this.timeoutMs);

    try {
      const response = await fetch(this.buildUrl(path), {
        ...options,
        method,
        headers,
        signal: controller.signal,
      });

      const data = await response.text();
      const payload = data ? JSON.parse(data) : undefined;

      if (!response.ok) {
        if (response.status === 401 && !skipRefresh && !path.includes(AUTH_ENDPOINTS.LOGIN) && !path.includes(AUTH_ENDPOINTS.REFRESH) && !path.includes(AUTH_ENDPOINTS.LOGOUT)) {
          try {
            await this.refreshAccessToken();
            // Retry original request with new token
            return this.request<T>(path, options);
          } catch {
            // Refresh failed - clear auth and throw session expired error
            throw this.createApiError(401, 'Session expired', 'SESSION_EXPIRED');
          }
        }

        throw this.createApiError(
          response.status,
          payload?.message ?? 'Unexpected server error',
          payload?.code ?? 'SERVER_ERROR'
        );
      }

      return payload as T;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw this.createApiError(408, 'Request timed out', 'NETWORK_TIMEOUT');
      }

      if (error instanceof Error && 'message' in error && typeof error.message === 'string') {
        // Check if it's already an ApiError
        if ('status' in error && 'code' in error) {
          throw error;
        }
        throw this.createApiError(0, error.message, 'NETWORK_ERROR');
      }

      throw error;
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  get<T>(path: string, options: Omit<RequestOptions, 'body' | 'method'> = {}): Promise<T> {
    return this.request<T>(path, { ...options, method: 'GET' });
  }

  post<T>(path: string, body: unknown, options: Omit<RequestOptions, 'body' | 'method'> = {}): Promise<T> {
    return this.request<T>(path, { ...options, method: 'POST', body: JSON.stringify(body) });
  }
}

const baseUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '';
export const apiClient = new ApiClient(baseUrl);

export const buildApiUrl = (path: string): string => apiClient['buildUrl'](path);