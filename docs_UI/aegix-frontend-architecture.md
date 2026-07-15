# AEGIX Frontend Architecture

**Version 1.0 — Founding Document**
**Status: Permanent reference, subordinate only to the AEGIX Design Constitution. All future pages, modules, and features must be built inside this architecture, not around it.**

---

## 0. Purpose and Mandate

The Design Constitution defines what AEGIX must *feel* like. This document defines the *structural system* that makes it possible to build hundreds of pages — across dozens of product areas, built by many different engineers and agents over years — that all still feel like one coherent, calm, operational product.

The core design constraint of this document is stated once, up front, because every decision below serves it:

> **A new page must be assembled from existing primitives and existing layout shells, in a predictable location, without inventing new navigation, new spacing, new breakpoints, or new interaction patterns.**

If adding page #300 requires a design decision that page #4 didn't already answer, this architecture has failed. This document exists to make page #300 boring.

This document defines architecture only: navigation philosophy, layout system, workspace philosophy, responsive strategy, spacing, grid, tokens, accessibility, interaction, loading, empty/error states, search, and animation. It does not define any specific page, screen, or feature.

---

## 1. Navigation Philosophy

### 1.1 Principle: Navigation is a fixed skeleton, not a per-feature decision

AEGIX uses a **three-tier, fixed navigation skeleton** that every page lives inside. No page or feature is ever permitted to invent its own top-level navigation pattern. New functionality is always placed *into* one of these tiers — the tiers themselves do not grow in kind, only in content.

| Tier | Role | Behavior |
|---|---|---|
| **Tier 1 — Domain Rail** | The permanent, always-visible left rail representing the fixed top-level domains of the platform (e.g., Assets, Findings, Policies, Reports, Administration). | Icon + label, collapsible to icon-only. Extremely stable — new domains are added rarely and deliberately, treated as an information-architecture decision, not a feature decision. |
| **Tier 2 — Section Navigation** | A contextual list of sections within the currently active domain, shown in a secondary panel or top-of-content strip. | Changes based on Tier 1 selection. This is where the platform scales to hundreds of pages — a domain can hold as many sections as needed without disturbing Tier 1. |
| **Tier 3 — In-Page Navigation** | Tabs, sub-tabs, or a local table of contents *within* a single page for related sub-views (e.g., an asset's Overview / Vulnerabilities / History). | Fully page-local. Never affects the URL structure of other pages, never leaks into Tier 1/2. |

### 1.2 Rules

- **Tier 1 is a closed set.** It is reviewed as a governance decision, not extended casually by any single feature team. A platform with hundreds of pages must still show a first-time enterprise user an unchanging, learnable set of top-level domains.
- **Tier 2 scales infinitely; Tier 1 does not.** All page-count growth happens by adding rows to Tier 2 lists or nodes to Tier 3 tabs — never by widening Tier 1.
- **The current location is always legible from the navigation alone**, without needing breadcrumbs to explain it — active-state styling in all three tiers is mandatory and consistent everywhere.
- **Breadcrumbs are provided as a supplementary wayfinding aid for deep hierarchies** (e.g., Asset Groups → Group → Asset → Finding), not as the primary navigation method. They are generated from the route structure, never hand-authored per page.
- **Global utilities (search, notifications, account, help) live in a persistent top utility bar**, separate from the domain rail, and never migrate into page content.
- **No page-specific global navigation.** A page may never add its own top-level nav item, floating menu, or secondary sidebar that isn't Tier 2/3. This is the single most important rule for surviving hundreds of pages without chaos.

---

## 2. Layout System

### 2.1 Principle: A small set of layout shells, reused everywhere

Every page in AEGIX is rendered inside exactly one of a small, closed set of **layout shells**. A shell owns chrome (rail, utility bar, section nav, page header region) and hands the content area to the page. Pages never redefine chrome.

**Closed set of shells (illustrative — the count stays small by design):**

1. **List/Table Shell** — for any page whose job is to browse, filter, and act on a collection of records (assets, findings, policies, users). Owns: page header with title + primary action, filter/toolbar region, content region, pagination/footer region.
2. **Detail/Record Shell** — for any page centered on one entity (one asset, one finding, one policy). Owns: header with entity identity + status + primary actions, Tier 3 tab strip, content region, optional right-hand context/summary panel.
3. **Form/Configuration Shell** — for creation and settings-style pages. Owns: header, structured section stack, sticky save/cancel action bar.
4. **Analytical/Overview Shell** — for summary and reporting surfaces. Owns: header, structured content-block grid (see §6), never a freeform canvas.
5. **Full-Bleed/Focus Shell** — a rare, deliberately restricted shell for a small number of surfaces that require full attention (e.g., guided setup, incident triage focus mode). Not a place to escape the design system — it still uses the same tokens, type scale, and spacing.

### 2.2 Rules

- **A new page must select an existing shell.** Proposing a sixth shell is an architecture decision, escalated and rare — not a per-page choice.
- **Shells own structure; pages own content.** A page component receives content regions to fill (header actions, body, panel) — it does not control rail width, header height, or chrome padding.
- **Every shell renders the three navigation tiers identically.** The difference between shells is content structure, never chrome behavior.
- **The right-hand context panel (in Detail shell) is a system-level pattern**, not a per-page invention — used consistently for supplementary metadata, related items, or activity history, so users learn its meaning once.

---

## 3. Workspace Philosophy

### 3.1 Principle: AEGIX is a persistent workspace, not a series of destinations

Users do not "visit" AEGIX pages the way they visit marketing pages; they inhabit the product for a working session. The architecture treats state, context, and place as persistent and resumable.

- **Context follows the user across navigation.** Active filters, selected time ranges, and scoping (e.g., "this business unit," "this environment") persist across Tier 2 navigation within a domain unless the user deliberately resets them. A user should never have to re-establish context after every click.
- **Nothing is ever a dead end.** Every list row, table cell, and reference to another entity is a real navigable link to that entity's Detail shell. The whole product is a connected graph of records, not isolated screens.
- **Multi-tasking is respected, not fought.** Where the user's mental model expects to keep something open while working elsewhere (e.g., reviewing a finding while triaging a queue), the architecture prefers panels/drawers over full navigation, so the user's place in the list is preserved.
- **The workspace remembers state across sessions** for things like column configuration, saved filters, and last-viewed scope — this is expected behavior for an 8-hour-a-day operational tool, not a "nice to have."
- **No page ever requires the user to remember information from another page.** Cross-references (e.g., "assigned to," "linked policy") are always rendered as live, named links back into the graph, never as raw IDs the user must look up manually.

---

## 4. Responsive Strategy

### 4.1 Principle: AEGIX is designed desktop-first as an operational console, with defined, deliberate degradation — not a fluid "mobile-first" reflow

This is an enterprise IT/security console used primarily on large monitors in dense, multi-column layouts. The responsive strategy is about **graceful degradation of density**, not about optimizing small screens as a primary experience.

### 4.2 Breakpoint tiers (fixed, closed set — do not add ad hoc breakpoints per page)

| Tier | Approx. width | Behavior |
|---|---|---|
| **Console (default)** | ≥1440px | Full three-tier navigation, full density, multi-column content, right-hand context panels shown inline. |
| **Standard** | 1024–1439px | Domain rail collapses to icon-only by default (expandable on demand); context panels remain but may become collapsible/toggleable; table columns reduce to essential set per page-level column priority (see §6.3). |
| **Compact** | 768–1023px | Section navigation (Tier 2) moves from persistent panel to a dropdown/overflow pattern; context panels become an on-demand drawer, not inline; content shifts from multi-column to single dominant column plus overflow. |
| **Reduced** | <768px | Read-oriented, single-column, task-focused mode intended for monitoring/triage-on-the-go, not full data entry or bulk operations. Bulk/table-heavy workflows explicitly communicate "use a larger screen for this task" rather than cramming a dense table into a phone width. |

### 4.3 Rules

- Breakpoints are defined once as tokens (§7) and consumed everywhere — no page-specific media queries with custom widths.
- **Density degrades before layout breaks.** At smaller tiers, the system prefers hiding secondary columns/panels (with an explicit way to reveal them) over shrinking type, cramming content, or introducing horizontal scrolling as a default experience.
- Every shell (§2) defines its own responsive behavior once, for all pages that use it — an individual page never overrides shell-level responsive rules.
- Touch targets scale up at Compact/Reduced tiers per accessibility rules (§8), they do not stay desktop-sized "for consistency."

---

## 5. Spacing System

### 5.1 Principle: One spacing scale, referenced by name, never by raw value

A single base unit drives an exponential-feeling but practically-tuned scale. Engineers and design tools reference spacing by **token name**, never by inserting arbitrary pixel/rem values.

### 5.2 Scale (base unit = 4)

| Token | Value | Primary use |
|---|---|---|
| `space-0` | 0 | Resets only |
| `space-1` | 4 | Icon-to-label gaps, tightest inline spacing |
| `space-2` | 8 | Compact internal padding, related-item spacing |
| `space-3` | 12 | Default control internal padding |
| `space-4` | 16 | Standard content padding, default gap between related elements |
| `space-5` | 20 | Gap between distinct field groups |
| `space-6` | 24 | Section internal padding, card padding |
| `space-8` | 32 | Gap between major content blocks |
| `space-10` | 40 | Gap between distinct page sections |
| `space-12` | 48 | Page-level top/side margins at Console tier |
| `space-16` | 64 | Reserved for rare, large-scale separation (e.g., focus-shell framing) |

### 5.3 Rules

- No inline/one-off spacing values in any component or page — if a needed value isn't on the scale, that is an architecture conversation, not a per-page exception.
- Spacing communicates **relationship**: the smaller the gap, the more related two elements are. Consistent gap sizes are how a new page becomes instantly scannable without the user learning it specifically.
- Density is controlled by which tokens a shell uses, not by inventing a smaller value — e.g., a "dense table mode" uses `space-2`/`space-3`, never a new `space-1.5`.

---

## 6. Grid System

### 6.1 Principle: A 12-column responsive grid drives all page-level content composition

- All shell content regions are built on a **12-column grid** with a fixed gutter (`space-6` at Console/Standard, `space-4` at Compact/Reduced) and fixed max content width per shell type, so line lengths and card widths stay consistent across the entire product.
- Content blocks (cards, panels, tables, form sections) always span a whole-number column count (e.g., 4, 6, 8, 12) — never arbitrary fractional widths. This is what allows hundreds of pages, built independently, to still visually align with one another.
- The Analytical/Overview shell composes its content strictly as a grid of fixed-span blocks (e.g., 12/6+6/4+4+4) chosen from a small set of standard block-span combinations — never a freeform masonry or custom-positioned layout.

### 6.2 Table density is a first-class grid concern

Because AEGIX is table/list heavy, tables are treated as structured grids with their own governance:

- Column order and visibility are user-configurable but **default to a priority order defined once per record type** (identity → status → key attributes → metadata → actions), so any new page listing that record type starts from the same defaults.
- Row height has exactly two system-wide modes — **Standard** and **Compact** — selected by the user once as a global or per-page preference, never invented per page.

### 6.3 Column priority for responsive collapse

Every column in every table declares a priority level (Primary / Secondary / Tertiary) at the data-model level, not the page level. As viewport tier decreases, tertiary columns hide first, then secondary — this makes responsive behavior automatic and consistent for any new table without per-page configuration.

---

## 7. Design Tokens

### 7.1 Principle: Tokens are the only legal way to reference a design decision

No component, page, or feature ever hardcodes a color, size, radius, shadow, duration, or font value. Everything routes through a token, organized in three layers so the system can evolve without breaking meaning:

**Layer 1 — Reference tokens** (raw values; the literal palette, scale, and metrics from the Constitution, e.g., a specific steel-navy value, a specific spacing number). Engineers never consume these directly.

**Layer 2 — System tokens** (semantic-but-generic roles that map to reference tokens, e.g., `color-surface-base`, `color-surface-raised`, `color-border-subtle`, `color-text-primary`, `color-text-secondary`, `color-accent-primary`, `radius-default`, `shadow-overlay`, `duration-fast`, `duration-standard`, `font-size-body`, `font-weight-emphasis`). This layer is what a component library is built against.

**Layer 3 — Component tokens** (narrow, component-scoped aliases of system tokens where a component needs its own name for clarity, e.g., `button-primary-bg` → `color-accent-primary`). Used sparingly, only where it genuinely aids clarity — not duplicated for every component by default.

### 7.2 Required token categories

- **Color**: surface levels (base/raised/overlay), border levels (subtle/default/strong), text levels (primary/secondary/tertiary/disabled/inverse), accent (single signal blue role), status (info/success/warning/critical), each with a "resting" and "emphasis" step.
- **Typography**: a closed type scale (a fixed number of size/weight/line-height combinations, named by role — e.g., `type-page-title`, `type-section-heading`, `type-body`, `type-caption`, `type-data-label`, `type-data-value` — never named by raw pixel size).
- **Spacing**: the scale in §5, as tokens.
- **Radius**: a small closed set (e.g., `radius-none`, `radius-sm`, `radius-default`) — consistent with the Constitution's "sharp to slightly softened" geometry rule; never a rounded/bubbly value.
- **Elevation/shadow**: a small closed set tied strictly to true overlay layers (menus, modals, tooltips), per the Constitution's minimal-elevation rule.
- **Motion**: duration and easing tokens (§13).
- **Breakpoints**: the tier widths in §4, as tokens, never hardcoded per component.
- **Z-index**: a fixed, documented stack (base, sticky chrome, dropdown, drawer, modal, toast) so overlapping surfaces are always predictable as the product grows.

### 7.3 Rules

- Both the light and dark theme (per Constitution §3.2) are two value-sets mapped to the **same** system token names — a component built once works correctly in either theme automatically, with zero component-level branching.
- Adding a token is a deliberate, reviewed action. Adding a *use* of an existing token is unrestricted and encouraged.

---

## 8. Accessibility Rules

Accessibility is a structural requirement, not a pass applied at the end, because a platform reaching hundreds of pages cannot be manually audited page-by-page.

- **Color is never the sole carrier of meaning.** Every status, error, or state indicator pairs color with text, icon, or pattern (directly enforced by the Constitution's status-color rule).
- **Contrast minimums are enforced at the token level.** Text/background token pairings are pre-validated to meet at least WCAG 2.1 AA (4.5:1 body text, 3:1 large text/UI components) as part of defining the token, so individual pages cannot accidentally create a non-compliant pairing.
- **Every interactive element is keyboard-reachable and keyboard-operable**, in a logical, predictable tab order that follows the visual reading order defined by the grid (§6) — this is a property of the shells, not something each page re-solves.
- **Focus is always visible.** A single, consistent system-wide focus style (a token, §7) is used everywhere; no component ever suppresses focus outlines without providing an equally visible replacement.
- **All non-text content has text alternatives** (icons carry `aria-label`/accessible names; status glyphs are never icon-only without a text equivalent available to assistive tech).
- **Motion respects reduced-motion preferences.** Every animation defined in §13 has a reduced/none fallback driven by the user's system preference, applied globally at the token/motion-system level, not opted into per component.
- **Touch targets meet minimum size** (44×44px equivalent) at Compact/Reduced responsive tiers, per §4.3.
- **Live regions are used for real-time/operational updates** (e.g., new critical finding appearing in a monitored list) so screen reader users are not silently left behind by an operational tool that updates without a page reload.
- Accessibility conformance is a property of the shared component library and shells — a new page inherits it by construction, rather than needing to be individually accessibility-reviewed to reach baseline compliance.

---

## 9. Interaction Rules

- **Every interactive element has exactly four defined states — rest, hover, active/pressed, disabled — plus focus as an overlay state that can combine with any of them.** No component ships with an undefined state.
- **Primary action per screen is singular and visually consistent.** Every shell reserves one clearly designated primary action slot (top-right of the header, by convention); secondary actions are visually subordinate, not competing.
- **Destructive actions always require explicit confirmation**, using one system-wide confirmation pattern (not a bespoke dialog invented per feature), and the confirming action is never the visually dominant option by default.
- **Bulk actions follow one system-wide pattern**: selecting rows in any table reveals the same contextual action bar behavior, regardless of what domain the table belongs to.
- **Inline editing, where used, follows one consistent commit/cancel model** (explicit save or blur-to-save, consistently chosen once per data type, not per page).
- **System feedback for any user action is immediate and consistent**: an action either completes with visible confirmation, fails with a clear inline/toast message, or shows a loading state (§10) — a user action is never left ambiguous.
- **Keyboard shortcuts are reserved and centrally registered**, not invented ad hoc per page, so as the product grows to hundreds of pages, shortcuts never collide.

---

## 10. Loading Philosophy

- **Loading state is structural, not decorative.** The system uses **skeleton placeholders matching the destination layout's actual grid/shape** (per §6) for primary content loads, so the page does not visibly "jump" once data arrives. Skeletons are generated from the shell's structure, not hand-drawn per page.
- **No spinners as the default for primary content.** A simple, small spinner is reserved for short, indeterminate, secondary operations (e.g., a button submitting, a small inline refresh) — never for full-page loads, consistent with the Constitution's "calm, literal" motion rule.
- **Loading never blocks navigation.** Users can navigate away from a loading page/section without penalty; in-flight requests are cancelled or ignored gracefully.
- **Partial/progressive loading is preferred over blocking on the slowest data.** A Detail shell shows identity/header information immediately and streams in secondary panels/tabs as they resolve, rather than blanking the whole page until everything is ready.
- **Long-running operations show real, honest progress** (not indeterminate spinners) whenever the system can know progress, consistent with the product's "trust" mandate — this is an operational tool; users need to know if something is stuck.

---

## 11. Empty States

- **Every list, table, panel, and search result has a defined empty state — there is no such thing as an "unhandled" empty state in AEGIX.** This is enforced at the shell/component level so a new page cannot ship without one.
- Empty states are **factual and situational**, distinguishing at minimum between three cases, each handled differently:
  1. **Zero data ever** (e.g., no assets onboarded yet) — states the fact plainly and, if applicable, surfaces the single relevant primary action to change that (per §9's "one primary action" rule). No cheerful illustration, no marketing copy.
  2. **Zero results from a filter/search** (data exists, but the current view excludes it) — states that filters are active and offers a direct way to clear/adjust them. Never implies the system itself is empty.
  3. **Zero results due to permissions/scope** — states this plainly and factually; never presented identically to "no data exists," since conflating the two erodes trust in an enterprise security tool.
- Empty states use the same neutral, restrained visual language as populated states — no illustration-led empty states, consistent with the Constitution's ban on decorative illustration.

---

## 12. Error States

- **Errors are classified once, at the system level, into a small closed set, and every page inherits the correct presentation automatically** rather than each page deciding how to show an error:
  - **Field-level validation errors** — shown inline, adjacent to the field, at the moment of relevance.
  - **Action/operation failures** (a save, a bulk action, a request) — shown via the system-wide toast/inline-banner pattern (§9's feedback rule), with the specific, factual reason and, where possible, a direct retry action.
  - **Section/data-load failures** — the affected content region shows a contained error state in place of its skeleton/content, with a retry action; it never takes down the rest of the page (a single failed panel does not blank the whole Detail shell).
  - **Full-page/system failures** (e.g., no connectivity, unrecoverable error) — a single, shared full-page error shell, never a per-page custom error screen.
- **Error copy is factual and specific, never generic or blaming the user.** State what failed and, when knowable, why and what to do next — consistent with the Constitution's system-log-message voice rule.
- **Errors never use humor, apology padding, or illustration.** ("Oops!", broken-robot graphics, etc. are explicitly prohibited per the Constitution.)
- **Retry is always available where an operation can plausibly succeed on retry.** The system never leaves the user at a dead end without a next step.

---

## 13. Search Philosophy

- **Search is a single, global, system-wide capability accessible identically from anywhere** (via the persistent utility bar, §1.2) — not a feature reimplemented per domain or per page.
- **Search is graph-aware, not page-aware.** It searches across entities (assets, findings, policies, users, reports, etc.) and returns results grouped by entity type, each linking directly into that entity's Detail shell — reinforcing the "connected workspace" model in §3.
- **In-page/local filtering is a distinct, clearly different pattern from global search**, and is never confused with it visually. Every List/Table shell exposes the same filter-and-search toolbar pattern (§2.1) at a consistent position, using the same input styling, regardless of what it is filtering — a user who learns to filter one table can filter any table in the product.
- **Search is forgiving but transparent.** It tolerates partial matches and common identifier formats (IDs, hostnames, IPs, names) but always makes clear what was matched and why, never returning results with no visible relevance signal.
- **Recent and saved searches are supported as a system-wide capability**, not a per-feature addition, consistent with the "workspace remembers state" rule in §3.

---

## 14. Animation Principles

Governed directly by the Constitution's motion rules (§7 there); this section defines the *system*, not the philosophy, so hundreds of pages inherit consistent motion without each one deciding independently.

### 14.1 Token-driven durations and easing

| Token | Duration | Use |
|---|---|---|
| `duration-instant` | ~100ms | Micro-feedback (button press, toggle flip) |
| `duration-fast` | ~150ms | Hover/focus transitions, small state changes |
| `duration-standard` | ~200–250ms | Panel open/close, drawer slide, tab switch |
| `duration-deliberate` | ~300ms | Modal/overlay entrance, page-region transitions |

A single, consistent easing curve (a controlled ease-out for entrances, ease-in for exits — no bounce, spring, or elastic curves per the Constitution) is defined once and used everywhere.

### 14.2 Rules

- **Motion only ever communicates one of: state change, spatial relationship, or system feedback.** If an animation doesn't do one of those three things, it is decorative and therefore prohibited.
- **No animation is louder than the interaction that triggered it.** A row expanding, a drawer opening, a toast appearing — all move a short distance, quickly, and settle immediately. Nothing overshoots.
- **No ambient or looping animation exists anywhere in the product** (no pulsing badges, no animated backgrounds, no idle micro-motion) — consistent with the Constitution's calm mandate.
- **Page-level navigation transitions are minimal-to-none.** Moving between Tier 2/3 destinations should feel closer to instantaneous state change than to a "page turn" — this is a console, not a presentation.
- **All motion is disabled/reduced automatically per the user's reduced-motion system preference** (§8), globally, at the token layer — never opted into per component.

---

## 15. How This Enables Hundreds of Pages Without Redesign

Every section above removes one category of decision that would otherwise need to be re-made per page:

- New page → pick one of a small set of **shells** (§2), placed into the fixed **navigation skeleton** (§1).
- Content inside it → composed from the **12-column grid** (§6) using **spacing tokens** (§5) and **design tokens** (§7) only.
- Behavior → inherited automatically from system-wide **interaction** (§9), **loading** (§10), **empty** (§11), and **error** (§12) rules — a new page does not design these, it triggers them.
- Cross-cutting concerns — **accessibility** (§8), **responsiveness** (§4), **search** (§13), and **motion** (§14) — are properties of the shared shells and component library, not properties any individual page must separately solve.

The only thing that should differ from page #4 to page #300 is the *data being shown* — never the shell, the chrome, the spacing, the tokens, the states, or the motion. That is what makes scale to hundreds of pages possible without a redesign: there is nothing page-specific left to redesign.
