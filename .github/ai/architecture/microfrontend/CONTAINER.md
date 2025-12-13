# Main Container Architecture

> **Last Updated**: December 13, 2025  
> **Package**: `@grasdouble/lufa_app_microfrontend_main-container`  
> **Location**: `packages/apps/microfrontend/main-container/`

## Overview

The main-container is the **shell application** that orchestrates all microfrontends using Single-SPA. It's the entry point loaded when users visit the application and is responsible for loading, routing, and displaying independent parcels.

## Core Responsibilities

1. **Import Map Loading**: Fetch and merge import maps (external, dev, prod)
2. **Application Registration**: Register all microfrontend parcels with Single-SPA
3. **Routing**: Define which parcel loads at which route
4. **Development Tools**: Enable import-map-overrides for local debugging
5. **Storybook Integration**: Mount Storybook in iframe at `/storybook`

## Architecture

```
┌─────────────────────────────────────────────────┐
│         Browser Loads index.html                │
└────────────────┬────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────┐
│          Import Map Resolution                  │
│  1. External map (React, SystemJS)              │
│  2. Production map (CDN parcels)                │
│  3. Development map (localhost overrides)       │
└────────────────┬────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────┐
│           Single-SPA Registration               │
│  - Home parcel ("/")                            │
│  - Storybook iframe ("/storybook")              │
│  - Future parcels...                            │
└────────────────┬────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────┐
│            Route Activation                     │
│  Single-SPA loads matching applications         │
└─────────────────────────────────────────────────┘
```

## Package Structure

```
packages/apps/microfrontend/main-container/
├── src/
│   ├── index.html              # Entry point
│   ├── main.ts                 # Single-SPA registration logic
│   ├── importMapExternal.json  # External dependencies (React, SystemJS)
│   ├── importMap.json          # Production parcel URLs (CDN)
│   └── importMap.dev.json      # Development overrides (localhost)
├── vite.config.js              # Vite configuration
├── package.json
└── README.md
```

## Key Files

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lufa Microfrontend</title>

    <!-- SystemJS for module loading -->
    <script type="systemjs-importmap" src="src/importMapExternal.json"></script>

    <!-- Production import map from CDN -->
    <script type="systemjs-importmap" src="src/importMap.json"></script>

    <!-- Development overrides (localhost) -->
    <script type="systemjs-importmap" src="src/importMap.dev.json"></script>

    <!-- SystemJS loader -->
    <script src="https://cdn.jsdelivr.net/npm/systemjs@6/dist/system.js"></script>
  </head>
  <body>
    <!-- Mount points for parcels -->
    <div id="lufa-container"></div>

    <!-- Main application entry -->
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

### main.ts

```typescript
import { registerApplication, start } from "single-spa";
import "import-map-overrides";
import "@grasdouble/lufa_design-system/style.css";

// Helper to load applications via SystemJS
const loadApp = (url: string) => () => import(/* @vite-ignore */ url);

// Register home parcel (active at "/")
registerApplication({
  name: "@grasdouble/lufa_microfrontend_home",
  app: loadApp("@grasdouble/lufa_microfrontend_home"),
  activeWhen: (location) => location.pathname === "/",
});

// Register Storybook (active at "/storybook")
registerApplication({
  name: "@grasdouble/lufa_design-system-storybook",
  app: async () => ({
    bootstrap: () => Promise.resolve(),
    mount: () => {
      const iframe = document.createElement("iframe");
      iframe.id = "storybook-iframe";
      iframe.src = "https://storybook.sebastien-lemouillour.fr";
      iframe.style.width = "100%";
      iframe.style.height = "100vh";
      iframe.style.border = "none";
      document.body.appendChild(iframe);
      return Promise.resolve();
    },
    unmount: () => {
      document.getElementById("storybook-iframe")?.remove();
      return Promise.resolve();
    },
  }),
  activeWhen: ["/storybook"],
});

// Start Single-SPA
start();
```

### Import Maps

**importMapExternal.json** (External dependencies):

```json
{
  "imports": {
    "single-spa": "https://cdn.jsdelivr.net/npm/single-spa@6/lib/system/single-spa.min.js",
    "react": "https://esm.sh/react@19.2.1",
    "react-dom": "https://esm.sh/react-dom@19.2.1",
    "react-dom/client": "https://esm.sh/react-dom@19.2.1/client"
  }
}
```

**importMap.json** (Production parcels from CDN):

```json
{
  "imports": {
    "@grasdouble/lufa_microfrontend_home": "https://cdn.sebastien-lemouillour.fr/@grasdouble/lufa_microfrontend_home@0.1.0/home.mjs",
    "@grasdouble/lufa_design-system": "https://cdn.sebastien-lemouillour.fr/@grasdouble/lufa_design-system@0.1.2/lufa-ui.mjs"
  }
}
```

**importMap.dev.json** (Development overrides):

```json
{
  "imports": {
    "@grasdouble/lufa_microfrontend_home": "http://localhost:4101/src/parcel.jsx",
    "@grasdouble/lufa_design-system": "http://localhost:4102/src/index.ts"
  }
}
```

## Vite Configuration

```javascript
import { defineConfig } from "vite";
import importMapInjectorPlugin from "@grasdouble/lufa_plugin_vite_vite-plugin-import-map-injector";
import reactPreamblePlugin from "@grasdouble/lufa_plugin_vite_vite-plugin-react-preamble";
import { externalizeDeps } from "vite-plugin-externalize-deps";

export default defineConfig({
  plugins: [
    // Inject import maps into index.html
    importMapInjectorPlugin({
      extImportMap: "src/importMapExternal.json",
      devImportMap: "src/importMap.dev.json",
      prodImportMap: "src/importMap.json",
    }),

    // Externalize dependencies loaded via import map
    externalizeDeps({
      deps: false,
      peerDeps: true,
      except: [],
    }),

    // Enable HMR for remote parcels
    reactPreamblePlugin(),
  ],

  server: {
    port: 5173,
    cors: true,
    hmr: true,
  },

  build: {
    target: "esnext",
    modulePreload: false, // Single-SPA handles module loading
    minify: false,
  },
});
```

## Development Workflow

### 1. Start Development Server

```bash
cd packages/apps/microfrontend/main-container
pnpm dev
```

Runs on: `http://localhost:5173`

### 2. Enable Import Map Overrides

Open browser console:

```javascript
localStorage.devtools = "true";
```

Reload the page. An import-map-overrides UI appears in bottom-right corner.

### 3. Override Parcels Locally

In import-map-overrides UI:

- Override: `@grasdouble/lufa_microfrontend_home`
- To: `http://localhost:4101/src/parcel.jsx`

Now home parcel loads from local dev server instead of CDN.

### 4. Run Parcel Dev Server

```bash
cd packages/apps/microfrontend/home
pnpm dev  # Runs on port 4101
```

Changes in parcel instantly reflect in main-container (HMR enabled).

## Production Build

```bash
pnpm build
```

Output:

```
dist/
├── index.html              # Entry point with import maps
├── assets/
│   └── main-[hash].js      # Bundled JavaScript
└── ...
```

Deploy `dist/` to static hosting.

## Routing Strategy

### Active When Function

```typescript
registerApplication({
  name: "@grasdouble/lufa_microfrontend_home",
  activeWhen: (location) => location.pathname === "/",
});
```

**Rules**:

- Exact match: `location.pathname === '/route'`
- Prefix match: `location.pathname.startsWith('/route')`
- Custom logic: Any JavaScript condition

### Multiple Parcels

```typescript
registerApplication({
  name: "@grasdouble/lufa_microfrontend_blog",
  activeWhen: (location) => location.pathname.startsWith("/blog"),
});

registerApplication({
  name: "@grasdouble/lufa_microfrontend_docs",
  activeWhen: (location) => location.pathname.startsWith("/docs"),
});
```

Single-SPA loads/unloads parcels based on route changes.

## Import Map Cascade

Import maps cascade in order:

1. **External** (React, SystemJS) - Loaded first
2. **Production** (CDN parcels) - Default sources
3. **Development** (localhost) - Overrides production in dev

Later maps override earlier ones for same keys.

**Example**:

```
importMapExternal.json:  react → esm.sh
importMap.json:          home → cdn.sebastien-lemouillour.fr
importMap.dev.json:      home → localhost:4101  ✅ Wins
```

Result: React from esm.sh, home from localhost.

## Custom Vite Plugins

### import-map-injector

Injects `<script type="systemjs-importmap">` tags into index.html during build.

**Without plugin**:

```html
<script type="systemjs-importmap" src="src/importMap.json"></script>
```

**After build** (plugin inlines content):

```html
<script type="systemjs-importmap">
  {
    "imports": {
      "@grasdouble/lufa_microfrontend_home": "https://cdn..."
    }
  }
</script>
```

### react-preamble

Adds React Fast Refresh and Vite client scripts to remote parcels for HMR.

## Deployment

1. **Build main-container**: `pnpm build`
2. **Deploy dist/** to static hosting (Vercel, Netlify, etc.)
3. **Update DNS**: Point domain to hosting
4. **Verify import maps**: Ensure CDN URLs are accessible

## Best Practices

### DO ✅

- Keep main-container minimal (only registration logic)
- Use import-map-overrides for local development
- Test all routes before deploying
- Version import maps when deploying
- Enable CORS on CDN

### DON'T ❌

- Bundle React in main-container (use import map)
- Hardcode parcel URLs in code (use import map)
- Deploy without testing import map cascade
- Skip versioning in production import map
- Load all parcels at once (use routing)

## Related Documentation

- **Microfrontend Overview**: [`MICROFRONTEND.md`](./MICROFRONTEND.md)
- **Parcel Architecture**: [`PARCELS.md`](./PARCELS.md)
- **Container Development Rules**: [`../../rules/microfrontend/CONTAINER.md`](../../rules/microfrontend/CONTAINER.md)
