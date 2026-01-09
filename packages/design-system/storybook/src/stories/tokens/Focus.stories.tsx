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
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Focus Tokens</h1>
      <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
        Standardized focus indicators for keyboard navigation. WCAG 2.1 requires minimum 2px indicator with 3:1
        contrast.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {Object.entries(focus).map(([key, value]) => (
          <div
            key={key}
            style={{
              padding: '20px',
              backgroundColor: '#FAFAFA',
              borderRadius: '8px',
              border: '1px solid #E5E5E5',
            }}
          >
            <div style={{ marginBottom: '16px' }}>
              <div
                style={{
                  fontFamily: 'monospace',
                  fontWeight: '600',
                  fontSize: '14px',
                  marginBottom: '8px',
                }}
              >
                focus.{key}
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: '11px', color: '#737373' }}>
                width: {value.width} | style: {value.style} | color: {value.color} | offset: {value.offset}
                {'shadow' in value && value.shadow && ` | shadow: ${value.shadow}`}
              </div>
            </div>

            <button
              style={{
                padding: '12px 24px',
                backgroundColor: '#3B82F6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
              onFocus={(e) => {
                e.currentTarget.style.cssText += tokens.getFocusStyle(key as keyof typeof tokens.focus);
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
                e.currentTarget.style.outlineOffset = '0';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Tab to focus ({key})
            </button>

            <div style={{ marginTop: '12px', fontSize: '12px', color: '#737373' }}>
              {key === 'default' && 'Standard focus ring for most elements'}
              {key === 'thick' && 'High visibility focus for critical actions'}
              {key === 'inset' && 'Focus ring contained within element bounds'}
              {key === 'shadow' && 'Elevated focus with drop shadow'}
              {key === 'inverse' && 'Focus ring for dark backgrounds'}
            </div>
          </div>
        ))}
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
        <div style={{ fontWeight: '600', marginBottom: '8px', color: '#1E40AF' }}>WCAG 2.1 Focus Requirements</div>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#1E3A8A', fontSize: '14px' }}>
          <li>Minimum 2px indicator thickness (WCAG 2.4.7 Focus Visible)</li>
          <li>Minimum 3:1 contrast against adjacent colors (WCAG 2.4.11 Focus Appearance, Level AA)</li>
          <li>Focus indicator should be visible around entire element</li>
          <li>Never remove focus indicators - they're critical for keyboard users</li>
        </ul>
      </div>
    </div>
  ),
};

export const InteractiveDemo: Story = {
  render: () => {
    const [focusedElement, setFocusedElement] = useState<string | null>(null);

    return (
      <div style={{ padding: '20px', maxWidth: '1400px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Focus Utility Helper</h1>
        <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
          Use{' '}
          <code style={{ padding: '2px 6px', backgroundColor: '#E5E5E5', borderRadius: '4px' }}>getFocusStyle()</code>{' '}
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
          {Object.keys(focus).map((key) => (
            <button
              key={key}
              style={{
                padding: '16px',
                backgroundColor: key === 'inverse' ? '#1F2937' : '#FFFFFF',
                color: key === 'inverse' ? 'white' : '#1F2937',
                border: '2px solid #E5E5E5',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 150ms ease-out',
              }}
              onFocus={() => setFocusedElement(key)}
              onBlur={() => setFocusedElement(null)}
              onMouseEnter={(e) => {
                if (key !== 'inverse') {
                  e.currentTarget.style.backgroundColor = '#F3F4F6';
                }
              }}
              onMouseLeave={(e) => {
                if (key !== 'inverse') {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                }
              }}
            >
              {key}
            </button>
          ))}
        </div>

        {focusedElement && (
          <div
            style={{
              padding: '16px',
              backgroundColor: '#FAFAFA',
              borderRadius: '8px',
              border: '1px solid #E5E5E5',
            }}
          >
            <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#737373', marginBottom: '8px' }}>
              Currently focused:
            </div>
            <pre
              style={{
                margin: 0,
                padding: '12px',
                backgroundColor: '#1F2937',
                color: '#10B981',
                borderRadius: '6px',
                fontSize: '12px',
                overflow: 'auto',
              }}
            >
              {`&:focus-visible {\n  ${tokens.getFocusStyle(focusedElement as keyof typeof tokens.focus)}\n}`}
            </pre>
          </div>
        )}

        <div style={{ marginTop: '24px', fontSize: '14px', color: '#737373' }}>
          💡 <strong>Tip:</strong> Tab through the buttons above to see each focus style in action. The code snippet
          updates to show how to use the getFocusStyle() helper.
        </div>
      </div>
    );
  },
};
