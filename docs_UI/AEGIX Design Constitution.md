# AEGIX Design Constitution

**Version 1.0 — Founding Document**
**Status: Permanent reference. All future screens, components, and features must conform to this document.**

---

## 0. Purpose of This Document

This is not a style guide for a single screen. It is the constitution that governs every pixel AEGIX will ever ship. When a future designer, engineer, or AI agent has to decide how something should look or behave, this document is the final authority — not personal taste, not trends, not what a competitor did last quarter.

AEGIX is an **Enterprise Asset Protection Platform** — an operating environment that enterprise IT and security teams live inside for entire shifts, every day, for years. It is not a SOC dashboard, not a cybersecurity showpiece, not a monitoring toy. It is closer in spirit to an air traffic control console or a banking core system: software that earns trust by being quiet, precise, and unshakeable.

---

## 1. Product Personality

AEGIX must feel:

| Trait | What it means in practice |
|---|---|
| Professional | Every screen looks like it was built by people who understand the domain, not by people decorating a template. |
| Calm | Nothing pulses, glows, bounces, or competes for attention uninvited. |
| Reliable | Visual consistency is absolute. The same action always looks the same way, everywhere. |
| Premium | Premium here means restraint and precision, not ornamentation. Expensive software looks *simple*, not busy. |
| Corporate | Built for procurement committees, compliance officers, and CISOs — not for a demo day audience. |
| Timeless | It should look correct in 2026 and unremarkable-but-correct in 2036. No visual trend may be load-bearing. |
| Confident | The interface never over-explains itself, never over-decorates a claim, never apologizes with excess friendliness. |
| Minimal | Every element earns its place through function. Nothing exists to "fill space" or "look nice." |
| Focused | One primary task per screen state. Secondary information recedes; it does not disappear, but it does not compete. |
| Operational | Designed for someone using it 8 hours a day, not someone glancing at it once. Optimize for repeated use, not first impressions. |

**It must never feel:** futuristic, flashy, playful, novel-for-its-own-sake, or like it is trying to impress anyone. If a design decision's primary justification is "it looks cool," it is wrong for AEGIX.

---

## 2. Brand Identity

### 2.1 The Logo as the Root of the System

The AEGIX mark — a shield rendered in brushed steel, containing a faceted blue ascending arrow, paired with a precision-cut metallic wordmark — is the single strongest visual statement the product is allowed to make. Every other visual decision in the product exists to support that mark, not to compete with it.

**Governing rule: the interface is always visually quieter than the logo.**

This has direct consequences:

- The logo's blue is the brand's *loudest* color. No UI surface, chart, button, or state indicator may be rendered at the same saturation and metallic intensity as the logo's blue. UI blue must be a calmer, flatter descendant of it.
- The logo's silver/steel gradient and beveled dimensionality are reserved for brand moments (the mark itself, the wordmark, splash/loading states). The interface itself is flat — no bevels, no chrome, no metallic gradients on buttons, panels, or icons.
- The shield form (angular, symmetrical, faceted) informs the *geometry* of the system — sharp, deliberate corners and confident angles — without ever literally reappearing as a UI motif (no hexagons, no shield-shaped cards, no arrow iconography sprinkled around the UI).
- The logo appears once per primary surface, small, and at rest. It is a mark of provenance, not a decorative asset to be repeated.

### 2.2 Brand Expression

- **Tone:** The brand speaks with authority through restraint. It does not shout, it does not whisper.
- **Visual Weight:** Heavy where it needs to be (data, controls), light where it doesn't (decoration, chrome).
- **Consistency:** Every touchpoint reinforces the same core values. No "light" or "playful" variants.

---

## 3. Visual Philosophy

### 3.1 Core Principle

Visual design serves the work, not the other way around. Every visual element must answer: "What job does this do for the operator?"

### 3.2 The Visual Hierarchy

1. **Data** — The most important thing on screen. Presented with maximum clarity.
2. **Controls** — Actions the user can take. Clearly interactive, never ambiguous.
3. **Structure** — Grid, alignment, and organization. Invisible when done right.
4. **Brand** — Present but subordinate. Never competes with work.

### 3.3 The "Quiet Interface" Mandate

The interface should recede into the background. When a user is deeply focused on a task, they should not be aware of the UI itself. This is achieved through:

- Low-contrast neutrals for backgrounds and structure
- Single, restrained accent color for interaction
- Minimal visual noise in data presentation
- No decorative elements that draw attention from work

---

## 4. UX Philosophy

### 4.1 Operator-Centric Design

AEGIX is designed for people who work with it, not for people who evaluate it. This means:

- **Efficiency over discoverability:** Power users need speed, not hand-holding.
- **Precision over forgiveness:** Actions should be deliberate, not reversible.
- **Clarity over cleverness:** Every interaction should be predictable.

### 4.2 Information Architecture

- **Progressive disclosure:** Show what's needed now, reveal more on demand.
- **Persistent context:** Navigation and key state remain visible during tasks.
- **Direct manipulation:** Users act on assets directly, not through abstract metaphors.

### 4.3 Error Prevention

- **Constraints over warnings:** Prevent invalid actions rather than warning about them.
- **Clear consequences:** Every action's result is obvious before execution.
- **Recovery paths:** When errors occur, recovery is straightforward and clear.

---

## 5. Typography Rules

### 5.1 Philosophy

Typography is the primary tool for hierarchy in AEGIX — more important than color, more important than size jumps, more important than boxes and borders. A well-typeset screen with no color at all should still be fully legible and prioritized correctly.

### 5.2 System

- **One typeface family for the entire product.** A single, highly legible, neutral grotesque/sans typeface built for dense information environments (think instrument-panel and terminal-adjacent legibility, not editorial or display type). No display/decorative typefaces anywhere in-product.
- **Tabular, monospaced, or numeric-optimized figures for all data, IDs, timestamps, counts, and metrics.** Numbers must align in columns and never jitter in width as they update live.
- **Hierarchy is built from a small, deliberate type scale (a limited number of sizes/weights), not from arbitrary one-off sizes.** If a new size is "needed," the existing scale is being used incorrectly.
- **Weight does more work than size.** Prefer moving from regular to medium/semibold over jumping a whole size step, to keep density high without visual noise.
- **Letter-spacing stays neutral to tight for body and data text** (this is a data-dense operational tool, not an editorial layout) and may open up slightly only for all-caps labels/eyebrows, used sparingly.
- **Line length and line height are tuned for scanning tabular and list-based content quickly**, not for long-form reading comfort.

### 5.3 Scale

| Role | Size | Weight | Usage |
|---|---|---|---|
| Display | 24-32px | Bold | Page titles, major section headers |
| Heading | 16-20px | Semibold | Section titles, card headers |
| Body | 13-14px | Regular | Primary content, labels |
| Caption | 11-12px | Regular | Secondary information, metadata |
| Numeric | 13-14px | Tabular | All data, metrics, IDs |

### 5.4 Forbidden

- No script, handwritten, condensed-display, or "friendly" rounded typefaces.
- No decorative font pairings (a "brand" display font plus a "body" font). One system, one voice.

---

## 6. Color Philosophy

### 6.1 Philosophy

Color in AEGIX is a signal system, not a decoration system. Color exists to answer: *what state is this in, and does it need my attention?* Anywhere color is used without answering that question, it should be removed.

### 6.2 Palette Roles

**Neutrals — the foundation (95%+ of every screen)**
- Derived from the logo's shield: deep gunmetal / near-black navy through to cool steel greys and a clean off-white.
- The product should default to a **dark, deep charcoal-navy operating surface** — closer to the logo's own background than to a bright white SaaS canvas — because this is a console used for extended, focused sessions, not a marketing surface. A light theme is permitted as a secondary mode, built on the same cool steel-grey neutral ramp, never a bright/pure white.
- Neutrals carry hierarchy through *value* (light/dark steps), not through added hue. Avoid warm greys; every neutral should read as cool steel, consistent with brushed metal, not paper.

**Signal Blue — the single brand accent**
- One blue, drawn directly from the logo's arrow, desaturated and dimmed relative to the logo for interface use.
- Reserved exclusively for: primary actions, active/selected states, focus indicators, and links. It is the only color that means "this is interactive and primary."
- Never used decoratively (no blue section backgrounds, no blue illustrations, no blue used "because it's the brand color" on non-interactive elements).

**Functional Status Colors — used only for state, never for branding**
- A restrained set for success, warning, critical/danger, and informational states (e.g., asset healthy, patch pending, breach detected, informational note).
- These must be desaturated enough to sit calmly next to the neutral palette at rest, and should only intensify (never animate) when a state genuinely demands escalated attention (e.g., a critical severity finding).
- Status color is always paired with a text label or icon — color alone never carries meaning, for accessibility and for calm (a screen should not "look" alarming from across the room; it should read as alarming when actually read).

**Absolute rule:** if a screen has more than one accent hue competing for attention, it is wrong. Status colors are for individual data points, not for large surface fills, backgrounds, or navigation chrome.

### 6.3 What Color May Never Do

- No gradients as decoration (brand gradients are reserved for the logo mark only, never applied to buttons, cards, backgrounds, or text).
- No color-coded "cute" categorization systems (rainbow tags, pastel badges).
- No bright, saturated hero-style color blocking anywhere in the product.

---

## 7. Spacing Philosophy

### 7.1 Structural Spacing

Spacing is not decoration — it is the skeleton of the interface. Every gap has meaning.

- **Baseline grid:** All vertical spacing is multiples of 4px (4, 8, 12, 16, 24, 32, 48, 64). This creates visual rhythm and predictability.
- **Horizontal rhythm:** Columns and data align to an 8px grid, ensuring clean scanning paths.
- **Density through hierarchy:** Space separates unrelated groups; related items sit close to show relationship.

### 7.2 Spacing Scale

| Purpose | Spacing |
|---|---|
| Inline elements | 4px |
| Related items (within group) | 8px |
| Group separation | 16px |
| Section separation | 24px |
| Major divisions | 32px |
| Screen padding | 24px (min) |

### 7.3 Principles

- **No arbitrary spacing:** Every margin and padding value comes from the system.
- **Whitespace is structural:** Space groups information, it doesn't "breathe."
- **Consistency over variety:** The same spacing patterns repeat throughout.

---

## 8. Motion Principles

### 8.1 Functional Motion Only

Motion exists only to clarify state change (something appeared, something moved, something is loading) — never to delight, brand, or add "life" to the interface.

### 8.2 Transition Rules

- **Duration:** 100-150ms for UI state changes, 200-300ms for page transitions.
- **Easing:** Linear or standard ease-in-out. No bounce, spring, or elastic effects.
- **Distance:** Minimal. Elements move only as much as needed to show their relationship.

### 8.3 What Motion May Never Do

- No looping ambient animation
- No glowing/pulsing effects
- No particle or gradient animation
- No animated illustrations
- No "micro-interactions" that exist for their own sake

---

## 9. Accessibility Principles

### 9.1 Core Mandate

AEGIX must be operable by everyone on the team, regardless of ability. This is not optional — it is a requirement for enterprise software.

### 9.2 Visual Accessibility

- **Contrast ratios:** Minimum 4.5:1 for normal text, 3:1 for large text and UI components.
- **Color independence:** No information is conveyed by color alone. Status always includes text or icon indicators.
- **Focus visibility:** Keyboard focus is always clearly visible with a 2px outline in Signal Blue.
- **Text scaling:** All interface supports 200% zoom without loss of functionality.

### 9.3 Interaction Accessibility

- **Keyboard navigation:** Every action available via keyboard. Tab order follows visual hierarchy.
- **Screen reader support:** All interactive elements have proper ARIA labels and roles.
- **Reduced motion:** All motion can be disabled via system preference.
- **High contrast mode:** A high-contrast theme is available for users who need it.

### 9.4 Cognitive Accessibility

- **Consistent patterns:** Same actions look and behave the same everywhere.
- **Clear labels:** No ambiguous icons without text labels.
- **Predictable navigation:** Users can predict where they'll end up.

---

## 10. Enterprise Design Rules

### 10.1 Procurement-Ready Design

Enterprise software must pass the "procurement committee test" — it must look like it costs what it costs, and it must look like it will still work in five years.

- **No "free software" aesthetics:** No placeholder-looking elements, no "template" feel.
- **No consumer app leakage:** No rounded corners, no playful microcopy, no social media patterns.
- **Professional density:** Enterprise users expect to see a lot of information. Don't hide it behind "clean" abstractions.

### 10.2 Compliance Considerations

- **Audit trails are visible:** Every action that matters has a clear record.
- **Data integrity signals:** Users can see at a glance whether data is current, stale, or in error.
- **Role-based clarity:** Different user roles see appropriate controls and information.

### 10.3 Integration Patterns

- **API-first thinking:** Every screen should feel like it could be embedded or headless.
- **Export-ready:** Data and configurations can be exported cleanly.
- **No vendor lock-in visuals:** No patterns that make extraction difficult.

---

## 11. Information Density Rules

### 11.1 The Density Mandate

AEGIX operators need to see state, not whitespace. Information density is a feature, not a bug.

### 11.2 Density Through Structure

- **Tables over cards:** When showing lists of assets, use tables. Cards are for detail views.
- **Inline expansion:** Details expand in place, not in new views.
- **Progressive disclosure:** More information is available on click/hover, but the default view is dense.

### 11.3 Scanning Optimization

- **Zebra striping:** Tables use subtle striping (10% value difference) to aid row tracking.
- **Sticky headers:** Column headers remain visible during scroll.
- **Quick filters:** Filters are always visible, not hidden behind menus.

### 11.4 What Density Is Not

- Not clutter: Every element has a job.
- Not confusion: Hierarchy makes relationships clear.
- Not ugliness: Density can be beautiful when done with precision.

---

## 12. Component Philosophy

### 12.1 Components Serve Work

Every component exists to help the user complete a task faster, not to demonstrate technical capability.

### 12.2 Component Principles

- **Single responsibility:** Each component does one thing well.
- **Composable:** Components combine cleanly without visual conflict.
- **Predictable:** Same inputs always produce same outputs.
- **Minimal API:** Components have few props/options. Complexity is in the system, not the component.

### 12.3 Core Component Types

- **Data display:** Tables, lists, key-value pairs, status indicators.
- **Actions:** Buttons, links, menu items, toolbar controls.
- **Input:** Forms, filters, search, selectors.
- **Navigation:** Menus, breadcrumbs, tabs, sidebars.
- **Feedback:** Toasts, modals, confirmations, empty states.

### 12.4 Component Prohibitions

- No "fancy" variants (primary, secondary, tertiary, ghost, subtle, etc.). Two button styles maximum: primary and default.
- No decorative states (hover animations, press effects, etc.).
- No components that exist only for visual interest.

---

## 13. Layout Philosophy

### 13.1 Grid-Based Structure

Every screen follows a consistent grid that makes information predictable and scannable.

- **12-column grid:** All content aligns to a 12-column grid with 24px gutters.
- **Left-aligned:** Content aligns left. Center alignment is for modals and empty states only.
- **Persistent navigation:** Primary navigation is always visible on the left.

### 13.2 Layout Patterns

- **Master-detail:** List on left, detail on right. The workhorse pattern.
- **Single pane:** Full-width content for focused tasks.
- **Dashboard:** Multiple related views in a single scroll view, not separate pages.

### 13.3 Layout Rules

- **No full-width cards:** Cards are constrained to the grid, not edge-to-edge.
- **No "hero" sections:** The work is the hero, not a banner.
- **No decorative containers:** Every box has a job.

---

## 14. Enterprise Trust Principles

### 14.1 Trust Through Precision

Trust in enterprise software is earned through precision, not promises.

- **Accurate data:** Every number is precise. Every timestamp is correct. Every status is real.
- **Clear causality:** When something happens, the cause is clear.
- **No surprises:** The system behaves predictably.

### 14.2 Trust Through Transparency

- **System status:** Users can always see what the system is doing.
- **Data lineage:** Where data came from and how it was processed is traceable.
- **No hidden actions:** Every action has a clear, undoable path.

### 14.3 Trust Through Restraint

- **No false urgency:** No pulsing, no countdowns, no "act now" pressure.
- **No marketing language:** No "revolutionary," "cutting-edge," or "industry-leading."
- **No decorative chrome:** The interface doesn't try to impress.

### 14.4 Trust Through Consistency

- **Visual consistency:** Same patterns everywhere.
- **Behavioral consistency:** Same actions produce same results.
- **Temporal consistency:** The system ages gracefully, not with jarring redesigns.

---

## 15. The Forbidden List (Absolute)

The following are permanently banned from AEGIX, without exception, regardless of trend or requester:

- Glassmorphism / frosted-glass panels
- Cyberpunk aesthetics
- Neon colors or neon glow effects
- "Matrix"-style falling code, digital rain, or terminal-green hacker tropes
- Hexagon backgrounds or hex-grid patterns
- Robot illustrations or humanoid AI imagery
- Generic "AI" graphics (circuits, neural-net line art, glowing brains)
- Brain icons or any brain iconography
- Floating 3D shapes / abstract blob graphics
- Decorative gradients of any kind on UI surfaces
- Decorative charts (charts that exist for visual flourish rather than to answer a real question)
- Marketing-style hero sections inside the product
- Oversized "fancy" KPI cards with heavy color blocking
- Colorful, rainbow-coded dashboards
- Oversized icons or icon-led visual hierarchy
- Rounded, bubbly "startup" UI shapes
- Generic, interchangeable SaaS-template layouts
- Anything that reads as "an AI generated this dashboard" — visual clichés like glowing accent borders, excessive card shadows, purple-to-blue gradient buttons, or stock dashboard layouts copied from template marketplaces

If a proposed design contains any item on this list, it is rejected regardless of how good it otherwise looks.

---

## 16. Design Goals (What Success Looks Like)

1. **Built by engineers, for engineers.** Every screen should look like it was designed by someone who understands enterprise asset protection deeply — not by someone skinning a generic admin template.
2. **Every screen communicates trust.** A CISO or auditor glancing at any screen for the first time should immediately sense competence and control, not flair.
3. **Every interaction reduces cognitive load.** The measure of a good AEGIX screen is how little thinking it takes to find the right information and take the right action — not how visually rich it is.
4. **It should still look correct in ten years.** Because the system avoids trend-driven decoration in favor of structure, typography, and restraint, it should age the way well-built instrumentation ages: unremarkable, correct, and still trusted.

---

## 17. The One-Sentence Test

Before shipping any new screen, component, or feature, ask:

> "Does this make AEGIX feel like a more precise, trustworthy operating environment — or does it make it feel like a dashboard someone tried to make look impressive?"

If it is the latter, it does not ship as designed. This document — not preference, not trend, not a single stakeholder's taste — is the standing authority for that decision.