import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography } from '@grasdouble/lufa_design-system';

const meta = {
    title: '0. Getting Started/How to use Lufa Design System',
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const GettingStarted: Story = {
    render: () => (
        <div style={{ padding: '40px', maxWidth: '1200px', fontFamily: 'system-ui, sans-serif' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>🚀 Consuming the Design System</h1>
            <p style={{ fontSize: '20px', color: '#737373', marginBottom: '48px', lineHeight: 1.6 }}>
                Choose the integration method that best fits your project's needs. All methods use the same design tokens.
            </p>

            {/* Comparison Table */}
            <section style={{ marginBottom: '64px' }}>
                <Typography variant="h2" style={{ marginBottom: '24px', fontSize: '32px' }}>
                    📊 Integration Methods
                </Typography>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>Method</th>
                                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>Use Case</th>
                                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>Pros</th>
                                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>Bundle Size</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                                <td style={{ padding: '16px', fontWeight: '600' }}>Components Only</td>
                                <td style={{ padding: '16px', color: '#6B7280' }}>Use pre-built components</td>
                                <td style={{ padding: '16px', color: '#6B7280' }}>Fastest setup, no config</td>
                                <td style={{ padding: '16px', color: '#10B981', fontWeight: '600' }}>Smallest</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                                <td style={{ padding: '16px', fontWeight: '600' }}>Without Tailwind</td>
                                <td style={{ padding: '16px', color: '#6B7280' }}>Components + CSS variables, no Tailwind</td>
                                <td style={{ padding: '16px', color: '#6B7280' }}>Use other CSS frameworks</td>
                                <td style={{ padding: '16px', color: '#10B981', fontWeight: '600' }}>Medium</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                                <td style={{ padding: '16px', fontWeight: '600' }}>With Tailwind</td>
                                <td style={{ padding: '16px', color: '#6B7280' }}>Use Tailwind utilities with tokens</td>
                                <td style={{ padding: '16px', color: '#6B7280' }}>Best DX, utilities + @apply</td>
                                <td style={{ padding: '16px', color: '#F59E0B', fontWeight: '600' }}>Medium</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Method 1: Components Only */}
            <section style={{ marginBottom: '64px' }}>
                <Typography variant="h2" style={{ marginBottom: '24px', fontSize: '32px' }}>
                    1️⃣ Components Only (No Tailwind)
                </Typography>
                <p style={{ fontSize: '16px', color: '#6B7280', marginBottom: '24px' }}>
                    Perfect for apps that want to use pre-built components without any Tailwind setup.
                </p>

                <div style={{ marginBottom: '24px' }}>
                    <Typography variant="h3" style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>
                        Installation
                    </Typography>
                    <div
                        style={{
                            padding: '20px',
                            backgroundColor: '#1F2937',
                            borderRadius: '8px',
                            color: '#F9FAFB',
                            fontFamily: 'monospace',
                            fontSize: '14px',
                        }}
                    >
                        <div style={{ color: '#6EE7B7' }}># Install the design system</div>
                        <div>npm install @grasdouble/lufa_design-system</div>
                    </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <Typography variant="h3" style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>
                        Setup
                    </Typography>
                    <div
                        style={{
                            padding: '20px',
                            backgroundColor: '#1F2937',
                            borderRadius: '8px',
                            color: '#F9FAFB',
                            fontFamily: 'monospace',
                            fontSize: '14px',
                            lineHeight: 1.6,
                        }}
                    >
                        <div style={{ color: '#6EE7B7' }}>// main.tsx or App.tsx</div>
                        <div>
                            <span style={{ color: '#F87171' }}>import</span>{' '}
                            <span style={{ color: '#FCD34D' }}>'@grasdouble/lufa_design-system/style.css'</span>;
                        </div>
                        <div>
                            <span style={{ color: '#F87171' }}>import</span> {'{ Button, Card, Input }'}{' '}
                            <span style={{ color: '#F87171' }}>from</span>{' '}
                            <span style={{ color: '#FCD34D' }}>'@grasdouble/lufa_design-system'</span>;
                        </div>
                    </div>
                </div>

                <div>
                    <Typography variant="h3" style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>
                        Usage
                    </Typography>
                    <div
                        style={{
                            padding: '20px',
                            backgroundColor: '#1F2937',
                            borderRadius: '8px',
                            color: '#F9FAFB',
                            fontFamily: 'monospace',
                            fontSize: '14px',
                            lineHeight: 1.6,
                        }}
                    >
                        <div>
                            <span style={{ color: '#F87171' }}>export function</span> <span style={{ color: '#93C5FD' }}>MyComponent</span>
                            () {'{'}
                        </div>
                        <div style={{ marginLeft: '20px' }}>
                            <span style={{ color: '#F87171' }}>return</span> (
                        </div>
                        <div style={{ marginLeft: '40px' }}>
                            {'<'}
                            <span style={{ color: '#FCD34D' }}>Card</span>
                            {'>'}
                        </div>
                        <div style={{ marginLeft: '60px' }}>
                            {'<'}
                            <span style={{ color: '#FCD34D' }}>Button</span> <span style={{ color: '#93C5FD' }}>variant</span>=
                            <span style={{ color: '#FCD34D' }}>"solid"</span>
                            {'>'}Click me{'</'}
                            <span style={{ color: '#FCD34D' }}>Button</span>
                            {'>'}
                        </div>
                        <div style={{ marginLeft: '40px' }}>
                            {'</'}
                            <span style={{ color: '#FCD34D' }}>Card</span>
                            {'>'}
                        </div>
                        <div style={{ marginLeft: '20px' }}>);</div>
                        <div>{'}'}</div>
                    </div>
                </div>
            </section>

            {/* Method 2: Without Tailwind */}
            <section style={{ marginBottom: '64px' }}>
                <Typography variant="h2" style={{ marginBottom: '24px', fontSize: '32px' }}>
                    2️⃣ Without Tailwind (Components + CSS Variables)
                </Typography>
                <p style={{ fontSize: '16px', color: '#6B7280', marginBottom: '24px' }}>
                    Use pre-built components AND design tokens without Tailwind. Perfect for apps using other CSS frameworks or custom CSS.
                </p>

                <div style={{ marginBottom: '24px' }}>
                    <Typography variant="h3" style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>
                        Setup
                    </Typography>
                    <div
                        style={{
                            padding: '20px',
                            backgroundColor: '#1F2937',
                            borderRadius: '8px',
                            color: '#F9FAFB',
                            fontFamily: 'monospace',
                            fontSize: '14px',
                            lineHeight: 1.6,
                        }}
                    >
                        <div style={{ color: '#6EE7B7' }}>// Import components styles + CSS variables (no Tailwind)</div>
                        <div>
                            <span style={{ color: '#F87171' }}>import</span>{' '}
                            <span style={{ color: '#FCD34D' }}>'@grasdouble/lufa_design-system/style.css'</span>;
                        </div>
                    </div>
                </div>

                <div>
                    <Typography variant="h3" style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>
                        Usage in CSS
                    </Typography>
                    <div
                        style={{
                            padding: '20px',
                            backgroundColor: '#1F2937',
                            borderRadius: '8px',
                            color: '#F9FAFB',
                            fontFamily: 'monospace',
                            fontSize: '14px',
                            lineHeight: 1.6,
                        }}
                    >
                        <div style={{ color: '#6EE7B7' }}>/* MyButton.module.css */</div>
                        <div>
                            <span style={{ color: '#93C5FD' }}>.button</span> {'{'}
                        </div>
                        <div style={{ marginLeft: '20px' }}>
                            <span style={{ color: '#FCD34D' }}>padding</span>: <span style={{ color: '#FCD34D' }}>var(--spacing-base)</span>{' '}
                            <span style={{ color: '#FCD34D' }}>var(--spacing-lg)</span>;
                        </div>
                        <div style={{ marginLeft: '20px' }}>
                            <span style={{ color: '#FCD34D' }}>background-color</span>:{' '}
                            <span style={{ color: '#FCD34D' }}>var(--color-interactive-default)</span>;
                        </div>
                        <div style={{ marginLeft: '20px' }}>
                            <span style={{ color: '#FCD34D' }}>color</span>:{' '}
                            <span style={{ color: '#FCD34D' }}>var(--color-text-inverse)</span>;
                        </div>
                        <div style={{ marginLeft: '20px' }}>
                            <span style={{ color: '#FCD34D' }}>border-radius</span>:{' '}
                            <span style={{ color: '#FCD34D' }}>var(--radius-md)</span>;
                        </div>
                        <div style={{ marginLeft: '20px' }}>
                            <span style={{ color: '#FCD34D' }}>box-shadow</span>: <span style={{ color: '#FCD34D' }}>var(--shadow-md)</span>
                            ;
                        </div>
                        <div>{'}'}</div>
                        <br />
                        <div>
                            <span style={{ color: '#93C5FD' }}>.button:hover</span> {'{'}
                        </div>
                        <div style={{ marginLeft: '20px' }}>
                            <span style={{ color: '#FCD34D' }}>background-color</span>:{' '}
                            <span style={{ color: '#FCD34D' }}>var(--color-interactive-hover)</span>;
                        </div>
                        <div>{'}'}</div>
                    </div>
                </div>
            </section>

            {/* Method 3: With Tailwind */}
            <section style={{ marginBottom: '64px' }}>
                <Typography variant="h2" style={{ marginBottom: '24px', fontSize: '32px' }}>
                    3️⃣ With Tailwind CSS
                </Typography>
                <p style={{ fontSize: '16px', color: '#6B7280', marginBottom: '24px' }}>
                    Get the best developer experience with Tailwind utilities mapped to design tokens. Use utilities in JSX and @apply in
                    CSS.
                </p>

                <div style={{ marginBottom: '24px' }}>
                    <Typography variant="h3" style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>
                        Installation
                    </Typography>
                    <div
                        style={{
                            padding: '20px',
                            backgroundColor: '#1F2937',
                            borderRadius: '8px',
                            color: '#F9FAFB',
                            fontFamily: 'monospace',
                            fontSize: '14px',
                            lineHeight: 1.6,
                        }}
                    >
                        <div style={{ color: '#6EE7B7' }}># Install Tailwind CSS v4 and the design system</div>
                        <div>npm install @grasdouble/lufa_design-system</div>
                        <div>npm install -D tailwindcss @tailwindcss/vite</div>
                    </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <Typography variant="h3" style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>
                        Setup - Main CSS File
                    </Typography>
                    <div
                        style={{
                            padding: '20px',
                            backgroundColor: '#1F2937',
                            borderRadius: '8px',
                            color: '#F9FAFB',
                            fontFamily: 'monospace',
                            fontSize: '14px',
                            lineHeight: 1.6,
                        }}
                    >
                        <div style={{ color: '#6EE7B7' }}>/* src/index.css */</div>
                        <div>
                            <span style={{ color: '#F87171' }}>@import</span>{' '}
                            <span style={{ color: '#FCD34D' }}>'@grasdouble/lufa_design-system/tailwind.css'</span>;
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <Typography variant="h3" style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>
                        Setup - Vite Config
                    </Typography>
                    <div
                        style={{
                            padding: '20px',
                            backgroundColor: '#1F2937',
                            borderRadius: '8px',
                            color: '#F9FAFB',
                            fontFamily: 'monospace',
                            fontSize: '14px',
                            lineHeight: 1.6,
                        }}
                    >
                        <div style={{ color: '#6EE7B7' }}>// vite.config.ts</div>
                        <div>
                            <span style={{ color: '#F87171' }}>import</span> tailwindcss <span style={{ color: '#F87171' }}>from</span>{' '}
                            <span style={{ color: '#FCD34D' }}>'@tailwindcss/vite'</span>;
                        </div>
                        <br />
                        <div>
                            <span style={{ color: '#F87171' }}>export default</span> <span style={{ color: '#93C5FD' }}>defineConfig</span>(
                            {'{'}
                        </div>
                        <div style={{ marginLeft: '20px' }}>
                            plugins: [<span style={{ color: '#93C5FD' }}>tailwindcss</span>()],
                        </div>
                        <div>{'})'};</div>
                    </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <Typography variant="h3" style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>
                        Usage - Utilities in JSX
                    </Typography>
                    <div
                        style={{
                            padding: '20px',
                            backgroundColor: '#1F2937',
                            borderRadius: '8px',
                            color: '#F9FAFB',
                            fontFamily: 'monospace',
                            fontSize: '14px',
                            lineHeight: 1.6,
                        }}
                    >
                        <div>
                            <span style={{ color: '#F87171' }}>export function</span> <span style={{ color: '#93C5FD' }}>MyCard</span>(){' '}
                            {'{'}
                        </div>
                        <div style={{ marginLeft: '20px' }}>
                            <span style={{ color: '#F87171' }}>return</span> (
                        </div>
                        <div style={{ marginLeft: '40px' }}>
                            {'<'}
                            <span style={{ color: '#FCD34D' }}>div</span>
                        </div>
                        <div style={{ marginLeft: '60px' }}>
                            <span style={{ color: '#93C5FD' }}>className</span>=
                            <span style={{ color: '#FCD34D' }}>
                                "p-base rounded-lg bg-background-primary border border-border-default shadow-md"
                            </span>
                        </div>
                        <div style={{ marginLeft: '40px' }}>{'>'}...</div>
                        <div style={{ marginLeft: '40px' }}>
                            {'</'}
                            <span style={{ color: '#FCD34D' }}>div</span>
                            {'>'}
                        </div>
                        <div style={{ marginLeft: '20px' }}>);</div>
                        <div>{'}'}</div>
                    </div>
                </div>

                <div>
                    <Typography variant="h3" style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>
                        Usage - @apply in CSS Modules
                    </Typography>
                    <div
                        style={{
                            padding: '20px',
                            backgroundColor: '#1F2937',
                            borderRadius: '8px',
                            color: '#F9FAFB',
                            fontFamily: 'monospace',
                            fontSize: '14px',
                            lineHeight: 1.6,
                        }}
                    >
                        <div style={{ color: '#6EE7B7' }}>/* Button.module.css */</div>
                        <div>
                            <span style={{ color: '#F87171' }}>@reference</span> <span style={{ color: '#FCD34D' }}>'../index.css'</span>;
                        </div>
                        <br />
                        <div>
                            <span style={{ color: '#93C5FD' }}>.button</span> {'{'}
                        </div>
                        <div style={{ marginLeft: '20px' }}>
                            <span style={{ color: '#F87171' }}>@apply</span> inline-flex items-center justify-center;
                        </div>
                        <div style={{ marginLeft: '20px' }}>
                            <span style={{ color: '#F87171' }}>@apply</span> px-base py-sm gap-sm;
                        </div>
                        <div style={{ marginLeft: '20px' }}>
                            <span style={{ color: '#F87171' }}>@apply</span> rounded-lg text-base font-medium;
                        </div>
                        <div style={{ marginLeft: '20px' }}>
                            <span style={{ color: '#F87171' }}>@apply</span> bg-interactive-default text-text-inverse;
                        </div>
                        <div style={{ marginLeft: '20px' }}>
                            <span style={{ color: '#F87171' }}>@apply</span> hover:bg-interactive-hover;
                        </div>
                        <div style={{ marginLeft: '20px' }}>
                            <span style={{ color: '#F87171' }}>@apply</span> shadow-md hover:shadow-lg;
                        </div>
                        <div style={{ marginLeft: '20px' }}>
                            <span style={{ color: '#F87171' }}>@apply</span> transition-all duration-200;
                        </div>
                        <div>{'}'}</div>
                    </div>
                </div>
            </section>

            {/* Key Differences */}
            <section style={{ marginBottom: '48px' }}>
                <Typography variant="h2" style={{ marginBottom: '24px', fontSize: '32px' }}>
                    🔑 Key Differences
                </Typography>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div
                        style={{
                            padding: '24px',
                            backgroundColor: '#DBEAFE',
                            borderRadius: '12px',
                            border: '2px solid #93C5FD',
                        }}
                    >
                        <Typography variant="h3" style={{ marginBottom: '12px', fontSize: '20px', fontWeight: '600', color: '#1E40AF' }}>
                            @import '.../style.css'
                        </Typography>
                        <ul style={{ fontSize: '14px', lineHeight: 1.8, paddingLeft: '20px', color: '#1E3A8A' }}>
                            <li>
                                <strong>Component styles</strong> - Pre-built components (Button, Input, etc.)
                            </li>
                            <li>
                                <strong>CSS variables</strong> - Foundation tokens (colors, spacing, etc.)
                            </li>
                            <li>
                                <strong>No Tailwind</strong> - No utilities or @apply
                            </li>
                            <li>
                                <strong>Smaller bundle</strong> - Components + variables only
                            </li>
                            <li>
                                <strong>Use case:</strong> Want components without Tailwind
                            </li>
                        </ul>
                    </div>
                    <div
                        style={{
                            padding: '24px',
                            backgroundColor: '#FEF3C7',
                            borderRadius: '12px',
                            border: '2px solid #FCD34D',
                        }}
                    >
                        <Typography variant="h3" style={{ marginBottom: '12px', fontSize: '20px', fontWeight: '600', color: '#92400E' }}>
                            @import '.../tailwind.css'
                        </Typography>
                        <ul style={{ fontSize: '14px', lineHeight: 1.8, paddingLeft: '20px', color: '#78350F' }}>
                            <li>
                                <strong>Everything!</strong> - Component styles + CSS variables + Tailwind
                            </li>
                            <li>
                                <strong>Tailwind utilities</strong> - Use utilities in JSX (px-base, text-interactive-default)
                            </li>
                            <li>
                                <strong>@apply directive</strong> - Use @apply in your CSS modules
                            </li>
                            <li>
                                <strong>@theme config</strong> - Foundation tokens mapped to Tailwind
                            </li>
                            <li>
                                <strong>Larger bundle</strong> - Includes full Tailwind framework
                            </li>
                            <li>
                                <strong>Use case:</strong> Want full Tailwind + design system integration
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Tips */}
            <section>
                <Typography variant="h2" style={{ marginBottom: '24px', fontSize: '32px' }}>
                    💡 Tips & Best Practices
                </Typography>
                <div style={{ display: 'grid', gap: '16px' }}>
                    <div
                        style={{
                            padding: '20px',
                            backgroundColor: '#F0FDF4',
                            borderRadius: '8px',
                            borderLeft: '4px solid #10B981',
                        }}
                    >
                        <div style={{ fontWeight: '600', marginBottom: '8px', color: '#065F46' }}>✅ Mix and Match</div>
                        <div style={{ fontSize: '14px', color: '#047857' }}>
                            You can use pre-built components AND build custom ones with CSS variables or Tailwind utilities. They all use
                            the same design tokens.
                        </div>
                    </div>
                    <div
                        style={{
                            padding: '20px',
                            backgroundColor: '#FEF3C7',
                            borderRadius: '8px',
                            borderLeft: '4px solid #F59E0B',
                        }}
                    >
                        <div style={{ fontWeight: '600', marginBottom: '8px', color: '#92400E' }}>⚠️ Bundle Size</div>
                        <div style={{ fontSize: '14px', color: '#78350F' }}>
                            If you use Tailwind, enable PurgeCSS/tree-shaking to remove unused utilities in production.
                        </div>
                    </div>
                    <div
                        style={{
                            padding: '20px',
                            backgroundColor: '#DBEAFE',
                            borderRadius: '8px',
                            borderLeft: '4px solid #3B82F6',
                        }}
                    >
                        <div style={{ fontWeight: '600', marginBottom: '8px', color: '#1E40AF' }}>💡 @reference Directive</div>
                        <div style={{ fontSize: '14px', color: '#1E3A8A' }}>
                            When using @apply in CSS Modules with Tailwind, always add{' '}
                            <code style={{ backgroundColor: '#BFDBFE', padding: '2px 6px', borderRadius: '4px' }}>
                                @reference '../path/to/tailwind.css'
                            </code>{' '}
                            at the top of your CSS Module file.
                        </div>
                    </div>
                    <div
                        style={{
                            padding: '20px',
                            backgroundColor: '#F3E8FF',
                            borderRadius: '8px',
                            borderLeft: '4px solid #A855F7',
                        }}
                    >
                        <div style={{ fontWeight: '600', marginBottom: '8px', color: '#6B21A8' }}>🎨 Theming</div>
                        <div style={{ fontSize: '14px', color: '#7C3AED' }}>
                            All three methods support the ocean and forest themes. Just set{' '}
                            <code style={{ backgroundColor: '#E9D5FF', padding: '2px 6px', borderRadius: '4px' }}>data-theme="ocean"</code>{' '}
                            on your root element.
                        </div>
                    </div>
                </div>
            </section>
        </div>
    ),
};
