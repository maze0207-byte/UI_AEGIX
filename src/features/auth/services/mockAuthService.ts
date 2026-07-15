/**
 * AEGIX Authentication Service - Mock API
 * DEVELOPMENT ONLY - This file provides mock data for testing the authentication module
 * DO NOT USE IN PRODUCTION
 */

import type { 
  LoginCredentials, 
  AuthResponse, 
  User, 
  Organization, 
  Role, 
  Permission 
} from '../types/auth';

// Mock user data
const mockUser: User = {
  id: 'user-001',
  username: 'admin',
  email: 'admin@aegix.com',
  firstName: 'Admin',
  lastName: 'User',
  isActive: true,
  lastLoginAt: new Date().toISOString(),
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: new Date().toISOString(),
};

// Mock organization data
const mockOrganization: Organization = {
  id: 'org-001',
  name: 'AEGIX Corporation',
  slug: 'aegix-corp',
  description: 'Enterprise Asset Protection',
  isActive: true,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

// Mock roles
const mockRoles: Role[] = [
  {
    id: 'role-001',
    name: 'Administrator',
    description: 'Full system access',
    isSystem: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

// Mock permissions
const mockPermissions: Permission[] = [
  { id: 'perm-001', name: 'Read Assets', description: 'View assets', resource: 'assets', action: 'read' },
  { id: 'perm-002', name: 'Create Assets', description: 'Create assets', resource: 'assets', action: 'create' },
  { id: 'perm-003', name: 'Update Assets', description: 'Update assets', resource: 'assets', action: 'update' },
  { id: 'perm-004', name: 'Delete Assets', description: 'Delete assets', resource: 'assets', action: 'delete' },
  { id: 'perm-005', name: 'Read Incidents', description: 'View incidents', resource: 'incidents', action: 'read' },
  { id: 'perm-006', name: 'Create Incidents', description: 'Create incidents', resource: 'incidents', action: 'create' },
  { id: 'perm-007', name: 'Read Policies', description: 'View policies', resource: 'policies', action: 'read' },
  { id: 'perm-008', name: 'Create Policies', description: 'Create policies', resource: 'policies', action: 'create' },
  { id: 'perm-009', name: 'Read Compliance', description: 'View compliance', resource: 'compliance', action: 'read' },
  { id: 'perm-010', name: 'Read Hunting', description: 'View hunting', resource: 'hunting', action: 'read' },
];

// Mock tokens
const mockAccessToken = 'mock-access-token-' + Date.now();
const mockRefreshToken = 'mock-refresh-token-' + Date.now();

// Mock API service for development
export const mockAuthService = {
  /**
   * Login with credentials (MOCK)
   * Temporary frontend authentication for development
   * Credentials: admin / admin123
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Validate temporary credentials
    if (credentials.username !== 'admin' || credentials.password !== 'admin123') {
      throw new Error('Invalid username or password');
    }

    return {
      accessToken: mockAccessToken,
      refreshToken: mockRefreshToken,
      expiresIn: 3600,
      tokenType: 'Bearer',
      user: mockUser,
      organization: mockOrganization,
      roles: mockRoles,
      permissions: mockPermissions,
    };
  },

  /**
   * Logout current session (MOCK)
   */
  logout: async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
  },

  /**
   * Refresh access token (MOCK)
   */
  refresh: async (): Promise<AuthResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      accessToken: mockAccessToken,
      refreshToken: mockRefreshToken,
      expiresIn: 3600,
      tokenType: 'Bearer',
      user: mockUser,
      organization: mockOrganization,
      roles: mockRoles,
      permissions: mockPermissions,
    };
  },

  /**
   * Get current user session (MOCK)
   */
  me: async (): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockUser;
  },

  /**
   * Get user permissions (MOCK)
   */
  permissions: async (): Promise<Permission[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockPermissions;
  },

  /**
   * Get current organization (MOCK)
   */
  currentOrganization: async (): Promise<Organization> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockOrganization;
  },
};

// Export mock data for testing
export const mockData = {
  user: mockUser,
  organization: mockOrganization,
  roles: mockRoles,
  permissions: mockPermissions,
};