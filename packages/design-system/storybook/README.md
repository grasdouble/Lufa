[← Back to Design System Overview](../README.md)

# Lufa Design System Storybook

[![Storybook](https://img.shields.io/badge/Storybook-10.x-FF4785?style=flat-square&logo=storybook)](https://storybook.js.org)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](../../LICENSE.md)

> Interactive component explorer and documentation for the Lufa Design System

**Part of the [Lufa Design System](../README.md)** - Component Explorer & Testing

## Overview

This Storybook instance serves as the primary documentation and testing environment for all Lufa Design System components. It provides an interactive playground for developers and designers to explore, test, and understand component behavior.

### What's Inside

- **Component Catalog** - Browse all available components with live examples
- **Interactive Controls** - Test components with different props in real-time
- **Accessibility Testing** - Built-in a11y auditing for WCAG compliance
- **Theme Switching** - Preview components in light/dark and custom themes
- **Code Examples** - Copy-paste ready code snippets
- **Documentation** - Inline docs with MDX support

## Development

```bash
# Start Storybook dev server
pnpm ds:storybook:dev

# Build Storybook for production
pnpm ds:storybook:build

# Lint stories
pnpm ds:storybook:lint

# Format stories
pnpm ds:storybook:prettier
```

## Writing Stories

Add stories alongside components or in the `stories/` directory:

```tsx
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@grasdouble/lufa_design-system';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Click me',
  },
};
```

## Addons

Installed Storybook addons:

- **@storybook/addon-themes** - Theme switcher
- **@storybook/addon-docs** - Documentation with MDX

## Deployment

Storybook is automatically deployed on pull requests and merges to main.

## Related

- [Design System](../main/) - Component library
- [Design Tokens](../tokens/) - Semantic tokens
- [Documentation](../docusaurus/) - Docusaurus docs

## Contributing

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) and [design system instructions](../../../.github/instructions/lufa-design-system.instructions.md) for development guidelines.
