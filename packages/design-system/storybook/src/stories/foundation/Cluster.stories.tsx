import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Cluster } from '@grasdouble/lufa_design-system';

import { CodeBlock, PropCard, StoryContainer } from '../../components/helpers';
import { getColorByIndex, STORY_COLORS } from '../../constants/storyColors';

const NEUTRAL = STORY_COLORS.neutral;

/**
 * Cluster - Layout Primitive for Wrapping Collections
 *
 * A specialized layout component for grouping collections of elements with
 * intelligent wrapping behavior. Perfect for tags, badges, buttons, and other
 * compact elements that need to flow naturally and wrap responsively.
 *
 * **Pattern Origin**: Based on "The Cluster" pattern by Heydon Pickering
 * from Every Layout (https://every-layout.dev/layouts/cluster/)
 *
 * ## Features
 * - ✅ Automatic wrapping (flex-wrap: wrap by default)
 * - ✅ Gap-based spacing (semantic tokens)
 * - ✅ Flexbox alignment (align-items and justify-content)
 * - ✅ Polymorphic `as` prop for semantic HTML
 * - ✅ Performance-optimized (CSS classes, not inline styles)
 * - ✅ No wrapper components needed
 *
 * ## Migrating from Chakra UI
 *
 * **Semantic equivalent of Chakra UI's `Wrap` component.**
 *
 * ```tsx
 * // ❌ Chakra UI (old)
 * import { Wrap, WrapItem } from '@chakra-ui/react';
 *
 * <Wrap spacing={4}>
 *   <WrapItem><Badge>React</Badge></WrapItem>
 *   <WrapItem><Badge>TypeScript</Badge></WrapItem>
 *   <WrapItem><Badge>Next.js</Badge></WrapItem>
 * </Wrap>
 *
 * // ✅ Lufa Cluster (new)
 * import { Cluster } from '@lufa/design-system';
 *
 * <Cluster spacing="default">
 *   <Badge>React</Badge>
 *   <Badge>TypeScript</Badge>
 *   <Badge>Next.js</Badge>
 * </Cluster>
 * ```
 *
 * **Key Differences**:
 * - ✅ No need for `WrapItem` wrapper (children wrap automatically)
 * - ✅ Semantic naming (cluster = collection of items)
 * - ✅ Same props: `spacing`, `align`, `justify`
 * - ✅ Automatic wrapping behavior by default
 *
 * **Spacing Mapping**:
 * | Chakra | Lufa |
 * |--------|------|
 * | `spacing={2}` | `spacing="tight"` (4px) |
 * | `spacing={4}` | `spacing="compact"` (8px) |
 * | `spacing={6}` | `spacing="default"` (16px) |
 * | `spacing={8}` | `spacing="comfortable"` (24px) |
 * | `spacing={10}` | `spacing="spacious"` (32px) |
 */
const meta = {
  title: '4. Foundation/Cluster',
  component: Cluster,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    // Polymorphic
    as: {
      control: 'select',
      options: ['div', 'section', 'article', 'header', 'footer', 'main', 'nav', 'aside', 'ul'],
      description: 'HTML element to render',
      table: {
        category: 'Polymorphic',
        type: { summary: 'ElementType' },
        defaultValue: { summary: 'div' },
      },
    },

    // Layout
    spacing: {
      control: 'select',
      options: ['tight', 'compact', 'default', 'comfortable', 'spacious'],
      description: 'Spacing between children (gap)',
      table: {
        category: 'Layout',
        type: { summary: 'SpacingValue' },
        defaultValue: { summary: 'default' },
      },
    },
    align: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'baseline', 'stretch'],
      description: 'Cross-axis alignment (align-items)',
      table: {
        category: 'Layout',
        type: { summary: 'AlignValue' },
        defaultValue: { summary: 'center' },
      },
    },
    justify: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'],
      description: 'Main-axis justification (justify-content)',
      table: {
        category: 'Layout',
        type: { summary: 'JustifyValue' },
        defaultValue: { summary: 'flex-start' },
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
} satisfies Meta<typeof Cluster>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// PLAYGROUND
// ============================================

/**
 * ## Playground
 *
 * Interactive playground to experiment with all Cluster props.
 */
export const Playground: Story = {
  args: {
    spacing: 'default',
    align: 'center',
    justify: 'flex-start',
  },
  render: (args) => {
    return (
      <StoryContainer>
        <Cluster {...args}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              style={{
                padding: '12px 16px',
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
        </Cluster>
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
 * Controls the gap between child elements using semantic spacing tokens.
 */
export const PropSpacing: Story = {
  render: () => {
    const [hoveredSpacing, setHoveredSpacing] = React.useState<string>('default');

    const spacingValues = [
      { value: 'tight' as const, size: '4px', color: STORY_COLORS.primary.cyan.main },
      { value: 'compact' as const, size: '8px', color: STORY_COLORS.primary.green.main },
      { value: 'default' as const, size: '16px', color: STORY_COLORS.primary.blue.main },
      { value: 'comfortable' as const, size: '24px', color: STORY_COLORS.primary.violet.main },
      { value: 'spacious' as const, size: '32px', color: STORY_COLORS.primary.pink.main },
    ];

    const generateCode = (spacing: string): string => {
      return `<Cluster spacing="${spacing}">
  <Badge>React</Badge>
  <Badge>TypeScript</Badge>
  <Badge>Next.js</Badge>
</Cluster>`;
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grid of examples */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {spacingValues.map(({ value, size, color }) => (
              <div key={value} onMouseEnter={() => setHoveredSpacing(value)}>
                <PropCard label={`spacing="${value}" (${size})`} highlight={hoveredSpacing === value}>
                  <Cluster spacing={value}>
                    {['React', 'TS', 'Next', 'Tailwind', 'CSS'].map((tag) => (
                      <div
                        key={tag}
                        style={{
                          padding: '6px 12px',
                          background: color,
                          color: 'white',
                          borderRadius: '16px',
                          fontSize: '12px',
                          fontWeight: 600,
                        }}
                      >
                        {tag}
                      </div>
                    ))}
                  </Cluster>
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
 * Controls cross-axis alignment of children (align-items).
 */
export const PropAlign: Story = {
  render: () => {
    const [hoveredAlign, setHoveredAlign] = React.useState<string>('center');

    const alignValues = ['flex-start', 'center', 'flex-end', 'baseline', 'stretch'] as const;

    const generateCode = (align: string): string => {
      return `<Cluster align="${align}" spacing="default">
  <div style={{ height: '40px' }}>Badge 1</div>
  <div style={{ height: '60px' }}>Badge 2</div>
  <div style={{ height: '50px' }}>Badge 3</div>
</Cluster>`;
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
                    <Cluster align={value} spacing="default">
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
                    </Cluster>
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
 * Controls main-axis justification of children (justify-content).
 */
export const PropJustify: Story = {
  render: () => {
    const [hoveredJustify, setHoveredJustify] = React.useState<string>('flex-start');

    const justifyValues = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'] as const;

    const generateCode = (justify: string): string => {
      return `<Cluster justify="${justify}" spacing="default">
  <Badge>Item 1</Badge>
  <Badge>Item 2</Badge>
  <Badge>Item 3</Badge>
</Cluster>`;
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
                    <Cluster justify={value} spacing={value.startsWith('space') ? 'tight' : 'default'}>
                      {[1, 2, 3].map((i) => {
                        const color = getColorByIndex(idx);
                        return (
                          <div
                            key={i}
                            style={{
                              padding: '10px 14px',
                              background: color.main,
                              color: 'white',
                              borderRadius: '6px',
                              fontWeight: 600,
                              fontSize: '13px',
                            }}
                          >
                            Item {i}
                          </div>
                        );
                      })}
                    </Cluster>
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
// USE CASES
// ============================================

/**
 * ## Use Cases
 *
 * Real-world examples of Cluster in action.
 */
export const UseCases: Story = {
  render: () => {
    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {/* Use Case 1: Tag Collection */}
          <section>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>Tags Collection</h3>
            <p style={{ margin: '0 0 16px 0', color: NEUTRAL.textSlate, fontSize: '14px' }}>
              Perfect for displaying skill tags, categories, or filters.
            </p>
            <Cluster spacing="compact">
              {['React', 'TypeScript', 'Next.js', 'Tailwind', 'GraphQL', 'Node.js', 'PostgreSQL', 'Docker'].map(
                (tag, idx) => (
                  <div
                    key={tag}
                    style={{
                      padding: '6px 14px',
                      background: getColorByIndex(idx).main,
                      color: 'white',
                      borderRadius: '16px',
                      fontSize: '13px',
                      fontWeight: 600,
                    }}
                  >
                    {tag}
                  </div>
                )
              )}
            </Cluster>
            <CodeBlock
              code={`<Cluster spacing="compact">
  {tags.map(tag => (
    <Badge key={tag.id}>{tag.name}</Badge>
  ))}
</Cluster>`}
              language="jsx"
              title="Code"
            />
          </section>

          {/* Use Case 2: Button Group */}
          <section>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>Button Group</h3>
            <p style={{ margin: '0 0 16px 0', color: NEUTRAL.textSlate, fontSize: '14px' }}>
              Group action buttons with proper spacing and alignment.
            </p>
            <Cluster spacing="default" align="center">
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
                Save Changes
              </button>
              <button
                style={{
                  padding: '10px 20px',
                  borderRadius: '6px',
                  border: `1px solid ${STORY_COLORS.primary.blue.main}`,
                  background: STORY_COLORS.themed.background.surface,
                  color: STORY_COLORS.primary.blue.main,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Preview
              </button>
              <button
                style={{
                  padding: '10px 20px',
                  borderRadius: '6px',
                  border: `1px solid ${NEUTRAL.borderMedium}`,
                  background: STORY_COLORS.themed.background.surface,
                  color: NEUTRAL.textSlate,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </Cluster>
            <CodeBlock
              code={`<Cluster spacing="default" align="center">
  <Button variant="primary">Save Changes</Button>
  <Button variant="secondary">Preview</Button>
  <Button variant="ghost">Cancel</Button>
</Cluster>`}
              language="jsx"
              title="Code"
            />
          </section>

          {/* Use Case 3: Badges with Status */}
          <section>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>Status Badges</h3>
            <p style={{ margin: '0 0 16px 0', color: NEUTRAL.textSlate, fontSize: '14px' }}>
              Display status indicators or labels that wrap naturally.
            </p>
            <Cluster spacing="compact" align="center">
              {[
                { label: 'Active', color: STORY_COLORS.primary.green.main },
                { label: 'In Review', color: STORY_COLORS.primary.cyan.main },
                { label: 'Approved', color: STORY_COLORS.primary.blue.main },
                { label: 'Completed', color: STORY_COLORS.primary.violet.main },
                { label: 'Archived', color: NEUTRAL.textSlate },
              ].map(({ label, color }) => (
                <div
                  key={label}
                  style={{
                    padding: '4px 10px',
                    background: color,
                    color: 'white',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  {label}
                </div>
              ))}
            </Cluster>
            <CodeBlock
              code={`<Cluster spacing="compact" align="center">
  <Badge status="active">Active</Badge>
  <Badge status="review">In Review</Badge>
  <Badge status="approved">Approved</Badge>
</Cluster>`}
              language="jsx"
              title="Code"
            />
          </section>

          {/* Use Case 4: Centered Navigation Links */}
          <section>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>Centered Navigation</h3>
            <p style={{ margin: '0 0 16px 0', color: NEUTRAL.textSlate, fontSize: '14px' }}>
              Center-aligned navigation links that wrap on smaller screens.
            </p>
            <Cluster as="nav" spacing="comfortable" align="center" justify="center">
              {['Home', 'Features', 'Pricing', 'About', 'Blog', 'Contact'].map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    fontWeight: 600,
                    fontSize: '15px',
                  }}
                >
                  {link}
                </a>
              ))}
            </Cluster>
            <CodeBlock
              code={`<Cluster as="nav" spacing="comfortable" align="center" justify="center">
  <Link href="/home">Home</Link>
  <Link href="/features">Features</Link>
  <Link href="/pricing">Pricing</Link>
  <Link href="/about">About</Link>
</Cluster>`}
              language="jsx"
              title="Code"
            />
          </section>
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// MIGRATION GUIDE
// ============================================

/**
 * ## Migration from Chakra UI
 *
 * Complete guide for migrating from Chakra UI's Wrap component.
 */
export const MigrationFromChakra: Story = {
  render: () => {
    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px' }}>
          <div>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '24px', fontWeight: 700 }}>Migrating from Chakra UI's Wrap</h2>
            <p style={{ margin: '0 0 16px 0', fontSize: '16px', lineHeight: '1.6' }}>
              Cluster is the <strong>semantic equivalent of Chakra UI's Wrap component</strong>. The migration is
              straightforward with minimal code changes required.
            </p>
          </div>

          {/* Before/After Comparison */}
          <section>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: 600 }}>Before & After</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <div
                  style={{
                    padding: '8px 12px',
                    background: '#fee2e2',
                    color: '#991b1b',
                    borderRadius: '6px 6px 0 0',
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                >
                  ❌ Chakra UI (Before)
                </div>
                <CodeBlock
                  code={`import { Wrap, WrapItem } from '@chakra-ui/react';

<Wrap spacing={4}>
  <WrapItem>
    <Badge>React</Badge>
  </WrapItem>
  <WrapItem>
    <Badge>TypeScript</Badge>
  </WrapItem>
  <WrapItem>
    <Badge>Next.js</Badge>
  </WrapItem>
</Wrap>`}
                  language="tsx"
                />
              </div>
              <div>
                <div
                  style={{
                    padding: '8px 12px',
                    background: '#d1fae5',
                    color: '#065f46',
                    borderRadius: '6px 6px 0 0',
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                >
                  ✅ Lufa Cluster (After)
                </div>
                <CodeBlock
                  code={`import { Cluster } from '@lufa/design-system';

<Cluster spacing="default">
  <Badge>React</Badge>
  <Badge>TypeScript</Badge>
  <Badge>Next.js</Badge>
</Cluster>`}
                  language="tsx"
                />
              </div>
            </div>
          </section>

          {/* Key Differences */}
          <section>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: 600 }}>Key Differences</h3>
            <div
              style={{
                border: `1px solid ${NEUTRAL.borderMedium}`,
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: NEUTRAL.backgroundLight }}>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600, fontSize: '14px' }}>Feature</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600, fontSize: '14px' }}>
                      Chakra Wrap
                    </th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600, fontSize: '14px' }}>
                      Lufa Cluster
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '12px', borderTop: `1px solid ${NEUTRAL.borderLight}` }}>Wrapper</td>
                    <td style={{ padding: '12px', borderTop: `1px solid ${NEUTRAL.borderLight}` }}>
                      Requires <code>WrapItem</code>
                    </td>
                    <td style={{ padding: '12px', borderTop: `1px solid ${NEUTRAL.borderLight}` }}>
                      ✅ No wrapper needed
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', borderTop: `1px solid ${NEUTRAL.borderLight}` }}>Spacing</td>
                    <td style={{ padding: '12px', borderTop: `1px solid ${NEUTRAL.borderLight}` }}>
                      Numeric values (2, 4, 6)
                    </td>
                    <td style={{ padding: '12px', borderTop: `1px solid ${NEUTRAL.borderLight}` }}>
                      ✅ Semantic tokens
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', borderTop: `1px solid ${NEUTRAL.borderLight}` }}>Props</td>
                    <td style={{ padding: '12px', borderTop: `1px solid ${NEUTRAL.borderLight}` }}>
                      spacing, align, justify
                    </td>
                    <td style={{ padding: '12px', borderTop: `1px solid ${NEUTRAL.borderLight}` }}>✅ Same props</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', borderTop: `1px solid ${NEUTRAL.borderLight}` }}>Behavior</td>
                    <td style={{ padding: '12px', borderTop: `1px solid ${NEUTRAL.borderLight}` }}>
                      Automatic wrapping
                    </td>
                    <td style={{ padding: '12px', borderTop: `1px solid ${NEUTRAL.borderLight}` }}>
                      ✅ Automatic wrapping
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Spacing Mapping */}
          <section>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: 600 }}>Spacing Value Mapping</h3>
            <div
              style={{
                border: `1px solid ${NEUTRAL.borderMedium}`,
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: NEUTRAL.backgroundLight }}>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600, fontSize: '14px' }}>
                      Chakra spacing
                    </th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600, fontSize: '14px' }}>
                      Lufa spacing
                    </th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600, fontSize: '14px' }}>
                      Pixel value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '12px', borderTop: `1px solid ${NEUTRAL.borderLight}` }}>
                      <code>spacing={'{2}'}</code>
                    </td>
                    <td style={{ padding: '12px', borderTop: `1px solid ${NEUTRAL.borderLight}` }}>
                      <code>spacing="tight"</code>
                    </td>
                    <td style={{ padding: '12px', borderTop: `1px solid ${NEUTRAL.borderLight}` }}>4px</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', borderTop: `1px solid ${NEUTRAL.borderLight}` }}>
                      <code>spacing={'{4}'}</code>
                    </td>
                    <td style={{ padding: '12px', borderTop: `1px solid ${NEUTRAL.borderLight}` }}>
                      <code>spacing="compact"</code>
                    </td>
                    <td style={{ padding: '12px', borderTop: `1px solid ${NEUTRAL.borderLight}` }}>8px</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', borderTop: `1px solid ${NEUTRAL.borderLight}` }}>
                      <code>spacing={'{6}'}</code>
                    </td>
                    <td style={{ padding: '12px', borderTop: `1px solid ${NEUTRAL.borderLight}` }}>
                      <code>spacing="default"</code>
                    </td>
                    <td style={{ padding: '12px', borderTop: `1px solid ${NEUTRAL.borderLight}` }}>16px</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', borderTop: `1px solid ${NEUTRAL.borderLight}` }}>
                      <code>spacing={'{8}'}</code>
                    </td>
                    <td style={{ padding: '12px', borderTop: `1px solid ${NEUTRAL.borderLight}` }}>
                      <code>spacing="comfortable"</code>
                    </td>
                    <td style={{ padding: '12px', borderTop: `1px solid ${NEUTRAL.borderLight}` }}>24px</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', borderTop: `1px solid ${NEUTRAL.borderLight}` }}>
                      <code>spacing={'{10}'}</code>
                    </td>
                    <td style={{ padding: '12px', borderTop: `1px solid ${NEUTRAL.borderLight}` }}>
                      <code>spacing="spacious"</code>
                    </td>
                    <td style={{ padding: '12px', borderTop: `1px solid ${NEUTRAL.borderLight}` }}>32px</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Live Example */}
          <section>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: 600 }}>Live Example</h3>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: NEUTRAL.textSlate }}>
              This is how your Chakra Wrap translates to Lufa Cluster:
            </p>
            <Cluster spacing="compact">
              {['React', 'TypeScript', 'Next.js', 'Tailwind', 'GraphQL', 'Node.js'].map((tag, idx) => (
                <div
                  key={tag}
                  style={{
                    padding: '6px 14px',
                    background: getColorByIndex(idx).main,
                    color: 'white',
                    borderRadius: '16px',
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                >
                  {tag}
                </div>
              ))}
            </Cluster>
          </section>
        </div>
      </StoryContainer>
    );
  },
};
