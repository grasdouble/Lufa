import React from 'react';

import { ASPECT_RATIO, AspectRatio, Stack, tokens } from '@grasdouble/lufa_design-system';

const { color, aspectRatio } = tokens;

const Frame = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <div
    style={{
      padding: '20px',
      backgroundColor: color.background.secondary,
      color: color.text.primary,
      borderRadius: '8px',
      marginBottom: '16px',
    }}
  >
    {title ? (
      <div
        style={{
          fontFamily: 'monospace',
          color: color.text.tertiary,
          marginBottom: 12,
        }}
      >
        {title}
      </div>
    ) : null}
    {children}
  </div>
);

const Media = ({ label }: { label: string }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      backgroundImage: `linear-gradient(135deg, ${color.interactive.default} 0%, ${color.brand.secondary} 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontFamily: 'monospace',
      fontSize: 12,
    }}
  >
    {label}
  </div>
);

export const LiveDemo = () => (
  <Frame title={`ratio: video → ${aspectRatio.video}`}>
    <AspectRatio
      ratio={ASPECT_RATIO.video}
      style={{
        borderRadius: 12,
        outline: `1px solid ${color.border.light}`,
        background: '#fff',
      }}
    >
      <Media label="16 / 9" />
    </AspectRatio>
  </Frame>
);

export const TokenRatios = () => (
  <Frame title="ratio presets (tokens)">
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: 16,
      }}
    >
      {(
        [
          { key: ASPECT_RATIO.video, label: 'video', value: aspectRatio.video },
          {
            key: ASPECT_RATIO.square,
            label: 'square',
            value: aspectRatio.square,
          },
          {
            key: ASPECT_RATIO.portrait,
            label: 'portrait',
            value: aspectRatio.portrait,
          },
        ] as const
      ).map(({ key, label, value }) => (
        <div key={label}>
          <div
            style={{
              fontFamily: 'monospace',
              color: color.text.tertiary,
              marginBottom: 8,
            }}
          >
            {label} → {value}
          </div>
          <AspectRatio
            ratio={key}
            style={{
              borderRadius: 12,
              outline: `1px solid ${color.border.light}`,
              background: '#fff',
            }}
          >
            <Media label={label} />
          </AspectRatio>
        </div>
      ))}
    </div>
  </Frame>
);

export const CustomRatios = () => (
  <Frame title="ratio (custom)">
    <Stack direction="vertical" gap="normal">
      <div>
        <div
          style={{
            fontFamily: 'monospace',
            color: color.text.tertiary,
            marginBottom: 8,
          }}
        >
          ratio: &quot;3 / 1&quot;
        </div>
        <AspectRatio
          ratio="3 / 1"
          style={{
            borderRadius: 12,
            outline: `1px solid ${color.border.light}`,
            background: '#fff',
          }}
        >
          <Media label="3 / 1" />
        </AspectRatio>
      </div>
      <div>
        <div
          style={{
            fontFamily: 'monospace',
            color: color.text.tertiary,
            marginBottom: 8,
          }}
        >
          ratio: 1.333 (4/3)
        </div>
        <AspectRatio
          ratio={1.333}
          style={{
            borderRadius: 12,
            outline: `1px solid ${color.border.light}`,
            background: '#fff',
          }}
        >
          <Media label="4 / 3" />
        </AspectRatio>
      </div>
    </Stack>
  </Frame>
);

export const As = () => (
  <Frame title="as">
    <Stack direction="vertical" gap="normal">
      <AspectRatio
        as="div"
        ratio={ASPECT_RATIO.video}
        style={{
          borderRadius: 12,
          outline: `1px solid ${color.border.light}`,
          background: '#fff',
        }}
      >
        <Media label='as="div"' />
      </AspectRatio>
      <div></div>
      <AspectRatio
        as="figure"
        ratio={ASPECT_RATIO.photo}
        style={{
          borderRadius: 12,
          outline: `1px solid ${color.border.light}`,
          background: '#fff',
        }}
      >
        <Media label='as="figure"' />
      </AspectRatio>
    </Stack>
  </Frame>
);

export const Variants = () => (
  <>
    <TokenRatios />
    <CustomRatios />
    <As />
  </>
);

export const CardThumbnailsExample = () => (
  <Frame title="card thumbnails">
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: 16,
      }}
    >
      {['A', 'B', 'C'].map((label) => (
        <div
          key={label}
          style={{
            borderRadius: 12,
            overflow: 'hidden',
            outline: `1px solid ${color.border.light}`,
            background: '#fff',
          }}
        >
          <AspectRatio ratio={ASPECT_RATIO.video}>
            <Media label={`Thumb ${label}`} />
          </AspectRatio>
          <div style={{ padding: 12 }}>
            <div
              style={{
                fontFamily: 'monospace',
                color: color.text.primary,
                fontSize: 12,
              }}
            >
              Item {label}
            </div>
            <div style={{ color: color.text.secondary, fontSize: 12 }}>16 / 9 media</div>
          </div>
        </div>
      ))}
    </div>
  </Frame>
);

export const MediaHeroExample = () => (
  <Frame title="responsive hero">
    <AspectRatio
      ratio={ASPECT_RATIO.ultrawide}
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        outline: `1px solid ${color.border.light}`,
        background: '#fff',
      }}
    >
      <Media label="ultrawide" />
    </AspectRatio>
  </Frame>
);

export const Examples = () => (
  <>
    <CardThumbnailsExample />
    <MediaHeroExample />
  </>
);
