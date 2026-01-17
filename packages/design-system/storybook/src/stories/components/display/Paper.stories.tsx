import type { Meta, StoryObj } from '@storybook/react-vite';

import { Paper } from '@grasdouble/lufa_design-system';
import tokens from '@grasdouble/lufa_design-system-tokens';

const meta = {
  title: '4. Display/Paper',
  component: Paper,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Paper is a foundational surface component that displays content with elevation and styling. It provides a flexible container with various visual styles, padding options, and elevation levels.',
      },
    },
  },
  tags: [],
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display inside the Paper',
    },
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined', 'filled'],
      description: 'Visual style variant',
    },
    padding: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large'],
      description: 'Internal padding size',
    },
    radius: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large', 'full'],
      description: 'Border radius size',
    },
    elevation: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large', 'xlarge'],
      description: 'Shadow elevation level (only for elevated variant)',
    },
  },
} satisfies Meta<typeof Paper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: 'This is a Paper component with default styling.',
    variant: 'default',
    padding: 'medium',
    radius: 'medium',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: tokens.spacing.base }}>
      <Paper variant="default">
        <h3 style={{ marginTop: 0 }}>Default</h3>
        <p style={{ marginBottom: 0 }}>Standard paper with subtle border</p>
      </Paper>
      <Paper variant="elevated">
        <h3 style={{ marginTop: 0 }}>Elevated</h3>
        <p style={{ marginBottom: 0 }}>Paper with shadow elevation</p>
      </Paper>
      <Paper variant="outlined">
        <h3 style={{ marginTop: 0 }}>Outlined</h3>
        <p style={{ marginBottom: 0 }}>Paper with prominent border</p>
      </Paper>
      <Paper variant="filled">
        <h3 style={{ marginTop: 0 }}>Filled</h3>
        <p style={{ marginBottom: 0 }}>Paper with background fill</p>
      </Paper>
    </div>
  ),
};

export const Padding: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.base }}>
      <Paper padding="none" variant="outlined">
        No padding
      </Paper>
      <Paper padding="small" variant="outlined">
        Small padding
      </Paper>
      <Paper padding="medium" variant="outlined">
        Medium padding (default)
      </Paper>
      <Paper padding="large" variant="outlined">
        Large padding
      </Paper>
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.base }}>
      <Paper radius="none" variant="outlined">
        No border radius
      </Paper>
      <Paper radius="small" variant="outlined">
        Small border radius
      </Paper>
      <Paper radius="medium" variant="outlined">
        Medium border radius (default)
      </Paper>
      <Paper radius="large" variant="outlined">
        Large border radius
      </Paper>
      <Paper radius="full" variant="outlined">
        Full border radius (pill shape)
      </Paper>
    </div>
  ),
};

export const Elevation: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: tokens.spacing.lg }}>
      <Paper variant="elevated" elevation="none">
        <h4 style={{ marginTop: 0 }}>None</h4>
        <p style={{ marginBottom: 0 }}>No shadow</p>
      </Paper>
      <Paper variant="elevated" elevation="small">
        <h4 style={{ marginTop: 0 }}>Small</h4>
        <p style={{ marginBottom: 0 }}>Subtle shadow</p>
      </Paper>
      <Paper variant="elevated" elevation="medium">
        <h4 style={{ marginTop: 0 }}>Medium</h4>
        <p style={{ marginBottom: 0 }}>Default shadow</p>
      </Paper>
      <Paper variant="elevated" elevation="large">
        <h4 style={{ marginTop: 0 }}>Large</h4>
        <p style={{ marginBottom: 0 }}>Prominent shadow</p>
      </Paper>
      <Paper variant="elevated" elevation="xlarge">
        <h4 style={{ marginTop: 0 }}>X-Large</h4>
        <p style={{ marginBottom: 0 }}>Maximum shadow</p>
      </Paper>
    </div>
  ),
};

export const UseCases: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.lg }}>
      <div>
        <h3 style={{ marginBottom: tokens.spacing.base }}>Dashboard Widget</h3>
        <Paper variant="elevated" padding="large">
          <h4 style={{ marginTop: 0, marginBottom: tokens.spacing.sm }}>Total Revenue</h4>
          <p style={{ fontSize: tokens.fontSize['2xl'], fontWeight: tokens.fontWeight.bold, margin: 0 }}>$24,567</p>
          <p style={{ fontSize: tokens.fontSize.sm, color: tokens.color.text.secondary, marginTop: tokens.spacing.xs }}>
            +12.5% from last month
          </p>
        </Paper>
      </div>

      <div>
        <h3 style={{ marginBottom: tokens.spacing.base }}>Information Panel</h3>
        <Paper variant="filled" padding="medium">
          <h4 style={{ marginTop: 0, marginBottom: tokens.spacing.sm }}>Pro Tip</h4>
          <p style={{ marginBottom: 0, fontSize: tokens.fontSize.sm }}>
            Use keyboard shortcuts to navigate faster. Press ⌘K to open the command palette.
          </p>
        </Paper>
      </div>

      <div>
        <h3 style={{ marginBottom: tokens.spacing.base }}>Content Container</h3>
        <Paper variant="outlined" padding="large">
          <h4 style={{ marginTop: 0 }}>Article Title</h4>
          <p style={{ color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm }}>
            Published on January 17, 2026
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
        </Paper>
      </div>

      <div>
        <h3 style={{ marginBottom: tokens.spacing.base }}>Image Gallery Item</h3>
        <Paper variant="elevated" padding="none" radius="large">
          <div
            style={{
              height: '200px',
              backgroundColor: tokens.color.background.tertiary,
              borderRadius: `${tokens.radius.large} ${tokens.radius.large} 0 0`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: tokens.color.text.secondary }}>Image Placeholder</span>
          </div>
          <div style={{ padding: tokens.spacing.base }}>
            <h4 style={{ margin: 0, marginBottom: tokens.spacing.xs }}>Photo Title</h4>
            <p style={{ margin: 0, fontSize: tokens.fontSize.sm, color: tokens.color.text.secondary }}>
              Beautiful landscape
            </p>
          </div>
        </Paper>
      </div>
    </div>
  ),
};

export const Combinations: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: tokens.spacing.base }}>
      <Paper variant="elevated" elevation="small" padding="small" radius="small">
        <strong>Small & Subtle</strong>
        <br />
        Compact with minimal elevation
      </Paper>
      <Paper variant="elevated" elevation="xlarge" padding="large" radius="large">
        <strong>Large & Prominent</strong>
        <br />
        Spacious with maximum elevation
      </Paper>
      <Paper variant="outlined" padding="medium" radius="full">
        <strong>Outlined Pill</strong>
        <br />
        Outlined style with full border radius
      </Paper>
      <Paper variant="filled" padding="large" radius="none">
        <strong>Filled Sharp</strong>
        <br />
        Filled background with no border radius
      </Paper>
    </div>
  ),
};
