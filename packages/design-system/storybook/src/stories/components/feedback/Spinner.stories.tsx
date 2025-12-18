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
    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="small" mode="A" />
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>Small</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="medium" mode="A" />
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>Medium</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="large" mode="A" />
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>Large</p>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ marginBottom: '16px' }}>Mode A</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Spinner size="small" mode="A" />
          <Spinner size="medium" mode="A" />
          <Spinner size="large" mode="A" />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '16px' }}>Mode B</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
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
        gap: '24px',
        padding: '20px',
      }}
    >
      <div
        style={{
          padding: '40px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        <Spinner size="large" mode="A" />
        <p style={{ marginTop: '16px', color: '#737373' }}>Loading content...</p>
      </div>

      <button
        style={{
          padding: '12px 24px',
          backgroundColor: '#2563EB',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'not-allowed',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
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
          gap: '8px',
          padding: '8px 16px',
          backgroundColor: '#EFF6FF',
          borderRadius: '6px',
          color: '#2563EB',
        }}
      >
        <Spinner size="small" mode="A" />
        <span>Loading data</span>
      </div>
    </div>
  ),
};
