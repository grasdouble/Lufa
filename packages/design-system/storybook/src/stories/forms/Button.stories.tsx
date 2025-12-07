import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@grasdouble/lufa_design-system';

const meta = {
    title: '3. Forms/Button',
    component: Button,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'A versatile button component with multiple variants, colors, and sizes. Supports loading states, icons, and full-width layouts.',
            },
        },
    },
    tags: [],
    argTypes: {
        children: {
            control: 'text',
            description: 'Button content',
        },
        variant: {
            control: 'select',
            options: ['solid', 'outlined', 'text', 'ghost', 'link'],
            description: 'Visual style variant',
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'warning', 'danger'],
            description: 'Color scheme',
        },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
            description: 'Button size',
        },
        fullWidth: {
            control: 'boolean',
            description: 'Full width button',
        },
        loading: {
            control: 'boolean',
            description: 'Loading state',
        },
        disabled: {
            control: 'boolean',
            description: 'Disabled state',
        },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        children: 'Button',
        variant: 'solid',
        color: 'primary',
        size: 'medium',
    },
};

// Variants
export const Solid: Story = {
    args: {
        children: 'Solid Button',
        variant: 'solid',
        color: 'primary',
    },
};

export const Outlined: Story = {
    args: {
        children: 'Outlined Button',
        variant: 'outlined',
        color: 'primary',
    },
};

export const Text: Story = {
    args: {
        children: 'Text Button',
        variant: 'text',
        color: 'primary',
    },
};

export const Ghost: Story = {
    args: {
        children: 'Ghost Button',
        variant: 'ghost',
        color: 'primary',
    },
};

export const Link: Story = {
    args: {
        children: 'Link Button',
        variant: 'link',
        color: 'primary',
    },
};

// Colors - Solid
export const ColorsSolid: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="solid" color="primary">
                Primary
            </Button>
            <Button variant="solid" color="secondary">
                Secondary
            </Button>
            <Button variant="solid" color="success">
                Success
            </Button>
            <Button variant="solid" color="warning">
                Warning
            </Button>
            <Button variant="solid" color="danger">
                Danger
            </Button>
        </div>
    ),
};

// Colors - Outlined
export const ColorsOutlined: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="outlined" color="primary">
                Primary
            </Button>
            <Button variant="outlined" color="secondary">
                Secondary
            </Button>
            <Button variant="outlined" color="success">
                Success
            </Button>
            <Button variant="outlined" color="warning">
                Warning
            </Button>
            <Button variant="outlined" color="danger">
                Danger
            </Button>
        </div>
    ),
};

// Colors - Text
export const ColorsText: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="text" color="primary">
                Primary
            </Button>
            <Button variant="text" color="secondary">
                Secondary
            </Button>
            <Button variant="text" color="success">
                Success
            </Button>
            <Button variant="text" color="warning">
                Warning
            </Button>
            <Button variant="text" color="danger">
                Danger
            </Button>
        </div>
    ),
};

// Colors - Ghost
export const ColorsGhost: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="ghost" color="primary">
                Primary
            </Button>
            <Button variant="ghost" color="secondary">
                Secondary
            </Button>
            <Button variant="ghost" color="success">
                Success
            </Button>
            <Button variant="ghost" color="warning">
                Warning
            </Button>
            <Button variant="ghost" color="danger">
                Danger
            </Button>
        </div>
    ),
};

// Colors - Link
export const ColorsLink: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="link" color="primary">
                Primary
            </Button>
            <Button variant="link" color="secondary">
                Secondary
            </Button>
            <Button variant="link" color="success">
                Success
            </Button>
            <Button variant="link" color="warning">
                Warning
            </Button>
            <Button variant="link" color="danger">
                Danger
            </Button>
        </div>
    ),
};

// Sizes
export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
        </div>
    ),
};

// Loading States
export const Loading: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button loading>Loading</Button>
            <Button variant="outlined" loading>
                Loading
            </Button>
            <Button variant="text" loading>
                Loading
            </Button>
        </div>
    ),
};

// Disabled States
export const Disabled: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button disabled>Solid</Button>
            <Button variant="outlined" disabled>
                Outlined
            </Button>
            <Button variant="text" disabled>
                Text
            </Button>
            <Button variant="ghost" disabled>
                Ghost
            </Button>
            <Button variant="link" disabled>
                Link
            </Button>
        </div>
    ),
};

// With Icons
export const WithIcons: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Button
                    startIcon={
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 0L9.5 5.5L15 7L9.5 8.5L8 14L6.5 8.5L1 7L6.5 5.5L8 0Z" />
                        </svg>
                    }
                >
                    Start Icon
                </Button>
                <Button
                    endIcon={
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 0L10 6L16 8L10 10L8 16L6 10L0 8L6 6L8 0Z" />
                        </svg>
                    }
                >
                    End Icon
                </Button>
                <Button
                    startIcon={
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 0L9.5 5.5L15 7L9.5 8.5L8 14L6.5 8.5L1 7L6.5 5.5L8 0Z" />
                        </svg>
                    }
                    endIcon={
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 0L10 6L16 8L10 10L8 16L6 10L0 8L6 6L8 0Z" />
                        </svg>
                    }
                >
                    Both Icons
                </Button>
            </div>
        </div>
    ),
};

// Full Width
export const FullWidth: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
            <Button fullWidth>Full Width Solid</Button>
            <Button variant="outlined" fullWidth>
                Full Width Outlined
            </Button>
            <Button variant="text" fullWidth>
                Full Width Text
            </Button>
        </div>
    ),
};

// Complex Example
export const ComplexExample: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
                <h3 style={{ marginBottom: '1rem' }}>Action Buttons</h3>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Button
                        variant="solid"
                        color="primary"
                        startIcon={
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 0v16M0 8h16" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        }
                    >
                        Create New
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M2 2L14 14M2 14L14 2" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        }
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="solid"
                        color="danger"
                        startIcon={
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                        }
                    >
                        Delete
                    </Button>
                </div>
            </div>

            <div>
                <h3 style={{ marginBottom: '1rem' }}>Navigation</h3>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Button variant="link" color="primary">
                        Learn More
                    </Button>
                    <Button variant="link" color="secondary">
                        View Details
                    </Button>
                    <Button variant="text" color="primary">
                        Skip
                    </Button>
                </div>
            </div>

            <div>
                <h3 style={{ marginBottom: '1rem' }}>Form Actions</h3>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Button variant="solid" color="success" size="large">
                        Submit
                    </Button>
                    <Button variant="outlined" color="secondary" size="large">
                        Reset
                    </Button>
                    <Button variant="text" color="secondary" size="large">
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    ),
};
