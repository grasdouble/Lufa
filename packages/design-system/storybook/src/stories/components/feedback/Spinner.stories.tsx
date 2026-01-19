import type { Meta, StoryObj } from '@storybook/react-vite';

import { Spinner } from '@grasdouble/lufa_design-system';

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
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--lufa-token-spacing-xl)' }}>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="small" mode="A" />
        <p
          style={{
            marginTop: 'var(--lufa-token-spacing-sm)',
            fontSize: 'var(--lufa-token-font-size-xs)',
            color: 'var(--lufa-token-color-text-tertiary)',
          }}
        >
          Small
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="medium" mode="A" />
        <p
          style={{
            marginTop: 'var(--lufa-token-spacing-sm)',
            fontSize: 'var(--lufa-token-font-size-xs)',
            color: 'var(--lufa-token-color-text-tertiary)',
          }}
        >
          Medium
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="large" mode="A" />
        <p
          style={{
            marginTop: 'var(--lufa-token-spacing-sm)',
            fontSize: 'var(--lufa-token-font-size-xs)',
            color: 'var(--lufa-token-color-text-tertiary)',
          }}
        >
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--lufa-token-spacing-xl)' }}>
      <div>
        <h3 style={{ marginBottom: 'var(--lufa-token-spacing-base)' }}>
          Mode A
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--lufa-token-spacing-xl)' }}>
          <Spinner size="small" mode="A" />
          <Spinner size="medium" mode="A" />
          <Spinner size="large" mode="A" />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: 'var(--lufa-token-spacing-base)' }}>
          Mode B
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--lufa-token-spacing-xl)' }}>
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
        gap: 'var(--lufa-token-spacing-lg)',
        padding: 'var(--lufa-token-spacing-md-lg)',
      }}
    >
      <div
        style={{
          padding: 'var(--lufa-token-spacing-xl-2xl)',
          backgroundColor: 'var(--lufa-token-color-background-tertiary)',
          borderRadius: 'var(--lufa-token-radius-base)',
          textAlign: 'center',
        }}
      >
        <Spinner size="large" mode="A" />
        <p style={{ marginTop: 'var(--lufa-token-spacing-base)', color: 'var(--lufa-token-color-text-tertiary)' }}>
          Loading content...
        </p>
      </div>

      <button
        style={{
          padding: 'var(--lufa-token-spacing-md) var(--lufa-token-spacing-lg)',
          backgroundColor: 'var(--lufa-token-color-interactive-default)',
          color: 'var(--lufa-token-color-text-inverse)',
          border: 'var(--lufa-token-border-style-none)',
          borderRadius: 'var(--lufa-token-radius-md)',
          cursor: 'not-allowed',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--lufa-token-spacing-sm)',
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
          gap: 'var(--lufa-token-spacing-sm)',
          padding: 'var(--lufa-token-spacing-sm) var(--lufa-token-spacing-base)',
          backgroundColor: 'var(--lufa-token-color-info-light)',
          borderRadius: 'var(--lufa-token-radius-md)',
          color: 'var(--lufa-token-color-interactive-default)',
        }}
      >
        <Spinner size="small" mode="A" />
        <span>Loading data</span>
      </div>
    </div>
  ),
};
