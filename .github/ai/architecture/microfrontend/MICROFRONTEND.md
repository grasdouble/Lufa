# Microfrontend Architecture

> **Last Updated**: December 13, 2025  
> **Framework**: Single-SPA  
> **Location**: `packages/apps/microfrontend/`

## Overview

The Lufa microfrontend architecture uses Single-SPA to orchestrate multiple independent React applications. Each microfrontend can be developed, deployed, and maintained independently while being composed into a single user experience.

## Architecture Pattern

```
┌─────────────────────────────────────────────────────────┐
│           Browser (www.sebastien-lemouillour.fr)        │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                   Main Container                        │
│  - Loads import map from CDN                            │
│  - Registers microfrontend applications                 │
│  - Provides import-map-overrides (dev)                  │
│  - Mounts Storybook iframe (/storybook)                 │
└─────────────────────────────────────────────────────────┘
                          ↓
         ┌────────────────┴────────────────┐
         ↓                                 ↓
┌──────────────────┐              ┌──────────────────┐
│  Home Parcel     │              │  Other Parcels   │
│  - Landing page  │              │  - Future apps   │
│  - Uses DS       │              │  - Independent   │
└──────────────────┘              └──────────────────┘
```

## Core Concepts

### Single-SPA

**Single-SPA** is a JavaScript framework for frontend microservices. It allows multiple frameworks to coexist on the same page and provides routing between applications.

**Key Features**:

- Framework agnostic (though we use React)
- Independent deployments
- Lazy loading
- Shared dependencies

### Import Maps

**Import maps** define how module specifiers are resolved. They enable:

- CDN-based module loading
- Version control
- Development overrides

**Production Import Map** (from CDN):

```json
{
  "imports": {
    "react": "https://cdn.sebastien-lemouillour.fr/react@19.0.0/index.js",
    "@grasdouble/lufa_app_microfrontend_home": "https://cdn.sebastien-lemouillour.fr/@grasdouble/lufa_app_microfrontend_home@0.1.0/index.js"
  }
}
```

**Development Import Map** (`importMap.dev.json`):

```json
{
  "imports": {
    "@grasdouble/lufa_app_microfrontend_home": "http://localhost:4101/src/index.tsx"
  }
}
```

### Import Map Overrides

For local development, `import-map-overrides` allows overriding module URLs via browser storage.

**Enable**: `localStorage.devtools = "true"`

## Package Structure

```
packages/apps/microfrontend/
├── main-container/              # Shell application
│   ├── src/
│   │   ├── index.html          # Entry point
│   │   ├── main.tsx            # Single-SPA registration
│   │   └── importMap.dev.json  # Dev import map
│   ├── vite.config.ts          # Vite config with plugins
│   └── package.json
│
├── home/                        # Home microfrontend
│   ├── src/
│   │   ├── index.tsx           # Parcel entry
│   │   └── App.tsx             # React app
│   ├── vite.config.ts          # Vite library mode
│   └── package.json
│
└── [future-apps]/               # Additional microfrontends
```

## Main Container

**Package**: `@grasdouble/lufa_app_microfrontend_main-container`

**Responsibilities**:

1. Fetch canonical import map from CDN
2. Register all microfrontend applications
3. Provide routing via Single-SPA
4. Enable development tools (import-map-overrides)
5. Mount Storybook in iframe at `/storybook`

**Key Files**:

**index.html**:

```html
<!DOCTYPE html>
<html>
  <head>
    <script
      type="systemjs-importmap"
      src="https://cdn.../importmap.json"
    ></script>
    <script type="systemjs-importmap" src="/importMap.dev.json"></script>
  </head>
  <body>
    <div
      id="single-spa-application:@grasdouble/lufa_app_microfrontend_home"
    ></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**main.tsx**:

```typescript
import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@grasdouble/lufa_app_microfrontend_home",
  app: () => System.import("@grasdouble/lufa_app_microfrontend_home"),
  activeWhen: ["/"],
});

start();
```

**Vite Configuration**:

- Uses custom plugins for import map injection
- Serves on development port (usually 5173)
- Proxies to parcels on port 4101

## Microfrontend Parcels

### Home Parcel

**Package**: `@grasdouble/lufa_app_microfrontend_home`

**Purpose**: Landing page with external links

**Technology**: React 19 + Lufa Design System

**Build**: Vite library mode → ES module

**Development Port**: 4101

**Deployment**: Published to GitHub Packages → CDN

## Development Workflow

### Local Development

1. **Start home parcel** (port 4101):

```bash
cd packages/apps/microfrontend/home
pnpm dev
```

2. **Start main container** (port 5173):

```bash
cd packages/apps/microfrontend/main-container
pnpm dev
```

3. **Enable dev tools**:

```javascript
localStorage.devtools = "true";
```

4. **Override imports** (optional):

- Click import-map-overrides UI
- Override `@grasdouble/lufa_app_microfrontend_home` → `http://localhost:4101/src/index.tsx`

### Import Map Flow

**Development**:

```
Browser → index.html
  ↓
Loads importMap.dev.json (localhost:4101)
  ↓
Single-SPA registers home parcel
  ↓
System.import('@grasdouble/lufa_app_microfrontend_home')
  ↓
Vite dev server (HMR enabled)
```

**Production**:

```
Browser → index.html
  ↓
Fetches CDN import map (cdn.sebastien-lemouillour.fr)
  ↓
Single-SPA registers home parcel
  ↓
System.import('@grasdouble/lufa_app_microfrontend_home')
  ↓
CDN serves built ES module
```

## Custom Vite Plugins

### vite-plugin-import-map-injector

**Location**: `packages/plugins/vite/vite-plugin-import-map-injector/`

**Purpose**: Injects external, dev, and production import maps into `index.html`

**Usage**:

```typescript
import { importMapInjector } from "@grasdouble/lufa_vite-plugin-import-map-injector";

export default defineConfig({
  plugins: [
    importMapInjector({
      external: "https://cdn.../external-importmap.json",
      dev: "./importMap.dev.json",
      prod: "https://cdn.../importmap.json",
    }),
  ],
});
```

### vite-plugin-react-preamble

**Location**: `packages/plugins/vite/vite-plugin-react-preamble/`

**Purpose**: Adds React Fast Refresh and Vite client scripts for remote parcels during development

**Usage**:

```typescript
import { reactPreamble } from "@grasdouble/lufa_vite-plugin-react-preamble";

export default defineConfig({
  plugins: [
    reactPreamble({
      port: 4101, // Parcel dev server port
    }),
  ],
});
```

## CDN Integration

### Autobuild Server

**Location**: `packages/cdn/autobuild-server/`

**Purpose**: On-demand build server for CDN

**Flow**:

1. Request: `cdn.../package@version/file.js`
2. Extract package from GitHub Packages (using `GITHUB_TOKEN`)
3. Validate ESM-only package
4. Serve requested export entry
5. Cache for future requests

**Features**:

- Domain allowlisting
- Rate limiting with IP blocking/unblocking
- Path sanitization
- Automatic extraction and validation

## Deployment

### Main Container

- **Dev**: Vite dev server (localhost:5173)
- **Prod**: Static build deployed to hosting
- **URL**: [www.sebastien-lemouillour.fr](https://www.sebastien-lemouillour.fr)

### Parcels

- **Dev**: Vite dev server (localhost:4101)
- **Prod**: Built as ES modules → Published to GitHub Packages → Available via CDN

### Import Map

- **Dev**: Local `importMap.dev.json`
- **Prod**: Canonical map from CDN (`cdn.sebastien-lemouillour.fr/importmap.json`)

## Shared Dependencies

**React** and other common dependencies are:

- Loaded once from CDN
- Shared across all parcels
- Defined in import map

**Example**:

```json
{
  "imports": {
    "react": "https://cdn.../react@19.0.0/index.js",
    "react-dom": "https://cdn.../react-dom@19.0.0/index.js"
  }
}
```

This prevents duplicating React in every parcel bundle.

## Adding a New Microfrontend

1. **Create package** in `packages/apps/microfrontend/{name}/`

2. **Setup Vite library mode**:

```typescript
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      formats: ["es"],
    },
  },
});
```

3. **Export Single-SPA lifecycle**:

```typescript
export const bootstrap = async () => {
  /* ... */
};
export const mount = async () => {
  /* ... */
};
export const unmount = async () => {
  /* ... */
};
```

4. **Register in main-container**:

```typescript
registerApplication({
  name: "@grasdouble/lufa_app_microfrontend_{name}",
  app: () => System.import("@grasdouble/lufa_app_microfrontend_{name}"),
  activeWhen: ["/route"],
});
```

5. **Add to import map** (both dev and prod)

6. **Deploy to GitHub Packages**

## Technology Stack

- **Framework**: Single-SPA
- **Parcels**: React 19
- **Build Tool**: Vite 7.2.6
- **Module Format**: ES Modules (ESM)
- **Module Loading**: SystemJS + Import Maps
- **Package Registry**: GitHub Packages
- **CDN**: Custom (cdn.sebastien-lemouillour.fr)

## Best Practices

### DO ✅

- Keep parcels small and focused
- Share common dependencies via import map
- Use semantic versioning for parcels
- Test import map locally before deploying
- Use import-map-overrides for debugging
- Build parcels as ES modules only

### DON'T ❌

- Bundle React in parcels (use external)
- Hardcode CDN URLs in code
- Skip version testing before deployment
- Deploy without updating import map
- Use CommonJS modules
- Include unnecessary dependencies in bundles

## Debugging

### Import Map Issues

```javascript
// Check loaded import maps
console.log(System.getConfig());

// Check if parcel is registered
console.log(System.registry.get("@grasdouble/lufa_app_microfrontend_home"));
```

### Development Mode

```javascript
// Enable dev tools
localStorage.devtools = "true";

// Check current overrides
localStorage.getItem(
  "import-map-override:@grasdouble/lufa_app_microfrontend_home"
);
```

### Common Issues

1. **Parcel not loading**: Check import map has correct URL
2. **React duplicate**: Ensure React is external in build config
3. **CORS errors**: Verify CDN CORS headers
4. **404 on CDN**: Check package is published and import map updated

## References

- **Global Architecture**: [`GLOBAL.md`](GLOBAL.md)
- **CDN Architecture**: See `packages/cdn/autobuild-server/README.md`
- **Vite Plugins**: See `packages/plugins/vite/`

---

**Last Updated**: December 13, 2025
