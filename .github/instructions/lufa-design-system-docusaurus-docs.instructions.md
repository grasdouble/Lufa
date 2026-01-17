---
description: Comprehensive guide for AI agents on writing and maintaining Docusaurus component documentation in the Lufa Design System
applyTo:
  - '**/*.mdx'
  - '**/docusaurus/**'
  - 'packages/design-system/docusaurus/**'
tags:
  - docusaurus
  - design-system
  - documentation
  - api-reference
---

# Docusaurus Component Documentation - AI Agent Guide

## Purpose

This document provides **comprehensive, systematic guidance** for AI agents writing and maintaining Docusaurus component documentation in the Lufa Design System. It focuses on **API documentation and usage patterns**, complementing Storybook's visual demonstrations.

**Target Audience**: AI coding agents (GitHub Copilot, Claude Code, OpenAI Codex Extension)  
**Scope**: Component MDX file structure, API reference format, usage patterns  
**Out of Scope**: Docusaurus configuration, build setup, deployment

---

## Philosophy

### Documentation is API Reference + Usage Guidance

Docusaurus documentation in this project serves **two primary purposes**:

1. **API Reference**: Complete prop tables, TypeScript types, default values
2. **Usage Guidance**: Best practices, common patterns, accessibility guidelines

**What documentation IS**:

- Comprehensive prop tables with types and descriptions
- Real-world code examples showing component usage
- Accessibility guidelines and keyboard navigation
- Common patterns and composition examples
- TypeScript type definitions and interfaces
- Related components and alternatives

**What documentation IS NOT**:

- Visual demonstrations (that lives in Storybook)
- Interactive playgrounds (that lives in Storybook)
- Design rationale or brand guidelines (separate docs)
- Implementation details of component internals

### Complementary to Storybook

**Division of Responsibilities**:

| Aspect         | Docusaurus              | Storybook                 |
| -------------- | ----------------------- | ------------------------- |
| API Reference  | ✅ Complete prop tables | ❌ No autodocs            |
| Visual Demos   | ❌ Static examples only | ✅ Interactive playground |
| Code Examples  | ✅ Copy-paste snippets  | ⚠️ Some code shown        |
| Accessibility  | ✅ Full guidelines      | ✅ Demonstrates behavior  |
| Usage Patterns | ✅ Common scenarios     | ✅ Visual examples        |
| TypeScript     | ✅ Type definitions     | ❌ Not shown              |

**Workflow**: Users explore visually in Storybook, reference API and patterns in Docusaurus.

---

## Required Documentation Structure

Every component documentation file MUST follow this exact structure (in order):

### 1. Frontmatter (REQUIRED)

```yaml
---
sidebar_position: 1
---
```

- `sidebar_position`: Numeric value for sidebar ordering
- Component importance determines position (lower = more important)

### 2. Imports Section (REQUIRED)

```tsx
import { ComponentName } from '@grasdouble/lufa_design-system';

import { DarkModeCompatible } from '../../../src/components/DarkModeCompatible';
import { CommonPatternExample, LiveDemo, VariantExample } from '../../../src/dsExamples/category/componentName';
```

**Import order**:

1. Component itself from design system package
2. Live demo and example components from dsExamples directory
3. Documentation utilities (DarkModeCompatible, etc.)

### 3. Title + Dark Mode Badge (REQUIRED)

```markdown
# ComponentName

<DarkModeCompatible />

Brief one-sentence description of what the component does and its primary use case.
```

- `# ComponentName`: H1 title matching component name exactly
- `<DarkModeCompatible />`: Shows component works in dark mode
- One-sentence description: Clear, concise purpose statement

### 4. Overview Section (REQUIRED)

```markdown
## Overview

Use `ComponentName` when you need…

- Primary use case with prop reference
- Secondary use case with prop reference
- Tertiary use case with prop reference
- Specific feature with prop reference
- Edge case handling with prop reference
```

**Pattern**: Bullet list starting with action verbs, referencing specific props using backticks.

### 5. Live Demo Section (REQUIRED)

```markdown
## Live Demo

<LiveDemo />
```

- Embeds interactive React component from dsExamples
- Users can interact with component props
- Shows basic usage without code

### 6. Import Section (REQUIRED)

```markdown
## Import

\`\`\`tsx
import { ComponentName } from '@grasdouble/lufa_design-system';
\`\`\`
```

- Shows exact import statement users need
- Always imports from `@grasdouble/lufa_design-system` package

### 7. Basic Usage Section (REQUIRED)

```markdown
## Basic Usage

\`\`\`tsx title="src/App.tsx"
import { ComponentName } from '@grasdouble/lufa_design-system';

function App() {
return (
<>
<ComponentName>Default Example</ComponentName>
<ComponentName variant="outlined">Variant Example</ComponentName>
</>
);
}
\`\`\`
```

**Requirements**:

- Minimal, copy-paste ready code
- Shows 2-3 most common use cases
- Includes file path in title (`title="src/App.tsx"`)
- No complex state management or imports

### 8. Anatomy Section (REQUIRED)

```markdown
## Anatomy

The ComponentName component consists of several key parts:

\`\`\`
┌─────────────────────────────────────┐
│ [Part 1] Label [Part 2] │ ← Container
└─────────────────────────────────────┘
↑ ↑ ↑
│ │ └─ Optional trailing element
│ └─────────── Required main content
└──────────────────────── Optional leading element
\`\`\`

**Component Structure:**

- **Container**: Description of container role and styling
- **Part 1** (optional): Description and purpose
- **Label**: Description of main content
- **Part 2** (optional): Description and purpose

**Visual States:**

- Default: Normal state description
- Hover: Hover behavior
- Focus: Focus indicator behavior
- Active: Active/pressed state
- Disabled: Disabled state appearance
- Loading: Loading state (if applicable)
```

**Purpose**: Visual breakdown of component structure and states.

### 9. API Reference Section (REQUIRED - HIGHEST PRIORITY)

```markdown
## API Reference

### Props

| Prop       | Type                                       | Default    | Description           |
| ---------- | ------------------------------------------ | ---------- | --------------------- |
| `children` | `ReactNode`                                | Required   | Component content     |
| `variant`  | `'solid' \| 'outlined' \| 'ghost'`         | `'solid'`  | Visual style variant  |
| `size`     | `'small' \| 'medium' \| 'large'`           | `'medium'` | Component size        |
| `disabled` | `boolean`                                  | `false`    | Disables interactions |
| `onClick`  | `(event: MouseEvent<HTMLElement>) => void` | -          | Click event handler   |

Also supports all standard HTML `element` attributes (e.g., `className`, `id`, `aria-*`, `data-*`).
```

**Table Requirements**:

- **Prop column**: Use backticks around prop names
- **Type column**: Show exact TypeScript type (union types, function signatures)
- **Default column**: Show default value or "Required" or "-"
- **Description column**: Clear, concise description starting with action verb

**After table**: Note about HTML attribute inheritance.

### 10. Prop Details Subsections (REQUIRED)

```markdown
### Variant Details

- **solid**: Description of solid variant appearance and use case
- **outlined**: Description of outlined variant appearance and use case
- **ghost**: Description of ghost variant appearance and use case

### Size Details

- **small**: Description with actual pixel height (e.g., "32px height")
- **medium**: Description with actual pixel height (e.g., "40px height")
- **large**: Description with actual pixel height (e.g., "48px height")

### [Other Prop] Details

Detailed explanation of complex prop behavior, including:

- Accepted values and formats
- Semantic meaning of each value
- Design token mapping (if applicable)
```

**Purpose**: Expand on complex prop types that need more context than table description.

### 11. Variants Section with Live Examples (REQUIRED)

```markdown
## Variants

### variant

<Variant />

### size

<Size />

### [other important props]

<PropExample />
```

**Pattern**: One subsection per important prop with embedded live example component.

### 12. Best Practices Section (REQUIRED)

```markdown
## Best Practices

### Do ✅

- Action-oriented guideline with clear reasoning
- Another specific recommendation
- Pattern to follow with example reference
- Accessibility consideration

### Don't ❌

- Anti-pattern to avoid with reasoning
- Common mistake with explanation
- Performance pitfall
- Accessibility violation
```

**Requirements**:

- Use ✅ and ❌ emoji consistently
- Start each point with action verb
- Be specific, not vague
- Prioritize accessibility and performance

### 13. Accessibility Section (REQUIRED - CRITICAL)

```markdown
## Accessibility

The ComponentName component is designed with WCAG 2.1 AA compliance in mind:

### Keyboard Navigation

- **Tab**: Description of tab behavior
- **Enter/Space**: Description of activation
- **Arrow Keys**: Description of arrow navigation (if applicable)
- **Escape**: Description of cancel/close behavior (if applicable)

All [elements] are keyboard accessible by default with visible focus indicators.

### Screen Reader Support

**For [Common Case]:**
\`\`\`tsx
<ComponentName>Label Text</ComponentName>
// Screen reader announces: "Label Text, [role]"
\`\`\`

**For [Edge Case]:**
\`\`\`tsx
<ComponentName aria-label="Descriptive label">
<IconOnly />
</ComponentName>
// Screen reader announces: "Descriptive label, [role]"
\`\`\`

### Best Practices for Accessibility

#### Do ✅

- Always provide meaningful labels
- Use `aria-label` for icon-only elements
- Ensure sufficient color contrast (all variants meet WCAG AA)
- Keep focus indicators visible
- Provide descriptive error messages

#### Don't ❌

- Don't use only color to convey meaning
- Don't remove focus outlines
- Don't nest interactive elements
- Don't use `disabled` without explanation

### ARIA Attributes

The component automatically handles:

- `aria-disabled="true"` when `disabled`
- `aria-expanded="true"` when expanded (if applicable)

Additional ARIA attributes can be passed as props:

\`\`\`tsx
<ComponentName
aria-label="Descriptive name"
aria-describedby="helper-id"

> Content
> </ComponentName>
> \`\`\`

### Color Contrast

All component variants meet WCAG 2.1 AA contrast requirements:

- Normal text: Minimum 4.5:1 contrast ratio
- Large text: Minimum 3:1 contrast ratio
- Interactive elements: Minimum 3:1 contrast ratio

Tested in both light and dark modes.
```

**CRITICAL**: This section must be comprehensive and follow WCAG 2.1 AA standards. See `.github/instructions/a11y.instructions.md` for details.

### 14. Common Patterns Section (REQUIRED)

```markdown
## Common Patterns

### [Pattern Name 1]

\`\`\`tsx title="src/components/ExamplePattern.tsx"
import { ComponentName, RelatedComponent } from '@grasdouble/lufa_design-system';
import { useState } from 'react';

function ExamplePattern() {
// State and logic
const [state, setState] = useState(false);

// Event handlers
const handleAction = () => {
setState(!state);
};

return (
<ComponentName prop={state} onClick={handleAction}>
Pattern Example
</ComponentName>
);
}
\`\`\`

### [Pattern Name 2]

\`\`\`tsx title="src/components/AnotherPattern.tsx"
import { ComponentName, Stack } from '@grasdouble/lufa_design-system';

function AnotherPattern() {
return (
<Stack spacing="medium">
<ComponentName variant="primary">First</ComponentName>
<ComponentName variant="secondary">Second</ComponentName>
</Stack>
);
}
\`\`\`
```

**Requirements**:

- 3-5 realistic patterns users will encounter
- Complete, runnable code examples
- File path in title
- Comments explaining key concepts
- Import statements included

**Pattern Types to Include**:

1. Form submission/validation
2. Async actions (loading states)
3. Composition with other components
4. Conditional rendering
5. Event handling with state

### 15. Examples of Usage Section (OPTIONAL)

```markdown
## Examples of usage

<FormSubmitExample />
<CompositionExample />
```

**Purpose**: Embed live, interactive examples from dsExamples directory showing complete patterns.

### 16. Related Components Section (REQUIRED)

```markdown
## Related Components

- **ComponentName** - Brief description of when to use this instead
- **AlternativeComponent** - Use case for alternative
- **ComplementaryComponent** - How it works together with this component
- **LayoutComponent** - Layout helper for composing this component
```

**Pattern**: Bullet list with component name in bold, followed by relationship description.

### 17. TypeScript Support Section (REQUIRED)

```markdown
## TypeScript Support

The ComponentName component is fully typed with TypeScript:

\`\`\`tsx
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

interface ComponentNameProps extends ComponentPropsWithoutRef<'element'> {
variant?: 'solid' | 'outlined' | 'ghost';
size?: 'small' | 'medium' | 'large';
disabled?: boolean;
children: ReactNode;
}
\`\`\`

This ensures type safety and autocomplete in your IDE.
```

**Requirements**:

- Show actual TypeScript interface from component source
- Include `ComponentPropsWithoutRef` or `HTMLAttributes` extension
- Show all custom props with types
- Mention IDE autocomplete benefit

---

## File Naming and Location

### File Pattern

**Pattern**: `componentName.mdx`  
**Location**: `packages/design-system/docusaurus/docs/components/{category}/{componentName}.mdx`

**Categories**:

- `components/forms/` - Interactive input components (Button, Input, Checkbox, etc.)
- `components/layout/` - Layout primitives (Flex, Grid, Stack, Container, etc.)
- `components/feedback/` - User feedback (Alert, Modal, Spinner, Toast, etc.)
- `components/navigation/` - Navigation components (Menu, Tabs, Breadcrumb, Pagination, etc.)
- `components/display/` - Display components (Card, Badge, Avatar, Divider, etc.)
- `components/typography/` - Text components (Heading, Text, Code, etc.)
- `design-tokens/` - Token documentation (color, spacing, typography, etc.)
- `foundations/` - Foundation concepts (accessibility, breakpoints, motion, etc.)

### File Naming Conventions

- **camelCase**: File names use camelCase (`flex.mdx`, `button.mdx`)
- **lowercase**: All lowercase for consistency
- **no plurals**: Singular form (`button.mdx` not `buttons.mdx`)
- **descriptive**: Match component name exactly

---

## Generating Documentation from Component Source

### Step-by-Step Workflow

#### Step 1: Read Component Interface

```typescript
// Example: packages/design-system/main/src/components/Button.tsx

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  /**
   * Visual variant
   * @default 'solid'
   */
  variant?: 'solid' | 'outlined' | 'text' | 'ghost' | 'link';

  /**
   * Color scheme
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

  /**
   * Button size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Expands button to full container width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Shows loading spinner and disables interaction
   * @default false
   */
  loading?: boolean;

  /**
   * Disables button interaction
   * @default false
   */
  disabled?: boolean;

  /**
   * Icon displayed before label
   */
  startIcon?: ReactNode;

  /**
   * Icon displayed after label
   */
  endIcon?: ReactNode;
}
```

#### Step 2: Extract Prop Information

Create a mapping table:

| Prop      | Type             | Default   | Description (from JSDoc)                       |
| --------- | ---------------- | --------- | ---------------------------------------------- |
| variant   | Union of strings | 'solid'   | Visual variant                                 |
| color     | Union of strings | 'primary' | Color scheme                                   |
| size      | Union of strings | 'medium'  | Button size                                    |
| fullWidth | boolean          | false     | Expands button to full container width         |
| loading   | boolean          | false     | Shows loading spinner and disables interaction |
| disabled  | boolean          | false     | Disables button interaction                    |
| startIcon | ReactNode        | -         | Icon displayed before label                    |
| endIcon   | ReactNode        | -         | Icon displayed after label                     |

#### Step 3: Identify Sections Needed

Based on props, determine which sections to create:

- **variant** prop → Variant Details subsection + Variant visual example
- **size** prop → Size Details subsection + Size visual example
- **color** prop → Color Details subsection + Color visual example
- **loading** prop → Loading state in Anatomy + Loading visual example
- **disabled** prop → Disabled state in Anatomy + Disabled visual example
- **startIcon/endIcon** props → Icons section + Icons visual example
- **fullWidth** prop → FullWidth visual example

#### Step 4: Generate API Reference Table

```markdown
## API Reference

### Props

| Prop        | Type                                                             | Default     | Description                                    |
| ----------- | ---------------------------------------------------------------- | ----------- | ---------------------------------------------- |
| `children`  | `ReactNode`                                                      | Required    | Button content (text, icons, etc.)             |
| `variant`   | `'solid' \| 'outlined' \| 'text' \| 'ghost' \| 'link'`           | `'solid'`   | Visual style variant                           |
| `color`     | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Color scheme                                   |
| `size`      | `'small' \| 'medium' \| 'large'`                                 | `'medium'`  | Button size                                    |
| `fullWidth` | `boolean`                                                        | `false`     | Expands button to full container width         |
| `loading`   | `boolean`                                                        | `false`     | Shows loading spinner and disables interaction |
| `disabled`  | `boolean`                                                        | `false`     | Disables button interaction                    |
| `startIcon` | `ReactNode`                                                      | -           | Icon displayed before label                    |
| `endIcon`   | `ReactNode`                                                      | -           | Icon displayed after label                     |
| `onClick`   | `(event: React.MouseEvent<HTMLButtonElement>) => void`           | -           | Click event handler                            |
```

#### Step 5: Create Prop Details Subsections

For each prop with multiple values, expand on usage:

```markdown
### Variant Details

- **solid**: Filled background with high emphasis (default for primary actions)
- **outlined**: Border with transparent background (secondary actions)
- **text**: No border or background, minimal visual weight
- **ghost**: Similar to text but with hover background
- **link**: Appears as a text link (useful for inline navigation)

### Color Details

Each color maps to semantic design tokens:

- **primary**: Main brand color, use for primary actions
- **secondary**: Neutral alternative, use for secondary actions
- **success**: Positive actions (e.g., "Confirm", "Save")
- **warning**: Cautionary actions (e.g., "Archive", "Unpublish")
- **danger**: Destructive actions (e.g., "Delete", "Remove")

### Size Details

- **small**: Compact size for dense interfaces (32px height)
- **medium**: Default size for most use cases (40px height)
- **large**: Prominent size for hero sections (48px height)
```

---

## Quality Standards

### Rule 1: Complete Prop Tables

**CRITICAL**: Every prop must be documented in the API Reference table.

#### ✅ CORRECT - Complete table

```markdown
| Prop        | Type                                       | Default    | Description           |
| ----------- | ------------------------------------------ | ---------- | --------------------- |
| `children`  | `ReactNode`                                | Required   | Component content     |
| `variant`   | `'solid' \| 'outlined' \| 'ghost'`         | `'solid'`  | Visual style variant  |
| `size`      | `'small' \| 'medium' \| 'large'`           | `'medium'` | Component size        |
| `disabled`  | `boolean`                                  | `false`    | Disables interactions |
| `onClick`   | `(event: MouseEvent<HTMLElement>) => void` | -          | Click event handler   |
| `className` | `string`                                   | -          | Additional CSS class  |
```

#### ❌ WRONG - Missing props

```markdown
| Prop      | Type                               | Default    | Description          |
| --------- | ---------------------------------- | ---------- | -------------------- |
| `variant` | `'solid' \| 'outlined' \| 'ghost'` | `'solid'`  | Visual style variant |
| `size`    | `'small' \| 'medium' \| 'large'`   | `'medium'` | Component size       |

// Missing: children, disabled, onClick, className
```

### Rule 2: Accurate TypeScript Types

Show exact TypeScript types from source code.

#### ✅ CORRECT - Exact types

```markdown
| Prop      | Type                                                   | Default   | Description    |
| --------- | ------------------------------------------------------ | --------- | -------------- |
| `onClick` | `(event: React.MouseEvent<HTMLButtonElement>) => void` | -         | Click handler  |
| `variant` | `'solid' \| 'outlined' \| 'text'`                      | `'solid'` | Visual variant |
```

#### ❌ WRONG - Vague types

```markdown
| Prop      | Type       | Default   | Description    |
| --------- | ---------- | --------- | -------------- |
| `onClick` | `function` | -         | Click handler  |
| `variant` | `string`   | `'solid'` | Visual variant |
```

### Rule 3: Copy-Paste Ready Code Examples

All code examples must be complete and runnable.

#### ✅ CORRECT - Complete example

```tsx title="src/components/LoginForm.tsx"
import { useState } from 'react';

import { Button, Input, Stack } from '@grasdouble/lufa_design-system';

function LoginForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing="medium">
        <Input label="Email" type="email" />
        <Input label="Password" type="password" />
        <Button type="submit" loading={loading}>
          Sign In
        </Button>
      </Stack>
    </form>
  );
}
```

#### ❌ WRONG - Incomplete example

```tsx
<Button onClick={handleSubmit} loading={loading}>
  Sign In
</Button>
// Missing: imports, function wrapper, state management, form context
```

### Rule 4: Comprehensive Accessibility Section

Every component must have detailed accessibility documentation.

**Required subsections**:

1. **Keyboard Navigation** - All keyboard interactions with key names
2. **Screen Reader Support** - Examples of announcements with code
3. **Best Practices** - Do ✅ and Don't ❌ lists
4. **ARIA Attributes** - Automatic and optional ARIA props
5. **Color Contrast** - WCAG conformance statement

See [Section 13: Accessibility Section](#13-accessibility-section-required---critical) for complete template.

### Rule 5: Realistic Common Patterns

Show patterns users will actually implement, not contrived examples.

**Good patterns**:

- Form submission with loading state
- Confirmation dialogs (cancel + confirm)
- Async actions with error handling
- Composition with layout components
- Navigation with routing libraries

**Avoid**:

- Toy examples with no real-world applicability
- Overly complex patterns that should be components
- Incomplete patterns requiring significant additional work

---

## Common Pitfalls & Fixes

### Pitfall 1: Incomplete Prop Tables

**Problem**: Documentation lists some props but not all.

**Fix**: Always cross-reference component TypeScript interface. Use this checklist:

- [ ] All custom props documented
- [ ] All inherited HTML attributes mentioned
- [ ] Event handlers included
- [ ] Optional vs required indicated
- [ ] Default values accurate

### Pitfall 2: Outdated Type Information

**Problem**: Docs show old prop types after component refactor.

**Fix**:

1. Read component source file directly (don't assume)
2. Copy exact TypeScript type from interface
3. Verify default value in component implementation
4. Test example code actually compiles

### Pitfall 3: Missing Code Example Imports

**Problem**: Code examples don't show necessary imports.

**Example**:

```tsx
// ✅ CORRECT
import { useNavigate } from 'react-router-dom';

import { Button } from '@grasdouble/lufa_design-system';

// ❌ WRONG
<Button onClick={() => navigate('/home')}>Go Home</Button>;

function Navigation() {
  const navigate = useNavigate();

  return <Button onClick={() => navigate('/home')}>Go Home</Button>;
}
```

### Pitfall 4: Vague Accessibility Guidelines

**Problem**: Generic accessibility statements without specifics.

**Example**:

```markdown
// ❌ WRONG
The component is accessible and follows WCAG guidelines.

// ✅ CORRECT

### Keyboard Navigation

- **Tab**: Moves focus to the button
- **Enter/Space**: Activates the button action
- Focus indicator: 2px solid outline with 2px offset

All buttons are keyboard accessible by default with visible focus indicators
meeting WCAG 2.1 AA contrast requirements (minimum 3:1).
```

### Pitfall 5: No Dark Mode Testing Notes

**Problem**: Documentation doesn't mention dark mode behavior.

**Fix**:

1. Add `<DarkModeCompatible />` badge at top
2. Mention dark mode in Color Contrast section
3. Note any dark mode specific behavior

```markdown
### Color Contrast

All component variants meet WCAG 2.1 AA contrast requirements:

- Normal text: Minimum 4.5:1 contrast ratio
- Large text: Minimum 3:1 contrast ratio
- Interactive elements: Minimum 3:1 contrast ratio

Tested in both light and dark modes. All design tokens automatically
adapt to the active theme.
```

### Pitfall 6: Mixing Visual Demos with API Docs

**Problem**: Trying to recreate Storybook in Docusaurus.

**Fix**:

- Use embedded live examples from dsExamples (`<LiveDemo />`, `<Variant />`)
- Don't inline create interactive components in MDX
- Focus on code examples users can copy, not interactive playgrounds
- Reference Storybook for visual exploration

---

## Live Example Components (dsExamples)

### Creating Example Components

Live examples are React components located in:
`packages/design-system/docusaurus/src/dsExamples/{category}/{componentName}.tsx`

**Pattern**:

```tsx
// packages/design-system/docusaurus/src/dsExamples/forms/button.tsx

import { Button } from '@grasdouble/lufa_design-system';

export function LiveDemo() {
  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      <Button>Primary</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
    </div>
  );
}

export function Variant() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Button variant="solid">Solid Button</Button>
      <Button variant="outlined">Outlined Button</Button>
      <Button variant="text">Text Button</Button>
      <Button variant="ghost">Ghost Button</Button>
      <Button variant="link">Link Button</Button>
    </div>
  );
}

export function Size() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  );
}
```

**Requirements**:

- Export named functions (not default exports)
- Use design tokens for styling wrapper elements
- Keep examples simple and focused
- One prop per example component
- Use semantic HTML in wrappers

### Embedding in MDX

```mdx
import { LiveDemo, Size, Variant } from '../../../src/dsExamples/forms/button';

## Live Demo

<LiveDemo />

## Variants

### variant

<Variant />

### size

<Size />
```

---

## Documentation Testing Checklist

Before committing component documentation, verify:

### Content Completeness

- [ ] All 17 required sections present
- [ ] Frontmatter includes `sidebar_position`
- [ ] Title matches component name exactly
- [ ] `<DarkModeCompatible />` badge present
- [ ] All props documented in API Reference table
- [ ] Prop Details subsections for complex props
- [ ] At least 3 Common Patterns examples
- [ ] TypeScript interface included

### Code Quality

- [ ] All code examples have imports
- [ ] Examples compile without errors
- [ ] File paths in code block titles (`title="src/..."`)
- [ ] TypeScript types match component source
- [ ] No placeholder/TODO comments

### Accessibility

- [ ] Keyboard Navigation section complete
- [ ] Screen Reader Support with examples
- [ ] ARIA Attributes documented
- [ ] Color Contrast statement included
- [ ] Best Practices Do/Don't lists
- [ ] Meets WCAG 2.1 AA standards

### Accuracy

- [ ] Default values verified from source code
- [ ] TypeScript types copied exactly
- [ ] Live examples render correctly
- [ ] Related components list is accurate
- [ ] Links to other docs are valid

### Formatting

- [ ] Markdown tables aligned properly
- [ ] Code blocks use correct language hints
- [ ] Consistent heading hierarchy (H2 → H3 → H4)
- [ ] Emoji used consistently (✅ ❌)
- [ ] No trailing whitespace

---

## Section Templates

### Basic Component Template (Minimal)

```mdx
---
sidebar_position: 1
---

import { ComponentName } from '@grasdouble/lufa_design-system';

import { DarkModeCompatible } from '../../../src/components/DarkModeCompatible';
import { LiveDemo, Variant } from '../../../src/dsExamples/category/componentName';

# ComponentName

<DarkModeCompatible />

Brief one-sentence description of component purpose.

## Overview

Use `ComponentName` when you need…

- Primary use case
- Secondary use case
- Tertiary use case

## Live Demo

<LiveDemo />

## Import

\`\`\`tsx
import { ComponentName } from '@grasdouble/lufa_design-system';
\`\`\`

## Basic Usage

\`\`\`tsx title="src/App.tsx"
import { ComponentName } from '@grasdouble/lufa_design-system';

function App() {
return <ComponentName>Example</ComponentName>;
}
\`\`\`

## Anatomy

Component structure description.

## API Reference

### Props

| Prop       | Type                    | Default   | Description       |
| ---------- | ----------------------- | --------- | ----------------- |
| `children` | `ReactNode`             | Required  | Component content |
| `variant`  | `'solid' \| 'outlined'` | `'solid'` | Visual variant    |

### Variant Details

- **solid**: Description
- **outlined**: Description

## Variants

### variant

<Variant />

## Best Practices

### Do ✅

- Recommendation 1
- Recommendation 2

### Don't ❌

- Anti-pattern 1
- Anti-pattern 2

## Accessibility

Comprehensive accessibility section (see full template above).

## Common Patterns

\`\`\`tsx title="src/components/Example.tsx"
// Complete code example
\`\`\`

## Related Components

- **RelatedComponent** - When to use instead
- **ComplementaryComponent** - How to use together

## TypeScript Support

\`\`\`tsx
interface ComponentNameProps extends ComponentPropsWithoutRef<'element'> {
variant?: 'solid' | 'outlined';
children: ReactNode;
}
\`\`\`

This ensures type safety and autocomplete in your IDE.
```

### Accessibility Section Template

```markdown
## Accessibility

The ComponentName component is designed with WCAG 2.1 AA compliance in mind:

### Keyboard Navigation

- **Tab**: Navigate to component
- **Enter**: Activate component
- **Space**: Alternative activation (for buttons)
- **Escape**: Cancel/close (for dialogs/menus)
- **Arrow Keys**: Navigate between items (for lists/menus)

All [interactive elements] are keyboard accessible by default with visible focus indicators.

### Screen Reader Support

**For [Primary Use Case]:**
\`\`\`tsx
<ComponentName>Label Text</ComponentName>
// Screen reader announces: "Label Text, [role]"
\`\`\`

**For [Icon-Only Case]:**
\`\`\`tsx
<ComponentName aria-label="Descriptive label">
<Icon />
</ComponentName>
// Screen reader announces: "Descriptive label, [role]"
\`\`\`

**For [Loading/State Case]:**
\`\`\`tsx
<ComponentName loading aria-label="Loading content">
Content
</ComponentName>
// Screen reader announces: "Loading content, [role], busy"
\`\`\`

### Best Practices for Accessibility

#### Do ✅

- Always provide meaningful labels for interactive elements
- Use `aria-label` for icon-only components
- Use appropriate semantic HTML elements
- Ensure sufficient color contrast (all variants meet WCAG AA)
- Keep focus indicators visible (default focus ring)
- Provide alternative text for non-text content
- Test with keyboard navigation only
- Test with screen reader (VoiceOver, NVDA, JAWS)

#### Don't ❌

- Don't use only color to convey meaning (combine with icons/text)
- Don't remove focus outlines (breaks keyboard navigation)
- Don't nest interactive elements (buttons inside buttons)
- Don't use `disabled` without explanation (add helper text if needed)
- Don't create keyboard traps
- Don't hide content that should be accessible

### ARIA Attributes

The component automatically handles:

- `aria-disabled="true"` when `disabled` prop is set
- `aria-busy="true"` when `loading` prop is set
- `role="[appropriate-role]"` on the component element

Additional ARIA attributes can be passed as props:

\`\`\`tsx
<ComponentName
aria-label="Descriptive name"
aria-describedby="helper-text-id"
aria-labelledby="label-id"
aria-controls="controlled-element-id"

> Content
> </ComponentName>
> \`\`\`

### Color Contrast

All component variants meet WCAG 2.1 AA contrast requirements:

- Normal text: Minimum 4.5:1 contrast ratio
- Large text (18pt+): Minimum 3:1 contrast ratio
- Interactive elements: Minimum 3:1 contrast ratio
- Focus indicators: Minimum 3:1 contrast against adjacent colors

Tested in both light and dark modes. All design tokens automatically
adapt to the active theme while maintaining contrast requirements.
```

---

## Related Documentation

### Internal Documentation

**Must read before writing documentation**:

- `AGENTS.md` - Project overview, design system architecture
- `CLAUDE.md` - Three-layer token architecture
- `.github/instructions/lufa-design-system.instructions.md` - Component implementation patterns
- `.github/instructions/lufa-design-system-storybook-stories.instructions.md` - Storybook stories (complementary visual demos)
- `.github/instructions/a11y.instructions.md` - Accessibility requirements (WCAG 2.1 AA)

**Helpful context**:

- `.github/instructions/reactjs.instructions.md` - React best practices
- `.github/instructions/typescript-5-es2022.instructions.md` - TypeScript guidelines
- `.github/instructions/markdown.instructions.md` - Markdown formatting

### External Documentation

**Docusaurus**:

- [Docusaurus Documentation](https://docusaurus.io/docs)
- [MDX Documentation](https://mdxjs.com/)
- [React Components in MDX](https://mdxjs.com/docs/using-mdx/#components)

**Accessibility**:

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)

**TypeScript**:

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

---

## Quick Reference

### Section Order Checklist

Use this for every component documentation file:

1. [ ] Frontmatter (`sidebar_position`)
2. [ ] Imports (component, examples, utilities)
3. [ ] Title + `<DarkModeCompatible />`
4. [ ] Overview (bullet list of use cases)
5. [ ] Live Demo (`<LiveDemo />`)
6. [ ] Import statement
7. [ ] Basic Usage (copy-paste code)
8. [ ] Anatomy (visual structure)
9. [ ] API Reference (prop table)
10. [ ] Prop Details (subsections for complex props)
11. [ ] Variants (embedded live examples)
12. [ ] Best Practices (Do ✅ / Don't ❌)
13. [ ] Accessibility (comprehensive section)
14. [ ] Common Patterns (3-5 realistic examples)
15. [ ] Examples of usage (optional live demos)
16. [ ] Related Components (bullet list)
17. [ ] TypeScript Support (interface)

### Prop Table Template

```markdown
| Prop       | Type   | Default   | Description                    |
| ---------- | ------ | --------- | ------------------------------ |
| `propName` | `type` | `default` | Description starting with verb |
```

### Common Patterns Template

```tsx title="src/components/PatternName.tsx"
import { useState } from 'react';

import { ComponentName, RelatedComponent } from '@grasdouble/lufa_design-system';

function PatternName() {
  const [state, setState] = useState(initialValue);

  const handleEvent = () => {
    // Event logic
    setState(newValue);
  };

  return (
    <ComponentName prop={state} onEvent={handleEvent}>
      Content
    </ComponentName>
  );
}
```

---

## Summary for AI Agents

When writing Docusaurus component documentation:

1. **Follow the 17-section structure** - Don't skip required sections
2. **Complete prop tables** - Every prop must be documented
3. **Accurate TypeScript types** - Copy exact types from source
4. **Copy-paste ready code** - All examples must be complete and runnable
5. **Comprehensive accessibility** - Follow WCAG 2.1 AA standards
6. **Realistic patterns** - Show real-world usage, not toy examples
7. **Embed live examples** - Use dsExamples components, don't inline complex demos
8. **Cross-reference Storybook** - Visual demos live there, API docs live here

**Priority order**: API Reference → Accessibility → Common Patterns → Everything else

**Remember**: Documentation is the **single source of truth** for component APIs. Users rely on this being accurate, complete, and up-to-date.

---

**Last Updated**: 2026-01-17  
**Version**: 1.0.0  
**Maintained By**: Lufa Design System Team
