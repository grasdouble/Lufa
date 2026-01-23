import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import tokens from '@grasdouble/lufa_design-system-tokens';

const meta = {
  title: '1. Tokens/Focus',
  parameters: {
    layout: 'padded',
  },
  tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const FocusStyles: Story = {
  render: () => {
    return (
      <div style={{ padding: '20px', maxWidth: '1400px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Focus Tokens</h1>
        <p style={{ marginBottom: '32px', color: tokens.color.text.tertiary, fontSize: '16px' }}>
          Standardized focus indicators for keyboard navigation. WCAG 2.1 requires minimum 2px indicator with 3:1
          contrast. Focus styles shown in static view below.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {Object.entries(tokens.focus).map(([key, value]) => {
            // Use token values directly instead of parsing strings
            const outline = `${value.width} ${value.style} ${value.color}`;
            const outlineOffset = value.offset;
            const boxShadow = 'shadow' in value && value.shadow ? value.shadow : 'none';
            const focusStyleString = tokens.getFocusStyle(key as keyof typeof tokens.focus);

            // For inverse, use dark background; for others, use light background
            const cardBg = tokens.color.background.secondary;
            const textColor = tokens.color.text.primary;
            const metaTextColor = key === 'inverse' ? tokens.color.text.secondary : tokens.color.text.tertiary;

            // Use neutral button to show focus ring clearly (not blue background)
            const buttonBg = tokens.color.surface.default;
            const buttonTextColor = tokens.color.text.primary;
            const buttonBorder = `2px solid ${tokens.color.border.default}`;

            return (
              <div
                key={key}
                style={{
                  padding: '20px',
                  backgroundColor: cardBg,
                  borderRadius: '8px',
                  border: `1px solid ${tokens.color.border.light}`,
                }}
              >
                <div style={{ marginBottom: '16px' }}>
                  <div
                    style={{
                      fontFamily: 'monospace',
                      fontWeight: '600',
                      fontSize: '14px',
                      marginBottom: '8px',
                      color: textColor,
                    }}
                  >
                    tokens.focus.{key}
                  </div>
                  <div
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '11px',
                      color: metaTextColor,
                    }}
                  >
                    width: {value.width} | style: {value.style} | color: {value.color} | offset: {value.offset}
                    {'shadow' in value && value.shadow && ` | shadow: ${value.shadow}`}
                  </div>
                </div>

                {/* Static view of focused button */}
                <div
                  style={{
                    padding: '12px 24px',
                    backgroundColor: buttonBg,
                    color: buttonTextColor,
                    border: buttonBorder,
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    display: 'inline-block',
                    outline,
                    outlineOffset,
                    boxShadow,
                  }}
                >
                  Focus style preview ({key})
                </div>

                <div
                  style={{
                    marginTop: '12px',
                    fontSize: '12px',
                    color: metaTextColor,
                  }}
                >
                  {key === 'default' && 'Standard focus ring for most elements'}
                  {key === 'thick' && 'High visibility focus for critical actions (3px vs 2px)'}
                  {key === 'inset' && 'Focus ring contained within element (negative offset)'}
                  {key === 'shadow' && 'Elevated focus with drop shadow (no offset gap)'}
                  {key === 'inverse' && 'Focus ring for dark backgrounds (black in light mode, white in dark mode)'}
                </div>

                {/* CSS code snippet */}
                <pre
                  style={{
                    marginTop: '12px',
                    padding: '12px',
                    backgroundColor: tokens.color.surface.overlay,
                    borderRadius: '6px',
                    fontSize: '11px',
                    overflow: 'auto',
                    color: tokens.color.text.secondary,
                    border: `1px solid ${tokens.color.border.light}`,
                  }}
                >
                  {`&:focus-visible {\n  ${focusStyleString}\n}`}
                </pre>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: '32px',
            padding: '16px',
            backgroundColor: tokens.color.info.light,
            border: `1px solid ${tokens.color.info.border}`,
            borderRadius: '8px',
          }}
        >
          <div style={{ fontWeight: '600', marginBottom: '8px', color: tokens.color.info.text }}>
            WCAG 2.1 Focus Requirements
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px', color: tokens.color.info.text, fontSize: '14px' }}>
            <li>Minimum 2px indicator thickness (WCAG 2.4.7 Focus Visible)</li>
            <li>Minimum 3:1 contrast against adjacent colors (WCAG 2.4.11 Focus Appearance, Level AA)</li>
            <li>Focus indicator should be visible around entire element</li>
            <li>Never remove focus indicators - they're critical for keyboard users</li>
          </ul>
        </div>
      </div>
    );
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const [focusedElement, setFocusedElement] = useState<string | null>(null);

    // Create CSS for focus-visible styles
    const focusStylesCSS = Object.keys(tokens.focus)
      .map((key) => {
        const focusStyle = tokens.getFocusStyle(key as keyof typeof tokens.focus);
        // For inverse, change background to dark when focused so white outline is visible
        if (key === 'inverse') {
          return `.focus-interactive-${key}:focus-visible { ${focusStyle} background-color: ${tokens.color.background.inverse}; color: ${tokens.color.text.inverse}; }`;
        }
        return `.focus-interactive-${key}:focus-visible { ${focusStyle} }`;
      })
      .join('\n');

    return (
      <div style={{ padding: '20px', maxWidth: '1400px' }}>
        <style>{focusStylesCSS}</style>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Focus Utility Helper</h1>
        <p style={{ marginBottom: '32px', color: tokens.color.text.tertiary, fontSize: '16px' }}>
          Use{' '}
          <code
            style={{
              padding: '2px 6px',
              backgroundColor: tokens.color.background.tertiary,
              borderRadius: '4px',
              color: tokens.color.text.primary,
            }}
          >
            getFocusStyle()
          </code>{' '}
          helper to apply focus styles in CSS-in-JS or styled-components.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            marginBottom: '32px',
          }}
        >
          {Object.keys(tokens.focus).map((key) => (
            <button
              key={key}
              className={`focus-interactive-${key}`}
              style={{
                padding: '16px',
                backgroundColor: tokens.color.surface.default,
                color: tokens.color.text.primary,
                border: `2px solid ${tokens.color.border.light}`,
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 150ms ease-out',
              }}
              onFocus={() => setFocusedElement(key)}
              onBlur={() => setFocusedElement(null)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = tokens.color.background.tertiary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = tokens.color.surface.default;
              }}
            >
              {key}
            </button>
          ))}
        </div>

        {/* Always render the code snippet container to prevent layout shift */}
        <div
          style={{
            padding: '16px',
            backgroundColor: tokens.color.background.secondary,
            borderRadius: '8px',
            border: `1px solid ${tokens.color.border.light}`,
            minHeight: '120px', // Reserve space to prevent layout shift
            width: '100%',
            maxWidth: '600px', // Static width to prevent text reflow
          }}
        >
          {focusedElement ? (
            <>
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  color: tokens.color.text.tertiary,
                  marginBottom: '8px',
                }}
              >
                Currently focused: <strong style={{ color: tokens.color.text.primary }}>{focusedElement}</strong>
              </div>
              <pre
                style={{
                  margin: 0,
                  padding: '12px',
                  backgroundColor: tokens.color.surface.overlay,
                  color: tokens.color.success.default,
                  borderRadius: '6px',
                  fontSize: '12px',
                  overflow: 'auto',
                }}
              >
                {`&:focus-visible {\n  ${tokens.getFocusStyle(focusedElement as keyof typeof tokens.focus)}\n}`}
              </pre>
            </>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: tokens.color.text.tertiary,
                fontSize: '14px',
              }}
            >
              Tab to a button above to see its focus style CSS
            </div>
          )}
        </div>

        <div style={{ marginTop: '24px', fontSize: '14px', color: tokens.color.text.tertiary }}>
          💡 <strong>Tip:</strong> Tab through the buttons above to see each focus style in action. The code snippet
          updates to show how to use the getFocusStyle() helper.
        </div>
      </div>
    );
  },
};
