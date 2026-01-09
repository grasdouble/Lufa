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
      <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
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
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                border: `${value} solid #3B82F6`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontWeight: '600', color: '#3B82F6' }}>{key}</span>
            </div>
            <div style={{ marginTop: '8px', fontSize: '12px' }}>
              <div style={{ fontWeight: '600' }}>{key}</div>
              <div style={{ color: '#737373', fontFamily: 'monospace' }}>{value}</div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          padding: '20px',
          backgroundColor: '#FAFAFA',
          borderRadius: '8px',
          border: '1px solid #E5E5E5',
        }}
      >
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>WCAG 2.1 Requirements</h3>
        <p style={{ margin: '0', color: '#737373', fontSize: '14px', lineHeight: '1.6' }}>
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
      <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
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
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                border: `4px ${value} #3B82F6`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontWeight: '600', color: '#3B82F6' }}>{key}</span>
            </div>
            <div style={{ marginTop: '8px', fontSize: '12px' }}>
              <div style={{ fontWeight: '600' }}>{key}</div>
              <div style={{ color: '#737373', fontFamily: 'monospace' }}>{value}</div>
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
              border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} #D1D5DB`,
              borderRadius: '6px',
              fontSize: '14px',
            }}
          />
          <input
            type="text"
            placeholder="Focus (3px for visibility)"
            style={{
              padding: '10px 12px',
              border: `${tokens.borderWidth.focus} ${tokens.borderStyle.solid} #3B82F6`,
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
              border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} #E5E5E5`,
              borderRadius: '8px',
            }}
          >
            <strong>Hairline Border</strong>
            <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#737373' }}>Subtle separation</p>
          </div>
          <div
            style={{
              padding: '20px',
              border: `${tokens.borderWidth.thin} ${tokens.borderStyle.solid} #3B82F6`,
              borderRadius: '8px',
            }}
          >
            <strong>Thin Border</strong>
            <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#737373' }}>Emphasized</p>
          </div>
          <div
            style={{
              padding: '20px',
              border: `${tokens.borderWidth.thick} ${tokens.borderStyle.dashed} #737373`,
              borderRadius: '8px',
            }}
          >
            <strong>Dashed Border</strong>
            <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#737373' }}>Placeholder style</p>
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Dividers</h3>
        <div>
          <div
            style={{
              padding: '12px 0',
              borderBottom: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} #E5E5E5`,
            }}
          >
            Hairline divider
          </div>
          <div
            style={{
              padding: '12px 0',
              borderBottom: `${tokens.borderWidth.thin} ${tokens.borderStyle.solid} #D1D5DB`,
            }}
          >
            Thin divider
          </div>
          <div
            style={{
              padding: '12px 0',
              borderBottom: `${tokens.borderWidth.hairline} ${tokens.borderStyle.dashed} #D1D5DB`,
            }}
          >
            Dashed divider
          </div>
        </div>
      </div>
    </div>
  ),
};
