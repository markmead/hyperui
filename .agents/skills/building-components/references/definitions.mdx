---
title: Definitions
description: This page establishes precise terminology used throughout the specification. Terms are intentionally framework agnostic, but we will use React for examples.
type: reference
summary: Precise terminology for the specification covering primitives, components, patterns, blocks, pages, templates, and utilities.
related:
  - /principles
  - /composition
---

## 1. Artifact Taxonomy

### 1.1 Primitive

A primitive (or, unstyled component) is the **lowest‑level building block** that provides behavior and accessibility without any styling.

Primitives are completely headless (i.e. unstyled) and encapsulate semantics, focus management, keyboard interaction, layering/portals, ARIA wiring, measurement, and similar concerns. They provide the behavioral foundation but require styling to become finished UI.

Examples:

- [Radix UI Primitives](https://www.radix-ui.com/primitives) (Dialog, Popover, Tooltip, etc.)
- [React Aria Components](https://react-spectrum.adobe.com/react-aria)
- [Base UI](https://base-ui.com)
- [Headless UI](https://headlessui.com/)

Expectations:

- Completely unstyled (headless).
- Single responsibility; composable into styled components.
- Ships with exhaustive a11y behavior for its role.
- Versioning favors stability; breaking changes are rare and documented.

<Callout>
  The terms primitive and component are typically used interchangeably across
  the web, but they are not the same.
</Callout>

### 1.2 Component

A component is a styled, reusable UI unit that adds visual design to primitives or composes multiple elements to create complete, functional interface elements.

Components are still relatively low-level but include styling, making them immediately usable in applications. They typically wrap unstyled primitives with default visual design while remaining customizable.

Examples:

- [shadcn/ui components](https://ui.shadcn.com/) (styled wrappers of Radix primitives)
- [Material UI components](https://mui.com/components/)
- [Ant Design components](https://ant.design/components/overview/)

Expectations:

- Clear props API; supports controlled and uncontrolled usage where applicable.
- Includes default styling but remains override-friendly (classes, tokens, slots).
- Fully keyboard accessible and screen-reader friendly (inherits from primitives).
- Composable (children/slots, render props, or compound subcomponents).
- May be built from primitives or implement behavior directly with styling.

### 1.3 Pattern

Patterns are a specific composition of primitives or components that are used to solve a specific UI/UX problem.

Examples:

- Form validation with inline errors
- Confirming destructive actions
- Typeahead search
- Optimistic UI

Expectations.

- Describes behavior, a11y, keyboard map, and failure modes.
- May include reference implementations in multiple frameworks.

### 1.4 Block

An opinionated, production-ready composition of components that solves a concrete interface use case (often product-specific) with content scaffolding. Blocks trade generality for speed of adoption.

Examples:

- Pricing table
- Auth screens
- Onboarding stepper
- AI chat panel
- Billing settings form

Expectations.

- Strong defaults, copy-paste friendly, easily branded/themed.
- Minimal logic beyond layout and orchestration; domain logic is stubbed via handlers.
- Accepts data via props; never hides data behind fetches without a documented adapter.

<AuthorNote
  name="Rob Austin"
  role="Founder of shadcnblocks.com"
  githubUsername="JugglerX"
  link="https://www.shadcnblocks.com/"
>
  Blocks are typically not reusable like a component. You don't import them, but
  they typically import components and primitives. This makes them good
  candidates for a [Registry](/registry) distribution method.
</AuthorNote>

### 1.5 Page

A complete, single-route view composed of multiple blocks arranged to serve a specific user-facing purpose. Pages combine blocks into a cohesive layout that represents one destination in an application.

Examples:

- Landing page (hero block + features block + pricing block + footer block)
- Product detail page (image gallery block + product info block + reviews block)
- Dashboard page (stats block + chart block + activity feed block)

Expectations:

- Combines multiple blocks into a unified layout for a single route.
- Focuses on layout and block orchestration rather than component-level details.
- May include page-specific logic for data coordination between blocks.
- Self-contained for a single URL/route; not intended to be reused across routes.

### 1.6 Template

A multi-page collection or full-site scaffold that bundles pages, routing configuration, shared layouts, global providers, and project structure. Templates are complete starting points for entire applications or major application sections.

Examples:

- [TailwindCSS Templates](https://tailwindui.com/templates)
- [shadcnblocks Templates](https://www.shadcnblocks.com/templates) (full application shells)
- "SaaS starter" (auth pages + dashboard pages + settings pages + marketing pages)
- "E-commerce template" (storefront + product pages + checkout flow + admin pages)

Expectations:

- Includes multiple pages with routing/navigation structure.
- Provides global configuration (theme providers, auth context, layout shells).
- Opinionated project structure with clear conventions.
- Designed as a comprehensive starting point; fork and customize rather than import as dependency.
- May include build configuration, deployment setup, and development tooling.

### 1.7 Utility (Non-visual)

A helper exported for developer ergonomics or composition; not rendered UI.

Examples:

- React hooks (useControllableState, useId)
- Class utilities
- Keybinding helpers
- Focus scopes

Expectations.

- Side-effect free (except where explicitly documented).
- Testable in isolation; supports tree-shaking.

## 2. API and Composition Vocabulary

### 2.1 Props API

The public configuration surface of a component. Props are stable, typed, and documented with defaults and a11y ramifications.

### 2.2 Children / Slots

Placeholders for caller-provided structure or content.

- Children (implicit slot). JSX between opening/closing tags.
- Named slots. Props like icon, footer, or `<Component.Slot>` subcomponents.
- Slot forwarding. Passing DOM attributes/className/refs through to the underlying element.

### 2.3 Render Prop (Function-as-Child)

A function child used to delegate rendering while the parent supplies state/data.

```tsx
<ParentComponent data={data}>
  {(item) => <ChildComponent key={item.id} {...item} />}
</ParentComponent>
```

Use when the parent must own data/behavior but the consumer must fully control markup.

### 2.4 Controlled vs. Uncontrolled

**Controlled** and **uncontrolled** are terms used to describe the state of a component.

**Controlled** components have their value driven by props, and typically emit an `onChange` event (source of truth is the parent). **Uncontrolled** components hold internal state; and may expose a `defaultValue` and imperative reset.

Many inputs should support both. Learn more about [controlled and uncontrolled state](/state).

### 2.5 Provider / Context

A top-level component that supplies shared state/configuration to a subtree (e.g., theme, locale, active tab id). Providers are explicitly documented with required placement.

### 2.6 Portal

Rendering UI outside the DOM hierarchy to manage layering/stacking context (e.g., modals, popovers, toasts), while preserving a11y (focus trap, aria-modal, inert background).

## 3. Styling and Theming Vocabulary

### 3.1 Headless

Implements behavior and accessibility without prescribing appearance. Requires the consumer to supply styling.

### 3.2 Styled

Ships with default visual design (CSS classes, inline styles, or tokens) but remains override-friendly (className merge, CSS vars, theming).

### 3.3 Variants

Discrete, documented style or behavior permutations exposed via props (e.g., `size="sm|md|lg"`, `tone="neutral|destructive"`). Variants are not separate components.

### 3.4 Design Tokens

Named, platform-agnostic values (e.g., `--color-bg`, `--radius-md`, `--space-2`) that parameterize visual design and support theming.

## 4. Accessibility Vocabulary

### 4.1 Role / State / Property

WAI-ARIA attributes that communicate semantics (`role="menu"`), state (`aria-checked`), and relationships (`aria-controls`, `aria-labelledby`).

### 4.2 Keyboard Map

The documented set of keyboard interactions for a widget (e.g., `Tab`, `Arrow keys`, `Home/End`, `Escape`). Every interactive component declares and implements a keyboard map.

### 4.3 Focus Management

Rules for initial focus, roving focus, focus trapping, and focus return on teardown.

## 5. Distribution Vocabulary

### 5.1 Package (Registry Distribution)

The component/library is published to a package registry (e.g., `npm`) and imported via a bundler. Favors versioned updates and dependency management.

### 5.2 Copy-and-Paste (Source Distribution)

Source code is integrated directly into the consumer's repository (often via a CLI). Favors ownership, customization, and zero extraneous runtime.

### 5.3 Registry (Catalog)

A curated index of artifacts (primitives, components, blocks, templates) with metadata, previews, and install/copy instructions. A registry is not necessarily a package manager.

## 6. Classification Heuristics

Use this decision flow to name and place an artifact:

1. Does it encapsulate a single behavior or a11y concern, with no styling? → **Primitive**
2. Is it a styled, reusable UI element that adds visual design to primitives or composes multiple elements? → **Component**
3. Does it solve a concrete product use case with opinionated composition and copy? → **Block**
4. Does it scaffold a page/flow with routing/providers and replaceable regions? → **Template**
5. Is it documentation of a recurring solution, independent of implementation? → **Pattern**
6. Is it non-visual logic for ergonomics/composition? → **Utility**

## 7. Non-Goals and Clarifications

- Web Components vs. "Components." In this spec, "component" refers to a reusable UI unit (examples in React). It does not imply the HTML Custom Elements standard unless explicitly stated. Equivalent principles apply across frameworks.
- Widgets. The term “widget” is avoided due to ambiguity; use component (general) or pattern (documentation-only solution).
- Themes vs. Styles. A theme is a parameterization of styles (via tokens). Styles are the concrete presentation. Components should support themes; blocks/templates may ship opinionated styles plus theming hooks.
