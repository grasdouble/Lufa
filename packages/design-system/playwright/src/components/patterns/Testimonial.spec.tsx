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
  });

  test.describe('Visual Regression', () => {
    test('should match snapshot for all style variants', async ({ mount }) => {
      const testimonials = [
        {
          ...mockTestimonialData,
          testimonial:
            'Style 1 showcases a large image alongside the testimonial with an elegant layout. Perfect for hero sections or detailed testimonial pages.',
        },
        {
          imgUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
          testimonial:
            'Style 2 features a centered design with a circular avatar image, ideal for simple and clean testimonial sections.',
          from: 'Michael Chen',
          position: 'CTO, InnovateLab',
        },
        {
          imgUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
          testimonial:
            'Style 3 presents a side-by-side layout with the image on the left and content on the right, great for asymmetric designs.',
          from: 'Emily Rodriguez',
          position: 'Product Manager, StartupX',
        },
      ];

      const component = await mount(
        <div style={{ width: '100%', background: '#ffffff' }}>
          {/* Header */}
          <div style={{ padding: '32px 32px 0', maxWidth: '1400px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '16px', fontSize: '32px', fontWeight: 'bold', color: '#333' }}>
              Testimonial Component - All Styles
            </h1>
            <p style={{ marginBottom: '32px', fontSize: '16px', color: '#666' }}>
              Three distinct layout styles for showcasing customer testimonials
            </p>
          </div>

          {/* Style 1 */}
          <section style={{ marginBottom: '48px' }}>
            <div style={{ padding: '0 32px 24px', maxWidth: '1400px', margin: '0 auto' }}>
              <h2 style={{ marginBottom: '16px', fontSize: '24px', fontWeight: '600', color: '#555' }}>
                Style 1 - Image Sidebar Layout
              </h2>
              <p style={{ marginBottom: '16px', fontSize: '14px', color: '#888' }}>
                Features a prominent side image with content area. Best for hero sections.
              </p>
            </div>
            <Testimonial {...testimonials[0]} style={1} />
          </section>

          {/* Style 2 */}
          <section style={{ marginBottom: '48px' }}>
            <div style={{ padding: '0 32px 24px', maxWidth: '1400px', margin: '0 auto' }}>
              <h2 style={{ marginBottom: '16px', fontSize: '24px', fontWeight: '600', color: '#555' }}>
                Style 2 - Centered Layout
              </h2>
              <p style={{ marginBottom: '16px', fontSize: '14px', color: '#888' }}>
                Centered design with circular avatar. Perfect for minimal, clean layouts.
              </p>
            </div>
            <Testimonial {...testimonials[1]} style={2} />
          </section>

          {/* Style 3 */}
          <section style={{ marginBottom: '48px' }}>
            <div style={{ padding: '0 32px 24px', maxWidth: '1400px', margin: '0 auto' }}>
              <h2 style={{ marginBottom: '16px', fontSize: '24px', fontWeight: '600', color: '#555' }}>
                Style 3 - Asymmetric Grid Layout
              </h2>
              <p style={{ marginBottom: '16px', fontSize: '14px', color: '#888' }}>
                Grid-based asymmetric layout with side image. Ideal for editorial content.
              </p>
            </div>
            <Testimonial {...testimonials[2]} style={3} />
          </section>

          {/* Comparison Grid */}
          <section style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '600', color: '#555' }}>
              Side-by-Side Comparison
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
              <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ padding: '12px', background: '#f0f0f0', borderBottom: '1px solid #e0e0e0' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>Style 1</h3>
                </div>
                <div style={{ padding: '16px', background: '#fafafa' }}>
                  <ul style={{ fontSize: '12px', color: '#666', margin: 0, paddingLeft: '16px' }}>
                    <li>Large side image</li>
                    <li>Horizontal layout</li>
                    <li>Dark background</li>
                    <li>Quote SVG decoration</li>
                    <li>Best for: Hero sections</li>
                  </ul>
                </div>
              </div>
              <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ padding: '12px', background: '#f0f0f0', borderBottom: '1px solid #e0e0e0' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>Style 2</h3>
                </div>
                <div style={{ padding: '16px', background: '#fafafa' }}>
                  <ul style={{ fontSize: '12px', color: '#666', margin: 0, paddingLeft: '16px' }}>
                    <li>Circular avatar</li>
                    <li>Centered content</li>
                    <li>Minimal design</li>
                    <li>Gradient background</li>
                    <li>Best for: Simple sections</li>
                  </ul>
                </div>
              </div>
              <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ padding: '12px', background: '#f0f0f0', borderBottom: '1px solid #e0e0e0' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>Style 3</h3>
                </div>
                <div style={{ padding: '16px', background: '#fafafa' }}>
                  <ul style={{ fontSize: '12px', color: '#666', margin: 0, paddingLeft: '16px' }}>
                    <li>Side image (left)</li>
                    <li>Grid-based layout</li>
                    <li>Asymmetric design</li>
                    <li>Quote SVG decoration</li>
                    <li>Best for: Editorial content</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Content Length Variations */}
          <section style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '600', color: '#555' }}>
              Content Length Variations
            </h2>

            {/* Short testimonial */}
            <div style={{ marginBottom: '32px' }}>
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

            {/* Long testimonial */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600', color: '#666' }}>
                Long Testimonial
              </h3>
              <Testimonial
                imgUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
                testimonial="I've been using this product for over two years now, and I can confidently say it has revolutionized the way our entire organization operates. The attention to detail, the intuitive user interface, and the powerful features all come together to create an exceptional user experience. Our team's productivity has increased significantly, and we've been able to streamline processes that previously took hours into just minutes. The customer support is also outstanding – they're always available and genuinely care about helping us succeed."
                from="Jennifer Martinez"
                position="Director of Operations, Global Enterprises Inc."
                style={3}
              />
            </div>
          </section>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for images to load
      await component.locator('img').first().waitFor({ state: 'visible' });
      await component.page().waitForTimeout(500);

      await expect(component).toHaveScreenshot('testimonial-all-styles.png', {
        fullPage: true,
        maxDiffPixels: 100,
      });
    });
  });
});
