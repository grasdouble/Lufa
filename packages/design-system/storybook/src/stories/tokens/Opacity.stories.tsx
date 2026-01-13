import type { Meta, StoryObj } from '@storybook/react-vite';

import tokens from '@grasdouble/lufa_design-system-tokens';

const meta = {
  title: '1. Tokens/Opacity',
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
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Opacity Tokens</h1>
      <p style={{ marginBottom: '32px', color: tokens.color.text.tertiary, fontSize: '16px' }}>
        Standardized opacity values for overlays, disabled states, and visual hierarchy. Use with caution on text to
        maintain WCAG 2.1 contrast requirements.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '24px',
          marginBottom: '40px',
        }}
      >
        {Object.entries(tokens.opacity).map(([key, value]) => (
          <div key={key}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '120px',
                backgroundColor: tokens.color.border.light,
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: tokens.color.interactive.default,
                  opacity: value,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ color: tokens.color.text.inverse, fontWeight: '600', fontSize: '14px' }}>{key}</span>
              </div>
            </div>
            <div style={{ marginTop: '8px', fontSize: '12px' }}>
              <div style={{ fontWeight: '600' }}>{key}</div>
              <div style={{ color: tokens.color.text.tertiary, fontFamily: 'monospace' }}>{value}</div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          padding: '20px',
          backgroundColor: tokens.color.background.secondary,
          borderRadius: '8px',
          border: `1px solid ${tokens.color.border.light}`,
        }}
      >
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>Accessibility Note</h3>
        <p style={{ margin: '0', color: tokens.color.text.tertiary, fontSize: '14px', lineHeight: '1.6' }}>
          <strong>WCAG 2.1 Compliance:</strong> When applying opacity to text or interactive elements, always verify
          that contrast ratios meet minimum requirements:
        </p>
        <ul
          style={{
            margin: '12px 0 0 0',
            paddingLeft: '20px',
            color: tokens.color.text.tertiary,
            fontSize: '14px',
            lineHeight: '1.6',
          }}
        >
          <li>Normal text: 4.5:1 (AA) or 7:1 (AAA)</li>
          <li>Large text: 3:1 (AA) or 4.5:1 (AAA)</li>
          <li>Disabled states: minimum 3:1 contrast recommended</li>
        </ul>
      </div>
    </div>
  ),
};

export const UsageExamples: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1000px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>Opacity Usage Examples</h1>

      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Overlays</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div
            style={{
              position: 'relative',
              width: '200px',
              height: '150px',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"
              alt="Background"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: tokens.color.background.inverse,
                opacity: tokens.opacity.light,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: tokens.color.text.inverse, fontWeight: '600' }}>Light Overlay</span>
            </div>
          </div>
          <div
            style={{
              position: 'relative',
              width: '200px',
              height: '150px',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"
              alt="Background"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: tokens.color.background.inverse,
                opacity: tokens.opacity.medium,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: tokens.color.text.inverse, fontWeight: '600' }}>Medium Overlay</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Disabled States</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: tokens.color.interactive.default,
              color: tokens.color.text.inverse,
              border: 'none',
              borderRadius: '6px',
              fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            Enabled Button
          </button>
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: tokens.color.interactive.default,
              color: tokens.color.text.inverse,
              border: 'none',
              borderRadius: '6px',
              fontWeight: '500',
              opacity: tokens.opacity.disabled,
              cursor: 'not-allowed',
            }}
            disabled
          >
            Disabled Button
          </button>
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Background Tints</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div
            style={{
              padding: '16px',
              backgroundColor: tokens.color.interactive.default,
              opacity: tokens.opacity.subtle,
              borderRadius: '6px',
              minWidth: '150px',
            }}
          >
            <strong>Subtle tint</strong>
          </div>
          <div
            style={{
              padding: '16px',
              backgroundColor: tokens.color.interactive.default,
              opacity: tokens.opacity.light,
              borderRadius: '6px',
              minWidth: '150px',
            }}
          >
            <strong>Light tint</strong>
          </div>
          <div
            style={{
              padding: '16px',
              backgroundColor: tokens.color.interactive.default,
              opacity: tokens.opacity.faint,
              borderRadius: '6px',
              minWidth: '150px',
            }}
          >
            <strong style={{ color: tokens.color.text.inverse }}>Faint</strong>
          </div>
        </div>
      </div>
    </div>
  ),
};
