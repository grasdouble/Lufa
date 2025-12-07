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
    tags: ['autodocs'],
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <div style={{ textAlign: 'center' }}>
                <Avatar src={sampleImage} variant="circle" size="lg" />
                <p style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>Circle</p>
            </div>
            <div style={{ textAlign: 'center' }}>
                <Avatar src={sampleImage} variant="square" size="lg" />
                <p style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>Square</p>
            </div>
        </div>
    ),
};

export const StatusIndicators: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
                <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: '600' }}>Status Types</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Avatar src={sampleImage} size="lg" status="online" />
                        <p style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>Online</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Avatar src={sampleImage} size="lg" status="away" />
                        <p style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>Away</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Avatar src={sampleImage} size="lg" status="busy" />
                        <p style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>Busy</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Avatar src={sampleImage} size="lg" status="offline" />
                        <p style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>Offline</p>
                    </div>
                </div>
            </div>
            <div>
                <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: '600' }}>Status Positions</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Avatar src={sampleImage} size="lg" status="online" statusPosition="top" variant="circle" />
                        <p style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>Top (Circle)</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Avatar src={sampleImage} size="lg" status="online" statusPosition="bottom" variant="circle" />
                        <p style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>Bottom (Circle)</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Avatar src={sampleImage} size="lg" status="online" statusPosition="top" variant="square" />
                        <p style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>Top (Square)</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Avatar src={sampleImage} size="lg" status="online" statusPosition="bottom" variant="square" />
                        <p style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>Bottom (Square)</p>
                    </div>
                </div>
            </div>
        </div>
    ),
};

export const CountVariant: Story = {
    render: () => (
        <div>
            <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600 }}>Count Variant</h3>
            <p style={{ marginBottom: '16px', fontSize: '13px', color: '#737373' }}>Display numeric counts instead of images</p>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
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
            <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600 }}>Basic Avatar Group</h3>
            <p style={{ marginBottom: '16px', fontSize: '13px', color: '#737373' }}>Avatars automatically overlap without manual styling</p>
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
            <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600 }}>Avatar Group with Count</h3>
            <p style={{ marginBottom: '16px', fontSize: '13px', color: '#737373' }}>
                Display remaining avatars count automatically using the max prop
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                    <p style={{ marginBottom: '8px', fontSize: '12px', color: '#737373' }}>max=3 (shows +6 more)</p>
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
                    <p style={{ marginBottom: '8px', fontSize: '12px', color: '#737373' }}>max=5 (shows +4 more)</p>
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
            <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600 }}>Avatar Group Sizes</h3>
            <p style={{ marginBottom: '16px', fontSize: '13px', color: '#737373' }}>Control size for all avatars in the group</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                    <p style={{ marginBottom: '8px', fontSize: '12px', color: '#737373' }}>Extra Small (xs)</p>
                    <AvatarGroup size="xs" max={3}>
                        <Avatar src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc" />
                        <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e" />
                        <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb" />
                        <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" />
                        <Avatar src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80" />
                    </AvatarGroup>
                </div>
                <div>
                    <p style={{ marginBottom: '8px', fontSize: '12px', color: '#737373' }}>Small (sm)</p>
                    <AvatarGroup size="sm" max={3}>
                        <Avatar src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc" />
                        <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e" />
                        <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb" />
                        <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" />
                        <Avatar src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80" />
                    </AvatarGroup>
                </div>
                <div>
                    <p style={{ marginBottom: '8px', fontSize: '12px', color: '#737373' }}>Medium (md)</p>
                    <AvatarGroup size="md" max={3}>
                        <Avatar src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc" />
                        <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e" />
                        <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb" />
                        <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" />
                        <Avatar src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80" />
                    </AvatarGroup>
                </div>
                <div>
                    <p style={{ marginBottom: '8px', fontSize: '12px', color: '#737373' }}>Large (lg)</p>
                    <AvatarGroup size="lg" max={3}>
                        <Avatar src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc" />
                        <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e" />
                        <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb" />
                        <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" />
                        <Avatar src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80" />
                    </AvatarGroup>
                </div>
                <div>
                    <p style={{ marginBottom: '8px', fontSize: '12px', color: '#737373' }}>Extra Large (xl)</p>
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
