/**
 * Box Component - Storybook Stories
 *
 * Universal layout primitive with utility-based props
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@grasdouble/lufa_design-system';

// ============================================
// META
// ============================================

const meta = {
  title: 'Primitives/Box',
  component: Box,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A flexible, polymorphic container component that serves as the foundation for all layout compositions. Features utility-based props for spacing, backgrounds, borders, and display.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['div', 'section', 'article', 'header', 'footer', 'main', 'nav', 'aside'],
      description: 'HTML element to render',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'div' },
      },
    },
    padding: {
      control: 'select',
      options: ['none', 'tight', 'compact', 'default', 'comfortable', 'spacious'],
      description: 'Padding on all sides (semantic spacing tokens)',
      table: {
        type: { summary: 'SpacingValue' },
        category: 'Spacing',
      },
    },
    background: {
      control: 'select',
      options: [
        'page',
        'surface',
        'success',
        'error',
        'warning',
        'info',
        'overlay',
        'on-primary',
        'on-secondary',
        'on-success',
        'on-error',
        'on-warning',
        'on-info',
      ],
      description: 'Background color (semantic color tokens)',
      table: {
        type: { summary: 'BackgroundValue' },
        category: 'Background',
      },
    },
    borderRadius: {
      control: 'select',
      options: ['none', 'small', 'default', 'medium', 'large', 'full'],
      description: 'Border radius (semantic radius tokens)',
      table: {
        type: { summary: 'BorderRadiusValue' },
        category: 'Border',
      },
    },
    borderWidth: {
      control: 'select',
      options: ['none', 'thin', 'medium', 'thick'],
      description: 'Border width',
      table: {
        type: { summary: 'BorderWidthValue' },
        category: 'Border',
      },
    },
    borderColor: {
      control: 'select',
      options: ['default', 'strong', 'success', 'error', 'warning', 'info'],
      description: 'Border color (semantic color tokens)',
      table: {
        type: { summary: 'BorderColorValue' },
        category: 'Border',
      },
    },
    display: {
      control: 'select',
      options: ['block', 'inline-block', 'flex', 'inline-flex', 'grid', 'none'],
      description: 'CSS display property',
      table: {
        type: { summary: 'DisplayValue' },
        category: 'Display',
      },
    },
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// STORIES
// ============================================

/**
 * Default Box with minimal styling
 */
export const Default: Story = {
  args: {
    children: 'Simple Box container',
  },
};

/**
 * Box with padding and background
 */
export const WithPaddingAndBackground: Story = {
  args: {
    padding: 'default',
    background: 'surface',
    children: 'Box with padding="default" and background="surface"',
  },
};

/**
 * Card-like Box with border
 */
export const CardLike: Story = {
  args: {
    padding: 'comfortable',
    background: 'surface',
    borderRadius: 'default',
    borderWidth: 'thin',
    borderColor: 'default',
    children: (
      <>
        <h3 style={{ margin: 0, marginBottom: '8px' }}>Card Title</h3>
        <p style={{ margin: 0 }}>
          This is a card-like layout using Box with padding, background, border radius, and border.
        </p>
      </>
    ),
  },
};

/**
 * Semantic section element
 */
export const SemanticSection: Story = {
  args: {
    as: 'section',
    padding: 'spacious',
    background: 'page',
    children: (
      <>
        <h2 style={{ margin: 0, marginBottom: '16px' }}>Section Title</h2>
        <p style={{ margin: 0 }}>
          This Box renders as a &lt;section&gt; element for semantic HTML. It has spacious padding and page background.
        </p>
      </>
    ),
  },
};

/**
 * All spacing variants
 */
export const SpacingVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Box padding="none" background="surface" borderWidth="thin" borderColor="default">
        padding="none" (4px)
      </Box>
      <Box padding="tight" background="surface" borderWidth="thin" borderColor="default">
        padding="tight" (4px)
      </Box>
      <Box padding="compact" background="surface" borderWidth="thin" borderColor="default">
        padding="compact" (8px)
      </Box>
      <Box padding="default" background="surface" borderWidth="thin" borderColor="default">
        padding="default" (16px)
      </Box>
      <Box padding="comfortable" background="surface" borderWidth="thin" borderColor="default">
        padding="comfortable" (24px)
      </Box>
      <Box padding="spacious" background="surface" borderWidth="thin" borderColor="default">
        padding="spacious" (32px)
      </Box>
    </div>
  ),
};

/**
 * All background variants
 */
export const BackgroundVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Box padding="default" background="page">
        background="page"
      </Box>
      <Box padding="default" background="surface">
        background="surface"
      </Box>
      <Box padding="default" background="success">
        background="success"
      </Box>
      <Box padding="default" background="error">
        background="error"
      </Box>
      <Box padding="default" background="warning">
        background="warning"
      </Box>
      <Box padding="default" background="info">
        background="info"
      </Box>
      <Box padding="default" background="overlay">
        background="overlay"
      </Box>
    </div>
  ),
};

/**
 * Border radius variants
 */
export const BorderRadiusVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Box padding="default" background="surface" borderRadius="none" borderWidth="thin" borderColor="default">
        borderRadius="none"
      </Box>
      <Box padding="default" background="surface" borderRadius="small" borderWidth="thin" borderColor="default">
        borderRadius="small"
      </Box>
      <Box padding="default" background="surface" borderRadius="default" borderWidth="thin" borderColor="default">
        borderRadius="default"
      </Box>
      <Box padding="default" background="surface" borderRadius="medium" borderWidth="thin" borderColor="default">
        borderRadius="medium"
      </Box>
      <Box padding="default" background="surface" borderRadius="large" borderWidth="thin" borderColor="default">
        borderRadius="large"
      </Box>
      <Box
        padding="default"
        background="surface"
        borderRadius="full"
        borderWidth="thin"
        borderColor="default"
        style={{ width: 'fit-content' }}
      >
        borderRadius="full"
      </Box>
    </div>
  ),
};

/**
 * Composition example - Nested boxes
 */
export const NestedBoxes: Story = {
  render: () => (
    <Box padding="spacious" background="page" borderRadius="default">
      <Box padding="comfortable" background="surface" borderRadius="default" borderWidth="thin" borderColor="default">
        <h3 style={{ margin: 0, marginBottom: '16px' }}>Outer Box</h3>
        <Box padding="default" background="info" borderRadius="small">
          <p style={{ margin: 0 }}>Inner Box with different background</p>
        </Box>
      </Box>
    </Box>
  ),
};
