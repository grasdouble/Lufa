# AI Instructions: React Components

## Context

You are creating or modifying React components for the Lufa Design System. These components must be robust, accessible, and strictly typed.

## Technology Stack

- **Framework**: React 18+
- **Language**: TypeScript
- **Styling**: CSS Modules (single file per component)
- **Bundling**: Vite (Library Mode)

## File Structure

Each component resides in its own directory based on its category:

- **Foundation components**: `packages/design-system/main/src/foundation/[ComponentName]/`
- **Content components**: `packages/design-system/main/src/content/[ComponentName]/`
- **Interaction components**: `packages/design-system/main/src/interaction/[ComponentName]/`
- **Composition components**: `packages/design-system/main/src/composition/[ComponentName]/`
- **Utility components**: `packages/design-system/main/src/utility/[ComponentName]/`

Within each component directory:

- `[ComponentName].tsx`: Main component logic.
- `[ComponentName].module.css`: All component styles (auto-generated from the utilities config).
- `[component-name].utilities.config.cjs`: CSS utility class definitions used by the `generate-utilities.cjs` script to produce `[ComponentName].module.css`.
- `index.ts`: Public export.

## Coding Standards

### 1. Component Definition

- Use **functional components** with `forwardRef`.
- Use `clsx` for class name composition.
- Export components with `displayName` via `Object.assign`.
- **Polymorphism**: Support the `as` prop pattern using Generics (see Button example).

### 2. TypeScript Props

- Define explicit prop types.
- Extend HTML attributes where appropriate (`ComponentPropsWithoutRef`).
- Use specific types over `any` or `unknown`.
- Group props logically (Visual, Content, Behavior).

### 3. Styling Rules (CSS Modules)

- **No CSS-in-JS**. Use strictly CSS Modules.
- Use **Design Tokens** (CSS variables) for all values.
  - Correct: `color: var(--lufa-color-text-primary);`
  - Incorrect: `color: #333;`
- **Single CSS file**: All styles (layout, colors, variants, interactions) live in one `[ComponentName].module.css` file that is auto-generated from the `[component-name].utilities.config.cjs` configuration.

### 4. Accessibility (a11y)

- Support keyboard navigation.
- Manage `aria-*` attributes dynamically based on state (disabled, loading, expanded).
- Ensure color contrast ratios meet WCAG AA via token selection.

### 5. Documentation (Code Comments)

- Add JSDoc comments to the Component and all Props.
- Include `@example` blocks in JSDoc for complex props.

## Template

```tsx
import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { forwardRef } from 'react';
import { clsx } from 'clsx';

import styles from './Component.module.css';

export type ComponentProps<T extends ElementType = 'div'> = {
  /**
   * HTML element to render
   * @default 'div'
   */
  as?: T;

  variant?: 'primary' | 'secondary';

  className?: string;
  // ... other props
};

export type ComponentComponentProps<T extends ElementType> = ComponentProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ComponentProps<T>>;

// ============================================
// COMPONENT
// ============================================

/**
 * Component implementation with ref forwarding
 */
const ComponentImpl = <T extends ElementType = 'div'>(
  { as, variant = 'primary', className, ...htmlProps }: ComponentComponentProps<T>,
  ref: React.ForwardedRef<Element>
) => {
  const Component = as ?? 'div';

  const componentClassName = clsx(styles.root, variant && styles[`variant-${variant}`], className);

  return <Component ref={ref as React.Ref<never>} className={componentClassName} {...htmlProps} />;
};

// Forward ref with generic type support
const ComponentWithRef = forwardRef(ComponentImpl) as <T extends ElementType = 'div'>(
  props: ComponentComponentProps<T> & { ref?: React.Ref<React.ComponentRef<T>> }
) => React.ReactElement;

// Export with displayName
export const Component = Object.assign(ComponentWithRef, { displayName: 'Component' });
```

## Checklist for Validation

- [ ] Is `forwardRef` implemented correctly with `Object.assign` for `displayName`?
- [ ] Are all styles using CSS Variables (tokens)?
- [ ] Is `[component-name].utilities.config.cjs` created for CSS generation?
- [ ] Are prop types exhaustive and commented?
- [ ] Is the `displayName` set via `Object.assign`?
- [ ] Is `index.ts` updated to export the new component?
