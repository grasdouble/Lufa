# @grasdouble/lufa_config_tsconfig

Shared TypeScript configurations for Lufa monorepo packages. Provides consistent TypeScript settings across all projects.

## Overview

This package provides reusable TypeScript configurations for different project types:

- **base.json** - Base configuration for all projects
- **node.json** - Node.js specific configuration
- **react-library.json** - React library configuration
- **react-app.json** - React application configuration

## Installation

```bash
pnpm add -D @grasdouble/lufa_config_tsconfig
```

## Usage

### Base Configuration

```json
// tsconfig.json
{
  "extends": "@grasdouble/lufa_config_tsconfig/base.json",
  "compilerOptions": {
    "outDir": "./dist"
  },
  "include": ["src"]
}
```

### Node.js Project

```json
// tsconfig.json
{
  "extends": "@grasdouble/lufa_config_tsconfig/node.json",
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

### React Library

```json
// tsconfig.json
{
  "extends": "@grasdouble/lufa_config_tsconfig/react-library.json",
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

### React Application

```json
// tsconfig.json
{
  "extends": "@grasdouble/lufa_config_tsconfig/react-app.json"
}
```

## Features

- **Strict mode enabled** - Catch more errors at compile time
- **Path mapping support** - Simplified imports with `@/` prefix
- **Modern target** - ES2022+ features
- **JSX support** - React JSX transformation
- **Declaration files** - Generate `.d.ts` files for libraries

## Customization

Override settings in your local `tsconfig.json`:

```json
{
  "extends": "@grasdouble/lufa_config_tsconfig/react-app.json",
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## Related

- [@grasdouble/lufa_config_eslint](../eslint/) - ESLint configuration
- [@grasdouble/lufa_config_prettier](../prettier/) - Prettier configuration

## Contributing

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) for development guidelines.
