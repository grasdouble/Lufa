# Parcel Development Rules

> **For AI Assistants**: Guidelines for creating and modifying microfrontend parcels.

## Package Information

- **Type**: Microfrontend Parcel (React 19 + Single-SPA)
- **Location**: `packages/apps/microfrontend/{parcel-name}/`
- **Build**: Vite library mode → ES module
- **Deployment**: GitHub Packages → CDN

## Creating a New Parcel

### 1. Create Package Directory

```bash
mkdir -p packages/apps/microfrontend/{parcel-name}
cd packages/apps/microfrontend/{parcel-name}
```

### 2. Initialize package.json

```json
{
  "name": "@grasdouble/lufa_microfrontend_{parcel-name}",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "peerDependencies": {
    "react": "^19.2.1",
    "react-dom": "^19.2.1",
    "@grasdouble/lufa_design-system": "^0.1.2"
  },
  "dependencies": {
    "clsx": "^2.1.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^7.2.6",
    "vite-plugin-css-injected-by-js": "^3.5.2",
    "vite-plugin-externalize-deps": "^0.10.0",
    "@tailwindcss/vite": "^4.0.0"
  }
}
```

### 3. Create Vite Configuration

```javascript
// vite.config.js
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import { externalizeDeps } from 'vite-plugin-externalize-deps';

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    tailwindcss(),
    externalizeDeps({
      deps: true, // Externalize all deps (loaded via import map)
      peerDeps: false,
      except: ['clsx'], // Bundle lightweight utilities
    }),
  ],

  build: {
    lib: {
      entry: 'src/parcel.tsx',
      formats: ['es'],
      fileName: () => '{parcel-name}.mjs',
    },
    minify: false,
    sourcemap: true,
  },

  server: {
    port: 4102, // Unique port per parcel (4101, 4102, 4103...)
    hmr: true,
    cors: true,
  },
});
```

### 4. Create Single-SPA Lifecycle

```typescript
// src/parcel.tsx
import React from "react";
import { createRoot, Root } from "react-dom/client";
import App from "./App";

let root: Root | null = null;

export const bootstrap = async (): Promise<void> => {
  console.log("[Parcel] Bootstrapping...");
  return Promise.resolve();
};

export const mount = async (): Promise<void> => {
  console.log("[Parcel] Mounting...");

  const container = document.getElementById("lufa-container");
  if (!container) {
    throw new Error("Container element #lufa-container not found");
  }

  root = createRoot(container);
  root.render(<App />);

  return Promise.resolve();
};

export const unmount = async (): Promise<void> => {
  console.log("[Parcel] Unmounting...");

  if (root) {
    root.unmount();
    root = null;
  }

  return Promise.resolve();
};
```

### 5. Create React App

```tsx
// src/App.tsx
import React from 'react';

import { Button, Card } from '@grasdouble/lufa_design-system';

export default function App() {
  return (
    <div className="container mx-auto p-8">
      <Card>
        <h1 className="text-4xl font-bold">Parcel Name</h1>
        <p className="text-lg mt-4">Description of this microfrontend.</p>
        <Button className="mt-6">Action</Button>
      </Card>
    </div>
  );
}
```

### 6. Register in Main Container

See: [`CONTAINER.md`](./CONTAINER.md#adding-a-new-parcel)

## Development Workflow

### Start Development Server

```bash
cd packages/apps/microfrontend/{parcel-name}
pnpm dev
```

**Port**: Check `vite.config.js` (e.g., 4102)  
**URL**: `http://localhost:4102`

### Test Standalone

Visit `http://localhost:4102` in browser:

- Parcel loads but won't mount (no container)
- Useful for verifying build works

### Test in Main Container

1. Start parcel dev server (`pnpm dev`)
2. Start main-container (`pnpm dev`)
3. Navigate to parcel route
4. Verify mount/unmount on route changes

### Hot Module Replacement

Changes in parcel automatically reload in main-container (no page refresh).

## Lifecycle Implementation

### Bootstrap

**Purpose**: One-time initialization

**When called**: Once per page load (before first mount)

**Use for**:

- Loading global configuration
- Setting up event listeners (global)
- Initializing analytics

**Example**:

```typescript
export const bootstrap = async () => {
  console.log('Initializing analytics...');
  // Initialize once
  return Promise.resolve();
};
```

### Mount

**Purpose**: Render React application

**When called**: Every time route becomes active

**Use for**:

- Creating React root
- Rendering components
- Fetching initial data

**Example**:

```typescript
export const mount = async () => {
  const container = document.getElementById("lufa-container");
  if (!container) throw new Error("Container not found");

  root = createRoot(container);
  root.render(<App />);

  return Promise.resolve();
};
```

### Unmount

**Purpose**: Clean up React application

**When called**: Every time route becomes inactive

**Use for**:

- Unmounting React root
- Cleaning up event listeners
- Canceling pending requests

**Example**:

```typescript
export const unmount = async () => {
  if (root) {
    root.unmount();
    root = null;
  }

  // Clean up subscriptions
  eventBus.removeAllListeners();

  return Promise.resolve();
};
```

## Component Development

### Using Design System

```tsx
import { Button, Card, Input } from '@grasdouble/lufa_design-system';

export function MyComponent() {
  return (
    <Card>
      <Input placeholder="Enter text" />
      <Button>Submit</Button>
    </Card>
  );
}
```

### Custom Components

```tsx
import { cn } from '@grasdouble/lufa_design-system';

export function CustomCard({ children, className }) {
  return (
    <div
      className={cn(
        '@utility preflight', // Apply CSS reset
        'p-6 rounded-lg bg-white shadow-lg',
        className
      )}
    >
      {children}
    </div>
  );
}
```

**Important**: Always apply `@utility preflight` for Tailwind components.

### Tailwind Configuration

```javascript
// tailwind.config.js (if custom styles needed)
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Custom styles
    },
  },
};
```

Most parcels use design system → no custom config needed.

## Dependency Management

### Externalized (Import Map)

**Always externalize**:

- `react`
- `react-dom`
- `@grasdouble/lufa_design-system`
- Any shared library

**Configuration**:

```javascript
externalizeDeps({
  deps: true, // Externalize all dependencies
});
```

### Bundled (Included)

**Bundle only**:

- Tiny utilities (<5KB): `clsx`, `date-fns/format`
- Parcel-specific helpers

**Configuration**:

```javascript
externalizeDeps({
  deps: true,
  except: ['clsx'], // Bundle this
});
```

### Adding New Dependency

1. **Install**: `pnpm add library-name`
2. **Decide**: Externalize or bundle?
   - **Shared across parcels** → Externalize → Add to import map
   - **Parcel-specific** → Bundle → Add to `except` array
3. **Test build**: `pnpm build`
4. **Verify output**: Check bundle size

## CSS Strategy

### Inline CSS (Recommended)

```javascript
plugins: [cssInjectedByJsPlugin()];
```

**Output**: CSS injected into JavaScript bundle

**Pros**:

- Single file output
- No separate CSS fetch
- No loading race conditions

**Cons**:

- Larger JS bundle
- No separate CSS caching

### Component-Level Resets

**Always apply** to Tailwind components:

```tsx
<div className="@utility preflight p-4">{/* Content */}</div>
```

See: [`architecture/design-system/CSS.md`](../../architecture/design-system/CSS.md)

## Build & Deployment

### Build Command

```bash
pnpm build
```

**Output**: `dist/{parcel-name}.mjs`

### Verify Build

```bash
# Check bundle size
ls -lh dist/

# Verify exports
cat dist/{parcel-name}.mjs | grep "export"
```

Should see:

```javascript
export { bootstrap, mount, unmount };
```

### Publish to GitHub Packages

```bash
pnpm publish
```

**Published to**: `@grasdouble/lufa_microfrontend_{parcel-name}@{version}`

### Update Import Map

**Development** (`main-container/src/importMap.dev.json`):

```json
{
  "imports": {
    "@grasdouble/lufa_microfrontend_{parcel-name}": "http://localhost:4102/src/parcel.tsx"
  }
}
```

**Production** (`main-container/src/importMap.json`):

```json
{
  "imports": {
    "@grasdouble/lufa_microfrontend_{parcel-name}": "https://cdn.sebastien-lemouillour.fr/@grasdouble/lufa_microfrontend_{parcel-name}@0.1.0/{parcel-name}.mjs"
  }
}
```

## Testing

### Manual Testing

1. **Standalone**: Visit `http://localhost:4102`
2. **In container**: Navigate to route in main-container
3. **Mount/Unmount**: Change routes, verify cleanup
4. **HMR**: Edit component, verify hot reload

### Unit Tests

```typescript
// src/components/MyComponent.test.tsx
import { render, screen } from "@testing-library/react";
import MyComponent from "./MyComponent";

test("renders component", () => {
  render(<MyComponent />);
  expect(screen.getByText("Hello")).toBeInTheDocument();
});
```

### Integration Tests

Test Single-SPA lifecycle:

```typescript
import { bootstrap, mount, unmount } from './parcel';

test('lifecycle functions exist', () => {
  expect(bootstrap).toBeDefined();
  expect(mount).toBeDefined();
  expect(unmount).toBeDefined();
});

test('mount creates root', async () => {
  document.body.innerHTML = '<div id="lufa-container"></div>';

  await bootstrap();
  await mount();

  expect(document.getElementById('lufa-container')?.childNodes.length).toBeGreaterThan(0);

  await unmount();
});
```

## Debugging

### Parcel Not Loading

**Check**:

1. Import map has correct URL
2. Lifecycle exports present
3. Container element exists (`#lufa-container`)
4. No console errors

**Debug**:

```javascript
// In browser console
System.import('@grasdouble/lufa_microfrontend_home')
  .then((module) => console.log(module))
  .catch((err) => console.error(err));
```

### React Hooks Errors

**Symptom**: "Invalid hook call"

**Cause**: Multiple React instances

**Fix**:

```javascript
// vite.config.js
externalizeDeps({
  deps: true, // Externalize React
});
```

### Styles Not Applied

**Check**:

1. `cssInjectedByJsPlugin()` enabled
2. `@utility preflight` applied to components
3. Design system imported

**Debug**:

```javascript
// Check if CSS injected
const styles = document.querySelectorAll('style');
console.log(styles);
```

### HMR Not Working

**Check**:

1. `server.hmr: true` in vite.config.js
2. `server.cors: true` in vite.config.js
3. Main-container running
4. Import map points to dev server

## Best Practices

### DO ✅

- Export clean lifecycle functions
- Externalize React and design system
- Use unique development port
- Apply component-level resets
- Clean up in `unmount`
- Test in main-container before deploying
- Version independently
- Keep parcels focused and small

### DON'T ❌

- Bundle React in parcel
- Hardcode API URLs (use env vars)
- Share state via global variables
- Skip cleanup in `unmount`
- Deploy without testing
- Create monolithic parcels
- Modify main-container from parcel

## Port Allocation

| Parcel | Port |
| ------ | ---- |
| home   | 4101 |
| blog   | 4102 |
| docs   | 4103 |
| admin  | 4104 |
| ...    | 410X |

**Rule**: Increment by 1 for each new parcel

## Common Pitfalls

### ❌ Wrong Entry Point

```javascript
// DON'T
build: {
  lib: {
    entry: 'src/index.tsx',  // Wrong!
  }
}
```

**Fix**: Entry must be `parcel.tsx`:

```javascript
entry: 'src/parcel.tsx',
```

### ❌ Missing Container

```typescript
// Parcel expects #specific-container but uses #lufa-container
const container = document.getElementById('specific-container');
```

**Fix**: Always use `#lufa-container` (standard)

### ❌ No Cleanup

```typescript
export const unmount = async () => {
  // DON'T: Missing cleanup
  return Promise.resolve();
};
```

**Fix**: Unmount React root:

```typescript
if (root) {
  root.unmount();
  root = null;
}
```

### ❌ Bundled Shared Deps

```javascript
// DON'T
externalizeDeps({
  deps: false, // Bundles everything!
});
```

**Fix**: Externalize dependencies:

```javascript
externalizeDeps({
  deps: true,
});
```

## Related Documentation

- **Parcel Architecture**: [`../architecture/microfrontend/PARCELS.md`](../../architecture/microfrontend/PARCELS.md)
- **Container Development**: [`CONTAINER.md`](./CONTAINER.md)
- **Microfrontend Overview**: [`../architecture/microfrontend/MICROFRONTEND.md`](../../architecture/microfrontend/MICROFRONTEND.md)
- **Design System**: [`../design-system/MAIN.md`](../design-system/MAIN.md)
- **CSS Architecture**: [`../architecture/design-system/CSS.md`](../../architecture/design-system/CSS.md)
