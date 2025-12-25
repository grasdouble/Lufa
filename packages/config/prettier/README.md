# @grasdouble/lufa_config_prettier

Shared Prettier configuration for Lufa monorepo packages. Ensures consistent code formatting across all projects.

## Overview

This package provides a standardized Prettier configuration used throughout the Lufa monorepo.

## Installation

```bash
pnpm add -D @grasdouble/lufa_config_prettier
```

## Usage

### Import in `prettier.config.mjs`

```js
import prettierConfig from '@grasdouble/lufa_config_prettier';

export default prettierConfig;
```

### Or extend with custom options

```js
import prettierConfig from '@grasdouble/lufa_config_prettier';

export default {
  ...prettierConfig,
  printWidth: 100, // Override default
};
```

## Configuration

Default settings:

- **printWidth**: 80
- **tabWidth**: 2
- **useTabs**: false
- **semi**: true
- **singleQuote**: true
- **trailingComma**: 'es5'
- **arrowParens**: 'always'

## Scripts

Add to your `package.json`:

```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

## IDE Integration

### VS Code

Install the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and enable format on save:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

## Related

- [@grasdouble/lufa_config_eslint](../eslint/) - ESLint configuration
- [@grasdouble/lufa_config_tsconfig](../tsconfig/) - TypeScript configuration

## Contributing

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) for development guidelines.
