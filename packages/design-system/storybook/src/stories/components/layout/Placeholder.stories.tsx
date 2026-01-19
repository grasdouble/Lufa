import type { Meta, StoryObj } from '@storybook/react-vite';

import { Placeholder } from '@grasdouble/lufa_design-system';

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--lufa-token-spacing-base)',
        maxWidth: 'var(--lufa-token-max-width-sm)',
      }}
    >
      <div>
        <h3
          style={{
            marginBottom: 'var(--lufa-token-spacing-sm)',
            fontSize: 'var(--lufa-token-font-size-sm)',
            fontWeight: 'var(--lufa-token-font-weight-semibold)',
          }}
        >
          Small
        </h3>
        <Placeholder height="small">Small Height</Placeholder>
      </div>
      <div>
        <h3
          style={{
            marginBottom: 'var(--lufa-token-spacing-sm)',
            fontSize: 'var(--lufa-token-font-size-sm)',
            fontWeight: 'var(--lufa-token-font-weight-semibold)',
          }}
        >
          Medium (default)
        </h3>
        <Placeholder height="medium">Medium Height</Placeholder>
      </div>
      <div>
        <h3
          style={{
            marginBottom: 'var(--lufa-token-spacing-sm)',
            fontSize: 'var(--lufa-token-font-size-sm)',
            fontWeight: 'var(--lufa-token-font-weight-semibold)',
          }}
        >
          Large
        </h3>
        <Placeholder height="large">Large Height</Placeholder>
      </div>
      <div>
        <h3
          style={{
            marginBottom: 'var(--lufa-token-spacing-sm)',
            fontSize: 'var(--lufa-token-font-size-sm)',
            fontWeight: 'var(--lufa-token-font-weight-semibold)',
          }}
        >
          Auto
        </h3>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--lufa-token-spacing-base)' }}>
      <div>
        <h3
          style={{
            marginBottom: 'var(--lufa-token-spacing-sm)',
            fontSize: 'var(--lufa-token-font-size-sm)',
            fontWeight: 'var(--lufa-token-font-weight-semibold)',
          }}
        >
          Auto
        </h3>
        <Placeholder width="auto">Auto</Placeholder>
      </div>
      <div>
        <h3
          style={{
            marginBottom: 'var(--lufa-token-spacing-sm)',
            fontSize: 'var(--lufa-token-font-size-sm)',
            fontWeight: 'var(--lufa-token-font-weight-semibold)',
          }}
        >
          Small
        </h3>
        <Placeholder width="small">Small Width</Placeholder>
      </div>
      <div>
        <h3
          style={{
            marginBottom: 'var(--lufa-token-spacing-sm)',
            fontSize: 'var(--lufa-token-font-size-sm)',
            fontWeight: 'var(--lufa-token-font-weight-semibold)',
          }}
        >
          Medium
        </h3>
        <Placeholder width="medium">Medium Width</Placeholder>
      </div>
      <div>
        <h3
          style={{
            marginBottom: 'var(--lufa-token-spacing-sm)',
            fontSize: 'var(--lufa-token-font-size-sm)',
            fontWeight: 'var(--lufa-token-font-weight-semibold)',
          }}
        >
          Large
        </h3>
        <Placeholder width="large">Large Width</Placeholder>
      </div>
      <div>
        <h3
          style={{
            marginBottom: 'var(--lufa-token-spacing-sm)',
            fontSize: 'var(--lufa-token-font-size-sm)',
            fontWeight: 'var(--lufa-token-font-weight-semibold)',
          }}
        >
          Full (100%)
        </h3>
        <Placeholder width="full">Full Width</Placeholder>
      </div>
    </div>
  ),
};

export const Color: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--lufa-token-spacing-base)',
        maxWidth: 'var(--lufa-token-max-width-sm)',
      }}
    >
      <div>
        <h3
          style={{
            marginBottom: 'var(--lufa-token-spacing-sm)',
            fontSize: 'var(--lufa-token-font-size-sm)',
            fontWeight: 'var(--lufa-token-font-weight-semibold)',
          }}
        >
          Default (Violet Gradient)
        </h3>
        <Placeholder>Default Gradient</Placeholder>
      </div>
      <div>
        <h3
          style={{
            marginBottom: 'var(--lufa-token-spacing-sm)',
            fontSize: 'var(--lufa-token-font-size-sm)',
            fontWeight: 'var(--lufa-token-font-weight-semibold)',
          }}
        >
          Solid - Interactive (Blue)
        </h3>
        <Placeholder color={'var(--lufa-token-color-interactive-default)'}>Solid Blue</Placeholder>
      </div>
      <div>
        <h3
          style={{
            marginBottom: 'var(--lufa-token-spacing-sm)',
            fontSize: 'var(--lufa-token-font-size-sm)',
            fontWeight: 'var(--lufa-token-font-weight-semibold)',
          }}
        >
          Solid - Success (Green)
        </h3>
        <Placeholder color={'var(--lufa-token-color-success-default)'}>Solid Green</Placeholder>
      </div>
      <div>
        <h3
          style={{
            marginBottom: 'var(--lufa-token-spacing-sm)',
            fontSize: 'var(--lufa-token-font-size-sm)',
            fontWeight: 'var(--lufa-token-font-weight-semibold)',
          }}
        >
          Solid - Error (Red)
        </h3>
        <Placeholder color={'var(--lufa-token-color-error-default)'}>Solid Red</Placeholder>
      </div>
      <div>
        <h3
          style={{
            marginBottom: 'var(--lufa-token-spacing-sm)',
            fontSize: 'var(--lufa-token-font-size-sm)',
            fontWeight: 'var(--lufa-token-font-weight-semibold)',
          }}
        >
          Solid - Warning (Orange)
        </h3>
        <Placeholder color={'var(--lufa-token-color-warning-default)'}>Solid Orange</Placeholder>
      </div>
    </div>
  ),
};

export const ColorGradient: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--lufa-token-spacing-base)',
        maxWidth: 'var(--lufa-token-max-width-sm)',
      }}
    >
      <div>
        <h3
          style={{
            marginBottom: 'var(--lufa-token-spacing-sm)',
            fontSize: 'var(--lufa-token-font-size-sm)',
            fontWeight: 'var(--lufa-token-font-weight-semibold)',
          }}
        >
          Blue to Purple
        </h3>
        <Placeholder
          colorFrom={'var(--lufa-token-color-interactive-default)'}
          colorTo={'var(--lufa-token-color-brand-secondary)'}
        >
          Blue → Purple
        </Placeholder>
      </div>
      <div>
        <h3
          style={{
            marginBottom: 'var(--lufa-token-spacing-sm)',
            fontSize: 'var(--lufa-token-font-size-sm)',
            fontWeight: 'var(--lufa-token-font-weight-semibold)',
          }}
        >
          Green to Teal
        </h3>
        <Placeholder
          colorFrom={'var(--lufa-token-color-success-default)'}
          colorTo={'var(--lufa-token-color-info-default)'}
        >
          Green → Teal
        </Placeholder>
      </div>
      <div>
        <h3
          style={{
            marginBottom: 'var(--lufa-token-spacing-sm)',
            fontSize: 'var(--lufa-token-font-size-sm)',
            fontWeight: 'var(--lufa-token-font-weight-semibold)',
          }}
        >
          Orange to Red
        </h3>
        <Placeholder
          colorFrom={'var(--lufa-token-color-warning-default)'}
          colorTo={'var(--lufa-token-color-error-default)'}
        >
          Orange → Red
        </Placeholder>
      </div>
      <div>
        <h3
          style={{
            marginBottom: 'var(--lufa-token-spacing-sm)',
            fontSize: 'var(--lufa-token-font-size-sm)',
            fontWeight: 'var(--lufa-token-font-weight-semibold)',
          }}
        >
          Purple to Pink
        </h3>
        <Placeholder
          colorFrom={'var(--lufa-token-color-brand-secondary)'}
          colorTo={'var(--lufa-token-color-brand-accent)'}
        >
          Purple → Pink
        </Placeholder>
      </div>
      <div>
        <h3
          style={{
            marginBottom: 'var(--lufa-token-spacing-sm)',
            fontSize: 'var(--lufa-token-font-size-sm)',
            fontWeight: 'var(--lufa-token-font-weight-semibold)',
          }}
        >
          Dark to Light
        </h3>
        <Placeholder
          colorFrom={'var(--lufa-token-color-background-inverse)'}
          colorTo={'var(--lufa-token-color-background-secondary)'}
        >
          Dark → Light
        </Placeholder>
      </div>
    </div>
  ),
};

export const CombinedWithAndHeight: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--lufa-token-spacing-base)' }}>
      <Placeholder height="small" width="small" color={'var(--lufa-token-color-interactive-default)'}>
        Small × Small
      </Placeholder>
      <Placeholder height="small" width="medium" color={'var(--lufa-token-color-success-default)'}>
        Small × Medium
      </Placeholder>
      <Placeholder height="small" width="large" color={'var(--lufa-token-color-error-default)'}>
        Small × Large
      </Placeholder>
      <Placeholder height="medium" width="small" color={'var(--lufa-token-color-brand-secondary)'}>
        Medium × Small
      </Placeholder>
      <Placeholder height="medium" width="medium" color={'var(--lufa-token-color-info-default)'}>
        Medium × Medium
      </Placeholder>
      <Placeholder height="medium" width="large" color={'var(--lufa-token-color-warning-default)'}>
        Medium × Large
      </Placeholder>
      <Placeholder height="large" width="small" color={'var(--lufa-token-color-interactive-hover)'}>
        Large × Small
      </Placeholder>
      <Placeholder height="large" width="medium" color={'var(--lufa-token-color-success-hover)'}>
        Large × Medium
      </Placeholder>
      <Placeholder height="large" width="large" color={'var(--lufa-token-color-warning-default)'}>
        Large × Large
      </Placeholder>
    </div>
  ),
};

export const LayoutExample: Story = {
  render: () => (
    <div
      style={{
        maxWidth: 'var(--lufa-token-max-width-4xl)',
        padding: 'var(--lufa-token-spacing-md-lg)',
        backgroundColor: 'var(--lufa-token-color-background-tertiary)',
        borderRadius: 'var(--lufa-token-radius-base)',
      }}
    >
      <h2 style={{ marginBottom: 'var(--lufa-token-spacing-base)' }}>Dashboard Layout Example</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--lufa-token-spacing-base)' }}>
        <Placeholder height="small" width="full" color={'var(--lufa-token-color-interactive-default)'}>
          Header - Small Height, Full Width
        </Placeholder>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `${'var(--lufa-token-dimension-sidebar-width-default)'} 1fr`,
            gap: 'var(--lufa-token-spacing-base)',
          }}
        >
          <Placeholder height="full" width="full" color={'var(--lufa-token-color-brand-secondary)'}>
            Sidebar
          </Placeholder>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--lufa-token-spacing-base)' }}>
            <Placeholder height="medium" width="full" color={'var(--lufa-token-color-success-light)'}>
              Content Area
            </Placeholder>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 'var(--lufa-token-spacing-base)',
              }}
            >
              <Placeholder height="small" color={'var(--lufa-token-color-warning-light)'}>
                Card 1
              </Placeholder>
              <Placeholder height="small" color={'var(--lufa-token-color-warning-light)'}>
                Card 2
              </Placeholder>
              <Placeholder height="small" color={'var(--lufa-token-color-warning-light)'}>
                Card 3
              </Placeholder>
            </div>
          </div>
        </div>
        <Placeholder height="small" width="full" color={'var(--lufa-token-color-text-secondary)'}>
          Footer - Small Height, Full Width
        </Placeholder>
      </div>
    </div>
  ),
};
