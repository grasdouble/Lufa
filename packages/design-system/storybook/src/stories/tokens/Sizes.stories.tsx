import type { Meta, StoryObj } from '@storybook/react-vite';
import { sizes } from '@grasdouble/lufa_design-system-tokens';

const meta = {
    title: '1. Tokens/Sizes',
    parameters: {
        layout: 'padded',
    },
    tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllSizes: Story = {
    render: () => (
        <div style={{ padding: '20px', maxWidth: '1400px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Size Tokens</h1>
            <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
                Semantic size tokens for common element dimensions. Includes WCAG 2.5.5 minimum touch target (44px).
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {Object.entries(sizes).map(([key, value]) => {
                    const isTouchTarget = key === 'touchTarget';

                    return (
                        <div
                            key={key}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '180px 100px 1fr',
                                gap: '24px',
                                alignItems: 'center',
                                padding: '16px',
                                backgroundColor: '#FAFAFA',
                                borderRadius: '8px',
                                border: isTouchTarget ? '2px solid #2563EB' : '1px solid #E5E5E5',
                            }}
                        >
                            <div style={{ fontFamily: 'monospace', fontWeight: '600', fontSize: '14px' }}>sizes.{key}</div>
                            <div style={{ fontFamily: 'monospace', color: '#737373', fontSize: '12px' }}>{value}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div
                                    style={{
                                        width: value,
                                        height: value,
                                        backgroundColor: isTouchTarget ? '#2563EB' : '#3B82F6',
                                        borderRadius: '6px',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                        flexShrink: 0,
                                    }}
                                />
                                <div style={{ fontSize: '12px', color: '#737373' }}>
                                    {key === 'none' && 'No size'}
                                    {key === 'xs' && 'Icons (inline)'}
                                    {key === 'sm' && 'Small icons, avatars'}
                                    {key === 'md' && 'Buttons, form inputs'}
                                    {key === 'touchTarget' && 'WCAG minimum touch target ✓'}
                                    {key === 'lg' && 'Large buttons, icons'}
                                    {key === 'xl' && 'Feature icons'}
                                    {key === '2xl' && 'Hero icons, logos'}
                                    {key === '3xl' && 'Large avatars'}
                                    {key === '4xl' && 'Thumbnails'}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div
                style={{
                    marginTop: '32px',
                    padding: '16px',
                    backgroundColor: '#EFF6FF',
                    border: '1px solid #BFDBFE',
                    borderRadius: '8px',
                }}
            >
                <div style={{ fontWeight: '600', marginBottom: '8px', color: '#1E40AF' }}>WCAG 2.5.5 Target Size</div>
                <div style={{ fontSize: '14px', color: '#1E3A8A' }}>
                    Interactive elements should have a minimum touch target of 44×44px to ensure accessibility on touch devices.
                    Use sizes.touchTarget or larger for all interactive elements.
                </div>
            </div>
        </div>
    ),
};

export const UsageExamples: Story = {
    render: () => (
        <div style={{ padding: '20px', maxWidth: '1400px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Size Token Usage Examples</h1>

            {/* Icons */}
            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Icons</h2>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                    {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
                        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                            <div
                                style={{
                                    width: sizes[size as keyof typeof sizes],
                                    height: sizes[size as keyof typeof sizes],
                                    backgroundColor: '#3B82F6',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '10px',
                                }}
                            >
                                ★
                            </div>
                            <span style={{ fontSize: '12px', fontFamily: 'monospace' }}>{size}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Buttons */}
            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Buttons</h2>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                    {['md', 'touchTarget', 'lg'].map((size) => (
                        <button
                            key={size}
                            style={{
                                height: sizes[size as keyof typeof sizes],
                                padding: '0 24px',
                                backgroundColor: '#3B82F6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '14px',
                                fontWeight: '500',
                                cursor: 'pointer',
                            }}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Avatars */}
            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Avatars</h2>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                    {['sm', 'md', 'lg', 'xl', '2xl'].map((size) => (
                        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                            <div
                                style={{
                                    width: sizes[size as keyof typeof sizes],
                                    height: sizes[size as keyof typeof sizes],
                                    backgroundColor: '#10B981',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: '600',
                                }}
                            >
                                A
                            </div>
                            <span style={{ fontSize: '12px', fontFamily: 'monospace' }}>{size}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Form Inputs */}
            <div>
                <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Form Inputs</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
                    {['md', 'touchTarget', 'lg'].map((size) => (
                        <input
                            key={size}
                            type="text"
                            placeholder={`Input with ${size} height`}
                            style={{
                                height: sizes[size as keyof typeof sizes],
                                padding: '0 16px',
                                border: '1px solid #D1D5DB',
                                borderRadius: '6px',
                                fontSize: '14px',
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    ),
};
