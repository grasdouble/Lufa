import type { Meta, StoryObj } from '@storybook/react-vite';
import { semantic } from '@grasdouble/lufa_design-system';

const meta = {
    title: '1. Foundation/Colors/Semantic',
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Semantic color card component
const SemanticColorCard = ({ title, colors, description }: { title: string; colors: Record<string, string>; description?: string }) => (
    <div
        style={{
            marginBottom: '32px',
            padding: '20px',
            backgroundColor: '#FAFAFA',
            borderRadius: '12px',
            border: '1px solid #E5E5E5',
        }}
    >
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>{title}</h3>
        {description && <p style={{ margin: '0 0 16px 0', color: '#737373', fontSize: '14px' }}>{description}</p>}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {Object.entries(colors).map(([key, value]) => (
                <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '140px' }}>
                    <div
                        style={{
                            width: '140px',
                            height: '80px',
                            backgroundColor: value,
                            borderRadius: '6px',
                            border: '1px solid #E5E5E5',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        }}
                    />
                    <div style={{ fontSize: '12px' }}>
                        <div style={{ fontWeight: '600', marginBottom: '2px' }}>{key}</div>
                        <div style={{ color: '#737373', fontFamily: 'monospace', fontSize: '11px' }}>{value}</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export const AllSemantic: Story = {
    render: () => (
        <div style={{ padding: '20px', maxWidth: '1200px' }}>
            <h1 style={{ marginBottom: '16px' }}>Semantic Colors</h1>
            <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
                Intent-based color tokens for consistent usage across components. All semantic colors meet WCAG 2.1 accessibility standards
                when used as intended.
            </p>

            <SemanticColorCard title="Text Colors" colors={semantic.text} description="Colors for different text hierarchies and states" />

            <SemanticColorCard
                title="Background Colors"
                colors={semantic.background}
                description="Colors for various background surfaces"
            />

            <SemanticColorCard title="Border Colors" colors={semantic.border} description="Colors for borders and dividers" />

            <SemanticColorCard
                title="Interactive Colors"
                colors={semantic.interactive}
                description="Colors for interactive elements like buttons and links"
            />

            <SemanticColorCard
                title="Success Colors"
                colors={semantic.success}
                description="Colors for success states and positive feedback"
            />

            <SemanticColorCard title="Warning Colors" colors={semantic.warning} description="Colors for warning states and caution" />

            <SemanticColorCard title="Error Colors" colors={semantic.error} description="Colors for error states and danger" />

            <SemanticColorCard title="Info Colors" colors={semantic.info} description="Colors for informational states" />

            <SemanticColorCard title="Brand Colors" colors={semantic.brand} description="Primary and secondary brand colors" />

            <SemanticColorCard
                title="Surface Colors"
                colors={semantic.surface}
                description="Colors for cards, panels, and elevated surfaces"
            />

            <SemanticColorCard title="Shadow Colors" colors={semantic.shadow} description="Colors for shadows and depth" />
        </div>
    ),
};

export const TextColors: Story = {
    render: () => (
        <div style={{ padding: '20px' }}>
            <SemanticColorCard title="Text Colors" colors={semantic.text} description="Colors for different text hierarchies and states" />
            <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
                <h4 style={{ marginBottom: '16px' }}>Examples</h4>
                <p style={{ color: semantic.text.primary, marginBottom: '8px' }}>Primary text - Main content</p>
                <p style={{ color: semantic.text.secondary, marginBottom: '8px' }}>Secondary text - Supporting content</p>
                <p style={{ color: semantic.text.tertiary, marginBottom: '8px' }}>Tertiary text - Helper text</p>
                <p style={{ color: semantic.text.disabled, marginBottom: '8px' }}>Disabled text</p>
                <div style={{ backgroundColor: semantic.background.inverse, padding: '12px', borderRadius: '6px', marginBottom: '8px' }}>
                    <p style={{ color: semantic.text.inverse, margin: 0 }}>Inverse text on dark background</p>
                </div>
                <a href="#" style={{ color: semantic.text.link }}>
                    Link text
                </a>
            </div>
        </div>
    ),
};

export const InteractiveColors: Story = {
    render: () => (
        <div style={{ padding: '20px' }}>
            <SemanticColorCard
                title="Interactive Colors"
                colors={semantic.interactive}
                description="Colors for interactive elements like buttons and links"
            />
            <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
                <h4 style={{ marginBottom: '16px' }}>Button Examples</h4>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <button
                        style={{
                            backgroundColor: semantic.interactive.default,
                            color: semantic.text.inverse,
                            padding: '10px 20px',
                            borderRadius: '6px',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: '500',
                        }}
                    >
                        Default
                    </button>
                    <button
                        style={{
                            backgroundColor: semantic.interactive.hover,
                            color: semantic.text.inverse,
                            padding: '10px 20px',
                            borderRadius: '6px',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: '500',
                        }}
                    >
                        Hover
                    </button>
                    <button
                        style={{
                            backgroundColor: semantic.interactive.active,
                            color: semantic.text.inverse,
                            padding: '10px 20px',
                            borderRadius: '6px',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: '500',
                        }}
                    >
                        Active
                    </button>
                    <button
                        style={{
                            backgroundColor: semantic.interactive.disabled,
                            color: semantic.text.disabled,
                            padding: '10px 20px',
                            borderRadius: '6px',
                            border: 'none',
                            cursor: 'not-allowed',
                            fontWeight: '500',
                        }}
                        disabled
                    >
                        Disabled
                    </button>
                </div>
            </div>
        </div>
    ),
};

export const StatusColors: Story = {
    render: () => (
        <div style={{ padding: '20px' }}>
            <h2 style={{ marginBottom: '24px' }}>Status Colors</h2>

            <SemanticColorCard
                title="Success Colors"
                colors={semantic.success}
                description="Colors for success states and positive feedback"
            />

            <SemanticColorCard title="Warning Colors" colors={semantic.warning} description="Colors for warning states and caution" />

            <SemanticColorCard title="Error Colors" colors={semantic.error} description="Colors for error states and danger" />

            <SemanticColorCard title="Info Colors" colors={semantic.info} description="Colors for informational states" />

            <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '8px', marginTop: '24px' }}>
                <h4 style={{ marginBottom: '16px' }}>Alert Examples</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div
                        style={{
                            backgroundColor: semantic.success.light,
                            color: semantic.success.text,
                            padding: '16px',
                            borderRadius: '6px',
                            borderLeft: `4px solid ${semantic.success.default}`,
                        }}
                    >
                        <strong>Success:</strong> Operation completed successfully!
                    </div>
                    <div
                        style={{
                            backgroundColor: semantic.warning.light,
                            color: semantic.warning.text,
                            padding: '16px',
                            borderRadius: '6px',
                            borderLeft: `4px solid ${semantic.warning.default}`,
                        }}
                    >
                        <strong>Warning:</strong> Please review this information.
                    </div>
                    <div
                        style={{
                            backgroundColor: semantic.error.light,
                            color: semantic.error.text,
                            padding: '16px',
                            borderRadius: '6px',
                            borderLeft: `4px solid ${semantic.error.default}`,
                        }}
                    >
                        <strong>Error:</strong> Something went wrong!
                    </div>
                    <div
                        style={{
                            backgroundColor: semantic.info.light,
                            color: semantic.info.text,
                            padding: '16px',
                            borderRadius: '6px',
                            borderLeft: `4px solid ${semantic.info.default}`,
                        }}
                    >
                        <strong>Info:</strong> Here&apos;s some helpful information.
                    </div>
                </div>
            </div>
        </div>
    ),
};

export const BrandColors: Story = {
    render: () => (
        <div style={{ padding: '20px' }}>
            <SemanticColorCard title="Brand Colors" colors={semantic.brand} description="Primary and secondary brand colors" />
            <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '8px', marginTop: '24px' }}>
                <h4 style={{ marginBottom: '16px' }}>Brand Button Examples</h4>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <button
                        style={{
                            backgroundColor: semantic.brand.primary,
                            color: semantic.text.inverse,
                            padding: '12px 24px',
                            borderRadius: '6px',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '14px',
                        }}
                    >
                        Primary Brand
                    </button>
                    <button
                        style={{
                            backgroundColor: semantic.brand.secondary,
                            color: semantic.text.inverse,
                            padding: '12px 24px',
                            borderRadius: '6px',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '14px',
                        }}
                    >
                        Secondary Brand
                    </button>
                    <button
                        style={{
                            backgroundColor: semantic.brand.accent,
                            color: semantic.text.inverse,
                            padding: '12px 24px',
                            borderRadius: '6px',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '14px',
                        }}
                    >
                        Accent
                    </button>
                </div>
            </div>
        </div>
    ),
};
