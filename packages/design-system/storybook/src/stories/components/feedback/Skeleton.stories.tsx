import type { Meta, StoryObj } from '@storybook/react-vite';

import { Skeleton } from '@grasdouble/lufa_design-system';
import tokens from '@grasdouble/lufa_design-system-tokens';

const meta = {
  title: '5. Feedback/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Skeleton component displays a placeholder preview of content before the data loads. It reduces perceived loading time and provides a better user experience.',
      },
    },
  },
  tags: [],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular'],
      description: 'Shape variant of the skeleton',
    },
    width: {
      control: 'text',
      description: 'Width of the skeleton (string or number)',
    },
    height: {
      control: 'text',
      description: 'Height of the skeleton (string or number)',
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', false],
      description: 'Animation type',
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    variant: 'rectangular',
    width: '400px',
    height: '100px',
    animation: 'pulse',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.base }}>
      <div>
        <h3
          style={{
            marginBottom: tokens.spacing.sm,
            fontSize: tokens.fontSize.sm,
          }}
        >
          Text
        </h3>
        <Skeleton variant="text" width="100%" />
      </div>
      <div>
        <h3
          style={{
            marginBottom: tokens.spacing.sm,
            fontSize: tokens.fontSize.sm,
          }}
        >
          Circular
        </h3>
        <Skeleton variant="circular" width={40} height={40} />
      </div>
      <div>
        <h3
          style={{
            marginBottom: tokens.spacing.sm,
            fontSize: tokens.fontSize.sm,
          }}
        >
          Rectangular
        </h3>
        <Skeleton variant="rectangular" width="100%" height={100} />
      </div>
    </div>
  ),
};

export const Animations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.base }}>
      <div>
        <h3
          style={{
            marginBottom: tokens.spacing.sm,
            fontSize: tokens.fontSize.sm,
          }}
        >
          Pulse (Default)
        </h3>
        <Skeleton animation="pulse" width="100%" height={60} />
      </div>
      <div>
        <h3
          style={{
            marginBottom: tokens.spacing.sm,
            fontSize: tokens.fontSize.sm,
          }}
        >
          Wave
        </h3>
        <Skeleton animation="wave" width="100%" height={60} />
      </div>
      <div>
        <h3
          style={{
            marginBottom: tokens.spacing.sm,
            fontSize: tokens.fontSize.sm,
          }}
        >
          No Animation
        </h3>
        <Skeleton animation={false} width="100%" height={60} />
      </div>
    </div>
  ),
};

export const UserProfile: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: tokens.spacing.base, alignItems: 'flex-start', width: '400px' }}>
      <Skeleton variant="circular" width={48} height={48} />
      <div style={{ flex: 1 }}>
        <Skeleton variant="text" width="60%" style={{ marginBottom: tokens.spacing.xs }} />
        <Skeleton variant="text" width="40%" />
      </div>
    </div>
  ),
};

export const ArticleCard: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Skeleton variant="rectangular" width={400} height={200} style={{ marginBottom: tokens.spacing.base }} />
      <Skeleton variant="text" width={320} style={{ marginBottom: tokens.spacing.xs }} />
      <Skeleton variant="text" width={240} style={{ marginBottom: tokens.spacing.xs }} />
      <Skeleton variant="text" width={360} />
    </div>
  ),
};

export const MediaList: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.base, width: '600px' }}>
      {[1, 2, 3].map((item) => (
        <div key={item} style={{ display: 'flex', gap: tokens.spacing.base }}>
          <Skeleton variant="rectangular" width={120} height={80} />
          <div style={{ flex: 1 }}>
            <Skeleton variant="text" width="100%" style={{ marginBottom: tokens.spacing.xs }} />
            <Skeleton variant="text" width="80%" style={{ marginBottom: tokens.spacing.xs }} />
            <Skeleton variant="text" width="40%" />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const CommentThread: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.base, width: '600px' }}>
      {[1, 2, 3].map((item) => (
        <div key={item} style={{ display: 'flex', gap: tokens.spacing.base }}>
          <Skeleton variant="circular" width={40} height={40} />
          <div style={{ flex: 1 }}>
            <Skeleton variant="text" width="30%" style={{ marginBottom: tokens.spacing.xs }} />
            <Skeleton variant="text" width="100%" style={{ marginBottom: tokens.spacing.xs }} />
            <Skeleton variant="text" width="90%" />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const ProductGrid: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: tokens.spacing.base,
        width: '800px',
      }}
    >
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item}>
          <Skeleton variant="rectangular" width="100%" height={200} style={{ marginBottom: tokens.spacing.sm }} />
          <Skeleton variant="text" width="80%" style={{ marginBottom: tokens.spacing.xs }} />
          <Skeleton variant="text" width="50%" />
        </div>
      ))}
    </div>
  ),
};

export const DashboardWidget: Story = {
  render: () => (
    <div
      style={{
        border: `1px solid ${tokens.color.border.light}`,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.base,
        width: '300px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: tokens.spacing.base,
        }}
      >
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="circular" width={24} height={24} />
      </div>
      <Skeleton
        variant="text"
        width="60%"
        style={{ marginBottom: tokens.spacing.xs, fontSize: tokens.fontSize['2xl'] }}
      />
      <Skeleton variant="text" width="30%" />
      <div style={{ marginTop: tokens.spacing.base }}>
        <Skeleton variant="rectangular" width="100%" height={120} />
      </div>
    </div>
  ),
};

export const FormFields: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.base, width: '400px' }}>
      <div>
        <Skeleton variant="text" width="30%" style={{ marginBottom: tokens.spacing.xs }} />
        <Skeleton variant="rectangular" width="100%" height={40} />
      </div>
      <div>
        <Skeleton variant="text" width="40%" style={{ marginBottom: tokens.spacing.xs }} />
        <Skeleton variant="rectangular" width="100%" height={40} />
      </div>
      <div>
        <Skeleton variant="text" width="35%" style={{ marginBottom: tokens.spacing.xs }} />
        <Skeleton variant="rectangular" width="100%" height={100} />
      </div>
      <div style={{ display: 'flex', gap: tokens.spacing.sm, justifyContent: 'flex-end' }}>
        <Skeleton variant="rectangular" width={80} height={36} />
        <Skeleton variant="rectangular" width={80} height={36} />
      </div>
    </div>
  ),
};

export const TableRows: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.sm }}>
      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr 100px 80px',
            gap: tokens.spacing.base,
            alignItems: 'center',
            padding: tokens.spacing.sm,
            border: `1px solid ${tokens.color.border.light}`,
            borderRadius: tokens.radius.sm,
          }}
        >
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="rectangular" width={60} height={24} />
        </div>
      ))}
    </div>
  ),
};
