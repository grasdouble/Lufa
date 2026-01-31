import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@grasdouble/lufa_design-system';

import { StoryContainer, TokenCard, TokenComparison, TokenMatrix, TokenReferenceChain } from '../../components/helpers';

/**
 * Theme Architecture - Token System Testing
 *
 * Comprehensive testing environment for our three-layer token architecture.
 * This story demonstrates how themeable tokens adapt while primitive tokens remain immutable.
 *
 * ## Architecture Layers
 *
 * 1. **Primitive Tokens** (Immutable Base Layer)
 *    - Raw values: colors, spacing, sizes
 *    - Never change across themes or modes
 *    - Example: `--lufa-primitive-color-blue-500`
 *
 * 2. **Semantic Tokens** (Meaning Layer)
 *    - Purpose-driven: background-page, text-primary, border-default
 *    - Themeable: changes with theme (Default/Ocean/Forest)
 *    - Mode-aware: adapts to light/dark/high-contrast
 *    - Example: `--lufa-semantic-ui-background-page`
 *
 * 3. **Component Tokens** (Component Layer)
 *    - Component-specific: button-primary-background, card-border
 *    - Themeable and contextual
 *    - Example: `--lufa-component-button-primary-background`
 *
 * ## Testing Instructions
 *
 * Use the Storybook toolbar to test:
 * - **Theme Switcher**: Default / 🌊 Ocean / 🌲 Forest
 * - **Mode Switcher**: ☀️ Light / 🌙 Dark / ◐ High Contrast
 *
 * Watch how:
 * - ✅ Semantic/Component tokens change appropriately
 * - ✅ Primitive tokens remain constant
 * - ✅ Components automatically adapt
 */
const meta = {
  title: '1. Architecture/Theme Architecture',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Interactive testing environment for the token architecture. Demonstrates themeable vs immutable tokens.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Overview
 *
 * Visual guide to our token architecture hierarchy and testing workflow.
 *
 * This page provides a comprehensive overview of how tokens flow through
 * the three-layer system and how to test themability.
 */
export const Overview: Story = {
  render: () => (
    <StoryContainer title="Theme Architecture Overview">
      {/* Architecture Diagram */}
      <div
        style={{
          marginBottom: '48px',
          padding: '32px',
          borderRadius: '12px',
          backgroundColor: 'var(--lufa-semantic-ui-background-surface)',
          border: '2px solid var(--lufa-semantic-ui-border-default)',
        }}
      >
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 700,
            marginBottom: '24px',
            color: 'var(--lufa-semantic-ui-text-primary)',
          }}
        >
          Token Architecture Hierarchy
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Component Layer */}
          <div
            style={{
              display: 'flex',
              gap: '20px',
              alignItems: 'center',
              padding: '20px',
              borderRadius: '8px',
              backgroundColor: 'var(--lufa-primitive-color-green-100)',
              border: '2px solid var(--lufa-primitive-color-green-600)',
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: 'var(--lufa-primitive-color-green-600)',
                  marginBottom: '8px',
                }}
              >
                3️⃣ Component Tokens
              </div>
              <div
                style={{
                  fontSize: '13px',
                  color: 'var(--lufa-primitive-color-green-600)',
                  lineHeight: '1.5',
                }}
              >
                Component-specific tokens. Example: <code>--lufa-component-button-primary-background</code>
                <br />
                <strong>Themeable:</strong> ✅ Yes | <strong>Mode-Aware:</strong> ✅ Yes
              </div>
            </div>
            <div style={{ fontSize: '24px' }}>🎨</div>
          </div>

          <div style={{ textAlign: 'center', fontSize: '24px', color: 'var(--lufa-semantic-ui-text-tertiary)' }}>↓</div>

          {/* Semantic Layer */}
          <div
            style={{
              display: 'flex',
              gap: '20px',
              alignItems: 'center',
              padding: '20px',
              borderRadius: '8px',
              backgroundColor: 'var(--lufa-primitive-color-blue-100)',
              border: '2px solid var(--lufa-primitive-color-blue-500)',
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: 'var(--lufa-primitive-color-blue-600)',
                  marginBottom: '8px',
                }}
              >
                2️⃣ Semantic Tokens
              </div>
              <div
                style={{
                  fontSize: '13px',
                  color: 'var(--lufa-primitive-color-blue-600)',
                  lineHeight: '1.5',
                }}
              >
                Purpose-driven tokens. Example: <code>--lufa-semantic-ui-background-page</code>
                <br />
                <strong>Themeable:</strong> ✅ Yes | <strong>Mode-Aware:</strong> ✅ Yes
              </div>
            </div>
            <div style={{ fontSize: '24px' }}>💡</div>
          </div>

          <div style={{ textAlign: 'center', fontSize: '24px', color: 'var(--lufa-semantic-ui-text-tertiary)' }}>↓</div>

          {/* Primitive Layer */}
          <div
            style={{
              display: 'flex',
              gap: '20px',
              alignItems: 'center',
              padding: '20px',
              borderRadius: '8px',
              backgroundColor: 'var(--lufa-primitive-color-purple-100)',
              border: '2px solid var(--lufa-primitive-color-purple-500)',
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: 'var(--lufa-primitive-color-purple-500)',
                  marginBottom: '8px',
                }}
              >
                1️⃣ Primitive Tokens
              </div>
              <div
                style={{
                  fontSize: '13px',
                  color: 'var(--lufa-primitive-color-purple-500)',
                  lineHeight: '1.5',
                }}
              >
                Raw immutable values. Example: <code>--lufa-primitive-color-blue-500</code>
                <br />
                <strong>Themeable:</strong> ❌ No | <strong>Mode-Aware:</strong> ❌ No | <strong>Immutable:</strong> ✅
                Always
              </div>
            </div>
            <div style={{ fontSize: '24px' }}>🔒</div>
          </div>
        </div>
      </div>

      {/* Testing Guide */}
      <div
        style={{
          padding: '24px',
          borderRadius: '8px',
          backgroundColor: 'var(--lufa-semantic-ui-background-info)',
          border: '1px solid var(--lufa-semantic-ui-border-info)',
          marginBottom: '32px',
        }}
      >
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 700,
            color: 'var(--lufa-semantic-ui-text-info)',
            marginBottom: '16px',
          }}
        >
          📋 How to Test Themability
        </h3>
        <ol
          style={{
            fontSize: '13px',
            color: 'var(--lufa-semantic-ui-text-info)',
            lineHeight: '1.6',
            margin: 0,
            paddingLeft: '20px',
          }}
        >
          <li>
            <strong>Switch Themes:</strong> Use the Theme toolbar (🎨 paintbrush icon) → Try Default, Ocean 🌊, Forest
            🌲
          </li>
          <li>
            <strong>Switch Modes:</strong> Use the Mode toolbar (◐ contrast icon) → Try Light ☀️, Dark 🌙, High Contrast
            ◐
          </li>
          <li>
            <strong>Observe Changes:</strong>
            <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
              <li>Semantic tokens (blue badges) should change values</li>
              <li>Component tokens (green badges) should change values</li>
              <li>Primitive tokens (purple badges) should NEVER change</li>
            </ul>
          </li>
          <li>
            <strong>Navigate Stories:</strong> Explore each story below to see different aspects of themability
          </li>
        </ol>
      </div>

      {/* Key Concepts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div
          style={{
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: 'var(--lufa-semantic-ui-background-success)',
            border: '1px solid var(--lufa-semantic-ui-border-success)',
          }}
        >
          <div
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: 'var(--lufa-semantic-ui-text-success)',
              marginBottom: '12px',
            }}
          >
            ✅ Themeable Tokens
          </div>
          <div style={{ fontSize: '12px', color: 'var(--lufa-semantic-ui-text-success)', lineHeight: '1.5' }}>
            Semantic and Component tokens that adapt to theme and mode changes. These provide flexibility and
            accessibility. Use these for most UI elements.
          </div>
        </div>

        <div
          style={{
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: 'var(--lufa-primitive-color-gray-100)',
            border: '1px solid var(--lufa-primitive-color-gray-300)',
          }}
        >
          <div
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: 'var(--lufa-primitive-color-gray-700)',
              marginBottom: '12px',
            }}
          >
            🔒 Immutable Tokens
          </div>
          <div style={{ fontSize: '12px', color: 'var(--lufa-primitive-color-gray-700)', lineHeight: '1.5' }}>
            Primitive tokens that never change. These provide stability and consistency across all themes and modes. Use
            for fixed brand colors or special cases.
          </div>
        </div>

        <div
          style={{
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: 'var(--lufa-semantic-ui-background-warning)',
            border: '1px solid var(--lufa-semantic-ui-border-warning)',
          }}
        >
          <div
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: 'var(--lufa-semantic-ui-text-warning)',
              marginBottom: '12px',
            }}
          >
            💡 Mode-Aware Tokens
          </div>
          <div style={{ fontSize: '12px', color: 'var(--lufa-semantic-ui-text-warning)', lineHeight: '1.5' }}>
            Tokens that adapt to accessibility modes (light/dark/high-contrast). These ensure your UI works in all
            visibility conditions.
          </div>
        </div>
      </div>
    </StoryContainer>
  ),
};

/**
 * ## Themeable vs Non-Themeable
 *
 * Side-by-side comparison of themeable semantic tokens vs immutable primitive tokens.
 *
 * **Test Instructions:**
 * 1. Switch between themes (Default/Ocean/Forest) using the toolbar
 * 2. Notice how the LEFT column changes but the RIGHT column stays the same
 * 3. Try switching modes (Light/Dark/High-Contrast) too
 */
export const ThemeableVsNonThemeable: Story = {
  render: () => (
    <StoryContainer title="Themeable vs Non-Themeable Tokens">
      <div
        style={{
          padding: '16px',
          borderRadius: '8px',
          backgroundColor: 'var(--lufa-semantic-ui-background-warning)',
          border: '1px solid var(--lufa-semantic-ui-border-warning)',
          marginBottom: '32px',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--lufa-semantic-ui-text-warning)',
            marginBottom: '8px',
          }}
        >
          🧪 Interactive Test
        </div>
        <div style={{ fontSize: '13px', color: 'var(--lufa-semantic-ui-text-warning)', lineHeight: '1.5' }}>
          Switch themes and modes using the Storybook toolbar. Watch the <strong>left column</strong> change while the{' '}
          <strong>right column</strong> remains constant.
        </div>
      </div>

      <TokenComparison
        title="Primary Color Comparison"
        description="Brand primary color: themeable semantic vs immutable primitive"
        themeableToken={{
          name: 'Brand Primary',
          cssVariable: '--lufa-core-brand-primary',
          description: 'Themeable brand color that changes with theme',
        }}
        nonThemeableToken={{
          name: 'Blue 500',
          cssVariable: '--lufa-primitive-color-blue-500',
          description: 'Immutable primitive that never changes',
        }}
      />

      <TokenComparison
        title="Background Comparison"
        description="Page background: mode-aware semantic vs fixed primitive"
        themeableToken={{
          name: 'Background Page',
          cssVariable: '--lufa-semantic-ui-background-page',
          description: 'Adapts to light/dark/high-contrast modes',
        }}
        nonThemeableToken={{
          name: 'Gray 50',
          cssVariable: '--lufa-primitive-color-gray-50',
          description: 'Always the same light gray value',
        }}
      />

      <TokenComparison
        title="Success Color Comparison"
        description="Success semantic vs green primitive"
        themeableToken={{
          name: 'Success Color',
          cssVariable: '--lufa-semantic-ui-text-success',
          description: 'Mode-aware success color for feedback',
        }}
        nonThemeableToken={{
          name: 'Green 600',
          cssVariable: '--lufa-primitive-color-green-600',
          description: 'Fixed green shade',
        }}
      />
    </StoryContainer>
  ),
};

/**
 * ## Mode-Aware Tokens
 *
 * Demonstrates tokens that adapt to light/dark/high-contrast modes.
 *
 * **Test Instructions:**
 * 1. Use the Mode toolbar: ☀️ Light / 🌙 Dark / ◐ High Contrast
 * 2. Watch the top matrix (mode-aware) change with each mode
 * 3. Notice the bottom matrix (primitives) never changes
 */
export const ModeAwareTokens: Story = {
  render: () => (
    <StoryContainer title="Mode-Aware Tokens">
      <TokenMatrix
        title="Mode-Aware Semantic Tokens"
        description="These tokens automatically adapt to the selected mode (light/dark/high-contrast)"
        showModeInfo
        tokens={[
          {
            name: 'Page Background',
            cssVariable: '--lufa-semantic-ui-background-page',
            level: 'semantic',
            themeable: true,
            modeAware: true,
            description: 'Main page background',
          },
          {
            name: 'Surface Background',
            cssVariable: '--lufa-semantic-ui-background-surface',
            level: 'semantic',
            themeable: true,
            modeAware: true,
            description: 'Cards and panels',
          },
          {
            name: 'Primary Text',
            cssVariable: '--lufa-semantic-ui-text-primary',
            level: 'semantic',
            themeable: true,
            modeAware: true,
            description: 'Main text color',
          },
          {
            name: 'Secondary Text',
            cssVariable: '--lufa-semantic-ui-text-secondary',
            level: 'semantic',
            themeable: true,
            modeAware: true,
            description: 'Supporting text',
          },
          {
            name: 'Border Default',
            cssVariable: '--lufa-semantic-ui-border-default',
            level: 'semantic',
            themeable: true,
            modeAware: true,
            description: 'Default borders',
          },
          {
            name: 'Border Strong',
            cssVariable: '--lufa-semantic-ui-border-strong',
            level: 'semantic',
            themeable: true,
            modeAware: true,
            description: 'Emphasized borders',
          },
        ]}
      />

      <div style={{ height: '40px' }} />

      <TokenMatrix
        title="Static Primitive Tokens"
        description="These primitive tokens remain constant regardless of mode"
        tokens={[
          {
            name: 'Gray 50',
            cssVariable: '--lufa-primitive-color-gray-50',
            level: 'primitive',
            themeable: false,
            modeAware: false,
          },
          {
            name: 'Gray 100',
            cssVariable: '--lufa-primitive-color-gray-100',
            level: 'primitive',
            themeable: false,
            modeAware: false,
          },
          {
            name: 'Gray 900',
            cssVariable: '--lufa-primitive-color-gray-900',
            level: 'primitive',
            themeable: false,
            modeAware: false,
          },
          {
            name: 'Blue 500',
            cssVariable: '--lufa-primitive-color-blue-500',
            level: 'primitive',
            themeable: false,
            modeAware: false,
          },
          {
            name: 'Blue 600',
            cssVariable: '--lufa-primitive-color-blue-600',
            level: 'primitive',
            themeable: false,
            modeAware: false,
          },
          {
            name: 'Green 600',
            cssVariable: '--lufa-primitive-color-green-600',
            level: 'primitive',
            themeable: false,
            modeAware: false,
          },
        ]}
      />
    </StoryContainer>
  ),
};

/**
 * ## Primitive Immutability
 *
 * Proves that primitive tokens never change across themes or modes.
 *
 * **Test Instructions:**
 * 1. Try ALL theme combinations (Default/Ocean/Forest)
 * 2. Try ALL mode combinations (Light/Dark/High-Contrast)
 * 3. Notice these tokens NEVER change their computed values
 */
export const PrimitiveImmutability: Story = {
  render: () => (
    <StoryContainer title="Primitive Token Immutability">
      <div
        style={{
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: 'var(--lufa-primitive-color-purple-100)',
          border: '2px solid var(--lufa-primitive-color-purple-500)',
          marginBottom: '32px',
        }}
      >
        <div
          style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--lufa-primitive-color-purple-500)',
            marginBottom: '12px',
          }}
        >
          🔒 Immutability Guarantee
        </div>
        <div
          style={{
            fontSize: '13px',
            color: 'var(--lufa-primitive-color-purple-500)',
            lineHeight: '1.6',
          }}
        >
          Primitive tokens are the foundation of our design system. They provide stable, unchanging values that higher
          layers can reference. No matter what theme or mode you select, these tokens will <strong>always</strong>{' '}
          return the same computed value.
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}
      >
        <TokenCard
          tokenName="Blue 500"
          cssVariable="--lufa-primitive-color-blue-500"
          level="primitive"
          themeable={false}
          modeAware={false}
          description="Primary brand blue, always constant"
          category="color"
          showValue
        />

        <TokenCard
          tokenName="Blue 600"
          cssVariable="--lufa-primitive-color-blue-600"
          level="primitive"
          themeable={false}
          modeAware={false}
          description="Darker blue shade, immutable"
          category="color"
          showValue
        />

        <TokenCard
          tokenName="Gray 50"
          cssVariable="--lufa-primitive-color-gray-50"
          level="primitive"
          themeable={false}
          modeAware={false}
          description="Lightest gray, never changes"
          category="color"
          showValue
        />

        <TokenCard
          tokenName="Gray 900"
          cssVariable="--lufa-primitive-color-gray-900"
          level="primitive"
          themeable={false}
          modeAware={false}
          description="Darkest gray, constant"
          category="color"
          showValue
        />

        <TokenCard
          tokenName="Green 600"
          cssVariable="--lufa-primitive-color-green-600"
          level="primitive"
          themeable={false}
          modeAware={false}
          description="Success green, immutable"
          category="color"
          showValue
        />

        <TokenCard
          tokenName="Red 500"
          cssVariable="--lufa-primitive-color-red-500"
          level="primitive"
          themeable={false}
          modeAware={false}
          description="Error red, always the same"
          category="color"
          showValue
        />
      </div>

      <div
        style={{
          marginTop: '32px',
          padding: '16px',
          borderRadius: '6px',
          backgroundColor: 'var(--lufa-semantic-ui-background-info)',
          border: '1px solid var(--lufa-semantic-ui-border-info)',
        }}
      >
        <div
          style={{
            fontSize: '12px',
            color: 'var(--lufa-semantic-ui-text-info)',
            lineHeight: '1.5',
          }}
        >
          <strong>Why Immutability Matters:</strong> Having stable primitive tokens ensures that when you use a specific
          color (like blue-500), it's predictable across your entire application. Higher-level tokens can reference
          these primitives and add themability on top.
        </div>
      </div>
    </StoryContainer>
  ),
};

/**
 * ## Token Reference Chains
 *
 * Visualizes how tokens reference each other through the architecture layers.
 *
 * **Test Instructions:**
 * 1. See how component tokens reference semantic tokens
 * 2. See how semantic tokens reference primitive tokens
 * 3. Switch themes/modes to see which levels change
 */
export const TokenReferenceChains: Story = {
  render: () => (
    <StoryContainer title="Token Reference Chains">
      <div
        style={{
          padding: '16px',
          borderRadius: '8px',
          backgroundColor: 'var(--lufa-semantic-ui-background-info)',
          border: '1px solid var(--lufa-semantic-ui-border-info)',
          marginBottom: '32px',
        }}
      >
        <div style={{ fontSize: '13px', color: 'var(--lufa-semantic-ui-text-info)', lineHeight: '1.5' }}>
          These chains show how tokens flow through the architecture. Read from left to right: Component → Semantic →
          Primitive. When you change themes/modes, watch how the semantic layer acts as a translator between immutable
          primitives and flexible components.
        </div>
      </div>

      <TokenReferenceChain
        title="Button Primary Background Chain"
        description="How the primary button gets its background color"
        chain={[
          {
            name: 'Button Primary BG',
            cssVariable: '--lufa-component-button-primary-background',
            level: 'component',
            description: 'Component token for button',
          },
          {
            name: 'Brand Primary',
            cssVariable: '--lufa-core-brand-primary',
            level: 'semantic',
            description: 'Semantic brand color',
          },
          {
            name: 'Blue 500',
            cssVariable: '--lufa-primitive-color-blue-500',
            level: 'primitive',
            description: 'Base primitive value',
          },
        ]}
      />

      <TokenReferenceChain
        title="Badge Success Background Chain"
        description="How success badges get their background color"
        chain={[
          {
            name: 'Badge Success BG',
            cssVariable: '--lufa-component-badge-success-background',
            level: 'component',
            description: 'Badge component token',
          },
          {
            name: 'Success Background',
            cssVariable: '--lufa-semantic-ui-background-success',
            level: 'semantic',
            description: 'Semantic success color',
          },
          {
            name: 'Green 100',
            cssVariable: '--lufa-primitive-color-green-100',
            level: 'primitive',
            description: 'Light green primitive',
          },
        ]}
      />

      <TokenReferenceChain
        title="Card Border Chain"
        description="How card borders reference the design system"
        chain={[
          {
            name: 'Card Border',
            cssVariable: '--lufa-component-card-border',
            level: 'component',
            description: 'Card-specific border',
          },
          {
            name: 'Border Default',
            cssVariable: '--lufa-semantic-ui-border-default',
            level: 'semantic',
            description: 'Semantic default border',
          },
          {
            name: 'Gray 300',
            cssVariable: '--lufa-primitive-color-gray-300',
            level: 'primitive',
            description: 'Base gray primitive',
          },
        ]}
      />

      <div
        style={{
          marginTop: '32px',
          padding: '16px',
          borderRadius: '6px',
          backgroundColor: 'var(--lufa-semantic-ui-background-success)',
          border: '1px solid var(--lufa-semantic-ui-border-success)',
        }}
      >
        <div
          style={{
            fontSize: '12px',
            color: 'var(--lufa-semantic-ui-text-success)',
            lineHeight: '1.5',
          }}
        >
          <strong>💡 Pro Tip:</strong> By chaining tokens this way, we can change the semantic layer's mapping without
          touching component code. For example, in dark mode, "Border Default" might reference gray-700 instead of
          gray-300, and all components automatically adapt.
        </div>
      </div>
    </StoryContainer>
  ),
};

/**
 * ## Component Examples
 *
 * Real components using themeable tokens to demonstrate practical themability.
 *
 * **Test Instructions:**
 * 1. Switch themes (Default/Ocean/Forest) - see buttons and badges change
 * 2. Switch modes (Light/Dark/High-Contrast) - see backgrounds adapt
 * 3. Notice how components automatically respond to token changes
 */
export const ComponentExamples: Story = {
  render: () => (
    <StoryContainer title="Component Examples with Themeable Tokens">
      <div
        style={{
          padding: '16px',
          borderRadius: '8px',
          backgroundColor: 'var(--lufa-semantic-ui-background-success)',
          border: '1px solid var(--lufa-semantic-ui-border-success)',
          marginBottom: '32px',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--lufa-semantic-ui-text-success)',
            marginBottom: '8px',
          }}
        >
          🎨 Live Component Theming
        </div>
        <div style={{ fontSize: '13px', color: 'var(--lufa-semantic-ui-text-success)', lineHeight: '1.5' }}>
          These real components use themeable tokens. Switch themes and modes to see them adapt in real-time without any
          code changes.
        </div>
      </div>

      {/* Buttons Section */}
      <div style={{ marginBottom: '40px' }}>
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 700,
            color: 'var(--lufa-semantic-ui-text-primary)',
            marginBottom: '16px',
          }}
        >
          Button Components
        </h3>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            padding: '24px',
            borderRadius: '8px',
            backgroundColor: 'var(--lufa-semantic-ui-background-surface)',
            border: '1px solid var(--lufa-semantic-ui-border-default)',
          }}
        >
          <Button type="solid" variant="primary">
            Primary Button
          </Button>
          <Button type="solid" variant="secondary">
            Secondary Button
          </Button>
          <Button type="solid" variant="success">
            Success Button
          </Button>
          <Button type="solid" variant="danger">
            Danger Button
          </Button>
          <Button type="outline" variant="primary">
            Outline Button
          </Button>
          <Button type="ghost" variant="primary">
            Ghost Button
          </Button>
        </div>
        <div
          style={{
            marginTop: '12px',
            fontSize: '12px',
            color: 'var(--lufa-semantic-ui-text-secondary)',
            fontStyle: 'italic',
          }}
        >
          Uses: --lufa-component-button-* tokens
        </div>
      </div>

      {/* Badges Section */}
      <div style={{ marginBottom: '40px' }}>
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 700,
            color: 'var(--lufa-semantic-ui-text-primary)',
            marginBottom: '16px',
          }}
        >
          Badge Components
        </h3>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            padding: '24px',
            borderRadius: '8px',
            backgroundColor: 'var(--lufa-semantic-ui-background-surface)',
            border: '1px solid var(--lufa-semantic-ui-border-default)',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 600,
              backgroundColor: 'var(--lufa-component-badge-default-background)',
              color: 'var(--lufa-component-badge-default-text)',
            }}
          >
            Default
          </span>
          <span
            style={{
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 600,
              backgroundColor: 'var(--lufa-component-badge-success-background)',
              color: 'var(--lufa-component-badge-success-text)',
            }}
          >
            Success
          </span>
          <span
            style={{
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 600,
              backgroundColor: 'var(--lufa-component-badge-error-background)',
              color: 'var(--lufa-component-badge-error-text)',
            }}
          >
            Error
          </span>
          <span
            style={{
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 600,
              backgroundColor: 'var(--lufa-component-badge-warning-background)',
              color: 'var(--lufa-component-badge-warning-text)',
            }}
          >
            Warning
          </span>
          <span
            style={{
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 600,
              backgroundColor: 'var(--lufa-component-badge-info-background)',
              color: 'var(--lufa-component-badge-info-text)',
            }}
          >
            Info
          </span>
        </div>
        <div
          style={{
            marginTop: '12px',
            fontSize: '12px',
            color: 'var(--lufa-semantic-ui-text-secondary)',
            fontStyle: 'italic',
          }}
        >
          Uses: --lufa-component-badge-* tokens
        </div>
      </div>

      {/* Card Section */}
      <div style={{ marginBottom: '40px' }}>
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 700,
            color: 'var(--lufa-semantic-ui-text-primary)',
            marginBottom: '16px',
          }}
        >
          Card Components
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          <div
            style={{
              padding: '20px',
              borderRadius: '8px',
              backgroundColor: 'var(--lufa-component-card-background)',
              border: '1px solid var(--lufa-component-card-border)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <div
              style={{
                fontSize: '16px',
                fontWeight: 700,
                color: 'var(--lufa-semantic-ui-text-primary)',
                marginBottom: '8px',
              }}
            >
              Themeable Card
            </div>
            <div
              style={{
                fontSize: '13px',
                color: 'var(--lufa-semantic-ui-text-secondary)',
                lineHeight: '1.5',
              }}
            >
              This card uses component tokens for background and border. Watch it adapt to different themes and modes.
            </div>
          </div>

          <div
            style={{
              padding: '20px',
              borderRadius: '8px',
              backgroundColor: 'var(--lufa-component-card-background)',
              border: '1px solid var(--lufa-component-card-border)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <div
              style={{
                fontSize: '16px',
                fontWeight: 700,
                color: 'var(--lufa-semantic-ui-text-primary)',
                marginBottom: '12px',
                paddingBottom: '12px',
                borderBottom: '1px solid var(--lufa-component-card-header-border)',
              }}
            >
              Card with Header
            </div>
            <div
              style={{
                fontSize: '13px',
                color: 'var(--lufa-semantic-ui-text-secondary)',
                lineHeight: '1.5',
              }}
            >
              Header borders also use themeable tokens to ensure consistency across themes.
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: '12px',
            fontSize: '12px',
            color: 'var(--lufa-semantic-ui-text-secondary)',
            fontStyle: 'italic',
          }}
        >
          Uses: --lufa-component-card-* tokens
        </div>
      </div>

      {/* Summary */}
      <div
        style={{
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: 'var(--lufa-primitive-color-blue-100)',
          border: '2px solid var(--lufa-primitive-color-blue-500)',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: 'var(--lufa-primitive-color-blue-600)',
            marginBottom: '12px',
          }}
        >
          🎯 Key Takeaway
        </div>
        <div
          style={{
            fontSize: '13px',
            color: 'var(--lufa-primitive-color-blue-600)',
            lineHeight: '1.6',
          }}
        >
          By using themeable tokens in component implementations, we get automatic theming and mode support without
          writing any theme-specific code. The token architecture handles all the complexity, letting designers change
          themes and developers write components once.
        </div>
      </div>
    </StoryContainer>
  ),
};
