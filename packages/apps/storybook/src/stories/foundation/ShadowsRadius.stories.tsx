import type { Meta, StoryObj } from '@storybook/react-vite';
import { shadows, radius } from '@grasdouble/lufa_design-system';

const meta = {
    title: '1. Foundation/Shadows & Radius',
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ShadowTokens: Story = {
    render: () => (
        <div style={{ padding: '20px', maxWidth: '1000px' }}>
            <h1 style={{ marginBottom: '16px' }}>Shadow Tokens</h1>
            <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
                Standardized shadow values for elevation and depth, following Material Design principles.
            </p>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '32px',
                    marginBottom: '40px',
                }}
            >
                {Object.entries(shadows).map(([key, value]) => (
                    <div key={key}>
                        <div
                            style={{
                                width: '100%',
                                height: '150px',
                                backgroundColor: '#FFFFFF',
                                borderRadius: '8px',
                                boxShadow: value,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <div style={{ fontFamily: 'monospace', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>{key}</div>
                            <div style={{ fontSize: '12px', color: '#737373' }}>
                                {key === 'none' && 'No shadow'}
                                {key === 'xs' && 'Subtle elevation'}
                                {key === 'sm' && 'Small elevation'}
                                {key === 'md' && 'Medium elevation'}
                                {key === 'lg' && 'Large elevation'}
                                {key === 'xl' && 'Extra large'}
                                {key === '2xl' && 'Huge elevation'}
                                {key === 'inner' && 'Inner depth'}
                            </div>
                        </div>
                        <div
                            style={{
                                marginTop: '12px',
                                fontSize: '11px',
                                fontFamily: 'monospace',
                                color: '#737373',
                                wordBreak: 'break-all',
                            }}
                        >
                            shadows.{key}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '48px' }}>
                <h2 style={{ marginBottom: '16px', fontSize: '20px' }}>Usage</h2>
                <div
                    style={{
                        padding: '20px',
                        backgroundColor: '#FAFAFA',
                        borderRadius: '8px',
                        fontFamily: 'monospace',
                        fontSize: '14px',
                    }}
                >
                    <div
                        style={{ color: '#737373', marginBottom: '12px' }}
                    >{`import { shadows } from '@grasdouble/lufa_design-system';`}</div>
                    <div>
                        <span style={{ color: '#E5C07B' }}>boxShadow</span>: shadows.md
                    </div>
                </div>
            </div>
        </div>
    ),
};

export const RadiusTokens: Story = {
    render: () => (
        <div style={{ padding: '20px', maxWidth: '1000px' }}>
            <h1 style={{ marginBottom: '16px' }}>Border Radius Tokens</h1>
            <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
                Standardized border radius values for consistent rounded corners.
            </p>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '24px',
                    marginBottom: '40px',
                }}
            >
                {Object.entries(radius).map(([key, value]) => (
                    <div key={key}>
                        <div
                            style={{
                                width: '100%',
                                height: '120px',
                                backgroundColor: '#2563EB',
                                borderRadius: value,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                color: '#FFFFFF',
                            }}
                        >
                            <div style={{ fontFamily: 'monospace', fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>{key}</div>
                            <div style={{ fontSize: '13px', opacity: 0.9 }}>{value}</div>
                        </div>
                        <div style={{ marginTop: '8px', fontSize: '12px', color: '#737373', textAlign: 'center' }}>
                            {key === 'none' && 'No rounding'}
                            {key === 'xs' && 'Subtle rounding'}
                            {key === 'sm' && 'Small rounding'}
                            {key === 'md' && 'Medium rounding'}
                            {key === 'base' && 'Base rounding'}
                            {key === 'lg' && 'Large rounding'}
                            {key === 'xl' && 'Extra large'}
                            {key === '2xl' && 'Very large'}
                            {key === '3xl' && 'Huge rounding'}
                            {key === 'full' && 'Fully rounded'}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '48px' }}>
                <h2 style={{ marginBottom: '16px', fontSize: '20px' }}>Usage</h2>
                <div
                    style={{
                        padding: '20px',
                        backgroundColor: '#FAFAFA',
                        borderRadius: '8px',
                        fontFamily: 'monospace',
                        fontSize: '14px',
                    }}
                >
                    <div
                        style={{ color: '#737373', marginBottom: '12px' }}
                    >{`import { radius } from '@grasdouble/lufa_design-system';`}</div>
                    <div>
                        <span style={{ color: '#E5C07B' }}>borderRadius</span>: radius.base
                    </div>
                </div>
            </div>
        </div>
    ),
};

export const CombinedExample: Story = {
    render: () => (
        <div style={{ padding: '20px', maxWidth: '800px' }}>
            <h2 style={{ marginBottom: '24px' }}>Shadows & Radius Combined</h2>
            <p style={{ marginBottom: '32px', color: '#737373' }}>Examples showing shadows and border radius working together</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div>
                    <h3 style={{ marginBottom: '12px', fontSize: '16px' }}>Elevated Card</h3>
                    <div
                        style={{
                            padding: '24px',
                            backgroundColor: '#FFFFFF',
                            borderRadius: radius.lg,
                            boxShadow: shadows.md,
                        }}
                    >
                        <h4 style={{ margin: 0, marginBottom: '8px', fontSize: '18px', fontWeight: 600 }}>Card Title</h4>
                        <p style={{ margin: 0, color: '#737373', fontSize: '14px' }}>
                            This card uses shadows.md and radius.lg for a subtle elevated appearance.
                        </p>
                    </div>
                </div>

                <div>
                    <h3 style={{ marginBottom: '12px', fontSize: '16px' }}>Button with Shadow</h3>
                    <button
                        style={{
                            padding: '12px 24px',
                            backgroundColor: '#2563EB',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: radius.base,
                            boxShadow: shadows.sm,
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: 600,
                        }}
                    >
                        Elevated Button
                    </button>
                    <p style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>radius.base + shadows.sm</p>
                </div>

                <div>
                    <h3 style={{ marginBottom: '12px', fontSize: '16px' }}>Modal Dialog</h3>
                    <div
                        style={{
                            padding: '32px',
                            backgroundColor: '#FFFFFF',
                            borderRadius: radius.xl,
                            boxShadow: shadows.xl,
                            maxWidth: '400px',
                        }}
                    >
                        <h4 style={{ margin: 0, marginBottom: '16px', fontSize: '20px', fontWeight: 600 }}>Dialog Title</h4>
                        <p style={{ margin: 0, marginBottom: '24px', color: '#737373', fontSize: '14px' }}>
                            Large shadows and radius create strong visual separation for modals.
                        </p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                style={{
                                    flex: 1,
                                    padding: '10px',
                                    backgroundColor: '#2563EB',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: radius.base,
                                    cursor: 'pointer',
                                }}
                            >
                                Confirm
                            </button>
                            <button
                                style={{
                                    flex: 1,
                                    padding: '10px',
                                    backgroundColor: '#FFFFFF',
                                    color: '#737373',
                                    border: '1px solid #E5E5E5',
                                    borderRadius: radius.base,
                                    cursor: 'pointer',
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                    <p style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>radius.xl + shadows.xl</p>
                </div>
            </div>
        </div>
    ),
};
