# Microfrontend Parcels Architecture

**Framework**: Single-SPA | **Location**: `packages/apps/microfrontend/{parcel-name}/` | **Updated**: 2025-12-14

## Stats

- Parcels: home (port 4101)
- Format: ES modules (.mjs)
- Build: Vite library mode
- React: 19 (externalized)

## Structure

```
packages/apps/microfrontend/{parcel-name}/
├── src/
│   ├── parcel.tsx
│   ├── App.tsx
│   └── components/
├── vite.config.js
├── package.json
└── tsconfig.json
```

## Tech Stack

| Layer         | Technology                     | Usage                   |
| ------------- | ------------------------------ | ----------------------- |
| Framework     | React 19                       | UI components           |
| Build         | Vite 7 library mode            | ES module output        |
| Lifecycle     | Single-SPA 6                   | bootstrap/mount/unmount |
| CSS           | Tailwind CSS 4                 | Styling                 |
| CSS Injection | vite-plugin-css-injected-by-js | Inline CSS in JS        |

## Key Concepts

### Single-SPA Lifecycle

```typescript
import React from "react";
import { createRoot, Root } from "react-dom/client";
import App from "./App";

let root: Root | null = null;

export const bootstrap = async (): Promise<void> => {
  console.log("Parcel bootstrapping...");
  return Promise.resolve();
};

export const mount = async (): Promise<void> => {
  const container = document.getElementById("lufa-container");
  if (!container) throw new Error("Container not found");
  root = createRoot(container);
  root.render(<App />);
  return Promise.resolve();
};

export const unmount = async (): Promise<void> => {
  if (root) {
    root.unmount();
    root = null;
  }
  return Promise.resolve();
};
```

## Config

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { externalizeDeps } from "vite-plugin-externalize-deps";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    tailwindcss(),
    externalizeDeps({ deps: true, except: ["clsx"] }),
  ],
  build: {
    lib: {
      entry: "src/parcel.tsx",
      formats: ["es"],
      fileName: () => "home.mjs",
    },
    minify: false,
    sourcemap: true,
  },
  server: { port: 4101, hmr: true, cors: true },
});
```

## Build

### Dev

```bash
pnpm dev # Port 4101, HMR enabled
```

### Prod

```bash
pnpm build # Output: dist/home.mjs + source map
```

## Dependencies

| Package                        | Version   | Usage                     |
| ------------------------------ | --------- | ------------------------- |
| single-spa                     | ^6        | Lifecycle (peerDep)       |
| react                          | ^19       | Framework (externalized)  |
| @grasdouble/lufa_design-system | workspace | Components (externalized) |
| vite-plugin-css-injected-by-js | Latest    | Inline CSS                |
| vite-plugin-externalize-deps   | Latest    | Externalize deps          |

## Integration

### Import Map (Prod)

```json
{
  "imports": {
    "@grasdouble/lufa_microfrontend_home": "https://cdn.sebastien-lemouillour.fr/@grasdouble/lufa_microfrontend_home@0.1.0/home.mjs"
  }
}
```

### Import Map (Dev)

```json
{
  "imports": {
    "@grasdouble/lufa_microfrontend_home": "http://localhost:4101/src/parcel.tsx"
  }
}
```

## Workflows

| Port | Parcel | Status |
| ---- | ------ | ------ |
| 4101 | home   | Active |
| 4102 | blog   | Future |
| 4103 | docs   | Future |

## Decisions

| What              | Why                | Trade-off              |
| ----------------- | ------------------ | ---------------------- |
| CSS inlined in JS | Single file output | Larger JS bundle       |
| Externalize React | Shared instance    | Import map dependency  |
| Bundle clsx       | <5KB               | Slightly larger bundle |
| Unique dev ports  | Parallel dev       | Port management        |

## Deployment

1. Build: `pnpm build` → `dist/home.mjs`
2. Publish: `pnpm publish` → GitHub Packages
3. CDN: Autobuild server uploads to cdn.sebastien-lemouillour.fr
4. Container: Fetches updated import map

## Debug

| Issue            | Cause                     | Fix                                 |
| ---------------- | ------------------------- | ----------------------------------- |
| Won't mount      | Container element missing | Add `#lufa-container` to index.html |
| HMR not working  | CORS disabled             | `server: { cors: true }`            |
| Dep loaded twice | Not externalized          | `externalizeDeps({ deps: true })`   |
| CSS not applied  | CSS injection disabled    | Add `cssInjectedByJsPlugin()`       |

## Best Practices

- Export clean Single-SPA lifecycle (bootstrap/mount/unmount)
- Externalize React and design system
- Use unique dev ports per parcel
- Inline CSS with css-injected-by-js
- Apply component-level resets
- Version independently
- Clean up in unmount

## Links

- [MICROFRONTEND.md](MICROFRONTEND.md) - Overview
- [CONTAINER.md](CONTAINER.md) - Shell architecture
- [DESIGN_SYSTEM.md](../design-system/DESIGN_SYSTEM.md) - Components
