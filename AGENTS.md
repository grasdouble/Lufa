# AGENTS.md

> 📘 **Multi-Agent Compatible**: This file follows the [AGENTS.md standard](https://agents.md/) and is optimized for GitHub Copilot, Claude Code, and OpenAI Codex Extension.

**This file is for AI agents working with this codebase.**

## 🚀 Quick Navigation for AI Agents

**First time here? Read in this order:**

1. [Quick Start](#quick-start-for-ai-agents) - Essential info (3 min read)
2. [Architecture](#design-system-three-layer-architecture) - Critical design system layers (5 min read)
3. Detailed sections below as needed

**Most common tasks:**

- 🏗️ Adding a component → [Component Creation Guide](#when-creating-new-components)
- 🐛 Build failing → [Build Troubleshooting](#build-failures)
- 🧪 Running tests → [Testing Instructions](#testing-instructions)
- 📦 Adding dependencies → [Adding Dependencies](#adding-dependencies)
- 🔄 Version management → [Using Changesets](#using-changesets)
- 📝 Updating AI docs → [Maintenance Guide](.github/instructions/multi-agent-documentation-maintenance.instructions.md)

**Agent-specific notes:**

- **GitHub Copilot**: See [.github/copilot-instructions.md](.github/copilot-instructions.md) for path-scoped rules
- **Claude Code**: See [CLAUDE.md](CLAUDE.md) for quick reference
- **OpenAI Codex Extension**: See [config.toml](config.toml) for configuration

---

## 🤖 Quick Start for AI Agents

### Essential Context

**Project Type**: Monorepo with microfrontend architecture and design system
**Package Manager**: pnpm (10.26.x+) with workspaces
**Node Version**: 24.9.0 (check `.tool-versions`)
**Primary Focus**: Design system with strict three-layer architecture

### Three Most Important Rules

1. **Design System Architecture**: Components MUST use tokens only, NEVER primitives or hard-coded values
2. **Build Order Matters**: Design system packages must be built in specific order (tokens → primitives → main → storybook)
3. **Testing Required**: All components need Playwright component tests

### Quick Commands Cheatsheet

```bash
# Setup (first time)
pnpm install && pnpm all:build

# Development
pnpm ds:storybook:dev          # Design system on :6006
pnpm app:mf:dev                # Microfrontends on :3000

# Build (CRITICAL: order matters for design system!)
pnpm ds:all:build              # Design system (correct order)
pnpm all:build                 # Everything

# Testing
pnpm --filter @grasdouble/lufa_design-system test-ct

# Quality checks
pnpm all:lint && pnpm all:prettier
pnpm validate:docs             # Validate AI documentation consistency

# Version management
pnpm changeset                 # After code changes
```

### Decision Trees

#### Should I create a new file?

```
Need to add code?
├─ New component? → packages/design-system/main/src/components/{ComponentName}.tsx
├─ New token? → packages/design-system/tokens/src/
├─ New primitive? → packages/design-system/primitives/src/
├─ Test? → Co-locate with component as *.spec.tsx
└─ Configuration? → Check existing configs first
```

#### What layer am I working in?

```
Looking at imports...
├─ Importing from @grasdouble/lufa_design-system-tokens? → Layer 3 (Components) ✅
├─ Importing from @grasdouble/lufa_design-system-primitives? → Layer 1 or 2 only
├─ Hard-coding values (16px, #FF0000)? → ❌ STOP - Use tokens instead
└─ Not sure? → Read Design System Architecture section below
```

#### Build is failing?

```
Error type?
├─ "Cannot find module @grasdouble/lufa_design-system-tokens"
│   └─ Run: pnpm ds:tokens:build (tokens not built)
├─ TypeScript errors in components
│   └─ Run: pnpm ds:all:build (wrong build order)
├─ Import resolution issues
│   └─ Check: workspace:^ protocol in package.json
└─ Still failing? → See Troubleshooting section
```

---

## Project Overview

Lufa is a personal learning monorepo for exploring modern web application development with microfrontend architecture, design systems, and advanced build tooling. The project uses pnpm workspaces, Vite for building, Single-SPA for microfrontend orchestration, and follows strict TypeScript and code quality standards.

**Key Technologies:**

- **Package Manager:** pnpm (10.26.x+) with workspace support
- **Node.js:** 24.9.0 (check `.tool-versions`)
- **Build Tool:** Vite 7.x with custom plugins
- **Microfrontend Framework:** Single-SPA
- **UI Framework:** React 19 with TypeScript 5.x
- **Styling:** Tailwind CSS 4.x with design tokens
- **Testing:** Playwright (component testing)
- **Version Management:** Changesets for semantic versioning
- **Documentation:** Storybook 8, Docusaurus 3

## Monorepo Architecture

The repository is organized into focused packages:

- **packages/apps/microfrontend/** - Single-SPA applications (main-container, home)
- **packages/design-system/** - Component library (primitives, tokens, main, themes, storybook, docusaurus, playwright)
- **packages/cdn/** - CDN infrastructure (autobuild-server)
- **packages/plugins/vite/** - Custom Vite plugins (import-map-injector, react-preamble)
- **packages/plugins/vscode/** - VS Code extensions (vscode-lufa-ds-preview)
- **packages/config/** - Shared configurations (eslint, prettier, tsconfig)
- **packages/poc/** - Proof of concepts and experiments

All published packages use the `@grasdouble/` scope with descriptive names like `@grasdouble/lufa_design-system` or `@grasdouble/lufa_microfrontend_home`.

## Setup Commands

```bash
# Install dependencies
pnpm install

# Build all packages (required before development)
pnpm all:build

# Verify installation
pnpm all:lint
```

## Development Workflow

### Starting Development Servers

```bash
# All microfrontends (main-container + home)
pnpm app:mf:dev
# Runs: main-container on http://localhost:3000, home on http://localhost:3001

# Design system with Storybook
pnpm ds:all:dev
# Runs concurrently: Storybook (:6006), main build watch, Docusaurus (:3001)

# Individual design system components in watch mode
pnpm ds:main:dev
# Runs: vite build --watch for design system main package

# Design system Storybook only
pnpm ds:storybook:dev
# Runs: Storybook on http://localhost:6006

# CDN autobuild server
pnpm cdn:autobuild-server:dev

# Run specific package in dev mode
pnpm --filter @grasdouble/lufa_design-system dev
```

### Package Filtering

Use pnpm's `--filter` flag to work with specific packages:

```bash
# Build specific package
pnpm --filter @grasdouble/lufa_design-system build

# Run dev for package
pnpm --filter @grasdouble/lufa_microfrontend_home dev

# Install dependency to specific package
pnpm --filter @grasdouble/lufa_design-system add react-icons

# Run script across multiple packages with pattern
pnpm --filter @grasdouble/lufa_design-system-* build
```

### Package Information

**Finding packages:**

- Use `pnpm list --recursive --depth 0` to list all workspace packages
- Check `pnpm-workspace.yaml` for workspace patterns
- Package locations follow pattern: `packages/<category>/<package-name>/`

**Key package locations:**

- Design system main: `packages/design-system/main/`
- Design system tokens: `packages/design-system/tokens/`
- Design system primitives: `packages/design-system/primitives/`
- Main container: `packages/apps/microfrontend/main-container/`
- Home microfrontend: `packages/apps/microfrontend/home/`

## Code Style and Standards

### TypeScript

- **Strict mode enabled** - All packages use `"strict": true` in tsconfig
- **Target:** ES2022
- **Module:** ESNext with ESM
- **Avoid `any`** - Use `unknown` or proper types
- **Export types** - All public types/interfaces must be exported

### React Components

- **Functional components only** - Use hooks, avoid class components
- **TypeScript interfaces** - Define props with JSDoc documentation
- **Accessibility first** - Follow WCAG 2.1 AA standards (see `.github/instructions/a11y.instructions.md`)
- **Testing required** - Components need Playwright component tests
- **Use `ComponentPropsWithoutRef<'element'>`** - For extending HTML element props
- **Set `displayName`** - For better debugging in React DevTools

### Design System: Three-Layer Architecture

**⚠️ CRITICAL CONCEPT - Read carefully before working with design system code**

The design system follows a **strict three-layer architecture**. Violating this architecture will cause errors and require rework.

```
┌─────────────────────────────────────────────┐
│         Layer 3: Components                 │
│    (@grasdouble/lufa_design-system)         │
│    React components using TOKENS only       │
└─────────────────┬───────────────────────────┘
                  │ ✅ References tokens
┌─────────────────▼───────────────────────────┐
│         Layer 2: Tokens                     │
│  (@grasdouble/lufa_design-system-tokens)    │
│    Semantic names (primary, compact)        │
└─────────────────┬───────────────────────────┘
                  │ ✅ References primitives
┌─────────────────▼───────────────────────────┐
│         Layer 1: Primitives                 │
│  (@grasdouble/lufa_design-system-primitives)│
│    Raw values (16px, 150ms, blue[600])      │
└─────────────────────────────────────────────┘
```

#### Layer 1: Primitives (`@grasdouble/lufa_design-system-primitives`)

**Purpose:** Provide raw, non-semantic foundational values

**Rules:**

- Keys are **actual values**: `spacing[16]`, `timing[150]`, `blue[600]`
- ❌ NEVER use semantic names like "small", "medium", "large" in primitives
- Exports TypeScript objects and CSS custom properties (`--lufa-primitive-spacing-16`)

**Example:**

```typescript
export const spacing = {
  0: '0px',
  4: '4px',
  8: '8px',
  16: '16px',
  24: '24px',
} as const;
```

#### Layer 2: Tokens (`@grasdouble/lufa_design-system-tokens`)

**Purpose:** Map primitive values to semantic, purpose-driven names

**Rules:**

- Keys are **semantic/purpose-driven**: `primary`, `secondary`, `compact`, `spacious`
- ✅ ALWAYS reference primitives (never hard-code values)
- ❌ NEVER use raw values directly
- CSS custom properties: `--lufa-color-text-primary`, `--lufa-spacing-default`
- Build script generates CSS and TypeScript types

**Example:**

```typescript
import { spacing } from '@grasdouble/lufa_design-system-primitives';

export const spacingTokens = {
  compact: spacing[8],
  default: spacing[16],
  comfortable: spacing[24],
  spacious: spacing[32],
} as const;
```

#### Layer 3: Components (`@grasdouble/lufa_design-system`)

**Purpose:** React components using tokens for all design values

**Rules:**

- ✅ Components MUST use tokens only
- ❌ Components MUST NOT import from primitives
- ❌ Components MUST NOT hard-code design values
- Use Tailwind CSS utilities with token-based CSS custom properties

**Example:**

```typescript
// ✅ GOOD - Import tokens

// ❌ BAD - Don't import primitives
import { spacing } from '@grasdouble/lufa_design-system-primitives';
import { color, spacing } from '@grasdouble/lufa_design-system-tokens';

const styles = {
  padding: spacing.default,
  color: color.text.primary,
};

const styles = { padding: spacing[16] };

// ❌ BAD - Don't hard-code
const styles = { padding: '16px', color: '#FF0000' };
```

**For detailed patterns:** See `.github/instructions/lufa-design-system.instructions.md`

### File Naming

- **Components:** PascalCase (e.g., `Button.tsx`, `TextField.tsx`)
- **Utilities:** camelCase (e.g., `formatDate.ts`)
- **Tests:** Match source file with `.test.ts` or `.spec.ts`
- **Configuration:** Standard names (e.g., `vite.config.ts`, `tsconfig.json`)

### Import Organization

1. External dependencies (React, third-party)
2. Internal packages (workspace dependencies)
3. Relative imports (parent directories)
4. Relative imports (same directory)
5. Type imports (grouped separately)
6. Style imports (CSS files last)

### Linting and Formatting

```bash
# Lint all packages
pnpm all:lint

# Format all packages
pnpm all:prettier

# Lint specific package
pnpm --filter @grasdouble/lufa_design-system lint

# Format specific package
pnpm --filter @grasdouble/lufa_design-system prettier
```

Configuration files:

- **ESLint:** `@grasdouble/lufa_config_eslint` packages (basic, node, react)
- **Prettier:** `@grasdouble/lufa_config_prettier` package
- **TypeScript:** `@grasdouble/lufa_config_tsconfig` package (base, node, react-app, react-library)

## Testing Instructions

### Playwright Component Tests

The design system uses **Playwright component testing** for React components.

```bash
# Run component tests for design system
pnpm --filter @grasdouble/lufa_design-system test-ct

# Or run from the package directory
cd packages/design-system/main
pnpm test-ct
```

**Test Configuration:**

- Config file: `packages/design-system/main/playwright-ct.config.ts`
- Test files: Co-located with components as `*.spec.tsx` or in separate test directories
- Uses `@playwright/experimental-ct-react` for component testing

**Testing Guidelines:**

- Test component behavior, not implementation details
- Prioritize user-facing interactions and locators (`getByRole`, `getByLabel`)
- Test accessibility features (keyboard navigation, ARIA, focus management)
- Test all component variants and states
- Use `await expect()` for auto-retrying assertions
- Follow patterns in `.github/instructions/playwright-typescript.instructions.md`

**Example test structure:**

```typescript
import { test, expect } from '@playwright/experimental-ct-react';
import { Button } from './Button';

test('renders with correct variant', async ({ mount }) => {
  const component = await mount(<Button variant="primary">Click me</Button>);
  await expect(component).toContainText('Click me');
  await expect(component).toHaveClass(/btn-primary/);
});
```

### Test Coverage Requirements

- All new components must include Playwright component tests
- Test all variants, states, and interactive behaviors
- Test accessibility features (keyboard, ARIA, focus)
- Cover edge cases and error handling

## Build and Deployment

### Building Packages

```bash
# Build all packages (respects dependency order)
pnpm all:build

# Build design system packages
pnpm ds:all:build

# Build microfrontends
pnpm app:mf:build

# Build specific package
pnpm --filter @grasdouble/lufa_design-system build
```

**Build Order (CRITICAL for design system):**

```bash
# Must be built in this exact order:
pnpm ds:tokens:build       # 1. First - generates CSS and types used by components
pnpm ds:primitives:build   # 2. Then primitives
pnpm ds:main:build         # 3. Then main components (depends on tokens)
pnpm ds:storybook:build    # 4. Finally Storybook

# Or use convenience script that handles order:
pnpm ds:all:build
```

**Why order matters:**

- Tokens package generates CSS custom properties and TypeScript types
- Main components import from tokens package
- Building out of order will cause TypeScript errors

### Preview Built Packages

```bash
# Preview microfrontends
pnpm app:mf:preview

# Preview CDN server
pnpm cdn:autobuild-server:preview
```

### Output Locations

- **Design system components:** `packages/design-system/main/dist/`
- **Microfrontends:** `packages/apps/microfrontend/*/dist/`
- **Storybook:** `packages/design-system/storybook/storybook-static/`
- **Docusaurus:** `packages/design-system/docusaurus/build/`

## Version Management and Releases

### Using Changesets

Lufa uses [Changesets](https://github.com/changesets/changesets) for semantic versioning. See `docs/howto/How-to-use-changeset-in-Lufa.md` for details.

```bash
# Create a changeset after making changes
pnpm changeset

# Select affected packages
# Choose version bump type (major/minor/patch)
# Write clear description
```

**Version Bump Guidelines:**

- **Major:** Breaking changes
- **Minor:** New features (backward compatible)
- **Patch:** Bug fixes

**Automated Release Process:**

- Changesets are tracked in `.changeset/` directory
- GitHub Actions workflow handles versioning and publishing
- Workflow runs on manual trigger from `main` branch
- Publishes to GitHub Package Registry

### Commit Changeset

```bash
git add .changeset/
git commit -m "chore: add changeset for [description]"
```

## Before Committing Changes

**Pre-commit checklist:**

```bash
# 1. Ensure all packages build
pnpm all:build

# 2. Lint all changes
pnpm all:lint

# 3. Format code
pnpm all:prettier

# 4. Run tests for affected packages
pnpm --filter @grasdouble/lufa_design-system test-ct

# 5. Create changeset for user-facing changes
pnpm changeset
```

**Commit message format:** Follow [Conventional Commits](https://www.conventionalcommits.org/)

- `feat(design-system): add Button variants`
- `fix(microfrontend): resolve routing issue`
- `docs: update AGENTS.md`
- `chore: add changeset`

## Common Development Tasks

### Adding a New Package

1. Create directory in appropriate location
2. Add `package.json` with `@grasdouble/` scope name
3. Configure build tooling (Vite, TypeScript)
4. Update workspace patterns in `pnpm-workspace.yaml` if needed
5. Add scripts to root `package.json` if needed
6. Update documentation

### Adding Dependencies

```bash
# Add to specific package
pnpm --filter @grasdouble/lufa_design-system add react-icons

# Add dev dependency
pnpm --filter @grasdouble/lufa_design-system add -D @types/node

# Add dependency to root
pnpm add -w concurrently
```

### Working with Design System

```bash
# Develop component in watch mode
pnpm ds:main:dev

# View in Storybook
pnpm ds:storybook:dev

# Build all design system packages
pnpm ds:all:build

# Lint design system
pnpm ds:all:lint
```

### Working with Microfrontends

```bash
# Run main-container and home together
pnpm app:mf:dev

# Run individual microfrontend
pnpm --filter @grasdouble/lufa_microfrontend_home dev

# Build for production
pnpm app:mf:build
```

## Code Patterns and Examples

### Common Patterns in This Codebase

#### Pattern 1: Creating a Design System Component

**Complete workflow from tokens to tests:**

```typescript
// Step 1: Ensure tokens exist in packages/design-system/tokens/
// If not, add them first, then run: pnpm ds:tokens:build

// Step 2: Create component file
// File: packages/design-system/main/src/components/Button.tsx

import type { ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';

// ✅ ALWAYS import from tokens
import { color, spacing, fontSize } from '@grasdouble/lufa_design-system-tokens';

// Step 3: Define props interface with JSDoc
export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  /**
   * Visual variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'ghost';

  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  children: React.ReactNode;
}

// Step 4: Implement component with accessibility
export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

// Step 5: Set displayName
Button.displayName = 'Button';

// Step 6: Export from packages/design-system/main/src/index.ts
// export { Button, type ButtonProps } from './components/Button';
```

#### Pattern 2: Writing Playwright Component Tests

```typescript
// File: packages/design-system/main/src/components/Button.spec.tsx

import { test, expect } from '@playwright/experimental-ct-react';
import { Button } from './Button';

test.describe('Button Component', () => {
  test('renders with correct text', async ({ mount }) => {
    const component = await mount(<Button>Click me</Button>);
    await expect(component).toContainText('Click me');
  });

  test('handles click events', async ({ mount }) => {
    let clicked = false;
    const component = await mount(
      <Button onClick={() => { clicked = true; }}>Click</Button>
    );
    await component.click();
    expect(clicked).toBe(true);
  });

  test('applies variant classes correctly', async ({ mount }) => {
    const component = await mount(<Button variant="primary">Primary</Button>);
    await expect(component).toHaveClass(/btn-primary/);
  });

  test('is keyboard accessible', async ({ mount }) => {
    const component = await mount(<Button>Press me</Button>);
    await component.focus();
    await expect(component).toBeFocused();
  });
});
```

#### Pattern 3: Using Changesets for Version Management

```bash
# After making changes to components
pnpm changeset

# Interactive prompts:
# 1. Select affected packages (use space to select, enter to confirm)
# 2. Choose version bump type:
#    - major: Breaking changes
#    - minor: New features (backward compatible)
#    - patch: Bug fixes
# 3. Write clear description of changes

# Commit the changeset
git add .changeset/
git commit -m "chore: add changeset for button component variants"
```

#### Pattern 4: Working with Monorepo Packages

```bash
# Find package name
pnpm list --recursive --depth 0 | grep design-system

# Install dependency to specific package
pnpm --filter @grasdouble/lufa_design-system add clsx

# Build specific package
pnpm --filter @grasdouble/lufa_design-system build

# Build all packages with pattern
pnpm --filter @grasdouble/lufa_design-system-* build

# Run command in package directory
cd packages/design-system/main
pnpm test-ct
```

#### Pattern 5: CSS with Design Tokens

```css
/* File: packages/design-system/main/src/components/Button.css */

@layer components {
  .btn {
    /* ✅ Use tokens via CSS custom properties */
    padding: var(--lufa-spacing-default);
    font-size: var(--lufa-font-size-body);
    font-weight: var(--lufa-font-weight-semibold);
    border-radius: var(--lufa-radius-base);
    transition: var(--lufa-transition-fast);
    cursor: pointer;

    /* ❌ Don't hard-code values */
    /* padding: 16px; */
    /* font-size: 14px; */
  }

  .btn:hover {
    transform: translateY(-1px);
  }

  .btn:focus-visible {
    outline: 2px solid var(--lufa-color-border-focus);
    outline-offset: 2px;
  }

  .btn-primary {
    background: var(--lufa-color-background-primary);
    color: var(--lufa-color-text-inverse);
  }

  .btn-primary:hover {
    background: var(--lufa-color-background-primary-hover);
  }
}
```

---

### Design System Component Pattern

**Correct component structure:**

````typescript
import type { ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';

// Always import from tokens, never from primitives
import { color, spacing, fontSize } from '@grasdouble/lufa_design-system-tokens';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  /**
   * Visual variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'ghost';

  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  children: React.ReactNode;
}

/**
 * Button component with multiple variants and sizes.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */
export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

Button.displayName = 'Button';
````

**CSS with tokens (use CSS custom properties):**

```css
@layer components {
  .btn {
    /* ✅ Use tokens via CSS custom properties */
    padding: var(--lufa-spacing-default);
    font-size: var(--lufa-font-size-body);
    border-radius: var(--lufa-radius-base);
    transition: var(--lufa-transition-fast);

    /* ❌ Don't hard-code values */
    /* padding: 16px; */
    /* font-size: 14px; */
  }

  .btn-primary {
    background: var(--lufa-color-background-primary);
    color: var(--lufa-color-text-inverse);
  }

  .btn-primary:hover {
    background: var(--lufa-color-background-primary-hover);
  }
}
```

### Workspace Dependencies Pattern

**In package.json:**

```json
{
  "dependencies": {
    "@grasdouble/lufa_design-system-tokens": "workspace:^",
    "@grasdouble/lufa_design-system-primitives": "workspace:^"
  }
}
```

### Common Mistakes to Avoid

**❌ Don't do this:**

```typescript
// Don't import primitives in components
import { spacing } from '@grasdouble/lufa_design-system-primitives';

// Don't hard-code values
const styles = { padding: '16px', color: '#FF0000' };

// Don't skip displayName
export const Button = (props) => {
  /* ... */
};
```

**✅ Do this instead:**

```typescript
// Import tokens
import { color, spacing } from '@grasdouble/lufa_design-system-tokens';

// Use tokens
const styles = {
  padding: spacing.default,
  color: color.text.primary,
};

// Set displayName
export const Button = (props) => {
  /* ... */
};
Button.displayName = 'Button';
```

## Code Quality Requirements

### Security

- Never commit secrets or credentials
- Validate and sanitize user inputs
- Follow OWASP security best practices
- Reference: `.github/instructions/ai-prompt-engineering-safety-best-practices.instructions.md`

### Performance

- Use `React.memo`, `useMemo`, `useCallback` judiciously (not by default)
- Implement code splitting with dynamic imports when needed
- Lazy load components with `React.lazy` and `Suspense` where appropriate
- Reference: `.github/instructions/performance-optimization.instructions.md`

## Reference Documentation

### Key Documentation Files

**Must-read files:**

- [CLAUDE.md](CLAUDE.md) - Critical three-layer design system architecture
- [AGENTS.md](AGENTS.md) - This file (comprehensive development guide)
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution workflow and git practices

**Technology-specific instructions** (`.github/instructions/`):

- `lufa-design-system.instructions.md` - Design system standards (detailed patterns)
- `a11y.instructions.md` - Accessibility guidelines (WCAG 2.1 AA)
- `reactjs.instructions.md` - React best practices
- `tailwindcss.instructions.md` - Tailwind CSS patterns
- `typescript-5-es2022.instructions.md` - TypeScript guidelines
- `playwright-typescript.instructions.md` - Playwright testing
- `performance-optimization.instructions.md` - Performance patterns

**How-to guides** (`docs/howto/`):

- `How-to-use-changeset-in-Lufa.md` - Version management with Changesets

### Documentation Commands

```bash
# Build Storybook (component explorer)
pnpm ds:storybook:build

# Build Docusaurus (design system docs)
pnpm ds:documentation:build

# Generate dependency report
pnpm tools:generate-outdated-report
```

## Troubleshooting for AI Agents

### Build Failures

**Most common cause:** Design system packages built out of order

```bash
# Solution: Build in correct order
pnpm ds:tokens:build       # 1. Tokens first (generates types)
pnpm ds:primitives:build   # 2. Then primitives
pnpm ds:main:build         # 3. Then components
pnpm ds:storybook:build    # 4. Finally Storybook

# Or use convenience script:
pnpm ds:all:build
```

**If clean rebuild needed:**

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm all:build
```

### TypeScript Errors

**Symptoms:** "Cannot find module '@grasdouble/lufa_design-system-tokens'" or similar

**Causes and solutions:**

1. **Tokens not built:** Run `pnpm ds:tokens:build`
2. **Wrong import path:** Verify package name in `package.json`
3. **Missing workspace dependency:** Check `workspace:^` protocol is used
4. **Types not exported:** Verify package exports types in `package.json`

### Import Resolution Issues

**Check these:**

1. Package is built: `pnpm --filter @grasdouble/package-name build`
2. Workspace protocol used: `"@grasdouble/lufa_design-system-tokens": "workspace:^"`
3. Package name matches exactly (check `package.json` `name` field)
4. Types are exported in package's `package.json` exports field

### Linting/Formatting Issues

```bash
# Auto-fix formatting
pnpm all:prettier

# Check linting issues
pnpm all:lint
```

## Environment Information

### Required Versions

- **Node.js:** 24.9.0 (specified in `.tool-versions`)
- **pnpm:** 10.26.x or later (currently 10.8.1+)
- Check versions: `node -v` and `pnpm -v`

### Workspace Protocol

All internal dependencies must use `workspace:^` protocol:

```json
{
  "dependencies": {
    "@grasdouble/lufa_design-system-tokens": "workspace:^"
  }
}
```

### CI/CD Information

- **Workflows location:** `.github/workflows/`
- **Release automation:** `changeset-release.yml` (manual trigger from `main` branch)
- **Publishing:** GitHub Package Registry
- **Checks:** Linting, building, testing run on PRs

## AI Agent Guidelines

### When Working with Design System Components

1. **Always check CLAUDE.md first** for the three-layer architecture
2. **Verify tokens exist** before creating components
3. **Build tokens before components**: Run `pnpm ds:tokens:build` after token changes
4. **Never skip the build order** - tokens → primitives → main → storybook
5. **Use Read tool** to check existing patterns before creating new components
6. **Reference existing components** in `packages/design-system/main/src/components/`

### Before Making Changes

**Check these files:**

1. Read the package's `package.json` to understand scripts and dependencies
2. Check existing component patterns in the same directory
3. Review `.github/instructions/lufa-design-system.instructions.md` for detailed patterns
4. Look at Storybook stories for usage examples

### When Creating New Components

**Step-by-step process:**

1. Verify or create required tokens in `packages/design-system/tokens/`
2. Run `pnpm ds:tokens:build` to generate CSS and types
3. Create component file in `packages/design-system/main/src/components/`
4. Import tokens (never primitives)
5. Add TypeScript interface with JSDoc
6. Implement accessibility (ARIA, keyboard, focus)
7. Set `displayName`
8. Create Storybook story in `packages/design-system/storybook/src/stories/`
9. Write Playwright component tests
10. Export from `packages/design-system/main/src/index.ts`
11. Create changeset: `pnpm changeset`

### Common AI Agent Mistakes

❌ **Don't:**

- Use Bash `cat` or `grep` when Read or Grep tools are available
- Assume test scripts exist (check package.json first)
- Skip building tokens before components
- Import from primitives in components
- Forget to set `displayName`
- Skip creating changesets for user-facing changes

✅ **Do:**

- Use Read tool for file reading
- Use Grep tool for searching
- Verify commands exist in package.json before suggesting them
- Check build order for design system
- Follow the three-layer architecture strictly
- Create changesets for releases

### Tool Usage Recommendations

**For this codebase:**

- Use `Read` to examine component patterns
- Use `Grep` to search for similar implementations
- Use `Glob` to find component files
- Use `Bash` for git operations and running scripts
- Use `Edit` to modify existing files
- Use `Write` only for new files (prefer Edit)

## Quick Command Reference

### Essential Commands

```bash
# Setup
pnpm install              # Install all dependencies
pnpm all:build            # Build all packages

# Development
pnpm app:mf:dev           # Microfrontends (main-container :3000, home :3001)
pnpm ds:storybook:dev     # Storybook (:6006)
pnpm ds:main:dev          # Design system watch mode

# Design System Build (correct order)
pnpm ds:tokens:build      # 1. Tokens first
pnpm ds:primitives:build  # 2. Then primitives
pnpm ds:main:build        # 3. Then components
pnpm ds:all:build         # Or use this (handles order)

# Code Quality
pnpm all:lint             # Lint all packages
pnpm all:prettier         # Format all packages

# Testing
pnpm --filter @grasdouble/lufa_design-system test-ct

# Version Management
pnpm changeset            # Create changeset for releases
```

### Package Filter Syntax

```bash
# Specific package
pnpm --filter @grasdouble/lufa_design-system [command]
pnpm --filter @grasdouble/lufa_microfrontend_home [command]

# Pattern matching (all design system packages)
pnpm --filter @grasdouble/lufa_design-system-* [command]

# All packages with @grasdouble scope
pnpm --filter @grasdouble/* [command]
```

### Key Directory Paths

```
packages/design-system/main/          # Main design system components
packages/design-system/tokens/        # Design tokens (semantic)
packages/design-system/primitives/    # Primitives (raw values)
packages/apps/microfrontend/main-container/  # Main container
packages/apps/microfrontend/home/     # Home microfrontend
packages/cdn/autobuild-server/        # CDN autobuild server
```

---

## 🤖 AI Agent Compatibility

This project follows the [AGENTS.md standard](https://agents.md/) and maintains compatibility with multiple AI coding agents.

### Supported Agents and Their Files

| Agent                        | Primary File                                                       | Status          | Notes                                          |
| ---------------------------- | ------------------------------------------------------------------ | --------------- | ---------------------------------------------- |
| **GitHub Copilot**           | [.github/copilot-instructions.md](.github/copilot-instructions.md) | ✅ Full Support | Path-scoped instructions with YAML frontmatter |
| **Claude Code**              | [CLAUDE.md](CLAUDE.md)                                             | ✅ Full Support | Quick reference, links to AGENTS.md            |
| **OpenAI Codex Extension**   | [config.toml](config.toml)                                         | ✅ Full Support | TOML configuration with custom instructions    |

### File Organization Strategy

```
project-root/
├── AGENTS.md                          # ⭐ Primary source of truth (this file)
├── CLAUDE.md                          # Quick reference for Claude Code
├── config.toml                        # OpenAI Codex Extension configuration
├── .github/
│   ├── copilot-instructions.md       # GitHub Copilot main file
│   ├── instructions/                  # Path-scoped instructions
│   │   ├── *.instructions.md         # With YAML frontmatter
│   │   └── multi-agent-documentation-maintenance.instructions.md  # 📝 Maintenance guide
│   ├── prompts/                       # Reusable AI prompts
│   │   └── README.md                 # Prompts index
│   └── agents/                        # Custom agent definitions
│       └── README.md                 # Custom agents index
└── scripts/
    ├── validate-ai-docs.sh           # Documentation validation
    └── README.md                     # Scripts documentation
    └── index.mdc                      # Cursor IDE rules (optional)
```

### Cross-Agent Best Practices

This project follows these principles for maximum compatibility:

1. **Single Source of Truth**: AGENTS.md contains comprehensive documentation
2. **Agent-Specific Files Reference AGENTS.md**: Avoid duplication
3. **Standard Markdown**: Simple, readable format for all agents
4. **YAML Frontmatter**: Used sparingly (only for GitHub Copilot path-scoping)
5. **Natural Language**: Clear instructions, not cryptic abbreviations

### Documentation Consistency Validation

To prevent desynchronization between AI documentation files, this project includes automated validation:

**Validation Script**: [scripts/validate-ai-docs.sh](scripts/validate-ai-docs.sh)

**What it validates**:
- Three-layer architecture consistency across AGENTS.md, CLAUDE.md, and .github/copilot-instructions.md
- Critical rules (token usage, primitives restrictions) documented in all files
- Build commands consistency
- YAML frontmatter validity in .instructions.md files
- Markdown link integrity
- File size limits (for token optimization)
- Package scope consistency

**Running validation**:
```bash
# Via npm script (recommended)
pnpm validate:docs

# Or directly
bash scripts/validate-ai-docs.sh
```

**CI Integration**: The validation runs automatically on pull requests and pushes to main via [.github/workflows/validate-docs.yml](.github/workflows/validate-docs.yml)

See [scripts/README.md](scripts/README.md) for detailed documentation.

### Maintaining AI Documentation

When the codebase evolves, AI documentation should be kept up-to-date. This project includes comprehensive guidelines for maintaining multi-agent compatible documentation.

**Maintenance Guide**: [.github/instructions/multi-agent-documentation-maintenance.instructions.md](.github/instructions/multi-agent-documentation-maintenance.instructions.md)

**What it covers**:
- **Quick Decision Guide**: Should I update AI docs? What files to update? (decision trees and tables)
- **Templates**: For creating new `.instructions.md` files and prompts
- **Workflows**: Step-by-step instructions for common maintenance tasks
- **Update Order**: Critical sequence to follow when updating multiple files
- **Common Scenarios**: Ready-to-use actions for typical changes
- **Implementation History**: 5 phases documenting how the system evolved

**When to consult this guide**:
- ✅ You just made code changes and wonder if docs need updating
- ✅ You're adding new technology or patterns to the project
- ✅ You want to create new agent-specific instructions
- ✅ You're unsure which documentation files are affected by your changes

**Quick reference**: Start with the "Quick Decision Guide" section for a 2-minute assessment of whether your changes require documentation updates.

### For Contributors Using Different Agents

Regardless of which AI agent you're using, start with this file (AGENTS.md). Agent-specific files provide additional context but this file contains all essential information.

**Quick setup for your agent:**

- **GitHub Copilot**: Already configured via `.github/copilot-instructions.md`
- **Claude Code**: Automatically loads [CLAUDE.md](CLAUDE.md) on startup
- **OpenAI Codex Extension**: Automatically loads [config.toml](config.toml) from project root

---

### Extended Compatibility Matrix

This detailed matrix shows which features are supported by each AI agent.

| Feature                         | GitHub Copilot        | OpenAI Codex Extension       | Claude Code        |
| ------------------------------- | --------------------- | ---------------------------- | ------------------ |
| **AGENTS.md Support**           | ✅ Native             | ✅ Via config.toml           | ✅ Via CLAUDE.md   |
| **Path-Scoped Rules**           | ✅ YAML frontmatter   | ➖                           | ➖                 |
| **YAML Frontmatter**            | ✅ Advanced           | ❌                           | ❌                 |
| **Multiple Instructions Files** | ✅ .instructions.md   | ✅ TOML config               | ✅ Referenced      |
| **Auto-Load on File Open**      | ✅                    | ✅ config.toml               | ✅ CLAUDE.md       |
| **Custom Agents/Skills**        | ✅ Copilot Extensions | ✅ Referenced in config      | ✅ Agent Skills    |
| **Prompts Library**             | ⚠️ Via @workspace     | ✅ Referenced in config      | ⚠️ Via Skill tool  |
| **IDE Integration**             | ✅ VS Code, JetBrains | ✅ VS Code, Cursor, Windsurf | ✅ CLI, VSCode ext |
| **Autonomous Mode**             | ❌                    | ✅ Cloud sandboxes           | ❌                 |
| **Organization-Level Rules**    | ✅                    | ➖                           | ➖                 |
| **Cost**                        | Paid                  | Paid (ChatGPT Plus+)         | Paid               |

**Legend**:

- ✅ Full Support
- ⚠️ Partial Support / Needs Configuration
- 🔄 Community Request / In Progress
- ❓ Unknown / Not Documented
- ➖ Not Applicable / Not Available

### Choosing the Right Agent for Your Workflow

**For This Project (Lufa)**:

| Workflow                      | Recommended Agent(s)           | Why                                               |
| ----------------------------- | ------------------------------ | ------------------------------------------------- |
| **Design System Development** | Claude Code, GitHub Copilot    | CLAUDE.md optimized, path-scoped rules            |
| **Component Testing**         | GitHub Copilot                 | Path-scoped to test files, good test generation   |
| **Documentation Updates**     | Claude Code                    | Good at reading context, following AGENTS.md      |
| **Refactoring**               | GitHub Copilot                 | IDE integration, multi-file changes               |
| **Learning the Codebase**     | Claude Code                    | Can read AGENTS.md comprehensively                |
| **Quick Fixes**               | GitHub Copilot                 | Fastest in-editor suggestions                     |
| **Complex Multi-File Tasks**  | OpenAI Codex Extension         | Autonomous mode, handles full features end-to-end |
| **Async Long-Running Tasks**  | OpenAI Codex Extension         | Cloud sandboxes, work while you focus elsewhere   |

### Agent-Specific Setup Instructions

**GitHub Copilot**:

- ✅ No setup needed - automatically loads `.github/copilot-instructions.md`
- ✅ Path-scoped instructions apply automatically
- 💡 Uses OpenAI Codex/GPT-4 models in background

**Claude Code**:

- ✅ Automatically loads `CLAUDE.md`
- 💡 Can reference AGENTS.md for deep dives

**OpenAI Codex Extension** (VSCode):

- 📦 Install from [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt)
- ✅ Automatically loads `config.toml` from project root
- ⚡ **Different from Copilot**: Autonomous agent mode vs real-time suggestions
- 🔑 Requires ChatGPT Plus/Pro/Business account or OpenAI API key
- ⚙️ Configuration: See [`config.toml`](config.toml) for Lufa-specific settings

**Key Differences Codex vs Copilot**:

| Aspect       | GitHub Copilot                    | OpenAI Codex Extension              |
| ------------ | --------------------------------- | ----------------------------------- |
| **Mode**     | Real-time inline suggestions      | Autonomous task completion          |
| **Workflow** | Synchronous (assists as you code) | Asynchronous (completes full tasks) |
| **Scope**    | Code completion, patterns         | End-to-end feature development      |
| **Best For** | Daily coding efficiency           | Complex multi-file tasks            |

💡 **Use Both**: Copilot for daily coding + Codex for larger tasks
