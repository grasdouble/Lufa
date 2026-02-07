import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Bleed, Container, Stack } from '@grasdouble/lufa_design-system';

import { CodeBlock, PropCard, StoryContainer } from '../../components/helpers';
import { STORY_COLORS } from '../../constants/storyColors';

const NEUTRAL = STORY_COLORS.neutral;

/**
 * Bleed - Layout Primitive for Breaking Container Constraints
 *
 * A specialized layout component that allows content to "bleed" beyond its parent
 * container's boundaries. Essential for content-focused layouts and marketing pages.
 *
 * ## Features
 * - ✅ Inline bleed (horizontal): numeric spacing units or "full" for 100vw
 * - ✅ Block bleed (vertical): numeric spacing units
 * - ✅ Polymorphic `as` prop for semantic HTML
 * - ✅ CSS-based implementation (no JavaScript calculations)
 *
 * ## When to Use
 *
 * | Use Case            | Layout Pattern                 | Bleed Necessity | Example                                           |
 * | ------------------- | ------------------------------ | --------------- | ------------------------------------------------- |
 * | **Content-focused** | Narrow containers (65ch prose) | 🔴 **HIGH**     | Article with full-width hero images               |
 * | **Marketing**       | Constrained sections + accents | 🟠 **MEDIUM**   | Landing page with alternating full-width sections |
 * | **App-focused**     | Full-width layouts             | 🟢 **LOW**      | Dashboard with naturally wide data tables         |
 */
const meta = {
  title: '4. Foundation/Bleed',
  component: Bleed,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    // Polymorphic
    as: {
      control: 'select',
      options: ['div', 'section', 'article', 'figure'],
      description: 'HTML element to render',
      table: {
        category: 'Polymorphic',
        type: { summary: 'ElementType' },
        defaultValue: { summary: 'div' },
      },
    },

    // Layout
    inline: {
      control: 'select',
      options: [0, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 'full'],
      description: 'Horizontal bleed (inline axis). Use numeric values for negative margin, or "full" for 100vw',
      table: {
        category: 'Layout',
        type: { summary: 'SpacingValue | "full"' },
      },
    },
    block: {
      control: 'select',
      options: [undefined, 0, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96],
      description: 'Vertical bleed (block axis). Uses negative margin',
      table: {
        category: 'Layout',
        type: { summary: 'SpacingValue | undefined' },
        defaultValue: { summary: 'undefined' },
      },
    },

    // Standard
    children: {
      control: 'text',
      table: { category: 'Content', type: { summary: 'ReactNode' } },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: { category: 'Styling', type: { summary: 'string' } },
    },
  },
} satisfies Meta<typeof Bleed>;

export default meta;
type Story = StoryObj<typeof Bleed>;

// ==========================================
// PLAYGROUND
// ==========================================

export const Playground: Story = {
  args: {
    inline: 16,
    block: undefined,
    children: 'Bleeding content',
  },
  render: (args) => (
    <StoryContainer>
      <Container
        size="md"
        style={{
          backgroundColor: NEUTRAL.backgroundLight,
          padding: '24px',
          border: `2px dashed ${STORY_COLORS.primary.blue.main}`,
        }}
      >
        <div style={{ marginBottom: '16px', color: NEUTRAL.textSecondary }}>Container boundary (constrained)</div>
        <Bleed {...args}>
          <div
            style={{
              backgroundColor: STORY_COLORS.primary.blue.light,
              padding: '16px',
              border: `2px solid ${STORY_COLORS.primary.blue.main}`,
            }}
          >
            {args.children}
          </div>
        </Bleed>
      </Container>
    </StoryContainer>
  ),
};

// ==========================================
// PROP: INLINE
// ==========================================

export const PropInline: Story = {
  name: 'Prop: inline',
  render: () => {
    const [hoveredVariant, setHoveredVariant] = React.useState<'numeric' | 'full'>('numeric');
    const numericValues = [8, 16, 32, 48] as const;

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {/* Numeric values */}
          <div onMouseEnter={() => setHoveredVariant('numeric')}>
            <PropCard label="Numeric Values (Spacing Scale)" highlight={hoveredVariant === 'numeric'}>
              <Stack spacing="comfortable">
                {numericValues.map((value) => (
                  <Container
                    key={value}
                    size="md"
                    style={{
                      backgroundColor: NEUTRAL.backgroundLight,
                      padding: '16px',
                      border: '1px dashed #ccc',
                    }}
                  >
                    <p style={{ fontSize: '12px', marginBottom: '8px', color: NEUTRAL.textSecondary }}>
                      inline={value}
                    </p>
                    <Bleed inline={value}>
                      <div
                        style={{
                          backgroundColor: STORY_COLORS.primary.blue.light,
                          padding: '12px',
                          textAlign: 'center',
                          fontSize: '14px',
                        }}
                      >
                        Bleeds {value}px on each side
                      </div>
                    </Bleed>
                  </Container>
                ))}
              </Stack>
            </PropCard>
          </div>

          {/* Full-width */}
          <div onMouseEnter={() => setHoveredVariant('full')}>
            <PropCard label='Full Width (inline="full")' highlight={hoveredVariant === 'full'}>
              <Container
                size="md"
                style={{
                  backgroundColor: NEUTRAL.backgroundLight,
                  padding: '16px',
                  border: '1px dashed #ccc',
                }}
              >
                <p style={{ fontSize: '12px', marginBottom: '8px', color: NEUTRAL.textSecondary }}>inline="full"</p>
                <Bleed inline="full">
                  <div
                    style={{
                      backgroundColor: STORY_COLORS.primary.green.main,
                      padding: '24px',
                      textAlign: 'center',
                      color: 'white',
                      fontSize: '16px',
                    }}
                  >
                    Full viewport width (100vw technique)
                  </div>
                </Bleed>
              </Container>
            </PropCard>
          </div>

          <CodeBlock
            code={
              hoveredVariant === 'numeric'
                ? `<Container size="md">
  <Bleed inline={16}>
    <Box>Bleeds 16px on each side</Box>
  </Bleed>
</Container>`
                : `<Container size="md">
  <Bleed inline="full">
    <Box>Full viewport width</Box>
  </Bleed>
</Container>`
            }
            language="jsx"
            title="JSX"
          />
        </div>
      </StoryContainer>
    );
  },
};

// ==========================================
// PROP: BLOCK
// ==========================================

export const PropBlock: Story = {
  name: 'Prop: block',
  render: () => {
    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <PropCard label="Block Bleed (Vertical)">
            <div style={{ backgroundColor: NEUTRAL.backgroundLight, padding: '24px' }}>
              <div style={{ backgroundColor: '#ddd', padding: '16px', marginBottom: '16px' }}>Content above</div>

              <Bleed inline={16} block={8}>
                <div
                  style={{
                    backgroundColor: STORY_COLORS.primary.orange.light,
                    padding: '16px',
                    textAlign: 'center',
                  }}
                >
                  inline=16, block=8 (bleeds both horizontally and vertically)
                </div>
              </Bleed>

              <div style={{ backgroundColor: '#ddd', padding: '16px', marginTop: '16px' }}>Content below</div>
            </div>
          </PropCard>

          <CodeBlock
            code={`<Bleed inline={16} block={8}>
  <Box>Bleeds horizontally and vertically</Box>
</Bleed>`}
            language="jsx"
            title="JSX"
          />
        </div>
      </StoryContainer>
    );
  },
};

// ==========================================
// USE CASE: CONTENT-FOCUSED
// ==========================================

export const UseCaseContent: Story = {
  name: 'Use Case: Content-Focused (Blog/Documentation)',
  render: () => {
    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <PropCard label="Before: Without Bleed">
            <Container size="md" style={{ backgroundColor: 'white', padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Article Title</h2>
              <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
                This is an article with narrow reading width. Without Bleed, all content including images is constrained
                to the same width.
              </p>
              <div
                style={{
                  backgroundColor: STORY_COLORS.primary.blue.main,
                  height: '150px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  marginBottom: '16px',
                }}
              >
                Image constrained to container width
              </div>
              <p style={{ lineHeight: '1.6' }}>Content continues...</p>
            </Container>
          </PropCard>

          <PropCard label="After: With Bleed">
            <Container size="md" style={{ backgroundColor: 'white', padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Article Title</h2>
              <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
                This article uses Bleed to break out of the narrow reading width for hero images and featured content,
                creating visual interest while maintaining optimal text width.
              </p>

              {/* Full-width hero image */}
              <Bleed inline="full">
                <div
                  style={{
                    backgroundColor: STORY_COLORS.primary.blue.main,
                    height: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '18px',
                  }}
                >
                  Full-width hero image (inline="full")
                </div>
              </Bleed>

              <p style={{ marginTop: '16px', marginBottom: '16px', lineHeight: '1.6' }}>
                The text returns to optimal reading width after the image. This creates a nice rhythm.
              </p>

              {/* Callout with partial bleed */}
              <Bleed inline={24}>
                <div
                  style={{
                    backgroundColor: '#fff3cd',
                    border: '2px solid #ffc107',
                    padding: '16px',
                    borderRadius: '4px',
                  }}
                >
                  <strong>💡 Tip:</strong> Use partial bleed for callouts to make them stand out slightly.
                </div>
              </Bleed>

              <p style={{ marginTop: '16px', lineHeight: '1.6' }}>More content continues...</p>
            </Container>
          </PropCard>

          <CodeBlock
            code={`<Container size="md">
  <h2>Article Title</h2>
  <Text>Article introduction...</Text>
  
  {/* Hero image breaks out to full viewport width */}
  <Bleed inline="full">
    <img src="hero.jpg" alt="Hero" />
  </Bleed>
  
  <Text>Article content continues...</Text>
  
  {/* Callout box bleeds beyond prose width */}
  <Bleed inline={24}>
    <Callout>Important note</Callout>
  </Bleed>
</Container>`}
            language="jsx"
            title="JSX"
          />
        </div>
      </StoryContainer>
    );
  },
};

// ==========================================
// USE CASE: MARKETING
// ==========================================

export const UseCaseMarketing: Story = {
  name: 'Use Case: Marketing (Landing Pages)',
  render: () => {
    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <PropCard label="Marketing Page with Alternating Sections">
            <Container size="lg" style={{ padding: '0' }}>
              {/* Hero Section */}
              <div style={{ padding: '32px', backgroundColor: 'white' }}>
                <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>Product Title</h1>
                <p style={{ fontSize: '18px', color: NEUTRAL.textSecondary }}>
                  Transform your workflow with our amazing product
                </p>
              </div>

              {/* Full-width accent section */}
              <Bleed inline="full">
                <div style={{ backgroundColor: STORY_COLORS.primary.blue.main, padding: '48px' }}>
                  <Container size="lg">
                    <div style={{ textAlign: 'center', color: 'white' }}>
                      <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px' }}>Special Offer</h2>
                      <p style={{ fontSize: '16px', marginBottom: '24px' }}>Get started today with 50% off</p>
                      <button
                        style={{
                          backgroundColor: 'white',
                          color: STORY_COLORS.primary.blue.main,
                          padding: '12px 24px',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                        }}
                      >
                        Get Started
                      </button>
                    </div>
                  </Container>
                </div>
              </Bleed>

              {/* Features Section */}
              <div style={{ padding: '32px', backgroundColor: 'white' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Key Features</h2>
                <Stack spacing="compact">
                  <div>✨ Feature 1: Amazing capability</div>
                  <div>🚀 Feature 2: Lightning fast</div>
                  <div>🔒 Feature 3: Secure and reliable</div>
                </Stack>
              </div>

              {/* Another full-width section */}
              <Bleed inline="full">
                <div style={{ backgroundColor: NEUTRAL.backgroundLight, padding: '48px' }}>
                  <Container size="lg">
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
                      What Our Customers Say
                    </h2>
                    <div style={{ textAlign: 'center', fontStyle: 'italic' }}>
                      "This product changed how we work. Highly recommended!"
                    </div>
                  </Container>
                </div>
              </Bleed>
            </Container>
          </PropCard>

          <CodeBlock
            code={`<Container size="lg">
  <Hero>
    <Heading>Product Title</Heading>
    <Text>Description</Text>
  </Hero>
  
  {/* Full-width accent section */}
  <Bleed inline="full">
    <Box bg="brand.500" py={16}>
      <Container size="lg">
        <Stack spacing={4} align="center">
          <Heading color="white">Special Offer</Heading>
          <Button size="lg">Get Started</Button>
        </Stack>
      </Container>
    </Box>
  </Bleed>
  
  <Features />
  
  {/* Another full-width section */}
  <Bleed inline="full">
    <Box bg="gray.100" py={16}>
      <Container size="lg">
        <Testimonials />
      </Container>
    </Box>
  </Bleed>
</Container>`}
            language="jsx"
            title="JSX"
          />
        </div>
      </StoryContainer>
    );
  },
};
