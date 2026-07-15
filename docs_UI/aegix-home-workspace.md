# AEGIX Home Workspace

**Version 1.0 — Founding Document**
**Status: Permanent reference for the product's entry surface, subordinate to the Design Constitution, the Frontend Architecture, and VANTAGE.**

---

## 0. What This Page Is — and Is Not

The Home Workspace is the first thing every user sees at the start of every session. Its only job is to answer three questions, immediately, without scrolling past decoration to find them:

1. **What needs my attention right now?**
2. **What is the current health of the enterprise?**
3. **Which assets require action?**

It is explicitly **not a dashboard**. A dashboard's implicit promise is "here is data about the system, go explore it." The Home Workspace's promise is the opposite: **"here is what you must know and do before you go anywhere else."** Every section either states a fact the user needs, surfaces something requiring a decision, or shows genuinely live operational state — nothing exists to be admired, summarized for its own sake, or explored recreationally.

Concretely, this means the Home Workspace contains:

- No KPI card grids (a wall of numbers with no inherent priority is the opposite of "what needs my attention").
- No decorative widgets, illustrations, or "welcome back" framing.
- No marketing language, onboarding tours, or feature promotion.
- No charts unless a chart is the only correct way to communicate an operational fact (defined precisely in §3 and §4) — never a chart added because a section "looks empty" without one.

Structurally, the Home Workspace is the single, deliberate instance of the **Analytical/Overview Shell** (Frontend Architecture §2.1) reserved for this page. It is scoped by the **Scope** control (VANTAGE §5): everything on this page describes the currently selected business unit/environment, and changing Scope re-renders the entire page in place without navigating away.

---

## 1. Information Hierarchy and Page Order

The page reads top to bottom in strict order of urgency, not in a fixed "everyone gets the same layout" grid of equal-weight boxes. This ordering *is* the design — it is what lets a user absorb the page in the first five seconds without reading everything.

| Order | Section | Answers |
|---|---|---|
| 1 | **Enterprise Status** | "Is anything on fire, in one sentence?" |
| 2 | **Recommended Actions** | "What needs my attention right now?" |
| 3 | **Operational Pulse** | "What is the current health of the enterprise, in motion?" |
| 4 | **Asset Overview** | "Which assets require action, in aggregate?" |
| 5 | **Live Tracking Area** | "What is happening, in-flight, right now?" |
| 6 | **Operations Feed** | "What has just happened?" |
| 7 | **Platform Health** | "Can I trust what this page just told me?" |

Sections 1–2 are always fully visible without scrolling at the Console breakpoint — they are the reason the page exists. Sections 3–6 form the working body of the page. Section 7 is deliberately placed last: it is important (an operator must be able to trust the tool) but it describes the *tool*, not the *enterprise*, so it never competes with enterprise-facing urgency for top-of-page attention.

---

## 2. Enterprise Status

### 2.1 Purpose

A single, always-present, plain-language statement of overall posture for the current Scope — the one thing a user reads even if they read nothing else on the page.

### 2.2 Content, not decoration

- Rendered as a **status statement**, not a card, not a number in a box: e.g., *"3 critical findings require action across Meridian Retail — Production."* Written in the Constitution's factual, system-log voice — no exclamation points, no congratulatory tone when clear.
- Backed by exactly one status-level indicator (per the Frontend Architecture's status-color token rules) — color is paired with the words themselves, never a colored block standing alone.
- When there is nothing critical, the statement says so plainly and calmly: *"No critical or high-severity issues in this scope."* This is **not** a celebratory state — no confetti, no checkmark illustration, no "You're all set! 🎉" per the Constitution's ban on forced friendliness. Calm good news is written exactly as plainly as calm bad news.
- Includes the Scope it describes explicitly in the sentence, so a user glancing at the page never wonders which slice of the enterprise the statement covers — this directly reinforces VANTAGE's Scope discipline (§5 of the navigation document).

### 2.3 Behavior

- Updates live as underlying state changes (per the Frontend Architecture's live-region accessibility rule) without requiring a page refresh.
- The statement is generated from the same severity taxonomy used everywhere else in the product (findings, asset risk, policy violations) — it is a synthesis of real data, not a separately maintained "homepage summary."

---

## 3. Recommended Actions

### 3.1 Purpose

This is the section that most directly answers *"what needs my attention?"* — and the section this page cannot ship without, per the brief. It is a short, ranked, specific list of actions the platform believes a human should take next, each grounded in a real record.

### 3.2 Content

- A ranked list, capped at a small number of visible items (a handful, not a scrolling feed) with a clear path to see the rest — this list is a triage tool, not an inbox to empty.
- Each item states: what needs to happen, why (the underlying finding/condition), and on what — e.g., *"Patch OpenSSL vulnerability — 14 servers affected — Critical."* — then links directly into the relevant record(s) via the entity graph (per the Frontend Architecture's "nothing is a dead end" rule).
- Ranking is driven by the platform's real severity/risk model, not by recency — the most consequential action is always first, regardless of when it was identified.
- Items can be acted on directly from this section for common operations (acknowledge, assign, snooze) using the system-wide interaction patterns (Frontend Architecture §9) — but the primary affordance is always navigating to the record for full context, not resolving blind from the homepage.

### 3.3 Why no KPI framing

This is deliberately a **list of specific, actionable items**, not a count. "You have 12 recommended actions" as a standalone number tells the user nothing they can act on; the list itself is the useful artifact. If a number is shown at all, it is a small label on the list ("Showing 5 of 12"), never presented as a KPI card.

---

## 4. Operational Pulse

### 4.1 Purpose

Answers *"what is the current health of the enterprise, in motion?"* — the difference between this and Enterprise Status is that Status is a snapshot statement, while Pulse conveys **rate and trajectory**: is the situation stable, improving, or degrading right now.

### 4.2 Content

- A small number of **named rates**, stated in plain operational language, not abstract metrics: e.g., *"New critical findings (24h): 2, down from 6 yesterday"*; *"Mean time to remediate (7d): 3.2 hours."*
- Each rate is a short sentence or label-value pair with a directional indicator (up/down/flat), using the same restrained status color logic as Enterprise Status — never a large stylized number in a colored card.
- **The one place a chart is justified**: if — and only if — a trend genuinely cannot be understood from a single number and a direction (e.g., a volatile finding-rate that a single "down from yesterday" comparison would misrepresent), a single small, minimal **sparkline-style trend line** may accompany that one rate. It carries no axis chrome, no legend, no color beyond the single accent — it exists purely to answer "is this getting better or worse," nothing more. This is the narrow exception the Constitution allows for "decorative charts": it is not decorative, it is the only legible way to state a trend.
- No more than a small, fixed number of Pulse rates are ever shown — this section is deliberately not extensible into a KPI wall as more metrics become available; adding a new one requires removing or demoting an existing one, keeping the section permanently scannable.

---

## 5. Asset Overview

### 5.1 Purpose

Answers *"which assets require action?"* in aggregate, before the user drills into any specific list.

### 5.2 Content

- A single **proportional status composition** — not a pie chart, not a grid of colored count cards — showing the enterprise's assets divided into a small number of named risk/health states (e.g., Healthy, Needs Attention, Critical), rendered as one horizontal, segmented bar with each segment labeled by name and count in plain text.
- This is chosen deliberately over a chart: a segmented proportional bar communicates "most of the estate is fine, a specific slice is not" at a glance, in the flat, information-dense, non-decorative style the Constitution requires, without introducing chart chrome (axes, legends, tooltips-as-primary-information).
- Each segment is a live link into the filtered asset list for that state (Frontend Architecture's List/Table shell), continuing the "nothing is a dead end" principle.
- Below the composition, a short, named list of the **specific asset categories most responsible for current risk** (e.g., "12 unpatched servers," "4 assets with expired certificates") — concrete and countable, not further visualized.

### 5.3 Why no chart here either

A bar/pie/donut chart of asset counts is exactly the "decorative chart" pattern the brief prohibits — it looks like a report, not an operational fact. The segmented status bar is chosen specifically because every part of it is legible as text first, visual second.

---

## 6. Live Tracking Area

### 6.1 Purpose

The one section of the page dedicated to **things happening right now, in progress** — distinct from the Operations Feed (§7), which is historical. This directly serves an operational (not reporting) posture: an operator needs to know what the system is *currently doing on their behalf*.

### 6.2 Content

- A short, live-updating list of **in-flight operations**: active scans, remediations currently being applied, ongoing incident response, pending approvals awaiting a decision.
- Each item shows: what is running, its current state/progress (using the Frontend Architecture's "real, honest progress" loading rule — not an indeterminate spinner if progress is knowable), and who/what initiated it.
- Items complete and gracefully leave this list (moving into the Operations Feed as a completed record) rather than accumulating indefinitely — this section always represents "now," never "recently."
- Empty state is explicit and calm: *"No operations currently in progress in this scope."* — stated exactly like any other empty state per the Frontend Architecture's empty-state rules, not styled as a special "all quiet" moment.

---

## 7. Operations Feed

### 7.1 Purpose

A factual, chronological record of what has just happened across the platform in the current Scope — the page's short-term memory, so a user returning after time away can reconstruct recent history without hunting through individual modules.

### 7.2 Content

- A reverse-chronological list of discrete events, each written as a single factual line in the Constitution's system-log voice: actor, action, object, timestamp — e.g., *"Priya Nair resolved Finding #4021 on db-prod-04 — 14 minutes ago."*
- Entries are drawn from real activity across domains (findings resolved, policies changed, assets onboarded/decommissioned, scans completed) — this is a genuine cross-domain feed, not a single module's log relabeled.
- Each entry links to its underlying record. No entry is ever purely informational text without a source of truth behind it.
- The feed is intentionally bounded on the homepage (a recent window, e.g., last 24–48 hours or a fixed item count) with a clear path to the full historical log elsewhere — Home shows *recent* history, not the archive.

---

## 8. Platform Health

### 8.1 Purpose

Answers a fourth, quieter but necessary question the brief's three questions imply but don't state outright: **"can I trust everything this page just told me?"** An operational tool that reports enterprise health while silently failing to sync its own data sources would be actively dangerous to trust — this section exists so that never happens invisibly.

### 8.2 Content

- A compact statement of the platform's own operating condition: data source/connector sync status, time since last successful scan/ingestion per major source, and any degraded internal service — e.g., *"All data sources synced. Last full inventory sync: 6 minutes ago."*
- If any source is stale or degraded, this is stated with the same plain severity language as everything else on the page, and — critically — **propagates a visible caveat upward**: if asset data is stale, Enterprise Status and Asset Overview both indicate that their figures may not reflect the current state, rather than presenting confidently wrong numbers.
- This section is deliberately the last on the page, small, and unemphasized when healthy — it should be nearly invisible on a good day and impossible to miss on a bad one, consistent with "boring by default, load-bearing when it matters."

---

## 9. Layout Composition

Using the Frontend Architecture's 12-column grid (§6) within the Analytical/Overview Shell:

- **Row 1 (full width, 12 cols):** Enterprise Status — a single full-width statement band, minimal height, no card framing beyond a subtle surface/border distinction from the page background.
- **Row 2 (8 + 4 cols):** Recommended Actions (8) alongside Operational Pulse (4) — the two most attention-demanding sections placed side by side so both are visible without scrolling at Console breakpoint.
- **Row 3 (12 cols):** Asset Overview — the segmented status composition spans full width, since it is the visual anchor for "which assets need action" and reads best uninterrupted.
- **Row 4 (6 + 6 cols):** Live Tracking Area (6) and Operations Feed (6) side by side — "happening now" and "just happened" presented as companion, comparably-weighted lists.
- **Row 5 (12 cols, reduced visual weight):** Platform Health — full width, minimal height, quiet styling.

At Standard/Compact breakpoints, rows collapse to single-column stacking in the same top-to-bottom priority order defined in §1 — priority order is never reshuffled by breakpoint, only re-flowed.

---

## 10. States

- **Loading:** Each section loads independently and progressively (Frontend Architecture §10) using skeletons shaped like their actual content (a skeleton status line, a skeleton segmented bar, skeleton list rows) — the page never blocks entirely on the slowest section, and Enterprise Status/Recommended Actions resolve first wherever technically possible, since they matter most.
- **Empty (calm, not celebratory):** Every section defines its literal "nothing here" case per Frontend Architecture §11 — stated plainly, never with celebratory styling, iconography, or color even when the news is good.
- **Partial failure:** If one section's data source fails, only that section shows a contained error with retry (Frontend Architecture §12) — a failure fetching the Operations Feed never blanks Enterprise Status or Recommended Actions. Platform Health (§8) is the section responsible for surfacing *why*, if the cause is a known data-source issue.
- **Scope change:** Switching Scope re-runs every section in place for the new Scope, using the same loading choreography as first load — the page never appears to "jump" structurally, only its data changes.

---

## 11. What This Page Deliberately Excludes

To keep this page durable as the product grows to hundreds of modules, the Home Workspace never absorbs module-specific promotion. Specifically:

- No module ever gets a dedicated "featured" card here just because it's new — visibility on Home is earned only through the severity/priority models feeding Recommended Actions, Pulse, and the Feed, never through manual curation or promotion.
- No section here is a shortcut/link grid to other parts of the product ("Quick Links," "Explore Modules") — that role belongs entirely to VANTAGE's Spine, Panel, and Bar. Home answers "what do I need to know and do," not "where can I go."
- No personalization framing ("Good morning, Priya") beyond what is operationally useful (the Scope in view). This is a workspace, not a greeting.
