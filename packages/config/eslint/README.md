# @grasdouble/lufa_config_eslint

Shared ESLint configurations for Lufa monorepo packages. Provides consistent linting rules across all projects.

## Overview

This package provides reusable ESLint configurations for:

- **Basic** - Core JavaScript/TypeScript rules
- **Node** - Node.js specific rules
- **React** - React and JSX rules

## Installation

```bash
pnpm add -D @grasdouble/lufa_config_eslint
```

## Usage

### Basic Configuration

```js
// eslint.config.mjs
import { basic } from '@grasdouble/lufa_config_eslint';

export default [
  ...basic,
  // Your custom rules
];
```

### Node Configuration

```js
// eslint.config.mjs
import { node } from '@grasdouble/lufa_config_eslint';

export default [
  ...node,
  // Your custom rules
];
```

### React Configuration

```js
// eslint.config.mjs
import { react } from '@grasdouble/lufa_config_eslint';

export default [
  ...react,
  // Your custom rules
];
```

## Included Rules

- TypeScript strict rules
- Import ordering and organization
- React hooks and JSX best practices
- Accessibility (jsx-a11y)
- Code style and formatting

## Extending

You can extend these configurations with project-specific rules:

```js
import { react } from '@grasdouble/lufa_config_eslint';

export default [
  ...react,
  {
    rules: {
      // Override or add rules
      'no-console': 'warn',
    },
  },
];
```

## Related

- [@grasdouble/lufa_config_prettier](../prettier/) - Prettier configuration
- [@grasdouble/lufa_config_tsconfig](../tsconfig/) - TypeScript configuration

## Contributing

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) for development guidelines.
