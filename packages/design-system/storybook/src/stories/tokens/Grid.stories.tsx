import type { Meta, StoryObj } from '@storybook/react-vite';

import tokens from '@grasdouble/lufa_design-system-tokens';

const meta = {
  title: '1. Tokens/Grid',
  parameters: {
    layout: 'padded',
  },
  tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Mapping of grid column tokens to the number of items to display
 * Configured to show ~2 rows of content for better visual demonstration
 */
const GRID_DISPLAY_ITEMS: Record<string, number> = {
  single: 2, // 2 items in 1 column (2 rows)
  double: 4, // 4 items in 2 columns (2 rows)
  triple: 6, // 6 items in 3 columns (2 rows)
  quad: 8, // 8 items in 4 columns (2 rows)
  six: 12, // 12 items in 6 columns (2 rows)
  eight: 16, // 16 items in 8 columns (2 rows)
  twelve: 24, // 24 items in 12 columns (2 rows)
  sixteen: 32, // 32 items in 16 columns (2 rows)
};

export const GridColumns: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Grid Column Tokens</h1>
      <p style={{ marginBottom: '32px', color: tokens.color.text.tertiary, fontSize: '16px' }}>
        Semantic grid column counts for responsive layouts. 12-column grid provides maximum flexibility.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {Object.entries(tokens.grid.columns).map(([key, value]) => {
          const itemCount = GRID_DISPLAY_ITEMS[key] || value * 2;
          return (
            <div key={key}>
              <div style={{ marginBottom: '12px' }}>
                <span style={{ fontFamily: 'monospace', fontWeight: '600', fontSize: '14px' }}>grid.columns.{key}</span>
                <span
                  style={{
                    marginLeft: '12px',
                    fontFamily: 'monospace',
                    color: tokens.color.text.tertiary,
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
                {Array.from({ length: itemCount }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: '40px',
                      backgroundColor: tokens.color.interactive.focus,
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: tokens.color.text.inverse,
                      fontSize: '12px',
                    }}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ),
};

export const GridGutters: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Grid Gutter Tokens</h1>
      <p style={{ marginBottom: '32px', color: tokens.color.text.tertiary, fontSize: '16px' }}>
        Semantic gutter sizes for grid layouts. Minimum 24px recommended for touch targets.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {Object.entries(tokens.grid.gutters).map(([key, value]) => (
          <div key={key}>
            <div style={{ marginBottom: '12px' }}>
              <span style={{ fontFamily: 'monospace', fontWeight: '600', fontSize: '14px' }}>grid.gutters.{key}</span>
              <span
                style={{
                  marginLeft: '12px',
                  fontFamily: 'monospace',
                  color: tokens.color.text.tertiary,
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
                    backgroundColor: tokens.color.interactive.focus,
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: tokens.color.text.inverse,
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
