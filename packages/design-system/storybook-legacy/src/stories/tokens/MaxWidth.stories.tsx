import type { Meta, StoryObj } from '@storybook/react-vite';

import tokens from '@grasdouble/lufa_design-system-tokens';

const meta = {
  title: '1. Tokens/Max Width',
  parameters: {
    layout: 'padded',
  },
  tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1200px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Max-Width Tokens</h1>
      <p style={{ marginBottom: '32px', color: tokens.color.text.tertiary, fontSize: '16px' }}>
        Standardized maximum widths for components like modals, containers, and content areas. These tokens define
        responsive width constraints used across the design system.
      </p>

      <div style={{ marginBottom: '40px' }}>
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
          <div style={{ marginBottom: '8px' }}>
            <span style={{ color: tokens.color.brand.secondary, }}>const</span>{' '}
            <span style={{ color: tokens.color.error.text, }}>styles</span> ={' '}
            <span style={{ color: tokens.color.success.text, }}>{'{'}</span>
          </div>
          <div style={{ marginLeft: '20px', marginBottom: '8px' }}>
            <span style={{ color: tokens.color.warning.text, }}>maxWidth</span>: tokens.maxWidth['2xl'],{' '}
            <span style={{ color: tokens.color.text.tertiary, }}>// 42rem (672px)</span>
          </div>
          <div>
            <span style={{ color: tokens.color.success.text, }}>{'}'}</span>;
          </div>
          <div style={{ marginTop: '16px', color: tokens.color.text.tertiary, }}>
            // Or using CSS variables:
          </div>
          <div style={{ marginTop: '8px' }}>
            <span style={{ color: tokens.color.warning.text, }}>max-width</span>:{' '}
            <span style={{ color: tokens.color.success.text, }}>var</span>
            <span style={{ color: tokens.color.error.text, }}>(--lufa-token-max-width-2xl)</span>;
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>All Max-Width Tokens</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {Object.entries(tokens.maxWidth).map(([key, value]) => {
          // Convert rem to px for display (1rem = 16px)
          const pxValue = value === 'none' || value === '100%' ? value : `${parseFloat(value) * 16}px`;

          return (
            <div
              key={key}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px',
                backgroundColor: tokens.color.surface.default,
                border: `1px solid ${tokens.color.border.light}`,
                borderRadius: '8px',
              }}
            >
              <div
                style={{
                  flex: '0 0 120px',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                {key}
              </div>
              <div style={{ flex: '0 0 100px', color: tokens.color.text.tertiary, fontSize: '14px' }}>
                {value}
              </div>
              <div style={{ flex: '0 0 100px', color: tokens.color.text.disabled, fontSize: '13px' }}>
                {pxValue}
              </div>
              <div style={{ flex: 1, marginLeft: '16px' }}>
                <div
                  style={{
                    width: '100%',
                    maxWidth: value === 'none' ? '100%' : value === '100%' ? '100%' : value,
                    height: '8px',
                    backgroundColor: tokens.color.interactive.default,
                    borderRadius: '4px',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: '40px',
          padding: '20px',
          backgroundColor: tokens.color.info.light,
          borderRadius: '8px',
        }}
      >
        <h3
          style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '12px',
            color: tokens.color.info.text,
          }}
        >
          💡 Common Use Cases
        </h3>
        <ul
          style={{
            margin: 0,
            paddingLeft: '20px',
            color: tokens.color.info.text,
            fontSize: '14px',
            lineHeight: '1.6',
          }}
        >
          <li>
            <strong>md (32rem/512px)</strong>: Small modals, form dialogs
          </li>
          <li>
            <strong>2xl (42rem/672px)</strong>: Medium modals, content cards
          </li>
          <li>
            <strong>4xl (56rem/896px)</strong>: Large modals, detailed views
          </li>
          <li>
            <strong>6xl (72rem/1152px)</strong>: Wide content areas, dashboards
          </li>
          <li>
            <strong>full</strong>: Responsive containers that adapt to viewport
          </li>
          <li>
            <strong>none</strong>: No width constraint (fullscreen components)
          </li>
        </ul>
      </div>

      <div
        style={{
          marginTop: '24px',
          padding: '20px',
          backgroundColor: tokens.color.warning.light,
          borderRadius: '8px',
        }}
      >
        <h3
          style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '12px',
            color: tokens.color.warning.text,
          }}
        >
          ⚠️ Best Practices
        </h3>
        <ul
          style={{
            margin: 0,
            paddingLeft: '20px',
            color: tokens.color.warning.text,
            fontSize: '14px',
            lineHeight: '1.6',
          }}
        >
          <li>Use these tokens for consistent component sizing across the design system</li>
          <li>Prefer smaller max-widths for better readability (especially for text content)</li>
          <li>Combine with responsive design for optimal mobile experience</li>
          <li>Consider the content and context when choosing a max-width value</li>
        </ul>
      </div>
    </div>
  ),
};

export const ResponsiveDemo: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>Responsive Width Examples</h2>
      <p style={{ marginBottom: '32px', color: tokens.color.text.tertiary, fontSize: '14px' }}>
        Resize your browser window to see how different max-width values affect layout responsiveness.
      </p>

      {(['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const).map((size) => (
        <div key={size} style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
            {size.toUpperCase()} - {tokens.maxWidth[size]}
          </h3>
          <div
            style={{
              width: '100%',
              maxWidth: tokens.maxWidth[size],
              padding: '24px',
              backgroundColor: tokens.color.surface.default,
              border: `2px solid ${tokens.color.interactive.default}`,
              borderRadius: '8px',
            }}
          >
            <p style={{ margin: 0, color: tokens.color.text.secondary, fontSize: '14px' }}>
              This container has a max-width of <strong>{tokens.maxWidth[size]}</strong>. It will shrink on smaller
              screens but never exceed this width on larger screens.
            </p>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const ModalSizeComparison: Story = {
  render: () => (
    <div
      style={{ padding: '20px', backgroundColor: tokens.color.background.tertiary, minHeight: '100vh' }}
    >
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>Modal Size Comparison</h2>
      <p style={{ marginBottom: '32px', color: tokens.color.text.tertiary, fontSize: '14px' }}>
        Visual comparison of the max-width tokens commonly used for modal components.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'flex-start', width: '100%' }}>
        {/* Small Modal */}
        <div style={{ width: '100%' }}>
          <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '12px',
                fontWeight: '600',
                color: tokens.color.text.secondary,
              }}
            >
              md (512px / 32rem)
            </div>
            <div
              style={{
                flex: 1,
                height: '2px',
                background: `linear-gradient(to right, ${tokens.color.brand.primary} 0%, ${tokens.color.brand.primary} ${tokens.maxWidth.md}, transparent ${tokens.maxWidth.md})`,
              }}
            />
          </div>
          <div style={{ maxWidth: tokens.maxWidth.md }}>
            <div
              style={{
                backgroundColor: tokens.color.surface.default,
                borderRadius: '8px',
                boxShadow: tokens.shadow.lg,
                overflow: 'hidden',
                border: `2px solid ${tokens.color.brand.primary}`,
              }}
            >
              <div style={{ padding: '20px', borderBottom: `1px solid ${tokens.color.border.light}` }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Small Modal</h3>
              </div>
              <div style={{ padding: '20px' }}>
                <p style={{ margin: 0, color: tokens.color.text.tertiary, fontSize: '14px' }}>
                  Perfect for simple dialogs, confirmations, and quick forms.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Medium Modal */}
        <div style={{ width: '100%' }}>
          <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '12px',
                fontWeight: '600',
                color: tokens.color.text.secondary,
              }}
            >
              2xl (672px / 42rem)
            </div>
            <div
              style={{
                flex: 1,
                height: '2px',
                background: `linear-gradient(to right, ${tokens.color.success.default} 0%, ${tokens.color.success.default} ${tokens.maxWidth['2xl']}, transparent ${tokens.maxWidth['2xl']})`,
              }}
            />
          </div>
          <div style={{ maxWidth: tokens.maxWidth['2xl'] }}>
            <div
              style={{
                backgroundColor: tokens.color.surface.default,
                borderRadius: '8px',
                boxShadow: tokens.shadow.lg,
                overflow: 'hidden',
                border: `2px solid ${tokens.color.success.default}`,
              }}
            >
              <div style={{ padding: '20px', borderBottom: `1px solid ${tokens.color.border.light}` }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Medium Modal</h3>
              </div>
              <div style={{ padding: '20px' }}>
                <p style={{ margin: 0, color: tokens.color.text.tertiary, fontSize: '14px' }}>
                  Ideal for standard forms, content displays, and most modal use cases.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Large Modal */}
        <div style={{ width: '100%' }}>
          <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '12px',
                fontWeight: '600',
                color: tokens.color.text.secondary,
              }}
            >
              4xl (896px / 56rem)
            </div>
            <div
              style={{
                flex: 1,
                height: '2px',
                background: `linear-gradient(to right, ${tokens.color.warning.default} 0%, ${tokens.color.warning.default} ${tokens.maxWidth['4xl']}, transparent ${tokens.maxWidth['4xl']})`,
              }}
            />
          </div>
          <div style={{ maxWidth: tokens.maxWidth['4xl'] }}>
            <div
              style={{
                backgroundColor: tokens.color.surface.default,
                borderRadius: '8px',
                boxShadow: tokens.shadow.lg,
                overflow: 'hidden',
                border: `2px solid ${tokens.color.warning.default}`,
              }}
            >
              <div style={{ padding: '20px', borderBottom: `1px solid ${tokens.color.border.light}` }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Large Modal</h3>
              </div>
              <div style={{ padding: '20px' }}>
                <p style={{ margin: 0, color: tokens.color.text.tertiary, fontSize: '14px' }}>
                  Great for complex forms, detailed views, and content-heavy modals.
                </p>
              </div>
            </div>
          </div>
        </div>
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
        <div style={{ fontWeight: '600', marginBottom: '8px', color: tokens.color.info.text, }}>💡 Tip</div>
        <div style={{ fontSize: '14px', color: tokens.color.info.text, }}>
          The colored line above each modal shows its maximum width. Resize your browser window to see how modals
          respond at different viewport sizes. Each modal has a different colored border to make size differences more
          apparent.
        </div>
      </div>
    </div>
  ),
};
