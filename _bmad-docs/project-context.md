---
name: project-context
type: context-document
project: lufa
lastUpdated: '2026-02-24'
generatedAtCommit: 'd27c912328f538971b6720513be2c817c2feff15'
---

# Project Context for AI Agents - Lufa

> Purpose: Critical rules and patterns that AI agents MUST follow.
> Generated: 2026-02-24
> Focus: Unobvious details that agents might otherwise miss.

---

## Technology Stack & Versions

| Package / Tool                          | Version    | Role                                             |
| --------------------------------------- | ---------- | ------------------------------------------------ |
| **pnpm**                                | `10.30.1`  | Package manager (workspace monorepo)             |
| **TypeScript**                          | `^5.9.3`   | Strict typing across all packages                |
| **React**                               | `^19.2.4`  | UI framework (peer dep, externalized in bundles) |
| **Vite**                                | `^7.3.1`   | Build tool for all apps and the design system    |
| **Storybook**                           | `^10.2.3`  | Component explorer (`@storybook/react-vite`)     |
| **single-spa**                          | `^6.0.3`   | Microfrontend orchestration                      |
| **ESLint**                              | `^9.39.2`  | Linting (flat config via `lufa_config_eslint`)   |
| **Prettier**                            | `^3.8.1`   | Formatting (via `lufa_config_prettier`)          |
| **lucide-react**                        | `^0.563.0` | Icon library for the design system               |
| **clsx**                                | `^2.1.1`   | CSS class composition utility                    |
| **style-dictionary**                    | `^5.2.0`   | Design token build pipeline (DTCG format)        |
| `@grasdouble/lufa_design-system`        | `2.0.0`    | React component library                          |
| `@grasdouble/lufa_design-system-tokens` | `1.1.0`    | 698 design tokens → 1025 CSS custom properties   |
| `@grasdouble/lufa_design-system-themes` | `1.0.1`    | 10 CSS theme overrides                           |

### Workspace Layout (pnpm-workspace.yaml)

```
packages/plugins/vite/*       → Vite plugins (import-map-injector, react-preamble)
packages/plugins/vscode/*     → VSCode extensions
packages/cdn/*                → CDN autobuild server
packages/config/*             → Shared ESLint, Prettier, TypeScript configs
packages/design-system/*      → tokens, themes, main DS, storybook, docusaurus, playwright, CLI
packages/apps/*               → Application packages
packages/apps/microfrontend/* → main-container, home (and future microfrontends)
packages/poc/*                → Proof of concept packages
```

**Key workspace setting**: `hoist: false` — NO global node_modules hoisting. Each package resolves its own dependencies.

---

## 🚨 CRITICAL: Design System Patterns (MUST READ)

### Token & Theme Usage

**The single most important rule**: Components MUST NEVER use hard-coded color, spacing, or typography values. ALL values MUST reference CSS custom properties from the token system.

#### ❌ NEVER hard-code visual values

```css
/* ❌ FORBIDDEN */
.button {
  background-color: #2563eb;
  padding: 12px 16px;
  border-radius: 4px;
  font-size: 14px;
  color: white;
}
```

```css
/* ✅ CORRECT — use semantic or component tokens */
.button {
  background-color: var(--lufa-component-button-variant-primary-background-default);
  padding: var(--lufa-component-button-padding-md);
  border-radius: var(--lufa-component-button-border-radius);
  font-size: var(--lufa-component-button-font-size-md);
  color: var(--lufa-component-button-variant-primary-text);
}
```

#### Token Hierarchy — Use the Right Level

ALWAYS choose the most specific token level applicable. NEVER skip levels upward.

| Level         | Prefix pattern       | When to use                                               |
| ------------- | -------------------- | --------------------------------------------------------- |
| **Primitive** | `--lufa-primitive-*` | Raw values — NEVER use in components directly             |
| **Core**      | `--lufa-core-*`      | Global design decisions — use when semantic doesn't apply |
| **Semantic**  | `--lufa-semantic-*`  | **Preferred for custom components**                       |
| **Component** | `--lufa-component-*` | Use for the specific component it targets                 |

```css
/* ❌ WRONG — primitive tokens in components */
.alert {
  background-color: var(--lufa-primitive-color-green-100);
}

/* ✅ CORRECT — semantic tokens */
.alert {
  background-color: var(--lufa-semantic-ui-background-success);
  color: var(--lufa-semantic-ui-text-success);
  border-color: var(--lufa-semantic-ui-border-success);
}
```

#### CSS Variable Naming Convention

```
--lufa-{level}-{category}-{name}[-{variant}][-{state}]

Examples:
  --lufa-primitive-color-blue-600
  --lufa-core-brand-primary-default
  --lufa-semantic-ui-text-primary
  --lufa-semantic-ui-spacing-default
  --lufa-component-button-variant-primary-background-hover
```

#### Semantic Spacing Tokens (ALWAYS use these, never raw px)

| Semantic name | Value | CSS variable                             |
| ------------- | ----- | ---------------------------------------- |
| `tight`       | 4px   | `--lufa-semantic-ui-spacing-tight`       |
| `compact`     | 8px   | `--lufa-semantic-ui-spacing-compact`     |
| `default`     | 16px  | `--lufa-semantic-ui-spacing-default`     |
| `comfortable` | 24px  | `--lufa-semantic-ui-spacing-comfortable` |
| `spacious`    | 32px  | `--lufa-semantic-ui-spacing-spacious`    |

#### Theme Activation — data attributes on HTML element

```html
<!-- ✅ CORRECT: set on <html> for global scope -->
<html data-theme="ocean" data-mode="dark">
  <!-- ✅ CORRECT: scope a theme to a subtree -->
  <section data-theme="matrix" data-mode="dark">…</section>

  <!-- ❌ WRONG: setting data-theme without data-mode defaults to light -->
  <!-- (this is valid but intentional — document the intent) -->
  <html data-theme="ocean"></html>
</html>
```

Available `data-theme` values: `ocean` | `forest` | `coffee` | `sunset` | `volcano` | `nordic` | `steampunk` | `volt` | `cyberpunk` | `matrix`

Available `data-mode` values: `light` | `dark` | `high-contrast`

#### CSS Import Order MATTERS

```css
/* globals.css — ALWAYS in this order */
@import '@grasdouble/lufa_design-system-tokens/tokens.css'; /* 1. Base tokens */
@import '@grasdouble/lufa_design-system-themes/ocean.css'; /* 2. Theme (optional) */
/* Multiple themes can be imported; only active data-theme applies */
```

```tsx
/* In a React app root — import DS stylesheet once */
import '@grasdouble/lufa_design-system/style.css';
```

#### Multi-mode token pattern

Mode-specific overrides use `[data-theme][data-mode]` selectors, NOT media queries:

```css
/* ✅ CORRECT Lufa pattern */
[data-theme],
[data-theme][data-mode='light'] {
  --lufa-core-brand-primary-default: #2563eb;
}
[data-theme][data-mode='dark'] {
  --lufa-core-brand-primary-default: #60a5fa;
}

/* ❌ DO NOT use media queries for token mode switching */
@media (prefers-color-scheme: dark) {
  /* not how Lufa works */
}
```

When mode is `auto`, the `useTheme` hook removes the `data-mode` attribute entirely, which causes the browser to apply `@media (prefers-color-scheme)` naturally.

---

### Component Import Rules

#### ❌ NEVER import from sub-paths

```tsx
// ❌ FORBIDDEN — internal paths are not stable public API
import { Stack } from '@grasdouble/lufa_design-system/dist/lufa-ui.mjs';
import { Button } from '@grasdouble/lufa_design-system/interaction/Button';
```

```tsx
// ✅ CORRECT — always from the package root
import { Button, Icon, Stack, Text } from '@grasdouble/lufa_design-system';
```

#### ❌ NEVER import tokens JSON directly in consuming packages

```ts
// ❌ FORBIDDEN — violates the token-usage validation rule
import tokensJson from '@grasdouble/lufa_design-system-tokens/dist/tokens-values.json';
// or for metadata
import metadata from '@grasdouble/lufa_design-system-tokens/metadata';
// ✅ CORRECT — use the named export
import tokens from '@grasdouble/lufa_design-system-tokens/values';
```

#### Stylesheet import is mandatory

EVERY application that uses `@grasdouble/lufa_design-system` MUST import the stylesheet exactly once at the app root:

```tsx
// App root (e.g., main.ts / parcel.tsx)
import '@grasdouble/lufa_design-system/style.css';
```

Without this import, ALL component styles will be missing.

#### Component prop API — use semantic names, not raw values

```tsx
// ❌ WRONG — raw pixel values are not accepted
<Stack gap="16px" />
<Box padding="24px" />

// ✅ CORRECT — semantic names map to tokens
<Stack spacing="default" />
<Box padding="comfortable" />
```

**SpacingValue**: `'none' | 'tight' | 'compact' | 'default' | 'comfortable' | 'spacious'`

#### Polymorphic `as` prop

Many components accept an `as` prop for semantic rendering:

```tsx
// ✅ Render Box as a <section>
<Box as="section" padding="comfortable">…</Box>

// ✅ Render Text as an <h1>
<Text as="h1" variant="h1" weight="bold">Title</Text>

// ✅ Render Button as an <a>
<Button as="a" href="/link" type="outline">Link</Button>
```

---

### Storybook Story Conventions

ALWAYS follow these patterns when writing or editing stories:

#### Story file structure

```tsx
// src/stories/{category}/ComponentName.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';

import { MyComponent } from '@grasdouble/lufa_design-system';

import { CodeBlock, PropCard, StoryContainer } from '../../components/helpers';

const meta = {
  title: '6. Interaction/MyComponent', // ← Numeric category prefix REQUIRED
  component: MyComponent,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    /* ... */
  },
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <StoryContainer>
      <PropCard label="Default">
        <MyComponent />
      </PropCard>
      <CodeBlock code="<MyComponent />" language="jsx" title="JSX" />
    </StoryContainer>
  ),
};

export const Playground: Story = {
  // Controls-driven story — ALWAYS include for interactive components
};
```

#### Story category numbering (MANDATORY sidebar order)

```
1. Architecture   → Token architecture interactive demos
2. Guides         → Developer usage guides
3. Tokens         → Token catalog and visualization
4. Foundation     → Layout primitive components
5. Content        → Display components (Text, Icon, Badge)
6. Interaction    → Interactive components (Button, Input, Label)
7. Composition    → Composed patterns (Card)
8. Utility        → Technical helpers (Portal, VisuallyHidden)
```

#### ❌ NEVER use `@storybook/addon-themes` for theme switching

The built-in addon is disabled. Theme/mode switching is handled by the custom `ThemeAndModeWrapper` global toolbar:

```tsx
// ❌ WRONG — addon is disabled
import { withThemeByDataAttribute } from '@storybook/addon-themes';

// ✅ CORRECT — set data-theme and data-mode in HTML, handled automatically by ThemeAndModeWrapper
```

#### Theme-aware colors in stories

```tsx
import { STORY_COLORS } from '../../constants/storyColors';

// ✅ For story UI chrome (adapts to theme/mode)
<div style={{ color: STORY_COLORS.themed.text.primary }}>Label</div>

// ✅ For fixed decorative demo content
<Box style={{ backgroundColor: STORY_COLORS.primary.blue.main }}>Example</Box>
```

---

## 🚨 CRITICAL: Microfrontend Architecture

### Architecture Overview

```
Browser
  └── main-container (port 5173 / CDN root)
        ├── Single-SPA orchestrator
        ├── Import maps (3 JSON files)
        │     ├── importMapExternal.json  → React, react-dom from esm.sh (non-overridable)
        │     ├── importMap.json          → prod CDN URLs for microfrontends
        │     └── importMap.dev.json      → localhost URLs (overridable)
        └── Registered microfrontends
              └── @grasdouble/lufa_microfrontend_home  →  active at pathname === '/'
```

### Import Map Pattern

EVERY new microfrontend MUST be registered in ALL THREE import map files:

```json
// src/importMapExternal.json — shared singletons (NEVER overridable)
{
  "imports": {
    "react": "https://esm.sh/react@19.0.0",
    "react/jsx-runtime": "https://esm.sh/react@19.0.0/jsx-runtime",
    "react-dom": "https://esm.sh/react-dom@19.0.0",
    "react-dom/client": "https://esm.sh/react-dom@19.0.0/client"
  }
}

// src/importMap.json — production CDN URLs
{
  "imports": {
    "@grasdouble/lufa_microfrontend_home": "https://cdn.sebastien-lemouillour.fr/gh/@grasdouble/lufa_microfrontend_home@{version}"
  }
}

// src/importMap.dev.json — local dev URLs (overridable via import-map-overrides)
{
  "imports": {
    "@grasdouble/lufa_microfrontend_home": "http://localhost:4101/home.mjs"
  }
}
```

#### ❌ NEVER bundle React inside a microfrontend

React MUST be externalized in every microfrontend's build config. It is provided as a singleton via the external import map:

```ts
// vite.config.ts for any microfrontend
import externalizeDeps from 'vite-plugin-externalize-deps';

export default defineConfig({
  plugins: [
    externalizeDeps({ peerDeps: true }), // ← externalizes react, react-dom, design-system
  ],
  build: {
    format: 'esm', // ← REQUIRED for Single-SPA / import maps
    minify: false, // ← keep debuggable for CDN-versioned modules
    modulePreload: false, // ← Single-SPA handles loading; native preload interferes
  },
});
```

### Microfrontend Boundaries

| Package                             | Port   | Route              | Output file     |
| ----------------------------------- | ------ | ------------------ | --------------- |
| `lufa_microfrontend_main-container` | `5173` | all routes         | `dist/main.js`  |
| `lufa_microfrontend_home`           | `4101` | `pathname === '/'` | `dist/home.mjs` |

#### Mount target is mandatory

The main container provides a single mount point. ALL microfrontends MUST mount into it:

```html
<!-- index.html in main-container -->
<div id="lufa-container"></div>
```

```tsx
// parcel.tsx in any microfrontend
export const mount = async () => {
  const container = document.getElementById('lufa-container');
  createRoot(container!).render(<App />);
};
```

#### ❌ NEVER create multiple React roots per microfrontend lifecycle

```tsx
// ❌ WRONG — creates a new root on every mount/unmount cycle
export const unmount = async () => {
  createRoot(document.getElementById('lufa-container')!).unmount(); // re-creates root!
};

// ✅ CORRECT — store root reference, reuse for unmount
let root: Root | null = null;

export const mount = async () => {
  root = createRoot(document.getElementById('lufa-container')!);
  root.render(<App />);
};

export const unmount = async () => {
  root?.unmount();
  root = null;
};
```

### Cross-Microfrontend Communication

- Microfrontends MUST NOT directly import each other.
- Shared state crosses boundaries via Single-SPA's custom events or the browser URL.
- Shared UI components come ONLY from `@grasdouble/lufa_design-system` (resolved via import map).
- The design system CSS is loaded ONCE in the main container's `main.ts`.

#### CSS injection in microfrontends

Microfrontends use `vite-plugin-css-injected-by-js` so CSS is self-contained in the `.mjs` bundle — no separate `.css` file is emitted:

```ts
// vite.config.ts for microfrontends
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [cssInjectedByJsPlugin()],
  // ...
});
```

#### Enabling dev mode (import map overrides)

```js
// In browser console — enables the overrides devtools widget
localStorage.setItem('devtools', 'true');
location.reload();
```

---

## 🚨 CRITICAL: TypeScript Rules

### No root tsconfig.json

There is **no** root-level `tsconfig.json`. Each package extends from the shared config:

```json
// Any package's tsconfig.json
{
  "extends": "@grasdouble/lufa_config_tsconfig/react-app.json"
}
```

NEVER add a root `tsconfig.json` — it would break per-package isolation.

### Shared config packages

```
@grasdouble/lufa_config_eslint    → shared ESLint flat config
@grasdouble/lufa_config_prettier  → shared Prettier config
@grasdouble/lufa_config_tsconfig  → shared TypeScript base configs
```

ALWAYS use these shared configs. NEVER add custom eslint/tsconfig rules to individual packages without extending from the shared base.

### CSS Modules typing

CSS Module files need accompanying `.d.ts` files when TypeScript strict mode would otherwise reject the import:

```ts
// style.css.d.ts (example from storybook package)
declare const styles: { [className: string]: string };
export default styles;
```

---

## Import Patterns

### Design System components

```tsx
// ✅ Named imports from package root
import {
  Badge,
  Button,
  Card,
  getContrastRatio,
  Icon,
  meetsWCAG,
  Stack,
  Text,
  useTheme,
  useThemeMode,
} from '@grasdouble/lufa_design-system';
```

### Design System tokens (CSS)

```css
/* In application CSS/global styles */
@import '@grasdouble/lufa_design-system-tokens/tokens.css';
```

### Design System tokens (JS/TS runtime values)

```ts
import tokens from '@grasdouble/lufa_design-system-tokens/values';

// tokens.core.brand.primary.default === "#2563eb"
// tokens.primitive.spacing['16'] === "16px"
```

### Theme CSS files

```css
/* Each theme is a separate import; only the active data-theme applies */
@import '@grasdouble/lufa_design-system-themes/ocean.css';
```

### Vite import map plugin

```ts
import importMapInjectorPlugin from '@grasdouble/lufa_plugin_vite_vite-plugin-import-map-injector';
```

### Dynamic imports in Single-SPA (bypass Vite analysis)

```ts
// Use @vite-ignore for dynamic import specifiers resolved via import map
const loadApp = (url: string) => () => import(/* @vite-ignore */ url);
```

---

## Testing Conventions

### Component tests — Playwright CT

The design system uses `@playwright/experimental-ct-react` for component-level testing:

```bash
# Run component tests
pnpm ds:playwright:ci

# Update visual snapshots (Linux Docker — cross-platform consistency)
pnpm ds:playwright:docker:update-snapshots-linux

# Interactive UI
pnpm ds:playwright:ui
```

Visual snapshots MUST be updated via the Docker command to ensure Linux-consistent rendering. Local macOS snapshots will differ from CI.

### Token tests

```bash
# DTCG format consistency checks
pnpm ds:tokens:build  # includes validate:tokens step

# WCAG contrast ratio tests
pnpm --filter @grasdouble/lufa_design-system-tokens test:wcag
```

### Monorepo-wide checks

```bash
pnpm all:typecheck    # TypeScript check all packages
pnpm all:lint         # ESLint all packages
pnpm all:test         # All package tests
```

---

## File Organization

### Design System package structure

```
packages/design-system/
├── main/           → @grasdouble/lufa_design-system (React components)
│   └── src/
│       ├── index.ts                  ← Public API (ONLY export from here)
│       ├── foundation/               ← Layout primitives
│       ├── content/                  ← Display components
│       ├── interaction/              ← Form/action components
│       ├── composition/              ← Composed patterns
│       ├── utility/                  ← Technical helpers
│       ├── hooks/                    ← useTheme, useThemeMode
│       └── utils/                    ← accessibility.ts, responsive-visibility.ts
├── tokens/         → @grasdouble/lufa_design-system-tokens
│   └── src/
│       ├── primitives/               ← Raw values (color, spacing, typography, etc.)
│       ├── core/                     ← Design intent applied to primitives
│       ├── semantic/                 ← UI-context tokens
│       └── component/                ← Per-component tokens
├── themes/         → @grasdouble/lufa_design-system-themes
│   └── src/
│       ├── ocean.css, forest.css, …  ← 10 theme CSS files
│       └── _token-template.css       ← Template for new themes
├── storybook/      → @grasdouble/lufa_design-system-storybook
│   └── src/stories/{category}/       ← Numbered category folders
├── playwright/     → @grasdouble/lufa_design-system-playwright
├── docusaurus/     → @grasdouble/lufa_design-system-docusaurus
└── cli/            → @grasdouble/lufa_design-system-cli
```

### Microfrontend structure

```
packages/apps/microfrontend/
├── main-container/
│   └── src/
│       ├── main.ts                   ← Single-SPA bootstrap + registerApplication
│       ├── importMap.json            ← Production CDN URLs
│       ├── importMap.dev.json        ← Dev localhost URLs
│       └── importMapExternal.json    ← Shared singleton deps (React)
└── home/
    └── src/
        ├── parcel.tsx                ← Single-SPA lifecycle (bootstrap/mount/unmount)
        ├── App.tsx                   ← Root component
        ├── App.module.css            ← CSS Modules (uses design tokens)
        └── assets/                   ← .webp images
```

### Config packages

```
packages/config/
├── eslint/         → @grasdouble/lufa_config_eslint
├── prettier/       → @grasdouble/lufa_config_prettier
└── tsconfig/       → @grasdouble/lufa_config_tsconfig
```

---

## Build System

### Build order dependency (MUST follow this sequence)

```
1. pnpm ds:tokens:build     → produces dist/tokens.css, tokens-values.json
2. pnpm ds:themes:build     → copies theme CSS files to dist/
3. pnpm ds:main:build       → produces dist/lufa-ui.mjs + style.css
4. pnpm ds:storybook:build  → builds storybook-static/
5. pnpm ds:docusaurus:build → builds Docusaurus site
```

Or use the aggregate command:

```bash
pnpm ds:all:build   # runs all design system builds in correct order
```

### Package scripts pattern

All packages expose a consistent set of scripts:

| Script           | Purpose                 |
| ---------------- | ----------------------- |
| `build`          | Compile to `dist/`      |
| `dev`            | Watch mode / dev server |
| `lint`           | ESLint check            |
| `prettier:check` | Format check            |
| `prettier:write` | Auto-format             |
| `typecheck`      | `tsc --noEmit`          |

### Design system build specifics

The `lufa_design-system` build runs `generate:utilities` first — this generates CSS utility class files before Vite compiles. NEVER run `vite build` directly without the full `pnpm build` script:

```bash
# ✅ CORRECT
pnpm --filter @grasdouble/lufa_design-system build

# ❌ WRONG — skips utility generation
vite build
```

### Token build pipeline

```
pnpm validate:tokens
  → style-dictionary build
    → Transforms: size/rem/fluid (px + clamp), color/css, shadow/css/shorthand-custom
    → Outputs: dist/tokens.css, tokens-values.json, tokens-metadata.json, tokens.map.json
  → pnpm check:size  (warns if CSS > 120 KB)
```

### Vite build output requirements for microfrontends

```ts
build: {
  lib: {
    entry: 'src/parcel.tsx',
    formats: ['es'],
    fileName: () => 'home.mjs',  // deterministic name for import map URL
  },
  rollupOptions: {
    external: ['react', 'react-dom', '@grasdouble/lufa_design-system'],
  },
  minify: false,         // aids CDN debugging
  modulePreload: false,  // Single-SPA owns module loading
  sourcemap: true,
},
```

---

## Design System Tokens & Themes

### Token count summary

| Level     | Count   | CSS vars | Source dir        |
| --------- | ------- | -------- | ----------------- |
| Primitive | 203     | ~250     | `src/primitives/` |
| Core      | 85      | ~180     | `src/core/`       |
| Semantic  | 175     | ~290     | `src/semantic/`   |
| Component | 235     | ~305     | `src/component/`  |
| **Total** | **698** | **1025** |                   |

### Token reference flow — ALWAYS reference downward

```
Component tokens → Semantic tokens → Core tokens → Primitive tokens
```

Custom components SHOULD reference semantic tokens. DTCG reference syntax for token authors: `{semantic.ui.text.primary}`.

### Z-index scale (ALWAYS use these tokens)

| Token                                              | Value | Use case          |
| -------------------------------------------------- | ----- | ----------------- |
| `--lufa-semantic-elevation-z-index-base`           | 0     | Normal flow       |
| `--lufa-semantic-elevation-z-index-dropdown`       | 1000  | Dropdown menus    |
| `--lufa-semantic-elevation-z-index-sticky`         | 1100  | Sticky headers    |
| `--lufa-semantic-elevation-z-index-fixed`          | 1200  | Fixed navigation  |
| `--lufa-semantic-elevation-z-index-modal-backdrop` | 1300  | Modal overlays    |
| `--lufa-semantic-elevation-z-index-modal`          | 1400  | Modal dialogs     |
| `--lufa-semantic-elevation-z-index-popover`        | 1500  | Popovers/tooltips |
| `--lufa-semantic-elevation-z-index-toast`          | 1600  | Toasts            |

### WCAG-compliant focus ring pattern

```css
/* ✅ ALWAYS use this pattern for focus-visible */
.interactive-element:focus-visible {
  outline: var(--lufa-semantic-interactive-focus-ring-offset) solid var(--lufa-semantic-interactive-focus-ring);
  outline-offset: var(--lufa-semantic-interactive-focus-ring-offset);
  box-shadow: var(--lufa-semantic-effect-glow-box-focus);
}
```

### Available themes

| Theme     | `data-theme` value | Character                              |
| --------- | ------------------ | -------------------------------------- |
| Default   | (omit or `""`)     | Blue/gray neutral                      |
| Ocean     | `ocean`            | Cyan/teal marine                       |
| Forest    | `forest`           | Emerald/green organic                  |
| Coffee    | `coffee`           | Amber warm retro                       |
| Sunset    | `sunset`           | Orange/rose warm                       |
| Volcano   | `volcano`          | Red/orange intense                     |
| Nordic    | `nordic`           | Sky/slate arctic                       |
| Steampunk | `steampunk`        | Copper/bronze Victorian                |
| Volt      | `volt`             | Lime/black industrial                  |
| Cyberpunk | `cyberpunk`        | Fuchsia/cyan neon (has glow tokens)    |
| Matrix    | `matrix`           | Green/black terminal (has glow tokens) |

### Glow tokens (Cyberpunk and Matrix only)

```css
/* Only available when data-theme="cyberpunk" or data-theme="matrix" */
.element {
  box-shadow: var(--lufa-glow-box);
}
.element {
  text-shadow: var(--lufa-glow-text-intense);
}
.element {
  box-shadow: var(--lufa-glow-inset-subtle);
}
```

### Creating a new theme

1. Copy `packages/design-system/themes/src/_token-template.css` → `src/your-theme.css`
2. Fill in ALL token values for all three modes (light, dark, high-contrast)
3. Add `'your-theme.css'` to the `themes` array in `scripts/copy-themes.ts`
4. Add `"./your-theme.css": "./dist/your-theme.css"` to `package.json#exports`
5. Run `pnpm build && pnpm validate:template`

---

## Docusaurus Documentation

The design system has a Docusaurus site at `packages/design-system/docusaurus/`.

```bash
pnpm ds:docusaurus:dev    # dev server
pnpm ds:docusaurus:build  # static build
```

Token usage validation is available per-package:

```bash
pnpm ds:main:validate:token-usage          # check for forbidden direct JSON imports
pnpm ds:main:validate:token-usage:unused   # find unused token references
pnpm ds:main:validate:components           # validate component export structure
pnpm ds:main:validate:components:strict    # strict validation
```

---

## Common Mistakes to Avoid

### ❌ NEVER import `style.css` multiple times

The design system stylesheet MUST be imported **once** at the application root. Importing it in multiple components causes style duplication and specificity issues.

### ❌ NEVER use `ThemeName` or `ThemeMode` values not in the type

```ts
// ❌ WRONG — 'sunset' is a theme, not available in useTheme ThemeName
const { setTheme } = useTheme();
setTheme('sunset'); // TypeScript error — ThemeName is 'default' | 'ocean' | 'forest'
```

`useTheme()` only supports `ThemeName: 'default' | 'ocean' | 'forest'`. For more themes, apply `data-theme` attribute directly.

### ❌ NEVER use the `size` prop on `Input`

`Input` extends all native `<input>` props **except** `size` (which conflicts with HTML attribute):

```tsx
// ❌ WRONG — size prop is excluded
<Input size="md" />

// ✅ CORRECT — use fullWidth prop and let the token handle sizing
<Input fullWidth />
```

### ❌ NEVER bypass `hoist: false` in pnpm workspace

Each package MUST declare all its own dependencies. Relying on a sibling's `node_modules` is not supported and will break in CI.

### ❌ NEVER reference `@grasdouble/lufa_design-system` as a bundle dependency

In microfrontends, the design system is always **externalized** and resolved via import map. Do not add it to `bundledDependencies`.

### ❌ NEVER emit a separate CSS file from a microfrontend

Microfrontends use `vite-plugin-css-injected-by-js` — CSS is bundled into the `.mjs` file. A separate `.css` file would not be loaded by Single-SPA.

### ❌ NEVER hard-code icon names as strings without checking `IconName` type

```tsx
// ❌ WRONG — 'close' is not a valid IconName
<Icon name="close" />

// ✅ CORRECT — use the valid name
<Icon name="x" />
```

Available icon names include: `user`, `home`, `settings`, `menu`, `search`, `check`, `x`, `plus`, `minus`, `edit`, `trash`, `save`, `download`, `upload`, `chevron-down`, `chevron-up`, `chevron-left`, `chevron-right`, `arrow-left`, `arrow-right`, `alert-circle`, `info`, `check-circle`, `x-circle`, `loader`, `external-link`, `eye`, `eye-off`, `heart`, `star` (36 total — check `IconName` type for full list).

### ❌ NEVER add glow tokens to non-cyber themes

Glow tokens (`--lufa-glow-*`) are only defined in Cyberpunk and Matrix themes. Referencing them in other themes produces no effect (the variable will be undefined).

### ❌ NEVER run `vite build` directly in the design system package

Always use `pnpm build` which first runs `generate:utilities` to pre-generate the CSS utility classes.

### ❌ NEVER create a new theme without validating with `pnpm validate:template`

The template validator checks alpha token completeness (54 tokens), shadow token structure, overlay tokens, and mode variants. An incomplete theme will fail at runtime.

---

## Quick Reference

### Dev commands

```bash
# Start all microfrontends
pnpm app:mf:dev

# Start design system (DS main watch + Storybook + Docusaurus)
pnpm ds:all:dev

# Start only Storybook
pnpm ds:storybook:dev   # → http://localhost:6006

# Start only Docusaurus
pnpm ds:docusaurus:dev

# Run all package checks
pnpm all:typecheck && pnpm all:lint && pnpm all:test
```

### Build commands

```bash
pnpm ds:all:build        # Full design system build (correct order)
pnpm app:mf:build        # Build all microfrontends
pnpm all:build           # Build everything
```

### Token validation

```bash
pnpm ds:tokens:validate:tokens          # DTCG format check
pnpm ds:main:validate:token-usage       # No forbidden direct imports
pnpm ds:main:validate:components        # Component export check
pnpm ds:cli:validate:token-usage        # CLI token usage check
```

### Component summary

| Component        | Category    | Key props                                                                                              |
| ---------------- | ----------- | ------------------------------------------------------------------------------------------------------ |
| `Box`            | Foundation  | `as`, `padding*`, `margin*`, `background`, `borderRadius`, `show/hide/showFrom/hideFrom`               |
| `Stack`          | Foundation  | `direction`, `spacing`, `align`, `justify`, `wrap`                                                     |
| `Cluster`        | Foundation  | `spacing`, `align`, `justify`                                                                          |
| `Flex`           | Foundation  | Full flex props                                                                                        |
| `Grid`           | Foundation  | `columns`, `gap*`, `align`, `justify`                                                                  |
| `Container`      | Foundation  | `fluid`, `size`                                                                                        |
| `Center`         | Foundation  | Centering utility                                                                                      |
| `Bleed`          | Foundation  | Negative margin breakout                                                                               |
| `Divider`        | Foundation  | `as`, orientation variants                                                                             |
| `AspectRatio`    | Foundation  | Ratio config                                                                                           |
| `Text`           | Content     | `as`, `variant`, `color`, `weight`, `align`, `transform`                                               |
| `Icon`           | Content     | `name` (required), `size`, `color`, `title`                                                            |
| `Badge`          | Content     | `variant`, `size`, `dot`                                                                               |
| `Button`         | Interaction | `as`, `type`, `variant`, `size`, `radius`, `iconLeft`, `iconRight`, `loading`, `disabled`, `fullWidth` |
| `Input`          | Interaction | `error`, `fullWidth` (+ all native input props except `size`)                                          |
| `Label`          | Interaction | `as`, `htmlFor`                                                                                        |
| `Card`           | Composition | `as`                                                                                                   |
| `Portal`         | Utility     | `container`                                                                                            |
| `VisuallyHidden` | Utility     | `as`                                                                                                   |

### Hooks

| Hook                     | Returns                                                                         | Persists to                       |
| ------------------------ | ------------------------------------------------------------------------------- | --------------------------------- |
| `useTheme(options?)`     | `{ theme, mode, effectiveMode, setTheme, setMode, systemPrefersDark }`          | `localStorage['lufa-theme']`      |
| `useThemeMode(options?)` | `{ mode, setMode, systemPrefersDark, systemPrefersContrast, systemPreference }` | `localStorage['lufa-theme-mode']` |

### Port assignments

| Service            | Port   |
| ------------------ | ------ |
| main-container     | `5173` |
| microfrontend_home | `4101` |
| Storybook          | `6006` |

### CDN / external URLs

| Resource              | URL                                                   |
| --------------------- | ----------------------------------------------------- |
| Production import map | `https://cdn.sebastien-lemouillour.fr/importMap.json` |
| React (CDN)           | `https://esm.sh/react@19.0.0`                         |
| react-dom (CDN)       | `https://esm.sh/react-dom@19.0.0`                     |
| Storybook (hosted)    | `https://lufa-storybook.sebastien-lemouillour.fr`     |

### Package registry

All packages publish to GitHub npm registry:

```json
"publishConfig": {
  "access": "public",
  "registry": "https://npm.pkg.github.com"
}
```
