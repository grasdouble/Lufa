# Story Writing Guide

> **Guide complet pour écrire des stories Storybook de qualité**

[← Back to README](../README.md) | [See Rules](./STORY_RULES.md) | [See Templates](./STORY_TEMPLATE.md)

---

## 📖 Table of Contents

1. [Introduction](#introduction)
2. [Quick Start](#quick-start)
3. [Story Structure](#story-structure)
4. [Color Management](#color-management)
5. [Visual Patterns](#visual-patterns)
6. [Helper Components](#helper-components)
7. [Interactive Features](#interactive-features)
8. [Best Practices](#best-practices)
9. [Common Patterns](#common-patterns)
10. [Troubleshooting](#troubleshooting)

---

## Introduction

### What Makes a Good Story?

A good Storybook story should:

1. **Demonstrate a specific feature** - Focus on one prop or functionality
2. **Show visual feedback** - Use colors/styles to make functionality obvious
3. **Provide clean code examples** - Show simple, reusable code
4. **Be interactive** - Respond to hover, clicks, or controls
5. **Follow design system patterns** - Use consistent colors and helpers

### Story Philosophy

**Stories are NOT:**

- ❌ Unit tests (use Playwright for that)
- ❌ Full documentation (use Docusaurus for that)
- ❌ Production UI components

**Stories ARE:**

- ✅ Visual demonstrations
- ✅ Interactive playgrounds
- ✅ Quick reference examples
- ✅ Design system showcases

---

## Quick Start

### 1. Create a New Story File

```bash
# Location: src/stories/[category]/[ComponentName].stories.tsx
# Example: src/stories/primitives/Box.stories.tsx
```

### 2. Basic Story Setup

```typescript
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@grasdouble/lufa_design-system';

import { CodeBlock, PropCard, StoryContainer } from '../../components/helpers';
import { STORY_COLORS } from '../../constants/storyColors';

const meta: Meta<typeof Box> = {
  title: 'Primitives/Box',
  component: Box,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Box>;
```

### 3. Create Your First Story

```typescript
export const PropExample: Story = {
  name: 'Prop: example',
  render: () => {
    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <PropCard label="Example">
            <Box style={{ backgroundColor: STORY_COLORS.primary.blue.light, padding: '20px' }}>
              Hello Storybook!
            </Box>
          </PropCard>

          <CodeBlock code="<Box>Hello Storybook!</Box>" language="jsx" title="JSX" />
        </div>
      </StoryContainer>
    );
  },
};
```

### 4. View in Storybook

```bash
pnpm ds:storybook:dev
# Open http://localhost:6006
```

---

## Story Structure

### Standard Story Layout

Every story should follow this structure:

```
┌─────────────────────────────────────────┐
│         StoryContainer                  │
│  ┌───────────────────────────────────┐  │
│  │  Examples Grid                    │  │
│  │  ┌─────────────┐  ┌────────────┐ │  │
│  │  │  PropCard   │  │  PropCard  │ │  │
│  │  │  ┌────────┐ │  │  ┌───────┐ │ │  │
│  │  │  │  Box   │ │  │  │  Box  │ │ │  │
│  │  │  └────────┘ │  │  └───────┘ │ │  │
│  │  └─────────────┘  └────────────┘ │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │  CodeBlock (generated code)       │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Code Structure

```typescript
export const PropExample: Story = {
  render: () => {
    // 1. State (if needed)
    const [state, setState] = React.useState('default');

    // 2. Helper functions
    const generateCode = (variant: string) => {
      return `<Box>${variant}</Box>`;
    };

    // 3. JSX return
    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Examples grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {/* PropCards here */}
          </div>

          {/* Code block */}
          <CodeBlock code={generateCode(state)} language="jsx" title="JSX" />
        </div>
      </StoryContainer>
    );
  },
};
```

---

## Color Management

### Why Use `storyColors.ts`?

The `storyColors.ts` file provides:

1. **Consistency** - Same colors across all stories
2. **Design system integration** - Uses design tokens underneath
3. **Semantic naming** - `directional.top`, `axis.x` make sense
4. **Easy maintenance** - Change colors in one place

### Import Colors

```typescript
import { getColorByIndex, STORY_COLORS } from '../../constants/storyColors';
```

### Choosing the Right Color Set

**Decision tree:**

```
What are you demonstrating?
├─ Individual sides (top/right/bottom/left)?
│   └─ Use STORY_COLORS.directional
│      - top: blue
│      - right: violet
│      - bottom: pink
│      - left: orange
│
├─ Axis properties (X/Y)?
│   └─ Use STORY_COLORS.axis
│      - x: blue (horizontal)
│      - y: orange (vertical)
│      - combined: violet (both)
│
├─ Multiple variants (array mapping)?
│   └─ Use getColorByIndex(index)
│      - Automatically cycles through 6 colors
│
├─ Primary examples/CTAs?
│   └─ Use STORY_COLORS.primary
│      - blue, violet, pink, orange, green, cyan
│
└─ Backgrounds/borders/text?
    └─ Use STORY_COLORS.neutral
       - backgroundLight, border, text, etc.
```

### Color Usage Examples

**Example 1: Directional (paddingTop)**

```typescript
<Box
  paddingTop="spacious"
  style={{
    backgroundColor: STORY_COLORS.directional.top.light,    // Light blue
    border: `2px dashed ${STORY_COLORS.directional.top.main}`, // Blue
  }}
>
  <div style={{ backgroundColor: STORY_COLORS.directional.top.main }}>
    Content
  </div>
</Box>
```

**Example 2: Axis (paddingX)**

```typescript
<Box
  paddingX="spacious"
  style={{
    backgroundColor: STORY_COLORS.axis.x.light,    // Light blue
    border: `2px dashed ${STORY_COLORS.axis.x.main}`, // Blue
  }}
/>
```

**Example 3: Multiple Variants (array)**

```typescript
{variants.map((variant, index) => {
  const colors = getColorByIndex(index); // Cycles through colors
  return (
    <Box
      key={variant}
      style={{
        backgroundColor: colors.light,
        border: `2px solid ${colors.main}`,
      }}
    >
      {variant}
    </Box>
  );
})}
```

---

## Visual Patterns

### Pattern 1: Spacing Visualization (Padding/Margin)

**Problem:** How do we make padding/margin visible in stories?

**Solution:** Use the "border + inner content" pattern

#### The Pattern

```typescript
<Box
  padding="spacious"
  style={{
    backgroundColor: light,        // Light color fills entire Box (including padding)
    border: `2px dashed ${main}`,  // Dashed border shows Box boundary
    position: 'relative',
  }}
>
  {/* Inner content with vibrant background */}
  <div
    style={{
      backgroundColor: main,  // Vibrant color for content
      color: 'white',
      padding: '20px',
      borderRadius: '4px',
    }}
  >
    Content
  </div>

  {/* Label showing exact spacing value */}
  <div
    style={{
      position: 'absolute',
      top: '4px',
      right: '4px',
      backgroundColor: main,
      color: 'white',
      fontSize: '10px',
      fontWeight: 600,
      padding: '2px 6px',
      borderRadius: '3px',
      zIndex: 10,
    }}
  >
    32px
  </div>
</Box>
```

#### Visual Result

```
┌───────────────────────────────────────┐
│ Light background (#dbeafe)            │  ← Box with padding
│ ┌─ Dashed border (#3b82f6)            │
│ │                                     │
│ │  ┌─────────────────────────────┐   │
│ │  │ Vibrant content (#3b82f6)   │   │  ← Content area
│ │  │                             │   │
│ │  └─────────────────────────────┘   │
│ │                          [32px]│   │  ← Label
│ └─────────────────────────────────┘   │
│                                       │
│  ← Space between border and content   │
│     = PADDING (clearly visible!)      │
└───────────────────────────────────────┘
```

#### Why It Works

1. **Light background** fills entire Box (including padding area)
2. **Dashed border** shows Box boundary
3. **Vibrant inner div** shows content area
4. **Gap between border and content** = padding (visually obvious!)
5. **Label** shows exact pixel value

### Pattern 2: Hover Highlighting

**Problem:** Multiple examples, how to show which code corresponds to which example?

**Solution:** Track hovered variant and highlight PropCard

```typescript
const [hoveredVariant, setHoveredVariant] = React.useState<string>('variant1');

return (
  <div>
    {/* Example with hover tracking */}
    <div onMouseEnter={() => setHoveredVariant('variant1')}>
      <PropCard label="Variant 1" highlight={hoveredVariant === 'variant1'}>
        <Box>Content</Box>
      </PropCard>
    </div>

    {/* Code updates based on hover */}
    <CodeBlock code={generateCode(hoveredVariant)} language="jsx" />
  </div>
);
```

**Result:**

- Hover over example → PropCard highlights
- Code block updates to show relevant code
- Clear visual connection between example and code

---

## Helper Components

### StoryContainer

**Purpose:** Consistent wrapper for all stories

```typescript
import { StoryContainer } from '../../components/helpers';

<StoryContainer>
  {/* Story content here */}
</StoryContainer>
```

**What it does:**

- Adds consistent padding
- Centers content
- Provides light background

### PropCard

**Purpose:** Card wrapper for individual examples with optional label and highlight

```typescript
import { PropCard } from '../../components/helpers';

<PropCard label="Example Label" highlight={true}>
  <Box>Content</Box>
</PropCard>
```

**Props:**

- `label` (string) - Title shown above card
- `highlight` (boolean) - Blue border when true (for hover states)
- `children` (ReactNode) - Content to display

### CodeBlock

**Purpose:** Display code with syntax highlighting

```typescript
import { CodeBlock } from '../../components/helpers';

<CodeBlock
  code="<Box>Hello</Box>"
  language="jsx"
  title="JSX"
  subtitle="Optional subtitle"
/>
```

**Props:**

- `code` (string) - Code to display
- `language` (string) - Syntax highlighting language (jsx, typescript, css, etc.)
- `title` (string, optional) - Title above code block
- `subtitle` (string, optional) - Subtitle (useful for variant names)

### MarginVisualizer

**Purpose:** Show margin area around an element

```typescript
import { MarginVisualizer } from '../../components/helpers';

<MarginVisualizer
  margin="32px"
  color={STORY_COLORS.primary.blue.main}
  label="32px margin"
>
  <Box>Content with visible margin</Box>
</MarginVisualizer>
```

**Props:**

- `margin` (string) - Margin size (e.g., "32px")
- `color` (string) - Color for margin visualization
- `label` (string, optional) - Label to display
- `children` (ReactNode) - Content to wrap

**Visual result:** Semi-transparent colored area around content showing margin space

---

## Interactive Features

### State Management

Use React hooks for interactivity:

```typescript
export const InteractiveStory: Story = {
  render: () => {
    // Track state
    const [selectedVariant, setSelectedVariant] = React.useState('default');
    const [isOpen, setIsOpen] = React.useState(false);

    // Handle interactions
    const handleClick = () => {
      setIsOpen(!isOpen);
    };

    return (
      <StoryContainer>
        {/* Interactive elements */}
        <button onClick={handleClick}>Toggle</button>
        {isOpen && <Box>Content</Box>}
      </StoryContainer>
    );
  },
};
```

### Hover States

Track which element is hovered:

```typescript
const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

{items.map((item, index) => (
  <div
    key={index}
    onMouseEnter={() => setHoveredIndex(index)}
    onMouseLeave={() => setHoveredIndex(null)}
  >
    <PropCard highlight={hoveredIndex === index}>
      {item}
    </PropCard>
  </div>
))}
```

### Dynamic Code Generation

Generate code based on current state:

```typescript
const generateCode = (variant: string, size: string): string => {
  let code = `<Box`;

  if (variant !== 'default') {
    code += `\n  variant="${variant}"`;
  }

  if (size !== 'default') {
    code += `\n  size="${size}"`;
  }

  code += `\n>\n  Content\n</Box>`;

  return code;
};

// Usage
<CodeBlock code={generateCode(selectedVariant, selectedSize)} language="jsx" />
```

---

## Best Practices

### ✅ DO

1. **Use semantic color sets**

   ```typescript
   // ✅ Good - semantic
   STORY_COLORS.axis.x; // For horizontal (X)
   STORY_COLORS.directional.top; // For top direction
   ```

2. **Keep stories focused**

   ```typescript
   // ✅ Good - One story = One feature
   export const PropPadding: Story = {
     /* padding only */
   };
   export const PropMargin: Story = {
     /* margin only */
   };
   ```

3. **Provide clean code examples**

   ```typescript
   // ✅ Good - Show what users need
   return `<Box padding="spacious">
   Content
   </Box>`;
   ```

4. **Use helper components**

   ```typescript
   // ✅ Good - Consistent structure
   <StoryContainer>
     <PropCard label="Example">
       <Box>Content</Box>
     </PropCard>
   </StoryContainer>
   ```

5. **Add visual feedback for spacing**
   ```typescript
   // ✅ Good - Spacing is visible
   <Box
     padding="spacious"
     style={{
       backgroundColor: light,
       border: `2px dashed ${main}`,
     }}
   >
     <div style={{ backgroundColor: main }}>Content</div>
   </Box>
   ```

### ❌ DON'T

1. **Don't use hardcoded colors**

   ```typescript
   // ❌ Bad
   backgroundColor: '#3b82f6';

   // ✅ Good
   backgroundColor: STORY_COLORS.primary.blue.main;
   ```

2. **Don't mix concerns**

   ```typescript
   // ❌ Bad - Too many concepts
   export const EverythingAtOnce: Story = {
     /* Padding, margin, display, colors, variants all mixed */
   };
   ```

3. **Don't show complex story code in examples**

   ```typescript
   // ❌ Bad - Too complex for users
   return `<Box style={{ 
     backgroundColor: '#dbeafe',
     border: '2px dashed #3b82f6',
     position: 'relative'
   }}>Content</Box>`;

   // ✅ Good - Simple, reusable
   return `<Box padding="spacious">
   Content
   </Box>`;
   ```

4. **Don't forget accessibility**

   ```typescript
   // ❌ Bad - Not keyboard accessible
   <div onClick={handleClick}>Click me</div>

   // ✅ Good - Semantic, accessible
   <button onClick={handleClick}>Click me</button>
   ```

5. **Don't use semantic backgrounds for spacing stories**

   ```typescript
   // ❌ Bad - Spacing not visible
   <Box padding="spacious" background="info">Content</Box>

   // ✅ Good - Spacing clearly visible
   <Box
     padding="spacious"
     style={{
       backgroundColor: light,
       border: `2px dashed ${main}`,
     }}
   >
     <div style={{ backgroundColor: main }}>Content</div>
   </Box>
   ```

---

## Common Patterns

### Pattern: Grid Layout for Examples

```typescript
<div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
  }}
>
  {/* Examples here */}
</div>
```

**Result:** Responsive grid that adjusts to screen size

### Pattern: Flex Layout for Examples

```typescript
<div
  style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  }}
>
  {/* Examples stacked vertically */}
</div>
```

### Pattern: Array Mapping with Colors

```typescript
const variants = ['compact', 'default', 'comfortable', 'spacious'];

{variants.map((variant, index) => {
  const colors = getColorByIndex(index);
  return (
    <PropCard key={variant} label={variant}>
      <Box
        padding={variant}
        style={{
          backgroundColor: colors.light,
          border: `2px solid ${colors.main}`,
        }}
      >
        {variant}
      </Box>
    </PropCard>
  );
})}
```

### Pattern: Conditional Rendering

```typescript
const [showAdvanced, setShowAdvanced] = React.useState(false);

return (
  <div>
    <button onClick={() => setShowAdvanced(!showAdvanced)}>
      {showAdvanced ? 'Hide' : 'Show'} Advanced Options
    </button>

    {showAdvanced && (
      <div>
        {/* Advanced options */}
      </div>
    )}
  </div>
);
```

---

## Troubleshooting

### Colors Not Showing?

**Problem:** Colors are not displaying correctly

**Solution:**

1. Check import: `import { STORY_COLORS } from '../../constants/storyColors';`
2. Verify path is correct (adjust `../` based on file location)
3. Check color exists: `console.log(STORY_COLORS.primary.blue.main);`

### Spacing Not Visible?

**Problem:** Padding/margin not clearly visible in story

**Solution:** Use the "border + inner content" pattern:

- Light background for Box (fills entire area)
- Dashed border to show boundary
- Vibrant inner div for content
- Space between = visible padding/margin

### Code Block Not Updating?

**Problem:** Code block doesn't update when hovering examples

**Solution:**

1. Check state: `const [hoveredVariant, setHoveredVariant] = React.useState('default');`
2. Check hover handler: `onMouseEnter={() => setHoveredVariant('variant1')}`
3. Check code generation: `generateCode(hoveredVariant)`

### PropCard Not Highlighting?

**Problem:** PropCard doesn't highlight on hover

**Solution:**

1. Check state: `const [hovered, setHovered] = React.useState(false);`
2. Check hover handlers: `onMouseEnter={() => setHovered(true)}`
3. Check PropCard prop: `<PropCard highlight={hovered}>`

### TypeScript Errors?

**Problem:** TypeScript complaining about types

**Solution:**

1. Use `StoryObj<typeof ComponentName>` for story type
2. Use `React.useState<string>()` for typed state
3. Import types: `import type { Meta, StoryObj } from '@storybook/react';`

---

## Summary

### Story Writing Checklist

Before submitting a story, verify:

- [ ] Uses `STORY_COLORS` for all colors (no hardcoded values)
- [ ] Uses helper components (`StoryContainer`, `PropCard`, `CodeBlock`)
- [ ] Spacing stories use "border + inner content" pattern
- [ ] Code examples are clean and simple (no story-specific styling)
- [ ] Hover states update code dynamically (if multiple examples)
- [ ] Keyboard accessible (semantic HTML, proper ARIA)
- [ ] Follows naming conventions (`Prop*`, `Variant*`, `Playground*`)
- [ ] Uses design system components (not custom implementations)
- [ ] Focused on specific functionality (not overly complex)
- [ ] TypeScript compiles without errors

### Next Steps

1. **Pick a template** from [STORY_TEMPLATE.md](./STORY_TEMPLATE.md)
2. **Follow the rules** in [STORY_RULES.md](./STORY_RULES.md)
3. **Copy existing patterns** from [Box.stories.tsx](./src/stories/primitives/Box.stories.tsx)
4. **Test in Storybook** with `pnpm ds:storybook:dev`
5. **Submit your story** 🎉

---

## Related Documentation

- **[STORY_RULES.md](./STORY_RULES.md)** - All rules and standards
- **[STORY_TEMPLATE.md](./STORY_TEMPLATE.md)** - Copy-paste templates
- **[src/constants/storyColors.ts](../src/constants/storyColors.ts)** - Color definitions
- **[src/components/helpers/README.md](../src/components/helpers/README.md)** - Helper components

---

**Last Updated:** January 23, 2026  
**Status:** ✅ Production Ready
