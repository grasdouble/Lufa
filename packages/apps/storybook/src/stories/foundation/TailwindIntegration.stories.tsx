import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
    title: '1. Foundation/Tailwind Integration',
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
    render: () => (
        <div style={{ padding: '40px', maxWidth: '900px', fontFamily: 'system-ui, sans-serif' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>Tailwind + Foundation Integration</h1>
            <p style={{ fontSize: '18px', color: '#737373', marginBottom: '40px', lineHeight: 1.6 }}>
                Our design system uses Tailwind v4's <code>@theme</code> directive to expose foundation tokens as semantic Tailwind
                utilities. This provides a single source of truth while maintaining Tailwind's developer experience.
            </p>

            {/* Key Benefits */}
            <section style={{ marginBottom: '48px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>✨ Key Benefits</h2>
                <div
                    style={{
                        display: 'grid',
                        gap: '16px',
                    }}
                >
                    {[
                        {
                            title: 'Single Source of Truth',
                            desc: 'Foundation tokens control all Tailwind utilities',
                        },
                        {
                            title: 'Semantic Naming',
                            desc: 'Use p-base, m-xl, bg-interactive-default instead of arbitrary numbers',
                        },
                        {
                            title: 'Automatic Updates',
                            desc: 'Change foundation tokens, Tailwind utilities update automatically',
                        },
                        {
                            title: 'Full Tailwind Power',
                            desc: 'All responsive, state, and dark mode modifiers work perfectly',
                        },
                    ].map((benefit, i) => (
                        <div
                            key={i}
                            style={{
                                padding: '20px',
                                backgroundColor: '#F9FAFB',
                                borderRadius: '8px',
                                border: '1px solid #E5E7EB',
                            }}
                        >
                            <div style={{ fontWeight: '600', marginBottom: '8px' }}>{benefit.title}</div>
                            <div style={{ fontSize: '14px', color: '#6B7280' }}>{benefit.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Architecture */}
            <section style={{ marginBottom: '48px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>🏗️ How It Works</h2>
                <div
                    style={{
                        padding: '24px',
                        backgroundColor: '#F9FAFB',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                    }}
                >
                    <div style={{ fontFamily: 'monospace', fontSize: '14px', lineHeight: 2 }}>
                        <div>
                            <strong>TypeScript tokens</strong> (foundation/*.ts)
                        </div>
                        <div style={{ marginLeft: '20px', color: '#6B7280' }}>↓ generation scripts</div>
                        <div>
                            <strong>CSS variables</strong> (foundation/*.css)
                        </div>
                        <div style={{ marginLeft: '20px', color: '#6B7280' }}>↓ @theme directive</div>
                        <div>
                            <strong>Tailwind utilities</strong> (p-base, rounded-lg, text-primary)
                        </div>
                        <div style={{ marginLeft: '20px', color: '#6B7280' }}>↓</div>
                        <div>
                            <strong>Your components</strong>
                        </div>
                    </div>
                </div>
            </section>

            {/* Spacing Examples */}
            <section style={{ marginBottom: '48px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>📏 Spacing Utilities</h2>
                <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '16px' }}>Use semantic names instead of arbitrary numbers:</p>
                <div
                    style={{
                        padding: '20px',
                        backgroundColor: '#1F2937',
                        borderRadius: '8px',
                        color: '#F9FAFB',
                        fontFamily: 'monospace',
                        fontSize: '14px',
                        marginBottom: '16px',
                    }}
                >
                    <div style={{ color: '#6EE7B7' }}>// Before (arbitrary numbers)</div>
                    <div>
                        <span style={{ color: '#F87171' }}>className</span>=<span style={{ color: '#FCD34D' }}>"p-4 m-6 gap-2"</span>
                    </div>
                    <br />
                    <div style={{ color: '#6EE7B7' }}>// After (semantic names) ✨</div>
                    <div>
                        <span style={{ color: '#F87171' }}>className</span>=<span style={{ color: '#FCD34D' }}>"p-base m-xl gap-sm"</span>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                    {[
                        { name: 'p-sm', value: '8px' },
                        { name: 'p-base', value: '16px' },
                        { name: 'p-lg', value: '20px' },
                        { name: 'p-xl', value: '24px' },
                        { name: 'p-2xl', value: '32px' },
                        { name: 'p-3xl', value: '40px' },
                    ].map((item) => (
                        <div
                            key={item.name}
                            style={{
                                padding: '12px',
                                backgroundColor: '#EFF6FF',
                                borderRadius: '6px',
                                fontSize: '14px',
                                border: '1px solid #DBEAFE',
                            }}
                        >
                            <code style={{ fontWeight: '600', color: '#1E40AF' }}>{item.name}</code>
                            <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>{item.value}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Color Examples */}
            <section style={{ marginBottom: '48px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>🎨 Semantic Colors</h2>
                <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '16px' }}>Intent-based color utilities for consistency:</p>
                <div
                    style={{
                        padding: '20px',
                        backgroundColor: '#1F2937',
                        borderRadius: '8px',
                        color: '#F9FAFB',
                        fontFamily: 'monospace',
                        fontSize: '14px',
                        marginBottom: '16px',
                    }}
                >
                    <div style={{ color: '#6EE7B7' }}>// Before (primitive colors)</div>
                    <div>
                        <span style={{ color: '#F87171' }}>className</span>=
                        <span style={{ color: '#FCD34D' }}>"bg-blue-600 text-white border-gray-300"</span>
                    </div>
                    <br />
                    <div style={{ color: '#6EE7B7' }}>// After (semantic colors) ✨</div>
                    <div>
                        <span style={{ color: '#F87171' }}>className</span>=
                        <span style={{ color: '#FCD34D' }}>"bg-interactive-default text-white border-border-default"</span>
                    </div>
                </div>

                <div style={{ display: 'grid', gap: '12px' }}>
                    {[
                        { name: 'bg-interactive-default', color: '#3B82F6', desc: 'Primary interactive elements' },
                        { name: 'bg-success-light', color: '#DCFCE7', desc: 'Success backgrounds' },
                        { name: 'bg-warning-light', color: '#FEF3C7', desc: 'Warning backgrounds' },
                        { name: 'bg-error-light', color: '#FEE2E2', desc: 'Error backgrounds' },
                        { name: 'text-text-primary', color: '#171717', desc: 'Main text color' },
                        { name: 'border-border-default', color: '#D4D4D4', desc: 'Default borders' },
                    ].map((item) => (
                        <div
                            key={item.name}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                padding: '12px',
                                backgroundColor: '#F9FAFB',
                                borderRadius: '6px',
                                border: '1px solid #E5E7EB',
                            }}
                        >
                            <div
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: item.color,
                                    borderRadius: '6px',
                                    border: '1px solid #E5E7EB',
                                }}
                            />
                            <div style={{ flex: 1 }}>
                                <code style={{ fontWeight: '600', fontSize: '14px' }}>{item.name}</code>
                                <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>{item.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Component Example */}
            <section style={{ marginBottom: '48px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>💡 Complete Component Example</h2>
                <div
                    style={{
                        padding: '20px',
                        backgroundColor: '#1F2937',
                        borderRadius: '8px',
                        color: '#F9FAFB',
                        fontFamily: 'monospace',
                        fontSize: '13px',
                        lineHeight: 1.6,
                    }}
                >
                    <div style={{ color: '#6EE7B7' }}>// Button.module.css</div>
                    <div>
                        <span style={{ color: '#F87171' }}>.button</span> {'{'}
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                        <span style={{ color: '#FCD34D' }}>@apply</span> inline-flex items-center justify-center;
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                        <span style={{ color: '#6EE7B7' }}>/* Semantic spacing from foundation */</span>
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                        <span style={{ color: '#FCD34D' }}>@apply</span> px-base py-sm gap-sm;
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                        <span style={{ color: '#6EE7B7' }}>/* Semantic radius and typography */</span>
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                        <span style={{ color: '#FCD34D' }}>@apply</span> rounded-lg text-base font-medium;
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                        <span style={{ color: '#6EE7B7' }}>/* Semantic colors with states */</span>
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                        <span style={{ color: '#FCD34D' }}>@apply</span> bg-interactive-default text-white;
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                        <span style={{ color: '#FCD34D' }}>@apply</span> hover:bg-interactive-hover;
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                        <span style={{ color: '#FCD34D' }}>@apply</span> shadow-md hover:shadow-lg;
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                        <span style={{ color: '#FCD34D' }}>@apply</span> transition-all duration-200;
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                        <span style={{ color: '#6EE7B7' }}>/* Z-index requires CSS variable */</span>
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                        <span style={{ color: '#93C5FD' }}>z-index</span>: <span style={{ color: '#FCD34D' }}>var(--z-index-elevated)</span>
                        ;
                    </div>
                    <div>{'}'}</div>
                </div>
            </section>

            {/* Quick Reference */}
            <section style={{ marginBottom: '48px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>📚 Quick Reference</h2>
                <div
                    style={{
                        padding: '20px',
                        backgroundColor: '#FEF3C7',
                        borderRadius: '8px',
                        border: '1px solid #FDE68A',
                    }}
                >
                    <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>🎯 When to Use Tailwind Utilities</h3>
                    <ul style={{ fontSize: '14px', lineHeight: 1.8, paddingLeft: '20px', color: '#78350F' }}>
                        <li>Standard spacing, sizing, colors from foundation</li>
                        <li>Need responsive variants (md:, lg:, etc.)</li>
                        <li>Need state modifiers (hover:, focus:, etc.)</li>
                        <li>Quick prototyping with familiar syntax</li>
                    </ul>
                </div>

                <div
                    style={{
                        marginTop: '16px',
                        padding: '20px',
                        backgroundColor: '#DBEAFE',
                        borderRadius: '8px',
                        border: '1px solid #BFDBFE',
                    }}
                >
                    <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>🎯 When to Use CSS Variables</h3>
                    <ul style={{ fontSize: '14px', lineHeight: 1.8, paddingLeft: '20px', color: '#1E3A8A' }}>
                        <li>Z-index stacking (var(--z-index-modal))</li>
                        <li>Custom calculations (calc(var(--spacing-base) * 2))</li>
                        <li>Typography presets (var(--typography-h1-*))</li>
                        <li>Complex custom styles outside Tailwind's system</li>
                    </ul>
                </div>
            </section>

            {/* Documentation Links */}
            <section>
                <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>📖 Documentation</h2>
                <div style={{ display: 'grid', gap: '12px' }}>
                    <a
                        href="https://github.com/grasdouble/Lufa/blob/main/packages/design-system/docs/TAILWIND_WITH_FOUNDATION.md"
                        style={{
                            padding: '16px',
                            backgroundColor: '#F9FAFB',
                            borderRadius: '8px',
                            border: '1px solid #E5E7EB',
                            textDecoration: 'none',
                            color: '#111827',
                            display: 'block',
                        }}
                    >
                        <div style={{ fontWeight: '600', marginBottom: '4px' }}>📘 TAILWIND_WITH_FOUNDATION.md</div>
                        <div style={{ fontSize: '14px', color: '#6B7280' }}>
                            Complete guide to using Tailwind utilities with foundation tokens
                        </div>
                    </a>
                    <a
                        href="https://github.com/grasdouble/Lufa/blob/main/packages/design-system/docs/USING_CSS_VARIABLES.md"
                        style={{
                            padding: '16px',
                            backgroundColor: '#F9FAFB',
                            borderRadius: '8px',
                            border: '1px solid #E5E7EB',
                            textDecoration: 'none',
                            color: '#111827',
                            display: 'block',
                        }}
                    >
                        <div style={{ fontWeight: '600', marginBottom: '4px' }}>📘 USING_CSS_VARIABLES.md</div>
                        <div style={{ fontSize: '14px', color: '#6B7280' }}>Guide for using CSS variables directly in components</div>
                    </a>
                    <a
                        href="https://github.com/grasdouble/Lufa/blob/main/packages/design-system/docs/CSS_VARIABLES_INTEGRATION.md"
                        style={{
                            padding: '16px',
                            backgroundColor: '#F9FAFB',
                            borderRadius: '8px',
                            border: '1px solid #E5E7EB',
                            textDecoration: 'none',
                            color: '#111827',
                            display: 'block',
                        }}
                    >
                        <div style={{ fontWeight: '600', marginBottom: '4px' }}>📘 CSS_VARIABLES_INTEGRATION.md</div>
                        <div style={{ fontSize: '14px', color: '#6B7280' }}>Technical overview of CSS variables integration</div>
                    </a>
                </div>
            </section>
        </div>
    ),
};
