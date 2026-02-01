/**
 * Box Component - Playwright Component Tests
 *
 * Comprehensive behavioral test suite for the Box primitive component.
 * Tests cover rendering, all prop variants, user interactions, accessibility,
 * and visual regression in both light and dark modes.
 *
 * Box is a foundational primitive component providing spacing, layout, and styling utilities.
 * It serves as the base for most other components in the design system.
 *
 * Test Categories (following official Playwright CT guidelines):
 * 1. Basic Rendering - Default behavior and core functionality
 * 2. Variants - All prop combinations (padding, margin, background, border, display)
 * 3. User Interactions - Event handlers and interactive behavior
 * 4. Accessibility - ARIA attributes, semantic HTML, keyboard navigation
 * 5. Visual Regression - Comprehensive snapshots in light and dark modes
 *
 * @see .github/instructions/lufa-design-system-playwright-ct.instructions.md
 */

import { expect, test } from '@playwright/experimental-ct-react';
import AxeBuilder from '@axe-core/playwright';

import { Box } from '@grasdouble/lufa_design-system';

// ============================================
// TEST SUITE: Basic Rendering
// ============================================

test.describe('Box Component', () => {
  test.describe('Basic Rendering', () => {
    test('should render with default props', async ({ mount }) => {
      const component = await mount(<Box>Default content</Box>);
      await expect(component).toBeVisible();
      await expect(component).toContainText('Default content');
    });

    test('should render as div element by default', async ({ mount }) => {
      const component = await mount(<Box>Default div</Box>);
      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('div');
    });

    test('should render with children', async ({ mount }) => {
      const component = await mount(
        <Box>
          <span>Child 1</span>
          <span>Child 2</span>
        </Box>
      );
      await expect(component).toContainText('Child 1');
      await expect(component).toContainText('Child 2');
    });

    test('should apply custom className', async ({ mount }) => {
      const component = await mount(<Box className="custom-class">Content</Box>);
      await expect(component).toHaveClass(/custom-class/);
    });

    test('should apply custom style prop', async ({ mount }) => {
      const component = await mount(<Box style={{ margin: '10px' }}>Content</Box>);
      await expect(component).toHaveCSS('margin', '10px');
    });

    test('should render nested Boxes', async ({ mount }) => {
      const component = await mount(
        <Box padding="spacious" background="page">
          <Box padding="default" background="surface">
            <Box padding="compact" background="on-primary">
              Nested content
            </Box>
          </Box>
        </Box>
      );
      await expect(component).toContainText('Nested content');
    });

    test('should combine custom className with utility classes', async ({ mount }) => {
      const component = await mount(
        <Box padding="default" background="surface" className="custom-class">
          Combined classes
        </Box>
      );
      await expect(component).toHaveClass(/padding-default/);
      await expect(component).toHaveClass(/background-surface/);
      await expect(component).toHaveClass(/custom-class/);
    });
  });

  // ============================================
  // TEST SUITE: Variants
  // ============================================

  test.describe('Variants', () => {
    test.describe('Padding Variants', () => {
      test.describe('padding (all sides)', () => {
        const paddingValues = ['none', 'tight', 'compact', 'default', 'comfortable', 'spacious'] as const;

        paddingValues.forEach((value) => {
          test(`should apply padding="${value}" class`, async ({ mount }) => {
            const component = await mount(<Box padding={value}>Content</Box>);
            await expect(component).toContainText('Content');
            await expect(component).toHaveClass(new RegExp(`padding-${value}`));
          });
        });
      });

      test.describe('paddingX (horizontal)', () => {
        const paddingValues = ['none', 'tight', 'compact', 'default', 'comfortable', 'spacious'] as const;

        paddingValues.forEach((value) => {
          test(`should apply paddingX="${value}" class`, async ({ mount }) => {
            const component = await mount(<Box paddingX={value}>Content</Box>);
            await expect(component).toContainText('Content');
            await expect(component).toHaveClass(new RegExp(`paddingX-${value}`));
          });
        });
      });

      test.describe('paddingY (vertical)', () => {
        const paddingValues = ['none', 'tight', 'compact', 'default', 'comfortable', 'spacious'] as const;

        paddingValues.forEach((value) => {
          test(`should apply paddingY="${value}" class`, async ({ mount }) => {
            const component = await mount(<Box paddingY={value}>Content</Box>);
            await expect(component).toContainText('Content');
            await expect(component).toHaveClass(new RegExp(`paddingY-${value}`));
          });
        });
      });

      test.describe('paddingTop', () => {
        test('should apply paddingTop="spacious" class', async ({ mount }) => {
          const component = await mount(<Box paddingTop="spacious">Content</Box>);
          await expect(component).toHaveClass(/paddingTop-spacious/);
        });

        test('should apply paddingTop="tight" class', async ({ mount }) => {
          const component = await mount(<Box paddingTop="tight">Content</Box>);
          await expect(component).toHaveClass(/paddingTop-tight/);
        });
      });

      test.describe('paddingRight', () => {
        test('should apply paddingRight="spacious" class', async ({ mount }) => {
          const component = await mount(<Box paddingRight="spacious">Content</Box>);
          await expect(component).toHaveClass(/paddingRight-spacious/);
        });

        test('should apply paddingRight="tight" class', async ({ mount }) => {
          const component = await mount(<Box paddingRight="tight">Content</Box>);
          await expect(component).toHaveClass(/paddingRight-tight/);
        });
      });

      test.describe('paddingBottom', () => {
        test('should apply paddingBottom="spacious" class', async ({ mount }) => {
          const component = await mount(<Box paddingBottom="spacious">Content</Box>);
          await expect(component).toHaveClass(/paddingBottom-spacious/);
        });

        test('should apply paddingBottom="tight" class', async ({ mount }) => {
          const component = await mount(<Box paddingBottom="tight">Content</Box>);
          await expect(component).toHaveClass(/paddingBottom-tight/);
        });
      });

      test.describe('paddingLeft', () => {
        test('should apply paddingLeft="spacious" class', async ({ mount }) => {
          const component = await mount(<Box paddingLeft="spacious">Content</Box>);
          await expect(component).toHaveClass(/paddingLeft-spacious/);
        });

        test('should apply paddingLeft="tight" class', async ({ mount }) => {
          const component = await mount(<Box paddingLeft="tight">Content</Box>);
          await expect(component).toHaveClass(/paddingLeft-tight/);
        });
      });

      test.describe('combined padding props', () => {
        test('should apply multiple padding props together', async ({ mount }) => {
          const component = await mount(
            <Box paddingTop="spacious" paddingBottom="tight" paddingX="default">
              Combined padding
            </Box>
          );
          await expect(component).toHaveClass(/paddingTop-spacious/);
          await expect(component).toHaveClass(/paddingBottom-tight/);
          await expect(component).toHaveClass(/paddingX-default/);
        });
      });
    });

    test.describe('Margin Variants', () => {
      test.describe('margin (all sides)', () => {
        const marginValues = ['none', 'tight', 'compact', 'default', 'comfortable', 'spacious'] as const;

        marginValues.forEach((value) => {
          test(`should apply margin="${value}" class`, async ({ mount }) => {
            const component = await mount(<Box margin={value}>Content</Box>);
            await expect(component).toContainText('Content');
            await expect(component).toHaveClass(new RegExp(`margin-${value}`));
          });
        });
      });

      test.describe('marginX (horizontal)', () => {
        const marginValues = ['none', 'tight', 'compact', 'default', 'comfortable', 'spacious'] as const;

        marginValues.forEach((value) => {
          test(`should apply marginX="${value}" class`, async ({ mount }) => {
            const component = await mount(<Box marginX={value}>Content</Box>);
            await expect(component).toContainText('Content');
            await expect(component).toHaveClass(new RegExp(`marginX-${value}`));
          });
        });
      });

      test.describe('marginY (vertical)', () => {
        const marginValues = ['none', 'tight', 'compact', 'default', 'comfortable', 'spacious'] as const;

        marginValues.forEach((value) => {
          test(`should apply marginY="${value}" class`, async ({ mount }) => {
            const component = await mount(<Box marginY={value}>Content</Box>);
            await expect(component).toContainText('Content');
            await expect(component).toHaveClass(new RegExp(`marginY-${value}`));
          });
        });
      });

      test.describe('marginTop', () => {
        test('should apply marginTop="spacious" class', async ({ mount }) => {
          const component = await mount(<Box marginTop="spacious">Content</Box>);
          await expect(component).toHaveClass(/marginTop-spacious/);
        });

        test('should apply marginTop="tight" class', async ({ mount }) => {
          const component = await mount(<Box marginTop="tight">Content</Box>);
          await expect(component).toHaveClass(/marginTop-tight/);
        });
      });

      test.describe('marginRight', () => {
        test('should apply marginRight="spacious" class', async ({ mount }) => {
          const component = await mount(<Box marginRight="spacious">Content</Box>);
          await expect(component).toHaveClass(/marginRight-spacious/);
        });

        test('should apply marginRight="tight" class', async ({ mount }) => {
          const component = await mount(<Box marginRight="tight">Content</Box>);
          await expect(component).toHaveClass(/marginRight-tight/);
        });
      });

      test.describe('marginBottom', () => {
        test('should apply marginBottom="spacious" class', async ({ mount }) => {
          const component = await mount(<Box marginBottom="spacious">Content</Box>);
          await expect(component).toHaveClass(/marginBottom-spacious/);
        });

        test('should apply marginBottom="tight" class', async ({ mount }) => {
          const component = await mount(<Box marginBottom="tight">Content</Box>);
          await expect(component).toHaveClass(/marginBottom-tight/);
        });
      });

      test.describe('marginLeft', () => {
        test('should apply marginLeft="spacious" class', async ({ mount }) => {
          const component = await mount(<Box marginLeft="spacious">Content</Box>);
          await expect(component).toHaveClass(/marginLeft-spacious/);
        });

        test('should apply marginLeft="tight" class', async ({ mount }) => {
          const component = await mount(<Box marginLeft="tight">Content</Box>);
          await expect(component).toHaveClass(/marginLeft-tight/);
        });
      });

      test.describe('combined margin props', () => {
        test('should apply multiple margin props together', async ({ mount }) => {
          const component = await mount(
            <Box marginTop="spacious" marginBottom="tight" marginX="default">
              Combined margin
            </Box>
          );
          await expect(component).toHaveClass(/marginTop-spacious/);
          await expect(component).toHaveClass(/marginBottom-tight/);
          await expect(component).toHaveClass(/marginX-default/);
        });
      });
    });

    test.describe('Background Variants', () => {
      const backgroundValues = [
        'page',
        'surface',
        'success',
        'error',
        'warning',
        'info',
        'overlay',
        'on-primary',
        'on-secondary',
        'on-success',
        'on-error',
        'on-warning',
        'on-info',
      ] as const;

      backgroundValues.forEach((value) => {
        test(`should apply background="${value}" class`, async ({ mount }) => {
          const component = await mount(
            <Box background={value} padding="default">
              {value}
            </Box>
          );
          await expect(component).toContainText(value);
          await expect(component).toHaveClass(new RegExp(`background-${value}`));
        });
      });

      test('should combine background with other props', async ({ mount }) => {
        const component = await mount(
          <Box background="surface" padding="default" borderRadius="medium">
            Combined props
          </Box>
        );
        await expect(component).toHaveClass(/background-surface/);
        await expect(component).toHaveClass(/padding-default/);
        await expect(component).toHaveClass(/borderRadius-medium/);
      });
    });

    test.describe('Border Variants', () => {
      test.describe('borderRadius', () => {
        const borderRadiusValues = ['none', 'small', 'default', 'medium', 'large', 'full'] as const;

        borderRadiusValues.forEach((value) => {
          test(`should apply borderRadius="${value}" class`, async ({ mount }) => {
            const component = await mount(
              <Box borderRadius={value} padding="default" background="surface">
                {value}
              </Box>
            );
            await expect(component).toContainText(value);
            await expect(component).toHaveClass(new RegExp(`borderRadius-${value}`));
          });
        });
      });

      test.describe('borderWidth', () => {
        const borderWidthValues = ['none', 'thin', 'medium', 'thick'] as const;

        borderWidthValues.forEach((value) => {
          test(`should apply borderWidth="${value}" class`, async ({ mount }) => {
            const component = await mount(
              <Box borderWidth={value} borderColor="default" padding="default">
                {value}
              </Box>
            );
            await expect(component).toContainText(value);
            await expect(component).toHaveClass(new RegExp(`borderWidth-${value}`));
          });
        });
      });

      test.describe('borderColor', () => {
        const borderColorValues = ['default', 'strong', 'success', 'error', 'warning', 'info'] as const;

        borderColorValues.forEach((value) => {
          test(`should apply borderColor="${value}" class`, async ({ mount }) => {
            const component = await mount(
              <Box borderColor={value} borderWidth="thin" padding="default">
                {value}
              </Box>
            );
            await expect(component).toContainText(value);
            await expect(component).toHaveClass(new RegExp(`borderColor-${value}`));
          });
        });
      });

      test.describe('combined border props', () => {
        test('should apply all border props together', async ({ mount }) => {
          const component = await mount(
            <Box borderRadius="medium" borderWidth="thin" borderColor="default" padding="default">
              Card with border
            </Box>
          );
          await expect(component).toHaveClass(/borderRadius-medium/);
          await expect(component).toHaveClass(/borderWidth-thin/);
          await expect(component).toHaveClass(/borderColor-default/);
        });
      });
    });

    test.describe('Display Variants', () => {
      const displayValues = ['block', 'inline-block', 'flex', 'inline-flex', 'grid', 'none'] as const;

      displayValues.forEach((value) => {
        test(`should apply display="${value}" class`, async ({ mount }) => {
          const component = await mount(
            <Box display={value} padding="default">
              {value}
            </Box>
          );
          await expect(component).toHaveClass(new RegExp(`display-${value}`));
        });
      });

      test('should work with flex layout', async ({ mount }) => {
        const component = await mount(
          <Box display="flex" padding="default">
            <Box padding="compact">Item 1</Box>
            <Box padding="compact">Item 2</Box>
          </Box>
        );
        await expect(component).toHaveClass(/display-flex/);
        await expect(component).toContainText('Item 1');
        await expect(component).toContainText('Item 2');
      });
    });

    test.describe('Polymorphic Variants (as prop)', () => {
      test('should render as section element', async ({ mount }) => {
        const component = await mount(<Box as="section">Section content</Box>);
        await expect(component).toContainText('Section content');

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('section');
      });

      test('should render as article element', async ({ mount }) => {
        const component = await mount(<Box as="article">Article content</Box>);
        await expect(component).toContainText('Article content');

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('article');
      });

      test('should render as header element', async ({ mount }) => {
        const component = await mount(<Box as="header">Header content</Box>);
        await expect(component).toContainText('Header content');

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('header');
      });

      test('should render as footer element', async ({ mount }) => {
        const component = await mount(<Box as="footer">Footer content</Box>);
        await expect(component).toContainText('Footer content');

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('footer');
      });

      test('should render as main element', async ({ mount }) => {
        const component = await mount(<Box as="main">Main content</Box>);
        await expect(component).toContainText('Main content');

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('main');
      });

      test('should render as nav element', async ({ mount }) => {
        const component = await mount(<Box as="nav">Nav content</Box>);
        await expect(component).toContainText('Nav content');

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('nav');
      });

      test('should render as aside element', async ({ mount }) => {
        const component = await mount(<Box as="aside">Aside content</Box>);
        await expect(component).toContainText('Aside content');

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('aside');
      });

      test('should preserve props when polymorphic', async ({ mount }) => {
        const component = await mount(
          <Box as="section" padding="spacious" background="surface" borderRadius="medium">
            Section with props
          </Box>
        );

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('section');

        await expect(component).toHaveClass(/padding-spacious/);
        await expect(component).toHaveClass(/background-surface/);
        await expect(component).toHaveClass(/borderRadius-medium/);
      });

      test('should support HTML attributes when polymorphic', async ({ mount }) => {
        const component = await mount(
          <Box as="article" id="test-article" data-testid="box-article">
            Article with attributes
          </Box>
        );

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('article');

        await expect(component).toHaveAttribute('id', 'test-article');
        await expect(component).toHaveAttribute('data-testid', 'box-article');
      });
    });

    test.describe('Complex Combinations', () => {
      test('should handle all props together', async ({ mount }) => {
        const component = await mount(
          <Box
            as="section"
            padding="comfortable"
            margin="default"
            background="surface"
            borderRadius="medium"
            borderWidth="thin"
            borderColor="default"
            display="flex"
            className="complex-box"
          >
            Complex box
          </Box>
        );

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('section');

        await expect(component).toHaveClass(/padding-comfortable/);
        await expect(component).toHaveClass(/margin-default/);
        await expect(component).toHaveClass(/background-surface/);
        await expect(component).toHaveClass(/borderRadius-medium/);
        await expect(component).toHaveClass(/borderWidth-thin/);
        await expect(component).toHaveClass(/borderColor-default/);
        await expect(component).toHaveClass(/display-flex/);
        await expect(component).toHaveClass(/complex-box/);
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
        <Box
          onClick={() => {
            clicked = true;
          }}
          padding="default"
        >
          Clickable box
        </Box>
      );

      await component.click();
      expect(clicked).toBe(true);
    });

    test('should be focusable with tabIndex', async ({ mount }) => {
      const component = await mount(
        <Box tabIndex={0} padding="default">
          Focusable box
        </Box>
      );

      await component.focus();
      await expect(component).toBeFocused();
    });

    test('should handle keyboard events', async ({ mount }) => {
      let keyPressed = false;
      const component = await mount(
        <Box
          tabIndex={0}
          onKeyDown={() => {
            keyPressed = true;
          }}
          padding="default"
        >
          Keyboard box
        </Box>
      );

      await component.focus();
      await component.press('Enter');
      expect(keyPressed).toBe(true);
    });

    test('should handle mouse events', async ({ mount }) => {
      let hovered = false;
      const component = await mount(
        <Box
          onMouseEnter={() => {
            hovered = true;
          }}
          padding="default"
        >
          Hover box
        </Box>
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
      await mount(<Box>Accessible box</Box>);
      const accessibilityScanResults = await new AxeBuilder({ page })
        .disableRules(['page-has-heading-one', 'landmark-one-main', 'region'])
        .analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should use semantic HTML for better accessibility', async ({ mount }) => {
      const component = await mount(
        <Box as="main" padding="default">
          <Box as="article">
            <Box as="header">Header</Box>
            <Box>Content</Box>
            <Box as="footer">Footer</Box>
          </Box>
        </Box>
      );

      await expect(component).toContainText('Header');
      await expect(component).toContainText('Content');
      await expect(component).toContainText('Footer');
    });

    test('should support ARIA attributes', async ({ mount }) => {
      const component = await mount(
        <Box role="region" aria-label="Test region" padding="default">
          ARIA region
        </Box>
      );

      await expect(component).toHaveAttribute('role', 'region');
      await expect(component).toHaveAttribute('aria-label', 'Test region');
    });

    test('should support tabIndex for keyboard navigation', async ({ mount }) => {
      const component = await mount(
        <Box tabIndex={0} padding="default">
          Focusable box
        </Box>
      );

      await component.focus();
      await expect(component).toBeFocused();
    });

    test('should combine semantic elements with ARIA attributes', async ({ mount }) => {
      const component = await mount(
        <Box as="nav" role="navigation" aria-label="Main navigation" padding="default">
          <Box as="ul">
            <Box as="li">Item 1</Box>
            <Box as="li">Item 2</Box>
          </Box>
        </Box>
      );

      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('nav');

      await expect(component).toHaveAttribute('role', 'navigation');
      await expect(component).toHaveAttribute('aria-label', 'Main navigation');
    });

    test('should have accessible structure', async ({ mount }) => {
      const component = await mount(
        <Box as="nav" role="navigation" aria-label="Test navigation">
          Navigation content
        </Box>
      );

      await expect(component).toMatchAriaSnapshot(`
        - navigation "Test navigation":
          - text: Navigation content
      `);
    });
  });

  // ============================================
  // TEST SUITE: Visual Regression
  // ============================================

  test.describe('Visual Regression', () => {
    test('should match snapshot for all variants in light mode', async ({ mount }) => {
      const paddingValues = ['none', 'tight', 'compact', 'default', 'comfortable', 'spacious'] as const;
      const marginValues = ['none', 'tight', 'compact', 'default', 'comfortable', 'spacious'] as const;
      const backgroundValues = [
        'page',
        'surface',
        'success',
        'error',
        'warning',
        'info',
        'overlay',
        'on-primary',
        'on-secondary',
      ] as const;
      const borderRadiusValues = ['none', 'small', 'default', 'medium', 'large', 'full'] as const;
      const borderWidthValues = ['none', 'thin', 'medium', 'thick'] as const;
      const borderColorValues = ['default', 'strong', 'success', 'error', 'warning', 'info'] as const;
      const displayValues = ['block', 'inline-block', 'flex', 'inline-flex', 'grid'] as const;

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
            Box Component - All Variants
          </h1>

          {/* Section 1: Padding Values */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: '#555',
              }}
            >
              Padding Values
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
              }}
            >
              {paddingValues.map((value) => (
                <Box key={value} padding={value} background="surface" borderWidth="thin" borderColor="default">
                  {value}
                </Box>
              ))}
            </div>
          </section>

          {/* Section 2: Margin Values */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: '#555',
              }}
            >
              Margin Values
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                backgroundColor: '#f0f0f0',
                padding: '8px',
              }}
            >
              {marginValues.map((value) => (
                <Box
                  key={value}
                  margin={value}
                  padding="default"
                  background="surface"
                  borderWidth="thin"
                  borderColor="default"
                >
                  {value}
                </Box>
              ))}
            </div>
          </section>

          {/* Section 3: Background Colors */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: '#555',
              }}
            >
              Background Colors
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
              }}
            >
              {backgroundValues.map((value) => (
                <Box key={value} background={value} padding="default" borderWidth="thin" borderColor="default">
                  {value}
                </Box>
              ))}
            </div>
          </section>

          {/* Section 4: Border Radius */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: '#555',
              }}
            >
              Border Radius
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
              }}
            >
              {borderRadiusValues.map((value) => (
                <Box
                  key={value}
                  borderRadius={value}
                  padding="default"
                  background="surface"
                  borderWidth="thin"
                  borderColor="default"
                >
                  {value}
                </Box>
              ))}
            </div>
          </section>

          {/* Section 5: Border Width */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: '#555',
              }}
            >
              Border Width
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px',
              }}
            >
              {borderWidthValues.map((value) => (
                <Box key={value} borderWidth={value} borderColor="default" padding="default" background="surface">
                  {value}
                </Box>
              ))}
            </div>
          </section>

          {/* Section 6: Border Color */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: '#555',
              }}
            >
              Border Color
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
              }}
            >
              {borderColorValues.map((value) => (
                <Box key={value} borderColor={value} borderWidth="medium" padding="default" background="surface">
                  {value}
                </Box>
              ))}
            </div>
          </section>

          {/* Section 7: Display Values */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: '#555',
              }}
            >
              Display Values
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {displayValues.map((value) => (
                <div key={value}>
                  <div style={{ marginBottom: '4px', fontSize: '14px', fontWeight: '600', color: '#666' }}>
                    {value}:
                  </div>
                  <Box display={value} background="surface" padding="compact" borderWidth="thin" borderColor="default">
                    <Box padding="compact" background="info">
                      Child 1
                    </Box>
                    <Box padding="compact" background="warning">
                      Child 2
                    </Box>
                  </Box>
                </div>
              ))}
            </div>
          </section>

          {/* Section 8: Card Composition Example */}
          <section>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: '#555',
              }}
            >
              Composition Example (Card)
            </h2>
            <Box
              padding="comfortable"
              background="surface"
              borderRadius="medium"
              borderWidth="thin"
              borderColor="default"
            >
              <Box as="header" marginBottom="default">
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Card Title</h3>
              </Box>
              <Box marginBottom="default">
                <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5' }}>
                  Card content with comfortable padding and medium border radius.
                </p>
              </Box>
              <Box as="footer" display="flex">
                <Box padding="compact" background="on-primary" borderRadius="small">
                  Action 1
                </Box>
                <Box padding="compact" background="on-secondary" borderRadius="small" marginLeft="compact">
                  Action 2
                </Box>
              </Box>
            </Box>
          </section>
        </div>
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('box-all-variants-light.png');
    });

    test('should match snapshot for all variants in dark mode', async ({ mount, page }) => {
      // Set dark mode on document root BEFORE mounting
      await page.evaluate(() => document.documentElement.setAttribute('data-mode', 'dark'));

      const paddingValues = ['none', 'tight', 'compact', 'default', 'comfortable', 'spacious'] as const;
      const marginValues = ['none', 'tight', 'compact', 'default', 'comfortable', 'spacious'] as const;
      const backgroundValues = [
        'page',
        'surface',
        'success',
        'error',
        'warning',
        'info',
        'overlay',
        'on-primary',
        'on-secondary',
      ] as const;
      const borderRadiusValues = ['none', 'small', 'default', 'medium', 'large', 'full'] as const;
      const borderWidthValues = ['none', 'thin', 'medium', 'thick'] as const;
      const borderColorValues = ['default', 'strong', 'success', 'error', 'warning', 'info'] as const;
      const displayValues = ['block', 'inline-block', 'flex', 'inline-flex', 'grid'] as const;

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
            Box Component - All Variants (Dark Mode)
          </h1>

          {/* Section 1: Padding Values */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Padding Values
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
              }}
            >
              {paddingValues.map((value) => (
                <Box key={value} padding={value} background="surface" borderWidth="thin" borderColor="default">
                  {value}
                </Box>
              ))}
            </div>
          </section>

          {/* Section 2: Margin Values */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Margin Values
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                backgroundColor: 'var(--lufa-semantic-ui-overlay-backdrop)',
                padding: '8px',
              }}
            >
              {marginValues.map((value) => (
                <Box
                  key={value}
                  margin={value}
                  padding="default"
                  background="surface"
                  borderWidth="thin"
                  borderColor="default"
                >
                  {value}
                </Box>
              ))}
            </div>
          </section>

          {/* Section 3: Background Colors */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Background Colors
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
              }}
            >
              {backgroundValues.map((value) => (
                <Box key={value} background={value} padding="default" borderWidth="thin" borderColor="default">
                  {value}
                </Box>
              ))}
            </div>
          </section>

          {/* Section 4: Border Radius */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Border Radius
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
              }}
            >
              {borderRadiusValues.map((value) => (
                <Box
                  key={value}
                  borderRadius={value}
                  padding="default"
                  background="surface"
                  borderWidth="thin"
                  borderColor="default"
                >
                  {value}
                </Box>
              ))}
            </div>
          </section>

          {/* Section 5: Border Width */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Border Width
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px',
              }}
            >
              {borderWidthValues.map((value) => (
                <Box key={value} borderWidth={value} borderColor="default" padding="default" background="surface">
                  {value}
                </Box>
              ))}
            </div>
          </section>

          {/* Section 6: Border Color */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Border Color
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
              }}
            >
              {borderColorValues.map((value) => (
                <Box key={value} borderColor={value} borderWidth="medium" padding="default" background="surface">
                  {value}
                </Box>
              ))}
            </div>
          </section>

          {/* Section 7: Display Values */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Display Values
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {displayValues.map((value) => (
                <div key={value}>
                  <div
                    style={{
                      marginBottom: '4px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: 'var(--lufa-token-color-text-tertiary)',
                    }}
                  >
                    {value}:
                  </div>
                  <Box display={value} background="surface" padding="compact" borderWidth="thin" borderColor="default">
                    <Box padding="compact" background="info">
                      Child 1
                    </Box>
                    <Box padding="compact" background="warning">
                      Child 2
                    </Box>
                  </Box>
                </div>
              ))}
            </div>
          </section>

          {/* Section 8: Card Composition Example */}
          <section>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Composition Example (Card)
            </h2>
            <Box
              padding="comfortable"
              background="surface"
              borderRadius="medium"
              borderWidth="thin"
              borderColor="default"
            >
              <Box as="header" marginBottom="default">
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Card Title</h3>
              </Box>
              <Box marginBottom="default">
                <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5' }}>
                  Card content with comfortable padding and medium border radius.
                </p>
              </Box>
              <Box as="footer" display="flex">
                <Box padding="compact" background="on-primary" borderRadius="small">
                  Action 1
                </Box>
                <Box padding="compact" background="on-secondary" borderRadius="small" marginLeft="compact">
                  Action 2
                </Box>
              </Box>
            </Box>
          </section>
        </div>
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('box-all-variants-dark.png');

      // Clean up: remove dark mode to avoid affecting other tests
      await page.evaluate(() => document.documentElement.removeAttribute('data-mode'));
    });
  });
});
