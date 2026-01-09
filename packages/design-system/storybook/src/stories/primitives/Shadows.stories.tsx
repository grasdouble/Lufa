import type { Meta, StoryObj } from '@storybook/react-vite';

import primitives from '@grasdouble/lufa_design-system-primitives';

const meta = {
  title: '0. Primitives/Shadows',
  parameters: {
    layout: 'padded',
  },
  tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllShadows: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Shadow Primitives</h1>
      <p style={{ marginBottom: '32px', color: primitives.color.neutral.neutral[600], fontSize: '16px' }}>
        Primitive shadow values using t-shirt sizing for depth and elevation hierarchy. Use shadows to indicate
        layering and interactive affordance.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {Object.entries(primitives.shadow).map(([key, value]) => (
          <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div
              style={{
                padding: '32px',
                backgroundColor: primitives.color.neutral.white,
                borderRadius: '12px',
                boxShadow: value,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '140px',
              }}
            >
              <div style={{ fontWeight: '600', fontSize: '18px', marginBottom: '8px' }}>{key}</div>
              <div style={{ fontSize: '12px', color: primitives.color.neutral.neutral[600], textAlign: 'center' }}>
                {key === 'none' && 'Flat design'}
                {key === 'xs' && 'Subtle depth'}
                {key === 'sm' && 'Hover states'}
                {key === 'md' && 'Cards, buttons'}
                {key === 'lg' && 'Dropdowns, popovers'}
                {key === 'xl' && 'Modals, dialogs'}
                {key === '2xl' && 'Floating buttons, app bars'}
                {key === '3xl' && 'Hero sections'}
                {key === '4xl' && 'Dramatic emphasis'}
                {key === '5xl' && 'Maximum elevation'}
              </div>
            </div>
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '10px',
                color: primitives.color.neutral.neutral[600],
                padding: '8px',
                backgroundColor: primitives.color.neutral.neutral[50],
                borderRadius: '4px',
                wordBreak: 'break-all',
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: '40px',
          padding: '24px',
          backgroundColor: primitives.color.chromatic.orange[100],
          borderRadius: '12px',
          border: `1px solid ${primitives.color.chromatic.orange[300]}`,
        }}
      >
        <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600' }}>WCAG Accessibility</h3>
        <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.6' }}>
          <li>Shadows should not be the only visual indicator (WCAG 1.4.1)</li>
          <li>Maintain sufficient contrast on elevated surfaces (WCAG 1.4.3)</li>
          <li>Use shadows to indicate interactive affordance</li>
        </ul>
      </div>
    </div>
  ),
};

export const UsageExamples: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>Shadow Usage Examples</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Cards</h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px',
            }}
          >
            <div
              style={{
                padding: '20px',
                backgroundColor: primitives.color.neutral.white,
                borderRadius: '12px',
                boxShadow: primitives.shadow.sm,
              }}
            >
              <div style={{ fontWeight: '600', marginBottom: '8px' }}>Card with sm shadow</div>
              <div style={{ fontSize: '14px', color: primitives.color.neutral.neutral[600] }}>
                Subtle elevation for basic cards
              </div>
            </div>
            <div
              style={{
                padding: '20px',
                backgroundColor: primitives.color.neutral.white,
                borderRadius: '12px',
                boxShadow: primitives.shadow.md,
              }}
            >
              <div style={{ fontWeight: '600', marginBottom: '8px' }}>Card with md shadow</div>
              <div style={{ fontSize: '14px', color: primitives.color.neutral.neutral[600] }}>
                Standard elevation for prominent cards
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Interactive States</h3>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              style={{
                padding: '12px 24px',
                backgroundColor: primitives.color.chromatic.blue[500],
                color: primitives.color.neutral.white,
                border: 'none',
                borderRadius: '8px',
                fontWeight: '500',
                cursor: 'pointer',
                boxShadow: primitives.shadow.sm,
                transition: 'box-shadow 150ms',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = primitives.shadow.md)}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = primitives.shadow.sm)}
            >
              Hover Me
            </button>
            <div
              style={{
                padding: '16px',
                backgroundColor: primitives.color.neutral.white,
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: primitives.shadow.md,
                transition: 'box-shadow 150ms',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = primitives.shadow.lg)}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = primitives.shadow.md)}
            >
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>Interactive Card</div>
              <div style={{ fontSize: '14px', color: primitives.color.neutral.neutral[600] }}>
                Hover to see elevation change
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Dropdown Menu</h3>
          <div
            style={{
              width: '240px',
              backgroundColor: primitives.color.neutral.white,
              borderRadius: '8px',
              boxShadow: primitives.shadow.lg,
              overflow: 'hidden',
            }}
          >
            {['Profile', 'Settings', 'Team', 'Sign out'].map((item, i) => (
              <div
                key={item}
                style={{
                  padding: '12px 16px',
                  cursor: 'pointer',
                  borderTop: i > 0 ? `1px solid ${primitives.color.neutral.neutral[100]}` : 'none',
                  transition: 'background-color 150ms',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = primitives.color.neutral.neutral[50])}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = primitives.color.neutral.white)}
              >
                {item}
              </div>
            ))}
          </div>
          <p style={{ marginTop: '12px', fontSize: '14px', color: primitives.color.neutral.neutral[600] }}>
            Uses shadow.lg for clear separation from page
          </p>
        </div>

        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Modal Dialog</h3>
          <div
            style={{
              maxWidth: '500px',
              padding: '32px',
              backgroundColor: primitives.color.neutral.white,
              borderRadius: '16px',
              boxShadow: primitives.shadow.xl,
            }}
          >
            <h4 style={{ margin: '0 0 16px 0', fontSize: '24px', fontWeight: '600' }}>Confirm Action</h4>
            <p style={{ margin: '0 0 24px 0', color: primitives.color.neutral.neutral[600], lineHeight: '1.5' }}>
              Are you sure you want to continue? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'transparent',
                  color: primitives.color.neutral.neutral[600],
                  border: `1px solid ${primitives.color.neutral.neutral[200]}`,
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                style={{
                  padding: '10px 20px',
                  backgroundColor: primitives.color.chromatic.red[500],
                  color: primitives.color.neutral.white,
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                Confirm
              </button>
            </div>
          </div>
          <p style={{ marginTop: '12px', fontSize: '14px', color: primitives.color.neutral.neutral[600] }}>
            Uses shadow.xl for strong elevation above page content
          </p>
        </div>

        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Floating Action Button</h3>
          <button
            style={{
              width: '64px',
              height: '64px',
              backgroundColor: primitives.color.chromatic.blue[500],
              color: primitives.color.neutral.white,
              border: 'none',
              borderRadius: '50%',
              fontSize: '24px',
              cursor: 'pointer',
              boxShadow: primitives.shadow['2xl'],
              transition: 'box-shadow 150ms',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = primitives.shadow['3xl'])}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = primitives.shadow['2xl'])}
          >
            +
          </button>
          <p style={{ marginTop: '12px', fontSize: '14px', color: primitives.color.neutral.neutral[600] }}>
            Uses shadow.2xl for prominent floating appearance
          </p>
        </div>

        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Elevation Comparison</h3>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            {['none', 'xs', 'sm', 'md', 'lg', 'xl'].map((level) => (
              <div
                key={level}
                style={{
                  width: '80px',
                  height: `${80 + (level === 'none' ? 0 : ['xs', 'sm', 'md', 'lg', 'xl'].indexOf(level) * 20)}px`,
                  backgroundColor: primitives.color.neutral.white,
                  borderRadius: '8px',
                  boxShadow: primitives.shadow[level as keyof typeof primitives.shadow],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: primitives.color.neutral.neutral[600],
                }}
              >
                {level}
              </div>
            ))}
          </div>
          <p style={{ marginTop: '16px', fontSize: '14px', color: primitives.color.neutral.neutral[600] }}>
            Visual comparison of elevation levels - notice the progressive depth
          </p>
        </div>
      </div>
    </div>
  ),
};
