# Main Container Architecture

**Package**: `@grasdouble/lufa_app_microfrontend_main-container` | **Location**: `packages/apps/microfrontend/main-container/` | **Updated**: 2025-12-14 | **Version**: 0.1.0

## Stats

- Dev Port: 5173
- Build: Vite 7 static bundle
- Deployment: www.sebastien-lemouillour.fr
- Parcels: 2 (home, storybook)

## Structure

```
packages/apps/microfrontend/main-container/
├── src/
│   ├── index.html
│   ├── main.ts
│   ├── importMapExternal.json
│   ├── importMap.json
│   └── importMap.dev.json
├── vite.config.js
└── package.json
```

## Tech Stack

| Layer         | Technology            |
| ------------- | --------------------- |
| Framework     | Single-SPA 6          |
| Module Loader | SystemJS 6            |
| Build         | Vite 7.2.6            |
| Dev Tools     | import-map-overrides  |
| Hosting       | Static (GitHub Pages) |

## Key Concepts

### Import Map Cascade

3-layer cascade (later overrides earlier):

1. External (React, SystemJS from CDN)
2. Production (parcels from cdn.sebastien-lemouillour.fr)
3. Development (localhost:4101 overrides)

### Single-SPA Registration

```typescript
import { registerApplication, start } from 'single-spa';

import 'import-map-overrides';

registerApplication({
  name: '@grasdouble/lufa_microfrontend_home',
  app: () => import('@grasdouble/lufa_microfrontend_home'),
  activeWhen: (location) => location.pathname === '/',
});

start();
```

### Import Map Overrides

```javascript
localStorage.devtools = 'true'; // Enable UI in browser
```

## Config

**vite.config.js**:

```javascript
import { defineConfig } from 'vite';

import importMapInjectorPlugin from '@grasdouble/lufa_plugin_vite_vite-plugin-import-map-injector';

export default defineConfig({
  plugins: [
    importMapInjectorPlugin({
      extImportMap: 'src/importMapExternal.json',
      devImportMap: 'src/importMap.dev.json',
      prodImportMap: 'src/importMap.json',
    }),
  ],
  server: { port: 5173, cors: true, hmr: true },
  build: { target: 'esnext', modulePreload: false },
});
```

**importMapExternal.json**:

```json
{
  "imports": {
    "single-spa": "https://cdn.jsdelivr.net/npm/single-spa@6/lib/system/single-spa.min.js",
    "react": "https://esm.sh/react@19.2.1",
    "react-dom/client": "https://esm.sh/react-dom@19.2.1/client"
  }
}
```

**importMap.json**:

```json
{
  "imports": {}
}
```

## Build

### Dev

```bash
pnpm dev # Port 5173, HMR enabled
localStorage.devtools = "true" # Enable import-map-overrides
```

### Prod

```bash
pnpm build # Output: dist/index.html + assets/
```

## Dependencies

| Package                                                      | Version   | Usage                            |
| ------------------------------------------------------------ | --------- | -------------------------------- |
| single-spa                                                   | ^6        | Microfrontend orchestration      |
| import-map-overrides                                         | Latest    | Dev tools for import map testing |
| @grasdouble/lufa_plugin_vite_vite-plugin-import-map-injector | Workspace | Inject import maps               |

## Integration

### Load Parcel at Route

```typescript
registerApplication({
  name: '@grasdouble/lufa_microfrontend_blog',
  app: () => import('@grasdouble/lufa_microfrontend_blog'),
  activeWhen: (location) => location.pathname.startsWith('/blog'),
});
```

### Override Import During Dev

```javascript
// In browser console or import-map-overrides UI
localStorage.setItem('import-map-override:@grasdouble/lufa_microfrontend_home', 'http://localhost:4101/src/parcel.jsx');
```

## Workflows

| Task       | Command                      |
| ---------- | ---------------------------- |
| Dev server | `pnpm dev` (port 5173)       |
| Build      | `pnpm build`                 |
| Preview    | `pnpm preview`               |
| Deploy     | Upload dist/ to GitHub Pages |

## Decisions

| What                     | Why                            | Trade-off                        |
| ------------------------ | ------------------------------ | -------------------------------- |
| SystemJS over native ESM | Dynamic import map loading     | Requires additional script       |
| 3-layer import map       | Dev overrides without rebuild  | More configuration               |
| import-map-overrides     | Test parcels locally           | Dev-only feature                 |
| Minimal shell            | Faster updates, smaller bundle | Logic distributed across parcels |
| Vite custom plugins      | Inject import maps at build    | Tight coupling to Vite           |

## Deployment

```bash
pnpm build
# Output: dist/
# Deploy: GitHub Pages (www.sebastien-lemouillour.fr)
# CDN: cdn.sebastien-lemouillour.fr
```

## Debug

| Issue                | Solution                                    |
| -------------------- | ------------------------------------------- |
| Parcel not loading   | Check import map in DevTools Network tab    |
| Wrong parcel version | Verify import map URLs                      |
| CORS errors          | Enable CORS on CDN                          |
| HMR not working      | Ensure dev import map points to localhost   |
| Blank page           | Check browser console for Single-SPA errors |

## Best Practices

- Keep shell minimal (registration only)
- Use import-map-overrides for dev
- Version import maps on deploy
- Test cascade before production
- Enable CORS on CDN

## Links

- [MICROFRONTEND.md](./MICROFRONTEND.md)
- [PARCELS.md](./PARCELS.md)
- [../../rules/microfrontend/CONTAINER.md](../../rules/microfrontend/CONTAINER.md)
