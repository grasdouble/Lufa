import type { Meta, StoryObj } from '@storybook/react-vite';

import tokens from '@grasdouble/lufa_design-system-tokens';

const meta = {
  title: '1. Tokens/Icon Sizes',
  parameters: {
    layout: 'padded',
  },
  tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllIconSizes: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Icon Size Tokens</h1>
      <p style={{ marginBottom: '32px', color: 'var(--lufa-token-color-text-tertiary)', fontSize: '16px' }}>
        Standardized icon dimensions for consistent visual hierarchy. Icon glyphs are separate from hit targets - aim
        for a 44×44px touch target (WCAG 2.5.5) using padding or size.touchTarget around smaller icons.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
        {Object.entries(tokens.iconSize).map(([key, value]) => {
          const isTouchReady = Number(value) >= 24;

          return (
            <div
              key={key}
              style={{
                padding: '24px',
                backgroundColor: 'var(--lufa-token-color-background-secondary)',
                borderRadius: '8px',
                border: isTouchReady
                  ? `2px solid var(--lufa-token-color-interactive-default)`
                  : `1px solid var(--lufa-token-color-border-light)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontFamily: 'monospace',
                    fontWeight: '600',
                    fontSize: '14px',
                    marginBottom: '4px',
                  }}
                >
                  iconSize.{key}
                </div>
                <div
                  style={{ fontFamily: 'monospace', color: 'var(--lufa-token-color-text-tertiary)', fontSize: '12px' }}
                >
                  {value}
                </div>
              </div>

              <div
                style={{
                  width: value,
                  height: value,
                  backgroundColor: isTouchReady
                    ? 'var(--lufa-token-color-interactive-default)'
                    : 'var(--lufa-token-color-interactive-focus)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--lufa-token-color-text-inverse)',
                  fontSize: `calc(${value} * 0.6)`,
                  boxShadow: tokens.shadow.sm,
                }}
              >
                ★
              </div>

              <div style={{ fontSize: '12px', color: 'var(--lufa-token-color-text-tertiary)', textAlign: 'center' }}>
                {key === '2xs' && 'Tiny icons (dense UI)'}
                {key === 'xs' && 'Inline with text'}
                {key === 'sm' && 'Compact UI icons'}
                {key === 'md' && 'Default size (touch-friendly with padding)'}
                {key === 'lg' && 'Primary actions (32px)'}
                {key === 'xl' && 'Hero sections'}
                {key === '2xl' && 'Display icons (48px)'}
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
          Icon Button Guidelines
        </div>
        <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--lufa-token-color-info-text)', fontSize: '14px' }}>
          <li>Icon-only buttons should hit 44×44px (use padding or size.touchTarget around smaller icons)</li>
          <li>Default icon size is 24px; use 32px+ for primary actions</li>
          <li>Ensure sufficient color contrast: 3:1 for non-text content (WCAG 1.4.11)</li>
          <li>Provide accessible labels and adequate spacing between icon buttons (min 24px)</li>
        </ul>
      </div>
    </div>
  ),
};

export const UsageExamples: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Icon Size Usage Examples</h1>

      {/* Icon Buttons */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Icon Buttons</h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          {['sm', 'md', 'lg', 'xl', '2xl'].map((size) => {
            const iconSize = tokens.iconSize[size as keyof typeof tokens.iconSize];

            return (
              <button
                key={size}
                aria-label={`${size} icon button`}
                style={{
                  width: tokens.size.touchTarget,
                  height: tokens.size.touchTarget,
                  backgroundColor: 'var(--lufa-token-color-interactive-focus)',
                  color: 'var(--lufa-token-color-text-inverse)',
                  border: 'none',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: `calc(${iconSize} * 0.5)`,
                }}
                title={`${size} size`}
              >
                +
              </button>
            );
          })}
        </div>
        <p style={{ marginTop: '12px', fontSize: '12px', color: tokens.color.text.tertiary }}>
          Icon-only buttons shown inside size.touchTarget (44x44px) hit areas
        </p>
      </div>

      {/* Text with Icons */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Inline Icons</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' }}>
            <span
              style={{
                width: tokens.iconSize.xs,
                height: tokens.iconSize.xs,
                backgroundColor: 'var(--lufa-token-color-success-default)',
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--lufa-token-color-text-inverse)',
                fontSize: '10px',
              }}
            >
              ✓
            </span>
            Extra small icon (xs) inline with text
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px' }}>
            <span
              style={{
                width: tokens.iconSize.sm,
                height: tokens.iconSize.sm,
                backgroundColor: 'var(--lufa-token-color-interactive-focus)',
                borderRadius: '4px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--lufa-token-color-text-inverse)',
                fontSize: '12px',
              }}
            >
              i
            </span>
            Small icon (sm) with larger text
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Navigation Icons</h2>
        <nav
          style={{
            display: 'flex',
            gap: '8px',
            padding: '12px',
            backgroundColor: 'var(--lufa-token-color-background-inverse)',
            borderRadius: '8px',
          }}
        >
          {['Home', 'Search', 'Settings', 'Profile'].map((label) => (
            <button
              key={label}
              aria-label={label}
              style={{
                width: tokens.iconSize.md,
                height: tokens.iconSize.md,
                backgroundColor: 'transparent',
                color: 'var(--lufa-token-color-text-inverse)',
                border: 'none',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '16px',
              }}
              title={label}
            >
              {label[0]}
            </button>
          ))}
        </nav>
        <p style={{ marginTop: '12px', fontSize: '12px', color: tokens.color.text.tertiary }}>
          Navigation bar with medium (md) icons
        </p>
      </div>

      {/* Feature Icons */}
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Feature Highlights</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
          }}
        >
          {['Fast', 'Secure', 'Reliable'].map((feature, index) => (
            <div
              key={feature}
              style={{
                padding: '24px',
                textAlign: 'center',
                backgroundColor: 'var(--lufa-token-color-background-secondary)',
                borderRadius: '8px',
                border: `1px solid var(--lufa-token-color-border-light)`,
              }}
            >
              <div
                style={{
                  width: tokens.iconSize['2xl'],
                  height: tokens.iconSize['2xl'],
                  backgroundColor: [
                    'var(--lufa-token-color-interactive-focus)',
                    'var(--lufa-token-color-success-default)',
                    'var(--lufa-token-color-warning-default)',
                  ][index],
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--lufa-token-color-text-inverse)',
                  fontSize: '48px',
                  margin: '0 auto 16px',
                }}
              >
                {['⚡', '🔒', '✓'][index]}
              </div>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>{feature}</div>
              <div style={{ fontSize: '12px', color: 'var(--lufa-token-color-text-tertiary)' }}>Using iconSize.2xl</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
