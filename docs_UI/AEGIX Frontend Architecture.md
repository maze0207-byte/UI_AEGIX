# AEGIX Frontend Architecture

**Version 1.0 — Founding Document**
**Status: Permanent reference. All frontend implementation must conform to this document.**

---

## 0. Purpose of This Document

This document defines the architectural foundation for the AEGIX frontend presentation layer. It serves as the single source of truth for how the React/TypeScript application is structured, how it connects to the FastAPI backend, and how it implements the design principles from the AEGIX Design Constitution.

The frontend is a **presentation layer only** — business logic exists in the FastAPI backend. The frontend's job is to present data clearly, handle user input precisely, and maintain the operational, professional character of AEGIX.

---

## 1. Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | React 18+ | Component-based UI with concurrent features |
| Language | TypeScript | Type safety for enterprise reliability |
| Build Tool | Vite | Fast development and optimized production builds |
| Styling | Tailwind CSS | Utility-first CSS aligned with design tokens |
| Data Fetching | TanStack Query | Server state management, caching, and synchronization |
| Routing | React Router v6+ | Declarative routing with nested layouts |
| State Management | Zustand | Client state for UI preferences and workspace state |
| Animation | Framer Motion (minimal) | Only for functional state transitions |
| Icons | Lucide Icons | Precise, geometric iconography |

---

## 2. Application Structure

### 2.1 Core Principles

- **Feature-based organization:** Code is grouped by domain capability, not by file type
- **Presentation layer only:** No business logic in components; all decisions come from the backend
- **Type-first development:** All API contracts are typed; no `any` types in production code
- **Performance by default:** Code splitting, lazy loading, and memoization are standard

### 2.2 Application Entry Point

```
src/
├── main.tsx                 # Application bootstrap
├── App.tsx                  # Root component with providers
└── vite-env.d.ts           # TypeScript declarations
```

### 2.3 Provider Hierarchy

```tsx
// App.tsx
<QueryClientProvider>
  <BrowserRouter>
    <ThemeProvider>
      <WorkspaceProvider>
        <AppRoutes />
      </WorkspaceProvider>
    </ThemeProvider>
  </BrowserRouter>
</QueryClientProvider>
```

---

## 3. Project Structure

```
src/
├── app/                     # Application-level configuration
│   ├── providers/           # React context providers
│   ├── routes/              # Route definitions
│   └── App.tsx              # Root application component
│
├── features/                # Feature-based modules (core)
│   ├── assets/              # Asset inventory and management
│   ├── policies/            # Policy configuration
│   ├── incidents/           # Incident response
│   ├── compliance/          # Compliance reporting
│   ├── hunting/           # Threat hunting
│   ├── behavioral/          # Behavioral analysis
│   └── telemetry/           # Telemetry collection
│
├── shared/                  # Shared utilities and components
│   ├── api/                 # API client and types
│   ├── components/          # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Third-party integrations
│   ├── styles/              # Global styles and tokens
│   ├── utils/               # Utility functions
│   └── types/               # Shared TypeScript types
│
├── assets/                  # Static assets (fonts, images)
└── index.css                # Global CSS entry point
```

---

## 4. Layouts

### 4.1 Core Layout Components

```
src/shared/components/layout/
├── AppLayout.tsx            # Primary application shell
├── WorkspaceLayout.tsx      # Workspace-specific layout
├── PageLayout.tsx           # Individual page structure
├── Sidebar.tsx              # Persistent navigation
├── Header.tsx               # Top bar with context
└── ContentArea.tsx          # Main content container
```

### 4.2 Layout Principles

- **Persistent navigation:** Sidebar is always visible on primary routes
- **Master-detail pattern:** List/detail views use split-pane layout
- **No decorative containers:** Every layout element serves a functional purpose
- **12-column grid:** All content aligns to the design system grid
- **Dark theme default:** Matches the operational console aesthetic

### 4.3 Responsive Breakpoints

| Name | Width | Usage |
|---|---|---|
| sm | 640px | Mobile (not primary target) |
| md | 768px | Tablet (secondary) |
| lg | 1024px | Desktop minimum (primary) |
| xl | 1280px | Standard desktop |
| 2xl | 1536px | Wide desktop |

---

## 5. Routing

### 5.1 Route Structure

```
/                        # Login (public)
/app                     # Protected application root
  /assets                # Asset inventory
    /:assetId            # Asset detail
  /policies              # Policy management
    /:policyId           # Policy detail
  /incidents             # Incident dashboard
    /:incidentId         # Incident detail
  /compliance            # Compliance reports
  /hunting               # Threat hunting
  /behavioral            # Behavioral analysis
  /telemetry             # Telemetry data
  /settings              # User/workspace settings
```

### 5.2 Route Configuration

```tsx
// app/routes/AppRoutes.tsx
const AppRoutes = () => (
  <Routes>
    <Route path="/app/*" element={<AppLayout />}>
      <Route index element={<Navigate to="assets" />} />
      <Route path="assets/*" element={<AssetsRoutes />} />
      <Route path="policies/*" element={<PoliciesRoutes />} />
      <Route path="incidents/*" element={<IncidentsRoutes />} />
      <Route path="compliance" element={<CompliancePage />} />
      <Route path="hunting" element={<HuntingPage />} />
      <Route path="behavioral" element={<BehavioralPage />} />
      <Route path="telemetry" element={<TelemetryPage />} />
      <Route path="settings" element={<SettingsPage />} />
    </Route>
  </Routes>
);
```

### 5.3 Route Guards

- Authentication required for all `/app/*` routes
- Role-based access control enforced at route level
- Loading states during authentication check

---

## 6. Workspace Concept

### 6.1 Definition

A workspace represents a user's operational context — their current view of assets, policies, and incidents. Workspaces are persistent, named, and can be shared.

### 6.2 Workspace State

```typescript
// shared/types/workspace.ts
interface Workspace {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  filters: WorkspaceFilters;
  layout: WorkspaceLayout;
}

interface WorkspaceState {
  currentWorkspace: Workspace | null;
  workspaces: Workspace[];
  isLoading: boolean;
  error: string | null;
}
```

### 6.3 Workspace Provider

```tsx
// app/providers/WorkspaceProvider.tsx
const WorkspaceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<WorkspaceState>(initialState);
  
  // Workspace operations
  const switchWorkspace = (workspaceId: string) => { /* ... */ };
  const updateWorkspace = (workspace: Workspace) => { /* ... */ };
  
  return (
    <WorkspaceContext.Provider value={{ state, switchWorkspace, updateWorkspace }}>
      {children}
    </WorkspaceContext.Provider>
  );
};
```

---

## 7. Responsive Strategy

### 7.1 Mobile-First, Desktop-Primary

- Mobile support exists but is not the primary focus
- Desktop experience is optimized for 8+ hour usage
- Touch targets meet minimum 44px for accessibility

### 7.2 Responsive Patterns

- **Sidebar collapse:** Collapses to icons on narrow screens
- **Table responsiveness:** Horizontal scroll for dense data tables
- **Master-detail:** Stacks vertically on mobile, splits on desktop
- **No mobile-only features:** All functionality available on all viewports

### 7.3 Container Queries

- Use CSS container queries for component-level responsiveness
- Components adapt to their container, not just viewport

---

## 8. Theme System

### 8.1 Theme Definition

```typescript
// shared/styles/theme.ts
export const theme = {
  colors: {
    // Neutrals (from Design Constitution)
    background: {
      primary: '#0a0f1a',    // Deep charcoal-navy
      secondary: '#141a26',    // Slightly lighter for cards
      elevated: '#1e2533',    // For overlays
    },
    text: {
      primary: '#e6e9ef',     // Off-white for primary text
      secondary: '#a0a8b8',   // Cool grey for secondary
      disabled: '#6b7280',    // Muted for disabled
    },
    border: {
      default: '#2a3040',     // Low-contrast borders
      focus: '#3b82f6',      // Signal blue for focus
    },
    // Signal colors
    primary: '#3b82f6',       // Desaturated blue
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#60a5fa',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSizes: {
      display: '28px',
      heading: '18px',
      body: '14px',
      caption: '12px',
    },
  },
} as const;
```

### 8.2 Theme Provider

- Uses CSS custom properties for runtime theme switching
- Persists user preference in localStorage
- Respects system preference (dark/light)

### 8.3 Dark Theme Default

- Default theme is dark (charcoal-navy)
- Light theme available as secondary option
- No high-contrast theme built-in (handled by OS)

---

## 9. Design Tokens

### 9.1 Token Categories

| Category | Tokens | Source |
|---|---|---|
| Colors | All palette values | Design Constitution |
| Spacing | 4px baseline grid | Design Constitution |
| Typography | Font sizes, weights | Design Constitution |
| Borders | Width, radius | Design Constitution |
| Shadows | Elevation levels | Minimal, functional only |

### 9.2 Token Implementation

```typescript
// shared/styles/tokens.ts
export const tokens = {
  color: {
    neutral: {
      50: '#f8fafc',
      100: '#e6e9ef',
      200: '#cbd0dd',
      300: '#a0a8b8',
      400: '#717a8f',
      500: '#4a5266',
      600: '#323847',
      700: '#222835',
      800: '#141a26',
      900: '#0a0f1a',
    },
    signal: {
      blue: '#3b82f6',
      success: '#22c55e',
      warning: '#f59e0b',
      danger: '#ef4444',
    },
  },
  space: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '24px',
    6: '32px',
    7: '48px',
    8: '64px',
  },
  radius: {
    none: '0px',
    sm: '2px',
    md: '4px',
    lg: '6px',
  },
} as const;
```

---

## 10. Feature-Based Architecture

### 10.1 Feature Module Structure

```
src/features/assets/
├── api/                   # API hooks and types
│   ├── useAssets.ts
│   ├── useAsset.ts
│   └── types.ts
├── components/            # Feature-specific components
│   ├── AssetTable.tsx
│   ├── AssetDetail.tsx
│   └── AssetFilters.tsx
├── hooks/                 # Feature-specific hooks
│   └── useAssetSelection.ts
├── routes/                # Feature routes
│   └── AssetsRoutes.tsx
└── utils/                 # Feature utilities
    └── assetHelpers.ts
```

### 10.2 Feature Principles

- **Self-contained:** Each feature owns its API, components, and state
- **No cross-feature imports:** Features communicate through shared types only
- **Lazy loaded:** Each feature is code-split at the route level
- **Type-safe:** All API contracts are defined in the feature

---

## 11. Folder Structure

### 11.1 Detailed Structure

```
src/
├── app/
│   ├── providers/
│   │   ├── QueryProvider.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── WorkspaceProvider.tsx
│   ├── routes/
│   │   ├── AppRoutes.tsx
│   │   └── ProtectedRoute.tsx
│   └── App.tsx
│
├── features/
│   ├── assets/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── routes/
│   │   └── utils/
│   ├── policies/
│   ├── incidents/
│   ├── compliance/
│   ├── hunting/
│   ├── behavioral/
│   └── telemetry/
│
├── shared/
│   ├── api/
│   │   ├── client.ts
│   │   ├── types.ts
│   │   └── endpoints.ts
│   ├── components/
│   │   ├── layout/
│   │   ├── data/
│   │   ├── forms/
│   │   └── feedback/
│   ├── hooks/
│   │   ├── useApi.ts
│   │   ├── useLocalStorage.ts
│   │   └── useMediaQuery.ts
│   ├── lib/
│   │   ├── queryClient.ts
│   │   └── router.ts
│   ├── styles/
│   │   ├── theme.ts
│   │   ├── tokens.ts
│   │   └── globals.css
│   ├── utils/
│   │   ├── format.ts
│   │   ├── date.ts
│   │   └── validation.ts
│   └── types/
│       ├── api.ts
│       └── common.ts
│
├── assets/
│   └── fonts/
│
├── index.css
└── main.tsx
```

---

## 12. State Management Strategy

### 12.1 State Categories

| State Type | Tool | Purpose |
|---|---|---|
| Server State | TanStack Query | API data, caching, synchronization |
| Client State | Zustand | UI preferences, workspace state, form state |
| URL State | React Router | Navigation, filters, pagination |
| Local State | useState/useReducer | Component-local state |

### 12.2 Zustand Stores

```typescript
// shared/lib/stores/uiStore.ts
interface UIState {
  theme: 'dark' | 'light';
  sidebarCollapsed: boolean;
  activeWorkspace: string | null;
}

export const useUIStore = create<UIState>()((set) => ({
  theme: 'dark',
  sidebarCollapsed: false,
  activeWorkspace: null,
  setTheme: (theme) => set({ theme }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}));
```

### 12.3 State Principles

- **Server state in TanStack Query:** All API data lives here
- **Client state in Zustand:** UI preferences, not business data
- **No global state for business logic:** That lives in the backend
- **Type-safe stores:** All state is fully typed

---

## 13. API Layer

### 13.1 API Client

```typescript
// shared/api/client.ts
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401, 403, 500 errors
    return Promise.reject(error);
  }
);
```

### 13.2 API Hooks

```typescript
// shared/api/hooks/useAssets.ts
export const useAssets = (filters?: AssetFilters) => {
  return useQuery({
    queryKey: ['assets', filters],
    queryFn: () => apiClient.get<Asset[]>('/api/assets', { params: filters }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useAsset = (assetId: string) => {
  return useQuery({
    queryKey: ['asset', assetId],
    queryFn: () => apiClient.get<Asset>(`/api/assets/${assetId}`),
  });
};
```

### 13.3 API Principles

- **Type-first:** All endpoints have TypeScript types
- **No direct API calls in components:** Use hooks
- **Error handling centralized:** In the client and hooks
- **Caching strategy:** Stale-while-revalidate for most data

---

## 14. Service Layer

### 14.1 Service Structure

```
src/shared/api/
├── client.ts              # Axios instance
├── endpoints.ts           # Endpoint constants
├── types/                 # API types
│   ├── assets.ts
│   ├── policies.ts
│   ├── incidents.ts
│   └── common.ts
└── hooks/                 # TanStack Query hooks
    ├── useAssets.ts
    ├── usePolicies.ts
    └── useIncidents.ts
```

### 14.2 Service Principles

- **Thin wrapper:** Services are thin wrappers over the API client
- **No business logic:** Services don't transform or validate data
- **Type safety:** All responses are typed
- **Reusable:** Services are used by multiple features

---

## 15. Error Handling

### 15.1 Error Types

```typescript
// shared/types/api.ts
interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

type ErrorSeverity = 'info' | 'warning' | 'error' | 'critical';
```

### 15.2 Error Boundaries

```tsx
// shared/components/feedback/ErrorBoundary.tsx
class ErrorBoundary extends Component<Props, State> {
  // Catches render errors
  // Logs to error service
  // Displays fallback UI
}
```

### 15.3 Error Display

- **Inline errors:** Form validation, field-level errors
- **Toast errors:** Non-blocking notifications
- **Page errors:** Full-page error states for critical failures
- **No error dialogs:** Errors don't block workflow

---

## 16. Loading Strategy

### 16.1 Loading States

| State | Component | Usage |
|---|---|---|
| Skeleton | Skeleton | Content loading |
| Spinner | Spinner | Action loading |
| Progress | Progress | Long operations |
| Empty | EmptyState | No data |

### 16.2 Loading Principles

- **Skeleton screens:** For content that has structure
- **No loading spinners for every request:** Only for user-initiated actions
- **Suspense for lazy-loaded routes:** Built-in React Suspense
- **No decorative loading:** Loading indicators are functional, not branded

---

## 17. Notification Strategy

### 17.1 Notification Types

```typescript
// shared/types/notification.ts
interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}
```

### 17.2 Notification Display

- **Toasts:** Non-blocking, auto-dismiss after 5 seconds
- **Notification center:** Persistent list in header
- **No banners:** No full-width alert banners
- **No sounds:** No audio notifications

### 17.3 Notification Principles

- **User-initiated only:** System doesn't push unsolicited notifications
- **Actionable:** Every notification has a clear next step
- **Dismissible:** Users can clear notifications
- **Persistent:** Critical notifications remain until addressed

---

## 18. WebSocket Strategy

### 18.1 WebSocket Usage

- **Real-time updates:** Asset status, incident changes
- **No chat or messaging:** Not a communication platform
- **Connection management:** Automatic reconnect with exponential backoff

### 18.2 WebSocket Implementation

```typescript
// shared/lib/websocket.ts
class WebSocketClient {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  
  connect() {
    this.ws = new WebSocket(import.meta.env.VITE_WS_URL);
    this.ws.onmessage = this.handleMessage;
    this.ws.onclose = this.handleReconnect;
  }
  
  private handleMessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    // Update TanStack Query cache
    queryClient.setQueryData(['asset', data.id], data);
  };
}
```

### 18.3 WebSocket Principles

- **Cache updates:** WebSocket updates TanStack Query cache
- **No direct DOM manipulation:** All updates through React state
- **Graceful degradation:** App works without WebSocket
- **Authentication:** WebSocket connection requires valid token

---

## 19. Performance Strategy

### 19.1 Code Splitting

- **Route-based splitting:** Each feature is lazy-loaded
- **Component-based splitting:** Heavy components loaded on demand
- **No bundle analysis:** Bundle stays under 500KB gzipped

### 19.2 Rendering Optimization

- **React.memo:** For pure components
- **useMemo/useCallback:** For expensive computations
- **Virtual scrolling:** For long lists and tables
- **No unnecessary re-renders:** Profile and fix

### 19.3 Data Optimization

- **Pagination:** All lists are paginated
- **Caching:** TanStack Query handles caching
- **Background refresh:** Data refreshes without user action
- **No polling:** Use WebSocket for real-time updates

---

## 20. Accessibility Strategy

### 20.1 WCAG Compliance

- **Level AA:** Minimum compliance target
- **Keyboard navigation:** All actions available via keyboard
- **Screen reader support:** Proper ARIA labels and roles
- **Focus management:** Clear focus indicators

### 20.2 Implementation

```tsx
// shared/components/a11y/FocusTrap.tsx
// shared/components/a11y/SkipLink.tsx
// shared/hooks/useFocusVisible.ts
```

### 20.3 Testing

- **Automated testing:** axe-core in CI pipeline
- **Manual testing:** Keyboard-only navigation
- **Screen reader testing:** NVDA/JAWS testing
- **No accessibility overlays:** Built-in, not added

---

## 21. Design Constitution Alignment

### 21.1 Visual Principles

- **Dark theme default:** Matches the operational console aesthetic
- **No decorative elements:** Every component serves a purpose
- **Sharp corners:** No rounded "startup" UI shapes
- **Minimal motion:** Only functional transitions

### 21.2 Component Principles

- **Single responsibility:** Each component does one thing
- **Composable:** Components combine cleanly
- **No "fancy" variants:** Two button styles maximum
- **Predictable:** Same inputs, same outputs

### 21.3 Layout Principles

- **12-column grid:** All content aligns to grid
- **Master-detail pattern:** Primary layout for lists
- **No hero sections:** Work is the hero
- **Persistent navigation:** Sidebar always visible

---

## 22. The One-Sentence Test

Before implementing any frontend feature, ask:

> "Does this make AEGIX feel like a more precise, trustworthy operating environment — or does it make it feel like a dashboard someone tried to make look impressive?"

If it is the latter, it does not ship as implemented. The Design Constitution is the standing authority for that decision.