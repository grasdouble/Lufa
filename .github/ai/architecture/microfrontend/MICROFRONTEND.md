# Microfrontend Architecture

**Framework**: Single-SPA | **Location**: `packages/apps/microfrontend/` | **Updated**: 2025-12-14

## Stats

- Shell: main-container (port 5173)
- Parcels: 2 (home, storybook)
- Module Format: ESM via SystemJS
- Deployment: www.sebastien-lemouillour.fr
- CDN: cdn.sebastien-lemouillour.fr

## Structure

\`\`\`
packages/apps/microfrontend/
├── main-container/
│ ├── src/
│ │ ├── index.html
│ │ ├── main.ts
│ │ └── importMap\*.json
│ └── vite.config.js
├── home/
│ ├── src/
│ │ ├── parcel.tsx
│ │ └── App.tsx
│ └── vite.config.js
└── [future-parcels]/
\`\`\`

## Tech Stack

| Layer         | Technology                   |
| ------------- | ---------------------------- |
| Orchestration | Single-SPA 6                 |
| Parcels       | React 19                     |
| Module Loader | SystemJS 6                   |
| Build         | Vite 7.2.6                   |
| Module Format | ESM                          |
| CDN           | cdn.sebastien-lemouillour.fr |
| Dev Tools     | import-map-overrides         |

## Key Concepts

### Import Maps

3-layer cascade for module resolution:

\`\`\`json
// External (React, SystemJS)
{ "imports": { "react": "https://esm.sh/react@19.2.1" } }

// Production (CDN parcels)
{ "imports": { "@grasdouble/lufa_microfrontend_home": "https://cdn.../home.mjs" } }

// Development (localhost overrides)
{ "imports": { "@grasdouble/lufa_microfrontend_home": "http://localhost:4101/src/parcel.tsx" } }
\`\`\`

### Single-SPA Registration

\`\`\`typescript
import { registerApplication, start } from "single-spa";

registerApplication({
name: "@grasdouble/lufa_microfrontend_home",
app: () => import("@grasdouble/lufa_microfrontend_home"),
activeWhen: ["/"],
});

start();
\`\`\`

### Shared Dependencies

\`\`\`json
{
"imports": {
"react": "https://cdn.../react@19.0.0/index.js",
"@grasdouble/lufa_design-system": "https://cdn.../lufa-ui.mjs"
}
}
\`\`\`

## Config

See [CONTAINER.md](./CONTAINER.md) and [PARCELS.md](./PARCELS.md) for detailed configurations.

## Build

### Dev

\`\`\`bash

# Terminal 1: Main container

cd packages/apps/microfrontend/main-container && pnpm dev

# Terminal 2: Parcel

cd packages/apps/microfrontend/home && pnpm dev

# Browser: Enable dev tools

localStorage.devtools = "true"
\`\`\`

### Prod

\`\`\`bash

# Build parcel

cd packages/apps/microfrontend/home && pnpm build
pnpm publish

# Build container

cd packages/apps/microfrontend/main-container && pnpm build

# Deploy dist/ to GitHub Pages

\`\`\`

## Dependencies

| Package                                                      | Version   | Usage                       |
| ------------------------------------------------------------ | --------- | --------------------------- |
| single-spa                                                   | ^6        | Microfrontend orchestration |
| systemjs                                                     | ^6        | Dynamic module loading      |
| import-map-overrides                                         | Latest    | Dev import map testing      |
| @grasdouble/lufa_plugin_vite_vite-plugin-import-map-injector | Workspace | Inject import maps          |
| @grasdouble/lufa_plugin_vite_vite-plugin-react-preamble      | Workspace | HMR for remote parcels      |

## Integration

### Add New Parcel

\`\`\`typescript
// 1. Create package in packages/apps/microfrontend/{name}/
// 2. Export Single-SPA lifecycle in src/parcel.tsx
export const bootstrap = async () => Promise.resolve();
export const mount = async () => { /_ render _/ };
export const unmount = async () => { /_ cleanup _/ };

// 3. Register in main-container/src/main.ts
registerApplication({
name: "@grasdouble/lufa*microfrontend*{name}",
app: () => import("@grasdouble/lufa*microfrontend*{name}"),
activeWhen: ["/route"],
});

// 4. Add to import maps (dev + prod)
// 5. Build and publish to GitHub Packages
\`\`\`

## Workflows

| Task           | Command                           |
| -------------- | --------------------------------- |
| Dev (shell)    | `cd main-container && pnpm dev`   |
| Dev (parcel)   | `cd home && pnpm dev`             |
| Build parcel   | `cd home && pnpm build`           |
| Publish parcel | `cd home && pnpm publish`         |
| Build shell    | `cd main-container && pnpm build` |
| Deploy shell   | Upload dist/ to GitHub Pages      |

## Decisions

| What               | Why                            | Trade-off                             |
| ------------------ | ------------------------------ | ------------------------------------- |
| Single-SPA         | Proven microfrontend framework | Learning curve                        |
| SystemJS           | Dynamic import maps            | Not native ESM                        |
| Import map cascade | Dev override without rebuild   | Complex configuration                 |
| Custom CDN         | Control over infrastructure    | Maintenance burden                    |
| Autobuild server   | On-demand builds               | Build latency on first request        |
| GitHub Packages    | Private registry               | Requires GITHUB_TOKEN                 |
| Vite library mode  | Fast ESM builds                | Smaller plugin ecosystem than webpack |

## Deployment

\`\`\`bash

# Parcel: Build → Publish → CDN serves

cd packages/apps/microfrontend/home
pnpm build && pnpm publish

# Container: Build → Deploy

cd packages/apps/microfrontend/main-container
pnpm build

# Upload dist/ to www.sebastien-lemouillour.fr

\`\`\`

## Debug

| Issue               | Solution                              |
| ------------------- | ------------------------------------- |
| Parcel not loading  | Check import map in Network tab       |
| Wrong version       | Verify CDN URL in import map          |
| CORS error          | Enable CORS on CDN                    |
| HMR broken          | Check dev import map → localhost:4101 |
| Shared dep mismatch | Same version in all import maps       |
| 404 from CDN        | Verify package published              |

## Best Practices

- Keep parcels small and focused
- Share deps via import map (React, design system)
- Use semantic versioning
- Test import map cascade locally
- Enable import-map-overrides in dev
- Build parcels as ESM only

## Links

- [CONTAINER.md](./CONTAINER.md)
- [PARCELS.md](./PARCELS.md)
- [../../rules/microfrontend/](../../rules/microfrontend/)
