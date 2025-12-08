import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography } from '@grasdouble/lufa_design-system';

const meta = {
    title: '1. Tokens/Typography',
    component: Typography,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'Typography component for consistent text styling across the application. Supports multiple variants, weights, alignments, and semantic colors.',
            },
        },
    },
    tags: [],
    argTypes: {
        variant: {
            control: 'select',
            options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body', 'bodyLarge', 'bodySmall', 'caption', 'label'],
            description: 'Visual style variant',
        },
        as: {
            control: 'select',
            options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'label', 'div'],
            description: 'HTML element to render',
        },
        weight: {
            control: 'select',
            options: ['light', 'normal', 'medium', 'semibold', 'bold'],
            description: 'Font weight',
        },
        align: {
            control: 'select',
            options: ['left', 'center', 'right', 'justify'],
            description: 'Text alignment',
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'tertiary', 'inverse', 'error', 'success', 'warning'],
            description: 'Text color variant',
        },
        children: {
            control: 'text',
            description: 'Content to display',
        },
    },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        variant: 'body',
        children: 'The quick brown fox jumps over the lazy dog',
        color: 'primary',
    },
};

export const Headings: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
                <Typography variant="h1">Heading 1</Typography>
                <p style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>variant="h1" - 48px, bold</p>
            </div>
            <div>
                <Typography variant="h2">Heading 2</Typography>
                <p style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>variant="h2" - 36px, bold</p>
            </div>
            <div>
                <Typography variant="h3">Heading 3</Typography>
                <p style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>variant="h3" - 30px, semibold</p>
            </div>
            <div>
                <Typography variant="h4">Heading 4</Typography>
                <p style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>variant="h4" - 24px, semibold</p>
            </div>
            <div>
                <Typography variant="h5">Heading 5</Typography>
                <p style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>variant="h5" - 20px, semibold</p>
            </div>
            <div>
                <Typography variant="h6">Heading 6</Typography>
                <p style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>variant="h6" - 18px, semibold</p>
            </div>
        </div>
    ),
};

export const BodyText: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
            <div>
                <Typography variant="bodyLarge">
                    Large body text is perfect for introductory paragraphs or emphasized content. It provides excellent readability while
                    maintaining visual hierarchy.
                </Typography>
                <p style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>variant="bodyLarge" - 18px</p>
            </div>
            <div>
                <Typography variant="body">
                    Regular body text is the workhorse of your content. It should be comfortable to read for extended periods and work well
                    at various viewport sizes.
                </Typography>
                <p style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>variant="body" - 16px (default)</p>
            </div>
            <div>
                <Typography variant="bodySmall">
                    Small body text works well for secondary information, captions, or compact layouts where space is at a premium.
                </Typography>
                <p style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>variant="bodySmall" - 14px</p>
            </div>
            <div>
                <Typography variant="caption">
                    Caption text is ideal for image captions, footnotes, or supplementary information.
                </Typography>
                <p style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>variant="caption" - 12px</p>
            </div>
        </div>
    ),
};

export const FontWeights: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Typography variant="body" weight="light">
                Light weight text for subtle emphasis
            </Typography>
            <Typography variant="body" weight="normal">
                Normal weight for standard body text
            </Typography>
            <Typography variant="body" weight="medium">
                Medium weight for slight emphasis
            </Typography>
            <Typography variant="body" weight="semibold">
                Semibold weight for strong emphasis
            </Typography>
            <Typography variant="body" weight="bold">
                Bold weight for maximum emphasis
            </Typography>
        </div>
    ),
};

export const TextAlignment: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
                <Typography variant="body" align="left">
                    Left aligned text is the default for most languages. It creates a strong vertical edge and is easiest to read for longer
                    content.
                </Typography>
                <p style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>align="left"</p>
            </div>
            <div>
                <Typography variant="body" align="center">
                    Center aligned text works well for headlines, hero sections, and short amounts of content that need emphasis.
                </Typography>
                <p style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>align="center"</p>
            </div>
            <div>
                <Typography variant="body" align="right">
                    Right aligned text is useful for numeric data, timestamps, or creating visual balance in layouts.
                </Typography>
                <p style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>align="right"</p>
            </div>
            <div>
                <Typography variant="body" align="justify">
                    Justified text creates even edges on both sides by adjusting word spacing. Use sparingly as it can affect readability.
                </Typography>
                <p style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>align="justify"</p>
            </div>
        </div>
    ),
};

export const SemanticColors: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Typography variant="body" color="primary">
                Primary text color for main content
            </Typography>
            <Typography variant="body" color="secondary">
                Secondary text color for supporting content
            </Typography>
            <Typography variant="body" color="tertiary">
                Tertiary text color for less important information
            </Typography>
            <div style={{ backgroundColor: '#171717', padding: '16px', borderRadius: '8px' }}>
                <Typography variant="body" color="inverse">
                    Inverse text color for dark backgrounds
                </Typography>
            </div>
            <Typography variant="body" color="error">
                Error text color for error messages
            </Typography>
            <Typography variant="body" color="success">
                Success text color for success messages
            </Typography>
            <Typography variant="body" color="warning">
                Warning text color for warning messages
            </Typography>
        </div>
    ),
};

export const LabelVariant: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
                <Typography variant="label" as="label">
                    Email Address
                </Typography>
                <input type="email" style={{ display: 'block', marginTop: '4px', padding: '8px', width: '100%', maxWidth: '300px' }} />
            </div>
            <div>
                <Typography variant="label" as="label">
                    Password
                </Typography>
                <input type="password" style={{ display: 'block', marginTop: '4px', padding: '8px', width: '100%', maxWidth: '300px' }} />
            </div>
        </div>
    ),
};

export const RealWorldExample: Story = {
    render: () => (
        <div style={{ maxWidth: '800px' }}>
            <Typography variant="h1" align="center">
                Design System Typography
            </Typography>
            <Typography variant="body" color="secondary" align="center" style={{ marginTop: '16px', marginBottom: '40px' }}>
                A comprehensive guide to using typography effectively in your applications
            </Typography>

            <Typography variant="h3" style={{ marginTop: '32px', marginBottom: '16px' }}>
                Introduction
            </Typography>
            <Typography variant="body" style={{ marginBottom: '16px' }}>
                Typography is one of the most important aspects of design systems. It establishes hierarchy, improves readability, and
                creates a consistent experience across your application.
            </Typography>

            <Typography variant="h4" style={{ marginTop: '24px', marginBottom: '12px' }}>
                Hierarchy and Scale
            </Typography>
            <Typography variant="body" style={{ marginBottom: '16px' }}>
                Our type scale provides six heading levels and multiple body text sizes to create clear visual hierarchy. Each level has
                been carefully chosen to ensure proper contrast between adjacent sizes.
            </Typography>

            <Typography
                variant="bodySmall"
                color="secondary"
                style={{ marginTop: '32px', padding: '16px', backgroundColor: '#F5F5F5', borderRadius: '8px' }}
            >
                Pro tip: Use semantic color variants to convey meaning and improve accessibility. Always ensure sufficient contrast between
                text and background colors.
            </Typography>
        </div>
    ),
};
