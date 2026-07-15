# AEGIX Home Workspace

**Version 1.0 — Production Screen**
**Status: First production screen. All implementation must conform to the Design Constitution.**

---

## 0. Purpose of This Screen

The Home Workspace is the operational home of AEGIX — the first screen users see after login. It is not a dashboard; it is an operational console that answers:

- What is happening?
- What requires attention?
- What is the current enterprise health?
- What should I do next?

This screen is designed for 8+ hour daily usage by professional IT and security teams.

---

## 1. Screen Structure

```
┌─────────────┬──────────────┬─────────────────────────────────────────────────────────────┐
│ Navigation  │ Module Panel │                                                             │
│ Rail        │              │  AEGIX / Overview                                             │
│             │ Overview     │  ┌─────────────────────────────────────────────────────────┐  │
│ [O]         │              │  │ 🔍 Search assets, incidents, policies, indicators...    │  │
│ [A]         │ Assets       │  └─────────────────────────────────────────────────────────┘  │
│ [P]         │              │                                                             │
│ [I]         │ Incidents    │  Enterprise Status                                           │
│ [T]         │              │  ┌─────────────────────────────────────────────────────────┐  │
│ [H]         │ Hunting      │  │ Assets: 1,247  ● Incidents: 3  ● Policies: 12  ●       │  │
│ [C]         │              │  │ Compliance: 94%  ● Uptime: 99.9%  ● Last Sync: 2m     │  │
│ [R]         │ Reports      │  └─────────────────────────────────────────────────────────┘  │
│ [S]         │              │                                                             │
│             │              │  ┌────────────────────┬───────────────────────────────────────┐  │
│             │              │  │ Operations Feed    │ Asset Summary                         │  │
│             │              │  │                    │                                       │  │
│             │              │  │ • Asset-001 added  │ Total Assets: 1,247                   │  │
│             │              │  │ • Policy updated   │ Servers: 423  ● Workstations: 612      │  │
│             │              │  │ • Alert triggered  │ Mobile: 87  ● Cloud: 125               │  │
│             │              │  │                    │                                       │  │
│             │              │  └────────────────────┴───────────────────────────────────────┘  │
└─────────────┴──────────────┴─────────────────────────────────────────────────────────────────────┘
```

---

## 2. Component Code

### 2.1 Home Workspace Component

```tsx
// src/features/overview/components/HomeWorkspace.tsx
import React from 'react';
import { EnterpriseStatus } from './EnterpriseStatus';
import { OperationsFeed } from './OperationsFeed';
import { AssetSummary } from './AssetSummary';
import { LiveTrackingPreview } from './LiveTrackingPreview';
import { PlatformHealth } from './PlatformHealth';
import { RecommendedActions } from './RecommendedActions';
import { QuickNavigation } from './QuickNavigation';

export const HomeWorkspace: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-neutral-900 text-neutral-100">
      {/* Enterprise Status Bar */}
      <div className="px-6 py-4 border-b border-neutral-700">
        <EnterpriseStatus />
      </div>

      {/* Main Content Grid */}
      <div className="flex-1 p-6 grid grid-cols-12 gap-6 overflow-auto">
        {/* Operations Feed - Left Column */}
        <div className="col-span-5">
          <OperationsFeed />
        </div>

        {/* Asset Summary - Right Column Top */}
        <div className="col-span-7">
          <AssetSummary />
        </div>

        {/* Live Tracking Preview - Full Width */}
        <div className="col-span-12">
          <LiveTrackingPreview />
        </div>

        {/* Platform Health - Left Column Bottom */}
        <div className="col-span-5">
          <PlatformHealth />
        </div>

        {/* Recommended Actions - Right Column Bottom */}
        <div className="col-span-7">
          <RecommendedActions />
        </div>
      </div>

      {/* Quick Navigation Footer */}
      <div className="px-6 py-3 border-t border-neutral-700">
        <QuickNavigation />
      </div>
    </div>
  );
};
```

### 2.2 Enterprise Status Component

```tsx
// src/features/overview/components/EnterpriseStatus.tsx
import React from 'react';
import { useOverviewStats } from '../api/useOverviewStats';

export const EnterpriseStatus: React.FC = () => {
  const { data: stats, isLoading } = useOverviewStats();

  if (isLoading) {
    return (
      <div className="flex items-center space-x-6">
        <div className="h-5 bg-neutral-700 rounded w-32 animate-pulse" />
        <div className="h-5 bg-neutral-700 rounded w-24 animate-pulse" />
        <div className="h-5 bg-neutral-700 rounded w-20 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center space-x-6">
        <StatusItem label="Assets" value={stats?.assets.toLocaleString() || '0'} />
        <StatusItem label="Incidents" value={stats?.incidents.toString() || '0'} status="warning" />
        <StatusItem label="Policies" value={stats?.policies.toString() || '0'} />
        <StatusItem label="Compliance" value={`${stats?.compliance || 0}%`} status="success" />
      </div>
      <div className="text-neutral-400">
        Uptime: {stats?.uptime || '0%'} • Last Sync: {stats?.lastSync || '—'}
      </div>
    </div>
  );
};

interface StatusItemProps {
  label: string;
  value: string;
  status?: 'default' | 'success' | 'warning' | 'danger';
}

const StatusItem: React.FC<StatusItemProps> = ({ label, value, status = 'default' }) => {
  const statusColors = {
    default: 'text-neutral-100',
    success: 'text-success-500',
    warning: 'text-warning-500',
    danger: 'text-danger-500',
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-neutral-400">{label}:</span>
      <span className={`font-medium ${statusColors[status]}`}>{value}</span>
    </div>
  );
};
```

### 2.3 Operations Feed Component

```tsx
// src/features/overview/components/OperationsFeed.tsx
import React from 'react';
import { useOperationsFeed } from '../api/useOperationsFeed';
import { formatDistanceToNow } from 'date-fns';

export const OperationsFeed: React.FC = () => {
  const { data: events, isLoading } = useOperationsFeed();

  return (
    <div className="bg-neutral-800 border border-neutral-700 rounded-sm">
      <div className="px-4 py-3 border-b border-neutral-700">
        <h2 className="text-sm font-semibold text-neutral-100">Operations Feed</h2>
      </div>
      
      <div className="max-h-80 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 bg-neutral-700 rounded animate-pulse" />
            ))}
          </div>
        ) : events?.length === 0 ? (
          <div className="p-4 text-sm text-neutral-400">No recent activity</div>
        ) : (
          <ul className="divide-y divide-neutral-700">
            {events?.map((event) => (
              <li key={event.id} className="px-4 py-3 text-sm hover:bg-neutral-700/50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span className="text-neutral-100">{event.message}</span>
                    <div className="mt-1 text-xs text-neutral-400">
                      {event.user} • {formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}
                    </div>
                  </div>
                  <EventIndicator type={event.type} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

interface EventIndicatorProps {
  type: 'info' | 'success' | 'warning' | 'danger';
}

const EventIndicator: React.FC<EventIndicatorProps> = ({ type }) => {
  const colors = {
    info: 'bg-info-500',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    danger: 'bg-danger-500',
  };

  return (
    <div className={`w-2 h-2 rounded-full ${colors[type]} ml-2 mt-1.5`} />
  );
};
```

### 2.4 Asset Summary Component

```tsx
// src/features/overview/components/AssetSummary.tsx
import React from 'react';
import { useAssetSummary } from '../../assets/api/useAssetSummary';

export const AssetSummary: React.FC = () => {
  const { data: summary, isLoading } = useAssetSummary();

  return (
    <div className="bg-neutral-800 border border-neutral-700 rounded-sm">
      <div className="px-4 py-3 border-b border-neutral-700">
        <h2 className="text-sm font-semibold text-neutral-100">Asset Summary</h2>
      </div>
      
      <div className="p-4">
        {isLoading ? (
          <div className="space-y-4">
            <div className="h-8 bg-neutral-700 rounded animate-pulse" />
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-neutral-700 rounded animate-pulse" />
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="text-2xl font-bold text-neutral-100 mb-4">
              {summary?.total.toLocaleString() || '0'} Assets
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <AssetTypeCard type="Servers" count={summary?.servers || 0} />
              <AssetTypeCard type="Workstations" count={summary?.workstations || 0} />
              <AssetTypeCard type="Mobile" count={summary?.mobile || 0} />
              <AssetTypeCard type="Cloud" count={summary?.cloud || 0} />
              <AssetTypeCard type="Network" count={summary?.network || 0} />
              <AssetTypeCard type="IoT" count={summary?.iot || 0} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

interface AssetTypeCardProps {
  type: string;
  count: number;
}

const AssetTypeCard: React.FC<AssetTypeCardProps> = ({ type, count }) => {
  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-sm p-3">
      <div className="text-xs text-neutral-400">{type}</div>
      <div className="text-lg font-semibold text-neutral-100 mt-1">
        {count.toLocaleString()}
      </div>
    </div>
  );
};
```

### 2.5 Live Tracking Preview Component

```tsx
// src/features/overview/components/LiveTrackingPreview.tsx
import React from 'react';
import { useLiveTracking } from '../../assets/api/useLiveTracking';

export const LiveTrackingPreview: React.FC = () => {
  const { data: tracking, isLoading } = useLiveTracking();

  return (
    <div className="bg-neutral-800 border border-neutral-700 rounded-sm">
      <div className="px-4 py-3 border-b border-neutral-700 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-neutral-100">Live Tracking</h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success-500 rounded-full" />
          <span className="text-xs text-neutral-400">Live</span>
        </div>
      </div>
      
      <div className="p-4">
        {isLoading ? (
          <div className="h-40 bg-neutral-700 rounded animate-pulse" />
        ) : (
          <div className="h-40 bg-neutral-900 border border-neutral-700 rounded-sm flex items-center justify-center">
            <div className="text-sm text-neutral-400">
              Map view placeholder - {tracking?.count || 0} assets tracked
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
```

### 2.6 Platform Health Component

```tsx
// src/features/overview/components/PlatformHealth.tsx
import React from 'react';
import { usePlatformHealth } from '../api/usePlatformHealth';

export const PlatformHealth: React.FC = () => {
  const { data: health, isLoading } = usePlatformHealth();

  return (
    <div className="bg-neutral-800 border border-neutral-700 rounded-sm">
      <div className="px-4 py-3 border-b border-neutral-700">
        <h2 className="text-sm font-semibold text-neutral-100">Platform Health</h2>
      </div>
      
      <div className="p-4 space-y-3">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 bg-neutral-700 rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <HealthItem label="API Response" value={health?.apiResponse || '—'} status="success" />
            <HealthItem label="Database" value={health?.database || '—'} status="success" />
            <HealthItem label="WebSocket" value={health?.websocket || '—'} status="success" />
            <HealthItem label="Queue Depth" value={health?.queueDepth || '—'} />
          </>
        )}
      </div>
    </div>
  );
};

interface HealthItemProps {
  label: string;
  value: string;
  status?: 'default' | 'success' | 'warning' | 'danger';
}

const HealthItem: React.FC<HealthItemProps> = ({ label, value, status = 'default' }) => {
  const statusColors = {
    default: 'text-neutral-100',
    success: 'text-success-500',
    warning: 'text-warning-500',
    danger: 'text-danger-500',
  };

  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-neutral-400">{label}</span>
      <span className={`font-medium ${statusColors[status]}`}>{value}</span>
    </div>
  );
};
```

### 2.7 Recommended Actions Component

```tsx
// src/features/overview/components/RecommendedActions.tsx
import React from 'react';
import { useRecommendedActions } from '../api/useRecommendedActions';
import { ChevronRight } from 'lucide-react';

export const RecommendedActions: React.FC = () => {
  const { data: actions, isLoading } = useRecommendedActions();

  return (
    <div className="bg-neutral-800 border border-neutral-700 rounded-sm">
      <div className="px-4 py-3 border-b border-neutral-700">
        <h2 className="text-sm font-semibold text-neutral-100">Recommended Actions</h2>
      </div>
      
      <div className="p-4">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 bg-neutral-700 rounded animate-pulse" />
            ))}
          </div>
        ) : actions?.length === 0 ? (
          <div className="text-sm text-neutral-400">No recommended actions</div>
        ) : (
          <ul className="space-y-2">
            {actions?.map((action) => (
              <li key={action.id}>
                <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-left text-neutral-100 hover:bg-neutral-700/50 rounded-sm transition-colors">
                  <div>
                    <div className="font-medium">{action.title}</div>
                    <div className="text-xs text-neutral-400 mt-0.5">{action.description}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
```

### 2.8 Quick Navigation Component

```tsx
// src/features/overview/components/QuickNavigation.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  AlertCircle, 
  FileText, 
  Search, 
  Settings 
} from 'lucide-react';

export const QuickNavigation: React.FC = () => {
  const navigate = useNavigate();

  const quickItems = [
    { label: 'All Assets', path: '/app/assets', icon: Shield },
    { label: 'Active Incidents', path: '/app/incidents', icon: AlertCircle },
    { label: 'Compliance', path: '/app/compliance', icon: FileText },
    { label: 'Threat Hunt', path: '/app/hunting', icon: Search },
    { label: 'Settings', path: '/app/settings', icon: Settings },
  ];

  return (
    <div className="flex items-center space-x-4">
      <span className="text-xs text-neutral-400">Quick Navigation:</span>
      <div className="flex items-center space-x-2">
        {quickItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs text-neutral-300 hover:text-neutral-100 hover:bg-neutral-800 rounded-sm transition-colors"
          >
            <item.icon className="w-3.5 h-3.5" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

---

## 3. API Hooks

### 3.1 Overview Stats Hook

```typescript
// src/features/overview/api/useOverviewStats.ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../shared/api/client';

interface OverviewStats {
  assets: number;
  incidents: number;
  policies: number;
  compliance: number;
  uptime: string;
  lastSync: string;
}

export const useOverviewStats = () => {
  return useQuery({
    queryKey: ['overview', 'stats'],
    queryFn: () => apiClient.get<OverviewStats>('/api/overview/stats'),
    staleTime: 1000 * 60, // 1 minute
    refetchInterval: 1000 * 30, // 30 seconds
  });
};
```

### 3.2 Operations Feed Hook

```typescript
// src/features/overview/api/useOperationsFeed.ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../shared/api/client';

interface OperationEvent {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  user: string;
  timestamp: string;
}

export const useOperationsFeed = () => {
  return useQuery({
    queryKey: ['overview', 'operations'],
    queryFn: () => apiClient.get<OperationEvent[]>('/api/overview/operations'),
    staleTime: 1000 * 30, // 30 seconds
    refetchInterval: 1000 * 10, // 10 seconds
  });
};
```

### 3.3 Asset Summary Hook

```typescript
// src/features/overview/api/useAssetSummary.ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../shared/api/client';

interface AssetSummary {
  total: number;
  servers: number;
  workstations: number;
  mobile: number;
  cloud: number;
  network: number;
  iot: number;
}

export const useAssetSummary = () => {
  return useQuery({
    queryKey: ['overview', 'assets-summary'],
    queryFn: () => apiClient.get<AssetSummary>('/api/assets/summary'),
    staleTime: 1000 * 60, // 1 minute
  });
};
```

### 3.4 Platform Health Hook

```typescript
// src/features/overview/api/usePlatformHealth.ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../shared/api/client';

interface PlatformHealth {
  apiResponse: string;
  database: string;
  websocket: string;
  queueDepth: string;
}

export const usePlatformHealth = () => {
  return useQuery({
    queryKey: ['overview', 'health'],
    queryFn: () => apiClient.get<PlatformHealth>('/api/overview/health'),
    staleTime: 1000 * 30, // 30 seconds
    refetchInterval: 1000 * 15, // 15 seconds
  });
};
```

### 3.5 Recommended Actions Hook

```typescript
// src/features/overview/api/useRecommendedActions.ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../shared/api/client';

interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}

export const useRecommendedActions = () => {
  return useQuery({
    queryKey: ['overview', 'actions'],
    queryFn: () => apiClient.get<RecommendedAction[]>('/api/overview/actions'),
    staleTime: 1000 * 60, // 1 minute
  });
};
```

---

## 4. Route Configuration

```tsx
// src/features/overview/routes/OverviewRoutes.tsx
import { Route } from 'react-router-dom';
import { HomeWorkspace } from '../components/HomeWorkspace';

export const OverviewRoutes = () => [
  <Route key="overview" path="/app/overview" element={<HomeWorkspace />} />,
];
```

---

## 5. Design Compliance

This screen follows the AEGIX Design Constitution:

- **No decorative charts:** Data is presented in tables and lists
- **No fancy KPI cards:** Simple, functional data display
- **No hero sections:** Content is the focus
- **No AI style:** Clean, professional interface
- **No glassmorphism:** Flat, functional design
- **No startup appearance:** Enterprise-grade aesthetics
- **No cybersecurity clichés:** No hexagons, no glowing effects, no "hacker" tropes

The interface answers the operational questions:
- **What is happening?** Operations feed shows recent activity
- **What requires attention?** Enterprise status shows incident count
- **What is the current enterprise health?** Platform health and compliance status
- **What should I do next?** Recommended actions provide clear next steps