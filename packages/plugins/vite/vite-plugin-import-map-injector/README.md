# vite-plugin-import-map-injector

Vite plugin for injecting import maps into HTML during build. Enables dynamic module loading in microfrontend architectures.

## Overview

This plugin automatically injects import map configurations into your HTML files during the Vite build process. Essential for Single-SPA microfrontend applications that need to share dependencies across multiple bundles.

## Features

- **Automatic injection** - Adds import maps to HTML files during build
- **Dynamic configuration** - Support for environment-based import maps
- **Multiple formats** - Inline or external import map files
- **Dev mode support** - Works in both development and production

## Installation

```bash
pnpm add -D vite-plugin-import-map-injector
```

## Usage

### Basic Configuration

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import importMapInjector from 'vite-plugin-import-map-injector';

export default defineConfig({
  plugins: [
    importMapInjector({
      imports: {
        react: 'https://cdn.example.com/react@18.2.0/index.js',
        'react-dom': 'https://cdn.example.com/react-dom@18.2.0/index.js',
      },
    }),
  ],
});
```

### Advanced Configuration

```ts
importMapInjector({
  imports: {
    react: 'https://cdn.example.com/react@18.2.0/index.js',
  },
  scopes: {
    '/app/': {
      lodash: 'https://cdn.example.com/lodash@4.17.21/index.js',
    },
  },
  // Use external import map file
  external: '/import-map.json',
});
```

## Options

- `imports` - Map of module specifiers to URLs
- `scopes` - Scoped import maps for specific paths
- `external` - Path to external import map JSON file
- `position` - Injection position ('head' | 'body-start' | 'body-end')

## How It Works

The plugin:

1. Processes your Vite configuration
2. Generates an import map script tag
3. Injects it into the HTML at the specified position
4. Ensures proper ordering with other scripts

## Use Cases

- **Microfrontends** - Share dependencies across applications
- **CDN optimization** - Load dependencies from CDN
- **Version management** - Control dependency versions centrally
- **Development workflow** - Different URLs for dev/prod

## Related

- [vite-plugin-react-preamble](../vite-plugin-react-preamble/) - React import preparation
- [Main Container](../../../apps/microfrontend/main-container/) - Example usage

## Contributing

See [CONTRIBUTING.md](../../../../CONTRIBUTING.md) for development guidelines.
