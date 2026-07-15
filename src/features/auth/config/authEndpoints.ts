/**
 * AEGIX Authentication Endpoints Configuration
 * Centralized endpoint paths for authentication API
 */

export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  CURRENT_USER: '/auth/me',
} as const;

export type AuthEndpoint = (typeof AUTH_ENDPOINTS)[keyof typeof AUTH_ENDPOINTS];