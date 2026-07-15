# AEGIX UI - Application Shell

**Version 1.0 — Production Ready**

This is the permanent application shell for the AEGIX Enterprise Asset Protection Platform. It provides the foundational layout and navigation that all future pages will use.

---

## Installation

```bash
# Navigate to the UI directory
cd UI

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint on source files |
| `npm run type-check` | Run TypeScript type checking |

---

## Folder Structure

```
UI/
├── src/
│   ├── app/
│   │   ├── components/           # Shared layout components
│   │   │   ├── LeftNavigation.tsx
│   │   │   ├── TopHeader.tsx
│   │   │   └── BreadcrumbArea.tsx
│   │   ├── layouts/              # Layout components
│   │   │   ├── AuthLayout.tsx
│   │   │   ├── MainLayout.tsx
│   │   │   └── BlankLayout.tsx
│   │   └── App.tsx               # Root application component
│   ├── features/                 # Future feature modules
│   ├── pages/                    # Future page components
│   ├── router/                   # Future routing configuration
│   ├── hooks/                    # Future custom hooks
│   ├── services/                 # Future API services
│   ├── store/                    # Future Zustand stores
│   ├── theme/                    # Future theme configuration
│   ├── types/                    # Future TypeScript types
│   ├── utils/                    # Future utility functions
│   ├── styles/
│   │   └── globals.css           # Global styles
│   └── main.tsx                  # Application entry point
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

---

## Layouts

### MainLayout

The primary application layout for authenticated users. Includes:

- **Left Navigation Area**: Vertical navigation rail with module links
- **Top Header**: Global search, notifications, organization, and user menu
- **Breadcrumb Area**: Path navigation display
- **Content Container**: Main content area with padding

### AuthLayout

Layout for authentication pages (login, register, etc.). Centers content vertically.

### BlankLayout

Layout for error pages and special cases. No navigation or header.

---

## How Future Modules Plug Into This Shell

### 1. Adding a New Module

Create a new folder in `src/features/`:

```
src/features/
├── new-module/
│   ├── api/
│   ├── components/
│   ├── hooks/
│   └── routes/
```

### 2. Adding Navigation Items

Edit `src/app/components/LeftNavigation.tsx` to add new navigation items:

```tsx
const navigationItems = [
  // ... existing items
  { id: 'new-module', label: 'New Module', icon: Icon, path: '/app/new-module' },
];
```

### 3. Adding Routes

Routes are automatically rendered through the `Outlet` in `MainLayout`. Create route files in `src/features/new-module/routes/` and they will be nested under `/app/*`.

### 4. Using Shared Components

All layout components are available for import:

```tsx
import { LeftNavigation } from '@/app/components/LeftNavigation';
import { TopHeader } from '@/app/components/TopHeader';
import { BreadcrumbArea } from '@/app/components/BreadcrumbArea';
```

### 5. State Management

Use Zustand for client state:

```tsx
import { create } from 'zustand';

interface ModuleState {
  // ... state definition
}

export const useModuleStore = create<ModuleState>()((set) => ({
  // ... store implementation
}));
```

### 6. Data Fetching

Use TanStack Query for server state:

```tsx
import { useQuery } from '@tanstack/react-query';

export const useModuleData = () => {
  return useQuery({
    queryKey: ['module', 'data'],
    queryFn: () => fetchModuleData(),
  });
};
```

---

## Design Compliance

This shell follows the AEGIX Design Constitution:

- **Dark theme default**: Deep charcoal-navy background (#0a0f1a)
- **No decorative elements**: Every component serves a functional purpose
- **Sharp corners**: No rounded "startup" UI shapes
- **Minimal motion**: Only functional transitions
- **Signal Blue accent**: Used only for interactive elements
- **Cool steel neutrals**: No warm greys

---

## The One-Sentence Test

Before adding any new feature to this shell, ask:

> "Does this make AEGIX feel like a more precise, trustworthy operating environment — or does it make it feel like a dashboard someone tried to make look impressive?"

If it is the latter, it does not ship as designed.