# Story Templates

> **Templates prêts à copier-coller pour créer de nouvelles stories**

[← Back to README](../README.md) | [See Rules](./STORY_RULES.md) | [Full Guide](./STORY_GUIDE.md)

---

## 📋 Table of Contents

1. [Basic Story Template](#1-basic-story-template)
2. [Spacing Story (Padding/Margin)](#2-spacing-story-paddingmargin)
3. [Axis Spacing (X/Y)](#3-axis-spacing-xy)
4. [Individual Sides (Top/Right/Bottom/Left)](#4-individual-sides-toprightbottomleft)
5. [Multiple Variants with Hover](#5-multiple-variants-with-hover)
6. [Interactive Playground](#6-interactive-playground)

---

## 1. Basic Story Template

**Use case:** Simple component demonstration with multiple variants

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Box } from '@grasdouble/lufa_design-system';
import { StoryContainer, PropCard, CodeBlock } from '../../components/helpers';
import { STORY_COLORS } from '../../constants/storyColors';

const meta: Meta<typeof Box> = {
  title: 'Primitives/Box',
  component: Box,
  tags: ['autodocs'],
};

export default meta;
type StoryObj = StoryObj<typeof Box>;

export const PropExample: StoryObj = {
  name: 'Prop: example',
  render: () => {
    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grid of examples */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            <PropCard label="Example 1">
              <Box
                style={{
                  backgroundColor: STORY_COLORS.primary.blue.light,
                  padding: '20px',
                  borderRadius: '8px',
                }}
              >
                Content here
              </Box>
            </PropCard>

            <PropCard label="Example 2">
              <Box
                style={{
                  backgroundColor: STORY_COLORS.primary.violet.light,
                  padding: '20px',
                  borderRadius: '8px',
                }}
              >
                Content here
              </Box>
            </PropCard>
          </div>

          {/* Code block */}
          <CodeBlock
            code={`<Box>
  Content here
</Box>`}
            language="jsx"
            title="JSX"
          />
        </div>
      </StoryContainer>
    );
  },
};
```

---

## 2. Spacing Story (Padding/Margin)

**Use case:** Demonstrate uniform padding or margin with clear visual indication

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Box } from '@grasdouble/lufa_design-system';
import { StoryContainer, PropCard, CodeBlock } from '../../components/helpers';
import { STORY_COLORS, getColorByIndex } from '../../constants/storyColors';

export const PropPadding: StoryObj<typeof Box> = {
  name: 'Prop: padding',
  render: () => {
    const spacingVariants = [
      { value: 'compact', label: 'compact', size: '16px' },
      { value: 'default', label: 'default', size: '24px' },
      { value: 'comfortable', label: 'comfortable', size: '32px' },
      { value: 'spacious', label: 'spacious', size: '48px' },
    ];

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grid of examples */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
            }}
          >
            {spacingVariants.map((variant, index) => {
              const colors = getColorByIndex(index);

              return (
                <PropCard key={variant.value} label={`padding="${variant.label}"`}>
                  <Box
                    padding={variant.value}
                    borderRadius="default"
                    style={{
                      backgroundColor: colors.light,
                      border: `2px dashed ${colors.main}`,
                      position: 'relative',
                    }}
                  >
                    {/* Inner content with vibrant background */}
                    <div
                      style={{
                        backgroundColor: colors.main,
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 600,
                        textAlign: 'center',
                        padding: '20px',
                        borderRadius: '4px',
                      }}
                    >
                      {variant.label}
                    </div>

                    {/* Label showing padding value */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        backgroundColor: colors.main,
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: 600,
                        padding: '2px 6px',
                        borderRadius: '3px',
                        zIndex: 10,
                      }}
                    >
                      {variant.size}
                    </div>
                  </Box>
                </PropCard>
              );
            })}
          </div>

          {/* Code block */}
          <CodeBlock
            code={`<Box padding="spacious">
  Content
</Box>`}
            language="jsx"
            title="JSX"
          />
        </div>
      </StoryContainer>
    );
  },
};
```

---

## 3. Axis Spacing (X/Y)

**Use case:** Demonstrate horizontal (X) and vertical (Y) spacing with axis-specific colors

```typescript
export const PropPaddingXY: StoryObj<typeof Box> = {
  name: 'Prop: paddingX / paddingY',
  render: () => {
    const [hoveredVariant, setHoveredVariant] = React.useState<string>('paddingX');

    const generateCode = (variant: string): string => {
      if (variant === 'paddingX') {
        return `<Box paddingX="spacious" borderRadius="default">
  Horizontal padding
</Box>`;
      } else if (variant === 'paddingY') {
        return `<Box paddingY="spacious" borderRadius="default">
  Vertical padding
</Box>`;
      } else {
        return `<Box paddingX="spacious" paddingY="compact" borderRadius="default">
  Different X/Y spacing
</Box>`;
      }
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grid of examples */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {/* paddingX */}
            <div onMouseEnter={() => setHoveredVariant('paddingX')}>
              <PropCard label='paddingX="spacious" (← →)' highlight={hoveredVariant === 'paddingX'}>
                <Box
                  paddingX="spacious"
                  borderRadius="default"
                  style={{
                    backgroundColor: STORY_COLORS.axis.x.light,
                    border: `2px dashed ${STORY_COLORS.axis.x.main}`,
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: STORY_COLORS.axis.x.main,
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: 600,
                      textAlign: 'center',
                      padding: '16px',
                      borderRadius: '4px',
                    }}
                  >
                    ← Horizontal padding →
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      backgroundColor: STORY_COLORS.axis.x.main,
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
              </PropCard>
            </div>

            {/* paddingY */}
            <div onMouseEnter={() => setHoveredVariant('paddingY')}>
              <PropCard label='paddingY="spacious" (↑ ↓)' highlight={hoveredVariant === 'paddingY'}>
                <Box
                  paddingY="spacious"
                  borderRadius="default"
                  style={{
                    backgroundColor: STORY_COLORS.axis.y.light,
                    border: `2px dashed ${STORY_COLORS.axis.y.main}`,
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: STORY_COLORS.axis.y.main,
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: 600,
                      textAlign: 'center',
                      padding: '16px',
                      borderRadius: '4px',
                    }}
                  >
                    ↑<br />
                    Vertical padding
                    <br />↓
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      backgroundColor: STORY_COLORS.axis.y.main,
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
              </PropCard>
            </div>

            {/* Combined */}
            <div onMouseEnter={() => setHoveredVariant('combined')}>
              <PropCard label="paddingX + paddingY" highlight={hoveredVariant === 'combined'}>
                <Box
                  paddingX="spacious"
                  paddingY="compact"
                  borderRadius="default"
                  style={{
                    backgroundColor: STORY_COLORS.axis.combined.light,
                    border: `2px dashed ${STORY_COLORS.axis.combined.main}`,
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: STORY_COLORS.axis.combined.main,
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: 600,
                      textAlign: 'center',
                      padding: '16px',
                      borderRadius: '4px',
                    }}
                  >
                    Different X/Y spacing
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      backgroundColor: STORY_COLORS.axis.combined.main,
                      color: 'white',
                      fontSize: '10px',
                      fontWeight: 600,
                      padding: '2px 6px',
                      borderRadius: '3px',
                      zIndex: 10,
                    }}
                  >
                    X:32px Y:16px
                  </div>
                </Box>
              </PropCard>
            </div>
          </div>

          {/* Code block */}
          <CodeBlock
            code={generateCode(hoveredVariant)}
            language="jsx"
            title="JSX"
            subtitle={hoveredVariant === 'combined' ? 'Combined' : hoveredVariant}
          />
        </div>
      </StoryContainer>
    );
  },
};
```

---

## 4. Individual Sides (Top/Right/Bottom/Left)

**Use case:** Demonstrate individual side spacing with directional colors

```typescript
export const PropPaddingIndividual: StoryObj<typeof Box> = {
  name: 'Prop: paddingTop / paddingRight / paddingBottom / paddingLeft',
  render: () => {
    const sides = [
      { prop: 'paddingTop', label: 'Top ↑', colors: STORY_COLORS.directional.top },
      { prop: 'paddingRight', label: 'Right →', colors: STORY_COLORS.directional.right },
      { prop: 'paddingBottom', label: 'Bottom ↓', colors: STORY_COLORS.directional.bottom },
      { prop: 'paddingLeft', label: 'Left ←', colors: STORY_COLORS.directional.left },
    ];

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grid of examples */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
            }}
          >
            {sides.map(({ prop, label, colors }) => (
              <PropCard key={prop} label={`${prop}="spacious"`}>
                <Box
                  {...{ [prop]: 'spacious' }}
                  borderRadius="default"
                  style={{
                    backgroundColor: colors.light,
                    border: `2px dashed ${colors.main}`,
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: colors.main,
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: 600,
                      textAlign: 'center',
                      padding: '20px',
                      borderRadius: '4px',
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      backgroundColor: colors.main,
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
              </PropCard>
            ))}
          </div>

          {/* Code block */}
          <CodeBlock
            code={`<Box paddingTop="spacious">
  Content
</Box>`}
            language="jsx"
            title="JSX"
          />
        </div>
      </StoryContainer>
    );
  },
};
```

---

## 5. Multiple Variants with Hover

**Use case:** Show multiple variants with dynamic code updates on hover

```typescript
export const PropVariants: StoryObj<typeof Box> = {
  name: 'Prop: variants',
  render: () => {
    const [hoveredVariant, setHoveredVariant] = React.useState<string>('variant1');

    const variants = [
      { id: 'variant1', label: 'Variant 1', color: STORY_COLORS.primary.blue },
      { id: 'variant2', label: 'Variant 2', color: STORY_COLORS.primary.violet },
      { id: 'variant3', label: 'Variant 3', color: STORY_COLORS.primary.pink },
    ];

    const generateCode = (variantId: string): string => {
      const variant = variants.find((v) => v.id === variantId);
      return `<Box variant="${variant?.label.toLowerCase()}">
  ${variant?.label}
</Box>`;
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grid of examples */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
            }}
          >
            {variants.map((variant) => (
              <div key={variant.id} onMouseEnter={() => setHoveredVariant(variant.id)}>
                <PropCard label={variant.label} highlight={hoveredVariant === variant.id}>
                  <Box
                    style={{
                      backgroundColor: variant.color.light,
                      border: `2px solid ${variant.color.main}`,
                      padding: '20px',
                      borderRadius: '8px',
                      textAlign: 'center',
                      fontWeight: 600,
                    }}
                  >
                    {variant.label}
                  </Box>
                </PropCard>
              </div>
            ))}
          </div>

          {/* Code block updates on hover */}
          <CodeBlock
            code={generateCode(hoveredVariant)}
            language="jsx"
            title="JSX"
            subtitle={hoveredVariant}
          />
        </div>
      </StoryContainer>
    );
  },
};
```

---

## 6. Interactive Playground

**Use case:** Interactive controls for testing component props

```typescript
export const Playground: StoryObj<typeof Box> = {
  name: '🎮 Playground',
  render: () => {
    const [padding, setPadding] = React.useState<string>('default');
    const [background, setBackground] = React.useState<string>('default');
    const [borderRadius, setBorderRadius] = React.useState<string>('default');

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Controls */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              padding: '20px',
              backgroundColor: STORY_COLORS.neutral.backgroundLight,
              borderRadius: '8px',
            }}
          >
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                Padding
              </label>
              <select
                value={padding}
                onChange={(e) => setPadding(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
              >
                <option value="compact">Compact</option>
                <option value="default">Default</option>
                <option value="comfortable">Comfortable</option>
                <option value="spacious">Spacious</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                Background
              </label>
              <select
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
              >
                <option value="default">Default</option>
                <option value="primary">Primary</option>
                <option value="info">Info</option>
                <option value="success">Success</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                Border Radius
              </label>
              <select
                value={borderRadius}
                onChange={(e) => setBorderRadius(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
              >
                <option value="none">None</option>
                <option value="default">Default</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>

          {/* Preview */}
          <div style={{ padding: '20px' }}>
            <Box padding={padding} background={background} borderRadius={borderRadius}>
              Interactive Box Component
            </Box>
          </div>

          {/* Generated Code */}
          <CodeBlock
            code={`<Box
  padding="${padding}"
  background="${background}"
  borderRadius="${borderRadius}"
>
  Interactive Box Component
</Box>`}
            language="jsx"
            title="Generated Code"
          />
        </div>
      </StoryContainer>
    );
  },
};
```

---

## 🎨 Quick Color Reference

```typescript
import { getColorByIndex, STORY_COLORS } from '../../constants/storyColors';

// Primary colors
STORY_COLORS.primary.blue; // { main: '#3b82f6', light: '#dbeafe' }
STORY_COLORS.primary.violet; // { main: '#8b5cf6', light: '#ede9fe' }
STORY_COLORS.primary.pink; // { main: '#ec4899', light: '#fce7f3' }
STORY_COLORS.primary.orange; // { main: '#f59e0b', light: '#fef3c7' }

// Directional (top/right/bottom/left)
STORY_COLORS.directional.top; // Blue
STORY_COLORS.directional.right; // Violet
STORY_COLORS.directional.bottom; // Pink
STORY_COLORS.directional.left; // Orange

// Axis (X/Y)
STORY_COLORS.axis.x; // Blue (horizontal)
STORY_COLORS.axis.y; // Orange (vertical)
STORY_COLORS.axis.combined; // Violet (both)

// Neutral
STORY_COLORS.neutral.backgroundLight; // #f3f4f6
STORY_COLORS.neutral.border; // #d1d5db
STORY_COLORS.neutral.text; // #1f2937

// Indexed colors (cycles through 6 colors)
getColorByIndex(0); // Blue
getColorByIndex(1); // Violet
getColorByIndex(2); // Pink
// ... automatically cycles
```

---

## 📚 See Also

- [STORY_RULES.md](./STORY_RULES.md) - All rules and standards
- [STORY_GUIDE.md](./STORY_GUIDE.md) - Complete guide with explanations
- [../src/constants/storyColors.ts](./../src/constants/storyColors.ts) - Color definitions
- [../src/components/helpers/README.md](./../src/components/helpers/README.md) - Helper components

---

**Last Updated:** January 23, 2026  
**Status:** ✅ Production Ready
