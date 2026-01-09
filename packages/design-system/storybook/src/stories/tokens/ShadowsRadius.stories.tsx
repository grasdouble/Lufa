import type { Meta, StoryObj } from '@storybook/react-vite';

import tokens from '@grasdouble/lufa_design-system-tokens';

const meta = {
  title: '1. Tokens/Shadows & Radius',
  parameters: {
    layout: 'padded',
  },
  tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ShadowTokens: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1000px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Shadow Tokens</h1>
      <p style={{ marginBottom: '32px', color: tokens.color.text.tertiary, fontSize: '16px' }}>
        Standardized shadow values for elevation and depth, following Material Design principles.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '32px',
          marginBottom: '40px',
        }}
      >
        {Object.entries(tokens.shadow).map(([key, value]) => (
          <div key={key}>
            <div
              style={{
                width: '100%',
                height: '150px',
                backgroundColor: tokens.color.surface.default,
                borderRadius: '8px',
                boxShadow: value,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '16px',
                  fontWeight: 600,
                  marginBottom: '8px',
                }}
              >
                {key}
              </div>
              <div style={{ fontSize: '12px', color: tokens.color.text.tertiary }}>
                {key === 'none' && 'No shadow'}
                {key === 'xs' && 'Subtle elevation'}
                {key === 'sm' && 'Small elevation'}
                {key === 'md' && 'Medium elevation'}
                {key === 'lg' && 'Large elevation'}
                {key === 'xl' && 'Extra large'}
                {key === '2xl' && 'Huge elevation'}
                {key === '3xl' && 'Very huge elevation'}
                {key === '4xl' && 'Extreme elevation'}
                {key === '5xl' && 'Maximum elevation'}
                {key === 'inner' && 'Inner depth'}
              </div>
            </div>
            <div
              style={{
                marginTop: '12px',
                fontSize: '11px',
                fontFamily: 'monospace',
                color: tokens.color.text.tertiary,
                wordBreak: 'break-all',
              }}
            >
              shadow.{key}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Usage</h2>
        <div
          style={{
            padding: '20px',
            backgroundColor: tokens.color.background.secondary,
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '14px',
          }}
        >
          <div
            style={{ color: tokens.color.text.tertiary, marginBottom: '12px' }}
          >{`import tokens from '@grasdouble/lufa_design-system-tokens';`}</div>
          <div>
            <span style={{ color: tokens.color.warning.text }}>boxShadow</span>: tokens.shadow.md
          </div>
        </div>
      </div>
    </div>
  ),
};

export const RadiusTokens: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1000px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Border Radius Tokens</h1>
      <p style={{ marginBottom: '32px', color: tokens.color.text.tertiary, fontSize: '16px' }}>
        Standardized border radius values for consistent rounded corners.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '24px',
          marginBottom: '40px',
        }}
      >
        {Object.entries(tokens.radius).map(([key, value]) => (
          <div key={key}>
            <div
              style={{
                width: '100%',
                height: '120px',
                backgroundColor: tokens.color.interactive.default,
                borderRadius: value,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                color: tokens.color.text.inverse,
              }}
            >
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '16px',
                  fontWeight: 600,
                  marginBottom: '4px',
                }}
              >
                {key}
              </div>
              <div style={{ fontSize: '13px', opacity: 0.9 }}>{value}</div>
            </div>
            <div style={{ marginTop: '8px', fontSize: '12px', color: tokens.color.text.tertiary, textAlign: 'center' }}>
              {key === 'none' && 'No rounding'}
              {key === 'xs' && 'Subtle rounding'}
              {key === 'sm' && 'Small rounding'}
              {key === 'md' && 'Medium rounding'}
              {key === 'base' && 'Base rounding'}
              {key === 'lg' && 'Large rounding'}
              {key === 'xl' && 'Extra large'}
              {key === '2xl' && 'Very large'}
              {key === '3xl' && 'Huge rounding'}
              {key === 'full' && 'Fully rounded'}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Usage</h2>
        <div
          style={{
            padding: '20px',
            backgroundColor: tokens.color.background.secondary,
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '14px',
          }}
        >
          <div
            style={{ color: tokens.color.text.tertiary, marginBottom: '12px' }}
          >{`import tokens from '@grasdouble/lufa_design-system-tokens';`}</div>
          <div>
            <span style={{ color: tokens.color.warning.text }}>borderRadius</span>: tokens.radius.base
          </div>
        </div>
      </div>
    </div>
  ),
};

export const CombinedExample: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h2 style={{ marginBottom: '24px' }}>Shadows & Radius Combined</h2>
      <p style={{ marginBottom: '32px', color: tokens.color.text.tertiary }}>
        Examples showing shadow and border radius working together
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h3 style={{ marginBottom: '12px', fontSize: '16px' }}>Elevated Card</h3>
          <div
            style={{
              padding: '24px',
              backgroundColor: tokens.color.surface.default,
              borderRadius: tokens.radius.lg,
              boxShadow: tokens.shadow.md,
            }}
          >
            <h4 style={{ margin: 0, marginBottom: '8px', fontSize: '18px', fontWeight: 600 }}>Card Title</h4>
            <p style={{ margin: 0, color: tokens.color.text.tertiary, fontSize: '14px' }}>
              This card uses shadow.md and radius.lg for a subtle elevated appearance.
            </p>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '12px', fontSize: '16px' }}>Button with Shadow</h3>
          <button
            style={{
              padding: '12px 24px',
              backgroundColor: tokens.color.interactive.default,
              color: tokens.color.text.inverse,
              border: 'none',
              borderRadius: tokens.radius.base,
              boxShadow: tokens.shadow.sm,
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            Elevated Button
          </button>
          <p style={{ marginTop: '8px', fontSize: '12px', color: tokens.color.text.tertiary }}>
            radius.base + shadow.sm
          </p>
        </div>

        <div>
          <h3 style={{ marginBottom: '12px', fontSize: '16px' }}>Modal Dialog</h3>
          <div
            style={{
              padding: '32px',
              backgroundColor: tokens.color.surface.default,
              borderRadius: tokens.radius.xl,
              boxShadow: tokens.shadow.xl,
              maxWidth: '400px',
            }}
          >
            <h4 style={{ margin: 0, marginBottom: '16px', fontSize: '20px', fontWeight: 600 }}>Dialog Title</h4>
            <p style={{ margin: 0, marginBottom: '24px', color: tokens.color.text.tertiary, fontSize: '14px' }}>
              Large shadow and radius create strong visual separation for modals.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: tokens.color.interactive.default,
                  color: tokens.color.text.inverse,
                  border: 'none',
                  borderRadius: tokens.radius.base,
                  cursor: 'pointer',
                }}
              >
                Confirm
              </button>
              <button
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: tokens.color.surface.default,
                  color: tokens.color.text.tertiary,
                  border: `1px solid ${tokens.color.border.light}`,
                  borderRadius: tokens.radius.base,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
          <p style={{ marginTop: '8px', fontSize: '12px', color: tokens.color.text.tertiary }}>
            radius.xl + shadow.xl
          </p>
        </div>
      </div>
    </div>
  ),
};
