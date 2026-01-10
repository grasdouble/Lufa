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
      <p style={{ marginBottom: '32px', color: tokens.color.text.tertiary, fontSize: '16px' }}>
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
              backgroundColor: tokens.color.background.secondary,
              borderRadius: '8px',
              border: `1px solid ${tokens.color.border.light}`,
            }}
          >
            <div style={{ fontFamily: 'monospace', fontWeight: '600', fontSize: '14px' }}>zIndex.{key}</div>
            <div style={{ fontFamily: 'monospace', color: tokens.color.text.tertiary, fontSize: '12px' }}>
              {value}
            </div>
            <div style={{ fontSize: '12px', color: tokens.color.text.tertiary }}>
              {key === 'base' && 'Normal content layer'}
              {key === 'dropdown' && 'Dropdowns, menus'}
              {key === 'sticky' && 'Sticky headers, footers'}
              {key === 'tooltip' && 'Tooltips, popovers'}
              {key === 'drawer' && 'Slide-out panels, drawers'}
              {key === 'menu' && 'Off-canvas menus'}
              {key === 'modal' && 'Modal dialogs'}
              {key === 'notification' && 'Important notifications, banners'}
              {key === 'toast' && 'Toast notifications'}
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
      <p style={{ marginBottom: '32px', color: tokens.color.text.tertiary, fontSize: '16px' }}>
        Visual demonstration of how different z-index values stack on top of each other.
      </p>

      <div
        style={{
          position: 'relative',
          height: '300px',
          backgroundColor: tokens.color.background.tertiary,
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
            color: tokens.color.text.secondary,
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
            backgroundColor: tokens.color.background.tertiary,
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
            backgroundColor: tokens.color.info.lighter,
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
            backgroundColor: tokens.color.info.border,
            borderRadius: '6px',
            fontSize: '12px',
            zIndex: tokens.zIndex.modal,
          }}
        >
          modal ({tokens.zIndex.modal})
        </div>

        {/* Tooltip */}
        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            left: '140px',
            padding: '12px 16px',
            backgroundColor: tokens.color.info.default,
            color: tokens.color.text.inverse,
            borderRadius: '6px',
            fontSize: '12px',
            zIndex: tokens.zIndex.tooltip,
          }}
        >
          tooltip ({tokens.zIndex.tooltip})
        </div>
      </div>
    </div>
  ),
};
