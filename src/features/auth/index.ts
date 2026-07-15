/**
 * AEGIX Authentication Module
 * Public exports for authentication feature
 */

// Components
export { LoginForm } from './components/LoginForm';
export { AuthErrorDisplay, AuthLoadingState, SessionExpiredState, UnauthorizedState, ForbiddenState } from './components/AuthErrorDisplay';

// Pages
export { LoginPage } from './pages/LoginPage';

// Routes
export { AuthRoutes } from './routes/AuthRoutes';

// Hooks
export { useAuth, useSessionStatus, usePermissionCheck, useRoleCheck } from './hooks/useAuth';
export { useRole, usePermissions, useHasRole, useHasPermission, useHasAnyPermission, useHasAllPermissions, useAuthorization } from './hooks/useAuthorization';

// Store
export { useAuthStore, useSession, useIsAuthenticated, useAuthLoading, useAuthError, useCurrentUser, useCurrentOrganization, useUserPermissions, useUserRoles, useUserRole } from './store/authStore';

// Services
export { authService, tokenStorage, sessionUtils } from './services/authService';
export { mockAuthService, mockData } from './services/mockAuthService';

// Types
export type {
  User,
  Organization,
  Role,
  Permission,
  LoginCredentials,
  AuthResponse,
  Session,
  AuthState,
  AuthError,
  AuthErrorType,
  AuthContext,
  PermissionCheck,
  FeatureAccess,
  NavigationAccess,
  ModuleAccess,
} from './types/auth';
export type { UserRole, Permission as RbacPermission, RoleConfig, UserAuthorization, AuthorizationContext, NavigationItem } from './types/roles';

// Validation
export { loginSchema, type LoginFormData, type ValidationError, validateLoginForm } from './validation/loginSchema';

// Config
export { AUTH_ENDPOINTS } from './config/authEndpoints';
export { PERMISSIONS, ROLE_PERMISSIONS, ROLE_CONFIGS, getRolePermissions, getRoleLabel, isValidPermission, isValidRole } from './config/permissions';

// Utils
export { createAuthError, mapApiErrorToAuthErrorType, isAuthFailureError, isRefreshFailureError } from './utils/authErrorMapper';
export { hasRole, hasPermission, hasAnyPermission, hasAllPermissions, getUserAllPermissions, canAccessNavigation } from './utils/authorization';