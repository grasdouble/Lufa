import type { Meta, StoryObj } from '@storybook/react-vite';

import primitives from '@grasdouble/lufa_design-system-primitives';

const meta = {
  title: '0. Primitives/Opacity',
  parameters: {
    layout: 'padded',
  },
  tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllOpacity: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Opacity Primitives</h1>
      <p style={{ marginBottom: '32px', color: primitives.color.neutral.neutral[600], fontSize: '16px' }}>
        Primitive opacity values for transparency. CAUTION: Opacity reduces effective contrast - verify WCAG compliance
        when using opacity on text.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        {Object.entries(primitives.opacity).map(([key, value]) => (
          <div
            key={key}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              padding: '16px',
              backgroundColor: primitives.color.neutral.neutral[50],
              borderRadius: '8px',
              border: `1px solid ${primitives.color.neutral.neutral[200]}`,
            }}
          >
            <div style={{ fontFamily: 'monospace', fontWeight: '600', fontSize: '14px' }}>opacity[{key}]</div>
            <div
              style={{
                position: 'relative',
                height: '100px',
                borderRadius: '6px',
                overflow: 'hidden',
                backgroundColor: primitives.color.neutral.neutral[0],
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  fontWeight: '600',
                  color: primitives.color.neutral.neutral[600],
                }}
              >
                Background
              </div>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: primitives.color.chromatic.blue[500],
                  opacity: value,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: primitives.color.neutral.white,
                  fontWeight: '600',
                }}
              >
                {key}%
              </div>
            </div>
            <div style={{ fontSize: '11px', color: primitives.color.neutral.neutral[600] }}>
              {Number(key) <= 25 && '⚠️ Decorative only - never for text'}
              {Number(key) === 50 && '⚠️ May violate WCAG for text'}
              {Number(key) === 75 && '⚠️ Verify contrast for text'}
              {Number(key) >= 90 && '✓ Generally safe for text'}
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
        <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600' }}>WCAG Warnings</h3>
        <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.6' }}>
          <li>
            <strong>Opacity reduces contrast</strong>: Test actual contrast ratios with tools
          </li>
          <li>
            <strong>Text opacity &lt; 90%</strong>: Likely fails WCAG contrast requirements
          </li>
          <li>
            <strong>Disabled states</strong>: Still need 3:1 contrast (WCAG 1.4.3)
          </li>
        </ul>
      </div>
    </div>
  ),
};

export const UsageExamples: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>Opacity Usage Examples</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Modal Overlay</h3>
          <div style={{ position: 'relative', height: '300px', borderRadius: '12px', overflow: 'hidden' }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `linear-gradient(135deg, ${primitives.color.chromatic.blue[500]} 0%, ${primitives.color.chromatic.purple[500]} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: primitives.color.neutral.white,
                fontSize: '24px',
                fontWeight: '600',
              }}
            >
              Page Content
            </div>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: primitives.color.neutral.black,
                opacity: primitives.opacity[75],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  padding: '32px',
                  backgroundColor: primitives.color.neutral.neutral[0],
                  borderRadius: '12px',
                  boxShadow: primitives.shadow.xl,
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: primitives.color.neutral.black,
                  }}
                >
                  Modal Dialog
                </div>
                <div style={{ fontSize: '14px', color: primitives.color.neutral.neutral[600] }}>75% black overlay</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Disabled States</h3>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button
              style={{
                padding: '12px 24px',
                backgroundColor: primitives.color.chromatic.blue[500],
                color: primitives.color.neutral.white,
                border: 'none',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              Enabled
            </button>
            <button
              style={{
                padding: '12px 24px',
                backgroundColor: primitives.color.chromatic.blue[500],
                color: primitives.color.neutral.white,
                border: 'none',
                borderRadius: '6px',
                fontWeight: '500',
                opacity: primitives.opacity[50],
                cursor: 'not-allowed',
              }}
            >
              Disabled (50%)
            </button>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Hover Effects</h3>
          <div
            style={{
              display: 'inline-block',
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
              alt="Example"
              style={{ display: 'block', width: '400px', height: '300px', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: primitives.color.neutral.black,
                opacity: 0,
                transition: 'opacity 150ms',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: primitives.color.neutral.white,
                fontSize: '18px',
                fontWeight: '600',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = String(primitives.opacity[25]))}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
            >
              Hover to see overlay
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Loading Skeleton</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
            <div
              style={{
                height: '20px',
                backgroundColor: primitives.color.neutral.neutral[200],
                borderRadius: '4px',
                opacity: primitives.opacity[50],
              }}
            />
            <div
              style={{
                height: '20px',
                backgroundColor: primitives.color.neutral.neutral[200],
                borderRadius: '4px',
                width: '80%',
                opacity: primitives.opacity[50],
              }}
            />
            <div
              style={{
                height: '20px',
                backgroundColor: primitives.color.neutral.neutral[200],
                borderRadius: '4px',
                width: '60%',
                opacity: primitives.opacity[50],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  ),
};
