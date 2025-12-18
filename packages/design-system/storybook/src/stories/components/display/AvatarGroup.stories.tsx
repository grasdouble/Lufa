import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarGroup } from '@grasdouble/lufa_design-system';

const meta = {
  title: '4. Display/AvatarGroup',
  component: AvatarGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Container component for displaying multiple avatars with automatic overlap. Optionally shows remaining count when max limit is reached.',
      },
    },
  },
  tags: [],
  argTypes: {
    max: {
      control: 'number',
      description: 'Maximum number of avatars to display before showing count',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Avatar size (applies to all avatars)',
    },
  },
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleAvatars = [
  'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
  'https://images.unsplash.com/photo-1554151228-14d9def656e4',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9',
];

export const Playground: Story = {
  args: {
    max: 4,
    size: 'md',
    children: (
      <>
        {sampleAvatars.map((src, index) => (
          <Avatar key={index} src={src} />
        ))}
      </>
    ),
  },
};

export const BasicGroup: Story = {
  render: () => (
    <div>
      <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600 }}>Basic Usage</h3>
      <p style={{ marginBottom: '16px', fontSize: '13px', color: '#737373' }}>
        Avatars automatically overlap without manual styling
      </p>
      <AvatarGroup size="md">
        <Avatar src={sampleAvatars[0]} status="online" />
        <Avatar src={sampleAvatars[1]} status="away" />
        <Avatar src={sampleAvatars[2]} status="busy" />
        <Avatar src={sampleAvatars[3]} />
      </AvatarGroup>
    </div>
  ),
};

export const WithMaxLimit: Story = {
  render: () => (
    <div>
      <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600 }}>Max Limit with Count</h3>
      <p style={{ marginBottom: '16px', fontSize: '13px', color: '#737373' }}>
        Use max prop to limit displayed avatars and show remaining count
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <p style={{ marginBottom: '8px', fontSize: '12px', color: '#737373' }}>max=2 of 8 avatars</p>
          <AvatarGroup size="md" max={2}>
            {sampleAvatars.map((src, index) => (
              <Avatar key={index} src={src} />
            ))}
          </AvatarGroup>
        </div>
        <div>
          <p style={{ marginBottom: '8px', fontSize: '12px', color: '#737373' }}>max=4 of 8 avatars</p>
          <AvatarGroup size="md" max={4}>
            {sampleAvatars.map((src, index) => (
              <Avatar key={index} src={src} />
            ))}
          </AvatarGroup>
        </div>
        <div>
          <p style={{ marginBottom: '8px', fontSize: '12px', color: '#737373' }}>max=6 of 8 avatars</p>
          <AvatarGroup size="md" max={6}>
            {sampleAvatars.map((src, index) => (
              <Avatar key={index} src={src} />
            ))}
          </AvatarGroup>
        </div>
      </div>
    </div>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div>
      <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600 }}>Size Variants</h3>
      <p style={{ marginBottom: '16px', fontSize: '13px', color: '#737373' }}>
        Control size for all avatars in the group
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <p style={{ marginBottom: '8px', fontSize: '12px', color: '#737373' }}>Extra Small (xs)</p>
          <AvatarGroup size="xs" max={3}>
            {sampleAvatars.slice(0, 5).map((src, index) => (
              <Avatar key={index} src={src} />
            ))}
          </AvatarGroup>
        </div>
        <div>
          <p style={{ marginBottom: '8px', fontSize: '12px', color: '#737373' }}>Small (sm)</p>
          <AvatarGroup size="sm" max={3}>
            {sampleAvatars.slice(0, 5).map((src, index) => (
              <Avatar key={index} src={src} />
            ))}
          </AvatarGroup>
        </div>
        <div>
          <p style={{ marginBottom: '8px', fontSize: '12px', color: '#737373' }}>Medium (md)</p>
          <AvatarGroup size="md" max={3}>
            {sampleAvatars.slice(0, 5).map((src, index) => (
              <Avatar key={index} src={src} />
            ))}
          </AvatarGroup>
        </div>
        <div>
          <p style={{ marginBottom: '8px', fontSize: '12px', color: '#737373' }}>Large (lg)</p>
          <AvatarGroup size="lg" max={3}>
            {sampleAvatars.slice(0, 5).map((src, index) => (
              <Avatar key={index} src={src} />
            ))}
          </AvatarGroup>
        </div>
        <div>
          <p style={{ marginBottom: '8px', fontSize: '12px', color: '#737373' }}>Extra Large (xl)</p>
          <AvatarGroup size="xl" max={3}>
            {sampleAvatars.slice(0, 5).map((src, index) => (
              <Avatar key={index} src={src} />
            ))}
          </AvatarGroup>
        </div>
      </div>
    </div>
  ),
};

export const WithStatuses: Story = {
  render: () => (
    <div>
      <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600 }}>With Status Indicators</h3>
      <p style={{ marginBottom: '16px', fontSize: '13px', color: '#737373' }}>
        Combine group functionality with status indicators
      </p>
      <AvatarGroup size="md" max={4}>
        <Avatar src={sampleAvatars[0]} status="online" />
        <Avatar src={sampleAvatars[1]} status="away" />
        <Avatar src={sampleAvatars[2]} status="busy" />
        <Avatar src={sampleAvatars[3]} status="offline" />
        <Avatar src={sampleAvatars[4]} status="online" />
        <Avatar src={sampleAvatars[5]} status="away" />
      </AvatarGroup>
    </div>
  ),
};

export const RealWorldExample: Story = {
  render: () => (
    <div>
      <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600 }}>Real-world Example</h3>
      <p style={{ marginBottom: '16px', fontSize: '13px', color: '#737373' }}>Team members on a project</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div
          style={{
            padding: '16px',
            border: '1px solid #e5e5e5',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>Design System Project</h4>
            <p style={{ fontSize: '13px', color: '#737373' }}>12 team members</p>
          </div>
          <AvatarGroup size="sm" max={5}>
            {sampleAvatars.map((src, index) => (
              <Avatar key={index} src={src} />
            ))}
          </AvatarGroup>
        </div>
        <div
          style={{
            padding: '16px',
            border: '1px solid #e5e5e5',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>Mobile App Development</h4>
            <p style={{ fontSize: '13px', color: '#737373' }}>8 team members</p>
          </div>
          <AvatarGroup size="sm" max={5}>
            {sampleAvatars.map((src, index) => (
              <Avatar key={index} src={src} status={index === 0 ? 'online' : index === 1 ? 'away' : 'none'} />
            ))}
          </AvatarGroup>
        </div>
      </div>
    </div>
  ),
};
