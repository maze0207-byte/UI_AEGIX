import { describe, expect, it } from 'vitest';
import { createAuthError, mapApiErrorToAuthErrorType, isAuthFailureError, isRefreshFailureError } from './authErrorMapper';
import type { ApiError } from '../types/auth';

describe('authErrorMapper', () => {
  describe('mapApiErrorToAuthErrorType', () => {
    it('should map 400 status to INVALID_CREDENTIALS', () => {
      const error: ApiError = { status: 400, message: 'Bad request' };
      expect(mapApiErrorToAuthErrorType(error)).toBe('INVALID_CREDENTIALS');
    });

    it('should map 401 status to SESSION_EXPIRED', () => {
      const error: ApiError = { status: 401, message: 'Unauthorized' };
      expect(mapApiErrorToAuthErrorType(error)).toBe('SESSION_EXPIRED');
    });

    it('should map 403 status to PERMISSION_DENIED', () => {
      const error: ApiError = { status: 403, message: 'Forbidden' };
      expect(mapApiErrorToAuthErrorType(error)).toBe('PERMISSION_DENIED');
    });

    it('should map 404 status to ORGANIZATION_UNAVAILABLE', () => {
      const error: ApiError = { status: 404, message: 'Not found' };
      expect(mapApiErrorToAuthErrorType(error)).toBe('ORGANIZATION_UNAVAILABLE');
    });

    it('should map 408 status to NETWORK_ERROR', () => {
      const error: ApiError = { status: 408, message: 'Request timeout' };
      expect(mapApiErrorToAuthErrorType(error)).toBe('NETWORK_ERROR');
    });

    it('should map 500 status to SERVER_UNAVAILABLE', () => {
      const error: ApiError = { status: 500, message: 'Internal server error' };
      expect(mapApiErrorToAuthErrorType(error)).toBe('SERVER_UNAVAILABLE');
    });

    it('should map error codes to appropriate types', () => {
      expect(mapApiErrorToAuthErrorType({ status: 0, message: '', code: 'INVALID_CREDENTIALS' })).toBe('INVALID_CREDENTIALS');
      expect(mapApiErrorToAuthErrorType({ status: 0, message: '', code: 'INVALID_PASSWORD' })).toBe('INVALID_PASSWORD');
      expect(mapApiErrorToAuthErrorType({ status: 0, message: '', code: 'REFRESH_TOKEN_EXPIRED' })).toBe('REFRESH_FAILED');
      expect(mapApiErrorToAuthErrorType({ status: 0, message: '', code: 'REFRESH_TOKEN_INVALID' })).toBe('REFRESH_FAILED');
      expect(mapApiErrorToAuthErrorType({ status: 0, message: '', code: 'REFRESH_TOKEN_REVOKED' })).toBe('REFRESH_FAILED');
    });

    it('should map network errors to NETWORK_ERROR', () => {
      const error = new Error('Network error');
      expect(mapApiErrorToAuthErrorType(error)).toBe('NETWORK_ERROR');
    });

    it('should map timeout errors to NETWORK_ERROR', () => {
      const error = new Error('Request timeout');
      expect(mapApiErrorToAuthErrorType(error)).toBe('NETWORK_ERROR');
    });

    it('should return SERVER_UNAVAILABLE for null error', () => {
      expect(mapApiErrorToAuthErrorType(null)).toBe('SERVER_UNAVAILABLE');
    });
  });

  describe('createAuthError', () => {
    it('should create user-friendly error for INVALID_CREDENTIALS', () => {
      const error = createAuthError({ status: 400, message: 'Missing credentials', code: 'INVALID_CREDENTIALS' });
      expect(error.type).toBe('INVALID_CREDENTIALS');
      expect(error.title).toBe('Invalid credentials');
      expect(error.description).toBe('Please provide both a username and a password.');
      expect(error.recoveryAction).toBe('Try again with your workspace credentials.');
    });

    it('should create user-friendly error for SESSION_EXPIRED', () => {
      const error = createAuthError({ status: 401, message: 'Token expired', code: 'TOKEN_EXPIRED' });
      expect(error.type).toBe('SESSION_EXPIRED');
      expect(error.title).toBe('Session expired');
    });

    it('should create user-friendly error for REFRESH_FAILED', () => {
      const error = createAuthError({ status: 401, message: 'Refresh failed', code: 'REFRESH_TOKEN_EXPIRED' });
      expect(error.type).toBe('REFRESH_FAILED');
      expect(error.title).toBe('Session refresh failed');
    });

    it('should never expose stack traces', () => {
      const error = createAuthError({ status: 500, message: 'Error: at line 1\nat line 2', code: 'SERVER_ERROR' });
      expect(error.description).not.toContain('at line');
      expect(error.description).toBe('Authentication is temporarily unavailable.');
    });
  });

  describe('isAuthFailureError', () => {
    it('should return true for 401 status', () => {
      const error: ApiError = { status: 401, message: 'Unauthorized' };
      expect(isAuthFailureError(error)).toBe(true);
    });

    it('should return true for 403 status', () => {
      const error: ApiError = { status: 403, message: 'Forbidden' };
      expect(isAuthFailureError(error)).toBe(true);
    });

    it('should return false for other status codes', () => {
      const error: ApiError = { status: 400, message: 'Bad request' };
      expect(isAuthFailureError(error)).toBe(false);
    });

    it('should return false for null error', () => {
      expect(isAuthFailureError(null)).toBe(false);
    });
  });

  describe('isRefreshFailureError', () => {
    it('should return true for REFRESH_TOKEN_EXPIRED code', () => {
      const error: ApiError = { status: 401, message: 'Expired', code: 'REFRESH_TOKEN_EXPIRED' };
      expect(isRefreshFailureError(error)).toBe(true);
    });

    it('should return true for REFRESH_TOKEN_INVALID code', () => {
      const error: ApiError = { status: 401, message: 'Invalid', code: 'REFRESH_TOKEN_INVALID' };
      expect(isRefreshFailureError(error)).toBe(true);
    });

    it('should return true for REFRESH_TOKEN_REVOKED code', () => {
      const error: ApiError = { status: 401, message: 'Revoked', code: 'REFRESH_TOKEN_REVOKED' };
      expect(isRefreshFailureError(error)).toBe(true);
    });

    it('should return true for 401 status', () => {
      const error: ApiError = { status: 401, message: 'Unauthorized' };
      expect(isRefreshFailureError(error)).toBe(true);
    });

    it('should return false for other errors', () => {
      const error: ApiError = { status: 400, message: 'Bad request' };
      expect(isRefreshFailureError(error)).toBe(false);
    });
  });
});