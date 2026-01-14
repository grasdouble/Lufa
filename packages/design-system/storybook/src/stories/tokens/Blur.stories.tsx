import type { Meta, StoryObj } from '@storybook/react-vite';

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
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '32px',
        }}
      >
        {Object.entries(tokens.blur).map(([key, value]) => (
          <div
            key={key}
            style={{
              position: 'relative',
              height: '200px',
              borderRadius: '12px',
              overflow: 'hidden',
              border: `1px solid ${tokens.color.border.light}`,
            }}
          >
            {/* Background image/pattern */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `linear-gradient(45deg, ${tokens.color.interactive.focus} 25%, ${tokens.color.success.default} 25%, ${tokens.color.success.default} 50%, ${tokens.color.interactive.focus} 50%, ${tokens.color.interactive.focus} 75%, ${tokens.color.success.default} 75%, ${tokens.color.success.default})`,
                backgroundSize: '40px 40px',
              }}
            />

            {/* Blurred overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backdropFilter: `blur(${value})`,
                WebkitBackdropFilter: `blur(${value})`,
                backgroundColor: `color-mix(in oklab, ${tokens.color.background.primary} 70%, transparent)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
              }}
            >
              <div
                style={{
                  fontFamily: 'monospace',
                  fontWeight: '600',
                  fontSize: '14px',
                  marginBottom: '4px',
                  color: tokens.color.text.primary,
                }}
              >
                blur.{key}
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: '12px', color: tokens.color.text.secondary }}>
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
            backgroundColor: tokens.color.background.inverse,
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
            height: '300px',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundImage: 'url(https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=400&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              backdropFilter: `blur(${tokens.blur.subtle})`,
              WebkitBackdropFilter: `blur(${tokens.blur.subtle})`,
              backgroundColor: `color-mix(in oklab, ${tokens.color.background.primary} 70%, transparent)`,
              padding: '32px',
              borderRadius: '12px',
              maxWidth: '400px',
              border: `1px solid color-mix(in oklab, ${tokens.color.background.primary} 30%, transparent)`,
              boxShadow: tokens.shadow.lg,
            }}
          >
            <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px', color: tokens.color.text.primary }}>
              Frosted Glass Effect
            </h3>
            <p style={{ color: tokens.color.text.secondary, lineHeight: 1.6 }}>
              Using blur.subtle for a gentle frosted glass appearance that doesn't obscure the background too much.
            </p>
          </div>
        </div>
        <p style={{ marginTop: '12px', fontSize: '12px', color: tokens.color.text.tertiary }}>
          Using blur.subtle for frosted glass cards
        </p>
      </div>

      {/* Modal Overlay */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Modal Overlay</h2>
        <div
          style={{
            position: 'relative',
            height: '300px',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: tokens.color.background.tertiary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Mock background content */}
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <div
              style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: tokens.color.text.secondary }}
            >
              Background Content
            </div>
            <div style={{ color: tokens.color.text.disabled }}>This content is behind the modal overlay</div>
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
                backgroundColor: tokens.color.surface.default,
                padding: '32px',
                borderRadius: '12px',
                maxWidth: '400px',
                boxShadow: tokens.shadow.xl,
              }}
            >
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>Modal Dialog</h3>
              <p style={{ color: tokens.color.text.secondary, marginBottom: '20px' }}>
                The background is blurred using blur.base to focus attention on this modal.
              </p>
              <button
                style={{
                  padding: '10px 20px',
                  backgroundColor: tokens.color.interactive.focus,
                  color: tokens.color.text.inverse,
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
        <p style={{ marginTop: '12px', fontSize: '12px', color: tokens.color.text.tertiary }}>
          Using blur.base for modal overlays
        </p>
      </div>

      {/* Privacy Screen */}
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Privacy Screen</h2>
        <div
          style={{
            position: 'relative',
            height: '300px',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: tokens.color.surface.default,
            padding: '32px',
          }}
        >
          {/* Mock sensitive content */}
          <div style={{ marginBottom: '24px' }}>
            <div
              style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: tokens.color.text.secondary }}
            >
              Personal Information
            </div>
            <div style={{ color: tokens.color.text.disabled }}>
              Name: John Doe
              <br />
              Email: john.doe@example.com
              <br />
              Phone: +1 234 567 8900
              <br />
              Address: 123 Main St, City, Country
            </div>
          </div>

          {/* Privacy blur overlay */}
          <div
            style={{
              position: 'absolute',
              inset: '32px',
              backdropFilter: `blur(${tokens.blur.extraStrong})`,
              WebkitBackdropFilter: `blur(${tokens.blur.extraStrong})`,
              backgroundColor: `color-mix(in oklab, ${tokens.color.background.inverse} 30%, transparent)`,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ textAlign: 'center', color: tokens.color.text.inverse }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔒</div>
              <div style={{ fontSize: '16px', fontWeight: '600' }}>Content Hidden for Privacy</div>
            </div>
          </div>
        </div>
        <p style={{ marginTop: '12px', fontSize: '12px', color: tokens.color.text.tertiary }}>
          Using blur.extraStrong for maximum privacy
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
