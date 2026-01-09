---
agent: agent
description: 'Create, update, or refactor Lufa Design System components, tokens, and primitives'
tools:
  [
    'search/changes',
    'search/codebase',
    'edit/editFiles',
    'web/fetch',
    'web/githubRepo',
    'read/problems',
    'execute/getTerminalOutput',
    'execute/runInTerminal',
    'read/terminalLastCommand',
    'read/terminalSelection',
    'execute/createAndRunTask',
    'search',
    'search/searchResults',
    'search/usages',
  ]
model: 'Claude Sonnet 4.5'
---

# Lufa Design System Development

Build, maintain, and enhance the Lufa Design System with a focus on accessibility, consistency, and developer experience.

## Objective

Create or update design system components, tokens, or primitives following the three-layer architecture:

1. **Primitives**: Non-semantic foundational values (value-based keys for numeric scales; descriptive keys where needed)
2. **Tokens**: Semantic design decisions (purpose-based naming)
3. **Components**: Accessible React components (built with tokens)

## Process

### 1. Understand Requirements

**Identify the Layer**

- [ ] Is this about primitives, tokens, or components?
- [ ] What design requirements need to be met?
- [ ] Are there existing patterns to follow or extend?
- [ ] What accessibility considerations are needed?

**Gather Context**

- Search codebase for similar components or patterns
- Review existing primitives and tokens
- Check component organization and structure
- Identify reusable patterns and utilities
- Review Storybook for visual patterns

### 2. Plan the Implementation

**For Primitives**

- Use actual values as keys for numeric scales (pixels, milliseconds, numeric)
- Allow descriptive keys where numeric values are awkward (line height, letter spacing, blur)
- Keep non-semantic (no `small`, `medium`, `large` for spacing/size scales)
- Export TypeScript objects and CSS custom properties
- Document purpose and usage

**For Tokens**

- Create semantic, purpose-driven names
- Map to existing primitives (never hard-code values)
- Organize by context (color, spacing, typography)
- Support theming and customization
- Generate CSS custom properties

**For Components**

- Design clear, intuitive props API
- Plan variants using design tokens
- Consider composition patterns
- Map accessibility requirements (ARIA, keyboard, focus)
- Plan responsive behavior (mobile-first)
- Identify testing needs

### 3. Implementation Steps

#### A. Create or Update Primitives

```typescript
// File: packages/design-system/primitives/src/{category}.ts

/**
 * {Category} primitives using actual values as keys
 * for maximum clarity and precision.
 */
export const {category} = {
  0: '0px',    // or appropriate unit
  4: '4px',
  8: '8px',
  // ... more values
} as const;

// Export type
export type {Category}Primitive = typeof {category};
export type {Category}Value = keyof typeof {category};
```

**Generate CSS Custom Properties**:

```typescript
// File: packages/design-system/primitives/src/css-variables.ts

export const generatePrimitiveVars = () => {
  return `
    :root {
      --lufa-primitive-{category}-{value}: ${value};
    }
  `;
};
```

#### B. Create or Update Tokens

```typescript
// File: packages/design-system/tokens/src/{category}.ts

import primitives from '@grasdouble/lufa_design-system-primitives';

/**
 * {Category} tokens with semantic, purpose-driven names.
 */
export const {category}Tokens = {
  primary: primitives.{primitive}[{value}],
  secondary: primitives.{primitive}[{value}],
  // ... more semantic mappings
} as const;

// Export type
export type {Category}Token = typeof {category}Tokens;
export type {Category}Key = keyof typeof {category}Tokens;
```

**Generate CSS Custom Properties**:

```typescript
// File: packages/design-system/tokens/src/css-variables.ts

export const generateTokenVars = () => {
  return `
    :root {
      --lufa-token-{category}-{semantic}: ${value};
    }
  `;
};
```

#### C. Create or Update Components

**1. Component File Structure**:

````typescript
// File: packages/design-system/main/src/components/{category}/{Component}.tsx

import type { ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';

export interface {Component}Props extends ComponentPropsWithoutRef<'{element}'> {
  /**
   * Visual variant
   * @default 'default'
   */
  variant?: 'primary' | 'secondary' | 'ghost';

  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Component content
   */
  children: React.ReactNode;
}

/**
 * {Component} - {Brief description}
 *
 * @example
 * ```tsx
 * <{Component} variant="primary" size="md">
 *   Content
 * </{Component}>
 * ```
 */
export const {Component} = ({
  variant = 'default',
  size = 'md',
  children,
  className,
  ...props
}: {Component}Props) => {
  return (
    <{element}
      className={clsx(
        '{component-base-class}',
        `{component-class}-${variant}`,
        `{component-class}-${size}`,
        className
      )}
      {...props}
    >
      {children}
    </{element}>
  );
};

{Component}.displayName = '{Component}';
````

**2. Styles (if needed)**:

```css
/* File: packages/design-system/main/src/components/{category}/{Component}.css */

@layer components {
  .{component-class} {
    /* Use tokens via CSS custom properties */
    padding: var(--lufa-token-spacing-base);
    font-size: var(--lufa-token-font-size-base);
    border-radius: var(--lufa-token-radius-base);
    transition: var(--lufa-token-transition-fast);
  }

  .{component-class}:hover {
    transform: var(--lufa-token-transform-hover-lift);
  }

  .{component-class}:focus-visible {
    outline: var(--lufa-token-border-width-focus) solid var(--lufa-token-color-border-focus);
    outline-offset: var(--lufa-token-spacing-xs);
  }

  /* Variants */
  .{component-class}-primary {
    background: var(--lufa-token-color-interactive-default);
    color: var(--lufa-token-color-text-inverse);
  }

  /* Sizes */
  .{component-class}-sm {
    padding: var(--lufa-token-spacing-sm);
    font-size: var(--lufa-token-font-size-sm);
  }
}
```

**3. Unit Tests**:

```typescript
// File: packages/design-system/main/src/components/{category}/{Component}.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { {Component} } from './{Component}';

describe('{Component}', () => {
  it('renders children correctly', () => {
    render(<{Component}>Test content</{Component}>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    render(<{Component} variant="primary">Test</{Component}>);
    const element = screen.getByText('Test');
    expect(element).toHaveClass('{component-class}-primary');
  });

  it('handles keyboard interaction', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<{Component} onClick={handleClick}>Test</{Component}>);

    const element = screen.getByText('Test');
    element.focus();
    expect(element).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalled();
  });

  it('is accessible', () => {
    const { container } = render(
      <{Component} aria-label="Test component">Content</{Component}>
    );

    // Add accessibility assertions
    expect(container.firstChild).toHaveAttribute('aria-label', 'Test component');
  });
});
```

**4. Storybook Story**:

```typescript
// File: packages/design-system/main/src/components/{category}/{Component}.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { {Component} } from './{Component}';

const meta: Meta<typeof {Component}> = {
  title: 'Components/{Category}/{Component}',
  component: {Component},
  parameters: {
    docs: {
      description: {
        component: '{Component description and purpose}',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof {Component}>;

export const Default: Story = {
  args: {
    children: 'Default {Component}',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <{Component} variant="primary">Primary</{Component}>
      <{Component} variant="secondary">Secondary</{Component}>
      <{Component} variant="ghost">Ghost</{Component}>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <{Component} size="sm">Small</{Component}>
      <{Component} size="md">Medium</{Component}>
      <{Component} size="lg">Large</{Component}>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [count, setCount] = useState(0);
    return (
      <{Component} onClick={() => setCount(c => c + 1)}>
        Clicked {count} times
      </{Component}>
    );
  },
};
```

**5. Export Component**:

```typescript
// File: packages/design-system/main/src/components/{category}/index.ts

export { {Component} } from './{Component}';
export type { {Component}Props } from './{Component}';
```

```typescript
// File: packages/design-system/main/src/index.ts

export * from './components/{category}';
```

### 4. Documentation

**Update README**:

```markdown
## {Component}

{Brief description}

### Usage

\`\`\`tsx
import { {Component} } from '@grasdouble/lufa_design-system';

<{Component} variant="primary" size="md">
Content
</{Component}>
\`\`\`

### Props

| Prop     | Type      | Default   | Description          |
| -------- | --------- | --------- | -------------------- |
| variant  | string    | 'default' | Visual style variant |
| size     | string    | 'md'      | Size variant         |
| children | ReactNode | -         | Component content    |

### Accessibility

- Keyboard navigation: {keys and behaviors}
- ARIA attributes: {attributes used}
- Screen reader support: {announcements}
```

### 5. Testing & Validation

**Run Tests**:

```bash
# Run unit tests
cd packages/design-system/main
pnpm test

# Run in watch mode during development
pnpm test --watch
```

**Check Linting**:

```bash
# Lint code
pnpm lint

# Fix auto-fixable issues
pnpm lint --fix
```

**Format Code**:

```bash
pnpm prettier
```

**Build and Verify**:

```bash
# Build the package
pnpm build

# Verify types
pnpm build:types
```

**Test in Storybook**:

```bash
# Start Storybook
cd packages/design-system/storybook
pnpm dev

# Build Storybook
pnpm build
```

**Accessibility Testing**:

- Test keyboard navigation (Tab, Enter, Escape, Arrow keys)
- Verify focus indicators are visible
- Check color contrast (min 4.5:1 for text)
- Test with screen reader (VoiceOver, NVDA, JAWS)
- Validate ARIA attributes
- Run automated a11y tests (Storybook a11y addon)

### 6. Quality Checklist

Before completing, verify:

- [ ] Code follows TypeScript strict mode
- [ ] All props have proper TypeScript types and JSDoc
- [ ] Component uses tokens (not primitives or hard-coded values)
- [ ] Accessibility features implemented (ARIA, keyboard, focus)
- [ ] Responsive design (mobile-first approach)
- [ ] Unit tests cover functionality and accessibility
- [ ] Storybook story shows all variants
- [ ] Documentation is complete (JSDoc, README, Storybook)
- [ ] Code is linted and formatted
- [ ] Component exported from package index
- [ ] No console errors or warnings
- [ ] Build succeeds without errors
- [ ] CHANGELOG updated (create changeset)

## Examples

### Example: Create a Badge Component

**1. Component Implementation**:

````typescript
// packages/design-system/main/src/components/display/Badge.tsx

import type { ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';

export interface BadgeProps extends ComponentPropsWithoutRef<'span'> {
  /** Visual variant @default 'default' */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';

  /** Size variant @default 'md' */
  size?: 'sm' | 'md' | 'lg';

  /** Badge content */
  children: React.ReactNode;
}

/**
 * Badge component for labels, tags, and status indicators.
 *
 * @example
 * ```tsx
 * <Badge variant="success" size="sm">Active</Badge>
 * ```
 */
export const Badge = ({
  variant = 'default',
  size = 'md',
  children,
  className,
  ...props
}: BadgeProps) => {
  return (
    <span
      className={clsx(
        'badge',
        `badge-${variant}`,
        `badge-${size}`,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

Badge.displayName = 'Badge';
````

**2. Styles**:

```css
@layer components {
  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--lufa-token-spacing-xs) var(--lufa-token-spacing-sm);
    font-size: var(--lufa-token-font-size-sm);
    font-weight: var(--lufa-token-font-weight-semibold);
    border-radius: var(--lufa-token-radius-full);
    white-space: nowrap;
  }

  .badge-default {
    background: var(--lufa-token-color-background-secondary);
    color: var(--lufa-token-color-text-primary);
  }

  .badge-success {
    background: var(--lufa-token-color-success-light);
    color: var(--lufa-token-color-success-text);
  }

  .badge-sm {
    padding: var(--lufa-token-spacing-xxs) var(--lufa-token-spacing-xs);
    font-size: var(--lufa-token-font-size-xs);
  }
}
```

**3. Tests**:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    render(<Badge variant="success">Success</Badge>);
    expect(screen.getByText('Success')).toHaveClass('badge-success');
  });
});
```

**4. Story**:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Display/Badge',
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: 'Badge' },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
    </div>
  ),
};
```

## Common Patterns

### Compound Components

For complex components with multiple parts:

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

// Usage:
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
</Card>
```

### Polymorphic Components

For components that can render as different elements:

```typescript
type PolymorphicProps<E extends React.ElementType> = {
  as?: E;
  children: React.ReactNode;
} & ComponentPropsWithoutRef<E>;

export const Text = <E extends React.ElementType = 'p'>({
  as,
  children,
  ...props
}: PolymorphicProps<E>) => {
  const Component = as || 'p';
  return <Component {...props}>{children}</Component>;
};
```

### Controlled/Uncontrolled Pattern

For form components:

```typescript
export const Input = ({
  value: controlledValue,
  defaultValue,
  onChange,
  ...props
}: InputProps) => {
  const [value, setValue] = useState(defaultValue || '');
  const isControlled = controlledValue !== undefined;

  const currentValue = isControlled ? controlledValue : value;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setValue(e.target.value);
    onChange?.(e);
  };

  return <input value={currentValue} onChange={handleChange} {...props} />;
};
```

## Resources

- [Lufa Design System Documentation](../design-system/documentation)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [HeadlessUI](https://headlessui.com)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [A11y Project](https://www.a11yproject.com)

## Troubleshooting

**Build Errors**:

- Check TypeScript types are correct
- Verify all imports are valid
- Ensure exports are properly defined

**Test Failures**:

- Check component renders correctly
- Verify event handlers work
- Test accessibility features

**Style Issues**:

- Ensure tokens are properly imported
- Check CSS class names match
- Verify Tailwind CSS is configured correctly

**Storybook Issues**:

- Check story syntax is correct
- Verify component is exported
- Ensure dependencies are installed
