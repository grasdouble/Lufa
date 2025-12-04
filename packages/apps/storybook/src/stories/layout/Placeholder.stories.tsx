import type { Meta, StoryObj } from '@storybook/react-vite';
import { Placeholder, primitives } from '@grasdouble/lufa_design-system';

const meta = {
    title: '2. Layout/Placeholder',
    component: Placeholder,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'A placeholder component used for layout spacing and visual structure. Features customizable height, width, and color variants. Useful during development and prototyping.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        height: {
            control: 'select',
            options: ['small', 'medium', 'large', 'auto', 'full'],
            description: 'Height variant of the placeholder',
            table: {
                defaultValue: { summary: 'medium' },
            },
        },
        width: {
            control: 'select',
            options: ['auto', 'small', 'medium', 'large', 'full'],
            description: 'Width variant of the placeholder',
            table: {
                defaultValue: { summary: 'full' },
            },
        },
        color: {
            control: 'color',
            description: 'Custom background color (any valid CSS color)',
        },
        children: {
            control: 'text',
            description: 'Content to display inside the placeholder',
        },
    },
} satisfies Meta<typeof Placeholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        height: 'medium',
        width: 'full',
        children: 'Placeholder Content',
    },
};

export const HeightVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
            <div>
                <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Small (40px)</h3>
                <Placeholder height="small">Small Height</Placeholder>
            </div>
            <div>
                <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Medium (80px) - Default</h3>
                <Placeholder height="medium">Medium Height</Placeholder>
            </div>
            <div>
                <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Large (128px)</h3>
                <Placeholder height="large">Large Height</Placeholder>
            </div>
            <div>
                <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Auto</h3>
                <Placeholder height="auto">
                    Auto height adjusts to content
                    <br />
                    Multiple lines supported
                    <br />
                    Grows as needed
                </Placeholder>
            </div>
        </div>
    ),
};

export const WidthVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
                <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Auto (min-width: 96px)</h3>
                <Placeholder width="auto">Auto</Placeholder>
            </div>
            <div>
                <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Small (128px)</h3>
                <Placeholder width="small">Small Width</Placeholder>
            </div>
            <div>
                <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Medium (240px)</h3>
                <Placeholder width="medium">Medium Width</Placeholder>
            </div>
            <div>
                <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Large (384px)</h3>
                <Placeholder width="large">Large Width</Placeholder>
            </div>
            <div>
                <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Full (100%)</h3>
                <Placeholder width="full">Full Width</Placeholder>
            </div>
        </div>
    ),
};

export const ColorVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
            <div>
                <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Default (Violet Gradient)</h3>
                <Placeholder>Default Color</Placeholder>
            </div>
            <div>
                <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Blue</h3>
                <Placeholder color={primitives.blue[600]}>Blue</Placeholder>
            </div>
            <div>
                <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Green</h3>
                <Placeholder color={primitives.green[600]}>Green</Placeholder>
            </div>
            <div>
                <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Red</h3>
                <Placeholder color={primitives.red[600]}>Red</Placeholder>
            </div>
            <div>
                <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Purple</h3>
                <Placeholder color={primitives.purple[600]}>Purple</Placeholder>
            </div>
            <div>
                <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Indigo</h3>
                <Placeholder color={primitives.indigo[600]}>Indigo</Placeholder>
            </div>
            <div>
                <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Orange</h3>
                <Placeholder color={primitives.orange[600]}>Orange</Placeholder>
            </div>
            <div>
                <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Neutral</h3>
                <Placeholder color={primitives.neutral[600]}>Neutral</Placeholder>
            </div>
        </div>
    ),
};

export const CombinedVariants: Story = {
    render: () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <Placeholder height="small" width="small" color={primitives.blue[500]}>
                Small × Small
            </Placeholder>
            <Placeholder height="small" width="medium" color={primitives.green[500]}>
                Small × Medium
            </Placeholder>
            <Placeholder height="small" width="large" color={primitives.red[500]}>
                Small × Large
            </Placeholder>
            <Placeholder height="medium" width="small" color={primitives.purple[500]}>
                Medium × Small
            </Placeholder>
            <Placeholder height="medium" width="medium" color={primitives.indigo[500]}>
                Medium × Medium
            </Placeholder>
            <Placeholder height="medium" width="large" color={primitives.orange[500]}>
                Medium × Large
            </Placeholder>
            <Placeholder height="large" width="small" color={primitives.teal[500]}>
                Large × Small
            </Placeholder>
            <Placeholder height="large" width="medium" color={primitives.pink[500]}>
                Large × Medium
            </Placeholder>
            <Placeholder height="large" width="large" color={primitives.yellow[600]}>
                Large × Large
            </Placeholder>
        </div>
    ),
};

export const LayoutExample: Story = {
    render: () => (
        <div
            style={{
                maxWidth: '900px',
                padding: '20px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
            }}
        >
            <h2 style={{ marginBottom: '16px' }}>Dashboard Layout Example</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Placeholder height="small" width="full" color={primitives.blue[600]}>
                    Header - Small Height, Full Width
                </Placeholder>
                <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '16px' }}>
                    <Placeholder height="full" width="full" color={primitives.purple[500]}>
                        Sidebar
                    </Placeholder>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Placeholder height="medium" width="full" color={primitives.green[500]}>
                            Content Area
                        </Placeholder>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '16px',
                            }}
                        >
                            <Placeholder height="small" color={primitives.orange[500]}>
                                Card 1
                            </Placeholder>
                            <Placeholder height="small" color={primitives.orange[500]}>
                                Card 2
                            </Placeholder>
                            <Placeholder height="small" color={primitives.orange[500]}>
                                Card 3
                            </Placeholder>
                        </div>
                    </div>
                </div>
                <Placeholder height="small" width="full" color={primitives.neutral[600]}>
                    Footer - Small Height, Full Width
                </Placeholder>
            </div>
        </div>
    ),
};
