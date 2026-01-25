import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from '@grasdouble/lufa_design-system';

import { CodeBlock, PropCard, StoryContainer } from '../../components/helpers';
import { getColorByIndex, STORY_COLORS } from '../../constants/storyColors';

/**
 * Badge - Status and Label Indicator
 *
 * A compact component for displaying status labels, counts, or notifications.
 * Perfect for showing metadata, statuses, or highlighting information.
 *
 * ## Features
 * - ✅ Five semantic variants: default, success, error, warning, info
 * - ✅ Three sizes: sm, md, lg
 * - ✅ Optional dot indicator for notifications
 * - ✅ Polymorphic rendering (span, div, label)
 * - ✅ WCAG 2.1 AA compliant contrast ratios
 * - ✅ Token-based design (component layer tokens)
 */
const meta = {
  title: 'Primitives/Badge',
  component: Badge,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning', 'info'],
      description: 'Semantic color variant',
      table: {
        category: 'Variants',
        type: { summary: 'VariantValue' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Badge size',
      table: {
        category: 'Size',
        type: { summary: 'SizeValue' },
        defaultValue: { summary: 'md' },
      },
    },
    dot: {
      control: 'boolean',
      description: 'Show dot indicator (for notifications)',
      table: {
        category: 'Features',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    as: {
      control: 'select',
      options: ['span', 'div', 'label'],
      description: 'HTML element to render (polymorphic)',
      table: {
        category: 'Polymorphic',
        type: { summary: 'ElementType' },
        defaultValue: { summary: 'span' },
      },
    },
  },
} satisfies Meta<typeof Badge>;

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
          <PropCard label="Default Badge">
            <Badge>New</Badge>
          </PropCard>

          <CodeBlock code="<Badge>New</Badge>" language="jsx" title="JSX" />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: VARIANT (Semantic Color)
// ============================================

export const PropVariant: Story = {
  name: 'Prop: variant',
  render: () => {
    const [selectedVariant, setSelectedVariant] = React.useState<string>('default');

    const variants = [
      { value: 'default', label: 'default', description: 'Neutral / General purpose' },
      { value: 'success', label: 'success', description: 'Positive / Active status' },
      { value: 'error', label: 'error', description: 'Error / Critical status' },
      { value: 'warning', label: 'warning', description: 'Warning / Caution' },
      { value: 'info', label: 'info', description: 'Informational / Notice' },
    ] as const;

    const generateCode = (variant: string): string => {
      const label = variant.charAt(0).toUpperCase() + variant.slice(1);
      return `<Badge variant="${variant}">${label}</Badge>`;
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grid of variant examples */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
            }}
          >
            {variants.map((variantItem, index) => {
              const colors = getColorByIndex(index);

              return (
                <PropCard
                  key={variantItem.value}
                  label={`variant="${variantItem.label}"`}
                  highlight={selectedVariant === variantItem.value}
                  onInteraction={() => setSelectedVariant(variantItem.value)}
                  interactionType="click"
                >
                  <div
                    style={{
                      backgroundColor: colors.light,
                      padding: '20px',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      alignItems: 'center',
                    }}
                  >
                    <Badge variant={variantItem.value}>{variantItem.label}</Badge>
                    <div
                      style={{
                        fontSize: '11px',
                        color: STORY_COLORS.neutral.textSlate,
                        textAlign: 'center',
                      }}
                    >
                      {variantItem.description}
                    </div>
                  </div>
                </PropCard>
              );
            })}
          </div>

          <CodeBlock code={generateCode(selectedVariant)} language="jsx" title="JSX" />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: SIZE
// ============================================

export const PropSize: Story = {
  name: 'Prop: size',
  render: () => {
    const [selectedSize, setSelectedSize] = React.useState<string>('md');

    const sizes = [
      { value: 'sm', label: 'sm', fontSize: '10px', description: 'Small (inline text)' },
      { value: 'md', label: 'md', fontSize: '12px', description: 'Medium (default)' },
      { value: 'lg', label: 'lg', fontSize: '14px', description: 'Large (emphasis)' },
    ] as const;

    const generateCode = (size: string): string => {
      const description = sizes.find((s) => s.value === size)?.description || size;
      return `<Badge size="${size}">${description}</Badge>`;
    };

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
            {sizes.map((sizeItem, index) => {
              const colors = getColorByIndex(index);

              return (
                <PropCard
                  key={sizeItem.value}
                  label={`size="${sizeItem.label}"`}
                  highlight={selectedSize === sizeItem.value}
                  onInteraction={() => setSelectedSize(sizeItem.value)}
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
                    <Badge size={sizeItem.value}>{sizeItem.label}</Badge>
                    <div
                      style={{
                        fontSize: '11px',
                        color: STORY_COLORS.neutral.textSlate,
                      }}
                    >
                      {sizeItem.fontSize} • {sizeItem.description}
                    </div>
                  </div>
                </PropCard>
              );
            })}
          </div>

          <CodeBlock code={generateCode(selectedSize)} language="jsx" title="JSX" />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: DOT (Notification Indicator)
// ============================================

export const PropDot: Story = {
  name: 'Prop: dot',
  render: () => {
    const [showDot, setShowDot] = React.useState<boolean>(true);

    const dotOptions = [
      { value: false, label: 'dot={false} (default)', description: 'No indicator' },
      { value: true, label: 'dot={true}', description: 'With dot indicator' },
    ];

    const generateCode = (dot: boolean): string => {
      if (dot) {
        return `<Badge dot>3 notifications</Badge>`;
      }
      return `<Badge>Status</Badge>`;
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
            {dotOptions.map((option, index) => {
              const colors = getColorByIndex(index);

              return (
                <PropCard
                  key={String(option.value)}
                  label={option.label}
                  highlight={showDot === option.value}
                  onInteraction={() => setShowDot(option.value)}
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
                    <Badge dot={option.value} variant="error">
                      {option.value ? '3 notifications' : 'Status'}
                    </Badge>
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

          {/* Show dot with all variants */}
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
              Dot with all variants
            </h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Badge dot variant="default">
                default
              </Badge>
              <Badge dot variant="success">
                success
              </Badge>
              <Badge dot variant="error">
                error
              </Badge>
              <Badge dot variant="warning">
                warning
              </Badge>
              <Badge dot variant="info">
                info
              </Badge>
            </div>
          </div>

          <CodeBlock code={generateCode(showDot)} language="jsx" title="JSX" />
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
    const [selectedAs, setSelectedAs] = React.useState<'span' | 'div' | 'label'>('span');

    const asOptions = [
      { value: 'span' as const, label: 'as="span" (default)', description: 'Inline element' },
      { value: 'div' as const, label: 'as="div"', description: 'Block element' },
      { value: 'label' as const, label: 'as="label"', description: 'Form label' },
    ];

    const generateCode = (asValue: 'span' | 'div' | 'label'): string => {
      if (asValue === 'span') {
        return `<Badge as="span">Inline Badge</Badge>`;
      } else if (asValue === 'div') {
        return `<Badge as="div">Block Badge</Badge>`;
      } else {
        return `<Badge as="label" htmlFor="input-id">
  Label Badge
</Badge>`;
      }
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
                    <Badge as={option.value}>{option.value}</Badge>
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

          <CodeBlock code={generateCode(selectedAs)} language="jsx" title="JSX" />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// SIZE + VARIANT COMBINATIONS
// ============================================

export const SizeVariantMatrix: Story = {
  name: 'Size + Variant Matrix',
  render: () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    const variants = ['default', 'success', 'error', 'warning', 'info'] as const;

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {sizes.map((size) => (
            <div key={size}>
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
                Size: {size}
              </h3>
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}
              >
                {variants.map((variant) => (
                  <Badge key={variant} size={size} variant={variant}>
                    {variant}
                  </Badge>
                ))}
              </div>
            </div>
          ))}

          <CodeBlock
            code={`{/* 15 combinations: 3 sizes × 5 variants */}
<Badge size="sm" variant="default">Default</Badge>
<Badge size="md" variant="success">Success</Badge>
<Badge size="lg" variant="error">Error</Badge>`}
            language="jsx"
            title="JSX"
          />
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
          {/* Status Labels */}
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
              Status Labels
            </h3>
            <div
              style={{
                backgroundColor: STORY_COLORS.primary.blue.light,
                padding: '24px',
                borderRadius: '8px',
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              <Badge variant="success">Active</Badge>
              <Badge variant="warning">Pending</Badge>
              <Badge variant="error">Inactive</Badge>
              <Badge variant="info">Draft</Badge>
              <Badge variant="default">Archived</Badge>
            </div>
          </div>

          {/* Notification Counts */}
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
              Notification Counts
            </h3>
            <div
              style={{
                backgroundColor: STORY_COLORS.primary.violet.light,
                padding: '24px',
                borderRadius: '8px',
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              <Badge dot variant="error">
                3 new messages
              </Badge>
              <Badge dot variant="warning">
                5 updates
              </Badge>
              <Badge dot variant="info">
                12 notifications
              </Badge>
            </div>
          </div>

          {/* Category Tags */}
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
              Category Tags
            </h3>
            <div
              style={{
                backgroundColor: STORY_COLORS.primary.pink.light,
                padding: '24px',
                borderRadius: '8px',
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
              }}
            >
              <Badge size="sm" variant="default">
                React
              </Badge>
              <Badge size="sm" variant="default">
                TypeScript
              </Badge>
              <Badge size="sm" variant="default">
                Design Systems
              </Badge>
              <Badge size="sm" variant="info">
                New
              </Badge>
            </div>
          </div>

          {/* Numeric Indicators */}
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
              Numeric Indicators
            </h3>
            <div
              style={{
                backgroundColor: STORY_COLORS.primary.green.light,
                padding: '24px',
                borderRadius: '8px',
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: STORY_COLORS.neutral.text }}>Inbox</span>
                <Badge variant="error">99+</Badge>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: STORY_COLORS.neutral.text }}>Tasks</span>
                <Badge variant="warning">12</Badge>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: STORY_COLORS.neutral.text }}>Done</span>
                <Badge variant="success">45</Badge>
              </div>
            </div>
          </div>

          {/* Version / Beta Labels */}
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
              Version / Beta Labels
            </h3>
            <div
              style={{
                backgroundColor: STORY_COLORS.primary.orange.light,
                padding: '24px',
                borderRadius: '8px',
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              <Badge size="sm" variant="info">
                v2.0
              </Badge>
              <Badge size="sm" variant="warning">
                Beta
              </Badge>
              <Badge size="sm" variant="success">
                Stable
              </Badge>
              <Badge size="sm" variant="error">
                Deprecated
              </Badge>
            </div>
          </div>

          <CodeBlock
            code={`{/* Status labels */}
<Badge variant="success">Active</Badge>
<Badge variant="error">Inactive</Badge>

{/* Notifications */}
<Badge dot variant="error">3 new messages</Badge>

{/* Category tags */}
<Badge size="sm">React</Badge>
<Badge size="sm">TypeScript</Badge>

{/* Numeric indicators */}
<Badge variant="error">99+</Badge>

{/* Version labels */}
<Badge size="sm" variant="info">v2.0</Badge>
<Badge size="sm" variant="warning">Beta</Badge>`}
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
    children: 'Badge',
    variant: 'default',
    size: 'md',
    dot: false,
    as: 'span',
  },
  render: (args) => {
    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <PropCard label="Interactive Badge (use controls below)">
            <div
              style={{
                backgroundColor: STORY_COLORS.primary.blue.light,
                padding: '32px',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Badge {...args} />
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
