import type { Meta, StoryObj } from '@storybook/react-vite';
import { spacing } from '@grasdouble/lufa_design-system-tokens';

const meta = {
    title: '1. Tokens/Spacing',
    parameters: {
        layout: 'padded',
    },
    tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
    render: () => (
        <div style={{ padding: '20px', maxWidth: '1000px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Spacing Tokens</h1>
            <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
                Standardized spacing values based on an 8px grid system for consistent layouts and visual rhythm.
            </p>

            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Usage</h2>
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
                    >{`import { spacing } from '@grasdouble/lufa_design-system';`}</div>
                    <div style={{ marginBottom: '8px' }}>
                        <span style={{ color: '#C678DD' }}>const</span> <span style={{ color: '#E06C75' }}>styles</span> ={' '}
                        <span style={{ color: '#98C379' }}>{'{'}</span>
                    </div>
                    <div style={{ marginLeft: '20px', marginBottom: '8px' }}>
                        <span style={{ color: '#E5C07B' }}>padding</span>: spacing.base,{' '}
                        <span style={{ color: '#737373' }}>{`// 16px`}</span>
                    </div>
                    <div style={{ marginLeft: '20px', marginBottom: '8px' }}>
                        <span style={{ color: '#E5C07B' }}>margin</span>: spacing.xl, <span style={{ color: '#737373' }}>{`// 24px`}</span>
                    </div>
                    <div>
                        <span style={{ color: '#98C379' }}>{'}'}</span>;
                    </div>
                </div>
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>All Spacing Tokens</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {Object.entries(spacing).map(([key, value]) => (
                    <div
                        key={key}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '12px 16px',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #E5E5E5',
                            borderRadius: '8px',
                        }}
                    >
                        <div style={{ flex: '0 0 100px', fontFamily: 'monospace', fontSize: '14px', fontWeight: 600 }}>{key}</div>
                        <div style={{ flex: '0 0 80px', color: '#737373', fontSize: '14px' }}>{value}</div>
                        <div
                            style={{
                                flex: '0 0 auto',
                                height: '40px',
                                width: value === '0px' ? '2px' : value,
                                backgroundColor: '#2563EB',
                                border: value === '0px' ? '1px solid #2563EB' : 'none',
                            }}
                        />
                        <div style={{ marginLeft: '16px', color: '#737373', fontSize: '13px' }}>
                            {key === 'none' && 'No spacing'}
                            {key === 'xxs' && 'Minimal spacing'}
                            {key === 'xs' && 'Very tight spacing'}
                            {key === 'sm' && 'Tight spacing'}
                            {key === 'md' && 'Compact spacing'}
                            {key === 'base' && 'Base spacing unit'}
                            {key === 'lg' && 'Comfortable spacing'}
                            {key === 'xl' && 'Spacious'}
                            {key === '2xl' && 'Extra spacious'}
                            {key === '3xl' && 'Very spacious'}
                            {key === '4xl' && 'Extra large'}
                            {key === '5xl' && 'Huge spacing'}
                            {key === '6xl' && 'Very huge spacing'}
                            {key === '7xl' && 'Maximum spacing'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ),
};

export const SpacingGrid: Story = {
    render: () => (
        <div style={{ padding: '20px' }}>
            <h2 style={{ marginBottom: '16px' }}>8px Grid System</h2>
            <p style={{ marginBottom: '24px', color: '#737373' }}>
                Our spacing system is based on multiples of 8px for consistent visual rhythm
            </p>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(8, 1fr)',
                    gap: '1px',
                    backgroundColor: '#E5E5E5',
                    padding: '1px',
                    maxWidth: '400px',
                }}
            >
                {Array.from({ length: 64 }).map((_, i) => (
                    <div
                        key={i}
                        style={{
                            width: '8px',
                            height: '8px',
                            backgroundColor: i % 8 === 0 ? '#2563EB' : '#BFDBFE',
                        }}
                    />
                ))}
            </div>
            <p style={{ marginTop: '16px', fontSize: '13px', color: '#737373' }}>Each square = 8px × 8px</p>
        </div>
    ),
};

export const PracticalExamples: Story = {
    render: () => (
        <div style={{ padding: '20px', maxWidth: '800px' }}>
            <h2 style={{ marginBottom: '24px' }}>Practical Examples</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div>
                    <h3 style={{ marginBottom: '12px', fontSize: '16px' }}>Card with Base Spacing</h3>
                    <div
                        style={{
                            padding: spacing.base,
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #E5E5E5',
                            borderRadius: '8px',
                        }}
                    >
                        <h4 style={{ margin: 0, marginBottom: spacing.sm, fontSize: '14px', fontWeight: 600 }}>Card Title</h4>
                        <p style={{ margin: 0, color: '#737373', fontSize: '14px' }}>Content with consistent spacing</p>
                    </div>
                    <p style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>padding: spacing.base (16px)</p>
                </div>

                <div>
                    <h3 style={{ marginBottom: '12px', fontSize: '16px' }}>Button Group with Small Gap</h3>
                    <div style={{ display: 'flex', gap: spacing.sm }}>
                        <button
                            style={{
                                padding: `${spacing.sm} ${spacing.base}`,
                                backgroundColor: '#2563EB',
                                color: '#FFFFFF',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                            }}
                        >
                            Primary
                        </button>
                        <button
                            style={{
                                padding: `${spacing.sm} ${spacing.base}`,
                                backgroundColor: '#FFFFFF',
                                color: '#2563EB',
                                border: '1px solid #2563EB',
                                borderRadius: '6px',
                                cursor: 'pointer',
                            }}
                        >
                            Secondary
                        </button>
                    </div>
                    <p style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>gap: spacing.sm (8px)</p>
                </div>

                <div>
                    <h3 style={{ marginBottom: '12px', fontSize: '16px' }}>List with Medium Gap</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
                        {['Item 1', 'Item 2', 'Item 3'].map((item, i) => (
                            <div
                                key={i}
                                style={{
                                    padding: spacing.md,
                                    backgroundColor: '#F5F5F5',
                                    borderRadius: '6px',
                                }}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                    <p style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>gap: spacing.md (12px)</p>
                </div>
            </div>
        </div>
    ),
};
