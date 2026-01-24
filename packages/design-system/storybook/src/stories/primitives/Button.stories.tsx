/**
 * Button Component Stories
 *
 * Demonstrates all Button component variations through consolidated matrix views:
 * - Types & Variants Matrix: 3 types × 7 variants = 21 combinations
 * - Sizes Matrix: 3 sizes (sm, md, lg) across types and with icons
 * - Radius Matrix: 5 radius options (none, sm, base, md, full)
 * - Icons Matrix: Left, right, both, icon-only configurations
 * - States Matrix: Default, loading, disabled states
 * - Use Cases Matrix: Real-world button patterns
 * - Plus: Default, Playground, IconOnly, AsLink, FullWidth
 *
 * Total stories: 12 (consolidated from 25)
 */

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@grasdouble/lufa_design-system';
import tokens from '@grasdouble/lufa_design-system-tokens/values';

// ============================================
// Meta Configuration
// ============================================

const meta = {
  title: 'Primitives/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile button component with multiple types, variants, sizes, and states. ' +
          'Supports icons, loading states, and polymorphic rendering.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['solid', 'outline', 'ghost'],
      description: 'Visual style type',
      table: {
        type: { summary: 'solid | outline | ghost' },
        defaultValue: { summary: 'solid' },
      },
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'neutral'],
      description: 'Semantic color variant',
      table: {
        type: { summary: 'primary | secondary | success | danger | warning | info | neutral' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'base', 'md', 'full'],
      description: 'Border radius',
      table: {
        type: { summary: 'none | sm | base | md | full' },
        defaultValue: { summary: 'base' },
      },
    },
    iconLeft: {
      control: 'select',
      options: ['none', 'check', 'x', 'alert-circle', 'info', 'arrow-right', 'user', 'search'],
      mapping: {
        none: undefined,
      },
      description: 'Icon on the left side',
    },
    iconRight: {
      control: 'select',
      options: ['none', 'check', 'x', 'alert-circle', 'info', 'arrow-right', 'user', 'search'],
      mapping: {
        none: undefined,
      },
      description: 'Icon on the right side',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state with spinner',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width button',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    as: {
      control: 'select',
      options: ['button', 'a'],
      description: 'HTML element to render',
      table: {
        type: { summary: 'button | a' },
        defaultValue: { summary: 'button' },
      },
    },
    children: {
      control: 'text',
      description: 'Button text content',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// Basic Stories
// ============================================

/**
 * Default button with solid type and primary variant
 */
export const Default: Story = {
  args: {
    children: 'Button',
    type: 'solid',
    variant: 'primary',
    size: 'md',
  },
};

/**
 * Playground for interactive testing
 */
export const Playground: Story = {
  args: {
    children: 'Click me',
    type: 'solid',
    variant: 'primary',
    size: 'md',
    iconLeft: undefined,
    iconRight: undefined,
    loading: false,
    disabled: false,
    fullWidth: false,
  },
};

// ============================================
// Type × Variant Matrix (21 combinations)
// ============================================

/**
 * Complete matrix of all 21 combinations: 3 types × 7 variants.
 * This consolidated view shows every possible type-variant combination in one place.
 */
export const TypesAndVariantsMatrix: Story = {
  render: () => {
    const sectionHeaderStyle = {
      marginBottom: tokens.primitive.spacing['12'],
      fontSize: tokens.primitive.typography['font-size'].sm,
      fontWeight: 600,
      color: tokens.semantic.ui['text-secondary'],
      letterSpacing: '0.05em',
      textTransform: 'uppercase' as const,
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.primitive.spacing['24'] }}>
        {/* Solid Type */}
        <div>
          <h3 style={sectionHeaderStyle}>Solid Type</h3>
          <div style={{ display: 'flex', gap: tokens.primitive.spacing['8'], flexWrap: 'wrap' }}>
            <Button type="solid" variant="primary">
              Primary
            </Button>
            <Button type="solid" variant="secondary">
              Secondary
            </Button>
            <Button type="solid" variant="success">
              Success
            </Button>
            <Button type="solid" variant="danger">
              Danger
            </Button>
            <Button type="solid" variant="warning">
              Warning
            </Button>
            <Button type="solid" variant="info">
              Info
            </Button>
            <Button type="solid" variant="neutral">
              Neutral
            </Button>
          </div>
        </div>

        {/* Outline Type */}
        <div>
          <h3 style={sectionHeaderStyle}>Outline Type</h3>
          <div style={{ display: 'flex', gap: tokens.primitive.spacing['8'], flexWrap: 'wrap' }}>
            <Button type="outline" variant="primary">
              Primary
            </Button>
            <Button type="outline" variant="secondary">
              Secondary
            </Button>
            <Button type="outline" variant="success">
              Success
            </Button>
            <Button type="outline" variant="danger">
              Danger
            </Button>
            <Button type="outline" variant="warning">
              Warning
            </Button>
            <Button type="outline" variant="info">
              Info
            </Button>
            <Button type="outline" variant="neutral">
              Neutral
            </Button>
          </div>
        </div>

        {/* Ghost Type */}
        <div>
          <h3 style={sectionHeaderStyle}>Ghost Type</h3>
          <div style={{ display: 'flex', gap: tokens.primitive.spacing['8'], flexWrap: 'wrap' }}>
            <Button type="ghost" variant="primary">
              Primary
            </Button>
            <Button type="ghost" variant="secondary">
              Secondary
            </Button>
            <Button type="ghost" variant="success">
              Success
            </Button>
            <Button type="ghost" variant="danger">
              Danger
            </Button>
            <Button type="ghost" variant="warning">
              Warning
            </Button>
            <Button type="ghost" variant="info">
              Info
            </Button>
            <Button type="ghost" variant="neutral">
              Neutral
            </Button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Complete matrix of all 21 combinations: 3 types (solid, outline, ghost) × 7 variants ' +
          '(primary, secondary, success, danger, warning, info, neutral). Use solid for main CTAs, ' +
          'outline for secondary actions, ghost for tertiary/subtle actions.',
      },
    },
  },
};

// ============================================
// Size Matrix
// ============================================

/**
 * All size options (sm, md, lg) across different types and with icons.
 * Shows how sizes scale with different button types and icon configurations.
 */
export const SizesMatrix: Story = {
  render: () => {
    const sectionHeaderStyle = {
      marginBottom: tokens.primitive.spacing['12'],
      fontSize: tokens.primitive.typography['font-size'].sm,
      fontWeight: 600,
      color: tokens.semantic.ui['text-secondary'],
      letterSpacing: '0.05em',
      textTransform: 'uppercase' as const,
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.primitive.spacing['24'] }}>
        {/* Basic Sizes */}
        <div>
          <h3 style={sectionHeaderStyle}>Basic Sizes (text only)</h3>
          <div style={{ display: 'flex', gap: tokens.primitive.spacing['8'], alignItems: 'center' }}>
            <Button size="sm">Small (32px)</Button>
            <Button size="md">Medium (40px)</Button>
            <Button size="lg">Large (48px)</Button>
          </div>
        </div>

        {/* Sizes with Icons */}
        <div>
          <h3 style={sectionHeaderStyle}>Sizes with Icons</h3>
          <div style={{ display: 'flex', gap: tokens.primitive.spacing['8'], alignItems: 'center' }}>
            <Button size="sm" iconLeft="check">
              Small
            </Button>
            <Button size="md" iconLeft="check">
              Medium
            </Button>
            <Button size="lg" iconLeft="check">
              Large
            </Button>
          </div>
        </div>

        {/* Sizes across Types */}
        <div>
          <h3 style={sectionHeaderStyle}>Sizes across Button Types</h3>
          <div style={{ display: 'flex', gap: tokens.primitive.spacing['8'], alignItems: 'center', flexWrap: 'wrap' }}>
            <Button type="solid" variant="primary" size="sm">
              Solid SM
            </Button>
            <Button type="solid" variant="primary" size="md">
              Solid MD
            </Button>
            <Button type="solid" variant="primary" size="lg">
              Solid LG
            </Button>
          </div>
          <div
            style={{
              display: 'flex',
              gap: tokens.primitive.spacing['8'],
              alignItems: 'center',
              flexWrap: 'wrap',
              marginTop: tokens.primitive.spacing['8'],
            }}
          >
            <Button type="outline" variant="primary" size="sm">
              Outline SM
            </Button>
            <Button type="outline" variant="primary" size="md">
              Outline MD
            </Button>
            <Button type="outline" variant="primary" size="lg">
              Outline LG
            </Button>
          </div>
          <div
            style={{
              display: 'flex',
              gap: tokens.primitive.spacing['8'],
              alignItems: 'center',
              flexWrap: 'wrap',
              marginTop: tokens.primitive.spacing['8'],
            }}
          >
            <Button type="ghost" variant="primary" size="sm">
              Ghost SM
            </Button>
            <Button type="ghost" variant="primary" size="md">
              Ghost MD
            </Button>
            <Button type="ghost" variant="primary" size="lg">
              Ghost LG
            </Button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Comprehensive size matrix showing all 3 sizes (sm, md, lg) with text-only buttons, ' +
          'buttons with icons, and across all 3 button types. Use sizes to match content hierarchy: ' +
          'lg for primary CTAs, md for standard actions, sm for compact UIs.',
      },
    },
  },
};

// ============================================
// Radius Matrix
// ============================================

/**
 * All border radius options: none, sm, base, md, full (pill).
 * Shows how different radius values affect button appearance.
 */
export const RadiusMatrix: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: tokens.primitive.spacing['8'], flexWrap: 'wrap', alignItems: 'center' }}>
      <Button radius="none">None (0px)</Button>
      <Button radius="sm">Small (2px)</Button>
      <Button radius="base">Base (8px)</Button>
      <Button radius="md">Medium (12px)</Button>
      <Button radius="full">Full (pill)</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'All 5 border radius options. Use "base" (8px) for most cases, "full" for pill-shaped ' +
          'buttons, "none" for sharp edges, and "sm"/"md" for subtle variations.',
      },
    },
  },
};

// ============================================
// Icon Matrix
// ============================================

/**
 * Icon-only button (no text)
 */
export const IconOnly: Story = {
  args: {
    iconLeft: 'search',
    'aria-label': 'Search',
  },
};

/**
 * All icon positions and configurations: left, right, both, icon-only.
 * Shows how icons integrate with button text and different button types.
 */
export const IconsMatrix: Story = {
  render: () => {
    const sectionHeaderStyle = {
      marginBottom: tokens.primitive.spacing['12'],
      fontSize: tokens.primitive.typography['font-size'].sm,
      fontWeight: 600,
      color: tokens.semantic.ui['text-secondary'],
      letterSpacing: '0.05em',
      textTransform: 'uppercase' as const,
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.primitive.spacing['24'] }}>
        {/* Icon Positions */}
        <div>
          <h3 style={sectionHeaderStyle}>Icon Positions</h3>
          <div style={{ display: 'flex', gap: tokens.primitive.spacing['8'], flexWrap: 'wrap' }}>
            <Button iconLeft="check">Icon Left</Button>
            <Button iconRight="arrow-right">Icon Right</Button>
            <Button iconLeft="user" iconRight="arrow-right">
              Both Icons
            </Button>
            <Button iconLeft="search" aria-label="Search" />
          </div>
        </div>

        {/* Icons with Different Variants */}
        <div>
          <h3 style={sectionHeaderStyle}>Icons with Different Variants</h3>
          <div style={{ display: 'flex', gap: tokens.primitive.spacing['8'], flexWrap: 'wrap' }}>
            <Button type="solid" variant="primary" iconLeft="check">
              Save
            </Button>
            <Button type="solid" variant="danger" iconLeft="alert-circle">
              Delete
            </Button>
            <Button type="outline" variant="info" iconLeft="info">
              Learn more
            </Button>
            <Button type="ghost" variant="neutral" iconLeft="user">
              Profile
            </Button>
          </div>
        </div>

        {/* Icon-Only Toolbar */}
        <div>
          <h3 style={sectionHeaderStyle}>Icon-Only Toolbar (Ghost Small)</h3>
          <div style={{ display: 'flex', gap: tokens.primitive.spacing['8'] }}>
            <Button type="ghost" variant="neutral" size="sm" iconLeft="check" aria-label="Approve" />
            <Button type="ghost" variant="neutral" size="sm" iconLeft="x" aria-label="Reject" />
            <Button type="ghost" variant="neutral" size="sm" iconLeft="info" aria-label="Info" />
            <Button type="ghost" variant="neutral" size="sm" iconLeft="search" aria-label="Search" />
          </div>
        </div>

        {/* Icon Sizes */}
        <div>
          <h3 style={sectionHeaderStyle}>Icons with Different Sizes</h3>
          <div style={{ display: 'flex', gap: tokens.primitive.spacing['8'], alignItems: 'center' }}>
            <Button size="sm" iconLeft="check">
              Small
            </Button>
            <Button size="md" iconLeft="check">
              Medium
            </Button>
            <Button size="lg" iconLeft="check">
              Large
            </Button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Comprehensive icon matrix showing all icon configurations: left, right, both sides, ' +
          'icon-only, and across different variants, sizes, and types. Always provide aria-label ' +
          'for icon-only buttons to ensure accessibility.',
      },
    },
  },
};

// ============================================
// States Matrix
// ============================================

/**
 * All button states: default, loading, disabled.
 * Shows how state changes affect button appearance and interaction.
 */
export const StatesMatrix: Story = {
  render: () => {
    const sectionHeaderStyle = {
      marginBottom: tokens.primitive.spacing['12'],
      fontSize: tokens.primitive.typography['font-size'].sm,
      fontWeight: 600,
      color: tokens.semantic.ui['text-secondary'],
      letterSpacing: '0.05em',
      textTransform: 'uppercase' as const,
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.primitive.spacing['24'] }}>
        {/* Basic States */}
        <div>
          <h3 style={sectionHeaderStyle}>Basic States</h3>
          <div style={{ display: 'flex', gap: tokens.primitive.spacing['8'], flexWrap: 'wrap' }}>
            <Button>Default</Button>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>

        {/* States across Types */}
        <div>
          <h3 style={sectionHeaderStyle}>States across Button Types</h3>
          <div style={{ display: 'flex', gap: tokens.primitive.spacing['8'], flexWrap: 'wrap' }}>
            <Button type="solid" variant="primary">
              Solid Default
            </Button>
            <Button type="solid" variant="primary" loading>
              Solid Loading
            </Button>
            <Button type="solid" variant="primary" disabled>
              Solid Disabled
            </Button>
          </div>
          <div
            style={{
              display: 'flex',
              gap: tokens.primitive.spacing['8'],
              flexWrap: 'wrap',
              marginTop: tokens.primitive.spacing['8'],
            }}
          >
            <Button type="outline" variant="primary">
              Outline Default
            </Button>
            <Button type="outline" variant="primary" loading>
              Outline Loading
            </Button>
            <Button type="outline" variant="primary" disabled>
              Outline Disabled
            </Button>
          </div>
          <div
            style={{
              display: 'flex',
              gap: tokens.primitive.spacing['8'],
              flexWrap: 'wrap',
              marginTop: tokens.primitive.spacing['8'],
            }}
          >
            <Button type="ghost" variant="primary">
              Ghost Default
            </Button>
            <Button type="ghost" variant="primary" loading>
              Ghost Loading
            </Button>
            <Button type="ghost" variant="primary" disabled>
              Ghost Disabled
            </Button>
          </div>
        </div>

        {/* States with Icons */}
        <div>
          <h3 style={sectionHeaderStyle}>States with Icons</h3>
          <div style={{ display: 'flex', gap: tokens.primitive.spacing['8'], flexWrap: 'wrap' }}>
            <Button iconLeft="check">Default</Button>
            <Button iconLeft="check" loading>
              Loading
            </Button>
            <Button iconLeft="check" disabled>
              Disabled
            </Button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Complete states matrix showing default, loading, and disabled states across all button ' +
          'types and with icons. Loading state displays a spinner and disables interaction. ' +
          'Disabled state reduces opacity and prevents all interactions.',
      },
    },
  },
};

// ============================================
// Full Width
// ============================================

/**
 * Full width button
 */
export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Button fullWidth>Full Width Button</Button>
    </div>
  ),
};

// ============================================
// Polymorphic Rendering
// ============================================

/**
 * Button rendered as anchor link
 */
export const AsLink: Story = {
  args: {
    as: 'a',
    href: 'https://example.com',
    children: 'Link Button',
    type: 'outline',
  },
};

// ============================================
// Real-World Use Cases Matrix
// ============================================

/**
 * Real-world button usage patterns organized by common UI scenarios.
 * Demonstrates practical button combinations for typical application needs.
 */
export const UseCasesMatrix: Story = {
  render: () => {
    const sectionHeaderStyle = {
      marginBottom: tokens.primitive.spacing['12'],
      fontSize: tokens.primitive.typography['font-size'].sm,
      fontWeight: 600,
      color: tokens.semantic.ui['text-secondary'],
      letterSpacing: '0.05em',
      textTransform: 'uppercase' as const,
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.primitive.spacing['24'] }}>
        {/* Primary Actions */}
        <div>
          <h3 style={sectionHeaderStyle}>Primary Actions (CTAs)</h3>
          <div style={{ display: 'flex', gap: tokens.primitive.spacing['8'], flexWrap: 'wrap' }}>
            <Button type="solid" variant="primary" iconLeft="check">
              Save
            </Button>
            <Button type="solid" variant="primary" iconRight="arrow-right">
              Continue
            </Button>
            <Button type="solid" variant="success" iconLeft="check">
              Confirm
            </Button>
            <Button type="solid" variant="danger" iconLeft="alert-circle">
              Delete
            </Button>
          </div>
        </div>

        {/* Secondary Actions */}
        <div>
          <h3 style={sectionHeaderStyle}>Secondary/Tertiary Actions</h3>
          <div style={{ display: 'flex', gap: tokens.primitive.spacing['8'], flexWrap: 'wrap' }}>
            <Button type="outline" variant="primary">
              Learn more
            </Button>
            <Button type="outline" variant="neutral">
              Back
            </Button>
            <Button type="ghost" variant="neutral">
              Cancel
            </Button>
          </div>
        </div>

        {/* Alert/Notification Buttons */}
        <div>
          <h3 style={sectionHeaderStyle}>Alert &amp; Notification Actions</h3>
          <div style={{ display: 'flex', gap: tokens.primitive.spacing['8'], flexWrap: 'wrap' }}>
            <Button type="solid" variant="success" iconLeft="check">
              Success
            </Button>
            <Button type="solid" variant="danger" iconLeft="alert-circle">
              Error
            </Button>
            <Button type="solid" variant="warning" iconLeft="alert-circle">
              Warning
            </Button>
            <Button type="solid" variant="info" iconLeft="info">
              Info
            </Button>
          </div>
        </div>

        {/* Form Actions */}
        <div>
          <h3 style={sectionHeaderStyle}>Form Actions (Large Size)</h3>
          <div style={{ display: 'flex', gap: tokens.primitive.spacing['8'], flexWrap: 'wrap' }}>
            <Button type="solid" variant="primary" size="lg">
              Submit
            </Button>
            <Button type="outline" variant="neutral" size="lg">
              Cancel
            </Button>
            <Button type="ghost" variant="danger" size="lg">
              Reset
            </Button>
          </div>
        </div>

        {/* Icon Toolbar */}
        <div>
          <h3 style={sectionHeaderStyle}>Icon Toolbar (Compact Actions)</h3>
          <div style={{ display: 'flex', gap: tokens.primitive.spacing['8'] }}>
            <Button type="ghost" variant="neutral" size="sm" iconLeft="check" aria-label="Approve" />
            <Button type="ghost" variant="neutral" size="sm" iconLeft="x" aria-label="Reject" />
            <Button type="ghost" variant="neutral" size="sm" iconLeft="info" aria-label="Info" />
            <Button type="ghost" variant="neutral" size="sm" iconLeft="search" aria-label="Search" />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Real-world usage patterns organized by common UI scenarios: primary CTAs, secondary ' +
          'actions, alerts, form actions, and compact toolbars. Use this as a reference for ' +
          'typical button combinations in your application.',
      },
    },
  },
};
