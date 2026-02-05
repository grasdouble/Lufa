---
id: component-documentation-template
title: Component Documentation Template
sidebar_label: Component Documentation Template
description: Template for writing component documentation pages.
---

# Component Documentation Template

This template provides a standardized structure for documenting design system components. Following this template ensures consistency, completeness, and excellent developer experience.

## Template Structure

Use this structure when creating or updating component documentation:

````markdown
---
sidebar_position: [number]
---

import { ComponentName } from '@grasdouble/lufa_design-system';
import DarkModeCompatible from '../../../src/components/DarkModeCompatible';

# Component Name

<DarkModeCompatible />

Brief description of the component (1-2 sentences). What it does and when to use it.

## Overview

Use `ComponentName` when you need…

- Bullet point describing use case 1
- Bullet point describing use case 2
- Bullet point describing use case 3

## Live Demo

[Interactive example using live code blocks or imported components]

## Import

```tsx
import { ComponentName } from '@grasdouble/lufa_design-system';
```
````

## Basic Usage

```tsx title="src/App.tsx"
import { ComponentName } from '@grasdouble/lufa_design-system';

function App() {
  return <ComponentName>Basic example</ComponentName>;
}
```

## Anatomy

Visual breakdown of component parts:

```
┌─────────────────────────────────────┐
│  [Part 1]  [Part 2]  [Part 3]       │
└─────────────────────────────────────┘
```

**Component Structure:**

- **Part 1**: Description of first part
- **Part 2**: Description of second part
- **Part 3**: Description of third part

**Visual States:**

- Default: Description
- Hover: Description
- Focus: Description
- Active: Description
- Disabled: Description

## API Reference

### Props

| Prop       | Type               | Default  | Description                  |
| ---------- | ------------------ | -------- | ---------------------------- |
| `propName` | `string \| number` | Required | Description of prop          |
| `optional` | `boolean`          | `false`  | Description of optional prop |

Also supports all standard HTML attributes for the underlying element.

### Prop Details

**propName**

- Detailed explanation of what this prop does
- Valid values and their meanings
- When to use each value

**optional**

- Detailed explanation of optional prop
- Default behavior when not provided

## Variants

### Variant Name 1

[Visual examples or interactive demo]

```tsx title="Example"
<ComponentName variant="value1">Example 1</ComponentName>
<ComponentName variant="value2">Example 2</ComponentName>
```

### Variant Name 2

[Visual examples or interactive demo]

## Examples

### Basic Example

```tsx title="src/components/BasicExample.tsx"
import { ComponentName } from '@grasdouble/lufa_design-system';

export function BasicExample() {
  return <ComponentName>Basic usage example</ComponentName>;
}
```

### Advanced Example

```tsx title="src/components/AdvancedExample.tsx" {5-7}
import { useState } from 'react';

import { ComponentName } from '@grasdouble/lufa_design-system';

export function AdvancedExample() {
  const [state, setState] = useState(false);

  return (
    <ComponentName property={state} onChange={setState}>
      Advanced example with state
    </ComponentName>
  );
}
```

## Accessibility

Brief overview of accessibility features.

### Keyboard Navigation

- **Key**: Action description
- **Key**: Action description

### Screen Reader Support

**Standard Usage:**

```tsx
<ComponentName>Label</ComponentName>
// Screen reader announces: "Label, [role]"
```

**With ARIA Labels:**

```tsx
<ComponentName aria-label="Descriptive label">Content</ComponentName>
```

### Best Practices for Accessibility

#### Do ✅

- Provide meaningful labels
- Ensure keyboard accessibility
- Maintain sufficient color contrast
- Use semantic HTML

#### Don't ❌

- Don't remove focus indicators
- Don't rely solely on color to convey meaning
- Don't nest interactive elements
- Don't disable without explanation

### ARIA Attributes

List of automatically handled ARIA attributes and examples of additional attributes that can be passed.

### Color Contrast

Mention WCAG compliance and contrast ratios for different states.

## Best Practices

### Do ✅

- Best practice 1 with explanation
- Best practice 2 with explanation
- Best practice 3 with explanation

### Don't ❌

- Anti-pattern 1 with explanation
- Anti-pattern 2 with explanation
- Anti-pattern 3 with explanation

## Common Patterns

### Pattern 1: [Name]

```tsx title="src/components/Pattern1.tsx"
// Real-world example of common pattern
```

### Pattern 2: [Name]

```tsx title="src/components/Pattern2.tsx"
// Real-world example of another common pattern
```

### Pattern 3: [Name]

```tsx title="src/components/Pattern3.tsx"
// Real-world example of third pattern
```

## Related Components

- **ComponentName** - Brief description and when to use instead
- **ComponentName** - Brief description and when to use instead
- **ComponentName** - Brief description and when to use together

## TypeScript Support

```tsx
import type { ComponentPropsWithoutRef } from 'react';

interface ComponentNameProps extends ComponentPropsWithoutRef<'element'> {
  // Type definition
}
```

Brief explanation of TypeScript benefits and type safety.

## Troubleshooting

### Issue 1

**Problem**: Description of common issue

**Solution**: How to fix it

```tsx
// Example of solution
```

### Issue 2

**Problem**: Description of another common issue

**Solution**: How to fix it

`````

## Sections Breakdown

### Required Sections

1. **Title & Badge**: Component name and DarkModeCompatible badge
2. **Brief Description**: 1-2 sentence summary
3. **Overview**: When to use this component
4. **Import**: How to import
5. **Basic Usage**: Simplest possible example
6. **API Reference**: Complete props table with descriptions
7. **Accessibility**: WCAG compliance, keyboard nav, screen readers
8. **Best Practices**: Do's and Don'ts

### Recommended Sections

9. **Anatomy**: Visual breakdown of component structure
10. **Variants**: Different visual styles or configurations
11. **Examples**: Real-world usage patterns
12. **Common Patterns**: Copy-paste ready code for frequent scenarios
13. **Related Components**: Links to complementary components
14. **TypeScript Support**: Type definitions and benefits

### Optional Sections

15. **Troubleshooting**: Solutions to common issues
16. **Performance**: Optimization tips if relevant
17. **Migration**: If replacing deprecated component
18. **Theming**: Customization guidance if complex

## Writing Guidelines

### Content Style

- **Be concise**: Use clear, direct language
- **Be actionable**: Provide copy-paste ready examples
- **Be helpful**: Anticipate questions and pain points
- **Be consistent**: Use the same terminology throughout

### Code Examples

- Use realistic, production-like examples
- Include comments for complex logic
- Highlight important lines with `{lineNumbers}`
- Add file paths with `title="path/to/file.tsx"`
- Show both TypeScript and pattern variations

### Accessibility

- Always include keyboard navigation details
- Provide screen reader announcement examples
- List ARIA attributes automatically handled
- Explain color contrast compliance

### Visual Examples

- Use live code blocks when possible (`tsx live`)
- Include static examples for complex scenarios
- Show components in different states
- Demonstrate responsive behavior if applicable

## Markdown Features

### Code Block with Highlighting

````markdown
```tsx title="src/App.tsx" {3-5}
import { Component } from '@grasdouble/lufa_design-system';

// These lines are highlighted
const example = true;
return <Component />;
`````

`````

### Live Interactive Example

````markdown
```tsx live
function Example() {
  return <Button>Click Me</Button>;
}
```
`````

### Callouts

```markdown
> 💡 **Tip**: Helpful tip for users

> ⚠️ **Warning**: Important warning about edge cases

> 🚨 **Deprecated**: This API is deprecated and will be removed in v2.0.0
```

### Tabs for Variants

```markdown
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="variant1" label="Variant 1">
    Content for variant 1
  </TabItem>
  <TabItem value="variant2" label="Variant 2">
    Content for variant 2
  </TabItem>
</Tabs>
```

## Example: Complete Documentation

See [Button component documentation](/docs/interaction/button) for a complete example following this template.

## Checklist for New Component Docs

Use this checklist when creating component documentation:

- [ ] Created `.mdx` file in appropriate category folder
- [ ] Added frontmatter with `sidebar_position`
- [ ] Imported component from design system package
- [ ] Added `DarkModeCompatible` badge
- [ ] Written brief description (1-2 sentences)
- [ ] Included import statement
- [ ] Provided basic usage example
- [ ] Created complete API reference table
- [ ] Documented all variants with examples
- [ ] Added anatomy section with visual breakdown
- [ ] Included accessibility section with:
  - [ ] Keyboard navigation details
  - [ ] Screen reader examples
  - [ ] ARIA attributes
  - [ ] Color contrast information
- [ ] Listed best practices (Do's and Don'ts)
- [ ] Added 3-5 common patterns with real-world examples
- [ ] Linked to related components
- [ ] Included TypeScript type definition
- [ ] Added file to sidebar configuration
- [ ] Tested all code examples
- [ ] Verified links work
- [ ] Checked in both light and dark modes

## Resources

- [Button Component](/docs/interaction/button) - Example of well-documented component
- [MDX Documentation](https://mdxjs.com/) - MDX syntax reference
- [Docusaurus Docs](https://docusaurus.io/docs/markdown-features) - Markdown features
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibility standards

## Contributing

Help us improve this template:

1. Use this template for new component docs
2. Suggest improvements via [GitHub Issues](https://github.com/grasdouble/Lufa/issues)
3. Share examples of excellent component documentation
4. Provide feedback on what's missing or unclear
