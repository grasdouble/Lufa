import type { Meta, StoryObj } from '@storybook/react-vite';

import { grid } from '@grasdouble/lufa_design-system-tokens';

const meta = {
  title: '1. Tokens/Grid',
  parameters: {
    layout: 'padded',
  },
  tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const GridColumns: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Grid Column Tokens</h1>
      <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
        Semantic grid column counts for responsive layouts. 12-column grid provides maximum flexibility.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {Object.entries(grid.columns).map(([key, value]) => (
          <div key={key}>
            <div style={{ marginBottom: '12px' }}>
              <span style={{ fontFamily: 'monospace', fontWeight: '600', fontSize: '14px' }}>grid.columns.{key}</span>
              <span
                style={{
                  marginLeft: '12px',
                  fontFamily: 'monospace',
                  color: '#737373',
                  fontSize: '12px',
                }}
              >
                {value}
              </span>
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
                    backgroundColor: '#3B82F6',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '12px',
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const GridGutters: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Grid Gutter Tokens</h1>
      <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
        Semantic gutter sizes for grid layouts. Minimum 24px recommended for touch targets.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {Object.entries(grid.gutters).map(([key, value]) => (
          <div key={key}>
            <div style={{ marginBottom: '12px' }}>
              <span style={{ fontFamily: 'monospace', fontWeight: '600', fontSize: '14px' }}>grid.gutters.{key}</span>
              <span
                style={{
                  marginLeft: '12px',
                  fontFamily: 'monospace',
                  color: '#737373',
                  fontSize: '12px',
                }}
              >
                {value}
              </span>
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
                    height: '80px',
                    backgroundColor: '#3B82F6',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '14px',
                  }}
                >
                  Item
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
