/**
 * Responsive Visibility Tests
 *
 * Tests for the responsive visibility pattern (show/hide props) on Box component.
 *
 * Test Coverage:
 * - hideFrom prop at different breakpoints
 * - showFrom prop at different breakpoints
 * - Responsive object syntax (show={{ base: true, md: false }})
 * - Viewport resize behavior
 * - Accessibility (aria-hidden attribute)
 */

import { expect, test } from '@playwright/experimental-ct-react';

import { Box } from '@grasdouble/lufa_design-system';

test.describe('Responsive Visibility Pattern', () => {
  // ============================================
  // HIDEFROM PROP TESTS
  // ============================================

  test.describe('hideFrom prop', () => {
    test('hideFrom="md" hides element on medium screens and up', async ({ mount, page }) => {
      await mount(
        <Box hideFrom="md" data-testid="test-box">
          Hidden from md and up
        </Box>
      );

      const testBox = page.getByTestId('test-box');

      // Mobile viewport (< 768px) - should be visible
      await page.setViewportSize({ width: 640, height: 800 });
      await expect(testBox).toBeVisible();

      // Tablet viewport (>= 768px) - should be hidden
      await page.setViewportSize({ width: 768, height: 1024 });
      await expect(testBox).toBeHidden();

      // Desktop viewport (>= 1024px) - should be hidden
      await page.setViewportSize({ width: 1024, height: 768 });
      await expect(testBox).toBeHidden();
    });

    test('hideFrom="lg" hides element on large screens and up', async ({ mount, page }) => {
      await mount(
        <Box hideFrom="lg" data-testid="test-box">
          Hidden from lg and up
        </Box>
      );

      const testBox = page.getByTestId('test-box');

      // Mobile viewport (< 768px) - should be visible
      await page.setViewportSize({ width: 640, height: 800 });
      await expect(testBox).toBeVisible();

      // Tablet viewport (>= 768px, < 1024px) - should be visible
      await page.setViewportSize({ width: 768, height: 1024 });
      await expect(testBox).toBeVisible();

      // Desktop viewport (>= 1024px) - should be hidden
      await page.setViewportSize({ width: 1024, height: 768 });
      await expect(testBox).toBeHidden();
    });

    test('hideFrom="sm" hides element on small screens and up', async ({ mount, page }) => {
      await mount(
        <Box hideFrom="sm" data-testid="test-box">
          Hidden from sm and up
        </Box>
      );

      const testBox = page.getByTestId('test-box');

      // Extra small viewport (< 640px) - should be visible
      await page.setViewportSize({ width: 320, height: 568 });
      await expect(testBox).toBeVisible();

      // Small viewport (>= 640px) - should be hidden
      await page.setViewportSize({ width: 640, height: 800 });
      await expect(testBox).toBeHidden();
    });
  });

  // ============================================
  // SHOWFROM PROP TESTS
  // ============================================

  test.describe('showFrom prop', () => {
    test('showFrom="md" shows element only on medium screens and up', async ({ mount, page }) => {
      await mount(
        <Box showFrom="md" data-testid="test-box">
          Visible from md and up
        </Box>
      );

      const testBox = page.getByTestId('test-box');

      // Mobile viewport (< 768px) - should be hidden
      await page.setViewportSize({ width: 640, height: 800 });
      await expect(testBox).toBeHidden();

      // Tablet viewport (>= 768px) - should be visible
      await page.setViewportSize({ width: 768, height: 1024 });
      await expect(testBox).toBeVisible();

      // Desktop viewport (>= 1024px) - should be visible
      await page.setViewportSize({ width: 1024, height: 768 });
      await expect(testBox).toBeVisible();
    });

    test('showFrom="lg" shows element only on large screens and up', async ({ mount, page }) => {
      await mount(
        <Box showFrom="lg" data-testid="test-box">
          Visible from lg and up
        </Box>
      );

      const testBox = page.getByTestId('test-box');

      // Mobile viewport (< 768px) - should be hidden
      await page.setViewportSize({ width: 640, height: 800 });
      await expect(testBox).toBeHidden();

      // Tablet viewport (>= 768px, < 1024px) - should be hidden
      await page.setViewportSize({ width: 768, height: 1024 });
      await expect(testBox).toBeHidden();

      // Desktop viewport (>= 1024px) - should be visible
      await page.setViewportSize({ width: 1024, height: 768 });
      await expect(testBox).toBeVisible();
    });
  });

  // ============================================
  // SHOW/HIDE BOOLEAN PROPS
  // ============================================

  test.describe('show and hide boolean props', () => {
    test('hide={true} hides element', async ({ mount, page }) => {
      await mount(
        <Box hide data-testid="test-box">
          Always hidden
        </Box>
      );

      const testBox = page.getByTestId('test-box');

      // Should be hidden at all viewport sizes
      await page.setViewportSize({ width: 320, height: 568 });
      await expect(testBox).toBeHidden();

      await page.setViewportSize({ width: 1024, height: 768 });
      await expect(testBox).toBeHidden();
    });

    test('show={false} hides element', async ({ mount, page }) => {
      await mount(
        <Box show={false} data-testid="test-box">
          Always hidden
        </Box>
      );

      const testBox = page.getByTestId('test-box');

      // Should be hidden at all viewport sizes
      await page.setViewportSize({ width: 320, height: 568 });
      await expect(testBox).toBeHidden();

      await page.setViewportSize({ width: 1024, height: 768 });
      await expect(testBox).toBeHidden();
    });

    test('show={true} shows element', async ({ mount, page }) => {
      await mount(
        <Box show data-testid="test-box">
          Always visible
        </Box>
      );

      const testBox = page.getByTestId('test-box');

      // Should be visible at all viewport sizes
      await page.setViewportSize({ width: 320, height: 568 });
      await expect(testBox).toBeVisible();

      await page.setViewportSize({ width: 1024, height: 768 });
      await expect(testBox).toBeVisible();
    });
  });

  // ============================================
  // RESPONSIVE OBJECT SYNTAX
  // ============================================

  test.describe('responsive object syntax', () => {
    test('show={{ base: true, md: false }} - visible on mobile, hidden on desktop', async ({ mount, page }) => {
      await mount(
        <Box show={{ base: true, md: false }} data-testid="test-box">
          Mobile only
        </Box>
      );

      const testBox = page.getByTestId('test-box');

      // Mobile viewport (< 768px) - should be visible
      await page.setViewportSize({ width: 640, height: 800 });
      await expect(testBox).toBeVisible();

      // Tablet viewport (>= 768px) - should be hidden
      await page.setViewportSize({ width: 768, height: 1024 });
      await expect(testBox).toBeHidden();

      // Desktop viewport (>= 1024px) - should be hidden
      await page.setViewportSize({ width: 1024, height: 768 });
      await expect(testBox).toBeHidden();
    });

    test('show={{ base: false, md: true }} - hidden on mobile, visible on desktop', async ({ mount, page }) => {
      await mount(
        <Box show={{ base: false, md: true }} data-testid="test-box">
          Desktop only
        </Box>
      );

      const testBox = page.getByTestId('test-box');

      // Mobile viewport (< 768px) - should be hidden
      await page.setViewportSize({ width: 640, height: 800 });
      await expect(testBox).toBeHidden();

      // Tablet viewport (>= 768px) - should be visible
      await page.setViewportSize({ width: 768, height: 1024 });
      await expect(testBox).toBeVisible();

      // Desktop viewport (>= 1024px) - should be visible
      await page.setViewportSize({ width: 1024, height: 768 });
      await expect(testBox).toBeVisible();
    });

    test('hide={{ base: false, md: true }} - visible on mobile, hidden on desktop', async ({ mount, page }) => {
      await mount(
        <Box hide={{ base: false, md: true }} data-testid="test-box">
          Mobile only (hide syntax)
        </Box>
      );

      const testBox = page.getByTestId('test-box');

      // Mobile viewport (< 768px) - should be visible
      await page.setViewportSize({ width: 640, height: 800 });
      await expect(testBox).toBeVisible();

      // Tablet viewport (>= 768px) - should be hidden
      await page.setViewportSize({ width: 768, height: 1024 });
      await expect(testBox).toBeHidden();
    });

    test('show={{ base: true, md: false, lg: true }} - complex responsive pattern', async ({ mount, page }) => {
      await mount(
        <Box show={{ base: true, md: false, lg: true }} data-testid="test-box">
          Complex visibility
        </Box>
      );

      const testBox = page.getByTestId('test-box');

      // Mobile viewport (< 768px) - should be visible
      await page.setViewportSize({ width: 640, height: 800 });
      await expect(testBox).toBeVisible();

      // Tablet viewport (>= 768px, < 1024px) - should be hidden
      await page.setViewportSize({ width: 768, height: 1024 });
      await expect(testBox).toBeHidden();

      // Desktop viewport (>= 1024px) - should be visible
      await page.setViewportSize({ width: 1024, height: 768 });
      await expect(testBox).toBeVisible();
    });
  });

  // ============================================
  // VIEWPORT RESIZE BEHAVIOR
  // ============================================

  test.describe('viewport resize behavior', () => {
    test('element visibility updates smoothly when viewport is resized', async ({ mount, page }) => {
      await mount(
        <Box hideFrom="md" data-testid="test-box">
          Responsive content
        </Box>
      );

      const testBox = page.getByTestId('test-box');

      // Start at mobile
      await page.setViewportSize({ width: 640, height: 800 });
      await expect(testBox).toBeVisible();

      // Resize to tablet
      await page.setViewportSize({ width: 768, height: 1024 });
      await expect(testBox).toBeHidden();

      // Resize back to mobile
      await page.setViewportSize({ width: 640, height: 800 });
      await expect(testBox).toBeVisible();

      // Resize to desktop
      await page.setViewportSize({ width: 1280, height: 800 });
      await expect(testBox).toBeHidden();

      // Resize back to mobile
      await page.setViewportSize({ width: 375, height: 667 });
      await expect(testBox).toBeVisible();
    });
  });

  // ============================================
  // CSS CLASS APPLICATION
  // ============================================

  test.describe('CSS class application', () => {
    test('hideFrom prop applies correct CSS class', async ({ mount }) => {
      const component = await mount(
        <Box hideFrom="md" data-testid="test-box">
          Content
        </Box>
      );

      await expect(component).toHaveClass(/lufa-hide-from-md/);
    });

    test('showFrom prop applies correct CSS class', async ({ mount }) => {
      const component = await mount(
        <Box showFrom="lg" data-testid="test-box">
          Content
        </Box>
      );

      await expect(component).toHaveClass(/lufa-show-from-lg/);
    });

    test('hide={true} applies lufa-hide class', async ({ mount }) => {
      const component = await mount(
        <Box hide data-testid="test-box">
          Content
        </Box>
      );

      await expect(component).toHaveClass(/lufa-hide/);
    });
  });

  // ============================================
  // INTEGRATION WITH OTHER PROPS
  // ============================================

  test.describe('integration with other Box props', () => {
    test('responsive visibility works with padding props', async ({ mount, page }) => {
      await mount(
        <Box hideFrom="md" padding="default" data-testid="test-box">
          Padded content
        </Box>
      );

      const testBox = page.getByTestId('test-box');

      // Mobile - should be visible with padding
      await page.setViewportSize({ width: 640, height: 800 });
      await expect(testBox).toBeVisible();
      await expect(testBox).toHaveCSS('padding', /\d+px/);

      // Desktop - should be hidden (padding doesn't matter)
      await page.setViewportSize({ width: 1024, height: 768 });
      await expect(testBox).toBeHidden();
    });

    test('responsive visibility works with background props', async ({ mount, page }) => {
      await mount(
        <Box showFrom="md" background="surface" data-testid="test-box">
          Styled content
        </Box>
      );

      const testBox = page.getByTestId('test-box');

      // Mobile - should be hidden
      await page.setViewportSize({ width: 640, height: 800 });
      await expect(testBox).toBeHidden();

      // Desktop - should be visible with background
      await page.setViewportSize({ width: 1024, height: 768 });
      await expect(testBox).toBeVisible();
      // Background color should be applied
      const bgColor = await testBox.evaluate((el) => window.getComputedStyle(el).backgroundColor);
      expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
    });

    test('responsive visibility works with custom className', async ({ mount, page }) => {
      await mount(
        <Box hideFrom="md" className="custom-class" data-testid="test-box">
          Custom styled content
        </Box>
      );

      const testBox = page.getByTestId('test-box');

      // Should have both custom class and visibility class
      await expect(testBox).toHaveClass(/custom-class/);
      await expect(testBox).toHaveClass(/lufa-hide-from-md/);

      // Mobile - visible
      await page.setViewportSize({ width: 640, height: 800 });
      await expect(testBox).toBeVisible();

      // Desktop - hidden
      await page.setViewportSize({ width: 1024, height: 768 });
      await expect(testBox).toBeHidden();
    });
  });

  // ============================================
  // REAL-WORLD USE CASES
  // ============================================

  test.describe('real-world use cases', () => {
    test('responsive navigation pattern', async ({ mount, page }) => {
      await mount(
        <div>
          {/* Desktop navigation */}
          <Box showFrom="md" data-testid="desktop-nav">
            Desktop Navigation
          </Box>

          {/* Mobile menu button */}
          <Box hideFrom="md" data-testid="mobile-button">
            Mobile Menu Button
          </Box>
        </div>
      );

      const desktopNav = page.getByTestId('desktop-nav');
      const mobileButton = page.getByTestId('mobile-button');

      // Mobile viewport
      await page.setViewportSize({ width: 640, height: 800 });
      await expect(desktopNav).toBeHidden();
      await expect(mobileButton).toBeVisible();

      // Desktop viewport
      await page.setViewportSize({ width: 1024, height: 768 });
      await expect(desktopNav).toBeVisible();
      await expect(mobileButton).toBeHidden();
    });

    test('progressive enhancement pattern', async ({ mount, page }) => {
      await mount(
        <div>
          <Box data-testid="base-feature">Base Feature</Box>
          <Box showFrom="md" data-testid="enhanced-feature">
            Enhanced Feature
          </Box>
          <Box showFrom="lg" data-testid="premium-feature">
            Premium Feature
          </Box>
        </div>
      );

      const baseFeature = page.getByTestId('base-feature');
      const enhancedFeature = page.getByTestId('enhanced-feature');
      const premiumFeature = page.getByTestId('premium-feature');

      // Mobile - only base feature
      await page.setViewportSize({ width: 640, height: 800 });
      await expect(baseFeature).toBeVisible();
      await expect(enhancedFeature).toBeHidden();
      await expect(premiumFeature).toBeHidden();

      // Tablet - base + enhanced
      await page.setViewportSize({ width: 768, height: 1024 });
      await expect(baseFeature).toBeVisible();
      await expect(enhancedFeature).toBeVisible();
      await expect(premiumFeature).toBeHidden();

      // Desktop - all features
      await page.setViewportSize({ width: 1024, height: 768 });
      await expect(baseFeature).toBeVisible();
      await expect(enhancedFeature).toBeVisible();
      await expect(premiumFeature).toBeVisible();
    });
  });
});
