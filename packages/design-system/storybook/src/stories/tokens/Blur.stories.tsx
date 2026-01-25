import type { Meta, StoryObj } from '@storybook/react-vite';

import primitives from '@grasdouble/lufa_design-system-primitives';
import tokens from '@grasdouble/lufa_design-system-tokens';

const meta = {
  title: '1. Tokens/Blur',
  parameters: {
    layout: 'padded',
  },
  tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllBlurLevels: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Blur Tokens</h1>
      <p style={{ marginBottom: '32px', color: tokens.color.text.tertiary, fontSize: '16px' }}>
        Semantic blur values for backdrop filters, overlays, and frosted glass effects. Ensure sufficient contrast for
        accessibility.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
          marginBottom: '32px',
        }}
      >
        {Object.entries(tokens.blur).map(([key, value]) => (
          <div
            key={key}
            style={{
              position: 'relative',
              height: '220px',
              borderRadius: '16px',
              overflow: 'hidden',
              border: `2px solid ${tokens.color.border.default}`,
            }}
          >
            {/* High-contrast background pattern with text */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
                  repeating-linear-gradient(
                    45deg,
                    ${primitives.color.chromatic.blue[600]} 0px,
                    ${primitives.color.chromatic.blue[600]} 20px,
                    ${primitives.color.chromatic.purple[600]} 20px,
                    ${primitives.color.chromatic.purple[600]} 40px,
                    ${primitives.color.chromatic.pink[600]} 40px,
                    ${primitives.color.chromatic.pink[600]} 60px,
                    ${primitives.color.chromatic.orange[600]} 60px,
                    ${primitives.color.chromatic.orange[600]} 80px
                  )
                `,
              }}
            >
              {/* Add text pattern to show blur effect on text */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '4px',
                  padding: '8px',
                }}
              >
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: primitives.color.neutral.white,
                      textShadow: '0 0 4px rgba(0,0,0,0.5)',
                    }}
                  >
                    Aa
                  </div>
                ))}
              </div>
            </div>

            {/* Blurred overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backdropFilter: `blur(${value})`,
                WebkitBackdropFilter: `blur(${value})`,
                backgroundColor: `color-mix(in oklab, ${tokens.color.surface.default} 20%, transparent)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                gap: '8px',
              }}
            >
              <div
                style={{
                  fontFamily: 'monospace',
                  fontWeight: '700',
                  fontSize: '18px',
                  color: tokens.color.text.primary,
                  textShadow: `0 2px 8px ${tokens.color.surface.default}`,
                  backgroundColor: `color-mix(in oklab, ${tokens.color.surface.default} 60%, transparent)`,
                  padding: '8px 16px',
                  borderRadius: '8px',
                }}
              >
                blur.{key}
              </div>
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: tokens.color.text.secondary,
                  backgroundColor: `color-mix(in oklab, ${tokens.color.surface.default} 80%, transparent)`,
                  padding: '4px 12px',
                  borderRadius: '6px',
                }}
              >
                {value}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: '32px',
          padding: '16px',
          backgroundColor: tokens.color.info.light,
          border: `1px solid ${tokens.color.info.border}`,
          borderRadius: '8px',
        }}
      >
        <div style={{ fontWeight: '600', marginBottom: '8px', color: tokens.color.info.text }}>
          Browser Support & Fallbacks
        </div>
        <div style={{ fontSize: '14px', color: tokens.color.info.text, marginBottom: '12px' }}>
          backdrop-filter is supported in modern browsers. Always provide fallback backgrounds for older browsers.
        </div>
        <pre
          style={{
            margin: 0,
            padding: '12px',
            backgroundColor: tokens.color.surface.overlay,
            color: tokens.color.success.default,
            borderRadius: '6px',
            fontSize: '12px',
            overflow: 'auto',
          }}
        >
          {`.frosted-glass {
  background-color: rgba(255, 255, 255, 0.8); /* Fallback */
  backdrop-filter: blur(${tokens.blur.base});
  -webkit-backdrop-filter: blur(${tokens.blur.base});
}

/* Feature detection */
@supports (backdrop-filter: blur(8px)) {
  .frosted-glass {
    background-color: rgba(255, 255, 255, 0.6);
  }
}`}
        </pre>
      </div>

      <div
        style={{
          marginTop: '16px',
          padding: '16px',
          backgroundColor: tokens.color.warning.light,
          border: `1px solid ${tokens.color.warning.border}`,
          borderRadius: '8px',
        }}
      >
        <div style={{ fontWeight: '600', marginBottom: '8px', color: tokens.color.warning.text }}>
          ⚠️ Accessibility Considerations
        </div>
        <ul style={{ margin: 0, paddingLeft: '20px', color: tokens.color.warning.text, fontSize: '14px' }}>
          <li>Ensure sufficient text contrast (4.5:1 for body, 3:1 for large text) on blurred backgrounds</li>
          <li>Test with different background colors and images</li>
          <li>Provide alternative visual cues beyond blur effects</li>
          <li>Consider performance impact on low-end devices</li>
        </ul>
      </div>
    </div>
  ),
};

export const UsageExamples: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Blur Usage Examples</h1>

      {/* Frosted Glass Card */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Frosted Glass Card</h2>
        <div
          style={{
            position: 'relative',
            height: '320px',
            borderRadius: '16px',
            overflow: 'hidden',
            border: `2px solid ${tokens.color.border.default}`,
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                ${primitives.color.chromatic.blue[400]} 0px,
                ${primitives.color.chromatic.cyan[400]} 50px,
                ${primitives.color.chromatic.teal[400]} 100px,
                ${primitives.color.chromatic.green[400]} 150px,
                ${primitives.color.chromatic.emerald[400]} 200px
              )
            `,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Add decorative circles */}
          <div
            style={{
              position: 'absolute',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: primitives.color.chromatic.purple[500],
              top: '-50px',
              left: '10%',
              opacity: 0.6,
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: primitives.color.chromatic.pink[500],
              bottom: '-30px',
              right: '15%',
              opacity: 0.6,
            }}
          />

          <div
            style={{
              backdropFilter: `blur(${tokens.blur.subtle})`,
              WebkitBackdropFilter: `blur(${tokens.blur.subtle})`,
              backgroundColor: `color-mix(in oklab, ${tokens.color.surface.default} 70%, transparent)`,
              padding: '32px',
              borderRadius: '16px',
              maxWidth: '450px',
              border: `1px solid color-mix(in oklab, ${tokens.color.border.light} 50%, transparent)`,
              boxShadow: tokens.shadow.lg,
            }}
          >
            <h3
              style={{
                fontSize: '28px',
                fontWeight: '700',
                marginBottom: '12px',
                color: tokens.color.text.primary,
              }}
            >
              Frosted Glass Effect
            </h3>
            <p style={{ color: tokens.color.text.secondary, lineHeight: 1.6, marginBottom: '16px' }}>
              Using{' '}
              <code
                style={{
                  fontFamily: 'monospace',
                  backgroundColor: `color-mix(in oklab, ${tokens.color.surface.raised} 80%, transparent)`,
                  padding: '2px 6px',
                  borderRadius: '4px',
                }}
              >
                blur.subtle
              </code>{' '}
              for a gentle frosted glass appearance that maintains readability while adding visual depth.
            </p>
            <div
              style={{
                fontSize: '14px',
                color: tokens.color.text.tertiary,
                fontStyle: 'italic',
              }}
            >
              The colorful gradient behind remains partially visible, creating an elegant overlay effect.
            </div>
          </div>
        </div>
        <p style={{ marginTop: '12px', fontSize: '12px', color: tokens.color.text.tertiary }}>
          Using blur.subtle for frosted glass cards with decorative backgrounds
        </p>
      </div>

      {/* Modal Overlay */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Modal Overlay</h2>
        <div
          style={{
            position: 'relative',
            height: '320px',
            borderRadius: '16px',
            overflow: 'hidden',
            border: `2px solid ${tokens.color.border.default}`,
            backgroundColor: tokens.color.background.tertiary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Mock background content - more detailed */}
          <div style={{ padding: '40px', textAlign: 'center', width: '100%' }}>
            <div
              style={{
                fontSize: '24px',
                fontWeight: '700',
                marginBottom: '20px',
                color: tokens.color.text.primary,
              }}
            >
              Page Content Behind Modal
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              {['Feature 1', 'Feature 2', 'Feature 3', 'Item A', 'Item B', 'Item C'].map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: '16px',
                    backgroundColor: tokens.color.surface.raised,
                    borderRadius: '8px',
                    border: `1px solid ${tokens.color.border.light}`,
                    fontSize: '14px',
                    fontWeight: '600',
                    color: tokens.color.text.secondary,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Blurred overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backdropFilter: `blur(${tokens.blur.base})`,
              WebkitBackdropFilter: `blur(${tokens.blur.base})`,
              backgroundColor: tokens.color.background.overlay,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                backgroundColor: tokens.color.surface.raised,
                padding: '32px',
                borderRadius: '16px',
                maxWidth: '400px',
                border: `2px solid ${tokens.color.border.default}`,
                boxShadow: tokens.shadow.xl,
              }}
            >
              <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>Modal Dialog</h3>
              <p style={{ color: tokens.color.text.secondary, marginBottom: '20px', lineHeight: 1.6 }}>
                The background content is blurred using{' '}
                <code
                  style={{
                    fontFamily: 'monospace',
                    backgroundColor: tokens.color.surface.default,
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}
                >
                  blur.base
                </code>{' '}
                to focus attention on this modal while maintaining context.
              </p>
              <button
                style={{
                  padding: '12px 24px',
                  backgroundColor: tokens.color.interactive.focus,
                  color: tokens.color.text.inverse,
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                }}
              >
                Confirm Action
              </button>
            </div>
          </div>
        </div>
        <p style={{ marginTop: '12px', fontSize: '12px', color: tokens.color.text.tertiary }}>
          Using blur.base for modal overlays to maintain focus without losing context
        </p>
      </div>

      {/* Privacy Screen */}
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Privacy Screen</h2>
        <div
          style={{
            position: 'relative',
            height: '320px',
            borderRadius: '16px',
            overflow: 'hidden',
            border: `2px solid ${tokens.color.border.default}`,
            backgroundColor: tokens.color.surface.raised,
            padding: '32px',
          }}
        >
          {/* Mock sensitive content - more detailed */}
          <div>
            <div
              style={{
                fontSize: '18px',
                fontWeight: '700',
                marginBottom: '16px',
                color: tokens.color.text.primary,
              }}
            >
              Personal Information Dashboard
            </div>
            <div
              style={{
                display: 'grid',
                gap: '12px',
                color: tokens.color.text.secondary,
                fontSize: '14px',
              }}
            >
              <div
                style={{
                  padding: '12px',
                  backgroundColor: tokens.color.surface.default,
                  borderRadius: '8px',
                  border: `1px solid ${tokens.color.border.light}`,
                }}
              >
                <strong>Name:</strong> John Doe
              </div>
              <div
                style={{
                  padding: '12px',
                  backgroundColor: tokens.color.surface.default,
                  borderRadius: '8px',
                  border: `1px solid ${tokens.color.border.light}`,
                }}
              >
                <strong>Email:</strong> john.doe@example.com
              </div>
              <div
                style={{
                  padding: '12px',
                  backgroundColor: tokens.color.surface.default,
                  borderRadius: '8px',
                  border: `1px solid ${tokens.color.border.light}`,
                }}
              >
                <strong>Phone:</strong> +1 (234) 567-8900
              </div>
              <div
                style={{
                  padding: '12px',
                  backgroundColor: tokens.color.surface.default,
                  borderRadius: '8px',
                  border: `1px solid ${tokens.color.border.light}`,
                }}
              >
                <strong>Address:</strong> 123 Main Street, Apt 4B, Springfield, ST 12345
              </div>
              <div
                style={{
                  padding: '12px',
                  backgroundColor: tokens.color.surface.default,
                  borderRadius: '8px',
                  border: `1px solid ${tokens.color.border.light}`,
                }}
              >
                <strong>SSN:</strong> ***-**-1234
              </div>
            </div>
          </div>

          {/* Privacy blur overlay */}
          <div
            style={{
              position: 'absolute',
              inset: '32px',
              backdropFilter: `blur(${tokens.blur.extraStrong})`,
              WebkitBackdropFilter: `blur(${tokens.blur.extraStrong})`,
              backgroundColor: `color-mix(in oklab, ${tokens.color.background.inverse} 40%, transparent)`,
              borderRadius: '12px',
              border: `2px solid ${tokens.color.border.default}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ textAlign: 'center', color: tokens.color.text.inverse }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔒</div>
              <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>Content Hidden for Privacy</div>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>Click to reveal sensitive information</div>
            </div>
          </div>
        </div>
        <p style={{ marginTop: '12px', fontSize: '12px', color: tokens.color.text.tertiary }}>
          Using blur.extraStrong for maximum privacy - completely obscures sensitive data
        </p>
      </div>

      <div
        style={{
          marginTop: '32px',
          padding: '16px',
          backgroundColor: tokens.color.warning.light,
          border: `1px solid ${tokens.color.warning.border}`,
          borderRadius: '8px',
        }}
      >
        <div style={{ fontWeight: '600', marginBottom: '8px', color: tokens.color.warning.text }}>
          💡 Best Practices
        </div>
        <ul style={{ margin: 0, paddingLeft: '20px', color: tokens.color.warning.text, fontSize: '14px' }}>
          <li>Use blur.subtle for gentle depth without obscuring content</li>
          <li>Use blur.base for standard overlays and frosted glass</li>
          <li>Use blur.strong or blur.extraStrong for focus or privacy</li>
          <li>Combine with semi-transparent backgrounds for better effect</li>
          <li>Test performance on mobile devices (blur can be GPU-intensive)</li>
          <li>Always provide fallback styles for browsers without support</li>
        </ul>
      </div>
    </div>
  ),
};
