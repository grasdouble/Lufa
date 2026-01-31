# AI Code Patterns: Storybook (Strict)

> **Strict patterns aligned with Storybook rules/templates.**
> Source of truth:
> - `packages/design-system/storybook/_docs/story-guide.md`
> - `packages/design-system/storybook/_docs/story-rules.md`
> - `packages/design-system/storybook/_docs/story-template.md`

## Usage

Copy these patterns exactly. Replace `[Component]` and props with real values.
Do **not** add `tags: ['autodocs']` unless explicitly requested.

---

## PATTERN: BASIC_GRID

Use for displaying simple variants in a grid.

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { [Component] } from '@grasdouble/lufa_design-system';

import { CodeBlock, PropCard, StoryContainer } from '../../components/helpers';
import { STORY_COLORS } from '../../constants/storyColors';

const meta = {
  title: 'Primitives/[Component]',
  component: [Component],
  parameters: { layout: 'padded' },
  argTypes: {},
} satisfies Meta<typeof [Component]>;

export default meta;
type Story = StoryObj<typeof [Component]>;

export const PropVariants: Story = {
  name: 'Prop: variants',
  render: () => (
    <StoryContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
          }}
        >
          <PropCard label="Variant A">
            <[Component] />
          </PropCard>
          <PropCard label="Variant B">
            <[Component] />
          </PropCard>
        </div>
        <CodeBlock code={`<[Component] />`} language="jsx" title="JSX" />
      </div>
    </StoryContainer>
  ),
};
```

---

## PATTERN: SPACING_VISUALIZER

Use for **padding/margin** stories with the strict “border + inner content” pattern.

```typescript
export const PropPadding: StoryObj<typeof Box> = {
  name: 'Prop: padding',
  render: () => {
    const variants = [
      { label: 'compact', size: '16px', val: 'compact' },
      { label: 'default', size: '24px', val: 'default' },
      { label: 'spacious', size: '48px', val: 'spacious' },
    ];

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
            }}
          >
            {variants.map((v, i) => {
              const colors = getColorByIndex(i);
              return (
                <PropCard key={v.val} label={`padding="${v.label}"`}>
                  <Box
                    padding={v.val}
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
                        color: STORY_COLORS.neutral.white,
                        fontSize: '14px',
                        fontWeight: 600,
                        textAlign: 'center',
                        padding: '20px',
                        borderRadius: '4px',
                      }}
                    >
                      {v.label}
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        backgroundColor: colors.main,
                        color: STORY_COLORS.neutral.white,
                        fontSize: '10px',
                        fontWeight: 600,
                        padding: '2px 6px',
                        borderRadius: '3px',
                        zIndex: 10,
                      }}
                    >
                      {v.size}
                    </div>
                  </Box>
                </PropCard>
              );
            })}
          </div>
          <CodeBlock
            code={`<Box padding="spacious">\n  Content\n</Box>`}
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

## PATTERN: INTERACTIVE_HOVER

Use when multiple examples should update the code block.

```typescript
export const PropVariants: StoryObj = {
  name: 'Prop: variants',
  render: () => {
    const [active, setActive] = React.useState('variant-a');

    const generateCode = (val: string) => `<[Component] variant="${val}" />`;

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            <div onMouseEnter={() => setActive('variant-a')}>
              <PropCard label="Variant A" highlight={active === 'variant-a'}>
                <[Component] variant="variant-a" />
              </PropCard>
            </div>
            <div onMouseEnter={() => setActive('variant-b')}>
              <PropCard label="Variant B" highlight={active === 'variant-b'}>
                <[Component] variant="variant-b" />
              </PropCard>
            </div>
          </div>
          <CodeBlock code={generateCode(active)} language="jsx" title="JSX" subtitle={active} />
        </div>
      </StoryContainer>
    );
  },
};
```

---

## PATTERN: PLAYGROUND

Use for full interactive control outside of ArgsTable.

```typescript
export const Playground: StoryObj = {
  name: 'Playground',
  render: () => {
    const [variant, setVariant] = React.useState('default');

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ padding: '20px', backgroundColor: STORY_COLORS.neutral.backgroundLight }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Variant</label>
            <select value={variant} onChange={(e) => setVariant(e.target.value)}>
              <option value="default">Default</option>
              <option value="primary">Primary</option>
            </select>
          </div>

          <[Component] variant={variant} />

          <CodeBlock code={`<[Component] variant="${variant}" />`} language="jsx" title="JSX" />
        </div>
      </StoryContainer>
    );
  },
};
```
