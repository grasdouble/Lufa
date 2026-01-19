import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar, AvatarGroup } from '@grasdouble/lufa_design-system';

const meta = {
  title: '4. Display/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Display user profile images with optional status indicators. Supports multiple sizes, shapes (circle/square), and status colors.',
      },
    },
  },
  tags: [],
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alternative text',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Avatar size',
    },
    variant: {
      control: 'radio',
      options: ['circle', 'square'],
      description: 'Shape variant',
    },
    status: {
      control: 'select',
      options: ['none', 'online', 'offline', 'away', 'busy'],
      description: 'Status indicator',
    },
    statusPosition: {
      control: 'radio',
      options: ['top', 'bottom'],
      description: 'Status position',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleImage =
  'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

export const Playground: Story = {
  args: {
    src: sampleImage,
    alt: 'User avatar',
    size: 'lg',
    variant: 'circle',
    status: 'online',
    statusPosition: 'bottom',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--lufa-token-spacing-base)' }}>
      <Avatar src={sampleImage} size="xs" alt="Extra small" />
      <Avatar src={sampleImage} size="sm" alt="Small" />
      <Avatar src={sampleImage} size="md" alt="Medium" />
      <Avatar src={sampleImage} size="lg" alt="Large" />
      <Avatar src={sampleImage} size="xl" alt="Extra large" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--lufa-token-spacing-xl)' }}>
      <div style={{ textAlign: 'center' }}>
        <Avatar src={sampleImage} variant="circle" size="lg" />
        <p
          style={{
            marginTop: 'var(--lufa-token-spacing-sm)',
            fontSize: 'var(--lufa-token-font-size-xs)',
            color: 'var(--lufa-token-color-text-tertiary)',
          }}
        >
          Circle
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar src={sampleImage} variant="square" size="lg" />
        <p
          style={{
            marginTop: 'var(--lufa-token-spacing-sm)',
            fontSize: 'var(--lufa-token-font-size-xs)',
            color: 'var(--lufa-token-color-text-tertiary)',
          }}
        >
          Square
        </p>
      </div>
    </div>
  ),
};

export const StatusIndicators: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--lufa-token-spacing-lg)' }}>
      <div>
        <h3
          style={{
            marginBottom: 'var(--lufa-token-spacing-base)',
            fontSize: 'var(--lufa-token-font-size-sm)',
            fontWeight: 'var(--lufa-token-font-weight-semibold)',
          }}
        >
          Status Types
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--lufa-token-spacing-base)' }}>
          <div style={{ textAlign: 'center' }}>
            <Avatar src={sampleImage} size="lg" status="online" />
            <p
              style={{
                marginTop: 'var(--lufa-token-spacing-sm)',
                fontSize: 'var(--lufa-token-font-size-xs)',
                color: 'var(--lufa-token-color-text-tertiary)',
              }}
            >
              Online
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar src={sampleImage} size="lg" status="away" />
            <p
              style={{
                marginTop: 'var(--lufa-token-spacing-sm)',
                fontSize: 'var(--lufa-token-font-size-xs)',
                color: 'var(--lufa-token-color-text-tertiary)',
              }}
            >
              Away
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar src={sampleImage} size="lg" status="busy" />
            <p
              style={{
                marginTop: 'var(--lufa-token-spacing-sm)',
                fontSize: 'var(--lufa-token-font-size-xs)',
                color: 'var(--lufa-token-color-text-tertiary)',
              }}
            >
              Busy
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar src={sampleImage} size="lg" status="offline" />
            <p
              style={{
                marginTop: 'var(--lufa-token-spacing-sm)',
                fontSize: 'var(--lufa-token-font-size-xs)',
                color: 'var(--lufa-token-color-text-tertiary)',
              }}
            >
              Offline
            </p>
          </div>
        </div>
      </div>
      <div>
        <h3
          style={{
            marginBottom: 'var(--lufa-token-spacing-base)',
            fontSize: 'var(--lufa-token-font-size-sm)',
            fontWeight: 'var(--lufa-token-font-weight-semibold)',
          }}
        >
          Status Positions
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--lufa-token-spacing-base)' }}>
          <div style={{ textAlign: 'center' }}>
            <Avatar src={sampleImage} size="lg" status="online" statusPosition="top" variant="circle" />
            <p
              style={{
                marginTop: 'var(--lufa-token-spacing-sm)',
                fontSize: 'var(--lufa-token-font-size-xs)',
                color: 'var(--lufa-token-color-text-tertiary)',
              }}
            >
              Top (Circle)
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar src={sampleImage} size="lg" status="online" statusPosition="bottom" variant="circle" />
            <p
              style={{
                marginTop: 'var(--lufa-token-spacing-sm)',
                fontSize: 'var(--lufa-token-font-size-xs)',
                color: 'var(--lufa-token-color-text-tertiary)',
              }}
            >
              Bottom (Circle)
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar src={sampleImage} size="lg" status="online" statusPosition="top" variant="square" />
            <p
              style={{
                marginTop: 'var(--lufa-token-spacing-sm)',
                fontSize: 'var(--lufa-token-font-size-xs)',
                color: 'var(--lufa-token-color-text-tertiary)',
              }}
            >
              Top (Square)
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar src={sampleImage} size="lg" status="online" statusPosition="bottom" variant="square" />
            <p
              style={{
                marginTop: 'var(--lufa-token-spacing-sm)',
                fontSize: 'var(--lufa-token-font-size-xs)',
                color: 'var(--lufa-token-color-text-tertiary)',
              }}
            >
              Bottom (Square)
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const CountVariant: Story = {
  render: () => (
    <div>
      <h3
        style={{
          marginBottom: 'var(--lufa-token-spacing-base)',
          fontSize: 'var(--lufa-token-font-size-sm)',
          fontWeight: 'var(--lufa-token-font-weight-semibold)',
        }}
      >
        Count Variant
      </h3>
      <p
        style={{
          marginBottom: 'var(--lufa-token-spacing-base)',
          fontSize: 'var(--lufa-token-font-size-sm)',
          color: 'var(--lufa-token-color-text-tertiary)',
        }}
      >
        Display numeric counts instead of images
      </p>
      <div style={{ display: 'flex', gap: 'var(--lufa-token-spacing-base)', alignItems: 'center' }}>
        <Avatar variant="count" count="+5" size="xs" />
        <Avatar variant="count" count="+10" size="sm" />
        <Avatar variant="count" count="+25" size="md" />
        <Avatar variant="count" count="+99" size="lg" />
        <Avatar variant="count" count="5K" size="xl" />
      </div>
    </div>
  ),
};

export const GroupBasic: Story = {
  render: () => (
    <div>
      <h3
        style={{
          marginBottom: 'var(--lufa-token-spacing-base)',
          fontSize: 'var(--lufa-token-font-size-sm)',
          fontWeight: 'var(--lufa-token-font-weight-semibold)',
        }}
      >
        Basic Avatar Group
      </h3>
      <p
        style={{
          marginBottom: 'var(--lufa-token-spacing-base)',
          fontSize: 'var(--lufa-token-font-size-sm)',
          color: 'var(--lufa-token-color-text-tertiary)',
        }}
      >
        Avatars automatically overlap without manual styling
      </p>
      <AvatarGroup size="md">
        <Avatar src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc" status="online" />
        <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e" status="away" />
        <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb" status="busy" />
        <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" />
      </AvatarGroup>
    </div>
  ),
};

export const GroupWithCount: Story = {
  render: () => (
    <div>
      <h3
        style={{
          marginBottom: 'var(--lufa-token-spacing-base)',
          fontSize: 'var(--lufa-token-font-size-sm)',
          fontWeight: 'var(--lufa-token-font-weight-semibold)',
        }}
      >
        Avatar Group with Count
      </h3>
      <p
        style={{
          marginBottom: 'var(--lufa-token-spacing-base)',
          fontSize: 'var(--lufa-token-font-size-sm)',
          color: 'var(--lufa-token-color-text-tertiary)',
        }}
      >
        Display remaining avatars count automatically using the max prop
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--lufa-token-spacing-lg)' }}>
        <div>
          <p
            style={{
              marginBottom: 'var(--lufa-token-spacing-sm)',
              fontSize: 'var(--lufa-token-font-size-xs)',
              color: 'var(--lufa-token-color-text-tertiary)',
            }}
          >
            max=3 (shows +6 more)
          </p>
          <AvatarGroup size="md" max={3}>
            <Avatar src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc" status="online" />
            <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e" status="away" />
            <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb" status="busy" />
            <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" />
            <Avatar src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80" />
            <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" />
            <Avatar src="https://images.unsplash.com/photo-1554151228-14d9def656e4" />
            <Avatar src="https://images.unsplash.com/photo-1517841905240-472988babdf9" />
            <Avatar src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6" />
          </AvatarGroup>
        </div>
        <div>
          <p
            style={{
              marginBottom: 'var(--lufa-token-spacing-sm)',
              fontSize: 'var(--lufa-token-font-size-xs)',
              color: 'var(--lufa-token-color-text-tertiary)',
            }}
          >
            max=5 (shows +4 more)
          </p>
          <AvatarGroup size="md" max={5}>
            <Avatar src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc" status="online" />
            <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e" status="away" />
            <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb" status="busy" />
            <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" />
            <Avatar src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80" />
            <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" />
            <Avatar src="https://images.unsplash.com/photo-1554151228-14d9def656e4" />
            <Avatar src="https://images.unsplash.com/photo-1517841905240-472988babdf9" />
            <Avatar src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6" />
          </AvatarGroup>
        </div>
      </div>
    </div>
  ),
};

export const GroupSizes: Story = {
  render: () => (
    <div>
      <h3
        style={{
          marginBottom: 'var(--lufa-token-spacing-base)',
          fontSize: 'var(--lufa-token-font-size-sm)',
          fontWeight: 'var(--lufa-token-font-weight-semibold)',
        }}
      >
        Avatar Group Sizes
      </h3>
      <p
        style={{
          marginBottom: 'var(--lufa-token-spacing-base)',
          fontSize: 'var(--lufa-token-font-size-sm)',
          color: 'var(--lufa-token-color-text-tertiary)',
        }}
      >
        Control size for all avatars in the group
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--lufa-token-spacing-md-lg)' }}>
        <div>
          <p
            style={{
              marginBottom: 'var(--lufa-token-spacing-sm)',
              fontSize: 'var(--lufa-token-font-size-xs)',
              color: 'var(--lufa-token-color-text-tertiary)',
            }}
          >
            Extra Small (xs)
          </p>
          <AvatarGroup size="xs" max={3}>
            <Avatar src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc" />
            <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e" />
            <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb" />
            <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" />
            <Avatar src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80" />
          </AvatarGroup>
        </div>
        <div>
          <p
            style={{
              marginBottom: 'var(--lufa-token-spacing-sm)',
              fontSize: 'var(--lufa-token-font-size-xs)',
              color: 'var(--lufa-token-color-text-tertiary)',
            }}
          >
            Small (sm)
          </p>
          <AvatarGroup size="sm" max={3}>
            <Avatar src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc" />
            <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e" />
            <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb" />
            <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" />
            <Avatar src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80" />
          </AvatarGroup>
        </div>
        <div>
          <p
            style={{
              marginBottom: 'var(--lufa-token-spacing-sm)',
              fontSize: 'var(--lufa-token-font-size-xs)',
              color: 'var(--lufa-token-color-text-tertiary)',
            }}
          >
            Medium (md)
          </p>
          <AvatarGroup size="md" max={3}>
            <Avatar src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc" />
            <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e" />
            <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb" />
            <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" />
            <Avatar src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80" />
          </AvatarGroup>
        </div>
        <div>
          <p
            style={{
              marginBottom: 'var(--lufa-token-spacing-sm)',
              fontSize: 'var(--lufa-token-font-size-xs)',
              color: 'var(--lufa-token-color-text-tertiary)',
            }}
          >
            Large (lg)
          </p>
          <AvatarGroup size="lg" max={3}>
            <Avatar src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc" />
            <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e" />
            <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb" />
            <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" />
            <Avatar src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80" />
          </AvatarGroup>
        </div>
        <div>
          <p
            style={{
              marginBottom: 'var(--lufa-token-spacing-sm)',
              fontSize: 'var(--lufa-token-font-size-xs)',
              color: 'var(--lufa-token-color-text-tertiary)',
            }}
          >
            Extra Large (xl)
          </p>
          <AvatarGroup size="xl" max={3}>
            <Avatar src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc" />
            <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e" />
            <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb" />
            <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" />
            <Avatar src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80" />
          </AvatarGroup>
        </div>
      </div>
    </div>
  ),
};

/**
 * Comprehensive showcase of all Avatar variants.
 * Perfect for visual regression testing and documentation screenshots.
 * Use the Storybook toolbar to switch between light/dark modes.
 */
export const AllVariants: Story = {
  render: () => <AvatarShowcase />,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
  },
};

/**
 * Helper component that renders all Avatar variants.
 * Deduplicates the rendering logic and uses design tokens for theming.
 */
function AvatarShowcase() {
  return (
    <div
      style={{
        padding: 'var(--lufa-token-spacing-2xl)',
        background: 'var(--lufa-token-color-background-primary)',
        minHeight: '100vh',
        minWidth: '1200px',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 'var(--lufa-token-spacing-xl)' }}>
        <h1
          style={{
            fontSize: 'var(--lufa-token-font-size-2xl)',
            fontWeight: 'var(--lufa-token-font-weight-bold)',
            color: 'var(--lufa-token-color-text-primary)',
            marginBottom: 'var(--lufa-token-spacing-sm)',
          }}
        >
          Avatar Component - All Variants
        </h1>
        <p style={{ fontSize: 'var(--lufa-token-font-size-base)', color: 'var(--lufa-token-color-text-secondary)' }}>
          Comprehensive showcase of all sizes, shapes, status indicators, and group configurations. Use the Storybook
          toolbar to switch between light/dark modes.
        </p>
      </div>

      {/* Sizes Section */}
      <section style={{ marginBottom: 'var(--lufa-token-spacing-2xl)' }}>
        <h2
          style={{
            fontSize: 'var(--lufa-token-font-size-xl)',
            fontWeight: 'var(--lufa-token-font-weight-semibold)',
            color: 'var(--lufa-token-color-text-primary)',
            marginBottom: 'var(--lufa-token-spacing-base)',
            borderBottom: `1px solid ${'var(--lufa-token-color-border-primary)'}`,
            paddingBottom: 'var(--lufa-token-spacing-sm)',
          }}
        >
          1. Sizes (xs, sm, md, lg, xl)
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--lufa-token-spacing-lg)' }}>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <div key={size} style={{ textAlign: 'center' }}>
              <Avatar src={sampleImage} size={size} alt={`${size} avatar`} />
              <p
                style={{
                  marginTop: 'var(--lufa-token-spacing-xs)',
                  fontSize: 'var(--lufa-token-font-size-xs)',
                  color: 'var(--lufa-token-color-text-tertiary)',
                }}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Shape Variants Section */}
      <section style={{ marginBottom: 'var(--lufa-token-spacing-2xl)' }}>
        <h2
          style={{
            fontSize: 'var(--lufa-token-font-size-xl)',
            fontWeight: 'var(--lufa-token-font-weight-semibold)',
            color: 'var(--lufa-token-color-text-primary)',
            marginBottom: 'var(--lufa-token-spacing-base)',
            borderBottom: `1px solid ${'var(--lufa-token-color-border-primary)'}`,
            paddingBottom: 'var(--lufa-token-spacing-sm)',
          }}
        >
          2. Shape Variants (Circle, Square)
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--lufa-token-spacing-xl)' }}>
          {(['circle', 'square'] as const).map((variant) => (
            <div key={variant} style={{ textAlign: 'center' }}>
              <Avatar src={sampleImage} variant={variant} size="lg" />
              <p
                style={{
                  marginTop: 'var(--lufa-token-spacing-sm)',
                  fontSize: 'var(--lufa-token-font-size-sm)',
                  color: 'var(--lufa-token-color-text-tertiary)',
                }}
              >
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Status Indicators Section */}
      <section style={{ marginBottom: 'var(--lufa-token-spacing-2xl)' }}>
        <h2
          style={{
            fontSize: 'var(--lufa-token-font-size-xl)',
            fontWeight: 'var(--lufa-token-font-weight-semibold)',
            color: 'var(--lufa-token-color-text-primary)',
            marginBottom: 'var(--lufa-token-spacing-base)',
            borderBottom: `1px solid ${'var(--lufa-token-color-border-primary)'}`,
            paddingBottom: 'var(--lufa-token-spacing-sm)',
          }}
        >
          3. Status Indicators (Online, Away, Busy, Offline)
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--lufa-token-spacing-lg)' }}>
          {(['online', 'away', 'busy', 'offline'] as const).map((status) => (
            <div key={status} style={{ textAlign: 'center' }}>
              <Avatar src={sampleImage} size="lg" status={status} />
              <p
                style={{
                  marginTop: 'var(--lufa-token-spacing-sm)',
                  fontSize: 'var(--lufa-token-font-size-sm)',
                  color: 'var(--lufa-token-color-text-tertiary)',
                }}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Status Positions Section */}
      <section style={{ marginBottom: 'var(--lufa-token-spacing-2xl)' }}>
        <h2
          style={{
            fontSize: 'var(--lufa-token-font-size-xl)',
            fontWeight: 'var(--lufa-token-font-weight-semibold)',
            color: 'var(--lufa-token-color-text-primary)',
            marginBottom: 'var(--lufa-token-spacing-base)',
            borderBottom: `1px solid ${'var(--lufa-token-color-border-primary)'}`,
            paddingBottom: 'var(--lufa-token-spacing-sm)',
          }}
        >
          4. Status Positions (Top, Bottom × Circle, Square)
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--lufa-token-spacing-lg)' }}>
          {[
            { position: 'top', variant: 'circle', label: 'Top (Circle)' },
            { position: 'bottom', variant: 'circle', label: 'Bottom (Circle)' },
            { position: 'top', variant: 'square', label: 'Top (Square)' },
            { position: 'bottom', variant: 'square', label: 'Bottom (Square)' },
          ].map(({ position, variant, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <Avatar
                src={sampleImage}
                size="lg"
                status="online"
                statusPosition={position as 'top' | 'bottom'}
                variant={variant as 'circle' | 'square'}
              />
              <p
                style={{
                  marginTop: 'var(--lufa-token-spacing-sm)',
                  fontSize: 'var(--lufa-token-font-size-xs)',
                  color: 'var(--lufa-token-color-text-tertiary)',
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Count Variant Section */}
      <section style={{ marginBottom: 'var(--lufa-token-spacing-2xl)' }}>
        <h2
          style={{
            fontSize: 'var(--lufa-token-font-size-xl)',
            fontWeight: 'var(--lufa-token-font-weight-semibold)',
            color: 'var(--lufa-token-color-text-primary)',
            marginBottom: 'var(--lufa-token-spacing-base)',
            borderBottom: `1px solid ${'var(--lufa-token-color-border-primary)'}`,
            paddingBottom: 'var(--lufa-token-spacing-sm)',
          }}
        >
          5. Count Variant (All Sizes)
        </h2>
        <div style={{ display: 'flex', gap: 'var(--lufa-token-spacing-lg)', alignItems: 'center' }}>
          {[
            { size: 'xs', count: '+5' },
            { size: 'sm', count: '+10' },
            { size: 'md', count: '+25' },
            { size: 'lg', count: '+99' },
            { size: 'xl', count: '5K' },
          ].map(({ size, count }) => (
            <div key={size} style={{ textAlign: 'center' }}>
              <Avatar variant="count" count={count} size={size as 'xs' | 'sm' | 'md' | 'lg' | 'xl'} />
              <p
                style={{
                  marginTop: 'var(--lufa-token-spacing-sm)',
                  fontSize: 'var(--lufa-token-font-size-xs)',
                  color: 'var(--lufa-token-color-text-tertiary)',
                }}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Avatar Groups Section */}
      <section style={{ marginBottom: 'var(--lufa-token-spacing-2xl)' }}>
        <h2
          style={{
            fontSize: 'var(--lufa-token-font-size-xl)',
            fontWeight: 'var(--lufa-token-font-weight-semibold)',
            color: 'var(--lufa-token-color-text-primary)',
            marginBottom: 'var(--lufa-token-spacing-base)',
            borderBottom: `1px solid ${'var(--lufa-token-color-border-primary)'}`,
            paddingBottom: 'var(--lufa-token-spacing-sm)',
          }}
        >
          6. Avatar Groups
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--lufa-token-spacing-lg)' }}>
          <div>
            <p
              style={{
                marginBottom: 'var(--lufa-token-spacing-sm)',
                fontSize: 'var(--lufa-token-font-size-sm)',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Basic Group (4 avatars with status):
            </p>
            <AvatarGroup size="md">
              <Avatar src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc" status="online" />
              <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e" status="away" />
              <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb" status="busy" />
              <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" />
            </AvatarGroup>
          </div>
          <div>
            <p
              style={{
                marginBottom: 'var(--lufa-token-spacing-sm)',
                fontSize: 'var(--lufa-token-font-size-sm)',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Group with Count (max=3, shows +6 more):
            </p>
            <AvatarGroup size="md" max={3}>
              <Avatar src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc" status="online" />
              <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e" status="away" />
              <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb" status="busy" />
              <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" />
              <Avatar src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80" />
              <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" />
              <Avatar src="https://images.unsplash.com/photo-1554151228-14d9def656e4" />
              <Avatar src="https://images.unsplash.com/photo-1517841905240-472988babdf9" />
              <Avatar src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6" />
            </AvatarGroup>
          </div>
        </div>
      </section>
    </div>
  );
}
