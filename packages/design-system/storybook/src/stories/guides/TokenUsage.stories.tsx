import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Box, Button, Text } from '@grasdouble/lufa_design-system';

import { CodeBlock, StoryContainer } from '../../components/helpers';
import { STORY_COLORS } from '../../constants/storyColors';

/**
 * Token Usage Guide
 *
 * Educational guide for using design tokens effectively in the Lufa Design System.
 * Learn when to use tokens vs hard-coded values, and discover best practices for token-based development.
 *
 * ## Why Design Tokens?
 * - ✅ **Consistency** - Unified design language across all components
 * - ✅ **Theming** - Automatic light/dark/high-contrast mode support
 * - ✅ **Maintainability** - Update once, apply everywhere
 * - ✅ **Accessibility** - WCAG-compliant colors and contrast ratios
 * - ✅ **Scalability** - Easy to extend and customize
 *
 * ## Token Categories
 * 1. **Primitive Tokens** - Base values (colors, spacing, typography)
 * 2. **Semantic Tokens** - Purpose-driven tokens (background-page, text-primary)
 * 3. **Component Tokens** - Component-specific tokens (button-primary-background)
 */
const meta = {
  title: '2. Guides/Token Usage',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Learn when and how to use design tokens effectively. This guide shows best practices, common patterns, and migration examples.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const NEUTRAL = STORY_COLORS.neutral;
const PRIMARY = STORY_COLORS.primary;

/**
 * ## Token vs Hard-Coded Comparison
 *
 * Visual comparison showing the difference between token-based and hard-coded styling.
 *
 * ### Token-Based (✅ Recommended)
 * - Automatically adapts to theme changes (light/dark/high-contrast)
 * - Maintains design consistency
 * - Easy to update globally
 * - Accessible by default
 *
 * ### Hard-Coded (❌ Not Recommended)
 * - Breaks in different themes
 * - Inconsistent design
 * - Hard to maintain
 * - Accessibility issues
 *
 * **Try it:** Toggle between light/dark modes in the toolbar to see the difference!
 */
export const TokenVsHardCoded: Story = {
  render: () => {
    return (
      <StoryContainer title="Token vs Hard-Coded Comparison">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Good Example - Token-Based */}
          <section>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
              }}
            >
              <span style={{ fontSize: '24px' }}>✅</span>
              <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>Token-Based (Recommended)</h3>
            </div>

            <Box padding="comfortable" background="surface" borderWidth="thin" borderRadius="default">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/*
                  EDUCATIONAL NOTE: These buttons use semantic design tokens.
                  - Background: var(--lufa-component-button-primary-background)
                  - Text: var(--lufa-component-button-primary-text)
                  - Hover: var(--lufa-component-button-primary-background-hover)
                  
                  These tokens automatically adapt to:
                  - Light mode
                  - Dark mode
                  - High-contrast mode
                  
                  Result: Perfect theme support without any extra code!
                */}
                <Button variant="primary">Token-Based Button</Button>
                <Button variant="secondary">Token-Based Secondary</Button>
                <Button variant="success">Token-Based Success</Button>

                <Text variant="body" color="primary">
                  Token-based text adapts to theme automatically
                </Text>
                <Text variant="body" color="success">
                  ✓ Semantic colors work in all themes
                </Text>
              </div>
            </Box>

            <CodeBlock
              code={`{/* ✅ GOOD: Using design tokens */}
<Button variant="primary">
  Token-Based Button
</Button>

<Text color="success">
  Semantic color token
</Text>

{/* CSS automatically uses: */}
background: var(--lufa-component-button-primary-background);
color: var(--lufa-semantic-ui-text-success);`}
              language="jsx"
              title="Token-Based Code"
            />
          </section>

          {/* Bad Example - Hard-Coded */}
          <section>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
              }}
            >
              <span style={{ fontSize: '24px' }}>❌</span>
              <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>Hard-Coded (Not Recommended)</h3>
            </div>

            <Box padding="comfortable" background="surface" borderWidth="thin" borderRadius="default">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/*
                  EDUCATIONAL NOTE: These are hard-coded styles.
                  ❌ Problems:
                  - Fixed color values don't adapt to themes
                  - Breaks in dark mode (poor contrast)
                  - No automatic high-contrast support
                  - Inconsistent with design system
                  - Hard to maintain and update
                  
                  Try switching to dark mode - these will look broken!
                */}
                <button
                  style={{
                    background: PRIMARY.blue.main,
                    color: NEUTRAL.white,
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Hard-Coded Button
                </button>

                <button
                  style={{
                    background: PRIMARY.violet.main,
                    color: NEUTRAL.white,
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Hard-Coded Secondary
                </button>

                <p style={{ color: NEUTRAL.textDark, margin: 0, fontSize: '14px' }}>
                  Hard-coded text (breaks in dark mode)
                </p>
                <p style={{ color: PRIMARY.green.main, margin: 0, fontSize: '14px' }}>
                  Hard-coded green (inconsistent shade)
                </p>
              </div>
            </Box>

            <CodeBlock
              code={`{/* ❌ BAD: Hard-coded values */}
<button style={{
  background: '#3b82f6',  // Fixed color
  color: '#ffffff',       // Always white
  border: 'none',
  padding: '10px 20px',
  borderRadius: '8px'
}}>
  Hard-Coded Button
</button>

<p style={{ color: '#111827' }}>
  Hard-coded text
</p>

{/* Problems:
   - Breaks in dark mode
   - No theme support
   - Inconsistent design
   - Hard to maintain */}`}
              language="jsx"
              title="Hard-Coded Code"
            />
          </section>
        </div>
      </StoryContainer>
    );
  },
};

/**
 * ## Why Tokens Matter
 *
 * Interactive demonstration showing how tokens automatically adapt to different theme modes.
 *
 * ### Test it yourself:
 * 1. Look at the components below (all token-based)
 * 2. Switch between Light, Dark, and High-Contrast modes using the theme toolbar
 * 3. Notice how everything adapts automatically!
 *
 * ### What happens:
 * - Colors adjust for optimal contrast
 * - Backgrounds and surfaces maintain hierarchy
 * - Text remains readable
 * - Interactive states work correctly
 * - Accessibility standards maintained
 */
export const WhyTokensMatter: Story = {
  render: () => {
    return (
      <StoryContainer title="Why Tokens Matter - Theme Adaptation Demo">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Instructions */}
          <Box padding="comfortable" background="info" borderRadius="default">
            <Text variant="body" weight="semibold" style={{ marginBottom: '8px', display: 'block' }}>
              👉 Try changing the theme mode in the toolbar above!
            </Text>
            <Text variant="body-small">
              Switch between Light, Dark, and High-Contrast modes to see how these token-based components automatically
              adapt. No extra code needed!
            </Text>
          </Box>

          {/* Component Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {/* Card 1: Buttons */}
            <Box
              padding="comfortable"
              background="surface"
              borderWidth="thin"
              borderColor="default"
              borderRadius="default"
            >
              <Text variant="h4" weight="semibold" style={{ marginBottom: '16px', display: 'block' }}>
                Buttons
              </Text>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Button variant="primary" size="sm">
                  Primary Action
                </Button>
                <Button variant="secondary" size="sm">
                  Secondary Action
                </Button>
                <Button variant="danger" size="sm">
                  Destructive Action
                </Button>
              </div>
            </Box>

            {/* Card 2: Text Colors */}
            <Box
              padding="comfortable"
              background="surface"
              borderWidth="thin"
              borderColor="default"
              borderRadius="default"
            >
              <Text variant="h4" weight="semibold" style={{ marginBottom: '16px', display: 'block' }}>
                Text Colors
              </Text>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Text variant="body" color="primary">
                  Primary text
                </Text>
                <Text variant="body" color="secondary">
                  Secondary text
                </Text>
                <Text variant="body" color="tertiary">
                  Tertiary text
                </Text>
                <Text variant="body" color="success">
                  Success message
                </Text>
                <Text variant="body" color="error">
                  Error message
                </Text>
              </div>
            </Box>

            {/* Card 3: Backgrounds */}
            <Box
              padding="comfortable"
              background="surface"
              borderWidth="thin"
              borderColor="default"
              borderRadius="default"
            >
              <Text variant="h4" weight="semibold" style={{ marginBottom: '16px', display: 'block' }}>
                Backgrounds
              </Text>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Box padding="compact" background="success" borderRadius="small">
                  <Text variant="body-small">Success background</Text>
                </Box>
                <Box padding="compact" background="error" borderRadius="small">
                  <Text variant="body-small">Error background</Text>
                </Box>
                <Box padding="compact" background="warning" borderRadius="small">
                  <Text variant="body-small">Warning background</Text>
                </Box>
                <Box padding="compact" background="info" borderRadius="small">
                  <Text variant="body-small">Info background</Text>
                </Box>
              </div>
            </Box>
          </div>

          {/* Explanation */}
          <Box padding="comfortable" background="surface" borderWidth="thin" borderRadius="default">
            <Text variant="h4" weight="semibold" style={{ marginBottom: '12px', display: 'block' }}>
              What Just Happened? 🎨
            </Text>
            <Text variant="body" style={{ marginBottom: '12px', display: 'block' }}>
              All components above use design tokens. When you switch themes, the token values change automatically:
            </Text>
            <ul style={{ margin: 0, paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}>
                <Text variant="body">
                  <strong>Light Mode:</strong> Uses light backgrounds and dark text
                </Text>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Text variant="body">
                  <strong>Dark Mode:</strong> Inverts to dark backgrounds and light text
                </Text>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Text variant="body">
                  <strong>High-Contrast:</strong> Increases contrast ratios for accessibility
                </Text>
              </li>
            </ul>
            <Text variant="body" style={{ marginTop: '12px', display: 'block' }}>
              With hard-coded colors, you'd need to manually handle each theme variant. With tokens, it's automatic! 🚀
            </Text>
          </Box>
        </div>
      </StoryContainer>
    );
  },
};

/**
 * ## Common Patterns
 *
 * Learn the most common token usage patterns and best practices.
 *
 * ### Pattern Hierarchy:
 * 1. **Use Component Tokens** - First choice for components (button-primary-background)
 * 2. **Use Semantic Tokens** - For general UI elements (background-surface, text-primary)
 * 3. **Use Primitive Tokens** - Rarely, only for custom/advanced use cases
 *
 * ### Best Practices:
 * - ✅ Always prefer semantic over primitive tokens
 * - ✅ Use component tokens when available
 * - ✅ Follow naming conventions
 * - ✅ Test in all theme modes
 * - ❌ Avoid hard-coded color values
 */
export const CommonPatterns: Story = {
  render: () => {
    return (
      <StoryContainer title="Common Token Patterns">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {/* Pattern 1: Component Tokens */}
          <section>
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 8px 0' }}>
                1. Component Tokens (First Choice)
              </h3>
              <Text variant="body" color="secondary">
                Use built-in components with props. They automatically use the correct component tokens.
              </Text>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <Button variant="primary">Component Token</Button>
              <Button variant="secondary">Component Token</Button>
              <Button variant="success">Component Token</Button>
            </div>

            <CodeBlock
              code={`{/* ✅ BEST: Use component props */}
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>

{/* Internally uses component tokens: */}
background: var(--lufa-component-button-primary-background);
color: var(--lufa-component-button-primary-text);`}
              language="jsx"
              title="Component Tokens Pattern"
            />
          </section>

          {/* Pattern 2: Semantic Tokens */}
          <section>
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 8px 0' }}>
                2. Semantic Tokens (Second Choice)
              </h3>
              <Text variant="body" color="secondary">
                For custom layouts and general UI elements, use semantic tokens for backgrounds, text, and borders.
              </Text>
            </div>

            <Box padding="comfortable" background="surface" borderWidth="thin" borderRadius="default">
              <Text variant="h4" color="primary" style={{ marginBottom: '8px', display: 'block' }}>
                Card with Semantic Tokens
              </Text>
              <Text variant="body" color="secondary">
                This card uses semantic tokens for background, border, and text colors.
              </Text>
            </Box>

            <CodeBlock
              code={`{/* ✅ GOOD: Use semantic props in primitives */}
<Box 
  background="surface"
  borderWidth="thin"
  borderColor="default"
>
  <Text color="primary">Heading</Text>
  <Text color="secondary">Body text</Text>
</Box>

{/* Or use CSS variables for custom elements: */}
<div style={{
  background: 'var(--lufa-semantic-ui-background-surface)',
  color: 'var(--lufa-semantic-ui-text-primary)',
  borderColor: 'var(--lufa-semantic-ui-border-default)'
}} />`}
              language="jsx"
              title="Semantic Tokens Pattern"
            />
          </section>

          {/* Pattern 3: Primitive Tokens */}
          <section>
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 8px 0' }}>
                3. Primitive Tokens (Advanced/Rare)
              </h3>
              <Text variant="body" color="secondary">
                Only use primitive tokens for advanced customization or when semantic tokens don't fit your use case.
              </Text>
            </div>

            <div
              style={{
                padding: '16px',
                background: 'var(--lufa-primitive-color-blue-50)',
                border: '2px solid var(--lufa-primitive-color-blue-500)',
                borderRadius: '8px',
              }}
            >
              <Text variant="body" style={{ color: 'var(--lufa-primitive-color-blue-900)' }}>
                Custom element using primitive tokens (advanced use case)
              </Text>
            </div>

            <CodeBlock
              code={`{/* ⚠️ ADVANCED: Use primitive tokens sparingly */}
<div style={{
  background: 'var(--lufa-primitive-color-blue-50)',
  border: '2px solid var(--lufa-primitive-color-blue-500)',
  color: 'var(--lufa-primitive-color-blue-900)'
}}>
  Custom styling
</div>

{/* Warning: Primitive tokens don't automatically 
   adapt to themes! Use with caution. */}`}
              language="jsx"
              title="Primitive Tokens Pattern (Advanced)"
            />
          </section>
        </div>
      </StoryContainer>
    );
  },
};

/**
 * ## When Hard-Coded Is OK
 *
 * There are legitimate cases where hard-coded values are acceptable.
 *
 * ### Acceptable Use Cases:
 * - ✅ **Demos and Examples** - Temporary code for demonstrations
 * - ✅ **Prototypes** - Quick mockups and proof-of-concepts
 * - ✅ **One-Off Illustrations** - Marketing graphics, landing pages
 * - ✅ **External Integrations** - Third-party embeds with fixed styling
 * - ✅ **Brand-Specific Graphics** - Logos, hero images with exact colors
 *
 * ### Rule of Thumb:
 * If it's **production UI** or **reusable component** → Use tokens
 * If it's **temporary demo** or **one-off graphic** → Hard-coded is OK
 */
export const WhenHardCodedIsOK: Story = {
  render: () => {
    return (
      <StoryContainer title="When Hard-Coded Values Are Acceptable">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Acceptable Cases */}
          <section>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>✅ Acceptable Use Cases</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Example 1: Demo/Prototype */}
              <Box padding="comfortable" background="surface" borderWidth="thin" borderRadius="default">
                <Text variant="h5" weight="semibold" style={{ marginBottom: '8px', display: 'block' }}>
                  1. Temporary Demos & Prototypes
                </Text>
                <Text variant="body" color="secondary" style={{ marginBottom: '12px', display: 'block' }}>
                  Quick prototypes or temporary demonstrations that won't ship to production.
                </Text>
                <CodeBlock
                  code={`{/* OK for quick prototypes */}
<div style={{ background: 'var(--lufa-primitive-color-gray-100)' }}>
  Temporary demo content
</div>`}
                  language="jsx"
                />
              </Box>

              {/* Example 2: Marketing Graphics */}
              <Box padding="comfortable" background="surface" borderWidth="thin" borderRadius="default">
                <Text variant="h5" weight="semibold" style={{ marginBottom: '8px', display: 'block' }}>
                  2. Brand-Specific Graphics
                </Text>
                <Text variant="body" color="secondary" style={{ marginBottom: '12px', display: 'block' }}>
                  Hero sections, landing pages, or marketing materials with exact brand colors.
                </Text>
                <CodeBlock
                  code={`{/* OK for brand-specific designs */}
<div style={{
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: '#ffffff'
}}>
  Hero Section with Brand Gradient
</div>`}
                  language="jsx"
                />
              </Box>

              {/* Example 3: Data Visualizations */}
              <Box padding="comfortable" background="surface" borderWidth="thin" borderRadius="default">
                <Text variant="h5" weight="semibold" style={{ marginBottom: '8px', display: 'block' }}>
                  3. Data Visualizations & Charts
                </Text>
                <Text variant="body" color="secondary" style={{ marginBottom: '12px', display: 'block' }}>
                  Chart libraries and data visualizations often need specific color scales.
                </Text>
                <CodeBlock
                  code={`{/* OK for chart-specific colors */}
const chartColors = [
  '#3b82f6', '#10b981', '#f59e0b', 
  '#ef4444', '#8b5cf6', '#ec4899'
];

<BarChart data={data} colors={chartColors} />`}
                  language="jsx"
                />
              </Box>
            </div>
          </section>

          {/* Not Acceptable */}
          <section>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>❌ Not Acceptable Use Cases</h3>

            <Box padding="comfortable" background="error" borderRadius="default">
              <Text variant="body" style={{ marginBottom: '12px', display: 'block' }}>
                <strong>Never use hard-coded values for:</strong>
              </Text>
              <ul style={{ margin: 0, paddingLeft: '24px' }}>
                <li style={{ marginBottom: '8px' }}>
                  <Text variant="body">Production UI components</Text>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <Text variant="body">Reusable component library code</Text>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <Text variant="body">Application UI (buttons, forms, navigation)</Text>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <Text variant="body">Text content (always use semantic color tokens)</Text>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <Text variant="body">Backgrounds and surfaces</Text>
                </li>
              </ul>
            </Box>
          </section>

          {/* Guidelines */}
          <section>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>📋 Decision Guidelines</h3>

            <Box padding="comfortable" background="surface" borderWidth="thin" borderRadius="default">
              <div
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}
              >
                <div>
                  <Text variant="label" transform="uppercase" weight="semibold" color="success">
                    Use Tokens When:
                  </Text>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    <li>
                      <Text variant="body-small">Building production features</Text>
                    </li>
                    <li>
                      <Text variant="body-small">Creating reusable components</Text>
                    </li>
                    <li>
                      <Text variant="body-small">Styling application UI</Text>
                    </li>
                    <li>
                      <Text variant="body-small">Need theme support</Text>
                    </li>
                  </ul>
                </div>

                <div>
                  <Text variant="label" transform="uppercase" weight="semibold" color="warning">
                    Hard-Coded OK When:
                  </Text>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    <li>
                      <Text variant="body-small">Quick prototyping</Text>
                    </li>
                    <li>
                      <Text variant="body-small">Marketing/brand graphics</Text>
                    </li>
                    <li>
                      <Text variant="body-small">One-off illustrations</Text>
                    </li>
                    <li>
                      <Text variant="body-small">External integrations</Text>
                    </li>
                  </ul>
                </div>
              </div>
            </Box>
          </section>
        </div>
      </StoryContainer>
    );
  },
};
