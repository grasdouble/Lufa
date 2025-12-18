import type { Meta, StoryObj } from '@storybook/react-vite';
import { container } from '@grasdouble/lufa_design-system-tokens';

const meta = {
  title: '1. Tokens/Container',
  parameters: {
    layout: 'padded',
  },
  tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllContainers: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Container Tokens</h1>
      <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px', maxWidth: '768px' }}>
        Semantic container width tokens for page-level layouts. Provides clearer intent than maxWidth for content areas.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {Object.entries(container).map(([key, value]) => (
          <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div
                style={{
                  fontFamily: 'monospace',
                  fontWeight: '600',
                  fontSize: '14px',
                  minWidth: '140px',
                }}
              >
                container.{key}
              </div>
              <div
                style={{
                  fontFamily: 'monospace',
                  color: '#737373',
                  fontSize: '12px',
                  minWidth: '100px',
                }}
              >
                {value}
              </div>
            </div>
            <div
              style={{
                maxWidth: value,
                width: '100%',
                padding: '16px',
                backgroundColor: '#3B82F6',
                borderRadius: '6px',
                color: 'white',
                fontSize: '12px',
              }}
            >
              {key === 'full' || key === 'fluid'
                ? `${key} - no max-width constraint`
                : `Container constrained to ${value} max-width`}
            </div>
            <div style={{ fontSize: '12px', color: '#737373', marginLeft: '8px' }}>
              {key === 'xs' && 'Extra small (384px) - Narrow forms, alerts, compact modals'}
              {key === 'sm' && 'Small (448px) - Compact content sections, small dialogs'}
              {key === 'md' && 'Medium (672px) - Standard content width, article containers'}
              {key === 'lg' && 'Large (1024px) - Wide content areas, dashboards'}
              {key === 'xl' && 'Extra large (1280px) - Full-width layouts, application shells'}
              {key === 'full' && 'Full viewport width (100%) - Edge-to-edge content'}
              {key === 'fluid' && 'Fluid container (no constraint) - Grows with viewport'}
            </div>
          </div>
        ))}
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
        <div style={{ fontWeight: '600', marginBottom: '8px', color: '#1E40AF' }}>Container vs MaxWidth</div>
        <div style={{ fontSize: '14px', color: '#1E3A8A' }}>
          <strong>container</strong> tokens: Use for page-level layout containers and major content sections
          <br />
          <strong>maxWidth</strong> tokens: Use for component-level constraints (modals, cards, specific elements)
        </div>
      </div>
    </div>
  ),
};

export const UsageExamples: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Container Usage Examples</h1>

      {/* Page Layout */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Page Layout Container</h2>
        <div
          style={{
            maxWidth: container.xl,
            margin: '0 auto',
            padding: '24px',
            backgroundColor: '#F3F4F6',
            borderRadius: '8px',
          }}
        >
          <div style={{ marginBottom: '16px', fontSize: '14px', fontFamily: 'monospace', color: '#6B7280' }}>
            container.xl (1280px)
          </div>
          <div style={{ padding: '40px', backgroundColor: 'white', borderRadius: '6px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Main Content Area</h3>
            <p style={{ color: '#6B7280' }}>Full application shell with standard desktop width</p>
          </div>
        </div>
      </div>

      {/* Article Container */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Article Container</h2>
        <div
          style={{
            maxWidth: container.md,
            margin: '0 auto',
            padding: '24px',
            backgroundColor: '#F3F4F6',
            borderRadius: '8px',
          }}
        >
          <div style={{ marginBottom: '16px', fontSize: '14px', fontFamily: 'monospace', color: '#6B7280' }}>
            container.md (672px)
          </div>
          <div style={{ padding: '32px', backgroundColor: 'white', borderRadius: '6px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>Article Title</h3>
            <p style={{ lineHeight: 1.65, color: '#374151', marginBottom: '16px' }}>
              This container width (672px) is optimal for reading. It maintains 45-75 characters per line, which is
              considered ideal for readability and reduces eye strain.
            </p>
            <p style={{ lineHeight: 1.65, color: '#374151' }}>
              Use container.md for blog posts, articles, documentation, and any long-form content where reading
              experience is paramount.
            </p>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Form Container</h2>
        <div
          style={{
            maxWidth: container.sm,
            margin: '0 auto',
            padding: '24px',
            backgroundColor: '#F3F4F6',
            borderRadius: '8px',
          }}
        >
          <div style={{ marginBottom: '16px', fontSize: '14px', fontFamily: 'monospace', color: '#6B7280' }}>
            container.sm (448px)
          </div>
          <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '6px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Login Form</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                type="email"
                placeholder="Email"
                style={{
                  padding: '12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '6px',
                  fontSize: '14px',
                }}
              />
              <input
                type="password"
                placeholder="Password"
                style={{
                  padding: '12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '6px',
                  fontSize: '14px',
                }}
              />
              <button
                style={{
                  padding: '12px',
                  backgroundColor: '#3B82F6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison */}
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Size Comparison</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
            <div
              key={size}
              style={{
                maxWidth: container[size as keyof typeof container],
                padding: '16px',
                backgroundColor: '#3B82F6',
                borderRadius: '6px',
                color: 'white',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              container.{size} ({container[size as keyof typeof container]})
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: '32px',
          padding: '16px',
          backgroundColor: '#FFFBEB',
          border: '1px solid #FCD34D',
          borderRadius: '8px',
        }}
      >
        <div style={{ fontWeight: '600', marginBottom: '8px', color: '#92400E' }}>💡 Best Practices</div>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#78350F', fontSize: '14px' }}>
          <li>Combine containers with responsive padding (use spacing tokens)</li>
          <li>Center containers with margin: 0 auto for traditional layouts</li>
          <li>Use container.md for optimal reading width (45-75 characters/line)</li>
          <li>Consider viewport padding on mobile to prevent edge-to-edge content</li>
          <li>Test container behavior across all breakpoints</li>
        </ul>
      </div>
    </div>
  ),
};
