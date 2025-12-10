import type { Meta, StoryObj } from '@storybook/react-vite';
import { breakpoints } from '@grasdouble/lufa_design-system-primitives';
import React from 'react';

const meta = {
    title: '0. Primitives/Breakpoints',
    parameters: {
        layout: 'padded',
    },
    tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllBreakpoints: Story = {
    render: () => (
        <div style={{ padding: '20px', maxWidth: '1400px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Breakpoint Primitives</h1>
            <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
                Foundation breakpoint values for responsive design. Follow mobile-first approach: these represent minimum
                widths for each breakpoint.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {Object.entries(breakpoints).map(([key, value]) => (
                    <div
                        key={key}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '140px 100px 1fr',
                            gap: '16px',
                            alignItems: 'center',
                            padding: '16px',
                            backgroundColor: '#FAFAFA',
                            borderRadius: '8px',
                            border: '1px solid #E5E5E5',
                        }}
                    >
                        <div style={{ fontFamily: 'monospace', fontWeight: '600', fontSize: '14px' }}>
                            breakpoints[{key}]
                        </div>
                        <div style={{ fontFamily: 'monospace', color: '#737373', fontSize: '12px' }}>{value}</div>
                        <div style={{ fontSize: '12px', color: '#737373' }}>
                            {key === '480' && 'Mobile landscape'}
                            {key === '768' && 'Tablet portrait'}
                            {key === '1024' && 'Tablet landscape / Small desktop'}
                            {key === '1280' && 'Desktop'}
                            {key === '1440' && 'Large desktop'}
                            {key === '1920' && 'Extra large desktop / 1080p'}
                        </div>
                    </div>
                ))}
            </div>

            <div
                style={{
                    marginTop: '40px',
                    padding: '24px',
                    backgroundColor: '#DBEAFE',
                    borderRadius: '12px',
                    border: '1px solid #93C5FD',
                }}
            >
                <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600' }}>Mobile-First Strategy</h3>
                <p style={{ margin: 0, lineHeight: '1.6' }}>
                    Default styles apply to all screen sizes. Use media queries with min-width to progressively enhance for
                    larger screens. Example: <code style={{ padding: '2px 6px', backgroundColor: '#EFF6FF', borderRadius: '4px' }}>@media (min-width: 768px)</code>
                </p>
            </div>
        </div>
    ),
};

export const ResponsiveExample: Story = {
    render: () => {
        const [windowWidth, setWindowWidth] = React.useState(
            typeof window !== 'undefined' ? window.innerWidth : 1024
        );

        React.useEffect(() => {
            const handleResize = () => setWindowWidth(window.innerWidth);
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);

        const getBreakpoint = (width: number) => {
            if (width >= 1920) return '1920 (XL Desktop)';
            if (width >= 1440) return '1440 (Large Desktop)';
            if (width >= 1280) return '1280 (Desktop)';
            if (width >= 1024) return '1024 (Tablet Landscape)';
            if (width >= 768) return '768 (Tablet Portrait)';
            if (width >= 480) return '480 (Mobile Landscape)';
            return 'Below 480 (Mobile)';
        };

        return (
            <div style={{ padding: '20px', maxWidth: '1400px' }}>
                <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>Responsive Breakpoint Demo</h2>

                <div
                    style={{
                        padding: '24px',
                        backgroundColor: '#3B82F6',
                        color: 'white',
                        borderRadius: '12px',
                        marginBottom: '32px',
                        textAlign: 'center',
                    }}
                >
                    <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>Current Viewport</div>
                    <div style={{ fontSize: '32px', fontWeight: '600' }}>{windowWidth}px</div>
                    <div style={{ fontSize: '16px', marginTop: '8px' }}>{getBreakpoint(windowWidth)}</div>
                </div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: windowWidth >= 1024 ? 'repeat(3, 1fr)' : windowWidth >= 768 ? 'repeat(2, 1fr)' : '1fr',
                        gap: '16px',
                    }}
                >
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                            key={i}
                            style={{
                                padding: '20px',
                                backgroundColor: 'white',
                                border: '1px solid #E5E5E5',
                                borderRadius: '8px',
                                textAlign: 'center',
                            }}
                        >
                            <div style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>Card {i}</div>
                            <div style={{ fontSize: '14px', color: '#737373' }}>
                                {windowWidth >= 1024 && '3 columns'}
                                {windowWidth >= 768 && windowWidth < 1024 && '2 columns'}
                                {windowWidth < 768 && '1 column'}
                            </div>
                        </div>
                    ))}
                </div>

                <p style={{ marginTop: '24px', fontSize: '14px', color: '#737373' }}>
                    Resize your browser window to see the responsive behavior in action.
                </p>
            </div>
        );
    },
};
