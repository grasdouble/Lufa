import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, Button } from '@grasdouble/lufa_design-system';

const meta = {
    title: '4. Display/Card',
    component: Card,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'A versatile card component for displaying content in a container with optional header, footer, and various visual styles.',
            },
        },
    },
    tags: [],
    argTypes: {
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
        hoverable: {
            control: 'boolean',
            description: 'Adds hover effect',
        },
        title: {
            control: 'text',
            description: 'Card title',
        },
        subtitle: {
            control: 'text',
            description: 'Card subtitle',
        },
        children: {
            control: 'text',
            description: 'Card content',
        },
    },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        title: 'Card Title',
        children: 'This is a basic card with default styling.',
    },
};

export const WithTitle: Story = {
    args: {
        title: 'Card Title',
        subtitle: 'Optional subtitle or description',
        children: 'Card content goes here. Any React elements can be added as children.',
    },
};

export const Variants: Story = {
    render: () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <Card variant="default" title="Default">
                Standard card with border
            </Card>
            <Card variant="elevated" title="Elevated">
                Card with shadow elevation
            </Card>
            <Card variant="outlined" title="Outlined">
                Card with thicker border
            </Card>
            <Card variant="filled" title="Filled">
                Card with background fill
            </Card>
        </div>
    ),
};

export const PaddingSizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Card padding="none" title="No Padding">
                Content with no padding
            </Card>
            <Card padding="small" title="Small Padding">
                Content with small padding
            </Card>
            <Card padding="medium" title="Medium Padding">
                Content with medium padding (default)
            </Card>
            <Card padding="large" title="Large Padding">
                Content with large padding
            </Card>
        </div>
    ),
};

export const WithFooter: Story = {
    args: {
        title: 'Card with Actions',
        subtitle: 'This card has footer actions',
        children: 'Card content that describes something interesting.',
        footer: (
            <div style={{ display: 'flex', gap: '8px' }}>
                <Button variant="solid" label="Primary" />
                <Button variant="text" label="Cancel" />
            </div>
        ),
    },
};

export const Hoverable: Story = {
    render: () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <Card variant="elevated" hoverable title="Hover Me">
                This card has hover effects
            </Card>
            <Card variant="elevated" hoverable title="Interactive">
                Hover to see elevation increase
            </Card>
            <Card variant="elevated" hoverable title="Click Ready">
                Can be combined with onClick
            </Card>
        </div>
    ),
};

export const Clickable: Story = {
    render: () => (
        <Card
            variant="elevated"
            hoverable
            onClick={() => alert('Card clicked!')}
            title="Clickable Card"
            subtitle="Click anywhere on this card"
        >
            This card has an onClick handler. Notice the cursor changes to pointer when you hover.
        </Card>
    ),
};

export const ProductCards: Story = {
    render: () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <Card
                variant="elevated"
                hoverable
                padding="none"
                footer={
                    <div style={{ padding: '16px' }}>
                        <Button variant="solid" style={{ width: '100%' }}>
                            Add to Cart
                        </Button>
                    </div>
                }
            >
                <img
                    src="https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=Product+1"
                    alt="Product"
                    style={{ width: '100%', display: 'block' }}
                />
                <div style={{ padding: '16px' }}>
                    <h3 style={{ margin: '0 0 8px 0' }}>Product Name</h3>
                    <p style={{ margin: 0, color: '#666' }}>$99.99</p>
                </div>
            </Card>
            <Card
                variant="elevated"
                hoverable
                padding="none"
                footer={
                    <div style={{ padding: '16px' }}>
                        <Button variant="solid" label="Add to Cart" />
                    </div>
                }
            >
                <img
                    src="https://via.placeholder.com/300x200/10B981/FFFFFF?text=Product+2"
                    alt="Product"
                    style={{ width: '100%', display: 'block' }}
                />
                <div style={{ padding: '16px' }}>
                    <h3 style={{ margin: '0 0 8px 0' }}>Another Product</h3>
                    <p style={{ margin: 0, color: '#666' }}>$149.99</p>
                </div>
            </Card>
            <Card
                variant="elevated"
                hoverable
                padding="none"
                footer={
                    <div style={{ padding: '16px' }}>
                        <Button variant="solid" label="Add to Cart" />
                    </div>
                }
            >
                <img
                    src="https://via.placeholder.com/300x200/EF4444/FFFFFF?text=Product+3"
                    alt="Product"
                    style={{ width: '100%', display: 'block' }}
                />
                <div style={{ padding: '16px' }}>
                    <h3 style={{ margin: '0 0 8px 0' }}>Premium Item</h3>
                    <p style={{ margin: 0, color: '#666' }}>$249.99</p>
                </div>
            </Card>
        </div>
    ),
};
