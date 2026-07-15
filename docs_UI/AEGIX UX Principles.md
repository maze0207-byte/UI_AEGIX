# AEGIX UX Principles

**Version 1.0 — Founding Document**
**Status: Permanent reference. All user experience decisions must conform to this document.**

---

## 0. Purpose of This Document

This document defines the user experience principles for AEGIX — the rules governing how users interact with the platform, navigate between functions, and accomplish their work. It is not a UI specification; it is a behavioral contract between the software and the professionals who use it daily.

AEGIX is an **Enterprise Asset Protection Platform** — an operating environment for IT and security teams. Every interaction must support efficiency, precision, and trust.

---

## 1. User Journey

### 1.1 Primary User Personas

| Persona | Role | Primary Goals |
|---|---|---|
| Security Analyst | Tier 1/2 analyst | Monitor alerts, investigate incidents, respond to threats |
| System Administrator | IT operations | Manage assets, configure policies, maintain system health |
| Compliance Officer | Auditor/Compliance | Verify controls, generate reports, track compliance |
| CISO/Executive | Leadership | View dashboards, review reports, assess risk |

### 1.2 Core Journey Patterns

**Daily Monitoring Flow:**
1. Login → Overview dashboard
2. Review critical alerts
3. Navigate to relevant module (incidents, assets, etc.)
4. Take action or investigate
5. Return to overview or next task

**Incident Response Flow:**
1. Alert notification or manual detection
2. Navigate to incident detail
3. Review evidence and timeline
4. Assign and execute response actions
5. Document and close

**Policy Management Flow:**
1. Navigate to policies
2. Create or edit policy
3. Assign to assets or groups
4. Monitor policy compliance
5. Review and adjust

### 1.3 Journey Principles

- **No dead ends:** Every action leads to a clear next state
- **Persistent context:** Users never lose their place
- **Reversible decisions:** Actions can be undone or modified
- **Clear outcomes:** Users know when a task is complete

---

## 2. Interaction Rules

### 2.1 Click and Tap Behavior

- **Single click:** Primary action on buttons and links
- **Double click:** Navigate to detail view (tables/lists)
- **Right click:** Context menu for row items
- **No hover-only actions:** All actions available via click

### 2.2 Selection Patterns

- **Single selection:** Default for most lists
- **Multi-selection:** Checkbox column for bulk actions
- **Selection persistence:** Selections maintained during navigation
- **Clear selection:** Escape key or clear button

### 2.3 Form Interaction

- **Auto-save drafts:** Forms save automatically as users type
- **No dirty state warnings:** Changes are always saved
- **Inline validation:** Errors appear as user types
- **No form wizards:** All fields visible at once

### 2.4 Data Manipulation

- **Inline editing:** Edit directly in tables where possible
- **No modal forms:** Except for complex multi-step actions
- **Immediate feedback:** Changes reflect instantly
- **No confirmation for every action:** Only for destructive operations

---

## 3. Navigation Rules

### 3.1 Primary Navigation

- **Persistent sidebar:** Always visible, collapsible to icons
- **One-level depth:** No nested sub-menus
- **Active state:** Current module highlighted in Signal Blue
- **No breadcrumbs in sidebar:** Breadcrumbs in content area only

### 3.2 Secondary Navigation

- **Tabs:** For related views within a page
- **No more than 5 tabs:** Excess views become separate pages
- **Tab order:** Logical left-to-right progression
- **Persistent tabs:** State maintained when switching

### 3.3 Navigation Patterns

- **Master-detail:** List on left, detail on right
- **Drill-down:** Click row to see detail
- **No back button dependency:** Navigation always available
- **No orphaned pages:** Every page reachable from navigation

### 3.4 Navigation Principles

- **Predictable paths:** Same action always goes to same place
- **No surprise redirects:** Users know where they're going
- **Keyboard accessible:** All navigation via keyboard
- **No navigation timeouts:** Session-based, not time-based

---

## 4. Search Rules

### 4.1 Global Search

- **Always visible:** Top bar, always active
- **Instant results:** Search as you type
- **Fuzzy matching:** Partial matches included
- **Result types:** Assets, incidents, policies, indicators

### 4.2 Search Behavior

- **No search button:** Results update on keystroke
- **Debounced:** 300ms delay to prevent excessive queries
- **Clear on escape:** Escape key clears search
- **Results in context:** Click result navigates to that item

### 4.3 Filter Patterns

- **Inline filters:** Above table, always visible
- **No filter drawers:** Filters don't hide behind menus
- **Filter persistence:** Saved in workspace
- **Multi-value filters:** Support multiple selections

### 4.4 Search Principles

- **Search over browse:** Encourage search for known items
- **No empty search results:** Show "no results" state
- **Search history:** Recent searches available
- **No search suggestions:** Keep search focused

---

## 5. Keyboard Shortcuts

### 5.1 Global Shortcuts

| Shortcut | Action |
|---|---|
| `/` | Focus global search |
| `Ctrl/Cmd + K` | Open command palette |
| `Ctrl/Cmd + B` | Toggle sidebar |
| `Ctrl/Cmd + 1-9` | Navigate to numbered sidebar item |
| `Ctrl/Cmd + Shift + F` | Focus filter bar |
| `Ctrl/Cmd + N` | New item (context dependent) |
| `Ctrl/Cmd + S` | Save (in forms) |
| `Ctrl/Cmd + Z` | Undo |
| `Delete` | Delete selected item |
| `Escape` | Close modal, clear selection, clear search |

### 5.2 Table Shortcuts

| Shortcut | Action |
|---|---|
| `Arrow Up/Down` | Navigate rows |
| `Space` | Select/deselect row |
| `Enter` | Open detail view |
| `Tab` | Navigate to next cell |
| `Shift + Tab` | Navigate to previous cell |

### 5.3 Modal Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl/Cmd + Enter` | Confirm modal |
| `Escape` | Close modal |
| `Tab` | Navigate modal controls |

### 5.4 Shortcut Principles

- **No custom shortcuts:** Standard patterns only
- **Discoverable:** Shortcuts shown in tooltips
- **No shortcut conflicts:** All shortcuts unique
- **Configurable:** Power users can customize

---

## 6. Context Menus

### 6.1 Row Context Menus

- **Right-click on table row:** Context menu appears
- **Menu position:** Below clicked row
- **Actions:** Edit, delete, assign, view details
- **No nested menus:** All actions at same level

### 6.2 Empty Space Context Menus

- **Right-click on empty table area:** Table actions
- **Actions:** New item, refresh, export
- **No browser context menu:** Prevent default

### 6.3 Context Menu Principles

- **Keyboard accessible:** Context menu via keyboard
- **No hover activation:** Click or context key only
- **Clear labels:** Actions use full words, not icons
- **Destructive actions:** Red text, confirmation required

---

## 7. Loading Behavior

### 7.1 Initial Load

- **Skeleton screens:** For structured content
- **No spinners for every request:** Only for user-initiated actions
- **Progressive loading:** Show what's ready, load rest
- **No loading delays:** Show something immediately

### 7.2 Data Loading

- **Table loading:** Skeleton rows matching table structure
- **Detail loading:** Skeleton for each section
- **No loading text:** Let skeleton show structure
- **Loading timeout:** Show error after 30 seconds

### 7.3 Loading Principles

- **No decorative loading:** Loading is functional
- **No loading animations:** No bouncing, pulsing, or spinning
- **Loading state clear:** Users know what's loading
- **No loading blocking:** Users can cancel long loads

---

## 8. Empty States

### 8.1 Empty State Types

| Type | Message | Action |
|---|---|---|
| No data | "No [items] found" | Create or import |
| No results | "No results match your search" | Clear filters |
| No access | "You don't have permission" | Contact administrator |
| Feature not available | "This feature is not available" | Learn more link |

### 8.2 Empty State Principles

- **Clear message:** State explained in one sentence
- **Actionable:** Next step always available
- **No illustrations:** No decorative empty state art
- **No humor:** Professional tone only

### 8.3 Empty State Examples

```
No assets found
Import assets or adjust your filters to see results.
[Import Assets] [Adjust Filters]
```

```
No incidents match your search
Clear filters or adjust your search criteria.
[Clear Filters]
```

---

## 9. Error Messages

### 9.1 Error Message Structure

- **What happened:** Clear description of the error
- **Why it happened:** Brief explanation if not obvious
- **What to do:** Clear next step

### 9.2 Error Message Types

| Type | Example |
|---|---|
| Validation | "Asset name is required" |
| Network | "Unable to connect to server. Check your connection." |
| Permission | "You don't have permission to perform this action" |
| System | "An error occurred. Please try again or contact support." |

### 9.3 Error Message Principles

- **No error codes:** User-friendly language only
- **No stack traces:** Technical details in logs only
- **Inline for forms:** Errors appear below field
- **Toast for system errors:** Non-blocking notifications
- **No error dialogs:** No blocking error popups

### 9.4 Error Recovery

- **Inline errors:** Fix and continue
- **Retry buttons:** For transient errors
- **Undo for destructive:** Actions can be reversed
- **No error cascades:** One error doesn't cause more

---

## 10. Confirmation Dialogs

### 10.1 When to Confirm

- **Destructive actions:** Delete, remove, purge
- **Irreversible changes:** Policy activation, system changes
- **No confirmation for:** Save, edit, view actions

### 10.2 Confirmation Dialog Structure

- **Title:** Action being confirmed
- **Message:** What will happen
- **Buttons:** Confirm (primary), Cancel (default)

### 10.3 Confirmation Dialog Examples

```
Delete Asset?
This will permanently remove the asset and all associated data.
[Delete] [Cancel]
```

```
Activate Policy?
This policy will be applied to all matching assets immediately.
[Activate] [Cancel]
```

### 10.4 Confirmation Principles

- **No "Are you sure?":** State what will happen
- **Destructive action red:** Delete buttons in red
- **No confirmation for every action:** Only critical
- **Keyboard accessible:** Enter confirms, Escape cancels

---

## 11. Accessibility

### 11.1 Keyboard Navigation

- **Tab order:** Follows visual hierarchy
- **Skip links:** Skip to main content
- **Focus visible:** 2px Signal Blue outline
- **No keyboard traps:** Users can navigate away

### 11.2 Screen Reader Support

- **ARIA labels:** All interactive elements labeled
- **Landmark roles:** main, navigation, search, etc.
- **Live regions:** For dynamic updates
- **No ARIA overrides:** Use native HTML when possible

### 11.3 Visual Accessibility

- **Contrast:** Minimum 4.5:1 for text
- **Text scaling:** Supports 200% zoom
- **No color-only meaning:** Text or icons always present
- **Reduced motion:** Respects system preference

### 11.4 Cognitive Accessibility

- **Consistent patterns:** Same everywhere
- **Clear labels:** No ambiguous icons
- **Predictable:** Users know what to expect
- **No time pressure:** No auto-dismissing critical info

---

## 12. Micro Interactions

### 12.1 What Are Micro Interactions

Micro interactions are small, functional animations that communicate state changes:
- Button press states
- Toggle switches
- Progress indicators
- Loading states

### 12.2 Micro Interaction Rules

- **Functional only:** No decorative micro-interactions
- **Fast:** 100-150ms duration
- **No bounce or spring:** Linear or ease-in-out
- **No looping:** One cycle only

### 12.3 Micro Interaction Examples

- **Button press:** Background darkens 10% on click
- **Toggle:** Smooth transition between states
- **Progress:** Linear fill, no animation
- **Success:** Brief checkmark, no celebration

### 12.4 Micro Interaction Prohibitions

- No hover animations
- No press effects
- No loading spinners for every request
- No success celebrations
- No error shake effects

---

## 13. Enterprise UX Standards

### 13.1 Professional Standards

- **No consumer patterns:** No social media, no gamification
- **No startup aesthetics:** No rounded corners, no playful language
- **No marketing language:** No "awesome", "amazing", "revolutionary"
- **No emoji:** No emoji anywhere in the product

### 13.2 Operational Standards

- **8-hour day design:** Optimized for extended use
- **No eye strain:** Dark theme, high contrast
- **No repetitive strain:** Efficient keyboard shortcuts
- **No cognitive overload:** Clear information hierarchy

### 13.3 Trust Standards

- **Accurate data:** Every number is correct
- **Clear causality:** Actions have clear outcomes
- **No false urgency:** No pulsing, no countdowns
- **No surprises:** System behaves predictably

### 13.4 Compliance Standards

- **Audit trail visible:** Every action logged
- **Data lineage:** Source and processing clear
- **Role-based access:** Users see appropriate controls
- **Export ready:** All data can be exported

---

## 14. The One-Sentence Test

Before implementing any user experience pattern, ask:

> "Does this make AEGIX feel like a more precise, trustworthy operating environment — or does it make it feel like a dashboard someone tried to make look impressive?"

If it is the latter, it does not ship as designed. The Design Constitution and this UX Principles document are the standing authority for that decision.