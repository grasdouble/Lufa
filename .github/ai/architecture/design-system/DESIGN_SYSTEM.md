# Design System Architecture

> **Last Updated**: December 13, 2025  
> **Package Location**: `packages/design-system/`

## Overview

The Lufa Design System is a comprehensive collection of reusable React 19 components, design tokens, and primitives built with TypeScript and Tailwind CSS v4. It's structured as a monorepo within the main Lufa workspace.

## Package Structure

```
packages/design-system/
├── main/                   # Core design system package
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── css/          # CSS utilities and resets
│   │   ├── utils/        # Utility functions
│   │   └── index.ts      # Main export
│   ├── dist/             # Build output
│   └── package.json      # @grasdouble/lufa_design-system
│
├── primitives/            # Base CSS primitives
│   ├── src/
│   │   └── primitives.css
│   └── package.json      # @grasdouble/lufa_design-system-primitives
│
├── tokens/               # Design tokens
│   ├── src/
│   │   └── tokens.ts    # TypeScript-based tokens
│   └── package.json     # @grasdouble/lufa_design-system-tokens
│
├── storybook/           # Component documentation
│   ├── stories/
│   ├── .storybook/
│   └── package.json     # @grasdouble/lufa_design-system-storybook
│
└── documentation/       # Docusaurus site
    ├── docs/
    ├── src/
    └── package.json     # @grasdouble/lufa_design-system-documentation
```

## Core Packages

### 1. Main (`@grasdouble/lufa_design-system`)

> **Detailed Architecture**: See [MAIN.md](./MAIN.md) for complete package architecture

**Purpose**: Core design system package that exports all components

**Technology Stack**:

- React 19
- TypeScript
- Tailwind CSS v4 (CSS-first configuration)
- Vite for building

**Key Features**:

- Component-level CSS resets (no global preflight)
- Dark mode support via CSS variables
- Module CSS for scoped styles
- Exports components, primitives, and tokens

**Exports**:

```typescript
// Components
import { Button, Card, Typography, Input, ... } from '@grasdouble/lufa_design-system';

// Primitives
import { primitives } from '@grasdouble/lufa_design-system';

// Tokens
import { tokens } from '@grasdouble/lufa_design-system';

// CSS
import '@grasdouble/lufa_design-system/style.css';
```

**Build Output**:

- `dist/lufa-ui.mjs` (~145 KB)
- `dist/style.css` (~167 KB, 23 KB gzipped)
- `dist/index.d.ts` (TypeScript declarations)

### 2. Primitives (`@grasdouble/lufa_design-system-primitives`)

**Purpose**: Base CSS variables and primitive styles

**Contents**:

- Color primitives (`--lufa-primitive-color-*`)
- Spacing primitives
- Typography primitives
- Shadow primitives
- Breakpoint primitives

**Usage**: Automatically bundled into main package's CSS

### 3. Tokens (`@grasdouble/lufa_design-system-tokens`)

**Purpose**: Semantic design tokens built on top of primitives

**Technology**: TypeScript-based token system

**Token Categories**:

- Colors (chromatic, achromatic, semantic)
- Typography (font sizes, weights, line heights)
- Spacing (padding, margin, gap)
- Shadows
- Z-index values

**Export Format**: TypeScript objects and CSS variables

### 4. Storybook (`@grasdouble/lufa_design-system-storybook`)

> **Detailed Architecture**: See [STORYBOOK.md](./STORYBOOK.md) for complete Storybook architecture

**Purpose**: Interactive component documentation and testing

**Deployed at**: [lufa-storybook.sebastien-lemouillour.fr](https://lufa-storybook.sebastien-lemouillour.fr)

**Technology**: Storybook 10.1.4 with React-Vite framework

**Features**:

- Component playground with live prop editing
- Auto-generated props documentation
- Dark/light theme switching
- Custom viewport testing
- Story categorization system
- Visual documentation for tokens and primitives

**Story Organization**:

- Tokens, Layout, Forms, Display, Feedback, Overlay, Patterns
- Numeric prefixes for consistent ordering
- "Playground" story as default for each component

### 5. Documentation (`@grasdouble/lufa_design-system-documentation`)

**Purpose**: Comprehensive design system documentation site

**Technology**: Docusaurus 3.9.2 with Rspack

**Deployed at**: [lufa-design.sebastien-lemouillour.fr](https://lufa-design.sebastien-lemouillour.fr)

**Content**:

- Getting started guides
- Component usage examples
- Token documentation
- Architecture explanations
- Contributing guidelines

## Architecture Decisions

### CSS Strategy

**Component-Level Resets**: Uses custom `@utility` directives instead of global Tailwind preflight to avoid conflicts with host applications.

See: [`DESIGN_SYSTEM_CSS.md`](DESIGN_SYSTEM_CSS.md) for detailed CSS architecture.

### Build Strategy

**Vite Library Mode**: Main package builds as ES module with:

- Single CSS bundle including primitives
- TypeScript declarations via `vite-plugin-dts`
- Tree-shakeable exports

### Token System

**TypeScript-First**: Tokens are defined in TypeScript and exported as:

- TypeScript objects for programmatic use
- CSS variables for styling

### Monorepo Dependencies

```
main → primitives (CSS import)
main → tokens (TypeScript import)
storybook → main (component import)
documentation → main (component import)
```

## Development Workflow

1. **Primitives**: Define CSS variables in `primitives/`
2. **Tokens**: Create semantic tokens in `tokens/`
3. **Components**: Build components in `main/src/components/`
4. **Documentation**: Document in Storybook and Docusaurus
5. **Build**: `pnpm build` in main package
6. **Deploy**: Storybook and Docusaurus automatically deploy on merge

## Technology Stack

- **React**: 19.2.1
- **TypeScript**: ~5.6.3
- **Tailwind CSS**: 4.1.17
- **Vite**: 7.2.6
- **Storybook**: 8.x
- **Docusaurus**: 3.9.2
- **Package Manager**: pnpm 10.8.1

## Integration Points

### With Microfrontends

Design system is consumed by microfrontends via:

- NPM package import
- CDN for production
- Direct import in development

### With Host Applications

Designed to work seamlessly with:

- Next.js
- Docusaurus
- Single-SPA applications
- Any React 19 application

**Key**: Component-level resets prevent CSS conflicts

## References

- **Global Architecture**: [`GLOBAL.md`](GLOBAL.md)
- **CSS Architecture**: [`DESIGN_SYSTEM_CSS.md`](DESIGN_SYSTEM_CSS.md)
- **Development Rules**: [`../rules/design-system/`](../rules/design-system/)

---

**Last Updated**: December 13, 2025
