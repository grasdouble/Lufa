import { expect, test } from '@playwright/experimental-ct-react';

import { Typography } from '@grasdouble/lufa_design-system';

test.describe('Typography Component', () => {
  test.describe('Basic Rendering', () => {
    test('should render with default props', async ({ mount }) => {
      const component = await mount(<Typography>Default text</Typography>);
      await expect(component).toBeVisible();
      await expect(component).toContainText('Default text');
    });

    test('should apply custom className', async ({ mount }) => {
      const component = await mount(<Typography className="custom-class">Text</Typography>);
      await expect(component).toHaveClass(/custom-class/);
    });

    test('should apply custom style', async ({ mount }) => {
      const component = await mount(<Typography style={{ margin: '10px' }}>Text</Typography>);
      await expect(component).toHaveCSS('margin', '10px');
    });

    test('should render children correctly', async ({ mount }) => {
      const component = await mount(
        <Typography>
          <strong>Bold text</strong> with <em>emphasis</em>
        </Typography>
      );
      await expect(component).toContainText('Bold text with emphasis');
      const strong = component.locator('strong');
      const em = component.locator('em');
      await expect(strong).toBeVisible();
      await expect(em).toBeVisible();
    });
  });

  test.describe('Variants', () => {
    const variants = [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'body',
      'bodyLarge',
      'bodySmall',
      'caption',
      'label',
    ] as const;

    for (const variant of variants) {
      test(`should render ${variant} variant`, async ({ mount }) => {
        const component = await mount(<Typography variant={variant}>Sample text</Typography>);
        await expect(component).toBeVisible();
        await expect(component).toHaveClass(new RegExp(`variant-${variant}`));
      });
    }

    test('should default to body variant', async ({ mount }) => {
      const component = await mount(<Typography>Default</Typography>);
      await expect(component).toHaveClass(/variant-body/);
    });
  });

  test.describe('Semantic Elements', () => {
    test('should render as specified element', async ({ mount }) => {
      const component = await mount(<Typography as="h1">Heading</Typography>);
      // Component IS element - no locator needed
      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('h1');
    });

    test('should render h1 element for h1 variant by default', async ({ mount }) => {
      const component = await mount(<Typography variant="h1">H1 Text</Typography>);
      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('h1');
    });

    test('should render h2 element for h2 variant by default', async ({ mount }) => {
      const component = await mount(<Typography variant="h2">H2 Text</Typography>);
      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('h2');
    });

    test('should render h3 element for h3 variant by default', async ({ mount }) => {
      const component = await mount(<Typography variant="h3">H3 Text</Typography>);
      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('h3');
    });

    test('should render p element for body variant by default', async ({ mount }) => {
      const component = await mount(<Typography variant="body">Body text</Typography>);
      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('p');
    });

    test('should render span element for caption variant by default', async ({ mount }) => {
      const component = await mount(<Typography variant="caption">Caption text</Typography>);
      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('span');
    });

    test('should render span element for label variant by default', async ({ mount }) => {
      const component = await mount(<Typography variant="label">Label text</Typography>);
      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('span');
    });

    test('should override default element with as prop', async ({ mount }) => {
      const component = await mount(
        <Typography variant="h1" as="div">
          Heading styled as div
        </Typography>
      );
      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('div');
      await expect(component).toHaveClass(/variant-h1/);
    });
  });

  test.describe('Font Weight', () => {
    const weights = ['light', 'normal', 'medium', 'semibold', 'bold'] as const;

    for (const weight of weights) {
      test(`should apply ${weight} weight`, async ({ mount }) => {
        const component = await mount(<Typography weight={weight}>Text</Typography>);
        await expect(component).toHaveClass(new RegExp(`weight-${weight}`));
      });
    }

    test('should not apply weight class when weight is not specified', async ({ mount }) => {
      const component = await mount(<Typography>Text</Typography>);
      const className = await component.getAttribute('class');
      expect(className).not.toMatch(/weight-/);
    });
  });

  test.describe('Text Alignment', () => {
    const alignments = ['left', 'center', 'right', 'justify'] as const;

    for (const align of alignments) {
      test(`should apply ${align} alignment`, async ({ mount }) => {
        const component = await mount(<Typography align={align}>Aligned text</Typography>);
        await expect(component).toHaveClass(new RegExp(`align-${align}`));
      });
    }

    test('should not apply alignment class when align is not specified', async ({ mount }) => {
      const component = await mount(<Typography>Text</Typography>);
      const className = await component.getAttribute('class');
      expect(className).not.toMatch(/align-/);
    });
  });

  test.describe('Color Variants', () => {
    const colors = ['primary', 'secondary', 'tertiary', 'inverse', 'error', 'success', 'warning'] as const;

    for (const color of colors) {
      test(`should apply ${color} color`, async ({ mount }) => {
        const component = await mount(<Typography color={color}>Colored text</Typography>);
        await expect(component).toHaveClass(new RegExp(`color-${color}`));
      });
    }

    test('should default to primary color', async ({ mount }) => {
      const component = await mount(<Typography>Text</Typography>);
      await expect(component).toHaveClass(/color-primary/);
    });
  });

  test.describe('Combination Tests', () => {
    test('should combine variant, weight, and alignment', async ({ mount }) => {
      const component = await mount(
        <Typography variant="h2" weight="bold" align="center">
          Styled heading
        </Typography>
      );
      await expect(component).toHaveClass(/variant-h2/);
      await expect(component).toHaveClass(/weight-bold/);
      await expect(component).toHaveClass(/align-center/);
    });

    test('should combine all styling props', async ({ mount }) => {
      const component = await mount(
        <Typography variant="body" weight="medium" align="justify" color="secondary">
          Fully styled text
        </Typography>
      );
      await expect(component).toHaveClass(/variant-body/);
      await expect(component).toHaveClass(/weight-medium/);
      await expect(component).toHaveClass(/align-justify/);
      await expect(component).toHaveClass(/color-secondary/);
    });
  });

  test.describe('Accessibility', () => {
    test('should use semantic h1 element for h1 variant', async ({ mount }) => {
      const h1 = await mount(<Typography variant="h1">H1</Typography>);
      const h1Tag = await h1.evaluate((el) => el.tagName.toLowerCase());
      expect(h1Tag).toBe('h1');
    });

    test('should use semantic h2 element for h2 variant', async ({ mount }) => {
      const h2 = await mount(<Typography variant="h2">H2</Typography>);
      const h2Tag = await h2.evaluate((el) => el.tagName.toLowerCase());
      expect(h2Tag).toBe('h2');
    });

    test('should support custom ARIA attributes', async ({ mount }) => {
      const component = await mount(
        <Typography aria-label="Important message" role="alert">
          Alert text
        </Typography>
      );
      await expect(component).toHaveAttribute('aria-label', 'Important message');
      await expect(component).toHaveAttribute('role', 'alert');
    });

    test('should have accessible structure for heading', async ({ mount }) => {
      const component = await mount(<Typography variant="h1">Main Heading</Typography>);
      await expect(component).toMatchAriaSnapshot(`
        - heading "Main Heading" [level=1]
      `);
    });

    test('should have accessible structure for body text', async ({ mount }) => {
      const component = await mount(<Typography variant="body">Body text content</Typography>);
      await expect(component).toMatchAriaSnapshot(`
        - paragraph: Body text content
      `);
    });

    test('should have accessible structure for interactive button', async ({ mount }) => {
      const component = await mount(
        <Typography as="button" variant="body">
          Clickable text
        </Typography>
      );
      await expect(component).toMatchAriaSnapshot(`
        - button "Clickable text"
      `);
    });

    test('should be keyboard accessible when interactive', async ({ mount }) => {
      const component = await mount(
        <Typography as="button" variant="body">
          Clickable text
        </Typography>
      );
      await component.focus();
      await expect(component).toBeFocused();
    });
  });

  test.describe('HTML Attributes', () => {
    test('should forward HTML attributes', async ({ mount }) => {
      const component = await mount(
        <Typography id="custom-id" data-testid="typography-test">
          Text
        </Typography>
      );
      await expect(component).toHaveAttribute('id', 'custom-id');
      await expect(component).toHaveAttribute('data-testid', 'typography-test');
    });

    test('should support onClick handler', async ({ mount }) => {
      let clicked = false;
      const component = await mount(
        <Typography
          as="button"
          onClick={() => {
            clicked = true;
          }}
        >
          Click me
        </Typography>
      );
      await component.click();
      expect(clicked).toBe(true);
    });
  });

  test.describe('Visual Regression', () => {
    test('should match snapshot for all variants, weights, alignments, and colors in light mode', async ({ mount }) => {
      const variants = [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'body',
        'bodyLarge',
        'bodySmall',
        'caption',
        'label',
      ] as const;
      const weights = ['light', 'normal', 'medium', 'semibold', 'bold'] as const;
      const alignments = ['left', 'center', 'right', 'justify'] as const;
      const colors = ['primary', 'secondary', 'tertiary', 'inverse', 'error', 'success', 'warning'] as const;

      const component = await mount(
        <div style={{ padding: '32px', background: '#ffffff', width: '900px' }}>
          {/* Header */}
          <h1 style={{ marginBottom: '32px', fontSize: '32px', fontWeight: 'bold', color: '#333' }}>
            Typography Component - All Variants
          </h1>

          {/* Typography Variants Section */}
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '600', color: '#555' }}>
              Typography Variants
            </h2>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                padding: '20px',
                background: '#fafafa',
                borderRadius: '8px',
              }}
            >
              {variants.map((variant) => (
                <div key={variant} style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '12px' }}>
                  <Typography variant={variant}>
                    {variant.charAt(0).toUpperCase() + variant.slice(1)} - The quick brown fox jumps over the lazy dog
                  </Typography>
                </div>
              ))}
            </div>
          </section>

          {/* Font Weights Section */}
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '600', color: '#555' }}>
              Font Weights (body variant)
            </h2>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: '20px',
                background: '#fafafa',
                borderRadius: '8px',
              }}
            >
              {weights.map((weight) => (
                <Typography key={weight} variant="body" weight={weight}>
                  {weight.charAt(0).toUpperCase() + weight.slice(1)} weight - The quick brown fox jumps over the lazy
                  dog
                </Typography>
              ))}
            </div>
          </section>

          {/* Text Alignment Section */}
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '600', color: '#555' }}>Text Alignment</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {alignments.map((align) => (
                <div key={align} style={{ padding: '16px', background: '#fafafa', borderRadius: '8px' }}>
                  <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px', textTransform: 'uppercase' }}>
                    {align}
                  </p>
                  <Typography variant="body" align={align}>
                    This text is aligned to {align}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Typography>
                </div>
              ))}
            </div>
          </section>

          {/* Color Variants Section */}
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '600', color: '#555' }}>Color Variants</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {colors.map((color) => (
                <div
                  key={color}
                  style={{ padding: '16px', background: color === 'inverse' ? '#333' : '#fafafa', borderRadius: '8px' }}
                >
                  <p
                    style={{
                      fontSize: '12px',
                      color: color === 'inverse' ? '#ccc' : '#888',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {color}
                  </p>
                  <Typography variant="body" color={color}>
                    This is {color} colored text. The quick brown fox jumps over the lazy dog.
                  </Typography>
                </div>
              ))}
            </div>
          </section>

          {/* Heading Hierarchy Section */}
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '600', color: '#555' }}>
              Heading Hierarchy
            </h2>
            <div style={{ padding: '20px', background: '#fafafa', borderRadius: '8px' }}>
              <Typography variant="h1">Heading 1 - Main Title</Typography>
              <Typography variant="h2" style={{ marginTop: '16px' }}>
                Heading 2 - Section Title
              </Typography>
              <Typography variant="h3" style={{ marginTop: '12px' }}>
                Heading 3 - Subsection Title
              </Typography>
              <Typography variant="h4" style={{ marginTop: '12px' }}>
                Heading 4 - Minor Heading
              </Typography>
              <Typography variant="h5" style={{ marginTop: '8px' }}>
                Heading 5 - Small Heading
              </Typography>
              <Typography variant="h6" style={{ marginTop: '8px' }}>
                Heading 6 - Smallest Heading
              </Typography>
            </div>
          </section>

          {/* Body Text Variants Section */}
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '600', color: '#555' }}>
              Body Text Variants
            </h2>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                padding: '20px',
                background: '#fafafa',
                borderRadius: '8px',
              }}
            >
              <div>
                <p style={{ fontSize: '12px', color: '#888', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Body Large
                </p>
                <Typography variant="bodyLarge">
                  Large body text for emphasis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#888', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Body (Default)
                </p>
                <Typography variant="body">
                  Regular body text for content. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#888', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Body Small
                </p>
                <Typography variant="bodySmall">
                  Small body text for less emphasis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
              </div>
            </div>
          </section>

          {/* Caption and Label Section */}
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '600', color: '#555' }}>
              Caption & Label
            </h2>
            <div style={{ display: 'flex', gap: '32px', padding: '20px', background: '#fafafa', borderRadius: '8px' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Caption
                </p>
                <Typography variant="caption">Caption text for image descriptions or footnotes</Typography>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Label
                </p>
                <Typography variant="label">Label text for form fields</Typography>
              </div>
            </div>
          </section>

          {/* Complex Combinations Section */}
          <section>
            <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '600', color: '#555' }}>
              Complex Combinations
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Card Example */}
              <div style={{ padding: '24px', background: '#fafafa', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                <Typography variant="h3" weight="bold" color="primary">
                  Article Title
                </Typography>
                <Typography variant="caption" color="secondary" style={{ marginTop: '8px', display: 'block' }}>
                  Published on January 18, 2026
                </Typography>
                <Typography variant="body" style={{ marginTop: '16px', display: 'block' }}>
                  This is an example of a card layout using various Typography combinations. The heading uses h3 variant
                  with bold weight, the date uses caption with secondary color, and this paragraph uses the default body
                  variant.
                </Typography>
              </div>

              {/* Alert Example */}
              <div style={{ padding: '20px', background: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca' }}>
                <Typography variant="bodyLarge" weight="semibold" color="error">
                  Error: Something went wrong
                </Typography>
                <Typography variant="bodySmall" color="error" style={{ marginTop: '8px', display: 'block' }}>
                  Please check your input and try again.
                </Typography>
              </div>

              {/* Success Example */}
              <div style={{ padding: '20px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                <Typography variant="body" weight="medium" color="success">
                  Success! Your changes have been saved.
                </Typography>
              </div>
            </div>
          </section>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('typography-all-variants-light.png', {
        animations: 'disabled',
      });
    });

    test('should match snapshot for all variants in dark mode', async ({ mount, page }) => {
      // CRITICAL: Set dark mode on document root BEFORE mounting
      await page.evaluate(() => document.documentElement.setAttribute('data-mode', 'dark'));

      const variants = [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'body',
        'bodyLarge',
        'bodySmall',
        'caption',
        'label',
      ] as const;
      const weights = ['light', 'normal', 'medium', 'semibold', 'bold'] as const;
      const alignments = ['left', 'center', 'right', 'justify'] as const;
      const colors = ['primary', 'secondary', 'tertiary', 'inverse', 'error', 'success', 'warning'] as const;

      const component = await mount(
        <div
          style={{
            padding: '32px',
            width: '900px',
            background: 'var(--lufa-token-color-background-primary)',
          }}
        >
          {/* Header */}
          <h1
            style={{
              marginBottom: '32px',
              fontSize: '32px',
              fontWeight: 'bold',
              color: 'var(--lufa-token-color-text-primary)',
            }}
          >
            Typography Component - All Variants (Dark Mode)
          </h1>

          {/* Typography Variants Section */}
          <section style={{ marginBottom: '48px' }}>
            <h2
              style={{
                marginBottom: '20px',
                fontSize: '24px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Typography Variants
            </h2>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                padding: '20px',
                background: 'var(--lufa-token-color-background-secondary)',
                borderRadius: '8px',
              }}
            >
              {variants.map((variant) => (
                <div
                  key={variant}
                  style={{ borderBottom: '1px solid var(--lufa-token-color-border-primary)', paddingBottom: '12px' }}
                >
                  <Typography variant={variant}>
                    {variant.charAt(0).toUpperCase() + variant.slice(1)} - The quick brown fox jumps over the lazy dog
                  </Typography>
                </div>
              ))}
            </div>
          </section>

          {/* Font Weights Section */}
          <section style={{ marginBottom: '48px' }}>
            <h2
              style={{
                marginBottom: '20px',
                fontSize: '24px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Font Weights (body variant)
            </h2>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: '20px',
                background: 'var(--lufa-token-color-background-secondary)',
                borderRadius: '8px',
              }}
            >
              {weights.map((weight) => (
                <Typography key={weight} variant="body" weight={weight}>
                  {weight.charAt(0).toUpperCase() + weight.slice(1)} weight - The quick brown fox jumps over the lazy
                  dog
                </Typography>
              ))}
            </div>
          </section>

          {/* Text Alignment Section */}
          <section style={{ marginBottom: '48px' }}>
            <h2
              style={{
                marginBottom: '20px',
                fontSize: '24px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Text Alignment
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {alignments.map((align) => (
                <div
                  key={align}
                  style={{
                    padding: '16px',
                    background: 'var(--lufa-token-color-background-secondary)',
                    borderRadius: '8px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '12px',
                      color: 'var(--lufa-token-color-text-tertiary)',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {align}
                  </p>
                  <Typography variant="body" align={align}>
                    This text is aligned to {align}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Typography>
                </div>
              ))}
            </div>
          </section>

          {/* Color Variants Section */}
          <section style={{ marginBottom: '48px' }}>
            <h2
              style={{
                marginBottom: '20px',
                fontSize: '24px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Color Variants
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {colors.map((color) => (
                <div
                  key={color}
                  style={{
                    padding: '16px',
                    background:
                      color === 'inverse'
                        ? 'var(--lufa-token-color-background-inverse)'
                        : 'var(--lufa-token-color-background-secondary)',
                    borderRadius: '8px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '12px',
                      color: 'var(--lufa-token-color-text-tertiary)',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {color}
                  </p>
                  <Typography variant="body" color={color}>
                    This is {color} colored text. The quick brown fox jumps over the lazy dog.
                  </Typography>
                </div>
              ))}
            </div>
          </section>

          {/* Heading Hierarchy Section */}
          <section style={{ marginBottom: '48px' }}>
            <h2
              style={{
                marginBottom: '20px',
                fontSize: '24px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Heading Hierarchy
            </h2>
            <div
              style={{
                padding: '20px',
                background: 'var(--lufa-token-color-background-secondary)',
                borderRadius: '8px',
              }}
            >
              <Typography variant="h1">Heading 1 - Main Title</Typography>
              <Typography variant="h2" style={{ marginTop: '16px' }}>
                Heading 2 - Section Title
              </Typography>
              <Typography variant="h3" style={{ marginTop: '12px' }}>
                Heading 3 - Subsection Title
              </Typography>
              <Typography variant="h4" style={{ marginTop: '12px' }}>
                Heading 4 - Minor Heading
              </Typography>
              <Typography variant="h5" style={{ marginTop: '8px' }}>
                Heading 5 - Small Heading
              </Typography>
              <Typography variant="h6" style={{ marginTop: '8px' }}>
                Heading 6 - Smallest Heading
              </Typography>
            </div>
          </section>

          {/* Body Text Variants Section */}
          <section style={{ marginBottom: '48px' }}>
            <h2
              style={{
                marginBottom: '20px',
                fontSize: '24px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Body Text Variants
            </h2>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                padding: '20px',
                background: 'var(--lufa-token-color-background-secondary)',
                borderRadius: '8px',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: '12px',
                    color: 'var(--lufa-token-color-text-tertiary)',
                    marginBottom: '4px',
                    textTransform: 'uppercase',
                  }}
                >
                  Body Large
                </p>
                <Typography variant="bodyLarge">
                  Large body text for emphasis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
              </div>
              <div>
                <p
                  style={{
                    fontSize: '12px',
                    color: 'var(--lufa-token-color-text-tertiary)',
                    marginBottom: '4px',
                    textTransform: 'uppercase',
                  }}
                >
                  Body (Default)
                </p>
                <Typography variant="body">
                  Regular body text for content. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
              </div>
              <div>
                <p
                  style={{
                    fontSize: '12px',
                    color: 'var(--lufa-token-color-text-tertiary)',
                    marginBottom: '4px',
                    textTransform: 'uppercase',
                  }}
                >
                  Body Small
                </p>
                <Typography variant="bodySmall">
                  Small body text for less emphasis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
              </div>
            </div>
          </section>

          {/* Caption and Label Section */}
          <section style={{ marginBottom: '48px' }}>
            <h2
              style={{
                marginBottom: '20px',
                fontSize: '24px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Caption & Label
            </h2>
            <div
              style={{
                display: 'flex',
                gap: '32px',
                padding: '20px',
                background: 'var(--lufa-token-color-background-secondary)',
                borderRadius: '8px',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: '12px',
                    color: 'var(--lufa-token-color-text-tertiary)',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                  }}
                >
                  Caption
                </p>
                <Typography variant="caption">Caption text for image descriptions or footnotes</Typography>
              </div>
              <div>
                <p
                  style={{
                    fontSize: '12px',
                    color: 'var(--lufa-token-color-text-tertiary)',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                  }}
                >
                  Label
                </p>
                <Typography variant="label">Label text for form fields</Typography>
              </div>
            </div>
          </section>

          {/* Complex Combinations Section */}
          <section>
            <h2
              style={{
                marginBottom: '20px',
                fontSize: '24px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Complex Combinations
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Card Example */}
              <div
                style={{
                  padding: '24px',
                  background: 'var(--lufa-token-color-background-secondary)',
                  borderRadius: '8px',
                  border: '1px solid var(--lufa-token-color-border-primary)',
                }}
              >
                <Typography variant="h3" weight="bold" color="primary">
                  Article Title
                </Typography>
                <Typography variant="caption" color="secondary" style={{ marginTop: '8px', display: 'block' }}>
                  Published on January 18, 2026
                </Typography>
                <Typography variant="body" style={{ marginTop: '16px', display: 'block' }}>
                  This is an example of a card layout using various Typography combinations. The heading uses h3 variant
                  with bold weight, the date uses caption with secondary color, and this paragraph uses the default body
                  variant.
                </Typography>
              </div>

              {/* Alert Example */}
              <div
                style={{
                  padding: '20px',
                  background: 'var(--lufa-token-color-background-error)',
                  borderRadius: '8px',
                  border: '1px solid var(--lufa-token-color-border-error)',
                }}
              >
                <Typography variant="bodyLarge" weight="semibold" color="error">
                  Error: Something went wrong
                </Typography>
                <Typography variant="bodySmall" color="error" style={{ marginTop: '8px', display: 'block' }}>
                  Please check your input and try again.
                </Typography>
              </div>

              {/* Success Example */}
              <div
                style={{
                  padding: '20px',
                  background: 'var(--lufa-token-color-background-success)',
                  borderRadius: '8px',
                  border: '1px solid var(--lufa-token-color-border-success)',
                }}
              >
                <Typography variant="body" weight="medium" color="success">
                  Success! Your changes have been saved.
                </Typography>
              </div>
            </div>
          </section>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('typography-all-variants-dark.png', {
        animations: 'disabled',
      });

      // Clean up: remove dark mode to avoid affecting other tests
      await page.evaluate(() => document.documentElement.removeAttribute('data-mode'));
    });
  });
});
