import type { Meta, StoryObj } from '@storybook/react-vite';

import tokens from '@grasdouble/lufa_design-system-tokens';

const meta = {
  title: '1. Tokens/Z-Index',
  parameters: {
    layout: 'padded',
  },
  tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllZIndexLayers: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Z-Index Tokens</h1>
      <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
        Semantic z-index values for consistent layering and stacking order across the application.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {Object.entries(tokens.zIndex).map(([key, value]) => (
          <div
            key={key}
            style={{
              display: 'grid',
              gridTemplateColumns: '200px 100px 1fr',
              gap: '16px',
              alignItems: 'center',
              padding: '16px',
              backgroundColor: '#FAFAFA',
              borderRadius: '8px',
              border: '1px solid #E5E5E5',
            }}
          >
            <div style={{ fontFamily: 'monospace', fontWeight: '600', fontSize: '14px' }}>zIndex.{key}</div>
            <div style={{ fontFamily: 'monospace', color: '#737373', fontSize: '12px' }}>{value}</div>
            <div style={{ fontSize: '12px', color: '#737373' }}>
              {key === 'base' && 'Normal content layer'}
              {key === 'dropdown' && 'Dropdowns, menus'}
              {key === 'sticky' && 'Sticky headers, footers'}
              {key === 'overlay' && 'Overlay backgrounds'}
              {key === 'modal' && 'Modal dialogs'}
              {key === 'toast' && 'Toast notifications'}
              {key === 'tooltip' && 'Tooltips'}
              {key === 'high' && 'High priority elements'}
              {key === 'veryHigh' && 'Very high priority'}
              {key === 'max' && 'Maximum z-index'}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const LayeringVisualization: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Z-Index Layering</h1>
      <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
        Visual demonstration of how different z-index values stack on top of each other.
      </p>

      <div
        style={{
          position: 'relative',
          height: '300px',
          backgroundColor: '#F3F4F6',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '600px',
            textAlign: 'center',
            color: '#6B7280',
          }}
        >
          Layering visualization - each layer stacks on top
        </div>

        {/* Base */}
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            padding: '12px 16px',
            backgroundColor: '#E5E7EB',
            borderRadius: '6px',
            fontSize: '12px',
            zIndex: tokens.zIndex.base,
          }}
        >
          base (0)
        </div>

        {/* Dropdown */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '60px',
            padding: '12px 16px',
            backgroundColor: '#BFDBFE',
            borderRadius: '6px',
            fontSize: '12px',
            zIndex: tokens.zIndex.dropdown,
          }}
        >
          dropdown (10)
        </div>

        {/* Modal */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '100px',
            padding: '12px 16px',
            backgroundColor: '#93C5FD',
            borderRadius: '6px',
            fontSize: '12px',
            zIndex: tokens.zIndex.modal,
          }}
        >
          modal (40)
        </div>

        {/* Tooltip */}
        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            left: '140px',
            padding: '12px 16px',
            backgroundColor: '#60A5FA',
            color: 'white',
            borderRadius: '6px',
            fontSize: '12px',
            zIndex: tokens.zIndex.tooltip,
          }}
        >
          tooltip (100)
        </div>
      </div>
    </div>
  ),
};
