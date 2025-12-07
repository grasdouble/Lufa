import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '@grasdouble/lufa_design-system';

const meta = {
    title: '4. Display/Badge',
    component: Badge,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'Modern badge component for labels, tags, and status indicators. Features multiple variants, sizes, and optional dot indicators.',
            },
        },
    },
    tags: [],
    argTypes: {
        children: {
            control: 'text',
            description: 'Badge content',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Badge size',
        },
        variant: {
            control: 'select',
            options: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
            description: 'Color variant',
        },
        dot: {
            control: 'boolean',
            description: 'Shows dot indicator',
        },
        rounded: {
            control: 'boolean',
            description: 'Makes badge fully rounded (pill shape)',
        },
    },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        children: 'Badge',
        size: 'md',
        variant: 'primary',
    },
};

export const Variants: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
        </div>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Badge size="sm" variant="primary">
                Small
            </Badge>
            <Badge size="md" variant="primary">
                Medium
            </Badge>
            <Badge size="lg" variant="primary">
                Large
            </Badge>
        </div>
    ),
};

export const WithDot: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Badge variant="default" dot>
                Default
            </Badge>
            <Badge variant="primary" dot>
                Primary
            </Badge>
            <Badge variant="success" dot>
                Success
            </Badge>
            <Badge variant="warning" dot>
                Warning
            </Badge>
            <Badge variant="danger" dot>
                Danger
            </Badge>
            <Badge variant="info" dot>
                Info
            </Badge>
        </div>
    ),
};

export const Rounded: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Badge variant="default" rounded>
                Default
            </Badge>
            <Badge variant="primary" rounded>
                Primary
            </Badge>
            <Badge variant="success" rounded>
                Success
            </Badge>
            <Badge variant="warning" rounded>
                Warning
            </Badge>
            <Badge variant="danger" rounded>
                Danger
            </Badge>
            <Badge variant="info" rounded>
                Info
            </Badge>
        </div>
    ),
};

export const UseCases: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
            <div>
                <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Status Indicators</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <Badge variant="success" dot rounded>
                        Active
                    </Badge>
                    <Badge variant="warning" dot rounded>
                        Pending
                    </Badge>
                    <Badge variant="danger" dot rounded>
                        Error
                    </Badge>
                    <Badge variant="default" dot rounded>
                        Inactive
                    </Badge>
                </div>
            </div>
            <div>
                <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Tags</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <Badge variant="primary">React</Badge>
                    <Badge variant="info">TypeScript</Badge>
                    <Badge variant="success">Vite</Badge>
                    <Badge variant="default">Tailwind</Badge>
                </div>
            </div>
            <div>
                <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Counts</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px' }}>Messages</span>
                    <Badge variant="danger" rounded size="sm">
                        99+
                    </Badge>
                    <span style={{ fontSize: '14px', marginLeft: '16px' }}>Notifications</span>
                    <Badge variant="primary" rounded size="sm">
                        5
                    </Badge>
                </div>
            </div>
        </div>
    ),
};
