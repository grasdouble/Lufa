/**
 * Cluster Component - Playwright Component Tests
 *
 * Comprehensive behavioral test suite for the Cluster primitive component.
 * Tests cover rendering, all prop variants, user interactions, accessibility,
 * and visual regression in both light and dark modes.
 *
 * Cluster is a layout primitive component for wrapping collections of elements
 * with intelligent spacing. Based on "The Cluster" pattern by Heydon Pickering.
 * Semantic equivalent of Chakra UI's Wrap component.
 *
 * Test Categories (following official Playwright CT guidelines):
 * 1. Basic Rendering - Default behavior and core functionality
 * 2. Variants - All prop combinations (spacing, align, justify, polymorphic)
 * 3. User Interactions - Event handlers and interactive behavior
 * 4. Accessibility - ARIA attributes, semantic HTML, keyboard navigation
 * 5. Visual Regression - Comprehensive snapshots in light and dark modes
 *
 * @see .github/instructions/lufa-design-system-playwright-ct.instructions.md
 */

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/experimental-ct-react';

import { Cluster } from '@grasdouble/lufa_design-system';

// ============================================
// TEST SUITE: Basic Rendering
// ============================================

test.describe('Cluster Component', () => {
  test.describe('Basic Rendering', () => {
    test('should render with default props', async ({ mount }) => {
      const component = await mount(
        <Cluster>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </Cluster>
      );
      await expect(component).toBeVisible();
      await expect(component).toContainText('Item 1');
      await expect(component).toContainText('Item 2');
      await expect(component).toContainText('Item 3');
    });

    test('should render as div element by default', async ({ mount }) => {
      const component = await mount(<Cluster>Content</Cluster>);
      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('div');
    });

    test('should render with multiple children', async ({ mount }) => {
      const component = await mount(
        <Cluster>
          <span>Badge 1</span>
          <span>Badge 2</span>
          <span>Badge 3</span>
          <span>Badge 4</span>
          <span>Badge 5</span>
        </Cluster>
      );
      await expect(component).toContainText('Badge 1');
      await expect(component).toContainText('Badge 5');
    });

    test('should apply custom className', async ({ mount }) => {
      const component = await mount(<Cluster className="custom-class">Content</Cluster>);
      await expect(component).toHaveClass(/custom-class/);
    });

    test('should apply custom style prop', async ({ mount }) => {
      const component = await mount(<Cluster style={{ margin: '10px' }}>Content</Cluster>);
      await expect(component).toHaveCSS('margin', '10px');
    });

    test('should render nested Clusters', async ({ mount }) => {
      const component = await mount(
        <Cluster spacing="spacious">
          <Cluster spacing="default">
            <Cluster spacing="compact">
              <div>Nested content</div>
            </Cluster>
          </Cluster>
        </Cluster>
      );
      await expect(component).toContainText('Nested content');
    });

    test('should combine custom className with utility classes', async ({ mount }) => {
      const component = await mount(
        <Cluster spacing="default" align="center" className="custom-class">
          Content
        </Cluster>
      );
      await expect(component).toHaveClass(/spacing-default/);
      await expect(component).toHaveClass(/align-center/);
      await expect(component).toHaveClass(/custom-class/);
    });

    test('should wrap children automatically', async ({ mount }) => {
      const component = await mount(
        <Cluster spacing="default">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i}>Item {i + 1}</div>
          ))}
        </Cluster>
      );
      await expect(component).toContainText('Item 1');
      await expect(component).toContainText('Item 20');
    });
  });

  // ============================================
  // TEST SUITE: Variants
  // ============================================

  test.describe('Variants', () => {
    test.describe('Spacing Variants', () => {
      const spacingValues = ['tight', 'compact', 'default', 'comfortable', 'spacious'] as const;

      spacingValues.forEach((value) => {
        test(`should apply spacing="${value}" class`, async ({ mount }) => {
          const component = await mount(<Cluster spacing={value}>Content</Cluster>);
          await expect(component).toContainText('Content');
          await expect(component).toHaveClass(new RegExp(`spacing-${value}`));
        });
      });

      test('should default to spacing="default"', async ({ mount }) => {
        const component = await mount(<Cluster>Content</Cluster>);
        await expect(component).toHaveClass(/spacing-default/);
      });
    });

    test.describe('Align Variants', () => {
      const alignValues = ['flex-start', 'center', 'flex-end', 'baseline', 'stretch'] as const;

      alignValues.forEach((value) => {
        test(`should apply align="${value}" class`, async ({ mount }) => {
          const component = await mount(<Cluster align={value}>Content</Cluster>);
          await expect(component).toContainText('Content');
          await expect(component).toHaveClass(new RegExp(`align-${value}`));
        });
      });

      test('should default to align="center"', async ({ mount }) => {
        const component = await mount(<Cluster>Content</Cluster>);
        await expect(component).toHaveClass(/align-center/);
      });
    });

    test.describe('Justify Variants', () => {
      const justifyValues = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'] as const;

      justifyValues.forEach((value) => {
        test(`should apply justify="${value}" class`, async ({ mount }) => {
          const component = await mount(<Cluster justify={value}>Content</Cluster>);
          await expect(component).toContainText('Content');
          await expect(component).toHaveClass(new RegExp(`justify-${value}`));
        });
      });

      test('should default to justify="flex-start"', async ({ mount }) => {
        const component = await mount(<Cluster>Content</Cluster>);
        await expect(component).toHaveClass(/justify-flex-start/);
      });
    });

    test.describe('Polymorphic Variants (as prop)', () => {
      test('should render as section element', async ({ mount }) => {
        const component = await mount(<Cluster as="section">Section content</Cluster>);
        await expect(component).toContainText('Section content');

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('section');
      });

      test('should render as article element', async ({ mount }) => {
        const component = await mount(<Cluster as="article">Article content</Cluster>);
        await expect(component).toContainText('Article content');

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('article');
      });

      test('should render as nav element', async ({ mount }) => {
        const component = await mount(<Cluster as="nav">Nav content</Cluster>);
        await expect(component).toContainText('Nav content');

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('nav');
      });

      test('should render as ul element', async ({ mount }) => {
        const component = await mount(<Cluster as="ul">List content</Cluster>);
        await expect(component).toContainText('List content');

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('ul');
      });

      test('should preserve props when polymorphic', async ({ mount }) => {
        const component = await mount(
          <Cluster as="section" spacing="comfortable" align="center">
            Section with props
          </Cluster>
        );

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('section');

        await expect(component).toHaveClass(/spacing-comfortable/);
        await expect(component).toHaveClass(/align-center/);
      });

      test('should support HTML attributes when polymorphic', async ({ mount }) => {
        const component = await mount(
          <Cluster as="nav" id="test-nav" data-testid="cluster-nav" aria-label="Tag navigation">
            Nav with attributes
          </Cluster>
        );

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('nav');

        await expect(component).toHaveAttribute('id', 'test-nav');
        await expect(component).toHaveAttribute('data-testid', 'cluster-nav');
        await expect(component).toHaveAttribute('aria-label', 'Tag navigation');
      });
    });

    test.describe('Combined Variants', () => {
      test('should combine spacing and align', async ({ mount }) => {
        const component = await mount(
          <Cluster spacing="comfortable" align="flex-start">
            <div>Item 1</div>
            <div>Item 2</div>
          </Cluster>
        );
        await expect(component).toHaveClass(/spacing-comfortable/);
        await expect(component).toHaveClass(/align-flex-start/);
      });

      test('should combine spacing, align, and justify', async ({ mount }) => {
        const component = await mount(
          <Cluster spacing="default" align="center" justify="space-between">
            <div>Item 1</div>
            <div>Item 2</div>
          </Cluster>
        );
        await expect(component).toHaveClass(/spacing-default/);
        await expect(component).toHaveClass(/align-center/);
        await expect(component).toHaveClass(/justify-space-between/);
      });

      test('should handle all props together', async ({ mount }) => {
        const component = await mount(
          <Cluster
            as="section"
            spacing="comfortable"
            align="center"
            justify="space-between"
            className="complex-cluster"
          >
            Complex cluster
          </Cluster>
        );

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('section');

        await expect(component).toHaveClass(/spacing-comfortable/);
        await expect(component).toHaveClass(/align-center/);
        await expect(component).toHaveClass(/justify-space-between/);
        await expect(component).toHaveClass(/complex-cluster/);
      });

      // Test different spacing with different align
      ['tight', 'compact', 'default', 'comfortable', 'spacious'].forEach((spacing) => {
        ['flex-start', 'center', 'flex-end'].forEach((align) => {
          test(`should combine spacing="${spacing}" with align="${align}"`, async ({ mount }) => {
            const component = await mount(
              <Cluster spacing={spacing as any} align={align as any}>
                <div>Item</div>
              </Cluster>
            );
            await expect(component).toHaveClass(new RegExp(`spacing-${spacing}`));
            await expect(component).toHaveClass(new RegExp(`align-${align}`));
          });
        });
      });

      // Test different justify with different spacing
      ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'].forEach((justify) => {
        test(`should combine spacing="default" with justify="${justify}"`, async ({ mount }) => {
          const component = await mount(
            <Cluster spacing="default" justify={justify as any}>
              <div>Item</div>
            </Cluster>
          );
          await expect(component).toHaveClass(/spacing-default/);
          await expect(component).toHaveClass(new RegExp(`justify-${justify}`));
        });
      });
    });
  });

  // ============================================
  // TEST SUITE: User Interactions
  // ============================================

  test.describe('User Interactions', () => {
    test('should handle click events', async ({ mount }) => {
      let clicked = false;
      const component = await mount(
        <Cluster
          onClick={() => {
            clicked = true;
          }}
        >
          <div>Clickable cluster</div>
        </Cluster>
      );

      await component.click();
      expect(clicked).toBe(true);
    });

    test('should be focusable with tabIndex', async ({ mount }) => {
      const component = await mount(
        <Cluster tabIndex={0}>
          <div>Focusable cluster</div>
        </Cluster>
      );

      await component.focus();
      await expect(component).toBeFocused();
    });

    test('should handle keyboard events', async ({ mount }) => {
      let keyPressed = false;
      const component = await mount(
        <Cluster
          tabIndex={0}
          onKeyDown={() => {
            keyPressed = true;
          }}
        >
          <div>Keyboard cluster</div>
        </Cluster>
      );

      await component.focus();
      await component.press('Enter');
      expect(keyPressed).toBe(true);
    });

    test('should handle mouse events', async ({ mount }) => {
      let hovered = false;
      const component = await mount(
        <Cluster
          onMouseEnter={() => {
            hovered = true;
          }}
        >
          <div>Hover cluster</div>
        </Cluster>
      );

      await component.hover();
      expect(hovered).toBe(true);
    });
  });

  // ============================================
  // TEST SUITE: Accessibility
  // ============================================

  test.describe('Accessibility', () => {
    test('should pass a11y checks', async ({ mount, page }) => {
      await mount(
        <Cluster>
          <div>Accessible cluster</div>
        </Cluster>
      );
      const accessibilityScanResults = await new AxeBuilder({ page })
        .disableRules(['page-has-heading-one', 'landmark-one-main', 'region'])
        .analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should use semantic HTML for better accessibility', async ({ mount }) => {
      const component = await mount(
        <Cluster as="nav">
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
        </Cluster>
      );

      await expect(component).toContainText('Link 1');
      await expect(component).toContainText('Link 3');
    });

    test('should support ARIA attributes', async ({ mount }) => {
      const component = await mount(
        <Cluster role="list" aria-label="Tag list">
          <div>Tag 1</div>
          <div>Tag 2</div>
        </Cluster>
      );

      await expect(component).toHaveAttribute('role', 'list');
      await expect(component).toHaveAttribute('aria-label', 'Tag list');
    });

    test('should support tabIndex for keyboard navigation', async ({ mount }) => {
      const component = await mount(
        <Cluster tabIndex={0}>
          <div>Focusable cluster</div>
        </Cluster>
      );

      await component.focus();
      await expect(component).toBeFocused();
    });

    test('should combine semantic elements with ARIA attributes', async ({ mount }) => {
      const component = await mount(
        <Cluster as="nav" role="navigation" aria-label="Tag navigation">
          <a href="#">Tag 1</a>
          <a href="#">Tag 2</a>
          <a href="#">Tag 3</a>
        </Cluster>
      );

      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('nav');

      await expect(component).toHaveAttribute('role', 'navigation');
      await expect(component).toHaveAttribute('aria-label', 'Tag navigation');
    });

    test('should have accessible structure for tag collection', async ({ mount }) => {
      const component = await mount(
        <Cluster as="div" role="list" aria-label="Skills">
          <div role="listitem">React</div>
          <div role="listitem">TypeScript</div>
          <div role="listitem">Next.js</div>
        </Cluster>
      );

      await expect(component).toMatchAriaSnapshot(`
        - list "Skills":
          - listitem: React
          - listitem: TypeScript
          - listitem: Next.js
      `);
    });
  });

  // ============================================
  // TEST SUITE: Visual Regression
  // ============================================

  test.describe('Visual Regression', () => {
    test('should match snapshot for all variants', async ({ mount }) => {
      const spacingValues = ['tight', 'compact', 'default', 'comfortable', 'spacious'] as const;
      const alignValues = ['flex-start', 'center', 'flex-end', 'baseline', 'stretch'] as const;
      const justifyValues = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'] as const;

      const component = await mount(
        <div
          style={{
            padding: '32px',
            background: 'var(--lufa-semantic-ui-background-page)',
            width: '900px',
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
            Cluster Component - All Variants
          </h1>

          {/* Section 1: Spacing Values */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-semantic-ui-text-secondary)',
              }}
            >
              Spacing Values
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '24px',
              }}
            >
              {spacingValues.map((value) => (
                <div key={value}>
                  <div
                    style={{
                      marginBottom: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: 'var(--lufa-semantic-ui-text-secondary)',
                    }}
                  >
                    spacing=&quot;{value}&quot;
                  </div>
                  <div
                    style={{
                      border: '2px dashed var(--lufa-core-neutral-border-default)',
                      padding: '8px',
                      borderRadius: '4px',
                    }}
                  >
                    <Cluster spacing={value}>
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                          key={i}
                          style={{
                            padding: '8px 12px',
                            background: '#8b5cf6',
                            color: 'white',
                            borderRadius: '4px',
                            textAlign: 'center',
                            fontSize: '13px',
                            fontWeight: '600',
                          }}
                        >
                          Tag {i}
                        </div>
                      ))}
                    </Cluster>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Align Values */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-semantic-ui-text-secondary)',
              }}
            >
              Align Values
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {alignValues.map((value) => (
                <div key={value}>
                  <div
                    style={{
                      marginBottom: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: 'var(--lufa-semantic-ui-text-secondary)',
                    }}
                  >
                    align=&quot;{value}&quot;
                  </div>
                  <div
                    style={{
                      border: '2px dashed var(--lufa-core-neutral-border-default)',
                      padding: '8px',
                      borderRadius: '4px',
                    }}
                  >
                    <Cluster align={value} spacing="default">
                      <div
                        style={{
                          padding: '12px',
                          background: '#ec4899',
                          color: 'white',
                          borderRadius: '6px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        40px
                      </div>
                      <div
                        style={{
                          padding: '12px',
                          background: '#f97316',
                          color: 'white',
                          borderRadius: '6px',
                          height: '60px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        60px
                      </div>
                      <div
                        style={{
                          padding: '12px',
                          background: '#eab308',
                          color: 'white',
                          borderRadius: '6px',
                          height: '50px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        50px
                      </div>
                    </Cluster>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Justify Values */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-semantic-ui-text-secondary)',
              }}
            >
              Justify Values
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {justifyValues.map((value) => (
                <div key={value}>
                  <div
                    style={{
                      marginBottom: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: 'var(--lufa-semantic-ui-text-secondary)',
                    }}
                  >
                    justify=&quot;{value}&quot;
                  </div>
                  <div
                    style={{
                      border: '2px dashed var(--lufa-core-neutral-border-default)',
                      padding: '8px',
                      borderRadius: '4px',
                    }}
                  >
                    <Cluster justify={value} spacing={value.startsWith('space') ? 'tight' : 'default'}>
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          style={{
                            padding: '12px 16px',
                            background: '#10b981',
                            color: 'white',
                            borderRadius: '6px',
                            fontWeight: '600',
                          }}
                        >
                          Item {i}
                        </div>
                      ))}
                    </Cluster>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Use Cases */}
          <section>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-semantic-ui-text-secondary)',
              }}
            >
              Use Case Examples
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <div
                  style={{
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: 'var(--lufa-semantic-ui-text-secondary)',
                  }}
                >
                  Tags Collection
                </div>
                <Cluster spacing="compact">
                  {['React', 'TypeScript', 'Next.js', 'Tailwind', 'GraphQL'].map((tag) => (
                    <div
                      key={tag}
                      style={{
                        padding: '6px 12px',
                        background: '#6366f1',
                        color: 'white',
                        borderRadius: '16px',
                        fontSize: '12px',
                        fontWeight: '600',
                      }}
                    >
                      {tag}
                    </div>
                  ))}
                </Cluster>
              </div>

              <div>
                <div
                  style={{
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: 'var(--lufa-semantic-ui-text-secondary)',
                  }}
                >
                  Button Group
                </div>
                <Cluster spacing="default" align="center">
                  <div
                    style={{
                      padding: '10px 20px',
                      background: '#6366f1',
                      color: 'white',
                      borderRadius: '6px',
                      fontWeight: '600',
                    }}
                  >
                    Save
                  </div>
                  <div
                    style={{
                      padding: '10px 20px',
                      border: '1px solid #6366f1',
                      color: '#6366f1',
                      borderRadius: '6px',
                      fontWeight: '600',
                      background: 'white',
                    }}
                  >
                    Cancel
                  </div>
                </Cluster>
              </div>
            </div>
          </section>
        </div>
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('cluster-all-variants.png');
    });
  });
});
