# Storybook Conventions

## Key Concepts

### Color Management

All stories use standardized colors from `src/constants/storyColors.ts`:

```typescript
import { getColorByIndex, STORY_COLORS } from '../../constants/storyColors';

// Directional colors (top/right/bottom/left)
STORY_COLORS.directional.top.main; // Blue

// Axis colors (X/Y)
STORY_COLORS.axis.x.main; // Blue (horizontal)
STORY_COLORS.axis.y.main; // Orange (vertical)

// Multiple variants (indexed)
getColorByIndex(0); // Blue
getColorByIndex(1); // Violet
```

**Why?**

- ✅ Consistent colors across all stories
- ✅ Built on design system primitives
- ✅ Semantic naming (directional, axis)
- ✅ Easy maintenance

### Visual Patterns

**For spacing stories (padding/margin)**, use the "border + inner content" pattern:

```typescript
<Box
  padding="spacious"
  style={{
    backgroundColor: colors.light,        // Light color fills Box
    border: `2px dashed ${colors.main}`,  // Dashed border
  }}
>
  <div style={{ backgroundColor: colors.main }}>
    Content
  </div>
</Box>
```

**Result:** Space between border and content = padding (clearly visible!)

### Helper Components

Use helper components for consistent story structure:

```typescript
import {
  CodeBlock, // Code display with syntax highlighting
  MarginVisualizer, // Shows margin area
  PropCard, // Card with label and highlight
  StoryContainer, // Wrapper for all stories
} from '../../components/helpers';
```

**See:** [src/components/helpers/README.md](../src/components/helpers/README.md)
