import type { Meta, StoryObj } from '@storybook/react-vite';

import primitives from '@grasdouble/lufa_design-system-primitives';

const meta = {
  title: '0. Primitives/Layout',
  parameters: {
    layout: 'padded',
  },
  tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const MaxWidth: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>MaxWidth Primitives</h1>
      <p
        style={{
          marginBottom: '32px',
          color: 'var(--lufa-token-color-text-secondary)',
          fontSize: '16px',
          maxWidth: '768px',
        }}
      >
        Primitive max-width values for content containers. Optimal reading width is 576-768px (45-75 characters per
        line). Includes component-specific widths (320-600px) and layout widths (768-1440px).
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {Object.entries(primitives.maxWidth).map(([key, value]) => (
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
                maxWidth[{key}]
              </div>
              <div
                style={{
                  fontFamily: 'monospace',
                  color: 'var(--lufa-token-color-text-secondary)',
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
                padding: '16px',
                backgroundColor: 'var(--lufa-primitive-color-chromatic-blue-500)',
                borderRadius: '6px',
                color: 'var(--lufa-primitive-color-neutral-white)',
                fontSize: '12px',
              }}
            >
              {key === 'none' || key === 'full' ? `${key} - unconstrained` : `Container limited to ${value}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Size Primitives</h1>
      <p style={{ marginBottom: '32px', color: 'var(--lufa-token-color-text-secondary)', fontSize: '16px' }}>
        Primitive size values for element dimensions. Includes WCAG minimum 44px touch target.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-end' }}>
        {Object.entries(primitives.size).map(([key, value]) => (
          <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <div
              style={{
                width: value,
                height: value,
                backgroundColor:
                  key === '44'
                    ? 'var(--lufa-primitive-color-chromatic-green-500)'
                    : 'var(--lufa-primitive-color-chromatic-blue-500)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--lufa-primitive-color-neutral-white)',
                fontSize: '12px',
                fontWeight: '600',
                boxShadow: primitives.shadow.xs,
              }}
            >
              {key}
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--lufa-token-color-text-secondary)' }}>
              {value}
              {key === '44' && ' ✓'}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: '40px',
          padding: '24px',
          backgroundColor: 'var(--lufa-token-color-success-light)',
          borderRadius: '12px',
          border: `1px solid var(--lufa-token-color-success-border)`,
        }}
      >
        <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600' }}>WCAG Touch Target</h3>
        <p style={{ margin: 0, lineHeight: '1.6' }}>
          <strong>size[44]</strong> (44px) is the WCAG 2.5.5 minimum touch target size for interactive elements.
        </p>
      </div>
    </div>
  ),
};

export const Grid: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Grid Primitives</h1>
      <p style={{ marginBottom: '32px', color: 'var(--lufa-token-color-text-secondary)', fontSize: '16px' }}>
        Primitive grid values for columns and gutters. 12-column grid is industry standard.
      </p>

      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Columns</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
        {Object.entries(primitives.grid.columns).map(([key, value]) => (
          <div key={key}>
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '12px',
                color: 'var(--lufa-token-color-text-secondary)',
                marginBottom: '8px',
              }}
            >
              columns[{key}] = {value}
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${value}, 1fr)`,
                gap: '8px',
              }}
            >
              {Array.from({ length: Number(value) }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: '40px',
                    backgroundColor: 'var(--lufa-primitive-color-chromatic-blue-500)',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--lufa-primitive-color-neutral-white)',
                    fontSize: '10px',
                    fontWeight: '600',
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Gutters</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {Object.entries(primitives.grid.gutters).map(([key, value]) => (
          <div key={key}>
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '12px',
                color: 'var(--lufa-token-color-text-secondary)',
                marginBottom: '8px',
              }}
            >
              gutters[{key}] = {value}
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: value,
              }}
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: '40px',
                    backgroundColor: 'var(--lufa-primitive-color-chromatic-blue-500)',
                    borderRadius: '4px',
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const AspectRatio: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>AspectRatio Primitives</h1>
      <p style={{ marginBottom: '32px', color: 'var(--lufa-token-color-text-secondary)', fontSize: '16px' }}>
        Primitive aspect-ratio values for media containers and responsive images.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
        {Object.entries(primitives.aspectRatio).map(([key, value]) => (
          <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div
              style={{
                aspectRatio: value,
                backgroundColor: 'var(--lufa-token-color-border-light)',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
              }}
            >
              <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>{value}</div>
              <div style={{ fontSize: '12px', color: 'var(--lufa-token-color-text-secondary)' }}>{key}</div>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--lufa-token-color-text-secondary)' }}>
              {key === 'square' && '1:1 - Avatars, social posts'}
              {key === 'traditionalPhotoMonitor' && '4:3 - Classic photos'}
              {key === 'classicPhotography' && '3:2 - Photography'}
              {key === 'widescreenVideo' && '16:9 - YouTube, hero images'}
              {key === 'ultrawide' && '21:9 - Cinematic'}
              {key === 'vertical' && '9:16 - Mobile stories'}
              {key === 'portraitPhoto' && '2:3 - Portrait photos'}
              {key === 'portraitDisplay' && '3:4 - Portrait displays'}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Blur: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Blur Primitives</h1>
      <p style={{ marginBottom: '32px', color: 'var(--lufa-token-color-text-secondary)', fontSize: '16px' }}>
        Primitive blur values for backdrop-filter effects. Use for frosted glass overlays and modern UI.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
        {Object.entries(primitives.blur).map(([key, value]) => (
          <div
            key={key}
            style={{
              position: 'relative',
              height: '200px',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '2px solid var(--lufa-token-color-border-default)',
            }}
          >
            {/* High-contrast background pattern */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
                  repeating-linear-gradient(
                    45deg,
                    var(--lufa-primitive-color-chromatic-blue-600) 0px,
                    var(--lufa-primitive-color-chromatic-blue-600) 20px,
                    var(--lufa-primitive-color-chromatic-purple-600) 20px,
                    var(--lufa-primitive-color-chromatic-purple-600) 40px,
                    var(--lufa-primitive-color-chromatic-pink-600) 40px,
                    var(--lufa-primitive-color-chromatic-pink-600) 60px,
                    var(--lufa-primitive-color-chromatic-orange-600) 60px,
                    var(--lufa-primitive-color-chromatic-orange-600) 80px
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
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: 'var(--lufa-primitive-color-neutral-white)',
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
                backgroundColor: 'color-mix(in oklab, var(--lufa-token-color-surface-default) 20%, transparent)',
                backdropFilter: `blur(${value})`,
                WebkitBackdropFilter: `blur(${value})`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: 'var(--lufa-token-color-text-primary)',
                  textShadow: '0 2px 8px var(--lufa-token-color-surface-default)',
                  backgroundColor: 'color-mix(in oklab, var(--lufa-token-color-surface-default) 60%, transparent)',
                  padding: '8px 16px',
                  borderRadius: '8px',
                }}
              >
                blur[{key}]
              </div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'var(--lufa-token-color-text-secondary)',
                  backgroundColor: 'color-mix(in oklab, var(--lufa-token-color-surface-default) 80%, transparent)',
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
          marginTop: '40px',
          padding: '24px',
          backgroundColor: 'var(--lufa-token-color-info-light)',
          borderRadius: '12px',
          border: '1px solid var(--lufa-token-color-info-border)',
        }}
      >
        <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600' }}>Blur Usage</h3>
        <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.6' }}>
          <li>
            <strong>none (0px)</strong> - No blur effect
          </li>
          <li>
            <strong>sm (4px)</strong> - Subtle frosted glass effect
          </li>
          <li>
            <strong>md (8px)</strong> - Standard overlay blur
          </li>
          <li>
            <strong>lg (16px)</strong> - Strong privacy blur
          </li>
          <li>
            <strong>xl (24px)</strong> - Maximum blur for dramatic effects
          </li>
        </ul>
      </div>
    </div>
  ),
};

export const ZIndex: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Z-Index Primitives</h1>
      <p style={{ marginBottom: '32px', color: 'var(--lufa-token-color-text-secondary)', fontSize: '16px' }}>
        Primitive z-index values for stacking order. Use 10-unit increments to prevent conflicts.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {Object.entries(primitives.zIndex).map(([key, value]) => (
          <div
            key={key}
            style={{
              display: 'grid',
              gridTemplateColumns: '120px 100px 1fr',
              gap: '16px',
              alignItems: 'center',
              padding: '16px',
              backgroundColor: 'var(--lufa-token-color-surface-raised)',
              borderRadius: '8px',
              border: `1px solid var(--lufa-token-color-border-light)`,
            }}
          >
            <div style={{ fontFamily: 'monospace', fontWeight: '600', fontSize: '14px' }}>zIndex[{key}]</div>
            <div style={{ fontFamily: 'monospace', color: 'var(--lufa-token-color-text-secondary)', fontSize: '12px' }}>
              {value}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--lufa-token-color-text-secondary)' }}>
              {key === '0' && 'Default layer (normal flow)'}
              {key === '10' && 'Sticky headers, fixed nav'}
              {key === '20' && 'Dropdowns, select menus'}
              {key === '30' && 'Tooltips, popovers'}
              {key === '40' && 'Slide-out panels, drawers'}
              {key === '50' && 'Off-canvas menus'}
              {key === '100' && 'Modals, dialogs, overlays'}
              {key === '500' && 'Important notifications'}
              {key === '900' && 'Toast notifications (top layer)'}
              {key === '9999' && 'Critical system messages'}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: '40px',
          padding: '24px',
          backgroundColor: 'var(--lufa-token-color-info-light)',
          borderRadius: '12px',
          border: `1px solid var(--lufa-token-color-info-border)`,
        }}
      >
        <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600' }}>Stacking Strategy</h3>
        <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.6' }}>
          <li>Use 10-unit increments for flexibility</li>
          <li>Reserve high values (500+) for UI that must appear above all content</li>
          <li>Avoid arbitrary z-index values to prevent conflicts</li>
        </ul>
      </div>
    </div>
  ),
};
