---
description: Comprehensive guide for AI agents on writing and maintaining Storybook stories in the Lufa Design System
applyTo:
  - '**/*.stories.tsx'
  - '**/storybook/**'
  - 'packages/design-system/storybook/**'
tags:
  - storybook
  - design-system
  - testing
  - documentation
---

# Storybook Stories - AI Agent Guide

## Purpose

This document provides **comprehensive, systematic guidance** for AI agents writing and maintaining Storybook stories in the Lufa Design System. It focuses on **story creation patterns**, not Storybook configuration.

**Target Audience**: AI coding agents (GitHub Copilot, Claude Code, OpenAI Codex Extension)  
**Scope**: Story file structure, prop-to-story workflow, quality standards  
**Out of Scope**: Storybook configuration, addons, deployment

---

## Philosophy

### Stories Are Visual Demonstrations

Storybook stories in this project serve **one primary purpose**: **visual demonstration of component behavior**.

**What stories ARE**:

- Interactive playgrounds for exploring component props
- Visual comparisons of variants, states, sizes
- Educational examples showing real-world use cases
- Testing grounds for accessibility and responsiveness

**What stories ARE NOT**:

- API documentation (that lives in Docusaurus)
- Comprehensive prop type reference (use JSDoc in component files)
- Automated component test suites (use Playwright for that)

### No Autodocs Strategy

This project **intentionally disables Storybook's autodocs feature**. Why?

1. **Separation of concerns**: Component API docs live in Docusaurus with architectural context
2. **Visual focus**: Stories focus on _showing_ behavior, not _describing_ APIs
3. **Maintenance burden**: Autodocs require maintaining parallel documentation
4. **Token of truth**: Component TypeScript interfaces are the single source of truth

**Implication for AI agents**: When writing stories, prioritize **visual clarity** over documentation completeness. Don't try to document every prop—demonstrate the important ones visually.

---

## Required Stories Structure

Every component MUST have these story types (in priority order):

### 1. Playground Story (HIGHEST PRIORITY)

**Purpose**: Interactive controls for exploring all component props

**Requirements**:

- MUST be named `Playground`
- MUST expose all meaningful props as Storybook controls
- MUST use `args` and `argTypes` for control definitions
- MUST provide sensible default values
- SHOULD demonstrate the component in a realistic context

**Pseudocode**:

```typescript
export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    children: 'Example text',
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
      description: 'Component size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable interactions',
    },
  },
};
```

**Common mistakes**:

- ❌ Hardcoding values instead of using controls
- ❌ Missing important props in argTypes
- ❌ No default values in args
- ❌ Poor control types (text for enums instead of select)

### 2. Variant/State Stories (HIGH PRIORITY)

**Purpose**: Side-by-side visual comparison of all variants/states

**Requirements**:

- MUST show ALL variants/states in a single story
- MUST use consistent layout (grid, flex, stack)
- MUST label each variant clearly
- SHOULD use design tokens for layout spacing
- SHOULD NOT rely on controls (static comparison)

**Pseudocode**:

```typescript
export const AllVariants: Story = {
  render: () => (
    <Flex direction="column" gap="lg">
      {/* Label each variant */}
      <Component variant="primary">Primary Variant</Component>
      <Component variant="secondary">Secondary Variant</Component>
      <Component variant="ghost">Ghost Variant</Component>
    </Flex>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Flex align="center" gap="md">
      <Component size="sm">Small</Component>
      <Component size="md">Medium</Component>
      <Component size="lg">Large</Component>
    </Flex>
  ),
};
```

**Common mistakes**:

- ❌ Only showing default variant
- ❌ Variants look identical (not enough visual distinction)
- ❌ No labels (user can't tell which is which)
- ❌ Hardcoded spacing values

### 3. Use Case Stories (MEDIUM PRIORITY)

**Purpose**: Demonstrate component in realistic application scenarios

**Requirements**:

- MUST show component with realistic content/context
- MUST demonstrate component composition patterns
- SHOULD include multiple examples per story when relevant
- SHOULD use design tokens for all styling
- SHOULD NOT be contrived examples

**Pseudocode**:

```typescript
export const InFormLayout: Story = {
  render: () => (
    <Stack gap="md">
      <Input label="Username" />
      <Input label="Email" type="email" />
      <Button variant="primary">Submit</Button>
    </Stack>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Flex gap="md">
      <Button icon={<SearchIcon />}>Search</Button>
      <Button icon={<SettingsIcon />}>Settings</Button>
    </Flex>
  ),
};
```

**Common mistakes**:

- ❌ Contrived examples that don't reflect real usage
- ❌ Too simple (just a single component with no context)
- ❌ Too complex (entire application layouts)

### 4. Edge Cases (WHEN APPLICABLE)

**Purpose**: Demonstrate component behavior in unusual/boundary conditions

**Requirements**:

- ONLY create when component has interesting edge case behavior
- MUST clearly label what edge case is being demonstrated
- SHOULD include explanation in story description
- EXAMPLES: very long text, empty content, extreme sizes, loading states

**Pseudocode**:

```typescript
export const VeryLongText: Story = {
  render: () => (
    <Button>
      This is an extremely long button label that might cause text overflow
      or wrapping issues depending on the component implementation
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates text overflow handling with very long content',
      },
    },
  },
};

export const EmptyContent: Story = {
  render: () => <Card />,
};
```

**When NOT to create edge case stories**:

- ❌ Component has no interesting edge cases
- ❌ Edge case is invalid usage (should be prevented by types)
- ❌ Behavior is identical to normal usage

---

## Story File Structure

### File Naming and Location

**Pattern**: `ComponentName.stories.tsx`  
**Location**: `packages/design-system/storybook/src/stories/components/{category}/{ComponentName}.stories.tsx`

**Categories**:

- `components/core/` - Buttons, Inputs, Typography
- `components/layout/` - Flex, Grid, Stack, Container
- `components/feedback/` - Alert, Modal, Spinner
- `components/navigation/` - Menu, Tabs, Breadcrumb
- `design-tokens/` - Color, Spacing, Typography tokens
- `foundations/` - Accessibility, Breakpoints, Motion

### Required File Structure

Every story file MUST follow this exact structure:

```typescript
// 1. IMPORTS - Organized in specific order
import type { Meta, StoryObj } from '@storybook/react';

import { ComponentName } from '@grasdouble/lufa_design-system'; // Component
import { tokens } from '@grasdouble/lufa_design-system-tokens'; // Tokens (if needed)

// 2. TYPE DEFINITIONS
type Story = StoryObj<typeof ComponentName>;

// 3. META EXPORT (default export)
const meta: Meta<typeof ComponentName> = {
  title: 'Components/Core/ComponentName', // Category path
  component: ComponentName,
  tags: ['autodocs'], // Standard tag
  parameters: {
    layout: 'centered', // or 'padded', 'fullscreen'
  },
};

export default meta;

// 4. PLAYGROUND STORY (always first)
export const Playground: Story = {
  args: {
    /* defaults */
  },
  argTypes: {
    /* controls */
  },
};

// 5. VARIANT/STATE STORIES
export const AllVariants: Story = {
  /* ... */
};
export const AllSizes: Story = {
  /* ... */
};

// 6. USE CASE STORIES
export const InFormLayout: Story = {
  /* ... */
};
export const WithIcons: Story = {
  /* ... */
};

// 7. EDGE CASE STORIES (if applicable)
export const VeryLongText: Story = {
  /* ... */
};
```

### Import Organization

Always organize imports in this order:

```typescript
// 1. Storybook types

// 5. React hooks (if needed for interactive stories)
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
// 6. Icons or other supporting components
import { SearchIcon } from 'some-icon-library';

// 2. Component being demonstrated

// 4. Layout components (if needed for story composition)
import { ComponentName, Flex, Stack } from '@grasdouble/lufa_design-system';
// 3. Design tokens (if needed for styling)
import { tokens } from '@grasdouble/lufa_design-system-tokens';
```

### Meta Configuration

```typescript
const meta: Meta<typeof ComponentName> = {
  title: 'Category/Subcategory/ComponentName',
  component: ComponentName,
  tags: ['autodocs'], // Always include
  parameters: {
    // Choose appropriate layout
    layout: 'centered', // Component appears in center (most common)
    // layout: 'padded',    // Component has padding around edges
    // layout: 'fullscreen', // Component takes full viewport (rare)

    // Optional: Add custom background colors
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
  },
};
```

### Story Naming Conventions

Use these standard names for stories:

| Story Type           | Name                    | Purpose                                 |
| -------------------- | ----------------------- | --------------------------------------- |
| Interactive controls | `Playground`            | Explore all props                       |
| All variants         | `AllVariants`           | Compare variants side-by-side           |
| All sizes            | `AllSizes`              | Compare sizes side-by-side              |
| All states           | `AllStates`             | Compare states (hover, focus, disabled) |
| Use case             | `{DescriptiveName}`     | E.g., `InFormLayout`, `WithIcons`       |
| Edge case            | `{EdgeCaseDescription}` | E.g., `VeryLongText`, `EmptyContent`    |
| Responsive           | `Responsive{Behavior}`  | E.g., `ResponsiveColumns`               |
| Composition          | `Composed{Pattern}`     | E.g., `ComposedNavigation`              |

---

## Generating Stories from PropTypes

### Manual Analysis Workflow

Storybook stories should be derived from component PropTypes. Since this project doesn't use autodocs, you must **manually analyze** component interfaces.

**Step-by-step process**:

#### Step 1: Read Component File

```typescript
// Example: Read packages/design-system/main/src/components/Button.tsx

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

  /**
   * Disable interactions
   * @default false
   */
  disabled?: boolean;

  /**
   * Button content
   */
  children: React.ReactNode;
}
```

#### Step 2: Identify Story Types Needed

From the interface above, you need:

1. **Playground**: All props with controls
2. **AllVariants**: Show `primary`, `secondary`, `ghost`
3. **AllSizes**: Show `sm`, `md`, `lg`
4. **AllStates**: Show `disabled` state
5. **Use cases**: Realistic examples (with icons, in forms, etc.)

#### Step 3: Map Props to Controls

| Prop       | Type             | Control Type | Options/Config                      |
| ---------- | ---------------- | ------------ | ----------------------------------- |
| `variant`  | Union of strings | `select`     | `['primary', 'secondary', 'ghost']` |
| `size`     | Union of strings | `select`     | `['sm', 'md', 'lg']`                |
| `disabled` | Boolean          | `boolean`    | n/a                                 |
| `children` | ReactNode        | `text`       | Default: `'Button'`                 |
| `onClick`  | Function         | n/a          | Don't expose (use action addon)     |

#### Step 4: Generate argTypes

```typescript
argTypes: {
  variant: {
    control: 'select',
    options: ['primary', 'secondary', 'ghost'],
    description: 'Visual style variant',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'primary' },
    },
  },
  size: {
    control: 'select',
    options: ['sm', 'md', 'lg'],
    description: 'Component size',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'md' },
    },
  },
  disabled: {
    control: 'boolean',
    description: 'Disable user interactions',
  },
  children: {
    control: 'text',
    description: 'Button label or content',
  },
}
```

### Control Type Reference

| PropType            | Storybook Control | Notes                                          |
| ------------------- | ----------------- | ---------------------------------------------- |
| `string`            | `text`            | Freeform text input                            |
| `'a' \| 'b' \| 'c'` | `select`          | Union types → dropdown                         |
| `number`            | `number`          | Number input with increment/decrement          |
| `boolean`           | `boolean`         | Checkbox toggle                                |
| `() => void`        | n/a               | Don't expose functions (use actions addon)     |
| `ReactNode`         | `text`            | Simple text content                            |
| Complex objects     | `object`          | Avoid if possible (hard to use)                |
| Arrays              | n/a               | Don't expose (create separate stories instead) |

### Props to SKIP in Stories

Don't create controls for these prop types:

- ❌ **Standard HTML attributes**: `className`, `style`, `id`, `data-*`
- ❌ **Event handlers**: `onClick`, `onChange`, `onSubmit` (use actions addon if needed)
- ❌ **Refs**: `ref`, `innerRef`
- ❌ **Complex objects/arrays**: Too difficult to control interactively
- ❌ **Children as render functions**: Create separate stories instead

---

## Quality Standards

### Rule 1: Always Use Design Tokens

**CRITICAL**: Stories MUST use design tokens for ALL styling decisions.

#### ✅ CORRECT - Using tokens

```typescript
export const ColorComparison: Story = {
  render: () => (
    <Flex gap="md" style={{ padding: tokens.spacing.lg }}>
      <Placeholder color={tokens.color.background.primary} />
      <Placeholder color={tokens.color.background.secondary} />
    </Flex>
  ),
};
```

#### ❌ WRONG - Hardcoded values

```typescript
export const ColorComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', padding: '24px' }}>
      <Placeholder color="#ffffff" />
      <Placeholder color="#f5f5f5" />
    </div>
  ),
};
```

#### Token Categories Reference

```typescript
// Spacing
tokens.spacing.xs; // 4px
tokens.spacing.sm; // 8px
tokens.spacing.md; // 12px
tokens.spacing.lg; // 24px
tokens.spacing.xl; // 32px
tokens.spacing.xxl; // 48px

// Colors
tokens.color.text.primary;
tokens.color.text.secondary;
tokens.color.background.primary;
tokens.color.background.secondary;
tokens.color.border.default;
tokens.color.border.focus;

// Typography
tokens.typography.fontSize.sm;
tokens.typography.fontSize.md;
tokens.typography.fontSize.lg;
tokens.typography.fontWeight.normal;
tokens.typography.fontWeight.semibold;
tokens.typography.lineHeight.tight;
tokens.typography.lineHeight.normal;

// Radius
tokens.radius.sm;
tokens.radius.md;
tokens.radius.lg;
tokens.radius.full;

// Shadows
tokens.shadow.sm;
tokens.shadow.md;
tokens.shadow.lg;
```

### Rule 2: Make Prop Changes Visible

Stories must **clearly demonstrate** what changing a prop does.

#### Example Problem: Invisible Changes

**Bad story** - `align` prop changes have no visual effect:

```typescript
export const Playground: Story = {
  render: (args) => (
    <Flex {...args}>
      <Placeholder>Item 1</Placeholder>
      <Placeholder>Item 2</Placeholder>
      <Placeholder>Item 3</Placeholder>
    </Flex>
  ),
  args: { align: 'start' },
  argTypes: { align: { control: 'select', options: ['start', 'center', 'end'] } },
};
// Problem: All items have same height, so align has no visible effect!
```

**Good story** - Varying heights make alignment obvious:

```typescript
export const Playground: Story = {
  render: (args) => (
    <Flex {...args} style={{ minHeight: '200px' }}>
      <Placeholder style={{ height: '40px' }}>Small</Placeholder>
      <Placeholder style={{ height: '80px' }}>Medium</Placeholder>
      <Placeholder style={{ height: '120px' }}>Large</Placeholder>
    </Flex>
  ),
  args: { align: 'start' },
  argTypes: { align: { control: 'select', options: ['start', 'center', 'end'] } },
};
// Now changing align clearly moves items vertically!
```

#### Strategies for Visual Clarity

| Prop                  | Strategy                                            |
| --------------------- | --------------------------------------------------- |
| `align` (cross-axis)  | Vary item sizes perpendicular to flex direction     |
| `justify` (main-axis) | Add container min-width/height; use fewer items     |
| `gap`                 | Use contrasting background colors so gap is visible |
| `direction`           | Show both row and column side-by-side               |
| `wrap`                | Add many items + fixed container width              |
| `variant`             | Use different colors/styles per variant             |
| `size`                | Show all sizes side-by-side for comparison          |
| `disabled`            | Show enabled vs disabled side-by-side               |

### Rule 3: Label What's Being Demonstrated

Always label stories, variants, and sections clearly.

#### ✅ CORRECT - Clear labels

```typescript
export const AllGapSizes: Story = {
  render: () => (
    <Stack gap="xl">
      <div>
        <Text style={{ marginBottom: tokens.spacing.sm }}>gap: none (0px)</Text>
        <Flex gap="none">
          <Placeholder>A</Placeholder>
          <Placeholder>B</Placeholder>
        </Flex>
      </div>

      <div>
        <Text style={{ marginBottom: tokens.spacing.sm }}>gap: sm (8px)</Text>
        <Flex gap="sm">
          <Placeholder>A</Placeholder>
          <Placeholder>B</Placeholder>
        </Flex>
      </div>

      <div>
        <Text style={{ marginBottom: tokens.spacing.sm }}>gap: lg (24px)</Text>
        <Flex gap="lg">
          <Placeholder>A</Placeholder>
          <Placeholder>B</Placeholder>
        </Flex>
      </div>
    </Stack>
  ),
};
```

#### ❌ WRONG - No labels

```typescript
export const AllGapSizes: Story = {
  render: () => (
    <Stack>
      <Flex gap="none"><Placeholder>A</Placeholder><Placeholder>B</Placeholder></Flex>
      <Flex gap="sm"><Placeholder>A</Placeholder><Placeholder>B</Placeholder></Flex>
      <Flex gap="lg"><Placeholder>A</Placeholder><Placeholder>B</Placeholder></Flex>
    </Stack>
  ),
};
// User can't tell which gap size is which!
```

### Rule 4: Follow Accessibility Standards

All stories must meet **WCAG 2.1 AA** standards. See `.github/instructions/a11y.instructions.md` for details.

**Key requirements**:

- ✅ Sufficient color contrast (4.5:1 for text, 3:1 for UI components)
- ✅ Semantic HTML elements
- ✅ Proper ARIA labels where needed
- ✅ Keyboard navigation support
- ✅ Focus indicators visible

**Common accessibility issues in stories**:

- ❌ Low contrast text on background
- ❌ Decorative elements not marked `aria-hidden`
- ❌ Interactive elements not keyboard accessible
- ❌ Missing labels on form controls

---

## Common Pitfalls & Fixes

### Pitfall 1: Hardcoded Values in Loops

**Problem**: Iterating over prop values but using hardcoded values in render.

**Example - GAP/WRAP SWAPPED LOGIC**:

```typescript
// ❌ WRONG - Iterating wrap values but setting gap prop
export const Gap: Story = {
  render: () => (
    <Stack gap="lg">
      {(['nowrap', 'wrap'] as const).map((wrapValue) => (
        <Flex key={wrapValue} gap={wrapValue}> {/* BUG: Should be wrap={wrapValue} */}
          <Placeholder>Item 1</Placeholder>
          <Placeholder>Item 2</Placeholder>
        </Flex>
      ))}
    </Stack>
  ),
};

// ✅ CORRECT - Iterating gap values and setting gap prop
export const Gap: Story = {
  render: () => (
    <Stack gap="lg">
      {(['none', 'sm', 'md', 'lg'] as const).map((gapValue) => (
        <div key={gapValue}>
          <Text>gap: {gapValue}</Text>
          <Flex gap={gapValue}> {/* Correct prop */}
            <Placeholder>Item 1</Placeholder>
            <Placeholder>Item 2</Placeholder>
          </Flex>
        </div>
      ))}
    </Stack>
  ),
};
```

**How to avoid**:

1. Match loop variable name to prop name: `gapValue` → `gap={gapValue}`
2. Add labels showing which value is displayed
3. Verify story visually shows differences

### Pitfall 2: Props Without Visual Effect

**Problem**: Demonstrating a prop but not providing context for it to be visible.

**Example - ALIGN WITHOUT HEIGHT VARIATION**:

```typescript
// ❌ WRONG - All items same height, align has no effect
export const Playground: Story = {
  render: (args) => (
    <Flex {...args}>
      <Placeholder>A</Placeholder>
      <Placeholder>B</Placeholder>
      <Placeholder>C</Placeholder>
    </Flex>
  ),
};

// ✅ CORRECT - Varying heights make align visible
export const Playground: Story = {
  render: (args) => (
    <Flex {...args} style={{ minHeight: '200px' }}>
      <Placeholder style={{ height: '40px' }}>Small</Placeholder>
      <Placeholder style={{ height: '80px' }}>Medium</Placeholder>
      <Placeholder style={{ height: '120px' }}>Large</Placeholder>
    </Flex>
  ),
};
```

**Fix strategy**: Think about what **visual difference** the prop should cause, then set up the story to make that difference obvious.

### Pitfall 3: Missing Container Dimensions

**Problem**: Flex/Grid alignment props need container space to work.

**Example**:

```typescript
// ❌ WRONG - No container height for align to work
export const AlignItems: Story = {
  render: () => (
    <Flex direction="row" align="center">
      <Placeholder>Item</Placeholder>
    </Flex>
  ),
};

// ✅ CORRECT - Container has explicit height
export const AlignItems: Story = {
  render: () => (
    <Flex direction="row" align="center" style={{ minHeight: '200px' }}>
      <Placeholder style={{ height: '60px' }}>Item</Placeholder>
    </Flex>
  ),
};
```

### Pitfall 4: Token Variable Name Errors

**Problem**: Using wrong CSS custom property names that don't exist.

**Example - SPACING TOKEN ERROR**:

```typescript
// ❌ WRONG - Missing 'token' in variable name
const gapValue = `var(--lufa-spacing-${value})`;
// Generates: var(--lufa-spacing-md) - doesn't exist!

// ✅ CORRECT - Include 'token' in variable name
const gapValue = `var(--lufa-token-spacing-${value})`;
// Generates: var(--lufa-token-spacing-md) - correct!
```

**Token naming convention**: ALL CSS custom properties use format `--lufa-token-{category}-{name}`.

### Pitfall 5: Not Testing in Both Light and Dark Modes

**Problem**: Story looks good in light mode but has contrast issues in dark mode.

**Fix**:

1. Always test stories in both modes using Storybook theme switcher
2. Use token-based colors (they auto-adapt to theme)
3. For custom backgrounds, use `Placeholder` component (has automatic contrast detection)

**Example**:

```typescript
// ✅ GOOD - Uses tokens that adapt to theme
export const ThemedExample: Story = {
  render: () => (
    <div style={{
      background: tokens.color.background.primary,
      color: tokens.color.text.primary,
      padding: tokens.spacing.lg,
    }}>
      Content adapts to theme
    </div>
  ),
};

// ❌ BAD - Hardcoded white background (invisible in light mode)
export const ThemedExample: Story = {
  render: () => (
    <div style={{
      background: '#ffffff',
      color: '#000000',
      padding: '24px',
    }}>
      Only works in dark mode
    </div>
  ),
};
```

### Pitfall 6: Inconsistent Story Ordering

**Problem**: Stories in random order make navigation confusing.

**Fix**: Always use this order:

1. Playground (first)
2. All variants/sizes/states
3. Use case examples
4. Edge cases (last)

---

## Testing Checklist

Before committing story changes, verify:

### Visual Testing

- [ ] All variants render correctly
- [ ] Prop controls in Playground work (changing values updates display)
- [ ] Labels are clear and accurate
- [ ] Spacing and layout use design tokens
- [ ] Story demonstrates the intended prop/behavior

### Accessibility Testing

- [ ] Sufficient color contrast in both light and dark modes
- [ ] Keyboard navigation works (Tab, Enter, Arrow keys)
- [ ] Focus indicators visible
- [ ] Semantic HTML used
- [ ] ARIA labels present where needed

### Cross-Browser Testing

- [ ] Story works in Chrome (primary test browser)
- [ ] No browser-specific CSS that breaks in other browsers
- [ ] CSS nesting uses compatible syntax

### Responsive Testing

- [ ] Story adapts to different viewport sizes
- [ ] No horizontal scrolling on small screens
- [ ] Text remains readable at all sizes

### Code Quality

- [ ] No hardcoded colors, spacing, or typography
- [ ] All tokens imported from `@grasdouble/lufa_design-system-tokens`
- [ ] TypeScript has no errors
- [ ] ESLint has no warnings
- [ ] Story file follows standard structure

---

## Story Patterns Library

Reusable patterns for common story types.

### Pattern 1: Grid Comparison Layout

Use for showing all variants/sizes side-by-side.

```typescript
export const AllVariants: Story = {
  render: () => (
    <Grid cols={3} gap="md">
      <div>
        <Text weight="semibold">Primary</Text>
        <Component variant="primary">Content</Component>
      </div>
      <div>
        <Text weight="semibold">Secondary</Text>
        <Component variant="secondary">Content</Component>
      </div>
      <div>
        <Text weight="semibold">Ghost</Text>
        <Component variant="ghost">Content</Component>
      </div>
    </Grid>
  ),
};
```

### Pattern 2: Dual-Direction Demonstration

Use for flex/layout components to show both axes.

```typescript
export const Playground: Story = {
  render: (args) => (
    <Stack gap="xxl">
      {/* Row direction */}
      <div>
        <Text weight="semibold" style={{ marginBottom: tokens.spacing.md }}>
          direction: row
        </Text>
        <Flex {...args} direction="row" style={{ minHeight: '150px' }}>
          <Placeholder style={{ height: '40px' }}>Small</Placeholder>
          <Placeholder style={{ height: '80px' }}>Medium</Placeholder>
          <Placeholder style={{ height: '120px' }}>Large</Placeholder>
        </Flex>
      </div>

      {/* Column direction */}
      <div>
        <Text weight="semibold" style={{ marginBottom: tokens.spacing.md }}>
          direction: column
        </Text>
        <Flex {...args} direction="column" style={{ minWidth: '300px' }}>
          <Placeholder style={{ width: '100px' }}>Narrow</Placeholder>
          <Placeholder style={{ width: '200px' }}>Wide</Placeholder>
          <Placeholder style={{ width: '300px' }}>Full</Placeholder>
        </Flex>
      </div>
    </Stack>
  ),
};
```

### Pattern 3: Scale Demonstration

Use for showing incremental differences (spacing, sizes, etc.).

```typescript
export const AllSizes: Story = {
  render: () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;

    return (
      <Stack gap="lg">
        {sizes.map((size) => (
          <div key={size}>
            <Text size="sm" style={{ marginBottom: tokens.spacing.xs }}>
              {size}: {tokens.spacing[size]}
            </Text>
            <Component size={size}>Content</Component>
          </div>
        ))}
      </Stack>
    );
  },
};
```

### Pattern 4: State Comparison

Use for showing interactive states side-by-side.

```typescript
export const AllStates: Story = {
  render: () => (
    <Flex gap="lg" wrap="wrap">
      <div>
        <Text>Default</Text>
        <Component>Normal</Component>
      </div>

      <div>
        <Text>Hover</Text>
        <Component className="hover">Hovered</Component>
      </div>

      <div>
        <Text>Focus</Text>
        <Component className="focus">Focused</Component>
      </div>

      <div>
        <Text>Disabled</Text>
        <Component disabled>Disabled</Component>
      </div>
    </Flex>
  ),
};
```

### Pattern 5: Composition Example

Use for demonstrating how components work together.

```typescript
export const InCardLayout: Story = {
  render: () => (
    <Card>
      <Stack gap="md">
        <Heading level={3}>Card Title</Heading>
        <Text>This demonstrates how the component works within a card layout.</Text>
        <Flex gap="sm" justify="end">
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Confirm</Button>
        </Flex>
      </Stack>
    </Card>
  ),
};
```

### Pattern 6: Responsive Grid

Use for demonstrating responsive behavior.

```typescript
export const ResponsiveGrid: Story = {
  render: () => (
    <Grid
      cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
      gap="md"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <Component key={i}>Item {i + 1}</Component>
      ))}
    </Grid>
  ),
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};
```

---

## Related Documentation

### Internal Documentation

**Must read before writing stories**:

- `AGENTS.md` - Project overview, design system architecture
- `CLAUDE.md` - Three-layer token architecture (critical for understanding token usage)
- `.github/instructions/lufa-design-system.instructions.md` - Design system component patterns
- `.github/instructions/a11y.instructions.md` - Accessibility requirements (WCAG 2.1 AA)

**Helpful context**:

- `.github/instructions/reactjs.instructions.md` - React best practices
- `.github/instructions/typescript-5-es2022.instructions.md` - TypeScript guidelines

### External Documentation

**Storybook**:

- [Storybook Documentation](https://storybook.js.org/docs/react/get-started/introduction)
- [Writing Stories](https://storybook.js.org/docs/react/writing-stories/introduction)
- [Args and ArgTypes](https://storybook.js.org/docs/react/writing-stories/args)
- [Controls](https://storybook.js.org/docs/react/essentials/controls)

**React**:

- [React Documentation](https://react.dev/)
- [TypeScript with React](https://react.dev/learn/typescript)

**Accessibility**:

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## Quick Reference

### Minimum Story File

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Component } from '@grasdouble/lufa_design-system';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Components/Category/Component',
  component: Component,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;

export const Playground: Story = {
  args: {
    variant: 'primary',
    children: 'Example',
  },
};

export const AllVariants: Story = {
  render: () => (
    <>
      <Component variant="primary">Primary</Component>
      <Component variant="secondary">Secondary</Component>
    </>
  ),
};
```

### Common Imports

```typescript
// Storybook

// React
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// Components

// Layout helpers
import { Component, Flex, Grid, Stack } from '@grasdouble/lufa_design-system';
// Tokens
import { tokens } from '@grasdouble/lufa_design-system-tokens';
```

### Token Categories Quick List

```typescript
// Spacing: xs, sm, md, lg, xl, xxl
tokens.spacing.md;

// Colors: text, background, border
tokens.color.text.primary;
tokens.color.background.secondary;
tokens.color.border.focus;

// Typography: fontSize, fontWeight, lineHeight
tokens.typography.fontSize.lg;
tokens.typography.fontWeight.semibold;

// Radius: sm, md, lg, full
tokens.radius.md;

// Shadows: sm, md, lg, xl
tokens.shadow.lg;
```

### Control Types Quick Reference

| PropType     | Control     | Options Format        |
| ------------ | ----------- | --------------------- |
| `string`     | `'text'`    | n/a                   |
| `'a' \| 'b'` | `'select'`  | `options: ['a', 'b']` |
| `number`     | `'number'`  | `min`, `max`, `step`  |
| `boolean`    | `'boolean'` | n/a                   |
| Date         | `'date'`    | n/a                   |
| Color hex    | `'color'`   | n/a                   |

### Story Priority Checklist

When creating stories, implement in this order:

**Priority 1 (Must Have)**:

- [ ] Playground with all important props
- [ ] All variants shown side-by-side
- [ ] All sizes shown side-by-side (if applicable)

**Priority 2 (Should Have)**:

- [ ] At least one realistic use case example
- [ ] All states (hover, focus, disabled) shown

**Priority 3 (Nice to Have)**:

- [ ] Multiple use case examples
- [ ] Edge cases with unusual content
- [ ] Responsive behavior demonstration
- [ ] Composition with other components

---

## Example: Complete Story File

Here's a complete, annotated example showing all best practices:

```typescript
// packages/design-system/storybook/src/stories/components/core/Button.stories.tsx

// 1. IMPORTS (organized by category)
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@grasdouble/lufa_design-system';
import { tokens } from '@grasdouble/lufa_design-system-tokens';
import { Flex, Stack } from '@grasdouble/lufa_design-system';

// 2. TYPE DEFINITIONS
type Story = StoryObj<typeof Button>;

// 3. META EXPORT
const meta: Meta<typeof Button> = {
  title: 'Components/Core/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

// 4. PLAYGROUND (first story - interactive controls)
export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    children: 'Click me',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button interactions',
    },
  },
};

// 5. VARIANT STORIES (visual comparisons)
export const AllVariants: Story = {
  render: () => (
    <Flex gap="md">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
    </Flex>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Flex align="center" gap="md">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </Flex>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Stack gap="lg">
      <Flex gap="md">
        <div>
          <Text size="sm" style={{ marginBottom: tokens.spacing.xs }}>
            Default
          </Text>
          <Button>Normal</Button>
        </div>
        <div>
          <Text size="sm" style={{ marginBottom: tokens.spacing.xs }}>
            Disabled
          </Text>
          <Button disabled>Disabled</Button>
        </div>
      </Flex>
    </Stack>
  ),
};

// 6. USE CASE STORIES (realistic examples)
export const WithIcons: Story = {
  render: () => (
    <Flex gap="md">
      <Button icon={<SearchIcon />}>Search</Button>
      <Button icon={<SettingsIcon />} iconPosition="end">
        Settings
      </Button>
    </Flex>
  ),
};

export const InFormLayout: Story = {
  render: () => (
    <Stack gap="lg" style={{ minWidth: '300px' }}>
      <Input label="Email" type="email" />
      <Input label="Password" type="password" />
      <Flex gap="sm" justify="end">
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Sign In</Button>
      </Flex>
    </Stack>
  ),
};

// 7. EDGE CASE STORIES (when applicable)
export const VeryLongText: Story = {
  render: () => (
    <div style={{ maxWidth: '200px' }}>
      <Button>
        This is an extremely long button label that will wrap or truncate
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates text overflow handling',
      },
    },
  },
};
```

---

## Summary for AI Agents

When writing Storybook stories:

1. **Start with Playground** - Interactive controls for all important props
2. **Show all variants** - Side-by-side visual comparisons
3. **Use design tokens** - Never hardcode spacing, colors, typography
4. **Make changes visible** - Vary sizes/content to demonstrate prop effects
5. **Label everything** - Clear labels for variants, sections, examples
6. **Test both themes** - Light and dark mode
7. **Follow accessibility** - WCAG 2.1 AA standards
8. **Verify visually** - Check story in Storybook before committing

**Priority order**: Playground → Variants → Use Cases → Edge Cases

**Remember**: Stories are **visual demonstrations**, not API documentation. Focus on showing behavior, not describing every prop.

---

**Last Updated**: 2025-01-17  
**Version**: 1.0.0  
**Maintained By**: Lufa Design System Team
