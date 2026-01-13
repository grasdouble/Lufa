import React from 'react';

import { Avatar, AvatarGroup, Badge, Stack } from '@grasdouble/lufa_design-system';
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

const svgAvatar = (text: string, background: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${tokens.size['2xl']}" height="${tokens.size['2xl']}">
  <rect width="100%" height="100%" rx="${tokens.radius.xl}" fill="${background}"/>
  <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="${tokens.fontSize['4xl']}" fill="${tokens.color.text.inverse}">${text}</text>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const Team = ({ size = 'md', max }: { size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; max?: number }) => (
  <AvatarGroup size={size} max={max}>
    <Avatar src={svgAvatar('AL', tokens.color.interactive.default)} alt="Alice" status="online" />
    <Avatar src={svgAvatar('BO', tokens.color.brand.secondary)} alt="Bob" status="away" />
    <Avatar src={svgAvatar('CH', tokens.color.info.default)} alt="Chris" status="offline" />
    <Avatar src={svgAvatar('DE', tokens.color.warning.default)} alt="Denise" status="busy" />
    <Avatar src={svgAvatar('EV', tokens.color.success.default)} alt="Eve" status="online" />
  </AvatarGroup>
);

export const LiveDemo = () => (
  <Frame title="live demo">
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: tokens.spacing.base,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
        <Team max={4} />
        <div style={{ color: tokens.color.text.secondary }}>Design team</div>
      </div>
      <Badge rounded variant="primary">
        5 members
      </Badge>
    </div>
  </Frame>
);

export const Max = () => (
  <Frame title="max">
    <Stack direction="vertical" gap="normal">
      {[undefined, 2, 3, 4].map((max) => (
        <div key={String(max)} style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
          <Team max={max as number | undefined} />
          <div
            style={{
              fontFamily: tokens.fontFamily.mono,
              color: tokens.color.text.tertiary,
              fontSize: tokens.fontSize.xs,
            }}
          >
            max: {max ?? '—'}
          </div>
        </div>
      ))}
    </Stack>
  </Frame>
);

export const Size = () => (
  <Frame title="size">
    <Stack direction="vertical" gap="normal">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
          <Team size={size} max={4} />
          <div
            style={{
              fontFamily: tokens.fontFamily.mono,
              color: tokens.color.text.tertiary,
              fontSize: tokens.fontSize.xs,
            }}
          >
            size: {size}
          </div>
        </div>
      ))}
    </Stack>
  </Frame>
);

export const ProjectCardHeaderExample = () => (
  <Frame title="project card header">
    <div
      style={{
        borderRadius: tokens.radius.lg,
        background: tokens.color.background.primary,
        border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
        padding: tokens.spacing.base,
        display: 'flex',
        justifyContent: 'space-between',
        gap: tokens.spacing.base,
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing['2xs'] }}>
        <div style={{ color: tokens.color.text.primary, fontWeight: tokens.fontWeight.bold }}>Website Redesign</div>
        <div style={{ color: tokens.color.text.secondary, fontSize: tokens.fontSize.xs }}>Assigned</div>
      </div>
      <Team max={3} />
    </div>
  </Frame>
);

export const InlineAssigneesExample = () => (
  <Frame title="inline assignees">
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: tokens.spacing.base,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing['2xs'] }}>
        <div style={{ color: tokens.color.text.primary, fontWeight: tokens.fontWeight.bold }}>Bug triage</div>
        <div style={{ color: tokens.color.text.secondary, fontSize: tokens.fontSize.xs }}>Assignees</div>
      </div>
      <Team max={4} size="sm" />
    </div>
  </Frame>
);

export const Example1 = ProjectCardHeaderExample;
export const Example2 = InlineAssigneesExample;

export const Variants = () => (
  <>
    <Max />
    <Size />
  </>
);

export const Examples = () => (
  <>
    <ProjectCardHeaderExample />
    <InlineAssigneesExample />
  </>
);
