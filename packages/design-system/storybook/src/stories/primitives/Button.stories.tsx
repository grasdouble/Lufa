import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@grasdouble/lufa_design-system';

import { CodeBlock, PropCard, StoryContainer } from '../../components/helpers';
import { getColorByIndex, STORY_COLORS } from '../../constants/storyColors';

/**
 * Button - Interactive Action Element
 *
 * A versatile button component with two-dimensional variant system for flexible
 * visual styling and semantic meaning.
 *
 * ## Features
 * - ✅ Two-dimensional variants: `type` (visual style) + `variant` (semantic color)
 * - ✅ Three types: solid, outline, ghost
 * - ✅ Seven semantic variants: primary, secondary, success, danger, warning, info, neutral
 * - ✅ Icon support (left, right, or icon-only)
 * - ✅ Loading state with spinner animation
 * - ✅ Polymorphic rendering (button or anchor element)
 * - ✅ WCAG 2.1 AA compliant
 * - ✅ Token-based design (component layer tokens)
 */
const meta = {
  title: 'Primitives/Button',
  component: Button,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    // Two-dimensional variant system
    type: {
      control: 'select',
      options: ['solid', 'outline', 'ghost'],
      description: 'Visual style type',
      table: {
        category: 'Variants',
        type: { summary: 'TypeValue' },
        defaultValue: { summary: 'solid' },
      },
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'neutral'],
      description: 'Semantic color variant',
      table: {
        category: 'Variants',
        type: { summary: 'VariantValue' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
      table: {
        category: 'Size',
        type: { summary: 'SizeValue' },
        defaultValue: { summary: 'md' },
      },
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'base', 'md', 'full'],
      description: 'Border radius',
      table: {
        category: 'Style',
        type: { summary: 'RadiusValue' },
        defaultValue: { summary: 'base' },
      },
    },
    iconLeft: {
      control: 'text',
      description: 'Icon name for left position',
      table: { category: 'Icons', type: { summary: 'IconName' } },
    },
    iconRight: {
      control: 'text',
      description: 'Icon name for right position',
      table: { category: 'Icons', type: { summary: 'IconName' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Loading state with spinner',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width button',
      table: {
        category: 'Layout',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    as: {
      control: 'select',
      options: ['button', 'a'],
      description: 'HTML element to render (polymorphic)',
      table: {
        category: 'Polymorphic',
        type: { summary: 'ElementType' },
        defaultValue: { summary: 'button' },
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// DEFAULT STORY
// ============================================

export const Default: Story = {
  name: 'Default',
  render: () => {
    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <PropCard label="Default Button">
            <Button>Click me</Button>
          </PropCard>

          <CodeBlock code={`<Button>Click me</Button>`} language="jsx" title="JSX" />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: TYPE (Visual Style)
// ============================================

export const PropType: Story = {
  name: 'Prop: type',
  render: () => {
    const types = [
      { value: 'solid', label: 'solid', description: 'Filled background (default)' },
      { value: 'outline', label: 'outline', description: 'Border only, transparent background' },
      { value: 'ghost', label: 'ghost', description: 'No border, transparent background' },
    ] as const;

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grid of type examples */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {types.map((typeItem, index) => {
              const colors = getColorByIndex(index);

              return (
                <PropCard key={typeItem.value} label={`type="${typeItem.label}"`}>
                  <div
                    style={{
                      backgroundColor: colors.light,
                      padding: '24px',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                      alignItems: 'center',
                    }}
                  >
                    <Button type={typeItem.value} variant="primary">
                      {typeItem.label}
                    </Button>
                    <div
                      style={{
                        fontSize: '12px',
                        color: STORY_COLORS.neutral.textSlate,
                        textAlign: 'center',
                      }}
                    >
                      {typeItem.description}
                    </div>
                  </div>
                </PropCard>
              );
            })}
          </div>

          <CodeBlock
            code={`{/* Solid (default) */}
<Button type="solid">Solid Button</Button>

{/* Outline */}
<Button type="outline">Outline Button</Button>

{/* Ghost */}
<Button type="ghost">Ghost Button</Button>`}
            language="jsx"
            title="JSX"
          />
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
    const variants = [
      { value: 'primary', label: 'primary', description: 'Primary action' },
      { value: 'secondary', label: 'secondary', description: 'Secondary action' },
      { value: 'success', label: 'success', description: 'Success / Positive action' },
      { value: 'danger', label: 'danger', description: 'Destructive / Negative action' },
      { value: 'warning', label: 'warning', description: 'Warning / Caution' },
      { value: 'info', label: 'info', description: 'Informational' },
      { value: 'neutral', label: 'neutral', description: 'Neutral / Low-emphasis' },
    ] as const;

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
                <PropCard key={variantItem.value} label={`variant="${variantItem.label}"`}>
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
                    <Button type="solid" variant={variantItem.value}>
                      {variantItem.label}
                    </Button>
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

          <CodeBlock
            code={`{/* Primary (default) */}
<Button variant="primary">Primary</Button>

{/* Success */}
<Button variant="success">Success</Button>

{/* Danger */}
<Button variant="danger">Delete</Button>`}
            language="jsx"
            title="JSX"
          />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// TYPE + VARIANT MATRIX (21 Combinations)
// ============================================

export const TypeVariantMatrix: Story = {
  name: 'Type + Variant Matrix',
  render: () => {
    const types = ['solid', 'outline', 'ghost'] as const;
    const variants = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'neutral'] as const;

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {types.map((type) => (
            <div key={type}>
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
                Type: {type}
              </h3>
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}
              >
                {variants.map((variant) => (
                  <Button key={variant} type={type} variant={variant}>
                    {variant}
                  </Button>
                ))}
              </div>
            </div>
          ))}

          <CodeBlock
            code={`{/* 21 combinations: 3 types × 7 variants */}
<Button type="solid" variant="primary">Primary</Button>
<Button type="outline" variant="danger">Delete</Button>
<Button type="ghost" variant="neutral">Cancel</Button>`}
            language="jsx"
            title="JSX"
          />
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
    const sizes = [
      { value: 'sm', label: 'sm', height: '32px', description: 'Small' },
      { value: 'md', label: 'md', height: '40px', description: 'Medium (default)' },
      { value: 'lg', label: 'lg', height: '48px', description: 'Large' },
    ] as const;

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
                <PropCard key={sizeItem.value} label={`size="${sizeItem.label}"`}>
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
                    <Button size={sizeItem.value}>Button {sizeItem.label}</Button>
                    <div
                      style={{
                        fontSize: '11px',
                        color: STORY_COLORS.neutral.textSlate,
                      }}
                    >
                      Height: {sizeItem.height} • {sizeItem.description}
                    </div>
                  </div>
                </PropCard>
              );
            })}
          </div>

          <CodeBlock
            code={`<Button size="sm">Small Button</Button>
<Button size="md">Medium Button</Button>
<Button size="lg">Large Button</Button>`}
            language="jsx"
            title="JSX"
          />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: RADIUS
// ============================================

export const PropRadius: Story = {
  name: 'Prop: radius',
  render: () => {
    const radiusOptions = [
      { value: 'none', label: 'none', px: '0px', description: 'Sharp corners' },
      { value: 'sm', label: 'sm', px: '2px', description: 'Subtle rounding' },
      { value: 'base', label: 'base', px: '8px', description: 'Default rounding' },
      { value: 'md', label: 'md', px: '12px', description: 'Emphasized rounding' },
      { value: 'full', label: 'full', px: '9999px', description: 'Pill shape' },
    ] as const;

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
            }}
          >
            {radiusOptions.map((radiusItem, index) => {
              const colors = getColorByIndex(index);

              return (
                <PropCard key={radiusItem.value} label={`radius="${radiusItem.label}"`}>
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
                    <Button radius={radiusItem.value}>{radiusItem.label}</Button>
                    <div
                      style={{
                        fontSize: '11px',
                        color: STORY_COLORS.neutral.textSlate,
                        textAlign: 'center',
                      }}
                    >
                      {radiusItem.px} • {radiusItem.description}
                    </div>
                  </div>
                </PropCard>
              );
            })}
          </div>

          <CodeBlock
            code={`<Button radius="none">Sharp</Button>
<Button radius="base">Default</Button>
<Button radius="full">Pill</Button>`}
            language="jsx"
            title="JSX"
          />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: ICONS
// ============================================

export const PropIcons: Story = {
  name: 'Prop: iconLeft / iconRight',
  render: () => {
    const iconExamples = [
      { config: { iconLeft: 'check' }, label: 'iconLeft="check"', children: 'Save' },
      { config: { iconRight: 'arrow-right' }, label: 'iconRight="arrow-right"', children: 'Next' },
      {
        config: { iconLeft: 'check', iconRight: 'arrow-right' },
        label: 'Both icons',
        children: 'Confirm',
      },
      { config: { iconLeft: 'search' }, label: 'Icon-only', children: undefined, ariaLabel: 'Search' },
    ];

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
            {iconExamples.map((example, index) => {
              const colors = getColorByIndex(index);

              return (
                <PropCard key={index} label={example.label}>
                  <div
                    style={{
                      backgroundColor: colors.light,
                      padding: '24px',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Button {...example.config} aria-label={example.ariaLabel}>
                      {example.children}
                    </Button>
                  </div>
                </PropCard>
              );
            })}
          </div>

          <CodeBlock
            code={`{/* Left icon */}
<Button iconLeft="check">Save</Button>

{/* Right icon */}
<Button iconRight="arrow-right">Next</Button>

{/* Both icons */}
<Button iconLeft="check" iconRight="arrow-right">
  Confirm
</Button>

{/* Icon-only (requires aria-label) */}
<Button iconLeft="search" aria-label="Search" />`}
            language="jsx"
            title="JSX"
          />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: DISABLED & LOADING
// ============================================

export const PropStates: Story = {
  name: 'Prop: disabled / loading',
  render: () => {
    const types = ['solid', 'outline', 'ghost'] as const;

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Disabled state */}
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
              Disabled State
            </h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {types.map((type) => (
                <Button key={type} type={type} disabled>
                  Disabled {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Loading state */}
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
              Loading State
            </h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {types.map((type) => (
                <Button key={type} type={type} loading>
                  Loading {type}
                </Button>
              ))}
            </div>
          </div>

          <CodeBlock
            code={`{/* Disabled */}
<Button disabled>Disabled</Button>

{/* Loading (with spinner) */}
<Button loading>Saving...</Button>`}
            language="jsx"
            title="JSX"
          />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: FULLWIDTH
// ============================================

export const PropFullWidth: Story = {
  name: 'Prop: fullWidth',
  render: () => {
    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <PropCard label="fullWidth={true}">
            <div style={{ width: '100%', maxWidth: '500px' }}>
              <div
                style={{
                  backgroundColor: STORY_COLORS.primary.blue.light,
                  padding: '16px',
                  borderRadius: '8px',
                }}
              >
                <Button fullWidth>Full Width Button</Button>
              </div>
            </div>
          </PropCard>

          <PropCard label="fullWidth={false} (default)">
            <div style={{ width: '100%', maxWidth: '500px' }}>
              <div
                style={{
                  backgroundColor: STORY_COLORS.primary.violet.light,
                  padding: '16px',
                  borderRadius: '8px',
                }}
              >
                <Button>Normal Width Button</Button>
              </div>
            </div>
          </PropCard>

          <CodeBlock
            code={`<Button fullWidth>
  Full Width Button
</Button>`}
            language="jsx"
            title="JSX"
          />
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
            <PropCard label='as="button" (default)'>
              <div
                style={{
                  backgroundColor: STORY_COLORS.primary.blue.light,
                  padding: '24px',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Button as="button" onClick={() => alert('Button clicked!')}>
                  Button Element
                </Button>
              </div>
            </PropCard>

            <PropCard label='as="a" (anchor)'>
              <div
                style={{
                  backgroundColor: STORY_COLORS.primary.violet.light,
                  padding: '24px',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Button as="a" href="#link" type="ghost" variant="primary">
                  Anchor Element
                </Button>
              </div>
            </PropCard>
          </div>

          <CodeBlock
            code={`{/* As button */}
<Button as="button" onClick={handleClick}>
  Button
</Button>

{/* As anchor */}
<Button as="a" href="/home">
  Link Button
</Button>`}
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
  name: 'Use Cases',
  render: () => {
    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* CTA Section */}
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
              Call-to-Action (CTA)
            </h3>
            <div
              style={{
                backgroundColor: STORY_COLORS.primary.blue.light,
                padding: '24px',
                borderRadius: '8px',
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
              }}
            >
              <Button type="solid" variant="primary" size="lg" iconRight="arrow-right">
                Get Started
              </Button>
              <Button type="outline" variant="primary" size="lg">
                Learn More
              </Button>
            </div>
          </div>

          {/* Form Actions */}
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
              Form Actions
            </h3>
            <div
              style={{
                backgroundColor: STORY_COLORS.primary.violet.light,
                padding: '24px',
                borderRadius: '8px',
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end',
              }}
            >
              <Button type="ghost" variant="neutral">
                Cancel
              </Button>
              <Button type="solid" variant="primary" iconLeft="check">
                Save Changes
              </Button>
            </div>
          </div>

          {/* Destructive Actions */}
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
              Destructive Actions
            </h3>
            <div
              style={{
                backgroundColor: STORY_COLORS.primary.pink.light,
                padding: '24px',
                borderRadius: '8px',
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
              }}
            >
              <Button type="outline" variant="neutral">
                Keep
              </Button>
              <Button type="solid" variant="danger" iconLeft="trash">
                Delete
              </Button>
            </div>
          </div>

          {/* Icon Toolbar */}
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
              Icon Toolbar
            </h3>
            <div
              style={{
                backgroundColor: STORY_COLORS.primary.green.light,
                padding: '24px',
                borderRadius: '8px',
                display: 'flex',
                gap: '8px',
                justifyContent: 'center',
              }}
            >
              <Button type="ghost" variant="neutral" iconLeft="search" aria-label="Search" />
              <Button type="ghost" variant="neutral" iconLeft="settings" aria-label="Settings" />
              <Button type="ghost" variant="neutral" iconLeft="heart" aria-label="Favorite" />
              <Button type="ghost" variant="neutral" iconLeft="save" aria-label="Save" />
            </div>
          </div>

          <CodeBlock
            code={`{/* CTA */}
<Button 
  type="solid" 
  variant="primary" 
  size="lg"
  iconRight="arrow-right"
>
  Get Started
</Button>

{/* Form actions */}
<Button type="ghost" variant="neutral">Cancel</Button>
<Button type="solid" variant="primary">Save</Button>

{/* Destructive */}
<Button type="solid" variant="danger" iconLeft="trash">
  Delete
</Button>

{/* Icon toolbar */}
<Button 
  type="ghost" 
  variant="neutral" 
  iconLeft="search" 
  aria-label="Search" 
/>`}
            language="jsx"
            title="JSX"
          />
        </div>
      </StoryContainer>
    );
  },
};
