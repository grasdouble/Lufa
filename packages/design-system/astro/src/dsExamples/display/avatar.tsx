import React from 'react';

import { Avatar, Badge } from '@grasdouble/lufa_design-system';
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

const UserLabel = ({ name, role }: { name: string; role: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', lineHeight: tokens.lineHeight.tight }}>
    <div style={{ color: tokens.color.text.primary, fontWeight: tokens.fontWeight.semibold }}>{name}</div>
    <div style={{ color: tokens.color.text.secondary, fontSize: tokens.fontSize.xs }}>{role}</div>
  </div>
);

export const LiveDemo = () => (
  <Frame title="live demo">
    <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
      <Avatar src={svgAvatar('SL', tokens.color.interactive.default)} alt="Profile picture" status="online" />
      <UserLabel name="Sébastien" role="Admin" />
      <Badge variant="success" rounded>
        Online
      </Badge>
    </div>
  </Frame>
);

export const Size = () => (
  <Frame title="size">
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: tokens.spacing.md,
      }}
    >
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Avatar
            size={size}
            src={svgAvatar(size.toUpperCase(), tokens.color.brand.secondary)}
            alt={`Avatar size ${size}`}
          />
          <div
            style={{
              fontFamily: tokens.fontFamily.mono,
              color: tokens.color.text.tertiary,
              fontSize: tokens.fontSize.xs,
            }}
          >
            {size}
          </div>
        </div>
      ))}
    </div>
  </Frame>
);

export const Variant = () => (
  <Frame title="variant">
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: tokens.spacing.base,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing['sm-md'] }}>
        <Avatar
          variant="circle"
          src={svgAvatar('C', tokens.color.interactive.default)}
          alt="Circle avatar"
          status="away"
        />
        <div
          style={{
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            fontSize: tokens.fontSize.xs,
          }}
        >
          circle
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing['sm-md'] }}>
        <Avatar variant="square" src={svgAvatar('S', tokens.color.brand.secondary)} alt="Square avatar" status="busy" />
        <div
          style={{
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            fontSize: tokens.fontSize.xs,
          }}
        >
          square
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing['sm-md'] }}>
        <Avatar variant="count" count="+12" />
        <div
          style={{
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            fontSize: tokens.fontSize.xs,
          }}
        >
          count
        </div>
      </div>
    </div>
  </Frame>
);

export const Status = () => (
  <Frame title="status">
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: tokens.spacing.base,
      }}
    >
      {(['online', 'offline', 'away', 'busy', 'none'] as const).map((status) => (
        <div key={status} style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing['sm-md'] }}>
          <Avatar
            src={svgAvatar(status.slice(0, 1).toUpperCase(), tokens.color.interactive.default)}
            alt={`Status ${status}`}
            status={status}
          />
          <div
            style={{
              fontFamily: tokens.fontFamily.mono,
              color: tokens.color.text.tertiary,
              fontSize: tokens.fontSize.xs,
            }}
          >
            {status}
          </div>
        </div>
      ))}
    </div>
  </Frame>
);

export const StatusPosition = () => (
  <Frame title="statusPosition">
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: tokens.spacing.base,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing['sm-md'] }}>
        <Avatar
          src={svgAvatar('T', tokens.color.brand.secondary)}
          alt="Status position top"
          status="online"
          statusPosition="top"
        />
        <div
          style={{
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            fontSize: tokens.fontSize.xs,
          }}
        >
          top
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing['sm-md'] }}>
        <Avatar
          src={svgAvatar('B', tokens.color.brand.secondary)}
          alt="Status position bottom"
          status="online"
          statusPosition="bottom"
        />
        <div
          style={{
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            fontSize: tokens.fontSize.xs,
          }}
        >
          bottom
        </div>
      </div>
    </div>
  </Frame>
);

export const CommentHeaderExample = () => (
  <Frame title="comment header">
    <div style={{ display: 'flex', gap: tokens.spacing.md, alignItems: 'flex-start' }}>
      <Avatar src={svgAvatar('JD', tokens.color.interactive.default)} status="online" />
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: 'flex',
            gap: tokens.spacing['sm-md'],
            alignItems: 'center',
            marginBottom: tokens.spacing['2xs'],
          }}
        >
          <div style={{ fontWeight: tokens.fontWeight.semibold, color: tokens.color.text.primary }}>Jane Doe</div>
          <Badge variant="info" rounded>
            Moderator
          </Badge>
          <div style={{ color: tokens.color.text.tertiary, fontSize: tokens.fontSize.xs }}>2h ago</div>
        </div>
        <div style={{ color: tokens.color.text.secondary }}>
          Avatar works well as a leading element for comments, activity feeds, and list rows.
        </div>
      </div>
    </div>
  </Frame>
);

export const CountAvatarExample = () => (
  <Frame title="overflow count">
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: tokens.spacing.base,
      }}
    >
      <UserLabel name="Reviewers" role="5 people" />
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing['sm-md'] }}>
        <Avatar src={svgAvatar('AL', tokens.color.interactive.default)} alt="Alice" />
        <Avatar src={svgAvatar('BO', tokens.color.brand.secondary)} alt="Bob" />
        <Avatar src={svgAvatar('CH', tokens.color.info.default)} alt="Chris" />
        <Avatar variant="count" count="+2" />
      </div>
    </div>
  </Frame>
);

export const Variants = () => (
  <>
    <Size />
    <Variant />
    <Status />
    <StatusPosition />
  </>
);

export const Examples = () => (
  <>
    <CommentHeaderExample />
    <CountAvatarExample />
  </>
);
