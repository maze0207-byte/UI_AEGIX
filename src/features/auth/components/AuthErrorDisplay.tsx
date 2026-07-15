/**
 * AEGIX Authentication Error Display
 * Error state components for authentication
 */

import React from 'react';
import { AlertCircle, RefreshCw, LogOut } from 'lucide-react';
import type { AuthError } from '../types/auth';

interface AuthErrorDisplayProps {
  error: AuthError;
  onRetry?: () => void;
  onLogout?: () => void;
}

export const AuthErrorDisplay = ({ error, onRetry, onLogout }: AuthErrorDisplayProps): React.ReactElement => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-neutral-900">
      <div className="w-full max-w-md p-6 bg-neutral-800 border border-neutral-700 rounded-sm">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-danger-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-neutral-100 mb-1">{error.title}</h3>
            <p className="text-xs text-neutral-300 mb-2">{error.description}</p>
            {error.recoveryAction && (
              <p className="text-xs text-neutral-400">{error.recoveryAction}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-end mt-4 space-x-2">
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center px-3 py-1.5 text-xs font-medium text-neutral-100 bg-neutral-700 border border-neutral-600 rounded-sm hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900 transition-colors"
            >
              <RefreshCw className="w-3 h-3 mr-1.5" />
              Retry
            </button>
          )}
          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center px-3 py-1.5 text-xs font-medium text-danger-500 bg-danger-500/10 border border-danger-500/20 rounded-sm hover:bg-danger-500/20 focus:outline-none focus:ring-2 focus:ring-danger-500 focus:ring-offset-2 focus:ring-offset-neutral-900 transition-colors"
            >
              <LogOut className="w-3 h-3 mr-1.5" />
              Sign Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Loading state component
export const AuthLoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900">
      <div className="flex items-center space-x-3">
        <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-neutral-300">Loading session...</span>
      </div>
    </div>
  );
};

// Session expired component
export const SessionExpiredState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 p-4">
      <div className="w-full max-w-sm text-center">
        <h2 className="text-lg font-semibold text-neutral-100 mb-2">Session Expired</h2>
        <p className="text-sm text-neutral-400 mb-4">
          Your session has expired. Please sign in again to continue.
        </p>
        <a
          href="/auth/login"
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary-500 border border-primary-500 rounded-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900 transition-colors"
        >
          Sign In
        </a>
      </div>
    </div>
  );
};

// Unauthorized state component
export const UnauthorizedState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 p-4">
      <div className="w-full max-w-sm text-center">
        <h2 className="text-lg font-semibold text-neutral-100 mb-2">Access Denied</h2>
        <p className="text-sm text-neutral-400 mb-4">
          You do not have permission to access this resource.
        </p>
        <a
          href="/auth/login"
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary-500 border border-primary-500 rounded-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900 transition-colors"
        >
          Sign In
        </a>
      </div>
    </div>
  );
};

// Forbidden state component
export const ForbiddenState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 p-4">
      <div className="w-full max-w-sm text-center">
        <h2 className="text-lg font-semibold text-neutral-100 mb-2">Forbidden</h2>
        <p className="text-sm text-neutral-400 mb-4">
          You do not have the required permissions to access this page.
        </p>
        <a
          href="/app"
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-neutral-100 bg-neutral-800 border border-neutral-700 rounded-sm hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900 transition-colors"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
};