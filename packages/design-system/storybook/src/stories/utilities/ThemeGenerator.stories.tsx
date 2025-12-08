import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Button } from '@grasdouble/lufa_design-system';
import { Badge } from '@grasdouble/lufa_design-system';
import { Alert } from '@grasdouble/lufa_design-system';
import { Card } from '@grasdouble/lufa_design-system';
import { Input } from '@grasdouble/lufa_design-system';
import { getContrastRatio, meetsWCAG } from '@grasdouble/lufa_design-system';

const meta = {
    title: '8. Utilities/Theme Generator',
    parameters: {
        layout: 'fullscreen',
        controls: { disable: true },
    },
    tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

interface ThemeColors {
    name: string;
    interactive: string;
    text: string;
    background: string;
    success: string;
    warning: string;
    error: string;
}

const ColorPicker = ({
    label,
    value,
    onChange,
    helperText,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    helperText?: string;
}) => (
    <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '4px', fontWeight: '600', fontSize: '14px' }}>{label}</label>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    width: '60px',
                    height: '40px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '6px',
                    cursor: 'pointer',
                }}
            />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    flex: 1,
                    padding: '8px 12px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '6px',
                    fontFamily: 'monospace',
                }}
            />
        </div>
        {helperText && <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#737373' }}>{helperText}</p>}
    </div>
);

const ContrastChecker = ({ foreground, background }: { foreground: string; background: string }) => {
    const ratio = getContrastRatio(foreground, background);
    const meetsAA = meetsWCAG(foreground, background, 'AA');
    const meetsAAA = meetsWCAG(foreground, background, 'AAA');

    return (
        <div
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                background: meetsAAA ? '#ecfdf5' : meetsAA ? '#fef3c7' : '#fee2e2',
                color: meetsAAA ? '#065f46' : meetsAA ? '#92400e' : '#991b1b',
            }}
        >
            <span style={{ fontWeight: '600' }}>{ratio.toFixed(2)}:1</span>
            <span>{meetsAAA ? '✓ AAA' : meetsAA ? '✓ AA' : '✗ Fail'}</span>
        </div>
    );
};

const ComponentPreview: React.FC<{ colors: ThemeColors }> = ({ colors }) => {
    // Dynamically inject CSS variables into document root for live preview
    React.useEffect(() => {
        const styleId = 'theme-generator-preview-styles';
        let styleElement = document.getElementById(styleId) as HTMLStyleElement;

        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = styleId;
            document.head.appendChild(styleElement);
        }

        // Helper functions for color manipulation
        const darken = (hex: string, amount: number) => {
            const num = parseInt(hex.replace('#', ''), 16);
            const r = Math.max(0, ((num >> 16) & 0xff) - amount);
            const g = Math.max(0, ((num >> 8) & 0xff) - amount);
            const b = Math.max(0, (num & 0xff) - amount);
            return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
        };

        const lighten = (hex: string, amount: number) => {
            const num = parseInt(hex.replace('#', ''), 16);
            const r = Math.min(255, ((num >> 16) & 0xff) + amount);
            const g = Math.min(255, ((num >> 8) & 0xff) + amount);
            const b = Math.min(255, (num & 0xff) + amount);
            return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
        };

        // Generate all CSS variables with computed variants
        styleElement.textContent = `:root {
            /* Text colors */
            --color-text-primary: ${colors.text};
            --color-text-secondary: ${lighten(colors.text, 30)};
            --color-text-tertiary: ${lighten(colors.text, 50)};
            --color-text-disabled: #94a3b8;
            --color-text-inverse: ${colors.background};
            --color-text-link: ${colors.interactive};
            --color-text-linkHover: ${darken(colors.interactive, 30)};

            /* Background colors */
            --color-background-primary: ${colors.background};
            --color-background-secondary: ${darken(colors.background, 5)};
            --color-background-tertiary: ${darken(colors.background, 10)};
            --color-background-inverse: ${colors.text};
            --color-background-overlay: rgba(${parseInt(colors.text.slice(1, 3), 16)}, ${parseInt(colors.text.slice(3, 5), 16)}, ${parseInt(colors.text.slice(5, 7), 16)}, 0.5);

            /* Border colors */
            --color-border-default: ${lighten(colors.text, 150)};
            --color-border-light: ${lighten(colors.text, 180)};
            --color-border-medium: ${lighten(colors.text, 120)};
            --color-border-strong: ${colors.interactive};
            --color-border-focus: ${colors.interactive};

            /* Interactive colors */
            --color-interactive-default: ${colors.interactive};
            --color-interactive-hover: ${darken(colors.interactive, 20)};
            --color-interactive-active: ${darken(colors.interactive, 40)};
            --color-interactive-disabled: #cbd5e1;
            --color-interactive-focus: ${colors.interactive};

            /* Success colors */
            --color-success-default: ${colors.success};
            --color-success-hover: ${darken(colors.success, 20)};
            --color-success-active: ${darken(colors.success, 40)};
            --color-success-light: ${lighten(colors.success, 200)};
            --color-success-lighter: ${lighten(colors.success, 220)};
            --color-success-border: ${lighten(colors.success, 100)};
            --color-success-text: ${darken(colors.success, 20)};

            /* Warning colors */
            --color-warning-default: ${colors.warning};
            --color-warning-hover: ${darken(colors.warning, 20)};
            --color-warning-active: ${darken(colors.warning, 40)};
            --color-warning-light: ${lighten(colors.warning, 200)};
            --color-warning-lighter: ${lighten(colors.warning, 220)};
            --color-warning-border: ${lighten(colors.warning, 100)};
            --color-warning-text: ${darken(colors.warning, 20)};

            /* Error colors */
            --color-error-default: ${colors.error};
            --color-error-hover: ${darken(colors.error, 20)};
            --color-error-active: ${darken(colors.error, 40)};
            --color-error-light: ${lighten(colors.error, 200)};
            --color-error-lighter: ${lighten(colors.error, 220)};
            --color-error-border: ${lighten(colors.error, 100)};
            --color-error-text: ${darken(colors.error, 20)};

            /* Info colors */
            --color-info-default: ${colors.interactive};
            --color-info-hover: ${darken(colors.interactive, 20)};
            --color-info-active: ${darken(colors.interactive, 40)};
            --color-info-light: ${lighten(colors.interactive, 200)};
            --color-info-lighter: ${lighten(colors.interactive, 220)};
            --color-info-border: ${lighten(colors.interactive, 100)};
            --color-info-text: ${darken(colors.interactive, 20)};

            /* Brand colors */
            --color-brand-primary: ${colors.interactive};
            --color-brand-primaryHover: ${darken(colors.interactive, 20)};
            --color-brand-primaryActive: ${darken(colors.interactive, 40)};

            /* Surface colors */
            --color-surface-default: ${colors.background};
            --color-surface-raised: ${darken(colors.background, 5)};
            --color-surface-overlay: ${darken(colors.background, 10)};
            --color-surface-inverse: ${colors.text};
        }`;

        return () => {
            // Cleanup style element on unmount
            if (styleElement && styleElement.parentNode) {
                styleElement.parentNode.removeChild(styleElement);
            }
        };
    }, [colors]);

    return (
        <div>
            <div style={{ marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#171717' }}>Buttons</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <Button color="primary" size="medium">
                        Primary Button
                    </Button>
                    <Button color="secondary" size="medium">
                        Secondary
                    </Button>
                    <Button color="danger" size="medium">
                        Danger
                    </Button>
                </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#171717' }}>Badges</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="danger">Error</Badge>
                    <Badge variant="info">Info</Badge>
                </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#171717' }}>Alerts</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Alert variant="success" title="Success">
                        Your changes have been saved successfully.
                    </Alert>
                    <Alert variant="warning" title="Warning">
                        This action cannot be undone.
                    </Alert>
                    <Alert variant="error" title="Error">
                        An error occurred while processing your request.
                    </Alert>
                </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#171717' }}>Card & Input</h3>
                <Card>
                    <div style={{ marginBottom: '16px' }}>
                        <h4 style={{ marginBottom: '8px', fontSize: '16px', fontWeight: '600' }}>Example Form</h4>
                        <p style={{ marginBottom: '16px', color: '#737373', fontSize: '14px' }}>
                            This is how your theme looks in a card component.
                        </p>
                    </div>
                    <Input placeholder="Enter your email" type="email" />
                </Card>
            </div>
        </div>
    );
};

const generateThemeCSS = (colors: ThemeColors): string => {
    const darken = (hex: string, amount: number) => {
        const num = parseInt(hex.replace('#', ''), 16);
        const r = Math.max(0, ((num >> 16) & 0xff) - amount);
        const g = Math.max(0, ((num >> 8) & 0xff) - amount);
        const b = Math.max(0, (num & 0xff) - amount);
        return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
    };

    const lighten = (hex: string, amount: number) => {
        const num = parseInt(hex.replace('#', ''), 16);
        const r = Math.min(255, ((num >> 16) & 0xff) + amount);
        const g = Math.min(255, ((num >> 8) & 0xff) + amount);
        const b = Math.min(255, (num & 0xff) + amount);
        return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
    };

    const cssVarName = colors.name.toLowerCase().replace(/\s+/g, '-');

    return `:root[data-theme='${cssVarName}'] {
    /* Text colors */
    --color-text-primary: ${colors.text};
    --color-text-secondary: ${lighten(colors.text, 30)};
    --color-text-tertiary: ${lighten(colors.text, 50)};
    --color-text-disabled: #94a3b8;
    --color-text-inverse: ${colors.background};
    --color-text-link: ${colors.interactive};
    --color-text-linkHover: ${darken(colors.interactive, 30)};

    /* Background colors */
    --color-background-primary: ${colors.background};
    --color-background-secondary: ${darken(colors.background, 5)};
    --color-background-tertiary: ${darken(colors.background, 10)};
    --color-background-inverse: ${colors.text};
    --color-background-overlay: rgba(${parseInt(colors.text.slice(1, 3), 16)}, ${parseInt(colors.text.slice(3, 5), 16)}, ${parseInt(colors.text.slice(5, 7), 16)}, 0.5);

    /* Border colors */
    --color-border-default: ${lighten(colors.text, 150)};
    --color-border-light: ${lighten(colors.text, 180)};
    --color-border-medium: ${lighten(colors.text, 120)};
    --color-border-strong: ${colors.interactive};
    --color-border-focus: ${colors.interactive};

    /* Interactive colors */
    --color-interactive-default: ${colors.interactive};
    --color-interactive-hover: ${darken(colors.interactive, 20)};
    --color-interactive-active: ${darken(colors.interactive, 40)};
    --color-interactive-disabled: #cbd5e1;
    --color-interactive-focus: ${colors.interactive};

    /* Success colors */
    --color-success-default: ${colors.success};
    --color-success-hover: ${darken(colors.success, 20)};
    --color-success-active: ${darken(colors.success, 40)};
    --color-success-light: ${lighten(colors.success, 200)};
    --color-success-lighter: ${lighten(colors.success, 220)};
    --color-success-border: ${lighten(colors.success, 100)};
    --color-success-text: ${darken(colors.success, 20)};

    /* Warning colors */
    --color-warning-default: ${colors.warning};
    --color-warning-hover: ${darken(colors.warning, 20)};
    --color-warning-active: ${darken(colors.warning, 40)};
    --color-warning-light: ${lighten(colors.warning, 200)};
    --color-warning-lighter: ${lighten(colors.warning, 220)};
    --color-warning-border: ${lighten(colors.warning, 100)};
    --color-warning-text: ${darken(colors.warning, 20)};

    /* Error colors */
    --color-error-default: ${colors.error};
    --color-error-hover: ${darken(colors.error, 20)};
    --color-error-active: ${darken(colors.error, 40)};
    --color-error-light: ${lighten(colors.error, 200)};
    --color-error-lighter: ${lighten(colors.error, 220)};
    --color-error-border: ${lighten(colors.error, 100)};
    --color-error-text: ${darken(colors.error, 20)};

    /* Info colors */
    --color-info-default: ${colors.interactive};
    --color-info-hover: ${darken(colors.interactive, 20)};
    --color-info-active: ${darken(colors.interactive, 40)};
    --color-info-light: ${lighten(colors.interactive, 200)};
    --color-info-lighter: ${lighten(colors.interactive, 220)};
    --color-info-border: ${lighten(colors.interactive, 100)};
    --color-info-text: ${darken(colors.interactive, 20)};

    /* Brand colors */
    --color-brand-primary: ${colors.interactive};
    --color-brand-primaryHover: ${darken(colors.interactive, 20)};
    --color-brand-primaryActive: ${darken(colors.interactive, 40)};

    /* Surface colors */
    --color-surface-default: ${colors.background};
    --color-surface-raised: ${darken(colors.background, 5)};
    --color-surface-overlay: ${darken(colors.background, 10)};
    --color-surface-inverse: ${colors.text};
}`;
};

export const Generator: Story = {
    render: () => {
        const [colors, setColors] = useState<ThemeColors>({
            name: 'Custom Theme',
            interactive: '#6366f1',
            text: '#1e293b',
            background: '#ffffff',
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444',
        });

        const [showCSS, setShowCSS] = useState(false);
        const cssCode = generateThemeCSS(colors);

        const copyToClipboard = () => {
            navigator.clipboard.writeText(cssCode);
            alert('CSS copied to clipboard!');
        };

        return (
            <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
                {/* Left Panel - Color Picker */}
                <div
                    style={{
                        width: '400px',
                        padding: '24px',
                        borderRight: '1px solid #e5e5e5',
                        overflowY: 'auto',
                        background: '#fafafa',
                    }}
                >
                    <h1 style={{ marginBottom: '8px', fontSize: '24px', fontWeight: '700' }}>Theme Generator</h1>
                    <p style={{ marginBottom: '24px', color: '#737373', fontSize: '14px' }}>
                        Create custom themes by selecting colors. The system will automatically generate hover states and variants.
                    </p>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', marginBottom: '4px', fontWeight: '600', fontSize: '14px' }}>Theme Name</label>
                        <input
                            type="text"
                            value={colors.name}
                            onChange={(e) => setColors({ ...colors, name: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '8px 12px',
                                border: '1px solid #e5e5e5',
                                borderRadius: '6px',
                            }}
                        />
                    </div>

                    <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e5e5e5' }}>
                        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Base Colors</h3>

                        <ColorPicker
                            label="Interactive Color"
                            value={colors.interactive}
                            onChange={(v) => setColors({ ...colors, interactive: v })}
                            helperText="Primary buttons, links, focus states"
                        />
                        <ContrastChecker foreground={colors.interactive} background={colors.background} />

                        <div style={{ marginTop: '16px' }}>
                            <ColorPicker
                                label="Text Color"
                                value={colors.text}
                                onChange={(v) => setColors({ ...colors, text: v })}
                                helperText="Main text, headings"
                            />
                            <ContrastChecker foreground={colors.text} background={colors.background} />
                        </div>

                        <div style={{ marginTop: '16px' }}>
                            <ColorPicker
                                label="Background Color"
                                value={colors.background}
                                onChange={(v) => setColors({ ...colors, background: v })}
                                helperText="Page background, cards"
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e5e5e5' }}>
                        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Status Colors</h3>

                        <ColorPicker label="Success" value={colors.success} onChange={(v) => setColors({ ...colors, success: v })} />
                        <ContrastChecker foreground={colors.success} background={colors.background} />

                        <div style={{ marginTop: '16px' }}>
                            <ColorPicker label="Warning" value={colors.warning} onChange={(v) => setColors({ ...colors, warning: v })} />
                            <ContrastChecker foreground={colors.warning} background={colors.background} />
                        </div>

                        <div style={{ marginTop: '16px' }}>
                            <ColorPicker label="Error" value={colors.error} onChange={(v) => setColors({ ...colors, error: v })} />
                            <ContrastChecker foreground={colors.error} background={colors.background} />
                        </div>
                    </div>

                    <div style={{ marginTop: '32px', display: 'flex', gap: '8px' }}>
                        <button
                            onClick={() => setShowCSS(!showCSS)}
                            style={{
                                flex: 1,
                                padding: '12px',
                                background: '#171717',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontWeight: '600',
                                cursor: 'pointer',
                            }}
                        >
                            {showCSS ? 'Hide' : 'Show'} CSS
                        </button>
                        <button
                            onClick={copyToClipboard}
                            style={{
                                flex: 1,
                                padding: '12px',
                                background: colors.interactive,
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontWeight: '600',
                                cursor: 'pointer',
                            }}
                        >
                            Copy CSS
                        </button>
                    </div>
                </div>

                {/* Right Panel - Preview or CSS */}
                <div style={{ flex: 1, overflowY: 'auto' }}>
                    {showCSS ? (
                        <div style={{ padding: '24px' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '16px',
                                }}
                            >
                                <h2 style={{ fontSize: '20px', fontWeight: '600' }}>Generated CSS</h2>
                                <p style={{ color: '#737373', fontSize: '14px' }}>
                                    Save this as{' '}
                                    <code style={{ background: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>
                                        {colors.name.toLowerCase().replace(/\s+/g, '-')}.css
                                    </code>
                                </p>
                            </div>
                            <pre
                                style={{
                                    background: '#1e293b',
                                    color: '#e2e8f0',
                                    padding: '20px',
                                    borderRadius: '8px',
                                    overflow: 'auto',
                                    fontSize: '13px',
                                    lineHeight: '1.6',
                                    fontFamily: 'monospace',
                                }}
                            >
                                {cssCode}
                            </pre>
                        </div>
                    ) : (
                        <div style={{ padding: '24px' }}>
                            <h2 style={{ marginBottom: '8px', fontSize: '20px', fontWeight: '600' }}>Live Preview</h2>
                            <p style={{ marginBottom: '24px', color: '#737373', fontSize: '14px' }}>
                                See how your theme looks with real components. Adjust colors in the left panel to see changes instantly.
                            </p>
                            <ComponentPreview colors={colors} />
                        </div>
                    )}
                </div>
            </div>
        );
    },
};
