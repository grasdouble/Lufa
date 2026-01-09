import type { Meta, StoryObj } from '@storybook/react-vite';

import { Spinner } from '@grasdouble/lufa_design-system';
import tokens from '@grasdouble/lufa_design-system-tokens';

const meta = {
  title: '5. Feedback/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A loading spinner component to indicate processing or loading states. Available in multiple sizes and modes.',
      },
    },
  },
  tags: [],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the spinner',
      table: {
        type: { summary: 'small | medium | large' },
        defaultValue: { summary: 'medium' },
      },
    },
    mode: {
      control: 'select',
      options: ['A', 'B'],
      description: 'Visual style variant of the spinner',
      table: {
        type: { summary: 'A | B' },
        defaultValue: { summary: 'A' },
      },
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    size: 'medium',
    mode: 'A',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.xl }}>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="small" mode="A" />
        <p style={{ marginTop: tokens.spacing.sm, fontSize: tokens.fontSize.xs, color: tokens.color.text.tertiary }}>
          Small
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="medium" mode="A" />
        <p style={{ marginTop: tokens.spacing.sm, fontSize: tokens.fontSize.xs, color: tokens.color.text.tertiary }}>
          Medium
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="large" mode="A" />
        <p style={{ marginTop: tokens.spacing.sm, fontSize: tokens.fontSize.xs, color: tokens.color.text.tertiary }}>
          Large
        </p>
      </div>
    </div>
  ),
};

export const ModeA: Story = {
  args: {
    size: 'medium',
    mode: 'A',
  },
};

export const ModeB: Story = {
  args: {
    size: 'medium',
    mode: 'B',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.xl }}>
      <div>
        <h3 style={{ marginBottom: tokens.spacing.base }}>Mode A</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.xl }}>
          <Spinner size="small" mode="A" />
          <Spinner size="medium" mode="A" />
          <Spinner size="large" mode="A" />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: tokens.spacing.base }}>Mode B</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.xl }}>
          <Spinner size="small" mode="B" />
          <Spinner size="medium" mode="B" />
          <Spinner size="large" mode="B" />
        </div>
      </div>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacing.lg,
        padding: tokens.spacing['md-lg'],
      }}
    >
      <div
        style={{
          padding: tokens.spacing['xl-2xl'],
          backgroundColor: tokens.color.background.tertiary,
          borderRadius: tokens.radius.base,
          textAlign: 'center',
        }}
      >
        <Spinner size="large" mode="A" />
        <p style={{ marginTop: tokens.spacing.base, color: tokens.color.text.tertiary }}>Loading content...</p>
      </div>

      <button
        style={{
          padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
          backgroundColor: tokens.color.interactive.default,
          color: tokens.color.text.inverse,
          border: tokens.borderStyle.none,
          borderRadius: tokens.radius.md,
          cursor: 'not-allowed',
          display: 'flex',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          justifyContent: 'center',
        }}
        disabled
      >
        <Spinner size="small" mode="A" />
        Processing...
      </button>

      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          padding: `${tokens.spacing.sm} ${tokens.spacing.base}`,
          backgroundColor: tokens.color.info.light,
          borderRadius: tokens.radius.md,
          color: tokens.color.interactive.default,
        }}
      >
        <Spinner size="small" mode="A" />
        <span>Loading data</span>
      </div>
    </div>
  ),
};
