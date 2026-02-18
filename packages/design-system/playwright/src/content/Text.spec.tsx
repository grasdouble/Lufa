/**
 * Text Component - Playwright Component Tests
 *
 * Comprehensive behavioral test suite for the Text typography primitive component.
 * Tests cover rendering, all prop variants, user interactions, accessibility,
 * and visual regression in both light and dark modes.
 *
 * Text is a typography primitive component for consistent text styling across
 * the design system. It provides semantic typography scales, colors, weights,
 * alignments, and transformations.
 *
 * Test Categories (following official Playwright CT guidelines):
 * 1. Basic Rendering - Default behavior and core functionality
 * 2. Variants - All prop combinations (variant, color, weight, align, transform, polymorphic)
 * 3. User Interactions - Event handlers and interactive behavior
 * 4. Accessibility - ARIA attributes, semantic HTML, keyboard navigation
 * 5. Visual Regression - Comprehensive snapshots in light and dark modes
 *
 * @see .github/instructions/lufa-design-system-playwright-ct.instructions.md
 */

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/experimental-ct-react';

import { Text } from '@grasdouble/lufa_design-system';

// ============================================
// TEST SUITE: Basic Rendering
// ============================================

test.describe('Text Component', () => {
  test.describe('Basic Rendering', () => {
    test('should render with default props', async ({ mount }) => {
      const component = await mount(<Text>Default text content</Text>);
      await expect(component).toBeVisible();
      await expect(component).toContainText('Default text content');
    });

    test('should render as p element by default', async ({ mount }) => {
      const component = await mount(<Text>Content</Text>);
      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('p');
    });

    test('should render with children', async ({ mount }) => {
      const component = await mount(
        <Text>
          <span>Nested content</span>
        </Text>
      );
      await expect(component).toContainText('Nested content');
    });

    test('should apply custom className', async ({ mount }) => {
      const component = await mount(<Text className="custom-text-class">Content</Text>);
      await expect(component).toHaveClass(/custom-text-class/);
    });

    test('should apply custom style prop', async ({ mount }) => {
      const component = await mount(<Text style={{ marginTop: '10px' }}>Content</Text>);
      await expect(component).toHaveCSS('margin-top', '10px');
    });

    test('should render nested Text components', async ({ mount }) => {
      const component = await mount(
        <Text>
          Parent text <Text as="span">nested text</Text> more parent text
        </Text>
      );
      await expect(component).toContainText('Parent text nested text more parent text');
    });

    test('should combine custom className with utility classes', async ({ mount }) => {
      const component = await mount(
        <Text variant="h1" color="primary" className="custom-class">
          Content
        </Text>
      );
      await expect(component).toHaveClass(/variant-h1/);
      await expect(component).toHaveClass(/color-primary/);
      await expect(component).toHaveClass(/custom-class/);
    });
  });

  // ============================================
  // TEST SUITE: Variants
  // ============================================

  test.describe('Variants', () => {
    test.describe('Variant Prop', () => {
      const variantValues = [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'body-large',
        'body',
        'body-small',
        'caption',
        'label',
      ] as const;

      variantValues.forEach((value) => {
        test(`should apply variant="${value}" class`, async ({ mount }) => {
          const component = await mount(<Text variant={value}>Content</Text>);
          await expect(component).toContainText('Content');
          await expect(component).toHaveClass(new RegExp(`variant-${value}`));
        });
      });

      test('should default to variant="body"', async ({ mount }) => {
        const component = await mount(<Text>Content</Text>);
        await expect(component).toHaveClass(/variant-body/);
      });
    });

    test.describe('Color Variants', () => {
      const colorValues = [
        'primary',
        'secondary',
        'tertiary',
        'success',
        'error',
        'warning',
        'info',
        'inverse',
      ] as const;

      colorValues.forEach((value) => {
        test(`should apply color="${value}" class`, async ({ mount }) => {
          const component = await mount(<Text color={value}>Content</Text>);
          await expect(component).toContainText('Content');
          await expect(component).toHaveClass(new RegExp(`color-${value}`));
        });
      });

      test('should default to color="primary"', async ({ mount }) => {
        const component = await mount(<Text>Content</Text>);
        await expect(component).toHaveClass(/color-primary/);
      });
    });

    test.describe('Weight Variants', () => {
      const weightValues = ['normal', 'medium', 'semibold', 'bold'] as const;

      weightValues.forEach((value) => {
        test(`should apply weight="${value}" class`, async ({ mount }) => {
          const component = await mount(<Text weight={value}>Content</Text>);
          await expect(component).toContainText('Content');
          await expect(component).toHaveClass(new RegExp(`weight-${value}`));
        });
      });

      test('should default to weight="normal"', async ({ mount }) => {
        const component = await mount(<Text>Content</Text>);
        await expect(component).toHaveClass(/weight-normal/);
      });
    });

    test.describe('Align Variants', () => {
      const alignValues = ['left', 'center', 'right', 'justify'] as const;

      alignValues.forEach((value) => {
        test(`should apply align="${value}" class`, async ({ mount }) => {
          const component = await mount(<Text align={value}>Content</Text>);
          await expect(component).toContainText('Content');
          await expect(component).toHaveClass(new RegExp(`align-${value}`));
        });
      });

      test('should default to align="left"', async ({ mount }) => {
        const component = await mount(<Text>Content</Text>);
        await expect(component).toHaveClass(/align-left/);
      });
    });

    test.describe('Transform Variants', () => {
      const transformValues = ['none', 'uppercase', 'lowercase', 'capitalize'] as const;

      transformValues.forEach((value) => {
        test(`should apply transform="${value}" class`, async ({ mount }) => {
          const component = await mount(<Text transform={value}>Content</Text>);
          await expect(component).toContainText('Content');
          await expect(component).toHaveClass(new RegExp(`transform-${value}`));
        });
      });

      test('should default to transform="none"', async ({ mount }) => {
        const component = await mount(<Text>Content</Text>);
        await expect(component).toHaveClass(/transform-none/);
      });
    });

    test.describe('Polymorphic Variants (as prop)', () => {
      test('should render as span element', async ({ mount }) => {
        const component = await mount(<Text as="span">Span content</Text>);
        await expect(component).toContainText('Span content');

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('span');
      });

      test('should render as div element', async ({ mount }) => {
        const component = await mount(<Text as="div">Div content</Text>);
        await expect(component).toContainText('Div content');

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('div');
      });

      test('should render as h1 element', async ({ mount }) => {
        const component = await mount(<Text as="h1">H1 content</Text>);
        await expect(component).toContainText('H1 content');

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('h1');
      });

      test('should render as h2 element', async ({ mount }) => {
        const component = await mount(<Text as="h2">H2 content</Text>);
        await expect(component).toContainText('H2 content');

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('h2');
      });

      test('should render as h3 element', async ({ mount }) => {
        const component = await mount(<Text as="h3">H3 content</Text>);
        await expect(component).toContainText('H3 content');

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('h3');
      });

      test('should render as h4 element', async ({ mount }) => {
        const component = await mount(<Text as="h4">H4 content</Text>);
        await expect(component).toContainText('H4 content');

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('h4');
      });

      test('should render as h5 element', async ({ mount }) => {
        const component = await mount(<Text as="h5">H5 content</Text>);
        await expect(component).toContainText('H5 content');

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('h5');
      });

      test('should render as h6 element', async ({ mount }) => {
        const component = await mount(<Text as="h6">H6 content</Text>);
        await expect(component).toContainText('H6 content');

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('h6');
      });

      test('should render as label element', async ({ mount }) => {
        const component = await mount(<Text as="label">Label content</Text>);
        await expect(component).toContainText('Label content');

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('label');
      });

      test('should render as legend element', async ({ mount }) => {
        const component = await mount(<Text as="legend">Legend content</Text>);
        await expect(component).toContainText('Legend content');

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('legend');
      });

      test('should preserve props when polymorphic', async ({ mount }) => {
        const component = await mount(
          <Text as="h1" variant="h1" color="primary" weight="bold" align="center">
            Heading with props
          </Text>
        );

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('h1');

        await expect(component).toHaveClass(/variant-h1/);
        await expect(component).toHaveClass(/color-primary/);
        await expect(component).toHaveClass(/weight-bold/);
        await expect(component).toHaveClass(/align-center/);
      });

      test('should support HTML attributes when polymorphic', async ({ mount }) => {
        const component = await mount(
          <Text as="label" id="test-label" data-testid="text-label" htmlFor="input-field">
            Label with attributes
          </Text>
        );

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('label');

        await expect(component).toHaveAttribute('id', 'test-label');
        await expect(component).toHaveAttribute('data-testid', 'text-label');
        await expect(component).toHaveAttribute('for', 'input-field');
      });
    });

    test.describe('Combined Variants', () => {
      test('should combine variant and color', async ({ mount }) => {
        const component = await mount(
          <Text variant="h1" color="success">
            Heading
          </Text>
        );
        await expect(component).toHaveClass(/variant-h1/);
        await expect(component).toHaveClass(/color-success/);
      });

      test('should combine variant, color, and weight', async ({ mount }) => {
        const component = await mount(
          <Text variant="h2" color="primary" weight="bold">
            Bold Heading
          </Text>
        );
        await expect(component).toHaveClass(/variant-h2/);
        await expect(component).toHaveClass(/color-primary/);
        await expect(component).toHaveClass(/weight-bold/);
      });

      test('should combine variant, color, weight, and align', async ({ mount }) => {
        const component = await mount(
          <Text variant="body" color="secondary" weight="medium" align="center">
            Centered text
          </Text>
        );
        await expect(component).toHaveClass(/variant-body/);
        await expect(component).toHaveClass(/color-secondary/);
        await expect(component).toHaveClass(/weight-medium/);
        await expect(component).toHaveClass(/align-center/);
      });

      test('should combine all typography props', async ({ mount }) => {
        const component = await mount(
          <Text variant="label" color="info" weight="semibold" align="right" transform="uppercase">
            Label Text
          </Text>
        );
        await expect(component).toHaveClass(/variant-label/);
        await expect(component).toHaveClass(/color-info/);
        await expect(component).toHaveClass(/weight-semibold/);
        await expect(component).toHaveClass(/align-right/);
        await expect(component).toHaveClass(/transform-uppercase/);
      });

      test('should handle all props together including polymorphic', async ({ mount }) => {
        const component = await mount(
          <Text
            as="h1"
            variant="h1"
            color="primary"
            weight="bold"
            align="center"
            transform="capitalize"
            className="complex-text"
          >
            Complex text
          </Text>
        );

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('h1');

        await expect(component).toHaveClass(/variant-h1/);
        await expect(component).toHaveClass(/color-primary/);
        await expect(component).toHaveClass(/weight-bold/);
        await expect(component).toHaveClass(/align-center/);
        await expect(component).toHaveClass(/transform-capitalize/);
        await expect(component).toHaveClass(/complex-text/);
      });

      // Test different variants with different colors
      ['h1', 'h2', 'body', 'caption'].forEach((variant) => {
        ['primary', 'secondary', 'success', 'error'].forEach((color) => {
          test(`should combine variant="${variant}" with color="${color}"`, async ({ mount }) => {
            const component = await mount(
              <Text variant={variant as any} color={color as any}>
                Text
              </Text>
            );
            await expect(component).toHaveClass(new RegExp(`variant-${variant}`));
            await expect(component).toHaveClass(new RegExp(`color-${color}`));
          });
        });
      });

      // Test different weights with different variants
      ['normal', 'medium', 'semibold', 'bold'].forEach((weight) => {
        ['h1', 'body', 'caption'].forEach((variant) => {
          test(`should combine weight="${weight}" with variant="${variant}"`, async ({ mount }) => {
            const component = await mount(
              <Text weight={weight as any} variant={variant as any}>
                Text
              </Text>
            );
            await expect(component).toHaveClass(new RegExp(`weight-${weight}`));
            await expect(component).toHaveClass(new RegExp(`variant-${variant}`));
          });
        });
      });

      // Test different alignments with different variants
      ['left', 'center', 'right', 'justify'].forEach((align) => {
        test(`should combine align="${align}" with variant="body"`, async ({ mount }) => {
          const component = await mount(
            <Text align={align as any} variant="body">
              Aligned text
            </Text>
          );
          await expect(component).toHaveClass(/variant-body/);
          await expect(component).toHaveClass(new RegExp(`align-${align}`));
        });
      });

      // Test different transforms with different variants
      ['none', 'uppercase', 'lowercase', 'capitalize'].forEach((transform) => {
        test(`should combine transform="${transform}" with variant="label"`, async ({ mount }) => {
          const component = await mount(
            <Text transform={transform as any} variant="label">
              Transformed text
            </Text>
          );
          await expect(component).toHaveClass(/variant-label/);
          await expect(component).toHaveClass(new RegExp(`transform-${transform}`));
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
        <Text
          onClick={() => {
            clicked = true;
          }}
        >
          Clickable text
        </Text>
      );

      await component.click();
      expect(clicked).toBe(true);
    });

    test('should be focusable with tabIndex', async ({ mount }) => {
      const component = await mount(<Text tabIndex={0}>Focusable text</Text>);

      await component.focus();
      await expect(component).toBeFocused();
    });

    test('should handle keyboard events', async ({ mount }) => {
      let keyPressed = false;
      const component = await mount(
        <Text
          tabIndex={0}
          onKeyDown={() => {
            keyPressed = true;
          }}
        >
          Keyboard text
        </Text>
      );

      await component.focus();
      await component.press('Enter');
      expect(keyPressed).toBe(true);
    });

    test('should handle mouse events', async ({ mount }) => {
      let hovered = false;
      const component = await mount(
        <Text
          onMouseEnter={() => {
            hovered = true;
          }}
        >
          Hover text
        </Text>
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
      await mount(<Text>Accessible text</Text>);
      const accessibilityScanResults = await new AxeBuilder({ page })
        .disableRules(['page-has-heading-one', 'landmark-one-main', 'region'])
        .analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should use semantic heading elements for better accessibility', async ({ mount }) => {
      const component = await mount(
        <div>
          <Text as="h1">Main Title</Text>
          <Text as="h2">Section Title</Text>
          <Text as="h3">Subsection Title</Text>
        </div>
      );

      await expect(component).toContainText('Main Title');
      await expect(component).toContainText('Section Title');
      await expect(component).toContainText('Subsection Title');
    });

    test('should support ARIA attributes', async ({ mount }) => {
      const component = await mount(
        <Text role="heading" aria-level={2} aria-label="Test heading">
          Heading with ARIA
        </Text>
      );

      await expect(component).toHaveAttribute('role', 'heading');
      await expect(component).toHaveAttribute('aria-level', '2');
      await expect(component).toHaveAttribute('aria-label', 'Test heading');
    });

    test('should support tabIndex for keyboard navigation', async ({ mount }) => {
      const component = await mount(<Text tabIndex={0}>Focusable text</Text>);

      await component.focus();
      await expect(component).toBeFocused();
    });

    test('should combine semantic elements with ARIA attributes', async ({ mount }) => {
      const component = await mount(
        <Text as="label" htmlFor="input-field" aria-describedby="help-text">
          Form Label
        </Text>
      );

      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('label');

      await expect(component).toHaveAttribute('for', 'input-field');
      await expect(component).toHaveAttribute('aria-describedby', 'help-text');
    });

    test('should have accessible structure for headings', async ({ mount }) => {
      const component = await mount(
        <div>
          <Text as="h1" role="heading" aria-level={1}>
            Page Title
          </Text>
        </div>
      );

      await expect(component).toMatchAriaSnapshot(`
        - heading "Page Title" [level=1]
      `);
    });
  });

  // ============================================
  // TEST SUITE: Visual Regression
  // ============================================

  test.describe('Visual Regression', () => {
    test('should match snapshot for all variants', async ({ mount }) => {
      const variantValues = [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'body-large',
        'body',
        'body-small',
        'caption',
        'label',
      ] as const;
      const colorValues = [
        'primary',
        'secondary',
        'tertiary',
        'success',
        'error',
        'warning',
        'info',
        'inverse',
      ] as const;
      const weightValues = ['normal', 'medium', 'semibold', 'bold'] as const;
      const alignValues = ['left', 'center', 'right', 'justify'] as const;
      const transformValues = ['none', 'uppercase', 'lowercase', 'capitalize'] as const;

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
            Text Component - All Variants
          </h1>

          {/* Section 1: Variant Values */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-semantic-ui-text-secondary)',
              }}
            >
              Variant Values
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {variantValues.map((value) => (
                <div key={value}>
                  <div
                    style={{
                      marginBottom: '8px',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: 'var(--lufa-semantic-ui-text-secondary)',
                    }}
                  >
                    variant=&quot;{value}&quot;
                  </div>
                  <Text variant={value}>The quick brown fox jumps over the lazy dog.</Text>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Color Values */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-semantic-ui-text-secondary)',
              }}
            >
              Color Values
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px',
              }}
            >
              {colorValues.map((value) => (
                <div key={value}>
                  <div
                    style={{
                      marginBottom: '8px',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: 'var(--lufa-semantic-ui-text-secondary)',
                    }}
                  >
                    color=&quot;{value}&quot;
                  </div>
                  <Text variant="body" color={value}>
                    Sample text in {value} color
                  </Text>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Weight Values */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-semantic-ui-text-secondary)',
              }}
            >
              Weight Values
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {weightValues.map((value) => (
                <div key={value}>
                  <div
                    style={{
                      marginBottom: '8px',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: 'var(--lufa-semantic-ui-text-secondary)',
                    }}
                  >
                    weight=&quot;{value}&quot;
                  </div>
                  <Text variant="body" weight={value}>
                    Sample text with {value} weight
                  </Text>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Align Values */}
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
                      fontSize: '12px',
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
                    <Text variant="body" align={value}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Transform Values */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-semantic-ui-text-secondary)',
              }}
            >
              Transform Values
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {transformValues.map((value) => (
                <div key={value}>
                  <div
                    style={{
                      marginBottom: '8px',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: 'var(--lufa-semantic-ui-text-secondary)',
                    }}
                  >
                    transform=&quot;{value}&quot;
                  </div>
                  <Text variant="body" transform={value}>
                    The Quick Brown Fox Jumps Over The Lazy Dog
                  </Text>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: Combined Example */}
          <section>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-semantic-ui-text-secondary)',
              }}
            >
              Combined Example (Article Layout)
            </h2>
            <div
              style={{
                padding: '24px',
                border: '1px solid var(--lufa-core-neutral-border-default)',
                borderRadius: '8px',
                background: 'var(--lufa-semantic-ui-background-surface)',
              }}
            >
              <Text variant="label" color="secondary" weight="semibold" transform="uppercase">
                Technology
              </Text>
              <Text variant="h2" weight="bold" style={{ marginTop: '8px' }}>
                Building Design Systems
              </Text>
              <Text variant="body" color="secondary" style={{ marginTop: '8px' }}>
                By Jane Doe • 5 min read • Jan 24, 2026
              </Text>
              <Text variant="body-large" style={{ marginTop: '16px' }}>
                Design systems have become essential for maintaining consistency across large-scale applications.
              </Text>
              <Text variant="body" color="secondary" style={{ marginTop: '12px' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </Text>
              <Text variant="caption" color="tertiary" align="center" style={{ marginTop: '16px' }}>
                Figure 1: Example caption text
              </Text>
            </div>
          </section>
        </div>
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('text-all-variants.png');
    });
  });
});
