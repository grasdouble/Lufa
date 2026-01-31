import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Stack } from '@grasdouble/lufa_design-system';

import { CodeBlock, PropCard, StoryContainer } from '../../components/helpers';
import { getColorByIndex, STORY_COLORS } from '../../constants/storyColors';

const NEUTRAL = STORY_COLORS.neutral;

/**
 * Stack - Flexible Layout Primitive for Spacing
 *
 * A specialized layout component that automatically manages spacing between
 * child elements using Flexbox gap property.
 *
 * ## Features
 * - ✅ Direction control (vertical/horizontal)
 * - ✅ Gap-based spacing (semantic tokens)
 * - ✅ Flexbox alignment (align-items and justify-content)
 * - ✅ Flex wrap support for responsive layouts
 * - ✅ Polymorphic `as` prop for semantic HTML
 * - ✅ Performance-optimized (CSS classes, not inline styles)
 */
const meta = {
  title: '4. Primitives/Stack',
  component: Stack,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    // Polymorphic
    as: {
      control: 'select',
      options: ['div', 'section', 'article', 'header', 'footer', 'main', 'nav', 'aside', 'ul', 'ol'],
      description: 'HTML element to render',
      table: {
        category: 'Polymorphic',
        type: { summary: 'ElementType' },
        defaultValue: { summary: 'div' },
      },
    },

    // Layout
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Layout direction (flex-direction)',
      table: {
        category: 'Layout',
        type: { summary: 'DirectionValue' },
        defaultValue: { summary: 'vertical' },
      },
    },
    spacing: {
      control: 'select',
      options: ['none', 'tight', 'compact', 'default', 'comfortable', 'spacious'],
      description: 'Spacing between children (gap)',
      table: {
        category: 'Layout',
        type: { summary: 'SpacingValue' },
        defaultValue: { summary: 'default' },
      },
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
      description: 'Cross-axis alignment (align-items)',
      table: {
        category: 'Layout',
        type: { summary: 'AlignValue' },
        defaultValue: { summary: 'stretch' },
      },
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'],
      description: 'Main-axis justification (justify-content)',
      table: {
        category: 'Layout',
        type: { summary: 'JustifyValue' },
        defaultValue: { summary: 'start' },
      },
    },
    wrap: {
      control: 'boolean',
      description: 'Whether to wrap children (flex-wrap)',
      table: {
        category: 'Layout',
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },

    // Standard
    children: {
      control: 'text',
      table: { category: 'Content', type: { summary: 'ReactNode' } },
    },
    className: {
      control: 'text',
      table: { category: 'Advanced', type: { summary: 'string' } },
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// PLAYGROUND
// ============================================

/**
 * ## Playground
 *
 * Interactive playground to experiment with all Stack props.
 */
export const Playground: Story = {
  args: {
    direction: 'vertical',
    spacing: 'default',
    align: 'stretch',
    justify: 'start',
    wrap: false,
  },
  render: (args) => {
    return (
      <StoryContainer>
        <Stack {...args}>
          <div
            style={{
              padding: '16px',
              background: STORY_COLORS.primary.blue.main,
              color: 'white',
              borderRadius: '8px',
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            Item 1
          </div>
          <div
            style={{
              padding: '16px',
              background: STORY_COLORS.primary.violet.main,
              color: 'white',
              borderRadius: '8px',
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            Item 2
          </div>
          <div
            style={{
              padding: '16px',
              background: STORY_COLORS.primary.pink.main,
              color: 'white',
              borderRadius: '8px',
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            Item 3
          </div>
        </Stack>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: DIRECTION
// ============================================

/**
 * ## Prop: `direction`
 *
 * Controls the layout direction (vertical or horizontal).
 */
export const PropDirection: Story = {
  render: () => {
    const [selectedDirection, setSelectedDirection] = React.useState<string>('vertical');

    const generateCode = (direction: string): string => {
      return `<Stack direction="${direction}" spacing="default">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>`;
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Examples */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
            <div onMouseEnter={() => setSelectedDirection('vertical')}>
              <PropCard label='direction="vertical"' highlight={selectedDirection === 'vertical'}>
                <Stack direction="vertical" spacing="default">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      style={{
                        padding: '16px',
                        background: getColorByIndex(i - 1).main,
                        color: 'white',
                        borderRadius: '8px',
                        fontWeight: 600,
                        textAlign: 'center',
                      }}
                    >
                      Item {i}
                    </div>
                  ))}
                </Stack>
              </PropCard>
            </div>

            <div onMouseEnter={() => setSelectedDirection('horizontal')}>
              <PropCard label='direction="horizontal"' highlight={selectedDirection === 'horizontal'}>
                <Stack direction="horizontal" spacing="default">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      style={{
                        padding: '16px',
                        background: getColorByIndex(i - 1).main,
                        color: 'white',
                        borderRadius: '8px',
                        fontWeight: 600,
                        textAlign: 'center',
                        minWidth: '80px',
                      }}
                    >
                      Item {i}
                    </div>
                  ))}
                </Stack>
              </PropCard>
            </div>
          </div>

          {/* Code block */}
          <CodeBlock
            code={generateCode(selectedDirection)}
            language="jsx"
            title="JSX"
            subtitle={`direction="${selectedDirection}"`}
          />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: SPACING
// ============================================

/**
 * ## Prop: `spacing`
 *
 * Controls the gap between child elements.
 */
export const PropSpacing: Story = {
  render: () => {
    const [hoveredSpacing, setHoveredSpacing] = React.useState<string>('default');

    const spacingValues = [
      { value: 'none' as const, size: '4px', color: STORY_COLORS.neutral.borderMedium },
      { value: 'tight' as const, size: '4px', color: STORY_COLORS.primary.cyan },
      { value: 'compact' as const, size: '8px', color: STORY_COLORS.primary.green },
      { value: 'default' as const, size: '16px', color: STORY_COLORS.primary.blue },
      { value: 'comfortable' as const, size: '24px', color: STORY_COLORS.primary.violet },
      { value: 'spacious' as const, size: '32px', color: STORY_COLORS.primary.pink },
    ];

    const generateCode = (spacing: string): string => {
      return `<Stack spacing="${spacing}">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>`;
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grid of examples */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
            {spacingValues.map(({ value, size, color }) => (
              <div key={value} onMouseEnter={() => setHoveredSpacing(value)}>
                <PropCard label={`spacing="${value}" (${size})`} highlight={hoveredSpacing === value}>
                  <Stack spacing={value}>
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        style={{
                          padding: '12px',
                          background: color,
                          color: 'white',
                          borderRadius: '6px',
                          fontSize: '13px',
                          fontWeight: 600,
                          textAlign: 'center',
                        }}
                      >
                        Item {i}
                      </div>
                    ))}
                  </Stack>
                </PropCard>
              </div>
            ))}
          </div>

          {/* Code block */}
          <CodeBlock
            code={generateCode(hoveredSpacing)}
            language="jsx"
            title="JSX"
            subtitle={`spacing="${hoveredSpacing}"`}
          />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: ALIGN
// ============================================

/**
 * ## Prop: `align`
 *
 * Controls cross-axis alignment of children.
 */
export const PropAlign: Story = {
  render: () => {
    const [hoveredAlign, setHoveredAlign] = React.useState<string>('stretch');

    const alignValues = ['start', 'center', 'end', 'stretch', 'baseline'] as const;

    const generateCode = (align: string): string => {
      return `<Stack direction="horizontal" align="${align}" spacing="default">
  <div style={{ height: '40px' }}>Item 1</div>
  <div style={{ height: '60px' }}>Item 2</div>
  <div style={{ height: '50px' }}>Item 3</div>
</Stack>`;
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grid of examples */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {alignValues.map((value) => (
              <div key={value} onMouseEnter={() => setHoveredAlign(value)}>
                <PropCard label={`align="${value}"`} highlight={hoveredAlign === value}>
                  <div style={{ border: `2px dashed ${STORY_COLORS.neutral.borderMedium}`, padding: '8px' }}>
                    <Stack direction="horizontal" align={value} spacing="default">
                      <div
                        style={{
                          padding: '12px',
                          background: STORY_COLORS.primary.blue.main,
                          color: 'white',
                          borderRadius: '6px',
                          fontWeight: 600,
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        40px
                      </div>
                      <div
                        style={{
                          padding: '12px',
                          background: STORY_COLORS.primary.violet.main,
                          color: 'white',
                          borderRadius: '6px',
                          fontWeight: 600,
                          height: '60px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        60px
                      </div>
                      <div
                        style={{
                          padding: '12px',
                          background: STORY_COLORS.primary.pink.main,
                          color: 'white',
                          borderRadius: '6px',
                          fontWeight: 600,
                          height: '50px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        50px
                      </div>
                    </Stack>
                  </div>
                </PropCard>
              </div>
            ))}
          </div>

          {/* Code block */}
          <CodeBlock
            code={generateCode(hoveredAlign)}
            language="jsx"
            title="JSX"
            subtitle={`align="${hoveredAlign}"`}
          />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: JUSTIFY
// ============================================

/**
 * ## Prop: `justify`
 *
 * Controls main-axis justification of children.
 */
export const PropJustify: Story = {
  render: () => {
    const [hoveredJustify, setHoveredJustify] = React.useState<string>('start');

    const justifyValues = ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'] as const;

    const generateCode = (justify: string): string => {
      return `<Stack direction="horizontal" justify="${justify}" spacing="default">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>`;
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grid of examples */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
            {justifyValues.map((value, idx) => (
              <div key={value} onMouseEnter={() => setHoveredJustify(value)}>
                <PropCard label={`justify="${value}"`} highlight={hoveredJustify === value}>
                  <div style={{ border: `2px dashed ${STORY_COLORS.neutral.borderMedium}`, padding: '8px' }}>
                    <Stack
                      direction="horizontal"
                      justify={value}
                      spacing={value.startsWith('space') ? 'none' : 'default'}
                    >
                      {[1, 2, 3].map((i) => {
                        const color = getColorByIndex(idx);
                        return (
                          <div
                            key={i}
                            style={{
                              padding: '12px 16px',
                              background: color.main,
                              color: 'white',
                              borderRadius: '6px',
                              fontWeight: 600,
                              fontSize: '13px',
                            }}
                          >
                            {i}
                          </div>
                        );
                      })}
                    </Stack>
                  </div>
                </PropCard>
              </div>
            ))}
          </div>

          {/* Code block */}
          <CodeBlock
            code={generateCode(hoveredJustify)}
            language="jsx"
            title="JSX"
            subtitle={`justify="${hoveredJustify}"`}
          />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: WRAP
// ============================================

/**
 * ## Prop: `wrap`
 *
 * Controls whether children wrap to new lines when overflowing.
 */
export const PropWrap: Story = {
  render: () => {
    const [hoveredWrap, setHoveredWrap] = React.useState<string>('nowrap');

    const generateCode = (wrap: boolean): string => {
      return `<Stack direction="horizontal" wrap={${wrap}} spacing="default">
  {items.map(item => <Card key={item.id} />)}
</Stack>`;
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Examples */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div onMouseEnter={() => setHoveredWrap('nowrap')}>
              <PropCard label="wrap={false} (default)" highlight={hoveredWrap === 'nowrap'}>
                <div
                  style={{ border: `2px dashed ${STORY_COLORS.neutral.borderMedium}`, padding: '8px', width: '100%' }}
                >
                  <Stack direction="horizontal" wrap={false} spacing="default">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div
                        key={i}
                        style={{
                          padding: '12px 16px',
                          background: getColorByIndex(i - 1).main,
                          color: 'white',
                          borderRadius: '6px',
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Item {i}
                      </div>
                    ))}
                  </Stack>
                </div>
              </PropCard>
            </div>

            <div onMouseEnter={() => setHoveredWrap('wrap')}>
              <PropCard label="wrap={true}" highlight={hoveredWrap === 'wrap'}>
                <div
                  style={{ border: `2px dashed ${STORY_COLORS.neutral.borderMedium}`, padding: '8px', width: '100%' }}
                >
                  <Stack direction="horizontal" wrap spacing="default">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div
                        key={i}
                        style={{
                          padding: '12px 16px',
                          background: getColorByIndex(i - 1).main,
                          color: 'white',
                          borderRadius: '6px',
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Item {i}
                      </div>
                    ))}
                  </Stack>
                </div>
              </PropCard>
            </div>
          </div>

          {/* Code block */}
          <CodeBlock code={generateCode(hoveredWrap === 'wrap')} language="jsx" title="JSX" subtitle={hoveredWrap} />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: AS (Polymorphic)
// ============================================

/**
 * ## Prop: `as`
 *
 * Renders Stack as different HTML elements for semantic markup.
 */
export const PropAs: Story = {
  render: () => {
    const [selectedElement, setSelectedElement] = React.useState<string>('div');

    const generateCode = (element: string): string => {
      return `<Stack as="${element}" spacing="default">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>`;
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grid of examples */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {(['div', 'section', 'article', 'header', 'footer', 'main', 'nav', 'aside'] as const).map((element) => (
              <PropCard
                key={element}
                label={`<${element}>`}
                highlight={selectedElement === element}
                onInteraction={() => setSelectedElement(element)}
                interactionType="click"
              >
                <Stack
                  as={element}
                  spacing="compact"
                  style={{
                    padding: '16px',
                    background: STORY_COLORS.neutral.backgroundLight,
                    borderRadius: '8px',
                    border: `2px solid ${STORY_COLORS.neutral.borderMedium}`,
                  }}
                >
                  <div
                    style={{
                      padding: '8px',
                      background: 'STORY_COLORS.themed.background.surface',
                      borderRadius: '4px',
                      fontSize: '13px',
                      fontWeight: 600,
                      textAlign: 'center',
                    }}
                  >
                    {element}
                  </div>
                </Stack>
              </PropCard>
            ))}
          </div>

          {/* Code block */}
          <CodeBlock
            code={generateCode(selectedElement)}
            language="jsx"
            title="JSX"
            subtitle={`as="${selectedElement}"`}
          />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// COMBINED VARIANTS
// ============================================

/**
 * ## Combined Variants
 *
 * Real-world examples combining multiple props.
 */
export const CombinedVariants: Story = {
  render: () => {
    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Example 1: Vertical Form Layout */}
          <section>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>Vertical Form Layout</h3>
            <Stack spacing="comfortable">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '14px', fontWeight: 600 }}>Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  style={{ padding: '8px', borderRadius: '6px', border: `1px solid ${NEUTRAL.borderMedium}` }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '14px', fontWeight: 600 }}>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={{ padding: '8px', borderRadius: '6px', border: `1px solid ${NEUTRAL.borderMedium}` }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '14px', fontWeight: 600 }}>Message</label>
                <textarea
                  placeholder="Your message"
                  style={{
                    padding: '8px',
                    borderRadius: '6px',
                    border: `1px solid ${NEUTRAL.borderMedium}`,
                    minHeight: '80px',
                  }}
                />
              </div>
            </Stack>
          </section>

          {/* Example 2: Horizontal Navigation */}
          <section>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>Horizontal Navigation</h3>
            <Stack
              direction="horizontal"
              spacing="comfortable"
              align="center"
              justify="space-between"
              style={{ padding: '16px', background: STORY_COLORS.neutral.backgroundLight, borderRadius: '8px' }}
            >
              <div style={{ fontSize: '18px', fontWeight: 700 }}>Logo</div>
              <Stack direction="horizontal" spacing="default" align="center">
                <a href="#" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 600 }}>
                  Home
                </a>
                <a href="#" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 600 }}>
                  About
                </a>
                <a href="#" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 600 }}>
                  Services
                </a>
                <a href="#" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 600 }}>
                  Contact
                </a>
              </Stack>
            </Stack>
          </section>

          {/* Example 3: Card Grid */}
          <section>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>Responsive Card Grid</h3>
            <Stack direction="horizontal" spacing="default" wrap justify="start">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  style={{
                    padding: '24px',
                    background: getColorByIndex(i - 1).main,
                    color: 'white',
                    borderRadius: '12px',
                    fontWeight: 600,
                    minWidth: '150px',
                    textAlign: 'center',
                  }}
                >
                  Card {i}
                </div>
              ))}
            </Stack>
          </section>

          {/* Example 4: Button Group */}
          <section>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>Button Group</h3>
            <Stack direction="horizontal" spacing="compact" align="center">
              <button
                style={{
                  padding: '10px 20px',
                  borderRadius: '6px',
                  border: 'none',
                  background: STORY_COLORS.primary.blue.main,
                  color: 'white',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Primary
              </button>
              <button
                style={{
                  padding: '10px 20px',
                  borderRadius: '6px',
                  border: `1px solid ${STORY_COLORS.primary.blue.main}`,
                  background: 'STORY_COLORS.themed.background.surface',
                  color: STORY_COLORS.primary.blue.main,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Secondary
              </button>
              <button
                style={{
                  padding: '10px 20px',
                  borderRadius: '6px',
                  border: `1px solid ${NEUTRAL.borderMedium}`,
                  background: 'STORY_COLORS.themed.background.surface',
                  color: NEUTRAL.textSlate,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </Stack>
          </section>
        </div>
      </StoryContainer>
    );
  },
};
