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
      <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
        Standardized icon dimensions for consistent visual hierarchy. Icon buttons require minimum 44×44px touch target
        (WCAG 2.5.5).
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
        {Object.entries(tokens.iconSize).map(([key, value]) => {
          const isTouchTarget = key === 'lg';

          return (
            <div
              key={key}
              style={{
                padding: '24px',
                backgroundColor: '#FAFAFA',
                borderRadius: '8px',
                border: isTouchTarget ? '2px solid #2563EB' : '1px solid #E5E5E5',
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
                <div style={{ fontFamily: 'monospace', color: '#737373', fontSize: '12px' }}>{value}</div>
              </div>

              <div
                style={{
                  width: value,
                  height: value,
                  backgroundColor: isTouchTarget ? '#2563EB' : '#3B82F6',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: `calc(${value} * 0.6)`,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                ★
              </div>

              <div style={{ fontSize: '12px', color: '#737373', textAlign: 'center' }}>
                {key === 'xs' && 'Inline with text'}
                {key === 'sm' && 'Buttons, navigation'}
                {key === 'md' && 'Default size'}
                {key === 'lg' && 'WCAG touch target ✓'}
                {key === 'xl' && 'Hero sections'}
                {key === '2xl' && 'Feature highlights'}
              </div>
            </div>
          );
        })}
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
        <div style={{ fontWeight: '600', marginBottom: '8px', color: '#1E40AF' }}>Icon Button Guidelines</div>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#1E3A8A', fontSize: '14px' }}>
          <li>Icon-only buttons must have minimum 44×44px touch target (use iconSize.lg or larger)</li>
          <li>Ensure sufficient color contrast: 3:1 for non-text content (WCAG 1.4.11)</li>
          <li>Provide accessible labels with aria-label for icon-only buttons</li>
          <li>Add adequate spacing between multiple icon buttons (minimum 24px)</li>
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
          {['sm', 'md', 'lg', 'xl'].map((size) => (
            <button
              key={size}
              aria-label={`${size} icon button`}
              style={{
                width: tokens.iconSize[size as keyof typeof tokens.iconSize],
                height: tokens.iconSize[size as keyof typeof tokens.iconSize],
                backgroundColor: '#3B82F6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: `calc(${tokens.iconSize[size as keyof typeof tokens.iconSize]} * 0.5)`,
              }}
              title={`${size} size`}
            >
              +
            </button>
          ))}
        </div>
        <p style={{ marginTop: '12px', fontSize: '12px', color: '#737373' }}>
          Icon-only buttons with proper touch targets
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
                backgroundColor: '#10B981',
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
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
                backgroundColor: '#3B82F6',
                borderRadius: '4px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
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
            backgroundColor: '#1F2937',
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
                color: 'white',
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
        <p style={{ marginTop: '12px', fontSize: '12px', color: '#737373' }}>Navigation bar with medium (md) icons</p>
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
                backgroundColor: '#FAFAFA',
                borderRadius: '8px',
                border: '1px solid #E5E5E5',
              }}
            >
              <div
                style={{
                  width: tokens.iconSize['2xl'],
                  height: tokens.iconSize['2xl'],
                  backgroundColor: ['#3B82F6', '#10B981', '#F59E0B'][index],
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '48px',
                  margin: '0 auto 16px',
                }}
              >
                {['⚡', '🔒', '✓'][index]}
              </div>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>{feature}</div>
              <div style={{ fontSize: '12px', color: '#737373' }}>Using iconSize.2xl</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
