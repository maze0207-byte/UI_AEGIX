# AEGIX Authentication Module

## Overview

The authentication module provides a complete production-ready authentication experience for the AEGIX Enterprise Asset Protection Platform. This module handles user authentication, session management, and access control integration with the application shell.

## Folder Structure

```
src/features/auth/
├── components/
│   ├── LoginForm.tsx           # Login form component
│   └── AuthErrorDisplay.tsx    # Error state components
├── pages/
│   └── LoginPage.tsx           # Login page container
├── hooks/
│   └── useAuth.ts              # Authentication hooks
├── services/
│   └── authService.ts          # API service stubs
├── store/
│   └── authStore.ts            # Zustand authentication store
├── types/
│   └── auth.ts                 # TypeScript type definitions
├── validation/
│   └── loginSchema.ts          # Zod validation schema
├── config/
│   └── authEndpoints.ts        # Centralized endpoint configuration
├── utils/
│   └── authErrorMapper.ts      # Centralized error handling
├── routes/
│   └── AuthRoutes.tsx          # Authentication route definitions
└── index.ts                    # Public API exports
```

## Authentication Flow

### 1. Initial State
When the application loads, the authentication store initializes and checks for existing session tokens in localStorage.

### 2. Loading Session
If tokens exist, the store validates them by calling `/api/auth/me` to fetch the current user session.

### 3. Authenticating
The login form collects credentials and calls `/api/auth/login` with:
- `username` (string): Username or email
- `password` (string): User password
- `rememberMe` (boolean): Whether to persist the session

### 4. Authenticated
On successful authentication:
- JWT access token and refresh token are stored in localStorage
- User, organization, roles, and permissions are stored in the Zustand store
- The application redirects to `/app`

### 5. Session Management
- Tokens are automatically refreshed 5 minutes before expiration
- On page refresh, the session is restored from localStorage
- On logout, tokens are cleared and the user is redirected to `/auth/login`

## Production-Ready Features

### Duplicate Request Prevention
The authentication store prevents duplicate concurrent requests for:
- Login
- Logout
- Restore Session
- Refresh Token

Each operation tracks an in-flight promise and returns the same promise for duplicate calls, preventing race conditions.

### Refresh Token Failure Handling
When refresh token fails due to:
- Invalid refresh token
- Expired refresh token
- Revoked refresh token
- Unauthorized response

The application:
- Clears authentication state
- Removes all stored credentials
- Redirects to Login page
- Never enters infinite refresh loop

### Centralized Error Handling
All authentication errors are mapped to user-friendly messages through `authErrorMapper.ts`. Never exposes:
- Stack traces
- Raw backend exceptions
- Internal API details

## API Integration Points

The following REST API endpoints are expected from the FastAPI backend:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Authenticate user with credentials |
| POST | `/api/auth/logout` | End current session |
| POST | `/api/auth/refresh` | Refresh access token |
| GET | `/api/auth/me` | Get current user information |
| GET | `/api/auth/permissions` | Get user permissions |
| GET | `/api/organizations/current` | Get current organization |

### Request/Response Examples

**POST /api/auth/login**
```json
{
  "username": "user@example.com",
  "password": "securepassword",
  "rememberMe": true
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "dGhpcyBpcyBhIHJlZnJlc2g...",
  "expiresIn": 3600,
  "tokenType": "Bearer",
  "user": {
    "id": "user-123",
    "username": "user@example.com",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "isActive": true,
    "lastLoginAt": "2024-01-15T10:30:00Z",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "organization": {
    "id": "org-123",
    "name": "Acme Corporation",
    "slug": "acme-corp",
    "description": "Enterprise security team",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  },
  "roles": [...],
  "permissions": [...]
}
```

## Authentication States

| State | Description | UI Treatment |
|-------|-------------|--------------|
| Initial | Application just loaded | Check for existing session |
| Loading Session | Validating stored tokens | Show loading indicator |
| Authenticating | Login in progress | Disable form, show spinner |
| Authenticated | Valid session | Redirect to app |
| Unauthorized | No valid session | Show login form |
| Forbidden | No permission for resource | Show access denied |
| Expired Session | Token expired | Redirect to login |
| Logging Out | Logout in progress | Clear session, redirect |

## Error States

| Error Type | Title | Description | Recovery |
|------------|-------|-------------|----------|
| INVALID_CREDENTIALS | Invalid credentials | The username or password you entered is incorrect. | Verify credentials and try again. |
| INVALID_USERNAME | User not found | No account exists with the provided username or email. | Verify username or contact administrator. |
| SERVER_UNAVAILABLE | Server unavailable | The authentication service is temporarily unavailable. | Try again later or contact support. |
| NETWORK_ERROR | Connection failed | Unable to connect to the authentication server. | Check network connection and try again. |
| SESSION_EXPIRED | Session expired | Your session has expired. Please sign in again. | Return to login page. |
| PERMISSION_DENIED | Permission denied | You do not have permission to access this resource. | Contact system administrator. |
| ORGANIZATION_UNAVAILABLE | Organization unavailable | Your organization account is not available. | Contact system administrator. |
| REFRESH_FAILED | Session refresh failed | Unable to refresh your session. | Sign in again. |

## Permission Model

### Roles
- System-defined roles from the Role Engine
- Each role has a name and description
- Users can have multiple roles

### Permissions
- Resource-based access control
- Each permission has: `resource`, `action`
- Example: `{ resource: 'assets', action: 'read' }`

### Access Checks
```typescript
// Check permission
const canReadAssets = usePermissionCheck('assets', 'read');

// Check role
const isAdmin = useRoleCheck('Administrator');

// In component
if (!hasPermission('incidents', 'create')) {
  return <ForbiddenState />;
}
```

## Integration with Application Shell

### Sidebar Integration
The LeftNavigation component displays:
- Official AEGIX logo at the top
- "AEGIX" product name
- "Enterprise Asset Protection Platform" subtitle
- Navigation items for each module

### Top Header Integration
The TopHeader component displays:
- Current organization name
- Current user name
- Notifications placeholder
- Global search placeholder

## Design Compliance

This module follows the AEGIX Design Constitution:
- **Dark theme default**: Deep charcoal-navy background (#0a0f1a)
- **Professional aesthetic**: No glassmorphism, gradients, or decorative graphics
- **Signal blue accent**: #3b82f6 for primary actions and focus states
- **Typography**: Inter font family, 13-14px body text
- **Accessibility**: Keyboard navigation, ARIA labels, focus indicators
- **Responsive**: Desktop, laptop, tablet, and mobile support

## Usage

```typescript
// In your component
import { useAuth, usePermissionCheck } from '@/features/auth';

const MyComponent = () => {
  const { user, organization, logout } = useAuth();
  const canEdit = usePermissionCheck('policies', 'update');
  
  return (
    <div>
      <h1>Welcome, {user?.firstName}</h1>
      <p>Organization: {organization?.name}</p>
      {canEdit && <button>Edit Policy</button>}
      <button onClick={logout}>Sign Out</button>
    </div>
  );
};
```

## Environment Variables

```
VITE_API_URL=http://localhost:8000/api
VITE_APP_VERSION=1.0.0
VITE_DEV_MODE=true  # Set to true to use mock API for development
```

## Development Mode

For development and testing, set `VITE_DEV_MODE=true` in your `.env` file. This will use the mock API service which accepts any non-empty username/password combination.

**Mock Credentials (Development Only):**
- Any username/password combination will work
- The mock service simulates network delay and returns mock user data
- Mock user: `admin` / `admin` (or any other values)

**To use the mock API:**
1. Set `VITE_DEV_MODE=true` in `.env`
2. Run `npm run dev` in the UI directory
3. The login page will accept any credentials and redirect to the app

## Future FastAPI Integration

When the backend is ready, implement the following endpoints:

1. **POST /api/auth/login**
   - Validate credentials against User Repository
   - Generate JWT tokens via JWT Service
   - Return user, organization, roles, and permissions

2. **POST /api/auth/logout**
   - Invalidate refresh token in Session Manager
   - Clear server-side session

3. **POST /api/auth/refresh**
   - Validate refresh token
   - Generate new access token
   - Return updated session data

4. **GET /api/auth/me**
   - Validate access token
   - Return current user from User Repository

5. **GET /api/auth/permissions**
   - Return permissions from Permission Engine

6. **GET /api/organizations/current**
   - Return organization from Organization Repository