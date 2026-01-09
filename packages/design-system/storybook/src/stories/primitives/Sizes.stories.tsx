import type { Meta, StoryObj } from '@storybook/react-vite';

import primitives from '@grasdouble/lufa_design-system-primitives';

const meta = {
  title: '0. Primitives/Sizes',
  parameters: {
    layout: 'padded',
  },
  tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllSizes: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Sizes Primitives</h1>
      <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
        Fixed size values for element-level dimensions: icons, buttons, avatars, and touch targets. Includes WCAG 2.5.5
        minimum touch target size (44px).
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {Object.entries(primitives.size).map(([key, value]) => {
          const sizeNum = Number(key);
          const isTouchTarget = sizeNum === 44;

          return (
            <div
              key={key}
              style={{
                display: 'grid',
                gridTemplateColumns: '120px 100px 1fr',
                gap: '24px',
                alignItems: 'center',
                padding: '16px',
                backgroundColor: '#FAFAFA',
                borderRadius: '8px',
                border: isTouchTarget ? '2px solid #2563EB' : '1px solid #E5E5E5',
              }}
            >
              <div style={{ fontFamily: 'monospace', fontWeight: '600', fontSize: '14px' }}>size[{key}]</div>
              <div style={{ fontFamily: 'monospace', color: '#737373', fontSize: '12px' }}>{value}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: value,
                    height: value,
                    backgroundColor: isTouchTarget ? '#2563EB' : '#3B82F6',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: Math.min(Number(key) / 3, 16) + 'px',
                    fontWeight: '600',
                    flexShrink: 0,
                  }}
                >
                  {key}
                </div>
                <div style={{ fontSize: '12px', color: '#737373' }}>
                  {sizeNum === 0 && 'Zero size - collapse element'}
                  {sizeNum === 16 && 'Small icons'}
                  {sizeNum === 24 && 'Standard icons, small avatars'}
                  {sizeNum === 32 && 'Medium icons, button height'}
                  {sizeNum === 44 && '✓ WCAG 2.5.5 minimum touch target'}
                  {sizeNum === 48 && 'Large buttons, medium avatars'}
                  {sizeNum === 64 && 'Large icons, large avatars'}
                  {sizeNum === 96 && 'Extra large avatars'}
                  {sizeNum === 128 && 'Logo sizes'}
                  {sizeNum === 192 && 'Thumbnails, large images'}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: '40px',
          padding: '24px',
          backgroundColor: '#DBEAFE',
          borderRadius: '12px',
          border: '1px solid #60A5FA',
        }}
      >
        <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600' }}>WCAG 2.5.5 - Touch Target Size</h3>
        <p style={{ margin: 0, lineHeight: '1.6' }}>
          <strong>Minimum 44×44px</strong> for all interactive elements (buttons, links, controls) to ensure usability
          on touch devices. This guideline helps users with motor impairments and reduces errors from accidental
          touches.
        </p>
      </div>

      <div
        style={{
          marginTop: '24px',
          padding: '24px',
          backgroundColor: '#FEF3C7',
          borderRadius: '12px',
          border: '1px solid #FCD34D',
        }}
      >
        <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600' }}>Usage Guidelines</h3>
        <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.6' }}>
          <li>
            <strong>16-32px:</strong> Icons in UI elements
          </li>
          <li>
            <strong>32-48px:</strong> Button heights, form inputs
          </li>
          <li>
            <strong>44px minimum:</strong> All interactive touch targets
          </li>
          <li>
            <strong>48-96px:</strong> Avatars (profile pictures)
          </li>
          <li>
            <strong>64-192px:</strong> Large images, logos, thumbnails
          </li>
          <li>
            <strong>For containers &gt;192px:</strong> Use maxWidth primitive instead
          </li>
        </ul>
      </div>
    </div>
  ),
};

export const UsageExamples: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Sizes Usage Examples</h1>

      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', marginTop: '32px' }}>Icons</h2>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '32px' }}>
        {([16, 24, 32, 48, 64] as const).map((size) => (
          <div key={size} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: primitives.size[size as keyof typeof primitives.size],
                height: primitives.size[size as keyof typeof primitives.size],
                backgroundColor: '#3B82F6',
                borderRadius: '8px',
                marginBottom: '8px',
              }}
            />
            <div style={{ fontSize: '12px', color: '#737373' }}>{size}px</div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', marginTop: '32px' }}>
        Buttons (Touch Targets)
      </h2>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
        <button
          style={{
            height: primitives.size[32],
            padding: '0 16px',
            backgroundColor: '#3B82F6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Small (32px) ⚠️
        </button>
        <button
          style={{
            height: primitives.size[44],
            padding: '0 20px',
            backgroundColor: '#2563EB',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Medium (44px) ✓ WCAG
        </button>
        <button
          style={{
            height: primitives.size[48],
            padding: '0 24px',
            backgroundColor: '#1D4ED8',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Large (48px) ✓
        </button>
      </div>

      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', marginTop: '32px' }}>Avatars</h2>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '32px' }}>
        {([24, 32, 48, 64, 96] as const).map((size) => (
          <div key={size} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: primitives.size[size as keyof typeof primitives.size],
                height: primitives.size[size as keyof typeof primitives.size],
                backgroundColor: '#3B82F6',
                borderRadius: '50%',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: Math.min(size / 2.5, 24) + 'px',
                fontWeight: '600',
              }}
            >
              A
            </div>
            <div style={{ fontSize: '12px', color: '#737373' }}>{size}px</div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', marginTop: '32px' }}>Form Inputs</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
        <input
          type="text"
          placeholder="Small input (32px height)"
          style={{
            height: primitives.size[32],
            padding: '0 12px',
            border: '1px solid #D1D5DB',
            borderRadius: '6px',
            fontSize: '14px',
          }}
        />
        <input
          type="text"
          placeholder="Medium input (44px height) ✓ WCAG"
          style={{
            height: primitives.size[44],
            padding: '0 16px',
            border: '2px solid #2563EB',
            borderRadius: '6px',
            fontSize: '16px',
          }}
        />
        <input
          type="text"
          placeholder="Large input (48px height)"
          style={{
            height: primitives.size[48],
            padding: '0 16px',
            border: '1px solid #D1D5DB',
            borderRadius: '6px',
            fontSize: '16px',
          }}
        />
      </div>
    </div>
  ),
};
