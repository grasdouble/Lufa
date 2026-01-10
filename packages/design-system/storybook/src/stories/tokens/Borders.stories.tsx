import type { Meta, StoryObj } from '@storybook/react-vite';

import tokens from '@grasdouble/lufa_design-system-tokens';

const meta = {
  title: '1. Tokens/Borders',
  parameters: {
    layout: 'padded',
  },
  tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const BorderWidths: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1000px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Border Width Tokens</h1>
      <p style={{ marginBottom: '32px', color: tokens.color.text.tertiary, fontSize: '16px' }}>
        Standardized border widths for consistent visual weight. Focus borders meet WCAG 2.1 minimum requirements
        (2px+).
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '24px',
          marginBottom: '40px',
        }}
      >
        {Object.entries(tokens.borderWidth).map(([key, value]) => (
          <div key={key}>
            <div
              style={{
                width: '100%',
                height: '80px',
                backgroundColor: tokens.color.surface.default,
                borderRadius: '8px',
                border: `${value} solid ${tokens.color.interactive.focus}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontWeight: '600', color: tokens.color.interactive.focus }}>{key}</span>
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
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>WCAG 2.1 Requirements</h3>
        <p style={{ margin: '0', color: tokens.color.text.tertiary, fontSize: '14px', lineHeight: '1.6' }}>
          <strong>Focus Indicators:</strong> Must be at least 2px thick (borderWidth.thin) and have sufficient contrast
          (3:1 minimum) to meet WCAG 2.4.7 Focus Visible.
        </p>
      </div>
    </div>
  ),
};

export const BorderStyles: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1000px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Border Style Tokens</h1>
      <p style={{ marginBottom: '32px', color: tokens.color.text.tertiary, fontSize: '16px' }}>
        Standard border styles for different visual treatments.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '40px',
        }}
      >
        {Object.entries(tokens.borderStyle).map(([key, value]) => (
          <div key={key}>
            <div
              style={{
                width: '100%',
                height: '80px',
                backgroundColor: tokens.color.surface.default,
                borderRadius: '8px',
                border: `4px ${value} ${tokens.color.interactive.focus}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontWeight: '600', color: tokens.color.interactive.focus }}>{key}</span>
            </div>
            <div style={{ marginTop: '8px', fontSize: '12px' }}>
              <div style={{ fontWeight: '600' }}>{key}</div>
              <div style={{ color: tokens.color.text.tertiary, fontFamily: 'monospace' }}>{value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const UsageExamples: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1000px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>Border Usage Examples</h1>

      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Input States</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="text"
            placeholder="Default (hairline)"
            style={{
              padding: '10px 12px',
              border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.default}`,
              borderRadius: '6px',
              fontSize: '14px',
            }}
          />
          <input
            type="text"
            placeholder="Focus (3px for visibility)"
            style={{
              padding: '10px 12px',
              border: `${tokens.borderWidth.focus} ${tokens.borderStyle.solid} ${tokens.color.interactive.focus}`,
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
            }}
          />
          <input
            type="text"
            placeholder="Error (thin)"
            style={{
              padding: '10px 12px',
              border: `${tokens.borderWidth.thin} ${tokens.borderStyle.solid} ${tokens.color.error.default}`,
              borderRadius: '6px',
              fontSize: '14px',
            }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Card Variations</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '16px',
          }}
        >
          <div
            style={{
              padding: '20px',
              border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
              borderRadius: '8px',
            }}
          >
            <strong>Hairline Border</strong>
            <p style={{ margin: '8px 0 0', fontSize: '14px', color: tokens.color.text.tertiary }}>
              Subtle separation
            </p>
          </div>
          <div
            style={{
              padding: '20px',
              border: `${tokens.borderWidth.thin} ${tokens.borderStyle.solid} ${tokens.color.interactive.focus}`,
              borderRadius: '8px',
            }}
          >
            <strong>Thin Border</strong>
            <p style={{ margin: '8px 0 0', fontSize: '14px', color: tokens.color.text.tertiary }}>Emphasized</p>
          </div>
          <div
            style={{
              padding: '20px',
              border: `${tokens.borderWidth.thick} ${tokens.borderStyle.dashed} ${tokens.color.border.strong}`,
              borderRadius: '8px',
            }}
          >
            <strong>Dashed Border</strong>
            <p style={{ margin: '8px 0 0', fontSize: '14px', color: tokens.color.text.tertiary }}>
              Placeholder style
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Dividers</h3>
        <div>
          <div
            style={{
              padding: '12px 0',
              borderBottom: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
            }}
          >
            Hairline divider
          </div>
          <div
            style={{
              padding: '12px 0',
              borderBottom: `${tokens.borderWidth.thin} ${tokens.borderStyle.solid} ${tokens.color.border.default}`,
            }}
          >
            Thin divider
          </div>
          <div
            style={{
              padding: '12px 0',
              borderBottom: `${tokens.borderWidth.hairline} ${tokens.borderStyle.dashed} ${tokens.color.border.default}`,
            }}
          >
            Dashed divider
          </div>
        </div>
      </div>
    </div>
  ),
};
