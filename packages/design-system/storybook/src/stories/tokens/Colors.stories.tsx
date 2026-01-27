import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryContainer } from '../../components/helpers';
import { STORY_COLORS } from '../../constants/storyColors';

/**
 * Colors - Design System Color Tokens
 *
 * Complete visualization of all color tokens in the design system, organized by category.
 *
 * ## Categories
 * - **Primitive Colors** - Base color palette with shades
 * - **Brand Colors** - Primary and secondary brand colors with states
 * - **Neutral Colors** - Backgrounds, surfaces, borders, and text
 * - **Semantic Colors** - Success, error, warning, and info states
 * - **Interactive Colors** - Button and component-specific colors
 */
const meta = {
  title: 'Tokens/Colors',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const NEUTRAL = STORY_COLORS.neutral;

// Simple color swatch component
const ColorSwatch = ({ token, name, description }: { token: string; name: string; description?: string }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      minWidth: '160px',
      flex: '1 1 160px',
    }}
  >
    <div
      style={{
        width: '100%',
        height: '80px',
        backgroundColor: `var(${token})`,
        borderRadius: '6px',
        border: `1px solid ${NEUTRAL.borderMedium}`,
        boxShadow: 'var(--lufa-semantic-ui-shadow-sm)',
      }}
    />
    <div style={{ fontSize: '11px', fontFamily: 'monospace' }}>
      <div style={{ fontWeight: 600, marginBottom: '2px' }}>{name}</div>
      <div style={{ color: NEUTRAL.textSlate, fontSize: '10px' }}>{token}</div>
      {description && (
        <div style={{ color: NEUTRAL.textSlate, fontSize: '9px', marginTop: '4px', fontFamily: 'sans-serif' }}>
          {description}
        </div>
      )}
    </div>
  </div>
);

// Color category section
const ColorCategory = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: '48px' }}>
    <h2
      style={{
        fontSize: '24px',
        fontWeight: 700,
        marginBottom: '24px',
        color: NEUTRAL.textDark,
        borderBottom: `2px solid ${NEUTRAL.borderMedium}`,
        paddingBottom: '12px',
      }}
    >
      {title}
    </h2>
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
      }}
    >
      {children}
    </div>
  </section>
);

// Color scale component (for primitives)
const ColorScale = ({ colorName, shades }: { colorName: string; shades: number[] }) => (
  <div style={{ marginBottom: '24px' }}>
    <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', textTransform: 'capitalize' }}>
      {colorName}
    </h3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
      {shades.map((shade) => (
        <ColorSwatch
          key={shade}
          token={`--lufa-primitive-color-${colorName}-${shade}`}
          name={`${colorName}-${shade}`}
        />
      ))}
    </div>
  </div>
);

/**
 * ## Overview
 *
 * Complete color token system organized by semantic purpose.
 *
 * 💡 TOKEN EDUCATION: Three-Layer Token Architecture
 *
 * 1️⃣ **Primitive Tokens** (Base Layer)
 *    - Raw color values: blue-500, gray-100, red-700
 *    - Used as building blocks for semantic tokens
 *    - Rarely used directly in components
 *
 * 2️⃣ **Semantic Tokens** (Meaning Layer)
 *    - Purpose-driven: background-surface, text-primary, border-default
 *    - Maps to primitive tokens
 *    - Automatically adapts to light/dark/high-contrast modes
 *    - **Use these for most UI elements**
 *
 * 3️⃣ **Component Tokens** (Component Layer)
 *    - Component-specific: button-primary-background, input-border-focus
 *    - Provides granular control for complex components
 *    - Built on top of semantic tokens
 *    - **Use these when available for your component**
 *
 * ✅ Best Practice Hierarchy:
 *    1. Use component tokens (if available)
 *    2. Use semantic tokens (for general UI)
 *    3. Use primitive tokens (advanced use cases only)
 *
 * 🎨 Theme Support:
 *    All tokens automatically switch values based on active theme mode.
 *    Try switching between light/dark/high-contrast to see it in action!
 */
export const Overview: Story = {
  render: () => (
    <StoryContainer title="Color Tokens">
      {/* Primitive Colors */}
      <ColorCategory title="Primitive Colors">
        <div style={{ width: '100%' }}>
          <ColorScale colorName="gray" shades={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900]} />
          <ColorScale colorName="blue" shades={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900]} />
          <ColorScale colorName="red" shades={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900]} />
          <ColorScale colorName="green" shades={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900]} />
          <ColorScale colorName="yellow" shades={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900]} />
          <ColorScale colorName="purple" shades={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900]} />
        </div>
      </ColorCategory>

      {/* Brand Colors */}
      <ColorCategory title="Brand Colors">
        <ColorSwatch
          token="--lufa-core-brand-primary"
          name="primary"
          description="Primary brand color for main actions and focus states"
        />
        <ColorSwatch token="--lufa-core-brand-primary-hover" name="primary-hover" description="Primary hover state" />
        <ColorSwatch
          token="--lufa-core-brand-primary-active"
          name="primary-active"
          description="Primary active/pressed state"
        />
        <ColorSwatch
          token="--lufa-core-brand-secondary"
          name="secondary"
          description="Secondary brand color for accents and highlights"
        />
        <ColorSwatch
          token="--lufa-core-brand-secondary-hover"
          name="secondary-hover"
          description="Secondary hover state"
        />
        <ColorSwatch
          token="--lufa-core-brand-secondary-active"
          name="secondary-active"
          description="Secondary active/pressed state"
        />
      </ColorCategory>

      {/* Neutral - Background */}
      <ColorCategory title="Neutral - Background">
        <ColorSwatch token="--lufa-semantic-ui-background-page" name="page" description="Main page background" />
        <ColorSwatch
          token="--lufa-semantic-ui-background-surface"
          name="surface"
          description="Cards, panels, elevated content"
        />
        <ColorSwatch
          token="--lufa-core-neutral-surface-hover"
          name="surface-hover"
          description="Hover state for interactive surfaces"
        />
        <ColorSwatch
          token="--lufa-semantic-ui-overlay-backdrop"
          name="overlay"
          description="Modal backdrop, semi-transparent"
        />
        <ColorSwatch
          token="--lufa-semantic-ui-background-on-primary"
          name="on-primary"
          description="Text/icons on primary background"
        />
        <ColorSwatch
          token="--lufa-semantic-ui-background-on-secondary"
          name="on-secondary"
          description="Text/icons on secondary background"
        />
      </ColorCategory>

      {/* Neutral - Text */}
      <ColorCategory title="Neutral - Text">
        <ColorSwatch token="--lufa-semantic-ui-text-primary" name="text-primary" description="Headings and body text" />
        <ColorSwatch token="--lufa-semantic-ui-text-secondary" name="text-secondary" description="Supporting content" />
        <ColorSwatch token="--lufa-semantic-ui-text-tertiary" name="text-tertiary" description="Subtle content" />
        <ColorSwatch
          token="--lufa-core-neutral-text-disabled"
          name="text-disabled"
          description="Disabled/inactive text"
        />
      </ColorCategory>

      {/* Neutral - Border */}
      <ColorCategory title="Neutral - Border">
        <ColorSwatch
          token="--lufa-semantic-ui-border-default"
          name="border-default"
          description="Default dividers and boundaries"
        />
        <ColorSwatch
          token="--lufa-semantic-ui-border-strong"
          name="border-strong"
          description="Emphasis and visual hierarchy"
        />
        <ColorSwatch
          token="--lufa-semantic-interactive-border-focus"
          name="border-focus"
          description="Keyboard focus indicator"
        />
      </ColorCategory>

      {/* Semantic - Success */}
      <ColorCategory title="Semantic - Success">
        <ColorSwatch
          token="--lufa-semantic-ui-text-success"
          name="success"
          description="Success messages and positive feedback"
        />
        <ColorSwatch
          token="--lufa-semantic-ui-background-success"
          name="success-background"
          description="Success alert background"
        />
        <ColorSwatch
          token="--lufa-semantic-ui-background-on-success"
          name="on-success"
          description="Text/icons on success background"
        />
        <ColorSwatch
          token="--lufa-semantic-ui-border-success"
          name="success-border"
          description="Success context borders"
        />
        <ColorSwatch
          token="--lufa-core-semantic-success-hover"
          name="success-hover"
          description="Success interactive hover state"
        />
      </ColorCategory>

      {/* Semantic - Error */}
      <ColorCategory title="Semantic - Error">
        <ColorSwatch
          token="--lufa-semantic-ui-text-error"
          name="error"
          description="Error messages and validation failures"
        />
        <ColorSwatch
          token="--lufa-semantic-ui-background-error"
          name="error-background"
          description="Error alert background"
        />
        <ColorSwatch
          token="--lufa-semantic-ui-background-on-error"
          name="on-error"
          description="Text/icons on error background"
        />
        <ColorSwatch token="--lufa-semantic-ui-border-error" name="error-border" description="Error context borders" />
        <ColorSwatch
          token="--lufa-core-semantic-error-hover"
          name="error-hover"
          description="Error/destructive hover state"
        />
      </ColorCategory>

      {/* Semantic - Warning */}
      <ColorCategory title="Semantic - Warning">
        <ColorSwatch
          token="--lufa-semantic-ui-text-warning"
          name="warning"
          description="Warning messages and caution notices"
        />
        <ColorSwatch
          token="--lufa-semantic-ui-background-warning"
          name="warning-background"
          description="Warning alert background"
        />
        <ColorSwatch
          token="--lufa-semantic-ui-background-on-warning"
          name="on-warning"
          description="Text/icons on warning background"
        />
        <ColorSwatch
          token="--lufa-semantic-ui-border-warning"
          name="warning-border"
          description="Warning context borders"
        />
        <ColorSwatch
          token="--lufa-core-semantic-warning-hover"
          name="warning-hover"
          description="Warning interactive hover state"
        />
      </ColorCategory>

      {/* Semantic - Info */}
      <ColorCategory title="Semantic - Info">
        <ColorSwatch token="--lufa-semantic-ui-text-info" name="info" description="Informational messages" />
        <ColorSwatch
          token="--lufa-semantic-ui-background-info"
          name="info-background"
          description="Info alert background"
        />
        <ColorSwatch
          token="--lufa-semantic-ui-background-on-info"
          name="on-info"
          description="Text/icons on info background"
        />
        <ColorSwatch token="--lufa-semantic-ui-border-info" name="info-border" description="Info context borders" />
        <ColorSwatch
          token="--lufa-core-semantic-info-hover"
          name="info-hover"
          description="Info interactive hover state"
        />
      </ColorCategory>

      {/* Button Colors - Primary */}
      <ColorCategory title="Button - Primary">
        <ColorSwatch
          token="--lufa-component-button-primary-background"
          name="primary-bg"
          description="Primary button background"
        />
        <ColorSwatch
          token="--lufa-component-button-primary-background-hover"
          name="primary-bg-hover"
          description="Primary button hover"
        />
        <ColorSwatch
          token="--lufa-component-button-primary-background-active"
          name="primary-bg-active"
          description="Primary button active"
        />
        <ColorSwatch
          token="--lufa-component-button-primary-text"
          name="primary-text"
          description="Primary button text"
        />
      </ColorCategory>

      {/* Button Colors - Secondary */}
      <ColorCategory title="Button - Secondary">
        <ColorSwatch
          token="--lufa-component-button-secondary-background"
          name="secondary-bg"
          description="Secondary button background"
        />
        <ColorSwatch
          token="--lufa-component-button-secondary-background-hover"
          name="secondary-bg-hover"
          description="Secondary button hover"
        />
        <ColorSwatch
          token="--lufa-component-button-secondary-background-active"
          name="secondary-bg-active"
          description="Secondary button active"
        />
        <ColorSwatch
          token="--lufa-component-button-secondary-text"
          name="secondary-text"
          description="Secondary button text"
        />
      </ColorCategory>

      {/* Button Colors - Ghost */}
      <ColorCategory title="Button - Ghost">
        <ColorSwatch
          token="--lufa-component-button-ghost-background"
          name="ghost-bg"
          description="Ghost button background (transparent)"
        />
        <ColorSwatch
          token="--lufa-component-button-ghost-background-hover"
          name="ghost-bg-hover"
          description="Ghost button hover"
        />
        <ColorSwatch token="--lufa-component-button-ghost-text" name="ghost-text" description="Ghost button text" />
        <ColorSwatch
          token="--lufa-component-button-ghost-text-hover"
          name="ghost-text-hover"
          description="Ghost button text hover"
        />
      </ColorCategory>

      {/* Button Colors - Outline */}
      <ColorCategory title="Button - Outline">
        <ColorSwatch
          token="--lufa-component-button-outline-background"
          name="outline-bg"
          description="Outline button background (transparent)"
        />
        <ColorSwatch
          token="--lufa-component-button-outline-background-hover"
          name="outline-bg-hover"
          description="Outline button hover background"
        />
        <ColorSwatch
          token="--lufa-component-button-outline-border"
          name="outline-border"
          description="Outline button border"
        />
        <ColorSwatch
          token="--lufa-component-button-outline-border-hover"
          name="outline-border-hover"
          description="Outline button border hover"
        />
        <ColorSwatch
          token="--lufa-component-button-outline-text"
          name="outline-text"
          description="Outline button text"
        />
        <ColorSwatch
          token="--lufa-component-button-outline-text-hover"
          name="outline-text-hover"
          description="Outline button text hover"
        />
      </ColorCategory>

      {/* Button Colors - Destructive & Success */}
      <ColorCategory title="Button - Destructive & Success">
        <ColorSwatch
          token="--lufa-component-button-destructive-background"
          name="destructive-bg"
          description="Destructive button (danger actions)"
        />
        <ColorSwatch
          token="--lufa-component-button-destructive-background-hover"
          name="destructive-bg-hover"
          description="Destructive button hover"
        />
        <ColorSwatch
          token="--lufa-component-button-destructive-text"
          name="destructive-text"
          description="Destructive button text"
        />
        <ColorSwatch
          token="--lufa-component-button-success-background"
          name="success-bg"
          description="Success button (positive actions)"
        />
        <ColorSwatch
          token="--lufa-component-button-success-background-hover"
          name="success-bg-hover"
          description="Success button hover"
        />
        <ColorSwatch
          token="--lufa-component-button-success-text"
          name="success-text"
          description="Success button text"
        />
      </ColorCategory>

      {/* Interactive Colors */}
      <ColorCategory title="Interactive States">
        <ColorSwatch
          token="--lufa-semantic-interactive-background-default"
          name="interactive-bg"
          description="Default interactive background"
        />
        <ColorSwatch
          token="--lufa-semantic-interactive-background-hover"
          name="interactive-bg-hover"
          description="Interactive hover background"
        />
        <ColorSwatch
          token="--lufa-semantic-interactive-background-active"
          name="interactive-bg-active"
          description="Interactive active background"
        />
        <ColorSwatch
          token="--lufa-semantic-interactive-background-disabled"
          name="interactive-bg-disabled"
          description="Interactive disabled background"
        />
        <ColorSwatch
          token="--lufa-semantic-interactive-border-default"
          name="interactive-border"
          description="Default interactive border"
        />
        <ColorSwatch
          token="--lufa-semantic-interactive-border-hover"
          name="interactive-border-hover"
          description="Interactive hover border"
        />
        <ColorSwatch
          token="--lufa-semantic-interactive-border-focus"
          name="interactive-border-focus"
          description="Interactive focus border"
        />
        <ColorSwatch
          token="--lufa-semantic-interactive-focus-ring"
          name="focus-ring"
          description="Focus ring for accessibility"
        />
      </ColorCategory>

      {/* Component - Badge */}
      <ColorCategory title="Component - Badge">
        <ColorSwatch
          token="--lufa-component-badge-default-background"
          name="badge-default-bg"
          description="Default badge background"
        />
        <ColorSwatch
          token="--lufa-component-badge-default-text"
          name="badge-default-text"
          description="Default badge text"
        />
        <ColorSwatch
          token="--lufa-component-badge-success-background"
          name="badge-success-bg"
          description="Success badge background"
        />
        <ColorSwatch
          token="--lufa-component-badge-success-text"
          name="badge-success-text"
          description="Success badge text"
        />
        <ColorSwatch
          token="--lufa-component-badge-error-background"
          name="badge-error-bg"
          description="Error badge background"
        />
        <ColorSwatch token="--lufa-component-badge-error-text" name="badge-error-text" description="Error badge text" />
        <ColorSwatch
          token="--lufa-component-badge-warning-background"
          name="badge-warning-bg"
          description="Warning badge background"
        />
        <ColorSwatch
          token="--lufa-component-badge-warning-text"
          name="badge-warning-text"
          description="Warning badge text"
        />
        <ColorSwatch
          token="--lufa-component-badge-info-background"
          name="badge-info-bg"
          description="Info badge background"
        />
        <ColorSwatch token="--lufa-component-badge-info-text" name="badge-info-text" description="Info badge text" />
      </ColorCategory>

      {/* Component - Card */}
      <ColorCategory title="Component - Card">
        <ColorSwatch
          token="--lufa-component-card-background"
          name="card-background"
          description="Card background color"
        />
        <ColorSwatch
          token="--lufa-component-card-border"
          name="card-border"
          description="Card border (outlined variant)"
        />
        <ColorSwatch
          token="--lufa-component-card-header-border"
          name="card-header-border"
          description="Card header divider"
        />
        <ColorSwatch
          token="--lufa-component-card-footer-border"
          name="card-footer-border"
          description="Card footer divider"
        />
      </ColorCategory>

      {/* Component - Input */}
      <ColorCategory title="Component - Input">
        <ColorSwatch
          token="--lufa-component-input-background-default"
          name="input-bg"
          description="Input background (default)"
        />
        <ColorSwatch
          token="--lufa-component-input-background-hover"
          name="input-bg-hover"
          description="Input background (hover)"
        />
        <ColorSwatch
          token="--lufa-component-input-background-disabled"
          name="input-bg-disabled"
          description="Input background (disabled)"
        />
        <ColorSwatch
          token="--lufa-component-input-border-default"
          name="input-border"
          description="Input border (default)"
        />
        <ColorSwatch
          token="--lufa-component-input-border-hover"
          name="input-border-hover"
          description="Input border (hover)"
        />
        <ColorSwatch
          token="--lufa-component-input-border-focus"
          name="input-border-focus"
          description="Input border (focus)"
        />
        <ColorSwatch
          token="--lufa-component-input-border-error"
          name="input-border-error"
          description="Input border (error)"
        />
        <ColorSwatch token="--lufa-component-input-text-default" name="input-text" description="Input text color" />
        <ColorSwatch
          token="--lufa-component-input-text-placeholder"
          name="input-placeholder"
          description="Input placeholder text"
        />
        <ColorSwatch token="--lufa-component-input-label-color" name="input-label" description="Input label text" />
      </ColorCategory>

      {/* Component - Modal */}
      <ColorCategory title="Component - Modal">
        <ColorSwatch
          token="--lufa-component-modal-backdrop-background"
          name="modal-backdrop"
          description="Modal backdrop overlay"
        />
        <ColorSwatch
          token="--lufa-component-modal-content-background"
          name="modal-content-bg"
          description="Modal content background"
        />
      </ColorCategory>
    </StoryContainer>
  ),
};

/**
 * ## Primitive Colors Only
 *
 * Raw color primitives with all shades.
 */
export const PrimitiveColors: Story = {
  render: () => (
    <StoryContainer title="Primitive Colors">
      <ColorScale colorName="gray" shades={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900]} />
      <ColorScale colorName="blue" shades={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900]} />
      <ColorScale colorName="red" shades={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900]} />
      <ColorScale colorName="green" shades={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900]} />
      <ColorScale colorName="yellow" shades={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900]} />
      <ColorScale colorName="purple" shades={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900]} />
    </StoryContainer>
  ),
};

/**
 * ## Semantic Colors Only
 *
 * Semantic color tokens organized by purpose.
 */
export const SemanticColors: Story = {
  render: () => (
    <StoryContainer title="Semantic Colors">
      <ColorCategory title="Success">
        <ColorSwatch token="--lufa-semantic-ui-text-success" name="success" />
        <ColorSwatch token="--lufa-semantic-ui-background-success" name="success-background" />
        <ColorSwatch token="--lufa-semantic-ui-background-on-success" name="on-success" />
        <ColorSwatch token="--lufa-semantic-ui-border-success" name="success-border" />
        <ColorSwatch token="--lufa-core-semantic-success-hover" name="success-hover" />
      </ColorCategory>

      <ColorCategory title="Error">
        <ColorSwatch token="--lufa-semantic-ui-text-error" name="error" />
        <ColorSwatch token="--lufa-semantic-ui-background-error" name="error-background" />
        <ColorSwatch token="--lufa-semantic-ui-background-on-error" name="on-error" />
        <ColorSwatch token="--lufa-semantic-ui-border-error" name="error-border" />
        <ColorSwatch token="--lufa-core-semantic-error-hover" name="error-hover" />
      </ColorCategory>

      <ColorCategory title="Warning">
        <ColorSwatch token="--lufa-semantic-ui-text-warning" name="warning" />
        <ColorSwatch token="--lufa-semantic-ui-background-warning" name="warning-background" />
        <ColorSwatch token="--lufa-semantic-ui-background-on-warning" name="on-warning" />
        <ColorSwatch token="--lufa-semantic-ui-border-warning" name="warning-border" />
        <ColorSwatch token="--lufa-core-semantic-warning-hover" name="warning-hover" />
      </ColorCategory>

      <ColorCategory title="Info">
        <ColorSwatch token="--lufa-semantic-ui-text-info" name="info" />
        <ColorSwatch token="--lufa-semantic-ui-background-info" name="info-background" />
        <ColorSwatch token="--lufa-semantic-ui-background-on-info" name="on-info" />
        <ColorSwatch token="--lufa-semantic-ui-border-info" name="info-border" />
        <ColorSwatch token="--lufa-core-semantic-info-hover" name="info-hover" />
      </ColorCategory>
    </StoryContainer>
  ),
};

/**
 * ## Component Colors
 *
 * Component-specific color tokens (buttons, badges, inputs, etc.)
 */
export const ComponentColors: Story = {
  render: () => (
    <StoryContainer title="Component Colors">
      <ColorCategory title="Button - Primary">
        <ColorSwatch token="--lufa-component-button-primary-background" name="primary-bg" />
        <ColorSwatch token="--lufa-component-button-primary-background-hover" name="primary-bg-hover" />
        <ColorSwatch token="--lufa-component-button-primary-background-active" name="primary-bg-active" />
        <ColorSwatch token="--lufa-component-button-primary-text" name="primary-text" />
      </ColorCategory>

      <ColorCategory title="Button - Secondary">
        <ColorSwatch token="--lufa-component-button-secondary-background" name="secondary-bg" />
        <ColorSwatch token="--lufa-component-button-secondary-background-hover" name="secondary-bg-hover" />
        <ColorSwatch token="--lufa-component-button-secondary-background-active" name="secondary-bg-active" />
        <ColorSwatch token="--lufa-component-button-secondary-text" name="secondary-text" />
      </ColorCategory>

      <ColorCategory title="Badge">
        <ColorSwatch token="--lufa-component-badge-default-background" name="default-bg" />
        <ColorSwatch token="--lufa-component-badge-success-background" name="success-bg" />
        <ColorSwatch token="--lufa-component-badge-error-background" name="error-bg" />
        <ColorSwatch token="--lufa-component-badge-warning-background" name="warning-bg" />
        <ColorSwatch token="--lufa-component-badge-info-background" name="info-bg" />
      </ColorCategory>

      <ColorCategory title="Input">
        <ColorSwatch token="--lufa-component-input-background-default" name="input-bg" />
        <ColorSwatch token="--lufa-component-input-border-default" name="input-border" />
        <ColorSwatch token="--lufa-component-input-border-focus" name="input-border-focus" />
        <ColorSwatch token="--lufa-component-input-border-error" name="input-border-error" />
      </ColorCategory>

      <ColorCategory title="Card">
        <ColorSwatch token="--lufa-component-card-background" name="card-background" />
        <ColorSwatch token="--lufa-component-card-border" name="card-border" />
        <ColorSwatch token="--lufa-component-card-header-border" name="header-border" />
        <ColorSwatch token="--lufa-component-card-footer-border" name="footer-border" />
      </ColorCategory>
    </StoryContainer>
  ),
};
