import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import type { AspectRatioProps } from '@grasdouble/lufa_design-system';
import { AspectRatio } from '@grasdouble/lufa_design-system';

import { CodeBlock, PropCard, StoryContainer } from '../../components/helpers';
import { STORY_COLORS } from '../../constants/storyColors';

/**
 * AspectRatio - Responsive Media Container
 *
 * A container component that maintains a specific aspect ratio for its content,
 * ensuring responsive scaling while preserving proportions.
 *
 * ## Features
 * - ✅ Maintains consistent aspect ratio across screen sizes
 * - ✅ Supports common ratios (16:9, 4:3, 1:1, etc.)
 * - ✅ Accepts custom ratio values
 * - ✅ Works with images, videos, iframes, and custom content
 * - ✅ Polymorphic rendering (div, figure, section, etc.)
 * - ✅ Zero layout shift - dimensions calculated via CSS
 * - ✅ Performance-optimized (CSS padding-top technique)
 */
const meta = {
  title: '4. Foundation/4.3 Media Containers/AspectRatio',
  component: AspectRatio,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    ratio: {
      control: 'number',
      description: 'Aspect ratio (width/height). Common: 16/9, 4/3, 1, 9/16',
      table: {
        category: 'Layout',
        type: { summary: 'number' },
        defaultValue: { summary: '16/9' },
      },
    },
    as: {
      control: 'select',
      options: ['div', 'figure', 'section', 'article'],
      description: 'HTML element to render (polymorphic)',
      table: {
        category: 'Polymorphic',
        type: { summary: 'ElementType' },
        defaultValue: { summary: 'div' },
      },
    },
  },
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// DEFAULT STORY
// ============================================

export const Default: Story = {
  render: () => {
    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <PropCard label="Default AspectRatio (16:9)">
            <div style={{ maxWidth: '400px' }}>
              <AspectRatio>
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '600',
                  }}
                >
                  16:9 Widescreen
                </div>
              </AspectRatio>
            </div>
          </PropCard>

          <CodeBlock
            code={`<AspectRatio>
  <img src="image.jpg" alt="16:9 image" />
</AspectRatio>`}
            language="jsx"
            title="JSX"
          />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: RATIO
// ============================================

export const PropRatio: Story = {
  name: 'Prop: ratio',
  render: () => {
    const [selectedRatio, setSelectedRatio] = React.useState<number>(16 / 9);

    const ratios = [
      { value: 16 / 9, label: '16:9', description: 'Widescreen video', usage: 'YouTube, streaming' },
      { value: 4 / 3, label: '4:3', description: 'Classic TV/video', usage: 'Traditional media' },
      { value: 3 / 2, label: '3:2', description: 'Photography', usage: 'DSLR cameras' },
      { value: 1, label: '1:1', description: 'Square', usage: 'Instagram, avatars' },
      { value: 9 / 16, label: '9:16', description: 'Vertical video', usage: 'TikTok, Stories' },
      { value: 21 / 9, label: '21:9', description: 'Ultrawide', usage: 'Cinematic, banners' },
      { value: 3 / 4, label: '3:4', description: 'Portrait photo', usage: 'Portraits, posters' },
    ];

    const generateCode = (ratio: number): string => {
      const ratioLabel = ratios.find((r) => r.value === ratio)?.label ?? ratio.toFixed(4);
      return `<AspectRatio ratio={${ratio === 1 ? '1' : ratio.toFixed(4)}}>
  <img src="image.jpg" alt="${ratioLabel} image" />
</AspectRatio>`;
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grid of ratio examples */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
            }}
          >
            {ratios.map((ratioItem) => {
              const maxWidth = ratioItem.value >= 1 ? '200px' : '120px';
              return (
                <PropCard
                  key={ratioItem.label}
                  label={`ratio={${ratioItem.value === 1 ? '1' : ratioItem.value.toFixed(4)}}`}
                  highlight={selectedRatio === ratioItem.value}
                  onInteraction={() => setSelectedRatio(ratioItem.value)}
                  interactionType="click"
                >
                  <div
                    style={{
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ width: '100%', maxWidth }}>
                      <AspectRatio ratio={ratioItem.value}>
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: '600',
                          }}
                        >
                          {ratioItem.label}
                        </div>
                      </AspectRatio>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          fontSize: '12px',
                          color: STORY_COLORS.neutral.text,
                          fontWeight: 600,
                          marginBottom: '4px',
                        }}
                      >
                        {ratioItem.description}
                      </div>
                      <div
                        style={{
                          fontSize: '11px',
                          color: STORY_COLORS.neutral.textSlate,
                        }}
                      >
                        {ratioItem.usage}
                      </div>
                    </div>
                  </div>
                </PropCard>
              );
            })}
          </div>

          <CodeBlock code={generateCode(selectedRatio)} language="jsx" title="JSX" />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: AS (Polymorphic)
// ============================================

export const PropAs: Story = {
  name: 'Prop: as (Polymorphic)',
  render: () => {
    const [selectedAs, setSelectedAs] = React.useState<'div' | 'figure' | 'section'>('div');

    const asOptions = [
      {
        value: 'div' as const,
        label: 'as="div" (default)',
        description: 'Generic container',
      },
      {
        value: 'figure' as const,
        label: 'as="figure"',
        description: 'Semantic for images',
      },
      {
        value: 'section' as const,
        label: 'as="section"',
        description: 'Semantic section',
      },
    ];

    const generateCode = (asValue: 'div' | 'figure' | 'section'): string => {
      if (asValue === 'div') {
        return `{/* Default: div element */}
<AspectRatio>
  <img src="image.jpg" alt="Image" />
</AspectRatio>`;
      }
      return `{/* Semantic ${asValue} element */}
<AspectRatio as="${asValue}">
  <img src="image.jpg" alt="Image" />
</AspectRatio>`;
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
            }}
          >
            {asOptions.map((option) => {
              return (
                <PropCard
                  key={option.value}
                  label={option.label}
                  highlight={selectedAs === option.value}
                  onInteraction={() => setSelectedAs(option.value)}
                  interactionType="click"
                >
                  <div
                    style={{
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ width: '100%', maxWidth: '180px' }}>
                      <AspectRatio as={option.value} ratio={4 / 3}>
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: '600',
                          }}
                        >
                          &lt;{option.value}&gt;
                        </div>
                      </AspectRatio>
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: STORY_COLORS.neutral.textSlate,
                        textAlign: 'center',
                      }}
                    >
                      {option.description}
                    </div>
                  </div>
                </PropCard>
              );
            })}
          </div>

          <div
            style={{
              padding: '16px',
              borderRadius: '8px',
              fontSize: '12px',
              color: STORY_COLORS.neutral.text,
              background: STORY_COLORS.themed.background.surface,
            }}
          >
            💡 <strong>Tip:</strong> Use semantic elements like <code>&lt;figure&gt;</code> for better accessibility and
            SEO when displaying images.
          </div>

          <CodeBlock code={generateCode(selectedAs)} language="jsx" title="JSX" />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// USE CASES
// ============================================

export const UseCases: Story = {
  render: () => {
    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Video Embed (16:9) */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: STORY_COLORS.neutral.text,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '16px',
              }}
            >
              Video Embed (16:9)
            </h3>
            <div style={{ maxWidth: '600px' }}>
              <AspectRatio ratio={16 / 9}>
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '14px',
                  }}
                >
                  🎥 Video Player (16:9)
                </div>
              </AspectRatio>
            </div>
          </div>

          {/* Image Gallery - Square */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: STORY_COLORS.neutral.text,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '16px',
              }}
            >
              Image Gallery - Square (1:1)
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '16px',
                maxWidth: '600px',
              }}
            >
              {[1, 2, 3, 4].map((i) => (
                <AspectRatio key={i} ratio={1}>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(135deg, ${i % 2 === 0 ? '#667eea' : '#f093fb'} 0%, ${i % 2 === 0 ? '#764ba2' : '#f5576c'} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: '600',
                    }}
                  >
                    Photo {i}
                  </div>
                </AspectRatio>
              ))}
            </div>
          </div>

          {/* Product Card with 4:3 Image */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: STORY_COLORS.neutral.text,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '16px',
              }}
            >
              Product Card with 4:3 Image
            </h3>
            <div style={{ maxWidth: '300px' }}>
              <div
                style={{
                  border: `1px solid ${STORY_COLORS.neutral.borderMedium}`,
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                <AspectRatio ratio={4 / 3}>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#8b4513',
                      fontSize: '16px',
                      fontWeight: '600',
                    }}
                  >
                    Product Image
                  </div>
                </AspectRatio>
                <div style={{ padding: '16px' }}>
                  <h4
                    style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: STORY_COLORS.neutral.text,
                      marginBottom: '8px',
                    }}
                  >
                    Product Name
                  </h4>
                  <p
                    style={{
                      fontSize: '14px',
                      color: STORY_COLORS.neutral.textSlate,
                      marginBottom: '12px',
                    }}
                  >
                    Product description goes here with consistent image sizing.
                  </p>
                  <div
                    style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: STORY_COLORS.primary.blue.main,
                    }}
                  >
                    $29.99
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Portrait/Story Format (9:16) */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: STORY_COLORS.neutral.text,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '16px',
              }}
            >
              Portrait/Story Format (9:16)
            </h3>
            <div
              style={{
                display: 'flex',
                gap: '16px',
                maxWidth: '600px',
              }}
            >
              {[1, 2, 3].map((i) => (
                <div key={i} style={{ width: '150px' }}>
                  <AspectRatio ratio={9 / 16}>
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: `linear-gradient(180deg, ${i === 1 ? '#fa709a' : i === 2 ? '#667eea' : '#feca57'} 0%, ${i === 1 ? '#fee140' : i === 2 ? '#764ba2' : '#ee5a6f'} 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '600',
                      }}
                    >
                      Story {i}
                    </div>
                  </AspectRatio>
                </div>
              ))}
            </div>
          </div>

          {/* Ultrawide Banner (21:9) */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: STORY_COLORS.neutral.text,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '16px',
              }}
            >
              Ultrawide Banner (21:9)
            </h3>
            <div style={{ maxWidth: '800px' }}>
              <AspectRatio ratio={21 / 9}>
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '18px',
                    fontWeight: '600',
                  }}
                >
                  🎬 Cinematic Banner
                </div>
              </AspectRatio>
            </div>
          </div>

          {/* Responsive Image Grid with Mixed Ratios */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: STORY_COLORS.neutral.text,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '16px',
              }}
            >
              Responsive Grid with Mixed Ratios
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                maxWidth: '800px',
              }}
            >
              <AspectRatio ratio={16 / 9}>
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '12px',
                  }}
                >
                  16:9
                </div>
              </AspectRatio>
              <AspectRatio ratio={4 / 3}>
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '12px',
                  }}
                >
                  4:3
                </div>
              </AspectRatio>
              <AspectRatio ratio={1}>
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#8b4513',
                    fontSize: '12px',
                  }}
                >
                  1:1
                </div>
              </AspectRatio>
            </div>
          </div>

          <CodeBlock
            code={`{/* Video embed (16:9) */}
<AspectRatio ratio={16/9}>
  <iframe src="https://youtube.com/embed/..." />
</AspectRatio>

{/* Square image grid */}
<div className="grid">
  {images.map(img => (
    <AspectRatio key={img.id} ratio={1}>
      <img src={img.url} alt={img.alt} />
    </AspectRatio>
  ))}
</div>

{/* Product card with 4:3 image */}
<div className="product-card">
  <AspectRatio ratio={4/3}>
    <img src="product.jpg" alt="Product" />
  </AspectRatio>
  <div>Product info...</div>
</div>

{/* Portrait stories (9:16) */}
<AspectRatio ratio={9/16}>
  <img src="story.jpg" alt="Story" />
</AspectRatio>

{/* Ultrawide banner (21:9) */}
<AspectRatio ratio={21/9}>
  <img src="banner.jpg" alt="Banner" />
</AspectRatio>`}
            language="jsx"
            title="JSX"
          />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PLAYGROUND
// ============================================

export const Playground: Story = {
  args: {
    ratio: 16 / 9,
    as: 'div',
  },
  render: (args: AspectRatioProps) => {
    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <PropCard label="Interactive AspectRatio (use controls below)">
            <div style={{ maxWidth: '500px' }}>
              <AspectRatio {...args}>
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '600',
                    gap: '8px',
                  }}
                >
                  <div>Ratio: {args.ratio?.toFixed(4)}</div>
                  <div style={{ fontSize: '12px', opacity: 0.9 }}>Element: &lt;{args.as ?? 'div'}&gt;</div>
                </div>
              </AspectRatio>
            </div>
          </PropCard>

          <div
            style={{
              padding: '16px',
              borderRadius: '8px',
              fontSize: '12px',
              color: STORY_COLORS.neutral.textSlate,
              background: STORY_COLORS.themed.background.surface,
            }}
          >
            💡 <strong>Tip:</strong> Use the Controls panel below to experiment with different ratios and elements
            interactively. Try common values like 16/9 (1.7778), 4/3 (1.3333), 1 (square), or 9/16 (0.5625).
          </div>
        </div>
      </StoryContainer>
    );
  },
};
