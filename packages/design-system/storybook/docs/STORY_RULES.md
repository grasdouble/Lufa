# Story Rules & Standards

> **Règles et standards à suivre pour l'écriture des stories Storybook**

[← Back to README](../README.md) | [See Templates](./STORY_TEMPLATE.md) | [Full Guide](./STORY_GUIDE.md)

---

## 🎨 Color Management

### Rule 1: Use `storyColors.ts` for All Story Colors

**✅ ALWAYS** import colors from `../src/constants/storyColors.ts`:

```typescript
import { getColorByIndex, STORY_COLORS } from '../../constants/storyColors';
```

**❌ NEVER** use hardcoded hex/rgb values in stories:

```typescript
// ❌ BAD
const badStyle = { backgroundColor: '#3b82f6', color: '#ffffff' };

// ✅ GOOD
const goodStyle = {
  backgroundColor: STORY_COLORS.primary.blue.main,
  color: STORY_COLORS.neutral.white,
};
```

### Color Mapping Strategies

Choose the right color set based on your use case:

| Use Case                                      | Color Set                  | Example                    |
| --------------------------------------------- | -------------------------- | -------------------------- |
| **Directional props** (top/right/bottom/left) | `STORY_COLORS.directional` | `paddingTop`, `marginLeft` |
| **Axis props** (X/Y)                          | `STORY_COLORS.axis`        | `paddingX`, `marginY`      |
| **Multiple variants** (indexed)               | `getColorByIndex(index)`   | Mapping over arrays        |
| **Primary highlights**                        | `STORY_COLORS.primary`     | Main examples, CTAs        |
| **Neutral elements**                          | `STORY_COLORS.neutral`     | Backgrounds, borders, text |

**Example: Directional Colors**

```typescript
// For paddingTop, paddingRight, paddingBottom, paddingLeft
<Box
  paddingTop="spacious"
  style={{
    backgroundColor: STORY_COLORS.directional.top.light,    // Blue light
    border: `2px dashed ${STORY_COLORS.directional.top.main}`, // Blue
  }}
>
  <div style={{ backgroundColor: STORY_COLORS.directional.top.main }}>
    Content
  </div>
</Box>
```

**Example: Axis Colors**

```typescript
// For paddingX (horizontal)
<Box
  paddingX="spacious"
  style={{
    backgroundColor: STORY_COLORS.axis.x.light,    // Blue light
    border: `2px dashed ${STORY_COLORS.axis.x.main}`, // Blue
  }}
/>

// For paddingY (vertical)
<Box
  paddingY="spacious"
  style={{
    backgroundColor: STORY_COLORS.axis.y.light,    // Orange light
    border: `2px dashed ${STORY_COLORS.axis.y.main}`, // Orange
  }}
/>

// For combined X+Y
<Box
  paddingX="spacious"
  paddingY="compact"
  style={{
    backgroundColor: STORY_COLORS.axis.combined.light,    // Violet light
    border: `2px dashed ${STORY_COLORS.axis.combined.main}`, // Violet
  }}
/>
```

**Example: Indexed Colors**

```typescript
// For mapping over multiple variants
{variants.map((variant, index) => {
  const colors = getColorByIndex(index); // Automatically cycles through 6 colors
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

### Available Color Sets

```typescript
// Primary colors (6 vibrant colors)
STORY_COLORS.primary.blue; // { main: '#3b82f6', light: '#dbeafe' }
STORY_COLORS.primary.violet; // { main: '#8b5cf6', light: '#ede9fe' }
STORY_COLORS.primary.pink; // { main: '#ec4899', light: '#fce7f3' }
STORY_COLORS.primary.orange; // { main: '#f59e0b', light: '#fef3c7' }
STORY_COLORS.primary.green; // { main: '#22c55e', light: '#dcfce7' }
STORY_COLORS.primary.cyan; // { main: '#06b6d4', light: '#cffafe' }

// Directional colors (spatial: top/right/bottom/left)
STORY_COLORS.directional.top; // Blue
STORY_COLORS.directional.right; // Violet
STORY_COLORS.directional.bottom; // Pink
STORY_COLORS.directional.left; // Orange

// Axis colors (X/Y coordinates)
STORY_COLORS.axis.x; // Blue (horizontal)
STORY_COLORS.axis.y; // Orange (vertical)
STORY_COLORS.axis.combined; // Violet (both X+Y)

// Neutral colors (backgrounds, borders, text)
STORY_COLORS.neutral.white; // #ffffff
STORY_COLORS.neutral.backgroundLight; // #f3f4f6 (gray-100)
STORY_COLORS.neutral.backgroundMedium; // #e5e7eb (gray-200)
STORY_COLORS.neutral.border; // #d1d5db (gray-300)
STORY_COLORS.neutral.borderSlate; // #cbd5e1 (slate-300)
STORY_COLORS.neutral.text; // #1f2937 (gray-800)
STORY_COLORS.neutral.textSlate; // #475569 (slate-600)

// Helper function for indexed access
getColorByIndex(index); // Returns { main, light } cycling through 6 colors
```

---

## 📐 Visual Pattern for Spacing (Padding/Margin)

### Rule 2: Use the "Border + Inner Content" Pattern

For **padding** and **margin** stories, use this visual pattern to make spacing clearly visible:

```typescript
<Box
  paddingTop="spacious" // or any spacing prop
  style={{
    backgroundColor: light,        // Light color fills entire Box (including padding)
    border: `2px dashed ${main}`,  // Dashed border shows Box boundary
    position: 'relative',
  }}
>
  {/* Inner content with vibrant background */}
  <div
    style={{
      backgroundColor: main,  // Vibrant color for content area
      color: 'white',
      padding: '20px',
      borderRadius: '4px',
    }}
  >
    Content text
  </div>

  {/* Label showing spacing value */}
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

**Why this works:**

1. Box background (light) fills the entire Box **including padding/margin area**
2. Dashed border shows Box boundary
3. Inner div (vibrant) shows content area
4. **Space between border and inner div = PADDING (visually clear!)**
5. Label shows exact spacing value

**Visual Result:**

```
┌─────────────────────────────────┐
│ Light background (padding area) │  ← Padding visible here!
│  ┌───────────────────────────┐  │
│  │ Vibrant content area      │  │
│  │                           │  │
│  └───────────────────────────┘  │
│                         [32px]  │  ← Label
└─────────────────────────────────┘
  ↑ Dashed border
```

### Rule 3: Avoid Semantic Backgrounds for Spacing Stories

**❌ BAD** - Semantic backgrounds hide the spacing:

```typescript
<Box padding="spacious" background="info">
  Content
</Box>
```

**✅ GOOD** - Custom styling shows spacing clearly:

```typescript
<Box
  padding="spacious"
  style={{
    backgroundColor: STORY_COLORS.primary.blue.light,
    border: `2px dashed ${STORY_COLORS.primary.blue.main}`,
  }}
>
  <div style={{ backgroundColor: STORY_COLORS.primary.blue.main }}>
    Content
  </div>
</Box>
```

---

## 🧩 Story Structure

### Rule 4: Use Helper Components

**Available helpers** (from `src/components/helpers/`):

- **`<StoryContainer>`** - Wrapper for all stories
- **`<PropCard>`** - Card wrapper with optional highlight
- **`<CodeBlock>`** - Code display with syntax highlighting
- **`<MarginVisualizer>`** - Shows margin area (for margin stories)
- **`<PlaygroundContainer>`** - Interactive playground wrapper

```typescript
import { CodeBlock, MarginVisualizer, PropCard, StoryContainer } from '../../components/helpers';
```

**Standard story structure:**

```typescript
export const MyStory: StoryObj<typeof Box> = {
  render: () => {
    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grid of examples */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <PropCard label="Example 1">
              <Box>Content</Box>
            </PropCard>

            <PropCard label="Example 2">
              <Box>Content</Box>
            </PropCard>
          </div>

          {/* Code block */}
          <CodeBlock code="<Box>Content</Box>" language="jsx" title="JSX" />
        </div>
      </StoryContainer>
    );
  },
};
```

### Rule 5: Use Consistent Naming

**Story names** should follow this pattern:

```typescript
export const PropPadding: StoryObj<typeof Box> = { ... };      // Single prop
export const PropPaddingXY: StoryObj<typeof Box> = { ... };    // X/Y variants
export const PropPaddingIndividual: StoryObj<typeof Box> = { ... }; // Individual sides
```

**Prefixes:**

- `Prop*` - Stories demonstrating a specific prop or group of props
- `Variant*` - Stories showing component variants
- `Playground*` - Interactive playgrounds
- `Example*` - Usage examples

---

## 📝 Code Generation

### Rule 6: Provide Clean Code Examples

Use `generateCode()` functions to show **simplified, clean code** without story-specific styling:

```typescript
const generateCode = (variant: string): string => {
  if (variant === 'paddingX') {
    return `<Box paddingX="spacious" borderRadius="default">
  Horizontal padding
</Box>`;
  }
  // ...
};
```

**❌ Don't include** story-specific inline styles in code examples:

```typescript
// ❌ BAD - Too complex for users
return `<Box 
  paddingX="spacious" 
  style={{
    backgroundColor: '#dbeafe',
    border: '2px dashed #3b82f6',
    position: 'relative'
  }}
>
  Content
</Box>`;
```

**✅ Show** only what users need to use the component:

```typescript
// ✅ GOOD - Clean, reusable
return `<Box paddingX="spacious">
  Content
</Box>`;
```

---

## 🎯 Interactive Features

### Rule 7: Use Hover States for Dynamic Code

For stories with multiple variants, use `useState` to track hovered variant and update code:

```typescript
const [hoveredVariant, setHoveredVariant] = React.useState<string>('default');

return (
  <StoryContainer>
    <div style={{ display: 'grid', gap: '24px' }}>
      {/* Examples with hover */}
      <div onMouseEnter={() => setHoveredVariant('variant1')}>
        <PropCard label="Variant 1" highlight={hoveredVariant === 'variant1'}>
          <Box>Content</Box>
        </PropCard>
      </div>

      <div onMouseEnter={() => setHoveredVariant('variant2')}>
        <PropCard label="Variant 2" highlight={hoveredVariant === 'variant2'}>
          <Box>Content</Box>
        </PropCard>
      </div>

      {/* Code block updates based on hover */}
      <CodeBlock code={generateCode(hoveredVariant)} language="jsx" />
    </div>
  </StoryContainer>
);
```

---

## ♿ Accessibility

### Rule 8: Ensure Keyboard Navigation

- Use semantic HTML elements
- Ensure all interactive elements are keyboard accessible
- Test with keyboard navigation (Tab, Enter, Space)

### Rule 9: Provide ARIA Labels

```typescript
<button aria-label="Close dialog">×</button>
```

---

## 📦 Design System Integration

### Rule 10: Always Use Design System Primitives

**Import from design system packages:**

```typescript
// ✅ GOOD
import { Box, Button, TextField } from '@grasdouble/lufa_design-system';
import { STORY_COLORS } from '../../constants/storyColors';

// ❌ BAD - Don't create custom components when DS components exist
const CustomBox = () => <div>...</div>;
```

### Rule 11: Use Design Tokens (Not Hardcoded Values)

Story colors (`storyColors.ts`) are built from design system primitives:

```typescript
// storyColors.ts uses DS primitives internally:
import {
  PrimitiveColorBlue100,
  PrimitiveColorBlue500,
  // ...
} from '@grasdouble/lufa_design-system-tokens';
```

This ensures:

- ✅ Consistency with design system
- ✅ Automatic updates when primitives change
- ✅ Proper color accessibility

---

## 🚫 Anti-Patterns

### ❌ Don't: Use Random Colors

```typescript
// ❌ BAD
const randomColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
```

### ❌ Don't: Mix Color Sources

```typescript
// ❌ BAD
<Box style={{
  backgroundColor: '#3b82f6',  // Hardcoded
  borderColor: STORY_COLORS.primary.blue.main, // From storyColors
}}>
```

### ❌ Don't: Create Overly Complex Stories

**Keep stories focused** on demonstrating specific functionality.

**❌ BAD** - Too many concepts in one story:

```typescript
export const EverythingAtOnce: StoryObj = {
  render: () => (
    <div>
      {/* Padding, margin, display, colors, variants all mixed */}
      {/* 500 lines of code... */}
    </div>
  ),
};
```

**✅ GOOD** - Separate concerns:

```typescript
export const PropPadding: StoryObj = {
  /* Just padding */
};
export const PropMargin: StoryObj = {
  /* Just margin */
};
export const PropDisplay: StoryObj = {
  /* Just display */
};
```

---

## 📚 Reference

**See also:**

- [STORY_TEMPLATE.md](./STORY_TEMPLATE.md) - Copy-paste templates
- [STORY_GUIDE.md](./STORY_GUIDE.md) - Complete guide with examples
- [../src/constants/storyColors.ts](./../src/constants/storyColors.ts) - Color definitions
- [../src/components/helpers/README.md](./../src/components/helpers/README.md) - Helper components

---

## ✅ Quick Checklist

Before committing a story, verify:

- [ ] Uses `STORY_COLORS` (no hardcoded colors)
- [ ] Uses helper components (`StoryContainer`, `PropCard`, `CodeBlock`)
- [ ] Spacing stories use "border + inner content" pattern
- [ ] Code examples are clean (no story-specific styles)
- [ ] Hover states update code dynamically
- [ ] Keyboard accessible
- [ ] Follows naming conventions
- [ ] Uses design system components (not custom implementations)
- [ ] Focused on specific functionality (not overly complex)

---

**Last Updated:** January 23, 2026  
**Status:** ✅ Production Ready
