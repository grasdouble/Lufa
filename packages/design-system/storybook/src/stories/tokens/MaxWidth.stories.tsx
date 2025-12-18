import type { Meta, StoryObj } from '@storybook/react-vite';
import { maxWidth } from '@grasdouble/lufa_design-system-tokens';

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
      <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
        Standardized maximum widths for components like modals, containers, and content areas. These tokens define
        responsive width constraints used across the design system.
      </p>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Usage</h2>
        <div
          style={{
            padding: '20px',
            backgroundColor: '#FAFAFA',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '14px',
          }}
        >
          <div
            style={{ color: '#737373', marginBottom: '12px' }}
          >{`import { maxWidth } from '@grasdouble/lufa_design-system';`}</div>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ color: '#C678DD' }}>const</span> <span style={{ color: '#E06C75' }}>styles</span> ={' '}
            <span style={{ color: '#98C379' }}>{'{'}</span>
          </div>
          <div style={{ marginLeft: '20px', marginBottom: '8px' }}>
            <span style={{ color: '#E5C07B' }}>maxWidth</span>: maxWidth['2xl'],{' '}
            <span style={{ color: '#737373' }}>{`// 42rem (672px)`}</span>
          </div>
          <div>
            <span style={{ color: '#98C379' }}>{'}'}</span>;
          </div>
          <div style={{ marginTop: '16px', color: '#737373' }}>{`// Or using CSS variables:`}</div>
          <div style={{ marginTop: '8px' }}>
            <span style={{ color: '#E5C07B' }}>max-width</span>: <span style={{ color: '#98C379' }}>var</span>
            <span style={{ color: '#E06C75' }}>(--lufa-max-width-2xl)</span>;
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>All Max-Width Tokens</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {Object.entries(maxWidth).map(([key, value]) => {
          // Convert rem to px for display (1rem = 16px)
          const pxValue = value === 'none' || value === '100%' ? value : `${parseFloat(value) * 16}px`;

          return (
            <div
              key={key}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E5E5',
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
              <div style={{ flex: '0 0 100px', color: '#737373', fontSize: '14px' }}>{value}</div>
              <div style={{ flex: '0 0 100px', color: '#A3A3A3', fontSize: '13px' }}>{pxValue}</div>
              <div style={{ flex: 1, marginLeft: '16px' }}>
                <div
                  style={{
                    width: '100%',
                    maxWidth: value === 'none' ? '100%' : value === '100%' ? '100%' : value,
                    height: '8px',
                    backgroundColor: '#2563EB',
                    borderRadius: '4px',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#EFF6FF', borderRadius: '8px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#1E40AF' }}>
          💡 Common Use Cases
        </h3>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#1E3A8A', fontSize: '14px', lineHeight: '1.6' }}>
          <li>
            <strong>md (28rem/448px)</strong>: Small modals, form dialogs
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

      <div style={{ marginTop: '24px', padding: '20px', backgroundColor: '#FFFBEB', borderRadius: '8px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#92400E' }}>
          ⚠️ Best Practices
        </h3>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#78350F', fontSize: '14px', lineHeight: '1.6' }}>
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
      <p style={{ marginBottom: '32px', color: '#737373', fontSize: '14px' }}>
        Resize your browser window to see how different max-width values affect layout responsiveness.
      </p>

      {(['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const).map((size) => (
        <div key={size} style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
            {size.toUpperCase()} - {maxWidth[size]}
          </h3>
          <div
            style={{
              width: '100%',
              maxWidth: maxWidth[size],
              padding: '24px',
              backgroundColor: '#FFFFFF',
              border: '2px solid #2563EB',
              borderRadius: '8px',
            }}
          >
            <p style={{ margin: 0, color: '#525252', fontSize: '14px' }}>
              This container has a max-width of <strong>{maxWidth[size]}</strong>. It will shrink on smaller screens but
              never exceed this width on larger screens.
            </p>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const ModalSizeComparison: Story = {
  render: () => (
    <div style={{ padding: '20px', backgroundColor: '#F5F5F5', minHeight: '100vh' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>Modal Size Comparison</h2>
      <p style={{ marginBottom: '32px', color: '#737373', fontSize: '14px' }}>
        Visual comparison of the max-width tokens commonly used for modal components.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'center' }}>
        {/* Small Modal */}
        <div style={{ width: '100%', maxWidth: maxWidth.md }}>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '20px', borderBottom: '1px solid #E5E5E5' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Small Modal (md - 28rem)</h3>
            </div>
            <div style={{ padding: '20px' }}>
              <p style={{ margin: 0, color: '#737373', fontSize: '14px' }}>
                Perfect for simple dialogs, confirmations, and quick forms.
              </p>
            </div>
          </div>
        </div>

        {/* Medium Modal */}
        <div style={{ width: '100%', maxWidth: maxWidth['2xl'] }}>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '20px', borderBottom: '1px solid #E5E5E5' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Medium Modal (2xl - 42rem)</h3>
            </div>
            <div style={{ padding: '20px' }}>
              <p style={{ margin: 0, color: '#737373', fontSize: '14px' }}>
                Ideal for standard forms, content displays, and most modal use cases.
              </p>
            </div>
          </div>
        </div>

        {/* Large Modal */}
        <div style={{ width: '100%', maxWidth: maxWidth['4xl'] }}>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '20px', borderBottom: '1px solid #E5E5E5' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Large Modal (4xl - 56rem)</h3>
            </div>
            <div style={{ padding: '20px' }}>
              <p style={{ margin: 0, color: '#737373', fontSize: '14px' }}>
                Great for complex forms, detailed views, and content-heavy modals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
