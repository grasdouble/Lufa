import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Divider } from '@grasdouble/lufa_design-system';

import { CodeBlock, PropCard, StoryContainer } from '../../components/helpers';
import { getColorByIndex, STORY_COLORS } from '../../constants/storyColors';

const NEUTRAL = STORY_COLORS.neutral;

/**
 * Divider - Visual Separator Component
 *
 * A visual separator for creating boundaries between content sections.
 * Provides flexible styling for horizontal and vertical dividers.
 *
 * ## Features
 * - ✅ Two orientations: horizontal, vertical
 * - ✅ Five emphasis levels: subtle, default, moderate, strong, bold
 * - ✅ Three spacing variants: compact, default, comfortable
 * - ✅ Two line styles: solid, dashed
 * - ✅ Polymorphic rendering (hr, div)
 * - ✅ WCAG 2.1 AA compliant contrast ratios
 * - ✅ Token-based design (component layer tokens)
 */
const meta = {
  title: 'Primitives/Divider',
  component: Divider,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Divider orientation',
      table: {
        category: 'Layout',
        type: { summary: 'OrientationValue' },
        defaultValue: { summary: 'horizontal' },
      },
    },
    emphasis: {
      control: 'select',
      options: ['subtle', 'default', 'moderate', 'strong', 'bold'],
      description: 'Visual emphasis level (combines color and thickness)',
      table: {
        category: 'Appearance',
        type: { summary: 'EmphasisValue' },
        defaultValue: { summary: 'default' },
      },
    },
    spacing: {
      control: 'select',
      options: ['compact', 'default', 'comfortable'],
      description: 'Spacing around divider',
      table: {
        category: 'Spacing',
        type: { summary: 'SpacingValue' },
        defaultValue: { summary: 'default' },
      },
    },
    lineStyle: {
      control: 'select',
      options: ['solid', 'dashed'],
      description: 'Line style',
      table: {
        category: 'Style',
        type: { summary: 'LineStyleValue' },
        defaultValue: { summary: 'solid' },
      },
    },
    as: {
      control: 'select',
      options: ['hr', 'div'],
      description: 'HTML element to render (polymorphic)',
      table: {
        category: 'Polymorphic',
        type: { summary: 'ElementType' },
        defaultValue: { summary: 'hr for horizontal, div for vertical' },
      },
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// DEFAULT STORY
// ============================================

export const Default: Story = {
  render: () => {
    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <PropCard label="Default Divider (Horizontal)">
            <div style={{ width: '100%', maxWidth: '400px' }}>
              <div style={{ fontSize: '14px', color: STORY_COLORS.neutral.text }}>Section 1</div>
              <Divider />
              <div style={{ fontSize: '14px', color: STORY_COLORS.neutral.text }}>Section 2</div>
            </div>
          </PropCard>

          <CodeBlock code="<Divider />" language="jsx" title="JSX" />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: ORIENTATION
// ============================================

export const PropOrientation: Story = {
  name: 'Prop: orientation',
  render: () => {
    const [selectedOrientation, setSelectedOrientation] = React.useState<string>('horizontal');

    const orientations = [
      { value: 'horizontal', label: 'horizontal (default)', description: 'Horizontal separator' },
      { value: 'vertical', label: 'vertical', description: 'Vertical separator' },
    ] as const;

    const generateCode = (orientation: string): string => {
      if (orientation === 'horizontal') {
        return `{/* Horizontal divider (default) */}
<div>Section 1</div>
<Divider />
<div>Section 2</div>`;
      } else {
        return `{/* Vertical divider */}
<div style={{ display: 'flex', alignItems: 'center' }}>
  <span>Left</span>
  <Divider orientation="vertical" />
  <span>Right</span>
</div>`;
      }
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Orientation examples */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {orientations.map((orientationItem, index) => {
              const colors = getColorByIndex(index);

              return (
                <PropCard
                  key={orientationItem.value}
                  label={`orientation="${orientationItem.label}"`}
                  highlight={selectedOrientation === orientationItem.value}
                  onInteraction={() => setSelectedOrientation(orientationItem.value)}
                  interactionType="click"
                >
                  <div
                    style={{
                      backgroundColor: colors.light,
                      padding: '24px',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      alignItems: 'center',
                    }}
                  >
                    {orientationItem.value === 'horizontal' ? (
                      <div style={{ width: '100%', maxWidth: '200px' }}>
                        <div
                          style={{
                            fontSize: '12px',
                            color: STORY_COLORS.neutral.text,
                            textAlign: 'center',
                          }}
                        >
                          Top
                        </div>
                        <Divider orientation="horizontal" />
                        <div
                          style={{
                            fontSize: '12px',
                            color: STORY_COLORS.neutral.text,
                            textAlign: 'center',
                          }}
                        >
                          Bottom
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          height: '60px',
                        }}
                      >
                        <span style={{ fontSize: '12px', color: STORY_COLORS.neutral.text }}>Left</span>
                        <Divider orientation="vertical" />
                        <span style={{ fontSize: '12px', color: STORY_COLORS.neutral.text }}>Right</span>
                      </div>
                    )}
                    <div
                      style={{
                        fontSize: '11px',
                        color: STORY_COLORS.neutral.textSlate,
                        textAlign: 'center',
                      }}
                    >
                      {orientationItem.description}
                    </div>
                  </div>
                </PropCard>
              );
            })}
          </div>

          <CodeBlock code={generateCode(selectedOrientation)} language="jsx" title="JSX" />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: EMPHASIS
// ============================================

export const PropEmphasis: Story = {
  name: 'Prop: emphasis',
  render: () => {
    const [selectedEmphasis, setSelectedEmphasis] = React.useState<string>('default');

    const emphasisLevels = [
      { value: 'subtle', label: 'subtle', color: 'gray.300', thickness: '1px', description: 'Minimal separation' },
      { value: 'default', label: 'default', color: 'gray.300', thickness: '1px', description: 'Standard separator' },
      { value: 'moderate', label: 'moderate', color: 'gray.300', thickness: '2px', description: 'Visible separation' },
      { value: 'strong', label: 'strong', color: 'gray.400', thickness: '2px', description: 'Emphasized separator' },
      { value: 'bold', label: 'bold', color: 'gray.400', thickness: '4px', description: 'Major section breaks' },
    ] as const;

    const generateCode = (emphasis: string): string => {
      return `<Divider emphasis="${emphasis}" />`;
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grid of emphasis examples */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
            }}
          >
            {emphasisLevels.map((emphasisItem, index) => {
              const colors = getColorByIndex(index);

              return (
                <PropCard
                  key={emphasisItem.value}
                  label={`emphasis="${emphasisItem.label}"`}
                  highlight={selectedEmphasis === emphasisItem.value}
                  onInteraction={() => setSelectedEmphasis(emphasisItem.value)}
                  interactionType="click"
                >
                  <div
                    style={{
                      backgroundColor: colors.light,
                      padding: '24px',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ width: '100%', maxWidth: '180px' }}>
                      <Divider emphasis={emphasisItem.value} />
                    </div>
                    <div
                      style={{
                        fontSize: '10px',
                        color: STORY_COLORS.neutral.textSlate,
                        textAlign: 'center',
                      }}
                    >
                      {emphasisItem.thickness} • {emphasisItem.color}
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: STORY_COLORS.neutral.text,
                        textAlign: 'center',
                        fontWeight: 500,
                      }}
                    >
                      {emphasisItem.description}
                    </div>
                  </div>
                </PropCard>
              );
            })}
          </div>

          {/* Visual comparison */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: STORY_COLORS.neutral.text,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '16px',
              }}
            >
              All Emphasis Levels (Side by Side)
            </h3>
            <div
              style={{
                backgroundColor: STORY_COLORS.primary.blue.light,
                padding: '24px',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              {emphasisLevels.map((level) => (
                <div key={level.value}>
                  <div
                    style={{
                      fontSize: '12px',
                      color: STORY_COLORS.neutral.textSlate,
                      marginBottom: '8px',
                      fontFamily: 'monospace',
                    }}
                  >
                    emphasis="{level.value}"
                  </div>
                  <Divider emphasis={level.value} />
                </div>
              ))}
            </div>
          </div>

          <CodeBlock code={generateCode(selectedEmphasis)} language="jsx" title="JSX" />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: SPACING
// ============================================

export const PropSpacing: Story = {
  name: 'Prop: spacing',
  render: () => {
    const [selectedSpacing, setSelectedSpacing] = React.useState<string>('default');

    const spacings = [
      { value: 'compact', label: 'compact', description: 'Tight spacing (8px)' },
      { value: 'default', label: 'default', description: 'Standard spacing (16px)' },
      { value: 'comfortable', label: 'comfortable', description: 'Relaxed spacing (24px)' },
    ] as const;

    const generateCode = (spacing: string): string => {
      return `<div>Section 1</div>
<Divider spacing="${spacing}" />
<div>Section 2</div>`;
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
            }}
          >
            {spacings.map((spacingItem, index) => {
              const colors = getColorByIndex(index);

              return (
                <PropCard
                  key={spacingItem.value}
                  label={`spacing="${spacingItem.label}"`}
                  highlight={selectedSpacing === spacingItem.value}
                  onInteraction={() => setSelectedSpacing(spacingItem.value)}
                  interactionType="click"
                >
                  <div
                    style={{
                      backgroundColor: colors.light,
                      padding: '24px',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ width: '100%', maxWidth: '200px' }}>
                      <div
                        style={{
                          fontSize: '12px',
                          color: STORY_COLORS.neutral.text,
                        }}
                      >
                        Above
                      </div>
                      <Divider spacing={spacingItem.value} />
                      <div
                        style={{
                          fontSize: '12px',
                          color: STORY_COLORS.neutral.text,
                        }}
                      >
                        Below
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: STORY_COLORS.neutral.textSlate,
                        textAlign: 'center',
                      }}
                    >
                      {spacingItem.description}
                    </div>
                  </div>
                </PropCard>
              );
            })}
          </div>

          <CodeBlock code={generateCode(selectedSpacing)} language="jsx" title="JSX" />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: LINE STYLE
// ============================================

export const PropLineStyle: Story = {
  name: 'Prop: lineStyle',
  render: () => {
    const [selectedLineStyle, setSelectedLineStyle] = React.useState<string>('solid');

    const lineStyles = [
      { value: 'solid', label: 'solid (default)', description: 'Continuous line' },
      { value: 'dashed', label: 'dashed', description: 'Dashed line' },
    ] as const;

    const generateCode = (lineStyle: string): string => {
      if (lineStyle === 'solid') {
        return `<Divider lineStyle="solid" />`;
      }
      return `<Divider lineStyle="dashed" />`;
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {lineStyles.map((lineStyleItem, index) => {
              const colors = getColorByIndex(index);

              return (
                <PropCard
                  key={lineStyleItem.value}
                  label={`lineStyle="${lineStyleItem.label}"`}
                  highlight={selectedLineStyle === lineStyleItem.value}
                  onInteraction={() => setSelectedLineStyle(lineStyleItem.value)}
                  interactionType="click"
                >
                  <div
                    style={{
                      backgroundColor: colors.light,
                      padding: '24px',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ width: '100%', maxWidth: '200px' }}>
                      <Divider lineStyle={lineStyleItem.value} />
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: STORY_COLORS.neutral.textSlate,
                        textAlign: 'center',
                      }}
                    >
                      {lineStyleItem.description}
                    </div>
                  </div>
                </PropCard>
              );
            })}
          </div>

          {/* Show both line styles with different emphasis levels */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: STORY_COLORS.neutral.text,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '16px',
              }}
            >
              Line Styles with Different Emphasis Levels
            </h3>
            <div
              style={{
                backgroundColor: STORY_COLORS.primary.blue.light,
                padding: '24px',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '12px',
                    color: STORY_COLORS.neutral.textSlate,
                    marginBottom: '8px',
                  }}
                >
                  Solid (All Emphasis Levels)
                </div>
                <Divider lineStyle="solid" emphasis="subtle" />
                <Divider lineStyle="solid" emphasis="default" />
                <Divider lineStyle="solid" emphasis="moderate" />
                <Divider lineStyle="solid" emphasis="strong" />
                <Divider lineStyle="solid" emphasis="bold" />
              </div>
              <div>
                <div
                  style={{
                    fontSize: '12px',
                    color: STORY_COLORS.neutral.textSlate,
                    marginBottom: '8px',
                  }}
                >
                  Dashed (All Emphasis Levels)
                </div>
                <Divider lineStyle="dashed" emphasis="subtle" />
                <Divider lineStyle="dashed" emphasis="default" />
                <Divider lineStyle="dashed" emphasis="moderate" />
                <Divider lineStyle="dashed" emphasis="strong" />
                <Divider lineStyle="dashed" emphasis="bold" />
              </div>
            </div>
          </div>

          <CodeBlock code={generateCode(selectedLineStyle)} language="jsx" title="JSX" />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: AS (Polymorphic)
// ============================================

export const PropAs: Story = {
  name: 'Prop: as (Polymorphic)',
  render: () => {
    const [selectedAs, setSelectedAs] = React.useState<'hr' | 'div'>('hr');

    const asOptions = [
      {
        value: 'hr' as const,
        label: 'as="hr" (default horizontal)',
        description: 'Semantic separator',
      },
      { value: 'div' as const, label: 'as="div"', description: 'Generic container' },
    ];

    const generateCode = (asValue: 'hr' | 'div'): string => {
      if (asValue === 'hr') {
        return `{/* Default: hr element for semantic meaning */}
<Divider as="hr" />`;
      } else {
        return `{/* Render as div (non-semantic) */}
<Divider as="div" />`;
      }
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {asOptions.map((option, index) => {
              const colors = getColorByIndex(index);

              return (
                <PropCard
                  key={option.value}
                  label={option.label}
                  highlight={selectedAs === option.value}
                  onInteraction={() => setSelectedAs(option.value)}
                  interactionType="click"
                >
                  <div
                    style={{
                      backgroundColor: colors.light,
                      padding: '24px',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ width: '100%', maxWidth: '200px' }}>
                      <Divider as={option.value} />
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: STORY_COLORS.neutral.textSlate,
                        textAlign: 'center',
                      }}
                    >
                      {option.description}
                    </div>
                  </div>
                </PropCard>
              );
            })}
          </div>

          <div
            style={{
              padding: '16px',
              backgroundColor: STORY_COLORS.neutral.bgGray,
              borderRadius: '8px',
              fontSize: '12px',
              color: STORY_COLORS.neutral.text,
            }}
          >
            💡 <strong>Note:</strong> For horizontal dividers, the default element is <code>&lt;hr&gt;</code> (semantic
            separator). For vertical dividers, the default is <code>&lt;div&gt;</code> (as &lt;hr&gt; is not valid for
            vertical orientation).
          </div>

          <CodeBlock code={generateCode(selectedAs)} language="jsx" title="JSX" />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// USE CASES
// ============================================

export const UseCases: Story = {
  render: () => {
    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Section Breaks in Content */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: STORY_COLORS.neutral.text,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '16px',
              }}
            >
              Section Breaks in Content
            </h3>
            <div
              style={{
                backgroundColor: STORY_COLORS.primary.blue.light,
                padding: '24px',
                borderRadius: '8px',
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: 600, color: STORY_COLORS.neutral.text }}>Introduction</div>
              <div style={{ fontSize: '13px', color: STORY_COLORS.neutral.textSlate }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
              <Divider spacing="comfortable" />
              <div style={{ fontSize: '14px', fontWeight: 600, color: STORY_COLORS.neutral.text }}>Main Content</div>
              <div style={{ fontSize: '13px', color: STORY_COLORS.neutral.textSlate }}>
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
              <Divider spacing="comfortable" />
              <div style={{ fontSize: '14px', fontWeight: 600, color: STORY_COLORS.neutral.text }}>Conclusion</div>
              <div style={{ fontSize: '13px', color: STORY_COLORS.neutral.textSlate }}>
                Ut enim ad minim veniam, quis nostrud exercitation.
              </div>
            </div>
          </div>

          {/* List Item Separation */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: STORY_COLORS.neutral.text,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '16px',
              }}
            >
              List Item Separation
            </h3>
            <div
              style={{
                backgroundColor: STORY_COLORS.primary.violet.light,
                padding: '24px',
                borderRadius: '8px',
              }}
            >
              <div style={{ fontSize: '13px', color: STORY_COLORS.neutral.text, padding: '8px 0' }}>
                Item 1 - First entry
              </div>
              <Divider emphasis="subtle" spacing="compact" />
              <div style={{ fontSize: '13px', color: STORY_COLORS.neutral.text, padding: '8px 0' }}>
                Item 2 - Second entry
              </div>
              <Divider emphasis="subtle" spacing="compact" />
              <div style={{ fontSize: '13px', color: STORY_COLORS.neutral.text, padding: '8px 0' }}>
                Item 3 - Third entry
              </div>
              <Divider emphasis="subtle" spacing="compact" />
              <div style={{ fontSize: '13px', color: STORY_COLORS.neutral.text, padding: '8px 0' }}>
                Item 4 - Fourth entry
              </div>
            </div>
          </div>

          {/* Toolbar Separators */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: STORY_COLORS.neutral.text,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '16px',
              }}
            >
              Toolbar Separators (Vertical)
            </h3>
            <div
              style={{
                backgroundColor: STORY_COLORS.primary.pink.light,
                padding: '16px 24px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <button
                style={{
                  padding: '8px 16px',
                  background: 'var(--lufa-semantic-ui-background-surface)',
                  border: `1px solid ${NEUTRAL.borderMedium}`,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '13px',
                }}
              >
                Cut
              </button>
              <button
                style={{
                  padding: '8px 16px',
                  background: 'var(--lufa-semantic-ui-background-surface)',
                  border: `1px solid ${NEUTRAL.borderMedium}`,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '13px',
                }}
              >
                Copy
              </button>
              <button
                style={{
                  padding: '8px 16px',
                  background: 'var(--lufa-semantic-ui-background-surface)',
                  border: `1px solid ${NEUTRAL.borderMedium}`,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '13px',
                }}
              >
                Paste
              </button>
              <Divider orientation="vertical" spacing="compact" />
              <button
                style={{
                  padding: '8px 16px',
                  background: 'var(--lufa-semantic-ui-background-surface)',
                  border: `1px solid ${NEUTRAL.borderMedium}`,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '13px',
                }}
              >
                Undo
              </button>
              <button
                style={{
                  padding: '8px 16px',
                  background: 'var(--lufa-semantic-ui-background-surface)',
                  border: `1px solid ${NEUTRAL.borderMedium}`,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '13px',
                }}
              >
                Redo
              </button>
            </div>
          </div>

          {/* Form Section Dividers */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: STORY_COLORS.neutral.text,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '16px',
              }}
            >
              Form Section Dividers
            </h3>
            <div
              style={{
                backgroundColor: STORY_COLORS.primary.green.light,
                padding: '24px',
                borderRadius: '8px',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: STORY_COLORS.neutral.text,
                    marginBottom: '8px',
                  }}
                >
                  Personal Information
                </div>
                <div style={{ fontSize: '12px', color: STORY_COLORS.neutral.textSlate }}>Name, Email, Phone...</div>
              </div>
              <Divider emphasis="strong" spacing="comfortable" />
              <div>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: STORY_COLORS.neutral.text,
                    marginBottom: '8px',
                  }}
                >
                  Address Information
                </div>
                <div style={{ fontSize: '12px', color: STORY_COLORS.neutral.textSlate }}>
                  Street, City, Postal Code...
                </div>
              </div>
              <Divider emphasis="strong" spacing="comfortable" />
              <div>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: STORY_COLORS.neutral.text,
                    marginBottom: '8px',
                  }}
                >
                  Payment Information
                </div>
                <div style={{ fontSize: '12px', color: STORY_COLORS.neutral.textSlate }}>
                  Card Number, Expiry, CVV...
                </div>
              </div>
            </div>
          </div>

          {/* Card Footer Separator */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: STORY_COLORS.neutral.text,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '16px',
              }}
            >
              Card Footer Separator
            </h3>
            <div
              style={{
                backgroundColor: 'white',
                border: `1px solid ${NEUTRAL.borderMedium}`,
                borderRadius: '8px',
                overflow: 'hidden',
                maxWidth: '350px',
              }}
            >
              <div style={{ padding: '20px' }}>
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: STORY_COLORS.neutral.text,
                    marginBottom: '8px',
                  }}
                >
                  Card Title
                </div>
                <div style={{ fontSize: '13px', color: STORY_COLORS.neutral.textSlate }}>
                  This is the main content of the card. It contains important information for the user.
                </div>
              </div>
              <Divider spacing="compact" />
              <div
                style={{
                  padding: '16px 20px',
                  backgroundColor: NEUTRAL.backgroundLight,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: '12px', color: STORY_COLORS.neutral.textSlate }}>Card Footer</span>
                <button
                  style={{
                    padding: '6px 12px',
                    background: STORY_COLORS.primary.blue.base,
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                >
                  Action
                </button>
              </div>
            </div>
          </div>

          <CodeBlock
            code={`{/* Section breaks */}
<div>Section 1</div>
<Divider spacing="comfortable" />
<div>Section 2</div>

{/* List separation */}
<div>Item 1</div>
<Divider emphasis="subtle" spacing="compact" />
<div>Item 2</div>

{/* Vertical toolbar */}
<div style={{ display: 'flex', alignItems: 'center' }}>
  <button>Cut</button>
  <button>Copy</button>
  <Divider orientation="vertical" spacing="compact" />
  <button>Undo</button>
</div>

{/* Form sections */}
<div>Personal Info</div>
<Divider emphasis="strong" spacing="comfortable" />
<div>Address Info</div>

{/* Card footer */}
<div>Card content</div>
<Divider spacing="compact" />
<div>Footer actions</div>`}
            language="jsx"
            title="JSX"
          />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PLAYGROUND
// ============================================

export const Playground: Story = {
  args: {
    orientation: 'horizontal',
    emphasis: 'default',
    spacing: 'default',
    lineStyle: 'solid',
    as: 'hr',
  },
  render: (args) => {
    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <PropCard label="Interactive Divider (use controls below)">
            <div
              style={{
                backgroundColor: STORY_COLORS.primary.blue.light,
                padding: '32px',
                borderRadius: '8px',
              }}
            >
              {args.orientation === 'horizontal' ? (
                <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                  <div style={{ fontSize: '14px', color: STORY_COLORS.neutral.text }}>Section Above</div>
                  <Divider {...args} />
                  <div style={{ fontSize: '14px', color: STORY_COLORS.neutral.text }}>Section Below</div>
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100px',
                  }}
                >
                  <span style={{ fontSize: '14px', color: STORY_COLORS.neutral.text }}>Left</span>
                  <Divider {...args} />
                  <span style={{ fontSize: '14px', color: STORY_COLORS.neutral.text }}>Right</span>
                </div>
              )}
            </div>
          </PropCard>

          <div
            style={{
              padding: '16px',
              backgroundColor: STORY_COLORS.neutral.bgGray,
              borderRadius: '8px',
              fontSize: '12px',
              color: STORY_COLORS.neutral.textSlate,
            }}
          >
            💡 <strong>Tip:</strong> Use the Controls panel below to experiment with different prop combinations
            interactively.
          </div>
        </div>
      </StoryContainer>
    );
  },
};
