# Main Package Architecture

> **Last Updated**: December 13, 2025  
> **Package**: `@grasdouble/lufa_design-system`  
> **Location**: `packages/design-system/main/`

## Overview

The Main package is the **core design system package** that exports all React components, utilities, and styles. It's the primary entry point for consuming the Lufa Design System in applications.

## Purpose

This package:

- **Exports all UI components** (Button, Card, Typography, Input, etc.)
- **Bundles CSS** from primitives and tokens
- **Provides utilities** for accessibility and component composition
- **Ships TypeScript types** for all exports
- **Integrates Tailwind CSS v4** with component-level resets

## Package Architecture

```
packages/design-system/main/
├── src/
│   ├── components/          # React components
│   │   ├── Typography/     # Text components
│   │   ├── display/        # Display components (Card, Avatar, etc.)
│   │   ├── feedback/       # Feedback components (Alert, Modal, etc.)
│   │   ├── forms/          # Form components (Input, Button, etc.)
│   │   ├── layout/         # Layout components (Container, etc.)
│   │   ├── overlay/        # Overlay components (Dialog, Popover, etc.)
│   │   ├── patterns/       # Complex patterns
│   │   └── index.ts        # Component exports
│   │
│   ├── css/                 # CSS utilities and resets
│   │   └── component-resets.css  # Custom reset utilities
│   │
│   ├── utils/               # Utility functions
│   │   ├── accessibility.ts
│   │   └── index.ts
│   │
│   ├── index.ts            # Main entry point
│   └── tailwind.css        # Tailwind CSS orchestration
│
├── dist/                    # Build output (generated)
│   ├── lufa-ui.mjs         # ES module (~145 KB)
│   ├── style.css           # Bundled CSS
│   ├── index.d.ts          # TypeScript declarations
│   └── ...
│
├── vite.config.ts           # Vite library mode configuration
├── tsconfig.json
├── tsconfig.build.json
├── package.json
├── AI_CSS_ARCHITECTURE.md   # CSS architecture documentation
└── README.md
```

## Build Configuration

### Vite Library Mode

```javascript
// vite.config.ts
export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: () => "lufa-ui.mjs",
      name: "LufaDS",
      cssFileName: "style",
    },
    target: "esnext",
    minify: false,
    sourcemap: true,
  },
  plugins: [
    react(),
    tailwindcss(),
    dts({
      entryRoot: "src",
      rollupTypes: false,
      insertTypesEntry: true,
      outDir: "dist",
    }),
    externalizeDeps({
      peerDeps: true, // React externalized
    }),
  ],
});
```

**Key Points**:

- **ES Module Only**: Single format for modern browsers
- **CSS Bundling**: All styles (primitives + tokens + components) in `style.css`
- **Type Generation**: Full TypeScript declarations via `vite-plugin-dts`
- **React Externalized**: Peer dependency, not bundled
- **No Minification**: Readable for debugging, consumers minify

## Package.json Exports

```json
{
  "name": "@grasdouble/lufa_design-system",
  "version": "0.3.0",
  "type": "module",
  "main": "./dist/lufa-ui.mjs",
  "module": "./dist/lufa-ui.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/lufa-ui.mjs",
      "default": "./dist/lufa-ui.mjs"
    },
    "./style.css": "./dist/style.css"
  },
  "peerDependencies": {
    "react": "^19.1.0"
  },
  "dependencies": {
    "@grasdouble/lufa_design-system-primitives": "workspace:^",
    "@grasdouble/lufa_design-system-tokens": "workspace:^",
    "@headlessui/react": "^2.2.9",
    "@heroicons/react": "^2.2.0",
    "clsx": "^2.1.1"
  }
}
```

**Exports**:

- **`.`**: Main package entry (components + utils)
- **`./style.css`**: Bundled CSS file

**Dependencies**:

- **Primitives**: CSS variables foundation
- **Tokens**: Semantic design tokens
- **Headless UI**: Unstyled accessible components
- **Heroicons**: Icon library
- **clsx**: Utility for conditional classes

## Component Structure

### Category Organization

Components are organized by category:

| Category       | Purpose              | Examples                 |
| -------------- | -------------------- | ------------------------ |
| **Typography** | Text and headings    | Heading, Text, Code      |
| **display**    | Display content      | Card, Avatar, Badge      |
| **feedback**   | User feedback        | Alert, Modal, Spinner    |
| **forms**      | Form inputs          | Input, Button, Checkbox  |
| **layout**     | Page structure       | Container, Grid, Stack   |
| **overlay**    | Floating elements    | Dialog, Popover, Tooltip |
| **patterns**   | Complex compositions | LoginForm, DataTable     |

### Component File Structure

Each component follows this pattern:

```
components/{category}/{ComponentName}/
├── ComponentName.tsx           # Main component
├── ComponentName.module.css    # Scoped styles
├── index.ts                    # Exports
└── ComponentName.test.tsx      # Tests (optional)
```

### Example Component

**Button.tsx**:

```typescript
import { forwardRef, ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";
import { clsx } from "clsx";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          styles.button,
          styles[`variant-${variant}`],
          styles[`size-${size}`],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
```

**Button.module.css**:

```css
@reference '../../../tailwind.css';

@layer components {
  .button {
    @utility preflight; /* Apply CSS reset */
    @apply inline-flex items-center justify-center;
    @apply rounded-md font-medium;
    @apply transition-colors;
  }

  .variant-primary {
    @apply bg-blue-600 text-white hover:bg-blue-700;
  }

  .variant-secondary {
    @apply bg-gray-200 text-gray-900 hover:bg-gray-300;
  }

  .size-sm {
    @apply px-3 py-1.5 text-sm;
  }

  .size-md {
    @apply px-4 py-2 text-base;
  }

  .size-lg {
    @apply px-6 py-3 text-lg;
  }
}
```

## CSS Architecture

### Component-Level Resets

**Strategy**: No global Tailwind preflight. Each component applies `@utility preflight` locally.

**Why?**

- Prevents conflicts with host applications (Docusaurus, Next.js)
- Components work in any context
- Predictable styling without side effects

See: [CSS.md](./CSS.md) for detailed CSS architecture.

### CSS Import Chain

```
src/tailwind.css                    # Tailwind orchestration
  ↓ @import
primitives/primitives.css           # CSS variables
  ↓ @import
tokens/tokens.css                   # Semantic tokens
  ↓ @import
css/component-resets.css            # Custom reset utilities
  ↓ referenced by
components/**/Component.module.css  # Component styles
```

**Build Output**: All merged into `dist/style.css` (~50 KB)

## Entry Point

### src/index.ts

```typescript
// Components (grouped by category)
export * from "./components/Typography";
export * from "./components/display";
export * from "./components/feedback";
export * from "./components/forms";
export * from "./components/layout";
export * from "./components/overlay";
export * from "./components/patterns";

// Utilities
export * from "./utils";

// Re-export primitives and tokens for convenience
export { primitives } from "@grasdouble/lufa_design-system-primitives";
export { tokens } from "@grasdouble/lufa_design-system-tokens";
```

### Usage in Applications

```typescript
// Import components
import { Button, Card, Input } from "@grasdouble/lufa_design-system";

// Import CSS
import "@grasdouble/lufa_design-system/style.css";

// Use components
function App() {
  return (
    <Card>
      <Input placeholder="Enter text" />
      <Button>Submit</Button>
    </Card>
  );
}
```

## Build Process

### Development Build (Watch Mode)

```bash
cd packages/design-system/main
pnpm dev
```

**Output**: Continuous rebuilds on file changes → `dist/`

### Production Build

```bash
pnpm build
```

**Output**:

```
dist/
├── lufa-ui.mjs          # ES module (~145 KB)
├── lufa-ui.mjs.map      # Source map
├── style.css            # Bundled CSS (~50 KB)
├── style.css.map        # CSS source map
├── index.d.ts           # Main type declarations
└── components/          # Individual component types
```

### Build Metrics

| File        | Size    | Description                  |
| ----------- | ------- | ---------------------------- |
| lufa-ui.mjs | ~145 KB | All components + utilities   |
| style.css   | ~50 KB  | Primitives + tokens + styles |
| index.d.ts  | ~20 KB  | TypeScript declarations      |

**Total**: ~215 KB (uncompressed, pre-treeshake)

## Dependencies

### Internal Dependencies

```
@grasdouble/lufa_design-system (main)
  ├─→ @grasdouble/lufa_design-system-primitives  # CSS variables
  └─→ @grasdouble/lufa_design-system-tokens       # Semantic tokens
```

### External Dependencies

- **React 19**: Peer dependency (not bundled)
- **@headlessui/react**: Accessible unstyled components
- **@heroicons/react**: SVG icons
- **clsx**: Conditional className utility

### Consumed By

- `@grasdouble/lufa_design-system-storybook` (component documentation)
- `@grasdouble/lufa_design-system-documentation` (Docusaurus site)
- `@grasdouble/lufa_microfrontend_*` (microfrontend parcels)
- External applications via GitHub Packages

## Deployment

### GitHub Packages

```bash
# Publish to GitHub Packages
pnpm publish
```

**Registry**: `https://npm.pkg.github.com`  
**Package**: `@grasdouble/lufa_design-system@0.3.0`

### CDN Distribution

After publishing to GitHub Packages:

1. Autobuild server detects new version
2. Downloads package from GitHub Packages
3. Uploads to CDN: `https://cdn.sebastien-lemouillour.fr/@grasdouble/lufa_design-system@0.3.0/lufa-ui.mjs`
4. Updates import map for microfrontends

## Integration Points

### Storybook

```typescript
// packages/design-system/storybook/stories/Button.stories.tsx
import { Button } from "@grasdouble/lufa_design-system";

export default {
  title: "Components/Forms/Button",
  component: Button,
};
```

**Live**: https://lufa-storybook.sebastien-lemouillour.fr

### Docusaurus

```mdx
<!-- packages/design-system/documentation/docs/button.mdx -->

import { Button } from "@grasdouble/lufa_design-system";
import "@grasdouble/lufa_design-system/style.css";

<Button>Click Me</Button>
```

**Live**: https://lufa-design.sebastien-lemouillour.fr

### Microfrontends

```typescript
// packages/apps/microfrontend/home/src/App.tsx
import { Card, Button } from "@grasdouble/lufa_design-system";

export default function App() {
  return (
    <Card>
      <Button variant="primary">Get Started</Button>
    </Card>
  );
}
```

Loaded via import map from CDN.

## Technology Stack

- **React**: 19.2.1
- **TypeScript**: 5.9.3
- **Tailwind CSS**: 4.1.17
- **Vite**: 7.2.6
- **Build Plugins**:
  - `@vitejs/plugin-react` (React Fast Refresh)
  - `@tailwindcss/vite` (Tailwind v4 integration)
  - `vite-plugin-dts` (TypeScript declarations)
  - `vite-plugin-externalize-deps` (Peer dependency externalization)

## Design Decisions

### Library Mode

**Why Vite library mode?**

- Optimized for library distribution
- Single ES module output
- Automatic CSS extraction
- Tree-shakeable exports

### No Minification

**Why unminified?**

- Easier debugging during development
- Consumers handle minification in their build
- Source maps work better
- Smaller initial bundle size for GitHub Packages

### React 19 Requirement

**Why React 19?**

- Latest stable version
- Modern hooks and features
- Server Components support (future)
- Improved performance

### Component-Level CSS

**Why module CSS?**

- Scoped styles prevent conflicts
- Explicit dependencies
- Better developer experience (autocomplete)
- Colocated with components

## Related Documentation

- **CSS Architecture**: [CSS.md](./CSS.md) - Component-level resets and Tailwind v4
- **Primitives**: [PRIMITIVES.md](./PRIMITIVES.md) - CSS variables foundation
- **Tokens**: [TOKENS.md](./TOKENS.md) - Semantic design tokens
- **Design System Overview**: [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Full design system structure
- **Development Rules**: [../../rules/design-system/MAIN.md](../../rules/design-system/MAIN.md) - Component creation guidelines
