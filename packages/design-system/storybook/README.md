[← Back to Design System Overview](../README.md)

# Lufa Design System Storybook

[![Storybook](https://img.shields.io/badge/Storybook-10.x-FF4785?style=flat-square&logo=storybook)](https://storybook.js.org)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](../../LICENSE.md)

> Interactive component explorer and documentation for the Lufa Design System

**Part of the [Lufa Design System](../README.md)** - Component Explorer & Testing

## Overview

This Storybook instance serves as the primary documentation and testing environment for all Lufa Design System components. It provides an interactive playground for developers and designers to explore, test, and understand component behavior.

### What's Inside

- **Component Catalog** - Browse all available components with live examples
- **Interactive Controls** - Test components with different props in real-time
- **Accessibility Testing** - Built-in a11y auditing for WCAG compliance
- **Theme Switching** - Preview components in light/dark and custom themes
- **Code Examples** - Copy-paste ready code snippets
- **Documentation** - Inline docs with MDX support

## Development

```bash
# Start Storybook dev server
pnpm ds:storybook:dev

# Build Storybook for production
pnpm ds:storybook:build

# Lint stories
pnpm ds:storybook:lint

# Format stories
pnpm ds:storybook:prettier
```

## 📖 Story Documentation

**Complete story writing guide:**

| Document                                          | Purpose                          | Use When                           |
| ------------------------------------------------- | -------------------------------- | ---------------------------------- |
| **[STORY_GUIDE.md](./docs/STORY_GUIDE.md)**       | Complete guide with explanations | Learning how to write stories      |
| **[STORY_RULES.md](./docs/STORY_RULES.md)**       | All rules and standards          | Quick reference during development |
| **[STORY_TEMPLATE.md](./docs/STORY_TEMPLATE.md)** | Copy-paste templates             | Starting a new story               |

### Quick Start

1. **New to story writing?** → Start with [STORY_GUIDE.md](./docs/STORY_GUIDE.md)
2. **Need a template?** → Check [STORY_TEMPLATE.md](./docs/STORY_TEMPLATE.md)
3. **Quick rule lookup?** → See [STORY_RULES.md](./docs/STORY_RULES.md)

### Key Concepts

#### Color Management

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

#### Visual Patterns

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

#### Helper Components

Use helper components for consistent story structure:

```typescript
import {
  CodeBlock, // Code display with syntax highlighting
  MarginVisualizer, // Shows margin area
  PropCard, // Card with label and highlight
  StoryContainer, // Wrapper for all stories
} from '../../components/helpers';
```

**See:** [src/components/helpers/README.md](./src/components/helpers/README.md)

---

## Writing Stories

### Basic Story Structure

```tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@grasdouble/lufa_design-system';

import { CodeBlock, PropCard, StoryContainer } from '../../components/helpers';
import { STORY_COLORS } from '../../constants/storyColors';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  render: () => {
    return (
      <StoryContainer>
        <PropCard label="Primary Button">
          <Button variant="primary">Click me</Button>
        </PropCard>

        <CodeBlock code='<Button variant="primary">Click me</Button>' language="jsx" title="JSX" />
      </StoryContainer>
    );
  },
};
```

**For complete patterns:** See [STORY_TEMPLATE.md](./docs/STORY_TEMPLATE.md)

### Story Examples

**Best reference:** [Box.stories.tsx](./src/stories/primitives/Box.stories.tsx) - Contains 13+ example stories demonstrating:

- Uniform spacing (padding/margin)
- Axis spacing (X/Y)
- Individual sides (top/right/bottom/left)
- Display modes
- Interactive playgrounds
- Hover states with dynamic code

---

## Addons

Installed Storybook addons:

- **@storybook/addon-themes** - Theme switcher
- **@storybook/addon-docs** - Documentation with MDX

---

## Deployment

Storybook is automatically deployed on pull requests and merges to main.

---

## Project Structure

```
storybook/
├── src/
│   ├── stories/              # Story files
│   │   ├── primitives/       # Primitive components (Box, etc.)
│   │   └── components/       # Complex components
│   ├── components/
│   │   └── helpers/          # Helper components for stories
│   │       ├── StoryContainer.tsx
│   │       ├── PropCard.tsx
│   │       ├── CodeBlock.tsx
│   │       ├── MarginVisualizer.tsx
│   │       └── README.md     # Helper documentation
│   └── constants/
│       └── storyColors.ts    # Standardized story colors
├── docs/
│   ├── STORY_GUIDE.md        # Complete guide (start here)
│   ├── STORY_RULES.md        # Rules and standards
│   ├── STORY_TEMPLATE.md     # Copy-paste templates
│   └── archive/              # Historical documentation
│       └── 2026-01-23/       # Archived docs by date
├── CHANGELOG.md              # Managed by changeset
└── README.md                 # This file
```

---

## Related Packages

- [Design System](../main/) - Component library
- [Design Tokens](../tokens/) - Semantic tokens
- [Documentation](../docusaurus/) - Docusaurus docs

---

## Contributing

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) and [design system instructions](../../../.github/instructions/lufa-design-system.instructions.md) for development guidelines.

### Story Writing Checklist

Before submitting a story:

- [ ] Uses `STORY_COLORS` for all colors
- [ ] Uses helper components (`StoryContainer`, `PropCard`, `CodeBlock`)
- [ ] Spacing stories use "border + inner content" pattern
- [ ] Code examples are clean (no story-specific styling)
- [ ] Follows naming conventions
- [ ] TypeScript compiles without errors

**Full checklist:** See [STORY_GUIDE.md](./docs/STORY_GUIDE.md#story-writing-checklist)

---

**Status:** ✅ Production Ready  
**Last Updated:** January 23, 2026
