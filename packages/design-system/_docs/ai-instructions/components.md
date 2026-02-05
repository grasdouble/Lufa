# AI Instructions: React Components

## Context

You are creating or modifying React components for the Lufa Design System. These components must be robust, accessible, and strictly typed.

## Technology Stack

- **Framework**: React 18+
- **Language**: TypeScript
- **Styling**: CSS Modules (with `.additional.module.css` separation)
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
- `[ComponentName].module.css`: Core structural styles.
- `[ComponentName].additional.module.css`: Variant/State styles (if needed).
- `index.ts`: Public export.

## Coding Standards

### 1. Component Definition

- Use **functional components** with `forwardRef`.
- Use `clsx` for class name composition.
- Export components with `displayName`.
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
- **Separation of Concerns**:
  - `*.module.css`: Layout, dimensions, base display properties.
  - `*.additional.module.css`: Colors, themes, visual variants, interactions (hover/active).

### 4. Accessibility (a11y)

- Support keyboard navigation.
- Manage `aria-*` attributes dynamically based on state (disabled, loading, expanded).
- Ensure color contrast ratios meet WCAG AA via token selection.

### 5. Documentation (Code Comments)

- Add JSDoc comments to the Component and all Props.
- Include `@example` blocks in JSDoc for complex props.

## Template

```tsx
import { forwardRef } from 'react';
import { clsx } from 'clsx';

import additionalStyles from './Component.additional.module.css';
import styles from './Component.module.css';

export type ComponentProps = {
  variant?: 'primary' | 'secondary';
  // ... other props
};

export const Component = forwardRef<HTMLDivElement, ComponentProps>(
  ({ variant = 'primary', className, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx(styles.root, additionalStyles[`variant-${variant}`], className)} {...props} />
    );
  }
);

Component.displayName = 'Component';
```

## Checklist for Validation

- [ ] Is `forwardRef` implemented correctly?
- [ ] Are all styles using CSS Variables (tokens)?
- [ ] Is logic separated from styles?
- [ ] Are prop types exhaustive and commented?
- [ ] Is the `displayName` set?
