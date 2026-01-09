import type { Meta, StoryObj } from '@storybook/react-vite';

import primitives from '@grasdouble/lufa_design-system-primitives';

const meta = {
  title: '0. Primitives/Borders',
  parameters: {
    layout: 'padded',
  },
  tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllBorders: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Border Primitives</h1>
      <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
        token border widths and styles. WCAG requires minimum 2px thickness for focus indicators and 3:1 contrast for
        borders.
      </p>

      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', marginTop: '32px' }}>Border Widths</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {Object.entries(primitives.borderWidth).map(([key, value]) => (
          <div
            key={key}
            style={{
              display: 'grid',
              gridTemplateColumns: '120px 80px 1fr',
              gap: '16px',
              alignItems: 'center',
              padding: '16px',
              backgroundColor: '#FAFAFA',
              borderRadius: '8px',
              border: '1px solid #E5E5E5',
            }}
          >
            <div style={{ fontFamily: 'monospace', fontWeight: '600', fontSize: '14px' }}>width[{key}]</div>
            <div style={{ fontFamily: 'monospace', color: '#737373', fontSize: '12px' }}>{value}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '200px',
                  height: '60px',
                  border: `${value} solid #3B82F6`,
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  color: '#737373',
                }}
              >
                {key === '0' && 'No border'}
                {key === '1' && 'Subtle divider'}
                {key === '2' && 'WCAG focus minimum'}
                {key === '3' && 'Recommended focus'}
                {key === '4' && 'Strong emphasis'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', marginTop: '32px' }}>Border Styles</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {Object.entries(primitives.borderStyle).map(([key, value]) => (
          <div
            key={key}
            style={{
              display: 'grid',
              gridTemplateColumns: '120px 80px 1fr',
              gap: '16px',
              alignItems: 'center',
              padding: '16px',
              backgroundColor: '#FAFAFA',
              borderRadius: '8px',
              border: '1px solid #E5E5E5',
            }}
          >
            <div style={{ fontFamily: 'monospace', fontWeight: '600', fontSize: '14px' }}>style.{key}</div>
            <div style={{ fontFamily: 'monospace', color: '#737373', fontSize: '12px' }}>{value}</div>
            <div
              style={{
                width: '200px',
                height: '60px',
                border: `2px ${value} #3B82F6`,
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                color: '#737373',
              }}
            >
              {key === 'solid' && 'Standard border'}
              {key === 'dashed' && 'Informal, editable'}
              {key === 'dotted' && 'Subtle, decorative'}
              {key === 'none' && 'No border'}
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
        <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600' }}>WCAG Guidelines</h3>
        <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.6' }}>
          <li>
            <strong>Focus Indicators</strong>: Minimum 2px thickness (WCAG 2.4.7)
          </li>
          <li>
            <strong>Border Contrast</strong>: Minimum 3:1 against adjacent colors (WCAG 1.4.11)
          </li>
          <li>
            <strong>Recommendation</strong>: Use width[3] (3px) for clear focus visibility
          </li>
        </ul>
      </div>
    </div>
  ),
};

export const UsageExamples: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>Border Usage Examples</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Card Borders</h3>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div
              style={{
                padding: '20px',
                border: `${primitives.borderWidth[1]} ${primitives.borderStyle.solid} #E5E5E5`,
                borderRadius: '8px',
                minWidth: '200px',
              }}
            >
              <div style={{ fontWeight: '600', marginBottom: '8px' }}>Subtle Card</div>
              <div style={{ fontSize: '14px', color: '#737373' }}>1px solid border</div>
            </div>
            <div
              style={{
                padding: '20px',
                border: `${primitives.borderWidth[2]} ${primitives.borderStyle.solid} #3B82F6`,
                borderRadius: '8px',
                minWidth: '200px',
              }}
            >
              <div style={{ fontWeight: '600', marginBottom: '8px' }}>Emphasized Card</div>
              <div style={{ fontSize: '14px', color: '#737373' }}>2px solid border</div>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Focus States</h3>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button
              style={{
                padding: '12px 24px',
                backgroundColor: 'white',
                border: `${primitives.borderWidth[2]} ${primitives.borderStyle.solid} #3B82F6`,
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                outline: `${primitives.borderWidth[2]} ${primitives.borderStyle.solid} #3B82F6`,
                outlineOffset: '2px',
              }}
            >
              WCAG Minimum (2px)
            </button>
            <button
              style={{
                padding: '12px 24px',
                backgroundColor: 'white',
                border: `${primitives.borderWidth[3]} ${primitives.borderStyle.solid} #3B82F6`,
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                outline: `${primitives.borderWidth[3]} ${primitives.borderStyle.solid} #3B82F6`,
                outlineOffset: '2px',
              }}
            >
              Recommended (3px)
            </button>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Input Fields</h3>
          <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input
              type="text"
              placeholder="Default state (1px)"
              style={{
                padding: '12px',
                border: `${primitives.borderWidth[1]} ${primitives.borderStyle.solid} #E5E5E5`,
                borderRadius: '6px',
                fontSize: '14px',
              }}
            />
            <input
              type="text"
              placeholder="Focus state (2px)"
              style={{
                padding: '12px',
                border: `${primitives.borderWidth[2]} ${primitives.borderStyle.solid} #3B82F6`,
                borderRadius: '6px',
                fontSize: '14px',
              }}
            />
            <input
              type="text"
              placeholder="Error state (2px)"
              style={{
                padding: '12px',
                border: `${primitives.borderWidth[2]} ${primitives.borderStyle.solid} #EF4444`,
                borderRadius: '6px',
                fontSize: '14px',
              }}
            />
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Dividers</h3>
          <div style={{ maxWidth: '600px' }}>
            <div style={{ padding: '16px 0' }}>Section 1</div>
            <div style={{ borderTop: `${primitives.borderWidth[1]} ${primitives.borderStyle.solid} #E5E5E5` }} />
            <div style={{ padding: '16px 0' }}>Section 2</div>
            <div style={{ borderTop: `${primitives.borderWidth[1]} ${primitives.borderStyle.dashed} #E5E5E5` }} />
            <div style={{ padding: '16px 0' }}>Section 3 (editable)</div>
            <div style={{ borderTop: `${primitives.borderWidth[1]} ${primitives.borderStyle.dotted} #E5E5E5` }} />
            <div style={{ padding: '16px 0' }}>Section 4 (subtle)</div>
          </div>
        </div>
      </div>
    </div>
  ),
};
