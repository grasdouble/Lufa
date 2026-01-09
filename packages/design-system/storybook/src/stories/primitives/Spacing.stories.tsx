import type { Meta, StoryObj } from '@storybook/react-vite';

import primitives from '@grasdouble/lufa_design-system-primitives';

const meta = {
  title: '0. Primitives/Spacing',
  parameters: {
    layout: 'padded',
  },
  tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllSpacing: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Spacing Primitives</h1>
      <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
        Token spacing values using 4px/8px rhythm. Use these for margins, padding, and gaps across all components. Touch
        targets require minimum 44px (spacing[32] padding or spacing[24] separation).
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {Object.entries(primitives.spacing).map(([key, value]) => (
          <div
            key={key}
            style={{
              display: 'grid',
              gridTemplateColumns: '100px 100px 1fr',
              gap: '16px',
              alignItems: 'center',
              padding: '16px',
              backgroundColor: '#FAFAFA',
              borderRadius: '8px',
              border: '1px solid #E5E5E5',
            }}
          >
            <div style={{ fontFamily: 'monospace', fontWeight: '600', fontSize: '14px' }}>spacing[{key}]</div>
            <div style={{ fontFamily: 'monospace', color: '#737373', fontSize: '12px' }}>{value}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: value,
                  height: '24px',
                  backgroundColor: '#3B82F6',
                  borderRadius: '4px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}
              />
              <div style={{ fontSize: '12px', color: '#737373' }}>
                {key === '0' && 'No spacing (flush)'}
                {key === '2' && 'Micro spacing (icon offset)'}
                {key === '4' && 'Tight spacing (label gap)'}
                {key === '8' && 'Small spacing (compact UI)'}
                {key === '12' && 'Min element padding'}
                {key === '16' && 'Standard spacing'}
                {key === '24' && 'Min touch target separation'}
                {key === '32' && 'Comfortable touch padding'}
                {key === '48' && 'Primary action spacing'}
                {key === '64' && 'Section separation'}
                {key === '72' && 'Large section spacing'}
                {key === '96' && 'Page section separation'}
                {key === '120' && 'Major layout spacing'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: '40px',
          padding: '24px',
          backgroundColor: '#FEF3C7',
          borderRadius: '12px',
          border: '1px solid #FCD34D',
        }}
      >
        <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600' }}>WCAG Touch Target Guidelines</h3>
        <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.6' }}>
          <li>
            <strong>Minimum 44x44px</strong> for interactive elements (WCAG 2.5.5)
          </li>
          <li>
            <strong>spacing[32]</strong> (32px) = comfortable padding for touch targets
          </li>
          <li>
            <strong>spacing[24]</strong> (24px) = minimum spacing between touch targets
          </li>
        </ul>
      </div>
    </div>
  ),
};

export const UsageExamples: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>Spacing Usage Examples</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Card Layout</h3>
          <div
            style={{
              padding: primitives.spacing[24],
              backgroundColor: 'white',
              borderRadius: '12px',
              border: '1px solid #E5E5E5',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <h4 style={{ margin: `0 0 ${primitives.spacing[8]} 0`, fontSize: '18px', fontWeight: '600' }}>
              Card Title
            </h4>
            <p style={{ margin: `0 0 ${primitives.spacing[16]} 0`, color: '#737373', lineHeight: '1.5' }}>
              This card uses spacing[24] for padding and spacing[8] for title margin.
            </p>
            <div style={{ display: 'flex', gap: primitives.spacing[12] }}>
              <button
                style={{
                  padding: `${primitives.spacing[12]} ${primitives.spacing[24]}`,
                  backgroundColor: '#3B82F6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                Primary
              </button>
              <button
                style={{
                  padding: `${primitives.spacing[12]} ${primitives.spacing[24]}`,
                  backgroundColor: 'transparent',
                  color: '#3B82F6',
                  border: '1px solid #3B82F6',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                Secondary
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Touch Target Spacing</h3>
          <div style={{ display: 'flex', gap: primitives.spacing[24], flexWrap: 'wrap' }}>
            {[1, 2, 3, 4].map((i) => (
              <button
                key={i}
                style={{
                  padding: primitives.spacing[32],
                  minWidth: '44px',
                  minHeight: '44px',
                  backgroundColor: '#3B82F6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                {i}
              </button>
            ))}
          </div>
          <p style={{ marginTop: '16px', fontSize: '14px', color: '#737373' }}>
            Buttons use spacing[32] padding and spacing[24] gap (WCAG compliant)
          </p>
        </div>

        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Form Layout</h3>
          <div style={{ maxWidth: '400px' }}>
            <div style={{ marginBottom: primitives.spacing[16] }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: primitives.spacing[8],
                  fontSize: '14px',
                  fontWeight: '500',
                }}
              >
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  padding: primitives.spacing[12],
                  border: '1px solid #E5E5E5',
                  borderRadius: '6px',
                  fontSize: '14px',
                }}
              />
            </div>
            <div style={{ marginBottom: primitives.spacing[24] }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: primitives.spacing[8],
                  fontSize: '14px',
                  fontWeight: '500',
                }}
              >
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: primitives.spacing[12],
                  border: '1px solid #E5E5E5',
                  borderRadius: '6px',
                  fontSize: '14px',
                }}
              />
            </div>
            <button
              style={{
                width: '100%',
                padding: `${primitives.spacing[12]} ${primitives.spacing[24]}`,
                backgroundColor: '#3B82F6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              Sign In
            </button>
          </div>
          <p style={{ marginTop: '16px', fontSize: '14px', color: '#737373' }}>
            Form uses spacing[8] for labels, spacing[12] for input padding, spacing[16] between fields
          </p>
        </div>
      </div>
    </div>
  ),
};
