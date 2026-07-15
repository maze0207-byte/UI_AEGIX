# AEGIX Navigation System

**Version 1.0 — Founding Document**
**Status: Permanent reference. All navigation implementation must conform to this document.**

---

## 0. Purpose of This Document

This document defines the navigation system for AEGIX — a unique, scalable navigation architecture designed for enterprise asset protection operations. It replaces traditional admin sidebar patterns with a purpose-built system that supports hundreds of pages while maintaining operational efficiency.

The navigation system is built for professionals who work in AEGIX for 8+ hours daily, requiring:
- Rapid access to any function
- Persistent context during tasks
- Clear information hierarchy
- Scalable growth without complexity

---

## 1. Navigation Rail

### 1.1 Core Concept

The Navigation Rail is a vertical, icon-only strip on the left edge of the screen. It provides instant access to primary modules without consuming horizontal space.

```
┌─────────────┬─────────────────────────────────────────────┐
│ Navigation  │                                             │
│ Rail        │                                             │
│             │                                             │
│ [O]         │  Overview                                   │
│ [A]         │  Assets                                     │
│ [P]         │  Policies                                   │
│ [I]         │  Incidents                                  │
│ [T]         │  Threat Intel                               │
│ [H]         │  Hunting                                    │
│ [C]         │  Compliance                                 │
│ [R]         │  Reports                                    │
│ [S]         │  Settings                                   │
│             │                                             │
└─────────────┴─────────────────────────────────────────────┘
```

### 1.2 Rail Specifications

| Property | Value |
|---|---|
| Width (expanded) | 240px |
| Width (collapsed) | 64px |
| Icon size | 20px |
| Item height | 48px |
| Hover delay | 300ms (prevents accidental activation) |
| Active indicator | 2px Signal Blue bar on left |
| Background | #141a26 (secondary neutral) |

### 1.3 Rail Behavior

- **Always visible:** Never hidden, only collapsed to icons
- **Hover expansion:** Mouse over expands to show labels
- **Click to pin:** Click an item to keep rail expanded
- **Keyboard navigation:** `Ctrl/Cmd + 1-9` to jump to items
- **No mega-menus:** Each item opens a single panel

### 1.4 Rail States

| State | Trigger | Behavior |
|---|---|---|
| Collapsed | Default on narrow screens | Icons only, hover shows labels |
| Expanded | Hover or click | Icons + labels, persistent |
| Active | Click on item | Item highlighted, panel opens |
| Disabled | No permission | Dimmed, no hover effect |

---

## 2. Expandable Navigation Panel

### 2.1 Core Concept

The Expandable Navigation Panel appears to the right of the Navigation Rail when a module is active. It shows the current module's child pages and provides secondary navigation.

```
┌─────────────┬──────────────┬─────────────────────────────────────────────┐
│ Navigation  │ Module Panel │                                             │
│ Rail        │              │                                             │
│             │ Overview     │  Dashboard                                │
│ [O]         │              │  System Health                            │
│ [A]         │ Assets       │  Devices                                  │
│ [P]         │              │  Tracking                                 │
│ [I]         │ Incidents    │  All Incidents                              │
│ [T]         │              │  Threat Intel                             │
│ [H]         │ Hunting      │  Queries                                  │
│ [C]         │              │  Compliance                               │
│ [R]         │ Reports      │  Reports                                    │
│ [S]         │              │  Settings                                   │
│             │              │                                             │
└─────────────┴──────────────┴─────────────────────────────────────────────┘
```

### 2.2 Panel Specifications

| Property | Value |
|---|---|
| Width | 200px (fixed) |
| Background | #0a0f1a (primary neutral) |
| Text color | #e6e9ef (primary text) |
| Hover background | #1e2533 (elevated) |
| Active background | #1e2533 (elevated) |
| Border | 1px solid #2a3040 |

### 2.3 Panel Behavior

- **Auto-collapse:** Panel closes when user clicks content
- **Pin option:** Pin button keeps panel open
- **Keyboard navigation:** Arrow keys to navigate items
- **No nested menus:** All items are direct links
- **Dynamic width:** Panel width never changes

### 2.4 Panel Content

Each panel contains:
- Module title (top)
- List of child pages (middle)
- Workspace switcher (bottom)
- Collapse/expand control (bottom)

---

## 3. Breadcrumbs

### 3.1 Core Concept

Breadcrumbs appear above the content area, showing the user's path through the application hierarchy.

```
Home / Assets / Devices / Device-001
```

### 3.2 Breadcrumb Specifications

| Property | Value |
|---|---|
| Separator | `/` (forward slash) |
| Text size | 13px (body) |
| Text color | #a0a8b8 (secondary) |
| Hover color | #e6e9ef (primary) |
| Max items | 5 (truncated with ellipsis) |
| Background | Transparent |

### 3.3 Breadcrumb Behavior

- **Click to navigate:** Each crumb is clickable
- **No dropdown menus:** Simple linear path
- **Dynamic generation:** Based on current route
- **No home icon:** Text "Home" or "AEGIX" only
- **Persistent:** Always visible in content area

### 3.4 Breadcrumb Examples

```
AEGIX / Overview
AEGIX / Assets / All Assets
AEGIX / Assets / Devices / Device-001 / History
AEGIX / Incidents / INC-2024-0012 / Evidence
```

---

## 4. Global Search

### 4.1 Core Concept

Global Search is a persistent input at the top of the content area. It searches across all modules and provides instant results.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🔍 Search assets, incidents, policies, indicators...                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Search Specifications

| Property | Value |
|---|---|
| Position | Top of content area, left-aligned |
| Width | 400px (min), 600px (max) |
| Height | 36px |
| Background | #141a26 |
| Border | 1px solid #2a3040 |
| Text color | #e6e9ef |
| Placeholder | "Search assets, incidents, policies, indicators..." |
| Shortcut | `/` to focus |

### 4.3 Search Behavior

- **Instant results:** Search as you type (debounced 300ms)
- **Fuzzy matching:** Partial matches included
- **Result types:** Assets, incidents, policies, indicators, users
- **No search button:** Results update on keystroke
- **Escape to clear:** Escape key clears search
- **Click away to close:** Results close on blur

### 4.4 Search Results

Results appear in a dropdown below the search input:
- Maximum 10 results per type
- Type header for each category
- Keyboard navigation with arrow keys
- Enter to select, Escape to close

---

## 5. Command Palette

### 5.1 Core Concept

The Command Palette is a keyboard-first interface for accessing any function in AEGIX. It appears as a centered modal with a search input.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ > go to assets                                                              │
│                                                                             │
│ Navigate to:                                                                │
│ • All Assets                                                                 │
│ • Devices                                                                    │
│ • Tracking                                                                   │
│                                                                             │
│ Actions:                                                                    │
│ • New Asset                                                                  │
│ • New Policy                                                                 │
│ • New Incident                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Command Palette Specifications

| Property | Value |
|---|---|
| Trigger | `Ctrl/Cmd + K` or `Ctrl/Cmd + Shift + P` |
| Width | 600px |
| Max height | 500px |
| Background | #141a26 |
| Border | 1px solid #3b82f6 (Signal Blue) |
| Input height | 48px |
| Result height | 40px |

### 5.3 Command Types

| Type | Prefix | Examples |
|---|---|---|
| Navigation | `go to` | `go to assets`, `go to incidents` |
| Actions | `new` | `new asset`, `new policy` |
| Views | `view` | `view dashboard`, `view reports` |
| Settings | `set` | `set theme`, `set workspace` |

### 5.4 Command Behavior

- **Fuzzy search:** Partial matches work
- **No categories:** Flat list of commands
- **Keyboard only:** Arrow keys, Enter, Escape
- **No mouse required:** Fully keyboard accessible
- **Recent commands:** Most used at top

---

## 6. Workspace Navigation

### 6.1 Core Concept

Workspace Navigation allows users to switch between saved operational contexts. Each workspace contains filters, layouts, and preferences.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Workspace: Production Assets ▼                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Workspace Selector

| Property | Value |
|---|---|
| Position | Top of module panel |
| Width | 100% of panel |
| Height | 40px |
| Background | #1e2533 |
| Text color | #e6e9ef |
| Icon | Chevron down |

### 6.3 Workspace Behavior

- **Persistent:** Workspace saved with user profile
- **Shareable:** Workspaces can be shared with team
- **Default:** "Default" workspace for new users
- **Quick switch:** `Ctrl/Cmd + Shift + W` to open selector
- **No auto-switch:** User must explicitly change

### 6.4 Workspace Management

Workspaces can be managed in Settings:
- Create, rename, delete workspaces
- Set workspace permissions
- Export/import workspace configurations
- Clone existing workspaces

---

## 7. Context Navigation

### 7.1 Core Concept

Context Navigation appears within pages to provide access to related functions. It is not a separate navigation system but contextual actions.

### 7.2 Context Navigation Types

| Type | Location | Purpose |
|---|---|---|
| Tab Bar | Below page title | Switch between related views |
| Action Bar | Top right of content | Primary actions for current view |
| Filter Bar | Above table/list | Filter and sort controls |
| Pagination | Below table/list | Navigate pages of data |

### 7.3 Tab Bar

- **Maximum 5 tabs:** Excess becomes separate pages
- **Active state:** Signal Blue underline
- **Keyboard navigation:** `Ctrl/Cmd + Shift + Arrow` to switch
- **No icons:** Text labels only
- **Persistent:** State maintained when switching

### 7.4 Action Bar

- **Primary actions:** Buttons for current context
- **Secondary actions:** In overflow menu (three dots)
- **No more than 3 primary actions:** Rest in overflow
- **Icon + text:** All actions have both
- **Destructive actions:** Red text, confirmation required

---

## 8. Navigation Scaling

### 8.1 Horizontal Scaling

As modules grow, the Navigation Rail remains constant:
- New modules added to rail
- Module panel expands to show more items
- No horizontal scrolling in panel
- Search finds new items automatically

### 8.2 Vertical Scaling

For modules with many child pages:
- Most used items at top
- Alphabetical for remaining items
- Search within module (future)
- Favorites/pinning (future)

### 8.3 Future Expansion

The navigation system supports:
- Nested modules (max 2 levels)
- Custom module ordering
- User-created shortcuts
- Role-based module visibility
- Multi-tenant module isolation

---

## 9. Navigation States

### 9.1 Loading State

- Skeleton in place of navigation items
- No click targets during load
- Spinner in search input
- Panel shows "Loading..." text

### 9.2 Error State

- Error message in panel
- Retry button for failed loads
- Navigation still functional
- Search shows error toast

### 9.3 Empty State

- "No results" in search dropdown
- "No items" in module panel
- Clear call to action
- No decorative illustrations

---

## 10. Keyboard Navigation

### 10.1 Navigation Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl/Cmd + 1-9` | Jump to navigation rail item |
| `Ctrl/Cmd + K` | Open command palette |
| `Ctrl/Cmd + B` | Toggle navigation rail |
| `Ctrl/Cmd + Shift + W` | Open workspace selector |
| `/` | Focus global search |
| `Escape` | Close any open navigation |

### 10.2 Navigation Flow

1. **Tab** moves between interactive elements
2. **Enter** activates navigation items
3. **Arrow keys** navigate within menus
4. **Escape** closes open navigation
5. **Type** in command palette for quick access

---

## 11. Mobile Navigation

### 11.1 Mobile Behavior

- Navigation rail becomes bottom bar
- Module panel becomes slide-over drawer
- Breadcrumbs hidden (use back button)
- Search always visible in header
- Command palette via floating button

### 11.2 Mobile Specifications

| Property | Value |
|---|---|
| Bottom bar height | 56px |
| Drawer width | 80% of screen |
| Touch targets | 44px minimum |
| No hover states | Touch only |
| Swipe to close | Drawer and search |

---

## 12. The One-Sentence Test

Before implementing any navigation pattern, ask:

> "Does this make AEGIX feel like a more precise, trustworthy operating environment — or does it make it feel like a dashboard someone tried to make look impressive?"

If it is the latter, it does not ship as designed. The Design Constitution and this Navigation System document are the standing authority for that decision.