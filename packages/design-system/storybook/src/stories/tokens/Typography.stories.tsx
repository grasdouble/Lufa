import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryContainer } from '../../components/helpers';
import { STORY_COLORS } from '../../constants/storyColors';

/**
 * Typography - Design System Typography Tokens
 *
 * Complete visualization of typography tokens including letter-spacing and fluid font-sizes.
 *
 * ## Features
 * - **Letter Spacing** - 5 tokens for optimal readability at different scales
 * - **Fluid Typography** - Responsive font-sizes using CSS clamp()
 * - **Font Size Scale** - Complete scale from xs (12px) to 5xl (48px)
 *
 * ## Phase 2D
 * Added in Phase 2D Sprint 1-3 (Typography Tokens Foundation)
 */
const meta = {
  title: '3. Tokens/Typography',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const PRIMARY = STORY_COLORS.primary;

// Typography token display component
const TypographyToken = ({
  token,
  name,
  value,
  description,
  example,
  exampleStyle,
}: {
  token: string;
  name: string;
  value: string;
  description?: string;
  example?: string;
  exampleStyle?: React.CSSProperties;
}) => (
  <div style={{ marginBottom: '32px' }}>
    <div style={{ fontSize: '11px', fontFamily: 'monospace', marginBottom: '8px' }}>
      <div style={{ fontWeight: 600, color: STORY_COLORS.themed.text.primary }}>{name}</div>
      <div style={{ color: STORY_COLORS.themed.text.secondary, fontSize: '10px', marginTop: '2px' }}>{token}</div>
      <div style={{ color: STORY_COLORS.themed.text.secondary, fontSize: '10px', marginTop: '2px' }}>
        Value: {value}
      </div>
      {description && (
        <div
          style={{
            color: STORY_COLORS.themed.text.secondary,
            fontSize: '10px',
            marginTop: '4px',
            fontFamily: 'sans-serif',
          }}
        >
          {description}
        </div>
      )}
    </div>
    {example && (
      <div
        style={{
          padding: '16px',
          backgroundColor: STORY_COLORS.themed.background.surface,
          borderRadius: '6px',
          border: `1px solid ${STORY_COLORS.themed.border.default}`,
          ...exampleStyle,
        }}
      >
        {example}
      </div>
    )}
  </div>
);

// Typography section component
const TypographySection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: '48px' }}>
    <h2
      style={{
        fontSize: '24px',
        fontWeight: 700,
        marginBottom: '24px',
        color: STORY_COLORS.themed.text.primary,
        borderBottom: `2px solid ${STORY_COLORS.themed.border.default}`,
        paddingBottom: '12px',
      }}
    >
      {title}
    </h2>
    {children}
  </section>
);

/**
 * ## Letter Spacing Tokens
 *
 * Letter spacing tokens for optimal readability at different scales.
 * Each token is designed for specific font sizes and use cases.
 *
 * ### Guidelines
 * - Use `tighter` or `tight` for large headings (improves readability)
 * - Use `normal` (0) for body text
 * - Use `wide` or `wider` for uppercase text (improves legibility)
 * - Avoid negative letter-spacing on small text (< 16px)
 */
export const LetterSpacing: Story = {
  render: () => (
    <StoryContainer>
      <TypographySection title="Letter Spacing Tokens">
        <TypographyToken
          token="--lufa-primitive-typography-letter-spacing-tighter"
          name="tighter"
          value="-0.04em"
          description="Display text, hero headings (60px+)"
          example="Display Heading"
          exampleStyle={{
            fontSize: '48px',
            fontWeight: 700,
            letterSpacing: 'var(--lufa-primitive-typography-letter-spacing-tighter)',
          }}
        />

        <TypographyToken
          token="--lufa-primitive-typography-letter-spacing-tight"
          name="tight"
          value="-0.02em"
          description="Large headings (H1-H3), 3xl-5xl sizes"
          example="Large Heading Example"
          exampleStyle={{
            fontSize: '36px',
            fontWeight: 700,
            letterSpacing: 'var(--lufa-primitive-typography-letter-spacing-tight)',
          }}
        />

        <TypographyToken
          token="--lufa-primitive-typography-letter-spacing-normal"
          name="normal"
          value="0"
          description="Body text, standard content"
          example="This is normal body text with standard letter spacing. Perfect for paragraphs and general content."
          exampleStyle={{
            fontSize: '16px',
            letterSpacing: 'var(--lufa-primitive-typography-letter-spacing-normal)',
            lineHeight: '1.6',
          }}
        />

        <TypographyToken
          token="--lufa-primitive-typography-letter-spacing-wide"
          name="wide"
          value="0.05em"
          description="Small text, uppercase labels (xs-sm)"
          example="UPPERCASE LABEL"
          exampleStyle={{
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: 'var(--lufa-primitive-typography-letter-spacing-wide)',
            textTransform: 'uppercase',
          }}
        />

        <TypographyToken
          token="--lufa-primitive-typography-letter-spacing-wider"
          name="wider"
          value="0.1em"
          description="All-caps headings, button text"
          example="ALL CAPS HEADING"
          exampleStyle={{
            fontSize: '16px',
            fontWeight: 700,
            letterSpacing: 'var(--lufa-primitive-typography-letter-spacing-wider)',
            textTransform: 'uppercase',
          }}
        />
      </TypographySection>
    </StoryContainer>
  ),
};

/**
 * ## Font Sizes
 *
 * Complete font size scale from xs (12px) to 5xl (48px).
 * Sizes 2xl-5xl use fluid scaling with CSS clamp() for responsive typography.
 *
 * ### Static Sizes (xs-xl)
 * - Fixed pixel values that don't scale with viewport
 * - Used for UI elements that should maintain consistent size
 *
 * ### Fluid Sizes (2xl-5xl)
 * - Use CSS clamp() for responsive scaling
 * - Automatically adjust between minimum and maximum values
 * - Scale smoothly based on viewport width (320px-1280px)
 */
export const FontSizes: Story = {
  render: () => (
    <StoryContainer>
      <TypographySection title="Font Size Scale">
        <div style={{ marginBottom: '48px' }}>
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 600,
              marginBottom: '24px',
              color: STORY_COLORS.themed.text.primary,
            }}
          >
            Static Font Sizes
          </h3>

          <TypographyToken
            token="--lufa-primitive-typography-font-size-xs"
            name="xs"
            value="12px"
            description="Extra small - Secondary labels, notes, timestamps"
            example="Extra small text (12px)"
            exampleStyle={{
              fontSize: 'var(--lufa-primitive-typography-font-size-xs)',
            }}
          />

          <TypographyToken
            token="--lufa-primitive-typography-font-size-sm"
            name="sm"
            value="14px"
            description="Small - Secondary text, short descriptions"
            example="Small text (14px)"
            exampleStyle={{
              fontSize: 'var(--lufa-primitive-typography-font-size-sm)',
            }}
          />

          <TypographyToken
            token="--lufa-primitive-typography-font-size-base"
            name="base"
            value="16px"
            description="Base - Body text, standard paragraphs"
            example="Base text (16px) - Default size for body content"
            exampleStyle={{
              fontSize: 'var(--lufa-primitive-typography-font-size-base)',
            }}
          />

          <TypographyToken
            token="--lufa-primitive-typography-font-size-lg"
            name="lg"
            value="18px"
            description="Large - Emphasized text, lead paragraphs"
            example="Large text (18px)"
            exampleStyle={{
              fontSize: 'var(--lufa-primitive-typography-font-size-lg)',
            }}
          />

          <TypographyToken
            token="--lufa-primitive-typography-font-size-xl"
            name="xl"
            value="20px"
            description="Extra large - Subtitles, level 5-6 headings"
            example="Extra large text (20px)"
            exampleStyle={{
              fontSize: 'var(--lufa-primitive-typography-font-size-xl)',
            }}
          />
        </div>

        <div>
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 600,
              marginBottom: '24px',
              color: STORY_COLORS.themed.text.primary,
            }}
          >
            Fluid Font Sizes
            <span
              style={{
                fontSize: '12px',
                fontWeight: 400,
                color: STORY_COLORS.themed.text.secondary,
                marginLeft: '8px',
              }}
            >
              (Responsive with CSS clamp)
            </span>
          </h3>

          <TypographyToken
            token="--lufa-primitive-typography-font-size-2xl"
            name="2xl"
            value="clamp(1.25rem, 1rem + 1vw, 1.5rem)"
            description="Level 4 headings - Scales from 20px to 24px"
            example="2XL Heading (20px-24px)"
            exampleStyle={{
              fontSize: 'var(--lufa-primitive-typography-font-size-2xl)',
              fontWeight: 600,
            }}
          />

          <TypographyToken
            token="--lufa-primitive-typography-font-size-3xl"
            name="3xl"
            value="clamp(1.5rem, 1.25rem + 1vw, 1.875rem)"
            description="Level 3 headings - Scales from 24px to 30px"
            example="3XL Heading (24px-30px)"
            exampleStyle={{
              fontSize: 'var(--lufa-primitive-typography-font-size-3xl)',
              fontWeight: 600,
            }}
          />

          <TypographyToken
            token="--lufa-primitive-typography-font-size-4xl"
            name="4xl"
            value="clamp(1.75rem, 1.5rem + 1.25vw, 2.25rem)"
            description="Level 2 headings - Scales from 28px to 36px"
            example="4XL Heading (28px-36px)"
            exampleStyle={{
              fontSize: 'var(--lufa-primitive-typography-font-size-4xl)',
              fontWeight: 700,
            }}
          />

          <TypographyToken
            token="--lufa-primitive-typography-font-size-5xl"
            name="5xl"
            value="clamp(2rem, 1.5rem + 2vw, 3rem)"
            description="Level 1 headings, hero titles - Scales from 32px to 48px"
            example="5XL Heading (32px-48px)"
            exampleStyle={{
              fontSize: 'var(--lufa-primitive-typography-font-size-5xl)',
              fontWeight: 700,
            }}
          />
        </div>
      </TypographySection>
    </StoryContainer>
  ),
};

/**
 * ## Fluid Typography Demo
 *
 * Interactive demonstration of fluid typography scaling.
 * Resize your browser window to see how the text scales smoothly.
 *
 * Fluid typography uses CSS clamp() to create responsive font sizes that:
 * - Start at a minimum size on mobile (320px viewport)
 * - Scale proportionally with viewport width
 * - Cap at a maximum size on desktop (1280px viewport)
 */
export const FluidTypography: Story = {
  render: () => {
    const [width, setWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1280);

    React.useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
      <StoryContainer>
        <TypographySection title="Fluid Typography - Resize Browser to See Scaling">
          <div
            style={{
              padding: '16px',
              backgroundColor: STORY_COLORS.themed.background.info,
              borderRadius: '6px',
              marginBottom: '32px',
              border: `2px solid ${PRIMARY.blue.main}`,
            }}
          >
            <div style={{ fontSize: '14px', fontWeight: 600, color: PRIMARY.blue.main }}>
              📏 Current viewport width: {width}px
            </div>
            <div style={{ fontSize: '12px', color: PRIMARY.blue.main, marginTop: '4px' }}>
              Fluid range: 320px - 1280px
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div
              style={{
                padding: '24px',
                backgroundColor: STORY_COLORS.themed.background.surface,
                borderRadius: '6px',
                border: `1px solid ${STORY_COLORS.themed.border.default}`,
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  color: STORY_COLORS.themed.text.secondary,
                  marginBottom: '8px',
                  fontFamily: 'monospace',
                }}
              >
                2xl (20px-24px)
              </div>
              <div
                style={{
                  fontSize: 'var(--lufa-primitive-typography-font-size-2xl)',
                  fontWeight: 600,
                }}
              >
                Responsive Typography Scaling
              </div>
            </div>

            <div
              style={{
                padding: '24px',
                backgroundColor: STORY_COLORS.themed.background.surface,
                borderRadius: '6px',
                border: `1px solid ${STORY_COLORS.themed.border.default}`,
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  color: STORY_COLORS.themed.text.secondary,
                  marginBottom: '8px',
                  fontFamily: 'monospace',
                }}
              >
                3xl (24px-30px)
              </div>
              <div
                style={{
                  fontSize: 'var(--lufa-primitive-typography-font-size-3xl)',
                  fontWeight: 600,
                }}
              >
                Responsive Typography Scaling
              </div>
            </div>

            <div
              style={{
                padding: '24px',
                backgroundColor: STORY_COLORS.themed.background.surface,
                borderRadius: '6px',
                border: `1px solid ${STORY_COLORS.themed.border.default}`,
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  color: STORY_COLORS.themed.text.secondary,
                  marginBottom: '8px',
                  fontFamily: 'monospace',
                }}
              >
                4xl (28px-36px)
              </div>
              <div
                style={{
                  fontSize: 'var(--lufa-primitive-typography-font-size-4xl)',
                  fontWeight: 700,
                }}
              >
                Responsive Typography Scaling
              </div>
            </div>

            <div
              style={{
                padding: '24px',
                backgroundColor: STORY_COLORS.themed.background.surface,
                borderRadius: '6px',
                border: `1px solid ${STORY_COLORS.themed.border.default}`,
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  color: STORY_COLORS.themed.text.secondary,
                  marginBottom: '8px',
                  fontFamily: 'monospace',
                }}
              >
                5xl (32px-48px)
              </div>
              <div
                style={{
                  fontSize: 'var(--lufa-primitive-typography-font-size-5xl)',
                  fontWeight: 700,
                }}
              >
                Responsive Typography Scaling
              </div>
            </div>
          </div>
        </TypographySection>
      </StoryContainer>
    );
  },
};

/**
 * ## Letter Spacing Comparison
 *
 * Side-by-side comparison of all letter-spacing variants.
 * Same text, same size, different spacing - see the impact on readability.
 */
export const LetterSpacingComparison: Story = {
  render: () => (
    <StoryContainer>
      <TypographySection title="Letter Spacing Comparison">
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontSize: '14px', color: STORY_COLORS.themed.text.secondary, lineHeight: '1.6' }}>
            All examples below use the same font size (32px) and weight. The only difference is the letter-spacing
            value. Notice how negative spacing tightens large text, while positive spacing improves legibility of
            uppercase text.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
          }}
        >
          <div
            style={{
              padding: '24px',
              backgroundColor: STORY_COLORS.themed.background.surface,
              borderRadius: '6px',
              border: `1px solid ${STORY_COLORS.themed.border.default}`,
            }}
          >
            <div
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: STORY_COLORS.themed.text.primary,
                marginBottom: '12px',
                textAlign: 'center',
              }}
            >
              tighter (-0.04em)
            </div>
            <div
              style={{
                fontSize: '32px',
                fontWeight: 600,
                letterSpacing: 'var(--lufa-primitive-typography-letter-spacing-tighter)',
                textAlign: 'center',
              }}
            >
              Typography
            </div>
          </div>

          <div
            style={{
              padding: '24px',
              backgroundColor: STORY_COLORS.themed.background.surface,
              borderRadius: '6px',
              border: `1px solid ${STORY_COLORS.themed.border.default}`,
            }}
          >
            <div
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: STORY_COLORS.themed.text.primary,
                marginBottom: '12px',
                textAlign: 'center',
              }}
            >
              tight (-0.02em)
            </div>
            <div
              style={{
                fontSize: '32px',
                fontWeight: 600,
                letterSpacing: 'var(--lufa-primitive-typography-letter-spacing-tight)',
                textAlign: 'center',
              }}
            >
              Typography
            </div>
          </div>

          <div
            style={{
              padding: '24px',
              backgroundColor: STORY_COLORS.themed.background.surface,
              borderRadius: '6px',
              border: `1px solid ${STORY_COLORS.themed.border.default}`,
            }}
          >
            <div
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: STORY_COLORS.themed.text.primary,
                marginBottom: '12px',
                textAlign: 'center',
              }}
            >
              normal (0)
            </div>
            <div
              style={{
                fontSize: '32px',
                fontWeight: 600,
                letterSpacing: 'var(--lufa-primitive-typography-letter-spacing-normal)',
                textAlign: 'center',
              }}
            >
              Typography
            </div>
          </div>

          <div
            style={{
              padding: '24px',
              backgroundColor: STORY_COLORS.themed.background.surface,
              borderRadius: '6px',
              border: `1px solid ${STORY_COLORS.themed.border.default}`,
            }}
          >
            <div
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: STORY_COLORS.themed.text.primary,
                marginBottom: '12px',
                textAlign: 'center',
              }}
            >
              wide (0.05em)
            </div>
            <div
              style={{
                fontSize: '32px',
                fontWeight: 600,
                letterSpacing: 'var(--lufa-primitive-typography-letter-spacing-wide)',
                textAlign: 'center',
              }}
            >
              Typography
            </div>
          </div>

          <div
            style={{
              padding: '24px',
              backgroundColor: STORY_COLORS.themed.background.surface,
              borderRadius: '6px',
              border: `1px solid ${STORY_COLORS.themed.border.default}`,
            }}
          >
            <div
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: STORY_COLORS.themed.text.primary,
                marginBottom: '12px',
                textAlign: 'center',
              }}
            >
              wider (0.1em)
            </div>
            <div
              style={{
                fontSize: '32px',
                fontWeight: 600,
                letterSpacing: 'var(--lufa-primitive-typography-letter-spacing-wider)',
                textAlign: 'center',
              }}
            >
              Typography
            </div>
          </div>
        </div>

        <div style={{ marginTop: '48px' }}>
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 600,
              marginBottom: '16px',
              color: STORY_COLORS.themed.text.primary,
            }}
          >
            Uppercase Comparison
          </h3>
          <p
            style={{
              fontSize: '14px',
              color: STORY_COLORS.themed.text.secondary,
              marginBottom: '24px',
              lineHeight: '1.6',
            }}
          >
            Uppercase text benefits from wider letter-spacing. Compare how the same text looks with different spacing
            values:
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
            }}
          >
            <div
              style={{
                padding: '24px',
                backgroundColor: STORY_COLORS.themed.background.surface,
                borderRadius: '6px',
                border: `1px solid ${STORY_COLORS.themed.border.default}`,
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: STORY_COLORS.themed.text.primary,
                  marginBottom: '12px',
                  textAlign: 'center',
                }}
              >
                normal (0)
              </div>
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  letterSpacing: 'var(--lufa-primitive-typography-letter-spacing-normal)',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                }}
              >
                Button Text
              </div>
            </div>

            <div
              style={{
                padding: '24px',
                backgroundColor: STORY_COLORS.themed.background.surface,
                borderRadius: '6px',
                border: `1px solid ${STORY_COLORS.themed.border.default}`,
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: STORY_COLORS.themed.text.primary,
                  marginBottom: '12px',
                  textAlign: 'center',
                }}
              >
                wide (0.05em)
              </div>
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  letterSpacing: 'var(--lufa-primitive-typography-letter-spacing-wide)',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                }}
              >
                Button Text
              </div>
            </div>

            <div
              style={{
                padding: '24px',
                backgroundColor: STORY_COLORS.themed.background.surface,
                borderRadius: '6px',
                border: `1px solid ${STORY_COLORS.themed.border.default}`,
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: STORY_COLORS.themed.text.primary,
                  marginBottom: '12px',
                  textAlign: 'center',
                }}
              >
                wider (0.1em) ✓
              </div>
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  letterSpacing: 'var(--lufa-primitive-typography-letter-spacing-wider)',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                }}
              >
                Button Text
              </div>
            </div>
          </div>
        </div>
      </TypographySection>
    </StoryContainer>
  ),
};

/**
 * ## Best Practices
 *
 * Guidelines for using typography tokens effectively.
 * Follow these best practices to ensure optimal readability and visual hierarchy.
 */
export const BestPractices: Story = {
  render: () => (
    <StoryContainer>
      <TypographySection title="Typography Best Practices">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <section>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: PRIMARY.green.main }}>
              ✅ DO
            </h3>
            <ul
              style={{
                fontSize: '14px',
                lineHeight: '1.8',
                color: STORY_COLORS.themed.text.primary,
                paddingLeft: '24px',
              }}
            >
              <li>
                Use{' '}
                <code
                  style={{
                    backgroundColor: STORY_COLORS.themed.background.success,
                    padding: '2px 6px',
                    borderRadius: '3px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                  }}
                >
                  tight
                </code>{' '}
                or{' '}
                <code
                  style={{
                    backgroundColor: STORY_COLORS.themed.background.success,
                    padding: '2px 6px',
                    borderRadius: '3px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                  }}
                >
                  tighter
                </code>{' '}
                for large headings (improves readability)
              </li>
              <li>
                Use{' '}
                <code
                  style={{
                    backgroundColor: STORY_COLORS.themed.background.success,
                    padding: '2px 6px',
                    borderRadius: '3px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                  }}
                >
                  wide
                </code>{' '}
                or{' '}
                <code
                  style={{
                    backgroundColor: STORY_COLORS.themed.background.success,
                    padding: '2px 6px',
                    borderRadius: '3px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                  }}
                >
                  wider
                </code>{' '}
                for uppercase text (improves legibility)
              </li>
              <li>
                Use{' '}
                <code
                  style={{
                    backgroundColor: STORY_COLORS.themed.background.success,
                    padding: '2px 6px',
                    borderRadius: '3px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                  }}
                >
                  normal
                </code>{' '}
                (0) for body text
              </li>
              <li>Combine fluid font-sizes with appropriate letter-spacing</li>
              <li>Use fluid sizes (2xl-5xl) for headings to ensure responsive design</li>
              <li>Test your typography at different viewport sizes</li>
              <li>Maintain consistent spacing throughout your design</li>
              <li>Consider line-height along with letter-spacing for optimal readability</li>
            </ul>
          </section>

          <section>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: PRIMARY.pink.main }}>
              ❌ DON'T
            </h3>
            <ul
              style={{
                fontSize: '14px',
                lineHeight: '1.8',
                color: STORY_COLORS.themed.text.primary,
                paddingLeft: '24px',
              }}
            >
              <li>Use negative letter-spacing on small text (&lt; 16px)</li>
              <li>Use wide letter-spacing on large headings</li>
              <li>Mix static and fluid font-sizes inconsistently</li>
              <li>Override letter-spacing without considering the use case</li>
              <li>
                Use{' '}
                <code
                  style={{
                    backgroundColor: STORY_COLORS.themed.background.error,
                    padding: '2px 6px',
                    borderRadius: '3px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                  }}
                >
                  normal
                </code>{' '}
                spacing for uppercase text
              </li>
              <li>
                Apply{' '}
                <code
                  style={{
                    backgroundColor: STORY_COLORS.themed.background.error,
                    padding: '2px 6px',
                    borderRadius: '3px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                  }}
                >
                  tighter
                </code>{' '}
                to body text or small sizes
              </li>
              <li>Use arbitrary letter-spacing values instead of tokens</li>
              <li>Ignore the recommended font sizes for each letter-spacing token</li>
            </ul>
          </section>
        </div>

        <div
          style={{
            marginTop: '48px',
            padding: '24px',
            backgroundColor: STORY_COLORS.themed.background.warning,
            borderRadius: '6px',
            border: `2px solid ${PRIMARY.orange.main}`,
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: PRIMARY.orange.main }}>
            💡 Pro Tips
          </h3>
          <ul
            style={{
              fontSize: '14px',
              lineHeight: '1.8',
              color: STORY_COLORS.themed.text.primary,
              paddingLeft: '24px',
              marginBottom: 0,
            }}
          >
            <li>
              <strong>Fluid Typography:</strong> Works best for content that spans multiple screen sizes. Use fluid
              sizes (2xl-5xl) for headings and titles.
            </li>
            <li>
              <strong>Letter Spacing & Font Weight:</strong> Heavier font weights often benefit from slightly tighter
              letter-spacing at large sizes.
            </li>
            <li>
              <strong>Uppercase Text:</strong> Always increase letter-spacing for uppercase text. Use{' '}
              <code
                style={{
                  backgroundColor: STORY_COLORS.themed.background.surface,
                  border: `1px solid ${STORY_COLORS.themed.border.default}`,
                  padding: '2px 6px',
                  borderRadius: '3px',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                }}
              >
                wide
              </code>{' '}
              (0.05em) or{' '}
              <code
                style={{
                  backgroundColor: STORY_COLORS.themed.background.surface,
                  border: `1px solid ${STORY_COLORS.themed.border.default}`,
                  padding: '2px 6px',
                  borderRadius: '3px',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                }}
              >
                wider
              </code>{' '}
              (0.1em).
            </li>
            <li>
              <strong>Accessibility:</strong> Proper letter-spacing improves readability for users with dyslexia and
              other reading difficulties.
            </li>
            <li>
              <strong>Visual Hierarchy:</strong> Combine font-size with letter-spacing to create clear visual hierarchy
              without relying solely on size or weight.
            </li>
          </ul>
        </div>

        <div style={{ marginTop: '48px' }}>
          <h3
            style={{
              fontSize: '20px',
              fontWeight: 700,
              marginBottom: '24px',
              color: STORY_COLORS.themed.text.primary,
            }}
          >
            Common Patterns
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div
              style={{
                padding: '24px',
                backgroundColor: STORY_COLORS.themed.background.surface,
                borderRadius: '6px',
                border: `1px solid ${STORY_COLORS.themed.border.default}`,
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: STORY_COLORS.themed.text.secondary,
                  marginBottom: '12px',
                }}
              >
                Hero Heading Pattern
              </div>
              <div
                style={{
                  fontSize: 'var(--lufa-primitive-typography-font-size-5xl)',
                  fontWeight: 700,
                  letterSpacing: 'var(--lufa-primitive-typography-letter-spacing-tight)',
                  marginBottom: '8px',
                }}
              >
                Welcome to Lufa
              </div>
              <code
                style={{
                  fontSize: '10px',
                  color: STORY_COLORS.themed.text.secondary,
                  fontFamily: 'monospace',
                  display: 'block',
                  marginTop: '8px',
                }}
              >
                font-size: 5xl (32px-48px)
                <br />
                letter-spacing: tight (-0.02em)
              </code>
            </div>

            <div
              style={{
                padding: '24px',
                backgroundColor: STORY_COLORS.themed.background.surface,
                borderRadius: '6px',
                border: `1px solid ${STORY_COLORS.themed.border.default}`,
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: STORY_COLORS.themed.text.secondary,
                  marginBottom: '12px',
                }}
              >
                Button Text Pattern
              </div>
              <div
                style={{
                  fontSize: 'var(--lufa-primitive-typography-font-size-sm)',
                  fontWeight: 700,
                  letterSpacing: 'var(--lufa-primitive-typography-letter-spacing-wider)',
                  textTransform: 'uppercase',
                  padding: '12px 24px',
                  backgroundColor: PRIMARY.blue.main,
                  color: STORY_COLORS.themed.background.onPrimary,
                  borderRadius: '4px',
                  display: 'inline-block',
                }}
              >
                Get Started
              </div>
              <code
                style={{
                  fontSize: '10px',
                  color: STORY_COLORS.themed.text.secondary,
                  fontFamily: 'monospace',
                  display: 'block',
                  marginTop: '8px',
                }}
              >
                font-size: sm (14px)
                <br />
                letter-spacing: wider (0.1em)
                <br />
                text-transform: uppercase
              </code>
            </div>

            <div
              style={{
                padding: '24px',
                backgroundColor: STORY_COLORS.themed.background.surface,
                borderRadius: '6px',
                border: `1px solid ${STORY_COLORS.themed.border.default}`,
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: STORY_COLORS.themed.text.secondary,
                  marginBottom: '12px',
                }}
              >
                Body Text Pattern
              </div>
              <div
                style={{
                  fontSize: 'var(--lufa-primitive-typography-font-size-base)',
                  letterSpacing: 'var(--lufa-primitive-typography-letter-spacing-normal)',
                  lineHeight: '1.6',
                }}
              >
                This is standard body text with normal letter spacing. Perfect for paragraphs and general content.
              </div>
              <code
                style={{
                  fontSize: '10px',
                  color: STORY_COLORS.themed.text.secondary,
                  fontFamily: 'monospace',
                  display: 'block',
                  marginTop: '8px',
                }}
              >
                font-size: base (16px)
                <br />
                letter-spacing: normal (0)
                <br />
                line-height: 1.6
              </code>
            </div>

            <div
              style={{
                padding: '24px',
                backgroundColor: STORY_COLORS.themed.background.surface,
                borderRadius: '6px',
                border: `1px solid ${STORY_COLORS.themed.border.default}`,
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: STORY_COLORS.themed.text.secondary,
                  marginBottom: '12px',
                }}
              >
                Label Pattern
              </div>
              <div
                style={{
                  fontSize: 'var(--lufa-primitive-typography-font-size-xs)',
                  fontWeight: 600,
                  letterSpacing: 'var(--lufa-primitive-typography-letter-spacing-wide)',
                  textTransform: 'uppercase',
                  color: STORY_COLORS.themed.text.secondary,
                }}
              >
                Section Label
              </div>
              <code
                style={{
                  fontSize: '10px',
                  color: STORY_COLORS.themed.text.secondary,
                  fontFamily: 'monospace',
                  display: 'block',
                  marginTop: '8px',
                }}
              >
                font-size: xs (12px)
                <br />
                letter-spacing: wide (0.05em)
                <br />
                text-transform: uppercase
              </code>
            </div>
          </div>
        </div>
      </TypographySection>
    </StoryContainer>
  ),
};

/**
 * ## Extended Type Scale (6xl-8xl)
 *
 * Extended font sizes for hero sections, marketing pages, and display text.
 * These tokens use fluid scaling to maintain readability across all viewport sizes.
 *
 * ### Key Features
 * - **6xl (40px-60px)**: Hero headlines, featured content
 * - **7xl (48px-72px)**: Marketing hero sections, landing pages
 * - **8xl (64px-96px)**: Display text, brand impact moments
 *
 * ### Technical Note
 * 8xl has intentional behavior: fluid scaling engages at 400px+ viewport.
 * Below 400px, it remains at 64px (min value) - designed for larger displays.
 *
 * ### Usage Guidelines
 * - Use sparingly - very large text for hero/marketing sections only
 * - Test at multiple viewport sizes (mobile, tablet, desktop)
 * - Consider accessibility - ensure proper line-height and contrast
 */
export const ExtendedTypeScale: Story = {
  render: () => {
    const [width, setWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1280);

    React.useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
      <StoryContainer>
        <TypographySection title="Extended Type Scale (6xl-8xl) - ADR-010">
          <div
            style={{
              padding: '16px',
              backgroundColor: STORY_COLORS.themed.background.warning,
              borderRadius: '6px',
              marginBottom: '32px',
              border: `2px solid ${PRIMARY.orange.main}`,
            }}
          >
            <div style={{ fontSize: '14px', fontWeight: 600, color: PRIMARY.orange.main, marginBottom: '8px' }}>
              📏 Current viewport: {width}px
            </div>
            <div style={{ fontSize: '12px', color: STORY_COLORS.themed.text.primary }}>
              Resize your browser to see fluid scaling in action. Note: 8xl scales from 400px+ viewport (intentional for
              display tier).
            </div>
          </div>

          {/* 6xl Token */}
          <div style={{ marginBottom: '48px' }}>
            <TypographyToken
              token="--lufa-primitive-typography-font-size-6xl"
              name="6xl"
              value="clamp(2.5rem, 2rem + 2.5vw, 3.75rem)"
              description="Hero headlines, featured content - Scales from 40px to 60px"
              example={
                <div>
                  <div
                    style={{
                      fontSize: 'var(--lufa-primitive-typography-font-size-6xl)',
                      fontWeight: 700,
                      lineHeight: 1.2,
                      marginBottom: '16px',
                    }}
                  >
                    Hero Headline
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: STORY_COLORS.themed.text.secondary,
                      fontFamily: 'monospace',
                    }}
                  >
                    Mobile (320px): ~40px • Tablet (768px): ~51px • Desktop (1280px): 60px
                  </div>
                </div>
              }
            />
          </div>

          {/* 7xl Token */}
          <div style={{ marginBottom: '48px' }}>
            <TypographyToken
              token="--lufa-primitive-typography-font-size-7xl"
              name="7xl"
              value="clamp(3rem, 2.5rem + 3vw, 4.5rem)"
              description="Marketing hero sections, landing pages - Scales from 48px to 72px"
              example={
                <div>
                  <div
                    style={{
                      fontSize: 'var(--lufa-primitive-typography-font-size-7xl)',
                      fontWeight: 700,
                      lineHeight: 1.1,
                      marginBottom: '16px',
                    }}
                  >
                    Marketing Hero
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: STORY_COLORS.themed.text.secondary,
                      fontFamily: 'monospace',
                    }}
                  >
                    Mobile (320px): 48px • Tablet (768px): ~63px • Desktop (1280px): 72px
                  </div>
                </div>
              }
            />
          </div>

          {/* 8xl Token */}
          <div style={{ marginBottom: '48px' }}>
            <TypographyToken
              token="--lufa-primitive-typography-font-size-8xl"
              name="8xl"
              value="clamp(4rem, 3rem + 4vw, 6rem)"
              description="Display text, brand impact moments - Scales from 64px to 96px (fluid starts at 400px)"
              example={
                <div>
                  <div
                    style={{
                      fontSize: 'var(--lufa-primitive-typography-font-size-8xl)',
                      fontWeight: 700,
                      lineHeight: 1.05,
                      marginBottom: '16px',
                    }}
                  >
                    Display
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: STORY_COLORS.themed.text.secondary,
                      fontFamily: 'monospace',
                      backgroundColor: STORY_COLORS.themed.background.warning,
                      padding: '8px',
                      borderRadius: '4px',
                      border: `1px solid ${PRIMARY.orange.main}`,
                    }}
                  >
                    ⚠️ Note: Fluid scaling engages at 400px+ viewport
                    <br />
                    Mobile (320px): 64px (static) • Tablet (768px): ~79px • Desktop (1280px): 96px
                  </div>
                </div>
              }
            />
          </div>

          {/* Visual Comparison at Current Viewport */}
          <div
            style={{
              marginTop: '48px',
              padding: '24px',
              backgroundColor: STORY_COLORS.themed.background.surface,
              borderRadius: '8px',
              border: `2px solid ${STORY_COLORS.themed.border.default}`,
            }}
          >
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 600,
                marginBottom: '24px',
                color: STORY_COLORS.themed.text.primary,
              }}
            >
              Visual Comparison at {width}px
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <div
                  style={{
                    fontSize: '12px',
                    color: STORY_COLORS.themed.text.secondary,
                    marginBottom: '8px',
                    fontFamily: 'monospace',
                  }}
                >
                  5xl (existing)
                </div>
                <div style={{ fontSize: 'var(--lufa-primitive-typography-font-size-5xl)', fontWeight: 700 }}>
                  Standard Hero
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: '12px',
                    color: STORY_COLORS.themed.text.secondary,
                    marginBottom: '8px',
                    fontFamily: 'monospace',
                  }}
                >
                  6xl (new)
                </div>
                <div style={{ fontSize: 'var(--lufa-primitive-typography-font-size-6xl)', fontWeight: 700 }}>
                  Featured Hero
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: '12px',
                    color: STORY_COLORS.themed.text.secondary,
                    marginBottom: '8px',
                    fontFamily: 'monospace',
                  }}
                >
                  7xl (new)
                </div>
                <div style={{ fontSize: 'var(--lufa-primitive-typography-font-size-7xl)', fontWeight: 700 }}>
                  Marketing Hero
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: '12px',
                    color: STORY_COLORS.themed.text.secondary,
                    marginBottom: '8px',
                    fontFamily: 'monospace',
                  }}
                >
                  8xl (new)
                </div>
                <div style={{ fontSize: 'var(--lufa-primitive-typography-font-size-8xl)', fontWeight: 700 }}>
                  Display
                </div>
              </div>
            </div>
          </div>

          {/* Breakpoint Testing Table */}
          <div style={{ marginTop: '48px' }}>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 600,
                marginBottom: '16px',
                color: STORY_COLORS.themed.text.primary,
              }}
            >
              Responsive Behavior Across Breakpoints
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: STORY_COLORS.themed.background.surface }}>
                    <th
                      style={{
                        padding: '12px',
                        textAlign: 'left',
                        border: `1px solid ${STORY_COLORS.themed.border.default}`,
                      }}
                    >
                      Token
                    </th>
                    <th
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        border: `1px solid ${STORY_COLORS.themed.border.default}`,
                      }}
                    >
                      Mobile
                      <br />
                      (320px)
                    </th>
                    <th
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        border: `1px solid ${STORY_COLORS.themed.border.default}`,
                      }}
                    >
                      Phablet
                      <br />
                      (400px)
                    </th>
                    <th
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        border: `1px solid ${STORY_COLORS.themed.border.default}`,
                      }}
                    >
                      Tablet
                      <br />
                      (768px)
                    </th>
                    <th
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        border: `1px solid ${STORY_COLORS.themed.border.default}`,
                      }}
                    >
                      Desktop
                      <br />
                      (1024px)
                    </th>
                    <th
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        border: `1px solid ${STORY_COLORS.themed.border.default}`,
                      }}
                    >
                      Large
                      <br />
                      (1280px)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      style={{
                        padding: '12px',
                        border: `1px solid ${STORY_COLORS.themed.border.default}`,
                        fontWeight: 600,
                      }}
                    >
                      6xl
                    </td>
                    <td
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        border: `1px solid ${STORY_COLORS.themed.border.default}`,
                      }}
                    >
                      40px
                    </td>
                    <td
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        border: `1px solid ${STORY_COLORS.themed.border.default}`,
                      }}
                    >
                      42px
                    </td>
                    <td
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        border: `1px solid ${STORY_COLORS.themed.border.default}`,
                      }}
                    >
                      51px
                    </td>
                    <td
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        border: `1px solid ${STORY_COLORS.themed.border.default}`,
                      }}
                    >
                      58px
                    </td>
                    <td
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        border: `1px solid ${STORY_COLORS.themed.border.default}`,
                        fontWeight: 600,
                      }}
                    >
                      60px
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: STORY_COLORS.themed.background.surface }}>
                    <td
                      style={{
                        padding: '12px',
                        border: `1px solid ${STORY_COLORS.themed.border.default}`,
                        fontWeight: 600,
                      }}
                    >
                      7xl
                    </td>
                    <td
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        border: `1px solid ${STORY_COLORS.themed.border.default}`,
                      }}
                    >
                      48px
                    </td>
                    <td
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        border: `1px solid ${STORY_COLORS.themed.border.default}`,
                      }}
                    >
                      52px
                    </td>
                    <td
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        border: `1px solid ${STORY_COLORS.themed.border.default}`,
                      }}
                    >
                      63px
                    </td>
                    <td
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        border: `1px solid ${STORY_COLORS.themed.border.default}`,
                      }}
                    >
                      71px
                    </td>
                    <td
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        border: `1px solid ${STORY_COLORS.themed.border.default}`,
                        fontWeight: 600,
                      }}
                    >
                      72px
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: '12px',
                        border: `1px solid ${STORY_COLORS.themed.border.default}`,
                        fontWeight: 600,
                      }}
                    >
                      8xl
                      <span style={{ color: PRIMARY.orange.main, marginLeft: '4px' }}>⚠️</span>
                    </td>
                    <td
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        border: `1px solid ${STORY_COLORS.themed.border.default}`,
                        backgroundColor: STORY_COLORS.themed.background.warning,
                      }}
                    >
                      64px
                      <br />
                      <span style={{ fontSize: '10px', color: PRIMARY.orange.main }}>(static)</span>
                    </td>
                    <td
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        border: `1px solid ${STORY_COLORS.themed.border.default}`,
                      }}
                    >
                      64px
                      <br />
                      <span style={{ fontSize: '10px', color: STORY_COLORS.themed.text.secondary }}>
                        (fluid starts)
                      </span>
                    </td>
                    <td
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        border: `1px solid ${STORY_COLORS.themed.border.default}`,
                      }}
                    >
                      79px
                    </td>
                    <td
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        border: `1px solid ${STORY_COLORS.themed.border.default}`,
                      }}
                    >
                      89px
                    </td>
                    <td
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        border: `1px solid ${STORY_COLORS.themed.border.default}`,
                        fontWeight: 600,
                      }}
                    >
                      96px
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              style={{
                marginTop: '12px',
                fontSize: '11px',
                color: STORY_COLORS.themed.text.secondary,
                fontStyle: 'italic',
              }}
            >
              ⚠️ Note: 8xl remains at 64px (static) below 400px viewport, then scales fluidly. This is intentional for
              display tier targeting larger screens.
            </div>
          </div>
        </TypographySection>
      </StoryContainer>
    );
  },
};
