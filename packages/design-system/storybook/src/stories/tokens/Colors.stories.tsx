import type { Meta, StoryObj } from '@storybook/react-vite';
import { color } from '@grasdouble/lufa_design-system-tokens';

const meta = {
  title: '1. Tokens/Colors',
  parameters: {
    layout: 'padded',
  },
  tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Semantic color card component
const SemanticColorCard = ({
  title,
  color,
  description,
}: {
  title: string;
  color: Record<string, string>;
  description?: string;
}) => (
  <div
    style={{
      marginBottom: '32px',
      padding: '20px',
      backgroundColor: '#FAFAFA',
      borderRadius: '12px',
      border: '1px solid #E5E5E5',
    }}
  >
    <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>{title}</h3>
    {description && <p style={{ margin: '0 0 16px 0', color: '#737373', fontSize: '14px' }}>{description}</p>}
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      {Object.entries(color).map(([key, value]) => (
        <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '140px' }}>
          <div
            style={{
              width: '140px',
              height: '80px',
              backgroundColor: value,
              borderRadius: '6px',
              border: '1px solid #E5E5E5',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          />
          <div style={{ fontSize: '12px' }}>
            <div style={{ fontWeight: '600', marginBottom: '2px' }}>{key}</div>
            <div style={{ color: '#737373', fontFamily: 'monospace', fontSize: '11px' }}>{value}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const AllSemantic: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1200px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Semantic Colors</h1>
      <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
        Intent-based color tokens for consistent usage across components. All semantic colors meet WCAG 2.1
        accessibility standards when used as intended.
      </p>

      <SemanticColorCard
        title="Text Colors"
        color={color.text}
        description="Colors for different text hierarchies and states"
      />

      <SemanticColorCard
        title="Background Colors"
        color={color.background}
        description="Colors for various background surfaces"
      />

      <SemanticColorCard title="Border Colors" color={color.border} description="Colors for borders and dividers" />

      <SemanticColorCard
        title="Interactive Colors"
        color={color.interactive}
        description="Colors for interactive elements like buttons and links"
      />

      <SemanticColorCard
        title="Success Colors"
        color={color.success}
        description="Colors for success states and positive feedback"
      />

      <SemanticColorCard
        title="Warning Colors"
        color={color.warning}
        description="Colors for warning states and caution"
      />

      <SemanticColorCard title="Error Colors" color={color.error} description="Colors for error states and danger" />

      <SemanticColorCard title="Info Colors" color={color.info} description="Colors for informational states" />

      <SemanticColorCard title="Brand Colors" color={color.brand} description="Primary and secondary brand colors" />

      <SemanticColorCard
        title="Surface Colors"
        color={color.surface}
        description="Colors for cards, panels, and elevated surfaces"
      />

      <SemanticColorCard title="Shadow Colors" color={color.shadow} description="Colors for shadows and depth" />
    </div>
  ),
};

export const TextColors: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <SemanticColorCard
        title="Text Colors"
        color={color.text}
        description="Colors for different text hierarchies and states"
      />
      <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '16px' }}>Examples</h4>
        <p style={{ color: color.text.primary, marginBottom: '8px' }}>Primary text - Main content</p>
        <p style={{ color: color.text.secondary, marginBottom: '8px' }}>Secondary text - Supporting content</p>
        <p style={{ color: color.text.tertiary, marginBottom: '8px' }}>Tertiary text - Helper text</p>
        <p style={{ color: color.text.disabled, marginBottom: '8px' }}>Disabled text</p>
        <div
          style={{
            backgroundColor: color.background.inverse,
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '8px',
          }}
        >
          <p style={{ color: color.text.inverse, margin: 0 }}>Inverse text on dark background</p>
        </div>
        <a href="#" style={{ color: color.text.link }}>
          Link text
        </a>
      </div>
    </div>
  ),
};

export const InteractiveColors: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <SemanticColorCard
        title="Interactive Colors"
        color={color.interactive}
        description="Colors for interactive elements like buttons and links"
      />
      <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '16px' }}>Button Examples</h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            style={{
              backgroundColor: color.interactive.default,
              color: color.text.inverse,
              padding: '10px 20px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500',
            }}
          >
            Default
          </button>
          <button
            style={{
              backgroundColor: color.interactive.hover,
              color: color.text.inverse,
              padding: '10px 20px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500',
            }}
          >
            Hover
          </button>
          <button
            style={{
              backgroundColor: color.interactive.active,
              color: color.text.inverse,
              padding: '10px 20px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500',
            }}
          >
            Active
          </button>
          <button
            style={{
              backgroundColor: color.interactive.disabled,
              color: color.text.disabled,
              padding: '10px 20px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'not-allowed',
              fontWeight: '500',
            }}
            disabled
          >
            Disabled
          </button>
        </div>
      </div>
    </div>
  ),
};

export const StatusColors: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '24px' }}>Status Colors</h2>

      <SemanticColorCard
        title="Success Colors"
        color={color.success}
        description="Colors for success states and positive feedback"
      />

      <SemanticColorCard
        title="Warning Colors"
        color={color.warning}
        description="Colors for warning states and caution"
      />

      <SemanticColorCard title="Error Colors" color={color.error} description="Colors for error states and danger" />

      <SemanticColorCard title="Info Colors" color={color.info} description="Colors for informational states" />

      <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '8px', marginTop: '24px' }}>
        <h4 style={{ marginBottom: '16px' }}>Alert Examples</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div
            style={{
              backgroundColor: color.success.light,
              color: color.success.text,
              padding: '16px',
              borderRadius: '6px',
              borderLeft: `4px solid ${color.success.default}`,
            }}
          >
            <strong>Success:</strong> Operation completed successfully!
          </div>
          <div
            style={{
              backgroundColor: color.warning.light,
              color: color.warning.text,
              padding: '16px',
              borderRadius: '6px',
              borderLeft: `4px solid ${color.warning.default}`,
            }}
          >
            <strong>Warning:</strong> Please review this information.
          </div>
          <div
            style={{
              backgroundColor: color.error.light,
              color: color.error.text,
              padding: '16px',
              borderRadius: '6px',
              borderLeft: `4px solid ${color.error.default}`,
            }}
          >
            <strong>Error:</strong> Something went wrong!
          </div>
          <div
            style={{
              backgroundColor: color.info.light,
              color: color.info.text,
              padding: '16px',
              borderRadius: '6px',
              borderLeft: `4px solid ${color.info.default}`,
            }}
          >
            <strong>Info:</strong> Here&apos;s some helpful information.
          </div>
        </div>
      </div>
    </div>
  ),
};

export const BrandColors: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <SemanticColorCard title="Brand Colors" color={color.brand} description="Primary and secondary brand colors" />
      <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '8px', marginTop: '24px' }}>
        <h4 style={{ marginBottom: '16px' }}>Brand Button Examples</h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            style={{
              backgroundColor: color.brand.primary,
              color: color.text.inverse,
              padding: '12px 24px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
            }}
          >
            Primary Brand
          </button>
          <button
            style={{
              backgroundColor: color.brand.secondary,
              color: color.text.inverse,
              padding: '12px 24px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
            }}
          >
            Secondary Brand
          </button>
          <button
            style={{
              backgroundColor: color.brand.accent,
              color: color.text.inverse,
              padding: '12px 24px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
            }}
          >
            Accent
          </button>
        </div>
      </div>
    </div>
  ),
};
