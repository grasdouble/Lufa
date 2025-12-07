import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { semantic } from '@grasdouble/lufa_design-system';

const meta = {
    title: '1. Foundation/Colors/Overview',
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Introduction: Story = {
    render: () => (
        <div style={{ padding: '20px', maxWidth: '900px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Color System Overview</h1>
            <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
                The Lufa Design System includes a comprehensive, accessible color system that follows WCAG 2.1 guidelines. All colors are
                designed to meet AAA accessibility standards when used as intended.
            </p>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '20px',
                    marginBottom: '40px',
                }}
            >
                <div
                    style={{
                        padding: '24px',
                        backgroundColor: '#F0FDF4',
                        borderRadius: '12px',
                        border: '1px solid #BBF7D0',
                    }}
                >
                    <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#15803D' }}>Semantic Colors</h3>
                    <p style={{ margin: 0, color: '#14532D', fontSize: '14px' }}>
                        Intent-based color tokens for consistent usage across your application. Use these for text, backgrounds, borders,
                        and interactive elements. This is the recommended approach.
                    </p>
                </div>

                <div
                    style={{
                        padding: '24px',
                        backgroundColor: '#EFF6FF',
                        borderRadius: '12px',
                        border: '1px solid #BFDBFE',
                    }}
                >
                    <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#1E40AF' }}>Primitive Colors</h3>
                    <p style={{ margin: 0, color: '#1E3A8A', fontSize: '14px' }}>
                        Internal base color values used to define semantic tokens. Not exposed in the public API, but documented here for
                        reference.
                    </p>
                </div>

                <div
                    style={{
                        padding: '24px',
                        backgroundColor: '#FFF7ED',
                        borderRadius: '12px',
                        border: '1px solid #FED7AA',
                    }}
                >
                    <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#C2410C' }}>Accessibility Tools</h3>
                    <p style={{ margin: 0, color: '#7C2D12', fontSize: '14px' }}>
                        Utilities to check contrast ratios and verify WCAG compliance. Use these to ensure your custom color combinations
                        are accessible.
                    </p>
                </div>
            </div>

            <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '16px' }}>Key Features</h2>
            <ul style={{ marginBottom: '32px', color: '#525252', lineHeight: '1.8' }}>
                <li>
                    <strong>WCAG 2.1 AAA Compliance:</strong> All semantic colors meet AAA accessibility standards (7:1 contrast ratio)
                </li>
                <li>
                    <strong>Semantic-First Approach:</strong> Intent-based naming for text, backgrounds, borders, interactive elements, and
                    status colors - no need to think about primitive values
                </li>
                <li>
                    <strong>Internal Primitives:</strong> 10 color palettes (Neutral, Blue, Green, Red, Orange, Yellow, Purple, Teal, Pink,
                    Indigo) used internally to define semantic tokens
                </li>
                <li>
                    <strong>Dark Mode Support:</strong> Built-in CSS variable overrides for dark themes
                </li>
                <li>
                    <strong>Accessibility Utilities:</strong> Functions to calculate contrast ratios and verify compliance
                </li>
                <li>
                    <strong>TypeScript Support:</strong> Full type safety for all color tokens
                </li>
            </ul>

            <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '16px' }}>Quick Start</h2>

            <div
                style={{
                    padding: '20px',
                    backgroundColor: '#FAFAFA',
                    borderRadius: '8px',
                    marginBottom: '24px',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                }}
            >
                <div style={{ marginBottom: '16px', color: '#737373' }}>{`// Import semantic colors`}</div>
                <div style={{ marginBottom: '8px' }}>
                    <span style={{ color: '#C678DD' }}>import</span> <span style={{ color: '#E06C75' }}>{'{ semantic }'}</span>{' '}
                    <span style={{ color: '#C678DD' }}>from</span>{' '}
                    <span style={{ color: '#98C379' }}>&apos;@grasdouble/lufa_design-system&apos;</span>
                    <span style={{ color: '#ABB2BF' }}>;</span>
                </div>
                <br />
                <div style={{ marginBottom: '16px', color: '#737373' }}>{`// Use semantic colors`}</div>
                <div style={{ marginBottom: '8px' }}>
                    <span style={{ color: '#C678DD' }}>const</span> button <span style={{ color: '#ABB2BF' }}>=</span>{' '}
                    <span style={{ color: '#ABB2BF' }}>{'{'}</span>
                </div>
                <div style={{ marginLeft: '20px', marginBottom: '8px' }}>
                    backgroundColor<span style={{ color: '#ABB2BF' }}>:</span> semantic
                    <span style={{ color: '#ABB2BF' }}>.</span>interactive
                    <span style={{ color: '#ABB2BF' }}>.</span>default
                    <span style={{ color: '#ABB2BF' }}>,</span>
                </div>
                <div style={{ marginLeft: '20px', marginBottom: '8px' }}>
                    color<span style={{ color: '#ABB2BF' }}>:</span> semantic
                    <span style={{ color: '#ABB2BF' }}>.</span>text
                    <span style={{ color: '#ABB2BF' }}>.</span>inverse
                </div>
                <div>
                    <span style={{ color: '#ABB2BF' }}>{'}'}</span>
                    <span style={{ color: '#ABB2BF' }}>;</span>
                </div>
            </div>

            <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '16px' }}>Navigation</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a
                    href="?path=/story/1-foundation-colors-semantic--overview"
                    style={{
                        padding: '16px',
                        backgroundColor: '#FFFFFF',
                        border: '2px solid #BBF7D0',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: '#171717',
                        display: 'block',
                    }}
                >
                    <strong style={{ color: '#15803D' }}>✨ Semantic Colors (Recommended) →</strong>
                    <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#737373' }}>
                        View intent-based color tokens - the public API
                    </p>
                </a>

                <a
                    href="?path=/story/1-foundation-colors-primitives-internal--all-primitives"
                    style={{
                        padding: '16px',
                        backgroundColor: '#FEF3C7',
                        border: '1px solid #FDE68A',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: '#171717',
                        display: 'block',
                    }}
                >
                    <strong style={{ color: '#92400E' }}>⚙️ Primitive Colors (Internal) →</strong>
                    <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#737373' }}>
                        Internal base colors - not exposed in public API
                    </p>
                </a>

                <a
                    href="?path=/story/0-design-system-colors-accessibility--contrast-checker"
                    style={{
                        padding: '16px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E5E5',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: '#171717',
                        display: 'block',
                    }}
                >
                    <strong style={{ color: '#2563EB' }}>Accessibility Tools →</strong>
                    <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#737373' }}>Check contrast ratios and WCAG compliance</p>
                </a>

                <a
                    href="?path=/docs/0-design-system-colors-usage-guide--docs"
                    style={{
                        padding: '16px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E5E5',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: '#171717',
                        display: 'block',
                    }}
                >
                    <strong style={{ color: '#2563EB' }}>Usage Guide →</strong>
                    <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#737373' }}>Learn how to use colors in your components</p>
                </a>
            </div>
        </div>
    ),
};

export const ComponentExamples: Story = {
    render: () => (
        <div style={{ padding: '20px', maxWidth: '1000px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Component Examples</h1>
            <p style={{ marginBottom: '32px', color: '#737373' }}>See how to use the color system in real components.</p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Buttons</h2>
            <div
                style={{
                    display: 'flex',
                    gap: '12px',
                    marginBottom: '40px',
                    flexWrap: 'wrap',
                }}
            >
                <button
                    style={{
                        backgroundColor: semantic.interactive.default,
                        color: semantic.text.inverse,
                        padding: '12px 24px',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '14px',
                    }}
                >
                    Primary Button
                </button>

                <button
                    style={{
                        backgroundColor: semantic.success.default,
                        color: semantic.text.inverse,
                        padding: '12px 24px',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '14px',
                    }}
                >
                    Success Button
                </button>

                <button
                    style={{
                        backgroundColor: semantic.error.default,
                        color: semantic.text.inverse,
                        padding: '12px 24px',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '14px',
                    }}
                >
                    Danger Button
                </button>

                <button
                    style={{
                        backgroundColor: semantic.background.primary,
                        color: semantic.text.primary,
                        padding: '12px 24px',
                        borderRadius: '6px',
                        border: `1px solid ${semantic.border.default}`,
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '14px',
                    }}
                >
                    Secondary Button
                </button>
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Alerts</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
                <div
                    style={{
                        backgroundColor: semantic.success.light,
                        color: semantic.success.text,
                        padding: '16px',
                        borderRadius: '8px',
                        borderLeft: `4px solid ${semantic.success.default}`,
                    }}
                >
                    <strong>Success:</strong> Your changes have been saved successfully!
                </div>

                <div
                    style={{
                        backgroundColor: semantic.info.light,
                        color: semantic.info.text,
                        padding: '16px',
                        borderRadius: '8px',
                        borderLeft: `4px solid ${semantic.info.default}`,
                    }}
                >
                    <strong>Info:</strong> New updates are available. Please refresh the page.
                </div>

                <div
                    style={{
                        backgroundColor: semantic.warning.light,
                        color: semantic.warning.text,
                        padding: '16px',
                        borderRadius: '8px',
                        borderLeft: `4px solid ${semantic.warning.default}`,
                    }}
                >
                    <strong>Warning:</strong> This action cannot be undone. Please proceed with caution.
                </div>

                <div
                    style={{
                        backgroundColor: semantic.error.light,
                        color: semantic.error.text,
                        padding: '16px',
                        borderRadius: '8px',
                        borderLeft: `4px solid ${semantic.error.default}`,
                    }}
                >
                    <strong>Error:</strong> Failed to save changes. Please try again.
                </div>
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Cards</h2>
            <div
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '40px' }}
            >
                <div
                    style={{
                        backgroundColor: semantic.surface.default,
                        border: `1px solid ${semantic.border.default}`,
                        borderRadius: '12px',
                        padding: '20px',
                        boxShadow: `0 4px 6px ${semantic.shadow.medium}`,
                    }}
                >
                    <h3 style={{ color: semantic.text.primary, marginBottom: '8px', fontSize: '18px' }}>Card Title</h3>
                    <p style={{ color: semantic.text.secondary, margin: '0 0 16px 0', fontSize: '14px' }}>
                        This is a card using semantic surface and text colors.
                    </p>
                    <button
                        style={{
                            backgroundColor: semantic.interactive.default,
                            color: semantic.text.inverse,
                            padding: '8px 16px',
                            borderRadius: '6px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '14px',
                        }}
                    >
                        Learn More
                    </button>
                </div>

                <div
                    style={{
                        backgroundColor: semantic.surface.raised,
                        border: `1px solid ${semantic.border.light}`,
                        borderRadius: '12px',
                        padding: '20px',
                        boxShadow: `0 4px 6px ${semantic.shadow.medium}`,
                    }}
                >
                    <h3 style={{ color: semantic.text.primary, marginBottom: '8px', fontSize: '18px' }}>Raised Surface</h3>
                    <p style={{ color: semantic.text.secondary, margin: '0 0 16px 0', fontSize: '14px' }}>
                        A slightly elevated surface for emphasis.
                    </p>
                    <button
                        style={{
                            backgroundColor: semantic.brand.secondary,
                            color: semantic.text.inverse,
                            padding: '8px 16px',
                            borderRadius: '6px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '14px',
                        }}
                    >
                        Action
                    </button>
                </div>
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Form Elements</h2>
            <div style={{ maxWidth: '400px' }}>
                <div style={{ marginBottom: '16px' }}>
                    <label
                        style={{
                            display: 'block',
                            color: semantic.text.primary,
                            fontWeight: '600',
                            marginBottom: '8px',
                            fontSize: '14px',
                        }}
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        style={{
                            width: '100%',
                            padding: '10px 12px',
                            border: `1px solid ${semantic.border.default}`,
                            borderRadius: '6px',
                            fontSize: '14px',
                            color: semantic.text.primary,
                            backgroundColor: semantic.background.primary,
                        }}
                    />
                    <p style={{ color: semantic.text.tertiary, fontSize: '12px', marginTop: '4px' }}>
                        We&apos;ll never share your email with anyone else.
                    </p>
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label
                        style={{
                            display: 'block',
                            color: semantic.text.primary,
                            fontWeight: '600',
                            marginBottom: '8px',
                            fontSize: '14px',
                        }}
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        style={{
                            width: '100%',
                            padding: '10px 12px',
                            border: `2px solid ${semantic.border.focus}`,
                            borderRadius: '6px',
                            fontSize: '14px',
                            color: semantic.text.primary,
                            backgroundColor: semantic.background.primary,
                            outline: 'none',
                        }}
                    />
                </div>

                <button
                    style={{
                        backgroundColor: semantic.interactive.default,
                        color: semantic.text.inverse,
                        padding: '12px 24px',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '14px',
                        width: '100%',
                    }}
                >
                    Submit
                </button>
            </div>
        </div>
    ),
};

export const DarkModeDemo: Story = {
    render: () => {
        const [isDark, setIsDark] = useState(false);

        return (
            <div data-theme={isDark ? 'dark' : 'light'} style={{ minHeight: '100vh' }}>
                <div style={{ padding: '20px', maxWidth: '800px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                        <h1 style={{ margin: 0 }}>Dark Mode Support</h1>
                        <button
                            onClick={() => setIsDark(!isDark)}
                            style={{
                                padding: '10px 20px',
                                borderRadius: '6px',
                                border: '1px solid var(--color-border-default)',
                                backgroundColor: 'var(--color-background-primary)',
                                color: 'var(--color-text-primary)',
                                cursor: 'pointer',
                                fontWeight: '600',
                            }}
                        >
                            Toggle {isDark ? 'Light' : 'Dark'} Mode
                        </button>
                    </div>

                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px' }}>
                        The color system automatically adapts to dark mode using CSS custom properties. Try toggling the theme to see how
                        all colors update.
                    </p>

                    <div
                        style={{
                            backgroundColor: 'var(--color-surface-default)',
                            padding: '24px',
                            borderRadius: '12px',
                            border: '1px solid var(--color-border-default)',
                            marginBottom: '24px',
                        }}
                    >
                        <h2 style={{ color: 'var(--color-text-primary)', marginBottom: '12px' }}>Sample Content</h2>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
                            This card uses CSS custom properties that automatically adapt to the theme.
                        </p>
                        <button
                            style={{
                                backgroundColor: 'var(--color-interactive-default)',
                                color: 'var(--color-text-inverse)',
                                padding: '10px 20px',
                                borderRadius: '6px',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: '600',
                            }}
                        >
                            Action Button
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div
                            style={{
                                backgroundColor: 'var(--color-success-light)',
                                color: 'var(--color-success-text)',
                                padding: '16px',
                                borderRadius: '8px',
                                borderLeft: '4px solid var(--color-success-default)',
                            }}
                        >
                            <strong>Success</strong>
                            <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>Adapts to theme</p>
                        </div>

                        <div
                            style={{
                                backgroundColor: 'var(--color-error-light)',
                                color: 'var(--color-error-text)',
                                padding: '16px',
                                borderRadius: '8px',
                                borderLeft: '4px solid var(--color-error-default)',
                            }}
                        >
                            <strong>Error</strong>
                            <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>Adapts to theme</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
};
