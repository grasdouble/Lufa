import type { Meta, StoryObj } from '@storybook/react-vite';
import { Placeholder } from '@grasdouble/lufa_design-system';

const meta = {
    title: '1. Components/Layout/Placeholder',
    component: Placeholder,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'A placeholder component used for layout spacing and visual structure. Useful during development and prototyping.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Placeholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <Placeholder />,
};

export const WithCustomContent: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Placeholder>Content 1</Placeholder>
            <Placeholder>Content 2</Placeholder>
            <Placeholder>Content 3</Placeholder>
        </div>
    ),
};

export const InGrid: Story = {
    render: () => (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                width: '600px',
            }}
        >
            <Placeholder>1</Placeholder>
            <Placeholder>2</Placeholder>
            <Placeholder>3</Placeholder>
            <Placeholder>4</Placeholder>
            <Placeholder>5</Placeholder>
            <Placeholder>6</Placeholder>
        </div>
    ),
};

export const UsageExample: Story = {
    render: () => (
        <div
            style={{
                maxWidth: '800px',
                padding: '20px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
            }}
        >
            <h2 style={{ marginBottom: '16px' }}>Page Layout Example</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Placeholder>Header Section</Placeholder>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                    <Placeholder>Main Content</Placeholder>
                    <Placeholder>Sidebar</Placeholder>
                </div>
                <Placeholder>Footer Section</Placeholder>
            </div>
        </div>
    ),
};
