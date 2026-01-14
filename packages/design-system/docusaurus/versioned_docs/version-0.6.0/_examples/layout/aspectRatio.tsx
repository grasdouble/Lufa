import React from 'react';

import { ASPECT_RATIO, AspectRatio, Stack } from '@grasdouble/lufa_design-system';
import tokens from '@grasdouble/lufa_design-system-tokens';

const Frame = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <div
    style={{
      padding: tokens.spacing['md-lg'],
      backgroundColor: tokens.color.background.secondary,
      color: tokens.color.text.primary,
      borderRadius: tokens.radius.base,
      marginBottom: tokens.spacing.base,
    }}
  >
    {title ? (
      <div
        style={{
          fontFamily: tokens.fontFamily.mono,
          color: tokens.color.text.tertiary,
          marginBottom: tokens.spacing.md,
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
      width: tokens.maxWidth.full,
      height: tokens.maxWidth.full,
      backgroundImage: `linear-gradient(135deg, ${tokens.color.interactive.default} 0%, ${tokens.color.brand.secondary} 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: tokens.color.text.inverse,
      fontFamily: tokens.fontFamily.mono,
      fontSize: tokens.fontSize.xs,
    }}
  >
    {label}
  </div>
);

export const LiveDemo = () => (
  <Frame title={`ratio: video → ${tokens.aspectRatio.video}`}>
    <AspectRatio
      ratio={ASPECT_RATIO.video}
      style={{
        borderRadius: tokens.radius.lg,
        outline: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
        background: tokens.color.background.primary,
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
        gap: tokens.spacing.base,
      }}
    >
      {(
        [
          { key: ASPECT_RATIO.video, label: 'video', value: tokens.aspectRatio.video },
          {
            key: ASPECT_RATIO.square,
            label: 'square',
            value: tokens.aspectRatio.square,
          },
          {
            key: ASPECT_RATIO.portrait,
            label: 'portrait',
            value: tokens.aspectRatio.portrait,
          },
        ] as const
      ).map(({ key, label, value }) => (
        <div key={label}>
          <div
            style={{
              fontFamily: tokens.fontFamily.mono,
              color: tokens.color.text.tertiary,
              marginBottom: tokens.spacing.sm,
            }}
          >
            {label} → {value}
          </div>
          <AspectRatio
            ratio={key}
            style={{
              borderRadius: tokens.radius.lg,
              outline: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
              background: tokens.color.background.primary,
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
              fontFamily: tokens.fontFamily.mono,
              color: tokens.color.text.tertiary,
              marginBottom: tokens.spacing.sm,
            }}
          >
            ratio: &quot;3 / 1&quot;
          </div>
          <AspectRatio
            ratio="3 / 1"
            style={{
              borderRadius: tokens.radius.lg,
              outline: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
              background: tokens.color.background.primary,
            }}
          >
          <Media label="3 / 1" />
        </AspectRatio>
      </div>
      <div>
          <div
            style={{
              fontFamily: tokens.fontFamily.mono,
              color: tokens.color.text.tertiary,
              marginBottom: tokens.spacing.sm,
            }}
          >
            ratio: 1.333 (4/3)
          </div>
          <AspectRatio
            ratio={1.333}
            style={{
              borderRadius: tokens.radius.lg,
              outline: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
              background: tokens.color.background.primary,
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
          borderRadius: tokens.radius.lg,
          outline: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
          background: tokens.color.background.primary,
        }}
      >
        <Media label='as="div"' />
      </AspectRatio>
      <div />
      <AspectRatio
        as="figure"
        ratio={ASPECT_RATIO.photo}
        style={{
          borderRadius: tokens.radius.lg,
          outline: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
          background: tokens.color.background.primary,
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
        gap: tokens.spacing.base,
      }}
    >
      {['A', 'B', 'C'].map((label) => (
        <div
          key={label}
          style={{
            borderRadius: tokens.radius.lg,
            overflow: 'hidden',
            outline: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
            background: tokens.color.background.primary,
          }}
        >
          <AspectRatio ratio={ASPECT_RATIO.video}>
            <Media label={`Thumb ${label}`} />
          </AspectRatio>
          <div style={{ padding: tokens.spacing.md }}>
            <div
              style={{
                fontFamily: tokens.fontFamily.mono,
                color: tokens.color.text.primary,
                fontSize: tokens.fontSize.xs,
              }}
            >
              Item {label}
            </div>
            <div style={{ color: tokens.color.text.secondary, fontSize: tokens.fontSize.xs }}>16 / 9 media</div>
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
        borderRadius: tokens.radius.lg,
        overflow: 'hidden',
        outline: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
        background: tokens.color.background.primary,
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
