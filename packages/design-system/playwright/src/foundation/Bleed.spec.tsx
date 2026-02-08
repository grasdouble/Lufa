/**
 * Bleed Component - Playwright Component Tests
 *
 * Tests cover:
 * - Basic rendering
 * - Inline bleed (numeric and "full" values)
 * - Block bleed (vertical)
 * - Polymorphic rendering
 * - Accessibility
 * - Visual regression
 * - Content-focused use cases
 */

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/experimental-ct-react';

import { Bleed, Container } from '@grasdouble/lufa_design-system';

// Spacing scale type for tests
type SpacingValue = 0 | 4 | 8 | 12 | 16 | 24 | 32 | 40 | 48 | 64 | 80 | 96;

test.describe('Bleed Component', () => {
  // ==========================================
  // BASIC RENDERING
  // ==========================================

  test.describe('Basic Rendering', () => {
    test('renders with children', async ({ mount }) => {
      const component = await mount(
        <Bleed inline={8}>
          <div data-testid="child">Bleeding content</div>
        </Bleed>
      );
      await expect(component).toBeVisible();
      const child = component.getByTestId('child');
      await expect(child).toHaveText('Bleeding content');
    });

    test('renders as div by default', async ({ mount, page }) => {
      await mount(<Bleed inline={8} data-testid="bleed" />);
      const element = page.getByTestId('bleed');
      const tagName = await element.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('div');
    });

    test('applies base bleed class', async ({ mount }) => {
      const component = await mount(<Bleed inline={8} />);
      await expect(component).toHaveClass(/bleed/);
    });
  });

  // ==========================================
  // INLINE BLEED (HORIZONTAL)
  // ==========================================

  test.describe('Inline Bleed', () => {
    test('applies inline numeric bleed', async ({ mount }) => {
      const component = await mount(
        <Bleed inline={16} data-testid="bleed">
          <div>Content</div>
        </Bleed>
      );
      await expect(component).toBeVisible();
      await expect(component).toHaveClass(/inline-16/);
    });

    test('applies full-width inline bleed', async ({ mount }) => {
      const component = await mount(
        <Container size="md">
          <Bleed inline="full" data-testid="bleed">
            <div style={{ backgroundColor: '#aaffaa', padding: '16px' }}>Full-width content</div>
          </Bleed>
        </Container>
      );
      const bleed = component.getByTestId('bleed');
      await expect(bleed).toBeVisible();
      await expect(bleed).toHaveClass(/inline-full/);
    });

    test('supports multiple inline numeric values', async ({ mount }) => {
      const values: SpacingValue[] = [0, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96];

      const component = await mount(
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {values.map((value) => (
            <Bleed key={value} inline={value} data-testid={`bleed-${value}`}>
              Content
            </Bleed>
          ))}
        </div>
      );

      for (const value of values) {
        const bleed = component.getByTestId(`bleed-${value}`);
        await expect(bleed).toHaveClass(new RegExp(`inline-${value}`));
      }
    });
  });

  // ==========================================
  // BLOCK BLEED (VERTICAL)
  // ==========================================

  test.describe('Block Bleed', () => {
    test('applies block bleed', async ({ mount }) => {
      const component = await mount(
        <Bleed inline={8} block={4} data-testid="bleed">
          <div>Content with vertical bleed</div>
        </Bleed>
      );
      await expect(component).toBeVisible();
      await expect(component).toHaveClass(/block-4/);
    });

    test('supports multiple block numeric values', async ({ mount }) => {
      const values: SpacingValue[] = [0, 4, 8, 12, 16, 24, 32];

      const component = await mount(
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {values.map((value) => (
            <Bleed key={value} inline={8} block={value} data-testid={`bleed-${value}`}>
              Content
            </Bleed>
          ))}
        </div>
      );

      for (const value of values) {
        const bleed = component.getByTestId(`bleed-${value}`);
        await expect(bleed).toHaveClass(new RegExp(`block-${value}`));
      }
    });

    test('works with inline and block combined', async ({ mount }) => {
      const component = await mount(
        <Bleed inline={16} block={8} data-testid="bleed">
          Content
        </Bleed>
      );
      await expect(component).toHaveClass(/inline-16/);
      await expect(component).toHaveClass(/block-8/);
    });
  });

  // ==========================================
  // POLYMORPHIC RENDERING
  // ==========================================

  test.describe('Polymorphic Rendering', () => {
    test('renders as section when specified', async ({ mount, page }) => {
      await mount(
        <Bleed inline={16} as="section" data-testid="bleed">
          Content
        </Bleed>
      );
      const element = page.getByTestId('bleed');
      const tagName = await element.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('section');
    });

    test('renders as article when specified', async ({ mount, page }) => {
      await mount(
        <Bleed inline={8} as="article" data-testid="bleed">
          Content
        </Bleed>
      );
      const element = page.getByTestId('bleed');
      const tagName = await element.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('article');
    });

    test('renders as figure when specified', async ({ mount, page }) => {
      await mount(
        <Bleed inline="full" as="figure" data-testid="bleed">
          Content
        </Bleed>
      );
      const element = page.getByTestId('bleed');
      const tagName = await element.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('figure');
    });
  });

  // ==========================================
  // ACCESSIBILITY
  // ==========================================

  test.describe('Accessibility', () => {
    test('should pass a11y checks', async ({ mount, page }) => {
      await mount(
        <Bleed inline={8}>
          <div>Accessible Content</div>
        </Bleed>
      );

      const accessibilityScanResults = await new AxeBuilder({ page })
        .disableRules(['page-has-heading-one', 'landmark-one-main', 'region'])
        .analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('supports custom aria attributes', async ({ mount }) => {
      const component = await mount(<Bleed inline={8} aria-label="Full-width section" data-testid="bleed" />);
      await expect(component).toHaveAttribute('aria-label', 'Full-width section');
    });

    test('supports custom id attribute', async ({ mount }) => {
      const component = await mount(<Bleed inline={8} id="custom-bleed" data-testid="bleed" />);
      await expect(component).toHaveAttribute('id', 'custom-bleed');
    });

    test('accepts ref prop', async ({ mount }) => {
      const component = await mount(
        <Bleed inline={8} ref={() => {}} data-testid="bleed">
          <div>Content</div>
        </Bleed>
      );
      await expect(component).toBeVisible();
    });
  });

  // ==========================================
  // CUSTOM CLASS NAMES
  // ==========================================

  test.describe('Custom Classes', () => {
    test('accepts custom className', async ({ mount }) => {
      const component = await mount(
        <Bleed inline={8} className="custom-class" data-testid="bleed">
          Content
        </Bleed>
      );
      await expect(component).toHaveClass(/custom-class/);
    });

    test('merges custom className with component classes', async ({ mount }) => {
      const component = await mount(
        <Bleed inline={16} className="custom-bleed" data-testid="bleed">
          Content
        </Bleed>
      );
      await expect(component).toHaveClass(/custom-bleed/);
      await expect(component).toHaveClass(/bleed/);
      await expect(component).toHaveClass(/inline-16/);
    });
  });

  // ==========================================
  // PRACTICAL USE CASES
  // ==========================================

  test.describe('Practical Use Cases', () => {
    test('works in narrow container (content-focused)', async ({ mount }) => {
      const component = await mount(
        <Container size="md">
          <p>Article content with narrow reading width</p>
          <Bleed inline="full" data-testid="bleed">
            <div style={{ backgroundColor: '#4a90e2', padding: '32px', color: 'white' }}>Full-width hero section</div>
          </Bleed>
          <p>More article content</p>
        </Container>
      );
      const bleed = component.getByTestId('bleed');
      await expect(bleed).toBeVisible();
    });

    test('works with partial bleed for callouts', async ({ mount }) => {
      const component = await mount(
        <Container size="md">
          <p>Article content</p>
          <Bleed inline={24} data-testid="bleed">
            <div style={{ backgroundColor: '#fff3cd', border: '2px solid #ffc107', padding: '16px' }}>
              Important callout that bleeds slightly
            </div>
          </Bleed>
          <p>More content</p>
        </Container>
      );
      const bleed = component.getByTestId('bleed');
      await expect(bleed).toBeVisible();
    });

    test('works for marketing sections', async ({ mount }) => {
      const component = await mount(
        <Container size="lg">
          <Bleed inline="full" data-testid="bleed">
            <div style={{ backgroundColor: '#f0f0f0', padding: '48px' }}>
              <Container size="lg">
                <h2>Special Offer</h2>
              </Container>
            </div>
          </Bleed>
        </Container>
      );
      const bleed = component.getByTestId('bleed');
      await expect(bleed).toBeVisible();
    });
  });

  // ==========================================
  // VISUAL REGRESSION
  // ==========================================

  test.describe('Visual Regression', () => {
    test('should match snapshot for all variants', async ({ mount }) => {
      const inlineValues: (SpacingValue | 'full')[] = [0, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 'full'];
      const blockValues: SpacingValue[] = [0, 4, 8, 12, 16, 24, 32];
      const commonInlineValues: (SpacingValue | 'full')[] = [8, 16, 24, 32, 'full'];

      const component = await mount(
        <div
          style={{
            padding: '32px',
            background: 'var(--lufa-semantic-ui-background-page)',
            width: '1200px',
          }}
        >
          <h1
            style={{
              marginBottom: '24px',
              fontSize: '28px',
              fontWeight: 'bold',
              color: 'var(--lufa-semantic-ui-text-primary)',
            }}
          >
            Bleed Component - All Variants
          </h1>

          {/* Section 1: All Inline Bleed Values */}
          <section style={{ marginBottom: '48px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-semantic-ui-text-secondary)',
              }}
            >
              Inline Bleed - All Values
            </h2>
            <Container
              size="md"
              style={{
                backgroundColor: 'var(--lufa-semantic-ui-background-surface)',
                padding: '24px',
                border: '2px dashed var(--lufa-semantic-ui-border-default)',
                overflow: 'hidden',
              }}
            >
              <p style={{ marginBottom: '16px', fontSize: '12px', color: 'var(--lufa-semantic-ui-text-secondary)' }}>
                Container with constrained width
              </p>

              {inlineValues.map((value) => (
                <div key={`inline-${value}`} style={{ marginBottom: '12px' }}>
                  <p
                    style={{
                      fontSize: '11px',
                      marginBottom: '6px',
                      fontWeight: '600',
                      color: 'var(--lufa-semantic-ui-text-primary)',
                    }}
                  >
                    inline={typeof value === 'string' ? `"${value}"` : value}
                  </p>
                  <Bleed inline={value}>
                    <div
                      style={{
                        backgroundColor:
                          value === 'full'
                            ? 'var(--lufa-semantic-ui-background-info)'
                            : 'var(--lufa-semantic-ui-background-success)',
                        padding: '8px',
                        fontSize: '10px',
                        color:
                          value === 'full'
                            ? 'var(--lufa-semantic-ui-text-on-info)'
                            : 'var(--lufa-semantic-ui-text-on-success)',
                      }}
                    >
                      {value === 'full' ? 'Full-width bleed' : `Bleeds ${value}px`}
                    </div>
                  </Bleed>
                </div>
              ))}
            </Container>
          </section>

          {/* Section 2: All Block Bleed Values (with inline=16) */}
          <section style={{ marginBottom: '48px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-semantic-ui-text-secondary)',
              }}
            >
              Block Bleed - All Values (inline=16)
            </h2>
            <div
              style={{
                backgroundColor: 'var(--lufa-semantic-ui-background-surface)',
                padding: '24px',
                border: '2px dashed var(--lufa-semantic-ui-border-default)',
                maxWidth: '500px',
              }}
            >
              {blockValues.map((value) => (
                <div key={`block-${value}`} style={{ marginBottom: '12px' }}>
                  <p
                    style={{
                      fontSize: '11px',
                      marginBottom: '6px',
                      fontWeight: '600',
                      color: 'var(--lufa-semantic-ui-text-primary)',
                    }}
                  >
                    block={value}
                  </p>
                  <div
                    style={{
                      backgroundColor: 'var(--lufa-semantic-ui-background-page)',
                      padding: '8px',
                      marginBottom: '4px',
                      fontSize: '10px',
                      color: 'var(--lufa-semantic-ui-text-secondary)',
                    }}
                  >
                    Content above
                  </div>
                  <Bleed inline={16} block={value}>
                    <div
                      style={{
                        backgroundColor: 'var(--lufa-semantic-ui-background-warning)',
                        padding: '8px',
                        fontSize: '10px',
                        color: 'var(--lufa-semantic-ui-text-on-warning)',
                      }}
                    >
                      inline=16, block={value}
                    </div>
                  </Bleed>
                  <div
                    style={{
                      backgroundColor: 'var(--lufa-semantic-ui-background-page)',
                      padding: '8px',
                      marginTop: '4px',
                      fontSize: '10px',
                      color: 'var(--lufa-semantic-ui-text-secondary)',
                    }}
                  >
                    Content below
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Combined Inline + Block Variants */}
          <section style={{ marginBottom: '48px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-semantic-ui-text-secondary)',
              }}
            >
              Combined Inline + Block Variants
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '48px 24px' }}>
              {commonInlineValues.map((inlineVal) =>
                [8, 16, 24].map((blockVal) => {
                  // Create descriptive label
                  const inlineLabel =
                    inlineVal === 'full'
                      ? 'Full width'
                      : inlineVal === 8
                        ? 'Small'
                        : inlineVal === 16
                          ? 'Medium'
                          : inlineVal === 24
                            ? 'Large'
                            : inlineVal === 32
                              ? 'XLarge'
                              : `${inlineVal}px`;

                  const blockLabel =
                    blockVal === 8 ? 'Small vertical' : blockVal === 16 ? 'Medium vertical' : 'Large vertical';

                  return (
                    <div
                      key={`combo-${inlineVal}-${blockVal}`}
                      style={{
                        backgroundColor: 'var(--lufa-semantic-ui-background-surface)',
                        border: '1px solid var(--lufa-semantic-ui-border-default)',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          padding: '12px',
                          borderBottom: '1px solid var(--lufa-semantic-ui-border-default)',
                          backgroundColor: 'var(--lufa-semantic-ui-background-page)',
                        }}
                      >
                        <p
                          style={{
                            fontSize: '12px',
                            fontWeight: '700',
                            margin: '0 0 4px 0',
                            color: 'var(--lufa-semantic-ui-text-primary)',
                          }}
                        >
                          {inlineLabel} + {blockLabel}
                        </p>
                        <p
                          style={{
                            fontSize: '10px',
                            margin: 0,
                            color: 'var(--lufa-semantic-ui-text-secondary)',
                            fontFamily: 'monospace',
                          }}
                        >
                          inline={typeof inlineVal === 'string' ? `"${inlineVal}"` : inlineVal}, block={blockVal}
                        </p>
                      </div>
                      <div style={{ padding: '16px', position: 'relative' }}>
                        <div
                          style={{
                            backgroundColor: 'var(--lufa-semantic-ui-background-page)',
                            padding: '8px',
                            marginBottom: `${blockVal + 12}px`,
                            fontSize: '10px',
                            textAlign: 'center',
                            color: 'var(--lufa-semantic-ui-text-secondary)',
                          }}
                        >
                          Content above
                        </div>
                        <Bleed inline={inlineVal} block={blockVal as SpacingValue}>
                          <div
                            style={{
                              backgroundColor: 'var(--lufa-semantic-ui-background-info)',
                              padding: '12px',
                              fontSize: '10px',
                              color: 'var(--lufa-semantic-ui-text-on-info)',
                              textAlign: 'center',
                              fontWeight: '600',
                            }}
                          >
                            Bleed Zone
                          </div>
                        </Bleed>
                        <div
                          style={{
                            backgroundColor: 'var(--lufa-semantic-ui-background-page)',
                            padding: '8px',
                            marginTop: `${blockVal + 12}px`,
                            fontSize: '10px',
                            textAlign: 'center',
                            color: 'var(--lufa-semantic-ui-text-secondary)',
                          }}
                        >
                          Content below
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          {/* Section 4: Polymorphic Rendering */}
          <section style={{ marginBottom: '48px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-semantic-ui-text-secondary)',
              }}
            >
              Polymorphic Rendering (as prop)
            </h2>
            <Container
              size="md"
              style={{
                backgroundColor: 'var(--lufa-semantic-ui-background-surface)',
                padding: '24px',
                border: '2px dashed var(--lufa-semantic-ui-border-default)',
              }}
            >
              <div style={{ marginBottom: '12px' }}>
                <p
                  style={{
                    fontSize: '11px',
                    marginBottom: '6px',
                    fontWeight: '600',
                    color: 'var(--lufa-semantic-ui-text-primary)',
                  }}
                >
                  as="div" (default)
                </p>
                <Bleed inline={16}>
                  <div
                    style={{
                      backgroundColor: 'var(--lufa-semantic-ui-background-success)',
                      padding: '8px',
                      fontSize: '10px',
                      color: 'var(--lufa-semantic-ui-text-on-success)',
                    }}
                  >
                    Default div element
                  </div>
                </Bleed>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <p
                  style={{
                    fontSize: '11px',
                    marginBottom: '6px',
                    fontWeight: '600',
                    color: 'var(--lufa-semantic-ui-text-primary)',
                  }}
                >
                  as="section"
                </p>
                <Bleed inline={16} as="section">
                  <div
                    style={{
                      backgroundColor: 'var(--lufa-semantic-ui-background-error)',
                      padding: '8px',
                      fontSize: '10px',
                      color: 'var(--lufa-semantic-ui-text-on-error)',
                    }}
                  >
                    Section element
                  </div>
                </Bleed>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <p
                  style={{
                    fontSize: '11px',
                    marginBottom: '6px',
                    fontWeight: '600',
                    color: 'var(--lufa-semantic-ui-text-primary)',
                  }}
                >
                  as="article"
                </p>
                <Bleed inline={16} as="article">
                  <div
                    style={{
                      backgroundColor: 'var(--lufa-semantic-ui-background-info)',
                      padding: '8px',
                      fontSize: '10px',
                      color: 'var(--lufa-semantic-ui-text-on-info)',
                    }}
                  >
                    Article element
                  </div>
                </Bleed>
              </div>

              <div>
                <p
                  style={{
                    fontSize: '11px',
                    marginBottom: '6px',
                    fontWeight: '600',
                    color: 'var(--lufa-semantic-ui-text-primary)',
                  }}
                >
                  as="figure"
                </p>
                <Bleed inline={16} as="figure">
                  <div
                    style={{
                      backgroundColor: 'var(--lufa-semantic-ui-background-warning)',
                      padding: '8px',
                      fontSize: '10px',
                      color: 'var(--lufa-semantic-ui-text-on-warning)',
                    }}
                  >
                    Figure element
                  </div>
                </Bleed>
              </div>
            </Container>
          </section>
        </div>
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('bleed-all-variants.png');
    });
  });
});
