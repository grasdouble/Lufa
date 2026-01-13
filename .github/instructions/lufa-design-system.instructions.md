---
description: 'Lufa Design System development standards for primitives, tokens, and components'
applyTo: 'packages/design-system/**/*.{ts,tsx,js,jsx,css}'
---

# Lufa Design System Development Instructions

Guidelines for developing and maintaining the Lufa Design System, including primitives, tokens, components, and documentation.

> 💡 **Need help?** Use the **"Dev - Lufa Design System"** agent for interactive guidance on building, reviewing, or refactoring components. The agent includes TDD workflow handoffs and complete code templates.

## System Overview

The Lufa Design System follows a three-layer architecture:

1. **Primitives** (`@grasdouble/lufa_design-system-primitives`): Non-semantic foundational values
2. **Tokens** (`@grasdouble/lufa_design-system-tokens`): Semantic design decisions
3. **Components** (`@grasdouble/lufa_design-system`): React component library

## Development Standards

### Primitives Layer

**Purpose**: Provide raw, non-semantic values as building blocks

**Key Principles**:

- Prefer actual values as keys for numeric scales (pixels, milliseconds, numeric values)
- Allow descriptive keys where numeric values are not ergonomic (e.g., `lineHeight.body`, `letterSpacing.readable`, `blur.none`)
- Export both TypeScript objects and CSS custom properties
- Organize by category (spacing, timing, typography, etc.)

**Example Structure**:

```typescript
// ✅ Good: Value-based keys
export const spacing = {
  0: '0px',
  4: '4px',
  8: '8px',
  16: '16px',
  24: '24px',
  32: '32px',
} as const;

export const timing = {
  100: '100ms',
  150: '150ms',
  300: '300ms',
  500: '500ms',
} as const;

// ❌ Bad: Semantic sizing keys in primitives
export const spacing = {
  none: '0px',
  small: '8px',
  medium: '16px',
};
```

**TypeScript Requirements**:

- Use `as const` for immutable value objects
- Export type definitions for all primitives
- Provide JSDoc documentation
- Use strict typing

**CSS Custom Properties**:

- Generate CSS variables for all primitives
- Use naming convention: `--lufa-primitive-{category}-{value}`
- Example: `--lufa-primitive-spacing-16`, `--lufa-primitive-timing-150`, `--lufa-primitive-line-height-body`

### Tokens Layer

**Purpose**: Map primitive values to semantic, purpose-driven names

**Key Principles**:

- Use semantic names that describe purpose, not appearance
- Map to primitives (never hard-code values)
- Organize by context (color, spacing, typography, etc.)
- Support theming and customization

**Example Structure**:

```typescript
import primitives from '@grasdouble/lufa_design-system-primitives';

// ✅ Good: Semantic, purpose-driven names
export const spacingTokens = {
  compact: primitives.spacing[8],
  default: primitives.spacing[16],
  comfortable: primitives.spacing[24],
  spacious: primitives.spacing[32],
} as const;

export const fontSizeTokens = {
  body: primitives.fontSize[16],
  h1: primitives.fontSize[32],
  h2: primitives.fontSize[24],
  small: primitives.fontSize[14],
} as const;

// ❌ Bad: Appearance-based or non-semantic names
export const spacingTokens = {
  xs: primitives.spacing[8],
  sm: primitives.spacing[16],
  red: '#FF0000', // Never hard-code values!
};
```

**Naming Conventions**:

- Use descriptive names: `primary`, `secondary`, `success`, `error`, `warning`
- Context-specific: `text.primary`, `background.primary`, `border.default`, `success.light`
- Size indicators: `compact`, `default`, `comfortable`, `spacious`
- State indicators: `hover`, `active`, `disabled`, `focus`

**CSS Custom Properties**:

- Use naming convention: `--lufa-token-{category}-{variant}`
- Example: `--lufa-token-color-text-primary`, `--lufa-token-spacing-base`

### Components Layer

**Purpose**: Provide accessible, reusable React components

**Key Principles**:

- Use tokens for all styling (never hard-code values or use primitives directly)
- Follow accessibility best practices (WCAG 2.1 AA)
- Implement TypeScript interfaces for all props
- Support composition patterns
- Use Tailwind CSS utilities with token-based customization

**Component Structure**:

````typescript
import type { ComponentPropsWithoutRef } from 'react';
import tokens from '@grasdouble/lufa_design-system-tokens';
import { clsx } from 'clsx';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  /**
   * Visual style variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';

  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Whether the button should take full width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Button content
   */
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
  fullWidth = false,
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
        fullWidth && 'btn-full',
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

**Styling Requirements (CRITICAL)**:

1. **ALWAYS use CSS Modules** - Create a `.module.css` file alongside your component
2. **ONLY use tokens that EXIST** - Verify tokens in `packages/design-system/tokens/dist/style.css` before using
3. **Use Tailwind `@apply` directives** with token-based utilities in CSS Modules

**CSS Module Example**:

```css
/* Button.module.css */
@reference '../../../tailwind.css';

@layer components {
  .button {
    @apply rounded-base;
    @apply duration-base transition-all;
    @apply font-medium;
  }

  .variantPrimary {
    @apply bg-interactive-default;
    @apply text-text-inverse;
  }

  .variantSecondary {
    @apply bg-background-secondary;
    @apply border-border-default border;
    @apply text-text-primary;
  }

  .sizeSmall {
    @apply px-base py-xs text-sm;
  }

  .sizeMedium {
    @apply px-lg py-sm text-base;
  }

  .sizeLarge {
    @apply px-xl py-md text-lg;
  }
}
```

**Import and use in component**:

```typescript
import styles from './Button.module.css';

className={clsx(
  styles.button,
  styles[`variant${variant}`],
  styles[`size${size}`],
  className
)}
```

**Available Token Categories** (always verify in `tokens/dist/style.css`):
- **Colors**: `bg-background-*`, `text-text-*`, `border-border-*`, `bg-interactive-*`
- **Spacing**: `p-*`, `m-*`, `gap-*` (xs, sm, base, md, lg, xl, 2xl, 3xl, 4xl, 5xl)
- **Border**: `rounded-*` (none, xs, sm, md, base, lg, xl, 2xl, 3xl, full)
- **Typography**: `text-*`, `font-*`, `leading-*`
- **Transitions**: `duration-*` (fast, base, slow, slower)
- **Shadows**: `shadow-*` (sm, base, md, lg, xl)

**Design & Visual Quality Requirements**:

- Modern, clean, and professional appearance
- Proper spacing and visual hierarchy using design tokens
- Subtle shadows and depth where appropriate (cards, modals, dropdowns)
- Smooth transitions and animations (use motion tokens)
- Consistent with existing design system aesthetic
- Responsive and mobile-friendly design
- Polished micro-interactions (hover states, active states, focus rings)

**Theming Support (CRITICAL)**:

All components MUST support theming:

1. **Use semantic tokens only** - Never hard-code ANY values (not just colors)
   - ✅ `@apply bg-interactive-default text-text-inverse p-base rounded-base duration-base`
   - ❌ `background: #0284c7; color: white; padding: 16px; border-radius: 8px;`

**Themeable Properties** (not just colors):
- **Colors**: text, background, border, interactive states
- **Spacing**: padding, margin, gap (xs, sm, base, lg, xl, etc.)
- **Border**: widths (hairline, thin, thick), radius (xs, sm, base, lg, xl, full)
- **Typography**: font sizes, weights, line heights, letter spacing
- **Transitions**: durations (fast, base, slow), easing
- **Effects**: opacity, shadows, transforms
- **Dimensions**: component heights, widths (buttons, inputs, modals, etc.)

2. **Theme switching mechanism**:
   - Themes applied via `data-theme` attribute on root element
   - Example: `<html data-theme="ocean">`
   - Available themes: `default`, `ocean`, `forest`

3. **CSS variables pattern**:
   ```css
   /* Tailwind utilities map to CSS variables in theme.css */
   .button {
     @apply bg-interactive-default;      /* → --color-interactive-default */
     @apply hover:bg-interactive-hover;  /* → --color-interactive-hover */
     @apply px-lg py-sm;                 /* → --spacing-lg, --spacing-sm */
     @apply rounded-base;                /* → --border-radius-base */
     @apply duration-base;               /* → --transition-duration-base */
   }
   ```

4. **Testing themes**:
   - Verify component in Storybook with theme switcher
   - Create Playwright tests with theme variations
   - Ensure visual consistency across all themes

**Themes Package**:
```tsx
// Import themes
import '@grasdouble/lufa_design-system-themes/ocean.css';
import '@grasdouble/lufa_design-system-themes/forest.css';

// Switch theme programmatically
document.documentElement.setAttribute('data-theme', 'ocean');
```

**Accessibility Requirements**:

- Include proper ARIA attributes (`aria-label`, `aria-describedby`, etc.)
- Support keyboard navigation (Tab, Enter, Escape, Arrow keys)
- Manage focus states with visible indicators
- Use semantic HTML elements
- Provide alternative text for images/icons
- Ensure proper color contrast (minimum 4.5:1 for text)
- Support screen readers with meaningful announcements

**Component Organization**:

```
components/
├── Typography/      # Text components (Heading, Text, Label)
├── forms/           # Form components (Input, Select, Checkbox)
├── layout/          # Layout components (Container, Grid, Stack)
├── navigation/      # Navigation components (Nav, Tabs, Breadcrumb)
├── feedback/        # Feedback components (Alert, Toast, Progress)
├── overlay/         # Overlay components (Modal, Popover, Tooltip)
├── display/         # Display components (Card, Badge, Avatar)
└── patterns/        # Complex patterns (Search, Pagination)
```

**Styling Guidelines**:

- Use Tailwind CSS utility classes
- Leverage token-based CSS custom properties
- Create component-specific classes in `@layer components`
- Support dark mode via CSS variables
- Implement responsive behavior with mobile-first approach

**Example Styling**:

```css
@layer components {
  .btn {
    /* Use tokens via CSS custom properties */
    padding: var(--lufa-token-spacing-base);
    font-size: var(--lufa-token-font-size-base);
    font-weight: var(--lufa-token-font-weight-semibold);
    border-radius: var(--lufa-token-radius-base);
    transition: var(--lufa-token-transition-fast);
    cursor: var(--lufa-token-cursor-pointer);
  }

  .btn:hover {
    transform: var(--lufa-token-transform-hover-lift);
  }

  .btn:focus-visible {
    outline: var(--lufa-token-border-width-focus) solid var(--lufa-token-color-border-focus);
    outline-offset: var(--lufa-token-spacing-xs);
  }

  .btn-primary {
    background: var(--lufa-token-color-interactive-default);
    color: var(--lufa-token-color-text-inverse);
  }

  .btn-primary:hover {
    background: var(--lufa-token-color-interactive-hover);
  }
}
```

### Testing Requirements

**Unit Tests (Vitest)**:

- Test component behavior and logic
- Verify prop handling and defaults
- Test event handlers
- Check conditional rendering
- Test accessibility features

**Example Test**:

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies variant class correctly', () => {
    render(<Button variant="secondary">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-secondary');
  });

  it('is keyboard accessible', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button');
    button.focus();
    expect(button).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalled();
  });
});
```

**Storybook Stories**:

- Create stories for all component variants
- Document props with controls
- Provide usage examples
- Include accessibility notes

**Example Story**:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Button component with multiple variants and sizes.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};
```

### Documentation Standards

**Component Documentation**:

- Write comprehensive JSDoc comments for all exported components and props
- Include usage examples in JSDoc
- Document accessibility features
- Note any browser-specific behavior
- Provide migration guides for breaking changes

**README Files**:

- Package overview and purpose
- Installation instructions
- Quick start guide
- API documentation
- Usage examples (TypeScript and CSS)
- Contributing guidelines

**Storybook Documentation**:

- Component description and purpose
- Interactive examples with controls
- Code snippets for common use cases
- Accessibility notes and keyboard shortcuts
- Design guidelines and best practices

**Docusaurus Documentation**:

Every component must have a comprehensive documentation page in the Docusaurus site.

**Purpose**: Provide detailed guides, API reference, usage examples, and best practices.

**Location**:

- MDX file: `packages/design-system/docusaurus/docs/components/{category}/{component}.mdx`
- Examples: `packages/design-system/docusaurus/src/dsExamples/{category}/{componentName}.tsx`

**IMPORTANT**: Examples must be created as React components in `src/dsExamples/` and imported in the MDX file. Do NOT use inline code blocks for interactive examples.

**Required Sections**:

1. **Overview** - Component purpose and use cases
2. **Live Demo** - Interactive example component from `dsExamples`
3. **Import** - Import statement
4. **Basic Usage** - Simple code example
5. **Props** - Complete API table with types and defaults
6. **Examples** - All variants, sizes, and states (imported from `dsExamples`)
7. **Accessibility** - Keyboard navigation, ARIA attributes, screen reader behavior
8. **Best Practices** - Do's and don'ts
9. **Related Components** - Links to similar components

**Example Structure**:

Create example components in `src/dsExamples/{category}/{componentName}.tsx`:

```tsx
import { Component } from '@grasdouble/lufa_design-system';

export function LiveDemo() {
  return (
    <div>
      <p className="text-sm text-gray-600 mb-2">Interactive demo:</p>
      <Component variant="primary">Example</Component>
    </div>
  );
}
```

Import in MDX file:

```mdx
import { LiveDemo } from '../../../src/dsExamples/{category}/{componentName}';

<LiveDemo />
```

**CRITICAL: Update Sidebar Navigation**:

After creating the MDX file, you MUST update `sidebars.ts` to make the component appear in navigation:

```typescript
// packages/design-system/docusaurus/sidebars.ts

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'category',
      label: 'Components',
      items: [
        {
          type: 'category',
          label: '{Category}', // Display, Forms, Layout, etc.
          items: [
            'components/{category}/{component-name}', // Add here
          ],
        },
      ],
    },
  ],
};
```

**Example**: Adding Accordion to Display category:
```typescript
{
  type: 'category',
  label: 'Display',
  items: [
    'components/display/accordion', // ← Add this
    'components/display/card',
    'components/display/avatar',
  ],
},
```

**Development Workflow**:

```bash
cd packages/design-system/docusaurus
pnpm dev                    # Start dev server on port 3000
```

**Production Site**: https://lufa-ds.grasdouble.com

**Distinction from Storybook**:

- **Storybook**: Interactive component playground with controls and isolated variants
- **Documentation**: Comprehensive guides, getting started tutorials, complete API reference with examples in `dsExamples/`
- Both are required for complete component documentation

## Version Management

- Use semantic versioning (semver)
- Document all changes in CHANGELOG.md
- Use changesets for release management
- Maintain backward compatibility when possible
- Provide clear migration guides for breaking changes

## Performance Optimization

- Enable tree-shaking by using named exports
- Lazy load components when appropriate
- Optimize bundle size with proper code splitting
- Avoid unnecessary re-renders with React.memo
- Use CSS custom properties for dynamic theming (faster than JS)
- Profile components with React DevTools

## Code Quality

**Linting & Formatting**:

- Use ESLint with React and TypeScript rules
- Format code with Prettier
- Run checks on pre-commit hooks
- Ensure consistent code style across all packages

**TypeScript**:

- Enable strict mode
- Avoid `any` type (use `unknown` or proper types)
- Export all public types and interfaces
- Use type inference when obvious
- Document complex types with comments

**Git Commits**:

- Use conventional commits format
- Write clear, descriptive commit messages
- Reference issues/PRs when applicable
- Keep commits focused and atomic

## Best Practices Checklist

Before creating or modifying components, ensure:

- [ ] **CRITICAL**: Component uses CSS Modules (`.module.css` file created)
- [ ] **CRITICAL**: All tokens used EXIST in `packages/design-system/tokens/dist/style.css`
- [ ] **CRITICAL**: NO inline styles or global CSS - only CSS Modules
- [ ] Component uses tokens via Tailwind utilities (not primitives or hard-coded values)
- [ ] CSS Module imported with `import styles from './Component.module.css'`
- [ ] **CRITICAL**: Component supports theming (uses semantic tokens, no hard-coded colors)
- [ ] Component tested with multiple themes (default, ocean, forest)
- [ ] Visual regression tests include theme variations
- [ ] TypeScript props interface is complete with JSDoc
- [ ] Modern, clean, professional visual appearance
- [ ] Proper spacing, shadows, and transitions using tokens
- [ ] Polished micro-interactions (hover, active, focus states)
- [ ] Accessibility features are implemented (ARIA, keyboard, focus)
- [ ] Component is responsive (mobile-first approach)
- [ ] Unit tests cover core functionality and accessibility
- [ ] Playwright component tests written (render, variants, a11y, visual regression)
- [ ] Storybook story demonstrates all variants
- [ ] Docusaurus documentation page created in `packages/design-system/docusaurus/docs/components/`
- [ ] Example components created in `packages/design-system/docusaurus/src/dsExamples/{category}/`
- [ ] Examples imported in MDX file (NOT inline code blocks)
- [ ] **CRITICAL**: Component added to `packages/design-system/docusaurus/sidebars.ts`
- [ ] Props API table is complete and accurate in documentation
- [ ] Accessibility section documents keyboard navigation and ARIA
- [ ] Documentation is complete (JSDoc, README, Storybook, Docusaurus)
- [ ] Component appears in Docusaurus sidebar navigation
- [ ] Code follows linting and formatting rules
- [ ] Component is exported from package index
- [ ] Documentation site builds successfully (`pnpm ds:documentation:build`)
- [ ] CHANGELOG is updated (via changeset)

## Common Patterns

### Compound Components

```typescript
export const Card = ({ children, className }: CardProps) => (
  <div className={clsx('card', className)}>{children}</div>
);

Card.Header = ({ children, className }: CardHeaderProps) => (
  <div className={clsx('card-header', className)}>{children}</div>
);

Card.Body = ({ children, className }: CardBodyProps) => (
  <div className={clsx('card-body', className)}>{children}</div>
);

Card.Footer = ({ children, className }: CardFooterProps) => (
  <div className={clsx('card-footer', className)}>{children}</div>
);

// Usage
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```

### Polymorphic Components

```typescript
type PolymorphicProps<E extends React.ElementType> = {
  as?: E;
  children: React.ReactNode;
} & ComponentPropsWithoutRef<E>;

export const Box = <E extends React.ElementType = 'div'>({
  as,
  children,
  ...props
}: PolymorphicProps<E>) => {
  const Component = as || 'div';
  return <Component {...props}>{children}</Component>;
};

// Usage
<Box as="section">Section content</Box>
<Box as="article">Article content</Box>
```

### Controlled vs Uncontrolled

```typescript
export const Input = ({
  value: controlledValue,
  defaultValue,
  onChange,
  ...props
}: InputProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  return <input value={value} onChange={handleChange} {...props} />;
};
```

## Design System Package Structure

The design system uses a four-package architecture for separation of concerns:

```
packages/design-system/
├── primitives/              # Raw values (spacing[16], blue[600])
├── tokens/                  # Semantic mappings (spacing.default, color.primary)
├── main/                    # Component library + types
│   └── src/components/      # Component source code
├── storybook/               # Component showcase
│   ├── .storybook/          # Storybook configuration
│   └── src/stories/         # Story files organized by category
├── playwright/              # Component testing
│   ├── playwright-ct.config.ts
│   ├── src/components/      # Test files (.spec.tsx)
│   └── __snapshots__/       # Visual regression snapshots
└── docusaurus/              # Comprehensive documentation site
    ├── docs/                # MDX documentation pages
    ├── docusaurus.config.ts
    └── build/               # Production build output
```

### Package Purposes

| Package           | Purpose                    | Technology                 | Dev Command    | Port |
| ----------------- | -------------------------- | -------------------------- | -------------- | ---- |
| **primitives**    | Raw, non-semantic values   | TypeScript + CSS variables | -              | -    |
| **tokens**        | Semantic design decisions  | TypeScript + CSS variables | -              | -    |
| **main**          | Component library (source) | React 19 + TypeScript      | `pnpm dev`     | -    |
| **storybook**     | Interactive playground     | Storybook 8 + Vite         | `pnpm dev`     | 6006 |
| **playwright**    | Component testing          | Playwright CT + React      | `pnpm test-ct` | -    |
| **docusaurus**    | Comprehensive guides       | Docusaurus 3 + MDX         | `pnpm dev`     | 3000 |

### Why Separate Packages?

- **Storybook**: Independent development environment, doesn't bloat component bundle
- **Playwright**: Test infrastructure isolated from production code
- **Documentation**: Comprehensive guides separate from interactive playground
- **Main**: Clean component library with minimal dependencies

### When to Update Each Package

**When creating a new component:**

1. **main/** - Write component code, TypeScript types, styles
2. **storybook/** - Create `.stories.tsx` for interactive demos
3. **playwright/** - Create `.spec.tsx` with tests (render, variants, a11y, visual regression)
4. **documentation/** - Create `.mdx` page with API docs, examples, best practices

**Complete workflow:**

```bash
# 1. Build component in main package
cd packages/design-system/main
# ... create component files ...

# 2. Create Storybook story
cd ../storybook
# ... create story file ...
pnpm dev  # Verify in Storybook (port 6006)

# 3. Write tests
cd ../playwright
# ... create test file ...
pnpm test-ct  # Run tests

# 4. Document component
cd ../docusaurus
# ... create MDX documentation ...
pnpm dev  # Verify in Docusaurus (port 3000)

# 5. Or run everything concurrently (from root)
cd ../../../..
pnpm ds:all:dev  # Runs Storybook + Documentation + Main watch
```

### Storybook vs Documentation

**Storybook** (Interactive Playground):

- Interactive component demos with live controls
- Isolated variant exploration
- Visual regression baseline
- Quick component previewing during development
- **Audience**: Developers building with components

**Documentation** (Comprehensive Guides):

- Getting started tutorials
- Complete API reference with prop tables
- Accessibility guidelines and keyboard shortcuts
- Best practices and usage patterns
- Design principles and token system explanation
- **Audience**: All stakeholders (developers, designers, product)

**Both are required** for complete component documentation.

## Resources

### Official Documentation

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [HeadlessUI Documentation](https://headlessui.com)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Inclusive Components](https://inclusive-components.design/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)

### Lufa Resources

- **Agent**: Use `Dev - Lufa Design System` agent for interactive help
  - Path: `.github/agents/lufa-design-system-expert.agent.md`
  - Includes TDD workflow, templates, and quality checklists
- **Instructions**: This file (auto-applied to design system files)
- **Project Docs**: See `docs/` folder and AGENTS.md for project-wide guidance
