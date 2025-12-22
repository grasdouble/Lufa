---
description: 'Lufa Design System development standards for primitives, tokens, and components'
applyTo: 'packages/design-system/**/*.{ts,tsx,js,jsx,css}'
---

# Lufa Design System Development Instructions

Guidelines for developing and maintaining the Lufa Design System, including primitives, tokens, components, and documentation.

## System Overview

The Lufa Design System follows a three-layer architecture:

1. **Primitives** (`@grasdouble/lufa_design-system-primitives`): Non-semantic foundational values
2. **Tokens** (`@grasdouble/lufa_design-system-tokens`): Semantic design decisions
3. **Components** (`@grasdouble/lufa_design-system`): React component library

## Development Standards

### Primitives Layer

**Purpose**: Provide raw, non-semantic values as building blocks

**Key Principles**:

- Use actual values as keys (pixels, milliseconds, numeric values)
- Never use semantic names like `small`, `medium`, `large`
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

// ❌ Bad: Semantic keys in primitives
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
- Example: `--lufa-primitive-spacing-16`, `--lufa-primitive-timing-150`

### Tokens Layer

**Purpose**: Map primitive values to semantic, purpose-driven names

**Key Principles**:

- Use semantic names that describe purpose, not appearance
- Map to primitives (never hard-code values)
- Organize by context (color, spacing, typography, etc.)
- Support theming and customization

**Example Structure**:

```typescript
import { fontSize, spacing } from '@grasdouble/lufa_design-system-primitives';

// ✅ Good: Semantic, purpose-driven names
export const spacingTokens = {
  compact: spacing[8],
  default: spacing[16],
  comfortable: spacing[24],
  spacious: spacing[32],
} as const;

export const fontSizeTokens = {
  body: fontSize[16],
  h1: fontSize[32],
  h2: fontSize[24],
  small: fontSize[14],
} as const;

// ❌ Bad: Appearance-based or non-semantic names
export const spacingTokens = {
  xs: spacing[8],
  sm: spacing[16],
  red: '#FF0000', // Never hard-code values!
};
```

**Naming Conventions**:

- Use descriptive names: `primary`, `secondary`, `success`, `error`, `warning`
- Context-specific: `text.primary`, `background.success`, `border.default`
- Size indicators: `compact`, `default`, `comfortable`, `spacious`
- State indicators: `hover`, `active`, `disabled`, `focus`

**CSS Custom Properties**:

- Use naming convention: `--lufa-{category}-{variant}`
- Example: `--lufa-color-text-primary`, `--lufa-spacing-default`

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
import { color, spacing, fontSize } from '@grasdouble/lufa_design-system-tokens';
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
    padding: var(--lufa-spacing-default);
    font-size: var(--lufa-font-size-body);
    font-weight: var(--lufa-font-weight-semibold);
    border-radius: var(--lufa-radius-base);
    transition: var(--lufa-transition-fast);
    cursor: var(--lufa-cursor-pointer);
  }

  .btn:hover {
    transform: var(--lufa-transform-hover-lift);
  }

  .btn:focus-visible {
    outline: var(--lufa-border-width-focus) solid var(--lufa-color-border-focus);
    outline-offset: var(--lufa-spacing-xs);
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

- [ ] Component uses tokens (not primitives or hard-coded values)
- [ ] TypeScript props interface is complete with JSDoc
- [ ] Accessibility features are implemented (ARIA, keyboard, focus)
- [ ] Component is responsive (mobile-first approach)
- [ ] Unit tests cover core functionality and accessibility
- [ ] Storybook story demonstrates all variants
- [ ] Documentation is complete (JSDoc, README, Storybook)
- [ ] Code follows linting and formatting rules
- [ ] Component is exported from package index
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

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [HeadlessUI Documentation](https://headlessui.com)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Inclusive Components](https://inclusive-components.design/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
