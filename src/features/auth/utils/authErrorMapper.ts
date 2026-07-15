/**
 * AEGIX Authentication Error Mapper
 * Centralized error handling for authentication operations
 */

import type { ApiError, AuthError, AuthErrorType } from '../types/auth';

// Error type mapping from API response codes to AuthErrorType
const ERROR_TYPE_MAP: Record<string, AuthErrorType> = {
  // Invalid credentials
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  INVALID_USERNAME: 'INVALID_USERNAME',
  INVALID_PASSWORD: 'INVALID_PASSWORD',
  INVALID_PASSWORD_FORMAT: 'INVALID_PASSWORD',
  
  // Account status
  ACCOUNT_DISABLED: 'INVALID_USERNAME',
  ACCOUNT_LOCKED: 'INVALID_USERNAME',
  ACCOUNT_INACTIVE: 'INVALID_USERNAME',
  
  // Token errors
  TOKEN_EXPIRED: 'SESSION_EXPIRED',
  ACCESS_TOKEN_EXPIRED: 'SESSION_EXPIRED',
  REFRESH_TOKEN_EXPIRED: 'REFRESH_FAILED',
  REFRESH_TOKEN_INVALID: 'REFRESH_FAILED',
  REFRESH_TOKEN_REVOKED: 'REFRESH_FAILED',
  
  // Authorization
  UNAUTHORIZED: 'SESSION_EXPIRED',
  FORBIDDEN: 'PERMISSION_DENIED',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  
  // Network/Server
  NETWORK_ERROR: 'NETWORK_ERROR',
  NETWORK_TIMEOUT: 'NETWORK_ERROR',
  SERVER_UNAVAILABLE: 'SERVER_UNAVAILABLE',
  SERVICE_UNAVAILABLE: 'SERVER_UNAVAILABLE',
  REQUEST_TIMEOUT: 'NETWORK_ERROR',
  
  // Default fallback
  DEFAULT: 'SERVER_UNAVAILABLE',
};

// User-friendly error messages
const ERROR_MESSAGES: Record<AuthErrorType, { title: string; description: string; recoveryAction?: string }> = {
  INVALID_CREDENTIALS: {
    title: 'Invalid credentials',
    description: 'Please provide both a username and a password.',
    recoveryAction: 'Try again with your workspace credentials.',
  },
  INVALID_USERNAME: {
    title: 'Unknown account',
    description: 'The supplied account could not be found.',
    recoveryAction: 'Contact your administrator for access.',
  },
  INVALID_PASSWORD: {
    title: 'Incorrect password',
    description: 'The password you entered is not valid.',
    recoveryAction: 'Try again or contact your administrator.',
  },
  SERVER_UNAVAILABLE: {
    title: 'Service unavailable',
    description: 'Authentication is temporarily unavailable.',
    recoveryAction: 'Please try again in a moment.',
  },
  NETWORK_ERROR: {
    title: 'Connection issue',
    description: 'Unable to connect to the authentication service.',
    recoveryAction: 'Check your connection and try again.',
  },
  SESSION_EXPIRED: {
    title: 'Session expired',
    description: 'Your signed-in session has expired.',
    recoveryAction: 'Sign in again to continue.',
  },
  PERMISSION_DENIED: {
    title: 'Access denied',
    description: 'You do not have permission to access that resource.',
    recoveryAction: 'Request access from your administrator.',
  },
  ORGANIZATION_UNAVAILABLE: {
    title: 'Organization unavailable',
    description: 'Your organization account is not available.',
    recoveryAction: 'Contact your administrator.',
  },
  REFRESH_FAILED: {
    title: 'Session refresh failed',
    description: 'The current session could not be refreshed.',
    recoveryAction: 'Sign in again to continue.',
  },
  LOGOUT_FAILED: {
    title: 'Logout failed',
    description: 'The session could not be cleared completely.',
    recoveryAction: 'Try logging out again.',
  },
  REQUEST_TIMEOUT: {
    title: 'Request timeout',
    description: 'The request took too long to complete.',
    recoveryAction: 'Check your connection and try again.',
  },
  UNEXPECTED_ERROR: {
    title: 'Unexpected error',
    description: 'An unexpected error occurred.',
    recoveryAction: 'Please try again or contact support.',
  },
};

/**
 * Check if object is an ApiError
 */
const isApiError = (error: unknown): error is ApiError => {
  return typeof error === 'object' && error !== null && 'status' in error && 'message' in error;
};

/**
 * Map API error to AuthErrorType
 */
export const mapApiErrorToAuthErrorType = (error: ApiError | Error | null): AuthErrorType => {
  if (!error) {
    return 'SERVER_UNAVAILABLE';
  }

  // Handle ApiError from API client
  if (isApiError(error)) {
    // Check for specific error code
    if (error.code && ERROR_TYPE_MAP[error.code]) {
      return ERROR_TYPE_MAP[error.code];
    }
    
    // Map by HTTP status
    switch (error.status) {
      case 400:
        return 'INVALID_CREDENTIALS';
      case 401:
        return 'SESSION_EXPIRED';
      case 403:
        return 'PERMISSION_DENIED';
      case 404:
        return 'ORGANIZATION_UNAVAILABLE';
      case 408:
      case 429:
        return 'NETWORK_ERROR';
      case 500:
      case 502:
      case 503:
      case 504:
        return 'SERVER_UNAVAILABLE';
      default:
        return 'SERVER_UNAVAILABLE';
    }
  }

  // Handle generic Error
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    
    if (message.includes('network') || message.includes('fetch') || message.includes('connect')) {
      return 'NETWORK_ERROR';
    }
    if (message.includes('timeout')) {
      return 'NETWORK_ERROR';
    }
    if (message.includes('abort')) {
      return 'NETWORK_ERROR';
    }
  }

  return 'SERVER_UNAVAILABLE';
};

/**
 * Create AuthError from API error
 */
export const createAuthError = (error: ApiError | Error | null): AuthError => {
  const type = mapApiErrorToAuthErrorType(error);
  const errorInfo = ERROR_MESSAGES[type];
  
  return {
    type,
    title: errorInfo.title,
    description: errorInfo.description,
    recoveryAction: errorInfo.recoveryAction,
  };
};

/**
 * Check if error indicates authentication failure that requires logout
 */
export const isAuthFailureError = (error: ApiError | Error | null): boolean => {
  if (!error) return false;
  
  if ('status' in error) {
    const apiError = error as ApiError;
    return apiError.status === 401 || apiError.status === 403;
  }
  
  return false;
};

/**
 * Check if error is a refresh token failure
 */
export const isRefreshFailureError = (error: ApiError | Error | null): boolean => {
  if (!error) return false;
  
  if (isApiError(error)) {
    return (
      error.code === 'REFRESH_TOKEN_EXPIRED' ||
      error.code === 'REFRESH_TOKEN_INVALID' ||
      error.code === 'REFRESH_TOKEN_REVOKED' ||
      error.status === 401
    );
  }
  
  return false;
};
