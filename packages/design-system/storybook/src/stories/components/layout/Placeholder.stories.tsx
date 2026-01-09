import type { Meta, StoryObj } from '@storybook/react-vite';

import { Placeholder } from '@grasdouble/lufa_design-system';
import tokens from '@grasdouble/lufa_design-system-tokens';

const meta = {
  title: '2. Layout/Placeholder',
  component: Placeholder,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A placeholder component used for layout spacing and visual structure. Features customizable height, width, and color variants. Useful during development and prototyping.',
      },
    },
  },
  tags: [],
  argTypes: {
    height: {
      control: 'select',
      options: ['small', 'medium', 'large', 'auto', 'full'],
      description: 'Height variant of the placeholder',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    width: {
      control: 'select',
      options: ['auto', 'small', 'medium', 'large', 'full'],
      description: 'Width variant of the placeholder',
      table: {
        defaultValue: { summary: 'full' },
      },
    },
    color: {
      control: 'color',
      description: 'Custom solid background color (any valid CSS color)',
    },
    colorFrom: {
      control: 'color',
      description: 'Gradient start color (requires colorTo)',
    },
    colorTo: {
      control: 'color',
      description: 'Gradient end color (requires colorFrom)',
    },
    children: {
      control: 'text',
      description: 'Content to display inside the placeholder',
    },
  },
} satisfies Meta<typeof Placeholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    height: 'medium',
    width: 'full',
    children: 'Placeholder Content',
  },
};

export const Height: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '420px' }}>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Small</h3>
        <Placeholder height="small">Small Height</Placeholder>
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Medium (default)</h3>
        <Placeholder height="medium">Medium Height</Placeholder>
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Large</h3>
        <Placeholder height="large">Large Height</Placeholder>
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Auto</h3>
        <Placeholder height="auto">
          Auto height adjusts to content
          <br />
          Multiple lines supported
          <br />
          Grows as needed
        </Placeholder>
      </div>
    </div>
  ),
};

export const Width: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Auto</h3>
        <Placeholder width="auto">Auto</Placeholder>
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Small</h3>
        <Placeholder width="small">Small Width</Placeholder>
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Medium</h3>
        <Placeholder width="medium">Medium Width</Placeholder>
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Large</h3>
        <Placeholder width="large">Large Width</Placeholder>
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Full (100%)</h3>
        <Placeholder width="full">Full Width</Placeholder>
      </div>
    </div>
  ),
};

export const Color: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '420px' }}>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Default (Violet Gradient)</h3>
        <Placeholder>Default Gradient</Placeholder>
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Solid - Interactive (Blue)</h3>
        <Placeholder color={tokens.color.interactive.default}>Solid Blue</Placeholder>
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Solid - Success (Green)</h3>
        <Placeholder color={tokens.color.success.default}>Solid Green</Placeholder>
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Solid - Error (Red)</h3>
        <Placeholder color={tokens.color.error.default}>Solid Red</Placeholder>
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Solid - Warning (Orange)</h3>
        <Placeholder color={tokens.color.warning.default}>Solid Orange</Placeholder>
      </div>
    </div>
  ),
};

export const ColorGradient: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '420px' }}>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Blue to Purple</h3>
        <Placeholder colorFrom={tokens.color.interactive.default} colorTo={tokens.color.brand.secondary}>
          Blue → Purple
        </Placeholder>
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Green to Teal</h3>
        <Placeholder colorFrom={tokens.color.success.default} colorTo={tokens.color.info.default}>
          Green → Teal
        </Placeholder>
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Orange to Red</h3>
        <Placeholder colorFrom={tokens.color.warning.default} colorTo={tokens.color.error.default}>
          Orange → Red
        </Placeholder>
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Purple to Pink</h3>
        <Placeholder colorFrom={tokens.color.brand.secondary} colorTo={tokens.color.brand.accent}>
          Purple → Pink
        </Placeholder>
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Dark to Light</h3>
        <Placeholder colorFrom={tokens.color.background.inverse} colorTo={tokens.color.background.secondary}>
          Dark → Light
        </Placeholder>
      </div>
    </div>
  ),
};

export const CombinedWithAndHeight: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      <Placeholder height="small" width="small" color={tokens.color.interactive.default}>
        Small × Small
      </Placeholder>
      <Placeholder height="small" width="medium" color={tokens.color.success.default}>
        Small × Medium
      </Placeholder>
      <Placeholder height="small" width="large" color={tokens.color.error.default}>
        Small × Large
      </Placeholder>
      <Placeholder height="medium" width="small" color={tokens.color.brand.secondary}>
        Medium × Small
      </Placeholder>
      <Placeholder height="medium" width="medium" color={tokens.color.info.default}>
        Medium × Medium
      </Placeholder>
      <Placeholder height="medium" width="large" color={tokens.color.warning.default}>
        Medium × Large
      </Placeholder>
      <Placeholder height="large" width="small" color={tokens.color.interactive.hover}>
        Large × Small
      </Placeholder>
      <Placeholder height="large" width="medium" color={tokens.color.success.hover}>
        Large × Medium
      </Placeholder>
      <Placeholder height="large" width="large" color={tokens.color.warning.default}>
        Large × Large
      </Placeholder>
    </div>
  ),
};

export const LayoutExample: Story = {
  render: () => (
    <div
      style={{
        maxWidth: '900px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
      }}
    >
      <h2 style={{ marginBottom: '16px' }}>Dashboard Layout Example</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Placeholder height="small" width="full" color={tokens.color.interactive.default}>
          Header - Small Height, Full Width
        </Placeholder>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '16px' }}>
          <Placeholder height="full" width="full" color={tokens.color.brand.secondary}>
            Sidebar
          </Placeholder>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Placeholder height="medium" width="full" color={tokens.color.success.light}>
              Content Area
            </Placeholder>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
              }}
            >
              <Placeholder height="small" color={tokens.color.warning.light}>
                Card 1
              </Placeholder>
              <Placeholder height="small" color={tokens.color.warning.light}>
                Card 2
              </Placeholder>
              <Placeholder height="small" color={tokens.color.warning.light}>
                Card 3
              </Placeholder>
            </div>
          </div>
        </div>
        <Placeholder height="small" width="full" color={tokens.color.text.secondary}>
          Footer - Small Height, Full Width
        </Placeholder>
      </div>
    </div>
  ),
};
