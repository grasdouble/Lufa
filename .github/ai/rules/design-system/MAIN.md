# Design System Main Package - Development Rules

> **Package**: `@grasdouble/lufa_design-system`  
> **Location**: `packages/design-system/main/`  
> **Last Updated**: December 13, 2025

## Overview

Development guidelines for working on the core design system package. This package exports all components, primitives, and tokens.

> **Architecture Reference**: See [../../architecture/design-system/MAIN.md](../../architecture/design-system/MAIN.md) for complete package architecture

## 🏗️ Creating a New Component

### 1. Component Structure

Create component in appropriate category:

```
src/components/{category}/{ComponentName}/
├── ComponentName.tsx           # Component logic
├── ComponentName.module.css    # Scoped styles
├── index.ts                    # Exports
└── README.md (optional)        # Component docs
```

**Categories**:

- `forms/` - Interactive form elements (Button, Input, Select, etc.)
- `display/` - Display components (Card, Badge, Avatar, etc.)
- `layout/` - Layout components (Stack, Divider, Placeholder, etc.)
- `feedback/` - Feedback components (Alert, Spinner, Toast, etc.)
- `overlay/` - Overlay components (Modal, Dropdown, Popover, etc.)

### 2. Component Template

**ComponentName.tsx**:

```typescript
import { forwardRef, HTMLAttributes } from "react";
import styles from "./ComponentName.module.css";

export interface ComponentNameProps extends HTMLAttributes<HTMLDivElement> {
  /** Prop description */
  variant?: "default" | "primary";
  /** Prop description */
  size?: "sm" | "md" | "lg";
}

/** Component description */
export const ComponentName = forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ variant = "default", size = "md", className = "", ...props }, ref) => {
    const classes = [
      styles.component,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return <div ref={ref} className={classes} {...props} />;
  }
);

ComponentName.displayName = "ComponentName";
```

**ComponentName.module.css**:

```css
@reference '../../../tailwind.css';

@layer components {
  .component {
    @apply reset-button; /* Use appropriate reset utility */
    @apply /* ...your styles */;
  }

  .variant-default {
    @apply /* ...variant styles */;
  }

  .size-md {
    @apply /* ...size styles */;
  }
}
```

**index.ts**:

```typescript
export { ComponentName } from "./ComponentName";
export type { ComponentNameProps } from "./ComponentName";
```

### 3. CSS Reset Requirements

**CRITICAL**: All components MUST apply appropriate reset utilities.

See: [`../../architecture/design-system/CSS.md`](../../architecture/design-system/CSS.md)

**Reset Utilities**:

- `<button>` → `@apply reset-button;`
- `<input>`, `<textarea>`, `<select>` → `@apply reset-input;`
- `<h1>`-`<h6>` → `@apply reset-heading;`
- `<ul>`, `<ol>` → `@apply reset-list;`
- `<img>` → `@apply reset-image;`

**Example**:

```css
.button {
  @apply reset-button; /* REQUIRED for <button> elements */
  @apply px-4 py-2 rounded-md;
}
```

### 4. Export Component

Add to `src/components/index.ts`:

```typescript
// Category
export { ComponentName } from "./{category}/ComponentName";
export type { ComponentNameProps } from "./{category}/ComponentName";
```

### 5. Testing in Storybook

Create story in `packages/design-system/storybook/stories/`:

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentName } from "@grasdouble/lufa_design-system";

const meta: Meta<typeof ComponentName> = {
  title: "Components/{Category}/ComponentName",
  component: ComponentName,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {
    children: "Component content",
  },
};
```

## 🎨 Styling Guidelines

### Tailwind Utilities

Use Tailwind utilities via `@apply`:

```css
.component {
  @apply flex items-center gap-2;
  @apply rounded-md border border-gray-200;
  @apply px-4 py-2;
}
```

### Design Tokens

Use token CSS variables for values:

```css
.component {
  height: var(--lufa-token-height-button);
  cursor: var(--lufa-token-cursor-pointer);
  font-size: var(--lufa-typography-body-font-size);
}
```

### Color System

Use semantic color utilities:

```css
.button-primary {
  @apply bg-interactive-primary text-white;
  @apply hover:bg-interactive-primary-hover;
}

.button-danger {
  @apply bg-error-default text-white;
  @apply hover:bg-error-hover;
}
```

### Dark Mode

Use `dark:` variant automatically:

```css
.component {
  @apply bg-white dark:bg-gray-900;
  @apply text-gray-900 dark:text-gray-100;
}
```

## 📦 TypeScript Guidelines

### Props Interface

```typescript
export interface ComponentProps extends HTMLAttributes<HTMLElement> {
  /** Required props with description */
  variant: "default" | "primary";

  /** Optional props with default value */
  size?: "sm" | "md" | "lg";

  /** Custom prop types */
  onCustomEvent?: (value: string) => void;
}
```

### ForwardRef Pattern

Always use `forwardRef` for DOM access:

```typescript
export const Component = forwardRef<HTMLDivElement, ComponentProps>(
  (props, ref) => {
    return <div ref={ref} {...props} />;
  }
);

Component.displayName = "Component";
```

### Type Exports

Export both component and types:

```typescript
export { Component } from "./Component";
export type { ComponentProps } from "./Component";
```

## 🔧 Build & Test

### Local Development

```bash
cd packages/design-system/main
pnpm dev    # Watch mode
```

### Build

```bash
pnpm build  # Production build
```

**Output**:

- `dist/lufa-ui.mjs` - ES module
- `dist/style.css` - Bundled CSS
- `dist/index.d.ts` - TypeScript declarations

### Test in Storybook

```bash
cd packages/design-system/storybook
pnpm dev    # Start Storybook
```

### Test in Docusaurus

```bash
cd packages/design-system/documentation
pnpm clear  # Clear cache (important!)
pnpm start  # Start docs site
```

## ⚠️ Common Pitfalls

### Missing CSS Resets

❌ **Wrong**:

```css
.button {
  @apply px-4 py-2; /* Missing reset! */
}
```

✅ **Correct**:

```css
.button {
  @apply reset-button; /* Always reset first */
  @apply px-4 py-2;
}
```

### Global CSS Pollution

❌ **Wrong**:

```css
h1 {
  margin: 0; /* Don't add global resets! */
}
```

✅ **Correct**:

```css
.heading {
  @apply reset-heading; /* Use component-level reset */
}
```

### Hardcoded Values

❌ **Wrong**:

```css
.button {
  height: 40px; /* Hardcoded */
}
```

✅ **Correct**:

```css
.button {
  height: var(--lufa-token-height-button); /* Use token */
}
```

## 📚 Documentation Requirements

### Component Documentation

Create MDX file in `packages/design-system/documentation/docs/components/`:

```mdx
---
sidebar_position: 1
---

import { ComponentName } from "@grasdouble/lufa_design-system";

# ComponentName

Brief description of the component.

## Usage

\`\`\`jsx
import { ComponentName } from '@grasdouble/lufa_design-system';

<ComponentName variant="primary">Content</ComponentName>
\`\`\`

## Props

| Prop    | Type                   | Default   | Description       |
| ------- | ---------------------- | --------- | ----------------- |
| variant | 'default' \| 'primary' | 'default' | Component variant |
```

### Storybook Stories

Create comprehensive stories showing all variants and states.

## 🔗 Related Documentation

- **CSS Architecture**: [`../../architecture/DESIGN_SYSTEM_CSS.md`](../../architecture/DESIGN_SYSTEM_CSS.md)
- **Primitives**: [`PRIMITIVES.md`](PRIMITIVES.md)
- **Tokens**: [`TOKENS.md`](TOKENS.md)
- **Storybook**: [`STORYBOOK.md`](STORYBOOK.md)
- **Docusaurus**: [`DOCUMENTATION.md`](DOCUMENTATION.md)

---

**Last Updated**: December 13, 2025
