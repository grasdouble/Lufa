import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
    getContrastRatio,
    meetsWCAG,
    getContrastLevel,
    getSuggestedTextColor,
    WCAG_STANDARDS,
    accessibility,
} from '@grasdouble/lufa_design-system';

const meta = {
    title: '0. Design System/Colors/Accessibility',
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type ColorPair = {
    foreground: string;
    background: string;
    ratio: number;
};

export const ContrastChecker: Story = {
    render: () => {
        const [foreground, setForeground] = useState('#2563EB');
        const [background, setBackground] = useState('#FFFFFF');

        const ratio = getContrastRatio(foreground, background);
        const meetsAA = meetsWCAG(foreground, background, 'AA');
        const meetsAAA = meetsWCAG(foreground, background, 'AAA');
        const meetsAALarge = meetsWCAG(foreground, background, 'AA', true);
        const meetsAAALarge = meetsWCAG(foreground, background, 'AAA', true);
        const level = getContrastLevel(ratio);

        return (
            <div style={{ padding: '20px', maxWidth: '800px' }}>
                <h1 style={{ marginBottom: '16px' }}>Contrast Ratio Checker</h1>
                <p style={{ marginBottom: '32px', color: '#737373' }}>
                    Check if your color combinations meet WCAG 2.1 accessibility standards.
                </p>

                <div style={{ display: 'flex', gap: '24px', marginBottom: '32px', flexWrap: 'wrap' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Foreground Color</label>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <input
                                type="color"
                                value={foreground}
                                onChange={(e) => setForeground(e.target.value)}
                                style={{ width: '60px', height: '40px', cursor: 'pointer' }}
                            />
                            <input
                                type="text"
                                value={foreground}
                                onChange={(e) => setForeground(e.target.value)}
                                style={{
                                    padding: '8px 12px',
                                    border: '1px solid #D4D4D4',
                                    borderRadius: '6px',
                                    fontFamily: 'monospace',
                                    width: '120px',
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Background Color</label>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <input
                                type="color"
                                value={background}
                                onChange={(e) => setBackground(e.target.value)}
                                style={{ width: '60px', height: '40px', cursor: 'pointer' }}
                            />
                            <input
                                type="text"
                                value={background}
                                onChange={(e) => setBackground(e.target.value)}
                                style={{
                                    padding: '8px 12px',
                                    border: '1px solid #D4D4D4',
                                    borderRadius: '6px',
                                    fontFamily: 'monospace',
                                    width: '120px',
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        backgroundColor: background,
                        padding: '40px',
                        borderRadius: '12px',
                        border: '1px solid #E5E5E5',
                        marginBottom: '32px',
                    }}
                >
                    <h2 style={{ color: foreground, marginBottom: '16px' }}>Preview Heading</h2>
                    <p style={{ color: foreground, fontSize: '16px', marginBottom: '12px' }}>
                        This is regular text at 16px. It needs a contrast ratio of at least 4.5:1 for WCAG AA or 7:1 for WCAG AAA.
                    </p>
                    <p style={{ color: foreground, fontSize: '24px', fontWeight: '600' }}>
                        This is large text at 24px bold. It needs 3:1 for AA or 4.5:1 for AAA.
                    </p>
                </div>

                <div
                    style={{
                        padding: '24px',
                        backgroundColor: '#F5F5F5',
                        borderRadius: '12px',
                        marginBottom: '24px',
                    }}
                >
                    <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>Results</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                        <div
                            style={{
                                padding: '16px',
                                backgroundColor: '#FFFFFF',
                                borderRadius: '8px',
                            }}
                        >
                            <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '4px' }}>{ratio.toFixed(2)}:1</div>
                            <div style={{ color: '#737373', fontSize: '14px' }}>Contrast Ratio</div>
                        </div>

                        <div
                            style={{
                                padding: '16px',
                                backgroundColor: '#FFFFFF',
                                borderRadius: '8px',
                            }}
                        >
                            <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>{level}</div>
                            <div style={{ color: '#737373', fontSize: '14px' }}>Level</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '12px',
                                backgroundColor: '#FFFFFF',
                                borderRadius: '6px',
                            }}
                        >
                            <span>WCAG AA (Normal Text - 4.5:1)</span>
                            <span
                                style={{
                                    fontWeight: '600',
                                    color: meetsAA ? '#16A34A' : '#DC2626',
                                }}
                            >
                                {meetsAA ? '✓ Pass' : '✗ Fail'}
                            </span>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '12px',
                                backgroundColor: '#FFFFFF',
                                borderRadius: '6px',
                            }}
                        >
                            <span>WCAG AAA (Normal Text - 7:1)</span>
                            <span
                                style={{
                                    fontWeight: '600',
                                    color: meetsAAA ? '#16A34A' : '#DC2626',
                                }}
                            >
                                {meetsAAA ? '✓ Pass' : '✗ Fail'}
                            </span>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '12px',
                                backgroundColor: '#FFFFFF',
                                borderRadius: '6px',
                            }}
                        >
                            <span>WCAG AA (Large Text - 3:1)</span>
                            <span
                                style={{
                                    fontWeight: '600',
                                    color: meetsAALarge ? '#16A34A' : '#DC2626',
                                }}
                            >
                                {meetsAALarge ? '✓ Pass' : '✗ Fail'}
                            </span>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '12px',
                                backgroundColor: '#FFFFFF',
                                borderRadius: '6px',
                            }}
                        >
                            <span>WCAG AAA (Large Text - 4.5:1)</span>
                            <span
                                style={{
                                    fontWeight: '600',
                                    color: meetsAAALarge ? '#16A34A' : '#DC2626',
                                }}
                            >
                                {meetsAAALarge ? '✓ Pass' : '✗ Fail'}
                            </span>
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        padding: '16px',
                        backgroundColor: '#EFF6FF',
                        borderRadius: '8px',
                        borderLeft: '4px solid #2563EB',
                    }}
                >
                    <strong>Tip:</strong> Large text is defined as 18pt (24px) or larger, or 14pt (18.66px) or larger when bold.
                </div>
            </div>
        );
    },
};

export const AccessiblePairs: Story = {
    render: () => (
        <div style={{ padding: '20px', maxWidth: '1200px' }}>
            <h1 style={{ marginBottom: '16px' }}>Pre-verified Accessible Color Pairs</h1>
            <p style={{ marginBottom: '32px', color: '#737373' }}>
                These color combinations have been tested and meet WCAG AAA standards (7:1 contrast ratio).
            </p>

            <h2 style={{ marginBottom: '16px', fontSize: '20px' }}>High Contrast Pairs</h2>
            <div
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', marginBottom: '40px' }}
            >
                {accessibility.accessiblePairs.highContrast.map((pair: ColorPair, idx: number) => (
                    <div
                        key={idx}
                        style={{
                            backgroundColor: pair.background,
                            padding: '24px',
                            borderRadius: '8px',
                            border: '1px solid #E5E5E5',
                        }}
                    >
                        <p style={{ color: pair.foreground, margin: '0 0 12px 0', fontSize: '16px' }}>Sample text content</p>
                        <div style={{ fontSize: '12px', color: '#737373' }}>
                            <div>Foreground: {pair.foreground}</div>
                            <div>Background: {pair.background}</div>
                            <div style={{ marginTop: '8px', color: '#16A34A', fontWeight: '600' }}>Ratio: {pair.ratio}:1 - AAA</div>
                        </div>
                    </div>
                ))}
            </div>

            <h2 style={{ marginBottom: '16px', fontSize: '20px' }}>Brand Color Pairs</h2>
            <div
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', marginBottom: '40px' }}
            >
                {accessibility.accessiblePairs.brand.map((pair: ColorPair, idx: number) => (
                    <div
                        key={idx}
                        style={{
                            backgroundColor: pair.background,
                            padding: '24px',
                            borderRadius: '8px',
                            border: '1px solid #E5E5E5',
                        }}
                    >
                        <p style={{ color: pair.foreground, margin: '0 0 12px 0', fontSize: '16px' }}>Sample text content</p>
                        <div style={{ fontSize: '12px', color: pair.foreground === '#FFFFFF' ? '#E5E5E5' : '#737373' }}>
                            <div>Foreground: {pair.foreground}</div>
                            <div>Background: {pair.background}</div>
                            <div style={{ marginTop: '8px', color: '#16A34A', fontWeight: '600' }}>Ratio: {pair.ratio}:1 - AAA</div>
                        </div>
                    </div>
                ))}
            </div>

            <h2 style={{ marginBottom: '16px', fontSize: '20px' }}>Status Color Pairs</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                {accessibility.accessiblePairs.status.map((pair: ColorPair, idx: number) => (
                    <div
                        key={idx}
                        style={{
                            backgroundColor: pair.background,
                            padding: '24px',
                            borderRadius: '8px',
                            border: '1px solid #E5E5E5',
                        }}
                    >
                        <p style={{ color: pair.foreground, margin: '0 0 12px 0', fontSize: '16px' }}>Sample text content</p>
                        <div style={{ fontSize: '12px', color: '#737373' }}>
                            <div>Foreground: {pair.foreground}</div>
                            <div>Background: {pair.background}</div>
                            <div style={{ marginTop: '8px', color: '#16A34A', fontWeight: '600' }}>Ratio: {pair.ratio}:1 - AAA</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ),
};

export const WCAGStandards: Story = {
    render: () => (
        <div style={{ padding: '20px', maxWidth: '800px' }}>
            <h1 style={{ marginBottom: '16px' }}>WCAG 2.1 Standards</h1>
            <p style={{ marginBottom: '32px', color: '#737373' }}>
                Understanding the contrast ratio requirements for different compliance levels.
            </p>

            <div
                style={{
                    padding: '24px',
                    backgroundColor: '#F5F5F5',
                    borderRadius: '12px',
                    marginBottom: '24px',
                }}
            >
                <h2 style={{ marginBottom: '16px', fontSize: '20px' }}>Level AA (Minimum)</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '16px',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '8px',
                        }}
                    >
                        <div>
                            <div style={{ fontWeight: '600', marginBottom: '4px' }}>Normal Text</div>
                            <div style={{ fontSize: '14px', color: '#737373' }}>14pt or smaller (under 18.66px)</div>
                        </div>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: '#2563EB' }}>{WCAG_STANDARDS.AA.normalText}:1</div>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '16px',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '8px',
                        }}
                    >
                        <div>
                            <div style={{ fontWeight: '600', marginBottom: '4px' }}>Large Text</div>
                            <div style={{ fontSize: '14px', color: '#737373' }}>18pt+ (24px+) or 14pt+ bold (18.66px+)</div>
                        </div>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: '#2563EB' }}>{WCAG_STANDARDS.AA.largeText}:1</div>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '16px',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '8px',
                        }}
                    >
                        <div>
                            <div style={{ fontWeight: '600', marginBottom: '4px' }}>UI Components</div>
                            <div style={{ fontSize: '14px', color: '#737373' }}>Graphical objects and controls</div>
                        </div>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: '#2563EB' }}>{WCAG_STANDARDS.AA.uiComponents}:1</div>
                    </div>
                </div>
            </div>

            <div
                style={{
                    padding: '24px',
                    backgroundColor: '#F0FDF4',
                    borderRadius: '12px',
                    marginBottom: '24px',
                }}
            >
                <h2 style={{ marginBottom: '16px', fontSize: '20px' }}>Level AAA (Enhanced)</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '16px',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '8px',
                        }}
                    >
                        <div>
                            <div style={{ fontWeight: '600', marginBottom: '4px' }}>Normal Text</div>
                            <div style={{ fontSize: '14px', color: '#737373' }}>14pt or smaller (under 18.66px)</div>
                        </div>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: '#16A34A' }}>{WCAG_STANDARDS.AAA.normalText}:1</div>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '16px',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '8px',
                        }}
                    >
                        <div>
                            <div style={{ fontWeight: '600', marginBottom: '4px' }}>Large Text</div>
                            <div style={{ fontSize: '14px', color: '#737373' }}>18pt+ (24px+) or 14pt+ bold (18.66px+)</div>
                        </div>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: '#16A34A' }}>{WCAG_STANDARDS.AAA.largeText}:1</div>
                    </div>
                </div>
            </div>

            <div
                style={{
                    padding: '16px',
                    backgroundColor: '#EFF6FF',
                    borderRadius: '8px',
                    borderLeft: '4px solid #2563EB',
                }}
            >
                <strong>Note:</strong> The Lufa Design System aims for AAA compliance wherever possible. All semantic color tokens with
                shade 600+ meet AAA standards for normal text on white backgrounds.
            </div>
        </div>
    ),
};

export const TextColorSuggestion: Story = {
    render: () => {
        const [bgColor, setBgColor] = useState('#2563EB');
        const suggestedTextColor = getSuggestedTextColor(bgColor);
        const ratio = getContrastRatio(suggestedTextColor, bgColor);

        return (
            <div style={{ padding: '20px', maxWidth: '600px' }}>
                <h1 style={{ marginBottom: '16px' }}>Text Color Suggestion</h1>
                <p style={{ marginBottom: '32px', color: '#737373' }}>
                    Automatically suggests the best text color (black or white) for any background color.
                </p>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Choose Background Color</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input
                            type="color"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            style={{ width: '60px', height: '40px', cursor: 'pointer' }}
                        />
                        <input
                            type="text"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            style={{
                                padding: '8px 12px',
                                border: '1px solid #D4D4D4',
                                borderRadius: '6px',
                                fontFamily: 'monospace',
                                width: '120px',
                            }}
                        />
                    </div>
                </div>

                <div
                    style={{
                        backgroundColor: bgColor,
                        padding: '40px',
                        borderRadius: '12px',
                        marginBottom: '24px',
                        border: '1px solid #E5E5E5',
                    }}
                >
                    <h2 style={{ color: suggestedTextColor, marginBottom: '12px' }}>Suggested Text Color</h2>
                    <p style={{ color: suggestedTextColor, fontSize: '16px' }}>
                        This text uses the automatically suggested color for optimal readability. The system chooses between black and white
                        text based on the background luminance.
                    </p>
                </div>

                <div
                    style={{
                        padding: '20px',
                        backgroundColor: '#F5F5F5',
                        borderRadius: '8px',
                    }}
                >
                    <div style={{ marginBottom: '16px' }}>
                        <strong>Suggested Text Color:</strong>
                        <code
                            style={{
                                marginLeft: '8px',
                                padding: '4px 8px',
                                backgroundColor: '#FFFFFF',
                                borderRadius: '4px',
                                fontFamily: 'monospace',
                            }}
                        >
                            {suggestedTextColor}
                        </code>
                    </div>
                    <div>
                        <strong>Contrast Ratio:</strong>
                        <span
                            style={{
                                marginLeft: '8px',
                                color: ratio >= 7 ? '#16A34A' : ratio >= 4.5 ? '#EA580C' : '#DC2626',
                                fontWeight: '600',
                            }}
                        >
                            {ratio.toFixed(2)}:1 ({ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'Fail'})
                        </span>
                    </div>
                </div>
            </div>
        );
    },
};
