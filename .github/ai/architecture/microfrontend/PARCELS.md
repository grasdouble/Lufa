# Microfrontend Parcels Architecture

> **Last Updated**: December 13, 2025  
> **Framework**: React 19 + Single-SPA  
> **Location**: `packages/apps/microfrontend/{parcel-name}/`

## Overview

**Parcels** are independent microfrontend applications that can be loaded, mounted, and unmounted dynamically by the main-container. Each parcel is a self-contained React application built as an ES module and deployed independently.

## What is a Parcel?

A parcel is:

- **Independent**: Can be developed, tested, and deployed separately
- **Loadable**: Loaded on-demand via import maps
- **Lifecycle-managed**: Implements Single-SPA bootstrap/mount/unmount
- **Route-specific**: Activated based on URL patterns
- **ES Module**: Built as standard JavaScript module for browser import

## Architecture

```
┌─────────────────────────────────────────────────┐
│               Main Container                    │
│  registerApplication({                          │
│    name: "parcel-home",                         │
│    activeWhen: ["/"]                            │
│  })                                             │
└────────────────┬────────────────────────────────┘
                 ↓ System.import()
┌─────────────────────────────────────────────────┐
│              Parcel (ES Module)                 │
│  export { bootstrap, mount, unmount }           │
└────────────────┬────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────┐
│            React Application                    │
│  - Components                                   │
│  - Design System                                │
│  - Business Logic                               │
└─────────────────────────────────────────────────┘
```

## Package Structure

```
packages/apps/microfrontend/{parcel-name}/
├── src/
│   ├── parcel.tsx             # Single-SPA lifecycle exports
│   ├── App.tsx                # Main React component
│   ├── index.tsx              # React entry point
│   └── components/            # Parcel-specific components
├── vite.config.js             # Vite library mode configuration
├── package.json               # Dependencies and scripts
├── tsconfig.json
└── README.md
```

## Single-SPA Lifecycle

Every parcel must export three lifecycle functions:

### parcel.tsx

```typescript
import React from "react";
import { createRoot, Root } from "react-dom/client";
import App from "./App";

let root: Root | null = null;

// 1. Bootstrap: One-time initialization
export const bootstrap = async (): Promise<void> => {
  console.log("Parcel bootstrapping...");
  return Promise.resolve();
};

// 2. Mount: Create and render React app
export const mount = async (): Promise<void> => {
  const container = document.getElementById("lufa-container");

  if (!container) {
    throw new Error("Container element #lufa-container not found");
  }

  root = createRoot(container);
  root.render(<App />);

  return Promise.resolve();
};

// 3. Unmount: Clean up React app
export const unmount = async (): Promise<void> => {
  if (root) {
    root.unmount();
    root = null;
  }

  return Promise.resolve();
};
```

### Lifecycle Flow

```
Page Load → Bootstrap (once)
    ↓
Route Match → Mount (render React)
    ↓
Route Change → Unmount (cleanup)
    ↓
Route Match Again → Mount (re-render)
```

## Vite Configuration

Parcels are built in **library mode** to produce ES modules:

### vite.config.js

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { externalizeDeps } from "vite-plugin-externalize-deps";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),

    // Inline CSS into JavaScript
    cssInjectedByJsPlugin(),

    // Enable Tailwind CSS v4
    tailwindcss(),

    // Externalize dependencies loaded via import map
    externalizeDeps({
      deps: true, // Externalize all dependencies
      peerDeps: false,
      except: ["clsx"], // Bundle specific packages
    }),
  ],

  build: {
    lib: {
      entry: "src/parcel.tsx", // Entry point
      formats: ["es"], // ES module only
      fileName: () => "home.mjs", // Output filename
    },
    minify: false, // Keep readable for debugging
    sourcemap: true,
  },

  server: {
    port: 4101, // Development server port
    hmr: true, // Hot Module Replacement
    cors: true, // Allow cross-origin (for main-container)
  },
});
```

### Key Configuration Points

**Library Mode**:

- `build.lib.entry`: Parcel entry point (not `src/index.tsx`)
- `build.lib.formats: ['es']`: ES module output only
- `build.lib.fileName`: Output filename (e.g., `home.mjs`)

**Externalized Dependencies**:

- React, React-DOM: Loaded from import map (shared)
- Design System: Loaded from import map (shared)
- Utilities (clsx): Bundled in parcel (lightweight)

**CSS Injection**:

- `css-injected-by-js`: Injects CSS at runtime (no separate `.css` file)
- Avoids CSS loading race conditions

**Development Port**:

- Each parcel runs on unique port (4101, 4102, etc.)
- Prevents port conflicts during parallel development

## Development Workflow

### 1. Start Parcel Dev Server

```bash
cd packages/apps/microfrontend/home
pnpm dev
```

Runs on: `http://localhost:4101`

### 2. Start Main Container

```bash
cd packages/apps/microfrontend/main-container
pnpm dev
```

Runs on: `http://localhost:5173`

### 3. Configure Import Map Override

Main container's `importMap.dev.json`:

```json
{
  "imports": {
    "@grasdouble/lufa_microfrontend_home": "http://localhost:4101/src/parcel.tsx"
  }
}
```

### 4. Enable HMR

Changes in parcel instantly reload in main-container (no full page refresh).

## Build Output

```bash
pnpm build
```

Output:

```
dist/
├── home.mjs              # ES module bundle
├── home.mjs.map          # Source map
└── assets/               # Optional assets
```

**home.mjs** contains:

- Single-SPA lifecycle functions
- React components
- Inline CSS (via css-injected-by-js)
- Bundled utilities (clsx, etc.)

**Not included** (externalized):

- React, React-DOM
- Design System
- Other shared dependencies

## Deployment

### 1. Build Parcel

```bash
pnpm build
```

### 2. Publish to GitHub Packages

```bash
pnpm publish
```

Package published: `@grasdouble/lufa_microfrontend_home@0.1.0`

### 3. Upload to CDN

Autobuild server detects new package → uploads to CDN:

```
https://cdn.sebastien-lemouillour.fr/@grasdouble/lufa_microfrontend_home@0.1.0/home.mjs
```

### 4. Update Import Map

Production `importMap.json`:

```json
{
  "imports": {
    "@grasdouble/lufa_microfrontend_home": "https://cdn.sebastien-lemouillour.fr/@grasdouble/lufa_microfrontend_home@0.1.0/home.mjs"
  }
}
```

### 5. Deploy Main Container

Main container fetches updated import map → loads new parcel version.

## Example: Home Parcel

### package.json

```json
{
  "name": "@grasdouble/lufa_microfrontend_home",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "clsx": "^2.1.1"
  },
  "peerDependencies": {
    "react": "^19.2.1",
    "react-dom": "^19.2.1",
    "@grasdouble/lufa_design-system": "^0.1.2"
  }
}
```

### App.tsx

```tsx
import React from "react";
import { Button, Card } from "@grasdouble/lufa_design-system";

export default function App() {
  return (
    <div className="container mx-auto p-8">
      <Card>
        <h1 className="text-4xl font-bold">Welcome to Lufa</h1>
        <p className="text-lg mt-4">This is the home microfrontend.</p>
        <Button className="mt-6">Get Started</Button>
      </Card>
    </div>
  );
}
```

### parcel.tsx

```tsx
import React from "react";
import { createRoot, Root } from "react-dom/client";
import App from "./App";

let root: Root | null = null;

export const bootstrap = async () => Promise.resolve();

export const mount = async () => {
  const container = document.getElementById("lufa-container");
  if (!container) throw new Error("Container not found");

  root = createRoot(container);
  root.render(<App />);
  return Promise.resolve();
};

export const unmount = async () => {
  if (root) {
    root.unmount();
    root = null;
  }
  return Promise.resolve();
};
```

## Shared Dependencies

### Import Map Externalization

**External dependencies** (loaded from import map):

```json
{
  "imports": {
    "react": "https://esm.sh/react@19.2.1",
    "react-dom": "https://esm.sh/react-dom@19.2.1",
    "@grasdouble/lufa_design-system": "https://cdn.../lufa-ui.mjs"
  }
}
```

**Benefits**:

- Single React instance shared across parcels
- Smaller bundle sizes
- Consistent design system version
- Faster load times (cached shared deps)

### Bundled Dependencies

Small utilities like `clsx` are bundled:

```javascript
externalizeDeps({
  deps: true,
  except: ["clsx"], // Bundle this
});
```

**Rationale**: Tiny packages (<5KB) are faster bundled than fetched separately.

## Port Configuration

Each parcel uses a unique development port:

| Parcel | Port |
| ------ | ---- |
| home   | 4101 |
| blog   | 4102 |
| docs   | 4103 |
| admin  | 4104 |

Prevents conflicts when running multiple parcels simultaneously.

## CSS Strategy

### Inline CSS (Recommended)

```javascript
plugins: [
  cssInjectedByJsPlugin(), // Inject CSS into JS bundle
];
```

**Pros**:

- Single file output (`.mjs`)
- No CSS loading race conditions
- Simpler deployment

**Cons**:

- Slightly larger JS bundle
- No separate CSS caching

### Component-Level Resets

Each component using Tailwind must apply reset utilities:

```tsx
import { cn } from "@grasdouble/lufa_design-system";

export function Card({ children, className }) {
  return (
    <div
      className={cn(
        "@utility preflight", // Apply CSS reset
        "p-4 rounded-lg bg-white shadow",
        className
      )}
    >
      {children}
    </div>
  );
}
```

See: [`architecture/design-system/CSS.md`](../design-system/CSS.md)

## Testing

### Unit Tests

```bash
pnpm test
```

Test components in isolation (not Single-SPA lifecycle).

### Integration Tests

Test in main-container:

1. Start main-container
2. Start parcel dev server
3. Navigate to parcel route
4. Verify mount/unmount behavior

### E2E Tests

Use Playwright/Cypress to test full user flows across parcels.

## Best Practices

### DO ✅

- Export clean Single-SPA lifecycle functions
- Externalize React and design system
- Use unique development ports
- Inline CSS with `css-injected-by-js`
- Apply component-level resets
- Keep parcels focused and small
- Version independently

### DON'T ❌

- Bundle React in parcel
- Hardcode API URLs (use env vars)
- Share state between parcels (use URL/events)
- Skip lifecycle cleanup in `unmount`
- Deploy without testing in main-container
- Use different React versions across parcels

## Common Issues

### Parcel Won't Mount

**Symptom**: `Container element not found`

**Solution**: Ensure `#lufa-container` exists in `index.html`:

```html
<div id="lufa-container"></div>
```

### HMR Not Working

**Symptom**: Changes require full page refresh

**Solution**: Check `vite.config.js`:

```javascript
server: {
  hmr: true,
  cors: true,
}
```

### Dependency Loaded Twice

**Symptom**: Two React instances, hooks errors

**Solution**: Externalize in `vite.config.js`:

```javascript
externalizeDeps({
  deps: true, // Externalize react, react-dom
});
```

### CSS Not Applied

**Symptom**: Components unstyled

**Solution**: Enable CSS injection:

```javascript
plugins: [cssInjectedByJsPlugin()];
```

## Related Documentation

- **Microfrontend Overview**: [`MICROFRONTEND.md`](./MICROFRONTEND.md)
- **Container Architecture**: [`CONTAINER.md`](./CONTAINER.md)
- **Parcel Development Rules**: [`../../rules/microfrontend/PARCEL.md`](../../rules/microfrontend/PARCEL.md)
- **Design System**: [`../design-system/DESIGN_SYSTEM.md`](../design-system/DESIGN_SYSTEM.md)
