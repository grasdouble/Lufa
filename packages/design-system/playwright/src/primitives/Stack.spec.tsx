/**
 * Stack Component - Playwright Component Tests
 *
 * Comprehensive behavioral test suite for the Stack primitive component.
 * Tests cover rendering, all prop variants, user interactions, accessibility,
 * and visual regression in both light and dark modes.
 *
 * Stack is a layout primitive component for managing spacing between children
 * using Flexbox with gap property. It serves as the foundation for list layouts.
 *
 * Test Categories (following official Playwright CT guidelines):
 * 1. Basic Rendering - Default behavior and core functionality
 * 2. Variants - All prop combinations (direction, spacing, align, justify, wrap, polymorphic)
 * 3. User Interactions - Event handlers and interactive behavior
 * 4. Accessibility - ARIA attributes, semantic HTML, keyboard navigation
 * 5. Visual Regression - Comprehensive snapshots in light and dark modes
 *
 * @see .github/instructions/lufa-design-system-playwright-ct.instructions.md
 */

import { expect, test } from '@playwright/experimental-ct-react';
import AxeBuilder from '@axe-core/playwright';

import { Stack } from '@grasdouble/lufa_design-system';

// ============================================
// TEST SUITE: Basic Rendering
// ============================================

test.describe('Stack Component', () => {
  test.describe('Basic Rendering', () => {
    test('should render with default props', async ({ mount }) => {
      const component = await mount(
        <Stack>
          <div>Item 1</div>
          <div>Item 2</div>
        </Stack>
      );
      await expect(component).toBeVisible();
      await expect(component).toContainText('Item 1');
      await expect(component).toContainText('Item 2');
    });

    test('should render as div element by default', async ({ mount }) => {
      const component = await mount(<Stack>Content</Stack>);
      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('div');
    });

    test('should render with children', async ({ mount }) => {
      const component = await mount(
        <Stack>
          <span>Child 1</span>
          <span>Child 2</span>
          <span>Child 3</span>
        </Stack>
      );
      await expect(component).toContainText('Child 1');
      await expect(component).toContainText('Child 2');
      await expect(component).toContainText('Child 3');
    });

    test('should apply custom className', async ({ mount }) => {
      const component = await mount(<Stack className="custom-class">Content</Stack>);
      await expect(component).toHaveClass(/custom-class/);
    });

    test('should apply custom style prop', async ({ mount }) => {
      const component = await mount(<Stack style={{ margin: '10px' }}>Content</Stack>);
      await expect(component).toHaveCSS('margin', '10px');
    });

    test('should render nested Stacks', async ({ mount }) => {
      const component = await mount(
        <Stack spacing="spacious">
          <Stack spacing="default">
            <Stack spacing="compact">
              <div>Nested content</div>
            </Stack>
          </Stack>
        </Stack>
      );
      await expect(component).toContainText('Nested content');
    });

    test('should combine custom className with utility classes', async ({ mount }) => {
      const component = await mount(
        <Stack direction="horizontal" spacing="default" className="custom-class">
          Content
        </Stack>
      );
      await expect(component).toHaveClass(/direction-horizontal/);
      await expect(component).toHaveClass(/spacing-default/);
      await expect(component).toHaveClass(/custom-class/);
    });
  });

  // ============================================
  // TEST SUITE: Variants
  // ============================================

  test.describe('Variants', () => {
    test.describe('Direction Variants', () => {
      test('should apply direction="vertical" class', async ({ mount }) => {
        const component = await mount(<Stack direction="vertical">Content</Stack>);
        await expect(component).toHaveClass(/direction-vertical/);
      });

      test('should apply direction="horizontal" class', async ({ mount }) => {
        const component = await mount(<Stack direction="horizontal">Content</Stack>);
        await expect(component).toHaveClass(/direction-horizontal/);
      });

      test('should default to vertical direction', async ({ mount }) => {
        const component = await mount(<Stack>Content</Stack>);
        await expect(component).toHaveClass(/direction-vertical/);
      });
    });

    test.describe('Spacing Variants', () => {
      const spacingValues = ['none', 'tight', 'compact', 'default', 'comfortable', 'spacious'] as const;

      spacingValues.forEach((value) => {
        test(`should apply spacing="${value}" class`, async ({ mount }) => {
          const component = await mount(<Stack spacing={value}>Content</Stack>);
          await expect(component).toContainText('Content');
          await expect(component).toHaveClass(new RegExp(`spacing-${value}`));
        });
      });

      test('should default to spacing="default"', async ({ mount }) => {
        const component = await mount(<Stack>Content</Stack>);
        await expect(component).toHaveClass(/spacing-default/);
      });
    });

    test.describe('Align Variants', () => {
      const alignValues = ['start', 'center', 'end', 'stretch', 'baseline'] as const;

      alignValues.forEach((value) => {
        test(`should apply align="${value}" class`, async ({ mount }) => {
          const component = await mount(<Stack align={value}>Content</Stack>);
          await expect(component).toContainText('Content');
          await expect(component).toHaveClass(new RegExp(`align-${value}`));
        });
      });

      test('should default to align="stretch"', async ({ mount }) => {
        const component = await mount(<Stack>Content</Stack>);
        await expect(component).toHaveClass(/align-stretch/);
      });
    });

    test.describe('Justify Variants', () => {
      const justifyValues = ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'] as const;

      justifyValues.forEach((value) => {
        test(`should apply justify="${value}" class`, async ({ mount }) => {
          const component = await mount(<Stack justify={value}>Content</Stack>);
          await expect(component).toContainText('Content');
          await expect(component).toHaveClass(new RegExp(`justify-${value}`));
        });
      });

      test('should default to justify="start"', async ({ mount }) => {
        const component = await mount(<Stack>Content</Stack>);
        await expect(component).toHaveClass(/justify-start/);
      });
    });

    test.describe('Wrap Variants', () => {
      test('should apply wrap-wrap class when wrap={true}', async ({ mount }) => {
        const component = await mount(<Stack wrap>Content</Stack>);
        await expect(component).toHaveClass(/wrap-wrap/);
      });

      test('should apply wrap-nowrap class when wrap={false}', async ({ mount }) => {
        const component = await mount(<Stack wrap={false}>Content</Stack>);
        await expect(component).toHaveClass(/wrap-nowrap/);
      });

      test('should default to wrap={false}', async ({ mount }) => {
        const component = await mount(<Stack>Content</Stack>);
        await expect(component).toHaveClass(/wrap-nowrap/);
      });
    });

    test.describe('Polymorphic Variants (as prop)', () => {
      test('should render as section element', async ({ mount }) => {
        const component = await mount(<Stack as="section">Section content</Stack>);
        await expect(component).toContainText('Section content');

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('section');
      });

      test('should render as article element', async ({ mount }) => {
        const component = await mount(<Stack as="article">Article content</Stack>);
        await expect(component).toContainText('Article content');

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('article');
      });

      test('should render as header element', async ({ mount }) => {
        const component = await mount(<Stack as="header">Header content</Stack>);
        await expect(component).toContainText('Header content');

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('header');
      });

      test('should render as footer element', async ({ mount }) => {
        const component = await mount(<Stack as="footer">Footer content</Stack>);
        await expect(component).toContainText('Footer content');

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('footer');
      });

      test('should render as main element', async ({ mount }) => {
        const component = await mount(<Stack as="main">Main content</Stack>);
        await expect(component).toContainText('Main content');

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('main');
      });

      test('should render as nav element', async ({ mount }) => {
        const component = await mount(<Stack as="nav">Nav content</Stack>);
        await expect(component).toContainText('Nav content');

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('nav');
      });

      test('should render as aside element', async ({ mount }) => {
        const component = await mount(<Stack as="aside">Aside content</Stack>);
        await expect(component).toContainText('Aside content');

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('aside');
      });

      test('should render as ul element', async ({ mount }) => {
        const component = await mount(<Stack as="ul">List content</Stack>);
        await expect(component).toContainText('List content');

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('ul');
      });

      test('should preserve props when polymorphic', async ({ mount }) => {
        const component = await mount(
          <Stack as="section" direction="horizontal" spacing="comfortable" align="center">
            Section with props
          </Stack>
        );

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('section');

        await expect(component).toHaveClass(/direction-horizontal/);
        await expect(component).toHaveClass(/spacing-comfortable/);
        await expect(component).toHaveClass(/align-center/);
      });

      test('should support HTML attributes when polymorphic', async ({ mount }) => {
        const component = await mount(
          <Stack as="nav" id="test-nav" data-testid="stack-nav" aria-label="Main navigation">
            Nav with attributes
          </Stack>
        );

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('nav');

        await expect(component).toHaveAttribute('id', 'test-nav');
        await expect(component).toHaveAttribute('data-testid', 'stack-nav');
        await expect(component).toHaveAttribute('aria-label', 'Main navigation');
      });
    });

    test.describe('Combined Variants', () => {
      test('should combine direction and spacing', async ({ mount }) => {
        const component = await mount(
          <Stack direction="horizontal" spacing="comfortable">
            <div>Item 1</div>
            <div>Item 2</div>
          </Stack>
        );
        await expect(component).toHaveClass(/direction-horizontal/);
        await expect(component).toHaveClass(/spacing-comfortable/);
      });

      test('should combine direction, spacing, and align', async ({ mount }) => {
        const component = await mount(
          <Stack direction="horizontal" spacing="default" align="center">
            <div>Item 1</div>
            <div>Item 2</div>
          </Stack>
        );
        await expect(component).toHaveClass(/direction-horizontal/);
        await expect(component).toHaveClass(/spacing-default/);
        await expect(component).toHaveClass(/align-center/);
      });

      test('should combine direction, spacing, align, and justify', async ({ mount }) => {
        const component = await mount(
          <Stack direction="horizontal" spacing="default" align="center" justify="space-between">
            <div>Item 1</div>
            <div>Item 2</div>
          </Stack>
        );
        await expect(component).toHaveClass(/direction-horizontal/);
        await expect(component).toHaveClass(/spacing-default/);
        await expect(component).toHaveClass(/align-center/);
        await expect(component).toHaveClass(/justify-space-between/);
      });

      test('should combine all layout props', async ({ mount }) => {
        const component = await mount(
          <Stack direction="horizontal" spacing="comfortable" align="center" justify="space-between" wrap>
            <div>Item 1</div>
            <div>Item 2</div>
            <div>Item 3</div>
          </Stack>
        );
        await expect(component).toHaveClass(/direction-horizontal/);
        await expect(component).toHaveClass(/spacing-comfortable/);
        await expect(component).toHaveClass(/align-center/);
        await expect(component).toHaveClass(/justify-space-between/);
        await expect(component).toHaveClass(/wrap-wrap/);
      });

      test('should handle all props together', async ({ mount }) => {
        const component = await mount(
          <Stack
            as="section"
            direction="horizontal"
            spacing="comfortable"
            align="center"
            justify="space-between"
            wrap
            className="complex-stack"
          >
            Complex stack
          </Stack>
        );

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('section');

        await expect(component).toHaveClass(/direction-horizontal/);
        await expect(component).toHaveClass(/spacing-comfortable/);
        await expect(component).toHaveClass(/align-center/);
        await expect(component).toHaveClass(/justify-space-between/);
        await expect(component).toHaveClass(/wrap-wrap/);
        await expect(component).toHaveClass(/complex-stack/);
      });

      // Test different spacing with different directions
      ['none', 'tight', 'compact', 'default', 'comfortable', 'spacious'].forEach((spacing) => {
        ['vertical', 'horizontal'].forEach((direction) => {
          test(`should combine direction="${direction}" with spacing="${spacing}"`, async ({ mount }) => {
            const component = await mount(
              <Stack direction={direction as 'vertical' | 'horizontal'} spacing={spacing as any}>
                <div>Item</div>
              </Stack>
            );
            await expect(component).toHaveClass(new RegExp(`direction-${direction}`));
            await expect(component).toHaveClass(new RegExp(`spacing-${spacing}`));
          });
        });
      });

      // Test different align with horizontal direction
      ['start', 'center', 'end', 'stretch', 'baseline'].forEach((align) => {
        test(`should combine direction="horizontal" with align="${align}"`, async ({ mount }) => {
          const component = await mount(
            <Stack direction="horizontal" align={align as any}>
              <div>Item</div>
            </Stack>
          );
          await expect(component).toHaveClass(/direction-horizontal/);
          await expect(component).toHaveClass(new RegExp(`align-${align}`));
        });
      });

      // Test different justify with horizontal direction
      ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'].forEach((justify) => {
        test(`should combine direction="horizontal" with justify="${justify}"`, async ({ mount }) => {
          const component = await mount(
            <Stack direction="horizontal" justify={justify as any}>
              <div>Item</div>
            </Stack>
          );
          await expect(component).toHaveClass(/direction-horizontal/);
          await expect(component).toHaveClass(new RegExp(`justify-${justify}`));
        });
      });

      // Test wrap with different directions
      [true, false].forEach((wrap) => {
        ['vertical', 'horizontal'].forEach((direction) => {
          test(`should combine direction="${direction}" with wrap={${wrap}}`, async ({ mount }) => {
            const component = await mount(
              <Stack direction={direction as 'vertical' | 'horizontal'} wrap={wrap}>
                <div>Item</div>
              </Stack>
            );
            await expect(component).toHaveClass(new RegExp(`direction-${direction}`));
            await expect(component).toHaveClass(wrap ? /wrap-wrap/ : /wrap-nowrap/);
          });
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
        <Stack
          onClick={() => {
            clicked = true;
          }}
        >
          <div>Clickable stack</div>
        </Stack>
      );

      await component.click();
      expect(clicked).toBe(true);
    });

    test('should be focusable with tabIndex', async ({ mount }) => {
      const component = await mount(
        <Stack tabIndex={0}>
          <div>Focusable stack</div>
        </Stack>
      );

      await component.focus();
      await expect(component).toBeFocused();
    });

    test('should handle keyboard events', async ({ mount }) => {
      let keyPressed = false;
      const component = await mount(
        <Stack
          tabIndex={0}
          onKeyDown={() => {
            keyPressed = true;
          }}
        >
          <div>Keyboard stack</div>
        </Stack>
      );

      await component.focus();
      await component.press('Enter');
      expect(keyPressed).toBe(true);
    });

    test('should handle mouse events', async ({ mount }) => {
      let hovered = false;
      const component = await mount(
        <Stack
          onMouseEnter={() => {
            hovered = true;
          }}
        >
          <div>Hover stack</div>
        </Stack>
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
        <Stack>
          <div>Accessible stack</div>
        </Stack>
      );
      const accessibilityScanResults = await new AxeBuilder({ page })
        .disableRules(['page-has-heading-one', 'landmark-one-main', 'region'])
        .analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should use semantic HTML for better accessibility', async ({ mount }) => {
      const component = await mount(
        <Stack as="main">
          <Stack as="article">
            <Stack as="header">
              <div>Header</div>
            </Stack>
            <div>Content</div>
            <Stack as="footer">
              <div>Footer</div>
            </Stack>
          </Stack>
        </Stack>
      );

      await expect(component).toContainText('Header');
      await expect(component).toContainText('Content');
      await expect(component).toContainText('Footer');
    });

    test('should support ARIA attributes', async ({ mount }) => {
      const component = await mount(
        <Stack role="list" aria-label="Test list">
          <div>Item 1</div>
          <div>Item 2</div>
        </Stack>
      );

      await expect(component).toHaveAttribute('role', 'list');
      await expect(component).toHaveAttribute('aria-label', 'Test list');
    });

    test('should support tabIndex for keyboard navigation', async ({ mount }) => {
      const component = await mount(
        <Stack tabIndex={0}>
          <div>Focusable stack</div>
        </Stack>
      );

      await component.focus();
      await expect(component).toBeFocused();
    });

    test('should combine semantic elements with ARIA attributes', async ({ mount }) => {
      const component = await mount(
        <Stack as="nav" role="navigation" aria-label="Main navigation">
          <Stack as="ul">
            <div role="listitem">Item 1</div>
            <div role="listitem">Item 2</div>
          </Stack>
        </Stack>
      );

      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('nav');

      await expect(component).toHaveAttribute('role', 'navigation');
      await expect(component).toHaveAttribute('aria-label', 'Main navigation');
    });

    test('should have accessible structure for navigation', async ({ mount }) => {
      const component = await mount(
        <Stack as="nav" role="navigation" aria-label="Test navigation">
          <div>Home</div>
          <div>About</div>
          <div>Contact</div>
        </Stack>
      );

      await expect(component).toMatchAriaSnapshot(`
        - navigation "Test navigation": Home About Contact
      `);
    });
  });

  // ============================================
  // TEST SUITE: Visual Regression
  // ============================================

  test.describe('Visual Regression', () => {
    test('should match snapshot for all variants in light mode', async ({ mount }) => {
      const directionValues = ['vertical', 'horizontal'] as const;
      const spacingValues = ['none', 'tight', 'compact', 'default', 'comfortable', 'spacious'] as const;
      const alignValues = ['start', 'center', 'end', 'stretch', 'baseline'] as const;
      const justifyValues = ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'] as const;

      const component = await mount(
        <div
          style={{
            padding: '32px',
            background: '#ffffff',
            width: '900px',
          }}
        >
          <h1
            style={{
              marginBottom: '24px',
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            Stack Component - All Variants
          </h1>

          {/* Section 1: Direction Values */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: '#555',
              }}
            >
              Direction Values
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {directionValues.map((value) => (
                <div key={value}>
                  <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#666' }}>
                    direction=&quot;{value}&quot;
                  </div>
                  <Stack direction={value} spacing="default">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        style={{
                          padding: '12px',
                          background: '#6366f1',
                          color: 'white',
                          borderRadius: '6px',
                          fontWeight: '600',
                          minWidth: '80px',
                          textAlign: 'center',
                        }}
                      >
                        Item {i}
                      </div>
                    ))}
                  </Stack>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Spacing Values */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: '#555',
              }}
            >
              Spacing Values
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px',
              }}
            >
              {spacingValues.map((value) => (
                <div key={value}>
                  <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#666' }}>
                    spacing=&quot;{value}&quot;
                  </div>
                  <Stack spacing={value}>
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        style={{
                          padding: '8px',
                          background: '#8b5cf6',
                          color: 'white',
                          borderRadius: '4px',
                          textAlign: 'center',
                          fontSize: '13px',
                        }}
                      >
                        {i}
                      </div>
                    ))}
                  </Stack>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Align Values (horizontal direction) */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: '#555',
              }}
            >
              Align Values (horizontal direction)
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {alignValues.map((value) => (
                <div key={value}>
                  <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#666' }}>
                    align=&quot;{value}&quot;
                  </div>
                  <div style={{ border: '2px dashed #ccc', padding: '8px', borderRadius: '4px' }}>
                    <Stack direction="horizontal" align={value} spacing="default">
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
                    </Stack>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Justify Values (horizontal direction) */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: '#555',
              }}
            >
              Justify Values (horizontal direction)
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {justifyValues.map((value) => (
                <div key={value}>
                  <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#666' }}>
                    justify=&quot;{value}&quot;
                  </div>
                  <div style={{ border: '2px dashed #ccc', padding: '8px', borderRadius: '4px' }}>
                    <Stack
                      direction="horizontal"
                      justify={value}
                      spacing={value.startsWith('space') ? 'none' : 'default'}
                    >
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
                          {i}
                        </div>
                      ))}
                    </Stack>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Wrap Example */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: '#555',
              }}
            >
              Wrap Example
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#666' }}>
                  wrap={'{false}'} (default)
                </div>
                <div style={{ border: '2px dashed #ccc', padding: '8px', borderRadius: '4px', width: '100%' }}>
                  <Stack direction="horizontal" wrap={false} spacing="default">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div
                        key={i}
                        style={{
                          padding: '12px 16px',
                          background: '#06b6d4',
                          color: 'white',
                          borderRadius: '6px',
                          fontWeight: '600',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Item {i}
                      </div>
                    ))}
                  </Stack>
                </div>
              </div>
              <div>
                <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#666' }}>
                  wrap={'{true}'}
                </div>
                <div style={{ border: '2px dashed #ccc', padding: '8px', borderRadius: '4px', width: '100%' }}>
                  <Stack direction="horizontal" wrap spacing="default">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div
                        key={i}
                        style={{
                          padding: '12px 16px',
                          background: '#06b6d4',
                          color: 'white',
                          borderRadius: '6px',
                          fontWeight: '600',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Item {i}
                      </div>
                    ))}
                  </Stack>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Composition Example */}
          <section>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: '#555',
              }}
            >
              Composition Example (Form Layout)
            </h2>
            <Stack spacing="comfortable">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600' }}>Name</label>
                <div
                  style={{
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                    background: '#f9fafb',
                  }}
                >
                  Input field
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600' }}>Email</label>
                <div
                  style={{
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                    background: '#f9fafb',
                  }}
                >
                  Input field
                </div>
              </div>
              <Stack direction="horizontal" spacing="compact" justify="end">
                <div
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                    background: 'white',
                    fontWeight: '600',
                  }}
                >
                  Cancel
                </div>
                <div
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    background: '#6366f1',
                    color: 'white',
                    fontWeight: '600',
                  }}
                >
                  Submit
                </div>
              </Stack>
            </Stack>
          </section>
        </div>
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('stack-all-variants-light.png');
    });

    test('should match snapshot for all variants in dark mode', async ({ mount, page }) => {
      // Set dark mode on document root BEFORE mounting
      await page.evaluate(() => document.documentElement.setAttribute('data-mode', 'dark'));

      const directionValues = ['vertical', 'horizontal'] as const;
      const spacingValues = ['none', 'tight', 'compact', 'default', 'comfortable', 'spacious'] as const;
      const alignValues = ['start', 'center', 'end', 'stretch', 'baseline'] as const;

      const component = await mount(
        <div
          style={{
            padding: '32px',
            width: '900px',
            background: 'var(--lufa-token-color-background-page)',
          }}
        >
          <h1
            style={{
              marginBottom: '24px',
              fontSize: '28px',
              fontWeight: 'bold',
              color: 'var(--lufa-token-color-text-primary)',
            }}
          >
            Stack Component - All Variants (Dark Mode)
          </h1>

          {/* Section 1: Direction Values */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Direction Values
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {directionValues.map((value) => (
                <div key={value}>
                  <div
                    style={{
                      marginBottom: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: 'var(--lufa-token-color-text-tertiary)',
                    }}
                  >
                    direction=&quot;{value}&quot;
                  </div>
                  <Stack direction={value} spacing="default">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        style={{
                          padding: '12px',
                          background: '#6366f1',
                          color: 'white',
                          borderRadius: '6px',
                          fontWeight: '600',
                          minWidth: '80px',
                          textAlign: 'center',
                        }}
                      >
                        Item {i}
                      </div>
                    ))}
                  </Stack>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Spacing Values */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Spacing Values
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
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
                      color: 'var(--lufa-token-color-text-tertiary)',
                    }}
                  >
                    spacing=&quot;{value}&quot;
                  </div>
                  <Stack spacing={value}>
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        style={{
                          padding: '8px',
                          background: '#8b5cf6',
                          color: 'white',
                          borderRadius: '4px',
                          textAlign: 'center',
                          fontSize: '13px',
                        }}
                      >
                        {i}
                      </div>
                    ))}
                  </Stack>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Align Values */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Align Values (horizontal direction)
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {alignValues.map((value) => (
                <div key={value}>
                  <div
                    style={{
                      marginBottom: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: 'var(--lufa-token-color-text-tertiary)',
                    }}
                  >
                    align=&quot;{value}&quot;
                  </div>
                  <div
                    style={{
                      border: '2px dashed var(--lufa-token-color-border-default)',
                      padding: '8px',
                      borderRadius: '4px',
                    }}
                  >
                    <Stack direction="horizontal" align={value} spacing="default">
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
                    </Stack>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Composition Example */}
          <section>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Composition Example (Form Layout)
            </h2>
            <Stack spacing="comfortable">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600' }}>Name</label>
                <div
                  style={{
                    padding: '8px',
                    border: '1px solid var(--lufa-token-color-border-default)',
                    borderRadius: '6px',
                    background: 'var(--lufa-token-color-background-surface)',
                  }}
                >
                  Input field
                </div>
              </div>
              <Stack direction="horizontal" spacing="compact" justify="end">
                <div
                  style={{
                    padding: '8px 16px',
                    border: '1px solid var(--lufa-token-color-border-default)',
                    borderRadius: '6px',
                    background: 'var(--lufa-token-color-background-surface)',
                    fontWeight: '600',
                  }}
                >
                  Cancel
                </div>
                <div
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    background: '#6366f1',
                    color: 'white',
                    fontWeight: '600',
                  }}
                >
                  Submit
                </div>
              </Stack>
            </Stack>
          </section>
        </div>
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('stack-all-variants-dark.png');

      // Clean up: remove dark mode to avoid affecting other tests
      await page.evaluate(() => document.documentElement.removeAttribute('data-mode'));
    });
  });
});
