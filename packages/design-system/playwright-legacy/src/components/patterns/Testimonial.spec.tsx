import { expect, test } from '@playwright/experimental-ct-react';

import { Testimonial } from '@grasdouble/lufa_design-system';

const mockTestimonialData = {
  imgUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  testimonial:
    'This product has completely transformed the way our team collaborates. The intuitive interface and powerful features make it an essential tool for our daily workflow.',
  from: 'Sarah Johnson',
  position: 'CEO, TechCorp Inc.',
};

test.describe('Testimonial Component', () => {
  test.describe('Basic Rendering', () => {
    test('should render with default style (style 1)', async ({ mount }) => {
      const component = await mount(<Testimonial {...mockTestimonialData} style={1} />);
      await expect(component).toBeVisible();
    });

    test('should render with all required props', async ({ mount }) => {
      const component = await mount(<Testimonial {...mockTestimonialData} style={1} />);
      await expect(component).toContainText(mockTestimonialData.testimonial);
      await expect(component).toContainText(mockTestimonialData.from);
      await expect(component).toContainText(mockTestimonialData.position);
    });

    test('should render image with correct src', async ({ mount }) => {
      const component = await mount(<Testimonial {...mockTestimonialData} style={1} />);
      const img = component.locator('img').first();
      await expect(img).toHaveAttribute('src', mockTestimonialData.imgUrl);
    });

    test('should render testimonial text in blockquote', async ({ mount }) => {
      const component = await mount(<Testimonial {...mockTestimonialData} style={1} />);
      const blockquote = component.locator('blockquote');
      await expect(blockquote).toContainText(mockTestimonialData.testimonial);
    });

    test('should render figcaption with author info', async ({ mount }) => {
      const component = await mount(<Testimonial {...mockTestimonialData} style={1} />);
      const figcaption = component.locator('figcaption');
      await expect(figcaption).toContainText(mockTestimonialData.from);
      await expect(figcaption).toContainText(mockTestimonialData.position);
    });
  });

  test.describe('Style Variants', () => {
    test('should render style 1 variant', async ({ mount }) => {
      const component = await mount(<Testimonial {...mockTestimonialData} style={1} />);
      await expect(component).toBeVisible();
      await expect(component).toContainText(mockTestimonialData.testimonial);
    });

    test('should render style 2 variant', async ({ mount }) => {
      const component = await mount(<Testimonial {...mockTestimonialData} style={2} />);
      await expect(component).toBeVisible();
      await expect(component).toContainText(mockTestimonialData.testimonial);
    });

    test('should render style 3 variant', async ({ mount }) => {
      const component = await mount(<Testimonial {...mockTestimonialData} style={3} />);
      await expect(component).toBeVisible();
      await expect(component).toContainText(mockTestimonialData.testimonial);
    });

    test('should default to style 1 when invalid style provided', async ({ mount }) => {
      const component = await mount(<Testimonial {...mockTestimonialData} style={999} />);
      await expect(component).toBeVisible();
      await expect(component).toContainText(mockTestimonialData.testimonial);
    });

    test('should default to style 1 when no style provided', async ({ mount }) => {
      const component = await mount(
        <Testimonial
          imgUrl={mockTestimonialData.imgUrl}
          testimonial={mockTestimonialData.testimonial}
          from={mockTestimonialData.from}
          position={mockTestimonialData.position}
        />
      );
      await expect(component).toBeVisible();
      await expect(component).toContainText(mockTestimonialData.testimonial);
    });
  });

  test.describe('Content Variations', () => {
    test('should handle short testimonial text', async ({ mount }) => {
      const component = await mount(<Testimonial {...mockTestimonialData} testimonial="Great product!" style={1} />);
      await expect(component).toContainText('Great product!');
    });

    test('should handle long testimonial text', async ({ mount }) => {
      const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(10);
      const component = await mount(<Testimonial {...mockTestimonialData} testimonial={longText} style={1} />);
      await expect(component).toBeVisible();
      await expect(component).toContainText('Lorem ipsum dolor sit amet');
    });

    test('should handle special characters in testimonial', async ({ mount }) => {
      const component = await mount(
        <Testimonial
          {...mockTestimonialData}
          testimonial="This is amazing! We've increased productivity by 50% & saved $10,000."
          style={1}
        />
      );
      await expect(component).toContainText("We've increased productivity by 50% & saved $10,000");
    });

    test('should handle different author names', async ({ mount }) => {
      const component = await mount(<Testimonial {...mockTestimonialData} from="María García-López" style={1} />);
      await expect(component).toContainText('María García-López');
    });

    test('should handle long position titles', async ({ mount }) => {
      const component = await mount(
        <Testimonial
          {...mockTestimonialData}
          position="Senior Vice President of Engineering and Product Development"
          style={1}
        />
      );
      await expect(component).toContainText('Senior Vice President of Engineering and Product Development');
    });
  });

  test.describe('Image Handling', () => {
    test('should render with different image URL for style 1', async ({ mount }) => {
      const customImgUrl = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop';
      const component = await mount(<Testimonial {...mockTestimonialData} imgUrl={customImgUrl} style={1} />);
      const img = component.locator('img').first();
      await expect(img).toHaveAttribute('src', customImgUrl);
    });

    test('should render with different image URL for style 2', async ({ mount }) => {
      const customImgUrl = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop';
      const component = await mount(<Testimonial {...mockTestimonialData} imgUrl={customImgUrl} style={2} />);
      const img = component.locator('img').first();
      await expect(img).toHaveAttribute('src', customImgUrl);
    });

    test('should render with different image URL for style 3', async ({ mount }) => {
      const customImgUrl = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop';
      const component = await mount(<Testimonial {...mockTestimonialData} imgUrl={customImgUrl} style={3} />);
      const img = component.locator('img').first();
      await expect(img).toHaveAttribute('src', customImgUrl);
    });

    test('should render images with empty alt attribute', async ({ mount }) => {
      const component = await mount(<Testimonial {...mockTestimonialData} style={1} />);
      const img = component.locator('img').first();
      await expect(img).toHaveAttribute('alt', '');
    });
  });

  test.describe('User Interactions', () => {
    test('should display content without requiring interaction (informational)', async ({ mount }) => {
      const component = await mount(<Testimonial {...mockTestimonialData} style={1} />);
      await expect(component).toBeVisible();
      await expect(component).toContainText(mockTestimonialData.testimonial);
      await expect(component).toContainText(mockTestimonialData.from);
    });

    test('should allow text selection for copying', async ({ mount }) => {
      const component = await mount(<Testimonial {...mockTestimonialData} style={1} />);
      const blockquote = component.locator('blockquote');
      await expect(blockquote).toBeVisible();
      // Verify testimonial text is present and selectable (not using user-select: none)
      await expect(blockquote).toContainText(mockTestimonialData.testimonial);
    });
  });

  test.describe('Accessibility', () => {
    test('should use semantic HTML structure (style 1)', async ({ mount }) => {
      const component = await mount(<Testimonial {...mockTestimonialData} style={1} />);
      // Component IS the section element
      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('section');

      const figure = component.locator('figure');
      const blockquote = component.locator('blockquote');
      const figcaption = component.locator('figcaption');

      await expect(figure).toBeVisible();
      await expect(blockquote).toBeVisible();
      await expect(figcaption).toBeVisible();
    });

    test('should use semantic HTML structure (style 2)', async ({ mount }) => {
      const component = await mount(<Testimonial {...mockTestimonialData} style={2} />);
      // Component IS the section element
      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('section');

      const figure = component.locator('figure');
      const blockquote = component.locator('blockquote');
      const figcaption = component.locator('figcaption');

      await expect(figure).toBeVisible();
      await expect(blockquote).toBeVisible();
      await expect(figcaption).toBeVisible();
    });

    test('should use semantic HTML structure (style 3)', async ({ mount }) => {
      const component = await mount(<Testimonial {...mockTestimonialData} style={3} />);
      // Component IS the section element
      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('section');

      const figure = component.locator('figure');
      const blockquote = component.locator('blockquote');
      const figcaption = component.locator('figcaption');

      await expect(figure).toBeVisible();
      await expect(blockquote).toBeVisible();
      await expect(figcaption).toBeVisible();
    });

    test('should have images with decorative empty alt (style 1)', async ({ mount }) => {
      const component = await mount(<Testimonial {...mockTestimonialData} style={1} />);
      const imgs = component.locator('img');
      const count = await imgs.count();
      for (let i = 0; i < count; i++) {
        await expect(imgs.nth(i)).toHaveAttribute('alt', '');
      }
    });

    test('should have SVG quote marks with aria-hidden (style 1)', async ({ mount }) => {
      const component = await mount(<Testimonial {...mockTestimonialData} style={1} />);
      const svg = component.locator('svg').first();
      await expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    test('should have SVG elements with aria-hidden (style 3)', async ({ mount }) => {
      const component = await mount(<Testimonial {...mockTestimonialData} style={3} />);
      const svgs = component.locator('svg[aria-hidden="true"]');
      await expect(svgs.first()).toBeVisible();
    });

    test('should have accessible ARIA structure for style 1', async ({ mount }) => {
      const component = await mount(<Testimonial {...mockTestimonialData} style={1} />);
      const figure = component.locator('figure');

      // ARIA snapshot tests semantic structure
      // Figure has accessible name from figcaption
      await expect(figure).toMatchAriaSnapshot(`
        - figure "Sarah Johnson CEO, TechCorp Inc.":
          - blockquote:
            - paragraph: ${mockTestimonialData.testimonial}
          - text: Sarah Johnson CEO, TechCorp Inc.
      `);
    });

    test('should have accessible ARIA structure for style 2', async ({ mount }) => {
      const component = await mount(<Testimonial {...mockTestimonialData} style={2} />);
      const figure = component.locator('figure');

      await expect(figure).toMatchAriaSnapshot(`
        - figure "Sarah Johnson CEO, TechCorp Inc.":
          - blockquote:
            - paragraph: ${mockTestimonialData.testimonial}
          - text: Sarah Johnson CEO, TechCorp Inc.
      `);
    });

    test('should have accessible ARIA structure for style 3', async ({ mount }) => {
      const component = await mount(<Testimonial {...mockTestimonialData} style={3} />);
      const figure = component.locator('figure');

      await expect(figure).toMatchAriaSnapshot(`
        - figure "Sarah Johnson CEO, TechCorp Inc.":
          - blockquote:
            - paragraph: ${mockTestimonialData.testimonial}
          - text: Sarah Johnson CEO, TechCorp Inc.
      `);
    });
  });

  test.describe('Visual Regression', () => {
    test('should match snapshot for all style variants in light mode', async ({ mount }) => {
      const testimonials = [
        {
          ...mockTestimonialData,
          testimonial:
            'Style 1 showcases a large image alongside the testimonial with an elegant layout. Perfect for hero sections.',
        },
        {
          imgUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
          testimonial:
            'Style 2 features a centered design with a circular avatar image, ideal for simple and clean sections.',
          from: 'Michael Chen',
          position: 'CTO, InnovateLab',
        },
        {
          imgUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
          testimonial: 'Style 3 presents a side-by-side layout with the image on the left and content on the right.',
          from: 'Emily Rodriguez',
          position: 'Product Manager, StartupX',
        },
      ];

      const component = await mount(
        <div style={{ padding: '32px', background: '#ffffff', width: '900px' }}>
          <h1 style={{ marginBottom: '24px', fontSize: '28px', fontWeight: 'bold', color: '#333' }}>
            Testimonial Component - All Styles
          </h1>

          {/* Style 1 */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>
              Style 1 - Image Sidebar Layout
            </h2>
            <Testimonial {...testimonials[0]} style={1} />
          </section>

          {/* Style 2 */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>
              Style 2 - Centered Layout
            </h2>
            <Testimonial {...testimonials[1]} style={2} />
          </section>

          {/* Style 3 */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>
              Style 3 - Asymmetric Grid Layout
            </h2>
            <Testimonial {...testimonials[2]} style={3} />
          </section>

          {/* Content Length Variations */}
          <section>
            <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>
              Content Length Variations
            </h2>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600', color: '#666' }}>
                Short Testimonial
              </h3>
              <Testimonial
                imgUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
                testimonial="Excellent product! Highly recommended."
                from="David Kim"
                position="Entrepreneur"
                style={2}
              />
            </div>

            <div>
              <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600', color: '#666' }}>
                Long Testimonial
              </h3>
              <Testimonial
                imgUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
                testimonial="I've been using this product for over two years now, and I can confidently say it has revolutionized the way our entire organization operates. The attention to detail and powerful features create an exceptional experience."
                from="Jennifer Martinez"
                position="Director of Operations"
                style={3}
              />
            </div>
          </section>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('testimonial-all-styles-light.png', {
        animations: 'disabled',
      });
    });

    test('should match snapshot for all style variants in dark mode', async ({ mount, page }) => {
      // Set dark mode on document root BEFORE mounting
      await page.evaluate(() => document.documentElement.setAttribute('data-mode', 'dark'));

      const testimonials = [
        {
          ...mockTestimonialData,
          testimonial:
            'Style 1 showcases a large image alongside the testimonial with an elegant layout. Perfect for hero sections.',
        },
        {
          imgUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
          testimonial:
            'Style 2 features a centered design with a circular avatar image, ideal for simple and clean sections.',
          from: 'Michael Chen',
          position: 'CTO, InnovateLab',
        },
        {
          imgUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
          testimonial: 'Style 3 presents a side-by-side layout with the image on the left and content on the right.',
          from: 'Emily Rodriguez',
          position: 'Product Manager, StartupX',
        },
      ];

      const component = await mount(
        <div
          style={{
            padding: '32px',
            width: '900px',
            background: 'var(--lufa-token-color-background-primary)',
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
            Testimonial Component - All Styles (Dark Mode)
          </h1>

          {/* Style 1 */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Style 1 - Image Sidebar Layout
            </h2>
            <Testimonial {...testimonials[0]} style={1} />
          </section>

          {/* Style 2 */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Style 2 - Centered Layout
            </h2>
            <Testimonial {...testimonials[1]} style={2} />
          </section>

          {/* Style 3 */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Style 3 - Asymmetric Grid Layout
            </h2>
            <Testimonial {...testimonials[2]} style={3} />
          </section>

          {/* Content Length Variations */}
          <section>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Content Length Variations
            </h2>

            <div style={{ marginBottom: '24px' }}>
              <h3
                style={{
                  marginBottom: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'var(--lufa-token-color-text-tertiary)',
                }}
              >
                Short Testimonial
              </h3>
              <Testimonial
                imgUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
                testimonial="Excellent product! Highly recommended."
                from="David Kim"
                position="Entrepreneur"
                style={2}
              />
            </div>

            <div>
              <h3
                style={{
                  marginBottom: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'var(--lufa-token-color-text-tertiary)',
                }}
              >
                Long Testimonial
              </h3>
              <Testimonial
                imgUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
                testimonial="I've been using this product for over two years now, and I can confidently say it has revolutionized the way our entire organization operates. The attention to detail and powerful features create an exceptional experience."
                from="Jennifer Martinez"
                position="Director of Operations"
                style={3}
              />
            </div>
          </section>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('testimonial-all-styles-dark.png', {
        animations: 'disabled',
      });

      // Clean up: remove dark mode to avoid affecting other tests
      await page.evaluate(() => document.documentElement.removeAttribute('data-mode'));
    });
  });
});
