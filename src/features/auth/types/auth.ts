/**
 * AEGIX Authentication Types
 * Production-ready type definitions for authentication module
 */

// User entity from User Repository
export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// Organization entity from Organization Repository
export interface Organization {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Role entity from Role Engine
export interface Role {
  id: string;
  name: string;
  description: string | null;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
}

// Permission entity from Permission Engine
export interface Permission {
  id: string;
  name: string;
  description: string | null;
  resource: string;
  action: string;
}

// Authentication credentials
export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
  user: AuthenticatedUser;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface AuthenticatedUser extends User {
  organizationId?: string;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

// Authentication response from JWT Service
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
  user: User;
  organization: Organization;
  roles: Role[];
  permissions: Permission[];
}

// Session state
export interface Session {
  user: User | null;
  organization: Organization | null;
  roles: Role[];
  permissions: Permission[];
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  isAuthenticated: boolean;
}

// Authentication state for store
export interface AuthState {
  session: Session;
  isLoading: boolean;
  error: AuthError | null;
}

// Authentication error types
export type AuthErrorType = 
  | 'INVALID_CREDENTIALS'
  | 'INVALID_USERNAME'
  | 'INVALID_PASSWORD'
  | 'SERVER_UNAVAILABLE'
  | 'NETWORK_ERROR'
  | 'SESSION_EXPIRED'
  | 'PERMISSION_DENIED'
  | 'ORGANIZATION_UNAVAILABLE'
  | 'REFRESH_FAILED'
  | 'LOGOUT_FAILED'
  | 'REQUEST_TIMEOUT'
  | 'UNEXPECTED_ERROR';

// Authentication error
export interface AuthError {
  type: AuthErrorType;
  title: string;
  description: string;
  recoveryAction?: string;
}

// Authentication context
export interface AuthContext {
  session: Session;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  clearError: () => void;
}

// Permission check result
export interface PermissionCheck {
  hasPermission: boolean;
  permission: Permission | null;
}

// Feature access mapping
export interface FeatureAccess {
  feature: string;
  hasAccess: boolean;
  requiredPermission?: string;
}

// Navigation access mapping
export interface NavigationAccess {
  path: string;
  hasAccess: boolean;
  requiredPermission?: string;
}

// Module access mapping
export interface ModuleAccess {
  module: string;
  hasAccess: boolean;
  requiredPermission?: string;
}