# Main Container Development Rules

> **For AI Assistants**: Guidelines for modifying and extending the main-container package.

## Package Information

- **Package**: `@grasdouble/lufa_app_microfrontend_main-container`
- **Location**: `packages/apps/microfrontend/main-container/`
- **Purpose**: Shell application that loads and orchestrates microfrontend parcels
- **Framework**: Single-SPA + SystemJS
- **Build Tool**: Vite

## When to Modify Main Container

✅ **Modify main-container when**:

- Adding a new parcel to the application
- Changing routing logic
- Updating import map sources (CDN URLs)
- Adding global styles or scripts
- Configuring development tools (import-map-overrides)

❌ **Don't modify main-container for**:

- Parcel-specific features (belongs in parcel)
- New React components (belongs in parcel or design system)
- Business logic (belongs in parcel)
- API integrations (belongs in parcel)

## Adding a New Parcel

### 1. Register Application in main.ts

```typescript
// packages/apps/microfrontend/main-container/src/main.ts
import { registerApplication, start } from 'single-spa';

// Add new registration
registerApplication({
  name: '@grasdouble/lufa_microfrontend_{parcel-name}',
  app: () => System.import('@grasdouble/lufa_microfrontend_{parcel-name}'),
  activeWhen: (location) => location.pathname.startsWith('/route'),
});

start();
```

### 2. Add to Import Maps

**Development** (`src/importMap.dev.json`):

```json
{
  "imports": {
    "@grasdouble/lufa_microfrontend_{parcel-name}": "http://localhost:4102/src/parcel.tsx"
  }
}
```

**Production** (`src/importMap.json`):

```json
{
  "imports": {
    "@grasdouble/lufa_microfrontend_{parcel-name}": "https://cdn.sebastien-lemouillour.fr/@grasdouble/lufa_microfrontend_{parcel-name}@0.1.0/output.mjs"
  }
}
```

### 3. Update HTML Mount Point (if needed)

If parcel requires specific container:

```html
<!-- src/index.html -->
<div id="parcel-specific-container"></div>
```

Most parcels share `#lufa-container`.

## Routing Patterns

### Exact Route Match

```typescript
activeWhen: (location) => location.pathname === '/exact-route';
```

**Use for**: Single-page routes (home, about, contact)

### Prefix Match

```typescript
activeWhen: (location) => location.pathname.startsWith('/blog');
```

**Use for**: Section routes with sub-routes (/blog, /blog/post-1, etc.)

### Multiple Routes

```typescript
activeWhen: ['/route1', '/route2', '/route3'];
```

**Use for**: Multiple exact matches

### Custom Logic

```typescript
activeWhen: (location) => {
  const path = location.pathname;
  return path === '/' || path.startsWith('/home');
};
```

**Use for**: Complex conditions

## Import Map Management

### Map Cascade Order

1. **External** (`importMapExternal.json`): Third-party dependencies
2. **Production** (`importMap.json`): Production parcel URLs
3. **Development** (`importMap.dev.json`): Local overrides

Later maps override earlier ones.

### External Dependencies

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

**Update when**: Upgrading React or Single-SPA versions

### Production Parcel URLs

```json
{
  "imports": {
    "@grasdouble/lufa_microfrontend_home": "https://cdn.../home.mjs",
    "@grasdouble/lufa_design-system": "https://cdn.../lufa-ui.mjs"
  }
}
```

**Update when**: Deploying new parcel versions

### Development Overrides

```json
{
  "imports": {
    "@grasdouble/lufa_microfrontend_home": "http://localhost:4101/src/parcel.tsx"
  }
}
```

**Update when**: Adding parcels or changing dev ports

## Vite Configuration

### Current Setup

```javascript
import { defineConfig } from 'vite';
import { externalizeDeps } from 'vite-plugin-externalize-deps';

import importMapInjectorPlugin from '@grasdouble/lufa_plugin_vite_vite-plugin-import-map-injector';
import reactPreamblePlugin from '@grasdouble/lufa_plugin_vite_vite-plugin-react-preamble';

export default defineConfig({
  plugins: [
    importMapInjectorPlugin({
      extImportMap: 'src/importMapExternal.json',
      devImportMap: 'src/importMap.dev.json',
      prodImportMap: 'src/importMap.json',
    }),
    externalizeDeps({
      deps: false,
      peerDeps: true,
    }),
    reactPreamblePlugin(),
  ],
  server: {
    port: 5173,
    cors: true,
    hmr: true,
  },
  build: {
    target: 'esnext',
    modulePreload: false,
  },
});
```

### Plugin: import-map-injector

**Purpose**: Injects import map `<script>` tags into `index.html`

**When to modify**: Never (plugin handles automatically)

### Plugin: react-preamble

**Purpose**: Enables HMR for remote parcels

**When to modify**: Never (plugin handles automatically)

### Plugin: externalize-deps

**Purpose**: Prevents bundling dependencies loaded via import map

**When to modify**:

- Adding new shared dependencies
- Changing peer dependencies

## Development Workflow

### Start Dev Server

```bash
cd packages/apps/microfrontend/main-container
pnpm dev
```

**Port**: 5173  
**URL**: http://localhost:5173

### Enable Import Map Overrides

```javascript
localStorage.devtools = 'true';
```

Reload page → Override UI appears in bottom-right.

### Override Parcels

In override UI:

- **Package**: `@grasdouble/lufa_microfrontend_home`
- **URL**: `http://localhost:4101/src/parcel.tsx`

Save → Parcel loads from localhost.

### Test Routing

Navigate to parcel routes:

- `/` → Home parcel
- `/storybook` → Storybook iframe
- `/new-route` → New parcel (if registered)

## Build Process

### Development Build

```bash
pnpm build
```

Output: `dist/` with bundled assets

### Production Deploy

1. **Build**: `pnpm build`
2. **Upload dist/** to hosting (Vercel, Netlify, etc.)
3. **Verify import maps**: CDN URLs accessible
4. **Test**: Load production URL, check network tab for parcel loads

## Debugging

### Parcel Not Loading

**Check**:

1. Import map has parcel entry
2. Parcel URL is accessible (network tab)
3. Route matches `activeWhen` condition
4. Parcel exports lifecycle functions

**Fix**:

```bash
# Test parcel URL directly
curl https://cdn.../parcel.mjs

# Check Single-SPA registration
console.log(singleSpa.getAppNames());
```

### Import Map Override Not Working

**Check**:

1. `localStorage.devtools = "true"`
2. Override UI visible
3. Correct package name (exact match)
4. Parcel dev server running

**Fix**:

```javascript
// Check overrides
import('import-map-overrides').then((m) => console.log(m.getOverrideMap()));
```

### React Loaded Twice

**Symptom**: Hooks errors, duplicate instances

**Cause**: React bundled in main-container

**Fix**:

```javascript
// vite.config.js
externalizeDeps({
  peerDeps: true, // Externalize React
});
```

### CORS Errors

**Symptom**: Failed to fetch parcel from localhost

**Cause**: Parcel dev server doesn't allow cross-origin

**Fix**:

```javascript
// Parcel vite.config.js
server: {
  cors: true,
}
```

## Global Styles

### Design System CSS

```typescript
// src/main.ts
import '@grasdouble/lufa_design-system/style.css';
```

Loads global design system styles.

### Custom Global Styles

```css
/* src/global.css */
body {
  margin: 0;
  font-family: system-ui, sans-serif;
}
```

Import in `main.ts`:

```typescript
import './global.css';
```

## Testing

### Manual Testing

1. Start main-container (`pnpm dev`)
2. Start parcels (`pnpm dev` in each parcel)
3. Test routes and parcel mount/unmount
4. Verify HMR works

### Integration Testing

```typescript
// tests/routing.test.ts
import { getAppNames, getAppStatus } from 'single-spa';

test('home parcel registered', () => {
  const apps = getAppNames();
  expect(apps).toContain('@grasdouble/lufa_microfrontend_home');
});

test('home parcel mounts at "/"', async () => {
  window.location.pathname = '/';
  await new Promise((resolve) => setTimeout(resolve, 100));

  const status = getAppStatus('@grasdouble/lufa_microfrontend_home');
  expect(status).toBe('MOUNTED');
});
```

## Common Pitfalls

### ❌ Bundling Shared Dependencies

```javascript
// DON'T
externalizeDeps({
  deps: false, // Bundles React!
});
```

**Fix**: Set `peerDeps: true`

### ❌ Wrong Import Map Order

```html
<!-- DON'T: Production before development -->
<script type="systemjs-importmap" src="importMap.json"></script>
<script type="systemjs-importmap" src="importMap.dev.json"></script>
```

Development overrides won't work.

**Fix**: External → Production → Development

### ❌ Hardcoded Parcel URLs

```typescript
// DON'T
app: () => import('http://localhost:4101/src/parcel.tsx');
```

**Fix**: Use `System.import()` with package name:

```typescript
app: () => System.import('@grasdouble/lufa_microfrontend_home');
```

### ❌ Missing Container Element

```typescript
// Parcel expects #lufa-container but main-container doesn't have it
```

**Fix**: Add to `index.html`:

```html
<div id="lufa-container"></div>
```

## Related Documentation

- **Container Architecture**: [`../architecture/microfrontend/CONTAINER.md`](../../architecture/microfrontend/CONTAINER.md)
- **Parcel Development**: [`PARCEL.md`](./PARCEL.md)
- **Microfrontend Overview**: [`../architecture/microfrontend/MICROFRONTEND.md`](../../architecture/microfrontend/MICROFRONTEND.md)
