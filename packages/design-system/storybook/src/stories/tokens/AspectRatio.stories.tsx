import type { Meta, StoryObj } from '@storybook/react-vite';

import tokens from '@grasdouble/lufa_design-system-tokens';

const meta = {
  title: '1. Tokens/Aspect Ratio',
  parameters: {
    layout: 'padded',
  },
  tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllAspectRatios: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Aspect Ratio Tokens</h1>
      <p style={{ marginBottom: '32px', color: tokens.color.text.tertiary, fontSize: '16px' }}>
        Semantic aspect ratios for media containers, images, and videos. Prevents layout shift during loading.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
        {Object.entries(tokens.aspectRatio).map(([key, value]) => (
          <div
            key={key}
            style={{
              padding: '16px',
              backgroundColor: tokens.color.background.secondary,
              borderRadius: '8px',
              border: `1px solid ${tokens.color.border.light}`,
            }}
          >
            <div style={{ marginBottom: '12px' }}>
              <div
                style={{
                  fontFamily: 'monospace',
                  fontWeight: '600',
                  fontSize: '14px',
                  marginBottom: '4px',
                }}
              >
                aspectRatio.{key}
              </div>
              <div style={{ fontFamily: 'monospace', color: tokens.color.text.tertiary, fontSize: '12px' }}>
                {value}
              </div>
            </div>
            <div
              style={{
                aspectRatio: value,
                backgroundColor: tokens.color.interactive.focus,
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: tokens.color.text.inverse,
                fontSize: '14px',
                fontWeight: '600',
              }}
            >
              {value}
            </div>
            <div style={{ marginTop: '8px', fontSize: '12px', color: tokens.color.text.tertiary }}>
              {key === 'square' && '1:1 - Avatars, thumbnails'}
              {key === 'traditional' && '4:3 - Presentations'}
              {key === 'photo' && '3:2 - Photography'}
              {key === 'video' && '16:9 - Video content'}
              {key === 'ultrawide' && '21:9 - Cinematic'}
              {key === 'vertical' && '9:16 - Stories'}
              {key === 'portrait' && '2:3 - Portrait photo'}
              {key === 'portraitDisplay' && '3:4 - Portrait screen'}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const UsageExamples: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Aspect Ratio Usage Examples</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
        {/* Video Player */}
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Video Player (16:9)</h3>
          <div
            style={{
              maxWidth: '800px',
              aspectRatio: tokens.aspectRatio.video,
              backgroundColor: tokens.color.background.inverse,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: tokens.color.text.inverse,
              fontSize: '24px',
            }}
          >
            Video Content
          </div>
        </div>

        {/* Profile Avatar */}
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Profile Avatar (1:1)</h3>
          <div
            style={{
              width: '200px',
              aspectRatio: tokens.aspectRatio.square,
              backgroundColor: tokens.color.interactive.focus,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: tokens.color.text.inverse,
              fontSize: '48px',
              fontWeight: 'bold',
            }}
          >
            JD
          </div>
        </div>

        {/* Story Card */}
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Story Card (9:16)</h3>
          <div
            style={{
              maxWidth: '300px',
              aspectRatio: tokens.aspectRatio.vertical,
              background: `linear-gradient(135deg, ${tokens.color.brand.primary} 0%, ${tokens.color.brand.secondary} 100%)`,
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: tokens.color.text.inverse,
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            Story
          </div>
        </div>
      </div>
    </div>
  ),
};
