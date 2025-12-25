# vite-plugin-react-preamble

Vite plugin for injecting React import preamble into bundles. Ensures React imports are properly configured for Single-SPA microfrontends.

## Overview

This plugin adds necessary React import statements at the beginning of your bundle, ensuring proper module resolution in microfrontend architectures where React is shared across applications.

## Features

- **Automatic preamble injection** - Adds React imports to bundle entry
- **Single-SPA compatible** - Works with Single-SPA lifecycle functions
- **Development support** - Functions in both dev and production modes
- **Tree-shakeable** - Only includes necessary imports

## Installation

```bash
pnpm add -D vite-plugin-react-preamble
```

## Usage

### Basic Configuration

```ts
// vite.config.ts
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import reactPreamble from 'vite-plugin-react-preamble';

export default defineConfig({
  plugins: [react(), reactPreamble()],
});
```

### With Options

```ts
reactPreamble({
  // Use specific React version
  reactVersion: '18.2.0',
  // Add custom imports
  additionalImports: ['react-dom/client'],
});
```

## Options

- `reactVersion` - Specify React version (default: auto-detected)
- `additionalImports` - Array of additional React-related imports
- `position` - Where to inject ('start' | 'end')
- `external` - Mark React as external dependency

## How It Works

The plugin:

1. Analyzes your bundle configuration
2. Determines required React imports
3. Injects import statements at bundle entry
4. Ensures proper module resolution order

## Use Cases

- **Microfrontends** - Share React across applications
- **Module federation** - Proper React import in federated modules
- **CDN loading** - Load React from CDN with correct imports
- **Build optimization** - Prevent duplicate React bundles

## Example Output

The plugin transforms your bundle to include:

```js
import React from 'react';
import ReactDOM from 'react-dom';

// Your application code follows...
```

## Compatibility

- **Vite**: 4.x, 5.x
- **React**: 17.x, 18.x, 19.x
- **Single-SPA**: 5.x, 6.x

## Related

- [vite-plugin-import-map-injector](../vite-plugin-import-map-injector/) - Import map injection
- [Main Container](../../../apps/microfrontend/main-container/) - Example usage

## Contributing

See [CONTRIBUTING.md](../../../../CONTRIBUTING.md) for development guidelines.
