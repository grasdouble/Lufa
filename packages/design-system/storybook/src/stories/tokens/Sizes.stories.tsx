import type { Meta, StoryObj } from '@storybook/react-vite';

import tokens from '@grasdouble/lufa_design-system-tokens';

const meta = {
  title: '1. Tokens/Sizes',
  parameters: {
    layout: 'padded',
  },
  tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllSizes: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Size Tokens</h1>
      <p style={{ marginBottom: '32px', color: 'var(--lufa-token-color-text-tertiary)', fontSize: '16px' }}>
        Semantic size tokens for common element dimensions. Includes WCAG 2.5.5 minimum touch target (44px).
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {Object.entries(tokens.size).map(([key, value]) => {
          const isTouchTarget = key === 'touchTarget';

          return (
            <div
              key={key}
              style={{
                display: 'grid',
                gridTemplateColumns: '180px 100px 1fr',
                gap: '24px',
                alignItems: 'center',
                padding: '16px',
                backgroundColor: 'var(--lufa-token-color-background-secondary)',
                borderRadius: '8px',
                border: isTouchTarget
                  ? `2px solid var(--lufa-token-color-interactive-default)`
                  : `1px solid var(--lufa-token-color-border-light)`,
              }}
            >
              <div style={{ fontFamily: 'monospace', fontWeight: '600', fontSize: '14px' }}>size.{key}</div>
              <div
                style={{ fontFamily: 'monospace', color: 'var(--lufa-token-color-text-tertiary)', fontSize: '12px' }}
              >
                {value}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: value,
                    height: value,
                    backgroundColor: isTouchTarget
                      ? 'var(--lufa-token-color-interactive-default)'
                      : 'var(--lufa-token-color-interactive-focus)',
                    borderRadius: '6px',
                    boxShadow: tokens.shadow.xs,
                    flexShrink: 0,
                  }}
                />
                <div style={{ fontSize: '12px', color: 'var(--lufa-token-color-text-tertiary)' }}>
                  {key === 'none' && 'No size'}
                  {key === 'xs' && 'Icons (inline)'}
                  {key === 'sm' && 'Small icons, avatars'}
                  {key === 'md' && 'Buttons, form inputs'}
                  {key === 'touchTarget' && 'WCAG minimum touch target ✓'}
                  {key === 'lg' && 'Large buttons, icons'}
                  {key === 'xl' && 'Feature icons'}
                  {key === '2xl' && 'Hero icons, logos'}
                  {key === '3xl' && 'Large avatars'}
                  {key === '4xl' && 'Thumbnails'}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: '32px',
          padding: '16px',
          backgroundColor: 'var(--lufa-token-color-info-light)',
          border: `1px solid var(--lufa-token-color-info-border)`,
          borderRadius: '8px',
        }}
      >
        <div style={{ fontWeight: '600', marginBottom: '8px', color: 'var(--lufa-token-color-info-text)' }}>
          WCAG 2.5.5 Target Size
        </div>
        <div style={{ fontSize: '14px', color: 'var(--lufa-token-color-info-text)' }}>
          Interactive elements should have a minimum touch target of 44×44px to ensure accessibility on touch devices.
          Use size.touchTarget or larger for all interactive elements.
        </div>
      </div>
    </div>
  ),
};

export const UsageExamples: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Size Token Usage Examples</h1>

      {/* Icons */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Icons</h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          {['xs', 'sm', 'md', 'lg', 'xl'].map((siz) => (
            <div key={siz} style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
              <div
                style={{
                  width: tokens.size[siz as keyof typeof tokens.size],
                  height: tokens.size[siz as keyof typeof tokens.size],
                  backgroundColor: 'var(--lufa-token-color-interactive-focus)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--lufa-token-color-text-inverse)',
                  fontSize: '10px',
                }}
              >
                ★
              </div>
              <span style={{ fontSize: '12px', fontFamily: 'monospace' }}>{siz}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Buttons</h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          {['md', 'touchTarget', 'lg'].map((siz) => (
            <button
              key={siz}
              style={{
                height: tokens.size[siz as keyof typeof tokens.size],
                padding: '0 24px',
                backgroundColor: 'var(--lufa-token-color-interactive-focus)',
                color: 'var(--lufa-token-color-text-inverse)',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              {siz}
            </button>
          ))}
        </div>
      </div>

      {/* Avatars */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Avatars</h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          {['sm', 'md', 'lg', 'xl', '2xl'].map((siz) => (
            <div key={siz} style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
              <div
                style={{
                  width: tokens.size[siz as keyof typeof tokens.size],
                  height: tokens.size[siz as keyof typeof tokens.size],
                  backgroundColor: 'var(--lufa-token-color-success-default)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--lufa-token-color-text-inverse)',
                  fontWeight: '600',
                }}
              >
                A
              </div>
              <span style={{ fontSize: '12px', fontFamily: 'monospace' }}>{siz}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Inputs */}
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Form Inputs</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
          {['md', 'touchTarget', 'lg'].map((siz) => (
            <input
              key={siz}
              type="text"
              placeholder={`Input with ${siz} height`}
              style={{
                height: tokens.size[siz as keyof typeof tokens.size],
                padding: '0 16px',
                border: `1px solid var(--lufa-token-color-border-default)`,
                borderRadius: '6px',
                fontSize: '14px',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  ),
};
