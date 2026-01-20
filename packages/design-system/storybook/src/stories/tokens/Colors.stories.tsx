import type { Meta, StoryObj } from '@storybook/react-vite';

import tokens from '@grasdouble/lufa_design-system-tokens';

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
      backgroundColor: 'var(--lufa-token-color-background-secondary)',
      borderRadius: '12px',
      border: `1px solid var(--lufa-token-color-border-light)`,
    }}
  >
    <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>{title}</h3>
    {description && (
      <p style={{ margin: '0 0 16px 0', color: 'var(--lufa-token-color-text-tertiary)', fontSize: '14px' }}>
        {description}
      </p>
    )}
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      {Object.entries(color).map(([key, value]) => (
        <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '140px' }}>
          <div
            style={{
              width: '140px',
              height: '80px',
              backgroundColor: value,
              borderRadius: '6px',
              border: `1px solid var(--lufa-token-color-border-light)`,
              boxShadow: 'var(--lufa-token-shadow-xs)',
            }}
          />
          <div style={{ fontSize: '12px' }}>
            <div style={{ fontWeight: '600', marginBottom: '2px' }}>{key}</div>
            <div style={{ color: 'var(--lufa-token-color-text-tertiary)', fontFamily: 'monospace', fontSize: '11px' }}>
              {value}
            </div>
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
      <p style={{ marginBottom: '32px', color: 'var(--lufa-token-color-text-tertiary)', fontSize: '16px' }}>
        Intent-based color tokens for consistent usage across components. All semantic colors meet WCAG 2.1
        accessibility standards when used as intended.
      </p>

      <SemanticColorCard
        title="Text Colors"
        color={tokens.color.text}
        description="Colors for different text hierarchies and states"
      />

      <SemanticColorCard
        title="Background Colors"
        color={tokens.color.background}
        description="Colors for various background surfaces"
      />

      <SemanticColorCard
        title="Border Colors"
        color={tokens.color.border}
        description="Colors for borders and dividers"
      />

      <SemanticColorCard
        title="Interactive Colors"
        color={tokens.color.interactive}
        description="Colors for interactive elements like buttons and links"
      />

      <SemanticColorCard
        title="Success Colors"
        color={tokens.color.success}
        description="Colors for success states and positive feedback"
      />

      <SemanticColorCard
        title="Warning Colors"
        color={tokens.color.warning}
        description="Colors for warning states and caution"
      />

      <SemanticColorCard
        title="Error Colors"
        color={tokens.color.error}
        description="Colors for error states and danger"
      />
      <SemanticColorCard title="Info Colors" color={tokens.color.info} description="Colors for informational states" />

      <SemanticColorCard
        title="Brand Colors"
        color={tokens.color.brand}
        description="Primary and secondary brand colors"
      />

      <SemanticColorCard
        title="Surface Colors"
        color={tokens.color.surface}
        description="Colors for cards, panels, and elevated surfaces"
      />

      <SemanticColorCard title="Shadow Colors" color={tokens.color.shadow} description="Colors for shadows and depth" />
    </div>
  ),
};

export const TextColors: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <SemanticColorCard
        title="Text Colors"
        color={tokens.color.text}
        description="Colors for different text hierarchies and states"
      />
      <div style={{ padding: '20px', backgroundColor: 'var(--lufa-token-color-surface-default)', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '16px' }}>Examples</h4>
        <p style={{ color: 'var(--lufa-token-color-text-primary)', marginBottom: '8px' }}>
          Primary text - Main content
        </p>
        <p style={{ color: 'var(--lufa-token-color-text-secondary)', marginBottom: '8px' }}>
          Secondary text - Supporting content
        </p>
        <p style={{ color: 'var(--lufa-token-color-text-tertiary)', marginBottom: '8px' }}>
          Tertiary text - Helper text
        </p>
        <p style={{ color: 'var(--lufa-token-color-text-disabled)', marginBottom: '8px' }}>Disabled text</p>
        <div
          style={{
            backgroundColor: 'var(--lufa-token-color-background-inverse)',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '8px',
          }}
        >
          <p style={{ color: 'var(--lufa-token-color-text-inverse)', margin: 0 }}>Inverse text on dark background</p>
        </div>
        <a href="#" style={{ color: 'var(--lufa-token-color-text-link)' }}>
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
        color={tokens.color.interactive}
        description="Colors for interactive elements like buttons and links"
      />
      <div style={{ padding: '20px', backgroundColor: 'var(--lufa-token-color-surface-default)', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '16px' }}>Button Examples</h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            style={{
              backgroundColor: 'var(--lufa-token-color-interactive-default)',
              color: 'var(--lufa-token-color-text-inverse)',
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
              backgroundColor: 'var(--lufa-token-color-interactive-hover)',
              color: 'var(--lufa-token-color-text-inverse)',
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
              backgroundColor: 'var(--lufa-token-color-interactive-active)',
              color: 'var(--lufa-token-color-text-inverse)',
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
              backgroundColor: 'var(--lufa-token-color-interactive-disabled)',
              color: 'var(--lufa-token-color-text-disabled)',
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
        color={tokens.color.success}
        description="Colors for success states and positive feedback"
      />

      <SemanticColorCard
        title="Warning Colors"
        color={tokens.color.warning}
        description="Colors for warning states and caution"
      />

      <SemanticColorCard
        title="Error Colors"
        color={tokens.color.error}
        description="Colors for error states and danger"
      />
      <SemanticColorCard title="Info Colors" color={tokens.color.info} description="Colors for informational states" />

      <div
        style={{
          padding: '20px',
          backgroundColor: 'var(--lufa-token-color-surface-default)',
          borderRadius: '8px',
          marginTop: '24px',
        }}
      >
        <h4 style={{ marginBottom: '16px' }}>Alert Examples</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div
            style={{
              backgroundColor: 'var(--lufa-token-color-success-light)',
              color: 'var(--lufa-token-color-success-text)',
              padding: '16px',
              borderRadius: '6px',
              borderLeft: `4px solid var(--lufa-token-color-success-default)`,
            }}
          >
            <strong>Success:</strong> Operation completed successfully!
          </div>
          <div
            style={{
              backgroundColor: 'var(--lufa-token-color-warning-light)',
              color: 'var(--lufa-token-color-warning-text)',
              padding: '16px',
              borderRadius: '6px',
              borderLeft: `4px solid var(--lufa-token-color-warning-default)`,
            }}
          >
            <strong>Warning:</strong> Please review this information.
          </div>
          <div
            style={{
              backgroundColor: 'var(--lufa-token-color-error-light)',
              color: 'var(--lufa-token-color-error-text)',
              padding: '16px',
              borderRadius: '6px',
              borderLeft: `4px solid var(--lufa-token-color-error-default)`,
            }}
          >
            <strong>Error:</strong> Something went wrong!
          </div>
          <div
            style={{
              backgroundColor: 'var(--lufa-token-color-info-light)',
              color: 'var(--lufa-token-color-info-text)',
              padding: '16px',
              borderRadius: '6px',
              borderLeft: `4px solid var(--lufa-token-color-info-default)`,
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
      <SemanticColorCard
        title="Brand Colors"
        color={tokens.color.brand}
        description="Primary and secondary brand colors"
      />
      <div
        style={{
          padding: '20px',
          backgroundColor: 'var(--lufa-token-color-surface-default)',
          borderRadius: '8px',
          marginTop: '24px',
        }}
      >
        <h4 style={{ marginBottom: '16px' }}>Brand Button Examples</h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            style={{
              backgroundColor: 'var(--lufa-token-color-brand-primary)',
              color: 'var(--lufa-token-color-text-inverse)',
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
              backgroundColor: 'var(--lufa-token-color-brand-secondary)',
              color: 'var(--lufa-token-color-text-inverse)',
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
              backgroundColor: 'var(--lufa-token-color-brand-accent)',
              color: 'var(--lufa-token-color-text-inverse)',
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
